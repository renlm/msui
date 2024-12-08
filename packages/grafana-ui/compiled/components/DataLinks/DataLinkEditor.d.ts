import React from 'react';
import { VariableSuggestion, DataLink } from '@grafana/data';
interface DataLinkEditorProps {
    index: number;
    isLast: boolean;
    value: DataLink;
    suggestions: VariableSuggestion[];
    onChange: (index: number, link: DataLink, callback?: () => void) => void;
}
export declare const DataLinkEditor: React.MemoExoticComponent<({ index, value, onChange, suggestions, isLast }: DataLinkEditorProps) => React.JSX.Element>;
export {};
