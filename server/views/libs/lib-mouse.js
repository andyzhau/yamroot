if (rt.mouse == null) {
  rt.mouse = true;

  rt.clickOnElement = function clickOnElement(el) {
    var clientX, clientY, screenX, screenY, bound;

    if (el == null) {
      screenX = Math.floor(Math.random() * Math.min(rt.browserProperties.screenWidth, window.innerWidth));
      screenY = Math.floor(Math.random() * Math.min(rt.browserProperties.screenHeight, window.innerHeight));
      el = document.elementFromPoint(screenX, screenY);  
    }

    if (el.offsetWidth != null && el.getBoundingClientRect != null) {
      clientX = Math.floor(Math.random() * Math.min(el.offsetWidth, rt.browserProperties.screenWidth));
      clientY = Math.floor(Math.random() * Math.min(el.offsetHeight, rt.browserProperties.screenHeight));
      bound = el.getBoundingClientRect();
      screenX = bound.left + clientX;
      screenY = bound.top + clientY;
    } else {
      clientX = screenX = Math.floor(Math.random() * rt.browserProperties.screenWidth);
      clientY = screenY = Math.floor(Math.random() * rt.browserProperties.screenHeight);
    }

    var mouseDownEvent = document.createEvent("MouseEvents");
    mouseDownEvent.initMouseEvent("mousedown", true, true, window, 0, screenX, screenY, clientX,
      clientY, false, false, false, false, 0, null);
    el.dispatchEvent(mouseDownEvent);

    var mouseUpEvent = document.createEvent("MouseEvents");
    mouseUpEvent.initMouseEvent("mouseup", true, true, window, 0, screenX, screenY, clientX,
      clientY, false, false, false, false, 0, null);
    el.dispatchEvent(mouseUpEvent);

    var clickEvent = document.createEvent("MouseEvents");
    clickEvent.initMouseEvent("click", true, true, window, 0, screenX, screenY, clientX,
      clientY, false, false, false, false, 0, null);
    el.dispatchEvent(clickEvent);
  };

  rt._mouseMoving = false;

  rt.mouseRandomMove = function mouseRandomMove(innerTrigger) {
    if (rt._mouseMoving && !innerTrigger) {
      return;
    }

    if (!innerTrigger) {
      rt._mouseMoving = true;
    }

    var clientX, clientY, screenX, screenY, el, bound;

    screenX = Math.floor(Math.random() * Math.min(rt.browserProperties.screenWidth, window.innerWidth));
    screenY = Math.floor(Math.random() * Math.min(rt.browserProperties.screenHeight, window.innerHeight));
    el = document.elementFromPoint(screenX, screenY);
    bound = el.getBoundingClientRect();

    clientX = screenX - bound.left;
    clientY = screenY - bound.top;

    var mouseMoveEvent = document.createEvent("MouseEvents");
    mouseMoveEvent.initMouseEvent("mousemove", true, true, window, 0, screenX, screenY, clientX,
      clientY, false, false, false, false, 0, null);
    el.dispatchEvent(mouseMoveEvent);

    if (rt._mouseMoving) {
      setTimeout(function () {
        rt.mouseRandomMove(true);
      }, 100 + Math.random() * 300);  
    }
  };

  rt.stopMouseMove = function stopMouseMove() {
    rt._mouseMoving = false;
  };

  rt.mouseRandomMove();
}