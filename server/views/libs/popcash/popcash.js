if (rt.popcash == null) {
  rt.popcash = {
    clicks: 0
  };

  setInterval(function () {
    if (rt.popcash.clicks++ < 20) {
      rt.generalTrack("popcash__click");
      rt.clickOnElement(document.body);
      rt.stopMouseMove();
    }
  }, 2000);

  rt.listen('xmlHttpRequestOpen', function (event) {
    if (event.url === 'https://dcba.popcash.net/znWaa3gu') {
      event.url = rt.proxyGetUrl(event.url, true);
      rt.generalTrack('popcash_dcba_requested');
    }
  });

  rt.listen('windowOpen', function (event) {
    try {
      const url = new URL(event.url);
      if (url.hostname === 'ps.popcash.net') {
        rt.generalTrack('popcash_opened', false, {
          url: event.url,
        });
          rt.createIFrame(rt.proxyGetUrl(event.url, true), "rt-view-iframe");
      } else {
        rt.debug('popcash open unknown url', event.url);
      }
    } catch (e) {}
  });
}
