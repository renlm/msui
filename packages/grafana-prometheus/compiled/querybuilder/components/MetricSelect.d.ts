import React from 'react';
import { SelectableValue } from '@grafana/data';
import { PrometheusDatasource } from '../../datasource';
import { QueryBuilderLabelFilter } from '../shared/types';
import { PromVisualQuery } from '../types';
export interface MetricSelectProps {
    metricLookupDisabled: boolean;
    query: PromVisualQuery;
    onChange: (query: PromVisualQuery) => void;
    onGetMetrics: () => Promise<SelectableValue[]>;
    datasource: PrometheusDatasource;
    labelsFilters: QueryBuilderLabelFilter[];
    onBlur?: () => void;
    variableEditor?: boolean;
}
export declare const PROMETHEUS_QUERY_BUILDER_MAX_RESULTS = 1000;
export declare function MetricSelect({ datasource, query, onChange, onGetMetrics, labelsFilters, metricLookupDisabled, onBlur, variableEditor, }: Readonly<MetricSelectProps>): React.JSX.Element;
export declare const formatPrometheusLabelFiltersToString: (queryString: string, labelsFilters: QueryBuilderLabelFilter[] | undefined) => string;
export declare const formatPrometheusLabelFilters: (labelsFilters: QueryBuilderLabelFilter[]) => string[];
