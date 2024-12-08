import { KeyValue } from '../types/data';
import { Field } from '../types/dataFrame';
export interface Dimension<T = any> {
    name: string;
    columns: Array<Field<T>>;
}
export type Dimensions = KeyValue<Dimension>;
export declare const createDimension: (name: string, columns: Field[]) => Dimension;
export declare const getColumnsFromDimension: (dimension: Dimension) => Field<any>[];
export declare const getColumnFromDimension: (dimension: Dimension, column: number) => Field<any>;
export declare const getValueFromDimension: (dimension: Dimension, column: number, row: number) => any;
export declare const getAllValuesFromDimension: (dimension: Dimension, column: number, row: number) => any[];
export declare const getDimensionByName: (dimensions: Dimensions, name: string) => Dimension<any>;
