import React from 'react';
import { CompletionItem } from '../../types/completion';
interface Props {
    isSelected: boolean;
    item: CompletionItem;
    style: React.CSSProperties;
    prefix?: string;
    onClickItem?: (event: React.MouseEvent) => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}
export declare const TypeaheadItem: (props: Props) => React.JSX.Element;
export {};
