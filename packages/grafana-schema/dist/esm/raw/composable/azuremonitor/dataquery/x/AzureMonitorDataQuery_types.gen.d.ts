import * as common from '@grafana/schema';
export declare const pluginVersion = "%VERSION%";
export interface AzureMonitorQuery extends common.DataQuery {
    /**
     * Azure Monitor Logs sub-query properties.
     */
    azureLogAnalytics?: AzureLogsQuery;
    /**
     * Azure Monitor Metrics sub-query properties.
     */
    azureMonitor?: AzureMetricQuery;
    /**
     * Azure Resource Graph sub-query properties.
     */
    azureResourceGraph?: AzureResourceGraphQuery;
    /**
     * Application Insights Traces sub-query properties.
     */
    azureTraces?: AzureTracesQuery;
    /**
     * @deprecated Legacy template variable support.
     */
    grafanaTemplateVariableFn?: GrafanaTemplateVariableQuery;
    namespace?: string;
    /**
     * Used only for exemplar queries from Prometheus
     */
    query?: string;
    region?: string;
    resource?: string;
    /**
     * Template variables params. These exist for backwards compatiblity with legacy template variables.
     */
    resourceGroup?: string;
    /**
     * Azure subscription containing the resource(s) to be queried.
     */
    subscription?: string;
    /**
     * Subscriptions to be queried via Azure Resource Graph.
     */
    subscriptions?: Array<string>;
}
export declare const defaultAzureMonitorQuery: Partial<AzureMonitorQuery>;
/**
 * Defines the supported queryTypes. GrafanaTemplateVariableFn is deprecated
 */
export declare enum AzureQueryType {
    AzureMonitor = "Azure Monitor",
    AzureResourceGraph = "Azure Resource Graph",
    AzureTraces = "Azure Traces",
    GrafanaTemplateVariableFn = "Grafana Template Variable Function",
    LocationsQuery = "Azure Regions",
    LogAnalytics = "Azure Log Analytics",
    MetricNamesQuery = "Azure Metric Names",
    NamespacesQuery = "Azure Namespaces",
    ResourceGroupsQuery = "Azure Resource Groups",
    ResourceNamesQuery = "Azure Resource Names",
    SubscriptionsQuery = "Azure Subscriptions",
    TraceExemplar = "traceql",
    WorkspacesQuery = "Azure Workspaces"
}
export interface AzureMetricQuery {
    /**
     * The aggregation to be used within the query. Defaults to the primaryAggregationType defined by the metric.
     */
    aggregation?: string;
    /**
     * Aliases can be set to modify the legend labels. e.g. {{ resourceGroup }}. See docs for more detail.
     */
    alias?: string;
    /**
     * Time grains that are supported by the metric.
     */
    allowedTimeGrainsMs?: Array<number>;
    /**
     * Used as the value for the metricNamespace property when it's different from the resource namespace.
     */
    customNamespace?: string;
    /**
     * @deprecated This property was migrated to dimensionFilters and should only be accessed in the migration
     */
    dimension?: string;
    /**
     * @deprecated This property was migrated to dimensionFilters and should only be accessed in the migration
     */
    dimensionFilter?: string;
    /**
     * Filters to reduce the set of data returned. Dimensions that can be filtered on are defined by the metric.
     */
    dimensionFilters?: Array<AzureMetricDimension>;
    /**
     * @deprecated Use metricNamespace instead
     */
    metricDefinition?: string;
    /**
     * The metric to query data for within the specified metricNamespace. e.g. UsedCapacity
     */
    metricName?: string;
    /**
     * metricNamespace is used as the resource type (or resource namespace).
     * It's usually equal to the target metric namespace. e.g. microsoft.storage/storageaccounts
     * Kept the name of the variable as metricNamespace to avoid backward incompatibility issues.
     */
    metricNamespace?: string;
    /**
     * The Azure region containing the resource(s).
     */
    region?: string;
    /**
     * @deprecated Use resources instead
     */
    resourceGroup?: string;
    /**
     * @deprecated Use resources instead
     */
    resourceName?: string;
    /**
     * @deprecated Use resourceGroup, resourceName and metricNamespace instead
     */
    resourceUri?: string;
    /**
     * Array of resource URIs to be queried.
     */
    resources?: Array<AzureMonitorResource>;
    /**
     * The granularity of data points to be queried. Defaults to auto.
     */
    timeGrain?: string;
    /**
     * @deprecated
     */
    timeGrainUnit?: string;
    /**
     * Maximum number of records to return. Defaults to 10.
     */
    top?: string;
}
export declare const defaultAzureMetricQuery: Partial<AzureMetricQuery>;
/**
 * Azure Monitor Logs sub-query properties
 */
export interface AzureLogsQuery {
    /**
     * If set to true the query will be run as a basic logs query
     */
    basicLogsQuery?: boolean;
    /**
     * If set to true the dashboard time range will be used as a filter for the query. Otherwise the query time ranges will be used. Defaults to false.
     */
    dashboardTime?: boolean;
    /**
     * @deprecated Use dashboardTime instead
     */
    intersectTime?: boolean;
    /**
     * KQL query to be executed.
     */
    query?: string;
    /**
     * @deprecated Use resources instead
     */
    resource?: string;
    /**
     * Array of resource URIs to be queried.
     */
    resources?: Array<string>;
    /**
     * Specifies the format results should be returned as.
     */
    resultFormat?: ResultFormat;
    /**
     * If dashboardTime is set to true this value dictates which column the time filter will be applied to. Defaults to the first tables timeSpan column, the first datetime column found, or TimeGenerated
     */
    timeColumn?: string;
    /**
     * Workspace ID. This was removed in Grafana 8, but remains for backwards compat.
     */
    workspace?: string;
}
export declare const defaultAzureLogsQuery: Partial<AzureLogsQuery>;
/**
 * Application Insights Traces sub-query properties
 */
export interface AzureTracesQuery {
    /**
     * Filters for property values.
     */
    filters?: Array<AzureTracesFilter>;
    /**
     * Operation ID. Used only for Traces queries.
     */
    operationId?: string;
    /**
     * KQL query to be executed.
     */
    query?: string;
    /**
     * Array of resource URIs to be queried.
     */
    resources?: Array<string>;
    /**
     * Specifies the format results should be returned as.
     */
    resultFormat?: ResultFormat;
    /**
     * Types of events to filter by.
     */
    traceTypes?: Array<string>;
}
export declare const defaultAzureTracesQuery: Partial<AzureTracesQuery>;
export interface AzureTracesFilter {
    /**
     * Values to filter by.
     */
    filters: Array<string>;
    /**
     * Comparison operator to use. Either equals or not equals.
     */
    operation: string;
    /**
     * Property name, auto-populated based on available traces.
     */
    property: string;
}
export declare const defaultAzureTracesFilter: Partial<AzureTracesFilter>;
export declare enum ResultFormat {
    Logs = "logs",
    Table = "table",
    TimeSeries = "time_series",
    Trace = "trace"
}
export interface AzureResourceGraphQuery {
    /**
     * Azure Resource Graph KQL query to be executed.
     */
    query?: string;
    /**
     * Specifies the format results should be returned as. Defaults to table.
     */
    resultFormat?: string;
}
export interface AzureMonitorResource {
    metricNamespace?: string;
    region?: string;
    resourceGroup?: string;
    resourceName?: string;
    subscription?: string;
}
export interface AzureMetricDimension {
    /**
     * Name of Dimension to be filtered on.
     */
    dimension?: string;
    /**
     * @deprecated filter is deprecated in favour of filters to support multiselect.
     */
    filter?: string;
    /**
     * Values to match with the filter.
     */
    filters?: Array<string>;
    /**
     * String denoting the filter operation. Supports 'eq' - equals,'ne' - not equals, 'sw' - starts with. Note that some dimensions may not support all operators.
     */
    operator?: string;
}
export declare const defaultAzureMetricDimension: Partial<AzureMetricDimension>;
export type GrafanaTemplateVariableQueryType = ('AppInsightsMetricNameQuery' | 'AppInsightsGroupByQuery' | 'SubscriptionsQuery' | 'ResourceGroupsQuery' | 'ResourceNamesQuery' | 'MetricNamespaceQuery' | 'MetricNamesQuery' | 'WorkspacesQuery' | 'UnknownQuery');
export interface BaseGrafanaTemplateVariableQuery {
    rawQuery?: string;
}
export interface UnknownQuery extends BaseGrafanaTemplateVariableQuery {
    kind: 'UnknownQuery';
}
export interface AppInsightsMetricNameQuery extends BaseGrafanaTemplateVariableQuery {
    kind: 'AppInsightsMetricNameQuery';
}
export interface AppInsightsGroupByQuery extends BaseGrafanaTemplateVariableQuery {
    kind: 'AppInsightsGroupByQuery';
    metricName: string;
}
export interface SubscriptionsQuery extends BaseGrafanaTemplateVariableQuery {
    kind: 'SubscriptionsQuery';
}
export interface ResourceGroupsQuery extends BaseGrafanaTemplateVariableQuery {
    kind: 'ResourceGroupsQuery';
    subscription: string;
}
export interface ResourceNamesQuery extends BaseGrafanaTemplateVariableQuery {
    kind: 'ResourceNamesQuery';
    metricNamespace: string;
    resourceGroup: string;
    subscription: string;
}
export interface MetricNamespaceQuery extends BaseGrafanaTemplateVariableQuery {
    kind: 'MetricNamespaceQuery';
    metricNamespace?: string;
    resourceGroup: string;
    resourceName?: string;
    subscription: string;
}
/**
 * @deprecated Use MetricNamespaceQuery instead
 */
export interface MetricDefinitionsQuery extends BaseGrafanaTemplateVariableQuery {
    kind: 'MetricDefinitionsQuery';
    metricNamespace?: string;
    resourceGroup: string;
    resourceName?: string;
    subscription: string;
}
export interface MetricNamesQuery extends BaseGrafanaTemplateVariableQuery {
    kind: 'MetricNamesQuery';
    metricNamespace: string;
    resourceGroup: string;
    resourceName: string;
    subscription: string;
}
export interface WorkspacesQuery extends BaseGrafanaTemplateVariableQuery {
    kind: 'WorkspacesQuery';
    subscription: string;
}
export type GrafanaTemplateVariableQuery = (AppInsightsMetricNameQuery | AppInsightsGroupByQuery | SubscriptionsQuery | ResourceGroupsQuery | ResourceNamesQuery | MetricNamespaceQuery | MetricDefinitionsQuery | MetricNamesQuery | WorkspacesQuery | UnknownQuery);
export interface AzureMonitorDataQuery {
}
