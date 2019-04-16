if (window.rt == null) {
  window.rt = {};

  rt.scriptLoadListener = [];
  rt.scriptErrorListener = [];
  rt.scriptContents = {};
  rt.scriptId = 0;

  rt.regScriptResponse = function regScriptResponse(scriptId, content) {
    rt.scriptContents[scriptId] = atob(content);
  };

  function onScriptLoad(script) {
    const content = rt.scriptContents[script._rtsid];
    for (var i = 0; i < rt.scriptLoadListener.length; i++) {
      rt.scriptLoadListener[i](script, content);
    }
  }

  function onScriptError(script) {
    for (var i = 0; i < rt.scriptErrorListener.length; i++) {
      rt.scriptErrorListener[i](script);
    }
  }

  window.rt.onScriptLoad = function onScriptLoad(fn) {
    rt.scriptLoadListener.push(fn);
  };

  window.rt.onScriptError = function onScriptError(fn) {
    rt.scriptErrorListener.push(fn);
  };

  window.rt.injectMethod = function injectMethod(cls, method, fn) {
    const oldFn = cls.prototype[method];
    const newFn = fn(oldFn);
    cls.prototype[method] = function() {
      return newFn.apply(this, arguments);
    };
  };

  window.rt.injectGetter = function injectGetter(cls, name, fn) {
    const desc = Object.getOwnPropertyDescriptor(cls.prototype, name);
    const oldGetter = desc.get;
    const newGetter = fn(oldGetter);
    desc.get = function () {
      return newGetter.apply(this, arguments);
    };
    Object.defineProperty(cls.prototype, name, desc);
  };

  window.rt.injectSetter = function injectSetter(cls, name, fn) {
    const desc = Object.getOwnPropertyDescriptor(cls.prototype, name);
    const oldSetter = desc.set;
    const newSetter = fn(oldSetter);
    desc.set = function () {
      return newSetter.apply(this, arguments);
    };
    Object.defineProperty(cls.prototype, name, desc);
  };

  window.rt.injectMethod(XMLHttpRequest, 'open', function (oldFn) {
    return function newFn() {
      console.log('open', arguments);
      return oldFn.apply(this, arguments);
    };
  });

  window.rt.encodeSrcUrl = function encodeSrcUrl(src) {
    try {
      const url = new URL(src.startsWith('//') ? document.location.protocol + src : src, document.location.origin);
      var target = url.toString();
      if (url.hostname !== 'www.google-analytics.com' && url.origin !== document.location.origin) {
        target = rt.proxyGetUrl(url.toString());
      }
      return target;
    } catch (e) {
      console.log('failed to create url', e, src);
      return src;
    }
  };

  window.rt.decodeSrcUrl = function decodeSrcUrl(src) {
    if (src === '') {
      return src;
    }

    try {
      const url = new URL(src, document.location.origin);
      if (url.origin === document.location.origin && url.pathname.startsWith('/trackings/proxy-get')) {
        const origSrc = rt.decodeProxyGetUrl(url.toString());
        return origSrc;
      } else {
        return src;
      }
    } catch (e) {
      console.error('failed to decode url', e, src);
      return src;
    }
  };

  window.rt.injectGetter(HTMLScriptElement, 'src', function (oldFn) {
    return function newFn() {
      const src = oldFn.call(this);
      const target = rt.decodeSrcUrl(src);
      if (src !== target) {
        console.log('get script src', src, '->', target);
      }
      return target;
    };
  });

  window.rt.injectSetter(HTMLScriptElement, 'src', function (oldFn) {
    return function newFn(src) {
      var target = rt.encodeSrcUrl(src);
      const script = this;
      if (rt.isProxyUrl(target)) {
        target = target + '&rtsid=' + rt.scriptId;
        this._rtsid = rt.scriptId++;
      }
      console.log('set script source', src, '->', target);
      
      if (!this._setRtListener) {
        this.addEventListener('load', function() {
          onScriptLoad(script);
        });
        this.addEventListener('error', function() {
          onScriptError(script);
        });
        this._setRtListener = true;
      }
      return oldFn.call(this, target);
    };
  });

  window.rt.injectSetter(HTMLIFrameElement, 'src', function (oldFn) {
    return function newFn(src) {
      var target = rt.encodeSrcUrl(src);
      console.log('set iframe source', src, '->', target);
      if (rt.isProxyUrl(target)) {
        target = target + '&noredirect=true';
      }
      return oldFn.call(this, target);
    };
  });

  window.rt.injectSetter(HTMLLinkElement, 'href', function (oldFn) {
    return function newFn(src) {
      const target = rt.encodeSrcUrl(src);
      console.log('set script source', src, '->', target);
      return oldFn.call(this, target);
    };
  });

  window.rt.injectSetter(HTMLImageElement, 'src', function (oldFn) {
    return function newFn(src) {
      const target = rt.encodeSrcUrl(src);
      console.log('set image source', src, '->', target);
      return oldFn.call(this, target);
    };
  });

  window.rt.injectMethod(HTMLElement, 'createElement', function (oldFn) {
    return function createElement() {
      console.log('create new element', arguments);
      return oldFn.apply(this, arguments);
    };
  });

  window.rt.injectMethod(Node, 'appendChild', function (oldFn) {
    return function appendChild(child) {
      console.log('append new child', child);
      return oldFn.call(this, child);
    };
  });

  window.rt.isProxyUrl = function isProxyUrl(src) {
    console.log('url', src);
    const url = new URL(src, document.location.origin);
    return url.pathname.startsWith('/trackings/proxy');
  };

  // const oldOnError = Object.getOwnPropertyDescriptor(HTMLElement.prototype,
  //   'onerror'
  // );
  // oldOnError.set = function() {
  //   console.log('set onerror', this);
  //   oldOnError.apply(this, arguments);
  // }
  // Object.defineProperty(HTMLElement.prototype, 'onerror', oldOnError);

  // const oldOnLoad = Object.getOwnPropertyDescriptor(HTMLElement.prototype,
  //   'onload'
  // );
  // const oldOnLoadSet = oldOnLoad.set;
  // oldOnLoad.set = function() {
  //   console.log('set onload', this);
  //   oldOnLoadSet.apply(this, arguments);
  // }
  // Object.defineProperty(HTMLElement.prototype, 'onload', oldOnLoad);

}

rt.tracking = {};
rt.domain = 'localhost:5001';

rt.generalTrack = function generalTrack(type) {
  var req = new XMLHttpRequest();
  req.open("GET", '//' + rt.domain + "/trackings/general?type=" + type +
    "&" + rt.tracking.params);
  req.send();
};

rt.createScript = function createScript(src) {
  const script = document.createElement('script');
  script.src = src;
  if (document.currentScript) {
    document.currentScript.parentNode.insertBefore(script, document.currentScript.nextSibling);
  } else {
    document.body.appendChild(script);
  }
};

rt.createIFrame = function createIFrame(src) {
  const iframe = document.createElement('iframe');
  iframe.src = src;
  document.body.appendChild(iframe);
};

rt.proxyGetUrl = function proxyGetUrl(url) {
  return '//' + rt.domain + '/trackings/proxy-get?url=' + btoa(url);
};

rt.decodeProxyGetUrl = function decodeProxyGetUrl(url) {
  const v = new URL(url, document.location.origin);
  return atob(v.searchParams.get('url'));
};

rt.proxy = function request(options, cb) {
  var req = new XMLHttpRequest();
  req.open('POST', '//' + rt.domain + '/trackings/proxy');
  req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  req.onreadystatechange = function() {
    if (req.readyState === 4) {
      return cb(options.json ? JSON.parse(req.responseText) : req.responseText);
    }
  }
  req.send(JSON.stringify(options));
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
  }
  req.open("GET", '//' + rt.domain + "/trackings/dns?host=" + host);
  req.send();
};

rt.getResponse = function getResponse(path, cb) {
  var req = new XMLHttpRequest();
  req.onreadystatechange = function() {
    if (req.readyState === 4) {
      return cb(req.responseText);
    }
  }
  req.open("GET", '//' + rt.domain + "/trackings" + path);
  req.send();
}

rt.replaceLinks = function replaceLinks(text, cb) {
  var x = /\/\/[-a-zA-Z0-9@:%._\+~#=]+\//g,
    y = /\/\/([-a-zA-Z0-9@:%._\+~#=]+)\//,
    ss = text.match(x),
    s, t, at = {},
    tot = 0;
  if (ss == null) {
    return cb(text);
  }
  for (var i = 0; i < ss.length; i++) {
    s = ss[i];
    t = s.match(y)[1];
    at[t] = 1;
  }

  function calculate() {
    for (var key in at) {
      text = text.replace(new RegExp(key, "g"), at[key]);
    }
    cb(text);
  }

  function resolve(key) {
    tot++;
    rt.dns(key, function(r) {
      at[key] = r;
      tot--;
      if (tot === 0) {
        calculate();
      }
    });
  }

  for (var key in at) {
    resolve(key);
  }
};
