/*
 * params:
 *   sp=0 to disable hiding parameters;
 */
if (rt.config == null) {
  rt.config = {};
  rt.location = new URL(location.href);

  rt.paramToBoolean = function paramToBoolean(val, defaultValue) {
    return val == null ? defaultValue : val === 'true' || val === '1';
  };

  rt.hideConfig = function hideConfig() {
    if (history) {
      history.replaceState({
        sp: true
      }, $(document).find("title").text(), rt.location.pathname);
    }
  };

  rt.reload = function reload() {
    setTimeout(function () {
      rt.location.searchParams.set('seq', (rt.tracking.seq + 1).toString());
      location.href = rt.location.toString();
    }, 200);
  };

  if (rt.paramToBoolean(rt.location.searchParams.get('sp'), true)) {
    rt.hideConfig();
  }
}
