import React from 'react';
import { TimeOption, TimeRange, TimeZone } from '@grafana/data';
interface Props {
    value: TimeRange;
    onChange: (timeRange: TimeRange) => void;
    onChangeTimeZone: (timeZone: TimeZone) => void;
    onChangeFiscalYearStartMonth?: (month: number) => void;
    onError?: (error?: string) => void;
    timeZone?: TimeZone;
    fiscalYearStartMonth?: number;
    quickOptions?: TimeOption[];
    history?: TimeRange[];
    showHistory?: boolean;
    className?: string;
    hideTimeZone?: boolean;
    /** Reverse the order of relative and absolute range pickers. Used to left align the picker in forms */
    isReversed?: boolean;
    hideQuickRanges?: boolean;
    widthOverride?: number;
}
export interface PropsWithScreenSize extends Props {
    isFullscreen: boolean;
}
export declare const TimePickerContentWithScreenSize: (props: PropsWithScreenSize) => React.JSX.Element;
export declare const TimePickerContent: (props: Props) => React.JSX.Element;
export {};
