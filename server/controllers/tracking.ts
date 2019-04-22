import * as _ from 'underscore';
import * as fs from 'fs';
import * as path from 'path';
import * as Router from 'koa-router';
import * as dns from 'dns';
import * as url from 'url';
import * as request from 'request-promise';
import * as zlib from 'zlib';
import {
  A7Controller,
  Config,
  Get,
  Middleware,
  Overrides,
  Params,
  Post,
  validators,
} from '@nodeswork/sbase/koa';

import * as models from '../models';
import { configs } from '../configs';
import { lib } from './libs';
import { logger } from '../logger';

const randomQuotes = require('random-quotes');

const files = {
  uiTag75: fs.readFileSync(
    path.join(__dirname, '../views/libs/revenuehits/ui_tag_75-1.js'),
  ),
  bundle: fs.readFileSync(
    path.join(__dirname, '../views/libs/revenuehits/bundle.js'),
  ),
};

function passHeaders(ctx: Router.IRouterContext, headers: any) {
  _.each(headers, (v: string, k: string) => {
    if (k === 'content-type') {
      ctx.type = v;
    }
    if (k === 'set-cookie') {
      ctx.logInfo['set-cookie'] = v;
    }
    if (
      k === 'expires' ||
      k === 'cache-control' ||
      k === 'last-modified' ||
      k === 'set-cookie' ||
      k === 'location' ||
      k === 'date' ||
      k === 'server'
    ) {
      ctx.set(k, v);
    }
  });
}

@Config({
  prefix: '/trackings',
})
class TrackingController extends A7Controller {
  @Post('/proxy')
  async proxy(ctx: Router.IRouterContext) {
    const options = ctx.request.body;

    options.headers = options.headers || {};
    options.headers['X-Forwarded-For'] = ctx.ip;
    options.headers['X-Real-Ip'] = ctx.ip;

    const result = await request(options);

    ctx.body = result;
  }

  @Post('/log')
  async log(ctx: Router.IRouterContext) {
    ctx.logInfo.logBody = JSON.stringify(ctx.request.body);
    ctx.status = 204;
  }

  @Get('/proxy-get')
  async proxyGet(ctx: Router.IRouterContext) {
    const u = Buffer.from(ctx.request.query.url, 'base64').toString();
    const u1 = new url.URL(u.startsWith('//') ? 'http:' + u : u);

    _.each(ctx.request.query, (v: string, k: string) => {
      if (
        k !== 'url' &&
        k !== 'rtsid' &&
        k !== 'noredirect' &&
        k !== 'inject' &&
        k !== 'rid' &&
        k !== 'te' &&
        k !== 'zone' &&
        k !== 'try_relative' &&
        k !== 'channel'
      ) {
        u1.searchParams.append(k, v);
      }
    });

    ctx.forUrl = u1;
    const uu = u1.toString();
    console.log('proxy:', uu);

    ctx.logInfo.decodedUrl = uu;

    const options: request.Options = {
      url: uu,
      headers: ctx.request.headers,
      resolveWithFullResponse: true,
      gzip: true,
      encoding: null as any,
      rejectUnauthorized: false,
    };
    if (ctx.request.query.noredirect) {
      options.followRedirect = false;
    }
    options.headers = options.headers || {};
    // options.headers['X-Forwarded-For'] = ctx.ip;
    // options.headers['X-Real-Ip'] = ctx.ip;
    delete options.headers.host;
    delete options.headers['accept-encoding'];

    const rules = await models.Rules.find({ enabled: true }, null, {
      sort: { priority: -1 },
    });
    const ruleErrors = [];

    const rulesApplied: models.Rules[] = [];

    for (const rule of rules) {
      try {
        if (rule.matchFn(options, ctx, lib)) {
          rule.preFn(options, ctx, lib);
        }
        rulesApplied.push(rule);
      } catch (e) {
        ruleErrors.push({ name: rule.name, err: e });
        console.log(`match rule [${rule.name}] failed`, e);
      }
    }

    ctx.set('Access-Control-Allow-Origin', '*');

    let result, error;

    try {
      result = await request(options);

      passHeaders(ctx, result.headers);

      ctx.body = result.body;

      if (ctx.request.query.rtsid != null) {
        ctx.body =
          result.body +
          `;rt.regScriptResponse(${ctx.request.query.rtsid}, '${new Buffer(
            result.body,
          ).toString('base64')}')`;
      }
    } catch (e) {
      /* handle error */
      // console.log(e.response.headers);
      error = e;

      if (
        e.statusCode === 404 &&
        ctx.request.query.try_relative === 'true' &&
        ctx.request.headers.referer
      ) {
        // console.log('headers', ctx.request.headers.referer);
        const root = lib.rootFromReferer(ctx.request.headers.referer);
        const referer = new url.URL(ctx.request.headers.referer);
        const relative = lib.relativePath(referer, ctx.forUrl);
        const target = new url.URL(relative, root);
        target.search = ctx.forUrl.search;

        ctx.redirect(lib.proxyGetUrl(target.toString()));
        return;
      }

      ctx.status = e.statusCode;
      ctx.body = e.response.body;
      passHeaders(ctx, e.response.headers);
    }

    if (ctx.type === 'text/html') {
      ctx.$body = lib.cheerio.load(ctx.body);
    }

    for (const rule of rulesApplied) {
      try {
        rule.postFn(result, error, ctx, options, lib, ctx.$body, _);
      } catch (e) {
        ruleErrors.push({ name: rule.name, err: e });
        console.log(`post rule [${rule.name}] failed`, e);
      }
    }

    if (ctx.$body) {
      ctx.body = ctx.$body.html();
    }

    if (ctx.forUrl.toString().indexOf('ui_tag_75-1') >= 0) {
      ctx.body = files.uiTag75;
    }

    ctx.set('applied-rules', _.map(rulesApplied, r => r.name).join(';'));
    ctx.set('error-rules', _.map(ruleErrors, r => r.name).join(';'));
  }

  @Get('/dns')
  async dns(ctx: Router.IRouterContext) {
    const host = ctx.request.query.host;

    const d = await new Promise(resolve => {
      dns.resolveCname(host, (err, result) => {
        if (err && err.code === 'ENODATA') {
          dns.resolve4(host, (err2, result2) => {
            if (err2) {
              resolve(host);
            } else {
              resolve(result2[0]);
            }
          });
        } else if (err) {
          resolve(host);
        } else {
          resolve(result[0]);
        }
      });
    });

    ctx.body = d;
  }

  @Get('/resolve-popcash')
  async resolvePopcash(ctx: Router.IRouterContext) {
    const c = Math.floor(1e16 * Math.random());
    const u = new url.URL(
      `/go/${ctx.request.query.uid}/${ctx.request.query.wid}/${
        ctx.request.query.code
      }?cb=${c}`,
      'http://ps.popcash.net',
    );

    const resp = (await request(u.toString())) || '';
    const result = resp.match(/(\/ad\/ad[^"]+)"/);
    if (result) {
      ctx.body = `http://ps.popcash.net${result[1]}2560&vh=1600`;
    }
  }

  @Get('/')
  @Overrides(
    'request.query.te->doc.te',
    'request.query.zone->doc.zone',
    'request.query.channel->doc.channel',
    'request.ip->doc.ip',
  )
  @Middleware(async (ctx: Router.IRouterContext, next: () => void) => {
    const options = {
      chitika: ctx.request.query.chitika !== 'false',
      revenuehits: false && ctx.request.query.revenuehits !== 'false',
      bidvertiser: false && ctx.request.query.bidvertiser !== 'false',
      properller: ctx.request.query.properller !== 'false',
      popads: false && ctx.request.query.popads !== 'false',
      popcash: false && ctx.request.query.popcash !== 'false',
      chitikaCount: Number.parseInt(ctx.request.query.chitikacount || '3', 10),
    };
    if (!options.chitika) {
      options.chitikaCount = 0;
    }

    ctx.overrides.doc.userAgent = ctx.request.headers['user-agent'];

    await next();
    const tracking: models.Requests = ctx.trackingModel;
    ctx.render('trackings', {
      tracking: tracking.toJSON({ getters: true }),
      quote: randomQuotes.default(),
      options,
      configs,
    });

    logger.info('request', {
      url: ctx.request.url,
      tracking: tracking.toJSON({ getters: true }),
    });
  })
  create = models.Requests.createMiddleware({
    target: 'trackingModel',
    noBody: true,
  });

  @Get('/test')
  @Overrides(
    'request.query.te->doc.te',
    'request.query.zone->doc.zone',
    'request.ip->doc.ip',
    'request.query.channel->doc.channel',
  )
  @Middleware(async (ctx: Router.IRouterContext, next: () => void) => {
    ctx.overrides.doc.te = 'test';
    ctx.overrides.doc.userAgent = ctx.request.headers['user-agent'];
    await next();
    const tracking: models.Requests = ctx.trackingModel;
    ctx.render('trackings-test', {
      tracking: tracking.toJSON({ getters: true }),
      configs,
    });
  })
  test = models.Requests.createMiddleware({
    target: 'trackingModel',
    noBody: true,
  });

  @Get('/injector.js')
  @Overrides(
    'request.query.te->doc.te',
    'request.query.zone->doc.zone',
    'request.query.channel->doc.channel',
    'request.ip->doc.ip',
  )
  @Middleware(async (ctx: Router.IRouterContext, next: () => void) => {
    if (ctx.request.headers.referer) {
      try {
        const referer = new url.URL(ctx.request.headers.referer);
        _.defaults(ctx.overrides.doc, {
          te: referer.searchParams.get('te'),
          zone: referer.searchParams.get('zone'),
        });
      } catch (e) {
        /* handle error */
      }
    }
    ctx.overrides.doc.userAgent = ctx.request.headers['user-agent'];

    await next();
    const tracking: models.Requests = ctx.trackingModel;
    ctx.render('injector', {
      tracking: tracking.toJSON({ getters: true }),
      configs,
    });
    ctx.body = ctx.body.replace(/<script>/g, '').replace(/<\/script>/g, '');
    ctx.type = 'text/javascript';

    logger.info('request', {
      url: ctx.request.url,
      tracking: tracking.toJSON({ getters: true }),
    });
  })
  getInjectorScript = models.Requests.createMiddleware({
    target: 'trackingModel',
    noBody: true,
  });

  @Get('/lib.js')
  async getLibScript(ctx: Router.IRouterContext) {
    ctx.render('lib-script', {
      tracking: {
        te: ctx.request.query.te,
        zone: ctx.request.query.zone,
        rid: ctx.request.query.rid,
        params: `rid=${ctx.request.query.rid}&te=${ctx.request.query.te}&zone=${
          ctx.request.query.zone
        }&channel=${ctx.request.query.channel}`,
      },
      configs,
    });
    ctx.body = ctx.body.replace(/<script>/g, '').replace(/<\/script>/g, '');
    ctx.type = 'text/javascript';
  }

  async handleDetails(ctx: Router.IRouterContext, next: () => void) {
    const { te, type, zone, rid } = ctx.request.query;
    const detail = await models.Details.create({
      te,
      type,
      zone,
      request: rid,
      ip: ctx.request.ip,
    });
    logger.info('details', {
      url: ctx.url,
      detail: detail.toJSON({ getters: true }),
    });
    await next();
  }

  @Get('/styles.css')
  @Middleware(TrackingController.prototype.handleDetails)
  getStyles(ctx: Router.IRouterContext) {
    ctx.body = '';
    ctx.type = 'text/css';
  }

  @Get('/script.js')
  @Middleware(TrackingController.prototype.handleDetails)
  getHeaderScript(ctx: Router.IRouterContext) {
    ctx.body = '';
    ctx.type = 'text/javascript';
  }

  @Get('/pixel.gif')
  @Middleware(TrackingController.prototype.handleDetails)
  getPixel(ctx: Router.IRouterContext) {
    const buf = Buffer.from(
      'R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
      'base64',
    );
    ctx.body = buf;
    ctx.type = 'image/gif';
  }

  @Get('/chitika')
  @Middleware(TrackingController.prototype.handleDetails)
  getChitika(ctx: Router.IRouterContext) {
    ctx.body = '';
  }

  @Get('/chitika-loaded')
  @Middleware(TrackingController.prototype.handleDetails)
  getChitikaLoaded(ctx: Router.IRouterContext) {
    ctx.body = '';
  }

  @Get('/chitika-iframe')
  @Middleware(TrackingController.prototype.handleDetails)
  getChitikaIFrame(ctx: Router.IRouterContext) {
    ctx.body = '';
  }

  @Get('/pushlaram')
  @Middleware(TrackingController.prototype.handleDetails)
  getPushlaram(ctx: Router.IRouterContext) {
    ctx.body = '';
  }

  @Post('/general')
  @Middleware(TrackingController.prototype.handleDetails)
  postGeneral(ctx: Router.IRouterContext) {
    if (ctx.request.query.type && !_.isEmpty(ctx.request.body)) {
      _.extend(ctx.logInfo, ctx.request.body);
    }
    ctx.body = '';
  }

  @Get('/iframe-pixel.gif')
  @Middleware(TrackingController.prototype.handleDetails)
  getIFramePixel(ctx: Router.IRouterContext) {
    const buf = Buffer.from(
      'R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
      'base64',
    );
    ctx.body = buf;
    ctx.type = 'image/gif';
  }

  @Get('/iframe')
  @Middleware(TrackingController.prototype.handleDetails)
  async getIframe(ctx: Router.IRouterContext) {
    const tracking = await models.Requests.findById(ctx.request.query.rid);
    ctx.render('trackings-iframe', { tracking, configs });
  }

  @Get('/about')
  async about(ctx: Router.IRouterContext) {
    ctx.body = {
      ip: ctx.request.ip,
      headers: ctx.request.headers,
    };
  }
}

export const trackingController = new TrackingController();
