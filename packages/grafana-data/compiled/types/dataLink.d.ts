import { ExploreCorrelationHelperData, ExplorePanelsState } from './explore';
import { InterpolateFunction } from './panel';
import { DataQuery } from './query';
import { TimeRange } from './time';
/**
 * Callback info for DataLink click events
 */
export interface DataLinkClickEvent<T = any> {
    origin: T;
    replaceVariables: InterpolateFunction | undefined;
    e?: any;
}
/**
 * Data Links can be created by data source plugins or correlations.
 * Origin is set in DataLink object and indicates where the link was created.
 */
export declare enum DataLinkConfigOrigin {
    Datasource = "Datasource",
    Correlations = "Correlations",
    ExploreCorrelationsEditor = "CorrelationsEditor"
}
/**
 * Link configuration. The values may contain variables that need to be
 * processed before showing the link to user.
 *
 * TODO: <T extends DataQuery> is not strictly true for internal links as we do not need refId for example but all
 *  data source defined queries extend this so this is more for documentation.
 */
export interface DataLink<T extends DataQuery = any> {
    title: string;
    targetBlank?: boolean;
    url: string;
    onBuildUrl?: (event: DataLinkClickEvent) => string;
    onClick?: (event: DataLinkClickEvent) => void;
    internal?: InternalDataLink<T>;
    origin?: DataLinkConfigOrigin;
}
/**
 * We provide tooltips with information about these to guide the user, please
 * check for validity when adding more transformation types.
 *
 * @internal
 */
export declare enum SupportedTransformationType {
    Regex = "regex",
    Logfmt = "logfmt"
}
/** @internal */
export interface DataLinkTransformationConfig {
    type: SupportedTransformationType;
    field?: string;
    expression?: string;
    mapValue?: string;
}
/** @internal */
export interface InternalDataLink<T extends DataQuery = any> {
    query: T;
    datasourceUid: string;
    datasourceName: string;
    panelsState?: ExplorePanelsState;
    meta?: {
        correlationData?: ExploreCorrelationHelperData;
    };
    transformations?: DataLinkTransformationConfig[];
    range?: TimeRange;
}
export type LinkTarget = '_blank' | '_self' | undefined;
/**
 * Processed Link Model. The values are ready to use
 */
export interface LinkModel<T = any> {
    href: string;
    title: string;
    target: LinkTarget;
    origin: T;
    onClick?: (e: any, origin?: any) => void;
}
/**
 * Provides a way to produce links on demand
 *
 * TODO: ScopedVars in in GrafanaUI package!
 */
export interface LinkModelSupplier<T extends object> {
    getLinks(replaceVariables?: InterpolateFunction): Array<LinkModel<T>>;
}
export declare enum VariableOrigin {
    Series = "series",
    Field = "field",
    Fields = "fields",
    Value = "value",
    BuiltIn = "built-in",
    Template = "template"
}
export interface VariableSuggestion {
    value: string;
    label: string;
    documentation?: string;
    origin: VariableOrigin;
}
export declare enum VariableSuggestionsScope {
    Values = "values"
}
