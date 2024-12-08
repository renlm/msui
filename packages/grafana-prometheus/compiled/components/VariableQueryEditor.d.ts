import React from 'react';
import { QueryEditorProps } from '@grafana/data';
import { PrometheusDatasource } from '../datasource';
import { PromOptions, PromQuery, PromVariableQuery, PromVariableQueryType as QueryType, StandardPromVariableQuery } from '../types';
export declare const variableOptions: {
    label: string;
    value: QueryType;
}[];
export type Props = QueryEditorProps<PrometheusDatasource, PromQuery, PromOptions, PromVariableQuery>;
export declare const PromVariableQueryEditor: ({ onChange, query, datasource, range }: Props) => React.JSX.Element;
export declare function variableMigration(query: string | PromVariableQuery | StandardPromVariableQuery): PromVariableQuery;
