import { TimeZone as SchemaTimeZone, TimeZoneBrowser as SchemaTimeZoneBrowser, TimeZoneUtc as SchemaTimeZoneUtc } from '@grafana/schema';
import { DateTime } from '../datetime/moment_wrapper';
export interface RawTimeRange {
    from: DateTime | string;
    to: DateTime | string;
}
export interface TimeRange {
    from: DateTime;
    to: DateTime;
    raw: RawTimeRange;
}
/**
 * Type to describe relative time to now in seconds.
 * @internal
 */
export interface RelativeTimeRange {
    from: number;
    to: number;
}
export interface AbsoluteTimeRange {
    from: number;
    to: number;
}
export interface IntervalValues {
    interval: string;
    intervalMs: number;
}
export interface TimeOption {
    from: string;
    to: string;
    display: string;
    invalid?: boolean;
    section?: number;
}
/** @deprecated use TimeZone from schema  */
export type TimeZone = SchemaTimeZone;
/** @deprecated use TimeZoneBrowser from schema  */
export type TimeZoneBrowser = SchemaTimeZoneBrowser;
/** @deprecated use TimeZoneUtc from schema  */
export type TimeZoneUtc = SchemaTimeZoneUtc;
/** @deprecated use defaultTimeZone from schema  */
export declare const DefaultTimeZone: string;
export interface TimeOptions {
    [key: string]: TimeOption[];
}
export type TimeFragment = string | DateTime;
export declare const TIME_FORMAT = "YYYY-MM-DD HH:mm:ss";
export declare function getDefaultTimeRange(): TimeRange;
/**
 * Returns the default realtive time range.
 *
 * @public
 */
export declare function getDefaultRelativeTimeRange(): RelativeTimeRange;
/**
 * Simple helper to quickly create a TimeRange object either from string representations of a dateTime or directly
 * DateTime objects.
 */
export declare function makeTimeRange(from: DateTime | string, to: DateTime | string): TimeRange;
