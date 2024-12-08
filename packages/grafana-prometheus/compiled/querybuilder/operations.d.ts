import { QueryBuilderOperation, QueryBuilderOperationDef, VisualQueryModeller } from './shared/types';
import { PromVisualQuery } from './types';
export declare function getOperationDefinitions(): QueryBuilderOperationDef[];
export declare function createFunction(definition: Partial<QueryBuilderOperationDef>): QueryBuilderOperationDef;
export declare function createRangeFunction(name: string, withRateInterval?: boolean): QueryBuilderOperationDef;
export declare function operationWithRangeVectorRenderer(model: QueryBuilderOperation, def: QueryBuilderOperationDef, innerExpr: string): string;
/**
 * Since there can only be one operation with range vector this will replace the current one (if one was added )
 */
export declare function addOperationWithRangeVector(def: QueryBuilderOperationDef, query: PromVisualQuery, modeller: VisualQueryModeller): {
    operations: QueryBuilderOperation[];
    metric: string;
    labels: import("./shared/types").QueryBuilderLabelFilter[];
    binaryQueries?: import("./types").PromVisualQueryBinary[] | undefined;
    useBackend?: boolean | undefined;
    disableTextWrap?: boolean | undefined;
    includeNullMetadata?: boolean | undefined;
    fullMetaSearch?: boolean | undefined;
};
