import React from 'react';
import { PanelData } from '@grafana/data';
import { PrometheusDatasource } from '../../datasource';
import { LokiAndPromQueryModellerBase, PromLokiVisualQuery } from './LokiAndPromQueryModellerBase';
export interface Props<T extends PromLokiVisualQuery> {
    query: T;
    datasource: PrometheusDatasource;
    queryModeller: LokiAndPromQueryModellerBase;
    buildVisualQueryFromString: (expr: string) => {
        query: T;
    };
    onChange: (update: T) => void;
    data?: PanelData;
}
export declare const QueryBuilderHints: {
    <T extends PromLokiVisualQuery>({ datasource, query: visualQuery, onChange, data, queryModeller, buildVisualQueryFromString, }: Props<T>): React.JSX.Element;
    displayName: string;
};
