if (window.rt == null) {
  window.rt = {};

  rt.scriptLoadListener = [];
  rt.scriptErrorListener = [];
  rt.documentWriteListener = [];
  rt.appendChildListener = [];
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

  function onDocumentWrite(document) {
    for (var i = 0; i < rt.documentWriteListener.length; i++) {
      rt.documentWriteListener[i](document);
    }
  }

  function onAppendChild(child) {
    for (var i = 0; i < rt.appendChildListener.length; i++) {
      rt.appendChildListener[i](child);
    }
  }

  window.rt.onScriptLoad = function onScriptLoad(fn) {
    rt.scriptLoadListener.push(fn);
  };

  window.rt.onScriptError = function onScriptError(fn) {
    rt.scriptErrorListener.push(fn);
  };

  window.rt.onDocumentWrite = function onDocumentWrite(fn) {
    rt.documentWriteListener.push(fn);
  };

  window.rt.onAppendChild = function onAppendChild(fn) {
    rt.appendChildListener.push(fn);
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
    desc.get = function() {
      return newGetter.apply(this, arguments);
    };
    Object.defineProperty(cls.prototype, name, desc);
  };

  window.rt.injectSetter = function injectSetter(cls, name, fn) {
    const desc = Object.getOwnPropertyDescriptor(cls.prototype, name);
    const oldSetter = desc.set;
    const newSetter = fn(oldSetter);
    desc.set = function() {
      return newSetter.apply(this, arguments);
    };
    Object.defineProperty(cls.prototype, name, desc);
  };

  window.rt.injectMethod(XMLHttpRequest, "open", function(oldFn) {
    return function newFn(method, url) {
      return oldFn.apply(this, arguments);
    };
  });

  window.rt.constructUrl = function constructUrl(src) {
    const protocol =
      document.location.protocol === "about:"
        ? "http:"
        : document.location.protocol;
    src = src.startsWith("//") ? protocol + src : src;
    return document.location.origin == "null" || document.location.origin == ""
      ? new URL(src)
      : new URL(src, document.location.origin);
  };

  window.rt.encodeSrcUrl = function encodeSrcUrl(src) {
    try {
      const url = rt.constructUrl(src);
      var target = url.toString();
      if (
        url.hostname !== "www.google-analytics.com" &&
        url.hostname !== "ajax.googleapis.com" &&
        url.origin !== document.location.origin &&
        src !== "about:blank"
      ) {
        target = rt.proxyGetUrl(url.toString());
      }
      return target;
    } catch (e) {
      rt.log("failed to create url", e, src, document.location.origin);
      return src;
    }
  };

  window.rt.decodeSrcUrl = function decodeSrcUrl(src, log) {
    if (src === "") {
      return src;
    }

    try {
      const url = new URL(src, document.location.origin);
      if (log) {
        rt.debug('what is origin', url.origin, document.location.origin, url.origin === document.location.origin, url.pathname, url.pathname.startsWith("/trackings/proxy-get"));
      }
      if (
        url.origin === document.location.origin &&
        url.pathname.startsWith("/trackings/proxy-get")
      ) {
        const origSrc = rt.decodeProxyGetUrl(url.toString());
        if (log) {
          rt.debug('and origSrc', origSrc);
        }
        return origSrc;
      } else {
        return src;
      }
    } catch (e) {
      rt.error("failed to decode url", e.message, e.stack, src, new URL(src, document.location.origin), new URL(src, document.location.origin).search, new URL(src, document.location.origin).searchParams);
      return src;
    }
  };

  window.rt.injectGetter(HTMLScriptElement, "src", function(oldFn) {
    return function newFn() {
      const src = oldFn.call(this);
      const target = rt.decodeSrcUrl(src, this.id === 'rh_tag_BANNER_346864_677269_0');
      if (this.id === 'rh_tag_BANNER_346864_677269_0') {
        window.rt.debug('we are reaching the result', src, target, document.location.origin);
        // console.log('bbbbbbbbb???????????????????????', src, target)
      }
      // if (src !== target) {
      //   console.log("get script src", src, "->", target);
      // }
      return target;
    };
  });

  window.rt.injectSetter(HTMLScriptElement, "src", function(oldFn) {
    return function newFn(src) {
      var target = rt.encodeSrcUrl(src);
      const script = this;
      if (rt.isProxyUrl(target)) {
        target = target + "&rtsid=" + rt.scriptId;
        this._rtsid = rt.scriptId++;
        rt.log("[Script]", src, "->", target);
      }

      if (!this._setRtListener) {
        this.addEventListener("load", function() {
          onScriptLoad(script);
        });
        this.addEventListener("error", function() {
          onScriptError(script);
        });
        this._setRtListener = true;
      }
      return oldFn.call(this, target);
    };
  });

  window.rt.injectGetter(HTMLIFrameElement, "src", function(oldFn) {
    return function newFn() {
      const src = oldFn.call(this);
      const target = rt.decodeSrcUrl(src);
      return target;
    };
  });

  window.rt.injectSetter(HTMLIFrameElement, "src", function(oldFn) {
    return function newFn(src) {
      var target = rt.encodeSrcUrl(src);
      if (rt.isProxyUrl(target)) {
        target = target + "&noredirect=true";
        rt.log("[IFrame]", src, "->", target);
      }
      return oldFn.call(this, target);
    };
  });

  window.rt.injectSetter(HTMLLinkElement, "href", function(oldFn) {
    return function newFn(src) {
      const target = rt.encodeSrcUrl(src);
      if (rt.isProxyUrl(target)) {
        rt.log("[Link]", src, "->", target);
      }
      return oldFn.call(this, target);
    };
  });

  window.rt.injectGetter(HTMLAnchorElement, "href", function(oldFn) {
    return function newFn() {
      const href = oldFn.call(this);
      const target = rt.decodeSrcUrl(href);
      // if (href !== target) {
      //   console.log("get anchor href", href, "->", target);
      // }
      // console.log("get anchor href", href, "->", target);
      return target;
    };
  });

  window.rt.injectGetter(HTMLAnchorElement, "origin", function(oldFn) {
    return function newFn() {
      const href = this.href;
      try {
        return new URL(href).origin;
      } catch (e) {
        return oldFn.call(this);
      }
    };
  });

  window.rt.injectGetter(HTMLAnchorElement, "host", function(oldFn) {
    return function newFn() {
      const href = this.href;
      try {
        return new URL(href).host;
      } catch (e) {
        return oldFn.call(this);
      }
    };
  });

  window.rt.injectGetter(HTMLAnchorElement, "hostname", function(oldFn) {
    return function newFn() {
      const href = this.href;
      try {
        return new URL(href).hostname;
      } catch (e) {
        return oldFn.call(this);
      }
    };
  });

  window.rt.injectGetter(HTMLAnchorElement, "search", function(oldFn) {
    return function newFn() {
      const href = this.href;
      try {
        return new URL(href).search;
      } catch (e) {
        return oldFn.call(this);
      }
    };
  });

  window.rt.injectSetter(HTMLAnchorElement, "href", function(oldFn) {
    return function newFn(src) {
      var target = rt.encodeSrcUrl(src);
      if (rt.isProxyUrl(target) && src !== target) {
        rt.log("[Anchor]", src, "->", target);
      } else {
        target = src;
      }
      const result = oldFn.call(this, target);
      return result;
    };
  });

  window.rt.injectSetter(HTMLImageElement, "src", function(oldFn) {
    return function newFn(src) {
      const target = rt.encodeSrcUrl(src);
      if (rt.isProxyUrl(target)) {
        rt.log("[Image]", src, "->", target);
      }
      return oldFn.call(this, target);
    };
  });

  window.rt.injectMethod(HTMLElement, "createElement", function(oldFn) {
    return function createElement() {
      rt.log("[HTMLElement.createElement]", arguments);
      return oldFn.apply(this, arguments);
    };
  });

  window.rt.injectMethod(Element, "getAttribute", function (oldFn) {
    return function getAttribute(name) {
      var ret = oldFn.apply(this, arguments);
      if ((name === 'href' || name === 'src') && rt.isProxyUrl(ret)) {
        ret = rt.decodeSrcUrl(ret);
      }
      return ret;
    };
  });

  window.rt.injectMethod(Document, "write", function(oldFn) {
    return function write(content) {
      const original = content;
      const all = content.match(/(href|src)="([^'"]+)"/g);
      const replaces = [];
      if (all != null) {
        for (var i = 0; i < all.length; i++) {
          const match = all[i].match(/(href|src)="([^'"]+)"/);
          if (match != null && match[2]) {
            const target = rt.encodeSrcUrl(match[2]);
            if (target != match[2]) {
              replaces.push({ orig: match[2], target });
            }
          }
        }
      }
      for (var i = 0; i < replaces.length; i++) {
        const orig = replaces[i].orig,
          target = replaces[i].target;
        for (var j = 0; j < 100; j++) {
          content = content.replace(orig, target);
          if (content.indexOf(orig) === -1) {
            break;
          }
        }
      }
      content = content.replace(/target="_blank"/g, "");
      rt.log("[Document.write]", original, replaces);
      const result = oldFn.call(this, content);
      onDocumentWrite(this);
      return result;
    };
  });

  window.rt.injectMethod(Node, "appendChild", function(oldFn) {
    return function appendChild(child) {
      rt.log("[AppendChild]", child);
      var result = oldFn.call(this, child);

      if (child instanceof HTMLIFrameElement) {
        try {
          const s1 = document.createElement("script");
          s1.src =
            "https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js";
          child.contentWindow.document.head.appendChild(s1);
          const s2 = document.createElement("script");
          s2.src =
            "//" +
            rt.domain +
            "/trackings/lib.js?" +
            rt.tracking.params;
          child.contentWindow.document.head.appendChild(s2);
        } catch (e) {
          console.error(e);
        }
      }

      onAppendChild(child);

      return result;
    };
  });

  window.rt.isProxyUrl = function isProxyUrl(src) {
    try {
      const url = rt.constructUrl(src);
      return url.pathname.startsWith("/trackings/proxy");
    } catch (e) {
      return false;
    }
  };

  window.rt.log = function log() {
    if (rt.saveLog) {
      var req = new XMLHttpRequest();
      req.open("POST", "//" + rt.domain + "/trackings/log?level=info&" + rt.tracking.params);
      req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      req.send(JSON.stringify([].slice.call(arguments)));  
    }
    console.log.apply(console, arguments);
  }

  window.rt.debug = function debug() {
    var req = new XMLHttpRequest();
    req.open("POST", "//" + rt.domain + "/trackings/log?level=debug&" + rt.tracking.params);
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.send(JSON.stringify([].slice.call(arguments)));  
    console.log.apply(console, arguments);
  }

  window.rt.error = function error() {
    var req = new XMLHttpRequest();
    req.open("POST", "//" + rt.domain + "/trackings/log?level=error&" + rt.tracking.params);
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.send(JSON.stringify([].slice.call(arguments)));  
    console.error.apply(console, arguments);
  }

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
rt.domain = "localhost:5001";
rt.saveLog = Math.random() < 0.1;

rt.generalTrack = function generalTrack(type) {
  var req = new XMLHttpRequest();
  req.open(
    "GET",
    "//" +
      rt.domain +
      "/trackings/general?type=" +
      type +
      "&" +
      rt.tracking.params
  );
  req.onreadystatechange = function() {
    if (req.readyState === 4) {
      if (req.status === 0) {
        rt.error('General track failed type:', type);
      }
    }
  };

  req.send();
};

rt.createScript = function createScript(src) {
  const script = document.createElement("script");
  script.src = src;
  if (document.currentScript) {
    document.currentScript.parentNode.insertBefore(
      script,
      document.currentScript.nextSibling
    );
  } else {
    document.body.appendChild(script);
  }
};

rt.createIFrame = function createIFrame(src) {
  const iframe = document.createElement("iframe");
  iframe.src = src;
  document.body.appendChild(iframe);
};

rt.proxyGetUrl = function proxyGetUrl(url) {
  return (
    "//" +
    rt.domain +
    "/trackings/proxy-get?url=" +
    btoa(url) +
    "&" +
    rt.tracking.params
  );
};

rt.decodeProxyGetUrl = function decodeProxyGetUrl(url) {
  const v = new URL(url, document.location.origin);
  return atob(v.searchParams.get("url"));
};

rt.proxy = function request(options, cb) {
  var req = new XMLHttpRequest();
  req.open("POST", "//" + rt.domain + "/trackings/proxy");
  req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  req.onreadystatechange = function() {
    if (req.readyState === 4) {
      return cb(options.json ? JSON.parse(req.responseText) : req.responseText);
    }
  };
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
  };
  req.open("GET", "//" + rt.domain + "/trackings/dns?host=" + host);
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

rt.replaceLinks = function replaceLinks(text, cb) {
  var x = /\/\/[-a-zA-Z0-9@:%._\+~#=]+\//g,
    y = /\/\/([-a-zA-Z0-9@:%._\+~#=]+)\//,
    ss = text.match(x),
    s,
    t,
    at = {},
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

rt.generalTrack("_adskin_");

if (window.onRtReady) {
  window.onRtReady(rt);
}

window.onerror = function(message, source, lineno, colno, error) {
  console.error(message, source, lineno, colno, error);
  rt.error(message, source, lineno, colno, error);
}
