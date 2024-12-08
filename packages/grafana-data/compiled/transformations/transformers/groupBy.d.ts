import { DataFrame, Field } from '../../types';
import { DataTransformerInfo } from '../../types/transformations';
import { ReducerID } from '../fieldReducer';
export declare enum GroupByOperationID {
    aggregate = "aggregate",
    groupBy = "groupby"
}
export interface GroupByFieldOptions {
    aggregations: ReducerID[];
    operation: GroupByOperationID | null;
}
export interface GroupByTransformerOptions {
    fields: Record<string, GroupByFieldOptions>;
}
interface FieldMap {
    [key: string]: Field;
}
export declare const groupByTransformer: DataTransformerInfo<GroupByTransformerOptions>;
/**
 * Groups values together by key. This will create a mapping of strings
 * to _FieldMaps_ that will then be used to group values on.
 *
 * @param frame
 *  The dataframe containing the data to group.
 * @param groupByFields
 *  An array of fields to group on.
 */
export declare function groupValuesByKey(frame: DataFrame, groupByFields: Field[]): Map<string, FieldMap>;
/**
 * Create new fields which will be used to display grouped values.
 *
 * @param groupByFields
 * @param valuesByGroupKey
 * @returns
 *  Returns an array of fields that have been grouped.
 */
export declare function createGroupedFields(groupByFields: Field[], valuesByGroupKey: Map<string, FieldMap>): Field[];
export {};
