if (rt.injection == null) {
  rt.injection = true;
  rt._pendingIframes = [];

  rt.injectMethod = function injectMethod(cls, method, fn) {
    const oldFn = cls.prototype[method];
    const newFn = fn(oldFn);
    cls.prototype[method] = function() {
      return newFn.apply(this, arguments);
    };
  };

  rt.injectGetter = function injectGetter(cls, name, fn) {
    const desc = Object.getOwnPropertyDescriptor(cls.prototype, name);
    const oldGetter = desc.get;
    const newGetter = fn(oldGetter);
    desc.get = function() {
      return newGetter.apply(this, arguments);
    };
    Object.defineProperty(cls.prototype, name, desc);
  };

  rt.injectSetter = function injectSetter(cls, name, fn) {
    const desc = Object.getOwnPropertyDescriptor(cls.prototype, name);
    const oldSetter = desc.set;
    const newSetter = fn(oldSetter);
    desc.set = function() {
      return newSetter.apply(this, arguments);
    };
    Object.defineProperty(cls.prototype, name, desc);
  };

  rt.setupWindow = function setupWindow(win) {
    if (win.rtSetup) {
      return;
    }
    win.rtSetup = true;

    rt.injectMethod(XMLHttpRequest, "open", function(oldFn) {
      return function newFn(method, url) {
        const options = {
          method: method,
          url: url
        };
        rt.emit('xmlHttpRequestOpen', options);
        // rt.verbose("[XMLHttpRequest.open]", method, url);
        return oldFn.apply(this, [options.method, options.url]);
      };
    });

    rt.injectGetter(win.HTMLScriptElement, "src", function(oldFn) {
      return function newFn() {
        const src = oldFn.call(this);
        const target = rt.decodeSrcUrl(src);
        return target;
      };
    });

    rt.injectSetter(win.HTMLScriptElement, "src", function(oldFn) {
      return function newFn(src) {
        var target = rt.encodeSrcUrl(src);
        const script = this;
        if (rt.isProxyUrl(target)) {
          target = target + "&rtsid=" + rt.scriptId;
          this._rtsid = rt.scriptId++;
          rt.verbose("[Script]", src, "->", target);
        }

        if (!this._setRtListener) {
          this.addEventListener("load", function() {
            const content = rt.scriptContents[script._rtsid];
            rt.emit('scriptLoaded', {
              script: script,
              content: content
            });
          });
          this.addEventListener("error", function() {
            rt.emit('scriptLoadError', {
              script: script
            });
          });
          this._setRtListener = true;
        }
        return oldFn.call(this, target);
      };
    });

    rt.injectGetter(win.HTMLIFrameElement, "src", function(oldFn) {
      return function newFn() {
        const src = oldFn.call(this);
        const target = rt.decodeSrcUrl(src);
        return target;
      };
    });

    rt.injectSetter(win.HTMLIFrameElement, "src", function(oldFn) {
      return function newFn(src) {
        var target = rt.encodeSrcUrl(src);
        if (rt.isProxyUrl(target)) {
          target = target + "&noredirect=true&inject=true";
          rt.verbose("[IFrame]", src, "->", target);
        }
        return oldFn.call(this, target);
      };
    });

    rt.injectSetter(win.HTMLLinkElement, "href", function(oldFn) {
      return function newFn(src) {
        const target = rt.encodeSrcUrl(src);
        if (rt.isProxyUrl(target)) {
          rt.verbose("[Link]", src, "->", target);
        }
        return oldFn.call(this, target);
      };
    });

    rt.injectGetter(win.HTMLAnchorElement, "href", function(oldFn) {
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

    rt.injectGetter(win.HTMLAnchorElement, "origin", function(oldFn) {
      return function newFn() {
        const href = this.href;
        try {
          return new URL(href).origin;
        } catch (e) {
          return oldFn.call(this);
        }
      };
    });

    rt.injectGetter(win.HTMLAnchorElement, "host", function(oldFn) {
      return function newFn() {
        const href = this.href;
        try {
          return new URL(href).host;
        } catch (e) {
          return oldFn.call(this);
        }
      };
    });

    rt.injectGetter(win.HTMLAnchorElement, "hostname", function(oldFn) {
      return function newFn() {
        const href = this.href;
        try {
          return new URL(href).hostname;
        } catch (e) {
          return oldFn.call(this);
        }
      };
    });

    rt.injectGetter(win.HTMLAnchorElement, "search", function(oldFn) {
      return function newFn() {
        const href = this.href;
        try {
          return new URL(href).search;
        } catch (e) {
          return oldFn.call(this);
        }
      };
    });

    rt.injectSetter(win.HTMLAnchorElement, "href", function(oldFn) {
      return function newFn(src) {
        var target = rt.encodeSrcUrl(src);
        if (rt.isProxyUrl(target) && src !== target) {
          rt.verbose("[Anchor]", src, "->", target);
        } else {
          target = src;
        }
        const result = oldFn.call(this, target);
        return result;
      };
    });

    rt.injectSetter(win.HTMLImageElement, "src", function(oldFn) {
      return function newFn(src) {
        const target = rt.encodeSrcUrl(src);
        if (rt.isProxyUrl(target)) {
          rt.verbose("[Image]", src, "->", target);
        }
        return oldFn.call(this, target);
      };
    });

    rt.injectMethod(win.Document, "createElement", function(oldFn) {
      return function createElement() {
        rt.verbose.apply(null, ["[Document.createElement]"].concat(
          Array.prototype.slice.call(arguments)));
        return oldFn.apply(this, arguments);
      };
    });

    rt.injectMethod(win.HTMLElement, "createElement", function(oldFn) {
      return function createElement() {
        rt.verbose.apply(null, ["[HTMLElement.createElement]"].concat(
          Array.prototype.slice.call(arguments)));
        return oldFn.apply(this, arguments);
      };
    });

    rt.injectMethod(win.Element, "setAttribute", function(oldFn) {
      return function setAttribute(name, value) {
        var options = {
          name: name,
          value: value
        };
        rt.verbose("[Element.setAttribute]", this, options);
        rt.emit('setAttributes', options);
        return oldFn.call(this, options.name, options.value);
      };
    });

    rt.injectMethod(win.Element, "getAttribute", function(oldFn) {
      return function getAttribute(name) {
        var ret = oldFn.apply(this, arguments);
        if ((name === "href" || name === "src") && rt.isProxyUrl(ret)) {
          ret = rt.decodeSrcUrl(ret);
        }
        return ret;
      };
    });

    rt.injectMethod(win.Document, "write", function(oldFn) {
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
                replaces.push({
                  orig: match[2],
                  target
                });
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
        rt.verbose("[Document.write]", original, replaces);
        const result = oldFn.call(this, content);
        rt.emit('documentWrite', {
          document: this
        });
        return result;
      };
    });

    rt.injectMethod(win.Node, "appendChild", function(oldFn) {
      return function appendChild(child) {
        rt.verbose("[AppendChild]", child);
        var result = oldFn.call(this, child);

        if (child instanceof HTMLIFrameElement) {
          rt._pendingIframes.push(child);
        }

        try {
          for (var i = rt._pendingIframes.length - 1; i >= 0; i--) {
            const iframe = rt._pendingIframes[i];
            if (iframe.contentWindow) {
              if (iframe.contentWindow.rt == null) {
                iframe.contentWindow.$$ = $$;
                iframe.contentWindow.rt = rt;
                rt.setupWindow(iframe.contentWindow);
              }
              if (iframe.contentWindow.rt != null) {
                rt._pendingIframes.splice(i, 1);
              }
            }
          }
        } catch (e) {
          rt.error('append child error', e);
        }

        rt.emit('appendChild', {
          child: child
        });

        return result;
      };
    });

    if (rt.tracking.userAgent && rt.tracking.te === 'hitleap') {
      const codeName = rt.tracking.userAgent.split('/')[0];
      const version = rt.tracking.userAgent.substring(codeName.length + 1);
      rt.injectGetter(win.Navigator, "userAgent", function () {
        return function newFn() {
          return rt.tracking.userAgent;
        }
      });
      rt.injectGetter(win.Navigator, "appCodeName", function () {
        return function newFn() {
          return codeName;
        }
      });
      rt.injectGetter(win.Navigator, "appVersion", function () {
        return function newFn() {
          return version;
        }
      });
    }

    Object.defineProperty(win.Location.prototype, 'rtHref', {
      get: function() {
        const href = this.href;
        return rt.decodeSrcUrl(href);
      },
      set: function(href) {
        var target = rt.encodeSrcUrl(href, true);
        if (rt.isProxyUrl(target)) {
          rt.verbose("[Location.Href]", href, "->", target);
        }
        if (location.href.indexOf('noredirect=true')) {
          target += '&noredirect=true';
        }
        if (location.href.indexOf('inject=true')) {
          target += '&inject=true';
        }
        this.href = target;
      },
    });

    const oldWindowOpen = win.open;

    win.open = function(url, windowName, windowFeatures) {
      rt.verbose("[Window Open]", url, windowName, windowFeatures);
      rt.emit('windowOpen', {
        url: url,
        windowName: windowName,
        windowFeatures: windowFeatures
      });
    };
  };

  rt.setupWindow(window);
}
