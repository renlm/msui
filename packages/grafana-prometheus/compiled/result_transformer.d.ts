import { DataFrame, DataQueryRequest, DataQueryResponse } from '@grafana/data';
import { ExemplarTraceIdDestination, PromQuery } from './types';
export declare function transformV2(response: DataQueryResponse, request: DataQueryRequest<PromQuery>, options: {
    exemplarTraceIdDestinations?: ExemplarTraceIdDestination[];
}): {
    data: DataFrame[];
    key?: string | undefined;
    error?: import("@grafana/data").DataQueryError | undefined;
    errors?: import("@grafana/data").DataQueryError[] | undefined;
    state?: import("@grafana/data").LoadingState | undefined;
    traceIds?: string[] | undefined;
};
export declare function transformDFToTable(dfs: DataFrame[]): DataFrame[];
export declare function getOriginalMetricName(labelData: {
    [key: string]: string;
}): string;
/** @internal */
export declare function transformToHistogramOverTime(seriesList: DataFrame[]): DataFrame[];
export declare function sortSeriesByLabel(s1: DataFrame, s2: DataFrame): number;
/** @internal */
export declare function parseSampleValue(value: string): number;
