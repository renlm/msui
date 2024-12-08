import type * as monacoType from 'monaco-editor/esm/vs/editor/editor.api';
import React from 'react';
export declare const CodeEditor: React.FunctionComponent<{
    value: string;
    width?: string | number | undefined;
    onChange?: import("./types").CodeEditorChangeHandler | undefined;
    onBlur?: import("./types").CodeEditorChangeHandler | undefined;
    readOnly?: boolean | undefined;
    height?: string | number | undefined;
    onFocus?: import("./types").CodeEditorChangeHandler | undefined;
    language: string;
    showMiniMap?: boolean | undefined;
    showLineNumbers?: boolean | undefined;
    monacoOptions?: import("./types").MonacoOptionsWithGrafanaDefaults | undefined;
    onBeforeEditorMount?: ((monaco: typeof monacoType) => void) | undefined;
    onEditorDidMount?: ((editor: monacoType.editor.IStandaloneCodeEditor, monaco: typeof monacoType) => void) | undefined;
    onEditorWillUnmount?: (() => void) | undefined;
    onSave?: import("./types").CodeEditorChangeHandler | undefined;
    getSuggestions?: import("./types").CodeEditorSuggestionProvider | undefined;
    containerStyles?: string | undefined;
}>;