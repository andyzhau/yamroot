import * as Router from 'koa-router';
import * as _ from 'underscore';
import * as request from 'request-promise';

import {
  A7Model,
  Config,
  DBRef,
  Default,
  Optional,
} from '@nodeswork/sbase/mongoose';

@Config({
  id: false,
  collection: 'rules',
})
export class Rules extends A7Model {
  @Optional() name: string;
  @Optional() match: string;
  @Optional() pre: string;
  @Optional() post: string;
  @Optional() enabled: boolean;
  @Default(0) priority: number;

  get matchFn(): MatchFn {
    return this.match == null
      ? _.identity
      : (new Function('options', 'ctx', 'lib', this.match) as any);
  }

  get preFn(): PreFn {
    return this.pre == null
      ? _.identity
      : (new Function('options', 'ctx', 'lib', this.pre) as any);
  }

  get postFn(): PostFn {
    return this.post == null
      ? _.identity
      : (new Function(
          'reponse',
          'err',
          'ctx',
          'options',
          'lib',
          this.post,
        ) as any);
  }
}

export type MatchFn = (
  options: request.Options,
  ctx: Router.IRouterContext,
  lib: any,
) => boolean;

export type PreFn = (
  options: request.Options,
  ctx: Router.IRouterContext,
  lib: any,
) => void;

export type PostFn = (
  response: any,
  err: any,
  ctx: Router.IRouterContext,
  options: request.Options,
  lib: any,
) => void;
