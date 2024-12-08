import { ScopedVars } from '../types';
export declare const containsSearchFilter: (query: string | unknown) => boolean;
export interface SearchFilterOptions {
    searchFilter?: string;
}
export declare const getSearchFilterScopedVar: (args: {
    query: string;
    wildcardChar: string;
    options?: SearchFilterOptions;
}) => ScopedVars;
