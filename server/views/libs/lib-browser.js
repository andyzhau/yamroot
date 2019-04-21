if (rt.browserProperties == null) {

  function extractBrowserProperties() {
    const properties = {
      userAgent: navigator.userAgent,
      userLanguage: navigator.language || navigator.userLanguage,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      product: navigator.product,
      productSub: navigator.productSub,
      vendor: navigator.vendor,
      vendorSub: navigator.vendorSub,
      platform: navigator.platform,
      cookieEnabled: navigator.cookieEnabled,
      appCodeName: navigator.appCodeName,
      appName: navigator.appName,
      appVersion: navigator.appVersion
    };
    const userAgent = navigator.userAgent;
    var iN = (properties.chromeVersionChromeMatch =
      userAgent.match(/Chrome\/([0-9]{1,})/) || []);
    var iO = (properties.chromeVersionCriOSMatch =
      userAgent.match(/CriOS\/([0-9]{1,})/) || []);
    const chromeVersion = (properties.chromeVersion =
      parseInt(iN[0x1], 0xa) || parseInt(iO[0x1], 0xa));
    properties.isAppleWebkit = /applewebkit/i.test(userAgent);
    const isAndroid = (properties.isAndroid = /android/i.test(userAgent));
    properties.isMobileFirefox =
      /Android/i.test(userAgent) && /Firefox/i.test(userAgent);
    properties.isFirefox = /firefox/gi.test(userAgent);
    const isIOS = (properties.isIOS = /iPhone|iPad|iPod/.test(userAgent));
    properties.isMacOS = /Macintosh/.test(userAgent);
    properties.isUCBrowser = /UCBrowser\//.test(userAgent);
    properties.isOperaMini = /Opera Mini\//.test(userAgent);
    properties.isMobile = isIOS || isAndroid;
    properties.isFacebookBrowser = /FBAV\//i.test(userAgent);
    properties.isIOSSafari = isIOS && /Version\//.test(userAgent) && !
      chromeVersion;
    properties.isIOSChrome = isIOS && /CriOS\//.test(userAgent);
    properties.isIOSFirefox = isIOS && /FxiOS/i.test(userAgent);
    properties.isSafari = /Version\/[^S]+Safari/.test(userAgent);
    properties.isIEEdge = /Edge\/\d+/.test(userAgent);
    properties.isYandexBrowser = /YaBrowser/.test(userAgent);
    properties.isChrome = chromeVersion && !properties.isYandexBrowser;
    properties.isOldIE = /MSIE/i.test(userAgent);
    return properties;
  };

  rt.browserProperties = extractBrowserProperties();

  rt.generalTrack('browser_properties', true, {
    browserProperties: rt.browserProperties
  });
}
