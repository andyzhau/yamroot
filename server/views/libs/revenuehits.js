if (rt.revenuehits == null) {
  rt.revenuehits = {
    ads: [],
  };

  rt.onScriptLoad(function (script, content) {
    if (script.src.indexOf('adServe/banners/findBanner') >= 0) {
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

  setTimeout(function () {
    console.log('[Revenuehits] Rendered Ads: ' + rt.revenuehits.ads.length);
    for (var i = 0; i < rt.revenuehits.ads.length; i++) {
      rt.generalTrack('revenuehits_adrendered');
      const ad = rt.revenuehits.ads[i];
      if (Math.random() < 0.13 ||  document.location.search.indexOf('revenuehitsclick') >= 0) {
        console.log('click ad', ad.url);
        rt.generalTrack('revenuehits_adclicked');
        rt.createIFrame(ad.url);
      }
    }
  }, 5000);
}
