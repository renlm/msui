import React from 'react';
import { PromVisualQuery } from '../../types';
import { MetricsModalState } from './state/state';
import { MetricsData } from './types';
type ResultsTableProps = {
    metrics: MetricsData;
    onChange: (query: PromVisualQuery) => void;
    onClose: () => void;
    query: PromVisualQuery;
    state: MetricsModalState;
    disableTextWrap: boolean;
};
export declare function ResultsTable(props: ResultsTableProps): React.JSX.Element;
export {};
