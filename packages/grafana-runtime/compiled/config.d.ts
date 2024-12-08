import { AuthSettings, BootData, BuildInfo, DataSourceInstanceSettings, FeatureToggles, GrafanaConfig, GrafanaTheme, GrafanaTheme2, LicenseInfo, MapLayerOptions, OAuthSettings, PanelPluginMeta, SystemDateFormatSettings, AngularMeta } from '@grafana/data';
export interface AzureSettings {
    cloud?: string;
    clouds?: AzureCloudInfo[];
    managedIdentityEnabled: boolean;
    workloadIdentityEnabled: boolean;
    userIdentityEnabled: boolean;
    userIdentityFallbackCredentialsEnabled: boolean;
}
export interface AzureCloudInfo {
    name: string;
    displayName: string;
}
export type AppPluginConfig = {
    id: string;
    path: string;
    version: string;
    preload: boolean;
    angular: AngularMeta;
};
export declare class GrafanaBootConfig implements GrafanaConfig {
    publicDashboardAccessToken?: string;
    publicDashboardsEnabled: boolean;
    snapshotEnabled: boolean;
    datasources: {
        [str: string]: DataSourceInstanceSettings;
    };
    panels: {
        [key: string]: PanelPluginMeta;
    };
    apps: Record<string, AppPluginConfig>;
    auth: AuthSettings;
    minRefreshInterval: string;
    appUrl: string;
    appSubUrl: string;
    namespace: string;
    windowTitlePrefix: string;
    buildInfo: BuildInfo;
    newPanelTitle: string;
    bootData: BootData;
    externalUserMngLinkUrl: string;
    externalUserMngLinkName: string;
    externalUserMngInfo: string;
    allowOrgCreate: boolean;
    feedbackLinksEnabled: boolean;
    disableLoginForm: boolean;
    defaultDatasource: string;
    angularSupportEnabled: boolean;
    authProxyEnabled: boolean;
    exploreEnabled: boolean;
    queryHistoryEnabled: boolean;
    helpEnabled: boolean;
    profileEnabled: boolean;
    newsFeedEnabled: boolean;
    ldapEnabled: boolean;
    jwtHeaderName: string;
    jwtUrlLogin: boolean;
    sigV4AuthEnabled: boolean;
    azureAuthEnabled: boolean;
    secureSocksDSProxyEnabled: boolean;
    samlEnabled: boolean;
    samlName: string;
    autoAssignOrg: boolean;
    verifyEmailEnabled: boolean;
    oauth: OAuthSettings;
    rbacEnabled: boolean;
    disableUserSignUp: boolean;
    loginHint: string;
    passwordHint: string;
    loginError: string | undefined;
    viewersCanEdit: boolean;
    editorsCanAdmin: boolean;
    disableSanitizeHtml: boolean;
    trustedTypesDefaultPolicyEnabled: boolean;
    cspReportOnlyEnabled: boolean;
    liveEnabled: boolean;
    /** @deprecated Use `theme2` instead. */
    theme: GrafanaTheme;
    theme2: GrafanaTheme2;
    featureToggles: FeatureToggles;
    anonymousEnabled: boolean;
    anonymousDeviceLimit: number | undefined;
    licenseInfo: LicenseInfo;
    rendererAvailable: boolean;
    rendererVersion: string;
    rendererDefaultImageWidth: number;
    rendererDefaultImageHeight: number;
    rendererDefaultImageScale: number;
    secretsManagerPluginEnabled: boolean;
    supportBundlesEnabled: boolean;
    http2Enabled: boolean;
    dateFormats?: SystemDateFormatSettings;
    grafanaJavascriptAgent: {
        enabled: boolean;
        customEndpoint: string;
        apiKey: string;
        errorInstrumentalizationEnabled: boolean;
        consoleInstrumentalizationEnabled: boolean;
        webVitalsInstrumentalizationEnabled: boolean;
    };
    pluginCatalogURL: string;
    pluginAdminEnabled: boolean;
    pluginAdminExternalManageEnabled: boolean;
    pluginCatalogHiddenPlugins: string[];
    pluginsCDNBaseURL: string;
    expressionsEnabled: boolean;
    customTheme?: undefined;
    awsAllowedAuthProviders: string[];
    awsAssumeRoleEnabled: boolean;
    azure: AzureSettings;
    caching: {
        enabled: boolean;
    };
    geomapDefaultBaseLayerConfig?: MapLayerOptions;
    geomapDisableCustomBaseLayer?: boolean;
    unifiedAlertingEnabled: boolean;
    unifiedAlerting: {
        minInterval: string;
        alertStateHistoryBackend: undefined;
        alertStateHistoryPrimary: undefined;
    };
    applicationInsightsConnectionString?: string;
    applicationInsightsEndpointUrl?: string;
    recordedQueries: {
        enabled: boolean;
    };
    featureHighlights: {
        enabled: boolean;
    };
    reporting: {
        enabled: boolean;
    };
    analytics: {
        enabled: boolean;
    };
    googleAnalyticsId: undefined;
    googleAnalytics4Id: undefined;
    googleAnalytics4SendManualPageViews: boolean;
    rudderstackWriteKey: undefined;
    rudderstackDataPlaneUrl: undefined;
    rudderstackSdkUrl: undefined;
    rudderstackConfigUrl: undefined;
    rudderstackIntegrationsUrl: undefined;
    sqlConnectionLimits: {
        maxOpenConns: number;
        maxIdleConns: number;
        connMaxLifetime: number;
    };
    tokenExpirationDayLimit: undefined;
    disableFrontendSandboxForPlugins: string[];
    sharedWithMeFolderUID: string | undefined;
    rootFolderUID: string | undefined;
    localFileSystemAvailable: boolean | undefined;
    cloudMigrationIsTarget: boolean | undefined;
    /**
     * Language used in Grafana's UI. This is after the user's preference (or deteceted locale) is resolved to one of
     * Grafana's supported language.
     */
    language: string | undefined;
    constructor(options: GrafanaBootConfig);
}
/**
 * Use this to access the {@link GrafanaBootConfig} for the current running Grafana instance.
 *
 * @public
 */
export declare const config: GrafanaBootConfig;
