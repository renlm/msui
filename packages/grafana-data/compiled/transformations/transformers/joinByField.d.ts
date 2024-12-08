import { SynchronousDataTransformerInfo } from '../../types';
export declare enum JoinMode {
    outer = "outer",// best for time series, non duplicated join on values
    inner = "inner",
    outerTabular = "outerTabular"
}
export interface JoinByFieldOptions {
    byField?: string;
    mode?: JoinMode;
}
export declare const joinByFieldTransformer: SynchronousDataTransformerInfo<JoinByFieldOptions>;
