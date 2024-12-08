import { Registry } from '@grafana/data';
import { QueryBuilderLabelFilter, QueryBuilderOperation, QueryBuilderOperationDef, VisualQueryModeller } from './types';
export interface VisualQueryBinary<T> {
    operator: string;
    vectorMatchesType?: 'on' | 'ignoring';
    vectorMatches?: string;
    query: T;
}
export interface PromLokiVisualQuery {
    metric?: string;
    labels: QueryBuilderLabelFilter[];
    operations: QueryBuilderOperation[];
    binaryQueries?: Array<VisualQueryBinary<PromLokiVisualQuery>>;
}
export declare abstract class LokiAndPromQueryModellerBase implements VisualQueryModeller {
    protected operationsRegistry: Registry<QueryBuilderOperationDef>;
    private categories;
    constructor(getOperations: () => QueryBuilderOperationDef[]);
    protected setOperationCategories(categories: string[]): void;
    getOperationsForCategory(category: string): QueryBuilderOperationDef<any>[];
    getAlternativeOperations(key: string): QueryBuilderOperationDef<any>[];
    getCategories(): string[];
    getOperationDef(id: string): QueryBuilderOperationDef | undefined;
    renderOperations(queryString: string, operations: QueryBuilderOperation[]): string;
    renderBinaryQueries(queryString: string, binaryQueries?: Array<VisualQueryBinary<PromLokiVisualQuery>>): string;
    private renderBinaryQuery;
    renderLabels(labels: QueryBuilderLabelFilter[]): string;
    renderQuery(query: PromLokiVisualQuery, nested?: boolean): string;
    hasBinaryOp(query: PromLokiVisualQuery): boolean;
}
