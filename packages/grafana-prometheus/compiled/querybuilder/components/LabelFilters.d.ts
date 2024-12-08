import React from 'react';
import { SelectableValue } from '@grafana/data';
import { QueryBuilderLabelFilter } from '../shared/types';
export declare const MISSING_LABEL_FILTER_ERROR_MESSAGE = "Select at least 1 label filter (label and value)";
export interface LabelFiltersProps {
    labelsFilters: QueryBuilderLabelFilter[];
    onChange: (labelFilters: Array<Partial<QueryBuilderLabelFilter>>) => void;
    onGetLabelNames: (forLabel: Partial<QueryBuilderLabelFilter>) => Promise<SelectableValue[]>;
    onGetLabelValues: (forLabel: Partial<QueryBuilderLabelFilter>) => Promise<SelectableValue[]>;
    /** If set to true, component will show error message until at least 1 filter is selected */
    labelFilterRequired?: boolean;
    getLabelValuesAutofillSuggestions: (query: string, labelName?: string) => Promise<SelectableValue[]>;
    debounceDuration: number;
    variableEditor?: boolean;
}
export declare function LabelFilters({ labelsFilters, onChange, onGetLabelNames, onGetLabelValues, labelFilterRequired, getLabelValuesAutofillSuggestions, debounceDuration, variableEditor, }: LabelFiltersProps): React.JSX.Element;
