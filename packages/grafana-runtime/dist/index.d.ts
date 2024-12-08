/// <reference types="react" />
/// <reference types="systemjs" />
import { Observable } from 'rxjs';
import * as _grafana_data from '@grafana/data';
import { DataSourceRef, ScopedVars, DataSourceApi, DataSourceInstanceSettings, UrlQueryMap, TypedVariableModel, TimeRange, LiveChannelAddress, DataFrameJSON, StreamingFrameOptions, DataQueryRequest, LiveChannelEvent, DataQueryResponse, LiveChannelPresenceStatus, BusEventBase, BusEventWithPayload, GrafanaTheme2, PanelModel, EventBus, PluginExtension, PluginExtensionLink, PluginExtensionComponent, AngularMeta, GrafanaConfig, PanelPluginMeta, AuthSettings, BuildInfo, BootData, OAuthSettings, GrafanaTheme, FeatureToggles, LicenseInfo, SystemDateFormatSettings, MapLayerOptions, CoreApp, PanelPlugin, DataQuery, DataSourceJsonData, AdHocVariableFilter, TestDataSourceResponse, DataFrame, TimeSeries, TableData, KeyValue, DataQueryError, MetricFindValue, PanelData, FieldConfigSource, AbsoluteTimeRange, VisualizationSuggestion, QueryRunner, NavModelItem, PageLayoutType, SelectableValue, PluginMeta } from '@grafana/data';
export { StreamingFrameAction, StreamingFrameOptions } from '@grafana/data';
import { auto } from 'angular';
import * as H from 'history';
import { LogContext } from '@grafana/faro-web-sdk';
import React$1, { PureComponent } from 'react';
import { ActionMeta } from '@grafana/ui';

/**
 * Used to initiate a remote call via the {@link BackendSrv}
 *
 * @public
 */
type BackendSrvRequest = {
    /**
     * Request URL
     */
    url: string;
    /**
     * Number of times to retry the remote call if it fails.
     */
    retry?: number;
    /**
     * HTTP headers that should be passed along with the remote call.
     * Please have a look at {@link https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API | Fetch API}
     * for supported headers.
     */
    headers?: Record<string, any>;
    /**
     * HTTP verb to perform in the remote call GET, POST, PUT etc.
     */
    method?: string;
    /**
     * Set to false an success application alert box will not be shown for successful PUT, DELETE, POST requests
     */
    showSuccessAlert?: boolean;
    /**
     * Set to false to not show an application alert box for request errors
     */
    showErrorAlert?: boolean;
    /**
     * Provided by the initiator to identify a particular remote call. An example
     * of this is when a datasource plugin triggers a query. If the request id already
     * exist the backendSrv will try to cancel and replace the previous call with the
     * new one.
     */
    requestId?: string;
    /**
     * Set to to true to not include call in query inspector
     */
    hideFromInspector?: boolean;
    /**
     * The data to send
     */
    data?: any;
    /**
     * Query params
     */
    params?: Record<string, any>;
    /**
     * Define how the response object should be parsed.  See:
     *
     * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Sending_and_Receiving_Binary_Data
     *
     * By default values are json parsed from text
     */
    responseType?: 'json' | 'text' | 'arraybuffer' | 'blob';
    /**
     * The credentials read-only property of the Request interface indicates whether the user agent should send cookies from the other domain in the case of cross-origin requests.
     */
    credentials?: RequestCredentials;
    /**
     * @deprecated withCredentials is deprecated in favor of credentials
     */
    withCredentials?: boolean;
};
/**
 * Response for fetch function in {@link BackendSrv}
 *
 * @public
 */
interface FetchResponse<T = any> {
    data: T;
    readonly status: number;
    readonly statusText: string;
    readonly ok: boolean;
    readonly headers: Headers;
    readonly redirected: boolean;
    readonly type: ResponseType;
    readonly url: string;
    readonly config: BackendSrvRequest;
    readonly traceId?: string;
}
/**
 * Error type for fetch function in {@link BackendSrv}
 *
 * @public
 */
interface FetchErrorDataProps {
    message?: string;
    status?: string;
    error?: string | any;
}
/**
 * Error type for fetch function in {@link BackendSrv}
 *
 * @public
 */
interface FetchError<T = any> {
    status: number;
    statusText?: string;
    data: T;
    message?: string;
    cancelled?: boolean;
    isHandled?: boolean;
    config: BackendSrvRequest;
    traceId?: string;
}
declare function isFetchError(e: unknown): e is FetchError;
/**
 * Used to communicate via http(s) to a remote backend such as the Grafana backend,
 * a datasource etc. The BackendSrv is using the {@link https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API | Fetch API}
 * under the hood to handle all the communication.
 *
 * The request function can be used to perform a remote call by specifying a {@link BackendSrvRequest}.
 * To make the BackendSrv a bit easier to use we have added a couple of shorthand functions that will
 * use default values executing the request.
 *
 * @remarks
 * By default, Grafana displays an error message alert if the remote call fails. To prevent this from
 * happening `showErrorAlert = true` on the options object.
 *
 * @public
 */
interface BackendSrv {
    get<T = any>(url: string, params?: any, requestId?: string, options?: Partial<BackendSrvRequest>): Promise<T>;
    delete<T = unknown>(url: string, data?: unknown, options?: Partial<BackendSrvRequest>): Promise<T>;
    post<T = any>(url: string, data?: unknown, options?: Partial<BackendSrvRequest>): Promise<T>;
    patch<T = any>(url: string, data?: unknown, options?: Partial<BackendSrvRequest>): Promise<T>;
    put<T = any>(url: string, data?: unknown, options?: Partial<BackendSrvRequest>): Promise<T>;
    /**
     * @deprecated Use the `.fetch()` function instead. If you prefer to work with a promise
     * wrap the Observable returned by fetch with the lastValueFrom function, or use the get|delete|post|patch|put methods.
     * This method is going to be private from Grafana 10.
     */
    request<T = unknown>(options: BackendSrvRequest): Promise<T>;
    /**
     * Special function used to communicate with datasources that will emit core
     * events that the Grafana QueryInspector and QueryEditor is listening for to be able
     * to display datasource query information. Can be skipped by adding `option.silent`
     * when initializing the request.
     *
     * @deprecated Use the fetch function instead
     */
    datasourceRequest<T = unknown>(options: BackendSrvRequest): Promise<FetchResponse<T>>;
    /**
     * Observable http request interface
     */
    fetch<T>(options: BackendSrvRequest): Observable<FetchResponse<T>>;
}
/**
 * Used during startup by Grafana to set the BackendSrv so it is available
 * via the {@link getBackendSrv} to the rest of the application.
 *
 * @internal
 */
declare const setBackendSrv: (instance: BackendSrv) => void;
/**
 * Used to retrieve the {@link BackendSrv} that can be used to communicate
 * via http(s) to a remote backend such as the Grafana backend, a datasource etc.
 *
 * @public
 */
declare const getBackendSrv: () => BackendSrv;

/**
 * Used to enable rendering of Angular components within a
 * React component without losing proper typings.
 *
 * @example
 * ```typescript
 * class Component extends PureComponent<Props> {
 *   element: HTMLElement;
 *   angularComponent: AngularComponent;
 *
 *   componentDidMount() {
 *     const template = '<angular-component />' // angular template here;
 *     const scopeProps = { ctrl: angularController }; // angular scope properties here
 *     const loader = getAngularLoader();
 *     this.angularComponent = loader.load(this.element, scopeProps, template);
 *   }
 *
 *   componentWillUnmount() {
 *     if (this.angularComponent) {
 *       this.angularComponent.destroy();
 *     }
 *   }
 *
 *   render() {
 *     return (
 *       <div ref={element => (this.element = element)} />
 *     );
 *   }
 * }
 * ```
 *
 * @public
 */
interface AngularComponent {
    /**
     * Should be called when the React component will unmount.
     */
    destroy(): void;
    /**
     * Can be used to trigger a re-render of the Angular component.
     */
    digest(): void;
    /**
     * Used to access the Angular scope from the React component.
     */
    getScope(): any;
}
/**
 * Used to load an Angular component from the context of a React component.
 * Please see the {@link AngularComponent} for a proper example.
 *
 * @public
 */
interface AngularLoader {
    /**
     *
     * @param elem - the element that the Angular component will be loaded into.
     * @param scopeProps - values that will be accessed via the Angular scope.
     * @param template  - template used by the Angular component.
     */
    load(elem: any, scopeProps: any, template: string): AngularComponent;
}
/**
 * Used during startup by Grafana to set the AngularLoader so it is available
 * via the {@link getAngularLoader} to the rest of the application.
 *
 * @internal
 */
declare function setAngularLoader(v: AngularLoader): void;
/**
 * Used to retrieve the {@link AngularLoader} that enables the use of Angular
 * components within a React component.
 *
 * Please see the {@link AngularComponent} for a proper example.
 *
 * @public
 */
declare function getAngularLoader(): AngularLoader;

/**
 * This is the entry point for communicating with a datasource that is added as
 * a plugin (both external and internal). Via this service you will get access
 * to the {@link @grafana/data#DataSourceApi | DataSourceApi} that have a rich API for
 * communicating with the datasource.
 *
 * @public
 */
interface DataSourceSrv {
    /**
     * Returns the requested dataSource. If it cannot be found it rejects the promise.
     * @param ref - The datasource identifier, typically an object with UID and type,
     * @param scopedVars - variables used to interpolate a templated passed as name.
     */
    get(ref?: DataSourceRef | string | null, scopedVars?: ScopedVars): Promise<DataSourceApi>;
    /**
     * Get a list of data sources
     */
    getList(filters?: GetDataSourceListFilters): DataSourceInstanceSettings[];
    /**
     * Get settings and plugin metadata by name or uid
     */
    getInstanceSettings(ref?: DataSourceRef | string | null, scopedVars?: ScopedVars): DataSourceInstanceSettings | undefined;
    /**
     * Reloads the DataSourceSrv
     */
    reload(): void;
}
/** @public */
interface GetDataSourceListFilters {
    /** Include mixed data source by setting this to true */
    mixed?: boolean;
    /** Only return data sources that support metrics response */
    metrics?: boolean;
    /** Only return data sources that support tracing response */
    tracing?: boolean;
    /** Only return data sources that support logging response */
    logs?: boolean;
    /** Only return data sources that support annotations */
    annotations?: boolean;
    /** Only filter data sources that support alerting */
    alerting?: boolean;
    /**
     * By default only data sources that can be queried will be returned. Meaning they have tracing,
     * metrics, logs or annotations flag set in plugin.json file
     * */
    all?: boolean;
    /** Set to true to return dashboard data source */
    dashboard?: boolean;
    /** Set to true to return data source variables */
    variables?: boolean;
    /** filter list by plugin  */
    pluginId?: string;
    /** apply a function to filter */
    filter?: (dataSource: DataSourceInstanceSettings) => boolean;
    /** Only returns datasources matching the specified types (ie. Loki, Prometheus) */
    type?: string | string[];
}
/**
 * Used during startup by Grafana to set the DataSourceSrv so it is available
 * via the {@link getDataSourceSrv} to the rest of the application.
 *
 * @internal
 */
declare function setDataSourceSrv(instance: DataSourceSrv): void;
/**
 * Used to retrieve the {@link DataSourceSrv} that is the entry point for communicating with
 * a datasource that is added as a plugin (both external and internal).
 *
 * @public
 */
declare function getDataSourceSrv(): DataSourceSrv;

/**
 * @public
 * @deprecated in favor of {@link locationService} and will be removed in Grafana 9
 */
interface LocationUpdate {
    /**
     * Target path where you automatically wants to navigate the user.
     */
    path?: string;
    /**
     * Specify this value if you want to add values to the query string of the URL.
     */
    query?: UrlQueryMap;
    /**
     * If set to true, the query argument will be added to the existing URL.
     */
    partial?: boolean;
    /**
     * Used internally to sync the Redux state from Angular to make sure that the Redux location
     * state is in sync when navigating using the Angular router.
     *
     * @remarks
     * Do not change this unless you are the Angular router.
     *
     * @internal
     */
    routeParams?: UrlQueryMap;
    replace?: boolean;
}
/**
 * If you need to automatically navigate the user to a new place in the application this should
 * be done via the LocationSrv and it will make sure to update the application state accordingly.
 *
 * @public
 * @deprecated in favor of {@link locationService} and will be removed in Grafana 9
 */
interface LocationSrv {
    update(options: LocationUpdate): void;
}
/**
 * Used during startup by Grafana to set the LocationSrv so it is available
 * via the {@link getLocationSrv} to the rest of the application.
 *
 * @internal
 */
declare function setLocationSrv(instance: LocationSrv): void;
/**
 * Used to retrieve the {@link LocationSrv} that can be used to automatically navigate
 * the user to a new place in Grafana.
 *
 * @public
 * @deprecated in favor of {@link locationService} and will be removed in Grafana 9
 */
declare function getLocationSrv(): LocationSrv;

/**
 * Describes a size with width/height
 *
 * @public
 */
interface SizeMeta {
    width: number;
    height: number;
}
/**
 * Describes the meta information that are sent together with each event.
 *
 * @public
 */
interface EchoMeta {
    screenSize: SizeMeta;
    windowSize: SizeMeta;
    userAgent: string;
    url?: string;
    path?: string;
    /**
     * A unique browser session
     */
    sessionId: string;
    /**
     * The current users username used to login into Grafana e.g. email.
     */
    userLogin: string;
    /**
     * The current users unique identifier.
     */
    userId: number;
    /**
     * True when user is logged in into Grafana.
     */
    userSignedIn: boolean;
    /**
     * A millisecond epoch
     */
    ts: number;
    /**
     * A highres timestamp since navigation start
     */
    timeSinceNavigationStart: number;
}
/**
 * Describes echo backends that can be registered to receive of events.
 *
 * @public
 */
interface EchoBackend<T extends EchoEvent = any, O = any> {
    options: O;
    supportedEvents: EchoEventType[];
    flush: () => void;
    addEvent: (event: T) => void;
}
/**
 * Describes an echo event.
 *
 * @public
 */
interface EchoEvent<T extends EchoEventType = any, P = any> {
    type: EchoEventType;
    /**
     * Event payload containing event specific data.
     */
    payload: P;
    meta: EchoMeta;
}
/**
 * Supported echo event types that can be sent via the {@link EchoSrv}.
 *
 * @public
 */
declare enum EchoEventType {
    Performance = "performance",
    MetaAnalytics = "meta-analytics",
    Pageview = "pageview",
    Interaction = "interaction",
    ExperimentView = "experimentview",
    GrafanaJavascriptAgent = "grafana-javascript-agent"
}
/**
 * Used to send events to all the registered backends. This should be accessed via the
 * {@link getEchoSrv} function. Will, by default, flush events to the backends every
 * 10s or when the flush function is triggered.
 *
 * @public
 */
interface EchoSrv {
    /**
     * Call this to flush current events to the echo backends.
     */
    flush(): void;
    /**
     * Add a new echo backend to the list of backends that will receive events.
     */
    addBackend(backend: EchoBackend): void;
    /**
     * Call this to add event that will be sent to the echo backends upon next
     * flush.
     *
     * @param event - Object containing event information.
     * @param meta - Object that will extend/override the default meta object.
     */
    addEvent<T extends EchoEvent>(event: Omit<T, 'meta'>, meta?: {}): void;
}
/**
 * Used during startup by Grafana to set the EchoSrv so it is available
 * via the {@link getEchoSrv} to the rest of the application.
 *
 * @internal
 */
declare function setEchoSrv(instance: EchoSrv): void;
/**
 * Used to retrieve the {@link EchoSrv} that can be used to report events to registered
 * echo backends.
 *
 * @public
 */
declare function getEchoSrv(): EchoSrv;
/**
 * Used to register echo backends that will receive Grafana echo events during application
 * runtime.
 *
 * @public
 */
declare const registerEchoBackend: (backend: EchoBackend) => void;
declare class FakeEchoSrv implements EchoSrv {
    buffer: Array<{
        event: Omit<EchoEvent, 'meta'>;
        meta?: {} | undefined;
    }>;
    flush(): void;
    addBackend(backend: EchoBackend): void;
    addEvent<T extends EchoEvent>(event: Omit<T, 'meta'>, meta?: {} | undefined): void;
}

/**
 * Can be used to gain more information about an interpolation operation
 */
interface VariableInterpolation {
    /** The full matched expression including, example: ${varName.field:regex} */
    match: string;
    /** In the expression ${varName.field:regex} variableName is varName */
    variableName: string;
    /** In the expression ${varName.fields[0].name:regex} the fieldPath is fields[0].name */
    fieldPath?: string;
    /** In the expression ${varName:regex} the regex part is the format */
    format?: string;
    /** The formatted value of the variable expresion. Will equal match when variable not found or scopedVar was undefined or null **/
    value: string;
    found?: boolean;
}
/**
 * Via the TemplateSrv consumers get access to all the available template variables
 * that can be used within the current active dashboard.
 *
 * For a more in-depth description visit: https://grafana.com/docs/grafana/latest/reference/templating
 * @public
 */
interface TemplateSrv {
    /**
     * List the dashboard variables
     */
    getVariables(): TypedVariableModel[];
    /**
     * Replace the values within the target string.  See also {@link InterpolateFunction}
     *
     * Note: interpolations array is being mutated by replace function by adding information about variables that
     * have been interpolated during replacement. Variables that were specified in the target but not found in
     * the list of available variables are also added to the array. See {@link VariableInterpolation} for more details.
     *
     * @param {VariableInterpolation[]} interpolations an optional map that is updated with interpolated variables
     */
    replace(target?: string, scopedVars?: ScopedVars, format?: string | Function, interpolations?: VariableInterpolation[]): string;
    /**
     * Checks if a target contains template variables.
     */
    containsTemplate(target?: string): boolean;
    /**
     * Update the current time range to be used when interpolating __from / __to variables.
     */
    updateTimeRange(timeRange: TimeRange): void;
}
/**
 * Used during startup by Grafana to set the TemplateSrv so it is available
 * via the {@link getTemplateSrv} to the rest of the application.
 *
 * @internal
 */
declare const setTemplateSrv: (instance: TemplateSrv) => void;
/**
 * Used to retrieve the {@link TemplateSrv} that can be used to fetch available
 * template variables.
 *
 * @public
 */
declare const getTemplateSrv: () => TemplateSrv;

/**
 * Used during startup by Grafana to temporarily expose the angular injector to
 * pure javascript plugins using {@link getLegacyAngularInjector}.
 *
 * @internal
 */
declare const setLegacyAngularInjector: (instance: auto.IInjectorService) => void;
/**
 * WARNING: this function provides a temporary way for plugins to access anything in the
 * angular injector.  While the migration from angular to react continues, there are a few
 * options that do not yet have good alternatives.  Note that use of this function will
 * be removed in the future.
 *
 * @beta
 */
declare const getLegacyAngularInjector: () => auto.IInjectorService;

/**
 * @alpha -- experimental
 */
interface LiveDataFilter {
    fields?: string[];
}

/**
 * @alpha
 */
interface LiveDataStreamOptions {
    addr: LiveChannelAddress;
    frame?: DataFrameJSON;
    key?: string;
    buffer?: Partial<StreamingFrameOptions>;
    filter?: LiveDataFilter;
}
/**
 * @alpha -- experimental: send a normal query request over websockt
 */
interface LiveQueryDataOptions {
    request: DataQueryRequest;
    body: unknown;
}
/**
 * @alpha -- experimental
 */
interface GrafanaLiveSrv {
    /**
     * Listen for changes to the main service
     */
    getConnectionState(): Observable<boolean>;
    /**
     * Watch for messages in a channel
     */
    getStream<T>(address: LiveChannelAddress): Observable<LiveChannelEvent<T>>;
    /**
     * Connect to a channel and return results as DataFrames
     */
    getDataStream(options: LiveDataStreamOptions): Observable<DataQueryResponse>;
    /**
     * Execute a query over the live websocket and potentiall subscribe to a live channel.
     *
     * Since the initial request and subscription are on the same socket, this will support HA setups
     *
     * @alpha -- this function requires the feature toggle `queryOverLive` to be set
     */
    getQueryData(options: LiveQueryDataOptions): Observable<DataQueryResponse>;
    /**
     * For channels that support presence, this will request the current state from the server.
     *
     * Join and leave messages will be sent to the open stream
     */
    getPresence(address: LiveChannelAddress): Promise<LiveChannelPresenceStatus>;
    /**
     * Publish into a channel
     *
     * @alpha -- experimental
     */
    publish(address: LiveChannelAddress, data: unknown): Promise<unknown>;
}
/**
 * Used during startup by Grafana to set the GrafanaLiveSrv so it is available
 * via the {@link getGrafanaLiveSrv} to the rest of the application.
 *
 * @internal
 */
declare const setGrafanaLiveSrv: (instance: GrafanaLiveSrv) => void;
/**
 * Used to retrieve the GrafanaLiveSrv that allows you to subscribe to
 * server side events and streams
 *
 * @alpha -- experimental
 */
declare const getGrafanaLiveSrv: () => GrafanaLiveSrv;

/**
 * @public
 * A wrapper to help work with browser location and history
 */
interface LocationService {
    partial: (query: Record<string, any>, replace?: boolean) => void;
    push: (location: H.Path | H.LocationDescriptor<any>) => void;
    replace: (location: H.Path | H.LocationDescriptor<any>) => void;
    reload: () => void;
    getLocation: () => H.Location;
    getHistory: () => H.History;
    getSearch: () => URLSearchParams;
    getSearchObject: () => UrlQueryMap;
    /**
     * This is from the old LocationSrv interface
     * @deprecated use partial, push or replace instead */
    update: (update: LocationUpdate) => void;
}
/** @internal */
declare class HistoryWrapper implements LocationService {
    private readonly history;
    constructor(history?: H.History);
    getHistory(): H.History<unknown>;
    getSearch(): URLSearchParams;
    partial(query: Record<string, any>, replace?: boolean): void;
    push(location: H.Path | H.LocationDescriptor): void;
    replace(location: H.Path | H.LocationDescriptor): void;
    reload(): void;
    getLocation(): H.Location<unknown>;
    getSearchObject(): UrlQueryMap;
    /** @deprecated use partial, push or replace instead */
    update(options: LocationUpdate): void;
}
/**
 * @public
 * Parses a location search string to an object
 * */
declare function locationSearchToObject(search: string | number): UrlQueryMap;
/**
 * @public
 */
declare let locationService: LocationService;
/**
 * Used for tests only
 * @internal
 */
declare const setLocationService: (location: LocationService) => void;
/** @internal */
declare const navigationLogger: (...t: any[]) => void;

/**
 * Called when a dashboard is refreshed
 *
 * @public
 */
declare class RefreshEvent extends BusEventBase {
    static type: string;
}
/**
 * Called when the theme settings change
 *
 * @public
 */
declare class ThemeChangedEvent extends BusEventWithPayload<GrafanaTheme2> {
    static type: string;
}
/**
 * Called when time range is updated
 *
 * @public
 */
declare class TimeRangeUpdatedEvent extends BusEventWithPayload<TimeRange> {
    static type: string;
}
/**
 * Called to copy a panel JSON into local storage
 *
 * @public
 */
declare class CopyPanelEvent extends BusEventWithPayload<PanelModel> {
    static type: string;
}
/**
 * Used during startup by Grafana to set the setAppEvents so it is available
 * via the {@link setAppEvents} to the rest of the application.
 *
 * @internal
 */
declare function setAppEvents(instance: EventBus): void;
/**
 * Used to retrieve an event bus that manages application level events
 *
 * @public
 */
declare function getAppEvents(): EventBus;

type GetPluginExtensions<T = PluginExtension> = (options: GetPluginExtensionsOptions) => GetPluginExtensionsResult<T>;
type UsePluginExtensions<T = PluginExtension> = (options: GetPluginExtensionsOptions) => UsePluginExtensionsResult<T>;
type GetPluginExtensionsOptions = {
    extensionPointId: string;
    context?: object | Record<string | symbol, unknown>;
    limitPerPlugin?: number;
};
type GetPluginExtensionsResult<T = PluginExtension> = {
    extensions: T[];
};
type UsePluginExtensionsResult<T = PluginExtension> = {
    extensions: T[];
    isLoading: boolean;
};
type UsePluginComponentResult<Props = {}> = {
    component: React.ComponentType<Props> | undefined | null;
    isLoading: boolean;
};
declare function setPluginExtensionGetter(instance: GetPluginExtensions): void;
declare const getPluginExtensions: GetPluginExtensions;
declare const getPluginLinkExtensions: GetPluginExtensions<PluginExtensionLink>;
declare const getPluginComponentExtensions: <Props = {}>(options: {
    extensionPointId: string;
    limitPerPlugin?: number;
}) => {
    extensions: Array<PluginExtensionComponent<Props>>;
};

declare function setPluginExtensionsHook(hook: UsePluginExtensions): void;
/**
 * @deprecated Use either usePluginLinks() or usePluginComponents() instead.
 */
declare function usePluginExtensions(options: GetPluginExtensionsOptions): UsePluginExtensionsResult;
declare function usePluginLinks(options: GetPluginExtensionsOptions): {
    links: PluginExtensionLink[];
    isLoading: boolean;
};
declare function usePluginComponents<Props = {}>(options: GetPluginExtensionsOptions): {
    components: Array<React.ComponentType<Props>>;
    isLoading: boolean;
};
/**
 * @deprecated Use usePluginLinks() instead.
 */
declare function usePluginLinkExtensions(options: GetPluginExtensionsOptions): UsePluginExtensionsResult<PluginExtensionLink>;
/**
 * @deprecated Use usePluginComponents() instead.
 */
declare function usePluginComponentExtensions<Props = {}>(options: GetPluginExtensionsOptions): {
    extensions: Array<PluginExtensionComponent<Props>>;
    isLoading: boolean;
};

type UsePluginComponent<Props extends object = {}> = (id: string) => UsePluginComponentResult<Props>;
declare function setPluginComponentHook(hook: UsePluginComponent): void;
declare function usePluginComponent<Props extends object = {}>(id: string): UsePluginComponentResult<Props>;

declare function isPluginExtensionLink(extension: PluginExtension | undefined): extension is PluginExtensionLink;
declare function isPluginExtensionComponent(extension: PluginExtension | undefined): extension is PluginExtensionComponent;

interface AzureSettings {
    cloud?: string;
    clouds?: AzureCloudInfo[];
    managedIdentityEnabled: boolean;
    workloadIdentityEnabled: boolean;
    userIdentityEnabled: boolean;
    userIdentityFallbackCredentialsEnabled: boolean;
}
interface AzureCloudInfo {
    name: string;
    displayName: string;
}
type AppPluginConfig = {
    id: string;
    path: string;
    version: string;
    preload: boolean;
    angular: AngularMeta;
};
declare class GrafanaBootConfig implements GrafanaConfig {
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
declare const config: GrafanaBootConfig;

/**
 * Describes the basic dashboard information that can be passed as the meta
 * analytics payload.
 *
 * @public
 */
interface DashboardInfo {
    /** @deprecated -- use UID not internal ID */
    dashboardId: number;
    dashboardUid: string;
    dashboardName: string;
    folderName?: string;
}
/**
 * Describes the data request information passed as the meta analytics payload.
 *
 * @public
 */
interface DataRequestInfo extends Partial<DashboardInfo> {
    source?: CoreApp | string;
    datasourceName: string;
    datasourceId: number;
    datasourceUid: string;
    datasourceType: string;
    panelId?: number;
    panelPluginId?: string;
    panelName?: string;
    duration: number;
    error?: string;
    dataSize?: number;
}
/**
 * The meta analytics events that can be added to the echo service.
 *
 * @public
 */
declare enum MetaAnalyticsEventName {
    DashboardView = "dashboard-view",
    DataRequest = "data-request"
}
/**
 * Describes the payload of a dashboard view event.
 *
 * @public
 */
interface DashboardViewEventPayload extends DashboardInfo {
    eventName: MetaAnalyticsEventName.DashboardView;
}
/**
 * Describes the payload of a data request event.
 *
 * @public
 */
interface DataRequestEventPayload extends DataRequestInfo {
    eventName: MetaAnalyticsEventName.DataRequest;
    totalQueries?: number;
    cachedQueries?: number;
}
/**
 * Describes the meta analytics payload passed with the {@link MetaAnalyticsEvent}
 *
 * @public
 */
type MetaAnalyticsEventPayload = DashboardViewEventPayload | DataRequestEventPayload;
/**
 * Describes meta analytics event with predefined {@link EchoEventType.EchoEventType} type.
 *
 * @public
 */
interface MetaAnalyticsEvent extends EchoEvent<EchoEventType.MetaAnalytics, MetaAnalyticsEventPayload> {
}
/**
 * Describes the payload of a pageview event.
 *
 * @public
 */
interface PageviewEchoEventPayload {
    page: string;
}
/**
 * Describes pageview event with predefined {@link EchoEventType.EchoEventType} type.
 *
 * @public
 */
type PageviewEchoEvent = EchoEvent<EchoEventType.Pageview, PageviewEchoEventPayload>;
/**
 * Describes the payload of a user interaction event.
 *
 * @public
 */
interface InteractionEchoEventPayload {
    interactionName: string;
    properties?: Record<string, any>;
}
/**
 * Describes interaction event with predefined {@link EchoEventType.EchoEventType} type.
 *
 * @public
 */
type InteractionEchoEvent = EchoEvent<EchoEventType.Interaction, InteractionEchoEventPayload>;
/**
 * Describes the payload of an experimentview event.
 *
 * @public
 */
interface ExperimentViewEchoEventPayload {
    experimentId: string;
    experimentGroup: string;
    experimentVariant: string;
}
/**
 * Describes experimentview event with predefined {@link EchoEventType.EchoEventType} type.
 *
 * @public
 */
type ExperimentViewEchoEvent = EchoEvent<EchoEventType.ExperimentView, ExperimentViewEchoEventPayload>;
/**
 * Pageview event typeguard.
 *
 * @public
 */
declare const isPageviewEvent: (event: EchoEvent) => event is PageviewEchoEvent;
/**
 * Interaction event typeguard.
 *
 * @public
 */
declare const isInteractionEvent: (event: EchoEvent) => event is InteractionEchoEvent;
/**
 * Experimentview event typeguard.
 *
 * @public
 */
declare const isExperimentViewEvent: (event: EchoEvent) => event is ExperimentViewEchoEvent;

/**
 * Option to specify a plugin css that should be applied for the dark
 * and the light theme.
 *
 * @public
 */
interface PluginCssOptions {
    light: string;
    dark: string;
}
/**
 * Use this to load css for a Grafana plugin by specifying a {@link PluginCssOptions}
 * containing styling for the dark and the light theme.
 *
 * @param options - plugin styling for light and dark theme.
 * @public
 */
declare function loadPluginCss(options: PluginCssOptions): Promise<System.Module | void>;
interface PluginImportUtils {
    importPanelPlugin: (id: string) => Promise<PanelPlugin>;
    getPanelPluginFromCache: (id: string) => PanelPlugin | undefined;
}
declare function setPluginImportUtils(utils: PluginImportUtils): void;
declare function getPluginImportUtils(): PluginImportUtils;

/**
 * Helper function to report meta analytics to the {@link EchoSrv}.
 *
 * @public
 */
declare const reportMetaAnalytics: (payload: MetaAnalyticsEventPayload) => void;
/**
 * Helper function to report pageview events to the {@link EchoSrv}.
 *
 * @public
 */
declare const reportPageview: () => void;
/**
 * Helper function to report interaction events to the {@link EchoSrv}.
 *
 * @public
 */
declare const reportInteraction: (interactionName: string, properties?: Record<string, unknown>) => void;
/**
 * Helper function to report experimentview events to the {@link EchoSrv}.
 *
 * @public
 */
declare const reportExperimentView: (id: string, group: string, variant: string) => void;

declare const featureEnabled: (feature: string) => boolean;

/**
 * Log a message at INFO level
 * @public
 */
declare function logInfo(message: string, contexts?: LogContext): void;
/**
 * Log a message at WARNING level
 *
 * @public
 */
declare function logWarning(message: string, contexts?: LogContext): void;
/**
 * Log a message at DEBUG level
 *
 * @public
 */
declare function logDebug(message: string, contexts?: LogContext): void;
/**
 * Log an error
 *
 * @public
 */
declare function logError(err: Error, contexts?: LogContext): void;
/**
 * Log a measurement
 *
 * @public
 */
type MeasurementValues = Record<string, number>;
/**
 * Creates a monitoring logger with four levels of logging methods: `logDebug`, `logInfo`, `logWarning`, and `logError`.
 * These methods use `faro.api.pushX` web SDK methods to report these logs or errors to the Faro collector.
 *
 * @param {string} source - Identifier for the source of the log messages.
 * @param {LogContext} [defaultContext] - Context to be included in every log message.
 *
 * @returns {Object} Logger object with four methods:
 * - `logDebug(message: string, contexts?: LogContext)`: Logs a debug message.
 * - `logInfo(message: string, contexts?: LogContext)`: Logs an informational message.
 * - `logWarning(message: string, contexts?: LogContext)`: Logs a warning message.
 * - `logError(error: Error, contexts?: LogContext)`: Logs an error message.
 * - `logMeasurement(measurement: Omit<MeasurementEvent, 'timestamp'>, contexts?: LogContext)`: Logs a measurement.
 * Each method combines the `defaultContext` (if provided), the `source`, and an optional `LogContext` parameter into a full context that is included with the log message.
 */
declare function createMonitoringLogger(source: string, defaultContext?: LogContext): {
    /**
     * Logs a debug message with optional additional context.
     * @param {string} message - The debug message to be logged.
     * @param {LogContext} [contexts] - Optional additional context to be included.
     */
    logDebug: (message: string, contexts?: LogContext) => void;
    /**
     * Logs an informational message with optional additional context.
     * @param {string} message - The informational message to be logged.
     * @param {LogContext} [contexts] - Optional additional context to be included.
     */
    logInfo: (message: string, contexts?: LogContext) => void;
    /**
     * Logs a warning message with optional additional context.
     * @param {string} message - The warning message to be logged.
     * @param {LogContext} [contexts] - Optional additional context to be included.
     */
    logWarning: (message: string, contexts?: LogContext) => void;
    /**
     * Logs an error with optional additional context.
     * @param {Error} error - The error object to be logged.
     * @param {LogContext} [contexts] - Optional additional context to be included.
     */
    logError: (error: Error, contexts?: LogContext) => void;
    /**
     * Logs an measurement with optional additional context.
     * @param {MeasurementEvent} measurement - The measurement object to be recorded.
     * @param {LogContext} [contexts] - Optional additional context to be included.
     */
    logMeasurement: (type: string, measurement: MeasurementValues, contexts?: LogContext) => void;
};

/**
 * @public
 */
declare function isExpressionReference(ref?: DataSourceRef | string | null): boolean;
declare class HealthCheckError extends Error {
    details: HealthCheckResultDetails;
    constructor(message: string, details: HealthCheckResultDetails);
}
/**
 * Describes the current health status of a data source plugin.
 *
 * @public
 */
declare enum HealthStatus {
    Unknown = "UNKNOWN",
    OK = "OK",
    Error = "ERROR"
}
/**
 * Describes the details in the payload returned when checking the health of a data source
 * plugin.
 *
 * If the 'message' key exists, this will be displayed in the error message in DataSourceSettingsPage
 * If the 'verboseMessage' key exists, this will be displayed in the expandable details in the error message in DataSourceSettingsPage
 *
 * @public
 */
type HealthCheckResultDetails = Record<string, unknown> | undefined;
/**
 * Describes the payload returned when checking the health of a data source
 * plugin.
 *
 * @public
 */
interface HealthCheckResult {
    status: HealthStatus;
    message: string;
    details: HealthCheckResultDetails;
}
/**
 * Extend this class to implement a data source plugin that is depending on the Grafana
 * backend API.
 *
 * @public
 */
declare class DataSourceWithBackend<TQuery extends DataQuery = DataQuery, TOptions extends DataSourceJsonData = DataSourceJsonData> extends DataSourceApi<TQuery, TOptions> {
    constructor(instanceSettings: DataSourceInstanceSettings<TOptions>);
    /**
     * Ideally final -- any other implementation may not work as expected
     */
    query(request: DataQueryRequest<TQuery>): Observable<DataQueryResponse>;
    /** Get request headers with plugin ID+UID set */
    protected getRequestHeaders(): Record<string, string>;
    /**
     * Apply template variables for explore
     */
    interpolateVariablesInQueries(queries: TQuery[], scopedVars: ScopedVars, filters?: AdHocVariableFilter[]): TQuery[];
    /**
     * Override to apply template variables and adhoc filters.  The result is usually also `TQuery`, but sometimes this can
     * be used to modify the query structure before sending to the backend.
     *
     * NOTE: if you do modify the structure or use template variables, alerting queries may not work
     * as expected
     *
     * @virtual
     */
    applyTemplateVariables(query: TQuery, scopedVars: ScopedVars, filters?: AdHocVariableFilter[]): TQuery;
    /**
     * Optionally override the streaming behavior
     */
    streamOptionsProvider: StreamOptionsProvider<TQuery>;
    /**
     * Make a GET request to the datasource resource path
     */
    getResource<T = any>(path: string, params?: BackendSrvRequest['params'], options?: Partial<BackendSrvRequest>): Promise<T>;
    /**
     * Send a POST request to the datasource resource path
     */
    postResource<T = unknown>(path: string, data?: BackendSrvRequest['data'], options?: Partial<BackendSrvRequest>): Promise<T>;
    /**
     * Run the datasource healthcheck
     */
    callHealthCheck(): Promise<HealthCheckResult>;
    /**
     * Checks the plugin health
     * see public/app/features/datasources/state/actions.ts for what needs to be returned here
     */
    testDatasource(): Promise<TestDataSourceResponse>;
}
/**
 * This allows data sources to customize the streaming connection query
 *
 * @public
 */
type StreamOptionsProvider<TQuery extends DataQuery = DataQuery> = (request: DataQueryRequest<TQuery>, frame: DataFrame) => Partial<StreamingFrameOptions>;

/**
 * Single response object from a backend data source. Properties are optional but response should contain at least
 * an error or a some data (but can contain both). Main way to send data is with dataframes attribute as series and
 * tables data attributes are legacy formats.
 *
 * @internal
 */
interface DataResponse {
    error?: string;
    refId?: string;
    frames?: DataFrameJSON[];
    status?: number;
    series?: TimeSeries[];
    tables?: TableData[];
}
/**
 * This is the type of response expected form backend datasource.
 *
 * @internal
 */
interface BackendDataSourceResponse {
    results: KeyValue<DataResponse>;
}
/**
 * Parse the results from /api/ds/query into a DataQueryResponse
 *
 * @param res - the HTTP response data.
 * @param queries - optional DataQuery array that will order the response based on the order of query refId's.
 *
 * @public
 */
declare function toDataQueryResponse(res: {
    data: BackendDataSourceResponse | undefined;
} | FetchResponse<BackendDataSourceResponse | undefined> | DataQueryError, queries?: DataQuery[]): DataQueryResponse;
interface TestingStatus {
    message?: string | null;
    status?: string | null;
    details?: HealthCheckResultDetails;
}
/**
 * Return the first string or non-time field as the value
 *
 * @beta
 */
declare function frameToMetricFindValue(frame: DataFrame): MetricFindValue[];

/**
 * Describes the properties that can be passed to the PanelRenderer.
 *
 * @typeParam P - Panel options type for the panel being rendered.
 * @typeParam F - Field options type for the panel being rendered.
 *
 * @internal
 */
interface PanelRendererProps<P extends object = {}, F extends object = {}> {
    data?: PanelData;
    pluginId: string;
    title: string;
    options?: Partial<P>;
    onOptionsChange?: (options: P) => void;
    onFieldConfigChange?: (config: FieldConfigSource<F>) => void;
    onChangeTimeRange?: (timeRange: AbsoluteTimeRange) => void;
    fieldConfig?: FieldConfigSource<Partial<F>>;
    timeZone?: string;
    width: number;
    height: number;
}
/**
 * Simplified type with defaults that describes the PanelRenderer.
 *
 * @internal
 */
type PanelRendererType<P extends object = {}, F extends object = {}> = React$1.ComponentType<PanelRendererProps<P, F>>;
/**
 * PanelRenderer component that will be set via the {@link setPanelRenderer} function
 * when Grafana starts. The implementation being used during runtime lives in Grafana
 * core.
 *
 * @internal
 */
declare let PanelRenderer: PanelRendererType;

/**
 * Describes the properties that can be passed to the PanelDataErrorView.
 *
 * @alpha
 */
interface PanelDataErrorViewProps {
    message?: string;
    panelId: number;
    data: PanelData;
    fieldConfig?: FieldConfigSource;
    needsTimeField?: boolean;
    needsNumberField?: boolean;
    needsStringField?: boolean;
    suggestions?: VisualizationSuggestion[];
}
/**
 * Simplified type with defaults that describes the PanelDataErrorView.
 *
 * @internal
 */
type PanelDataErrorViewType = React$1.ComponentType<PanelDataErrorViewProps>;
/**
 * PanelDataErrorView allows panels to show a consistent error message when
 * the result structure does not meet expected criteria
 *
 * @alpha
 */
declare let PanelDataErrorView: PanelDataErrorViewType;

/**
 * Convert an object into a DataQueryError -- if this is an HTTP response,
 * it will put the correct values in the error field
 *
 * @public
 */
declare function toDataQueryError(err: DataQueryError | string | unknown): DataQueryError;

/**
 * @internal
 */
type QueryRunnerFactory = () => QueryRunner;
/**
 * Used to bootstrap the {@link createQueryRunner} during application start.
 *
 * @internal
 */
declare const setQueryRunnerFactory: (instance: QueryRunnerFactory) => void;
/**
 * Used to create QueryRunner instances from outside the core Grafana application.
 * This is helpful to be able to create a QueryRunner to execute queries in e.g. an app plugin.
 *
 * @internal
 */
declare const createQueryRunner: () => QueryRunner;
type RunRequestFn = (datasource: DataSourceApi, request: DataQueryRequest, queryFunction?: typeof datasource.query) => Observable<PanelData>;
/**
 * Used to exspose runRequest implementation to libraries, i.e. @grafana/scenes
 *
 * @internal
 */
declare function setRunRequest(fn: RunRequestFn): void;
declare function getRunRequest(): RunRequestFn;

interface PageInfoItem {
    label: string;
    value: React$1.ReactNode;
}
interface PluginPageProps {
    /** Can be used to place actions inline with the heading */
    info?: PageInfoItem[];
    /** Can be used to place actions inline with the heading */
    actions?: React$1.ReactNode;
    /** Can be used to customize rendering of title */
    renderTitle?: (title: string) => React$1.ReactNode;
    /** Shown under main heading */
    subTitle?: React$1.ReactNode;
    pageNav?: NavModelItem;
    children: React$1.ReactNode;
    layout?: PageLayoutType;
}
type PluginPageType = React$1.ComponentType<PluginPageProps>;
declare let PluginPage: PluginPageType;

/**
 * Component props description for the {@link DataSourcePicker}
 *
 * @internal
 */
interface DataSourcePickerProps {
    onChange: (ds: DataSourceInstanceSettings) => void;
    current: DataSourceRef | string | null;
    hideTextValue?: boolean;
    onBlur?: () => void;
    autoFocus?: boolean;
    openMenuOnFocus?: boolean;
    placeholder?: string;
    tracing?: boolean;
    mixed?: boolean;
    dashboard?: boolean;
    metrics?: boolean;
    type?: string | string[];
    annotations?: boolean;
    variables?: boolean;
    alerting?: boolean;
    pluginId?: string;
    /** If true,we show only DSs with logs; and if true, pluginId shouldnt be passed in */
    logs?: boolean;
    noDefault?: boolean;
    width?: number;
    inputId?: string;
    filter?: (dataSource: DataSourceInstanceSettings) => boolean;
    onClear?: () => void;
    invalid?: boolean;
    disabled?: boolean;
    isLoading?: boolean;
}
/**
 * Component state description for the {@link DataSourcePicker}
 *
 * @internal
 */
interface DataSourcePickerState {
    error?: string;
}
/**
 * Component to be able to select a datasource from the list of installed and enabled
 * datasources in the current Grafana instance.
 *
 * @internal
 */
declare class DataSourcePicker extends PureComponent<DataSourcePickerProps, DataSourcePickerState> {
    dataSourceSrv: DataSourceSrv;
    static defaultProps: Partial<DataSourcePickerProps>;
    state: DataSourcePickerState;
    constructor(props: DataSourcePickerProps);
    componentDidMount(): void;
    onChange: (item: SelectableValue<string>, actionMeta: ActionMeta) => void;
    private getCurrentValue;
    getDataSourceOptions(): {
        value: string;
        label: string;
        imgUrl: string;
        meta: _grafana_data.DataSourcePluginMeta<{}>;
    }[];
    render(): React$1.JSX.Element;
}

type PluginEventProperties = {
    grafana_version: string;
    plugin_type: string;
    plugin_version: string;
    plugin_id: string;
    plugin_name: string;
};
declare function createPluginEventProperties(meta: PluginMeta): PluginEventProperties;
type DataSourcePluginEventProperties = PluginEventProperties & {
    datasource_uid: string;
};
declare function createDataSourcePluginEventProperties(instanceSettings: DataSourceInstanceSettings): DataSourcePluginEventProperties;

declare function usePluginInteractionReporter(): typeof reportInteraction;

type ReturnToPreviousHook = () => (title: string, href?: string) => void;
declare const setReturnToPreviousHook: (hook: ReturnToPreviousHook) => void;
/**
 * Guidelines:
 * - Only use the ‘Return to previous’ functionality when the user is sent to another context, such as from Alerting to a dashboard.
 * - Specify a button title that identifies the page to return to in the most understandable way. Do not use text such as ‘Back to the previous page’. Be specific.
 */
declare const useReturnToPrevious: ReturnToPreviousHook;

interface EmbeddedDashboardProps {
    uid?: string;
    /**
     * Use this property to override initial time and variable state.
     * Example: ?from=now-5m&to=now&var-varname=value1
     */
    initialState?: string;
    /**
     * Is called when ever the internal embedded dashboards url state changes.
     * Can be used to sync the internal url state (Which is not synced to URL) with the external context, or to
     * preserve some of the state when moving to other embedded dashboards.
     */
    onStateChange?: (state: string) => void;
}
/**
 * Returns a React component that renders an embedded dashboard.
 * @alpha
 */
declare let EmbeddedDashboard: React$1.ComponentType<EmbeddedDashboardProps>;
/**
 *
 * @internal
 */
declare function setEmbeddedDashboard(component: React$1.ComponentType<EmbeddedDashboardProps>): void;

export { AngularComponent, AngularLoader, AppPluginConfig, AzureCloudInfo, AzureSettings, BackendDataSourceResponse, BackendSrv, BackendSrvRequest, CopyPanelEvent, DashboardInfo, DashboardViewEventPayload, DataRequestEventPayload, DataRequestInfo, DataResponse, DataSourcePicker, DataSourcePickerProps, DataSourcePickerState, DataSourcePluginEventProperties, DataSourceSrv, DataSourceWithBackend, EchoBackend, EchoEvent, EchoEventType, EchoMeta, EchoSrv, EmbeddedDashboard, EmbeddedDashboardProps, ExperimentViewEchoEvent, ExperimentViewEchoEventPayload, FakeEchoSrv, FetchError, FetchErrorDataProps, FetchResponse, GetDataSourceListFilters, GetPluginExtensions, GetPluginExtensionsOptions, GetPluginExtensionsResult, GrafanaBootConfig, GrafanaLiveSrv, HealthCheckError, HealthCheckResult, HealthCheckResultDetails, HealthStatus, HistoryWrapper, InteractionEchoEvent, InteractionEchoEventPayload, LiveDataFilter, LiveDataStreamOptions, LiveQueryDataOptions, LocationService, LocationSrv, LocationUpdate, MetaAnalyticsEvent, MetaAnalyticsEventName, MetaAnalyticsEventPayload, PageviewEchoEvent, PageviewEchoEventPayload, PanelDataErrorView, PanelDataErrorViewProps, PanelRenderer, PanelRendererProps, PluginCssOptions, PluginEventProperties, PluginPage, PluginPageProps, PluginPageType, QueryRunnerFactory, RefreshEvent, SizeMeta, StreamOptionsProvider, TemplateSrv, TestingStatus, ThemeChangedEvent, TimeRangeUpdatedEvent, UsePluginComponentResult, UsePluginExtensions, UsePluginExtensionsResult, VariableInterpolation, config, createDataSourcePluginEventProperties, createMonitoringLogger, createPluginEventProperties, createQueryRunner, featureEnabled, frameToMetricFindValue, getAngularLoader, getAppEvents, getBackendSrv, getDataSourceSrv, getEchoSrv, getGrafanaLiveSrv, getLegacyAngularInjector, getLocationSrv, getPluginComponentExtensions, getPluginExtensions, getPluginImportUtils, getPluginLinkExtensions, getRunRequest, getTemplateSrv, isExperimentViewEvent, isExpressionReference, isFetchError, isInteractionEvent, isPageviewEvent, isPluginExtensionComponent, isPluginExtensionLink, loadPluginCss, locationSearchToObject, locationService, logDebug, logError, logInfo, logWarning, navigationLogger, registerEchoBackend, reportExperimentView, reportInteraction, reportMetaAnalytics, reportPageview, setAngularLoader, setAppEvents, setBackendSrv, setDataSourceSrv, setEchoSrv, setEmbeddedDashboard, setGrafanaLiveSrv, setLegacyAngularInjector, setLocationService, setLocationSrv, setPluginComponentHook, setPluginExtensionGetter, setPluginExtensionsHook, setPluginImportUtils, setQueryRunnerFactory, setReturnToPreviousHook, setRunRequest, setTemplateSrv, toDataQueryError, toDataQueryResponse, usePluginComponent, usePluginComponentExtensions, usePluginComponents, usePluginExtensions, usePluginInteractionReporter, usePluginLinkExtensions, usePluginLinks, useReturnToPrevious };
