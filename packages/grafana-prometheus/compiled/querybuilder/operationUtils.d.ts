import { QueryBuilderLabelFilter, QueryBuilderOperation, QueryBuilderOperationDef, QueryBuilderOperationParamDef, QueryBuilderOperationParamValue, QueryWithOperations } from './shared/types';
export declare function functionRendererLeft(model: QueryBuilderOperation, def: QueryBuilderOperationDef, innerExpr: string): string;
export declare function functionRendererRight(model: QueryBuilderOperation, def: QueryBuilderOperationDef, innerExpr: string): string;
export declare function rangeRendererRightWithParams(model: QueryBuilderOperation, def: QueryBuilderOperationDef, innerExpr: string): string;
export declare function rangeRendererLeftWithParams(model: QueryBuilderOperation, def: QueryBuilderOperationDef, innerExpr: string): string;
export declare function defaultAddOperationHandler<T extends QueryWithOperations>(def: QueryBuilderOperationDef, query: T): T & {
    operations: QueryBuilderOperation[];
};
export declare function getPromOperationDisplayName(funcName: string): string;
export declare function getOperationParamId(operationId: string, paramIndex: number): string;
export declare function getRangeVectorParamDef(withRateInterval?: boolean): QueryBuilderOperationParamDef;
export declare function createAggregationOperation(name: string, overrides?: Partial<QueryBuilderOperationDef>): QueryBuilderOperationDef[];
export declare function createAggregationOperationWithParam(name: string, paramsDef: {
    params: QueryBuilderOperationParamDef[];
    defaultParams: QueryBuilderOperationParamValue[];
}, overrides?: Partial<QueryBuilderOperationDef>): QueryBuilderOperationDef[];
/**
 * Very simple poc implementation, needs to be modified to support all aggregation operators
 */
export declare function getAggregationExplainer(aggregationName: string, mode: 'by' | 'without' | ''): (model: QueryBuilderOperation) => string;
/**
 * This function will transform operations without labels to their plan aggregation operation
 */
export declare function getLastLabelRemovedHandler(changeToOperationId: string): (index: number, op: QueryBuilderOperation, def: QueryBuilderOperationDef) => QueryBuilderOperation;
export declare function getOnLabelAddedHandler(changeToOperationId: string): (index: number, op: QueryBuilderOperation, def: QueryBuilderOperationDef) => QueryBuilderOperation;
export declare function isConflictingSelector(newLabel: Partial<QueryBuilderLabelFilter>, labels: Array<Partial<QueryBuilderLabelFilter>>): boolean;
