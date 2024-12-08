import { Grammar } from 'prismjs';
import React from 'react';
import { QueryBuilderOperation, QueryWithOperations, VisualQueryModeller } from './types';
export interface Props<T extends QueryWithOperations> {
    query: T;
    queryModeller: VisualQueryModeller;
    explainMode?: boolean;
    stepNumber: number;
    lang: {
        grammar: Grammar;
        name: string;
    };
    onMouseEnter?: (op: QueryBuilderOperation, index: number) => void;
    onMouseLeave?: (op: QueryBuilderOperation, index: number) => void;
}
export declare function OperationListExplained<T extends QueryWithOperations>({ query, queryModeller, stepNumber, lang, onMouseEnter, onMouseLeave, }: Props<T>): React.JSX.Element;
