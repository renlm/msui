import React from 'react';
import { HighlightPart } from '../../types';
interface Props {
    text: string;
    highlightParts: HighlightPart[];
    highlightClassName: string;
}
export declare const PartialHighlighter: (props: Props) => React.JSX.Element | null;
export {};
