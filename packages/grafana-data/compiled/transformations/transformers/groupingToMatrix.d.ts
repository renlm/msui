import { DataTransformerInfo, SpecialValue } from '../../types';
export interface GroupingToMatrixTransformerOptions {
    columnField?: string;
    rowField?: string;
    valueField?: string;
    emptyValue?: SpecialValue;
}
export declare const groupingToMatrixTransformer: DataTransformerInfo<GroupingToMatrixTransformerOptions>;
