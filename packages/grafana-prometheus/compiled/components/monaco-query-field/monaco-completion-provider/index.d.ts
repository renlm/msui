import type { Monaco, monacoTypes } from '@grafana/ui';
import { DataProvider } from './data_provider';
export declare function getSuggestOptions(): monacoTypes.editor.ISuggestOptions;
export declare function getCompletionProvider(monaco: Monaco, dataProvider: DataProvider): monacoTypes.languages.CompletionItemProvider;
