import React from 'react';
import { TimeRange, TimeZone } from '@grafana/data';
/** @public */
export interface TimeRangePickerProps {
    hideText?: boolean;
    value: TimeRange;
    timeZone?: TimeZone;
    fiscalYearStartMonth?: number;
    timeSyncButton?: JSX.Element;
    isSynced?: boolean;
    onChange: (timeRange: TimeRange) => void;
    onChangeTimeZone: (timeZone: TimeZone) => void;
    onChangeFiscalYearStartMonth?: (month: number) => void;
    onMoveBackward: () => void;
    onMoveForward: () => void;
    onZoom: () => void;
    onError?: (error?: string) => void;
    history?: TimeRange[];
    hideQuickRanges?: boolean;
    widthOverride?: number;
    isOnCanvas?: boolean;
    onToolbarTimePickerClick?: () => void;
}
export interface State {
    isOpen: boolean;
}
export declare function TimeRangePicker(props: TimeRangePickerProps): React.JSX.Element;
export declare namespace TimeRangePicker {
    var displayName: string;
}
export declare const TimePickerTooltip: ({ timeRange, timeZone }: {
    timeRange: TimeRange;
    timeZone?: TimeZone;
}) => React.JSX.Element;
type LabelProps = Pick<TimeRangePickerProps, 'hideText' | 'value' | 'timeZone'>;
export declare const TimePickerButtonLabel: React.NamedExoticComponent<LabelProps>;
export {};
