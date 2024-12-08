import React from 'react';
import { DataFrame, DataLink, VariableSuggestion } from '@grafana/data';
interface DataLinkEditorModalContentProps {
    link: DataLink;
    index: number;
    data: DataFrame[];
    getSuggestions: () => VariableSuggestion[];
    onSave: (index: number, ink: DataLink) => void;
    onCancel: (index: number) => void;
}
export declare const DataLinkEditorModalContent: ({ link, index, getSuggestions, onSave, onCancel, }: DataLinkEditorModalContentProps) => React.JSX.Element;
export {};
