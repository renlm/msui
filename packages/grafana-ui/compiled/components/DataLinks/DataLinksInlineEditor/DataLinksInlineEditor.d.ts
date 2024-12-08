import React from 'react';
import { DataFrame, DataLink, VariableSuggestion } from '@grafana/data';
interface DataLinksInlineEditorProps {
    links?: DataLink[];
    onChange: (links: DataLink[]) => void;
    getSuggestions: () => VariableSuggestion[];
    data: DataFrame[];
}
export declare const DataLinksInlineEditor: ({ links, onChange, getSuggestions, data }: DataLinksInlineEditorProps) => React.JSX.Element;
export {};
