import * as url from 'url';
import * as cheerio from 'cheerio';
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
            .join('') + '.' + configs.app.proxyHost
        : configs.app.proxyHost);
    const nUrl = new url.URL('/proxy', nHost);
    nUrl.searchParams.append('url', urlEncoded);
    if (options.noRedirect) {
      nUrl.searchParams.append('noredirect', 'true');
    }
    if (options.inject) {
      nUrl.searchParams.append('inject', 'true');
    }
    return nUrl.toString();
  }

  cheerio = cheerio;

  libUrl = `http://${configs.app.domain}/trackings/lib.js`;

  url = url;

  isTrackingUrl(link: string) {
    try {
      const linkUrl = new url.URL(link);
      return linkUrl.pathname === '/proxy';
    } catch (e) {
      return false;
    }
  }

  rootFromReferer(referer: string) {
    try {
      return new url.URL(
        Buffer.from(
          new url.URL(referer).searchParams.get('url'),
          'base64',
        ).toString(),
      );
    } catch (e) {
      /* handle error */
      return null;
    }
  }

  relativePath(path1: url.Url, path2: url.Url) {
    const parts1 = path1.pathname.split('/');
    const parts2 = path2.pathname.split('/');
    while (parts1.length > 1 && parts2.length > 1 && parts1[0] === parts2[0]) {
      parts1.splice(0, 1);
      parts2.splice(0, 1);
    }
    for (let i = 1; i < parts1.length; i++) {
      parts2.splice(0, 0, '..');
    }
    return parts2.join('/');
  }
}

export const lib = new Lib();

export interface ProxyGetUrlOptions {
  noRedirect?: boolean;
  inject?: boolean;
}
