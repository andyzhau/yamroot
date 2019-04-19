import * as url from 'url';
import { configs } from '../configs';

export class Lib {
  proxyGetUrl(src: string, options: ProxyGetUrlOptions = {}) {
    const srcUrl = new url.URL(src);
    const urlEncoded = new Buffer(src).toString('base64');
    const nHost =
      'http://' +
      (configs.app.proxyHost.indexOf('localhost') === -1
        ? srcUrl.hostname
            .replace(/\./g, '_')
            .split('')
            .reverse()
            .join('') + configs.app.proxyHost
        : configs.app.proxyHost);
    const nUrl = new url.URL('/trackings/proxy-get', nHost);
    nUrl.searchParams.append('url', urlEncoded);
    if (options.noRedirect) {
      nUrl.searchParams.append('noredirect', 'true');
    }
    if (options.inject) {
      nUrl.searchParams.append('inject', 'true');
    }
    return nUrl.toString();
  }

  libUrl = `http://${configs.app.domain}/trackings/lib.js`;
}

export const lib = new Lib();

export interface ProxyGetUrlOptions {
  noRedirect?: boolean;
  inject?: boolean;
}
