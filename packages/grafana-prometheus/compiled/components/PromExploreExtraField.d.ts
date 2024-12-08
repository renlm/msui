import React from 'react';
import { PrometheusDatasource } from '../datasource';
import { PromQuery } from '../types';
export interface PromExploreExtraFieldProps {
    query: PromQuery;
    onChange: (value: PromQuery) => void;
    onRunQuery: () => void;
    datasource: PrometheusDatasource;
}
export declare const PromExploreExtraField: React.MemoExoticComponent<({ query, datasource, onChange, onRunQuery }: PromExploreExtraFieldProps) => React.JSX.Element>;
export declare function getQueryTypeOptions(includeBoth: boolean): {
    value: string;
    label: string;
    description: string;
}[];
export declare function getQueryTypeChangeHandler(query: PromQuery, onChange: (update: PromQuery) => void): (queryType: string) => void;
export declare const promExploreExtraFieldTestIds: {
    extraFieldEditor: string;
    stepField: string;
    queryTypeField: string;
};
