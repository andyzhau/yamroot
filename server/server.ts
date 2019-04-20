require('source-map-support').install();

import * as Koa from 'koa';
import * as url from 'url';
import * as bodyparser from 'koa-bodyparser';
import * as mongoose from 'mongoose';
import * as cors from 'koa2-cors';
import * as Pug from 'koa-pug';
import * as Router from 'koa-router';
import * as koaStatic from 'koa-static';

process.env['NODE_CONFIG_DIR'] = __dirname + '/config/';

import { configs } from './configs';
import { router } from './controllers';
import { accessLogger } from './logger';
import { lib } from './controllers/libs';

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect(
  configs.mongodb.address,
  {
    useNewUrlParser: true,
  },
);

const app = new Koa();
app.keys = configs.app.keys;

app.proxy = true;

const pug = new Pug({
  viewPath: configs.pug.viewPath,
  app,
});

const CORS: string[] = configs.app.cors;

app
  .use(
    cors({
      origin: ctx => {
        const origin = ctx.request.get('origin');
        return CORS.indexOf(origin) >= 0 ? origin : false;
      },
      maxAge: 3600,
      credentials: true,
    }),
  )
  .use(async (ctx, next) => {
    ctx.logInfo = {
      url: ctx.request.url,
      query: ctx.request.query,
      host: ctx.request.host,
      path: ctx.request.path,
      ip: ctx.ip,
      header: ctx.request.headers,
    };
    try {
      await next();
    } catch (e) {
      ctx.logInfo.err = e;
      console.error(e);
      ctx.status = 500;
    }
    ctx.logInfo.status = ctx.status;
    accessLogger.info('Request', ctx.logInfo);
  })
  .use(koaStatic(configs.pug.viewPath))
  .use(bodyparser())
  .use(router.routes())
  .use(router.allowedMethods())
  .use((ctx: Router.IRouterContext, next: any) => {
    if (
      ctx.request.method === 'GET' &&
      lib.isTrackingUrl(ctx.request.headers.referer)
    ) {
      const u = new url.URL(ctx.request.headers.referer);
      const newLocation = url.resolve(
        Buffer.from(u.searchParams.get('url'), 'base64').toString(),
        ctx.request.path,
      );
      ctx.redirect(
        lib.proxyGetUrl(newLocation.toString()) + `&try_relative=true`,
      );
    }
  })
  .use(async ctx => {
    ctx.status = 404;
  });

app.listen(configs.app.port);
