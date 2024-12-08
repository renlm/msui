import { PromVariableQuery } from '../types';
export declare const PrometheusLabelNamesRegex: RegExp;
export declare const PrometheusLabelValuesRegex: RegExp;
export declare const PrometheusMetricNamesRegex: RegExp;
export declare const PrometheusQueryResultRegex: RegExp;
export declare const PrometheusLabelNamesRegexWithMatch: RegExp;
export declare function migrateVariableQueryToEditor(rawQuery: string | PromVariableQuery): PromVariableQuery;
export declare function migrateVariableEditorBackToVariableSupport(QueryVariable: PromVariableQuery): string;
