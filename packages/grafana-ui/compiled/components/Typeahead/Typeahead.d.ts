import React, { PureComponent } from 'react';
import { FixedSizeList } from 'react-window';
import { GrafanaTheme2, ThemeContext } from '@grafana/data';
import { CompletionItem, CompletionItemGroup } from '../../types/completion';
interface Props {
    origin: string;
    groupedItems: CompletionItemGroup[];
    prefix?: string;
    menuRef?: (el: Typeahead) => void;
    onSelectSuggestion?: (suggestion: CompletionItem) => void;
    isOpen?: boolean;
}
export interface State {
    allItems: CompletionItem[];
    listWidth: number;
    listHeight: number;
    itemHeight: number;
    hoveredItem: number | null;
    typeaheadIndex: number | null;
}
export declare class Typeahead extends PureComponent<Props, State> {
    static contextType: React.Context<GrafanaTheme2>;
    context: React.ContextType<typeof ThemeContext>;
    listRef: React.RefObject<FixedSizeList<any>>;
    state: State;
    componentDidMount: () => void;
    componentWillUnmount: () => void;
    handleSelectionChange: () => void;
    componentDidUpdate: (prevProps: Readonly<Props>, prevState: Readonly<State>) => void;
    onMouseEnter: (index: number) => void;
    onMouseLeave: () => void;
    moveMenuIndex: (moveAmount: number) => void;
    insertSuggestion: () => void;
    get menuPosition(): string;
    render(): React.JSX.Element;
}
export {};
