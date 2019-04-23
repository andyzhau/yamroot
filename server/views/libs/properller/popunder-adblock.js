if (rt.properller == null) {
  rt.properller = {
    iframes: {},
    seenAd: false,
    clicks: 0
  };

  setInterval(function () {
    if (rt.properller.seenAd && rt.properller.clicks++ < 20) {
      rt.generalTrack("properller_punder_click");
      rt.clickOnElement(document.body);
      rt.stopMouseMove();
    }
  }, 2000);

  rt.listen('appendChild', function(event) {
    const child = event.child;
    if (child instanceof HTMLIFrameElement && child.src !== 'about:blank') {
      rt.debug('[properller] child source', child.src);
    }
    if (
      child instanceof HTMLIFrameElement &&
      (child.src.indexOf("remtoaku.net") >= 0 ||
        child.src.indexOf("wachipho.net") >= 0)
    ) {
      rt.generalTrack("properller_punder_rendered", true );
      rt.properller.iframes[child.src] = true;
      rt.properller.seenAd = true;
    }
  });

  rt.listen('windowOpen', function(event) {
    const url = new URL(event.url, window.location.href).toString();
    if (url === 'https://www.google.com/favicon.ico') {
      rt.properller.seenAd = false;
      rt.generalTrack("properller_punder_open_google_favicon");
      rt.reload();
    } else if (rt.properller.iframes[url]) {
      rt.properller.seenAd = false;
      rt.generalTrack("properller_punder_open");
      setTimeout(function() {
        top.window.location.href = url;
      }, 600);
    } else {
      rt.generalTrack("properller_punder_open_unknown", false, {
        url: event.url,
      });
    }
  });
}
