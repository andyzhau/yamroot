import * as Router from 'koa-router';
import * as _ from 'underscore';
import * as dns from 'dns';
import * as fs from 'fs';
import * as models from '../models';
import * as path from 'path';
import * as request from 'request-promise';
import * as url from 'url';

import { A7Controller, Config, Get, Post } from '@nodeswork/sbase/koa';

import { lib } from './libs';

const files = {
  uiTag75: fs.readFileSync(
    path.join(__dirname, '../views/libs/revenuehits/resources/ui_tag_75-1.js'),
  ),
  bundle: fs.readFileSync(
    path.join(__dirname, '../views/libs/revenuehits/resources/bundle.js'),
  ),
  bounceTag: fs.readFileSync(
    path.join(
      __dirname,
      '../views/libs/revenuehits/resources/bounce_tag_75-1.js',
    ),
  ),
  rhpop: fs.readFileSync(
    path.join(__dirname, '../views/libs/revenuehits/resources/rhpop_75-1.js'),
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
  prefix: '/proxy',
})
class ProxyController extends A7Controller {
  @Get('/')
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
        k !== 'channel' &&
        k !== 'seq'
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
    options.headers['X-Forwarded-For'] = ctx.ip;
    options.headers['X-Real-Ip'] = ctx.ip;
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
          rulesApplied.push(rule);
        }
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
    if (ctx.forUrl.toString().indexOf('bounce-tag_75-1') >= 0) {
      ctx.body = files.bounceTag;
    }
    if (ctx.forUrl.toString().indexOf('rhpop_75-1') >= 0) {
      ctx.body = files.rhpop;
    }

    ctx.set('applied-rules', _.map(rulesApplied, r => r.name).join(';'));
    ctx.set('error-rules', _.map(ruleErrors, r => r.name).join(';'));
  }

  @Post('/')
  async proxyPost(ctx: Router.IRouterContext) {
    const options = ctx.request.body;

    options.headers = options.headers || {};
    options.headers['X-Forwarded-For'] = ctx.ip;
    options.headers['X-Real-Ip'] = ctx.ip;

    const result = await request(options);

    ctx.body = result;
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
}

export const proxyController = new ProxyController();
