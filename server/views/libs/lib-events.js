if (rt.events == null) {
  rt.events = {};

  rt.listen = function (event, fn) {
    rt.events[event] = rt.events[event] || [];
    rt.events[event].push(fn);
  };

  rt.emit = function (event, data) {
    const listeners = rt.events[event];
    if (listeners == null) {
      return;
    }
    for (var i = 0; i < listeners.length; i++) {
      listeners[i](data);
    }
  };
}