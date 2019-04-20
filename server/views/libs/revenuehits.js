if (rt.revenuehits == null) {
  rt.revenuehits = {
    ads: [],
    iframes: [],
    setTestImage: false,
    installWindowOpened: 0,
    openedIframe: null
  };

  rt.onAppendChild(function(child) {
    if (child instanceof HTMLIFrameElement && child.z === 1) {
      rt.revenuehits.iframes.push(child);
    }
  });

  rt.onSetAttributes(function(element, options) {
    if (options.value.indexOf('chrome') >= 0) {
      if (rt.revenuehits.installWindowOpened === 1) {
        rt.generalTrack("revenuehits_button_install_window_opened", true);
      }
      rt.revenuehits.installWindowOpened++;
      setTimeout(function () {
        rt.revenuehits.setTestImage = true;
      }, 5000 + 3000 * Math.random());

      if (rt.revenuehits.setTestImage) {
        rt.generalTrack("revenuehits_installed", true);
        options.value = 'data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==';
      }
    }
  });

  rt.onWindowOpen(function(url) {
    if (url.indexOf("adServe") >= 0) {
      rt.generalTrack("revenuehits_adclicked");
      rt.revenuehits.openedIframe = rt.createIFrame(url, "rt-view-iframe");
      if (Math.random() < 0.5) {
        setInterval(function () {
          const buttons = $$(rt.revenuehits.openedIframe).contents().find('[class*="btn"],[class*="button"]');
          if (buttons.length && rt.revenuehits.installWindowOpened <= 1) {
            rt.generalTrack("revenuehits_button_found");
            const b = buttons[Math.floor(Math.random() * buttons.length)];
            var clickEvent = document.createEvent("MouseEvents");
            clickEvent.initEvent("click", true, true);
            b.dispatchEvent(clickEvent);
          }
        }, 1000);  
      }
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
          Math.random() < 0.05 ||
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
