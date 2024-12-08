import { DataLink, Field, InternalDataLink, InterpolateFunction, LinkModel, ScopedVars, SplitOpen, TimeRange } from '../types';
export declare const DataLinkBuiltInVars: {
    keepTime: string;
    timeRangeFrom: string;
    timeRangeTo: string;
    includeVars: string;
    seriesName: string;
    fieldName: string;
    valueTime: string;
    valueNumeric: string;
    valueText: string;
    valueRaw: string;
    valueCalc: string;
};
export type LinkToExploreOptions = {
    link: DataLink;
    scopedVars: ScopedVars;
    range?: TimeRange;
    field: Field;
    internalLink: InternalDataLink;
    onClickFn?: SplitOpen;
    replaceVariables: InterpolateFunction;
};
export declare function mapInternalLinkToExplore(options: LinkToExploreOptions): LinkModel<Field>;
