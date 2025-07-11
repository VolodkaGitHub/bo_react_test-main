/* eslint-disable */
function t(e, n) {
  const i = { ...e };
  for (const o in n)
    "object" != typeof e[o] || null === e[o] || Array.isArray(e[o])
      ? void 0 !== n[o] && (i[o] = n[o])
      : (i[o] = t(e[o], n[o]));
  return i;
}
const e = {
    width: 800,
    height: 500,
    interval: "1D",
    timezone: "Etc/UTC",
    container: "",
    library_path: "",
    locale: "en",
    widgetbar: {
      details: !1,
      watchlist: !1,
      news: !1,
      datawindow: !1,
      watchlist_settings: { default_symbols: [] },
    },
    overrides: { "mainSeriesProperties.showCountdown": !1 },
    studies_overrides: {},
    trading_customization: { position: {}, order: {} },
    brokerConfig: { configFlags: {} },
    fullscreen: !1,
    autosize: !1,
    disabled_features: [],
    enabled_features: [],
    debug: !1,
    logo: {},
    time_frames: [
      { text: "5y", resolution: "1W" },
      { text: "1y", resolution: "1W" },
      { text: "6m", resolution: "120" },
      { text: "3m", resolution: "60" },
      { text: "1m", resolution: "30" },
      { text: "5d", resolution: "5" },
      { text: "1d", resolution: "1" },
    ],
    client_id: "0",
    user_id: "0",
    charts_storage_api_version: "1.0",
    favorites: {
      intervals: [],
      chartTypes: [],
      indicators: [],
      drawingTools: [],
    },
  },
  n = JSON.parse(
    '[{"iso":"ar","dir":"rtl","language":"ar"},{"iso":"pt","dir":"ltr","language":"pt"},{"iso":"ca","dir":"ltr","language":"ca_ES"},{"iso":"cs","dir":"ltr","language":"cs"},{"iso":"de","dir":"ltr","language":"de"},{"iso":"en","dir":"ltr","language":"en"},{"iso":"es","dir":"ltr","language":"es"},{"iso":"fa","dir":"rtl","language":"fa"},{"iso":"fr","dir":"ltr","language":"fr"},{"iso":"he","dir":"rtl","language":"he_IL"},{"iso":"hu","dir":"ltr","language":"hu_HU"},{"iso":"id","dir":"ltr","language":"id_ID"},{"iso":"en","dir":"ltr","language":"en"},{"iso":"it","dir":"ltr","language":"it"},{"iso":"ja","dir":"ltr","language":"ja"},{"iso":"ko","dir":"ltr","language":"ko"},{"iso":"ms","dir":"ltr","language":"ms_MY"},{"iso":"pl","dir":"ltr","language":"pl"},{"iso":"ru","dir":"ltr","language":"ru"},{"iso":"sv","dir":"ltr","language":"sv"},{"iso":"th","dir":"ltr","language":"th"},{"iso":"tr","dir":"ltr","language":"tr"},{"iso":"vi","dir":"ltr","language":"vi"},{"iso":"zh-Hans","dir":"ltr","language":"zh"},{"iso":"zh-Hant","dir":"ltr","language":"zh_TW"},{"iso":"el","dir":"ltr","language":"el"},{"iso":"nl","dir":"ltr","language":"nl_NL"},{"iso":"ro","dir":"ltr","language":"ro"}]'
  );
let i = !1;
function o() {
  return "CL v26.003 (internal id e793d706 @ 2023-10-05T20:27:44.510Z)";
}
const s = class {
  constructor(n) {
    var o, s;
    if (
      ((this._id = `tradingview_${((1048576 * (1 + Math.random())) | 0)
        .toString(16)
        .substring(1)}`),
      (this._ready = !1),
      (this._readyHandlers = []),
      (this._onWindowResize = this._autoResizeChart.bind(this)),
      !n.datafeed)
    )
      throw new Error("Datafeed is not defined");
    (null === (o = n.overrides) || void 0 === o
      ? void 0
      : o["mainSeriesProperties.priceAxisProperties.lockScale"]) &&
      (console.warn(
        "mainSeriesProperties.priceAxisProperties.lockScale can not be set to true within the widget constructor"
      ),
      delete n.overrides["mainSeriesProperties.priceAxisProperties.lockScale"]),
      (this._options = t(e, n));
    "dark" ===
      (null !== (s = this._options.theme) && void 0 !== s
        ? s
        : "light"
      ).toLowerCase() &&
      void 0 === this._options.loading_screen &&
      (this._options.loading_screen = { backgroundColor: "#131722" }),
      this._options.debug &&
        (i ||
          ((i = !0),
          console.log(
            "Using CL v26.003 (internal id e793d706 @ 2023-10-05T20:27:44.510Z)"
          ))),
      this._create();
  }
  setDebugMode(t) {
    this._innerAPI().setDebugMode(t);
  }
  onChartReady(t) {
    this._ready ? t.call(this) : this._readyHandlers.push(t);
  }
  headerReady() {
    return this._innerWindowLoaded.then(() =>
      this._innerWindow().headerReady()
    );
  }
  onGrayedObjectClicked(t) {
    this._doWhenInnerApiLoaded((e) => {
      e.onGrayedObjectClicked(t);
    });
  }
  onShortcut(t, e) {
    this._doWhenInnerWindowLoaded((n) => {
      n.createShortcutAction(t, e);
    });
  }
  subscribe(t, e) {
    this._doWhenInnerApiLoaded((n) => {
      n.subscribe(t, e);
    });
  }
  unsubscribe(t, e) {
    this._doWhenInnerApiLoaded((n) => {
      n.unsubscribe(t, e);
    });
  }
  chart(t) {
    return this._innerAPI().chart(t);
  }
  getLanguage() {
    return this._options.locale;
  }
  setSymbol(t, e, n) {
    this._innerAPI().changeSymbol(t, e, n);
  }
  remove() {
    window.removeEventListener("resize", this._onWindowResize),
      this._readyHandlers.splice(0, this._readyHandlers.length),
      delete window[this._id],
      this._iFrame.parentNode &&
        this._iFrame.parentNode.removeChild(this._iFrame);
  }
  closePopupsAndDialogs() {
    this._doWhenInnerApiLoaded((t) => {
      t.closePopupsAndDialogs();
    });
  }
  selectLineTool(t, e) {
    this._innerAPI().selectLineTool(t, e);
  }
  selectedLineTool() {
    return this._innerAPI().selectedLineTool();
  }
  save(t) {
    this._innerAPI().saveChart(t);
  }
  load(t, e) {
    this._innerAPI().loadChart({ json: t, extendedData: e });
  }
  getSavedCharts(t) {
    this._innerAPI().getSavedCharts(t);
  }
  loadChartFromServer(t) {
    this._innerAPI().loadChartFromServer(t);
  }
  saveChartToServer(t, e, n) {
    this._innerAPI().saveChartToServer(t, e, n);
  }
  removeChartFromServer(t, e) {
    this._innerAPI().removeChartFromServer(t, e);
  }
  onContextMenu(t) {
    this._doWhenInnerApiLoaded((e) => {
      e.onContextMenu(t);
    });
  }
  createButton(t) {
    return this._innerWindow().createButton(t);
  }
  createDropdown(t) {
    return this._innerWindow().createDropdown(t);
  }
  showNoticeDialog(t) {
    this._doWhenInnerApiLoaded((e) => {
      e.showNoticeDialog(t);
    });
  }
  showConfirmDialog(t) {
    this._doWhenInnerApiLoaded((e) => {
      e.showConfirmDialog(t);
    });
  }
  showLoadChartDialog() {
    this._innerAPI().showLoadChartDialog();
  }
  showSaveAsChartDialog() {
    this._innerAPI().showSaveAsChartDialog();
  }
  symbolInterval() {
    return this._innerAPI().getSymbolInterval();
  }
  mainSeriesPriceFormatter() {
    return this._innerAPI().mainSeriesPriceFormatter();
  }
  getIntervals() {
    return this._innerAPI().getIntervals();
  }
  getStudiesList() {
    return this._innerAPI().getStudiesList();
  }
  getStudyInputs(t) {
    return this._innerAPI().getStudyInputs(t);
  }
  getStudyStyles(t) {
    return this._innerAPI().getStudyStyles(t);
  }
  addCustomCSSFile(t) {
    this._innerWindow().addCustomCSSFile(t);
  }
  applyOverrides(e) {
    (this._options = t(this._options, { overrides: e })),
      this._doWhenInnerWindowLoaded((t) => {
        t.applyOverrides(e);
      });
  }
  applyStudiesOverrides(t) {
    this._doWhenInnerWindowLoaded((e) => {
      e.applyStudiesOverrides(t);
    });
  }
  watchList() {
    return this._innerAPI().watchlist();
  }
  news() {
    return this._innerAPI().news();
  }
  widgetbar() {
    return this._innerAPI().widgetbar();
  }
  activeChart() {
    return this._innerAPI().activeChart();
  }
  activeChartIndex() {
    return this._innerAPI().activeChartIndex();
  }
  setActiveChart(t) {
    return this._innerAPI().setActiveChart(t);
  }
  chartsCount() {
    return this._innerAPI().chartsCount();
  }
  layout() {
    return this._innerAPI().layout();
  }
  setLayout(t) {
    this._innerAPI().setLayout(t);
  }
  layoutName() {
    return this._innerAPI().layoutName();
  }
  changeTheme(t, e) {
    return this._innerWindow().changeTheme(t, e);
  }
  getTheme() {
    return this._innerWindow().getTheme();
  }
  takeScreenshot() {
    this._doWhenInnerApiLoaded((t) => {
      t.takeScreenshot();
    });
  }
  lockAllDrawingTools() {
    return this._innerAPI().lockAllDrawingTools();
  }
  hideAllDrawingTools() {
    return this._innerAPI().hideAllDrawingTools();
  }
  drawOnAllCharts(t) {
    this._innerAPI().drawOnAllCharts(t);
  }
  magnetEnabled() {
    return this._innerAPI().magnetEnabled();
  }
  magnetMode() {
    return this._innerAPI().magnetMode();
  }
  undoRedoState() {
    return this._innerAPI().undoRedoState();
  }
  setIntervalLinkingEnabled(t) {
    this._innerAPI().setIntervalLinkingEnabled(t);
  }
  setDateRangeLinkingEnabled(t) {
    this._innerAPI().setDateRangeLinkingEnabled(t);
  }
  setTimeFrame(t) {
    this._innerAPI().setTimeFrame(t);
  }
  symbolSync() {
    return this._innerAPI().symbolSync();
  }
  intervalSync() {
    return this._innerAPI().intervalSync();
  }
  crosshairSync() {
    return this._innerAPI().crosshairSync();
  }
  timeSync() {
    return this._innerAPI().timeSync();
  }
  dateRangeSync() {
    return this._innerAPI().dateRangeSync();
  }
  setFeatureEnabled(t, e) {
    this._innerAPI().setFeatureEnabled(t, e);
  }
  getAllFeatures() {
    return this._innerWindow().getAllFeatures();
  }
  clearUndoHistory() {
    return this._innerAPI().clearUndoHistory();
  }
  undo() {
    return this._innerAPI().undo();
  }
  redo() {
    return this._innerAPI().redo();
  }
  startFullscreen() {
    this._innerAPI().startFullscreen();
  }
  exitFullscreen() {
    this._innerAPI().exitFullscreen();
  }
  takeClientScreenshot(t) {
    return this._innerAPI().takeClientScreenshot(t);
  }
  navigationButtonsVisibility() {
    return this._innerWindow().getNavigationButtonsVisibility();
  }
  paneButtonsVisibility() {
    return this._innerWindow().getPaneButtonsVisibility();
  }
  dateFormat() {
    return this._innerWindow().getDateFormat();
  }
  timeHoursFormat() {
    return this._innerWindow().getTimeHoursFormat();
  }
  currencyAndUnitVisibility() {
    return this._innerWindow().getCurrencyAndUnitVisibility();
  }
  supportedChartTypes() {
    return this._innerAPI().supportedChartTypes();
  }
  watermark() {
    return this._innerAPI().watermark();
  }
  customSymbolStatus() {
    return this._innerWindow().customSymbolStatus();
  }
  setCSSCustomProperty(t, e) {
    if (!1 === t.startsWith("--"))
      throw new Error("customPropertyName should begin with a double hyphen");
    this._innerWindow().document.body.style.setProperty(t, e);
  }
  getCSSCustomPropertyValue(t) {
    if (!1 === t.startsWith("--"))
      throw new Error("customPropertyName should begin with a double hyphen");
    const e = this._innerWindow().document.body,
      n = e.style.getPropertyValue(t);
    if (n) return n;
    return getComputedStyle(e).getPropertyValue(t);
  }
  linking() {
    return this._innerAPI().linking;
  }
  _innerAPI() {
    return this._innerWindow().tradingViewApi;
  }
  _innerWindow() {
    return this._iFrame.contentWindow;
  }
  _doWhenInnerWindowLoaded(t) {
    this._ready
      ? t(this._innerWindow())
      : this._innerWindowLoaded.then(() => {
          t(this._innerWindow());
        });
  }
  _doWhenInnerApiLoaded(t) {
    this._doWhenInnerWindowLoaded((e) => {
      e.doWhenApiIsReady(() => t(this._innerAPI()));
    });
  }
  _autoResizeChart() {
    this._options.fullscreen &&
      ((this._iFrame.style.height = window.innerHeight + "px"),
      r &&
        setTimeout(() => {
          this._iFrame.style.height = window.innerHeight + "px";
        }, 30));
  }
  _create() {
    var t, e;
    const n =
        null !==
          (e =
            null === (t = this._options.enabled_features) || void 0 === t
              ? void 0
              : t.includes("iframe_loading_compatibility_mode")) &&
        void 0 !== e &&
        e,
      [i, o] = this._render(!n),
      s = this._options.container,
      r = "string" == typeof s ? document.getElementById(s) : s;
    if (null === r)
      throw new Error(`There is no such element - #${this._options.container}`);
    (r.innerHTML = i), (this._iFrame = r.querySelector(`#${this._id}`));
    const a = this._iFrame;
    n &&
      (a.contentWindow
        ? (a.contentWindow.document.open(),
          a.contentWindow.document.write(o),
          a.contentWindow.document.close())
        : console.warn(
            "Unable to locate contentWindow for the created iframe. Please try disabling the `iframe_loading_compatibility_mode` featureset."
          )),
      (this._options.autosize || this._options.fullscreen) &&
        ((a.style.width = "100%"),
        this._options.fullscreen || (a.style.height = "100%")),
      window.addEventListener("resize", this._onWindowResize),
      this._onWindowResize(),
      (this._innerWindowLoaded = new Promise((t) => {
        const e = () => {
          a.removeEventListener("load", e, !1), t();
        };
        a.addEventListener("load", e, !1);
      })),
      this._innerWindowLoaded.then(() => {
        try {
          this._innerWindow().widgetReady(() => {
            this._ready = !0;
            for (const t of this._readyHandlers)
              try {
                t.call(this);
              } catch (t) {
                console.error(t);
              }
            this._innerWindow().initializationFinished();
          });
        } catch (t) {
          if (
            t instanceof Error &&
            /widgetReady is not a function/.test(t.message)
          )
            throw new Error(
              `There was an error when loading the library. Usually this error means the library failed to load its static files. Check that the library files are available at ${
                window.location.host
              }/${
                this._options.library_path || ""
              } or correct the library_path option.`
            );
        }
      });
  }
  _render(t) {
    const e = window;
    if (
      ((e[this._id] = {
        datafeed: this._options.datafeed,
        customFormatters:
          this._options.custom_formatters || this._options.customFormatters,
        brokerFactory:
          this._options.broker_factory || this._options.brokerFactory,
        overrides: this._options.overrides,
        studiesOverrides: this._options.studies_overrides,
        tradingCustomization: this._options.trading_customization,
        disabledFeatures: this._options.disabled_features,
        enabledFeatures: this._options.enabled_features,
        brokerConfig: this._options.broker_config || this._options.brokerConfig,
        restConfig: this._options.restConfig,
        favorites: this._options.favorites,
        logo: this._options.logo,
        numeric_formatting: this._options.numeric_formatting,
        rss_news_feed: this._options.rss_news_feed,
        rss_news_title: this._options.rss_news_title,
        newsProvider: this._options.news_provider,
        loadLastChart: this._options.load_last_chart,
        saveLoadAdapter: this._options.save_load_adapter,
        loading_screen: this._options.loading_screen,
        settingsAdapter: this._options.settings_adapter,
        getCustomIndicators: this._options.custom_indicators_getter,
        additionalSymbolInfoFields: this._options.additional_symbol_info_fields,
        headerWidgetButtonsMode: this._options.header_widget_buttons_mode,
        customTranslateFunction: this._options.custom_translate_function,
        symbolSearchComplete: this._options.symbol_search_complete,
        contextMenu: this._options.context_menu,
        settingsOverrides: this._options.settings_overrides,
        timeframe: this._options.timeframe,
        customTimezones: this._options.custom_timezones,
      }),
      this._options.saved_data)
    )
      (e[this._id].chartContent = { json: this._options.saved_data }),
        this._options.saved_data_meta_info &&
          (e[this._id].chartContentExtendedData =
            this._options.saved_data_meta_info);
    else if (!this._options.load_last_chart && !this._options.symbol)
      throw new Error(
        "Symbol is not defined: either 'symbol' or 'load_last_chart' option must be set"
      );
    if (
      (this._options.library_path &&
        !this._options.library_path.endsWith("/") &&
        console.warn(
          "library_path option should contain a trailing forward slash"
        ),
      this._options.locale)
    ) {
      const t = encodeURIComponent(this._options.locale);
      n.findIndex((e) => e.language === t) >= 0 ||
        (console.warn("locale isn't supported. Using default of `en`."),
        (this._options.locale = "en"));
    }
    const i = (function (t, e) {
      var i;
      const o = new URL(`${t || ""}`, location.href).href,
        s = JSON.parse(
          '["bundles/runtime.0809a655c13b333b6a76.js","bundles/__LANG__.5008.e5d7d914577969582fa4.js","bundles/3515.2f722d33cebe31a154b1.css","bundles/9401.4792ed983286dcafa79b.js","bundles/library.847f247511d3f9997d72.js"]'
        ),
        r = encodeURIComponent(e),
        a =
          null !== (i = n.find((t) => t.language === r)) && void 0 !== i
            ? i
            : { iso: "en", dir: "ltr" },
        d = `lang="${a.iso}" dir="${a.dir}"`,
        l = `\n${(function (t, e, n) {
          if (void 0 === t) return "";
          const i = [],
            o = [];
          for (const s of t)
            s.endsWith(".js")
              ? i.push(
                  `<script defer crossorigin="anonymous" src="${s.replace(
                    "__LANG__",
                    n
                  )}"><\/script>`
                )
              : s.endsWith(".css") &&
                o.push(
                  `<link type="text/css" href="${
                    e ? s.replace(/\.css$/i, ".rtl.css") : s
                  }" rel="stylesheet"/>`
                );
          return [...i, ...o].join("\n");
        })(s, "rtl" === a.dir, r)}\n`;
      return `<!DOCTYPE html><html ${
        (h = { bundles: l, localeLanguage: r, htmlAttrs: d, libraryPath: o })
          .htmlAttrs
      }><head><base href="${
        h.libraryPath
      }"><meta charset="utf-8"><script>window===window.parent&&(location.href="about:blank")<\/script> ${
        h.bundles
      } </head><body class="chart-page unselectable on-widget"><div class="loading-indicator" id="loading-indicator"></div><script>var JSServer={},__initialEnabledFeaturesets=["charting_library"]<\/script><script>(function() {\n\t\twindow.urlParams = (function () {\n\t\t\tvar match,\n\t\t\t\tpl\t = /\\+/g,  // Regex for replacing addition symbol with a space\n\t\t\t\tsearch = /([^&=]+)=?([^&]*)/g,\n\t\t\t\tdecode = function (s) { return decodeURIComponent(s.replace(pl, ' ')).replace(/<\\/?[^>]+(>|$)/g, ''); },\n\t\t\t\tquery = function() {\n\t\t\t\t\t// We don't use hash on the url because: safari 13 throws an error if you attempt this\n\t\t\t\t\t// on a blob, and safari 14 will strip hash from blob urls.\n\t\t\t\t\tif (frameElement && frameElement.dataset.widgetOptions) {\n\t\t\t\t\t\treturn frameElement.dataset.widgetOptions;\n\t\t\t\t\t} else {\n\t\t\t\t\t\tthrow "Unexpected use of this page";\n\t\t\t\t\t}\n\t\t\t\t}(),\n\t\t\t\tresult = {};\n\n\t\t\twhile (match = search.exec(query)) {\n\t\t\t\tresult[decode(match[1])] = decode(match[2]);\n\t\t\t}\n\n\t\t\tvar additionalSettingsObject = window.parent[result.uid];\n\n\t\t\tvar customObjectNames = ['datafeed', 'customFormatters', 'brokerFactory', 'save_load_adapter', 'customTranslateFunction', 'contextMenu'];\n\n\t\t\tfor (var p in additionalSettingsObject) {\n\t\t\t\tif (customObjectNames.indexOf(p) === -1) {\n\t\t\t\t\tresult[p] = JSON.stringify(additionalSettingsObject[p]);\n\t\t\t\t}\n\t\t\t}\n\n\t\t\treturn result;\n\t\t})();\n\n\t\twindow.locale = urlParams.locale;\n\t\twindow.language = urlParams.locale; // a very big attention needed here\n\t\twindow.customTranslateFunction = window.parent[urlParams.uid].customTranslateFunction;\n\n\t\twindow.addCustomCSSFile = function(href) {\n\t\t\tvar link = document.createElement('link');\n\t\t\tlink.setAttribute('type', 'text/css');\n\t\t\tlink.setAttribute('rel', 'stylesheet');\n\t\t\tlink.setAttribute('href', href);\n\t\t\tlink.setAttribute('cross-origin', 'anonymous');\n\n\t\t\twindow.loadedCustomCss = new Promise((resolve) => {\n\t\t\t\tlink.onload = resolve;\n\t\t\t\tlink.onerror = resolve;\n\t\t\t});\n\t\t\tdocument.body.appendChild(link);\n\t\t};\n\n\t\twindow.loadedCustomCss = Promise.resolve();\n\t\tif (!!urlParams.customCSS) {\n\t\t\twindow.addCustomCSSFile(urlParams.customCSS);\n\t\t}\n\n\t\tvar loadingScreenParams = {};\n\n\t\tif (typeof urlParams.loading_screen === 'string') {\n\t\t\ttry {\n\t\t\t\tloadingScreenParams = JSON.parse(urlParams.loading_screen);\n\t\t\t} catch(e) {}\n\t\t}\n\n\t\tvar loadingIndicatorElement = document.getElementById('loading-indicator');\n\n\t\tif (loadingScreenParams.backgroundColor) {\n\t\t\tloadingIndicatorElement.style = 'background-color: ' + loadingScreenParams.backgroundColor;\n\t\t}\n\n\t\t!function(){"use strict";var t,e=new WeakMap;!function(t){t[t.Element=1]="Element",t[t.Document=9]="Document"}(t||(t={}));var n={mini:"xsmall",xsmall:"xsmall",small:"small",medium:"medium",large:"large"};var i,s,o,r,l,c=(void 0===l&&(l=""),i='<div class="tv-spinner '.concat(l,'" role="progressbar"></div>'),o=function(n,i){var s,o;return s=null==i?document.documentElement:i.nodeType===t.Document?i.documentElement:i,e&&(o=e.get(s)),o||((o=s.ownerDocument.createRange()).selectNodeContents(s),e&&e.set(s,o)),o.createContextualFragment(n)}(i,s),null!==(r=o.firstElementChild)&&o.removeChild(r),r),a=function(){function t(t){this._shown=!1,this._el=c.cloneNode(!0),this.setSize(n[t||"large"])}return t.prototype.spin=function(t){return this._el.classList.add("tv-spinner--shown"),void 0===this._container&&(this._container=t,void 0!==t&&t.appendChild(this._el)),this._shown=!0,this},t.prototype.stop=function(t){return t&&void 0!==this._container&&this._container.removeChild(this._el),this._el&&this._el.classList.remove("tv-spinner--shown"),this._shown=!1,this},t.prototype.setStyle=function(t){var e=this;return Object.keys(t).forEach((function(n){var i=t[n];void 0!==i&&e._el.style.setProperty(n,i)})),this},t.prototype.style=function(){return this._el.style},t.prototype.setSize=function(t){var e=void 0!==t?"tv-spinner--size_".concat(t):"";return this._el.className="tv-spinner ".concat(e," ").concat(this._shown?"tv-spinner--shown":""),this},t.prototype.getEl=function(){return this._el},t.prototype.destroy=function(){this.stop(),delete this._el,delete this._container},t}();window.Spinner=a}();\n\n\n\t\tvar spinnerColor = (loadingScreenParams.foregroundColor) ? loadingScreenParams.foregroundColor : undefined;\n\n\t\tvar loadingSpinner = new Spinner('large').setStyle({\n\t\t\t'--tv-spinner-color': spinnerColor,\n\t\t\tzIndex: String(2e9),\n\t\t});\n\t\tloadingSpinner.getEl().classList.add('spinner');\n\t\tloadingSpinner.spin(loadingIndicatorElement);\n\t})();<\/script></body></html>`;
      var h;
    })(this._options.library_path || "", this._options.locale);
    let o = new URL("about:blank");
    if (t) {
      const t = new Blob([i], { type: "text/html" }),
        e = URL.createObjectURL(t);
      o = new URL(e);
    }
    const s =
      "symbol=" +
      encodeURIComponent(this._options.symbol || "") +
      "&interval=" +
      encodeURIComponent(this._options.interval) +
      (this._options.toolbar_bg
        ? "&toolbarbg=" +
          encodeURIComponent(this._options.toolbar_bg.replace("#", ""))
        : "") +
      (this._options.studies_access
        ? "&studiesAccess=" +
          encodeURIComponent(JSON.stringify(this._options.studies_access))
        : "") +
      "&widgetbar=" +
      encodeURIComponent(JSON.stringify(this._options.widgetbar)) +
      (this._options.drawings_access
        ? "&drawingsAccess=" +
          encodeURIComponent(JSON.stringify(this._options.drawings_access))
        : "") +
      "&timeFrames=" +
      encodeURIComponent(JSON.stringify(this._options.time_frames)) +
      "&locale=" +
      encodeURIComponent(this._options.locale) +
      "&uid=" +
      encodeURIComponent(this._id) +
      "&clientId=" +
      encodeURIComponent(String(this._options.client_id)) +
      "&userId=" +
      encodeURIComponent(String(this._options.user_id)) +
      (this._options.charts_storage_url
        ? "&chartsStorageUrl=" +
          encodeURIComponent(this._options.charts_storage_url)
        : "") +
      (this._options.charts_storage_api_version
        ? "&chartsStorageVer=" +
          encodeURIComponent(this._options.charts_storage_api_version)
        : "") +
      (this._options.custom_css_url
        ? "&customCSS=" + encodeURIComponent(this._options.custom_css_url)
        : "") +
      (this._options.custom_font_family
        ? "&customFontFamily=" +
          encodeURIComponent(this._options.custom_font_family)
        : "") +
      (this._options.auto_save_delay
        ? "&autoSaveDelay=" +
          encodeURIComponent(String(this._options.auto_save_delay))
        : "") +
      "&debug=" +
      encodeURIComponent(String(this._options.debug)) +
      (this._options.snapshot_url
        ? "&snapshotUrl=" + encodeURIComponent(this._options.snapshot_url)
        : "") +
      (this._options.timezone
        ? "&timezone=" + encodeURIComponent(this._options.timezone)
        : "") +
      (this._options.study_count_limit
        ? "&studyCountLimit=" +
          encodeURIComponent(String(this._options.study_count_limit))
        : "") +
      (this._options.symbol_search_request_delay
        ? "&ssreqdelay=" +
          encodeURIComponent(String(this._options.symbol_search_request_delay))
        : "") +
      (this._options.compare_symbols
        ? "&compareSymbols=" +
          encodeURIComponent(JSON.stringify(this._options.compare_symbols))
        : "") +
      (this._options.theme
        ? "&theme=" + encodeURIComponent(String(this._options.theme))
        : "") +
      (this._options.header_widget_buttons_mode
        ? "&header_widget_buttons_mode=" +
          encodeURIComponent(String(this._options.header_widget_buttons_mode))
        : "") +
      (this._options.time_scale
        ? "&time_scale=" +
          encodeURIComponent(JSON.stringify(this._options.time_scale))
        : "");
    return [
      `<iframe\n\t\tid="${this._id}" name="${this._id}" src="${
        o.href
      }" data-widget-options="${s}"\n\t\t${
        this._options.autosize || this._options.fullscreen
          ? ""
          : `width="${this._options.width}" height="${this._options.height}"`
      } title="Financial Chart" frameborder="0" allowTransparency="true" scrolling="no" allowfullscreen style="display:block;">\n\t</iframe>`,
      i,
    ];
  }
};
"undefined" != typeof window &&
  ((window.TradingView = window.TradingView || {}),
  (window.TradingView.version = o));
const r =
  !(
    "undefined" == typeof window ||
    !window.navigator ||
    !window.navigator.userAgent
  ) && window.navigator.userAgent.includes("CriOS");
export { o as version, s as widget };
/* eslint-enable */
