import { DataFrame } from '../types/dataFrame';
/**
 * Returns true if both frames have the same name, fields, labels and configs.
 *
 * @example
 * To compare multiple frames use:
 * ```
 * compareArrayValues(a, b, framesHaveSameStructure);
 * ```
 * @beta
 */
export declare function compareDataFrameStructures(a: DataFrame, b: DataFrame, skipConfig?: boolean): boolean;
/**
 * Check if all values in two arrays match the compare function
 *
 * @beta
 */
export declare function compareArrayValues<T>(a: T[], b: T[], cmp: (a: T, b: T) => boolean): boolean;
type Cmp = (valA: unknown, valB: unknown) => boolean;
/**
 * Checks if two objects are equal shallowly
 *
 * @beta
 */
export declare function shallowCompare<T extends {}>(a: T, b: T, cmp?: Cmp): boolean;
export {};
