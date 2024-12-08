import { DataTransformContext, DataTransformerInfo, MatcherConfig } from '../../types/transformations';
import { RegexpOrNamesMatcherOptions } from '../matchers/nameMatcher';
export interface FilterFieldsByNameTransformerOptions {
    include?: RegexpOrNamesMatcherOptions;
    exclude?: RegexpOrNamesMatcherOptions;
    byVariable?: boolean;
}
export declare const filterFieldsByNameTransformer: DataTransformerInfo<FilterFieldsByNameTransformerOptions>;
export declare const getMatcherConfig: (ctx: DataTransformContext, options?: RegexpOrNamesMatcherOptions, byVariable?: boolean) => MatcherConfig | undefined;
