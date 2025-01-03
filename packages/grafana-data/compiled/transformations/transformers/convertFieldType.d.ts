import { TimeZone } from '@grafana/schema';
import { DateTimeOptionsWhenParsing } from '../../datetime';
import { SynchronousDataTransformerInfo } from '../../types';
import { DataFrame, EnumFieldConfig, Field, FieldType } from '../../types/dataFrame';
export interface ConvertFieldTypeTransformerOptions {
    conversions: ConvertFieldTypeOptions[];
}
export interface ConvertFieldTypeOptions {
    /**
     * The field to convert field type
     */
    targetField?: string;
    /**
     * The field type to convert to
     */
    destinationType?: FieldType;
    /**
     * Date format to parse a string datetime
     */
    dateFormat?: string;
    /**
     * When converting an array to a string, the values can be joined with a custom separator
     */
    joinWith?: string;
    /**
     * When converting a date to a string an option timezone.
     */
    timezone?: TimeZone;
    /**
     * When converting to an enumeration, this is the target config
     */
    enumConfig?: EnumFieldConfig;
}
export declare const convertFieldTypeTransformer: SynchronousDataTransformerInfo<ConvertFieldTypeTransformerOptions>;
/**
 * Convert field types for dataframe(s)
 * @param options - field type conversion options
 * @param frames - dataframe(s) with field types to convert
 * @returns dataframe(s) with converted field types
 */
export declare function convertFieldTypes(options: ConvertFieldTypeTransformerOptions, frames: DataFrame[]): DataFrame[];
/**
 * Convert a single field type to specified field type.
 * @param field - field to convert
 * @param opts - field conversion options
 * @returns converted field
 *
 * @internal
 */
export declare function convertFieldType(field: Field, opts: ConvertFieldTypeOptions): Field;
/**
 * @internal
 */
export declare function fieldToTimeField(field: Field, dateFormat?: string): Field;
/**
 * @internal
 */
export declare function fieldToStringField(field: Field, dateFormat?: string, parseOptions?: DateTimeOptionsWhenParsing, joinWith?: string): Field;
/**
 * Checks the first value. Assumes any number should be time fieldtype. Otherwise attempts to make the fieldtype time.
 * @param field - field to ensure is a time fieldtype
 * @param dateFormat - date format used to parse a string datetime
 * @returns field as time
 *
 * @public
 */
export declare function ensureTimeField(field: Field, dateFormat?: string): Field;
