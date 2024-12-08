import { DataQuery } from '@grafana/schema';
import { PreferredVisualisationType } from './data';
import { TimeRange } from './time';
type AnyQuery = DataQuery & Record<string, any>;
export type URLRangeValue = string | {
    __brand: 'URL Range Value';
};
/**
 * @internal
 */
export type URLRange = {
    from: URLRangeValue;
    to: URLRangeValue;
};
/** @internal */
export interface ExploreUrlState<T extends DataQuery = AnyQuery> {
    datasource: string | null;
    queries: T[];
    range: URLRange;
    panelsState?: ExplorePanelsState;
}
export interface ExplorePanelsState extends Partial<Record<PreferredVisualisationType, {}>> {
    trace?: ExploreTracePanelState;
    logs?: ExploreLogsPanelState;
}
/**
 * Keep a list of vars the correlations editor / helper in explore will use
 *
 * vars can be modified by transformation variables, origVars is so we can rebuild the original list
 */
/** @internal */
export interface ExploreCorrelationHelperData {
    resultField: string;
    origVars: Record<string, string>;
    vars: Record<string, string>;
}
export interface ExploreTracePanelState {
    spanId?: string;
}
export interface ExploreLogsPanelState {
    id?: string;
    columns?: Record<number, string>;
    visualisationType?: 'table' | 'logs';
    labelFieldName?: string;
    refId?: string;
}
export interface SplitOpenOptions<T extends AnyQuery = AnyQuery> {
    datasourceUid: string;
    queries: T[];
    range?: TimeRange;
    panelsState?: ExplorePanelsState;
    correlationHelperData?: ExploreCorrelationHelperData;
}
/**
 * SplitOpen type is used in Explore and related components.
 */
export type SplitOpen = (options?: SplitOpenOptions | undefined) => void;
export {};
