import React from 'react';
import { SelectableValue } from '@grafana/data';
import { QueryBuilderLabelFilter } from '../shared/types';
export interface LabelFilterItemProps {
    defaultOp: string;
    item: Partial<QueryBuilderLabelFilter>;
    onChange: (value: QueryBuilderLabelFilter) => void;
    onGetLabelNames: (forLabel: Partial<QueryBuilderLabelFilter>) => Promise<SelectableValue[]>;
    onGetLabelValues: (forLabel: Partial<QueryBuilderLabelFilter>) => Promise<SelectableValue[]>;
    onDelete: () => void;
    invalidLabel?: boolean;
    invalidValue?: boolean;
    getLabelValuesAutofillSuggestions: (query: string, labelName?: string) => Promise<SelectableValue[]>;
    debounceDuration: number;
}
export declare function LabelFilterItem({ item, defaultOp, onChange, onDelete, onGetLabelNames, onGetLabelValues, invalidLabel, invalidValue, getLabelValuesAutofillSuggestions, debounceDuration, }: LabelFilterItemProps): React.JSX.Element;
