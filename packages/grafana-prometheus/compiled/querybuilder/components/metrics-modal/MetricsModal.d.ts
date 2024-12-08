import React from 'react';
import { SelectableValue } from '@grafana/data';
import { PrometheusDatasource } from '../../../datasource';
import { PromVisualQuery } from '../../types';
import { MetricsModalMetadata } from './state/state';
import { MetricsData } from './types';
export type MetricsModalProps = {
    datasource: PrometheusDatasource;
    isOpen: boolean;
    query: PromVisualQuery;
    onClose: () => void;
    onChange: (query: PromVisualQuery) => void;
    initialMetrics: string[];
};
export declare const MetricsModal: (props: MetricsModalProps) => React.JSX.Element;
export declare const metricsModaltestIds: {
    metricModal: string;
    searchMetric: string;
    searchWithMetadata: string;
    selectType: string;
    metricCard: string;
    useMetric: string;
    searchPage: string;
    resultsPerPage: string;
    setUseBackend: string;
    showAdditionalSettings: string;
};
export declare const setIsLoading: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, "metrics-modal-state/setIsLoading">, buildMetrics: import("@reduxjs/toolkit").ActionCreatorWithPayload<MetricsModalMetadata, "metrics-modal-state/buildMetrics">, filterMetricsBackend: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    metrics: MetricsData;
    filteredMetricCount: number;
    isLoading: boolean;
}, "metrics-modal-state/filterMetricsBackend">, setResultsPerPage: import("@reduxjs/toolkit").ActionCreatorWithPayload<number, "metrics-modal-state/setResultsPerPage">, setPageNum: import("@reduxjs/toolkit").ActionCreatorWithPayload<number, "metrics-modal-state/setPageNum">, setFuzzySearchQuery: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "metrics-modal-state/setFuzzySearchQuery">, setNameHaystack: import("@reduxjs/toolkit").ActionCreatorWithPayload<string[][], "metrics-modal-state/setNameHaystack">, setMetaHaystack: import("@reduxjs/toolkit").ActionCreatorWithPayload<string[][], "metrics-modal-state/setMetaHaystack">, setFullMetaSearch: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, "metrics-modal-state/setFullMetaSearch">, setIncludeNullMetadata: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, "metrics-modal-state/setIncludeNullMetadata">, setSelectedTypes: import("@reduxjs/toolkit").ActionCreatorWithPayload<SelectableValue<string>[], "metrics-modal-state/setSelectedTypes">, setUseBackend: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, "metrics-modal-state/setUseBackend">, setDisableTextWrap: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"metrics-modal-state/setDisableTextWrap">, showAdditionalSettings: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"metrics-modal-state/showAdditionalSettings">, setFilteredMetricCount: import("@reduxjs/toolkit").ActionCreatorWithPayload<number, "metrics-modal-state/setFilteredMetricCount">;
