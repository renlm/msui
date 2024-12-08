import { DataQueryRequest, DataQueryResponse } from '@grafana/data';
import { PromQuery } from './types';
export declare function trackQuery(response: DataQueryResponse, request: DataQueryRequest<PromQuery> & {
    targets: PromQuery[];
}, startTime: Date): void;
