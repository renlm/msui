import React, { PureComponent } from 'react';
import { Value } from 'slate';
import { Editor, EventHook, Plugin } from 'slate-react';
import { GrafanaTheme2 } from '@grafana/data';
import { CompletionItemGroup, SuggestionsState, TypeaheadInput, TypeaheadOutput } from '../../types/completion';
import { Themeable2 } from '../../types/theme';
export interface QueryFieldProps extends Themeable2 {
    additionalPlugins?: Plugin[];
    cleanText?: (text: string) => string;
    disabled?: boolean;
    query?: string | null;
    onRunQuery?: () => void;
    onBlur?: () => void;
    onChange?: (value: string) => void;
    onRichValueChange?: (value: Value) => void;
    onClick?: EventHook<React.MouseEvent<Element, MouseEvent>>;
    onTypeahead?: (typeahead: TypeaheadInput) => Promise<TypeaheadOutput>;
    onWillApplySuggestion?: (suggestion: string, state: SuggestionsState) => string;
    placeholder?: string;
    portalOrigin: string;
    syntax?: string;
    syntaxLoaded?: boolean;
    theme: GrafanaTheme2;
}
export interface QueryFieldState {
    suggestions: CompletionItemGroup[];
    typeaheadContext: string | null;
    typeaheadPrefix: string;
    typeaheadText: string;
    value: Value;
}
/**
 * Renders an editor field.
 * Pass initial value as initialQuery and listen to changes in props.onValueChanged.
 * This component can only process strings. Internally it uses Slate Value.
 * Implement props.onTypeahead to use suggestions, see PromQueryField.tsx as an example.
 */
export declare class UnThemedQueryField extends PureComponent<QueryFieldProps, QueryFieldState> {
    plugins: Array<Plugin<Editor>>;
    runOnChangeDebounced: Function;
    lastExecutedValue: Value | null;
    mounted: boolean;
    editor: Editor | null;
    constructor(props: QueryFieldProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(prevProps: QueryFieldProps, prevState: QueryFieldState): void;
    /**
     * Update local state, propagate change upstream and optionally run the query afterwards.
     */
    onChange: (value: Value, runQuery?: boolean) => void;
    runOnChange: () => void;
    runOnRunQuery: () => void;
    runOnChangeAndRunQuery: () => void;
    /**
     * We need to handle blur events here mainly because of dashboard panels which expect to have query executed on blur.
     */
    handleBlur: (_: React.FocusEvent | undefined, editor: Editor, next: Function) => any;
    cleanText(text: string): string;
    render(): React.JSX.Element;
}
export declare const QueryField: React.FunctionComponent<{
    query?: string | null | undefined;
    disabled?: boolean | undefined;
    onChange?: ((value: string) => void) | undefined;
    onClick?: EventHook<React.MouseEvent<Element, MouseEvent>> | undefined;
    onRunQuery?: (() => void) | undefined;
    onBlur?: (() => void) | undefined;
    placeholder?: string | undefined;
    syntax?: string | undefined;
    onTypeahead?: ((typeahead: TypeaheadInput) => Promise<TypeaheadOutput>) | undefined;
    cleanText?: ((text: string) => string) | undefined;
    onWillApplySuggestion?: ((suggestion: string, state: SuggestionsState) => string) | undefined;
    portalOrigin: string;
    additionalPlugins?: Plugin<Editor>[] | undefined;
    onRichValueChange?: ((value: Value) => void) | undefined;
    syntaxLoaded?: boolean | undefined;
}>;
