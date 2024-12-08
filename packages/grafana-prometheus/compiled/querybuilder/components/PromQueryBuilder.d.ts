import React from 'react';
import { PanelData } from '@grafana/data';
import { PrometheusDatasource } from '../../datasource';
import { PromVisualQuery } from '../types';
export interface PromQueryBuilderProps {
    query: PromVisualQuery;
    datasource: PrometheusDatasource;
    onChange: (update: PromVisualQuery) => void;
    onRunQuery: () => void;
    data?: PanelData;
    showExplain: boolean;
}
export declare const PromQueryBuilder: React.NamedExoticComponent<PromQueryBuilderProps>;
