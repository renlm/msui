/**
 * @preserve jquery-param (c) 2015 KNOWLEDGECODE | MIT
 */
import { URLRange, RawTimeRange } from '../types';
import { ExploreUrlState } from '../types/explore';
/**
 * Type to represent the value of a single query variable.
 *
 * @public
 */
export type UrlQueryValue = string | number | boolean | string[] | number[] | boolean[] | undefined | null;
/**
 * Type to represent the values parsed from the query string.
 *
 * @public
 */
export type UrlQueryMap = Record<string, UrlQueryValue>;
declare function renderUrl(path: string, query: UrlQueryMap | undefined): string;
/**
 *  Encodes URL parameters in the style of AngularJS.
 *  Use `serializeParams` to encode parameters using `encodeURIComponent` instead.
 */
declare function toUrlParams(a: any, encodeAsAngularJS?: boolean): string;
/**
 * Converts params into a URL-encoded query string.
 *
 * @param params data to serialize
 * @returns A URL-encoded string representing the provided data.
 */
declare function serializeParams(params: unknown): string;
declare function appendQueryToUrl(url: string, stringToAppend: string): string;
/**
 * Return search part (as object) of current url
 */
declare function getUrlSearchParams(): UrlQueryMap;
/**
 * Parses an escaped url query string into key-value pairs.
 * Attribution: Code dervived from https://github.com/angular/angular.js/master/src/Angular.js#L1396
 * @returns {Object.<string,boolean|Array>}
 */
export declare function parseKeyValue(keyValue: string): any;
export declare const urlUtil: {
    renderUrl: typeof renderUrl;
    toUrlParams: typeof toUrlParams;
    appendQueryToUrl: typeof appendQueryToUrl;
    getUrlSearchParams: typeof getUrlSearchParams;
    parseKeyValue: typeof parseKeyValue;
    serializeParams: typeof serializeParams;
};
/**
 * Create an string that is used in URL to represent the Explore state. This is basically just a stringified json
 * that is used as a state of a single Explore pane so it does not represent full Explore URL so some properties
 * may be omitted (they will be filled in with default values).
 *
 * @param urlState
 * @param compact this parameter is deprecated and will be removed in a future release.
 */
export declare function serializeStateToUrlParam(urlState: Partial<ExploreUrlState>, compact?: boolean): string;
/**
 * Converts RawTimeRange to a string that is stored in the URL
 * - relative - stays as it is (e.g. "now")
 * - absolute - converted to ms
 */
export declare const toURLRange: (range: RawTimeRange) => URLRange;
export {};
