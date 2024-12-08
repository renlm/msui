import { DataFrame, Field } from '../types/dataFrame';
export declare function isTimeSeriesFrame(frame: DataFrame): boolean;
export declare function isTimeSeriesFrames(data: DataFrame[]): boolean;
/**
 * Determines if a field is a time field in ascending
 * order within the sampling range specified by
 * MAX_TIME_COMPARISONS
 *
 * @param field
 * @returns boolean
 */
export declare function isTimeSeriesField(field: Field): boolean;
/**
 * Indicates if there is any time field in the array of data frames
 * @param data
 */
export declare function anySeriesWithTimeField(data: DataFrame[]): boolean;
/**
 * Indicates if there is any time field in the data frame
 * @param data
 */
export declare function hasTimeField(data: DataFrame): boolean;
/**
 * Get row id based on the meta.uniqueRowIdFields attribute.
 * @param dataFrame
 * @param rowIndex
 */
export declare function getRowUniqueId(dataFrame: DataFrame, rowIndex: number): string | undefined;
/**
 * Simple helper to add values to a data frame. Doesn't do any validation so make sure you are adding the right types
 * of values.
 * @param dataFrame
 * @param row Either an array of values or an object with keys that match the field names.
 */
export declare function addRow(dataFrame: DataFrame, row: Record<string, unknown> | unknown[]): void;
