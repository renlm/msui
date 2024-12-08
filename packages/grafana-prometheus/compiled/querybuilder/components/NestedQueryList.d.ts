import React from 'react';
import { PrometheusDatasource } from '../../datasource';
import { PromVisualQuery } from '../types';
export interface NestedQueryListProps {
    query: PromVisualQuery;
    datasource: PrometheusDatasource;
    onChange: (query: PromVisualQuery) => void;
    onRunQuery: () => void;
    showExplain: boolean;
}
export declare function NestedQueryList(props: NestedQueryListProps): React.JSX.Element;
