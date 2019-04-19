if (rt.revenuehits == null) {
  rt.revenuehits = {
    ads: [],
    iframes: []
  };

  rt.onAppendChild(function(child) {
    if (child instanceof HTMLIFrameElement && child.z === 1) {
      rt.revenuehits.iframes.push(child);
    }
  });

  rt.onWindowOpen(function(url) {
    if (url.indexOf("adServe") >= 0) {
      rt.generalTrack("revenuehits_adclicked");
      rt.createIFrame(url, "rt-view-iframe");
    }
  });

  rt.onScriptLoad(function(script, content) {
    if (script.src.indexOf("adServe/banners/findBanner") >= 0) {
      const match = content.match(/^\w+\((.*)\)/);
      if (match) {
        try {
          const ads = JSON.parse(match[1]);
          rt.revenuehits.ads.push.apply(rt.revenuehits.ads, ads.ads);
        } catch (e) {
          console.error(e);
        }
      }
    }
  });

  setTimeout(function() {
    console.log(
      "[Revenuehits] Rendered Ads: " +
        rt.revenuehits.ads.length +
        ", " +
        rt.revenuehits.iframes.length
    );
    const $links = $$(".it-client > iframe")
      .contents()
      .find("a");
    console.log("[Revenuehits] Links", $links.length);
    for (var i = 0; i < $links.length; i++) {
      const link = $links[i];
      if (link != null) {
        rt.generalTrack("revenuehits_adrendered");
        if (
          Math.random() < 0.03 ||
          document.location.search.indexOf("revenuehitsclick") >= 0
        ) {
          var clickEvent = document.createEvent("MouseEvents");
          clickEvent.initEvent("click", true, true);
          link.dispatchEvent(clickEvent);
        }
      }
    }
  }, 5000);
}
