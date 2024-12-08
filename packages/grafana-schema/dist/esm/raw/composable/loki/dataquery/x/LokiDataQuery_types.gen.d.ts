import * as common from '@grafana/schema';
export declare const pluginVersion = "11.1.11";
export declare enum QueryEditorMode {
    Builder = "builder",
    Code = "code"
}
export declare enum LokiQueryType {
    Instant = "instant",
    Range = "range",
    Stream = "stream"
}
export declare enum SupportingQueryType {
    DataSample = "dataSample",
    InfiniteScroll = "infiniteScroll",
    LogsSample = "logsSample",
    LogsVolume = "logsVolume"
}
export declare enum LokiQueryDirection {
    Backward = "backward",
    Forward = "forward"
}
export interface LokiDataQuery extends common.DataQuery {
    editorMode?: QueryEditorMode;
    /**
     * The LogQL query.
     */
    expr: string;
    /**
     * @deprecated, now use queryType.
     */
    instant?: boolean;
    /**
     * Used to override the name of the series.
     */
    legendFormat?: string;
    /**
     * Used to limit the number of log rows returned.
     */
    maxLines?: number;
    /**
     * @deprecated, now use queryType.
     */
    range?: boolean;
    /**
     * @deprecated, now use step.
     */
    resolution?: number;
    /**
     * Used to set step value for range queries.
     */
    step?: string;
}
