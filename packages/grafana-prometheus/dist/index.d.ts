/// <reference types="react" />
import * as React from 'react';
import React__default, { ComponentType, ReactNode } from 'react';
import * as _grafana_data from '@grafana/data';
import { ScopeSpec, Scope, ScopeSpecFilter, DataSourceApi, TimeRange, SelectableValue, DataSourceJsonData, LanguageProvider, AbstractQuery, DataQueryRequest, DataFrame, DataSourceWithQueryImportSupport, DataSourceWithQueryExportSupport, DataSourceInstanceSettings, QueryVariableModel, CustomVariableModel, DataQueryResponse, LegacyMetricFindQueryOptions, MetricFindValue, AnnotationQueryRequest, AnnotationEvent, DataSourceGetTagKeysOptions, DataSourceGetTagValuesOptions, ScopedVars, AdHocVariableFilter, QueryFixAction, CoreApp, QueryEditorProps, HistoryItem, AnnotationQuery, QueryEditorHelpProps, GrafanaTheme2, DataSourcePluginOptionsEditorProps, DataSourceSettings, DataQuery as DataQuery$1, PanelData, QueryHint, CustomVariableSupport } from '@grafana/data';
import * as common from '@grafana/schema';
import { DataQuery } from '@grafana/schema';
import { Observable } from 'rxjs';
import { BackendSrvRequest, DataSourceWithBackend, TemplateSrv, FetchResponse, BackendDataSourceResponse } from '@grafana/runtime';
import Prism, { Grammar } from 'prismjs';

declare enum QueryEditorMode$1 {
    Builder = "builder",
    Code = "code"
}
type PromQueryFormat = 'time_series' | 'table' | 'heatmap';
interface Prometheus extends common.DataQuery {
    /**
     * Specifies which editor is being used to prepare the query. It can be "code" or "builder"
     */
    editorMode?: QueryEditorMode$1;
    /**
     * Execute an additional query to identify interesting raw samples relevant for the given expr
     */
    exemplar?: boolean;
    /**
     * The actual expression/query that will be evaluated by Prometheus
     */
    expr: string;
    /**
     * Query format to determine how to display data points in panel. It can be "time_series", "table", "heatmap"
     */
    format?: PromQueryFormat;
    /**
     * Returns only the latest value that Prometheus has scraped for the requested time series
     */
    instant?: boolean;
    /**
     * @deprecated Used to specify how many times to divide max data points by. We use max data points under query options
     * See https://github.com/grafana/grafana/issues/48081
     */
    intervalFactor?: number;
    /**
     * Series name override or template. Ex. {{hostname}} will be replaced with label value for hostname
     */
    legendFormat?: string;
    /**
     * Returns a Range vector, comprised of a set of time series containing a range of data points over time for each time series
     */
    range?: boolean;
    scopes?: Array<ScopeSpec & Pick<Scope['metadata'], 'name'>>;
    adhocFilters?: ScopeSpecFilter[];
    groupByKeys?: string[];
}

type LabelOperator = '=' | '!=' | '=~' | '!~';
type Label = {
    name: string;
    value: string;
    op: LabelOperator;
};

/**
 * Shared types that can be reused by Loki and other data sources
 */

interface QueryBuilderLabelFilter {
    label: string;
    op: string;
    value: string;
}
interface QueryBuilderOperation {
    id: string;
    params: QueryBuilderOperationParamValue[];
}
type QueryBuilderOperationParamValue = string | number | boolean;
interface QueryBuilderOperationParamDef {
    name: string;
    type: 'string' | 'number' | 'boolean';
    options?: string[] | number[] | Array<SelectableValue<string>>;
    hideName?: boolean;
    restParam?: boolean;
    optional?: boolean;
    placeholder?: string;
    description?: string;
    minWidth?: number;
    editor?: ComponentType<QueryBuilderOperationParamEditorProps>;
    runQueryOnEnter?: boolean;
}
interface QueryBuilderOperationParamEditorProps {
    value?: QueryBuilderOperationParamValue;
    paramDef: QueryBuilderOperationParamDef;
    /** Parameter index */
    index: number;
    operation: QueryBuilderOperation;
    operationId: string;
    query: any;
    datasource: DataSourceApi;
    timeRange?: TimeRange;
    onChange: (index: number, value: QueryBuilderOperationParamValue) => void;
    onRunQuery: () => void;
}
declare enum QueryEditorMode {
    Code = "code",
    Builder = "builder"
}

interface PromQuery extends Prometheus, DataQuery {
    /**
     * Timezone offset to align start & end time on backend
     */
    utcOffsetSec?: number;
    valueWithRefId?: boolean;
    showingGraph?: boolean;
    showingTable?: boolean;
    hinting?: boolean;
    interval?: string;
    useBackend?: boolean;
    disableTextWrap?: boolean;
    fullMetaSearch?: boolean;
    includeNullMetadata?: boolean;
}
declare enum PrometheusCacheLevel {
    Low = "Low",
    Medium = "Medium",
    High = "High",
    None = "None"
}
declare enum PromApplication {
    Cortex = "Cortex",
    Mimir = "Mimir",
    Prometheus = "Prometheus",
    Thanos = "Thanos"
}
interface PromOptions extends DataSourceJsonData {
    timeInterval?: string;
    queryTimeout?: string;
    httpMethod?: string;
    customQueryParameters?: string;
    disableMetricsLookup?: boolean;
    exemplarTraceIdDestinations?: ExemplarTraceIdDestination[];
    prometheusType?: PromApplication;
    prometheusVersion?: string;
    cacheLevel?: PrometheusCacheLevel;
    defaultEditor?: QueryEditorMode;
    incrementalQuerying?: boolean;
    incrementalQueryOverlapWindow?: string;
    disableRecordingRules?: boolean;
    sigV4Auth?: boolean;
    oauthPassThru?: boolean;
    codeModeMetricNamesSuggestionLimit?: number;
}
type ExemplarTraceIdDestination = {
    name: string;
    url?: string;
    urlDisplayLabel?: string;
    datasourceUid?: string;
};
interface PromQueryRequest extends PromQuery {
    step?: number;
    requestId?: string;
    start: number;
    end: number;
    headers?: any;
}
interface PromMetricsMetadataItem {
    type: string;
    help: string;
    unit?: string;
}
interface PromMetricsMetadata {
    [metric: string]: PromMetricsMetadataItem;
}
type PromValue = [number, any];
interface PromMetric {
    __name__?: string;
    [index: string]: any;
}
interface PromBuildInfoResponse {
    data: {
        application?: string;
        version: string;
        revision: string;
        features?: {
            ruler_config_api?: 'true' | 'false';
            alertmanager_config_api?: 'true' | 'false';
            query_sharding?: 'true' | 'false';
            federated_rules?: 'true' | 'false';
        };
        [key: string]: unknown;
    };
    status: 'success';
}
/**
 * Auto = query.legendFormat == '__auto'
 * Verbose = query.legendFormat == null/undefined/''
 * Custom query.legendFormat.length > 0 && query.legendFormat !== '__auto'
 */
declare enum LegendFormatMode {
    Auto = "__auto",
    Verbose = "__verbose",
    Custom = "__custom"
}
declare enum PromVariableQueryType {
    LabelNames = 0,
    LabelValues = 1,
    MetricNames = 2,
    VarQueryResult = 3,
    SeriesQuery = 4,
    ClassicQuery = 5
}
interface PromVariableQuery extends DataQuery {
    query?: string;
    expr?: string;
    qryType?: PromVariableQueryType;
    label?: string;
    metric?: string;
    varQuery?: string;
    seriesQuery?: string;
    labelFilters?: QueryBuilderLabelFilter[];
    match?: string;
    classicQuery?: string;
}
type StandardPromVariableQuery = {
    query: string;
    refId: string;
};

declare class PromQlLanguageProvider extends LanguageProvider {
    histogramMetrics: string[];
    timeRange: TimeRange;
    metrics: string[];
    metricsMetadata?: PromMetricsMetadata;
    startTask: Promise<any>;
    datasource: PrometheusDatasource;
    labelKeys: string[];
    labelFetchTs: number;
    constructor(datasource: PrometheusDatasource, initialValues?: Partial<PromQlLanguageProvider>);
    getDefaultCacheHeaders(): {
        headers: {
            'X-Grafana-Cache': string;
        };
    } | undefined;
    cleanText(s: string): string;
    get syntax(): Prism.Grammar;
    request: (url: string, defaultValue: any, params?: {}, options?: Partial<BackendSrvRequest>) => Promise<any>;
    start: (timeRange?: TimeRange) => Promise<any[]>;
    loadMetricsMetadata(): Promise<void>;
    getLabelKeys(): string[];
    importFromAbstractQuery(labelBasedQuery: AbstractQuery): PromQuery;
    exportToAbstractQuery(query: PromQuery): AbstractQuery;
    getSeries(selector: string, withName?: boolean): Promise<Record<string, string[]>>;
    /**
     * @param key
     */
    fetchLabelValues: (key: string) => Promise<string[]>;
    getLabelValues(key: string): Promise<string[]>;
    /**
     * Fetches all label keys
     */
    fetchLabels: (timeRange?: TimeRange, queries?: PromQuery[]) => Promise<string[]>;
    /**
     * Gets series values
     * Function to replace old getSeries calls in a way that will provide faster endpoints for new prometheus instances,
     * while maintaining backward compatability
     * @param labelName
     * @param selector
     */
    getSeriesValues: (labelName: string, selector: string) => Promise<string[]>;
    /**
     * Fetches all values for a label, with optional match[]
     * @param name
     * @param match
     * @param timeRange
     * @param requestId
     */
    fetchSeriesValuesWithMatch: (name: string, match: string, requestId?: string, timeRange?: TimeRange) => Promise<string[]>;
    /**
     * Gets series labels
     * Function to replace old getSeries calls in a way that will provide faster endpoints for new prometheus instances,
     * while maintaining backward compatability. The old API call got the labels and the values in a single query,
     * but with the new query we need two calls, one to get the labels, and another to get the values.
     *
     * @param selector
     * @param otherLabels
     */
    getSeriesLabels: (selector: string, otherLabels: Label[]) => Promise<string[]>;
    /**
     * Fetch labels using the best endpoint that datasource supports.
     * This is cached by its args but also by the global timeRange currently selected as they can change over requested time.
     * @param name
     * @param withName
     */
    fetchLabelsWithMatch: (name: string, withName?: boolean) => Promise<Record<string, string[]>>;
    /**
     * Fetch labels for a series using /series endpoint. This is cached by its args but also by the global timeRange currently selected as
     * they can change over requested time.
     * @param name
     * @param withName
     */
    fetchSeriesLabels: (name: string, withName?: boolean) => Promise<Record<string, string[]>>;
    /**
     * Fetch labels for a series using /labels endpoint.  This is cached by its args but also by the global timeRange currently selected as
     * they can change over requested time.
     * @param name
     * @param withName
     */
    fetchSeriesLabelsMatch: (name: string, withName?: boolean) => Promise<Record<string, string[]>>;
    /**
     * Fetch series for a selector. Use this for raw results. Use fetchSeriesLabels() to get labels.
     * @param match
     */
    fetchSeries: (match: string) => Promise<Array<Record<string, string>>>;
    /**
     * Fetch this only one as we assume this won't change over time. This is cached differently from fetchSeriesLabels
     * because we can cache more aggressively here and also we do not want to invalidate this cache the same way as in
     * fetchSeriesLabels.
     */
    fetchDefaultSeries: () => Promise<{}>;
}

type TargetIdent = string;
type TargetSig = string;
type TimestampMs = number;
type SupportedQueryTypes = PromQuery;
interface TargetCache {
    sig: TargetSig;
    prevTo: TimestampMs;
    frames: DataFrame[];
}
interface CacheRequestInfo<T extends SupportedQueryTypes> {
    requests: Array<DataQueryRequest<T>>;
    targSigs: Map<TargetIdent, TargetSig>;
    shouldCache: boolean;
}
interface DatasourceProfileData {
    interval?: string;
    expr: string;
    datasource: string;
}
interface ProfileData extends DatasourceProfileData {
    identity: string;
    bytes: number | null;
    dashboardUID: string;
    panelId?: number;
    from: string;
    queryRangeSeconds: number;
    refreshIntervalMs: number;
}
/**
 * NOMENCLATURE
 * Target: The request target (DataQueryRequest), i.e. a specific query reference within a panel
 * Ident: Identity: the string that is not expected to change
 * Sig: Signature: the string that is expected to change, upon which we wipe the cache fields
 */
declare class QueryCache<T extends SupportedQueryTypes> {
    private overlapWindowMs;
    private getTargetSignature;
    private getProfileData?;
    private perfObeserver?;
    private shouldProfile;
    sendEventsInterval: number;
    pendingRequestIdsToTargSigs: Map<string, ProfileData>;
    pendingAccumulatedEvents: Map<string, {
        requestCount: number;
        savedBytesTotal: number;
        initialRequestSize: number;
        lastRequestSize: number;
        panelId: string;
        dashId: string;
        expr: string;
        refreshIntervalMs: number;
        sent: boolean;
        datasource: string;
        from: string;
        queryRangeSeconds: number;
    }>;
    cache: Map<string, TargetCache>;
    constructor(options: {
        getTargetSignature: (request: DataQueryRequest<T>, target: T) => string;
        overlapString: string;
        profileFunction?: (request: DataQueryRequest<T>, target: T) => DatasourceProfileData;
    });
    private profile;
    sendPendingTrackingEvents: () => void;
    requestInfo(request: DataQueryRequest<T>): CacheRequestInfo<T>;
    procFrames(request: DataQueryRequest<T>, requestInfo: CacheRequestInfo<T> | undefined, respFrames: DataFrame[]): DataFrame[];
}

declare const InstantQueryRefIdIndex = "-Instant";
declare class PrometheusDatasource extends DataSourceWithBackend<PromQuery, PromOptions> implements DataSourceWithQueryImportSupport<PromQuery>, DataSourceWithQueryExportSupport<PromQuery> {
    private readonly templateSrv;
    type: string;
    ruleMappings: {
        [index: string]: string;
    };
    hasIncrementalQuery: boolean;
    url: string;
    id: number;
    access: 'direct' | 'proxy';
    basicAuth: any;
    withCredentials: boolean;
    interval: string;
    httpMethod: string;
    languageProvider: PromQlLanguageProvider;
    exemplarTraceIdDestinations: ExemplarTraceIdDestination[] | undefined;
    lookupsDisabled: boolean;
    customQueryParameters: URLSearchParams;
    datasourceConfigurationPrometheusFlavor?: PromApplication;
    datasourceConfigurationPrometheusVersion?: string;
    disableRecordingRules: boolean;
    defaultEditor?: QueryEditorMode;
    exemplarsAvailable: boolean;
    cacheLevel: PrometheusCacheLevel;
    cache: QueryCache<PromQuery>;
    metricNamesAutocompleteSuggestionLimit: number;
    constructor(instanceSettings: DataSourceInstanceSettings<PromOptions>, templateSrv?: TemplateSrv, languageProvider?: PromQlLanguageProvider);
    init: () => Promise<void>;
    getQueryDisplayText(query: PromQuery): string;
    getPrometheusProfileData(request: DataQueryRequest<PromQuery>, targ: PromQuery): {
        interval: string;
        expr: string;
        datasource: string;
    };
    /**
     * Get target signature for query caching
     * @param request
     * @param query
     */
    getPrometheusTargetSignature(request: DataQueryRequest<PromQuery>, query: PromQuery): string;
    hasLabelsMatchAPISupport(): boolean;
    _isDatasourceVersionGreaterOrEqualTo(targetVersion: string, targetFlavor: PromApplication): boolean;
    _addTracingHeaders(httpOptions: PromQueryRequest, options: DataQueryRequest<PromQuery>): void;
    directAccessError(): Observable<never>;
    /**
     * Any request done from this data source should go through here as it contains some common processing for the
     * request. Any processing done here needs to be also copied on the backend as this goes through data source proxy
     * but not through the same code as alerting.
     */
    _request<T = unknown>(url: string, data: Record<string, string> | null, overrides?: Partial<BackendSrvRequest>): Observable<FetchResponse<T>>;
    importFromAbstractQueries(abstractQueries: AbstractQuery[]): Promise<PromQuery[]>;
    exportToAbstractQueries(queries: PromQuery[]): Promise<AbstractQuery[]>;
    metadataRequest<T = any>(url: string, params?: {}, options?: Partial<BackendSrvRequest>): Promise<FetchResponse<T>>;
    interpolateQueryExpr(value: string | string[] | undefined, variable: QueryVariableModel | CustomVariableModel): string | string[];
    targetContainsTemplate(target: PromQuery): boolean;
    shouldRunExemplarQuery(target: PromQuery, request: DataQueryRequest<PromQuery>): boolean;
    processTargetV2(target: PromQuery, request: DataQueryRequest<PromQuery>): PromQuery[];
    query(request: DataQueryRequest<PromQuery>): Observable<DataQueryResponse>;
    metricFindQuery(query: string, options?: LegacyMetricFindQueryOptions): Promise<MetricFindValue[]>;
    getRangeScopedVars(range: TimeRange): {
        __range_ms: {
            text: number;
            value: number;
        };
        __range_s: {
            text: number;
            value: number;
        };
        __range: {
            text: string;
            value: string;
        };
    };
    annotationQuery(options: AnnotationQueryRequest<PromQuery>): Promise<AnnotationEvent[]>;
    processAnnotationResponse: (options: AnnotationQueryRequest<PromQuery>, data: BackendDataSourceResponse) => AnnotationEvent[];
    getTagKeys(options: DataSourceGetTagKeysOptions<PromQuery>): Promise<MetricFindValue[]>;
    getTagValues(options: DataSourceGetTagValuesOptions<PromQuery>): Promise<any>;
    interpolateVariablesInQueries(queries: PromQuery[], scopedVars: ScopedVars, filters?: AdHocVariableFilter[]): PromQuery[];
    getQueryHints(query: PromQuery, result: unknown[]): _grafana_data.QueryHint[];
    getInitHints(): _grafana_data.QueryHint[];
    loadRules(): Promise<void>;
    areExemplarsAvailable(): Promise<boolean>;
    modifyQuery(query: PromQuery, action: QueryFixAction): PromQuery;
    /**
     * Returns the adjusted "snapped" interval parameters
     */
    getAdjustedInterval(timeRange: TimeRange): {
        start: string;
        end: string;
    };
    /**
     * This will return a time range that always includes the users current time range,
     * and then a little extra padding to round up/down to the nearest nth minute,
     * defined by the result of the getCacheDurationInMinutes.
     *
     * For longer cache durations, and shorter query durations,
     * the window we're calculating might be much bigger then the user's current window,
     * resulting in us returning labels/values that might not be applicable for the given window,
     * this is a necessary trade-off if we want to cache larger durations
     */
    getTimeRangeParams(timeRange: TimeRange): {
        start: string;
        end: string;
    };
    getOriginalMetricName(labelData: {
        [key: string]: string;
    }): string;
    /**
     * This converts the adhocVariableFilter array and converts it to scopeFilter array
     * @param filters
     */
    generateScopeFilters(filters?: AdHocVariableFilter[]): ScopeSpecFilter[];
    enhanceExprWithAdHocFilters(filters: AdHocVariableFilter[] | undefined, expr: string): string;
    filterQuery(query: PromQuery): boolean;
    applyTemplateVariables(target: PromQuery, scopedVars: ScopedVars, filters?: AdHocVariableFilter[]): {
        expr: string;
        interval: string;
        legendFormat: string;
        adhocFilters?: ScopeSpecFilter[] | undefined;
        utcOffsetSec?: number | undefined;
        valueWithRefId?: boolean | undefined;
        showingGraph?: boolean | undefined;
        showingTable?: boolean | undefined;
        hinting?: boolean | undefined;
        useBackend?: boolean | undefined;
        disableTextWrap?: boolean | undefined;
        fullMetaSearch?: boolean | undefined;
        includeNullMetadata?: boolean | undefined;
        editorMode?: QueryEditorMode$1 | undefined;
        exemplar?: boolean | undefined;
        format?: PromQueryFormat | undefined;
        instant?: boolean | undefined;
        intervalFactor?: number | undefined;
        range?: boolean | undefined;
        scopes?: (_grafana_data.ScopeSpec & Pick<{
            name: string;
        }, "name">)[] | undefined;
        groupByKeys?: string[] | undefined;
        key?: string | undefined;
        datasource?: common.DataSourceRef | null | undefined;
        hide?: boolean | undefined;
        queryType?: string | undefined;
        refId: string;
    };
    getVariables(): string[];
    interpolateString(string: string, scopedVars?: ScopedVars): string;
    getDebounceTimeInMilliseconds(): number;
    getDaysToCacheMetadata(): number;
    getCacheDurationInMinutes(): number;
    getDefaultQuery(app: CoreApp): PromQuery;
}

type PromQueryEditorProps = QueryEditorProps<PrometheusDatasource, PromQuery, PromOptions>;

declare function PromQueryEditorByAppBase(props: PromQueryEditorProps): React__default.JSX.Element;
declare const PromQueryEditorByApp: React__default.MemoExoticComponent<typeof PromQueryEditorByAppBase>;

type Props$9 = {
    initialValue: string;
    languageProvider: PromQlLanguageProvider;
    history: Array<HistoryItem<PromQuery>>;
    placeholder: string;
    onRunQuery: (value: string) => void;
    onBlur: (value: string) => void;
    onChange: (value: string) => void;
    datasource: PrometheusDatasource;
};

declare const MonacoQueryFieldLazy: (props: Props$9) => React__default.JSX.Element;

type Props$8 = PromQueryEditorProps & {
    annotation?: AnnotationQuery<PromQuery>;
    onAnnotationChange?: (annotation: AnnotationQuery<PromQuery>) => void;
};
declare function AnnotationQueryEditor(props: Props$8): React__default.JSX.Element;

declare const PromCheatSheet: (props: QueryEditorHelpProps<PromQuery>) => React__default.JSX.Element;

declare const PrometheusMetricsBrowser: React__default.FunctionComponent<{
    hide?: (() => void) | undefined;
    onChange: (selector: string) => void;
    timeRange?: TimeRange | undefined;
    languageProvider: PromQlLanguageProvider;
    autoSelect?: number | undefined;
    lastUsedLabels: string[];
    storeLastUsedLabels: (labels: string[]) => void;
    deleteLastUsedLabels: () => void;
}>;

interface Props$7 {
    onChange: (exemplar: boolean) => void;
    datasource: PrometheusDatasource;
    query: PromQuery;
    'data-testid'?: string;
}
declare function PromExemplarField({ datasource, onChange, query, ...rest }: Props$7): React__default.JSX.Element;

interface PromExploreExtraFieldProps {
    query: PromQuery;
    onChange: (value: PromQuery) => void;
    onRunQuery: () => void;
    datasource: PrometheusDatasource;
}
declare const PromExploreExtraField: React__default.MemoExoticComponent<({ query, datasource, onChange, onRunQuery }: PromExploreExtraFieldProps) => React__default.JSX.Element>;

declare function PromQueryEditorForAlerting(props: PromQueryEditorProps): React__default.JSX.Element;

declare const PromQueryField: React__default.FunctionComponent<{
    datasource: PrometheusDatasource;
    query: PromQuery;
    range?: TimeRange | undefined;
    data?: _grafana_data.PanelData | undefined;
    onChange: (value: PromQuery) => void;
    queries?: _grafana_data.DataQuery[] | undefined;
    history?: _grafana_data.HistoryItem<PromQuery>[] | undefined;
    app?: _grafana_data.CoreApp | undefined;
    onRunQuery: () => void;
    onBlur?: (() => void) | undefined;
    onAddQuery?: ((query: PromQuery) => void) | undefined;
    'data-testid'?: string | undefined;
    ExtraFieldElement?: ReactNode;
}>;

type Props$6 = QueryEditorProps<PrometheusDatasource, PromQuery, PromOptions, PromVariableQuery>;
declare const PromVariableQueryEditor: ({ onChange, query, datasource, range }: Props$6) => React__default.JSX.Element;

declare const PROM_CONFIG_LABEL_WIDTH = 30;
type PrometheusConfigProps = DataSourcePluginOptionsEditorProps<PromOptions>;
declare const ConfigEditor: (props: PrometheusConfigProps) => React__default.JSX.Element;
/**
 * Use this to return a url in a tooltip in a field. Don't forget to make the field interactive to be able to click on the tooltip
 * @param url
 * @returns
 */
declare function docsTip(url?: string): React__default.JSX.Element;
declare const validateInput: (input: string, pattern: string | RegExp, errorMessage?: string) => boolean | JSX.Element;
declare function overhaulStyles(theme: GrafanaTheme2): {
    additionalSettings: string;
    secondaryGrey: string;
    inlineError: string;
    switchField: string;
    sectionHeaderPadding: string;
    sectionBottomPadding: string;
    subsectionText: string;
    hrBottomSpace: string;
    hrTopSpace: string;
    textUnderline: string;
    versionMargin: string;
    advancedHTTPSettingsMargin: string;
    advancedSettings: string;
    alertingTop: string;
    overhaulPageHeading: string;
    container: string;
};

interface Props$5<T extends DataSourceJsonData> extends Pick<DataSourcePluginOptionsEditorProps<T>, 'options' | 'onOptionsChange'> {
}
interface AlertingConfig extends DataSourceJsonData {
    manageAlerts?: boolean;
}
declare function AlertingSettingsOverhaul<T extends AlertingConfig>({ options, onOptionsChange, }: Props$5<T>): JSX.Element;

type DataSourceHttpSettingsProps = {
    options: DataSourceSettings<PromOptions, {}>;
    onOptionsChange: (options: DataSourceSettings<PromOptions, {}>) => void;
    secureSocksDSProxyEnabled: boolean;
};
declare const DataSourceHttpSettingsOverhaul: (props: DataSourceHttpSettingsProps) => React__default.JSX.Element;

type Props$4 = {
    value: ExemplarTraceIdDestination;
    onChange: (value: ExemplarTraceIdDestination) => void;
    onDelete: () => void;
    disabled?: boolean;
};
declare function ExemplarSetting({ value, onChange, onDelete, disabled }: Props$4): React__default.JSX.Element;

type Props$3 = {
    options?: ExemplarTraceIdDestination[];
    onChange: (value: ExemplarTraceIdDestination[]) => void;
    disabled?: boolean;
};
declare function ExemplarsSettings({ options, onChange, disabled }: Props$3): React__default.JSX.Element;

declare const PromFlavorVersions: {
    [index: string]: Array<{
        value?: string;
        label: string;
    }>;
};

type Props$2 = Pick<DataSourcePluginOptionsEditorProps<PromOptions>, 'options' | 'onOptionsChange'>;
declare const PromSettings: (props: Props$2) => React__default.JSX.Element;

interface VisualQueryBinary<T> {
    operator: string;
    vectorMatchesType?: 'on' | 'ignoring';
    vectorMatches?: string;
    query: T;
}

/**
 * Visual query model
 */
interface PromVisualQuery {
    metric: string;
    labels: QueryBuilderLabelFilter[];
    operations: QueryBuilderOperation[];
    binaryQueries?: PromVisualQueryBinary[];
    useBackend?: boolean;
    disableTextWrap?: boolean;
    includeNullMetadata?: boolean;
    fullMetaSearch?: boolean;
}
type PromVisualQueryBinary = VisualQueryBinary<PromVisualQuery>;
declare enum PromQueryPatternType {
    Rate = "rate",
    Histogram = "histogram",
    Binary = "binary"
}
interface PromQueryPattern {
    name: string;
    operations: QueryBuilderOperation[];
    type: PromQueryPatternType;
    binaryQueries?: PromVisualQueryBinary[];
}

type Props$1 = {
    pattern: PromQueryPattern;
    hasNewQueryOption: boolean;
    hasPreviousQuery: boolean | string;
    selectedPatternName: string | null;
    setSelectedPatternName: (name: string | null) => void;
    onPatternSelect: (pattern: PromQueryPattern, selectAsNewQuery?: boolean) => void;
};
declare const QueryPattern: (props: Props$1) => React__default.JSX.Element;

type Props = {
    isOpen: boolean;
    query: PromQuery;
    queries: DataQuery$1[] | undefined;
    app?: CoreApp;
    onClose: () => void;
    onChange: (query: PromQuery) => void;
    onAddQuery?: (query: PromQuery) => void;
};
declare const QueryPatternsModal: (props: Props) => React__default.JSX.Element;

interface LabelFilterItemProps {
    defaultOp: string;
    item: Partial<QueryBuilderLabelFilter>;
    onChange: (value: QueryBuilderLabelFilter) => void;
    onGetLabelNames: (forLabel: Partial<QueryBuilderLabelFilter>) => Promise<SelectableValue[]>;
    onGetLabelValues: (forLabel: Partial<QueryBuilderLabelFilter>) => Promise<SelectableValue[]>;
    onDelete: () => void;
    invalidLabel?: boolean;
    invalidValue?: boolean;
    getLabelValuesAutofillSuggestions: (query: string, labelName?: string) => Promise<SelectableValue[]>;
    debounceDuration: number;
}
declare function LabelFilterItem({ item, defaultOp, onChange, onDelete, onGetLabelNames, onGetLabelValues, invalidLabel, invalidValue, getLabelValuesAutofillSuggestions, debounceDuration, }: LabelFilterItemProps): React__default.JSX.Element;

interface LabelFiltersProps {
    labelsFilters: QueryBuilderLabelFilter[];
    onChange: (labelFilters: Array<Partial<QueryBuilderLabelFilter>>) => void;
    onGetLabelNames: (forLabel: Partial<QueryBuilderLabelFilter>) => Promise<SelectableValue[]>;
    onGetLabelValues: (forLabel: Partial<QueryBuilderLabelFilter>) => Promise<SelectableValue[]>;
    /** If set to true, component will show error message until at least 1 filter is selected */
    labelFilterRequired?: boolean;
    getLabelValuesAutofillSuggestions: (query: string, labelName?: string) => Promise<SelectableValue[]>;
    debounceDuration: number;
    variableEditor?: boolean;
}
declare function LabelFilters({ labelsFilters, onChange, onGetLabelNames, onGetLabelValues, labelFilterRequired, getLabelValuesAutofillSuggestions, debounceDuration, variableEditor, }: LabelFiltersProps): React__default.JSX.Element;

declare function LabelParamEditor({ onChange, index, operationId, value, query, datasource, }: QueryBuilderOperationParamEditorProps): React__default.JSX.Element;

interface MetricSelectProps {
    metricLookupDisabled: boolean;
    query: PromVisualQuery;
    onChange: (query: PromVisualQuery) => void;
    onGetMetrics: () => Promise<SelectableValue[]>;
    datasource: PrometheusDatasource;
    labelsFilters: QueryBuilderLabelFilter[];
    onBlur?: () => void;
    variableEditor?: boolean;
}
declare function MetricSelect({ datasource, query, onChange, onGetMetrics, labelsFilters, metricLookupDisabled, onBlur, variableEditor, }: Readonly<MetricSelectProps>): React__default.JSX.Element;

interface MetricsLabelsSectionProps {
    query: PromVisualQuery;
    datasource: PrometheusDatasource;
    onChange: (update: PromVisualQuery) => void;
    variableEditor?: boolean;
    onBlur?: () => void;
}
declare function MetricsLabelsSection({ datasource, query, onChange, onBlur, variableEditor, }: MetricsLabelsSectionProps): React__default.JSX.Element;

interface NestedQueryProps {
    nestedQuery: PromVisualQueryBinary;
    datasource: PrometheusDatasource;
    index: number;
    onChange: (index: number, update: PromVisualQueryBinary) => void;
    onRemove: (index: number) => void;
    onRunQuery: () => void;
    showExplain: boolean;
}
declare const NestedQuery: React__default.NamedExoticComponent<NestedQueryProps>;

interface NestedQueryListProps {
    query: PromVisualQuery;
    datasource: PrometheusDatasource;
    onChange: (query: PromVisualQuery) => void;
    onRunQuery: () => void;
    showExplain: boolean;
}
declare function NestedQueryList(props: NestedQueryListProps): React__default.JSX.Element;

interface PromQueryBuilderProps {
    query: PromVisualQuery;
    datasource: PrometheusDatasource;
    onChange: (update: PromVisualQuery) => void;
    onRunQuery: () => void;
    data?: PanelData;
    showExplain: boolean;
}
declare const PromQueryBuilder: React__default.NamedExoticComponent<PromQueryBuilderProps>;

interface PromQueryBuilderContainerProps {
    query: PromQuery;
    datasource: PrometheusDatasource;
    onChange: (update: PromQuery) => void;
    onRunQuery: () => void;
    data?: PanelData;
    showExplain: boolean;
}
/**
 * This component is here just to contain the translation logic between string query and the visual query builder model.
 */
declare function PromQueryBuilderContainer(props: PromQueryBuilderContainerProps): React__default.JSX.Element | null;

interface PromQueryBuilderExplainedProps {
    query: string;
}
declare const PromQueryBuilderExplained: React__default.NamedExoticComponent<PromQueryBuilderExplainedProps>;

interface PromQueryBuilderOptionsProps {
    query: PromQuery;
    app?: CoreApp;
    onChange: (update: PromQuery) => void;
    onRunQuery: () => void;
}
declare const PromQueryBuilderOptions: React__default.NamedExoticComponent<PromQueryBuilderOptionsProps>;

type PromQueryCodeEditorProps = PromQueryEditorProps & {
    showExplain: boolean;
};
declare function PromQueryCodeEditor(props: PromQueryCodeEditorProps): React__default.JSX.Element;

declare const PromQueryEditorSelector: React__default.NamedExoticComponent<PromQueryEditorProps>;

interface PromQueryLegendEditorProps {
    legendFormat: string | undefined;
    onChange: (legendFormat: string) => void;
    onRunQuery: () => void;
}
/**
 * Tests for this component are on the parent level (PromQueryBuilderOptions).
 */
declare const PromQueryLegendEditor: React__default.NamedExoticComponent<PromQueryLegendEditorProps>;

interface QueryPreviewProps {
    query: string;
}
declare function QueryPreview({ query }: QueryPreviewProps): React__default.JSX.Element | null;

type MetricsModalProps = {
    datasource: PrometheusDatasource;
    isOpen: boolean;
    query: PromVisualQuery;
    onClose: () => void;
    onChange: (query: PromVisualQuery) => void;
    initialMetrics: string[];
};
declare const MetricsModal: (props: MetricsModalProps) => React__default.JSX.Element;

type PromQailProps = {
    query: PromVisualQuery;
    closeDrawer: () => void;
    onChange: (query: PromVisualQuery) => void;
    datasource: PrometheusDatasource;
};
declare const PromQail: (props: PromQailProps) => React__default.JSX.Element;

/**
 * Adds label filter to existing query. Useful for query modification for example for ad hoc filters.
 *
 * It uses PromQL parser to find instances of metric and labels, alters them and then splices them back into the query.
 * Ideally we could use the parse -> change -> render is a simple 3 steps but right now building the visual query
 * object does not support all possible queries.
 *
 * So instead this just operates on substrings of the query with labels and operates just on those. This makes this
 * more robust and can alter even invalid queries, and preserves in general the query structure and whitespace.
 * @param query
 * @param key
 * @param value
 * @param operator
 */
declare function addLabelToQuery(query: string, key: string, value: string | number, operator?: string): string;

declare class PrometheusMetricFindQuery {
    private datasource;
    private query;
    range: TimeRange;
    constructor(datasource: PrometheusDatasource, query: string);
    process(timeRange: TimeRange): Promise<MetricFindValue[]>;
    labelValuesQuery(label: string, metric?: string): Promise<{
        text: any;
    }[]>;
    metricNameQuery(metricFilterPattern: string): Promise<{
        text: any;
        expandable: boolean;
    }[]>;
    queryResultQuery(query: string): Promise<{
        text: any;
        expandable: boolean;
    }[]>;
    metricNameAndLabelsQuery(query: string): Promise<MetricFindValue[]>;
}

declare const promqlGrammar: Grammar;

declare function getQueryHints(query: string, series?: unknown[], datasource?: PrometheusDatasource): QueryHint[];
declare function getInitHints(datasource: PrometheusDatasource): QueryHint[];

declare function transformV2(response: DataQueryResponse, request: DataQueryRequest<PromQuery>, options: {
    exemplarTraceIdDestinations?: ExemplarTraceIdDestination[];
}): {
    data: DataFrame[];
    key?: string | undefined;
    error?: _grafana_data.DataQueryError | undefined;
    errors?: _grafana_data.DataQueryError[] | undefined;
    state?: _grafana_data.LoadingState | undefined;
    traceIds?: string[] | undefined;
};
declare function transformDFToTable(dfs: DataFrame[]): DataFrame[];
declare function sortSeriesByLabel(s1: DataFrame, s2: DataFrame): number;
/** @internal */
declare function parseSampleValue(value: string): number;

declare class PrometheusVariableSupport extends CustomVariableSupport<PrometheusDatasource> {
    private readonly datasource;
    private readonly templateSrv;
    constructor(datasource: PrometheusDatasource, templateSrv?: TemplateSrv);
    editor: ({ onChange, query, datasource, range }: Props$6) => React.JSX.Element;
    query(request: DataQueryRequest<PromVariableQuery>): Observable<DataQueryResponse>;
}

export { AlertingSettingsOverhaul, AnnotationQueryEditor, ConfigEditor, DataSourceHttpSettingsOverhaul, ExemplarSetting, ExemplarTraceIdDestination, ExemplarsSettings, InstantQueryRefIdIndex, LabelFilterItem, LabelFilters, LabelParamEditor, LegendFormatMode, MetricSelect, MetricsLabelsSection, MetricsModal, MonacoQueryFieldLazy, NestedQuery, NestedQueryList, PROM_CONFIG_LABEL_WIDTH, PromApplication, PromBuildInfoResponse, PromCheatSheet, PromExemplarField, PromExploreExtraField, PromFlavorVersions, PromMetric, PromMetricsMetadata, PromMetricsMetadataItem, PromOptions, PromQail, PromQuery, PromQueryBuilder, PromQueryBuilderContainer, PromQueryBuilderExplained, PromQueryBuilderOptions, PromQueryCodeEditor, PromQueryEditorByApp, PromQueryEditorForAlerting, PromQueryEditorSelector, PromQueryField, PromQueryFormat, PromQueryLegendEditor, PromQueryRequest, PromSettings, PromValue, PromVariableQuery, PromVariableQueryEditor, PromVariableQueryType, Prometheus, PrometheusCacheLevel, PrometheusDatasource, PrometheusMetricFindQuery, PrometheusMetricsBrowser, PrometheusVariableSupport, QueryEditorMode$1 as QueryEditorMode, QueryPattern, QueryPatternsModal, QueryPreview, StandardPromVariableQuery, addLabelToQuery, docsTip, getInitHints, getQueryHints, overhaulStyles, parseSampleValue, promqlGrammar, sortSeriesByLabel, transformDFToTable, transformV2, validateInput };
