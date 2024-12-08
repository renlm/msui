import { merge } from 'lodash';
import { systemDateFormats, getThemeById } from '@grafana/data';

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class GrafanaBootConfig {
  constructor(options2) {
    __publicField(this, "publicDashboardAccessToken");
    __publicField(this, "publicDashboardsEnabled", true);
    __publicField(this, "snapshotEnabled", true);
    __publicField(this, "datasources", {});
    __publicField(this, "panels", {});
    __publicField(this, "apps", {});
    __publicField(this, "auth", {});
    __publicField(this, "minRefreshInterval", "");
    __publicField(this, "appUrl", "");
    __publicField(this, "appSubUrl", "");
    __publicField(this, "namespace", "default");
    __publicField(this, "windowTitlePrefix", "");
    __publicField(this, "buildInfo");
    __publicField(this, "newPanelTitle", "");
    __publicField(this, "bootData");
    __publicField(this, "externalUserMngLinkUrl", "");
    __publicField(this, "externalUserMngLinkName", "");
    __publicField(this, "externalUserMngInfo", "");
    __publicField(this, "allowOrgCreate", false);
    __publicField(this, "feedbackLinksEnabled", true);
    __publicField(this, "disableLoginForm", false);
    __publicField(this, "defaultDatasource", "");
    // UID
    __publicField(this, "angularSupportEnabled", false);
    __publicField(this, "authProxyEnabled", false);
    __publicField(this, "exploreEnabled", false);
    __publicField(this, "queryHistoryEnabled", false);
    __publicField(this, "helpEnabled", false);
    __publicField(this, "profileEnabled", false);
    __publicField(this, "newsFeedEnabled", true);
    __publicField(this, "ldapEnabled", false);
    __publicField(this, "jwtHeaderName", "");
    __publicField(this, "jwtUrlLogin", false);
    __publicField(this, "sigV4AuthEnabled", false);
    __publicField(this, "azureAuthEnabled", false);
    __publicField(this, "secureSocksDSProxyEnabled", false);
    __publicField(this, "samlEnabled", false);
    __publicField(this, "samlName", "");
    __publicField(this, "autoAssignOrg", true);
    __publicField(this, "verifyEmailEnabled", false);
    __publicField(this, "oauth", {});
    __publicField(this, "rbacEnabled", true);
    __publicField(this, "disableUserSignUp", false);
    __publicField(this, "loginHint", "");
    __publicField(this, "passwordHint", "");
    __publicField(this, "loginError");
    __publicField(this, "viewersCanEdit", false);
    __publicField(this, "editorsCanAdmin", false);
    __publicField(this, "disableSanitizeHtml", false);
    __publicField(this, "trustedTypesDefaultPolicyEnabled", false);
    __publicField(this, "cspReportOnlyEnabled", false);
    __publicField(this, "liveEnabled", true);
    /** @deprecated Use `theme2` instead. */
    __publicField(this, "theme");
    __publicField(this, "theme2");
    __publicField(this, "featureToggles", {});
    __publicField(this, "anonymousEnabled", false);
    __publicField(this, "anonymousDeviceLimit");
    __publicField(this, "licenseInfo", {});
    __publicField(this, "rendererAvailable", false);
    __publicField(this, "rendererVersion", "");
    __publicField(this, "rendererDefaultImageWidth", 1e3);
    __publicField(this, "rendererDefaultImageHeight", 500);
    __publicField(this, "rendererDefaultImageScale", 1);
    __publicField(this, "secretsManagerPluginEnabled", false);
    __publicField(this, "supportBundlesEnabled", false);
    __publicField(this, "http2Enabled", false);
    __publicField(this, "dateFormats");
    __publicField(this, "grafanaJavascriptAgent", {
      enabled: false,
      customEndpoint: "",
      apiKey: "",
      errorInstrumentalizationEnabled: true,
      consoleInstrumentalizationEnabled: false,
      webVitalsInstrumentalizationEnabled: false
    });
    __publicField(this, "pluginCatalogURL", "https://grafana.com/grafana/plugins/");
    __publicField(this, "pluginAdminEnabled", true);
    __publicField(this, "pluginAdminExternalManageEnabled", false);
    __publicField(this, "pluginCatalogHiddenPlugins", []);
    __publicField(this, "pluginsCDNBaseURL", "");
    __publicField(this, "expressionsEnabled", false);
    __publicField(this, "customTheme");
    __publicField(this, "awsAllowedAuthProviders", []);
    __publicField(this, "awsAssumeRoleEnabled", false);
    __publicField(this, "azure", {
      managedIdentityEnabled: false,
      workloadIdentityEnabled: false,
      userIdentityEnabled: false,
      userIdentityFallbackCredentialsEnabled: false
    });
    __publicField(this, "caching", {
      enabled: false
    });
    __publicField(this, "geomapDefaultBaseLayerConfig");
    __publicField(this, "geomapDisableCustomBaseLayer");
    __publicField(this, "unifiedAlertingEnabled", false);
    __publicField(this, "unifiedAlerting", {
      minInterval: "",
      alertStateHistoryBackend: void 0,
      alertStateHistoryPrimary: void 0
    });
    __publicField(this, "applicationInsightsConnectionString");
    __publicField(this, "applicationInsightsEndpointUrl");
    __publicField(this, "recordedQueries", {
      enabled: true
    });
    __publicField(this, "featureHighlights", {
      enabled: false
    });
    __publicField(this, "reporting", {
      enabled: true
    });
    __publicField(this, "analytics", {
      enabled: true
    });
    __publicField(this, "googleAnalyticsId");
    __publicField(this, "googleAnalytics4Id");
    __publicField(this, "googleAnalytics4SendManualPageViews", false);
    __publicField(this, "rudderstackWriteKey");
    __publicField(this, "rudderstackDataPlaneUrl");
    __publicField(this, "rudderstackSdkUrl");
    __publicField(this, "rudderstackConfigUrl");
    __publicField(this, "rudderstackIntegrationsUrl");
    __publicField(this, "sqlConnectionLimits", {
      maxOpenConns: 100,
      maxIdleConns: 100,
      connMaxLifetime: 14400
    });
    __publicField(this, "tokenExpirationDayLimit");
    __publicField(this, "disableFrontendSandboxForPlugins", []);
    __publicField(this, "sharedWithMeFolderUID");
    __publicField(this, "rootFolderUID");
    __publicField(this, "localFileSystemAvailable");
    __publicField(this, "cloudMigrationIsTarget");
    /**
     * Language used in Grafana's UI. This is after the user's preference (or deteceted locale) is resolved to one of
     * Grafana's supported language.
     */
    __publicField(this, "language");
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
    merge(this, defaults, options2);
    this.buildInfo = options2.buildInfo || defaults.buildInfo;
    if (this.dateFormats) {
      systemDateFormats.update(this.dateFormats);
    }
    overrideFeatureTogglesFromUrl(this);
    overrideFeatureTogglesFromLocalStorage(this);
    if (this.featureToggles.disableAngular) {
      this.angularSupportEnabled = false;
    }
    this.theme2 = getThemeById(this.bootData.user.theme);
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

export { GrafanaBootConfig, config };
//# sourceMappingURL=config.js.map
