window.rt = window.rt || {};

rt.prefix = '';
rt.tracking = {};

rt.generalTrack = function generalTrack(type) {
  var req = new XMLHttpRequest();
  req.open("GET", rt.prefix + "/trackings/general?type=" + type +
    "&" + rt.tracking.params);
  req.send();
};

rt.proxyGetUrl = function proxyGetUrl(url) {
  return rt.prefix + '/trackings/proxy-get?url=' + btoa(url);
}

rt.decodeProxyGetUrl = function decodeProxyGetUrl(url) {
  const v = new URL(url);
  return atob(v.searchParams.get('url'));
}

rt.proxy = function request(options, cb) {
  var req = new XMLHttpRequest();
  req.open('POST', rt.prefix + '/trackings/proxy');
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
  req.open("GET", rt.prefix + "/trackings/dns?host=" + host);
  req.send();
};

rt.getResponse = function getResponse(path, cb) {
  var req = new XMLHttpRequest();
  req.onreadystatechange = function() {
    if (req.readyState === 4) {
      return cb(req.responseText);
    }
  }
  req.open("GET", rt.prefix + "/trackings" + path);
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