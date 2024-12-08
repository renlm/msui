import { GrafanaTheme2 } from '../../themes';
import { SynchronousDataTransformerInfo } from '../../types';
import { DataFrame, Field } from '../../types/dataFrame';
/**
 * @internal
 */
export declare const histogramBucketSizes: number[];
export interface HistogramTransformerInputs {
    bucketCount?: number;
    bucketSize?: string | number;
    bucketOffset?: string | number;
    combine?: boolean;
}
/**
 * @alpha
 */
export interface HistogramTransformerOptions {
    bucketCount?: number;
    bucketSize?: number;
    bucketOffset?: number;
    combine?: boolean;
}
/**
 * This is a helper class to use the same text in both a panel and transformer UI
 *
 * @internal
 */
export declare const histogramFieldInfo: {
    bucketCount: {
        name: string;
        description: string;
    };
    bucketSize: {
        name: string;
        description: undefined;
    };
    bucketOffset: {
        name: string;
        description: string;
    };
    combine: {
        name: string;
        description: string;
    };
};
/**
 * @alpha
 */
export declare const histogramTransformer: SynchronousDataTransformerInfo<HistogramTransformerInputs>;
/**
 * @internal
 */
export declare const histogramFrameBucketMinFieldName = "xMin";
/**
 * @internal
 */
export declare function isHistogramFrameBucketMinFieldName(v: string): boolean;
/**
 * @internal
 */
export declare const histogramFrameBucketMaxFieldName = "xMax";
/**
 * @internal
 */
export declare function isHistogramFrameBucketMaxFieldName(v: string): boolean;
/**
 * @alpha
 */
export interface HistogramFields {
    xMin: Field;
    xMax: Field;
    counts: Field[];
}
/**
 * Given a frame, find the explicit histogram fields
 *
 * @alpha
 */
export declare function getHistogramFields(frame: DataFrame): HistogramFields | undefined;
/**
 * @alpha
 */
export declare function buildHistogram(frames: DataFrame[], options?: HistogramTransformerOptions): HistogramFields | null;
/**
 * @internal
 */
export declare function incrRound(num: number, incr: number): number;
/**
 * @internal
 */
export declare function incrRoundUp(num: number, incr: number): number;
/**
 * @internal
 */
export declare function incrRoundDn(num: number, incr: number): number;
/**
 * @internal
 */
export declare function histogramFieldsToFrame(info: HistogramFields, theme?: GrafanaTheme2): DataFrame;
