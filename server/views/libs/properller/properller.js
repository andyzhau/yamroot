if (rt.properller == null) {
  rt.properller = {
    iframes: {},
    seenAd: false,
    renderTriggered: false,
  };

  setInterval(function () {
    if (rt.properller.seenAd) {
      rt.generalTrack("properller_punder_click");
      var clickEvent = document.createEvent("MouseEvents");
      clickEvent.initEvent("mousedown", true, true);
      window.document.body.dispatchEvent(clickEvent);  
    }
  }, 2000);

  rt.onAppendChild(function(child) {
    if (
      child instanceof HTMLIFrameElement &&
      (child.src.indexOf("remtoaku.net") >= 0 ||
        child.src.indexOf("wachipho.net") >= 0)
    ) {
      if (rt.properller.renderTriggered === false) {
        rt.generalTrack("properller_punder_rendered");
        rt.properller.renderTriggered = true;
      }
      rt.properller.iframes[child.src] = true;
      rt.properller.seenAd = true;
    }
  });

  rt.onWindowOpen(function(url, windowName, windowFeatures) {
    url = new URL(url, window.location.href).toString();
    if (url === 'https://www.google.com/favicon.ico') {
      rt.properller.seenAd = false;
    }
    if (rt.properller.iframes[url]) {
      rt.properller.seenAd = false;
      rt.generalTrack("properller_punder_open");
      setTimeout(function() {
        top.window.location.href = url;
      }, 600);
    }
  });
}