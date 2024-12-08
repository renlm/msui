import React from 'react';
import { PromVisualQuery } from '../../types';
import { QuerySuggestion } from './types';
export type Props = {
    querySuggestion: QuerySuggestion;
    order: number;
    queryExplain: (idx: number) => void;
    historical: boolean;
    onChange: (query: PromVisualQuery) => void;
    closeDrawer: () => void;
    last: boolean;
    prompt: string;
    allSuggestions: string | undefined;
};
export declare function QuerySuggestionItem(props: Props): React.JSX.Element;
