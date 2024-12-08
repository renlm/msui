import { SelectableValue } from '@grafana/data';
import { PromVisualQuery } from '../../../types';
import { HaystackDictionary, MetricsData } from '../types';
export declare const DEFAULT_RESULTS_PER_PAGE = 100;
export declare const MAXIMUM_RESULTS_PER_PAGE = 1000;
/**
 * Initial state for the metrics explorer
 * @returns
 */
export declare function initialState(query?: PromVisualQuery): MetricsModalState;
/**
 * The metrics explorer state object
 */
export interface MetricsModalState {
    /** Used for the loading spinner */
    isLoading: boolean;
    /**
     * Initial collection of metrics.
     * The frontend filters do not impact this, but
     * it is reduced by the backend search.
     */
    metrics: MetricsData;
    /** Field for disabling type select and switches that rely on metadata */
    hasMetadata: boolean;
    /** Used to display metrics and help with fuzzy order */
    nameHaystackDictionary: HaystackDictionary;
    /** Used to sort name fuzzy search by relevance */
    nameHaystackOrder: string[];
    /** Used to highlight text in fuzzy matches */
    nameHaystackMatches: string[];
    /** Used to display metrics and help with fuzzy order for search across all metadata */
    metaHaystackDictionary: HaystackDictionary;
    /** Used to sort meta fuzzy search by relevance */
    metaHaystackOrder: string[];
    /** Used to highlight text in fuzzy matches */
    metaHaystackMatches: string[];
    /** Total results computed on initialization */
    totalMetricCount: number;
    /** Set after filtering metrics */
    filteredMetricCount: number | null;
    /** Pagination field for showing results in table */
    resultsPerPage: number;
    /** Pagination field */
    pageNum: number;
    /** The text query used to match metrics */
    fuzzySearchQuery: string;
    /** Enables the fuzzy meatadata search */
    fullMetaSearch: boolean;
    /** Includes results that are missing type and description */
    includeNullMetadata: boolean;
    /** Filter by prometheus type */
    selectedTypes: Array<SelectableValue<string>>;
    /** Filter by the series match endpoint instead of the fuzzy search */
    useBackend: boolean;
    /** Disable text wrap for descriptions in the results table */
    disableTextWrap: boolean;
    /** Display toggle switches for settings */
    showAdditionalSettings: boolean;
}
/**
 * Type for the useEffect get metadata function
 */
export type MetricsModalMetadata = {
    isLoading: boolean;
    metrics: MetricsData;
    hasMetadata: boolean;
    metaHaystackDictionary: HaystackDictionary;
    nameHaystackDictionary: HaystackDictionary;
    totalMetricCount: number;
    filteredMetricCount: number | null;
};
export declare function getSettings(visQuery: PromVisualQuery): MetricsModalSettings;
export type MetricsModalSettings = {
    useBackend?: boolean;
    disableTextWrap?: boolean;
    fullMetaSearch?: boolean;
    includeNullMetadata?: boolean;
};
