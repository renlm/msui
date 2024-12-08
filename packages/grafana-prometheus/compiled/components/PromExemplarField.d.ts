import React from 'react';
import { PrometheusDatasource } from '../datasource';
import { PromQuery } from '../types';
interface Props {
    onChange: (exemplar: boolean) => void;
    datasource: PrometheusDatasource;
    query: PromQuery;
    'data-testid'?: string;
}
export declare function PromExemplarField({ datasource, onChange, query, ...rest }: Props): React.JSX.Element;
export {};
