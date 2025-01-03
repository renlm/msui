import React from 'react';
import { VariableSuggestion } from '@grafana/data';
interface DataLinkInputProps {
    value: string;
    onChange: (url: string, callback?: () => void) => void;
    suggestions: VariableSuggestion[];
    placeholder?: string;
}
export declare const DataLinkInput: React.MemoExoticComponent<({ value, onChange, suggestions, placeholder, }: DataLinkInputProps) => React.JSX.Element>;
export {};
