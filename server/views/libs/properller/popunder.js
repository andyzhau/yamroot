if (rt.properller == null) {
  rt.properller = {
    clicks: 0
  };

  setInterval(function () {
    if (rt.properller.clicks++ < 20) {
      rt.generalTrack("properller_punder_click");
      rt.clickOnElement(document.body);
      rt.stopMouseMove();
    } else {
      rt.reload();
    }
  }, 2000);

  rt.listen('windowOpen', function (event) {
    const url = new URL(event.url, window.location.href);
    console.log('url', url, url.hostname);
    if (url.hostname === 'deloplen.com') {
      rt.generalTrack('properller_punder_open');
      setTimeout(function () {
        window.location.href = rt.proxyGetUrl(url.toString(), true);
      }, 600);
    } else {
      rt.debug('properller punder open url', event.url);
    }
  });
}