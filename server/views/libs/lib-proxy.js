if (rt.isProxyUrl == null) {

  rt.constructUrl = function constructUrl(src) {
    if (src === 'http://' || src === 'https://') {
      return src;
    }

    const protocol =
      document.location.protocol === "about:" ?
      "http:" :
      document.location.protocol;
    src = src.startsWith("//") ? protocol + src : src;
    return document.location.origin == "null" || document.location.origin ==
      "" ?
      new URL(src) :
      new URL(src, document.location.origin);
  };

  rt.encodeSrcUrl = function encodeSrcUrl(src, force) {
    if (rt.isProxyUrl(src)) {
      return src;
    }
    try {
      const url = rt.constructUrl(src);
      var target = url.toString();
      if (
        url.hostname !== "www.google-analytics.com" &&
        url.hostname !== "ajax.googleapis.com" &&
        url.origin !== document.location.origin &&
        src !== "about:blank"
      ) {
        target = rt.proxyGetUrl(url.toString(), force);
      }
      return target;
    } catch (e) {
      rt.warn("failed to create url", e, src, document.location.origin);
      return src;
    }
  };

  rt.decodeSrcUrl = function decodeSrcUrl(src) {
    if (src === "") {
      return src;
    }

    try {
      const url = new URL(src, document.location.origin);
      if (
        url.pathname.startsWith("/proxy")
      ) {
        const origSrc = rt.decodeProxyGetUrl(url.toString());
        return origSrc;
      } else {
        return src;
      }
    } catch (e) {
      rt.error("failed to decode url", e.message, e.stack, src);
      return src;
    }
  };

  rt.isProxyUrl = function isProxyUrl(src) {
    try {
      const url = rt.constructUrl(src);
      return url.pathname.startsWith("/trackings/proxy");
    } catch (e) {
      return false;
    }
  };

  rt.proxyGetUrl = function proxyGetUrl(url, force) {
    try {
      const u = new URL(url, location.href);
      if (!force && (
        u.hostname === "paibopse.com" ||
        u.hostname === "google.com" ||
        u.hostname === "remtoaku.net" ||
        u.hostname === "wachipho.net" ||
        u.hostname === "e2ertt.com" ||
        u.hostname === "deloplen.com" ||
        u.hostname === "www.google.com" ||
        u.hostname === "agreensdistra.info"
      )) {
        return url;
      }
      if (force || url.indexOf("adServe") >= 0 ||
        url.indexOf("mycdn.co") >= 0 ||
        url.indexOf("oc_ndcym") >= 0
      ) {
        const host = rt.domain.indexOf('localhost') === -1 ?
          u.host.replace(/\./g, '_').split('').reverse().join('') +
          '.p.yamroot.com' :
          rt.domain;
        return (
          "//" +
          host +
          "/proxy?url=" +
          btoa(url) +
          "&" +
          rt.tracking.params
        );
      }
    } catch (e) {}
    return url;
  };

  rt.decodeProxyGetUrl = function decodeProxyGetUrl(url) {
    const v = new URL(url, document.location.origin);
    return atob(v.searchParams.get("url"));
  };

  dnsMap = {};

  rt.dns = function resolveDNS(host, cb) {
    if (dnsMap[host] != null) {
      return cb(dnsMap[host]);
    }
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      if (req.readyState === 4) {
        dnsMap[host] = req.responseText || host;
        return cb(dnsMap[host]);
      }
    };
    req.open("GET", "//" + rt.domain + "/proxy/dns?host=" + host);
    req.send();
  };

  rt.getResponse = function getResponse(path, cb) {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      if (req.readyState === 4) {
        return cb(req.responseText);
      }
    };
    req.open("GET", "//" + rt.domain + "/trackings" + path);
    req.send();
  };
}