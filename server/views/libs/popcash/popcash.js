if (rt.popcash == null) {
  rt.popcash = {
    clicks: 0,
    opened: false
  };

  setInterval(function() {
    if (!rt.popcash.opened && rt.popcash.clicks++ < 10) {
      rt.generalTrack("popcash_click");
      rt.clickOnElement(document.body);
      rt.stopMouseMove();
    }
  }, 2000);

  setTimeout(function() {
    console.log('redispatch')
    rt.reDispatch();
  }, 8000);

  rt.listen('xmlHttpRequestOpen', function(event) {
    if (event.url === 'https://dcba.popcash.net/znWaa3gu') {
      event.url = rt.proxyGetUrl(event.url, true);
      rt.generalTrack('popcash_dcba_requested');
    }
  });

  rt.listen('windowOpen', function(event) {
    if (event.url === 'about:blank') {
      return;
    }

    try {
      const url = new URL(event.url);
      if (url.hostname === 'ps.popcash.net') {
        rt.generalTrack('popcash_opened', false, {
          url: event.url,
        });
        rt.createIFrame(rt.proxyGetUrl(event.url, true), "rt-view-iframe");
        rt.popcash.opened = true;
      } else {
        rt.debug('popcash open unknown url', event.url);
        rt.reDispatch();
      }
    } catch (e) {}
  });
}
