/// <reference types="react" />
import { AnyAction } from '@reduxjs/toolkit';
import { PrometheusDatasource } from '../../../../datasource';
import { QueryBuilderLabelFilter } from '../../../shared/types';
import { PromVisualQuery } from '../../../types';
import { MetricData, MetricsData, PromFilterOption } from '../types';
import { MetricsModalMetadata, MetricsModalState } from './state';
export declare function setMetrics(datasource: PrometheusDatasource, query: PromVisualQuery, initialMetrics?: string[]): Promise<MetricsModalMetadata>;
/**
 * The filtered and paginated metrics displayed in the modal
 * */
export declare function displayedMetrics(state: MetricsModalState, dispatch: React.Dispatch<AnyAction>): MetricData[];
/**
 * Filter the metrics with all the options, fuzzy, type, null metadata
 */
export declare function filterMetrics(state: MetricsModalState): MetricsData;
export declare function calculatePageList(state: MetricsModalState): number[];
export declare function sliceMetrics(metrics: MetricsData, pageNum: number, resultsPerPage: number): MetricData[];
export declare const calculateResultsPerPage: (results: number, defaultResults: number, max: number) => number;
/**
 * The backend query that replaces the uFuzzy search when the option 'useBackend' has been selected
 * this is a regex search either to the series or labels Prometheus endpoint
 * depending on which the Prometheus type or version supports
 * @param metricText
 * @param labels
 * @param datasource
 */
export declare function getBackendSearchMetrics(metricText: string, labels: QueryBuilderLabelFilter[], datasource: PrometheusDatasource): Promise<Array<{
    value: string;
}>>;
export declare function tracking(event: string, state?: MetricsModalState | null, metric?: string, query?: PromVisualQuery): void;
export declare const promTypes: PromFilterOption[];
export declare const placeholders: {
    browse: string;
    metadataSearchSwitch: string;
    type: string;
    includeNullMetadata: string;
    setUseBackend: string;
};
