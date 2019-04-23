if (rt.revenuehits == null) {
  rt.revenuehits = {
    ads: [],
    iframes: [],
    setTestImage: false,
    installWindowOpened: 0,
    ctr: Number.parseFloat(rt.location.searchParams.get('revenuehits_ctr') ||
      '0.05'),
    openedIframe: null
  };

  rt.listen('appendChild', function(event) {
    const child = event.child;
    if (child instanceof HTMLIFrameElement && child.z === 1) {
      rt.revenuehits.iframes.push(child);
    }
  });

  rt.listen('setAttributes', function(event) {
    if (event.value.indexOf('chrome') >= 0) {
      if (rt.revenuehits.installWindowOpened === 1) {
        rt.generalTrack("revenuehits_button_install_window_opened", true);
      }
      rt.revenuehits.installWindowOpened++;
      setTimeout(function() {
        rt.revenuehits.setTestImage = true;
      }, 5000 + 3000 * Math.random());

      if (rt.revenuehits.setTestImage) {
        rt.generalTrack("revenuehits_installed", true);
        event.value =
          'data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==';
      }
    }
  });

  rt.listen('windowOpen', function(event) {
    const url = event.url;
    rt.info("[revenuehits] window open", event);
    const e = new Error();
    console.log(e.stack);
    if (url.indexOf("adServe") >= 0) {
      rt.generalTrack("revenuehits_adclicked");
      rt.revenuehits.openedIframe = rt.createIFrame(url, "rt-view-iframe");
      if (Math.random() < 0.5) {
        setInterval(function() {
          const buttons = $$(rt.revenuehits.openedIframe).contents().find(
            '[class*="btn"],[class*="button"]');
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

  rt.listen('scriptLoaded', function(event) {
    console.log('script loaded', event);
    if (event.script.src.indexOf("adServe/banners/findBanner") >= 0) {
      const match = event.content.match(/^\w+\((.*)\)/);
      if (match) {
        try {
          const ads = JSON.parse(match[1]);
          rt.revenuehits.ads.push.apply(rt.revenuehits.ads, ads.ads);
        } catch (e) {
          console.error(e);
        }
      }
      rt.info('[Revenuehits] FindBanner script loaded, #ads:', rt.revenuehits
        .ads.length);
    }
  });

  function clickAds() {
    const $links = $$(".it-client > iframe")
      .contents()
      .find("a");
    rt.info("[Revenuehits] Links", $links.length);
    const target = rt.pick($links);
    if (Math.random() < rt.revenuehits.ctr) {
      rt.clickOnElement(target);
    }
  }

  rt.randomDelay(3000, 5000, clickAds);

  document.onmousedown = function () {
    console.log('onmousedown');
  };
  document.onmouseup = function () {
    console.log('onmouseup');
  };
  document.onclick = function () {
    console.log('onclick');
  }
}
