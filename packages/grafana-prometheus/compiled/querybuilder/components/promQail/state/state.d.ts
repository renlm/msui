import { PromVisualQuery } from '../../../types';
import { Interaction, SuggestionType } from '../types';
/**
 * Initial state for PromQAIL
 * @param query the prometheus query with metric and possible labels
 */
export declare function initialState(query?: PromVisualQuery, showStartingMessage?: boolean): PromQailState;
/**
 * The PromQAIL state object
 */
export interface PromQailState {
    query: PromVisualQuery;
    showExplainer: boolean;
    showStartingMessage: boolean;
    indicateCheckbox: boolean;
    askForQueryHelp: boolean;
    interactions: Interaction[];
}
export declare function createInteraction(suggestionType: SuggestionType, isLoading?: boolean): Interaction;
