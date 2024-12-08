import { QueryResultMeta } from '../types';
import { Field, DataFrame } from '../types/dataFrame';
/**
 * The ArrayDataFrame takes an array of objects and presents it as a DataFrame
 *
 * @deprecated use arrayToDataFrame
 */
export declare class ArrayDataFrame<T = any> implements DataFrame {
    fields: Field[];
    length: number;
    name?: string;
    refId?: string;
    meta?: QueryResultMeta;
    constructor(source: T[], names?: string[]);
}
/**
 * arrayToDataFrame will convert any array into a DataFrame.
 * @param source - can be an array of objects or an array of simple values.
 * @param names - will be used for ordering of fields. Source needs to be array of objects if names are provided.
 *
 * @public
 */
export declare function arrayToDataFrame(source: Array<Record<string, unknown>> | unknown[], names?: string[]): DataFrame;
