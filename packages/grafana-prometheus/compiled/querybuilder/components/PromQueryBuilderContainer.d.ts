import React from 'react';
import { PanelData } from '@grafana/data';
import { PrometheusDatasource } from '../../datasource';
import { PromQuery } from '../../types';
import { PromVisualQuery } from '../types';
export interface PromQueryBuilderContainerProps {
    query: PromQuery;
    datasource: PrometheusDatasource;
    onChange: (update: PromQuery) => void;
    onRunQuery: () => void;
    data?: PanelData;
    showExplain: boolean;
}
export interface State {
    visQuery?: PromVisualQuery;
    expr: string;
}
/**
 * This component is here just to contain the translation logic between string query and the visual query builder model.
 */
export declare function PromQueryBuilderContainer(props: PromQueryBuilderContainerProps): React.JSX.Element | null;
