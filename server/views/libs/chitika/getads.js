var chitikaDNS = {
  cdn: "151.139.242.30",
  mm: "52.3.103.10",
  image: "images-tnfdwtqajaq1wsartb.stackpathdns.com"
};

try {
  window.CHITIKA &&
    top.CHITIKA &&
    top.CHITIKA !== window.CHITIKA &&
    ((top.CHITIKA.units = top.CHITIKA.units.append(window.CHITIKA.units)),
    delete window.CHITIKA),
    (window.CHITIKA = window.CHITIKA ? window.CHITIKA : top.CHITIKA),
    (window.CHITIKA_ADS = window.CHITIKA_ADS
      ? window.CHITIKA_ADS
      : top.CHITIKA_ADS);
} catch (e) {}
if (
  ((window.CHITIKA = window.CHITIKA ? window.CHITIKA : {}),
  (window.CHITIKA_ADS = window.CHITIKA_ADS
    ? window.CHITIKA_ADS
    : (function() {
        "use strict";
        function e(e, t) {
          if ((void 0 === t && (t = document), "string" == typeof e)) {
            var i = t.getElementsByTagName("head")[0];
            if (i) {
              var n = t.createElement("script");
              return (
                (n.type = "text/javascript"), (n.src = e), i.appendChild(n), n
              );
            }
          }
        }
        function t(e, i, n, a, o) {
          return function() {
            for (var r in o) {
              var s = o[r],
                c = a[r],
                d = c + (s - c) * (Math.pow(i, 4) / Math.pow(n, 4));
              "l" == r
                ? (e.style.left = d + "px")
                : "t" == r
                ? (e.style.top = d + "px")
                : "r" == r
                ? (e.style.right = d + "px")
                : "b" == r && (e.style.bottom = d + "px");
            }
            i < n && (i++, setTimeout(t(e, i, n, a, o), 20));
          };
        }
        function i(e, t, i) {
          e.addEventListener
            ? e.addEventListener(t, i, !1)
            : e.attachEvent("on" + t, i);
        }
        function n(e, t, n, a) {
          void 0 === a && (a = document);
          var o = a.createElement("a");
          (o.href = "#chitika_close_button"),
            (o.style.background =
              "url(//" +
              chitikaDNS.image +
              "/buttons/close_round_white_on_red.png)"),
            (o.style["background-repeat"] = "no-repeat"),
            (o.style.height = "14px"),
            (o.style.position = "absolute"),
            (o.style.right = "0px"),
            (o.style.top = "0px"),
            (o.style.width = "16px"),
            (o.style.zIndex = "999999"),
            "object" == typeof t && W(o.style, t),
            i(o, "click", n),
            e.appendChild(o);
        }
        function a(e, t, i) {
          void 0 === i && (i = document);
          var a = i.createElement("div");
          return (
            (a.id = e),
            (a.className = "chitAdContainer"),
            W(a.style, {
              backgroundColor: d(t.bgColor, "#FFFFFF"),
              border: d(t.border, "none"),
              borderRadius: d(t.borderRadius, "none"),
              boxShadow: d(t.boxShadow, "none"),
              padding: d(t.padding, "none"),
              position: "fixed",
              zIndex: "99999"
            }),
            t.close_handler && n(a, t.close_config, t.close_handler, i),
            a
          );
        }
        function o(e, t, i, n) {
          void 0 === n && (n = document);
          var a = {
              allowTransparency: "allowTransparency",
              border: "0",
              className: "chitAdBlock",
              frameBorder: "0",
              height: "string" == typeof i ? 0 : i,
              hspace: "0",
              id: e,
              marginHeight: "0",
              marginWidth: "0",
              padding: "0",
              scrolling: "no",
              src: "about:blank",
              style: { margin: "0", padding: "0" },
              vspace: "0",
              width: "string" == typeof t ? 0 : t
            },
            o = n.createElement("iframe");
          return W(o, a), o;
        }
        function r(e) {
          return function() {
            for (var t = 0; t < e.frames.length; t++)
              e.frames[t].contentWindow.postMessage("close", "*");
          };
        }
        function s(e, t) {
          return function() {
            var n = e.frames[t];
            if (!e.frames_loaded[t]) {
              (e.frames_loaded[t] = !0),
                (e.message_handlers[t] = d(
                  e.message_handlers[t],
                  te(n.contentWindow)
                ));
              var a,
                o = e.message_handlers[t],
                r = n.contentWindow,
                s = !1;
              try {
                (r.CHITIKA = CHITIKA),
                  (r.CHITIKA_ADS = CHITIKA_ADS),
                  (r.handle_message = e.message_handlers[t]),
                  (r.lightbox = f),
                  (r.lightbox_config = X),
                  (r.render_ad = e.callback);
              } catch (e) {
                N("getads_except_sic1", null, { message: e.message }), (s = !0);
              }
              s && void 0 === window.postMessage
                ? (a = "window.postMessage = " + o.toString() + "; ")
                : void 0 === window.postMessage
                ? (r.postMessage = o)
                : s
                ? ((a = "var handle_message = " + o.toString() + "; "),
                  window.addEventListener
                    ? (a +=
                        'window.addEventListener("message", handle_message, true);')
                    : (a += 'window.attachEvent("onmessage", handle_message);'))
                : ((r.handle_message = o), i(r, "message", o)),
                a &&
                  ((a = "javascript:(function() { " + a + " }())"),
                  (n.src = a)),
                0 === t &&
                  navigator.userAgent &&
                  navigator.userAgent.match(/MSIE [5-8]/) &&
                  r.postMessage(
                    "write|<!DOCTYPE html><html><head></head><body></body></html>",
                    "*"
                  ),
                e.frames_ready++;
            }
          };
        }
        function c(e, t, i, n) {
          n || (n = "//" + chitikaDNS.image + "/spinner.gif");
          var a = e.createElement("div");
          (a.id = t), W(a, i);
          var o = e.createElement("img");
          return (
            (o.src = n),
            (o.style.margin = "auto"),
            (o.style.display = "block"),
            a.appendChild(o),
            a
          );
        }
        function d(e, t) {
          return null !== e && void 0 !== e ? e : t;
        }
        function l() {
          if (CHITIKA.enable_one_call) {
            for (var e = [], t = 0; t < CHITIKA.units.length; t++) {
              var i = CHITIKA.units[t],
                n = {
                  calltype: i.calltype,
                  cid: i.cid,
                  h: i.height,
                  product: i.product,
                  nump: i.nump,
                  sid: i.sid,
                  w: i.width
                };
              e.push(n);
            }
            return void 0 !== typeof JSON && void 0 !== typeof JSON.stringify
              ? JSON.stringify(e)
              : q(e);
          }
        }
        function _() {
          return void 0 !== F ? F : (F = { h: screen.height, w: screen.width });
        }
        function u() {
          if (void 0 !== P) return P;
          var e = ee.top_accessible ? top.document : window.document;
          return (P = {
            h: e.documentElement.scrollHeight || e.body.scrollHeight,
            w: e.documentElement.scrollWidth || e.body.scrollWidth
          });
        }
        function p() {
          if ($) return $;
          $ = {};
          for (
            var e = ee.top_accessible ? top.document : window.document,
              t = e.getElementsByTagName("meta"),
              i = 0;
            i < t.length;
            i++
          ) {
            var n = t[i].getAttribute("name"),
              a = t[i].getAttribute("content");
            n && a && ($[n.toLowerCase()] = a);
          }
          for (var o = 0; o < CHITIKA.snippet_priority.length; o++) {
            var r = CHITIKA.snippet_priority[o].match(/^([^\/]+)(?:\/(\d+))?/),
              i = r[2] ? parseInt(r[2], 10) : 0,
              s = e.getElementsByTagName(r[1]);
            s.length <= i || ($[r[1]] = s[i].textContent || s[i].innerText);
          }
          return $;
        }
        function h() {
          if (void 0 !== V) return V;
          var e, t, i, n;
          return (
            ee.top_same
              ? ((t = document.referrer), (n = document.location.href))
              : ee.top_accessible
              ? ((e = 1),
                (t = top.document.referrer),
                (n = top.document.location.href),
                (i = document.location.href))
              : ((e = 2),
                (n = document.referrer),
                (i = document.location.href)),
            i && n && i == n && (i = void 0),
            i && i.match(/^javascript:/) && (i = void 0),
            t &&
              t.length > 500 &&
              (t = t.replace(/[?#].*/, "")).length > 500 &&
              (t = t.match(/.*\/\/[^\/]*\//)[0]),
            (V = { frm: e, url: n, ref: t, serveUrl: i })
          );
        }
        function m() {
          if (void 0 !== U) return U;
          var e = ee.top_accessible ? top : window;
          return (U = {
            h:
              e.innerHeight ||
              e.document.documentElement.clientHeight ||
              e.document.body.clientHeight,
            w:
              e.innerWidth ||
              e.document.documentElement.clientWidth ||
              e.document.body.clientWidth
          });
        }
        function g() {
          U = void 0;
          for (var e = 0; e < CHITIKA.units.length; e++) {
            var t = CHITIKA.units[e];
            if (t.already_rendered) {
              if (t.fluidH)
                for (var i = 0; i < t.frames.length; i++) {
                  var n = t.frames[i];
                  if (n && n.contentWindow && n.contentWindow.document) {
                    var a = n.contentWindow.document.body
                      ? n.contentWindow.document.body.scrollHeight
                      : n.contentWindow.document.documentElement.scrollHeight;
                    a != t.height &&
                      ((t.height = a), (n.style.height = a + "px"));
                  }
                }
              !ee.top_accessible ||
                t.already_visible ||
                t.disable_vcpm ||
                (t.loc = w(t.container));
            }
          }
          O && "block" == O.style.display && v();
        }
        function f(e, t, n) {
          if ((N("lightbox_click", e, { hc1: n, lc1: t }), ee.top_accessible)) {
            if (
              (CHITIKA.lightbox_config && W(X, CHITIKA.lightbox_config),
              !X.height || !X.width)
            )
              for (var o = ["height", "width"], r = m(), s = 0; s < 2; s++) {
                var d = o[s];
                X[d] ||
                  ((X[d] = Math.floor(
                    r["width" == d ? "w" : "h"] * X[d + "_percent"]
                  )),
                  X[d] > X[d + "_max"]
                    ? (X[d] = X[d + "_max"])
                    : X[d] < X[d + "_min"] && (X[d] = X[d + "_min"]));
              }
            void 0 === top.lightbox_units && (top.lightbox_units = {});
            var l = top.lightbox_units;
            if (
              (null === (L = top.document.getElementById("chitika-modal")) &&
                (((L = top.document.createElement("div")).id = "chitika-modal"),
                W(L.style, {
                  allowTransparency: "allowTransparency",
                  backgroundColor: X.modal_color,
                  bottom: "0",
                  display: "none",
                  filter: "alpha(opacity=" + 100 * X.modal_opacity + ")",
                  left: "0",
                  opacity: X.modal_opacity,
                  position: "fixed",
                  right: "0",
                  top: "0",
                  zIndex: "9999",
                  zoom: "1"
                }),
                i(L, "click", y),
                top.document.body.appendChild(L),
                ((O = a(
                  "chitika-container-lightbox",
                  X,
                  top.document
                )).style.margin = "auto auto"),
                top.document.body.appendChild(O),
                O.appendChild(
                  c(
                    top.document,
                    "chitika-spinner-lightbox",
                    void 0,
                    X.spinner_url
                  )
                )),
              (O = top.document.getElementById("chitika-container-lightbox")),
              void 0 === l[e] && (l[e] = {}),
              void 0 === l[e][t])
            ) {
              top.document.getElementById(
                "chitika-spinner-lightbox"
              ).style.display = "block";
              var _ = "chitikaLightbox-" + e + "-" + t,
                u = {
                  callback: I,
                  cid: X.cid,
                  container_id: "chitika-container-lightbox",
                  container_document: top.document,
                  disable_vcpm: !0,
                  frame_id: _,
                  height: X.height,
                  impId: e,
                  product: "lightbox",
                  query: n,
                  sid: X.sid,
                  skip_one_call: 1,
                  width: X.width
                };
              (l[e][t] = u), CHITIKA.units.push(u), A();
            } else l[e][t].frames[0].style.display = "block";
            v();
          }
        }
        function I(e) {
          (void 0 !== e && (e.output || e.alturl)) || y();
          var t = CHITIKA.units[e.unit_id].frames[0];
          (top.document.getElementById(
            "chitika-spinner-lightbox"
          ).style.display = "none"),
            E(e),
            j(e),
            (t.style.display = "block");
        }
        function v() {
          var e = m(),
            t = (e.w - X.width) / 2,
            i = (e.h - X.height) / 2;
          (O.style.left = t + "px"),
            (O.style.top = i + "px"),
            (O.style.display = "block"),
            (L.style.display = "block");
        }
        function y() {
          for (var e in top.lightbox_units)
            for (var t in top.lightbox_units[e])
              top.lightbox_units[e][t].frames[0].style.display = "none";
          return (O.style.display = "none"), (L.style.display = "none"), !1;
        }
        function w(e) {
          var t = 0,
            i = 0,
            n = 0,
            a = 0;
          for (n = e.offsetWidth, a = e.offsetHeight; e; )
            try {
              (t += e.offsetLeft),
                (i += e.offsetTop),
                (e =
                  "BODY" == e.tagName
                    ? (
                        e.ownerDocument.defaultView ||
                        e.ownerDocument.parentWindow
                      ).frameElement
                    : e.offsetParent);
            } catch (e) {
              return (
                N("getads_except_locate_obj", null, { message: e.message }), {}
              );
            }
          return { x: t, y: i, w: n, h: a };
        }
        function b() {
          for (
            var e = "//" + CHITIKA.host + "/minimall", t = 0;
            t < CHITIKA.units.length;
            t++
          ) {
            var i = CHITIKA.units[t],
              n = i.frames[0],
              a = e;
            !i.already_fired &&
              i.ad_url_params &&
              n &&
              (i.frames_ready === i.hasClones + 1 &&
                (1 !== CHITIKA.enable_one_call || i.skip_one_call || 0 === t) &&
                ((i.force_rtb ||
                  (!i.disable_rtb && (i.cpm_floor || Math.random() < 0))) &&
                  (a = "http://ss.chitika.net/chitika/decision"),
                (a += i.ad_url_params),
                (i.already_fired = !0),
                (i.frame_autoclose_timeout = setTimeout(r(i), 1e4)),
                n.contentWindow.postMessage("script|" + a, "*")));
          }
        }
        function A() {
          Q && (clearTimeout(Q), (Q = null)),
            CHITIKA.mmu0_initial || (CHITIKA.mmu0_initial = 1);
          try {
            if ((D(), "chahinebounader" === CHITIKA.publisher)) return;
          } catch (e) {}
          try {
            S();
          } catch (e) {}
          try {
            k();
          } catch (e) {}
          try {
            b();
          } catch (e) {}
          for (var e = !1, t = 0; t < CHITIKA.units.length; t++)
            if (!CHITIKA.units[t].already_fired) {
              e = !0;
              break;
            }
          e && (Q = setTimeout(A, 250));
        }
        function C(e) {
          if (void 0 !== e) {
            if ((e.unit_id, e.apps)) {
              for (var t in e.apps) void 0 !== Z[t] && Z[t]();
              D(), k(), b();
            }
            if (0 === e.unit_id && CHITIKA.enable_one_call) {
              for (var i = 1; i < CHITIKA.units.length; i++)
                CHITIKA.enable_one_call &&
                  !CHITIKA.units[i].skip_one_call &&
                  (CHITIKA.units[i].impId = e.impId);
              (CHITIKA.enable_one_call = 2), k(), b();
            }
            E(e);
            try {
              j(e);
            } catch (e) {
              N("getads_except_render_inject", null, { message: e.message });
            }
            M(e),
              B(e),
              setTimeout(g, 30),
              setTimeout(g, 60),
              setTimeout(g, 180);
          }
        }
        function T() {
          return void 0 !== R
            ? R
            : (R = /i[Pp]ad/.test(navigator.userAgent)
                ? 1
                : /i[Pp]od/.test(navigator.userAgent)
                ? 4
                : /i[Pp]hone/.test(navigator.userAgent)
                ? 2
                : /[Aa]ndroid/.test(navigator.userAgent)
                ? 3
                : /BlackBerry|RIM/.test(navigator.userAgent)
                ? 5
                : 0);
        }
        function H(e, t, i) {
          return i || 0 === i ? e + "&" + t + "=" + i : e;
        }
        function K(e, t, i) {
          return i || 0 === i ? e + "&" + t + "=" + encodeURIComponent(i) : e;
        }
        function x(e, t, i) {
          return i || 0 === i
            ? ((i = i.replace(/[\W]+/, "_")),
              e + "&" + t + "=" + encodeURIComponent(i))
            : e;
        }
        function k() {
          var e = [],
            t = {},
            i = {},
            n = {},
            a = {},
            o = {};
          try {
            e = l();
          } catch (e) {
            N("getads_except_pau_1", null, { message: e.message });
          }
          try {
            t = _();
          } catch (e) {
            N("getads_except_pau_2", null, { message: e.message });
          }
          try {
            i = u();
          } catch (e) {
            N("getads_except_pau_3", null, { message: e.message });
          }
          try {
            n = p();
          } catch (e) {
            N("getads_except_pau_4", null, { message: e.message });
          }
          try {
            a = h();
          } catch (e) {
            N("getads_except_pau_5", null, { message: e.message });
          }
          try {
            o = m();
          } catch (e) {
            N("getads_except_pau_6", null, { message: e.message });
          }
          for (var r = 0; r < CHITIKA.units.length; r++) {
            var s = CHITIKA.units[r];
            if (
              !(
                !s.already_fixup ||
                s.ad_url_params ||
                (1 === CHITIKA.enable_one_call && r > 0)
              )
            ) {
              var c = "?output=" + s.output;
              (c = K(
                (c = K(
                  (c = K(
                    (c = H(
                      (c = K(
                        (c = K(c, "publisher", s.publisher)),
                        "altsid",
                        s.altsid
                      )),
                      "unit_id",
                      r
                    )),
                    "impId",
                    s.impId
                  )),
                  "extra_subid_info",
                  s.extra_subid_info
                )),
                "cpm_floor",
                s.cpm_floor
              )),
                (c =
                  CHITIKA.enable_one_call &&
                  !s.skip_one_call &&
                  void 0 !== e &&
                  "string" == typeof e
                    ? K(c, "adspec", e)
                    : K(
                        (c = K(
                          (c = K(
                            (c = K(
                              (c = K(
                                (c = x((c = K(c, "sid", s.sid)), "cid", s.cid)),
                                "calltype",
                                s.calltype
                              )),
                              "product",
                              s.product
                            )),
                            "w",
                            s.width
                          )),
                          "h",
                          s.height
                        )),
                        "nump",
                        s.nump
                      ));
              for (var d in a) {
                var g,
                  f = a[d];
                void 0 !== s.omg &&
                  (g = s.omg[d]) &&
                  g != f &&
                  ((c = H(c, "omg_" + d, 1)), (f = g)),
                  (c = K(c, d, f));
              }
              (c = K(
                (c = K(
                  (c = K(
                    (c = K(
                      (c = K(
                        (c = K(
                          (c = K(
                            (c = K(
                              (c = K(c, "altcss", s.alternate_css_url)),
                              "alturl",
                              s.alternate_ad_url
                            )),
                            "cttarget",
                            s.target
                          )),
                          "tptracker",
                          s.third_party_tracker
                        )),
                        "query",
                        s.query
                      )),
                      "where",
                      s.where
                    )),
                    "city",
                    s.city
                  )),
                  "state",
                  s.state
                )),
                "zip",
                s.zip
              )),
                s.queries &&
                  -1 !== s.queries.constructor.toString().indexOf("Array") &&
                  (c = K(c, "mquery", s.queries.join("|"))),
                (c = K(
                  (c = H(
                    (c = K(
                      (c = K(
                        (c = K(
                          (c = K(
                            (c = K(
                              (c = K(
                                (c = K(
                                  (c = K(
                                    (c = K(c, "cl_border", s.color_border)),
                                    "cl_button",
                                    s.color_button
                                  )),
                                  "cl_button_text",
                                  s.color_button_text
                                )),
                                "cl_bg",
                                s.color_bg
                              )),
                              "cl_title",
                              s.color_title
                            )),
                            "cl_text",
                            s.color_text
                          )),
                          "cl_site_link",
                          s.color_site_link
                        )),
                        "fn_title",
                        s.font_title
                      )),
                      "fn_text",
                      s.font_text
                    )),
                    "dpr",
                    window.devicePixelRatio
                  )),
                  "impsrc",
                  s.impsrc
                ));
              try {
                c = K(c, "history", window.history.length);
              } catch (e) {
                N("getads_except_pau_7", null, { message: e.message });
              }
              if (
                ((c = K(c, "size_screen", t.w + "x" + t.h)),
                (c = K(c, "size_scroll", i.w + "x" + i.h)),
                (c = K(c, "size_viewport", o.w + "x" + o.h)),
                (c = K(c, "vsn", J)),
                ee.top_accessible &&
                  "CSS1Compat" != top.document.compatMode &&
                  (c = H(c, "quirks", 1)),
                void 0 !== s.extra_params)
              )
                for (var d in s.extra_params) c = K(c, d, s.extra_params[d]);
              navigator.userAgent.match(/Chrome/) &&
                void 0 !== document.webkitVisibilityState &&
                "prerender" == document.webkitVisibilityState &&
                (c = H(c, "prerender", 1));
              for (
                var I = 0, v = 0;
                v < CHITIKA.snippet_priority.length &&
                I < CHITIKA.snippet_count;
                v++
              ) {
                var y = CHITIKA.snippet_priority[v].match(
                  /^([^\/]+)(?:\/(\d+))?/
                )[1];
                n[y] &&
                  ((c = K(
                    c,
                    "snip_" + y,
                    n[y].substring(0, CHITIKA.snippet_length)
                  )),
                  ++I);
              }
              (c = (c = c.substring(0, 2048)).replace(/%\w?$/, "")),
                void 0 !== s.adurl_fixup && (c = s.adurl_fixup(c)),
                (s.ad_url_params = c);
            }
          }
        }
        function S() {
          for (var e = 0; e < CHITIKA.units.length; e++) {
            var t = CHITIKA.units[e];
            if (t.already_fixup && !t.container)
              for (
                var n = t.container_document ? t.container_document : document,
                  a = 0;
                a <= t.hasClones;
                a++
              ) {
                var r = d(t.container_id, "chitAdBlock-" + e);
                0 !== a && (r += "-" + a);
                var c = t.frame_id ? t.frame_id : "ch_ad" + e + "-" + a,
                  l = n.getElementById(r);
                if (l) {
                  0 === a && (t.container = l),
                    l.className
                      ? -1 == l.className.indexOf("chitAdContainer") &&
                        (l.className += " chitAdContainer")
                      : (l.className = "chitAdContainer");
                  var _ = o(c, t.width, t.height);
                  t.frames.push(_),
                    i(_, "load", s(t, a)),
                    t.defer_show && (_.style.display = "none"),
                    l.appendChild(_);
                }
              }
          }
        }
        function D() {
          for (var e = 0; e < CHITIKA.units.length; e++) {
            var t = CHITIKA.units[e];
            if (!t.already_fixup) {
              t.client && ((t.publisher = t.client), delete t.client),
                (CHITIKA.publisher = d(CHITIKA.publisher, t.publisher)),
                t.publisher || (t.publisher = CHITIKA.publisher),
                t.cid ||
                  (t.sid && "Chitika Default" != t.sid
                    ? (t.cid = t.sid)
                    : (t.cid = "unit-" + e)),
                (t.impsrc = d(t.impsrc, "getads")),
                ((250 == t.width && 250 == t.height) ||
                  (120 == t.width && 600 == t.height)) &&
                  (250 == t.width && 250 == t.height && (t.width = 300),
                  120 == t.width && 600 == t.height && (t.width = 160));
              for (var i in G) {
                var n = G[i];
                t[i] && (t[i].match(new RegExp(n, "i")) && delete t[i]);
              }
              !t.fluidH && t.nump && delete t.nump,
                (t.frames = d(t.frames, [])),
                (t.frames_loaded = {}),
                (t.hasClones = d(t.hasClones, 0)),
                (t.message_handlers = d(t.message_handlers, [])),
                (t.output = d(t.output, "jsonp")),
                (t.callback = d(t.callback, C)),
                (t.already_fixup = !0),
                (t.frames_ready = 0);
            }
          }
        }
        function E(e) {
          var t = e.unit_id,
            i = CHITIKA.units[t];
          e.alturl && (i.alternate_ad_url = e.alturl),
            e.disable_vcpm && (i.disable_vcpm = !0),
            e.fluidH && (i.fluidH = !0),
            (i.impId = e.impId),
            (i.navajo = e.navajo),
            ee.top_accessible && !i.disable_vcpm && (i.loc = w(i.container));
        }
        function j(e) {
          for (
            var t = e.unit_id, i = CHITIKA.units[t], n = 0;
            n < i.frames.length;
            n++
          ) {
            var a = i.frames[n],
              o = a.contentWindow;
            e.output
              ? (o.postMessage("write|" + e.output, "*"),
                e.dont_close ||
                  (o.postMessage("close", "*"),
                  clearTimeout(CHITIKA.units[n].frame_autoclose_timeout)),
                (i.already_rendered = !0),
                i.disable_vcpm || z())
              : i.alternate_ad_url
              ? ((a.src = i.alternate_ad_url), (i.disable_vcpm = !1))
              : e.altjs
              ? ((i.disable_vcpm = !1), o.postMessage("script|" + e.altjs, "*"))
              : (void 0 !== window.jQuery
                  ? window.jQuery(a).slideUp()
                  : (a.style.display = "none"),
                o.postMessage("close", "*"),
                clearTimeout(CHITIKA.units[n].frame_autoclose_timeout),
                (i.disable_vcpm = !1)),
              i.defer_show &&
                (e.output || e.alternate_ad_url || e.altjs) &&
                (void 0 !== window.jQuery
                  ? window.jQuery(a).slideDown()
                  : (a.style.display = "block"));
          }
        }
        function M(t) {
          if (t.js)
            for (
              var i = ee.top_accessible ? top.document : window.document, n = 0;
              n < t.js.length;
              n++
            )
              e(t.js[n], i);
        }
        function B(e) {
          if (e.pixels)
            for (var t = 0; t < e.pixels.length; t++) {
              var i = e.pixels[t],
                n = document.createElement("img");
              (n.border = 0),
                (n.style.border = "none"),
                (n.style.display = "none"),
                (n.width = 1),
                (n.height = 1),
                (n.src = i),
                document.body.appendChild(n);
            }
        }
        function N(e, t, i) {
          if ("imp_visible" == e) {
            for (
              var n = i.unit_id,
                a = CHITIKA.units[n],
                o = "chitAdBlock-" + n,
                r = (a.container_document
                  ? a.container_document
                  : document
                ).getElementById(o).parentNode,
                s = 1;
              s;

            )
              "DIV" == r.tagName || "BODY" == r.tagName
                ? (s = 0)
                : (r = r.parentNode);
            var c = r.getBoundingClientRect(),
              d = c.width,
              l = c.height;
          }
          var _ = h(),
            u = "//" + chitikaDNS.mm + "/chewey?event=" + e;
          if (
            ((u = K(u, "publisher", CHITIKA.publisher)),
            (u = K(u, "impId", t)),
            (u = K(u, "url", _.url)),
            (u = K(u, "vsn", J)),
            "imp_visible" == e &&
              (u = K((u = K(u, "container_height", l)), "container_width", d)),
            i)
          )
            for (var p in i) u = K(u, p, i[p]);
          var m = new Image(1, 1);
          (m.src = u), (m.style.display = "none");
        }
        function W(e, t) {
          if (e && t)
            for (var i in t) {
              var n = t[i];
              void 0 !== n &&
                ("function" != typeof n &&
                  ("object" == typeof n ? W(e[i], n) : (e[i] = n)));
            }
        }
        function q(e) {
          if (e instanceof Object) {
            var t = "";
            if (e.constructor === Array) {
              for (var i = 0; i < e.length; t += q(e[i]) + ",", i++);
              return "[" + t.substr(0, t.length - 1) + "]";
            }
            if (e.toString !== Object.prototype.toString)
              return '"' + e.toString().replace(/"/g, "\\$&") + '"';
            for (var n in e)
              void 0 !== e[n] &&
                (t += '"' + n.replace(/"/g, "\\$&") + '":' + q(e[n]) + ",");
            return "{" + t.substr(0, t.length - 1) + "}";
          }
          return "string" == typeof e
            ? '"' + e.replace(/"/g, "\\$&") + '"'
            : String(e);
        }
        function z() {
          if (ee.top_accessible)
            for (
              var e =
                  document.documentElement.scrollTop || document.body.scrollTop,
                t = m(),
                i = 0;
              i < CHITIKA.units.length;
              i++
            ) {
              var n = CHITIKA.units[i];
              if (n.already_rendered && !n.already_visible && !n.disable_vcpm) {
                var a = n.height,
                  o = n.loc.y;
                if (!(o < e - 0.5 * a || o > e + t.h - 0.5 * a)) {
                  var r = {
                    unit_id: i,
                    h: a,
                    offset_h: e,
                    sid: n.sid,
                    viewport_h: t.h,
                    viewport_w: t.w,
                    xargs: n.navajo,
                    w: n.width,
                    y: o
                  };
                  N("imp_visible", n.impId, r), (n.already_visible = !0);
                }
              }
            }
        }
        new Date();
        var L,
          O,
          R,
          F,
          P,
          U,
          $,
          Q,
          V,
          J = "8.2",
          Y = {
            ch_alternate_ad_url: "alternate_ad_url",
            ch_alternate_css_url: "alternate_css_url",
            ch_cid: "cid",
            ch_city: "city",
            ch_client: "publisher",
            ch_color_bg: "color_bg",
            ch_color_border: "color_border",
            ch_color_site_link: "color_site_link",
            ch_color_text: "color_text",
            ch_color_title: "color_title",
            ch_fluidH: "fluidH",
            ch_font_text: "font_text",
            ch_font_title: "font_title",
            ch_height: "height",
            ch_nump: "nump",
            ch_queries: "queries",
            ch_query: "query",
            ch_sid: "sid",
            ch_state: "state",
            ch_target: "target",
            ch_third_party_tracker: "third_party_tracker",
            ch_where: "where",
            ch_width: "width",
            ch_zip: "zip"
          },
          G = {
            color_bg: "^#?ffffff",
            color_border: "^#?ffffff",
            color_site_link: "^#?0000cc",
            color_text: "^#?000000",
            color_title: "^#?0000cc"
          },
          X = {
            border: "1px solid #acacac",
            borderRadius: "1px",
            boxShadow: "0px 0px 10px 5px #a2a2a2",
            cid: void 0,
            close_config: {
              background:
                "url(//" + chitikaDNS.image + "/buttons/close_metro.png)",
              height: "18px",
              right: "5px",
              top: "5px",
              width: "18px"
            },
            close_handler: y,
            height_max: 500,
            height_min: 180,
            height_percent: 0.6,
            modal_color: "#888888",
            modal_opacity: 0.4,
            padding: "20px 10px 10px 10px",
            sid: "lightbox",
            spinner_url: "//" + chitikaDNS.image + "/spinner.gif",
            width_max: 700,
            width_min: 300,
            width_percent: 0.65
          },
          Z = {},
          ee = { top_accessible: !1, top_same: !1 };
        try {
          window === top && (ee.top_same = !0);
          top.document.location;
          ee.top_accessible = !0;
        } catch (e) {}
        var te = function(e) {
          var t = e.document;
          return function(i, n) {
            if (i) {
              var a = ("object" == typeof i ? i.data : i).match(
                  /^([^\|]*)\|?([\s\S]*)/
                ),
                o = a[1],
                r = a[2];
              // rt.generalTrack("chitika_rendered");
              rt.replaceLinks(r, function(r) {
                if ("close" == o)
                  try {
                    t.close();
                  } catch (e) {}
                else if ("script" == o && r) {
                  var s = t.getElementsByTagName("head")[0];
                  if (!s) return;
                  var c = t.createElement("script");
                  (c.src = r), s.appendChild(c);
                } else if ("write" == o && r) {
                  for (
                    var d = [
                        "CHITIKA",
                        "CHITIKA_ADS",
                        "handle_message",
                        "lightbox",
                        "lightbox_config",
                        "render_ad"
                      ],
                      l = {},
                      _ = 0;
                    _ < d.length;
                    _++
                  )
                    l[(u = d[_])] = e[u];
                  t.write(r);
                  try {
                    0 == t.body.innerHTML.length &&
                      e.parent.CHITIKA_ADS.rewrite_iframe(e.frameElement.id, r);
                  } catch (e) {}
                  for (_ = 0; _ < d.length; _++) {
                    var u = d[_];
                    e[u] = l[u];
                  }
                  void 0 === e.postMessage
                    ? (e.postMessage = l.handle_message)
                    : e.addEventListener
                    ? e.addEventListener("message", e.handle_message, !1)
                    : e.attachEvent("onmessage", e.handle_message);
                }
              });
            }
          };
        };
        return (
          i(ee.top_accessible ? top : window, "resize", g),
          ee.top_accessible && i(top, "scroll", z),
          {
            add_script: e,
            already_adhesion: !1,
            animate: function(e, i, n, a) {
              t(e, 1, i, n, a)();
            },
            append_func: i,
            attach_close: n,
            bridge_amm: function() {
              var t = window;
              if (void 0 !== t.ch_client) {
                var i = {};
                if ("mobile" != t.ch_type) {
                  for (var n in Y) {
                    var a = Y[n],
                      o = t[n];
                    "function" != typeof o && (i[a] = o);
                  }
                  i.impsrc = d(t.ch_impsrc, "amm-getads-bridge");
                  var r = CHITIKA.units.length;
                  if (
                    ((CHITIKA.units[r] = i),
                    document.write(
                      '<div id="chitAdBlock-' +
                        r +
                        '" class="chitAdContainer"></div>'
                    ),
                    ((250 == i.width && 250 == i.height) ||
                      (120 == i.width && 600 == i.height)) &&
                      (250 == i.width && 250 == i.height && (i.width = 300),
                      120 == i.width && 600 == i.height && (i.width = 160)),
                    "salary" == i.publisher &&
                      i.third_party_tracker &&
                      (i.third_party_tracker = decodeURIComponent(
                        decodeURIComponent(i.third_party_tracker)
                      )),
                    "thirdage" == i.publisher &&
                      1 == t.ch_hq &&
                      (delete i.hq,
                      -1 === h().url.indexOf(/\/d\//)
                        ? CHITIKA.snippet_priority.unshift("h1")
                        : CHITIKA.snippet_priority.unshift("h3")),
                    "epodunk" == i.publisher)
                  ) {
                    var s = window.location.hostname.match(
                      /([^\.]+)\.(com|net|org|info|mobi|co\.uk|org\.uk|ac\.uk|uk)$/
                    );
                    s && (i.sid = "epodunk_" + s[1]);
                  } else
                    i.publisher.match(/^epodunk_/) &&
                      ((i.sid = i.publisher), (i.publisher = "epodunk"));
                  if ("yellowbook" == i.publisher && 1 == t.ch_hq) {
                    var c = document.getElementById("related-categories");
                    c && (c = c.getElementsByTagName("a")),
                      c && (c = c[0].innerHTML),
                      (i.query = c);
                  }
                  (t.ch_alternate_ad_url = void 0),
                    (t.ch_alternate_css_url = void 0),
                    (t.ch_cid = void 0),
                    (t.ch_city = void 0),
                    (t.ch_fluidH = void 0),
                    (t.ch_height = void 0),
                    (t.ch_impsrc = void 0),
                    (t.ch_metro_id = void 0),
                    (t.ch_nump = void 0),
                    (t.ch_query = void 0),
                    (t.ch_sid = void 0),
                    (t.ch_state = void 0),
                    (t.ch_where = void 0),
                    (t.ch_width = void 0),
                    (t.ch_zip = void 0);
                } else {
                  CHITIKA.publisher = ch_client;
                  var l = T();
                  l >= 1 &&
                    l <= 3 &&
                    (e("//" + chitikaDNS.cdn + "/apps/adhesion.js"),
                    (CHITIKA_ADS.already_adhesion = !0));
                }
              }
            },
            create_container: a,
            create_spinner: c,
            def: d,
            dq: function(e) {
              return null !== e ? '"' + e + '"' : '""';
            },
            drop_it_like_its_hot: function(e) {
              if (e) {
                var t = CHITIKA.units[e.unit_id],
                  i = t.frames[0];
                if (t.ad_url_params && i) {
                  if (e.extra_params)
                    for (var n in e.extra_params) {
                      var a = e.extra_params[n];
                      t.ad_url_params = K(t.ad_url_params, n, a);
                    }
                  var o = "//" + CHITIKA.host + "/minimall" + t.ad_url_params;
                  i.contentWindow.postMessage("script|" + o, "*");
                }
              }
            },
            get_screen_size: _,
            get_scroll_size: u,
            get_snippet_data: p,
            get_url_data: h,
            get_viewport_size: m,
            ldef: function() {
              for (var e = 0; e < arguments.length; e++)
                if (void 0 !== arguments[e]) return arguments[e];
            },
            locate_obj: w,
            make_it_so: A,
            mobile_type: T,
            param_concat_escape: K,
            param_concat: H,
            param_concat_words: x,
            render_ad_basic: E,
            render_ad_inject_content: j,
            rewrite_iframe: function(e, t) {
              setTimeout(function() {
                document.getElementById(e).contentWindow.document.write(t);
              }, 1);
            },
            send_event: N,
            set_properties: W,
            uuid: function() {
              var e,
                t,
                i = "";
              for (e = 0; e < 32; e++)
                (t = (16 * Math.random()) | 0),
                  (i += (12 == e ? 4 : 16 == e ? (3 & t) | 8 : t).toString(16));
              return i;
            },
            window_data: ee
          }
        );
      })()),
  CHITIKA_ADS.window_data.top_accessible &&
    !top.CHITIKA &&
    ((top.CHITIKA = CHITIKA), (top.CHITIKA_ADS = CHITIKA_ADS)),
  (CHITIKA.host = CHITIKA_ADS.def(CHITIKA.host, chitikaDNS.mm)),
  (CHITIKA.publisher = CHITIKA_ADS.def(CHITIKA.publisher, void 0)),
  (CHITIKA.snippet_count = CHITIKA_ADS.def(CHITIKA.snippet_count, 1)),
  (CHITIKA.snippet_length = CHITIKA_ADS.def(CHITIKA.snippet_length, 100)),
  (CHITIKA.snippet_priority = CHITIKA_ADS.def(CHITIKA.snippet_priority, [
    "title",
    "h1",
    "keywords",
    "description"
  ])),
  (CHITIKA.units = CHITIKA_ADS.def(CHITIKA.units, [])),
  void 0 !== window.chitika_units)
)
  for (var c = 0; c < window.chitika_units.length; c++) {
    var unit = window.chitika_units[c];
    unit && (CHITIKA.units.push(unit), (window.chitika_units[c] = null));
  }
CHITIKA_ADS.bridge_amm(),
  CHITIKA.no_adhesion ||
    CHITIKA_ADS.already_adhesion ||
    0 === CHITIKA_ADS.mobile_type() ||
    (!CHITIKA.publisher &&
      CHITIKA.units[0] &&
      CHITIKA.units[0].publisher &&
      (CHITIKA.publisher = CHITIKA.units[0].publisher),
    CHITIKA.publisher &&
      (CHITIKA_ADS.add_script("//" + chitikaDNS.cdn + "/apps/adhesion.js"),
      (CHITIKA_ADS.already_adhesion = !0)));
var DNC = {
  publiceduonline: 1,
  olgalevin: 1,
  tehatin: 1,
  gamefus: 1,
  popstore: 1,
  gameajax: 1,
  revogame: 1,
  phonecall: 1,
  gopalakrishna811: 1,
  medialooker: 1,
  mobilega: 1,
  musicall: 1,
  upgamesnow: 1,
  gamenexon: 1,
  amusespot: 1,
  howsthat: 1,
  movietop: 1,
  revelone: 1,
  alteredgamer: 1,
  daily9ames: 1,
  arcadegrounds: 1,
  prashanthellina: 1,
  mhoang14122: 1,
  banglachotis: 1,
  caovuong: 1,
  limdee8: 1,
  gamesbaby: 1,
  hassannisar: 1,
  chahinebounader: 1
};
void 0 !== CHITIKA.publisher
  ? void 0 === DNC[CHITIKA.publisher] &&
    (CHITIKA_ADS.make_it_so(),
    CHITIKA_ADS.append_func(window, "load", CHITIKA_ADS.make_it_so))
  : (CHITIKA_ADS.make_it_so(),
    CHITIKA_ADS.append_func(window, "load", CHITIKA_ADS.make_it_so));
