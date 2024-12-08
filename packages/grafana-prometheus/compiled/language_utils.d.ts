import { Token } from 'prismjs';
import { AbstractLabelMatcher, AbstractQuery, DataQuery, DateTime, TimeRange } from '@grafana/data';
import { PrometheusCacheLevel, PromMetricsMetadata, PromMetricsMetadataItem } from './types';
export declare const processHistogramMetrics: (metrics: string[]) => string[];
export declare function processLabels(labels: Array<{
    [key: string]: string;
}>, withName?: boolean): {
    values: {
        [key: string]: string[];
    };
    keys: string[];
};
export declare const selectorRegexp: RegExp;
export declare const labelRegexp: RegExp;
export declare function parseSelector(query: string, cursorOffset?: number): {
    labelKeys: string[];
    selector: string;
};
export declare function expandRecordingRules(query: string, mapping: {
    [name: string]: string;
}): string;
/**
 * Adds metadata for synthetic metrics for which the API does not provide metadata.
 * See https://github.com/grafana/grafana/issues/22337 for details.
 *
 * @param metadata HELP and TYPE metadata from /api/v1/metadata
 */
export declare function fixSummariesMetadata(metadata: {
    [metric: string]: PromMetricsMetadataItem[];
}): PromMetricsMetadata;
export declare function roundMsToMin(milliseconds: number): number;
export declare function roundSecToMin(seconds: number): number;
export declare function roundSecToNextMin(seconds: number, secondsToRound?: number): number;
export declare function limitSuggestions(items: string[]): string[];
export declare function addLimitInfo(items: unknown[] | undefined): string;
export declare function escapeLabelValueInExactSelector(labelValue: string): string;
export declare function escapeLabelValueInRegexSelector(labelValue: string): string;
export declare function toPromLikeExpr(labelBasedQuery: AbstractQuery): string;
export declare function toPromLikeQuery(labelBasedQuery: AbstractQuery): PromLikeQuery;
export interface PromLikeQuery extends DataQuery {
    expr: string;
    range: boolean;
}
export declare function extractLabelMatchers(tokens: Array<string | Token>): AbstractLabelMatcher[];
/**
 * Calculates new interval "snapped" to the closest Nth minute, depending on cache level datasource setting
 * @param cacheLevel
 * @param range
 */
export declare function getRangeSnapInterval(cacheLevel: PrometheusCacheLevel, range: TimeRange): {
    start: string;
    end: string;
};
export declare function getClientCacheDurationInMinutes(cacheLevel: PrometheusCacheLevel): 1 | 10 | 60;
export declare function getPrometheusTime(date: string | DateTime, roundUp: boolean): number;
export declare function truncateResult<T>(array: T[], limit?: number): T[];
