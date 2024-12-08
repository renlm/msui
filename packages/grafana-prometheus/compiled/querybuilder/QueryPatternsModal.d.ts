import React from 'react';
import { CoreApp, DataQuery } from '@grafana/data';
import { PromQuery } from '../types';
type Props = {
    isOpen: boolean;
    query: PromQuery;
    queries: DataQuery[] | undefined;
    app?: CoreApp;
    onClose: () => void;
    onChange: (query: PromQuery) => void;
    onAddQuery?: (query: PromQuery) => void;
};
export declare const QueryPatternsModal: (props: Props) => React.JSX.Element;
export {};
