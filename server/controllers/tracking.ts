import * as _ from 'underscore';
import * as fs from 'fs';
import * as path from 'path';
import * as Router from 'koa-router';
import * as dns from 'dns';
import * as url from 'url';
import * as request from 'request-promise';
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
};

function passHeaders(ctx: Router.IRouterContext, headers: any) {
  _.each(headers, (v: string, k: string) => {
    if (k === 'content-type') {
      ctx.type = v;
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
        k !== 'rid' &&
        k !== 'te' &&
        k !== 'zone'
      ) {
        u1.searchParams.append(k, v);
      }
    });

    const uu = u1.toString();
    console.log('proxy:', uu);

    ctx.logInfo.decodedUrl = uu;

    const options: request.Options = {
      url: uu,
      headers: ctx.request.headers,
      resolveWithFullResponse: true,
      gzip: true,
      encoding: null as any,
    };
    if (ctx.request.query.noredirect) {
      options.followRedirect = false;
    }
    options.headers = options.headers || {};
    options.headers['X-Forwarded-For'] = ctx.ip;
    options.headers['X-Real-Ip'] = ctx.ip;
    delete options.headers.host;

    const rules = await models.Rules.find({ enabled: true }, null, {
      sort: { priority: -1 },
    });

    const applied = _.filter(rules, r => r.matchFn(options, ctx, lib));

    for (const rule of applied) {
      if (rule.matchFn(options, ctx, lib)) {
        rule.preFn(options, ctx, lib);
      }
    }

    try {
      const result = await request(options);

      passHeaders(ctx, result.headers);

      ctx.body = result.body;

      if (ctx.request.query.rtsid != null) {
        ctx.body =
          result.body +
          `;rt.regScriptResponse(${ctx.request.query.rtsid}, '${new Buffer(
            result.body,
          ).toString('base64')}')`;
      }

      for (const rule of applied) {
        rule.postFn(ctx, options, lib);
      }

      if (uu.indexOf('ui_tag_75-1') >= 0) {
        ctx.body = files.uiTag75;
      }
    } catch (e) {
      /* handle error */
      // console.log(e.response.headers);
      ctx.status = e.statusCode;
      ctx.body = e.response.body;
      passHeaders(ctx, e.response.headers);
    }

    ctx.set('applied-rules', _.map(rules, r => r.name).join(','));
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
    'request.ip->doc.ip',
  )
  @Middleware(async (ctx: Router.IRouterContext, next: () => void) => {
    const options = {
      chitika: ctx.request.query.chitika !== 'false',
      revenuehits: ctx.request.query.revenuehits !== 'false',
      bidvertiser: false && ctx.request.query.bidvertiser !== 'false',
      properller: ctx.request.query.properller !== 'false',
      popads: false && ctx.request.query.popads !== 'false',
      popcash: false && ctx.request.query.popcash !== 'false',
      chitikaCount: Number.parseInt(ctx.request.query.chitikacount || '3', 10),
    };
    if (!options.chitika) {
      options.chitikaCount = 0;
    }

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
  @Overrides('request.query.te->doc.te', 'request.ip->doc.ip')
  @Middleware(async (ctx: Router.IRouterContext, next: () => void) => {
    ctx.overrides.doc.te = 'test';
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
        }`,
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

  @Get('/general')
  @Middleware(TrackingController.prototype.handleDetails)
  getGeneral(ctx: Router.IRouterContext) {
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

  @Get('/ads')
  async getAds(ctx: Router.IRouterContext) {
    ctx.body = [
      {
        url: 'https://yizhenzhao.blogspot.com/2019/04/blog-post_11.html',
        iframe: true,
        redirect: false,
      },
      // {
      // url: 'http://deloplen.com/afu.php?zoneid=2556039',
      // redirect: true,
      // iframe: false,
      // },
    ];
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
