/**
 * Type representing a tag in a trace span or fields of a log.
 */
export type TraceKeyValuePair<T = any> = {
    key: string;
    value: T;
};
/**
 * Type representing a log in a span.
 */
export type TraceLog = {
    timestamp: number;
    fields: TraceKeyValuePair[];
};
export type TraceSpanReference = {
    traceID: string;
    spanID: string;
    tags?: TraceKeyValuePair[];
};
/**
 * This describes the structure of the dataframe that should be returned from a tracing data source to show trace
 * in a TraceView component.
 */
export interface TraceSpanRow {
    traceID: string;
    spanID: string;
    parentSpanID: string | undefined;
    operationName: string;
    serviceName: string;
    serviceTags: TraceKeyValuePair[];
    startTime: number;
    duration: number;
    logs?: TraceLog[];
    references?: TraceSpanReference[];
    tags?: TraceKeyValuePair[];
    kind?: string;
    statusCode?: number;
    statusMessage?: string;
    instrumentationLibraryName?: string;
    instrumentationLibraryVersion?: string;
    traceState?: string;
    warnings?: string[];
    stackTraces?: string[];
    errorIconColor?: string;
}
