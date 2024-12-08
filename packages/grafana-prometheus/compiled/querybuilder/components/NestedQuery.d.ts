import React from 'react';
import { PrometheusDatasource } from '../../datasource';
import { PromVisualQueryBinary } from '../types';
export interface NestedQueryProps {
    nestedQuery: PromVisualQueryBinary;
    datasource: PrometheusDatasource;
    index: number;
    onChange: (index: number, update: PromVisualQueryBinary) => void;
    onRemove: (index: number) => void;
    onRunQuery: () => void;
    showExplain: boolean;
}
export declare const NestedQuery: React.NamedExoticComponent<NestedQueryProps>;
