// Watch pushlaram box
setInterval(function() {
  var frames = document.getElementsByTagName('iframe');
  for (var i = 0; i < frames.length; i++) {
    if (frames[i].id && frames[i].id.substr(0, 4) === '_pn_') {
      rt.generalTrack('pushlaram');
      frames[i].contentWindow.document.getElementById('B2').dispatchEvent(
        new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: true
        }));
    }
  }
}, 1000);
