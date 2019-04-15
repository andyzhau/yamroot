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
    if (k === 'expires' || k === 'cache-control' || k === 'last-modified') {
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

  @Get('/proxy-get')
  async proxyGet(ctx: Router.IRouterContext) {
    const u = Buffer.from(ctx.request.query.url, 'base64').toString();
    const u1 = new url.URL(u.startsWith('//') ? 'http:' + u : u);

    _.each(ctx.request.query, (v: string, k: string) => {
      if (k !== 'url') {
        u1.searchParams.append(k, v);
      }
    });

    const uu = u1.toString();

    console.log('proxy', uu);

    const options = {
      url: uu,
      headers: ctx.request.headers,
      resolveWithFullResponse: true,
      gzip: true,
      encoding: null as any,
    };
    options.headers = options.headers || {};
    options.headers['X-Forwarded-For'] = ctx.ip;
    options.headers['X-Real-Ip'] = ctx.ip;
    delete options.headers.host;

    try {
      const result = await request(options);

      passHeaders(ctx, result.headers);

      ctx.body = result.body;

      if (u.indexOf('ui_tag_75-1.js') >= 0) {
        ctx.body = files.uiTag75;
      }

      if (uu.indexOf('clksite.com/adServe/banners') >= 0) {
        let orig = ctx.body.toString();
        const matched = orig.match(/"\/\/clksite.com\/adServe\/banners[^"]+"/g);
        _.each(matched, x => {
          orig = orig.replace(x, `window.rt.proxyGetUrl(${x})`);
        });
        orig = orig.replace('i.src=r', `i.src=window.rt.proxyGetUrl(r)`);
        ctx.body = orig;
      }
    } catch (e) {
      /* handle error */
      ctx.status = e.statusCode;
      ctx.body = e.response.body;
      passHeaders(ctx, e.response.headers);
    }
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
      bidvertiser: ctx.request.query.bidvertiser !== 'false',
      popads: ctx.request.query.popads !== 'false',
    };

    await next();
    const tracking: models.Requests = ctx.trackingModel;
    ctx.render('trackings', {
      tracking,
      quote: randomQuotes.default(),
      options,
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
    ctx.render('trackings-test', { tracking });
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
    ctx.render('injector', { tracking });
    ctx.body = ctx.body.replace(/<script>/g, '').replace(/<\/script>/g, '');
    ctx.type = 'text/javascript';
  })
  getInjectorScript = models.Requests.createMiddleware({
    target: 'trackingModel',
    noBody: true,
  });

  async handleDetails(ctx: Router.IRouterContext, next: () => void) {
    const { te, type, zone, rid } = ctx.request.query;
    await models.Details.create({
      te,
      type,
      zone,
      request: rid,
      ip: ctx.request.ip,
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
    ctx.render('trackings-iframe', { tracking });
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
