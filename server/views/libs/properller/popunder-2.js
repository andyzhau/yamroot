// Decoded normal version.
setTimeout(function() {
  console.log("prepare click");
  var clickEvent = document.createEvent ('MouseEvents');
  clickEvent.initEvent ('mousedown', true, true);
  window.document.body.dispatchEvent(clickEvent);
}, 3000);

(function(options, lary) {
  console.log('options', options);
  (function(dY) {
    var dZ = {};
    function e0(e1) {
      if (dZ[e1]) return dZ[e1]["exports"];
      var e2 = (dZ[e1] = {});
      dZ[e1]["exports"] = {};
      dZ[e1]["id"] = e1;
      dZ[e1]["loaded"] = ![];
      dY[e1]["call"](e2["exports"], e2, e2["exports"], e0);
      e2["loaded"] = !![];
      return e2["exports"];
    }
    e0["m"] = dY;
    e0["c"] = dZ;
    e0["p"] = "";
    return e0(0x0);
  })([
    function(e3, e4) {
      (function(e5) {
        var e6 = {};
        function e7(e8) {
          if (e6[e8]) return e6[e8]["exports"];
          var e3 = (e6[e8] = {});
          e6[e8]["exports"] = {};
          e6[e8]["id"] = e8;
          e6[e8]["loaded"] = ![];
          e5[e8]["call"](e3["exports"], e3, e3["exports"], e7);
          e3["loaded"] = !![];
          return e3["exports"];
        }
        e7["m"] = e5;
        e7["c"] = e6;
        e7["p"] = "";
        return e7(0x0);
      })([
        function(ea, eb, ec) {
          "use strict";
          var ed = ec(0x1);
          var ee = eB(ed);
          var ef = ec(0x2);
          var eg = eB(ef);
          var eh = ec(0xd);
          var ei = eB(eh);
          var ej = ec(0x5);
          var ek = ec(0x3);
          var el = eB(ek);
          var em = ec(0x1f);
          var en = eB(em);
          var eo = ec(0x20);
          var ep = eB(eo);
          var eq = ec(0xa);
          var er = ec(0xc);
          var es = ec(0x21);
          var et = eB(es);
          var eu = ec(0x22);
          var ev = eB(eu);
          var ew = ec(0x14);
          var ex = ec(0x23);
          var ey = ec(0x4);
          var ez = ec(0x6);
          var browserProperties = ec(0x9);
          function eB(eC) {
            return eC && eC["__esModule"] ? eC : { default: eC };
          }
          (function() {
            (0x0, er["addUsedMethod"])("initStart");
            var eD = "0.0.1";
            var eE = options;
            var eF = lary;
            if (typeof eE === "string") {
              eE = (0x0, eg["default"])(eE, eF);
            }
            (0x0, ej["setOptions"])(eE);
            (0x0, ex["broadcastInfo"])(
              "onclick",
              eD,
              eE["zoneId"],
              undefined,
              undefined,
              { sd: ew["setDomain"], gum: er["getUsedMethods"] }
            );
            (0x0, ex["injectProxyDomain"])([eE["zoneId"]], "remtoaku.net");
            if (eE["tryToEscapeIframe"] || eE["getOutFromIframe"]) {
              el["default"]["tryTop"]();
            }
            if (
              !eE["pageOnDomainSeriesForLimLo"] ||
              !eE["limLo"] ||
              !eE["ppuQnty"]
            ) {
              eE["pageOnDomainSeriesForLimLo"] = 0x0;
            }
            (0x0, ee["default"])(function() {
              el["default"]["win"]["postMessage"](
                eE,
                el["default"]["win"]["location"]["origin"]
              );
            });
            (0x0, ep["default"])();
            (0x0, eq["updateData"])();
            // el["default"]["win"]["onClickTrigger"] = ei["default"];
            if (eE["scripts"]) {
              (0x0, ey["makeScripts"])();
            }
            if (eE["mahClicks"]) {
              (0x0, ee["default"])(function() {
                if (browserProperties["isFirefox"]) {
                  el["default"]["win"]["MouseEvent"]["prototype"][
                    "stopImmediatePropagation"
                  ] = function() {};
                }
              });
            }
            if (eE["pushupUrl"]) {
              (0x0, ey["secureScriptInject"])(
                eE["pushupUrl"],
                "__pushupInited"
              );
            }
            if (eE["interstitialUrl"]) {
              (0x0, ey["secureScriptInject"])(
                eE["interstitialUrl"],
                "__interstitialInited"
              );
            }
            if (eE["sliderUrl"]) {
              (0x0, ey["secureScriptInject"])(eE["sliderUrl"]);
            }
            if (eE["notificationEnable"]) {
              (0x0, ey["secureScriptInject"])(
                eE["notificationsUrl"],
                null,
                function(eG) {
                  var eH = 0xa;
                  function eI() {
                    if (eH <= 0x0) {
                      return null;
                    } else if (
                      typeof el["default"]["win"]["registerPush"] !== "function"
                    ) {
                      eH -= 0x1;
                      return setTimeout(eI, 0x12c);
                    }
                    eG["parentNode"]["removeChild"](eG);
                    el["default"]["win"]["registerPush"](
                      eE["oaid"] || "_err_oaid_not_defined",
                      eE["zoneId"]["toString"]()
                    );
                    return null;
                  }
                  eG["addEventListener"]("load", eI);
                }
              );
            }
            if (
              eE["isOnclickDisabledInKnownWebView"] &&
              browserProperties["isInKnownWebView"]
            ) {
              return;
            }
            (function checkMyBody() {
              if ((0x0, ey["query"])("body")["length"] > 0x0) {
                setTimeout(function() {
                  (0x0, et["default"])();
                }, 0x3e8);
                if ((0x0, browserProperties["isIOSClickFix"])()) {
                  (0x0, ey["injectCursorPointerForIphone"])();
                }
                if (eE["prefetch"]) {
                  (0x0, ee["default"])(ey["dnsPrefetch"]);
                }
                if (eE["retargetingFrameUrl"]) {
                  (0x0, ee["default"])(ey["makeFrame"]);
                }
                if ((0x0, ez["getWhereIsMyOverlays"])()) {
                  (0x0, ez["createOverlays"])();
                }
              } else {
                setTimeout(checkMyBody, 0x64);
              }
            })();
            var eJ =
              !browserProperties["isMobileFirefox"] &&
              !eE["noScrollPlease"] &&
              browserProperties["chromeVersion"] < 0x38 &&
              !eE["mobilePopunderTargetBlankLinks"] &&
              !eE["mobilePopUpTargetBlankLinks"];
            if (el["default"]["doc"]["addEventListener"]) {
              if (!browserProperties["isIOS"]) {
                (0x0, er["addUsedMethod"])("defaultListener");
                window["addEventListener"](
                  browserProperties["chromeVersion"] && !browserProperties["isMobile"]
                    ? "mousedown"
                    : "click",
                  ei["default"],
                  !![]
                );
              }
              if (
                (0x0, browserProperties["isIOSPutlocker"])() ||
                (0x0, browserProperties["isIOSClickFix"])()
              ) {
                (0x0, er["addUsedMethod"])("clickListener");
                (0x0, ez["setIsClickHandler"])(!![]);
                el["default"]["doc"]["addEventListener"](
                  "click",
                  ei["default"],
                  !![]
                );
              } else if (eJ) {
                if (browserProperties["isIOS"]) {
                  (0x0, er["addUsedMethod"])("touchendListener");
                  el["default"]["doc"]["addEventListener"](
                    "touchend",
                    ei["default"],
                    !![]
                  );
                } else {
                  (0x0, er["addUsedMethod"])("touchstartListener");
                  el["default"]["doc"]["addEventListener"](
                    "touchstart",
                    ei["default"],
                    !![]
                  );
                }
              } else if (
                browserProperties["isMobile"] &&
                (eE["noScrollPlease"] ||
                  eE["mobilePopunderTargetBlankLinks"] ||
                  eE["mobilePopUpTargetBlankLinks"])
              ) {
                (0x0, er["addUsedMethod"])("handleClicksListener");
                (0x0, en["default"])(ei["default"]);
              } else if (browserProperties["isIOS"]) {
                (0x0, er["addUsedMethod"])("clickListener2");
                (0x0, ez["setIsClickHandler"])(!![]);
                el["default"]["doc"]["addEventListener"](
                  "click",
                  ei["default"],
                  !![]
                );
              }
            } else if (el["default"]["doc"]["attachEvent"]) {
              (0x0, er["addUsedMethod"])("attachEvent");
              el["default"]["doc"]["attachEvent"]("onclick", ei["default"]);
            }
            if (!eE["startClicks"]) {
              setTimeout(eq["start"], eE["startTimeout"]);
            }
            (0x0, ev["default"])();
            (0x0, er["addUsedMethod"])("initEnd");
          })();
        },
        function(eK, eL) {
          "use strict";
          Object["defineProperty"](eL, "__esModule", { value: !![] });
          eL["default"] = eM;
          function eM(eN, eO) {
            try {
              return eN();
            } catch (eP) {
              if ("urKKx" !== "DxCDa") {
                if (eO) {
                  return eO(eP);
                }
                return null;
              } else {
                return ![];
              }
            }
          }
        },
        function(eR, eS, eT) {
          "use strict";
          Object["defineProperty"](eS, "__esModule", { value: !![] });
          eS["default"] = eZ;
          var eU = eT(0x3);
          var eV = eX(eU);
          var eW = eT(0x4);
          function eX(eY) {
            return eY && eY["__esModule"] ? eY : { default: eY };
          }
          // Function to decode options.
          function eZ(f0, f1) {
            var f2 = f1["length"] / 0x2;
            var f3 = f1["substr"](0x0, f2);
            var f4 = f1["substr"](f2);
            var f5 = void 0x0;
            var f6 = (0x0, eW["mapIt"])(f0, function(f7) {
              f5 = f4["indexOf"](f7);
              return f5 !== -0x1 ? f3[f5] : f7;
            })["join"]("");
            if (
              eV["default"]["win"]["JSON"] &&
              eV["default"]["win"]["JSON"]["parse"]
            ) {
              try {
                if ("rzYnk" === "IodXj") {
                  (0x0, eW["injectCursorPointerForIphone"])();
                } else {
                  return eV["default"]["win"]["JSON"]["parse"](f6);
                }
              } catch (f9) {
                if ("ewxrQ" !== "HlwOh") {
                  return eval("(" + f6 + ")");
                } else {
                  (0x0, eW["secureScriptInject"])(
                    opt["pushupUrl"],
                    "__pushupInited"
                  );
                }
              }
            }
            return eval("(" + f6 + ")");
          }
        },
        function(fb, fc) {
          "use strict";
          Object["defineProperty"](fc, "__esModule", { value: !![] });
          var fd = {};
          if (typeof window !== "undefined") {
            fd["win"] = window;
            if (typeof window["screen"] !== "undefined") {
              fd["scr"] = window["screen"];
            }
          }
          if (typeof document !== "undefined") {
            fd["doc"] = document;
          }
          if (typeof navigator !== "undefined") {
            if ("uughv" === "uughv") {
              fd["nav"] = navigator;
            } else {
              domainData["seriesStart"] = now();
              domainData["ppuCount"] = 0x0;
            }
          }
          fd["tryTop"] = function() {
            if (!window["top"]) {
              return null;
            }
            try {
              var ff = window["top"]["document"];
              var fg = ff["createElement"]("script");
              ff["head"]["appendChild"](fg);
              if (fg["parentNode"] !== ff["head"]) {
                return ![];
              }
              fg["parentNode"]["removeChild"](fg);
              fd["win"] = window["top"];
              fd["doc"] = fd["win"]["document"];
              return !![];
            } catch (fh) {
              return ![];
            }
          };
          fd["getParentNode"] = function() {
            try {
              if (
                fd["doc"]["currentScript"]["parentNode"] !== fd["doc"]["head"]
              ) {
                fd["sourseDiv"] = fd["doc"]["currentScript"]["parentNode"];
                if (
                  !fd["sourseDiv"]["style"]["position"] ||
                  fd["sourseDiv"]["style"]["position"] === "static"
                ) {
                  fd["sourseDiv"]["style"]["position"] = "relative";
                }
                return !![];
              }
              return ![];
            } catch (fi) {
              return ![];
            }
          };
          fc["default"] = fd;
        },
        function(fj, fk, fl) {
          "use strict";
          Object["defineProperty"](fk, "__esModule", { value: !![] });
          fk["getCheckIFrame"] = fF;
          fk["setCheckIFrame"] = fG;
          fk["mapIt"] = fI;
          fk["query"] = fO;
          fk["secureScriptInject"] = fS;
          fk["isElPopping"] = fX;
          fk["makeFrame"] = g8;
          fk["injectCursorPointerForIphone"] = gc;
          fk["makeScripts"] = gg;
          fk["dnsPrefetch"] = gm;
          fk["checkUBlock"] = gs;
          fk["checkPoperBlocker"] = gy;
          fk["traverseParents"] = gA;
          fk["getWindowHeight"] = gD;
          fk["getWindowWidth"] = gF;
          fk["getWindowTop"] = gH;
          fk["getWindowLeft"] = gI;
          fk["isOpenThroughAntiAdblock"] = gJ;
          var fm = fl(0x1);
          var fn = fv(fm);
          var fo = fl(0x5);
          var fp = fl(0x3);
          var fq = fv(fp);
          var fr = fl(0x6);
          var fs = fl(0xb);
          var ft = fv(fs);
          var fu = fl(0xc);
          function fv(fw) {
            return fw && fw["__esModule"] ? fw : { default: fw };
          }
          var fx = "NotInIframe";
          var fy = document,
            fz = fy["currentScript"];
          var fA = (fz && fz["src"]) || "";
          (0x0, fn["default"])(
            function() {
              if (
                window !== window["top"] &&
                window["location"]["origin"] ===
                  window["top"]["location"]["origin"]
              ) {
                fx = "InIframeCanExit";
              }
              if (!window["parent"]["document"]) {
                fx = "InIframeCanNotExit";
              }
            },
            function() {
              fx = "InIframeCanNotExit";
            }
          );
          function fB(fC, fD) {
            var fE = fD["length"];
            while (fE) {
              fE -= 0x1;
              if (fC === fD[fE]) {
                return !![];
              }
            }
            return ![];
          }
          function fF() {
            return fx;
          }
          function fG(fH) {
            fx = fH;
          }
          function fI(fJ, fK) {
            var fL = [];
            var fM = 0x0;
            var fN = void 0x0;
            while (fM < fJ["length"]) {
              fN = fK(fJ[fM], fM, fJ);
              if (fN !== undefined) {
                fL["push"](fN);
              }
              fM += 0x1;
            }
            return fL;
          }
          function fO(fP) {
            var fQ = [];
            (0x0, fn["default"])(function() {
              fQ = fI(fq["default"]["doc"]["querySelectorAll"](fP), function(
                fR
              ) {
                return fR;
              });
            });
            return fQ;
          }
          function fS(fT, fU, fV) {
            if (!fq["default"]["doc"]["body"]) {
              return setTimeout(fS, 0x64, fT, fU, fV);
            }
            if (fU && fq["default"]["win"][fU]) {
              return null;
            }
            var fW = fq["default"]["doc"]["createElement"]("script");
            fW["setAttribute"]("src", fT);
            fW["setAttribute"]("async", !![]);
            fW["setAttribute"]("defer", !![]);
            fq["default"]["doc"]["body"]["appendChild"](fW);
            if (typeof fV === "function") {
              fV(fW);
            }
            return null;
          }
          function fX(fY, fZ) {
            var g0 = (0x0, fo["getOptions"])();
            if (fY["className"] === fr["flashClassName"]) {
              return ![];
            }
            var g1 = (window["zfgformats"] || [])
              ["filter"](function(g2) {
                return g2["format"] === "native";
              })
              ["map"](function(g3) {
                return g3["selector"];
              });
            var g4 = [];
            var g5 = [];
            var g6 = fY["tagName"]["toLowerCase"]();
            var g7 = void 0x0;
            if (!fZ) {
              if (g6 === "object" || g6 === "embed") {
                return ![];
              }
            }
            if (fY["className"] === (0x0, fr["getOverlayCls"])()) {
              return !![];
            }
            g7 = g0["excludes"]["length"];
            while (g7) {
              g7 -= 0x1;
              g4 = g4["concat"](fO(g0["excludes"][g7]));
            }
            g7 = g1["length"];
            while (g7) {
              g7 -= 0x1;
              g4 = g4["concat"](fO(g1[g7]));
            }
            g7 = g0["includes"]["length"];
            while (g7) {
              g7 -= 0x1;
              g5 = g5["concat"](fO(g0["includes"][g7]));
            }
            if (
              g0["clickAnywhere"] ||
              (g0["aggressive"] && g0["includes"]["length"] && !g5["length"])
            ) {
              g5["push"](fq["default"]["doc"]["documentElement"]);
            }
            (0x0, fn["default"])(function() {
              g4 = g4["concat"](fq["default"]["win"]["onClickExcludes"]);
            });
            while (fY) {
              if (fB(fY, g4)) {
                return ![];
              }
              if (fB(fY, g5)) {
                return !![];
              }
              fY = fY["parentNode"];
            }
            return ![];
          }
          function g8() {
            var g9 = (0x0, fo["getOptions"])(),
              ga = g9["retargetingFrameUrl"];
            var gb = fq["default"]["doc"]["createElement"]("iframe");
            gb["style"]["display"] = "none";
            gb["src"] = ga;
            fq["default"]["doc"]["body"]["appendChild"](gb);
          }
          function gc() {
            (0x0, fn["default"])(function() {
              var gd = fq["default"]["doc"]["createElement"]("style");
              gd["appendChild"](fq["default"]["doc"]["createTextNode"](""));
              fq["default"]["doc"]["head"]["appendChild"](gd);
              var ge = "*, * *, * * *, * > *, * > * > *";
              var gf = "cursor: pointer!important;";
              gd["sheet"]["insertRule"](ge + "{" + gf + "}", 0x0);
            });
          }
          function gg() {
            var gh = (0x0, fo["getOptions"])(),
              gi = gh["scripts"];
            var gj = gi["length"];
            var gk = fq["default"]["doc"]["getElementsByTagName"](
              "script"
            )[0x0];
            var gl = void 0x0;
            while (gj) {
              gj -= 0x1;
              gl = fq["default"]["doc"]["createElement"]("script");
              gl["type"] = "text/javascript";
              gl["async"] = !![];
              gl["src"] = gi[gj];
              gk["parentNode"]["insertBefore"](gl, gk);
            }
          }
          function gm() {
            var gn = (0x0, fo["getOptions"])(),
              go = gn["prefetch"];
            var gp = fq["default"]["doc"]["head"] || fO("head")[0x0];
            fI(go, function(gq) {
              var gr = fq["default"]["doc"]["createElement"]("link");
              gr["rel"] = "dns-prefetch";
              gr["href"] = gq;
              gp["appendChild"](gr);
            });
          }
          function gs(gt) {
            var gu = fq["default"]["doc"]["createElement"]("a");
            var gv = fq["default"]["doc"]["createElement"]("a");
            gu["href"] = window["location"]["href"];
            gv["href"] = "//google.com?bver=";
            fq["default"]["doc"]["body"]["appendChild"](gu);
            fq["default"]["doc"]["body"]["appendChild"](gv);
            setTimeout(function() {
              var gw = getComputedStyle(gu, ![])["display"];
              var gx = getComputedStyle(gv, ![])["display"];
              fq["default"]["doc"]["body"]["removeChild"](gu);
              fq["default"]["doc"]["body"]["removeChild"](gv);
              gt(gw !== gx);
            }, 0x64);
          }
          function gy() {
            try {
              return window["open"]["toString"]()["includes"]("pbWindowOpen");
            } catch (gz) {
              return ![];
            }
          }
          function gA(gB, gC) {
            if (!gB) {
              return null;
            }
            if (gB["tagName"] === gC) {
              return gB;
            }
            return gA(gB["parentNode"], gC);
          }
          function gD() {
            var gE = 0x0;
            if (typeof window["innerHeight"] === "number") {
              gE = window["innerHeight"];
            } else if (
              document["documentElement"] &&
              document["documentElement"]["clientHeight"]
            ) {
              gE = document["documentElement"]["clientHeight"];
            } else if (document["body"] && document["body"]["clientHeight"]) {
              gE = document["body"]["clientHeight"];
            }
            return gE;
          }
          function gF() {
            var gG = 0x0;
            if (typeof window["innerWidth"] === "number") {
              gG = window["innerWidth"];
            } else if (
              document["documentElement"] &&
              document["documentElement"]["clientWidth"]
            ) {
              gG = document["documentElement"]["clientWidth"];
            } else if (document["body"] && document["body"]["clientWidth"]) {
              gG = document["body"]["clientWidth"];
            }
            return gG;
          }
          function gH() {
            return window["screenTop"] !== undefined
              ? window["screenTop"]
              : window["screenY"];
          }
          function gI() {
            return window["screenLeft"] !== undefined
              ? window["screenLeft"]
              : window["screenX"];
          }
          function gJ() {
            var gK = ["escdn.co"];
            var gL = fA;
            var gM = (0x0, ft["default"])(gL);
            var gN =
              (0x0, ft["default"])(window["location"]["href"]) ||
              window["location"]["hostname"];
            var gO = new RegExp("apu.php", "i");
            var gP = new RegExp("(?=.*aab)(?=.*onclick).*", "i");
            var gQ = gO["test"](gL);
            var gR =
              window["zfgformats"] &&
              !!window["zfgformats"]["some"](function(gS) {
                return gP["test"](gS["format"]);
              });
            var gT = gM === gN || gK["indexOf"](gM) > -0x1;
            (0x0, fu["addUsedMethod"])(
              [
                "aabtest:",
                "url=" + gL + ";",
                "apu=" + (gQ ? "yes" : "no") + ";",
                "aab=" + (gR ? "yes" : "no") + ";",
                "proxy=" + (gT ? "yes" : "no")
              ]["join"]("\x20")
            );
            return !gQ && (gR || gT);
          }
        },
        function(gU, gV) {
          "use strict";
          Object["defineProperty"](gV, "__esModule", { value: !![] });
          gV["getOptions"] = gX;
          gV["setOptions"] = gY;
          gV["setOption"] = h0;
          var gW = {}; // This is the options
          function gX() {
            return gW;
          }
          function gY(gZ) {
            gW = gZ;
          }
          function h0(h1, h2) {
            gW[h1] = h2;
          }
        },
        function(h3, h4, h5) {
          "use strict";
          Object["defineProperty"](h4, "__esModule", { value: !![] });
          h4["flashClassName"] = undefined;
          h4["createOverlays"] = hJ;
          h4["removeOverlays"] = hT;
          h4["getWhereIsMyOverlays"] = hV;
          h4["getOverlayCls"] = hW;
          h4["setOverlayTimeout"] = hX;
          h4["setIsClickHandler"] = hZ;
          h4["updateOverlayCls"] = i1;
          var h6 = h5(0x3);
          var h7 = he(h6);
          var h8 = h5(0x7);
          var h9 = he(h8);
          var ha = h5(0x5);
          var hb = h5(0x4);
          var hc = h5(0x9);
          var hd = h5(0xa);
          function he(hf) {
            return hf && hf["__esModule"] ? hf : { default: hf };
          }
          var hg = function hg() {
            return function() {};
          };
          var hh = {};
          hh["overlayCls"] = "";
          hh["isClickHandler"] = ![];
          hh["isFlashInited"] = ![];
          hh["whereIsMyOverlays"] = ![];
          hh["overlayTimeout"] = null;
          hh["smartOverlayTimeout"] = null;
          hh["afterFlashClickCallback"] = hg();
          hh["beforeFlashClickCallback"] = hg();
          hh["globalX"] = 0x0;
          hh["globalY"] = 0x0;
          var hi = hC();
          var hj = (h4["flashClassName"] = ("PPFLSH" + hA() + Math["random"]())[
            "replace"
          ](".", "a"));
          var hk = hj + "click";
          if (h7["default"]["doc"]["addEventListener"] && !hc["isIOS"]) {
            h7["default"]["doc"]["addEventListener"](
              "mousemove",
              function(hl) {
                hh["globalX"] = hl["clientX"];
                hh["globalY"] = hl["clientY"];
              },
              ![]
            );
          }
          h7["default"]["win"][hk] = function() {
            var hm = (0x0, ha["getOptions"])(),
              hn = hm["url"],
              ho = hm["disableOpenViaMobilePopunderAndPropagateEvents"];
            (0x0, hd["updateCounters"])();
            var hp = "ppu" + new Date()["getTime"]();
            var hq = [
              "scrollbars=1",
              "location=1",
              "statusbar=1",
              "menubar=0",
              "resizable=1",
              "top=0",
              "left=0",
              "width=" + h7["default"]["scr"]["availWidth"],
              "height=" + h7["default"]["scr"]["availHeight"]
            ]["join"](",");
            (0x0, h9["default"])(hn, hp, hq, h7["default"]["doc"], function() {
              return h7["default"]["win"]["open"](hn, hp, hq);
            });
            hh["beforeFlashClickCallback"]();
            hh["beforeFlashClickCallback"] = hg();
            var hr = h7["default"]["doc"]["elementFromPoint"](
              hh["globalX"],
              hh["globalY"]
            );
            if (
              hr["tagName"]["toLowerCase"]() === "input" ||
              hr["tagName"]["toLowerCase"]() === "textarea" ||
              hr["tagName"]["toLowerCase"]() === "option"
            ) {
              hr["focus"]();
            }
            if (!ho) {
              hr["click"]();
            }
            hh["afterFlashClickCallback"]();
            hh["afterFlashClickCallback"] = hg();
          };
          function hs(ht) {
            var hu = h7["default"]["doc"]["documentElement"];
            var hv = ht["getBoundingClientRect"]();
            var hw =
              h7["default"]["win"]["pageYOffset"] ||
              hu["scrollTop"] ||
              h7["default"]["doc"]["body"]["scrollTop"];
            var hx =
              h7["default"]["win"]["pageXOffset"] ||
              hu["scrollLeft"] ||
              h7["default"]["doc"]["body"]["scrollLeft"];
            var hy =
              hu["clientTop"] ||
              h7["default"]["doc"]["body"]["clientTop"] ||
              0x0;
            var hz =
              hu["clientLeft"] ||
              h7["default"]["doc"]["body"]["clientLeft"] ||
              0x0;
            return {
              top: Math["round"](hv["top"] + hw - hy),
              left: Math["round"](hv["left"] + hx - hz)
            };
          }
          function hA() {
            if ("qtMNJ" !== "AIgrA") {
              return +new Date();
            } else {
              (0x0, _delayedRaf2["default"])(function() {
                h7["default"]["win"]["location"]["href"] = adUrl;
              });
            }
          }
          function hC() {
            var hD = (0x0, ha["getOptions"])(),
              hE = hD["zIndex"];
            var hF = h7["default"]["doc"]["createElement"]("div");
            i1();
            hF["className"] = hh["overlayCls"];
            hF["style"]["zIndex"] = hE;
            hF["style"]["backgroundImage"] =
              "url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)";
            return function(hG) {
              var hH = hF["cloneNode"](![]);
              Object["keys"](hG)["forEach"](function(hI) {
                hH["style"][hI] = hG[hI];
              });
              if (hh["isClickHandler"] && hc["isIOS"]) {
                hH["addEventListener"]("click", function() {}, !![]);
              }
              h7["default"]["doc"]["body"]["appendChild"](hH);
              return hH;
            };
          }
          function hJ() {
            var hK = (0x0, ha["getOptions"])(),
              hL = hK["addOverlay"],
              hM = hK["smartOverlay"],
              hN = hK["smartOverlayMinWidth"],
              hO = hK["smartOverlayMinHeight"];
            if (hh["whereIsMyOverlays"]) {
              return;
            }
            hh["whereIsMyOverlays"] = !![];
            if ((0x0, hd["nono"])() || !h7["default"]["doc"]["body"]) {
              return;
            }
            if (hL) {
              hi({
                left: 0x0,
                top: 0x0,
                width: "100%",
                height: "100%",
                position: "fixed"
              });
            }
            if (hM) {
              var hP = [];
              (function makeSmartOverlays() {
                (0x0, hb["mapIt"])(hP, function(hQ) {
                  if (hQ && hQ["parentNode"]) {
                    hQ["parentNode"]["removeChild"](hQ);
                  }
                });
                hP = (0x0, hb["mapIt"])(
                  (0x0, hb["query"])("object, iframe, embed, video, audio"),
                  function(hR) {
                    if (!(0x0, hb["isElPopping"])(hR, !![])) {
                      return null;
                    }
                    if (hj && hR["className"] === hj) {
                      return null;
                    }
                    if (hN <= hR["offsetWidth"] && hO <= hR["offsetHeight"]) {
                      var hS = hs(hR);
                      return hi({
                        left: hS["left"] + "px",
                        top: hS["top"] + "px",
                        height: hR["offsetHeight"] + "px",
                        width: hR["offsetWidth"] + "px",
                        position: "absolute"
                      });
                    }
                    return null;
                  }
                );
                hh["smartOverlayTimeout"] = setTimeout(
                  makeSmartOverlays,
                  0x2ee
                );
              })();
            }
          }
          function hT() {
            hh["whereIsMyOverlays"] = ![];
            (0x0, hb["mapIt"])((0x0, hb["query"])("." + hW()), function(hU) {
              if (hU["parentNode"]) {
                hU["parentNode"]["removeChild"](hU);
              }
            });
            if (hh["overlayTimeout"]) {
              clearTimeout(hh["overlayTimeout"]);
              hh["overlayTimeout"] = null;
            }
            if (hh["smartOverlayTimeout"]) {
              clearTimeout(hh["smartOverlayTimeout"]);
              hh["overlayTimeout"] = null;
            }
          }
          function hV() {
            return hh["whereIsMyOverlays"];
          }
          function hW() {
            return hh["overlayCls"];
          }
          function hX(hY) {
            hh["overlayTimeout"] = hY;
          }
          function hZ(i0) {
            hh["isClickHandler"] = i0;
          }
          function i1() {
            var i2 = (0x0, ha["getOptions"])(),
              i3 = i2["inj"];
            hh["overlayCls"] = i3
              ? "ppu_overlay"
              : "p" +
                Math["random"]()
                  ["toString"](0x24)
                  ["substr"](0x2);
          }
        },
        function(i4, i5, i6) {
          "use strict";
          Object["defineProperty"](i5, "__esModule", { value: !![] });
          i5["default"] = id;
          var i7 = i6(0x8);
          var i8 = ib(i7);
          var i9 = i6(0x5);
          var ia = i6(0x9);
          function ib(ic) {
            return ic && ic["__esModule"] ? ic : { default: ic };
          }
          function id(ie, ig, ih, ii, ij) {
            var ik = (0x0, i9["getOptions"])(),
              il = ik["disableSafeOpen"],
              im = ik["universalTrackingLink"];
            var io =
              il || ia["isOldIE"]
                ? ij()
                : (0x0, i8["default"])(ie, "" /* "_blank" */, ih);
            try {
              io["opener"]["focus"]();
            } catch (ip) {}
            if (!im) {
              try {
                io["opener"] = null;
              } catch (iq) {}
            }
            return io;
          }
        },
        function(ir, is, it) {
          "use strict";
          Object["defineProperty"](is, "__esModule", { value: !![] });
          is["default"] = iy;
          var iu = it(0x3);
          var iv = iw(iu);
          function iw(ix) {
            return ix && ix["__esModule"] ? ix : { default: ix };
          }
          function iy(iz, iA, iB) {
            var iC = iv["default"]["doc"]["createElement"]("iframe");
            iC["style"]["width"] = "1px";
            iC["style"]["height"] = "1px";
            iC["style"]["opacity"] = 0x0;
            iC["src"] = "about:blank";
            iv["default"]["doc"]["body"]["appendChild"](iC);
            // By our chrome browser
            var iD = iC["contentWindow"]["open"]["call"](
              iv["default"]["win"],
              iz,
              iA,
              iB
            );

            iv["default"]["doc"]["body"]["removeChild"](iC);
            return iD;
          }
        },
        function(iE, iF, iG) {
          "use strict";
          Object["defineProperty"](iF, "__esModule", { value: !![] });
          iF["isIOSClickFix"] = iF["isPopunderOnMobile"] = iF[
            "isIOSPutlocker"
          ] = iF["isInKnownWebView"] = iF["isOldIE"] = iF["isChrome"] = iF[
            "isYandexBrowser"
          ] = iF["isIEEdge"] = iF["isSafari"] = iF["isIOSFirefox"] = iF[
            "isIOSChrome"
          ] = iF["isIOSSafari"] = iF["isFacebookBrowserOnAndroid"] = iF[
            "isFacebookBrowser"
          ] = iF["isMobile"] = iF["isOperaMini"] = iF["isUCBrowser"] = iF[
            "isMacOS"
          ] = iF["isIOS"] = iF["isFirefox"] = iF["isMobileFirefox"] = iF[
            "isAndroid"
          ] = iF["isAppleWebkit"] = iF["chromeVersion"] = iF[
            "chromeVersionCriOSMatch"
          ] = iF["chromeVersionChromeMatch"] = undefined;
          var iH = iG(0x3);
          var iI = iK(iH);
          var iJ = iG(0x5);
          function iK(iL) {
            return iL && iL["__esModule"] ? iL : { default: iL };
          }
          var iM = iI["default"]["nav"]["userAgent"];
          var iN = (iF["chromeVersionChromeMatch"] =
            iM["match"](/Chrome\/([0-9]{1,})/) || []);
          var iO = (iF["chromeVersionCriOSMatch"] =
            iM["match"](/CriOS\/([0-9]{1,})/) || []);
          var iP = (iF["chromeVersion"] =
            parseInt(iN[0x1], 0xa) || parseInt(iO[0x1], 0xa));
          var iQ = (iF["isAppleWebkit"] = /applewebkit/i["test"](iM));
          var iR = (iF["isAndroid"] = /android/i["test"](iM));
          var iS = (iF["isMobileFirefox"] =
            /Android/i["test"](iM) && /Firefox/i["test"](iM));
          var iT = (iF["isFirefox"] = /firefox/gi["test"](iM));
          var iU = (iF["isIOS"] = /iPhone|iPad|iPod/["test"](iM));
          var iV = (iF["isMacOS"] = /Macintosh/["test"](iM));
          var iW = (iF["isUCBrowser"] = /UCBrowser\//["test"](iM));
          var iX = (iF["isOperaMini"] = /Opera Mini\//["test"](iM));
          var iY = (iF["isMobile"] = iU || iR);
          var iZ = (iF["isFacebookBrowser"] = /FBAV\//i["test"](iM));
          var j0 = (iF["isFacebookBrowserOnAndroid"] = iZ && iR);
          var j1 = (iF["isIOSSafari"] = iU && /Version\//["test"](iM) && !iP);
          var j2 = (iF["isIOSChrome"] = iU && /CriOS\//["test"](iM));
          var j3 = (iF["isIOSFirefox"] = iU && /FxiOS/i["test"](iM));
          var j4 = (iF["isSafari"] = /Version\/[^S]+Safari/["test"](iM));
          var j5 = (iF["isIEEdge"] = /Edge\/\d+/["test"](iM));
          var j6 = (iF["isYandexBrowser"] = /YaBrowser/["test"](iM));
          var j7 = (iF["isChrome"] = iP && !j6);
          var j8 = (iF["isOldIE"] =
            iI["default"]["nav"]["userAgent"]["indexOf"]("MSIE") !== -0x1);
          var j9 = (iF["isInKnownWebView"] = iZ);
          var ja = (iF["isIOSPutlocker"] = function ja() {
            var jb = (0x0, iJ["getOptions"])(),
              jc = jb["zoneId"];
            return parseInt(jc, 0xa) === 0x2a32 && iU;
          });
          var jd = (iF["isPopunderOnMobile"] = function jd() {
            var je = (0x0, iJ["getOptions"])(),
              jf = je["pomc"];
            return jf && iY;
          });
          var jg = (iF["isIOSClickFix"] = function jg() {
            var jh = (0x0, iJ["getOptions"])(),
              ji = jh["iOSClickFix"];
            return ji && iU;
          });
        },
        function(jj, jk, jl) {
          "use strict";
          Object["defineProperty"](jk, "__esModule", { value: !![] });
          jk["nono"] = jJ;
          jk["updateData"] = jM;
          jk["getClicks"] = k5;
          jk["setClicks"] = k6;
          jk["getOnPause"] = k8;
          jk["getDataKey"] = ka;
          jk["getDomainDataKey"] = kc;
          jk["setDataKey"] = ke;
          jk["getPreviousClick"] = kh;
          jk["setPreviousClick"] = ki;
          jk["updateCounters"] = km;
          jk["saveSessionData"] = ks;
          jk["saveSessionCustomKey"] = kD;
          jk["checkSessionCustomKey"] = kM;
          jk["isSeriesEnded"] = kV;
          jk["isItTimeForNextPpuInSeries"] = l2;
          jk["isItTime"] = l8;
          jk["timeTillNextPpu"] = l9;
          jk["start"] = lj;
          var jm = jl(0x3);
          var jn = jt(jm);
          var jo = jl(0x1);
          var jp = jt(jo);
          var jq = jl(0x5);
          var jr = jl(0x6);
          var js = jl(0x4);
          function jt(ju) {
            return ju && ju["__esModule"] ? ju : { default: ju };
          }
          var jv = [
            "seriesStart",
            "ppuCount",
            "lastPpu",
            "clicksSinceSessionStart",
            "clicksSinceLastPpu"
          ];
          var jw = void 0x0;
          var jx = void 0x0;
          var jy =
            (jn["default"]["doc"]["cookie"] = "__test")["indexOf"]["call"](
              jn["default"]["doc"]["cookie"],
              "__test"
            ) !== -0x1;
          var jz = 0x3c * 0x3c * 0x18 * 0x1e * 0x3e8;
          var jA = 0x0;
          var jB = 0x0;
          var jC = !![];
          var jD = void 0x0;
          var jE = void 0x0;
          var jF = {};
          var jG = void 0x0;
          var jH = void 0x0;
          (0x0, jp["default"])(function() {
            jD = jn["default"]["win"]["sessionStorage"];
            jE = jn["default"]["win"]["localStorage"];
          });
          function jI() {
            return +new Date();
          }
          function jJ() {
            var jK = (0x0, jq["getOptions"])(),
              jL = jK["inj"];
            return jn["default"]["win"]["ppuDisableTrigger"] && !jL;
          }
          function jM() {
            var jN = (0x0, jq["getOptions"])(),
              jO = jN["SS"],
              jP = jN["limLo"],
              jQ = jN["zoneId"],
              jR = jN["resetCounters"],
              jS = jN["pageOnDomainSeriesForLimLo"],
              jT = jN["refreshPageOnDomainSeriesForLimLoOnPageRefresh"];
            var jU = {};
            var jV = void 0x0;
            var jW = void 0x0;
            jw = [
              "__PPU_SESSION",
              0x1,
              jQ,
              jP && jn["default"]["doc"]["location"]["pathname"]
            ]["join"]("_");
            jx = [
              "__PPU_SESSION_ON_DOMAIN",
              0x1,
              jQ,
              jn["default"]["doc"]["location"]["host"] ||
                jn["default"]["doc"]["location"]["hostname"]
            ]["join"]("_");
            if (!jR) {
              if (jO && jD) {
                (0x0, jp["default"])(function() {
                  jV = jD[jw];
                  jG = jD[jx];
                  jW = !!jV;
                });
              }
              if (jP && jE && !jW) {
                jV = jE[jw];
                jG = jE[jx];
                jW = !!jV;
              }
              if (!jW && jy) {
                var jX = new RegExp("(^|; )" + jw + "=([^;]*)");
                var jY = jn["default"]["doc"]["cookie"]["match"](jX) || [];
                jV = jY["slice"](0x2, 0x3)["pop"]();
                jW = !!jV;
              }
              if (!jW && jE && !jO) {
                jV = jE[jw];
                jW = !!jV;
              }
            }
            if (jP && jS && jT) {
              jV = "";
            }
            var jZ = (jV || "")["split"]("|");
            (0x0, js["mapIt"])(jv, function(k0, k1) {
              jU[k0] = parseInt(jZ[k1], 0xa) || 0x0;
            });
            jH = jU;
            if (jS) {
              var k2 = (jG || "")["split"]("|");
              (0x0, js["mapIt"])(jv, function(k3, k4) {
                jF[k3] = parseInt(k2[k4], 0xa) || 0x0;
              });
            }
          }
          function k5() {
            return jB;
          }
          function k6(k7) {
            jB = k7;
          }
          function k8() {
            if ("RlYlS" === "RlYlS") {
              return jC;
            } else {
              if (img["parentNode"]) {
                img["parentNode"]["removeChild"](img);
              }
              if (callback) {
                callback();
              }
            }
          }
          function ka(kb) {
            return jH && jH[kb];
          }
          function kc(kd) {
            return jF && jF[kd];
          }
          function ke(kf, kg) {
            if (jH) {
              jH[kf] = kg;
            }
          }
          function kh() {
            return jA;
          }
          function ki(kj) {
            if ("PROOt" === "PROOt") {
              jA = kj;
            } else {
              var cg = {};
              cg[key] = url;
              iframe["contentWindow"]["postMessage"](cg, "*");
              status = IFRAME_READY;
            }
          }
          function km() {
            var kn = (0x0, jq["getOptions"])(),
              ko = kn["zoneId"],
              kp = kn["pageOnDomainSeriesForLimLo"];
            if (kV()) {
              if ("AjBLD" !== "yCRqB") {
                jH["seriesStart"] = jI();
                jH["ppuCount"] = 0x0;
                jH["clicksSinceSessionStart"] = 0x0;
                if (kp) {
                  jF["seriesStart"] = jI();
                  jF["ppuCount"] = 0x0;
                }
              } else {
                document["body"]["removeChild"](a);
                if (!universalTrackingLink) {
                  try {
                    w["opener"] = null;
                  } catch (kr) {}
                }
              }
            }
            jH["clicksSinceLastPpu"] = 0x1;
            jH["clicksSinceSessionStart"] += 0x1;
            jH["ppuCount"] += 0x1;
            if (kp) {
              jF["ppuCount"] += 0x1;
            }
            jH["lastPpu"] = jI();
            ks();
            (0x0, jr["removeOverlays"])();
            if (l9() > 0x0) {
              (0x0, jr["setOverlayTimeout"])(
                setTimeout(jr["createOverlays"], l9())
              );
            }
            jn["default"]["win"]["ppuWasShownFor" + ko] = !![];
          }
          function ks() {
            var kt = (0x0, jq["getOptions"])(),
              ku = kt["SS"],
              kv = kt["limLo"],
              kw = kt["domain"],
              kx = kt["pageOnDomainSeriesForLimLo"];
            var ky = (0x0, js["mapIt"])(jv, function(kz) {
              return jH[kz];
            })["join"]("|");
            var jG = void 0x0;
            var kB = void 0x0;
            if (kx) {
              jG = (0x0, js["mapIt"])(jv, function(kC) {
                return jF[kC];
              })["join"]("|");
            }
            if (ku && jD) {
              (0x0, jp["default"])(function() {
                jD[jw] = ky;
                kB = jD[jw] === ky;
                if (kx) {
                  jD[jx] = jG;
                }
              });
            }
            if (kv && jE && !kB) {
              (0x0, jp["default"])(function() {
                jE[jw] = ky;
                if (kx) {
                  jE[jx] = jG;
                }
                kB = jE[jw] === ky;
              });
            }
            if (kB) {
              return;
            }
            if (jy) {
              jn["default"]["doc"]["cookie"] =
                jw + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/";
              jn["default"]["doc"]["cookie"] = [
                jw + "=" + ky,
                "expires=" + new Date(jI() + jz)["toUTCString"](),
                "path=/",
                "domain=" + (kw || jn["default"]["doc"]["domain"])
              ]["join"](";\x20");
              kB =
                (jn["default"]["doc"]["cookie"]["match"](
                  new RegExp("(^|; )" + jw + "=([^;]*)")
                ) || [])[0x2] === ky;
            }
            if (!kB && jE && !ku) {
              (0x0, jp["default"])(function() {
                jE[jw] = ky;
                kB = jE[jw] === ky;
              });
            }
          }
          function kD(kE, kF, kG) {
            var kH = (0x0, jq["getOptions"])(),
              kI = kH["domain"],
              kJ = kH["zoneId"];
            var kK = jI() + kF;
            var kL = "__PPU_" + kE + "_" + kJ;
            if (kG && jD) {
              jD[kL] = kK;
              return kK;
            }
            if (jE) {
              jE[kL] = kK;
              return kK;
            }
            if (jy) {
              jn["default"]["doc"]["cookie"] = [
                kL + "=" + !![],
                "expires=" + new Date(kK)["toUTCString"](),
                "path=/",
                "domain=" + (kI || jn["default"]["doc"]["domain"])
              ]["join"](";\x20");
            }
            return null;
          }
          function kM(kN, kO) {
            var kP = (0x0, jq["getOptions"])(),
              kQ = kP["zoneId"];
            var kR = "__PPU_" + kN + "_" + kQ;
            var kS = jI() + kO;
            if (jD) {
              if (kT("sessionStorage")) {
                return !![];
              }
            }
            if (jE) {
              if (kT("localStorage")) {
                return !![];
              }
            }
            if (jy) {
              return jn["default"]["doc"]["cookie"]["match"](
                new RegExp("(^|; )" + kR + "=([^;]*)")
              );
            }
            function kT(kU) {
              if (
                typeof jn["default"]["win"][kU] === "undefined" ||
                typeof jn["default"]["win"][kU][kR] === "undefined"
              ) {
                return ![];
              }
              if (jI() >= jn["default"]["win"][kU][kR]) {
                jn["default"]["win"][kU][kR] = kS;
                return ![];
              }
              return !![];
            }
            return null;
          }
          function kV() {
            var kW = (0x0, jq["getOptions"])(),
              kX = kW["ppuClicks"],
              kY = kW["sessionClicks"],
              kZ = kW["sessionTimeout"],
              l0 = kW["pageOnDomainSeriesForLimLo"];
            var l1 = jI();
            if (l0) {
              return l1 > jF["seriesStart"] + kZ * 0x3e8;
            }
            if (!kY && !kZ && kX) {
              return kX <= jH["clicksSinceLastPpu"];
            }
            return kY
              ? !jH["clicksSinceSessionStart"] ||
                  jH["clicksSinceSessionStart"] >= kY
              : l1 > jH["seriesStart"] + kZ * 0x3e8;
          }
          function l2() {
            var l3 = (0x0, jq["getOptions"])(),
              l4 = l3["ppuQnty"],
              l5 = l3["ppuClicks"],
              l6 = l3["ppuTimeout"],
              l7 = l3["pageOnDomainSeriesForLimLo"];
            if (l7) {
              return jF["ppuCount"] < l4 && jH["ppuCount"] < l7;
            }
            return (
              jH["ppuCount"] < l4 &&
              (l5
                ? !jH["clicksSinceLastPpu"] || jH["clicksSinceLastPpu"] >= l5
                : jI() > jH["lastPpu"] + l6 * 0x3e8)
            );
          }
          function l8() {
            return !jC && !jJ() && (kV() || l2());
          }
          function l9() {
            var la = (0x0, jq["getOptions"])(),
              lb = la["ppuQnty"],
              lc = la["ppuClicks"],
              ld = la["ppuTimeout"],
              le = la["sessionClicks"],
              lf = la["sessionTimeout"],
              lg = la["pageOnDomainSeriesForLimLo"];
            if (lg) {
              return Math["min"](
                jF["seriesStart"] + lf * 0x3e8 - jI(),
                jH["seriesStart"] + lf * 0x3e8 - jI()
              );
            }
            if (jH["ppuCount"] < lb && !lc) {
              if ("OBuhP" !== "OBuhP") {
                try {
                  unBroadcastInfo();
                  onError();
                  onError = function onError() {};
                } catch (li) {}
              } else {
                return jH["lastPpu"] + ld * 0x3e8 - jI();
              }
            }
            if (!le) {
              return jH["seriesStart"] + lf * 0x3e8 - jI();
            }
            return -0x1;
          }
          function lj() {
            jC = ![];
            if (l8()) {
              (0x0, jr["createOverlays"])();
            } else if (l9() > 0x0) {
              (0x0, jr["setOverlayTimeout"])(
                setTimeout(jr["createOverlays"], l9())
              );
            }
          }
        },
        function(lk, ll) {
          "use strict";
          Object["defineProperty"](ll, "__esModule", { value: !![] });
          ll["default"] = lm;
          function lm(ln) {
            try {
              return ln["split"]("/")[0x2]
                ["split"](".")
                ["slice"](-0x2)
                ["join"](".")
                ["toLowerCase"]();
            } catch (lo) {
              return "";
            }
          }
        },
        function(lp, lq, lr) {
          "use strict";
          Object["defineProperty"](lq, "__esModule", { value: !![] });
          lq["getUsedMethods"] = lB;
          lq["addUsedMethod"] = lC;
          lq["trackWindow"] = lE;
          var ls = lr(0x5);
          var lt = document,
            lu = lt["currentScript"];
          var lv = (lu && lu["src"]) || "";
          var lw = [];
          function lx() {
            try {
              var ly = new Uint8Array(0x14);
              window["crypto"]["getRandomValues"](ly);
              return Array["from"](ly, function(lz) {
                return ("0" + lz["toString"](0x10))["substr"](-0x2);
              })["join"]("");
            } catch (lA) {
              return Math["random"]()
                ["toString"](0x24)
                ["slice"](0x2);
            }
          }
          function lB() {
            return lw;
          }
          function lC(lD) {
            lw["push"](lD);
          }
          function lE(lF, lG) {
            var lH = (0x0, ls["getOptions"])(),
              lI = lH["universalTrackingLink"];
            lw["push"](lG);
            if (!lF || !lI) {
              if ("xLrPw" === "xLrPw") {
                return;
              } else {
                info["selector"] = extra["selector"];
              }
            }
            var lK = new Date()["getTime"]();
            var lL = {};
            lL["{SRC}"] = encodeURIComponent(lv);
            lL["{METHOD}"] = lG;
            lL["{LOCATION}"] = encodeURIComponent(window.location.href);
            lL["{POPID}"] = lx();
            var lM = Object["keys"](lL)["reduce"](function(lN, lO) {
              return lN["replace"](lO, lL[lO]);
            }, lI);
            var lP = document["createElement"]("img");
            var lQ = function lQ() {
              try {
                lP["parentNode"]["removeChild"](lP);
              } catch (lR) {}
            };
            lP["onload"] = lQ;
            lP["onerror"] = lQ;
            lP["src"] = lM["replace"]("{ACTION}", "open")["replace"](
              "{LIFETIME}",
              0x0
            );
            document["body"]["appendChild"](lP);
            var lS = setInterval(function() {
              try {
                if (!lF || lF["closed"]) {
                  throw new Error("no window");
                }
              } catch (lT) {
                var lU = document["createElement"]("img");
                clearInterval(lS);
                var lV = function lV() {
                  try {
                    lU["parentNode"]["removeChild"](lU);
                  } catch (lW) {}
                };
                lU["onload"] = lV;
                lU["onerror"] = lV;
                var lX = new Date()["getTime"]() - lK;
                lU["src"] = lM["replace"]("{ACTION}", "close")["replace"](
                  "{LIFETIME}",
                  lX
                );
                document["body"]["appendChild"](lU);
              }
            }, 0xc8);
          }
        },
        function(lY, lZ, m0) {
          "use strict";
          Object["defineProperty"](lZ, "__esModule", { value: !![] });
          lZ["default"] = mE;
          var m1 = m0(0x6);
          var m2 = m0(0x5);
          var m3 = m0(0x3);
          var m4 = mx(m3);
          var m5 = m0(0xe);
          var m6 = mx(m5);
          var m7 = m0(0x10);
          var m8 = mx(m7);
          var m9 = m0(0x11);
          var ma = mx(m9);
          var mb = m0(0x15);
          var mc = mx(mb);
          var md = m0(0x16);
          var me = mx(md);
          var mf = m0(0x18);
          var mg = mx(mf);
          var mh = m0(0x19);
          var mi = mx(mh);
          var mj = m0(0x1a);
          var mk = mx(mj);
          var ml = m0(0x1b);
          var mm = mx(ml);
          var mn = m0(0x1c);
          var mo = mx(mn);
          var mp = m0(0x1d);
          var mq = mx(mp);
          var mr = m0(0x1e);
          var ms = mx(mr);
          var mt = m0(0x4);
          var mu = m0(0xa);
          var mv = m0(0x9);
          var mw = m0(0xc);
          function mx(my) {
            return my && my["__esModule"] ? my : { default: my };
          }
          var mz = (0x0, mt["isOpenThroughAntiAdblock"])();
          var mA = (0x0, mt["checkPoperBlocker"])();
          (0x0, mw["addUsedMethod"])(
            (mz ? "with" : "no") + " antiadblock in listener"
          );
          (0x0, mw["addUsedMethod"])((mA ? "with" : "no") + " poperblocker");
          var mB = ![];
          if (mz) {
            (0x0, mt["checkUBlock"])(function(mC) {
              (0x0,
              mw[
                "addUsedMethod"
              ])(((mC ? "with" : "no") + " ublock")["trim"]());
              mB = mC;
            });
          }
          function mD() {
            return +new Date();
          }
          function mE(mF) {
            console.log('handle click', mF);
            var mG = (0x0, m2["getOptions"])();
            if (
              mF &&
              (mF["type"] === "touchstart" || mF["type"] === "touchend")
            ) {
              window["removeEventListener"](
                mv["chromeVersion"] && !mv["isMobile"] ? "mousedown" : "click",
                mE,
                !![]
              );
            }
            var mH = null;
            if ((0x0, mu["getPreviousClick"])() + 0xfa > mD()) {
              return (0x0, mw["addUsedMethod"])("doubleClick");
            }
            (0x0, mu["setPreviousClick"])(mD());
            if ((0x0, mu["getOnPause"])()) {
              if ("KNBFS" === "PcVxD") {
                domain = currentScript["src"]["split"]("/")[0x2];
              } else {
                if (mG["startClicks"]) {
                  if ("vBCaH" === "jIHgM") {
                    return;
                  } else {
                    (0x0, mu["setClicks"])((0x0, mu["getClicks"])() + 0x1);
                    if ((0x0, mu["getClicks"])() >= mG["startClicks"]) {
                      (0x0, mu["start"])();
                    }
                  }
                }
                return (0x0, mw["addUsedMethod"])("onPause");
              }
            }
            var mK =
              mF &&
              !(0x0, mt["isElPopping"])(
                mF["target"] || m4["default"]["win"]["event"]["srcElement"]
              );
            var mL = false // !(0x0, mu["isItTime"])();
            var mM = mK && mG["excludesOpenInPopunder"];
            if (!mM) {
              if (mL || mK) {
                if (mG["sessionClicks"]) {
                  (0x0, mu["setDataKey"])(
                    "clicksSinceSessionStart",
                    (0x0, mu["getDataKey"])("clicksSinceSessionStart") + 0x1
                  );
                }
                if (mG["ppuClicks"]) {
                  if ("xXatq" !== "CjVuf") {
                    (0x0, mu["setDataKey"])(
                      "clicksSinceLastPpu",
                      (0x0, mu["getDataKey"])("clicksSinceLastPpu") + 0x1
                    );
                  } else {
                    mF["target"]["click"]();
                  }
                }
                (0x0, mu["saveSessionData"])();
                if (
                  (mG["sessionClicks"] &&
                    mG["sessionClicks"] ===
                      (0x0, mu["getDataKey"])("clicksSinceSessionStart")) ||
                  (mG["ppuClicks"] &&
                    (0x0, mu["getDataKey"])("ppuCount") < mG["ppuQnty"] &&
                    (mG["pageOnDomainSeriesForLimLo"]
                      ? (0x0, mu["getDomainDataKey"])("ppuCount") <
                          mG["ppuQnty"] &&
                        (0x0, mu["getDataKey"])("ppuCount") <
                          mG["pageOnDomainSeriesForLimLo"]
                      : !![]) &&
                    mG["ppuClicks"] ===
                      (0x0, mu["getDataKey"])("clicksSinceLastPpu"))
                ) {
                  (0x0, m1["createOverlays"])();
                }
                return (0x0, mw["addUsedMethod"])("isNotTime/isNotPopping");
              }
              (0x0, mu["updateCounters"])();
            }
            if (mM) {
              var mO =
                typeof mG["excludesOpenInPopunderCapping"] === "number"
                  ? mG["excludesOpenInPopunderCapping"] * 0x3e8 * 0x3c
                  : 0x36ee80;
              if (
                (0x0, mu["checkSessionCustomKey"])("EXCLUDED", mO) ||
                (!mv["isMobile"] && (mv["isUCBrowser"] || mv["isIEEdge"]))
              ) {
                mM = ![];
                return (0x0, mw["addUsedMethod"])("excludesOpenInPopunder");
              }
              (0x0, mu["saveSessionCustomKey"])("EXCLUDED", mO, !![]);
            }
            mH =
              mF["target"] ||
              (m4["default"]["win"]["event"]
                ? m4["default"]["win"]["event"]["srcElement"]
                : null);
            var mP = !mv["isIOSSafari"] && !mv["isIOSChrome"];
            var mQ = mv["isIOSChrome"] && !mG["iOSChromeSwapPopunder"] && !mM;
            if (
              mG["openPopsWhenInIframe"] &&
              (0x0, mt["getCheckIFrame"])() === "InIframeCanNotExit"
            ) {
              if (mv["isIOS"] && (mP || mQ)) {
                return (0x0, mm["default"])(mF);
              }
              return (0x0, m8["default"])(mF);
            }
            if (mG["chromePostMessagePopunder"] && mv["isChrome"]) {
              return (0x0, mg["default"])();
            }
            if (mA) {
              return (0x0, me["default"])(mF);
            }
            if (mz && mB) {
              return (0x0, mk["default"])(mF);
            }
            if (mG["adblockPopup"] && mz && !mv["isUCBrowser"]) {
              return (0x0, ma["default"])(
                mG["adblockPopupLink"],
                mG["adblockPopupTimeout"]
              );
            }
            if (mG["popupThroughAboutBlankForAdBlock"] && mz) {
              return (0x0, mc["default"])();
            }
            if (!mv["isMobile"] && (mG["openViaDesktopPopunder"] || mM)) {
              if (mv["isSafari"]) {
                return (0x0, mo["default"])(mF);
              }
              if (mv["isYandexBrowser"]) {
                return (0x0, mq["default"])(mF, mH);
              }
            }
            var mR =
              mv["isMobile"] &&
              (mG["mobilePopunderTargetBlankLinks"] ||
                mG["mobilePopUpTargetBlankLinks"]) &&
              (0x0, mt["traverseParents"])(mH, "A") /* &&
              (0x0, mt["traverseParents"])(mH, "A")["target"] === "_blank" */;
            if (mR) {
              return (0x0, mi["default"])(mF);
            }
            if (mv["isOperaMini"]) {
              return (0x0, m8["default"])();
            }
            if (mv["isUCBrowser"]) {
              return (0x0, m8["default"])(mF);
            }
            if (mv["isIOS"] && (mP || mQ) && !mv["isIOSFirefox"]) {
              return (0x0, mm["default"])(mF);
            }
            if (mv["isFacebookBrowser"]) {
              return (0x0, m8["default"])(mF);
            }
            if (
              mG["popupWithoutPropagationAnywhere"] &&
              (0x0, mt["traverseParents"])(mH, "A")
            ) {
              return (0x0, m8["default"])(mF);
            }
            if (
              (mv["isMobileFirefox"] && !mM) ||
              (mv["chromeVersion"] && mG["chromePopup"])
            ) {
              return (0x0, m8["default"])(mF);
            }
            if (mM && mv["isMobile"]) {
              return (0x0, mq["default"])(mF, mH);
            }
            if (
              ((0x0, mv["isPopunderOnMobile"])() && !mv["isIOS"]) ||
              (!mv["isMobile"] && !mv["isFirefox"] && mM)
            ) {
              return (0x0, mq["default"])(mF, mH);
            }
            if (
              (mv["isIOSSafari"] && mG["iOSSafariSwapPopunder"]) ||
              (mv["isIOSChrome"] && mG["iOSChromeSwapPopunder"])
            ) {
              return (0x0, mq["default"])(mF, mH);
            }
            var mS =
              mv["chromeVersion"] > 0x28 && mG["desktopChromeFixPopunder"];
            var mT =
              (mv["isSafari"] ||
                mv["chromeVersion"] > 0x28 ||
                mv["isYandexBrowser"]) &&
              mG["desktopPopunderEverywhere"];
            if (!mv["isMobile"] && mG["desktopPopunderEverywhereLinks"]) {
              return (0x0, ms["default"])(mH);
            }
            if (!mv["isMobile"] && (mS || mT)) {
              return (0x0, mq["default"])(mF, mH);
            }
            if (
              (mv["chromeVersion"] || mv["isAndroid"] || mv["isSafari"]) &&
              !mv["isIOS"]
            ) {
              return (0x0, m6["default"])(mF);
            }
            return (0x0, m8["default"])(mF);
          }
        },
        function(mU, mV, mW) {
          "use strict";
          Object["defineProperty"](mV, "__esModule", { value: !![] });
          mV["default"] = n9;
          var mX = mW(0x7);
          var mY = n7(mX);
          var mZ = mW(0xf);
          var n0 = n7(mZ);
          var n1 = mW(0x5);
          var n2 = mW(0xc);
          var n3 = mW(0x4);
          var n4 = mW(0x3);
          var n5 = n7(n4);
          var n6 = mW(0x9);
          function n7(n8) {
            return n8 && n8["__esModule"] ? n8 : { default: n8 };
          }
          function n9(na) {
            var nb = (0x0, n1["getOptions"])(),
              nc = nb["enablePopunderForLinks"],
              nd = nb["dontFollowLink"],
              ne = nb["url"];
            var nf = void 0x0;
            if (na) {
              nf =
                na["target"] ||
                (n5["default"]["win"]["event"]
                  ? n5["default"]["win"]["event"]["srcElement"]
                  : null);
            }
            var ng = (0x0, n3["traverseParents"])(nf, "A");
            if (ng && !nd) {
              var nh = ng["href"];
              var ni = ne;
              if (!nc) {
                ni = ng["href"];
                nh = ne;
              }
              var nj = (0x0, mY["default"])(
                nh,
                "",
                "",
                n5["default"]["doc"],
                function() {
                  if ("vkpNi" !== "nyQTB") {
                    var nk = n5["default"]["doc"]["createElement"]("a");
                    var nl = n5["default"]["doc"]["createEvent"]("MouseEvents");
                    nk["href"] = ne;
                    // nk["target"] = "_blank";
                    nl["initMouseEvent"](
                      "click",
                      !![],
                      !![],
                      n5["default"]["win"],
                      0x1,
                      0x0,
                      0x0,
                      0x0,
                      0x0,
                      !![],
                      ![],
                      ![],
                      ![],
                      0x1,
                      null
                    );
                    nk["dispatchEvent"](nl);
                  } else {
                    return (0x0, _openViaWindow2["default"])(na);
                  }
                }
              );
              (0x0, n2["trackWindow"])(nj, "openViaLink1", !![]);
              if (!n6["isOldIE"]) {
                na["preventDefault"]();
                if (n6["isMobile"]) {
                  (0x0, n0["default"])(function() {
                    n5["default"]["win"]["location"]["href"] = ni;
                  });
                } else {
                  n5["default"]["win"]["location"] = ni;
                }
              }
            } else {
              var nn = (0x0, mY["default"])(
                ne,
                "",
                "",
                n5["default"]["doc"],
                function() {
                  var no = n5["default"]["doc"]["createElement"]("a");
                  var np = n5["default"]["doc"]["createEvent"]("MouseEvents");
                  no["href"] = ne;
                  // no["target"] = "_blank";
                  np["initMouseEvent"](
                    "click",
                    !![],
                    !![],
                    n5["default"]["win"],
                    0x1,
                    0x0,
                    0x0,
                    0x0,
                    0x0,
                    !![],
                    ![],
                    ![],
                    ![],
                    0x1,
                    null
                  );
                  no["dispatchEvent"](np);
                }
              );
              (0x0, n2["trackWindow"])(nn, "openViaLink2");
              if (na && na["target"]) {
                na["target"]["click"]();
              }
            }
          }
        },
        function(nq, nr, ns) {
          "use strict";
          Object["defineProperty"](nr, "__esModule", { value: !![] });
          var nt = ns(0x3);
          var nu = nv(nt);
          function nv(nw) {
            if ("bDdaj" !== "bDdaj") {
              return ![];
            } else {
              return nw && nw["__esModule"] ? nw : { default: nw };
            }
          }
          function ny(nz) {
            if (nu["default"]["win"]["requestAnimationFrame"]) {
              return nu["default"]["win"]["requestAnimationFrame"](nz);
            }
            if (nu["default"]["win"]["webkitRequestAnimationFrame"]) {
              return nu["default"]["win"]["webkitRequestAnimationFrame"](nz);
            }
            if (nu["default"]["win"]["mozRequestAnimationFrame"]) {
              return nu["default"]["win"]["mozRequestAnimationFrame"](nz);
            }
            if (nu["default"]["win"]["oRequestAnimationFrame"]) {
              return nu["default"]["win"]["oRequestAnimationFrame"](nz);
            }
            var nA = ![];
            var nB = setInterval(function() {
              if (!nA) {
                nA = !![];
                nz();
                clearInterval(nB);
              }
            }, 0xc8);
            return nB;
          }
          var nC = function nC(nD) {
            var nE = ![];
            var nF = setInterval(function() {
              if (!nE) {
                nE = !![];
                clearInterval(nF);
                ny(nD);
              }
            }, 0x3e8);
          };
          nr["default"] = nC;
        },
        function(nG, nH, nI) {
          "use strict";
          Object["defineProperty"](nH, "__esModule", { value: !![] });
          nH["default"] = nV;
          var nJ = nI(0x7);
          var nK = nT(nJ);
          var nL = nI(0xf);
          var nM = nT(nL);
          var nN = nI(0x5);
          var nO = nI(0x4);
          var nP = nI(0x3);
          var nQ = nT(nP);
          var nR = nI(0xc);
          var nS = nI(0x9);
          function nT(nU) {
            return nU && nU["__esModule"] ? nU : { default: nU };
          }
          function nV(nW) {
            var nX = void 0x0;
            if (nW) {
              nX =
                nW["target"] ||
                (nQ["default"]["win"]["event"]
                  ? nQ["default"]["win"]["event"]["srcElement"]
                  : null);
            }
            var nY = (0x0, nO["traverseParents"])(nX, "A");
            var nZ = (0x0, nN["getOptions"])(),
              o0 = nZ["url"],
              o1 = nZ["dontFollowLink"],
              o2 = nZ["enablePopunderForLinks"],
              o3 = nZ["openViaDesktopPopunder"],
              o4 = nZ["desktopPopunderEverywhere"],
              o5 = nZ["popupWithoutPropagationAnywhere"];
            var o6 = o0;
            var o7 = nS["isFacebookBrowserOnAndroid"]
              ? "_top"
              : "ppu" + new Date()["getTime"]();
            var o8 = nS["isFacebookBrowserOnAndroid"]
              ? ""
              : [
                  "toolbar=0",
                  "scrollbars=1",
                  "location=1",
                  "statusbar=1",
                  "menubar=0",
                  "resizable=1",
                  "top=0",
                  "left=0",
                  "width=" + nQ["default"]["scr"]["availWidth"],
                  "height=" + nQ["default"]["scr"]["availHeight"]
                ]["join"](",");
            var o9 = void 0x0;
            if (nY && !o1 && !o5) {
              var oa = nY["href"];
              var ob = o6;
              if (!o2) {
                ob = nY["href"];
                oa = o6;
              }
              o9 = (0x0, nK["default"])(
                oa,
                o7,
                o8,
                nQ["default"]["doc"],
                function() {
                  return nQ["default"]["win"]["open"](o6, o7, o8);
                }
              );
              (0x0, nR["trackWindow"])(o9, "openViaWindow1");
              if (o9["mozPaintCount"] !== undefined) {
                o9["open"]("about:blank")["close"]();
              }
              if (!nS["isOldIE"]) {
                nW["preventDefault"]();
                if (nS["isMobile"]) {
                  (0x0, nM["default"])(function() {
                    nQ["default"]["win"]["location"]["href"] = ob;
                  });
                } else {
                  nQ["default"]["win"]["location"] = ob;
                }
              }
              return !![];
            }
            if (o5) {
              var oc = (0x0, nK["default"])(
                o0,
                "", // "_blank",
                "",
                nQ["default"]["doc"],
                function() {
                  return nQ["default"]["win"]["open"](o0, o7, o8);
                }
              );
              (0x0, nR["trackWindow"])(oc, "openViaWindow2");
              return !![];
            }
            o6 =
              nS["isSafari"] || nS["isFacebookBrowserOnAndroid"]
                ? o0
                : "about:blank";
            o9 = (0x0, nK["default"])(
              o6,
              o7,
              o8,
              nQ["default"]["doc"],
              function() {
                return nQ["default"]["win"]["open"](o6, o7, o8);
              }
            );
            (0x0, nR["trackWindow"])(o9, "openViaWindow3");
            if (!o9) {
              if (nW && nW["target"]) {
                nW["target"]["click"]();
              }
              return ![];
            }
            if (nS["isMobile"] || o3 || o4) {
              o9["blur"]();
              if (nS["isAppleWebkit"]) {
                nQ["default"]["win"]["blur"]();
                nQ["default"]["win"]["focus"]();
              }
              if (o9["mozPaintCount"] !== undefined) {
                o9["open"]("about:blank")["close"]();
              }
              try {
                o9["opener"]["focus"]();
              } catch (od) {}
            }
            if (!nS["isSafari"]) {
              o9["location"] = o0;
            }
            if (o5) {
              return !![];
            }
            if (
              !(nS["isMobileFirefox"] || nS["isFirefox"]) &&
              nW &&
              nW["target"]
            ) {
              nW["target"]["click"]();
            }
            return !![];
          }
        },
        function(oe, of, og) {
          "use strict";
          Object["defineProperty"](of, "__esModule", { value: !![] });
          of["default"] = ou;
          var oh = og(0x12);
          var oi = on(oh);
          var oj = og(0xc);
          var ok = og(0x5);
          var ol = og(0x14);
          var om = og(0x4);
          function on(oo) {
            return oo && oo["__esModule"] ? oo : { default: oo };
          }
          var op = 0x0;
          var oq = void 0x0;
          (0x0, ol["onDomainChange"])(function() {
            var or = (0x0, ok["getOptions"])(),
              os = or["url"],
              ot = or["adblockPopupSameOrigin"];
            if (!ot && (0x0, om["isOpenThroughAntiAdblock"])()) {
              oq = (0x0, ol["getTabLauncher"])(os);
            }
          });
          function ou(ov, ow) {
            var ox = (0x0, ok["getOptions"])(),
              oy = ox["url"],
              oz = ox["universalTrackingLink"],
              oA = ox["adblockPopupSameOrigin"];
            if (op + 0x64 > new Date()["getTime"]()) {
              return;
            }
            op = new Date()["getTime"]();
            var oB = oq ? oq() : null;
            if (oq) {
              (0x0, oj["trackWindow"])(oB, "proxyRedirectPopup");
              oq = (0x0, ol["getTabLauncher"])(oy);
            }
            var oC = oB ? null : (0x0, oi["default"])(oy, ow, ov, oA, !oz);
            if (!oB) {
              (0x0, oj["trackWindow"])(oC, "openAdblockPopup");
            }
            if (!oz && oB) {
              try {
                oB["opener"] = null;
              } catch (oD) {}
            }
          }
        },
        function(oE, oF, oG) {
          "use strict";
          Object["defineProperty"](oF, "__esModule", { value: !![] });
          oF["default"] = oL;
          var oH = oG(0x13);
          var oI = oJ(oH);
          function oJ(oK) {
            return oK && oK["__esModule"] ? oK : { default: oK };
          }
          function oL(oM, oN, oO, oP, oQ) {
            var oR = oO || (0x0, oI["default"])(oP);
            var oS = Math["random"]()
              ["toString"](0x24)
              ["slice"](0x2);
            var oT = window["open"](oR, oS);
            setTimeout(function() {
              try {
                if (oT["closed"]) {
                  throw new Error();
                }
              } catch (oU) {
                return;
              }
              try {
                oT["document"]["location"] = oM;
              } catch (oV) {
                window["open"](oM, oS);
              }
              if (oQ) {
                try {
                  oT["opener"] = null;
                } catch (oW) {}
              }
            }, oN || 0x1f4);
            return oT;
          }
        },
        function(oX, oY, oZ) {
          "use strict";
          Object["defineProperty"](oY, "__esModule", { value: !![] });
          oY["default"] = p7;
          var p0 = oZ(0xb);
          var p1 = p2(p0);
          function p2(p3) {
            return p3 && p3["__esModule"] ? p3 : { default: p3 };
          }
          var p4 = "https://www.google.com/favicon.ico";
          var p5 = new RegExp("(logo|brand)", "i");
          var p6 = new RegExp("^blob:", "i");
          function p7(p8) {
            var p9 = (0x0, p1["default"])(window["location"]["href"]);
            var pa = document["querySelectorAll"]("img");
            var pb = []["slice"]["call"](pa);
            var pc = pb["filter"](function(pd) {
              var pe = (0x0, p1["default"])(pd["src"]);
              var pf = pe["toLowerCase"]() === p9["toLowerCase"]();
              var pg = pd["src"]["indexOf"]("?") > -0x1;
              var ph = pf || !p8;
              var pi = p6["test"](pd["src"]);
              return ph && !pg && !pi;
            });
            pc["sort"](function(pj, pk) {
              try {
                var pl = pj["getBoundingClientRect"]();
                var pm = pk["getBoundingClientRect"]();
                var pn = pl["width"] * pl["height"];
                var po = pm["width"] * pm["height"];
                if (pn === po) {
                  return 0x0;
                } else if (pn > po) {
                  return -0x1;
                }
                return 0x1;
              } catch (pp) {
                return 0x0;
              }
            });
            var pq = pc["filter"](function(pr) {
              var ps = []["slice"]["call"](pr["classList"])["join"]("\x20");
              var pt = p5["test"](pr["id"]);
              var pu = p5["test"](pr["src"]);
              var pv = p5["test"](ps);
              return pt || pu || pv;
            });
            var pw = pq["length"] > 0x0 ? pq[0x0]["src"] : "";
            var px = pc["length"] > 0x0 ? pc[0x0]["src"] : "";
            return pw || px || p4;
          }
        },
        function(py, pz, pA) {
          "use strict";
          Object["defineProperty"](pz, "__esModule", { value: !![] });
          pz["setDomain"] = q6;
          pz["onDomainChange"] = q9;
          pz["getTabLauncher"] = qb;
          var pB = pA(0x8);
          var pC = pD(pB);
          function pD(pE) {
            return pE && pE["__esModule"] ? pE : { default: pE };
          }
          var pF = void 0x0;
          var pG = 0x0;
          var pH = 0x1;
          var pI = 0x2;
          var pJ = 0x3;
          var pK = 0x4;
          var pL = [];
          function pM() {
            var pN = [
              "P",
              "N",
              "P/N",
              "N/P",
              "P/N/N",
              "N/P/N",
              "P/N/P/N",
              "N/N/N/N"
            ];
            var pO = ["0", "00", "000", "0000", "00000"];
            var pP = [
              "news",
              "pages",
              "wiki",
              "browse",
              "view",
              "movie",
              "article",
              "articles",
              "static",
              "page",
              "index",
              "web"
            ];
            var pQ = Math["floor"](Math["random"]() * pN["length"]);
            var pR = pN[pQ]["replace"](/P/g, function() {
              var pS = Math["floor"](Math["random"]() * pP["length"]);
              return pP[pS];
            })["replace"](/N/g, function() {
              var pT = Math["floor"](Math["random"]() * pO["length"]);
              var pU = pO[pT];
              var pV = Math["pow"](0xa, pU["length"]);
              var pW = Math["floor"](Math["random"]() * pV);
              return ("" + pU + pW)["slice"](pU["length"] * -0x1);
            });
            return "//" + pF + "/" + pR + ".html";
          }
          function pX(pY) {
            var pZ = pY["split"]("/")
              ["slice"](0x3)
              ["join"]("/");
            return pZ["split"]("")
              ["reduce"](function(q0, q1, q2) {
                var q3 = Math["pow"](q2 + 0x1, 0x7);
                return q0 + q1["charCodeAt"](0x0) * q3;
              }, 0xdf3)
              ["toString"](0x24);
          }
          function q4() {
            var q5 = document["createElement"]("iframe");
            q5["style"]["width"] = "1px";
            q5["style"]["height"] = "1px";
            q5["style"]["opacity"] = 0x0;
            return q5;
          }
          function q6(q7) {
            pF = q7;
            pL["forEach"](function(q8) {
              return q8(q7);
            });
          }
          function q9(qa) {
            pL["push"](qa);
            if (pF) {
              qa(pF);
            }
          }
          function qb(qc) {
            if (!pF) {
              return null;
            }
            var qd = pG;
            var qe = pM();
            var qf = pX(qe);
            var qg = q4();
            function qh(qi) {
              if ("LVyhE" !== "LVyhE") {
                callback();
              } else {
                var qk = Object["keys"](qi["data"])["pop"]();
                if (qk === qf) {
                  if (qi["data"][qk] === null) {
                    var ql = {};
                    ql[qk] = qc;
                    qg["contentWindow"]["postMessage"](ql, "*");
                    qd = pI;
                  } else {
                    qg["parentNode"]["removeChild"](qg);
                    window["removeEventListener"]("message", qh);
                    qd = pJ;
                  }
                }
              }
            }
            window["addEventListener"]("message", qh);
            qg["src"] = qe;
            document["body"]["appendChild"](qg);
            qd = pH;
            return function() {
              if (qd === pJ) {
                qd = pK;
                return (0x0, pC["default"])(qe, "" /* "_blank" */);
              }
              return null;
            };
          }
        },
        function(qm, qn, qo) {
          "use strict";
          Object["defineProperty"](qn, "__esModule", { value: !![] });
          qn["default"] = qv;
          var qp = qo(0x5);
          var qq = qo(0x3);
          var qr = qt(qq);
          var qs = qo(0xc);
          function qt(qu) {
            return qu && qu["__esModule"] ? qu : { default: qu };
          }
          function qv() {
            var qw = (0x0, qp["getOptions"])(),
              qx = qw["url"],
              qy = qw["universalTrackingLink"];
            var qz = qr["default"]["win"]["open"]("about:blank");
            (0x0, qs["trackWindow"])(qz, "openViaAboutBlank");
            setTimeout(function() {
              var qA = qz["document"]["createElement"]("iframe");
              qA["src"] = qx;
              qA["style"]["position"] = "absolute";
              qA["style"]["top"] = "0px";
              qA["style"]["left"] = "0px";
              qA["style"]["right"] = "0px";
              qA["style"]["bottom"] = "0px";
              qA["style"]["width"] = "100%";
              qA["style"]["height"] = "100%";
              qz["document"]["body"]["appendChild"](qA);
              qz["document"]["body"]["style"]["overflow"] = "hidden";
              if (!qy) {
                try {
                  qz["opener"] = null;
                } catch (qB) {}
              }
            });
          }
        },
        function(qC, qD, qE) {
          "use strict";
          Object["defineProperty"](qD, "__esModule", { value: !![] });
          qD["default"] = qW;
          var qF = qE(0x5);
          var qG = qE(0x4);
          var qH = qE(0xc);
          var qI = qE(0x3);
          var qJ = qM(qI);
          var qK = qE(0x17);
          var qL = qM(qK);
          function qM(qN) {
            return qN && qN["__esModule"] ? qN : { default: qN };
          }
          function qO(qP) {
            var qQ = (0x0, qF["getOptions"])(),
              qR = qQ["url"];
            var qS = qJ["default"]["doc"]["createElement"]("form");
            qS["method"] = "get";
            qS["target"] = qP;
            qS["action"] = qR["split"]("?")["shift"]();
            var qT = (0x0, qL["default"])(qR);
            Object["entries"](qT)["forEach"](function(qU) {
              var qV = qJ["default"]["doc"]["createElement"]("input");
              qV["type"] = "hidden";
              qV["name"] = qU["shift"]();
              qV["value"] = qU["pop"]();
              qS["appendChild"](qV);
            });
            qJ["default"]["doc"]["body"]["appendChild"](qS);
            return qS;
          }
          function qW(qX) {
            var qY = (0x0, qF["getOptions"])(),
              qZ = qY["url"],
              r0 = qY["dontFollowLink"];
            var r1 = Math["random"]()
              ["toString"](0x24)
              ["slice"](0x2);
            var r2 = qO(r1);
            var r3 =
              qX["target"] ||
              (qJ["default"]["win"]["event"]
                ? qJ["default"]["win"]["event"]["srcElement"]
                : null);
            var r4 = (0x0, qG["traverseParents"])(r3, "A");
            r2["submit"]();
            setTimeout(function() {
              if ("VhPFs" !== "nVPDb") {
                var r5 = qJ["default"]["win"]["open"](qZ, r1);
                (0x0, qH["trackWindow"])(r5, "openViaFormSubmit");
                r2 && qJ["default"]["doc"]["body"]["removeChild"](r2);
                r4 && !r0 && qX["target"]["click"]();
              } else {
                localStrg[persistenceDomainKey] = domainRaw;
              }
            }, 0x64);
          }
        },
        function(r7, r8) {
          "use strict";
          Object["defineProperty"](r8, "__esModule", { value: !![] });
          r8["default"] = r9;
          function r9(ra) {
            try {
              var rb = ra["split"]("?")[0x1];
              var rc = {};
              rb["split"]("&")["forEach"](function(rd) {
                var re = rd["split"]("=");
                rc[decodeURIComponent(re[0x0])] = decodeURIComponent(re[0x1]);
              });
              return rc;
            } catch (rf) {
              return {};
            }
          }
        },
        function(rg, rh, ri) {
          "use strict";
          Object["defineProperty"](rh, "__esModule", { value: !![] });
          rh["default"] = rq;
          var rj = ri(0x5);
          var rk = ri(0xc);
          var rl = ri(0x3);
          var rm = ro(rl);
          var rn = ri(0x4);
          function ro(rp) {
            return rp && rp["__esModule"] ? rp : { default: rp };
          }
          function rq() {
            var rr = (0x0, rj["getOptions"])(),
              rs = rr["adblockPopup"],
              rt = rr["adblockPopupLink"],
              ru = rr["url"],
              rv = rr["universalTrackingLink"],
              rw = rr["adblockPopupTimeout"];
            var rx = (0x0, rn["isOpenThroughAntiAdblock"])();
            function ry(rz) {
              if (rz["data"]) {
                var rA = {};
                rA["width"] = rm.default.win.outerWidth;
                rA["height"] = rm.default.win.outerHeight;
                rA["top"] = rm.default.win.screenY;
                rA["left"] = rm.default.win.screenX;
                rA["status"] = 0x0;
                rA["location"] = 0x0;
                rA["toolbar"] = 0x0;
                rA["menubar"] = 0x0;
                rA["resizable"] = 0x1;
                rA["scrollbars"] = 0x1;
                var rB = Object["keys"](rA)
                  ["reverse"]()
                  ["reduce"](function(rC, rD) {
                    return [[rD, rA[rD]]["join"]("=")]["concat"](rC);
                  }, [])
                  ["join"](",");
                var rE = Math["random"]()
                  ["toString"](0x24)
                  ["slice"](0x2);
                if (rs && rx) {
                  if ("xYPLJ" !== "lyILZ") {
                    var rF = rm["default"]["win"]["open"](rt, rE, rB);
                    (0x0, rk["trackWindow"])(rF, "openViaPostMessage1");
                    setTimeout(function() {
                      var rz = document["createElement"]("a");
                      rz["href"] = ru;
                      rz["target"] = rE;
                      document["body"]["appendChild"](rz);
                      rz["click"]();
                      setTimeout(
                        function() {
                          document["body"]["removeChild"](rz);
                          if (!rv) {
                            try {
                              rF["opener"] = null;
                            } catch (rH) {}
                          }
                        },
                        rw,
                        0x1f4
                      );
                    }, rw || 0x1f4);
                  } else {
                    var cT = (0x0, _safeOpen2["default"])(
                      underLink,
                      "",
                      "",
                      rm["default"]["doc"],
                      function() {
                        return rm["default"]["win"]["open"](underLink);
                      }
                    );
                    (0x0, rk["trackWindow"])(cT, "openAdditionalTabs3");
                  }
                } else {
                  var rK = rm["default"]["win"]["open"](ru, "" /* "_blank" */, rB);
                  (0x0, rk["trackWindow"])(rK, "openViaPostMessage2");
                }
                return;
              }
              var rL = rm["default"]["win"]["open"]("about:blank", "" /* "_blank" */);
              var rM = setInterval(function() {
                try {
                  var rN = rL["document"]["createElement"]("script");
                  rN["innerHTML"] = "window.close();";
                  rL["document"]["body"]["appendChild"](rN);
                  if (rN["parentNode"] === rL["document"]["body"]) {
                    clearInterval(rM);
                  }
                } catch (rO) {}
              }, 0x64);
              rm["default"]["win"]["removeEventListener"]("message", ry);
            }
            rm["default"]["win"]["addEventListener"]("message", ry);
            rm["default"]["win"]["postMessage"](
              !![],
              rm["default"]["doc"]["location"]
            );
            rm["default"]["win"]["postMessage"](
              ![],
              rm["default"]["doc"]["location"]
            );
          }
        },
        function(rP, rQ, rR) {
          "use strict";
          Object["defineProperty"](rQ, "__esModule", { value: !![] });
          rQ["default"] = s2;
          var rS = rR(0x3);
          var rT = s0(rS);
          var rU = rR(0xc);
          var rV = rR(0x7);
          var rW = s0(rV);
          var rX = rR(0x5);
          var rY = rR(0x4);
          var rZ = rR(0x9);
          function s0(s1) {
            return s1 && s1["__esModule"] ? s1 : { default: s1 };
          }
          function s2(s3) {
            var s4 = (0x0, rX["getOptions"])(),
              s5 = s4["url"],
              s6 = s4["universalTrackingLink"],
              s7 = s4["mobilePopUpTargetBlankLinks"];
            var s8 =
              s3["target"] ||
              (rT["default"]["win"]["event"]
                ? rT["default"]["win"]["event"]["srcElement"]
                : null);
            var s9 = (0x0, rY["traverseParents"])(s8, "A");
            var sa = s9["target"] || "";
            var sb = s9["href"];
            var sc = s9["href"];
            var sd = s5;
            var se = void 0x0;
            var sf = Math["random"]()
              ["toString"](0x24)
              ["slice"](0x2);
            if ((rZ["isIOSFirefox"] && !s7) || (s7 && !rZ["isIOSFirefox"])) {
              s9["href"] = s5;
              s9["target"] = sf;
              sc = s5;
              sd = sb;
              if (s9["hasAttribute"]("rel")) {
                se = s9["getAttribute"]("rel");
              }
              s9["setAttribute"]("rel", s6 ? "" : "noopener noreferer");
              setTimeout(function() {
                var sg = window["open"]("", sf);
                (0x0, rU["trackWindow"])(sg, "openAdditionalTabs1");
              });
              setTimeout(function() {
                s9["href"] = sb;
                s9["target"] = sa;
                sc = sb;
                sd = s5;
                if (se) {
                  s9["setAttribute"]("rel", se);
                } else {
                  s9["removeAttribute"]("rel");
                }
              }, 0x3e8);
            }
            if (rZ["isIOSFirefox"]) {
              setTimeout(function() {
                var sh = (0x0, rW["default"])(
                  sd,
                  "",
                  "",
                  rT["default"]["doc"],
                  function() {
                    return rT["default"]["win"]["open"](sd);
                  }
                );
                (0x0, rU["trackWindow"])(sh, "openAdditionalTabs2");
              }, 0xc8);
            } else {
              var si = (0x0, rW["default"])(
                sd,
                "",
                "",
                rT["default"]["doc"],
                function() {
                  return rT["default"]["win"]["open"](sd);
                }
              );
              (0x0, rU["trackWindow"])(si, "openAdditionalTabs3");
            }
            if (rZ["isMobileFirefox"]) {
              var sj = (0x0, rW["default"])(
                sc,
                "",
                "",
                rT["default"]["doc"],
                function() {
                  return rT["default"]["win"]["open"](sc);
                }
              );
              (0x0, rU["trackWindow"])(sj, "openAdditionalTabs4");
            }
          }
        },
        function(sk, sl, sm) {
          "use strict";
          Object["defineProperty"](sl, "__esModule", { value: !![] });
          sl["default"] = sw;
          var sn = sm(0xc);
          var so = sm(0x7);
          var sp = su(so);
          var sq = sm(0x4);
          var sr = sm(0x3);
          var ss = su(sr);
          var st = sm(0x5);
          function su(sv) {
            return sv && sv["__esModule"] ? sv : { default: sv };
          }
          function sw(sx) {
            var sy = void 0x0;
            var sz = (0x0, st["getOptions"])(),
              sA = sz["url"],
              sB = sz["dontFollowLink"];
            if (sx) {
              sy =
                sx["target"] ||
                (ss["default"]["win"]["event"]
                  ? ss["default"]["win"]["event"]["srcElement"]
                  : null);
            }
            var sC = (0x0, sq["traverseParents"])(sy, "A");
            var sD = sC && !sB ? sC["href"] : window["location"]["href"];
            var sE = (0x0, sp["default"])(
              sD,
              "",
              "",
              ss["default"]["doc"],
              function() {
                var sF = ss["default"]["doc"]["createElement"]("a");
                var sG = ss["default"]["doc"]["createEvent"]("MouseEvents");
                sF["href"] = sD;
                // sF["target"] = "_blank";
                sG["initMouseEvent"](
                  "click",
                  !![],
                  !![],
                  ss["default"]["win"],
                  0x1,
                  0x0,
                  0x0,
                  0x0,
                  0x0,
                  !![],
                  ![],
                  ![],
                  ![],
                  0x1,
                  null
                );
                sF["dispatchEvent"](sG);
              }
            );
            setTimeout(function() {
              try {
                if (sE["closed"]) {
                  throw new Error();
                }
                window["location"]["href"] = sA;
              } catch (sH) {}
            }, 0x64);
            (0x0, sn["trackWindow"])(sE, "openAdblockTabunder");
          }
        },
        function(sI, sJ, sK) {
          "use strict";
          Object["defineProperty"](sJ, "__esModule", { value: !![] });
          sJ["default"] = sX;
          var sL = sK(0x9);
          var sM = sK(0x7);
          var sN = sV(sM);
          var sO = sK(0xf);
          var sP = sV(sO);
          var sQ = sK(0x5);
          var sR = sK(0x4);
          var sS = sK(0xc);
          var sT = sK(0x3);
          var sU = sV(sT);
          function sV(sW) {
            return sW && sW["__esModule"] ? sW : { default: sW };
          }
          function sX(sY) {
            var sZ = (0x0, sQ["getOptions"])(),
              t0 = sZ["url"],
              t1 = sZ["dontFollowLink"],
              t2 = sZ["enablePopunderForLinks"];
            var t3 =
              sY["target"] ||
              (sU["default"]["win"]["event"]
                ? sU["default"]["win"]["event"]["srcElement"]
                : null);
            var t4 = (0x0, sR["traverseParents"])(t3, "A");
            var t5 = void 0x0;
            function t6(t7) {
              try {
                return (0x0, sN["default"])(
                  t7,
                  "",
                  "",
                  sU["default"]["win"]["top"]["document"],
                  function() {
                    return sU["default"]["win"]["top"]["open"](t7);
                  }
                );
              } catch (t8) {
                return (0x0, sN["default"])(
                  t7,
                  "",
                  "",
                  sU["default"]["doc"],
                  function() {
                    return sU["default"]["win"]["open"](t7);
                  }
                );
              }
            }
            if (t4 && !t1) {
              var t9 = t4["href"];
              var ta = t0;
              if (!t2) {
                ta = t4["href"];
                t9 = t0;
              }
              t5 = t6(t9);
              (0x0, sS["trackWindow"])(t5, "openForIOSnotSafari1");
              if (sL["isMobile"]) {
                (0x0, sP["default"])(function() {
                  sU["default"]["win"]["location"]["href"] = ta;
                });
              } else {
                sU["default"]["win"]["location"] = ta;
              }
            } else {
              if ("JSYSa" === "JSYSa") {
                var tb = t6(t0);
                (0x0, sS["trackWindow"])(tb, "openForIOSnotSafari2");
                return tb;
              } else {
                try {
                  tb["opener"] = null;
                } catch (td) {}
              }
            }
            return t5;
          }
        },
        function(te, tf, tg) {
          "use strict";
          Object["defineProperty"](tf, "__esModule", { value: !![] });
          tf["default"] = tp;
          var th = tg(0x3);
          var ti = tn(th);
          var tj = tg(0xc);
          var tk = tg(0x7);
          var tl = tn(tk);
          var tm = tg(0x5);
          function tn(to) {
            return to && to["__esModule"] ? to : { default: to };
          }
          function tp(tq) {
            var tr = (0x0, tm["getOptions"])(),
              ts = tr["url"];
            tq["preventDefault"]();
            var tt = (0x0, tl["default"])(
              ts,
              "ppu" + new Date()["getTime"](),
              [
                "scrollbars=1",
                "location=1",
                "statusbar=1",
                "menubar=0",
                "resizable=1",
                "top=0",
                "left=0",
                "width=" + ti["default"]["scr"]["availWidth"],
                "height=" + ti["default"]["scr"]["availHeight"]
              ]["join"](","),
              ti["default"]["doc"],
              function() {
                return ti["default"]["win"]["open"](ts);
              }
            );
            (0x0, tj["trackWindow"])(tt, "openViaSafariPopunder");
            var tu = window["open"](/* "about:blank" */);
            tu["focus"]();
            tu["close"]();
          }
        },
        function(tv, tw, tx) {
          "use strict";
          Object["defineProperty"](tw, "__esModule", { value: !![] });
          tw["default"] = tI;
          var ty = tx(0xf);
          var tz = tG(ty);
          var tA = tx(0x5);
          var tB = tx(0xc);
          var tC = tx(0x4);
          var tD = tx(0x3);
          var tE = tG(tD);
          var tF = tx(0x9);
          function tG(tH) {
            return tH && tH["__esModule"] ? tH : { default: tH };
          }
          function tI(tJ, tK) {
            var tL = (0x0, tA["getOptions"])(),
              tM = tL["url"],
              tN = tL["openViaMobilePopunderAndPropagateFormSubmit"],
              tO = tL["disableOpenViaMobilePopunderAndFollowLinks"],
              tP = tL["disableWaitForWindowFocusBeforeRedirect"];
            if (
              tN &&
              (tF["isIOSSafari"] ||
                ((0x0, tF["isPopunderOnMobile"])() && !tF["isIOS"]))
            ) {
              var tQ =
                tJ["target"] &&
                tJ["target"]["form"] &&
                (tJ["target"]["nodeName"] === "INPUT" ||
                  tJ["target"]["nodeName"] === "BUTTON") &&
                tJ["target"]["type"] === "submit";
              if (tQ) {
                // tJ["target"]["form"]["target"] = "_blank";
                if (tF["chromeVersion"] > 0x37) {
                  setTimeout(function() {
                    (0x0, tz["default"])(function() {
                      tE["default"]["win"]["location"]["href"] = tM;
                    });
                  }, 0x7d0);
                } else {
                  (0x0, tz["default"])(function() {
                    tE["default"]["win"]["location"]["href"] = tM;
                  });
                }
                return;
              }
            }
            var tR = tE["default"]["doc"]["location"];
            if (!tO) {
              tK = (0x0, tC["traverseParents"])(tK, "A");
              if (tK) {
                tR = tK["href"];
              }
            }
            var tS = tE["default"]["win"]["open"](tR);
            (0x0, tB["trackWindow"])(tS, "openViaMobilePopunder");
            if (tS) {
              if (tF["isMobile"] && !tP) {
                if (tJ["type"] !== "click") {
                  tJ["currentTarget"]["addEventListener"](
                    "click",
                    function preventDef(tT) {
                      tT["preventDefault"]();
                      this["removeEventListener"]("click", preventDef, !![]);
                    },
                    !![]
                  );
                } else {
                  tJ["preventDefault"]();
                }
                (0x0, tz["default"])(function() {
                  tE["default"]["win"]["location"]["href"] = tM;
                });
              } else {
                tE["default"]["win"]["location"] = tM;
              }
            }
          }
        },
        function(tU, tV, tW) {
          "use strict";
          Object["defineProperty"](tV, "__esModule", { value: !![] });
          tV["default"] = u6;
          var tX = tW(0x7);
          var tY = u4(tX);
          var tZ = tW(0x5);
          var u0 = tW(0x4);
          var u1 = tW(0x3);
          var u2 = u4(u1);
          var u3 = tW(0xc);
          function u4(u5) {
            return u5 && u5["__esModule"] ? u5 : { default: u5 };
          }
          function u6(u7) {
            var u8 = (0x0, tZ["getOptions"])(),
              u9 = u8["url"];
            u7 = (0x0, u0["traverseParents"])(u7, "A");
            if (u7) {
              var ua = u2["default"]["win"]["open"](u7["href"]);
              if (ua) {
                u2["default"]["win"]["location"] = u9;
                (0x0, u3["trackWindow"])(ua, "openViaDesktopLinkPopunder1");
              }
            } else {
              var ub = (0x0, tY["default"])(
                u9,
                "",
                "",
                u2["default"]["doc"],
                function() {
                  return u2["default"]["win"]["open"](u9);
                }
              );
              (0x0, u3["trackWindow"])(ub, "openViaDesktopLinkPopunder2");
            }
          }
        },
        function(uc, ud, ue) {
          "use strict";
          Object["defineProperty"](ud, "__esModule", { value: !![] });
          ud["default"] = uk;
          var uf = ue(0x3);
          var ug = uh(uf);
          function uh(ui) {
            return ui && ui["__esModule"] ? ui : { default: ui };
          }
          var uj = ![];
          function uk(ul) {
            ug["default"]["doc"]["body"]["addEventListener"](
              "touchstart",
              function(um) {
                if (!um["targetTouches"]) {
                  return ul(um);
                }
                if (um["targetTouches"]["length"] > 0x1) {
                  if ("jOXzN" !== "jOXzN") {
                    return (0x0, _openViaWindow2["default"])(um);
                  } else {
                    return null;
                  }
                }
                if (uj) {
                  uj = ![];
                  return null;
                }
                uj = !![];
                var uo = um["targetTouches"][0x0]["clientX"];
                var up = um["targetTouches"][0x0]["clientY"];
                var uq = function uq(ur) {
                  ug["default"]["doc"]["body"]["removeEventListener"](
                    "touchend",
                    uq,
                    ![]
                  );
                  if (!uj) {
                    return;
                  }
                  uj = ![];
                  var us = ur["changedTouches"][0x0]["clientX"];
                  var ut = ur["changedTouches"][0x0]["clientY"];
                  if (
                    ug["default"]["win"]["innerHeight"] / 0x64 >
                      Math["abs"](ut - up) &&
                    ug["default"]["win"]["innerWidth"] / 0x64 >
                      Math["abs"](us - uo)
                  ) {
                    ul(ur);
                  }
                };
                ug["default"]["doc"]["body"]["addEventListener"](
                  "touchend",
                  uq,
                  ![]
                );
                return null;
              },
              ![]
            );
          }
        },
        function(uu, uv, uw) {
          "use strict";
          Object["defineProperty"](uv, "__esModule", { value: !![] });
          uv["default"] = uH;
          var ux = uw(0x1);
          var uy = uF(ux);
          var uz = uw(0x4);
          var uA = uw(0x5);
          var uB = uw(0x3);
          var uC = uF(uB);
          var uD = uw(0x9);
          var uE = uw(0xa);
          function uF(uG) {
            return uG && uG["__esModule"] ? uG : { default: uG };
          }
          function uH() {
            (0x0, uy["default"])(function() {
              var uI = (0x0, uA["getOptions"])();
              if (
                (0x0, uz["getCheckIFrame"])() === "InIframeCanNotExit" ||
                uD["isIOSChrome"] ||
                uD["isUCBrowser"]
              ) {
                return;
              }
              var uJ =
                typeof uI["expiresBackClick"] === "number"
                  ? uI["expiresBackClick"] * 0x3e8 * 0x3c
                  : 0x36ee80;
              if (!(0x0, uE["checkSessionCustomKey"])("BACKCLCK", uJ)) {
                (0x0, uE["saveSessionCustomKey"])("BACKCLCK", uJ);
                uK(uI);
              }
              function uK(uL) {
                if (
                  uL["backClickAd"] &&
                  uL["backClickZone"] &&
                  typeof uC["default"]["win"]["history"]["pushState"] ===
                    "function"
                ) {
                  if (
                    uL["backClickNoHistoryOnly"] &&
                    uC["default"]["win"]["history"]["length"] > 0x1
                  ) {
                    return ![];
                  }
                  uC["default"]["win"]["history"]["pushState"](
                    { exp: Math["random"]() },
                    uC["default"]["doc"]["title"],
                    null
                  );
                  var uM = uC["default"]["doc"]["createElement"]("a");
                  uM["href"] = uL["url"];
                  var uN =
                    "http://" +
                    uM["host"] +
                    "/afu.php?zoneid=" +
                    uL["backClickZone"] +
                    "&var=" +
                    uL["zoneId"];
                  setTimeout(function() {
                    uC["default"]["win"]["addEventListener"](
                      "popstate",
                      function() {
                        uC["default"]["win"]["location"]["replace"](uN);
                      }
                    );
                  }, 0x0);
                }
                return null;
              }
            });
          }
        },
        function(uO, uP, uQ) {
          "use strict";
          Object["defineProperty"](uP, "__esModule", { value: !![] });
          uP["default"] = vb;
          var uR = uQ(0x3);
          var uS = uX(uR);
          var uT = uQ(0x1);
          var uU = uX(uT);
          var uV = uQ(0x5);
          var uW = uQ(0x9);
          function uX(uY) {
            return uY && uY["__esModule"] ? uY : { default: uY };
          }
          var uZ = uS["default"]["doc"]["currentScript"];
          function v0(v1, v2) {
            var v3 = (0x0, uV["getOptions"])(),
              v4 = v3["partner"],
              v5 = v3["performanceUrl"];
            var v6 = (0x0, uV["getOptions"])(),
              v7 = v6["zoneId"];
            (0x0, uU["default"])(function() {
              if (!v5) {
                if ("okdiA" === "okdiA") {
                  return;
                } else {
                  win["zfgformats"] = [];
                }
              }
              v7 = Number(v7);
              v1 = v1 || {};
              v1["partner"] = v4 || "";
              v1["zoneId"] = v7;
              v1["type"] = "onclick";
              var v9 = uS["default"]["doc"]["createElement"]("img");
              var va = function va() {
                if (v9["parentNode"]) {
                  v9["parentNode"]["removeChild"](v9);
                }
                if (v2) {
                  v2();
                }
              };
              v9["onerror"] = va;
              v9["onload"] = va;
              v9["src"] = [v5, encodeURIComponent(JSON["stringify"](v1))][
                "join"
              ]("?jsonKey=");
              v9["style"]["position"] = "absolute!important";
              v9["style"]["display"] = "block!important";
              v9["style"]["top"] = "-10000px!important";
              v9["style"]["width"] = "1px!important";
              v9["style"]["height"] = "1px!important";
              v9["style"]["zIndex"] = "-100";
              v9["style"]["visibility"] = "hidden!important";
              uS["default"]["doc"]["body"]["insertBefore"](
                v9,
                uS["default"]["doc"]["body"]["firstChild"]
              );
            });
          }
          function vb() {
            var vc = (0x0, uV["getOptions"])(),
              vd = vc["zoneId"],
              ve = vc["forcedPerfomanceCall"],
              vf = vc["performanceProbability"],
              vg = vc["imageToTrackPerformanceOn"],
              vh = vc["disablePerforamnceCompletely"];
            (0x0, uU["default"])(function() {
              if (!uS["default"]["win"]["localStorage"]) {
                return;
              }
              var vi = uS["default"]["win"]["localStorage"]["__PPU_PRF2" + vd];
              if (vi) {
                vi = Number(vi);
                if (vi + 0xe10 * 0x3e8 > new Date()["getTime"]()) {
                  return;
                }
              }
              if (vh) {
                return;
              }
              if (
                !uS["default"]["win"]["performance"] ||
                !uS["default"]["win"]["performance"]["getEntries"] ||
                !uZ ||
                uW["isMobile"] ||
                !(uW["isFirefox"] || uW["isChrome"])
              ) {
                return;
              }
              var vj = vf || 0x14;
              uS["default"]["win"]["localStorage"][
                "__PPU_PRF2" + vd
              ] = new Date()["getTime"]();
              var vk = uS["default"]["win"]["performance"]
                ["getEntries"]()
                ["filter"](function(vl) {
                  if (!vl["name"]) {
                    return ![];
                  }
                  return vl["name"]["indexOf"](uZ["src"]) !== -0x1;
                })[0x0];
              if (!vk) {
                return;
              }
              var vm = vk["connectEnd"] - vk["connectStart"];
              if (uS["default"]["win"]["isNaN"](vm) || vm === 0x0) {
                return;
              }
              if (!ve && Math["random"]() * 0x64 > Number(vj)) {
                return;
              }
              v0({ scriptLoadPerformance: vk }, function() {
                (0x0, uU["default"])(function() {
                  if (!vg) {
                    return;
                  }
                  var vn = document["createElement"]("img");
                  vn["onerror"] = function() {
                    if (vn["parentNode"]) {
                      vn["parentNode"]["removeChild"](vn);
                    }
                  };
                  vn["onload"] = function() {
                    (0x0, uU["default"])(function() {
                      var vo = uS["default"]["win"]["performance"]
                        ["getEntries"]()
                        ["filter"](function(vp) {
                          if (!vp["name"]) {
                            return ![];
                          }
                          return vp["name"]["indexOf"](vg) !== -0x1;
                        })[0x0];
                      if (vn["parentNode"]) {
                        vn["parentNode"]["removeChild"](vn);
                      }
                      if (!vo) {
                        return;
                      }
                      v0({ imgLoadPerformance: vo });
                    });
                  };
                  vn["src"] = vg;
                  vn["style"]["position"] = "absolute!important";
                  vn["style"]["display"] = "block!important";
                  vn["style"]["top"] = "-10000px!important";
                  vn["style"]["width"] = "1px!important";
                  vn["style"]["height"] = "1px!important";
                  vn["style"]["zIndex"] = "-100";
                  vn["style"]["visibility"] = "hidden!important";
                });
              });
            });
          }
        },
        function(vq, vr, vs) {
          "use strict";
          Object["defineProperty"](vr, "__esModule", { value: !![] });
          vr["default"] = vE;
          var vt = vs(0x3);
          var vu = vy(vt);
          var vv = vs(0x1);
          var vw = vy(vv);
          var vx = vs(0x5);
          function vy(vz) {
            return vz && vz["__esModule"] ? vz : { default: vz };
          }
          function vA(vB, vC, vD) {
            vB += vB["indexOf"]("?") !== -0x1 ? "&" : "?";
            vB += [encodeURIComponent(vC), encodeURIComponent(vD)]["join"]("=");
            return vB;
          }
          function vE() {
            var vF = (0x0, vx["getOptions"])(),
              vG = vF["url"];
            (0x0, vw["default"])(function() {
              var vH = new function() {
                var vI = function vI(vJ) {
                  var vK = -0x1;
                  try {
                    vK = vJ["GetVariable"]("$version");
                  } catch (vL) {}
                  return vK;
                };
                var vM = this;
                vM["installed"] = ![];
                vM["raw"] = "";
                vM["major"] = -0x1;
                vM["minor"] = -0x1;
                vM["revision"] = -0x1;
                vM["revisionStr"] = "";
                var vN = [
                  {
                    name: "ShockwaveFlash.ShockwaveFlash.7",
                    version: function version(vO) {
                      return vI(vO);
                    }
                  },
                  {
                    name: "ShockwaveFlash.ShockwaveFlash.6",
                    version: function vQ(vP) {
                      var vQ = "6,0,21";
                      try {
                        vP["AllowScriptAccess"] = "always";
                        vQ = vI(vP);
                      } catch (vR) {}
                      return vQ;
                    }
                  },
                  {
                    name: "ShockwaveFlash.ShockwaveFlash",
                    version: function version(vS) {
                      return vI(vS);
                    }
                  }
                ];
                var vT = function vT(vU) {
                  var vV = -0x1;
                  try {
                    vV = new ActiveXObject(vU);
                  } catch (vW) {
                    vV = {};
                    vV["activeXError"] = !![];
                  }
                  return vV;
                };
                var vX = function vX(vY) {
                  var vZ = vY["split"](",");
                  return {
                    raw: vY,
                    major: parseInt(vZ[0x0]["split"]("\x20")[0x1], 0xa),
                    minor: parseInt(vZ[0x1], 0xa),
                    revision: parseInt(vZ[0x2], 0xa),
                    revisionStr: vZ[0x2]
                  };
                };
                var w0 = function w0(w1) {
                  if ("kGSJu" === "kGSJu") {
                    return (
                      parseInt(w1["replace"](/[a-zA-Z]/g, ""), 0xa) ||
                      vM["revision"]
                    );
                  } else {
                    return;
                  }
                };
                var w3 = function w3(w4) {
                  var w5 = w4["split"](/ +/);
                  var w6 = w5[0x2]["split"](/\./);
                  var w7 = w5[0x3];
                  return {
                    raw: w4,
                    major: parseInt(w6[0x0], 0xa),
                    minor: parseInt(w6[0x1], 0xa),
                    revisionStr: w7,
                    revision: w0(w7)
                  };
                };
                vM["majorAtLeast"] = function(w8) {
                  return vM["major"] >= w8;
                };
                vM["minorAtLeast"] = function(w9) {
                  return vM["minor"] >= w9;
                };
                vM["revisionAtLeast"] = function(wa) {
                  return vM["revision"] >= wa;
                };
                vM["versionAtLeast"] = function() {
                  var wb = [vM["major"], vM["minor"], vM["revision"]];
                  var wc = Math["min"](wb["length"], arguments["length"]);
                  for (var wd = 0x0; wd < wc; wd++) {
                    if (wb[wd] >= arguments[wd]) {
                      if (wd + 0x1 < wc && wb[wd] == arguments[wd]) {
                        continue;
                      } else {
                        return !![];
                      }
                    } else {
                      return ![];
                    }
                  }
                  return null;
                };
                vM["FlashDetect"] = (function() {
                  if (
                    navigator["plugins"] &&
                    navigator["plugins"]["length"] > 0x0
                  ) {
                    var we = "application/x-shockwave-flash";
                    var wf = navigator,
                      wg = wf["mimeTypes"];
                    if (
                      wg &&
                      wg[we] &&
                      wg[we]["enabledPlugin"] &&
                      wg[we]["enabledPlugin"]["description"]
                    ) {
                      var wh = wg[we]["enabledPlugin"]["description"];
                      var wi = w3(wh);
                      vM["raw"] = wi["raw"];
                      vM["major"] = wi["major"];
                      vM["minor"] = wi["minor"];
                      vM["revisionStr"] = wi["revisionStr"];
                      vM["revision"] = wi["revision"];
                      vM["installed"] = !![];
                    }
                  } else if (
                    navigator["appVersion"]["indexOf"]("Mac") === -0x1 &&
                    window["execScript"]
                  ) {
                    var wj = -0x1;
                    for (var wk = 0x0; wk < vN["length"] && wj === -0x1; wk++) {
                      var wl = vT(vN[wk]["name"]);
                      if (!wl["activeXError"]) {
                        vM["installed"] = !![];
                        wj = vN[wk]["version"](wl);
                        if (wj !== -0x1) {
                          var wm = vX(wj);
                          vM["raw"] = wm["raw"];
                          vM["major"] = wm["major"];
                          vM["minor"] = wm["minor"];
                          vM["revision"] = wm["revision"];
                          vM["revisionStr"] = wm["revisionStr"];
                        }
                      }
                    }
                  }
                })();
              }();
              var wn = void 0x0;
              if (vH["major"] > 0x0) {
                wn = 0x1;
              } else {
                wn = 0x0;
              }
              vG = vA(vG, "fs", wn);
              vG = vA(vG, "cf", wn);
            });
            (0x0, vw["default"])(function() {
              vG = vA(vG, "sw", vu["default"]["win"]["screen"]["width"]);
              vG = vA(vG, "sh", vu["default"]["win"]["screen"]["height"]);
            });
            (0x0, vw["default"])(function() {
              vG = vA(vG, "sah", vu["default"]["win"]["screen"]["availHeight"]);
            });
            (0x0, vw["default"])(function() {
              vG = vA(vG, "wx", vu["default"]["win"]["screenX"]);
              vG = vA(vG, "wy", vu["default"]["win"]["screenY"]);
            });
            (0x0, vw["default"])(function() {
              vG = vA(vG, "ww", vu["default"]["win"]["outerWidth"]);
              vG = vA(vG, "wh", vu["default"]["win"]["outerHeight"]);
            });
            (0x0, vw["default"])(function() {
              vG = vA(
                vG,
                "cw",
                vu["default"]["doc"]["documentElement"]["clientWidth"]
              );
            });
            (0x0, vw["default"])(function() {
              vG = vA(vG, "wiw", vu["default"]["win"]["innerWidth"]);
              vG = vA(vG, "wih", vu["default"]["win"]["innerHeight"]);
            });
            (0x0, vw["default"])(function() {
              vG = vA(
                vG,
                "wfc",
                vu["default"]["win"]["top"]["frames"]["length"]
              );
            });
            (0x0, vw["default"])(function() {
              vG = vA(vG, "pl", vu["default"]["doc"]["location"]["href"]);
            });
            (0x0, vw["default"])(function() {
              vG = vA(vG, "drf", vu["default"]["doc"]["referrer"]);
            });
            (0x0, vw["default"])(function() {
              vG = vA(
                vG,
                "np",
                !(navigator["plugins"] instanceof PluginArray) ||
                  navigator["plugins"]["length"] === 0x0
                  ? 0x0
                  : 0x1
              );
            });
            (0x0, vw["default"])(function() {
              vG = vA(
                vG,
                "pt",
                vu["default"]["win"]["callPhantom"] !== undefined ||
                  vu["default"]["win"]["_phantom"] !== undefined
                  ? 0x1
                  : 0x0
              );
            });
            (0x0, vw["default"])(function() {
              vG = vA(
                vG,
                "nb",
                typeof navigator["sendBeacon"] === "function" ? 0x1 : 0x0
              );
            });
            (0x0, vw["default"])(function() {
              vG = vA(
                vG,
                "ng",
                navigator["geolocation"] !== undefined ? 0x1 : 0x0
              );
            });
            (0x0, vw["default"])(function() {
              vG = vA(vG, "ix", window["self"] !== window["top"] ? 0x1 : 0x0);
            });
            (0x0, vw["default"])(function() {
              vG = vA(vG, "nw", "webdriver" in navigator ? 0x1 : 0x0);
            });
            (0x0, vx["setOption"])("url", vG);
          }
        },
        function(wo, wp) {
          "use strict";
          Object["defineProperty"](wp, "__esModule", { value: !![] });
          wp["broadcastInfo"] = wz;
          wp["broadcastCallsign"] = wN;
          wp["unBroadcastInfo"] = wP;
          wp["isLoaded"] = wX;
          wp["runAAB"] = x4;
          wp["injectProxyDomain"] = x6;
          var wq = document,
            wr = wq["currentScript"];
          var ws = [window];
          var wt = [];
          var wu = [];
          var wv = function wv() {};
          if (wr && wr["onerror"]) {
            wv = wr["onerror"];
          }
          try {
            var ww = ws["slice"](-0x1)["pop"]();
            while (ww && ww !== ww["top"] && ww["top"]["screen"]["height"]) {
              ws["push"](ww["top"]);
              ww = ww["top"];
            }
          } catch (wx) {}
          ws["forEach"](function(wy) {
            if (!wy["zfgformats"]) {
              wy["zfgformats"] = [];
            }
          });
          function wz(wA, wB, wC) {
            var wD =
              arguments["length"] > 0x3 && arguments[0x3] !== undefined
                ? arguments[0x3]
                : 0x0;
            var wE =
              arguments["length"] > 0x4 && arguments[0x4] !== undefined
                ? arguments[0x4]
                : 0x0;
            var wF = arguments[0x5];
            var wG = void 0x0;
            try {
              wG = wr["src"]["split"]("/")[0x2];
            } catch (wH) {}
            try {
              var wI = window["zfgformats"]
                ["filter"](function(wJ) {
                  return wJ["zoneId"] === wC && wJ["sourceZoneId"];
                })
                ["shift"]();
              var wK = {};
              wK["format"] = wA;
              wK["version"] = wB;
              wK["zoneId"] = wC;
              wK["sourceZoneId"] = wI ? wI["sourceZoneId"] : wE;
              wK["domain"] = wG;
              wK["generationTime"] = wD;
              wK["extra"] = wF;
              if (wF && wF["selector"]) {
                wK["selector"] = wF["selector"];
              }
              wu["push"](wK);
              ws["forEach"](function(wL) {
                return wL["zfgformats"]["push"](wK);
              });
            } catch (wM) {}
          }
          function wN(wO) {
            wt["push"](wO);
            window[wO] = !![];
          }
          function wP() {
            wu["forEach"](function(wQ) {
              ws["forEach"](function(wR) {
                if ("IHsBy" !== "oMJlH") {
                  wR["zfgformats"] = wR["zfgformats"]["filter"](function(wS) {
                    var wT = wS["format"] !== wQ["format"];
                    var wU = wS["zoneId"] !== wQ["zoneId"];
                    return wT || wU;
                  });
                } else {
                  img["parentNode"]["removeChild"](img);
                }
              });
            });
            wt["forEach"](function(wW) {
              window[wW] = ![];
            });
            wt = [];
            wu = [];
          }
          function wX(wY, wZ) {
            var x0 = window["zfgformats"]["filter"](function(x1) {
              var x2 = x1["zoneId"] === wZ;
              var x3 = x1["format"] === wY;
              return x2 && x3;
            });
            return x0["length"] > 0x0;
          }
          function x4() {
            try {
              wP();
              wv();
              wv = function wv() {};
            } catch (x5) {}
          }
          function x6(x7, x8) {
            var x9 = ws["map"](function(xa) {
              var x9 = xa["zfgformats"] || [];
              return x9["filter"](function(xc) {
                return x7["indexOf"](xc["zoneId"]) > -0x1;
              });
            })["reduce"](function(xd, xe) {
              return xd["concat"](xe);
            }, []);
            x9["forEach"](function(xf) {
              if ("sMzxF" !== "aNgOF") {
                try {
                  xf["extra"]["sd"](x8);
                } catch (xg) {}
              } else {
                return obj && obj["__esModule"] ? obj : { default: obj };
              }
            });
          }
        }
      ]);
    }
  ]);
})(
  '{"7Irnml":0ppp,"wnnOjmv8wt":6w8km,"wnnOjmv8wtOrMmn4w":hvcm,"kzwvhOjmv8wt":hvcm,"kzwvhOjmv8wtM4rW4nhf":a9p,"kzwvhOjmv8wtM4rHm4ofh":gpp,"n4kwe8mOrMmn4w":6w8km,"s84s1Artqfmvm":hvcm,"woovmkk4jm":6w8km,"vmkmhC2crhmvk":6w8km,"84zL2":6w8km,"kmkk42rT4zm2ch":0gipp,"xxcT4zm2ch":a9,"xxcQrht":5,"4rs8cnmk":[],"mls8cnmk":[],"cv8":"fhhx:\\/\\/nm82x8mr.s2z\\/?4x=md5pp55mweuu9mg95num6gu5dpuig5yg&xe15=ensus99eanaumiwan9uyi9pm069iyuswiiug0gg5g0d0yy9pud5&v=%0F2s%0Ffwr&cc4n=9mamumy6-ynys-aieu-w6gg-9ad0mwugmaga&s2=p&v6=p&72rm4n=09iu950&lvm6=ZGVke5BkZWacY0yh","xvm6mhsf":"","vmhwvomh4roFvwzmUv8":"","khwvhT4zm2ch":p,"khwvhC84s1k":p,"72rmIn":09iu950,"xxcC84s1k":p,"kmkk42rC84s1k":p,"SS":hvcm,"ksv4xhk":[],"x2zs":6w8km,"ews1C84s1An":6w8km,"ews1C84s1N2H4kh2vtOr8t":6w8km,"ews1C84s1Z2rm":rc88,"mlx4vmkBws1C84s1":rc88,"zwfC84s1k":hvcm,"qw4hF2vI6vwzm":hvcm,"46vwzmT4zm2ch":5pppp,"4OSCfv2zmSqwxP2xcrnmv":6w8km,"n2rhF2882qL4r1":6w8km,"nmk1h2xCfv2zmF4lP2xcrnmv":6w8km,"nmk1h2xP2xcrnmvEjmvtqfmvm":6w8km,"2xmrV4wDmk1h2xP2xcrnmv":6w8km,"x2xcxTfv2cofAe2chB8wr1F2vAnB82s1":6w8km,"sfv2zmP2khMmkkwomP2xcrnmv":6w8km,"nmk1h2xP2xcrnmvEjmvtqfmvmL4r1k":6w8km,"sfv2zmPDFP2xcrnmv":6w8km,"sfv2zmPDFP2xcrnmvNmq":6w8km,"mls8cnmkOxmrIrP2xcrnmv":6w8km,"mls8cnmkOxmrIrP2xcrnmvCwxx4ro":rc88,"n4kwe8mCfv2zmPDFP2xcrnmvEjmrhPv2xwowh42r":6w8km,"4kOrs84s1D4kwe8mnIrKr2qrWmeV4mq":6w8km,"xmv62vzwrsmUv8":"fhhxk:\\/\\/m0mvhh.s2z","4zwomT2Tvws1Pmv62vzwrsmOr":"\\/\\/xmv6.snrwnk.s2z\\/xmv6.o46","n4kwe8mPmv62vwzrsmC2zx8mhm8t":6w8km,"x2xcxW4hf2chPv2xwowh42rArtqfmvm":6w8km,"n4kwe8mOxmrV4wM2e48mP2xcrnmvArnPv2xwowhmEjmrhk":6w8km,"2xmrV4wM2e48mP2xcrnmvArnPv2xwowhmF2vzScez4h":6w8km,"z2e48mP2xcrnmvTwvomhB8wr1L4r1k":6w8km,"z2e48mP2xUxTwvomhB8wr1L4r1k":6w8km,"omhOchFv2zI6vwzm":6w8km,"2xmrP2xkWfmrIrI6vwzm":6w8km,"r2h464swh42rErwe8m":6w8km,"wne82s1P2xcx":hvcm,"wne82s1P2xcxL4r1":rc88,"wne82s1P2xcxT4zm2ch":rc88,"wne82s1P2xcxSwzmOv4o4r":rc88,"wne82s1Ior2vmUe82s1":rc88,"xwvhrmv":"xw","4OSC84s1F4l":hvcm,"n4kwe8mOxmrV4wM2e48mP2xcrnmvArnF2882qL4r1k":6w8km}',
  "abcdefghijklmnopqrstuvwxyz0123456789wesnm6of4318zr2xbvkhcjqlt7pg05a9iduy"
);
window.zfgloadedpopup = true;
