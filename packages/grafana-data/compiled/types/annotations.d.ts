import { ComponentType } from 'react';
import { Observable } from 'rxjs';
import { AnnotationQuery as SchemaAnnotationQuery, DataQuery } from '@grafana/schema';
import { DataFrame } from './dataFrame';
import { QueryEditorProps } from './datasource';
/**
 * This JSON object is stored in the dashboard json model.
 */
export interface AnnotationQuery<TQuery extends DataQuery = DataQuery> extends SchemaAnnotationQuery<TQuery> {
    snapshotData?: any;
    mappings?: AnnotationEventMappings;
    type?: string;
    [key: string]: any;
}
export interface AnnotationEvent {
    id?: string;
    annotation?: any;
    dashboardId?: number;
    /** May be null if it isn't set via the HTTP API */
    dashboardUID?: string | null;
    panelId?: number;
    userId?: number;
    login?: string;
    email?: string;
    avatarUrl?: string;
    time?: number;
    timeEnd?: number;
    isRegion?: boolean;
    title?: string;
    text?: string;
    type?: string;
    tags?: string[];
    color?: string;
    alertId?: number;
    newState?: string;
    source?: any;
}
export interface AnnotationEventUIModel {
    id?: string;
    from: number;
    to: number;
    tags: string[];
    description: string;
}
/**
 * @alpha -- any value other than `field` is experimental
 */
export declare enum AnnotationEventFieldSource {
    Field = "field",// Default -- find the value with a matching key
    Text = "text",// Write a constant string into the value
    Skip = "skip"
}
export interface AnnotationEventFieldMapping {
    source?: AnnotationEventFieldSource;
    value?: string;
    regex?: string;
}
export type AnnotationEventMappings = Partial<Record<keyof AnnotationEvent, AnnotationEventFieldMapping>>;
type AnnotationQueryEditorProps<TQuery extends DataQuery> = QueryEditorProps<any, TQuery> & {
    annotation?: AnnotationQuery<TQuery>;
    onAnnotationChange?: (annotation: AnnotationQuery<TQuery>) => void;
};
/**
 * Since Grafana 7.2
 *
 * This offers a generic approach to annotation processing
 */
export interface AnnotationSupport<TQuery extends DataQuery = DataQuery, TAnno = AnnotationQuery<TQuery>> {
    /**
     * This hook lets you manipulate any existing stored values before running them though the processor.
     * This is particularly helpful when dealing with migrating old formats.  ie query as a string vs object.
     */
    prepareAnnotation?(json: any): TAnno;
    /**
     * Convert the stored JSON model to a standard datasource query object.
     * This query will be executed in the datasource and the results converted into events.
     * Returning an undefined result will quietly skip query execution
     */
    prepareQuery?(anno: TAnno): TQuery | undefined;
    /**
     * When the standard frame > event processing is insufficient, this allows explicit control of the mappings
     */
    processEvents?(anno: TAnno, data: DataFrame[]): Observable<AnnotationEvent[] | undefined>;
    /**
     * Specify a custom QueryEditor for the annotation page. If not specified, the standard one will be used
     */
    QueryEditor?: ComponentType<AnnotationQueryEditorProps<TQuery>>;
    /**
     * Define this method if you want to pre-populate the editor with a default query
     */
    getDefaultQuery?(): Partial<TQuery>;
}
export {};
