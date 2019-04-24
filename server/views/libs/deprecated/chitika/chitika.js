if (rt.chitika == null) {
  rt.chitika = {};

  rt.chitika.trackChitika = function trackChitika(type, id) {
    var chitika = false;
    const target = document.getElementById(id);
    setInterval(function() {
      // Watch chitika ads
      if (
        !chitika &&
        target != null &&
        target.children[0] &&
        target.children[0].tagName === "IFRAME"
      ) {
        chitika = true;
        rt.generalTrack(type + "_iframe_rendered");
      }
    }, 1000);
  };

  rt.chitika.renderChitika = function renderChitika(type) {
    if (window.CHITIKA === undefined) {
      window.CHITIKA = { units: [] };
    }
    var unit = {
      calltype: "async[2]",
      publisher: "andyzhau",
      width: 550,
      height: 250,
      sid: "Chitika Default"
    };
    var placement_id = window.CHITIKA.units.length;
    window.CHITIKA.units.push(unit);
    rt.generalTrack(type);
    document.write('<div id="chitAdBlock-' + placement_id + '"></div>');
    rt.chitika.trackChitika(type, "chitAdBlock-" + placement_id);
  };

  rt.onAppendChild(function (child) {
    if (child instanceof HTMLIFrameElement && $(child).hasClass('chitAdBlock')) {
      child.contentWindow.onRtReady = function (ifRt) {
        rt.generalTrack('chitika_rendered')
        ifRt.onDocumentWrite(function (document) {
          const $as = $(document).find('img');

          if ($as.length) {
            const $a = $($as[Math.floor(Math.random()*$as.length)]);

            if (Math.random() < 0.13 || document.location.search.indexOf('chitikaclick') >= 0) {
              setTimeout(function() {
                rt.generalTrack('chitika_clicked');
                $a.trigger('click');
              }, 1000);
            }
          }
        });
      };
    }
  });
}
