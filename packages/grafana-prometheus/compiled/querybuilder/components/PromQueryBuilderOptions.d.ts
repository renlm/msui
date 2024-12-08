import React from 'react';
import { CoreApp } from '@grafana/data';
import { PromQuery } from '../../types';
export interface UIOptions {
    exemplars: boolean;
    type: boolean;
    format: boolean;
    minStep: boolean;
    legend: boolean;
    resolution: boolean;
}
export interface PromQueryBuilderOptionsProps {
    query: PromQuery;
    app?: CoreApp;
    onChange: (update: PromQuery) => void;
    onRunQuery: () => void;
}
export declare const PromQueryBuilderOptions: React.NamedExoticComponent<PromQueryBuilderOptionsProps>;
