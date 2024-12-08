import React from 'react';
import { PrometheusDatasource } from '../../datasource';
import { PromVisualQuery } from '../types';
export interface MetricsLabelsSectionProps {
    query: PromVisualQuery;
    datasource: PrometheusDatasource;
    onChange: (update: PromVisualQuery) => void;
    variableEditor?: boolean;
    onBlur?: () => void;
}
export declare function MetricsLabelsSection({ datasource, query, onChange, onBlur, variableEditor, }: MetricsLabelsSectionProps): React.JSX.Element;
