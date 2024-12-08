import { LRParser } from '@lezer/lr';
export declare const ErrorId = 0;
interface ParserErrorBoundary {
    startLineNumber: number;
    startColumn: number;
    endLineNumber: number;
    endColumn: number;
    error: string;
}
/**
 * Conceived to work in combination with the MonacoQueryField component.
 * Given an original query, and it's interpolated version, it will return an array of ParserErrorBoundary
 * objects containing nodes which are actual errors. The interpolated version (even with placeholder variables)
 * is required because variables look like errors for Lezer.
 * @internal
 */
export declare function validateQuery(query: string, interpolatedQuery: string, queryLines: string[], parser: LRParser): ParserErrorBoundary[] | false;
export declare const placeHolderScopedVars: {
    __interval: {
        text: string;
        value: string;
    };
    __rate_interval: {
        text: string;
        value: string;
    };
    __auto: {
        text: string;
        value: string;
    };
    __interval_ms: {
        text: string;
        value: number;
    };
    __range_ms: {
        text: string;
        value: number;
    };
    __range_s: {
        text: string;
        value: number;
    };
    __range: {
        text: string;
        value: string;
    };
};
export {};
