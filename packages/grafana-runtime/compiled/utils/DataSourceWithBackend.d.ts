import { Observable } from 'rxjs';
import { DataFrame, DataQuery, DataQueryRequest, DataQueryResponse, TestDataSourceResponse, DataSourceApi, DataSourceInstanceSettings, DataSourceJsonData, DataSourceRef, ScopedVars, AdHocVariableFilter } from '@grafana/data';
import { BackendSrvRequest, StreamingFrameOptions } from '../services';
/**
 * @internal
 */
export declare const ExpressionDatasourceRef: Readonly<{
    type: "__expr__";
    uid: "__expr__";
    name: "Expression";
}>;
/**
 * @public
 */
export declare function isExpressionReference(ref?: DataSourceRef | string | null): boolean;
export declare class HealthCheckError extends Error {
    details: HealthCheckResultDetails;
    constructor(message: string, details: HealthCheckResultDetails);
}
/**
 * Describes the current health status of a data source plugin.
 *
 * @public
 */
export declare enum HealthStatus {
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
export type HealthCheckResultDetails = Record<string, unknown> | undefined;
/**
 * Describes the payload returned when checking the health of a data source
 * plugin.
 *
 * @public
 */
export interface HealthCheckResult {
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
 * @internal exported for tests
 */
export declare function toStreamingDataResponse<TQuery extends DataQuery = DataQuery>(rsp: DataQueryResponse, req: DataQueryRequest<TQuery>, getter: (req: DataQueryRequest<TQuery>, frame: DataFrame) => Partial<StreamingFrameOptions>): Observable<DataQueryResponse>;
/**
 * This allows data sources to customize the streaming connection query
 *
 * @public
 */
export type StreamOptionsProvider<TQuery extends DataQuery = DataQuery> = (request: DataQueryRequest<TQuery>, frame: DataFrame) => Partial<StreamingFrameOptions>;
/**
 * @public
 */
export declare const standardStreamOptionsProvider: StreamOptionsProvider;
export { DataSourceWithBackend };
