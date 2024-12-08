import { DataFrame, Field, FieldMatcher } from '../../types';
import { JoinMode } from './joinByField';
export declare function pickBestJoinField(data: DataFrame[]): FieldMatcher;
/**
 * @internal
 */
export interface JoinOptions {
    /**
     * The input fields
     */
    frames: DataFrame[];
    /**
     * The field to join -- frames that do not have this field will be dropped
     */
    joinBy?: FieldMatcher;
    /**
     * Optionally filter the non-join fields
     */
    keep?: FieldMatcher;
    /**
     * @internal -- used when we need to keep a reference to the original frame/field index
     */
    keepOriginIndices?: boolean;
    /**
     * @internal -- keep any pre-cached state.displayName
     */
    keepDisplayNames?: boolean;
    /**
     * @internal -- Optionally specify how to treat null values
     */
    nullMode?: (field: Field) => JoinNullMode;
    /**
     * @internal -- Optionally specify a join mode (outer or inner)
     */
    mode?: JoinMode;
}
/**
 * @internal
 */
export declare function maybeSortFrame(frame: DataFrame, fieldIdx: number): DataFrame;
/**
 * This will return a single frame joined by the first matching field.  When a join field is not specified,
 * the default will use the first time field
 */
export declare function joinDataFrames(options: JoinOptions): DataFrame | undefined;
export type TypedArray = Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array;
export type AlignedData = TypedArray[] | [xValues: number[] | TypedArray, ...yValues: Array<Array<number | null | undefined> | TypedArray>];
export declare const NULL_REMOVE = 0;
export declare const NULL_RETAIN = 1;
export declare const NULL_EXPAND = 2;
type JoinNullMode = number;
export declare function join(tables: AlignedData[], nullModes?: number[][], mode?: JoinMode): number[][];
export declare function isLikelyAscendingVector(data: any[], samples?: number): boolean;
export {};
