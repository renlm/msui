/// <reference types="react" />
import { Observable } from 'rxjs';
import { DataQuery } from '@grafana/schema';
import { KeyValue, Labels } from './data';
import { DataFrame } from './dataFrame';
import { DataQueryRequest, DataQueryResponse, DataSourceApi, QueryFixAction, QueryFixType } from './datasource';
import { AbsoluteTimeRange } from './time';
export { LogsDedupStrategy, LogsSortOrder } from '@grafana/schema';
/**
 * Mapping of log level abbreviation to canonical log level.
 * Supported levels are reduce to limit color variation.
 */
export declare enum LogLevel {
    emerg = "critical",
    fatal = "critical",
    alert = "critical",
    crit = "critical",
    critical = "critical",
    warn = "warning",
    warning = "warning",
    err = "error",
    eror = "error",
    error = "error",
    info = "info",
    information = "info",
    informational = "info",
    notice = "info",
    dbug = "debug",
    debug = "debug",
    trace = "trace",
    unknown = "unknown"
}
/**
 * Mapping of log level abbreviation to canonical log level.
 * Supported levels are reduce to limit color variation.
 */
export declare const NumericLogLevel: Record<string, LogLevel>;
export declare enum LogsMetaKind {
    Number = 0,
    String = 1,
    LabelsMap = 2,
    Error = 3
}
export interface LogsMetaItem {
    label: string;
    value: string | number | Labels;
    kind: LogsMetaKind;
}
export interface LogRowModel {
    entryFieldIndex: number;
    rowIndex: number;
    rowId?: string;
    dataFrame: DataFrame;
    duplicates?: number;
    entry: string;
    hasAnsi: boolean;
    hasUnescapedContent: boolean;
    labels: Labels;
    logLevel: LogLevel;
    raw: string;
    searchWords?: string[];
    timeFromNow: string;
    timeEpochMs: number;
    timeEpochNs: string;
    timeLocal: string;
    timeUtc: string;
    uid: string;
    uniqueLabels?: Labels;
    datasourceType?: string;
}
export interface LogsModel {
    hasUniqueLabels: boolean;
    meta?: LogsMetaItem[];
    rows: LogRowModel[];
    series?: DataFrame[];
    visibleRange?: AbsoluteTimeRange;
    queries?: DataQuery[];
    bucketSize?: number;
}
export interface LogSearchMatch {
    start: number;
    length: number;
    text: string;
}
export interface LogLabelStatsModel {
    active?: boolean;
    count: number;
    proportion: number;
    value: string;
}
export declare enum LogsDedupDescription {
    none = "No de-duplication",
    exact = "De-duplication of successive lines that are identical, ignoring ISO datetimes.",
    numbers = "De-duplication of successive lines that are identical when ignoring numbers, e.g., IP addresses, latencies.",
    signature = "De-duplication of successive lines that have identical punctuation and whitespace."
}
export interface LogRowContextOptions {
    direction?: LogRowContextQueryDirection;
    limit?: number;
}
export declare enum LogRowContextQueryDirection {
    Backward = "BACKWARD",
    Forward = "FORWARD"
}
/**
 * Data sources that allow showing context rows around the provided LowRowModel should implement this method.
 * This will enable "context" button in Logs Panel.
 */
export interface DataSourceWithLogsContextSupport<TQuery extends DataQuery = DataQuery> {
    /**
     * Retrieve context for a given log row
     */
    getLogRowContext: (row: LogRowModel, options?: LogRowContextOptions, query?: TQuery) => Promise<DataQueryResponse>;
    /**
     * Retrieve the context query object for a given log row. This is currently used to open LogContext queries in a split view and in a new browser tab.
     * The `cacheFilters` parameter can be used to force a refetch of the cached applied filters. Default value `true`.
     */
    getLogRowContextQuery?: (row: LogRowModel, options?: LogRowContextOptions, query?: TQuery, cacheFilters?: boolean) => Promise<TQuery | null>;
    /**
     * @deprecated Deprecated since 10.3. To display the context option and support the feature implement DataSourceWithLogsContextSupport interface instead.
     */
    showContextToggle?(row?: LogRowModel): boolean;
    /**
     * This method can be used to display a custom UI in the context view.
     * @alpha
     * @internal
     */
    getLogRowContextUi?(row: LogRowModel, runContextQuery?: () => void, origQuery?: TQuery): React.ReactNode;
}
export declare const hasLogsContextSupport: (datasource: unknown) => datasource is DataSourceWithLogsContextSupport<DataQuery>;
/**
 * Types of supplementary queries that can be run in Explore.
 * @internal
 */
export declare enum SupplementaryQueryType {
    LogsVolume = "LogsVolume",
    LogsSample = "LogsSample"
}
/**
 * @internal
 */
export type SupplementaryQueryOptions = LogsVolumeOption | LogsSampleOptions;
/**
 * @internal
 */
export type LogsVolumeOption = {
    type: SupplementaryQueryType.LogsVolume;
    field?: string;
};
/**
 * @internal
 */
export type LogsSampleOptions = {
    type: SupplementaryQueryType.LogsSample;
    limit?: number;
};
/**
 * Types of logs volume responses. A data source may return full range histogram (based on selected range)
 * or limited (based on returned results). This information is attached to DataFrame.meta.custom object.
 * @internal
 */
export declare enum LogsVolumeType {
    FullRange = "FullRange",
    Limited = "Limited"
}
/**
 * Custom meta information required by Logs Volume responses
 */
export type LogsVolumeCustomMetaData = {
    absoluteRange: AbsoluteTimeRange;
    logsVolumeType: LogsVolumeType;
    datasourceName: string;
    sourceQuery: DataQuery;
};
/**
 * Data sources that support supplementary queries in Explore.
 * This will enable users to see additional data when running original queries.
 * Supported supplementary queries are defined in SupplementaryQueryType enum.
 * @internal
 */
export interface DataSourceWithSupplementaryQueriesSupport<TQuery extends DataQuery> {
    /**
     * Returns an observable that will be used to fetch supplementary data based on the provided
     * supplementary query type and original request.
     * @deprecated Use getSupplementaryQueryRequest() instead
     */
    getDataProvider?(type: SupplementaryQueryType, request: DataQueryRequest<TQuery>): Observable<DataQueryResponse> | undefined;
    /**
     * Receives a SupplementaryQueryType and a DataQueryRequest and returns a new DataQueryRequest to fetch supplementary data.
     * If provided type or request is not suitable for a supplementary data request, returns undefined.
     */
    getSupplementaryRequest?(type: SupplementaryQueryType, request: DataQueryRequest<TQuery>, options?: SupplementaryQueryOptions): DataQueryRequest<TQuery> | undefined;
    /**
     * Returns supplementary query types that data source supports.
     */
    getSupportedSupplementaryQueryTypes(): SupplementaryQueryType[];
    /**
     * Returns a supplementary query to be used to fetch supplementary data based on the provided type and original query.
     * If the provided query is not suitable for the provided supplementary query type, undefined should be returned.
     */
    getSupplementaryQuery(options: SupplementaryQueryOptions, originalQuery: TQuery): TQuery | undefined;
}
export declare const hasSupplementaryQuerySupport: <TQuery extends DataQuery>(datasource: DataSourceApi | (DataSourceApi & DataSourceWithSupplementaryQueriesSupport<TQuery>), type: SupplementaryQueryType) => datasource is DataSourceApi<import("./query").DataQuery, import("./datasource").DataSourceJsonData, {}> & DataSourceWithSupplementaryQueriesSupport<TQuery>;
export declare const hasLogsContextUiSupport: (datasource: unknown) => datasource is DataSourceWithLogsContextSupport<DataQuery>;
export interface QueryFilterOptions extends KeyValue<string> {
}
export interface ToggleFilterAction {
    type: 'FILTER_FOR' | 'FILTER_OUT';
    options: QueryFilterOptions;
    frame?: DataFrame;
}
/**
 * Data sources that support toggleable filters through `toggleQueryFilter`, and displaying the active
 * state of filters through `queryHasFilter`, in the Log Details component in Explore.
 * @internal
 * @alpha
 */
export interface DataSourceWithToggleableQueryFiltersSupport<TQuery extends DataQuery> {
    /**
     * Toggle filters on and off from query.
     * If the filter is already present, it should be removed.
     * If the opposite filter is present, it should be replaced.
     */
    toggleQueryFilter(query: TQuery, filter: ToggleFilterAction): TQuery;
    /**
     * Given a query, determine if it has a filter that matches the options.
     */
    queryHasFilter(query: TQuery, filter: QueryFilterOptions): boolean;
}
/**
 * @internal
 */
export declare const hasToggleableQueryFiltersSupport: <TQuery extends DataQuery>(datasource: unknown) => datasource is DataSourceWithToggleableQueryFiltersSupport<TQuery>;
/**
 * Data sources that support query modification actions from Log Details (ADD_FILTER, ADD_FILTER_OUT),
 * and Popover Menu (ADD_STRING_FILTER, ADD_STRING_FILTER_OUT) in Explore.
 * @internal
 * @alpha
 */
export interface DataSourceWithQueryModificationSupport<TQuery extends DataQuery> {
    /**
     * Given a query, applies a query modification `action`, returning the updated query.
     * Explore currently supports the following action types:
     * - ADD_FILTER: adds a <key, value> filter to the query.
     * - ADD_FILTER_OUT: adds a negative <key, value> filter to the query.
     * - ADD_STRING_FILTER: adds a string filter to the query.
     * - ADD_STRING_FILTER_OUT: adds a negative string filter to the query.
     */
    modifyQuery(query: TQuery, action: QueryFixAction): TQuery;
    /**
     * Returns a list of supported action types for `modifyQuery()`.
     */
    getSupportedQueryModifications(): Array<QueryFixType | string>;
}
/**
 * @internal
 */
export declare const hasQueryModificationSupport: <TQuery extends DataQuery>(datasource: unknown) => datasource is DataSourceWithQueryModificationSupport<TQuery>;
