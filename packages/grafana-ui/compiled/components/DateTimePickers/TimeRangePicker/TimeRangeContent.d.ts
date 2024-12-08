import React from 'react';
import { TimeRange, TimeZone } from '@grafana/data';
interface Props {
    isFullscreen: boolean;
    value: TimeRange;
    onApply: (range: TimeRange) => void;
    timeZone?: TimeZone;
    fiscalYearStartMonth?: number;
    roundup?: boolean;
    isReversed?: boolean;
    onError?: (error?: string) => void;
}
export declare const TimeRangeContent: (props: Props) => React.JSX.Element;
export {};
