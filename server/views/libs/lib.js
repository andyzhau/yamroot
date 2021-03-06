if (window.top !== window.self) {
  window.top.postMessage('RT_SETUP', '*');
} else {
  window.addEventListener('message', function(event) {
    if (event.data === 'RT_SETUP') {
      rt.verbose('[Setup Sub Window]', event);
      event.source.rt = window.rt;
      window.rt.setupWindow(event.source);
      rt.verbose('[Setup Sub Window Finished]', event);
    }
  });
}

if (window.rt == null) {
  rt = {};
  rt.scriptContents = {};
  rt.scriptId = 0;

  rt.regScriptResponse = function regScriptResponse(scriptId, content) {
    rt.scriptContents[scriptId] = atob(content);
  };

  rt.tracking = {};
  rt.domain = "localhost:5001";
  rt.tracked = {};
  rt.initTime = new Date();

  rt.reDispatch = function reDispatch() {
    setTimeout(function() {
      console.log('redispatch', 'http://' + rt.domain + '/trackings/hub?' + rt.tracking
      .params);
      location.href = 'http://' + rt.domain + '/trackings/hub?' + rt.tracking
        .params;
    }, 50);
  };

  rt.generalTrack = function generalTrack(type, singleton, body) {
    if (singleton && rt.tracked[type] || rt.tracking._id == null) {
      return;
    }
    rt.tracked[type] = true;

    var req = new XMLHttpRequest();
    req.open(
      "POST",
      "//" +
      rt.domain +
      "/trackings/general?type=" +
      type +
      "&" +
      rt.tracking.params
    );
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.onreadystatechange = function() {
      if (req.readyState === 4) {
        if (req.status === 0) {
          rt.error("General track failed type:", type);
        }
      }
    };

    body = body || {};
    body._duration = new Date().getTime() - rt.initTime.getTime();

    req.send(JSON.stringify(body));

    console.log('[Details] ' + '[' + type + ']', body);
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

  rt.createIFrame = function createIFrame(src, classes) {
    const iframe = document.createElement("iframe");
    iframe.src = src;
    iframe.setAttribute('sandbox',
      'allow-forms allow-same-origin allow-scripts');
    if (classes != null) {
      $$(iframe).addClass(classes);
    }
    document.body.appendChild(iframe);
    return iframe;
  };

  rt.open = function open(src, iframe) {
    if (iframe) {
      rt.createIFrame(src);
    } else {
      window.location.href = src;
    }
  };

  rt.proxy = function request(options, cb) {
    var req = new XMLHttpRequest();
    req.open("POST", "//" + rt.domain + "/trackings/proxy");
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.onreadystatechange = function() {
      if (req.readyState === 4) {
        return cb(
          options.json ? JSON.parse(req.responseText) : req.responseText
        );
      }
    };
    req.send(JSON.stringify(options));
  };

  rt.randomDelay = function randomDelay(a, b, fn) {
    setTimeout(fn, a + Math.random() * (b - a));
  };

  rt.pick = function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  if (window.onRtReady) {
    window.onRtReady(rt);
  }
}
