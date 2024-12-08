'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var data = require('@grafana/data');
var H = require('history');
var ui = require('@grafana/ui');
var lodash = require('lodash');
var React = require('react');
var faroWebSdk = require('@grafana/faro-web-sdk');
var rxjs = require('rxjs');
var operators = require('rxjs/operators');
var e2eSelectors = require('@grafana/e2e-selectors');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var H__namespace = /*#__PURE__*/_interopNamespace(H);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function isFetchError(e) {
  return typeof e === "object" && e !== null && "status" in e && "data" in e;
}
let singletonInstance$6;
const setBackendSrv = (instance) => {
  singletonInstance$6 = instance;
};
const getBackendSrv = () => singletonInstance$6;

let instance;
function setAngularLoader(v) {
  instance = v;
}
function getAngularLoader() {
  return instance;
}

let singletonInstance$5;
function setDataSourceSrv(instance) {
  singletonInstance$5 = instance;
}
function getDataSourceSrv() {
  return singletonInstance$5;
}

let singletonInstance$4;
function setLocationSrv(instance) {
  singletonInstance$4 = instance;
}
function getLocationSrv() {
  return singletonInstance$4;
}

var __defProp$9 = Object.defineProperty;
var __defNormalProp$9 = (obj, key, value) => key in obj ? __defProp$9(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$5 = (obj, key, value) => {
  __defNormalProp$9(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var EchoEventType = /* @__PURE__ */ ((EchoEventType2) => {
  EchoEventType2["Performance"] = "performance";
  EchoEventType2["MetaAnalytics"] = "meta-analytics";
  EchoEventType2["Pageview"] = "pageview";
  EchoEventType2["Interaction"] = "interaction";
  EchoEventType2["ExperimentView"] = "experimentview";
  EchoEventType2["GrafanaJavascriptAgent"] = "grafana-javascript-agent";
  return EchoEventType2;
})(EchoEventType || {});
let singletonInstance$3;
function setEchoSrv(instance) {
  if (singletonInstance$3 instanceof FakeEchoSrv) {
    for (const item of singletonInstance$3.buffer) {
      instance.addEvent(item.event, item.meta);
    }
  }
  singletonInstance$3 = instance;
}
function getEchoSrv() {
  if (!singletonInstance$3) {
    singletonInstance$3 = new FakeEchoSrv();
  }
  return singletonInstance$3;
}
const registerEchoBackend = (backend) => {
  getEchoSrv().addBackend(backend);
};
class FakeEchoSrv {
  constructor() {
    __publicField$5(this, "buffer", []);
  }
  flush() {
    this.buffer = [];
  }
  addBackend(backend) {
  }
  addEvent(event, meta) {
    this.buffer.push({ event, meta });
  }
}

let singletonInstance$2;
const setTemplateSrv = (instance) => {
  singletonInstance$2 = instance;
};
const getTemplateSrv = () => singletonInstance$2;

let singleton$3;
const setLegacyAngularInjector = (instance) => {
  singleton$3 = instance;
};
const getLegacyAngularInjector = () => singleton$3;

let singletonInstance$1;
const setGrafanaLiveSrv = (instance) => {
  singletonInstance$1 = instance;
};
const getGrafanaLiveSrv = () => singletonInstance$1;

var __defProp$8 = Object.defineProperty;
var __defNormalProp$8 = (obj, key, value) => key in obj ? __defProp$8(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$4 = (obj, key, value) => {
  __defNormalProp$8(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class GrafanaBootConfig {
  constructor(options2) {
    __publicField$4(this, "publicDashboardAccessToken");
    __publicField$4(this, "publicDashboardsEnabled", true);
    __publicField$4(this, "snapshotEnabled", true);
    __publicField$4(this, "datasources", {});
    __publicField$4(this, "panels", {});
    __publicField$4(this, "apps", {});
    __publicField$4(this, "auth", {});
    __publicField$4(this, "minRefreshInterval", "");
    __publicField$4(this, "appUrl", "");
    __publicField$4(this, "appSubUrl", "");
    __publicField$4(this, "namespace", "default");
    __publicField$4(this, "windowTitlePrefix", "");
    __publicField$4(this, "buildInfo");
    __publicField$4(this, "newPanelTitle", "");
    __publicField$4(this, "bootData");
    __publicField$4(this, "externalUserMngLinkUrl", "");
    __publicField$4(this, "externalUserMngLinkName", "");
    __publicField$4(this, "externalUserMngInfo", "");
    __publicField$4(this, "allowOrgCreate", false);
    __publicField$4(this, "feedbackLinksEnabled", true);
    __publicField$4(this, "disableLoginForm", false);
    __publicField$4(this, "defaultDatasource", "");
    // UID
    __publicField$4(this, "angularSupportEnabled", false);
    __publicField$4(this, "authProxyEnabled", false);
    __publicField$4(this, "exploreEnabled", false);
    __publicField$4(this, "queryHistoryEnabled", false);
    __publicField$4(this, "helpEnabled", false);
    __publicField$4(this, "profileEnabled", false);
    __publicField$4(this, "newsFeedEnabled", true);
    __publicField$4(this, "ldapEnabled", false);
    __publicField$4(this, "jwtHeaderName", "");
    __publicField$4(this, "jwtUrlLogin", false);
    __publicField$4(this, "sigV4AuthEnabled", false);
    __publicField$4(this, "azureAuthEnabled", false);
    __publicField$4(this, "secureSocksDSProxyEnabled", false);
    __publicField$4(this, "samlEnabled", false);
    __publicField$4(this, "samlName", "");
    __publicField$4(this, "autoAssignOrg", true);
    __publicField$4(this, "verifyEmailEnabled", false);
    __publicField$4(this, "oauth", {});
    __publicField$4(this, "rbacEnabled", true);
    __publicField$4(this, "disableUserSignUp", false);
    __publicField$4(this, "loginHint", "");
    __publicField$4(this, "passwordHint", "");
    __publicField$4(this, "loginError");
    __publicField$4(this, "viewersCanEdit", false);
    __publicField$4(this, "editorsCanAdmin", false);
    __publicField$4(this, "disableSanitizeHtml", false);
    __publicField$4(this, "trustedTypesDefaultPolicyEnabled", false);
    __publicField$4(this, "cspReportOnlyEnabled", false);
    __publicField$4(this, "liveEnabled", true);
    /** @deprecated Use `theme2` instead. */
    __publicField$4(this, "theme");
    __publicField$4(this, "theme2");
    __publicField$4(this, "featureToggles", {});
    __publicField$4(this, "anonymousEnabled", false);
    __publicField$4(this, "anonymousDeviceLimit");
    __publicField$4(this, "licenseInfo", {});
    __publicField$4(this, "rendererAvailable", false);
    __publicField$4(this, "rendererVersion", "");
    __publicField$4(this, "rendererDefaultImageWidth", 1e3);
    __publicField$4(this, "rendererDefaultImageHeight", 500);
    __publicField$4(this, "rendererDefaultImageScale", 1);
    __publicField$4(this, "secretsManagerPluginEnabled", false);
    __publicField$4(this, "supportBundlesEnabled", false);
    __publicField$4(this, "http2Enabled", false);
    __publicField$4(this, "dateFormats");
    __publicField$4(this, "grafanaJavascriptAgent", {
      enabled: false,
      customEndpoint: "",
      apiKey: "",
      errorInstrumentalizationEnabled: true,
      consoleInstrumentalizationEnabled: false,
      webVitalsInstrumentalizationEnabled: false
    });
    __publicField$4(this, "pluginCatalogURL", "https://grafana.com/grafana/plugins/");
    __publicField$4(this, "pluginAdminEnabled", true);
    __publicField$4(this, "pluginAdminExternalManageEnabled", false);
    __publicField$4(this, "pluginCatalogHiddenPlugins", []);
    __publicField$4(this, "pluginsCDNBaseURL", "");
    __publicField$4(this, "expressionsEnabled", false);
    __publicField$4(this, "customTheme");
    __publicField$4(this, "awsAllowedAuthProviders", []);
    __publicField$4(this, "awsAssumeRoleEnabled", false);
    __publicField$4(this, "azure", {
      managedIdentityEnabled: false,
      workloadIdentityEnabled: false,
      userIdentityEnabled: false,
      userIdentityFallbackCredentialsEnabled: false
    });
    __publicField$4(this, "caching", {
      enabled: false
    });
    __publicField$4(this, "geomapDefaultBaseLayerConfig");
    __publicField$4(this, "geomapDisableCustomBaseLayer");
    __publicField$4(this, "unifiedAlertingEnabled", false);
    __publicField$4(this, "unifiedAlerting", {
      minInterval: "",
      alertStateHistoryBackend: void 0,
      alertStateHistoryPrimary: void 0
    });
    __publicField$4(this, "applicationInsightsConnectionString");
    __publicField$4(this, "applicationInsightsEndpointUrl");
    __publicField$4(this, "recordedQueries", {
      enabled: true
    });
    __publicField$4(this, "featureHighlights", {
      enabled: false
    });
    __publicField$4(this, "reporting", {
      enabled: true
    });
    __publicField$4(this, "analytics", {
      enabled: true
    });
    __publicField$4(this, "googleAnalyticsId");
    __publicField$4(this, "googleAnalytics4Id");
    __publicField$4(this, "googleAnalytics4SendManualPageViews", false);
    __publicField$4(this, "rudderstackWriteKey");
    __publicField$4(this, "rudderstackDataPlaneUrl");
    __publicField$4(this, "rudderstackSdkUrl");
    __publicField$4(this, "rudderstackConfigUrl");
    __publicField$4(this, "rudderstackIntegrationsUrl");
    __publicField$4(this, "sqlConnectionLimits", {
      maxOpenConns: 100,
      maxIdleConns: 100,
      connMaxLifetime: 14400
    });
    __publicField$4(this, "tokenExpirationDayLimit");
    __publicField$4(this, "disableFrontendSandboxForPlugins", []);
    __publicField$4(this, "sharedWithMeFolderUID");
    __publicField$4(this, "rootFolderUID");
    __publicField$4(this, "localFileSystemAvailable");
    __publicField$4(this, "cloudMigrationIsTarget");
    /**
     * Language used in Grafana's UI. This is after the user's preference (or deteceted locale) is resolved to one of
     * Grafana's supported language.
     */
    __publicField$4(this, "language");
    this.bootData = options2.bootData;
    const defaults = {
      datasources: {},
      windowTitlePrefix: "Grafana - ",
      panels: {},
      newPanelTitle: "Panel Title",
      playlist_timespan: "1m",
      unsaved_changes_warning: true,
      appUrl: "",
      appSubUrl: "",
      buildInfo: {
        version: "1.0",
        commit: "1",
        env: "production"
      },
      viewersCanEdit: false,
      editorsCanAdmin: false,
      disableSanitizeHtml: false
    };
    lodash.merge(this, defaults, options2);
    this.buildInfo = options2.buildInfo || defaults.buildInfo;
    if (this.dateFormats) {
      data.systemDateFormats.update(this.dateFormats);
    }
    overrideFeatureTogglesFromUrl(this);
    overrideFeatureTogglesFromLocalStorage(this);
    if (this.featureToggles.disableAngular) {
      this.angularSupportEnabled = false;
    }
    this.theme2 = data.getThemeById(this.bootData.user.theme);
    this.bootData.user.lightTheme = this.theme2.isLight;
    this.theme = this.theme2.v1;
  }
}
function overrideFeatureTogglesFromLocalStorage(config2) {
  const featureToggles = config2.featureToggles;
  const localStorageKey = "grafana.featureToggles";
  const localStorageValue = window.localStorage.getItem(localStorageKey);
  if (localStorageValue) {
    const features = localStorageValue.split(",");
    for (const feature of features) {
      const [featureName, featureValue] = feature.split("=");
      const toggleState = featureValue === "true" || featureValue === "1";
      featureToggles[featureName] = toggleState;
      console.log(`Setting feature toggle ${featureName} = ${toggleState} via localstorage`);
    }
  }
}
function overrideFeatureTogglesFromUrl(config2) {
  if (window.location.href.indexOf("__feature") === -1) {
    return;
  }
  const isDevelopment = config2.buildInfo.env === "development";
  const safeRuntimeFeatureFlags = /* @__PURE__ */ new Set(["queryServiceFromUI"]);
  const params = new URLSearchParams(window.location.search);
  params.forEach((value, key) => {
    if (key.startsWith("__feature.")) {
      const featureToggles = config2.featureToggles;
      const featureName = key.substring(10);
      const toggleState = value === "true" || value === "";
      if (toggleState !== featureToggles[key]) {
        if (isDevelopment || safeRuntimeFeatureFlags.has(featureName)) {
          featureToggles[featureName] = toggleState;
          console.log(`Setting feature toggle ${featureName} = ${toggleState} via url`);
        } else {
          console.log(`Unable to change feature toggle ${featureName} via url in production.`);
        }
      }
    }
  });
}
const bootData = window.grafanaBootData || {
  settings: {},
  user: {},
  navTree: []
};
const options = bootData.settings;
options.bootData = bootData;
const config = new GrafanaBootConfig(options);

var __defProp$7 = Object.defineProperty;
var __defProps$3 = Object.defineProperties;
var __getOwnPropDescs$3 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$5 = Object.getOwnPropertySymbols;
var __hasOwnProp$5 = Object.prototype.hasOwnProperty;
var __propIsEnum$5 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$7 = (obj, key, value) => key in obj ? __defProp$7(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$5 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$5.call(b, prop))
      __defNormalProp$7(a, prop, b[prop]);
  if (__getOwnPropSymbols$5)
    for (var prop of __getOwnPropSymbols$5(b)) {
      if (__propIsEnum$5.call(b, prop))
        __defNormalProp$7(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$3 = (a, b) => __defProps$3(a, __getOwnPropDescs$3(b));
var __publicField$3 = (obj, key, value) => {
  __defNormalProp$7(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class HistoryWrapper {
  constructor(history) {
    __publicField$3(this, "history");
    var _a;
    this.history = history || (process.env.NODE_ENV === "test" ? H__namespace.createMemoryHistory({ initialEntries: ["/"] }) : H__namespace.createBrowserHistory({ basename: (_a = config.appSubUrl) != null ? _a : "/" }));
    this.partial = this.partial.bind(this);
    this.push = this.push.bind(this);
    this.replace = this.replace.bind(this);
    this.getSearch = this.getSearch.bind(this);
    this.getHistory = this.getHistory.bind(this);
    this.getLocation = this.getLocation.bind(this);
  }
  getHistory() {
    return this.history;
  }
  getSearch() {
    return new URLSearchParams(this.history.location.search);
  }
  partial(query, replace) {
    const currentLocation = this.history.location;
    const newQuery = this.getSearchObject();
    for (const key in query) {
      if (query[key] === null || query[key] === void 0) {
        delete newQuery[key];
      } else {
        newQuery[key] = query[key];
      }
    }
    const updatedUrl = data.urlUtil.renderUrl(currentLocation.pathname, newQuery);
    if (replace) {
      this.history.replace(updatedUrl, this.history.location.state);
    } else {
      this.history.push(updatedUrl, this.history.location.state);
    }
  }
  push(location) {
    this.history.push(location);
  }
  replace(location) {
    this.history.replace(location);
  }
  reload() {
    var _a;
    const prevState = (_a = this.history.location.state) == null ? void 0 : _a.routeReloadCounter;
    this.history.replace(__spreadProps$3(__spreadValues$5({}, this.history.location), {
      state: { routeReloadCounter: prevState ? prevState + 1 : 1 }
    }));
  }
  getLocation() {
    return this.history.location;
  }
  getSearchObject() {
    return locationSearchToObject(this.history.location.search);
  }
  /** @deprecated use partial, push or replace instead */
  update(options) {
    data.deprecationWarning("LocationSrv", "update", "partial, push or replace");
    if (options.partial && options.query) {
      this.partial(options.query, options.partial);
    } else {
      const newLocation = {
        pathname: options.path
      };
      if (options.query) {
        newLocation.search = data.urlUtil.toUrlParams(options.query);
      }
      if (options.replace) {
        this.replace(newLocation);
      } else {
        this.push(newLocation);
      }
    }
  }
}
function locationSearchToObject(search) {
  let queryString = typeof search === "number" ? String(search) : search;
  if (queryString.length > 0) {
    if (queryString.startsWith("?")) {
      return data.urlUtil.parseKeyValue(queryString.substring(1));
    }
    return data.urlUtil.parseKeyValue(queryString);
  }
  return {};
}
exports.locationService = new HistoryWrapper();
const setLocationService = (location) => {
  if (process.env.NODE_ENV !== "test") {
    throw new Error("locationService can be only overriden in test environment");
  }
  exports.locationService = location;
};
const navigationLog = ui.createLogger("Router");
const navigationLogger = navigationLog.logger;
ui.attachDebugger("location", exports.locationService, navigationLog);

var __defProp$6 = Object.defineProperty;
var __defNormalProp$6 = (obj, key, value) => key in obj ? __defProp$6(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$2 = (obj, key, value) => {
  __defNormalProp$6(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class RefreshEvent extends data.BusEventBase {
}
__publicField$2(RefreshEvent, "type", "refresh");
class ThemeChangedEvent extends data.BusEventWithPayload {
}
__publicField$2(ThemeChangedEvent, "type", "theme-changed");
class TimeRangeUpdatedEvent extends data.BusEventWithPayload {
}
__publicField$2(TimeRangeUpdatedEvent, "type", "time-range-updated");
class CopyPanelEvent extends data.BusEventWithPayload {
}
__publicField$2(CopyPanelEvent, "type", "copy-panel");
let singletonInstance;
function setAppEvents(instance) {
  singletonInstance = instance;
}
function getAppEvents() {
  return singletonInstance;
}

function isPluginExtensionLink(extension) {
  if (!extension) {
    return false;
  }
  return extension.type === data.PluginExtensionTypes.link && ("path" in extension || "onClick" in extension);
}
function isPluginExtensionComponent(extension) {
  if (!extension) {
    return false;
  }
  return extension.type === data.PluginExtensionTypes.component && "component" in extension;
}

let singleton$2;
function setPluginExtensionGetter(instance) {
  if (singleton$2 && process.env.NODE_ENV !== "test") {
    throw new Error("setPluginExtensionGetter() function should only be called once, when Grafana is starting.");
  }
  singleton$2 = instance;
}
function getPluginExtensionGetter() {
  if (!singleton$2) {
    throw new Error("getPluginExtensionGetter() can only be used after the Grafana instance has started.");
  }
  return singleton$2;
}
const getPluginExtensions = (options) => getPluginExtensionGetter()(options);
const getPluginLinkExtensions = (options) => {
  const { extensions } = getPluginExtensions(options);
  return {
    extensions: extensions.filter(isPluginExtensionLink)
  };
};
const getPluginComponentExtensions = (options) => {
  const { extensions } = getPluginExtensions(options);
  const componentExtensions = extensions.filter(isPluginExtensionComponent);
  return {
    extensions: componentExtensions
  };
};

let singleton$1;
function setPluginExtensionsHook(hook) {
  if (singleton$1 && process.env.NODE_ENV !== "test") {
    throw new Error("setPluginExtensionsHook() function should only be called once, when Grafana is starting.");
  }
  singleton$1 = hook;
}
function usePluginExtensions(options) {
  if (!singleton$1) {
    throw new Error("usePluginExtensions(options) can only be used after the Grafana instance has started.");
  }
  return singleton$1(options);
}
function usePluginLinks(options) {
  const { extensions, isLoading } = usePluginExtensions(options);
  return React.useMemo(() => {
    return {
      links: extensions.filter(isPluginExtensionLink),
      isLoading
    };
  }, [extensions, isLoading]);
}
function usePluginComponents(options) {
  const { extensions, isLoading } = usePluginExtensions(options);
  return React.useMemo(
    () => ({
      components: extensions.filter(isPluginExtensionComponent).map(({ component }) => component),
      isLoading
    }),
    [extensions, isLoading]
  );
}
function usePluginLinkExtensions(options) {
  const { extensions, isLoading } = usePluginExtensions(options);
  return React.useMemo(() => {
    return {
      extensions: extensions.filter(isPluginExtensionLink),
      isLoading
    };
  }, [extensions, isLoading]);
}
function usePluginComponentExtensions(options) {
  const { extensions, isLoading } = usePluginExtensions(options);
  return React.useMemo(
    () => ({
      extensions: extensions.filter(isPluginExtensionComponent),
      isLoading
    }),
    [extensions, isLoading]
  );
}

let singleton;
function setPluginComponentHook(hook) {
  if (singleton && process.env.NODE_ENV !== "test") {
    throw new Error("setPluginComponentHook() function should only be called once, when Grafana is starting.");
  }
  singleton = hook;
}
function usePluginComponent(id) {
  if (!singleton) {
    throw new Error("setPluginComponentHook(options) can only be used after the Grafana instance has started.");
  }
  return singleton(id);
}

var MetaAnalyticsEventName = /* @__PURE__ */ ((MetaAnalyticsEventName2) => {
  MetaAnalyticsEventName2["DashboardView"] = "dashboard-view";
  MetaAnalyticsEventName2["DataRequest"] = "data-request";
  return MetaAnalyticsEventName2;
})(MetaAnalyticsEventName || {});
const isPageviewEvent = (event) => {
  return Boolean(event.payload.page);
};
const isInteractionEvent = (event) => {
  return Boolean(event.payload.interactionName);
};
const isExperimentViewEvent = (event) => {
  return Boolean(event.payload.experimentId);
};

async function loadPluginCss(options) {
  try {
    const cssPath = config.bootData.user.theme === "light" ? options.light : options.dark;
    return window.System.import(cssPath);
  } catch (err) {
    console.error(err);
  }
}
let pluginImportUtils;
function setPluginImportUtils(utils) {
  if (pluginImportUtils) {
    throw new Error("pluginImportUtils should only be set once, when Grafana is starting.");
  }
  pluginImportUtils = utils;
}
function getPluginImportUtils() {
  if (!pluginImportUtils) {
    throw new Error("pluginImportUtils can only be used after Grafana instance has started.");
  }
  return pluginImportUtils;
}

const reportMetaAnalytics = (payload) => {
  getEchoSrv().addEvent({
    type: EchoEventType.MetaAnalytics,
    payload
  });
};
const reportPageview = () => {
  var _a;
  const location = exports.locationService.getLocation();
  const page = `${(_a = config.appSubUrl) != null ? _a : ""}${location.pathname}${location.search}${location.hash}`;
  getEchoSrv().addEvent({
    type: EchoEventType.Pageview,
    payload: {
      page
    }
  });
};
const reportInteraction = (interactionName, properties) => {
  getEchoSrv().addEvent({
    type: EchoEventType.Interaction,
    payload: {
      interactionName,
      properties
    }
  });
};
const reportExperimentView = (id, group, variant) => {
  getEchoSrv().addEvent({
    type: EchoEventType.ExperimentView,
    payload: {
      experimentId: id,
      experimentGroup: group,
      experimentVariant: variant
    }
  });
};

const featureEnabled = (feature) => {
  const { enabledFeatures } = config.licenseInfo;
  return enabledFeatures && enabledFeatures[feature];
};

var __defProp$5 = Object.defineProperty;
var __getOwnPropSymbols$4 = Object.getOwnPropertySymbols;
var __hasOwnProp$4 = Object.prototype.hasOwnProperty;
var __propIsEnum$4 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$5 = (obj, key, value) => key in obj ? __defProp$5(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$4 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$4.call(b, prop))
      __defNormalProp$5(a, prop, b[prop]);
  if (__getOwnPropSymbols$4)
    for (var prop of __getOwnPropSymbols$4(b)) {
      if (__propIsEnum$4.call(b, prop))
        __defNormalProp$5(a, prop, b[prop]);
    }
  return a;
};
function logInfo(message, contexts) {
  if (config.grafanaJavascriptAgent.enabled) {
    faroWebSdk.faro.api.pushLog([message], {
      level: faroWebSdk.LogLevel.INFO,
      context: contexts
    });
  }
}
function logWarning(message, contexts) {
  if (config.grafanaJavascriptAgent.enabled) {
    faroWebSdk.faro.api.pushLog([message], {
      level: faroWebSdk.LogLevel.WARN,
      context: contexts
    });
  }
}
function logDebug(message, contexts) {
  if (config.grafanaJavascriptAgent.enabled) {
    faroWebSdk.faro.api.pushLog([message], {
      level: faroWebSdk.LogLevel.DEBUG,
      context: contexts
    });
  }
}
function logError(err, contexts) {
  if (config.grafanaJavascriptAgent.enabled) {
    faroWebSdk.faro.api.pushError(err, {
      context: contexts
    });
  }
}
function logMeasurement(type, values, context) {
  if (config.grafanaJavascriptAgent.enabled) {
    faroWebSdk.faro.api.pushMeasurement({
      type,
      values,
      context
    });
  }
}
function createMonitoringLogger(source, defaultContext) {
  const createFullContext = (contexts) => __spreadValues$4(__spreadValues$4({
    source
  }, defaultContext), contexts);
  return {
    /**
     * Logs a debug message with optional additional context.
     * @param {string} message - The debug message to be logged.
     * @param {LogContext} [contexts] - Optional additional context to be included.
     */
    logDebug: (message, contexts) => logDebug(message, createFullContext(contexts)),
    /**
     * Logs an informational message with optional additional context.
     * @param {string} message - The informational message to be logged.
     * @param {LogContext} [contexts] - Optional additional context to be included.
     */
    logInfo: (message, contexts) => logInfo(message, createFullContext(contexts)),
    /**
     * Logs a warning message with optional additional context.
     * @param {string} message - The warning message to be logged.
     * @param {LogContext} [contexts] - Optional additional context to be included.
     */
    logWarning: (message, contexts) => logWarning(message, createFullContext(contexts)),
    /**
     * Logs an error with optional additional context.
     * @param {Error} error - The error object to be logged.
     * @param {LogContext} [contexts] - Optional additional context to be included.
     */
    logError: (error, contexts) => logError(error, createFullContext(contexts)),
    /**
     * Logs an measurement with optional additional context.
     * @param {MeasurementEvent} measurement - The measurement object to be recorded.
     * @param {LogContext} [contexts] - Optional additional context to be included.
     */
    logMeasurement: (type, measurement, contexts) => logMeasurement(type, measurement, createFullContext(contexts))
  };
}

function toDataQueryError(err) {
  var _a, _b, _c;
  const error = err || {};
  if (!error.message) {
    if (typeof err === "string") {
      return { message: err };
    }
    let message = "Query error";
    if (error.message) {
      message = error.message;
    } else if (error.data && error.data.message && ((_a = error.data) == null ? void 0 : _a.message) !== "Query data error") {
      message = error.data.message;
    } else if (((_b = error == null ? void 0 : error.data) == null ? void 0 : _b.message) === "Query data error" && ((_c = error == null ? void 0 : error.data) == null ? void 0 : _c.error)) {
      message = error.data.error;
    } else if (error.data && error.data.error) {
      message = error.data.error;
    } else if (error.status) {
      message = `Query error: ${error.status} ${error.statusText}`;
    }
    error.message = message;
  }
  return error;
}

var __defProp$4 = Object.defineProperty;
var __defProps$2 = Object.defineProperties;
var __getOwnPropDescs$2 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$3 = Object.getOwnPropertySymbols;
var __hasOwnProp$3 = Object.prototype.hasOwnProperty;
var __propIsEnum$3 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$4 = (obj, key, value) => key in obj ? __defProp$4(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$3 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$3.call(b, prop))
      __defNormalProp$4(a, prop, b[prop]);
  if (__getOwnPropSymbols$3)
    for (var prop of __getOwnPropSymbols$3(b)) {
      if (__propIsEnum$3.call(b, prop))
        __defNormalProp$4(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$2 = (a, b) => __defProps$2(a, __getOwnPropDescs$2(b));
const cachedResponseNotice = { severity: "info", text: "Cached response" };
function toDataQueryResponse(res, queries) {
  var _a, _b, _c, _d;
  const rsp = { data: [], state: data.LoadingState.Done };
  const traceId = "traceId" in res ? res.traceId : void 0;
  if (traceId != null) {
    rsp.traceIds = [traceId];
  }
  const fetchResponse = res;
  if ((_a = fetchResponse.data) == null ? void 0 : _a.results) {
    const results = fetchResponse.data.results;
    const refIDs = (queries == null ? void 0 : queries.length) ? queries.map((q) => q.refId) : Object.keys(results);
    const cachedResponse = isCachedResponse(fetchResponse);
    const data$1 = [];
    for (const refId of refIDs) {
      const dr = results[refId];
      if (!dr) {
        continue;
      }
      dr.refId = refId;
      data$1.push(dr);
    }
    for (const dr of data$1) {
      if (dr.error) {
        const errorObj = {
          refId: dr.refId,
          message: dr.error,
          status: dr.status
        };
        if (traceId != null) {
          errorObj.traceId = traceId;
        }
        if (!rsp.error) {
          rsp.error = __spreadValues$3({}, errorObj);
        }
        if (rsp.errors) {
          rsp.errors.push(__spreadValues$3({}, errorObj));
        } else {
          rsp.errors = [__spreadValues$3({}, errorObj)];
        }
        rsp.state = data.LoadingState.Error;
      }
      if ((_b = dr.frames) == null ? void 0 : _b.length) {
        for (let js of dr.frames) {
          if (cachedResponse) {
            js = addCacheNotice(js);
          }
          const df = data.dataFrameFromJSON(js);
          if (!df.refId) {
            df.refId = dr.refId;
          }
          rsp.data.push(df);
        }
        continue;
      }
      if ((_c = dr.series) == null ? void 0 : _c.length) {
        for (const s of dr.series) {
          if (!s.refId) {
            s.refId = dr.refId;
          }
          rsp.data.push(data.toDataFrame(s));
        }
      }
      if ((_d = dr.tables) == null ? void 0 : _d.length) {
        for (const s of dr.tables) {
          if (!s.refId) {
            s.refId = dr.refId;
          }
          rsp.data.push(data.toDataFrame(s));
        }
      }
    }
  }
  if (fetchResponse.status && fetchResponse.status !== 200) {
    if (rsp.state !== data.LoadingState.Error) {
      rsp.state = data.LoadingState.Error;
    }
    if (!rsp.error) {
      rsp.error = toDataQueryError(res);
    }
  }
  return rsp;
}
function isCachedResponse(res) {
  const headers = res == null ? void 0 : res.headers;
  if (!headers || !headers.get) {
    return false;
  }
  return headers.get("X-Cache") === "HIT";
}
function addCacheNotice(frame) {
  var _a, _b, _c, _d, _e, _f;
  return __spreadProps$2(__spreadValues$3({}, frame), {
    schema: __spreadProps$2(__spreadValues$3({}, frame.schema), {
      fields: [...(_b = (_a = frame.schema) == null ? void 0 : _a.fields) != null ? _b : []],
      meta: __spreadProps$2(__spreadValues$3({}, (_c = frame.schema) == null ? void 0 : _c.meta), {
        notices: [...(_f = (_e = (_d = frame.schema) == null ? void 0 : _d.meta) == null ? void 0 : _e.notices) != null ? _f : [], cachedResponseNotice],
        isCachedResponse: true
      })
    })
  });
}
function frameToMetricFindValue(frame) {
  if (!frame || !frame.length) {
    return [];
  }
  const values = [];
  let field = frame.fields.find((f) => f.type === data.FieldType.string);
  if (!field) {
    field = frame.fields.find((f) => f.type !== data.FieldType.time);
  }
  if (field) {
    for (let i = 0; i < field.values.length; i++) {
      values.push({ text: "" + field.values[i] });
    }
  }
  return values;
}

function publicDashboardQueryHandler(request) {
  const {
    intervalMs,
    maxDataPoints,
    requestId,
    panelId,
    queryCachingTTL,
    range: { from: fromRange, to: toRange }
  } = request;
  if (!request.targets.length) {
    return rxjs.of({ data: [] });
  }
  const body = {
    intervalMs,
    maxDataPoints,
    queryCachingTTL,
    timeRange: {
      from: fromRange.valueOf().toString(),
      to: toRange.valueOf().toString(),
      timezone: request.timezone
    }
  };
  return getBackendSrv().fetch({
    url: `/api/public/dashboards/${config.publicDashboardAccessToken}/panels/${panelId}/query`,
    method: "POST",
    data: body,
    requestId
  }).pipe(
    rxjs.switchMap((raw) => {
      return rxjs.of(toDataQueryResponse(raw, request.targets));
    }),
    rxjs.catchError((err) => {
      return rxjs.of(toDataQueryResponse(err));
    })
  );
}

var __defProp$3 = Object.defineProperty;
var __defProps$1 = Object.defineProperties;
var __getOwnPropDescs$1 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$2 = Object.getOwnPropertySymbols;
var __hasOwnProp$2 = Object.prototype.hasOwnProperty;
var __propIsEnum$2 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$3 = (obj, key, value) => key in obj ? __defProp$3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$2 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$2.call(b, prop))
      __defNormalProp$3(a, prop, b[prop]);
  if (__getOwnPropSymbols$2)
    for (var prop of __getOwnPropSymbols$2(b)) {
      if (__propIsEnum$2.call(b, prop))
        __defNormalProp$3(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$1 = (a, b) => __defProps$1(a, __getOwnPropDescs$1(b));
var __publicField$1 = (obj, key, value) => {
  __defNormalProp$3(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const ExpressionDatasourceRef = Object.freeze({
  type: "__expr__",
  uid: "__expr__",
  name: "Expression"
});
function isExpressionReference(ref) {
  if (!ref) {
    return false;
  }
  const v = typeof ref === "string" ? ref : ref.type;
  return v === ExpressionDatasourceRef.type || v === ExpressionDatasourceRef.name || v === "-100";
}
class HealthCheckError extends Error {
  constructor(message, details) {
    super(message);
    __publicField$1(this, "details");
    this.details = details;
    this.name = "HealthCheckError";
  }
}
var HealthStatus = /* @__PURE__ */ ((HealthStatus2) => {
  HealthStatus2["Unknown"] = "UNKNOWN";
  HealthStatus2["OK"] = "OK";
  HealthStatus2["Error"] = "ERROR";
  return HealthStatus2;
})(HealthStatus || {});
class DataSourceWithBackend extends data.DataSourceApi {
  constructor(instanceSettings) {
    super(instanceSettings);
    /**
     * Optionally override the streaming behavior
     */
    __publicField$1(this, "streamOptionsProvider", standardStreamOptionsProvider);
  }
  /**
   * Ideally final -- any other implementation may not work as expected
   */
  query(request) {
    if (config.publicDashboardAccessToken) {
      return publicDashboardQueryHandler(request);
    }
    const { intervalMs, maxDataPoints, queryCachingTTL, range, requestId, hideFromInspector = false } = request;
    let targets = request.targets;
    let hasExpr = false;
    const pluginIDs = /* @__PURE__ */ new Set();
    const dsUIDs = /* @__PURE__ */ new Set();
    const queries = targets.map((q) => {
      var _a, _b, _c;
      let datasource = this.getRef();
      let datasourceId = this.id;
      let shouldApplyTemplateVariables = true;
      if (isExpressionReference(q.datasource)) {
        hasExpr = true;
        return __spreadProps$1(__spreadValues$2({}, q), {
          datasource: ExpressionDatasourceRef
        });
      }
      if (q.datasource) {
        const ds = getDataSourceSrv().getInstanceSettings(q.datasource, request.scopedVars);
        if (!ds) {
          throw new Error(`Unknown Datasource: ${JSON.stringify(q.datasource)}`);
        }
        const dsRef = (_a = ds.rawRef) != null ? _a : data.getDataSourceRef(ds);
        const dsId = ds.id;
        if (dsRef.uid !== datasource.uid || datasourceId !== dsId) {
          datasource = dsRef;
          datasourceId = dsId;
          shouldApplyTemplateVariables = false;
        }
      }
      if ((_b = datasource.type) == null ? void 0 : _b.length) {
        pluginIDs.add(datasource.type);
      }
      if ((_c = datasource.uid) == null ? void 0 : _c.length) {
        dsUIDs.add(datasource.uid);
      }
      return __spreadProps$1(__spreadValues$2({}, shouldApplyTemplateVariables ? this.applyTemplateVariables(q, request.scopedVars, request.filters) : q), {
        datasource,
        datasourceId,
        // deprecated!
        intervalMs,
        maxDataPoints,
        queryCachingTTL
      });
    });
    if (!queries.length) {
      return rxjs.of({ data: [] });
    }
    const body = {
      queries,
      from: range == null ? void 0 : range.from.valueOf().toString(),
      to: range == null ? void 0 : range.to.valueOf().toString()
    };
    if (config.featureToggles.queryOverLive) {
      return getGrafanaLiveSrv().getQueryData({
        request,
        body
      });
    }
    const headers = {};
    headers["X-Plugin-Id" /* PluginID */] = Array.from(pluginIDs).join(", ");
    headers["X-Datasource-Uid" /* DatasourceUID */] = Array.from(dsUIDs).join(", ");
    let url = "/api/ds/query?ds_type=" + this.type;
    if (config.featureToggles.queryServiceFromUI) {
      if (!(config.featureToggles.queryService || config.featureToggles.grafanaAPIServerWithExperimentalAPIs)) {
        console.warn("feature toggle queryServiceFromUI also requires the queryService to be running");
      } else {
        if (!hasExpr && dsUIDs.size === 1) ;
        url = `/apis/query.grafana.app/v0alpha1/namespaces/${config.namespace}/query?ds_type=' + this.type`;
      }
    }
    if (hasExpr) {
      headers["X-Grafana-From-Expr" /* FromExpression */] = "true";
      url += "&expression=true";
    }
    if (requestId) {
      url += `&requestId=${requestId}`;
    }
    if (request.dashboardUID) {
      headers["X-Dashboard-Uid" /* DashboardUID */] = request.dashboardUID;
    }
    if (request.panelId) {
      headers["X-Panel-Id" /* PanelID */] = `${request.panelId}`;
    }
    if (request.panelPluginId) {
      headers["X-Panel-Plugin-Id" /* PanelPluginId */] = `${request.panelPluginId}`;
    }
    if (request.queryGroupId) {
      headers["X-Query-Group-Id" /* QueryGroupID */] = `${request.queryGroupId}`;
    }
    if (request.skipQueryCache) {
      headers["X-Cache-Skip" /* SkipQueryCache */] = "true";
    }
    return getBackendSrv().fetch({
      url,
      method: "POST",
      data: body,
      requestId,
      hideFromInspector,
      headers
    }).pipe(
      operators.switchMap((raw) => {
        var _a;
        const rsp = toDataQueryResponse(raw, queries);
        if (((_a = rsp.data) == null ? void 0 : _a.length) && rsp.data.find((f) => {
          var _a2;
          return (_a2 = f.meta) == null ? void 0 : _a2.channel;
        })) {
          return toStreamingDataResponse(rsp, request, this.streamOptionsProvider);
        }
        return rxjs.of(rsp);
      }),
      operators.catchError((err) => {
        return rxjs.of(toDataQueryResponse(err));
      })
    );
  }
  /** Get request headers with plugin ID+UID set */
  getRequestHeaders() {
    const headers = {};
    headers["X-Plugin-Id" /* PluginID */] = this.type;
    headers["X-Datasource-Uid" /* DatasourceUID */] = this.uid;
    return headers;
  }
  /**
   * Apply template variables for explore
   */
  interpolateVariablesInQueries(queries, scopedVars, filters) {
    return queries.map((q) => this.applyTemplateVariables(q, scopedVars, filters));
  }
  /**
   * Override to apply template variables and adhoc filters.  The result is usually also `TQuery`, but sometimes this can
   * be used to modify the query structure before sending to the backend.
   *
   * NOTE: if you do modify the structure or use template variables, alerting queries may not work
   * as expected
   *
   * @virtual
   */
  applyTemplateVariables(query, scopedVars, filters) {
    return query;
  }
  /**
   * Make a GET request to the datasource resource path
   */
  async getResource(path, params, options) {
    const headers = this.getRequestHeaders();
    const result = await rxjs.lastValueFrom(
      getBackendSrv().fetch(__spreadProps$1(__spreadValues$2({}, options), {
        method: "GET",
        headers: (options == null ? void 0 : options.headers) ? __spreadValues$2(__spreadValues$2({}, options.headers), headers) : headers,
        params: params != null ? params : options == null ? void 0 : options.params,
        url: `/api/datasources/uid/${this.uid}/resources/${path}`
      }))
    );
    return result.data;
  }
  /**
   * Send a POST request to the datasource resource path
   */
  async postResource(path, data, options) {
    const headers = this.getRequestHeaders();
    const result = await rxjs.lastValueFrom(
      getBackendSrv().fetch(__spreadProps$1(__spreadValues$2({}, options), {
        method: "POST",
        headers: (options == null ? void 0 : options.headers) ? __spreadValues$2(__spreadValues$2({}, options.headers), headers) : headers,
        data: data != null ? data : __spreadValues$2({}, data),
        url: `/api/datasources/uid/${this.uid}/resources/${path}`
      }))
    );
    return result.data;
  }
  /**
   * Run the datasource healthcheck
   */
  async callHealthCheck() {
    return rxjs.lastValueFrom(
      getBackendSrv().fetch({
        method: "GET",
        url: `/api/datasources/uid/${this.uid}/health`,
        showErrorAlert: false,
        headers: this.getRequestHeaders()
      })
    ).then((v) => v.data).catch((err) => err.data);
  }
  /**
   * Checks the plugin health
   * see public/app/features/datasources/state/actions.ts for what needs to be returned here
   */
  async testDatasource() {
    return this.callHealthCheck().then((res) => {
      if (res.status === "OK" /* OK */) {
        return {
          status: "success",
          message: res.message
        };
      }
      return Promise.reject({
        status: "error",
        message: res.message,
        error: new HealthCheckError(res.message, res.details)
      });
    });
  }
}
function toStreamingDataResponse(rsp, req, getter) {
  var _a;
  const live = getGrafanaLiveSrv();
  if (!live) {
    return rxjs.of(rsp);
  }
  const staticdata = [];
  const streams = [];
  for (const f of rsp.data) {
    const addr = data.parseLiveChannelAddress((_a = f.meta) == null ? void 0 : _a.channel);
    if (addr) {
      const frame = f;
      streams.push(
        live.getDataStream({
          addr,
          buffer: getter(req, frame),
          frame: data.dataFrameToJSON(f)
        })
      );
    } else {
      staticdata.push(f);
    }
  }
  if (staticdata.length) {
    streams.push(rxjs.of(__spreadProps$1(__spreadValues$2({}, rsp), { data: staticdata })));
  }
  if (streams.length === 1) {
    return streams[0];
  }
  return rxjs.merge(...streams);
}
const standardStreamOptionsProvider = (request, frame) => {
  var _a, _b;
  const opts = {
    maxLength: (_a = request.maxDataPoints) != null ? _a : 500,
    action: data.StreamingFrameAction.Append
  };
  if (((_b = request.rangeRaw) == null ? void 0 : _b.to) === "now") {
    opts.maxDelta = request.range.to.valueOf() - request.range.from.valueOf();
  }
  return opts;
};
DataSourceWithBackend = data.makeClassES5Compatible(DataSourceWithBackend);

let PanelRenderer = () => {
  return /* @__PURE__ */ React__default["default"].createElement("div", null, "PanelRenderer can only be used after Grafana instance has been started.");
};

let PanelDataErrorView = ({ message }) => {
  return /* @__PURE__ */ React__default["default"].createElement("div", null, "Unable to render data: ", message, ".");
};

let factory;
const setQueryRunnerFactory = (instance) => {
  if (factory) {
    throw new Error("Runner should only be set when Grafana is starting.");
  }
  factory = instance;
};
const createQueryRunner = () => {
  if (!factory) {
    throw new Error("`createQueryRunner` can only be used after Grafana instance has started.");
  }
  return factory();
};
let runRequest;
function setRunRequest(fn) {
  if (runRequest && process.env.NODE_ENV !== "test") {
    throw new Error("runRequest function should only be set once, when Grafana is starting.");
  }
  runRequest = fn;
}
function getRunRequest() {
  if (!runRequest) {
    throw new Error("getRunRequest can only be used after Grafana instance has started.");
  }
  return runRequest;
}

let PluginPage = ({ children }) => {
  return /* @__PURE__ */ React__default["default"].createElement("div", null, children);
};

var __defProp$2 = Object.defineProperty;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp$2(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class DataSourcePicker extends React.PureComponent {
  constructor(props) {
    super(props);
    __publicField(this, "dataSourceSrv", getDataSourceSrv());
    __publicField(this, "state", {});
    __publicField(this, "onChange", (item, actionMeta) => {
      if (actionMeta.action === "clear" && this.props.onClear) {
        this.props.onClear();
        return;
      }
      const dsSettings = this.dataSourceSrv.getInstanceSettings(item.value);
      if (dsSettings) {
        this.props.onChange(dsSettings);
        this.setState({ error: void 0 });
      }
    });
  }
  componentDidMount() {
    const { current } = this.props;
    const dsSettings = this.dataSourceSrv.getInstanceSettings(current);
    if (!dsSettings) {
      this.setState({ error: "Could not find data source " + current });
    }
  }
  getCurrentValue() {
    const { current, hideTextValue, noDefault } = this.props;
    if (!current && noDefault) {
      return;
    }
    const ds = this.dataSourceSrv.getInstanceSettings(current);
    if (ds) {
      return {
        label: ds.name.slice(0, 37),
        value: ds.uid,
        imgUrl: ds.meta.info.logos.small,
        hideText: hideTextValue,
        meta: ds.meta
      };
    }
    const uid = data.getDataSourceUID(current);
    if (uid === ExpressionDatasourceRef.uid || uid === ExpressionDatasourceRef.name) {
      return { label: uid, value: uid, hideText: hideTextValue };
    }
    return {
      label: (uid != null ? uid : "no name") + " - not found",
      value: uid != null ? uid : void 0,
      imgUrl: "",
      hideText: hideTextValue
    };
  }
  getDataSourceOptions() {
    const { alerting, tracing, metrics, mixed, dashboard, variables, annotations, pluginId, type, filter, logs } = this.props;
    const options = this.dataSourceSrv.getList({
      alerting,
      tracing,
      metrics,
      logs,
      dashboard,
      mixed,
      variables,
      annotations,
      pluginId,
      filter,
      type
    }).map((ds) => ({
      value: ds.name,
      label: `${ds.name}${ds.isDefault ? " (default)" : ""}`,
      imgUrl: ds.meta.info.logos.small,
      meta: ds.meta
    }));
    return options;
  }
  render() {
    const {
      autoFocus,
      onBlur,
      onClear,
      openMenuOnFocus,
      placeholder,
      width,
      inputId,
      disabled = false,
      isLoading = false
    } = this.props;
    const { error } = this.state;
    const options = this.getDataSourceOptions();
    const value = this.getCurrentValue();
    const isClearable = typeof onClear === "function";
    return /* @__PURE__ */ React__default["default"].createElement(
      "div",
      {
        "aria-label": "Data source picker select container",
        "data-testid": e2eSelectors.selectors.components.DataSourcePicker.container
      },
      /* @__PURE__ */ React__default["default"].createElement(
        ui.Select,
        {
          isLoading,
          disabled,
          "aria-label": "Select a data source",
          "data-testid": e2eSelectors.selectors.components.DataSourcePicker.inputV2,
          inputId: inputId || "data-source-picker",
          className: "ds-picker select-container",
          isMulti: false,
          isClearable,
          backspaceRemovesValue: false,
          onChange: this.onChange,
          options,
          autoFocus,
          onBlur,
          width,
          openMenuOnFocus,
          maxMenuHeight: 500,
          placeholder,
          noOptionsMessage: "No datasources found",
          value: value != null ? value : null,
          invalid: Boolean(error) || Boolean(this.props.invalid),
          getOptionLabel: (o) => {
            if (o.meta && data.isUnsignedPluginSignature(o.meta.signature) && o !== value) {
              return /* @__PURE__ */ React__default["default"].createElement(ui.Stack, { alignItems: "center", justifyContent: "space-between" }, /* @__PURE__ */ React__default["default"].createElement("span", null, o.label), " ", /* @__PURE__ */ React__default["default"].createElement(ui.PluginSignatureBadge, { status: o.meta.signature }));
            }
            return o.label || "";
          }
        }
      )
    );
  }
}
__publicField(DataSourcePicker, "defaultProps", {
  autoFocus: false,
  openMenuOnFocus: false,
  placeholder: "Select data source"
});

var __defProp$1 = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$1 = Object.getOwnPropertySymbols;
var __hasOwnProp$1 = Object.prototype.hasOwnProperty;
var __propIsEnum$1 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$1 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$1.call(b, prop))
      __defNormalProp$1(a, prop, b[prop]);
  if (__getOwnPropSymbols$1)
    for (var prop of __getOwnPropSymbols$1(b)) {
      if (__propIsEnum$1.call(b, prop))
        __defNormalProp$1(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
function createPluginEventProperties(meta) {
  return {
    grafana_version: config.buildInfo.version,
    plugin_type: String(meta.type),
    plugin_version: meta.info.version,
    plugin_id: meta.id,
    plugin_name: meta.name
  };
}
function createDataSourcePluginEventProperties(instanceSettings) {
  return __spreadProps(__spreadValues$1({}, createPluginEventProperties(instanceSettings.meta)), {
    datasource_uid: instanceSettings.uid
  });
}

var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
const namePrefix = "grafana_plugin_";
function usePluginInteractionReporter() {
  const context = data.usePluginContext();
  return React.useMemo(() => {
    const info = data.isDataSourcePluginContext(context) ? createDataSourcePluginEventProperties(context.instanceSettings) : createPluginEventProperties(context.meta);
    return (interactionName, properties) => {
      if (!validInteractionName(interactionName)) {
        throw new Error(`Interactions reported in plugins should start with: "${namePrefix}".`);
      }
      return reportInteraction(interactionName, __spreadValues(__spreadValues({}, properties), info));
    };
  }, [context]);
}
function validInteractionName(interactionName) {
  return interactionName.startsWith(namePrefix) && interactionName.length > namePrefix.length;
}

let rtpHook = void 0;
const setReturnToPreviousHook = (hook) => {
  rtpHook = hook;
};
const useReturnToPrevious = () => {
  if (!rtpHook) {
    if (process.env.NODE_ENV !== "production") {
      throw new Error("useReturnToPrevious hook not found in @grafana/runtime");
    }
    return () => console.error("ReturnToPrevious hook not found");
  }
  return rtpHook();
};

exports.EmbeddedDashboard = () => {
  throw new Error("EmbeddedDashboard requires runtime initialization");
};
function setEmbeddedDashboard(component) {
  exports.EmbeddedDashboard = component;
}

Object.defineProperty(exports, 'StreamingFrameAction', {
  enumerable: true,
  get: function () { return data.StreamingFrameAction; }
});
exports.CopyPanelEvent = CopyPanelEvent;
exports.DataSourcePicker = DataSourcePicker;
exports.DataSourceWithBackend = DataSourceWithBackend;
exports.EchoEventType = EchoEventType;
exports.FakeEchoSrv = FakeEchoSrv;
exports.GrafanaBootConfig = GrafanaBootConfig;
exports.HealthCheckError = HealthCheckError;
exports.HealthStatus = HealthStatus;
exports.HistoryWrapper = HistoryWrapper;
exports.MetaAnalyticsEventName = MetaAnalyticsEventName;
exports.PanelDataErrorView = PanelDataErrorView;
exports.PanelRenderer = PanelRenderer;
exports.PluginPage = PluginPage;
exports.RefreshEvent = RefreshEvent;
exports.ThemeChangedEvent = ThemeChangedEvent;
exports.TimeRangeUpdatedEvent = TimeRangeUpdatedEvent;
exports.config = config;
exports.createDataSourcePluginEventProperties = createDataSourcePluginEventProperties;
exports.createMonitoringLogger = createMonitoringLogger;
exports.createPluginEventProperties = createPluginEventProperties;
exports.createQueryRunner = createQueryRunner;
exports.featureEnabled = featureEnabled;
exports.frameToMetricFindValue = frameToMetricFindValue;
exports.getAngularLoader = getAngularLoader;
exports.getAppEvents = getAppEvents;
exports.getBackendSrv = getBackendSrv;
exports.getDataSourceSrv = getDataSourceSrv;
exports.getEchoSrv = getEchoSrv;
exports.getGrafanaLiveSrv = getGrafanaLiveSrv;
exports.getLegacyAngularInjector = getLegacyAngularInjector;
exports.getLocationSrv = getLocationSrv;
exports.getPluginComponentExtensions = getPluginComponentExtensions;
exports.getPluginExtensions = getPluginExtensions;
exports.getPluginImportUtils = getPluginImportUtils;
exports.getPluginLinkExtensions = getPluginLinkExtensions;
exports.getRunRequest = getRunRequest;
exports.getTemplateSrv = getTemplateSrv;
exports.isExperimentViewEvent = isExperimentViewEvent;
exports.isExpressionReference = isExpressionReference;
exports.isFetchError = isFetchError;
exports.isInteractionEvent = isInteractionEvent;
exports.isPageviewEvent = isPageviewEvent;
exports.isPluginExtensionComponent = isPluginExtensionComponent;
exports.isPluginExtensionLink = isPluginExtensionLink;
exports.loadPluginCss = loadPluginCss;
exports.locationSearchToObject = locationSearchToObject;
exports.logDebug = logDebug;
exports.logError = logError;
exports.logInfo = logInfo;
exports.logWarning = logWarning;
exports.navigationLogger = navigationLogger;
exports.registerEchoBackend = registerEchoBackend;
exports.reportExperimentView = reportExperimentView;
exports.reportInteraction = reportInteraction;
exports.reportMetaAnalytics = reportMetaAnalytics;
exports.reportPageview = reportPageview;
exports.setAngularLoader = setAngularLoader;
exports.setAppEvents = setAppEvents;
exports.setBackendSrv = setBackendSrv;
exports.setDataSourceSrv = setDataSourceSrv;
exports.setEchoSrv = setEchoSrv;
exports.setEmbeddedDashboard = setEmbeddedDashboard;
exports.setGrafanaLiveSrv = setGrafanaLiveSrv;
exports.setLegacyAngularInjector = setLegacyAngularInjector;
exports.setLocationService = setLocationService;
exports.setLocationSrv = setLocationSrv;
exports.setPluginComponentHook = setPluginComponentHook;
exports.setPluginExtensionGetter = setPluginExtensionGetter;
exports.setPluginExtensionsHook = setPluginExtensionsHook;
exports.setPluginImportUtils = setPluginImportUtils;
exports.setQueryRunnerFactory = setQueryRunnerFactory;
exports.setReturnToPreviousHook = setReturnToPreviousHook;
exports.setRunRequest = setRunRequest;
exports.setTemplateSrv = setTemplateSrv;
exports.toDataQueryError = toDataQueryError;
exports.toDataQueryResponse = toDataQueryResponse;
exports.usePluginComponent = usePluginComponent;
exports.usePluginComponentExtensions = usePluginComponentExtensions;
exports.usePluginComponents = usePluginComponents;
exports.usePluginExtensions = usePluginExtensions;
exports.usePluginInteractionReporter = usePluginInteractionReporter;
exports.usePluginLinkExtensions = usePluginLinkExtensions;
exports.usePluginLinks = usePluginLinks;
exports.useReturnToPrevious = useReturnToPrevious;
//# sourceMappingURL=index.js.map
