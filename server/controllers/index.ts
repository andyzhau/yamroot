import * as Router from 'koa-router';
import { clearOverrides } from '@nodeswork/sbase/koa';

import { trackingController } from './tracking';
import { ruleController } from './rules';

export const router = new Router({});

router.get('/', async ctx => {
  ctx.render('index');
});

router
  .use(clearOverrides())
  .use(...trackingController.$koaRouterUseArgs)
  .use(...ruleController.$koaRouterUseArgs);
