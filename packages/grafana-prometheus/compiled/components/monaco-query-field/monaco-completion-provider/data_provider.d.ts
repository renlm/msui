import { HistoryItem } from '@grafana/data';
import PromQlLanguageProvider from '../../../language_provider';
import { PromQuery } from '../../../types';
export declare const CODE_MODE_SUGGESTIONS_INCOMPLETE_EVENT = "codeModeSuggestionsIncomplete";
export type SuggestionsIncompleteEvent = CustomEvent<{
    limit: number;
    datasourceUid: string;
}>;
export declare function isSuggestionsIncompleteEvent(e: Event): e is SuggestionsIncompleteEvent;
interface Metric {
    name: string;
    help: string;
    type: string;
}
export interface DataProviderParams {
    languageProvider: PromQlLanguageProvider;
    historyProvider: Array<HistoryItem<PromQuery>>;
}
export declare class DataProvider {
    readonly languageProvider: PromQlLanguageProvider;
    readonly historyProvider: Array<HistoryItem<PromQuery>>;
    readonly getSeriesLabels: typeof this.languageProvider.getSeriesLabels;
    readonly getSeriesValues: typeof this.languageProvider.getSeriesValues;
    readonly getAllLabelNames: typeof this.languageProvider.getLabelKeys;
    readonly getLabelValues: typeof this.languageProvider.getLabelValues;
    readonly metricNamesSuggestionLimit: number;
    /**
     * The text that's been typed so far within the current {@link Monaco.Range | Range}.
     *
     * @remarks
     * This is useful with fuzzy searching items to provide as Monaco autocomplete suggestions.
     */
    private inputInRange;
    private suggestionsIncomplete;
    constructor(params: DataProviderParams);
    getHistory(): string[];
    getAllMetricNames(): string[];
    metricNamesToMetrics(metricNames: string[]): Metric[];
    private enableAutocompleteSuggestionsUpdate;
    private setInputInRange;
    get monacoSettings(): {
        /**
         * Enable autocomplete suggestions update on every input change.
         *
         * @remarks
         * If fuzzy search is used in `getCompletions` to trim down results to improve performance,
         * we need to instruct Monaco to update the completions on every input change, so that the
         * completions reflect the current input.
         */
        enableAutocompleteSuggestionsUpdate: () => void;
        inputInRange: string;
        setInputInRange: (textInput: string) => void;
        suggestionsIncomplete: boolean;
    };
}
export {};
