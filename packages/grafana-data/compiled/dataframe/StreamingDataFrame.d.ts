import { DataFrame, Field, FieldDTO, Labels, QueryResultMeta } from '..';
import { DataFrameJSON, FieldSchema } from '.';
/**
 * Indicate if the frame is appened or replace
 *
 * @alpha
 */
export declare enum StreamingFrameAction {
    Append = "append",
    Replace = "replace"
}
/**
 * @alpha
 * */
export interface StreamingFrameOptions {
    maxLength: number;
    maxDelta: number;
    action: StreamingFrameAction;
    /** optionally format field names based on labels */
    displayNameFormat?: string;
}
/**
 * Stream packet info is attached to StreamingDataFrames and indicate how many
 * rows were added to the end of the frame.  The number of discarded rows can be
 * calculated from previous state
 */
export interface StreamPacketInfo {
    number: number;
    action: StreamingFrameAction;
    length: number;
    schemaChanged: boolean;
}
declare enum PushMode {
    wide = 0,
    labels = 1
}
export type SerializedStreamingDataFrame = {
    name?: string;
    fields: FieldDTO[];
    refId?: string;
    meta: QueryResultMeta;
    schemaFields: FieldSchema[];
    timeFieldIndex: number;
    pushMode: PushMode;
    length: number;
    packetInfo: StreamPacketInfo;
    options: StreamingFrameOptions;
    labels: Set<string>;
};
/**
 * Unlike a circular buffer, this will append and periodically slice the front
 */
export declare class StreamingDataFrame implements DataFrame {
    options: StreamingFrameOptions;
    name?: string;
    refId?: string;
    meta: QueryResultMeta;
    fields: Field[];
    length: number;
    private schemaFields;
    private timeFieldIndex;
    private pushMode;
    private labels;
    readonly packetInfo: StreamPacketInfo;
    private constructor();
    serialize: (fieldPredicate?: (f: Field) => boolean, optionsOverride?: Partial<StreamingFrameOptions>, trimValues?: {
        maxLength?: number;
    }) => SerializedStreamingDataFrame;
    private initFromSerialized;
    static deserialize: (serialized: SerializedStreamingDataFrame) => StreamingDataFrame;
    static empty: (opts?: Partial<StreamingFrameOptions>) => StreamingDataFrame;
    static fromDataFrameJSON: (frame: DataFrameJSON, opts?: Partial<StreamingFrameOptions>) => StreamingDataFrame;
    private get alwaysReplace();
    needsResizing: ({ maxLength, maxDelta }: StreamingFrameOptions) => boolean;
    resize: ({ maxLength, maxDelta }: Partial<StreamingFrameOptions>) => void;
    /**
     * apply the new message to the existing data.  This will replace the existing schema
     * if a new schema is included in the message, or append data matching the current schema
     */
    push(msg: DataFrameJSON): StreamPacketInfo;
    pushNewValues: (values: unknown[][]) => void;
    resetStateCalculations: () => void;
    getMatchingFieldIndexes: (fieldPredicate: (f: Field) => boolean) => number[];
    getValuesFromLastPacket: () => unknown[][];
    hasAtLeastOnePacket: () => boolean;
    private addLabel;
    getOptions: () => Readonly<StreamingFrameOptions>;
}
export declare function getStreamingFrameOptions(opts?: Partial<StreamingFrameOptions>): StreamingFrameOptions;
export declare function transpose(vrecs: unknown[][]): Map<any, any>;
export declare function closestIdx(num: number, arr: number[], lo?: number, hi?: number): number;
export declare function parseLabelsFromField(str: string): Labels;
/**
 * @internal // not exported in yet
 */
export declare function getLastStreamingDataFramePacket(frame: DataFrame): StreamPacketInfo | undefined;
export {};
