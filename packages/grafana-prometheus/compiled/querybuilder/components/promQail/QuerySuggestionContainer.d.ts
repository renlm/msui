import React from 'react';
import { PromVisualQuery } from '../../types';
import { QuerySuggestion, SuggestionType } from './types';
export type Props = {
    querySuggestions: QuerySuggestion[];
    suggestionType: SuggestionType;
    closeDrawer: () => void;
    nextInteraction: () => void;
    queryExplain: (idx: number) => void;
    onChange: (query: PromVisualQuery) => void;
    prompt: string;
};
export declare function QuerySuggestionContainer(props: Props): React.JSX.Element;
