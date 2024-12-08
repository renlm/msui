import { TimeZone } from '@grafana/schema';
import { DataFrame } from '../../types';
import { DataTransformContext, DataTransformerInfo } from '../../types/transformations';
export interface FormatTimeTransformerOptions {
    timeField: string;
    outputFormat: string;
    timezone: TimeZone;
}
export declare const formatTimeTransformer: DataTransformerInfo<FormatTimeTransformerOptions>;
/**
 * @internal
 */
export declare const applyFormatTime: ({ timeField, outputFormat, timezone }: FormatTimeTransformerOptions, data: DataFrame[], ctx?: DataTransformContext) => DataFrame[];
