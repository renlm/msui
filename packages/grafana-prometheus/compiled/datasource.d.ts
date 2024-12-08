import { Observable } from 'rxjs';
import { AbstractQuery, AdHocVariableFilter, AnnotationEvent, AnnotationQueryRequest, CoreApp, CustomVariableModel, DataQueryRequest, DataQueryResponse, DataSourceGetTagKeysOptions, DataSourceGetTagValuesOptions, DataSourceInstanceSettings, DataSourceWithQueryExportSupport, DataSourceWithQueryImportSupport, LegacyMetricFindQueryOptions, MetricFindValue, QueryFixAction, QueryVariableModel, ScopedVars, ScopeSpecFilter, TimeRange } from '@grafana/data';
import { BackendDataSourceResponse, BackendSrvRequest, DataSourceWithBackend, FetchResponse, TemplateSrv } from '@grafana/runtime';
import PrometheusLanguageProvider from './language_provider';
import { QueryEditorMode } from './querybuilder/shared/types';
import { QueryCache } from './querycache/QueryCache';
import { ExemplarTraceIdDestination, PromApplication, PrometheusCacheLevel, PromOptions, PromQuery, PromQueryRequest } from './types';
export declare const InstantQueryRefIdIndex = "-Instant";
export declare class PrometheusDatasource extends DataSourceWithBackend<PromQuery, PromOptions> implements DataSourceWithQueryImportSupport<PromQuery>, DataSourceWithQueryExportSupport<PromQuery> {
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
    languageProvider: PrometheusLanguageProvider;
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
    constructor(instanceSettings: DataSourceInstanceSettings<PromOptions>, templateSrv?: TemplateSrv, languageProvider?: PrometheusLanguageProvider);
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
    getQueryHints(query: PromQuery, result: unknown[]): import("@grafana/data").QueryHint[];
    getInitHints(): import("@grafana/data").QueryHint[];
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
        editorMode?: import("./dataquery").QueryEditorMode | undefined;
        exemplar?: boolean | undefined;
        format?: import("./dataquery").PromQueryFormat | undefined;
        instant?: boolean | undefined;
        intervalFactor?: number | undefined;
        range?: boolean | undefined;
        scopes?: (import("@grafana/data").ScopeSpec & Pick<{
            name: string;
        }, "name">)[] | undefined;
        groupByKeys?: string[] | undefined;
        key?: string | undefined;
        datasource?: import("@grafana/schema").DataSourceRef | null | undefined;
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
/**
 * Align query range to step.
 * Rounds start and end down to a multiple of step.
 * @param start Timestamp marking the beginning of the range.
 * @param end Timestamp marking the end of the range.
 * @param step Interval to align start and end with.
 * @param utcOffsetSec Number of seconds current timezone is offset from UTC
 */
export declare function alignRange(start: number, end: number, step: number, utcOffsetSec: number): {
    end: number;
    start: number;
};
export declare function extractRuleMappingFromGroups(groups: any[]): any;
export declare function prometheusRegularEscape<T>(value: T): string | T;
export declare function prometheusSpecialRegexEscape<T>(value: T): string | T;
