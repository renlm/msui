import { CoreApp } from '@grafana/data';
import { PromQuery } from '../types';
import { QueryEditorMode } from './shared/types';
export declare function changeEditorMode(query: PromQuery, editorMode: QueryEditorMode, onChange: (query: PromQuery) => void): void;
/**
 * Returns query with defaults, and boolean true/false depending on change was required
 */
export declare function getQueryWithDefaults(query: PromQuery & {
    expr?: string;
}, app: CoreApp | undefined, defaultEditor?: QueryEditorMode): PromQuery;
