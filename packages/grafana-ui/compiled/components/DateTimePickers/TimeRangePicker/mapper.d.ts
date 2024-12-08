import { TimeOption, TimeRange, TimeZone } from '@grafana/data';
export declare const mapOptionToTimeRange: (option: TimeOption, timeZone?: TimeZone) => TimeRange;
export declare const mapRangeToTimeOption: (range: TimeRange, timeZone?: TimeZone) => TimeOption;
