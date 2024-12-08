import { DataFrame } from '../../types/dataFrame';
import { DataTransformerInfo, FieldMatcher, MatcherConfig } from '../../types/transformations';
import { ReducerID } from '../fieldReducer';
export declare enum ReduceTransformerMode {
    SeriesToRows = "seriesToRows",// default
    ReduceFields = "reduceFields"
}
export interface ReduceTransformerOptions {
    reducers: ReducerID[];
    fields?: MatcherConfig;
    mode?: ReduceTransformerMode;
    includeTimeField?: boolean;
    labelsToFields?: boolean;
}
export declare const reduceTransformer: DataTransformerInfo<ReduceTransformerOptions>;
/**
 * @internal -- only exported for testing
 */
export declare function reduceFields(data: DataFrame[], matcher: FieldMatcher, reducerId: ReducerID[]): DataFrame[];
