import { AnnotationEvent, DataFrame } from '../types';
import { BusEventBase, BusEventWithPayload } from './types';
/**
 * When hovering over an element this will identify
 *
 * For performance reasons, this object will usually be mutated between updates.  This
 * will avoid creating new objects for events that fire frequently (ie each mouse pixel)
 *
 * @alpha
 */
export interface DataHoverPayload {
    data?: DataFrame;
    rowIndex?: number;
    columnIndex?: number;
    dataId?: string;
    point: Record<string, number | null>;
    down?: Record<string, number | null>;
}
/** @alpha */
export declare class DataHoverEvent extends BusEventWithPayload<DataHoverPayload> {
    static type: string;
}
/** @alpha */
export declare class DataHoverClearEvent extends BusEventBase {
    static type: string;
}
/** @alpha */
export declare class DataSelectEvent extends BusEventWithPayload<DataHoverPayload> {
    static type: string;
}
/** @alpha */
export declare class AnnotationChangeEvent extends BusEventWithPayload<Partial<AnnotationEvent>> {
    static type: string;
}
export type DashboardLoadedEventPayload<T> = {
    dashboardId: string;
    orgId?: number;
    userId?: number;
    grafanaVersion?: string;
    queries: Record<string, T[]>;
};
/** @alpha */
export declare class DashboardLoadedEvent<T> extends BusEventWithPayload<DashboardLoadedEventPayload<T>> {
    static type: string;
}
export declare class DataSourceUpdatedSuccessfully extends BusEventBase {
    static type: string;
}
export declare class DataSourceTestSucceeded extends BusEventBase {
    static type: string;
}
export declare class DataSourceTestFailed extends BusEventBase {
    static type: string;
}
export declare class SetPanelAttentionEvent extends BusEventWithPayload<{
    panelId: string | number;
}> {
    static type: string;
}
