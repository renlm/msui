import { QueryBuilderOperationDef } from './shared/types';
import { PromOperationId } from './types';
export declare const binaryScalarDefs: ({
    id: PromOperationId;
    name: string;
    sign: string;
    comparison?: undefined;
} | {
    id: PromOperationId;
    name: string;
    sign: string;
    comparison: boolean;
})[];
export declare const binaryScalarOperatorToOperatorName: Record<string, {
    id: string;
    comparison?: boolean | undefined;
}>;
export declare const binaryScalarOperations: QueryBuilderOperationDef[];
