if (rt.log == null) {
  rt.logLevel = new URL(location.href).searchParams.get('log') || 'warn';
  rt.logLevels = ['verbose', 'info', 'warn', 'error', 'critical', 'debug'];
  
  rt.log = function log(level) {
    if (rt.logLevels.indexOf(level) < rt.logLevels.indexOf(rt.logLevel)) {
      return;
    }
  
    const args = Array.prototype.slice.call(arguments).slice(1);
  
    var req = new XMLHttpRequest();
    req.open(
      "POST",
      "//" + rt.domain + "/trackings/log?level=info&" + rt.tracking.params
    );
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.send(JSON.stringify(args));
  
    console.log.apply(console, args);
  };
  
  rt.verbose = function verbose() {
    rt.log.apply(null, ['verbose'].concat(arguments));
  };
  
  rt.info = function info() {
    rt.log.apply(null, ['info'].concat(arguments));
  };
  
  rt.warn = function warn() {
    rt.log.apply(null, ['warn'].concat(arguments));
  };
  
  rt.error = function error() {
    rt.log.apply(null, ['error'].concat(arguments));
  };
  
  rt.critical = function critical() {
    rt.log.apply(null, ['critical'].concat(arguments));
  };
  
  rt.debug = function debug() {
    rt.log.apply(null, ['debug'].concat(arguments));
  };

  window.onerror = function(message, source, lineno, colno, error) {
    console.error(message, source, lineno, colno, error);
    rt.error(message, source, lineno, colno, error.stack);
  };
}
