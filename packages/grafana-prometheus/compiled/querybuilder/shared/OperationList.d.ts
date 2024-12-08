import React from 'react';
import { DataSourceApi, TimeRange } from '@grafana/data';
import { QueryBuilderOperation, QueryWithOperations, VisualQueryModeller } from './types';
export interface Props<T extends QueryWithOperations> {
    query: T;
    datasource: DataSourceApi;
    onChange: (query: T) => void;
    onRunQuery: () => void;
    queryModeller: VisualQueryModeller;
    explainMode?: boolean;
    highlightedOp?: QueryBuilderOperation;
    timeRange?: TimeRange;
}
export declare function OperationList<T extends QueryWithOperations>({ query, datasource, queryModeller, onChange, onRunQuery, highlightedOp, timeRange, }: Props<T>): React.JSX.Element;
