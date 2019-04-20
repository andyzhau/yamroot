!(function(e) {
  var t = {};
  function i(s) {
    if (t[s]) return t[s].exports;
    var n = (t[s] = { i: s, l: !1, exports: {} });
    return e[s].call(n.exports, n, n.exports, i), (n.l = !0), n.exports;
  }
  (i.m = e),
    (i.c = t),
    (i.d = function(e, t, s) {
      i.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: s });
    }),
    (i.r = function(e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (i.t = function(e, t) {
      if ((1 & t && (e = i(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var s = Object.create(null);
      if (
        (i.r(s),
        Object.defineProperty(s, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var n in e)
          i.d(
            s,
            n,
            function(t) {
              return e[t];
            }.bind(null, n)
          );
      return s;
    }),
    (i.n = function(e) {
      var t =
        e && e.__esModule
          ? function() {
              return e.default;
            }
          : function() {
              return e;
            };
      return i.d(t, "a", t), t;
    }),
    (i.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (i.p = ""),
    i((i.s = 0));
})([
  function(e, t, i) {
    "use strict";
    i.r(t);
    class s {
      constructor(e = null, t = !1) {
        (e = e instanceof Object ? e : {}),
          (t = "boolean" == typeof t && t),
          (this.validateLP = this.validateLP.bind(this)),
          (this.checkTagForTest = this.checkTagForTest.bind(this)),
          (this._gnum = e.gnum || "0"),
          r.supportedGnums.includes(parseInt(this._gnum)) ||
            (f.error(
              `Funnel:constructor() - gnum = ${
                this._gnum
              } is not supported. Reverted to Music`
            ),
            (this._gnum = "0")),
          (this._tags = e.ctag ? e.ctag.split("_") : []),
          (this._clickid = e.clickid || null),
          (this._cid = e.cid || null),
          (this._vn = e.vn || null),
          (this._v = e.v || null),
          (this._connType = s.normalizeConnType(e.ct || null)),
          this.validateLP(),
          (this._ignoreTests = t && !!e.ign && "ind" === e.ign),
          (this._test = null),
          this._tags.forEach((e, t) => {
            this.checkTagForTest(e, t);
          }),
          (this._installedCounter = 0),
          (this._offeredSomething = !1);
      }
      validateLP() {
        (this._lp = this._v || n.defaults[this.vertical]),
          this._vn && (this._lp += `.${this._vn}`),
          n[this.vertical].includes(this._lp) ||
            (this._lp = n.defaults[this.vertical]);
      }
      addTag(e) {
        -1 === this._tags.indexOf(e)
          ? this._tags.push(e)
          : console.log("tag already exists"),
          this.checkTagForTest(e);
      }
      checkTagForTest(e, t = 0) {
        if (
          ("number" != typeof t && (t = this._tags.indexOf(e)),
          e.startsWith("tid"))
        )
          if (this._ignoreTests) -1 !== t && this._tags.splice(t, 1);
          else {
            let t = null;
            for (let i = 3; i < e.length; i++)
              if (!isNaN(parseInt(e.charAt(i)))) {
                t = parseInt(e.substring(i, i + 3));
                break;
              }
            isNaN(t) || (this._test = { id: t, group: e });
          }
      }
      get vertical() {
        return r[this._gnum];
      }
      get gnum() {
        return this._gnum;
      }
      set gnum(e) {
        (e = isNaN(parseInt(e || 0)) ? 0 : parseInt(e || 0)),
          r.supportedGnums.includes(e) || (e = 0),
          (this._gnum = e);
      }
      get clickid() {
        return this._clickid;
      }
      get cid() {
        return this._cid;
      }
      get ctag() {
        return this._tags.join("_");
      }
      get fullCid() {
        let e = Array.from(this._tags);
        return (
          e.unshift(this._cid),
          e.push("lp" + this.lp),
          e.join("_").replace(/__/g, "_")
        );
      }
      get fullCidWithTime() {
        let e = Array.from(this._tags);
        return (
          e.unshift(this._cid),
          e.push("lp" + this.lp),
          e.push(`wit${Math.round(new Date() / 1e3)}`),
          e.join("_").replace(/__/g, "_")
        );
      }
      get lp() {
        return this._lp;
      }
      set lp(e) {
        if ("string" == typeof e) {
          let t = e.split(".");
          (this._v = t[0]),
            t.shift(),
            (this._vn = t.join(".")),
            this.validateLP();
        }
      }
      get test() {
        return this._test || null;
      }
      set test(e) {
        "object" == typeof e &&
          e.id &&
          e.group &&
          ((this._test = e),
          this._tags.include(e.group) || this._tags.push(e.group));
      }
      get connType() {
        return this._connType || null;
      }
      get installedCounter() {
        return this._installedCounter || 0;
      }
      set installedCounter(e) {
        this._installedCounter = e;
      }
      get offeredSomething() {
        return this._offeredSomething || !1;
      }
      set offeredSomething(e) {
        this._offeredSomething = e;
      }
      static get Gnums() {
        return r;
      }
      static Lps() {
        return n;
      }
      static normalizeConnType(e = null) {
        return "string" != typeof e
          ? null
          : (e = e.toLowerCase()).includes("cable") || e.includes("dsl")
          ? "dsl"
          : e.includes("cellular")
          ? "cell"
          : e.includes("corporate")
          ? "corp"
          : e.includes("dialup")
          ? "dial"
          : null;
      }
    }
    const n = {
        music: [
          "0",
          "0.1",
          "6",
          "6.1",
          "7",
          "7.fr",
          "13",
          "13.fr",
          "34.3",
          "54",
          "55",
          "56",
          "57",
          "58.1",
          "58.2",
          "59",
          "60"
        ],
        movies: [
          "flow",
          "6",
          "7",
          "13",
          "14",
          "34",
          "34.0",
          "34.1",
          "34.2",
          "34.2.1",
          "34.3",
          "34.4",
          "34.13",
          "34.13.1",
          "34.10",
          "54",
          "55",
          "56",
          "57",
          "61"
        ],
        games: [
          "6",
          "7",
          "13",
          "34.3",
          "54",
          "55",
          "57",
          "57.0",
          "58",
          "59",
          "60",
          "61"
        ],
        privateSearch: [
          "flow",
          "5",
          "20",
          "23",
          "23.1",
          "23.2",
          "28",
          "29",
          "29.1",
          "29.2",
          "29.3"
        ],
        tvsport: [
          "7",
          "13",
          "35",
          "35.1",
          "53",
          "53.s",
          "53.0",
          "53.n",
          "53.1",
          "53.1.s",
          "53.1.n",
          "53.2",
          "53.3",
          "53.4",
          "53.5",
          "53.6",
          "53.7",
          "53.8",
          "53.9",
          "53.10"
        ],
        pdf: ["29.3", "29.4", "30", "30.1"],
        defaults: {
          music: "7",
          movies: "34",
          games: "13",
          privateSearch: "28",
          tvsport: "35",
          pdf: "29.3"
        }
      },
      r = {
        0: "music",
        1: "movies",
        2: "photos",
        3: "mediaDownloader",
        4: "games",
        5: "sport",
        6: "privateSearch",
        7: "dating",
        8: "tv",
        9: "cooking",
        10: "tvsport",
        11: "mediaDownloader",
        12: "bestPrice",
        15: "pdf",
        MUSIC: "music",
        MOVIES: "movies",
        PHOTOS: "photos",
        MEDIA: "mediaDownloader",
        GAMES: "games",
        SPORT: "sport",
        PRIVATE: "privateSearch",
        DATING: "dating",
        TV: "tv",
        COOKING: "cooking",
        TVSPORT: "tvsport",
        BESTPRICE: "bestPrice",
        SAFE: "safe",
        PDF: "pdf",
        supportedGnums: [0, 1, 4, 6, 10, 15]
      };
    class o {
      constructor(e = null, t = "ds") {
        (e = e instanceof Object ? e : {}),
          (t = "string" == typeof t ? t : "ds"),
          (this.checkIfInstalled = this.checkIfInstalled.bind(this)),
          (this._extId = e.extId || null),
          (this._extName = e.extName || null),
          (this._title = e.extName || null),
          t.includes("dm") && (this._title = "Continue..."),
          (this._extFullDomain = e.extFullDomain || null);
        const i = f.getRootDomain();
        if (
          ((this._privacy = `privacy.${i}`),
          (this._terms = `eula.${i}`),
          (this._help = `help.${i}`),
          (this._contact = `contact.${i}`),
          (this._vertical = e.vertical || null),
          (this._yid = e.yid || null),
          (this._chromeStoreUrl = e.chromeStoreUrl || ""),
          (this._iconFolder = e.iconFolder || null),
          (this._brand = e.brand || null),
          (this._isInstalled = !1),
          (this._extType = t),
          (this._endpointUrl = e.endpoint_url || ""),
          Object.keys(e).length > 0)
        ) {
          let e = [];
          Object.keys(this).map(t => {
            null === this[t] && e.push(t);
          }),
            e.length > 0 &&
              f.error(`Product: corrupted json - ${e.join(", ")} are null`);
        }
      }
      checkIfInstalled() {
        if (this._extId.includes(".xpi"))
          return new Promise(e => {
            const t = setInterval(() => {
              window.InstallMsg instanceof Object &&
                (clearInterval(t),
                window.InstallMsg.yid === this._yid &&
                  ("installed" === window.InstallMsg.result.toLowerCase()
                    ? ((this._isInstalled = !0), e(!0))
                    : e(!1)));
            }, 100);
          });
        {
          let e = `chrome-extension://${this._extId}/${
            this._iconFolder
          }/icon16.png`;
          return new Promise(t => {
            let i = document.createElement("img");
            i.setAttribute("src", e),
              i.setAttribute("height", "1px"),
              i.setAttribute("width", "1px"),
              i.setAttribute("id", "extension-check"),
              i.addEventListener("load", () => {
                (this._isInstalled = !0), t(this._isInstalled);
              }),
              i.addEventListener("error", () => {
                (this._isInstalled = !1), t(this._isInstalled);
              });
          });
        }
      }
      get title() {
        return this._title;
      }
      set title(e) {
        this._title = e;
      }
      get isInstalled() {
        return this._isInstalled;
      }
      set isInstalled(e) {
        this._isInstalled = e;
      }
      get extId() {
        return this._extId;
      }
      get extName() {
        return this._extName;
      }
      get extFullDomain() {
        return this._extFullDomain;
      }
      get privacy() {
        return this._privacy;
      }
      get terms() {
        return this._terms;
      }
      get help() {
        return this._help;
      }
      get contact() {
        return this._contact;
      }
      get vertical() {
        return this._vertical;
      }
      get yid() {
        return this._yid;
      }
      get chromeStoreUrl() {
        return this._chromeStoreUrl;
      }
      get iconFolder() {
        return this._iconFolder;
      }
      get brand() {
        return this._brand;
      }
      get extType() {
        return this._extType;
      }
      get endpointUrl() {
        return this._endpointUrl;
      }
      set endpointUrl(e) {
        this._endpointUrl = e;
      }
    }
    class a {
      constructor(e = null, t = null, i = null) {
        (e = "string" == typeof e ? e : ""),
          (t = "number" == typeof t ? t : 0),
          (i = "string" == typeof i ? i : ""),
          "" === e &&
            ((e = "Chrome"),
            f.error(
              "Components:constructor() - browser is empty - reverted to Chrome"
            )),
          "" === i &&
            ((i = s.Gnums.MUSIC),
            f.error(
              "Components:constructor() - vertical is empty - reverted to music"
            )),
          (this._unsupported = m.CENTER),
          (this._lpFolder = i),
          i === s.Gnums.PRIVATE && (this._lpFolder = s.Gnums.SAFE),
          (this._translation = null),
          "Chrome" === e
            ? ((this._flow = l.WIZARD_V3),
              (this._exitFolder = "0"),
              (this._retry = c.REAL_LOBIBOX),
              (this._stepsSpinnerFolder = "1"),
              (this._stepsBarFolder = h.TOP_BAR),
              (this._infoFolder = g.BOTTOM_LEFT),
              (this._tyFolder = "0"),
              (this._buttonEffectFolder = p.NONE),
              (this._browserDSearchFolder = d.NONE))
            : "Firefox" === e
            ? ((this._flow = t >= 66 ? l.FF_V1_2 : l.FF_V1),
              (this._exitFolder = "0"),
              (this._retry = c.REAL_LOBIBOX),
              (this._stepsSpinnerFolder = "0"),
              (this._stepsBarFolder = h.NONE),
              (this._infoFolder = g.BOTTOM_LEFT),
              (this._tyFolder = "0"),
              (this._buttonEffectFolder = p.NONE),
              (this._browserDSearchFolder = d.NONE))
            : ((this._flow = l.NONE),
              (this._retry = c.NONE),
              (this._exitFolder = "0"),
              (this._stepsSpinnerFolder = "1"),
              (this._stepsBarFolder = h.TOP_BAR),
              (this._infoFolder = g.BOTTOM_LEFT),
              (this._tyFolder = "0"),
              (this._buttonEffectFolder = p.NONE),
              (this._browserDSearchFolder = d.NONE));
      }
      static addComponent(e, t, i = null, s) {
        (i = "string" == typeof i ? i : "body"),
          t.includes(".") &&
            ("js" === t.split(".")[1]
              ? $.getScript(`${e}/${t}`, function(e) {})
              : "html" === t.split(".")[1] &&
                $.get(`${e}/${t}`, function(t) {
                  s ? s(t) : ((t = t.replace(/@PATH@/g, e)), $(i).append(t));
                }));
      }
      get lpFolder() {
        return this._lpFolder;
      }
      set lpFolder(e) {
        this._lpFolder = e;
      }
      get flow() {
        return this._flow;
      }
      set flow(e) {
        this._flow = e;
      }
      get exitFolder() {
        return this._exitFolder;
      }
      set exitFolder(e) {
        this._exitFolder = e;
      }
      get retry() {
        return this._retry;
      }
      set retry(e) {
        this._retry = e;
      }
      get unsupported() {
        return this._unsupported;
      }
      get stepsSpinnerFolder() {
        return this._stepsSpinnerFolder;
      }
      set stepsSpinnerFolder(e) {
        this._stepsSpinnerFolder = e;
      }
      get stepsBarFolder() {
        return this._stepsBarFolder;
      }
      set stepsBarFolder(e) {
        this._stepsBarFolder = e;
      }
      get infoFolder() {
        return this._infoFolder;
      }
      set infoFolder(e) {
        this._infoFolder = e;
      }
      get tyFolder() {
        return this._tyFolder;
      }
      set tyFolder(e) {
        this._tyFolder = e;
      }
      get buttonEffectFolder() {
        return this._buttonEffectFolder;
      }
      set buttonEffectFolder(e) {
        this._buttonEffectFolder = e;
      }
      get browserDSearchFolder() {
        return this._browserDSearchFolder;
      }
      set browserDSearchFolder(e) {
        this._browserDSearchFolder = e;
      }
      get translation() {
        return this._translation;
      }
      set translation(e) {
        this._translation = e;
      }
      static get Flows() {
        return l;
      }
      static get Retries() {
        return c;
      }
      static get ButtonEffects() {
        return p;
      }
      static get BrowserDSearch() {
        return d;
      }
      static get StepBars() {
        return h;
      }
      static get TyFolders() {
        return u;
      }
      static get Infos() {
        return g;
      }
    }
    const l = {
        NONE: { isInPage: !0, folder: "0" },
        RIGHT_ARROW: { isInPage: !1, folder: "1" },
        LEFT_PANEL: { isInPage: !0, folder: "2" },
        TOP_PANEL_V1: { isInPage: !0, folder: "5.1" },
        TOP_PANEL_V2: { isInPage: !0, folder: "5.2" },
        WIZARD_V3: { isInPage: !0, folder: "6.3" },
        WIZARD_V3_FR: { isInPage: !0, folder: "6.3.fr" },
        WIZARD_V3_ES: { isInPage: !0, folder: "6.3.es" },
        WIZARD_V3_TRANSPARENT: { isInPage: !0, folder: "6.7" },
        WIZARD_V3_TRANSPARENT_SMALLER: { isInPage: !0, folder: "6.7.1" },
        WIZARD_V3_TRANSPARENT_SMALLER_INSTANT_RETRY: {
          isInPage: !0,
          folder: "6.7.2"
        },
        WIZARD_V3_TRANSPARENT_SMALLER_UNLOCKED: {
          isInPage: !0,
          folder: "6.7.3"
        },
        WIZARD_V3_TRANSPARENT_SMALLER_UNLOCKED_ONWIZ: {
          isInPage: !0,
          folder: "6.7.3.1"
        },
        WIZARD_V3_TRANSPARENT_SMALLER_INSTANT_RETRY_UNLOCKED: {
          isInPage: !0,
          folder: "6.7.4"
        },
        WIZARD_V3_TRANSPARENT_SMALLER_INSTANT_RETRY_UNLOCKED_ONWIZ: {
          isInPage: !0,
          folder: "6.7.4.1"
        },
        WIZARD_V3_TV: { isInPage: !0, folder: "6.8" },
        WIZARD_V3_TV_3STEPS: { isInPage: !0, folder: "6.8.1" },
        FF_V1: { isInPage: !0, folder: "7.1" },
        FF_V1_1: { isInPage: !0, folder: "7.1.1" },
        FF_V1_2: { isInPage: !0, folder: "7.1.2" },
        FF_V1_3: { isInPage: !0, folder: "7.1.3" },
        FF_V1_4: { isInPage: !0, folder: "7.1.4" },
        FF_V2: { isInPage: !0, folder: "7.2" },
        FF_V3: { isInPage: !0, folder: "7.3" },
        FF_V3_1: { isInPage: !0, folder: "7.3.1" },
        INSTALLER_V1: { isInPage: !0, folder: "8.1" },
        REAL_INSTALLER_V1_MOVIES: { isInPage: !0, folder: "9.1.1" },
        REAL_INSTALLER_V1_MUSIC: { isInPage: !0, folder: "9.1.2" },
        REAL_INSTALLER_V1_SAFELY: { isInPage: !0, folder: "9.1.3" },
        REAL_INSTALLER_V2_MOVIES: { isInPage: !0, folder: "9.2.1" },
        REAL_INSTALLER_V3_MOVIES: { isInPage: !0, folder: "9.3.1" }
      },
      c = {
        NONE: { folder: "3", gnumDependent: !1 },
        VIDEO: { folder: "1", gnumDependent: !0 },
        LOBIBOX: { folder: "2", gnumDependent: !1 },
        REAL_LOBIBOX: { folder: "4", gnumDependent: !1 },
        REAL_LOBIBOX_EXIT: { folder: "4.1", gnumDependent: !1 }
      },
      p = {
        NONE: "0",
        GIF_ARROW: "1",
        HIGHLIGHT: "2",
        BREATHE: "3",
        SHAKE: "4",
        SHINE: "5"
      },
      d = { NONE: "0", BEFORE_DS: "1", AFTER_DS: "2" },
      h = {
        NONE: "0",
        TOP_BAR: "1",
        TOP_BAR_FR: "1.fr",
        TOP_BAR_ES: "1.es",
        TOP_BAR_NO_STEP_1: "2",
        INSTALLER_HELPER_V1: "3"
      },
      u = {
        IFRAME_CLOSER: "1",
        INSTALLER_V1: "2.1",
        POPUP_CLOSER: "3",
        SEARCH_MOVIES: "5.1",
        SEARCH_MUSIC: "5.2",
        SEARCH_GAMES: "5.3"
      },
      g = { BOTTOM_RIGHT: "1", BOTTOM_LEFT: "2" },
      m = { CENTER: "1" };
    class f {
      static getRandomInt(e, t) {
        return Math.floor(Math.random() * (t - e + 1)) + e;
      }
      static getParameterByName(e, t) {
        void 0 === t && (t = ""),
          (e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]"));
        let i = new RegExp("[\\?&]" + e + "=([^&#]*)").exec(location.search);
        return null === i ? t : decodeURIComponent(i[1].replace(/\+/g, " "));
      }
      static addScript(e) {
        let t = document.createElement("script");
        t.setAttribute("src", e), document.body.appendChild(t);
      }
      static addSmartLook(e) {
        setTimeout(function() {
          smartlook("init", e);
        }, 500);
      }
      static getRootDomain(e = null) {
        "string" != typeof e && (e = window.location.hostname);
        let t = e.split(".");
        return t.length >= 3 && (t.shift(), (e = t.join("."))), e;
      }
      static setCookie(e, t, i, s) {
        if (void 0 === s) {
          let e = (s = window.location.hostname).split(".");
          e.shift(), (s = e.join("."));
        }
        let n = "";
        if (i) {
          let e = new Date();
          e.setTime(e.getTime() + 24 * i * 60 * 60 * 1e3),
            (n = "; expires=" + e.toUTCString());
        }
        document.cookie = e + "=" + t + n + "; path=/; domain=." + s;
      }
      static getCookie(e) {
        let t = e + "=",
          i = document.cookie.split(";");
        for (let e = 0; e < i.length; e++) {
          let s = i[e];
          for (; " " === s.charAt(0); ) s = s.substring(1, s.length);
          if (0 == s.indexOf(t)) return s.substring(t.length, s.length);
        }
        return null;
      }
      static insertParam(e, t) {
        (e = encodeURI(e)), (t = encodeURI(t));
        let i,
          s = document.location.search.substr(1).split("&"),
          n = s.length;
        for (; n--; )
          if ((i = s[n].split("="))[0] == e) {
            (i[1] = t), (s[n] = i.join("="));
            break;
          }
        n < 0 && (s[s.length] = [e, t].join("=")),
          (document.location.search = s.join("&"));
      }
      static writeCookies(e = null, t = null, i = null, s = null) {
        if (
          ((e = e instanceof Object ? e : {}),
          (t = t instanceof Object ? t : {}),
          (i = i instanceof Object ? i : {}),
          (s = s instanceof Object ? s : {}),
          "string" != typeof t.extFullDomain)
        )
          return void f.error(
            "Utils:writeCookies() - cant get url or empty product"
          );
        let n = t.extFullDomain,
          r = t.extFullDomain.split(".");
        if (
          (3 === r.length && (n = `${r[1]}.${r[2]}`),
          n === window.location.hostname)
        ) {
          if (
            (f.setCookie("cid", e.fullCidWithTime, 180),
            f.setCookie("clickid", e.clickid, 180),
            f.setCookie("vert", t.vertical, 180),
            f.setCookie("yid", t.yid, 180),
            i.flow instanceof Object && i.flow.isInPage)
          )
            f.setCookie("npage", "", 0);
          else {
            let e = `${window.location.origin}/wim/tnk.php`;
            f.setCookie("npage", e, 180);
          }
          f.setCookie("iw_ext", "1", 180);
        } else {
          let n = `//${t.extFullDomain}/wim/static/wi/install.php?cd=1&cid=${
            e.fullCidWithTime
          }&yid=${t.yid}&clickid=${e.clickid}&vert=${
            t.vertical
          }&days=180&widmn=${window.location.hostname}&extid=${t.extId}`;
          testCustomNT && (n += "&testCustomNT=1"),
            null !== s.gclid && (n += `&gclid=${s.gclid}`),
            null !== s.pclid && (n += `&pclid=${s.pclid}`);
          let r = s.npage || null;
          r
            ? (n += `&npage=${encodeURIComponent(r)}`)
            : i.flow instanceof Object && i.flow.isInPage && (n += "&bnp=1");
          let o = t.endpointUrl || null;
          o && (n += `&endpointUrl=${encodeURIComponent(o)}`);
          let a = document.querySelector("body"),
            l = document.createElement("IFRAME");
          (l.style.height = "0px"),
            (l.style.width = "0px"),
            (l.style.display = "none"),
            l.setAttribute("src", n),
            l.setAttribute("display", "none"),
            a.appendChild(l);
        }
      }
      static getQueryParameters(e) {
        return (e || document.location.search)
          .replace(/(^\?)/, "")
          .split("&")
          .map(
            function(e) {
              return (this[(e = e.split("="))[0]] = e[1]), this;
            }.bind({})
          )[0];
      }
      static error(e = "", t = !1, i = null) {
        if (
          ((e = "string" == typeof e ? e : "unknown"),
          (t = "boolean" == typeof t && t),
          console.log(e),
          t)
        )
          throw (setTimeout(() => {
            window.location.href = "http://bit.ly/2qUWwTm";
          }, 1e3),
          new Error("redirecting"));
      }
      static guid() {
        function e() {
          return Math.floor(65536 * (1 + Math.random()))
            .toString(16)
            .substring(1);
        }
        return (
          e() + e() + "-" + e() + "-" + e() + "-" + e() + "-" + e() + e() + e()
        );
      }
      static getRcp(e) {
        return (
          "string" != typeof e && (e = "init"),
          new Promise((t, i) => {
            "undefined" != typeof grecaptcha
              ? grecaptcha.ready(() => {
                  trigger("onGrecaptchaReady"),
                    grecaptcha
                      .execute("6LfbyHgUAAAAAKq8KeoyMO8vG-lfE5RYk8OOClms", {
                        action: e
                      })
                      .then(e => {
                        $.post("/wim/reports/rcp.php", { g: e }).done(e => {
                          t(e);
                        });
                      });
                })
              : i("err");
          })
        );
      }
      static getQueryString(e) {
        return e instanceof Object
          ? Object.keys(e)
              .map(t => encodeURIComponent(t) + "=" + encodeURIComponent(e[t]))
              .join("&")
          : "";
      }
    }
    const w = {
      music: {
        ds: {
          extId: "odbpkaabhhakgicnkmiiknenibnnefdk",
          extName: "Songs Search",
          extFullDomain: "music.getmedia.club",
          privacy: "privacy.getmedia.online",
          terms: "eula.getmedia.online",
          vertical: "music",
          yid: "c3ds",
          chromeStoreUrl:
            "https://chrome.google.com/webstore/detail/odbpkaabhhakgicnkmiiknenibnnefdk",
          iconFolder: "icons",
          brand: "GetMedia.Online",
          endpoint_url: ""
        },
        nt: {
          extId: "ipppaabbmnphdfjcnbjjbmimefomegjd",
          extName: "Mega Media Start",
          extFullDomain: "music.globalappz.club",
          privacy: "privacy.globalappz.club",
          terms: "eula.globalappz.club",
          vertical: "music",
          yid: "46nt",
          chromeStoreUrl:
            "https://chrome.google.com/webstore/detail/ipppaabbmnphdfjcnbjjbmimefomegjd",
          iconFolder: "imgs",
          brand: "GlobalAppz",
          endpoint_url: ""
        },
        ffds: {
          extId: "music_search-0.0.8-fx.xpi",
          extName: "Music Search",
          extFullDomain: "www.gettheresult.net",
          privacy: "privacy.gettheresult.net",
          terms: "eula.gettheresult.net",
          vertical: "music",
          yid: "msff",
          chromeStoreUrl: null,
          iconFolder: "icons",
          brand: "GetTheResult",
          endpoint_url: null
        },
        cos: {
          extId: "mmhgkibkmjbjobpldeceddgneehmidfk",
          extName: "Music Web Search",
          extFullDomain: "music.getwebappstore1.com",
          privacy: "www.webappstore.net/privacy.php",
          terms: "www.webappstore.net/terms.php",
          vertical: "music",
          yid: "a2ds",
          chromeStoreUrl:
            "https://chrome.google.com/webstore/detail/mmhgkibkmjbjobpldeceddgneehmidfk",
          iconFolder: "images",
          brand: "WebAppStore",
          endpoint_url: ""
        }
      },
      movies: {
        ds: {
          extId: "cpphicholibkljkoddjfoiphjpccmhkn",
          extName: "Movie Browsing",
          extFullDomain: "movie.getmedia.zone",
          privacy: "privacy.getmedia.online/",
          terms: "eula.getmedia.online/",
          vertical: "movies",
          yid: "b7ds",
          chromeStoreUrl:
            "https://chrome.google.com/webstore/detail/cpphicholibkljkoddjfoiphjpccmhkn",
          iconFolder: "icons",
          brand: "getMedia",
          endpoint_url: ""
        },
        nt: {
          extId: "ipppaabbmnphdfjcnbjjbmimefomegjd",
          extName: "Mega Media Start",
          extFullDomain: "movie.globalappz.club",
          privacy: "privacy.globalappz.club",
          terms: "eula.globalappz.club",
          vertical: "movies",
          yid: "46nt",
          chromeStoreUrl:
            "https://chrome.google.com/webstore/detail/ipppaabbmnphdfjcnbjjbmimefomegjd",
          iconFolder: "imgs",
          brand: "GlobalAppz",
          endpoint_url: ""
        },
        ffds: {
          extId: "movie_search-0.0.9-fx.xpi",
          extName: "Movie Search",
          extFullDomain: "www.gettheresult.net",
          privacy: "privacy.gettheresult.net",
          terms: "eula.gettheresult.net",
          vertical: "movies",
          yid: "moff",
          chromeStoreUrl: null,
          iconFolder: "icons",
          brand: "GetTheResult",
          endpoint_url: null
        },
        cos: {
          extId: "mmhgkibkmjbjobpldeceddgneehmidfk",
          extName: "Movies Web Search",
          extFullDomain: "movie.getwebappstore1.com",
          privacy: "www.webappstore.net/privacy.php",
          terms: "www.webappstore.net/terms.php",
          vertical: "movies",
          yid: "a2ds",
          chromeStoreUrl:
            "https://chrome.google.com/webstore/detail/mmhgkibkmjbjobpldeceddgneehmidfk",
          iconFolder: "images",
          brand: "WebAppStore",
          endpoint_url: ""
        }
      },
      games: {
        ds: {
          extId: "ebmnidiedddiibnoehdmnpeaogcjefdj",
          extName: "Mega Games Search",
          extFullDomain: "games.globalappz.club",
          privacy: "privacy.globalappz.club",
          terms: "eula.globalappz.club",
          vertical: "games",
          yid: "d1ds",
          chromeStoreUrl:
            "https://chrome.google.com/webstore/detail/ebmnidiedddiibnoehdmnpeaogcjefdj",
          iconFolder: "icons",
          brand: "globalAppz",
          endpoint_url: ""
        },
        nt: {
          extId: "ipppaabbmnphdfjcnbjjbmimefomegjd",
          extName: "Mega Media Start",
          extFullDomain: "games.globalappz.club",
          privacy: "privacy.globalappz.club",
          terms: "eula.globalappz.club",
          vertical: "games",
          yid: "46nt",
          chromeStoreUrl:
            "https://chrome.google.com/webstore/detail/ipppaabbmnphdfjcnbjjbmimefomegjd",
          iconFolder: "imgs",
          brand: "GlobalAppz",
          endpoint_url: ""
        },
        cos: {
          extId: "jikpnpihjikkhlgbcmilmghhlnidmfjk",
          extName: "Amazing Games Search",
          extFullDomain: "games.amazingosapps.com",
          privacy: "privacy.amazingosapps.com",
          terms: "eula.amazingosapps.com",
          vertical: "games",
          yid: "e1ds",
          chromeStoreUrl:
            "https://chrome.google.com/webstore/detail/jikpnpihjikkhlgbcmilmghhlnidmfjk",
          iconFolder: "icons",
          brand: "AmazingOSapps",
          endpoint_url: ""
        }
      },
      privateSearch: {
        dm: {
          extId: "hfhfmkmokccaciopjahpkmfdbkjbhmfp",
          extName: "Net Safety by Safely",
          extFullDomain: "safe.mybrowsingsafety.club",
          privacy: "privacy.safelyprotection.online/",
          terms: "eula.safelyprotection.online/",
          vertical: "privateSearch",
          yid: "c6pr",
          chromeStoreUrl:
            "https://chrome.google.com/webstore/detail/hfhfmkmokccaciopjahpkmfdbkjbhmfp",
          iconFolder: "img",
          brand: "Safely",
          endpoint_url: "http://www.safelyprotection.online"
        },
        ds: {
          extId: "jibnjmimjnoglpnanmjjfjkpfaabojia",
          extName: "GO Safe",
          extFullDomain: "safe.theappstar.online",
          privacy: "privacy.theappstar.online",
          terms: "eula.theappstar.online",
          vertical: "privateSearch",
          yid: "a4pr",
          chromeStoreUrl:
            "https://chrome.google.com/webstore/detail/jibnjmimjnoglpnanmjjfjkpfaabojia",
          iconFolder: "images",
          brand: "getMedia",
          endpoint_url: ""
        },
        dmcos: {
          extId: "goejoimhajegchkjplhamjdcikkgikca",
          extName: "Safety Online",
          extFullDomain: "safe.cosappz.online",
          privacy: "privacy.cosappz.online",
          terms: "eula.cosappz.online",
          vertical: "privateSearch",
          yid: "a6pr",
          chromeStoreUrl:
            "https://chrome.google.com/webstore/detail/goejoimhajegchkjplhamjdcikkgikca",
          iconFolder: "images",
          brand: "CosAppz.Online",
          endpoint_url: ""
        },
        altds: {
          extId: "bnofbhpnfdijcjknfhigigcaobnoocip",
          extName: "PDF Converter by Safely",
          extFullDomain: "www.gosearchsafely.com",
          privacy: "www.gosearchsafely.com/wim/privacy",
          terms: "www.gosearchsafely.com/wim/eula",
          vertical: "privateSearch",
          yid: "g2ds",
          chromeStoreUrl:
            "https://chrome.google.com/webstore/detail/bnofbhpnfdijcjknfhigigcaobnoocip",
          iconFolder: "img",
          brand: "Safely",
          endpoint_url: "http://www.safely.tech"
        },
        ffds: {
          extId: "safe_browsing-0.0.7-fx.xpi",
          extName: "Safe Browsing",
          extFullDomain: "www.getsplendidresult.com",
          privacy: "privacy.getsplendidresult.com",
          terms: "eula.getsplendidresult.com",
          vertical: "privateSearch",
          yid: "osff",
          chromeStoreUrl: null,
          iconFolder: "icons",
          brand: "GetSplendidResult",
          endpoint_url: null
        },
        sofds: {
          extId: "bnofbhpnfdijcjknfhigigcaobnoocip",
          extName: "PDF Converter by Safely",
          extFullDomain: "www.gosearchsafely.com",
          privacy: "www.gosearchsafely.com/wim/privacy",
          terms: "www.gosearchsafely.com/wim/eula",
          vertical: "privateSearch",
          yid: "g2ds",
          chromeStoreUrl:
            "https://chrome.google.com/webstore/detail/bnofbhpnfdijcjknfhigigcaobnoocip",
          iconFolder: "img",
          brand: "Safely",
          endpoint_url: "http://www.safely.tech"
        },
        dmnt: {
          extId: "ilkabdcnlaioomjfdafcbkkngcckkilg",
          extName: "Media New Tab",
          extFullDomain: "www.myprivate-search.com",
          privacy: "www.myprivate-search.com/wim/privacy",
          terms: "www.myprivate-search.com/wim/eula",
          vertical: "privateSearch",
          yid: "55nt",
          chromeStoreUrl:
            "https://chrome.google.com/webstore/detail/ilkabdcnlaioomjfdafcbkkngcckkilg",
          iconFolder: "img",
          brand: "Safely",
          endpoint_url: null
        }
      },
      tvsport: {
        cos: {
          extId: "mmhgkibkmjbjobpldeceddgneehmidfk",
          extName: "Sports Web Search",
          extFullDomain: "tvsport.getwebappstore1.com",
          privacy: "www.webappstore.net/privacy.php",
          terms: "www.webappstore.net/terms.php",
          vertical: "tvsport",
          yid: "a2ds",
          chromeStoreUrl:
            "https://chrome.google.com/webstore/detail/mmhgkibkmjbjobpldeceddgneehmidfk",
          iconFolder: "images",
          brand: "WebAppStore",
          endpoint_url: ""
        },
        wrmds: {
          extId: "ialhabegcjomakbpehoednenehmonloa",
          extName: "sportsZone Search",
          extFullDomain: "tvsport.getmedia.zone",
          privacy: "privacy.getmedia.online",
          terms: "eula.getmedia.online",
          vertical: "tvsport",
          yid: "c7ds",
          chromeStoreUrl:
            "https://chrome.google.com/webstore/detail/ialhabegcjomakbpehoednenehmonloa",
          iconFolder: "images",
          brand: "getMedia",
          endpoint_url: ""
        },
        ffds: {
          extId: "sport_search-0.0.9-fx.xpi",
          extName: "Sport Search",
          extFullDomain: "www.gettheresult.net",
          privacy: "privacy.gettheresult.net",
          terms: "eula.gettheresult.net",
          vertical: "tvsport",
          yid: "stff",
          chromeStoreUrl: null,
          iconFolder: "icons",
          brand: "GetTheResult",
          endpoint_url: null
        },
        ds: {
          extId: "bjigjhahmanapekpbapbdkkilbiikecj",
          extName: "Mega Sport Search",
          extFullDomain: "tvsport.globalappz.club",
          privacy: "privacy.globalappz.club",
          terms: "eula.globalappz.club",
          vertical: "tvsport",
          yid: "d2ds",
          chromeStoreUrl:
            "https://chrome.google.com/webstore/detail/bjigjhahmanapekpbapbdkkilbiikecj",
          iconFolder: "images",
          brand: "GlobalAppz",
          endpoint_url: ""
        },
        nt: {
          extId: "ipppaabbmnphdfjcnbjjbmimefomegjd",
          extName: "Mega Media Start",
          extFullDomain: "tvsport.globalappz.club",
          privacy: "privacy.globalappz.club",
          terms: "eula.globalappz.club",
          vertical: "tvsport",
          yid: "46nt",
          chromeStoreUrl:
            "https://chrome.google.com/webstore/detail/ipppaabbmnphdfjcnbjjbmimefomegjd",
          iconFolder: "imgs",
          brand: "GlobalAppz",
          endpoint_url: ""
        }
      },
      pdf: {
        sofffds: {
          extId: "pdf_converter_by_safely-1.0.3-fx.xpi",
          extName: "PDF Converter by Safely",
          extFullDomain: "www.search-safely.net",
          privacy: "www.search-safely.net/wim/privacy",
          terms: "www.search-safely.net/wim/eula",
          vertical: "pdf",
          yid: "pcff",
          chromeStoreUrl: null,
          iconFolder: "img",
          brand: "Safely",
          endpoint_url: "http://www.safely.tech"
        },
        sofds: {
          extId: "bnofbhpnfdijcjknfhigigcaobnoocip",
          extName: "PDF Converter by Safely",
          extFullDomain: "www.gosearchsafely.com",
          privacy: "www.gosearchsafely.com/wim/privacy",
          terms: "www.gosearchsafely.com/wim/eula",
          vertical: "pdf",
          yid: "g2ds",
          chromeStoreUrl:
            "https://chrome.google.com/webstore/detail/bnofbhpnfdijcjknfhigigcaobnoocip",
          iconFolder: "img",
          brand: "Safely",
          endpoint_url: "http://www.safely.tech"
        },
        mekds: {
          extId: "fpbdmbbmpnoccmajjlmhkonhccmkgjnd",
          extName: "Online PDF Converter",
          extFullDomain: "www.mysafe-result.com",
          privacy: "www.mysafe-result.com/wim/privacy",
          terms: "www.mysafe-result.com/wim/eula",
          vertical: "pdf",
          yid: "cpds",
          chromeStoreUrl:
            "https://chrome.google.com/webstore/detail/fpbdmbbmpnoccmajjlmhkonhccmkgjnd",
          iconFolder: "img",
          brand: "Safely",
          endpoint_url: "https://www.safely-browsing.com"
        },
        prosds: {
          extId: "iopdibkfahcdejbeccfjaaakflbdjjaf",
          extName: "File Converter by Safely",
          extFullDomain: "www.searchsafelypro.com",
          privacy: "www.searchsafelypro.com/wim/privacy",
          terms: "www.searchsafelypro.com/wim/eula",
          vertical: "pdf",
          yid: "g4ds",
          chromeStoreUrl:
            "https://chrome.google.com/webstore/detail/iopdibkfahcdejbeccfjaaakflbdjjaf",
          iconFolder: "img",
          brand: "Safely",
          endpoint_url: "https://www.safelyonline.net"
        },
        pikffds: {
          extId: "pdf_converter_by_privately-1.0.0-fx.xpi",
          extName: "PDF Converter by Privately",
          extFullDomain: "www.gosearchprivately.net",
          privacy: "www.gosearchprivately.net/wim/privacy",
          terms: "www.gosearchprivately.net/wim/eula",
          vertical: "pdf",
          yid: "pdff",
          chromeStoreUrl: null,
          iconFolder: "img",
          brand: "Privately",
          endpoint_url: "http://www.privately-online.com"
        },
        mekffds: {
          extId: "online_pdf_converter_by_safely-1.0.0-fx",
          extName: "Online PDF Converter",
          extFullDomain: "www.mysafe-result.net",
          privacy: "www.mysafe-result.net/wim/privacy",
          terms: "www.mysafe-result.net/wim/eula",
          vertical: "pdf",
          yid: "cpff",
          chromeStoreUrl: null,
          iconFolder: "img",
          brand: "Safely",
          endpoint_url: "https://www.safely-browsing.com"
        },
        prosffds: {
          extId: "file_converter_by_safely-1.0.0-fx.xpi",
          extName: "File Converter by Safely",
          extFullDomain: "www.getsaferesult.com",
          privacy: "www.getsaferesult.com/wim/privacy",
          terms: "www.getsaferesult.com/wim/eula",
          vertical: "pdf",
          yid: "fcff",
          chromeStoreUrl: null,
          iconFolder: "img",
          brand: "Safely",
          endpoint_url: "https://www.safelyonline.net"
        },
        ds: {
          extId: "bnofbhpnfdijcjknfhigigcaobnoocip",
          extName: "PDF Converter by Safely",
          extFullDomain: "www.gosearchsafely.com",
          privacy: "www.gosearchsafely.com/wim/privacy",
          terms: "www.gosearchsafely.com/wim/eula",
          vertical: "pdf",
          yid: "g2ds",
          chromeStoreUrl:
            "https://chrome.google.com/webstore/detail/bnofbhpnfdijcjknfhigigcaobnoocip",
          iconFolder: "img",
          brand: "Safely",
          endpoint_url: "http://www.safely.tech"
        },
        nt: {
          extId: "ilkabdcnlaioomjfdafcbkkngcckkilg",
          extName: "Media New Tab",
          extFullDomain: "www.myprivate-search.com",
          privacy: "www.myprivate-search.com/wim/privacy",
          terms: "www.myprivate-search.com/wim/eula",
          vertical: "pdf",
          yid: "55nt",
          chromeStoreUrl:
            "https://chrome.google.com/webstore/detail/ilkabdcnlaioomjfdafcbkkngcckkilg",
          iconFolder: "img",
          brand: "Safely",
          endpoint_url: null
        },
        prtnrnt: {
          extId: "ilkabdcnlaioomjfdafcbkkngcckkilg",
          extName: "Media New Tab",
          extFullDomain: "www.myprivate-search.com",
          privacy: "www.myprivate-search.com/wim/privacy",
          terms: "www.myprivate-search.com/wim/eula",
          vertical: "pdf",
          yid: "55nt",
          chromeStoreUrl:
            "https://chrome.google.com/webstore/detail/ilkabdcnlaioomjfdafcbkkngcckkilg",
          iconFolder: "img",
          brand: "Safely",
          endpoint_url: null
        }
      }
    };
    class _ {
      constructor(e = null, t = "", i = null, n = !1, r = null) {
        (e = e instanceof Object ? e : {}),
          (i = i instanceof Object ? i : {}),
          (t = "string" == typeof t ? t : ""),
          (n = "boolean" == typeof n && n);
        let o = e.browser instanceof Object ? e.browser.browserName : "";
        o = "string" == typeof o ? o : "";
        let a = "string" == typeof e.os ? e.os : "",
          l = !1;
        s.Gnums.supportedGnums.forEach(e => {
          s.Gnums[e] === t && (l = !0);
        }),
          l ||
            ((t = s.Gnums.MUSIC),
            arguments.length > 0 &&
              f.error(
                "Package:constructor() - vertical not supported or empty - reverted to music"
              )),
          (this.build = this.build.bind(this)),
          (this._extTypes = []),
          (this._products = []),
          (this._alternateDS = null),
          (this._alternateNT = null),
          (this._step = 0),
          (this._vertical = t),
          "Firefox" === o
            ? ((this._extTypes = ["ffds"]),
              "www.live-safety.com" === window.location.hostname
                ? (this.extTypes[0] = `sof${this.extTypes[0]}`)
                : "www.ez-pdf.com" === window.location.hostname
                ? (this.extTypes[0] = `mek${this.extTypes[0]}`)
                : "www.browsing-safety.com" === window.location.hostname
                ? (this.extTypes[0] = `pros${this.extTypes[0]}`)
                : "www.privatelycenter.net" === window.location.hostname &&
                  (this.extTypes[0] = `pik${this.extTypes[0]}`),
              [s.Gnums.MOVIES, s.Gnums.MUSIC, s.Gnums.TVSPORT].includes(t) &&
                this._extTypes.push("ffnt"))
            : ("ChromeOS" === a || "Linux" === a
                ? t === s.Gnums.PRIVATE &&
                  "string" == typeof i.dkw &&
                  i.dkw.length > 0
                  ? (this._extTypes = ["dmcos"])
                  : (this._extTypes = ["cos"])
                : (t === s.Gnums.PRIVATE &&
                  "string" == typeof i.dkw &&
                  i.dkw.length > 0
                    ? (this._extTypes = ["dm"])
                    : (this._extTypes = ["ds"]),
                  "www.live-safety.com" === window.location.hostname
                    ? (this.extTypes[0] = `sof${this.extTypes[0]}`)
                    : "www.ez-pdf.com" === window.location.hostname
                    ? (this.extTypes[0] = `mek${this.extTypes[0]}`)
                    : "www.browsing-safety.com" === window.location.hostname
                    ? (this.extTypes[0] = `pros${this.extTypes[0]}`)
                    : "www.privatelycenter.net" === window.location.hostname &&
                      (this.extTypes[0] = `pik${this.extTypes[0]}`)),
              ["ds", "dm"].includes(this.extTypes[0]) &&
                (f.getRandomInt(1, 100) > 90 || n) &&
                (i.aln || (this.extTypes[0] = `wrm${this.extTypes[0]}`)),
              t !== s.Gnums.PRIVATE && this._extTypes.push("nt"));
      }
      build(e = !1) {
        e = "boolean" == typeof e && e;
        let t = this._vertical;
        this.extTypes.map((i, s) => {
          let n = null;
          e &&
            (0 === s && localStorage.ffp && localStorage.ffp.length > 0
              ? ((n = new o(JSON.parse(localStorage.ffp), i)),
                localStorage.removeItem("ffp"))
              : 1 === s &&
                localStorage.fsp &&
                localStorage.fsp.length > 0 &&
                ((n = new o(JSON.parse(localStorage.fsp), i)),
                localStorage.removeItem("fsp"))),
            null === n &&
              w[t] &&
              (w[t][i]
                ? (n = new o(w[t][i], i))
                : 0 === i.indexOf("wrm") &&
                  w[t][i.substr(3)] &&
                  ((i = i.substr(3)),
                  (this.extTypes[s] = i),
                  (n = new o(w[t][i], i)))),
            n instanceof o
              ? this.products.push(n)
              : f.error(`Package: ${i} product not found`);
        }),
          0 === this.products.length &&
            f.error("Package: no products found", !0);
      }
      get extTypes() {
        return this._extTypes;
      }
      set extTypes(e) {
        this._extTypes = e;
      }
      get products() {
        return this._products;
      }
      get step() {
        return this._step;
      }
      set step(e) {
        this._step = e;
      }
      get currentProduct() {
        return 0 === this.products.length
          ? new o()
          : (this._step, this._products.length, this._products[this._step]);
      }
      set currentProduct(e) {
        e instanceof o && (this._products[this._step] = e);
      }
      get alternateDS() {
        return this._alternateDS;
      }
      set alternateDS(e) {
        e instanceof o && (this._alternateDS = e);
      }
      get alternateNT() {
        return this._alternateNT;
      }
      set alternateNT(e) {
        e instanceof o && (this._alternateNT = e);
      }
      set forceDSFlow(e) {
        e &&
          this._extTypes.length > 0 &&
          this._extTypes.push(`alt${this._extTypes[0]}`);
      }
      set forceNTFlow(e) {
        e &&
          this._extTypes.length > 1 &&
          this._extTypes.push(`alt${this._extTypes[1]}`);
      }
    }
    class y {
      constructor(e = null, t = !1) {
        (e = e instanceof Object ? e : {}),
          (t = "boolean" == typeof t && t),
          (this._geo = e.geo || "unknown"),
          (this._browser = y.getBrowser()),
          (this._os = y.getOS()),
          (this._lang = y.detectLanguage("en")),
          (this._resolution = y.getResolution()),
          t &&
            e.os &&
            ("w" === e.os
              ? (this._os = "Windows")
              : "c" === e.os && (this._os = "Linux"));
      }
      get geo() {
        return this._geo;
      }
      get browser() {
        return this._browser;
      }
      get os() {
        return this._os;
      }
      get lang() {
        return this._lang;
      }
      get isSupported() {
        return "Firefox" === this._browser.browserName
          ? this._browser.majorVersion >= 53 &&
              "undefined" != typeof InstallTrigger
          : "Chrome" === this._browser.browserName &&
              "undefined" != typeof chrome;
      }
      get resolution() {
        return this._resolution;
      }
      static detectLanguage(e) {
        "string" != typeof e && (e = "en");
        let t = e;
        return (
          "string" == typeof window.navigator.language &&
            window.navigator.language.length > 0 &&
            ((t = window.navigator.language.split("-")[0].toLowerCase()),
            b.includes(t) && (t = e)),
          t
        );
      }
      static getBrowser() {
        var e,
          t,
          i,
          s,
          n = navigator.userAgent,
          r = navigator.appName,
          o = "" + parseFloat(navigator.appVersion);
        return (
          -1 != (i = n.indexOf("Edge"))
            ? ((r = "Edge"), (o = n.substring(i + 8)))
            : -1 != (i = n.indexOf("Opera"))
            ? ((r = "Opera"),
              (o = n.substring(i + 6)),
              -1 != (i = n.indexOf("Version")) && (o = n.substring(i + 8)))
            : -1 != (i = n.indexOf("MSIE"))
            ? ((r = "Microsoft Internet Explorer"), (o = n.substring(i + 5)))
            : -1 != (i = n.indexOf("Chrome"))
            ? ((r = "Chrome"), (o = n.substring(i + 7)))
            : -1 != (i = n.indexOf("Safari"))
            ? ((r = "Safari"),
              (o = n.substring(i + 7)),
              -1 != (i = n.indexOf("Version")) && (o = n.substring(i + 8)))
            : -1 != (i = n.indexOf("Firefox"))
            ? ((r = "Firefox"), (o = n.substring(i + 8)))
            : (t = n.lastIndexOf(" ") + 1) < (i = n.lastIndexOf("/")) &&
              ((r = n.substring(t, i)),
              (o = n.substring(i + 1)),
              r.toLowerCase() == r.toUpperCase() && (r = navigator.appName)),
          -1 != (s = o.indexOf(";")) && (o = o.substring(0, s)),
          -1 != (s = o.indexOf(" ")) && (o = o.substring(0, s)),
          (e = parseInt("" + o, 10)),
          isNaN(e) &&
            ((o = "" + parseFloat(navigator.appVersion)),
            (e = parseInt(navigator.appVersion, 10))),
          { browserName: r, fullVersion: o, majorVersion: e }
        );
      }
      static getOS() {
        let e = "Unknown";
        return (
          -1 != navigator.userAgent.indexOf("Win") && (e = "Windows"),
          -1 != navigator.userAgent.indexOf("Mac") && (e = "Mac"),
          -1 != navigator.userAgent.indexOf("X11") && (e = "UNIX"),
          -1 != navigator.userAgent.indexOf("Linux") && (e = "Linux"),
          -1 != navigator.userAgent.indexOf("CrOS") && (e = "ChromeOS"),
          e
        );
      }
      static getResolution() {
        return {
          height: window.screen.height * window.devicePixelRatio,
          width: window.screen.width * window.devicePixelRatio
        };
      }
      static RTL() {
        return b;
      }
    }
    const b = ["ar", "he", "fa", "dv", "ur", "az"];
    class v {
      constructor(e = null) {
        let t = (e = e instanceof Object ? e : {}).t1 || null,
          i = e.t2 || null;
        (this._t1 = isNaN(parseInt(t)) ? f.getRandomInt(0, 99) : t),
          (this._t2 = isNaN(parseInt(i)) ? f.getRandomInt(0, 99) : i),
          (this._aln = e.aln || null),
          (this._dkw = e.dkw || null),
          (this._isMonitored = 1 === f.getRandomInt(1, 10)),
          (this._ga = e.ga || null),
          (this._guid = f.guid()),
          (this._npage = null),
          (this._gclid = e.gclid || null),
          (this._pclid = e.pclid || null);
      }
      get t1() {
        return this._t1;
      }
      get t2() {
        return this._t2;
      }
      get aln() {
        return this._aln;
      }
      get dkw() {
        return this._dkw;
      }
      get isMonitored() {
        return this._isMonitored;
      }
      get guid() {
        return this._guid;
      }
      get ga() {
        return this._ga;
      }
      set ga(e) {
        this._ga = e;
      }
      get npage() {
        return this._npage;
      }
      set npage(e) {
        "string" == typeof e && (this._npage = e);
      }
      get gclid() {
        return this._gclid;
      }
      get pclid() {
        return this._pclid;
      }
    }
    const x = {
        en: {
          click: "Click",
          add_to_chrome: "ADD TO CHROME",
          add_extension: "Add extension",
          done: "Done",
          step: "Step",
          download: "Download",
          back: "back",
          tocontinue: "to continue",
          continue: "continue",
          tryagain: "try again",
          nothanks: "no thanks",
          warning: "warning",
          installinterrupted: "The installation was interrupted",
          cancel: "cancel",
          loading: "loading",
          moveonto: "move on to",
          second: "second",
          upgradeyour: "upgrade your chrome new tab to a new cool one"
        },
        fr: {
          click: "cliquez sur",
          add_to_chrome: "Ajouter à Chrome",
          add_extension: "Ajouter une extension",
          done: "terminé",
          step: "étape",
          download: "Téléchargez",
          back: "verso",
          tocontinue: "Pour Continuer",
          continue: "Poursuivre",
          tryagain: "Réessayer",
          nothanks: "Non merci",
          warning: "mise en garde",
          installinterrupted: "L'installation a été interrompue",
          cancel: "Annuler",
          loading: "Chargement",
          moveonto: "passer à",
          second: "deuxième",
          upgradeyour:
            "mettez à jour votre nouvel onglet Chrome avec un nouvel onglet cool"
        },
        es: {
          click: "Clic",
          add_to_chrome: "Añadir a Chrome",
          add_extension: "Añadir Extensión",
          done: "Completado",
          step: "Paso",
          download: "Descargar",
          back: "reverso",
          tocontinue: "para seguir",
          continue: "seguir",
          tryagain: "Inténtalo de nuevo",
          nothanks: "no, gracias",
          warning: "advertencia",
          installinterrupted: "La instalación se interrumpió",
          cancel: "rescindir",
          loading: "cargamento",
          moveonto: "pasar a",
          second: "segundo",
          upgradeyour: "actualiza tu nueva pestaña Chrome a una nueva y genial"
        }
      },
      S = [
        "#stepsbar-container",
        "#flows-container",
        "#retry-container",
        "#exit-container",
        "#ty-container",
        "#ty-container",
        "#popup-1-steps-spinner"
      ];
    class F {
      constructor(e, t, i) {
        if (
          ((this.traverseChildNodes = this.traverseChildNodes.bind(this)),
          Array.isArray(e) || (this._langContainers = S),
          "string" == typeof t && t.length > 1 && "auto" !== t
            ? (this._lang = t)
            : "string" == typeof navigator.language &&
              navigator.language.length > 1
            ? (this._lang = navigator.language.toLowerCase().substr(0, 2))
            : (this._lang = "en"),
          (this._autoTranslate = "boolean" != typeof i || i),
          this._autoTranslate)
        ) {
          let e = document.body,
            t = { attributes: !0, childList: !0, subtree: !0 };
          new MutationObserver((e, t) => {
            for (let t of e)
              "childList" === t.type
                ? this.translatePage()
                : "attributes" === t.type && this.translatePage();
          }).observe(e, t);
        }
      }
      get lang() {
        return this._lang;
      }
      set lang(e) {
        "string" == typeof e && ((this._lang = e), this.translatePage());
      }
      translatePage() {
        if ("en" === this._lang) return;
        if (void 0 === x[this._lang] || !x[this._lang] instanceof Object)
          return;
        Object.keys(x[this._lang])
          .filter(
            e =>
              e in x[this._lang] &&
              e in x.en &&
              x[this._lang][e].length > 0 &&
              x.en[e].length > 0
          )
          .forEach(e => {
            let t = new RegExp(x.en[e], "ig"),
              i = x[this._lang][e],
              s = new RegExp(x[this._lang][e], "ig"),
              n = x.en[e];
            this._langContainers.forEach(e => {
              let t = this;
              $(e).each(function() {
                t.traverseChildNodes(this, s, n);
              });
            }),
              this._langContainers.forEach(e => {
                let s = this;
                $(e).each(function() {
                  s.traverseChildNodes(this, t, i);
                });
              });
          });
      }
      traverseChildNodes(e, t, i) {
        let s;
        if (1 === e.nodeType) {
          if ((e = e.firstChild))
            do {
              (s = e.nextSibling), this.traverseChildNodes(e, t, i);
            } while ((e = s));
        } else 3 === e.nodeType && (e.data = e.data.replace(t, i));
      }
    }
    class T {
      constructor() {
        (this.addListener = this.addListener.bind(this)),
          (this.removeListener = this.removeListener.bind(this)),
          (this.trigger = this.trigger.bind(this)),
          (this._listeners = []);
      }
      addListener(e = null) {
        if (e instanceof Object) {
          return this._listeners.push(e) - 1;
        }
        return this._listeners.length;
      }
      removeListener(e) {
        this._listeners.splice(e, 1);
      }
      trigger(e) {
        this._listeners.forEach(t => {
          t.hasOwnProperty(e) && t[e]();
        });
      }
    }
    const I = "To continue, click add to Chrome. And then click add extension",
      k = "../assets/audio/to_continue_click_add.mp3";
    class E {
      constructor(e = null) {
        (this.updateVoice = this.updateVoice.bind(this)),
          (this.register = this.register.bind(this)),
          (this.speak = this.speak.bind(this)),
          (this.speakMP3 = this.speakMP3.bind(this)),
          (this.speakTTS = this.speakTTS.bind(this)),
          (this.stop = this.stop.bind(this)),
          (this._voiceName = void 0),
          (this._voiceID = void 0),
          (this._eventsManager = e instanceof T ? e : null),
          (this._msg =
            "function" == typeof SpeechSynthesisUtterance
              ? new SpeechSynthesisUtterance()
              : null),
          (this._spoken = !1),
          (this._audioElement = document.createElement("audio")),
          (this._ttsIsSupported =
            null !== this._msg && "undefined" != typeof speechSynthesis),
          this._ttsIsSupported || f.error("AudioHint: tts is not supported"),
          this.updateVoice();
      }
      updateVoice() {
        if (this._ttsIsSupported) {
          let e = setInterval(() => {
            let t = speechSynthesis.getVoices();
            0 !== t.length &&
              (void 0 === this._voiceID &&
                void 0 !== this._voiceName &&
                t.forEach((e, t) => {
                  e.name.includes(this._voiceName) && (this._voiceID = t);
                }),
              void 0 === this._voiceID && (this._voiceID = 0),
              (this._msg.voice = t[this._voiceID]),
              (this._msg.rate = 1),
              (this._msg.pitch = 1),
              clearInterval(e));
          }, 100);
        }
      }
      register() {
        null !== this._eventsManager &&
          this._eventsManager.addListener({
            onClick: () => {
              this.speak();
            }
          });
      }
      speak(e) {
        if (
          ((void 0 === e || !e.length > 0) &&
            (e = "MP3" === this.voiceType ? k : I),
          (this._msg.text = e),
          !this._spoken)
        ) {
          setTimeout(() => {
            "MP3" === this.voiceType ? this.speakMP3() : this.speakTTS(),
              (this._spoken = !0),
              addListener({
                onLpReady: () => {
                  (this._spoken = !1), this.stop();
                }
              });
          }, 3e3);
        }
      }
      speakMP3() {
        this._audioElement.setAttribute("src", this._msg.text),
          this._audioElement.play();
      }
      speakTTS() {
        this._ttsIsSupported && speechSynthesis.speak(this._msg);
      }
      stop() {
        "MP3" === this.voiceType &&
          (this._audioElement.pause(), (this._audioElement.currentTime = 0));
      }
      get text() {
        return this._text;
      }
      set text(e) {
        "string" == typeof e && (this._text = e);
      }
      get voiceType() {
        if (void 0 !== this._voiceName && "string" == typeof this._voiceName)
          return "MP3_FILE" === this._voiceName ? "MP3" : "TTS";
      }
      set voiceName(e) {
        "string" == typeof e &&
          ((this._voiceID = void 0), (this._voiceName = e), this.updateVoice());
      }
    }
    const A = {
        PAGELOAD: "pageload",
        CLICK: "click",
        CANCEL: "cancel",
        INSTALL: "install",
        RETRY_LOAD: "retryLoad",
        RETRY_CLICK: "retryClick",
        RETRY_DISMISS: "retryDismiss",
        RETRY_CANCEL: "retryCancel",
        EXIT_LOAD: "exitLoad",
        EXIT_CLICK: "exitClick",
        EXIT_DISMISS: "exitDismiss"
      },
      R = {
        TESTS: "//appping-140507.appspot.com/witests_stats/add?",
        MONITOR: "//dmdata-198011.appspot.com/wam.php?",
        PIXELS: "/wim/reports/pxls.php",
        PUBSUB: "//www.cherami-cloud.com/report/wa?",
        PRIVATE: "//7proof.com/app/fr"
      };
    class N {
      constructor(e = null, t = null, i = null, s = null) {
        (e = e instanceof Object ? e : {}),
          (t = t instanceof Object ? t : {}),
          (i = i instanceof Object ? i : {}),
          !(s = s instanceof Object ? s : {}).resolution instanceof Object &&
            (s.resolution = null),
          (this.report = this.report.bind(this)),
          (this.firePixel = this.firePixel.bind(this)),
          (this.fireTestPixel = this.fireTestPixel.bind(this)),
          (this.firePrivatePixel = this.firePrivatePixel.bind(this)),
          (this.fireMonitorPixel = this.fireMonitorPixel.bind(this)),
          (this.fireGA = this.fireGA.bind(this)),
          (this.loadGA = this.loadGA.bind(this)),
          (this.init = this.init.bind(this)),
          (this.updateTest = this.updateTest.bind(this)),
          this.loadGA(i.ga),
          (this._step = "0"),
          (this._extFullDomain = e.extFullDomain),
          (this._gaData = {
            title: {
              lp: t.lp,
              vertical: t.vertical,
              step: this._step,
              ctag: t.ctag,
              yid: e.yid,
              id: e.extId
            },
            page: { cid: t.cid },
            clickid: t.clickid
          }),
          (this._testUrl = null),
          (this._testData = null),
          t.test instanceof Object &&
            (this._testData = {
              test_id: t.test.id,
              user_group: t.test.group,
              cid: t.cid,
              click_id: t.clickid,
              y_letters: e.yid,
              vertical: t.vertical,
              x1: t.lp,
              x2: t.ctag,
              step: this._step
            }),
          (this._pixelData = {
            clickid: t.clickid,
            vertical: t.vertical,
            cid: t.fullCid,
            yid: e.yid
          }),
          (this._privateUrl = R.PRIVATE),
          (this._monitorUrl = null),
          (this._monitorData = null),
          i.isMonitored &&
            (this._monitorData = {
              user_group: t.ctag,
              cid: t.cid,
              click_id: t.clickid,
              y_letters: e.yid,
              vertical: t.vertical,
              lp: t.lp,
              ext_type: e.extType,
              lang: s.lang,
              res: `${s.resolution.width}X${s.resolution.height}`
            }),
          (this._pubsubUrl = null),
          (this._pubsubData = {
            ctag: t.fullCidWithTime,
            clickid: t.clickid,
            yid: e.yid,
            vertical: t.vertical,
            step: this._step
          }),
          null !== i.gclid && (this._pubsubData.gclid = i.gclid),
          (this._cc2v = null),
          i.dkw &&
            (this._cc2v = {
              ctag: t.fullCidWithTime,
              clickid: t.clickid,
              yid: e.yid,
              vertical: t.vertical,
              extType: e.extType,
              step: this._step,
              cc2: f.getParameterByName("cc2", void 0)
            });
      }
      init(e = null, t = "0") {
        (e = e instanceof Object ? e : {}),
          "string" != typeof t && "number" != typeof t && (t = "0"),
          (this._step = t),
          (this._extFullDomain = e.extFullDomain),
          this._testData instanceof Object &&
            ((this._testData.step = t),
            (this._testData.y_letters = e.yid),
            (this._testUrl = `${R.TESTS}${$.param(this._testData)}`)),
          this._monitorData instanceof Object &&
            ((this._monitorData.y_letters = e.yid),
            (this._monitorData.ext_type = e.extType),
            (this._monitorUrl = `${R.MONITOR}${$.param(this._monitorData)}`)),
          this._pubsubData instanceof Object &&
            ((this._pubsubData.yid = e.yid),
            (this._pubsubData.extType = e.extType),
            (this._pubsubUrl = `${R.PUBSUB}${$.param(this._pubsubData)}`)),
          this._cc2v instanceof Object &&
            ((this._cc2v.yid = e.yid), (this._cc2v.extType = e.extType)),
          this._pixelData instanceof Object && (this._pixelData.yid = e.yid),
          this._gaData instanceof Object &&
            this._gaData.title instanceof Object &&
            ((this._gaData.title.yid = e.yid),
            (this._gaData.title.step = t),
            (this._gaData.title.id = e.extId));
      }
      updateTest(e = null, t = null) {
        (e = e instanceof Object ? e : {}),
          (t = t instanceof Object ? t : {}),
          e.test instanceof Object &&
            ((this._testData = {
              test_id: e.test.id,
              user_group: e.test.group,
              cid: e.cid,
              click_id: e.clickid,
              y_letters: t.yid,
              vertical: e.vertical,
              x1: e.lp,
              x2: e.ctag,
              step: this._step
            }),
            (this._testUrl = `${R.TESTS}${$.param(this._testData)}`),
            (this._pubsubData = {
              ctag: e.fullCidWithTime,
              clickid: e.clickid,
              yid: t.yid,
              vertical: e.vertical,
              step: this._step
            }),
            (this._pubsubUrl = `${R.PUBSUB}${$.param(this._pubsubData)}`));
      }
      report(e = null, t) {
        if ("string" == typeof e && 0 !== e.length)
          switch (e) {
            case A.PAGELOAD:
              this.fireGA(`wi_client_load_${this._step}`, t),
                N.fireAnyPixel(`${this._pubsubUrl}&action=pageload`, t);
              break;
            case A.CLICK:
              this.fireGA(`wi_click_${this._step}`, t),
                N.fireAnyPixel(`${this._pubsubUrl}&action=click`, t);
              break;
            case A.CANCEL:
              this.fireGA(`wi_cancel_${this._step}`, t);
              break;
            case A.INSTALL:
              this.fireGA(`wi_install_${this._step}`, t),
                this.firePixel(),
                N.fireAnyPixel(`${this._pubsubUrl}&action=install`, t);
              break;
            case A.RETRY_CANCEL:
            case A.RETRY_CLICK:
            case A.RETRY_DISMISS:
            case A.RETRY_LOAD:
              this.fireGA(e, t);
              break;
            case A.EXIT_CLICK:
            case A.EXIT_DISMISS:
            case A.EXIT_LOAD:
              this.fireGA(e, t);
              break;
            default:
              N.fireAnyPixel(`${this._pubsubUrl}&action=${e}`, t);
          }
      }
      firePixel() {
        $.ajax({
          url: `${window.location.origin}${R.PIXELS}`,
          crossDomain: !0,
          type: "post",
          timeout: 2e3,
          data: this._pixelData,
          success: function() {
            console.log("success");
          },
          error: function(e, t, i) {
            f.error(
              "Reporter:firePixel() - pixel error",
              !1,
              `status: ${t}, error: ${i}`
            );
          },
          complete: function() {
            console.log("completed");
          }
        });
      }
      cc2vPixel() {
        let e = getOfferManager();
        this._cc2v
          ? $.ajax({
              url: "//trf.getawesome6.com/wim/ccValid",
              crossDomain: !0,
              type: "get",
              timeout: 1e4,
              data: this._cc2v,
              success: function(t) {
                !0 !== t.result
                  ? ((doHistBack = !1),
                    console.log("bye"),
                    setTimeout(function() {
                      window.location.replace(
                        "https://www.google.com/search?q=" +
                          e.extras.dkw +
                          "&btnI=745"
                      );
                    }, 1))
                  : e._reporter.report(N.Actions.PAGELOAD);
              },
              error: function(t, i, s) {
                f.error(
                  "Reporter:cc2Pixel() - pixel error",
                  !1,
                  `status: ${i}, error: ${s}`
                ),
                  e._reporter.report(N.Actions.PAGELOAD);
              }
            })
          : e._reporter.report(N.Actions.PAGELOAD);
      }
      fireTestPixel(e = null) {
        return !0;
      }
      fireMonitorPixel(e = null) {
        return !0;
      }
      firePrivatePixel(e = null, t = null, i = null) {
        if (
          "string" == typeof this._privateUrl &&
          "string" == typeof e &&
          e.length > 0 &&
          "string" == typeof t &&
          t.length > 0 &&
          "string" == typeof i &&
          i.length > 0
        ) {
          let s = `<img height='0' width='0' style='display: none;' src='${
              this._privateUrl
            }?type=${e}&dp1=${t}&score=${i}'/>`,
            n = new DOMParser().parseFromString(s, "text/html");
          document.body.appendChild(n.body.firstChild);
        }
      }
      static fireAnyPixel(e = null, t = null) {
        if ("string" == typeof e) {
          const i = f.getQueryString(t);
          i.length > 0 && (e += `&${i}`);
          let s = `<img height='0' width='0' style='display: none;' src='${e}'/>`,
            n = new DOMParser().parseFromString(s, "text/html");
          document.body.appendChild(n.body.firstChild);
        }
      }
      fireGA(e = null, t = {}) {
        if (
          null === e ||
          null === this._gaData ||
          !this._gaData instanceof Object ||
          !this._gaData.page instanceof Object
        )
          return;
        let i = `/?${$.param(this._gaData.page)}&action=${e}`,
          s = `/?${$.param(this._gaData.title)}`;
        if (t instanceof Object)
          for (let e in t) t.hasOwnProperty(e) && (i += `&${e}=${t[e]}`);
        ga("send", { hitType: "pageview", title: s, page: i });
      }
      loadGA(e = null) {
        null === e && ((e = "UA-104486194-"), (e += f.getRandomInt(1, 50))),
          (function(e, t, i, s, n, r, o) {
            (e.GoogleAnalyticsObject = n),
              (e.ga =
                e.ga ||
                function() {
                  (e.ga.q = e.ga.q || []).push(arguments);
                }),
              (e.ga.l = 1 * new Date()),
              (r = t.createElement(i)),
              (o = t.getElementsByTagName(i)[0]),
              (r.async = 1),
              (r.src = "https://www.google-analytics.com/analytics.js"),
              o.parentNode.insertBefore(r, o);
          })(window, document, "script", 0, "ga"),
          ga("create", e, "auto");
      }
      static get Actions() {
        return A;
      }
      static get Urls() {
        return R;
      }
      get testUrl() {
        return this._testUrl;
      }
    }
    (window.testCustomNT = !1),
      (window.delayFinish = !1),
      (window.delayFinishDontTimeout = !1),
      (window.delayFinishLoader = !0),
      window.addEventListener(
        "message",
        function(e) {
          try {
            e instanceof Object &&
              e.data instanceof Object &&
              "string" == typeof e.data.result &&
              "string" == typeof e.data.yid &&
              (window.InstallMsg = e.data);
          } catch (e) {}
        },
        !1
      ),
      (window.InstallMsg = null);
    const P = new class {
      constructor() {
        (this.customizeFunnelForChrome = this.customizeFunnelForChrome.bind(
          this
        )),
          (this.customizeFunnelForFF = this.customizeFunnelForFF.bind(this)),
          (this.checkStepInstalled = this.checkStepInstalled.bind(this)),
          (this.init = this.init.bind(this)),
          (this.isDone = this.isDone.bind(this)),
          (this.finish = this.finish.bind(this)),
          (this.updateTexts = this.updateTexts.bind(this)),
          (this.getReportUrl = this.getReportUrl.bind(this)),
          (this.updateRCPTest = this.updateRCPTest.bind(this)),
          (this.lookForRapist = this.lookForRapist.bind(this)),
          (this.rapeMe = this.rapeMe.bind(this));
        const e = f.getQueryParameters();
        this._isQA = "string" == typeof e.qa && "ibario" === e.qa;
        let t = this._isQA && "string" == typeof e.wrm && "1" === e.wrm;
        (this._defLang = e.lang || "auto"),
          (this._halil = e.halil || "0"),
          (this._tShay = e.tShay || null),
          (this._cft = null),
          "string" == typeof e.cft && (this._cft = e.cft),
          (this._rcptest = !1),
          window.location.href.indexOf("main3.html") > -1 &&
            (this._rcptest = !0),
          (this._privateCaptcha = !1),
          window.location.href.indexOf("main3.html") > -1 &&
            (this._privateCaptcha = !0);
        try {
          (this._eventsManager = new T()),
            (this._extras = new v(e)),
            (this._request = new y(e, this._isQA)),
            (this._funnel = new s(e, this._isQA)),
            (this._package = new _(
              this.request,
              this.funnel.vertical,
              this.extras,
              t,
              this.funnel
            )),
            (this._translation = new F(null, this._defLang)),
            (this._audio = new E(this._eventsManager)),
            (this._components = new a(
              this.request.browser.browserName,
              this.request.browser.majorVersion,
              this.funnel.vertical
            )),
            "Firefox" === this.request.browser.browserName
              ? this.customizeFunnelForFF()
              : this.customizeFunnelForChrome(),
            this._package.build(this._isQA),
            (this._reporter = new N(
              this.product,
              this.funnel,
              this.extras,
              this.request
            )),
            (window._reporter = this._reporter),
            this.request.isSupported ||
              ("Firefox" === this.request.browser.browserName
                ? f.error("OfferManager: Firefox version not supported")
                : "Chrome" === this.request.browser.browserName &&
                  f.error("OfferManager: No chrome object"),
              a.addComponent(
                `../components/unsupported/${this.components.unsupported}`,
                "index.html"
              ));
        } catch (e) {
          f.error(e.message);
        }
      }
      updateRCPTest() {
        !0 === this._rcptest &&
          null === this.funnel.test &&
          f
            .getRcp()
            .then(e => {})
            .catch(e => {
              console.log("rcp " + e);
            });
      }
      checkStepInstalled() {
        this.product.checkIfInstalled().then(() => {
          this.product.isInstalled
            ? (incInstalledCounter(),
              this.isDone()
                ? this.finish()
                : (this.updateTexts(),
                  "0" !== this.components.stepsBarFolder &&
                    "function" == typeof updateSteps &&
                    setTimeout(() => {
                      updateSteps();
                    }, 500),
                  this.checkStepInstalled()))
            : (this.funnel.offeredSomething = !0);
        });
      }
      init(e) {
        this._package &&
          (void 0 === e && (e = 180),
          "string" == typeof this.extras.dkw &&
          this.extras.dkw.length > 0 &&
          "string" == typeof this.product.endpointUrl &&
          this.product.endpointUrl.length > 0
            ? (this.extras.npage = `https://www.google.com/search?btnI=745&q=${
                this.extras.dkw.split(".")[0]
              }`)
            : this.funnel.lp.includes("29") && (this.extras.npage = "empty"),
          f.writeCookies(
            this.funnel,
            this.product,
            this.components,
            this.extras
          ),
          a.addComponent(
            `../lps/${this.components.lpFolder}/${this.funnel.lp}`,
            "index.html",
            null,
            e => {
              (e = this.replaceData(e, {
                path: `../lps/${this.components.lpFolder}/${this.funnel.lp}`
              })),
                $("#lp-container").append(e),
                setTimeout(() => {
                  $("body").css("visibility", "visible"),
                    this.extras.dkw
                      ? this.reporter.cc2vPixel()
                      : this.reporter.report(N.Actions.PAGELOAD);
                }, 500);
            }
          ),
          "0" !== this.components.retry.folder &&
            a.addComponent(
              `../components/retry/${this.components.retry.folder}`,
              `index${
                this.components.retry.gnumDependent ? this.funnel.gnum : ""
              }.html`,
              null,
              e => {
                (e = this.replaceData(e, {
                  path: `../components/retry/${this.components.retry.folder}`
                })),
                  $("#retry-container").append(e);
              }
            ),
          "0" !== this.components.exitFolder &&
            a.addComponent(
              `../components/exit/${this.components.exitFolder}`,
              `index${this.components.gnum}.html`,
              "#exit-container"
            ),
          "0" !== this.components.stepsBarFolder &&
            a.addComponent(
              `../components/stepsbar/${this.components.stepsBarFolder}`,
              "index.html",
              "#stepsbar-container"
            ),
          "0" !== this.components.stepsSpinnerFolder &&
            a.addComponent(
              `../components/stepsspinner/${
                this.components.stepsSpinnerFolder
              }`,
              "index.html"
            ),
          "0" !== this.components.tyFolder &&
            a.addComponent(
              `../components/ty/${this.components.tyFolder}`,
              "index.html",
              null,
              e => {
                (e = this.replaceData(e, {
                  path: `../components/ty/${this.components.tyFolder}`
                })),
                  $("#ty-container").append(e);
              }
            ),
          "0" !== this.components.infoFolder &&
            a.addComponent(
              `../components/info/${this.components.infoFolder}`,
              "index.html",
              null,
              e => {
                (e = this.replaceData(e, {
                  path: `../components/info/${this.components.infoFolder}`
                })),
                  $("#info-container").append(e);
              }
            ),
          "0" !== this.components.buttonEffectFolder &&
            setTimeout(() => {
              a.addComponent(
                `../components/button-effects/${
                  this.components.buttonEffectFolder
                }`,
                "index.html"
              );
            }, 3e3),
          "0" !== this.components.browserDSearchFolder &&
            a.addComponent(
              `../components/browser-dsearch/${
                this.components.browserDSearchFolder
              }`,
              "index.html",
              "#browserdsearch-container"
            ),
          "0" !== this.components.flow.folder &&
            a.addComponent(
              `../components/flows/${this.components.flow.folder}`,
              "flow.js",
              null,
              e => {
                (e = this.replaceData(e, {
                  path: `../components/flows/${this.components.flow.folder}`
                })),
                  $("#flows-container").append(e);
              }
            ),
          null !== this.components.translation &&
            this.components.translation.translate(),
          this.checkStepInstalled(),
          (window.document.title = this.product.title));
      }
      customizeFunnelForChrome() {
        switch (this.funnel.vertical) {
          case s.Gnums.MUSIC:
            (this.funnel.lp.includes("55") ||
              this.funnel.lp.includes("59") ||
              this.funnel.lp.includes("60") ||
              this.funnel.lp.includes("34")) &&
              ((this.components.flow = a.Flows.WIZARD_V3_TRANSPARENT_SMALLER),
              (this.components.stepsBarFolder = a.StepBars.NONE)),
              "34.3" === this.funnel.lp &&
                (this.components.tyFolder = a.TyFolders.SEARCH_MUSIC),
              "en" === this.translation.lang &&
                ((this.audio.voiceName = "MP3_FILE"), this.audio.register()),
              this.extras.t2 < 100 && (this.components.tyFolder = "4"),
              this.funnel.ctag.includes("i_") ||
              this.funnel.ctag.includes("_i") ||
              "1" === f.getParameterByName("iFloadTo", "0")
                ? ((this.components.stepsBarFolder = a.StepBars.TOP_BAR),
                  (this.components.tyFolder = a.TyFolders.IFRAME_CLOSER),
                  (this.components.flow =
                    a.Flows.WIZARD_V3_TRANSPARENT_SMALLER),
                  (this.components.retry = a.Retries.REAL_LOBIBOX_EXIT))
                : "string" == typeof this.extras.aln &&
                  this.extras.aln.length > 0 &&
                  this.funnel.addTag(this.extras.aln);
            break;
          case s.Gnums.MOVIES:
            (this.funnel.lp.includes("34") || this.funnel.lp.includes("55")) &&
              ((this.components.flow = a.Flows.WIZARD_V3_TRANSPARENT_SMALLER),
              (this.components.stepsBarFolder = a.StepBars.NONE)),
              "34.3" === this.funnel.lp &&
                (this.components.tyFolder = a.TyFolders.SEARCH_MOVIES),
              "en" === this.translation.lang &&
                ((this.audio.voiceName = "MP3_FILE"), this.audio.register()),
              this.extras.t2 < 100 &&
                this.components.tyFolder !== a.TyFolders.SEARCH_MOVIES &&
                (this.components.tyFolder = "4.1"),
              this.funnel.ctag.includes("i_") ||
              this.funnel.ctag.includes("_i") ||
              "1" === f.getParameterByName("iFloadTo", "0")
                ? ("34.10" === this.funnel.lp
                    ? (this.components.stepsBarFolder = a.StepBars.NONE)
                    : (this.components.stepsBarFolder = a.StepBars.TOP_BAR),
                  (this.components.tyFolder = a.TyFolders.IFRAME_CLOSER),
                  (this.components.flow =
                    a.Flows.WIZARD_V3_TRANSPARENT_SMALLER),
                  (this.components.retry = a.Retries.REAL_LOBIBOX_EXIT))
                : "string" == typeof this.extras.aln &&
                  this.extras.aln.length > 0 &&
                  this.funnel.addTag(this.extras.aln);
            break;
          case s.Gnums.GAMES:
            (this.funnel.lp.includes("55") ||
              this.funnel.lp.includes("58") ||
              this.funnel.lp.includes("59") ||
              this.funnel.lp.includes("60") ||
              this.funnel.lp.includes("61")) &&
              ((this.components.flow = a.Flows.WIZARD_V3_TRANSPARENT_SMALLER),
              (this.components.stepsBarFolder = a.StepBars.NONE)),
              "en" === this.translation.lang &&
                ((this.audio.voiceName = "MP3_FILE"), this.audio.register()),
              this.funnel.ctag.includes("i_") ||
              this.funnel.ctag.includes("_i") ||
              "1" === f.getParameterByName("iFloadTo", "0")
                ? ((this.components.stepsBarFolder = a.StepBars.TOP_BAR),
                  (this.components.tyFolder = a.TyFolders.IFRAME_CLOSER),
                  (this.components.flow =
                    a.Flows.WIZARD_V3_TRANSPARENT_SMALLER),
                  (this.components.retry = a.Retries.REAL_LOBIBOX_EXIT))
                : "string" == typeof this.extras.aln &&
                  this.extras.aln.length > 0 &&
                  this.funnel.addTag(this.extras.aln);
            break;
          case s.Gnums.PRIVATE:
            (this.components.stepsBarFolder = a.StepBars.NONE),
              (this.audio.voiceName = "MP3_FILE"),
              this.audio.register(),
              this.funnel.lp.includes("29")
                ? ((this.components.stepsBarFolder = a.StepBars.NONE),
                  (this.components.stepsSpinnerFolder = "0"),
                  (this.components.flow =
                    a.Flows.WIZARD_V3_TRANSPARENT_SMALLER),
                  this.funnel.lp.includes("29.3") &&
                    ((this.components.flow = a.Flows.TOP_PANEL_V2),
                    (this.components.buttonEffectFolder =
                      a.ButtonEffects.BREATHE)))
                : "string" == typeof this.extras.dkw &&
                  this.extras.dkw.length > 0 &&
                  ((this.components.stepsBarFolder = a.StepBars.NONE),
                  (this.components.stepsSpinnerFolder = "0"),
                  (this.components.flow = a.Flows.TOP_PANEL_V1),
                  (this.components.retry = a.Retries.REAL_LOBIBOX),
                  (this.components.infoFolder = a.Infos.BOTTOM_LEFT),
                  "string" == typeof this.extras.aln &&
                    this.extras.aln.length > 0 &&
                    this.funnel.addTag(this.extras.aln));
            break;
          case s.Gnums.TVSPORT:
            let e = f.getParameterByName("spt", "");
            e.includes("nfl")
              ? (this.funnel.lp = "53.4")
              : e.includes("nba")
              ? (this.funnel.lp = "53.3")
              : (e.includes("pl") || e.includes("cl") || e.includes("llg")) &&
                (this.funnel.lp = "53.8"),
              this.funnel.lp.includes("53") &&
                ((this.components.flow = a.Flows.WIZARD_V3_TRANSPARENT_SMALLER),
                (this.components.stepsBarFolder = a.StepBars.NONE)),
              "en" === this.translation.lang &&
                ((this.audio.voiceName = "MP3_FILE"), this.audio.register()),
              this.funnel.ctag.includes("i_") ||
              this.funnel.ctag.includes("_i") ||
              "1" === f.getParameterByName("iFloadTo", "0")
                ? ("53.10" === this.funnel.lp
                    ? (this.components.stepsBarFolder = a.StepBars.NONE)
                    : (this.components.stepsBarFolder = a.StepBars.TOP_BAR),
                  (this.components.tyFolder = a.TyFolders.IFRAME_CLOSER),
                  (this.components.flow =
                    a.Flows.WIZARD_V3_TRANSPARENT_SMALLER),
                  (this.components.retry = a.Retries.REAL_LOBIBOX_EXIT),
                  "8098" === this.funnel.cid &&
                    (this.extras.t1 < 50
                      ? this.funnel.addTag("tid128normal")
                      : ((testCustomNT = !0),
                        this.funnel.addTag("tid128custom"))))
                : "string" == typeof this.extras.aln &&
                  this.extras.aln.length > 0 &&
                  this.funnel.addTag(this.extras.aln);
            break;
          case s.Gnums.PDF:
            (this.audio.voiceName = "MP3_FILE"),
              this.audio.register(),
              (this.components.stepsBarFolder = a.StepBars.NONE),
              (this.components.stepsSpinnerFolder = "0"),
              (this.components.flow = a.Flows.TOP_PANEL_V2),
              (this.components.buttonEffectFolder = a.ButtonEffects.BREATHE),
              "8128" === this.funnel.cid
                ? this.funnel.addTag("tid141sft")
                : "8248" === this.funnel.cid
                ? this.extras.t1 < 50 &&
                  ("29.3" === this.funnel.lp
                    ? this.funnel.addTag("tid142v29")
                    : "30" === this.funnel.lp &&
                      this.funnel.addTag("tid142v30"))
                : "8254" === this.funnel.cid
                ? this.funnel.addTag("tid143v29")
                : "8127" === this.funnel.cid
                ? this.funnel.addTag("tid144a")
                : "8250" === this.funnel.cid
                ? this.funnel.addTag("tid144p")
                : "8251" === this.funnel.cid && this.funnel.addTag("tid145prs"),
              (this.funnel.ctag.includes("i_") ||
                this.funnel.ctag.includes("_i") ||
                "1" === f.getParameterByName("iFloadTo", "0")) &&
                ((this.components.tyFolder = a.TyFolders.IFRAME_CLOSER),
                (this.components.retry = a.Retries.REAL_LOBIBOX_EXIT));
        }
      }
      customizeFunnelForFF() {
        switch (this.funnel.vertical) {
          case s.Gnums.MUSIC:
            (this.components.stepsSpinnerFolder = "1"),
              this.funnel.lp.includes("55") ||
                (this.components.stepsBarFolder = a.StepBars.TOP_BAR),
              (this.funnel.lp.includes("34") ||
                this.funnel.lp.includes("55") ||
                this.funnel.lp.includes("59") ||
                this.funnel.lp.includes("60")) &&
                (this.components.stepsBarFolder = a.StepBars.NONE);
            break;
          case s.Gnums.MOVIES:
            (this.components.stepsSpinnerFolder = "1"),
              this.funnel.lp.includes("34") ||
                this.funnel.lp.includes("55") ||
                (this.components.stepsBarFolder = a.StepBars.TOP_BAR);
            break;
          case s.Gnums.GAMES:
            break;
          case s.Gnums.PRIVATE:
            "string" == typeof this.extras.dkw &&
              this.extras.dkw.length > 0 &&
              "string" == typeof this.extras.aln &&
              this.extras.aln.length > 0 &&
              this.funnel.addTag(this.extras.aln);
            break;
          case s.Gnums.TVSPORT:
            (this.components.stepsSpinnerFolder = "1"),
              this.funnel.lp.includes("53") ||
                (this.components.stepsBarFolder = a.StepBars.TOP_BAR);
            break;
          case s.Gnums.PDF:
            (this.components.stepsBarFolder = a.StepBars.NONE),
              (this.components.stepsSpinnerFolder = "0"),
              (this.components.buttonEffectFolder = a.ButtonEffects.BREATHE),
              "8254" === this.funnel.cid && this.funnel.addTag("tid143v29");
        }
      }
      replaceData(e, t) {
        return (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = e.replace(
          /@PATH@/g,
          t.path
        )).replace(
          /@EXT_NAME@/g,
          `<span class="ph_name">${this.product.extName}</span>`
        )).replace(
          /@BRAND@/g,
          `<span class="ph_brand">${this.product.brand}</span>`
        )).replace(/@BRAND-FILE@/g, this.product.brand.toLowerCase())).replace(
          /@PRIVACY@/g,
          this.product.privacy
        )).replace(/@TERMS@/g, this.product.terms)).replace(
          /@HELP@/g,
          this.product.help
        )).replace(/@CONTACT@/g, this.product.contact)).replace(
          /@BROWSER@/g,
          `${this.request.browser.browserName}`
        )).replace(/@PLATFORM@/g, this.request.os)).replace(
          /@STEP@/g,
          `<span class="ph_step">${this.package.step + 1}</span>`
        )).replace(
          /@STEPS@/g,
          `<span class="ph_steps">${this.package.products.length}</span>`
        )).replace(
          /@DKW@/g,
          `<span class="ph_dkw">${this.extras.dkw || ""}</span>`
        )).replace(
          /@VERTICAL@/g,
          `<span class="ph_vertical">${this.product.vertical}</span>`
        )).replace(/@REPORT@/g, this.getReportUrl()));
      }
      updateTexts() {
        this.product &&
          this._package &&
          ($(".ph_name").html(this.product.extName),
          $(".ph_brand").html(this.product.brand),
          $(".ph_vertical").html(this.product.vertical),
          $(".ph_step").html(this.package.step + 1),
          $(".ph_steps").html(this.package.products.length),
          $(".ph_terms").attr("href", `//${this.product.terms}`),
          $(".ph_privacy").attr("href", `//${this.product.privacy}`),
          $(".ph_contact").attr("href", `//${this.product.contact}`),
          $(".ph_help").attr("href", `//${this.product.help}`),
          $(".ph_report").attr("href", `//${this.getReportUrl()}`),
          (window.document.title = this.product.title),
          f.writeCookies(
            this.funnel,
            this.product,
            this.components,
            this.extras
          ),
          trigger("onUpdateTexts"));
      }
      isDone() {
        if (this.package) {
          let e = this.package.step >= this.package.products.length - 1;
          if (!e)
            if (
              null !== this.funnel.test &&
              ["tid374ds3", "tid374ds4"].includes(this.funnel.test.group) &&
              null !== this.package.alternateDS
            )
              ++this._package.step,
                (this.package.currentProduct = this.package.alternateDS);
            else if (
              this.product.isInstalled ||
              null === this.package.alternateDS
            ) {
              let e = this.lookForRapist();
              ++this._package.step, "string" == typeof e && this.rapeMe(e);
            } else
              ++this._package.step,
                (this.package.currentProduct = this.package.alternateDS);
          return e;
        }
        return !0;
      }
      lookForRapist() {
        return this.funnel.vertical === s.Gnums.PDF &&
          this.product.isInstalled &&
          "string" == typeof this.product.endpointUrl &&
          this.product.endpointUrl.length > 0
          ? `${this.product.endpointUrl}/?yid=${
              this.product.yid
            }&open=convert-pdf-tab`
          : null;
      }
      rapeMe(e) {
        this.product.endpointUrl = e;
      }
      getReportUrl() {
        return this.package
          ? `survey.zohopublic.com/zs/TEB0kG?vertical=${
              this.product.vertical
            }&cid=${this.funnel.cid}&clickid=${this.funnel.clickid}&id=${
              this.product.extId
            }&product=${this.product.extName}&lp=${this.funnel.lp}`
          : "www.iwanttoberecycled.org/";
      }
      finish() {
        if (this.package) {
          let e = this.package.tyUrl;
          if (
            (void 0 === e &&
              (e = `/wim/ty/index.php?vert=${this.product.vertical}`),
            "string" == typeof this.extras.dkw && this.extras.dkw.length > 0
              ? (e =
                  this.product.isInstalled &&
                  "string" == typeof this.product.endpointUrl &&
                  this.product.endpointUrl.length > 0
                    ? this.product.endpointUrl
                    : `https://www.google.com/search?btnI=745&q=${
                        this.extras.dkw.split(".")[0]
                      }`)
              : this.funnel.lp.includes("29") &&
                "string" == typeof this.product.endpointUrl &&
                this.product.endpointUrl.length > 0
              ? (e = this.product.endpointUrl)
              : e.includes("gsafe") &&
                this.funnel.gnum !== s.Gnums.SAFE &&
                (e = e.replace("gsafe", this.product.vertical)),
            this.funnel.installedCounter === this.package.products.length &&
              (this.funnel.offeredSomething
                ? trigger("onFinishedSomethingOffered")
                : trigger("onFinishedNothingOffered")),
            trigger("onFinished"),
            "0" === this.components.tyFolder)
          )
            window.location.href = e;
          else {
            incStep(), "function" == typeof updateSteps && updateSteps();
            let t =
              '<iframe id="ty-container-iframe" src="' +
              e +
              '" frameborder="0" allowtransparency="true" style="position: absolute; width: 0px; height: 0px; z-index: 0;"></iframe>';
            $("#lp-container").hide(),
              $("#flows-container").hide(),
              $("#ty-container")
                .append(t)
                .show(),
              trigger("onTyReady");
          }
        } else
          "0" === f.getParameterByName("iFloadTo", "0") &&
            (window.location.href = "http://www.iwanttoberecycled.org/");
      }
      get package() {
        return this._package || new _();
      }
      get extras() {
        return this._extras || new v();
      }
      get funnel() {
        return this._funnel || new s();
      }
      get translation() {
        return this._translation || new F();
      }
      get audio() {
        return this._audio || new E();
      }
      get request() {
        return this._request || new y();
      }
      get components() {
        return this._components || new a();
      }
      get product() {
        return this.package.currentProduct || new o();
      }
      get eventsManager() {
        return this._eventsManager || new T();
      }
      get reporter() {
        return this._reporter || new N();
      }
    }();
    (window.registerInstallBtn = !0),
      (window.doHistBack = !0),
      $(() => {
        screen.width - window.outerWidth > 0 &&
          $("body").addClass("notmaximized");
        let e = !1;
        try {
          P.reporter.init(P.product, P.package.step);
        } catch (t) {
          e = !0;
        }
        P.init(),
          e && P.reporter.init(P.product, P.package.step),
          "1" === f.getParameterByName("iFloadTo", "0") &&
            (addListener({
              onGrecaptchaReady: () => {
                $(".grecaptcha-badge").hide();
              }
            }),
            $(
              "#stepsbar-container, #lp-container, #info-container, .grecaptcha-badge"
            ).hide(),
            $("#if-loadto-container").show(),
            $("#if-loadto-container").click(function() {
              $("#if-loadto-container").hide(),
                $(
                  "#stepsbar-container, #info-container, .grecaptcha-badge"
                ).show(),
                onClick();
            }));
      }),
      (window.setLang = e => {
        P.translation.lang = e;
      }),
      (window.translatePage = () => {
        P.translation.translatePage();
      }),
      (window.getParameterByName = (e, t) => f.getParameterByName(e, t)),
      (window.addListener = e => P.eventsManager.addListener(e)),
      (window.removeListener = e => {
        P.eventsManager.removeListener(e);
      }),
      (window.trigger = e => {
        P.eventsManager.trigger(e);
      }),
      (window.onLpReady = () => {
        f
          .getRcp()
          .then(e => {
            !0 === P._privateCaptcha &&
              0 === P.package.step &&
              P.reporter.firePrivatePixel("l1", P.funnel.clickid, e.toString());
          })
          .catch(e => {
            console.log("rcp " + e);
          }),
          P.eventsManager.trigger("onLpReady");
      }),
      (window.onPlayerPlay = () => {
        P.reporter.report("PlayerPlay");
      }),
      (window.onPlayerFullScreen = () => {
        P.reporter.report("PlayerFullScreen");
      }),
      (window.onPlayerInstallBtn = () => {
        P.reporter.report("PlayerInstallBtn");
      }),
      (window.onFlowLpReady = () => {
        P.reporter.report("FlowLpReady");
      }),
      (window.onFlowNoThanks = () => {
        P.reporter.report("FlowNoThanks");
      }),
      (window.onFlowTryAgain = () => {
        P.reporter.report("FlowTryAgain");
      }),
      (window.browserName = () => P.request.browser.browserName),
      (window.writeCookies = (e, t, i, s) => f.writeCookies(e, t, i, s)),
      (window.onClick = () => {
        P.updateRCPTest(),
          P.eventsManager.trigger("onClick"),
          P.reporter.report(N.Actions.CLICK),
          showHelp(P.product.extId, P.request.lang, P.product.chromeStoreUrl);
      }),
      (window.replaceData = (e, t) => P.replaceData(e, t)),
      (window.getStepsObject = () => ({
        currentStep: P.package.step,
        totalSteps: P.package.products.length
      })),
      (window.getGoogleTranslateParams = () => ({
        autoDetect: !1,
        pageLanguage: "en",
        includedLanguages: "fr"
      })),
      (window.getTestUrl = () => P.reporter.testUrl),
      (window.report = e => {
        P.reporter.report(e);
      }),
      (window.incStep = () => {
        P.package.step++;
      }),
      (window.getOfferManager = () => P),
      (window.getProduct = () => P.product),
      (window.getRequest = () => P.request),
      (window.onExitComponentResult = e => {
        "click" === e
          ? (onClick(),
            P.reporter.report(N.Actions.EXIT_CLICK, { ctag: P.funnel.ctag }))
          : "dismiss" === e
          ? P.reporter.report(N.Actions.EXIT_DISMISS, { ctag: P.funnel.ctag })
          : "load" === e &&
            P.reporter.report(N.Actions.EXIT_LOAD, { ctag: P.funnel.ctag });
      }),
      (window.onRetryComponentResult = e => {
        "cancel" === e
          ? ($(".retry-container").removeClass("isActive"),
            P.reporter.report(N.Actions.RETRY_CANCEL, { ctag: P.funnel.ctag }),
            onCancel())
          : "retry" === e
          ? (onClick(),
            P.reporter.report(N.Actions.RETRY_CLICK, { ctag: P.funnel.ctag }))
          : "dismiss" === e
          ? P.reporter.report(N.Actions.RETRY_DISMISS, { ctag: P.funnel.ctag })
          : "load" === e &&
            P.reporter.report(N.Actions.RETRY_LOAD, { ctag: P.funnel.ctag });
      }),
      (window.onCancel = e => {
        if ((trigger("onCancel"), delayFinish)) {
          let e = 0,
            t = setInterval(function() {
              (!1 === delayFinish || (++e > 10 && !delayFinishDontTimeout)) &&
                (doIsDone(!1), clearInterval(t));
            }, 1e3);
        } else doIsDone(!1);
      }),
      (window.doIsDone = (e = !1) => {
        let t = 1;
        if (
          ("string" == typeof msg && (P.reporter.report(msg), (t = 500)),
          P.isDone())
        )
          setTimeout(P.finish, t);
        else {
          P.checkStepInstalled();
          let t = 10;
          "0" !== P.components.stepsSpinnerFolder &&
            (showStepsSpinner(), (t = 2e3)),
            setTimeout(() => {
              e && onFlowResult(!0),
                P.reporter.init(P.product, P.package.step),
                P.reporter.report(N.Actions.PAGELOAD),
                (O = !1),
                P.updateTexts(),
                onLpReady(),
                "0" !== P.components.stepsBarFolder &&
                  "function" == typeof updateSteps &&
                  updateSteps();
            }, t);
        }
      }),
      (window.onWinBlur = (e, t) => {
        P.components.flow.isInPage &&
          (P.product.isInstalled
            ? (onFlowResult(!0), onInstalled())
            : P.product.checkIfInstalled().then(function(e) {
                onFlowResult(e), e && onInstalled();
              }));
      });
    let O = !1;
    (window.onInstalled = () => {
      if (($(".retry-container").removeClass("isActive"), !O)) {
        O = !0;
        let e = !1;
        if (
          (!0 === P._privateCaptcha &&
            ((e = !0),
            delayFinishLoader && $("#loader-container").show(),
            f
              .getRcp()
              .then(t => {
                0 === P.package.step &&
                  (P.reporter.firePrivatePixel(
                    "l2",
                    P.funnel.clickid,
                    t.toString()
                  ),
                  setTimeout(function() {
                    e = !1;
                  }, 500));
              })
              .catch(t => {
                console.log("rcp " + t),
                  setTimeout(function() {
                    e = !1;
                  }, 1);
              })),
          incInstalledCounter(),
          P.eventsManager.trigger("onInstalled"),
          P.reporter.report(N.Actions.INSTALL),
          delayFinish)
        ) {
          let e = 0,
            t = setInterval(function() {
              (!1 === delayFinish || (++e > 10 && !delayFinishDontTimeout)) &&
                (doIsDone(!1), clearInterval(t));
            }, 1e3);
        } else doIsDone(!1);
      }
    }),
      (window.checkIfInstalled = e => {
        P.product
          ? P.product.checkIfInstalled().then(t => {
              t && (onFlowResult(!0), clearInterval(e), onInstalled());
            })
          : clearInterval(e);
      }),
      (window.checkIfDone = () => {
        return P.package.step >= P.package.products.length;
      }),
      (window.getLP = () => P.funnel.lp),
      (window.getOS = () => P.request.os),
      (window.getBrowser = () => P.request.browser),
      (window.incInstalledCounter = () => {
        P.funnel.installedCounter = P.funnel.installedCounter + 1;
      }),
      (window.calcPopupWinSizeAndPos = () => {
        let e = document
            .getElementById("chromeStorePlaceHolder")
            .getBoundingClientRect(),
          t = { Mac: -50, Windows: -60 },
          i = { Mac: 0, Windows: -7 },
          s = { Firefox: -7 },
          n = { Firefox: 8 },
          r = { Firefox: 0 },
          o = { Firefox: 0 },
          a = void 0 !== t[getOS()] ? t[getOS()] : 0,
          l = void 0 !== i[getOS()] ? i[getOS()] : 0;
        l +=
          void 0 !== n[getBrowser().browserName]
            ? n[getBrowser().browserName]
            : 0;
        let c =
            void 0 !== s[getBrowser().browserName]
              ? s[getBrowser().browserName]
              : 0,
          p =
            void 0 !== r[getBrowser().browserName]
              ? r[getBrowser().browserName]
              : 0;
        return (
          (a +=
            void 0 !== o[getBrowser().browserName]
              ? o[getBrowser().browserName]
              : 0),
          {
            width: e.width + p,
            height: Math.min(
              e.height + a + window.screen.availTop,
              window.innerHeight
            ),
            left: window.screenX + e.left + l,
            top:
              window.screenY +
              e.top +
              c +
              (window.outerHeight - window.innerHeight)
          }
        );
      }),
      (window.openPopupWindow = e => {
        let t = e.url,
          i = e.top || 0,
          s = e.left || 0,
          n = e.width || 400,
          r = e.height || 300,
          o = e.location || "no",
          a = e.titleBar || "no",
          l = e.toolbar || "no",
          c = e.scrollbars || "no",
          p = e.resizable || "no",
          d = e.redirectUrl || null;
        if (
          (document.body.classList.contains("notmaximized") &&
            ((s += 5), (i -= 8)),
          ((n > 0 && n < 200) || (r > 0 && r < 200)) &&
            f.error(
              "main:openPopupWindow() - suspicious window size",
              !1,
              `${n}/${r}`
            ),
          t)
        ) {
          const e =
            "location=" +
            o +
            ",titlebar=" +
            a +
            ",toolbar=" +
            l +
            ",scrollbars=" +
            c +
            ",resizable=" +
            p +
            ",screenY=" +
            i +
            ",screenX=" +
            s +
            ",width=" +
            n +
            ",height=" +
            r;
          (window.myWindow = window.open(
            t,
            `${P.extras.guid}${P.product.yid}`,
            e
          )),
            null === window.myWindow &&
              f.error("main:openPopupWindows() - window.myWindow is null"),
            d &&
              setTimeout(() => {
                window.location.href = d;
              }, 1e3);
        } else f.error("main:openPopupWindows() - no url");
      }),
      (window.isInstalled = P.product.isInstalled);
  }
]);
