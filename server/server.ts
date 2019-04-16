import * as Koa from 'koa';
import * as bodyparser from 'koa-bodyparser';
import * as mongoose from 'mongoose';
import * as cors from 'koa2-cors';
import * as Pug from 'koa-pug';
import * as koaStatic from 'koa-static';

process.env['NODE_CONFIG_DIR'] = __dirname + '/config/';

import { configs } from './configs';
import { router } from './controllers';
import { accessLogger } from './logger';

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
    try {
      await next();
      accessLogger.info('Request', {
        url: ctx.request.url,
        ip: ctx.ip,
        status: ctx.status,
        header: ctx.request.headers,
      });
    } catch (e) {
      accessLogger.info('Request', {
        url: ctx.request.url,
        ip: ctx.ip,
        header: ctx.request.headers,
        err: e,
      });
      ctx.status = 500;
    }
  })
  .use(koaStatic(configs.pug.viewPath))
  .use(bodyparser())
  .use(router.routes())
  .use(router.allowedMethods())
  .use(async ctx => {
    ctx.status = 404;
  });

app.listen(configs.app.port);
