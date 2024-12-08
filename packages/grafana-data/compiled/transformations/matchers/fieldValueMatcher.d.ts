import { ComparisonOperation } from '@grafana/schema';
import { FieldMatcherInfo } from '../../types/transformations';
import { ReducerID } from '../fieldReducer';
export interface FieldValueMatcherConfig {
    reducer: ReducerID;
    op?: ComparisonOperation;
    value?: number;
}
export declare const fieldValueMatcherInfo: FieldMatcherInfo<FieldValueMatcherConfig>;
