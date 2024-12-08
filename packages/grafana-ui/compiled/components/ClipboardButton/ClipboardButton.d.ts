import React from 'react';
import { ButtonProps } from '../Button';
export interface Props extends ButtonProps {
    /** A function that returns text to be copied */
    getText(): string;
    /** Callback when the text has been successfully copied */
    onClipboardCopy?(copiedText: string): void;
    /** Callback when there was an error copying the text */
    onClipboardError?(copiedText: string, error: unknown): void;
}
export declare function ClipboardButton({ onClipboardCopy, onClipboardError, children, getText, icon, variant, ...buttonProps }: Props): React.JSX.Element;
