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
}