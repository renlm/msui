import React from 'react';
import { VariableSuggestion } from '@grafana/data';
interface DataLinkSuggestionsProps {
    activeRef?: React.RefObject<HTMLDivElement>;
    suggestions: VariableSuggestion[];
    activeIndex: number;
    onSuggestionSelect: (suggestion: VariableSuggestion) => void;
    onClose?: () => void;
}
export declare const DataLinkSuggestions: {
    ({ suggestions, ...otherProps }: DataLinkSuggestionsProps): React.JSX.Element;
    displayName: string;
};
export {};
