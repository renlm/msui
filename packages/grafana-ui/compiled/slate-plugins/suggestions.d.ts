import { Plugin as SlatePlugin } from 'slate-react';
import { BootData } from '@grafana/data';
import { SuggestionsState, TypeaheadInput, TypeaheadOutput } from '../types';
export declare const TYPEAHEAD_DEBOUNCE = 250;
declare global {
    interface Window {
        grafanaBootData?: BootData;
    }
}
export declare function SuggestionsPlugin({ onTypeahead, cleanText, onWillApplySuggestion, portalOrigin, }: {
    onTypeahead?: (typeahead: TypeaheadInput) => Promise<TypeaheadOutput>;
    cleanText?: (text: string) => string;
    onWillApplySuggestion?: (suggestion: string, state: SuggestionsState) => string;
    portalOrigin: string;
}): SlatePlugin;
export declare function getNumCharsToDelete(suggestionText: string, typeaheadPrefix: string, typeaheadText: string, preserveSuffix: boolean, deleteBackwards?: number, cleanText?: (text: string) => string): {
    forward: number;
    backward: number;
};
