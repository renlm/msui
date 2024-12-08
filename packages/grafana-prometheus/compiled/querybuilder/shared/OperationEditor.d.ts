import React from 'react';
import { DataSourceApi, TimeRange } from '@grafana/data';
import { QueryBuilderOperation, VisualQueryModeller } from './types';
export interface Props {
    operation: QueryBuilderOperation;
    index: number;
    query: any;
    datasource: DataSourceApi;
    queryModeller: VisualQueryModeller;
    onChange: (index: number, update: QueryBuilderOperation) => void;
    onRemove: (index: number) => void;
    onRunQuery: () => void;
    flash?: boolean;
    highlight?: boolean;
    timeRange?: TimeRange;
}
export declare function OperationEditor({ operation, index, onRemove, onChange, onRunQuery, queryModeller, query, datasource, flash, highlight, timeRange, }: Props): React.JSX.Element;
