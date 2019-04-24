import * as Router from 'koa-router';
import * as _ from 'underscore';
import * as models from '../models';
import * as url from 'url';

import {
  A7Controller,
  Config,
  Get,
  Middleware,
  Overrides,
  Post,
  Params,
  validators,
} from '@nodeswork/sbase/koa';

import { configs } from '../configs';
import { logger } from '../logger';

const randomQuotes = require('random-quotes');

@Config({
  prefix: '/trackings',
})
class TrackingController extends A7Controller {
  @Params({
    'query.rids': [validators.split(',')],
  })
  @Overrides(
    'request.ip->doc.ip',
    'request.query.channel->doc.channel',
    'request.query.seq->doc.seq',
    'request.query.te->doc.te',
    'request.query.zone->doc.zone',
    'request.query.rids->doc.rids',
    'request.headers.user-agent->doc.userAgent',
  )
  async trackingParamOverrides(ctx: Router.IRouterContext, next: () => void) {
    await next();
  }

  @Get('/')
  @Middleware(TrackingController.prototype.trackingParamOverrides)
  @Middleware(async (ctx: Router.IRouterContext, next: () => void) => {
    const options = extractAdOptionFromUrl(ctx.request.URL);
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
  @Middleware(TrackingController.prototype.trackingParamOverrides)
  @Middleware(async (ctx: Router.IRouterContext, next: () => void) => {
    console.log('reached here');
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
  @Middleware(TrackingController.prototype.trackingParamOverrides)
  @Middleware(async (ctx: Router.IRouterContext, next: () => void) => {
    let referer;
    try {
      referer = new url.URL(ctx.request.headers.referer);
      _.defaults(ctx.overrides.doc, {
        te: referer.searchParams.get('te'),
        zone: referer.searchParams.get('zone'),
        channel: referer.searchParams.get('channel'),
        seq: referer.searchParams.get('seq'),
      });
    } catch (e) {
      ctx.body = '';
      ctx.status = 204;
    }

    const options = extractAdOptionFromUrl(referer);

    await next();
    const tracking: models.Requests = ctx.trackingModel;
    ctx.render('injector', {
      tracking: tracking.toJSON({ getters: true }),
      configs,
      options,
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
        }&channel=${ctx.request.query.channel}&seq=${ctx.request.query.seq ||
          '0'}`,
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

  @Post('/log')
  async log(ctx: Router.IRouterContext) {
    _.extend(ctx.logInfo, ctx.request.body);
    ctx.status = 204;
  }

  @Get('/styles.css')
  @Middleware(TrackingController.prototype.handleDetails)
  getStyles(ctx: Router.IRouterContext) {
    ctx.body = '';
    ctx.type = 'text/css';
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

  @Post('/general')
  @Middleware(TrackingController.prototype.handleDetails)
  postGeneral(ctx: Router.IRouterContext) {
    if (ctx.request.query.type && !_.isEmpty(ctx.request.body)) {
      _.extend(ctx.logInfo, ctx.request.body);
    }
    ctx.body = '';
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

function extractAdOptionFromUrl(src: url.URL): AdOptions {
  const properller: number = ({
    'crazy-tag': 2568532,
    'light-tag': 2556014,
    'luminous-tag': 2580577,
    'epic-tag': 2580574,
  } as any)[src.searchParams.get('properller')];

  return {
    properller,
    popcash: src.searchParams.get('popcash') === 'true',
  };
}

export interface AdOptions {
  properller: number;
  popcash: boolean;
}
