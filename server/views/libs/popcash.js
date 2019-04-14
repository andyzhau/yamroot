var wid = "485251";
var uid = "234313";

/* ################################################################################################################## */
!(function() {
  rt.generalTrack("popcashexec");
  var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var c = Math.floor(1e16 * Math.random());
  var code = (function(o) {
    o = escape(o);
    var c, i, t, a, n, d = "",
      s = "",
      r = "",
      p = 0;
    do {
      (t = (c = o.charCodeAt(p++)) >> 2),
      (a = ((3 & c) << 4) | ((i = o.charCodeAt(p++)) >> 4)),
      (n = ((15 & i) << 2) | ((s = o.charCodeAt(p++)) >> 6)),
      (r = 63 & s),
      isNaN(i) ? (n = r = 64) : isNaN(s) && (r = 64),
        (d = d + e.charAt(t) + e.charAt(a) + e.charAt(n) + e.charAt(r)),
        (c = i = s = ""),
        (t = a = n = r = "");
    } while (p < o.length);
    return d;
  })(document.URL);

  var url =
    "http://ps.popcash.net/go/"
    + uid + "/" + wid + "/" + code + "?cb=" + c;

  if (document.URL.indexOf('zone=') >= 0) {
    location.href = url;
  }
})();
