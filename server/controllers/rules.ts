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

@Config({
  prefix: '/rules',
})
class RuleController extends A7Controller {

  @Post('/')
  create = models.Rules.createMiddleware({});

  @Get('/')
  find = models.Rules.findMiddleware({});

  @Get('/:ruleId')
  get = models.Rules.getMiddleware({
    field: 'ruleId',
  });

  @Post('/:ruleId')
  update = models.Rules.updateMiddleware({
    field: 'ruleId',
  });
}

export const ruleController = new RuleController();
