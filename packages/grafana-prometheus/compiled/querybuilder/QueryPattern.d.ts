import React from 'react';
import { PromQueryPattern } from './types';
type Props = {
    pattern: PromQueryPattern;
    hasNewQueryOption: boolean;
    hasPreviousQuery: boolean | string;
    selectedPatternName: string | null;
    setSelectedPatternName: (name: string | null) => void;
    onPatternSelect: (pattern: PromQueryPattern, selectAsNewQuery?: boolean) => void;
};
export declare const QueryPattern: (props: Props) => React.JSX.Element;
export {};
