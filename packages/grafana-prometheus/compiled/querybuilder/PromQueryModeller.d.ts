import { LokiAndPromQueryModellerBase } from './shared/LokiAndPromQueryModellerBase';
import { PromQueryPattern } from './types';
export declare class PromQueryModeller extends LokiAndPromQueryModellerBase {
    constructor();
    getQueryPatterns(): PromQueryPattern[];
}
export declare const promQueryModeller: PromQueryModeller;
