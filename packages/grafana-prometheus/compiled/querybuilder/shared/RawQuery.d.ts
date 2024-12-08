import { Grammar } from 'prismjs';
import React from 'react';
export interface Props {
    query: string;
    lang: {
        grammar: Grammar;
        name: string;
    };
    className?: string;
}
export declare function RawQuery({ query, lang, className }: Props): React.JSX.Element;
