export declare const languageConfiguration: {
    wordPattern: RegExp;
    comments: {
        lineComment: string;
    };
    brackets: string[][];
    autoClosingPairs: {
        open: string;
        close: string;
    }[];
    surroundingPairs: {
        open: string;
        close: string;
    }[];
    folding: {};
};
export declare const language: {
    ignoreCase: boolean;
    defaultToken: string;
    tokenPostfix: string;
    keywords: string[];
    operators: string[];
    vectorMatching: string;
    symbols: RegExp;
    escapes: RegExp;
    digits: RegExp;
    octaldigits: RegExp;
    binarydigits: RegExp;
    hexdigits: RegExp;
    integersuffix: RegExp;
    floatsuffix: RegExp;
    tokenizer: {
        root: ((string | RegExp)[] | (RegExp | {
            cases: {
                '@keywords': string;
                '@default': string;
            };
        })[] | {
            include: string;
        } | (RegExp | {
            cases: {
                '@operators': string;
                '@default': string;
            };
        })[])[];
        string_double: (string | RegExp)[][];
        string_single: (string | RegExp)[][];
        string_backtick: (string | RegExp)[][];
        clauses: (string | RegExp)[][];
        whitespace: (string | RegExp)[][];
    };
};
