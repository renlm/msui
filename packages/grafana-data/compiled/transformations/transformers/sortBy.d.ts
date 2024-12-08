import { DataTransformerInfo } from '../../types/transformations';
export interface SortByField {
    field: string;
    desc?: boolean;
    index?: number;
}
export interface SortByTransformerOptions {
    sort: SortByField[];
}
export declare const sortByTransformer: DataTransformerInfo<SortByTransformerOptions>;
