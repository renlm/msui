import { QueryHint } from '@grafana/data';
import { PrometheusDatasource } from './datasource';
/**
 * Number of time series results needed before starting to suggest sum aggregation hints
 */
export declare const SUM_HINT_THRESHOLD_COUNT = 20;
export declare function getQueryHints(query: string, series?: unknown[], datasource?: PrometheusDatasource): QueryHint[];
export declare function getInitHints(datasource: PrometheusDatasource): QueryHint[];
