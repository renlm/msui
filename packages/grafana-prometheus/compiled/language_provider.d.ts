import Prism from 'prismjs';
import { AbstractQuery, LanguageProvider, TimeRange } from '@grafana/data';
import { BackendSrvRequest } from '@grafana/runtime';
import { Label } from './components/monaco-query-field/monaco-completion-provider/situation';
import { PrometheusDatasource } from './datasource';
import { PromMetricsMetadata, PromQuery } from './types';
export declare const SUGGESTIONS_LIMIT = 10000;
export declare function getMetadataString(metric: string, metadata: PromMetricsMetadata): string | undefined;
export declare function getMetadataHelp(metric: string, metadata: PromMetricsMetadata): string | undefined;
export declare function getMetadataType(metric: string, metadata: PromMetricsMetadata): string | undefined;
export default class PromQlLanguageProvider extends LanguageProvider {
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
