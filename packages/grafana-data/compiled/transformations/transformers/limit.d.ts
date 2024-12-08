import { DataTransformerInfo } from '../../types';
export interface LimitTransformerOptions {
    limitField?: number | string;
}
export declare const limitTransformer: DataTransformerInfo<LimitTransformerOptions>;
