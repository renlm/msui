import React, { ReactNode } from 'react';
import { TimeRange } from '@grafana/data';
import { PrometheusDatasource } from '../datasource';
import { PromQuery } from '../types';
export declare const PromQueryField: React.FunctionComponent<{
    datasource: PrometheusDatasource;
    query: PromQuery;
    range?: TimeRange | undefined;
    data?: import("@grafana/data").PanelData | undefined;
    onChange: (value: PromQuery) => void;
    queries?: import("@grafana/data").DataQuery[] | undefined;
    history?: import("@grafana/data").HistoryItem<PromQuery>[] | undefined;
    app?: import("@grafana/data").CoreApp | undefined;
    onRunQuery: () => void;
    onBlur?: (() => void) | undefined;
    onAddQuery?: ((query: PromQuery) => void) | undefined;
    'data-testid'?: string | undefined;
    ExtraFieldElement?: ReactNode;
}>;
