/// <reference types="lodash" />
export declare function fuzzySearch(haystack: string[], query: string, dispatcher: (data: string[][]) => void): void;
export declare const debouncedFuzzySearch: import("lodash").DebouncedFunc<typeof fuzzySearch>;
