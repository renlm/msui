import React from 'react';
import { TimeRange, TimeZone } from '@grafana/data';
export interface TimeRangeInputProps {
    value: TimeRange;
    timeZone?: TimeZone;
    onChange: (timeRange: TimeRange) => void;
    onChangeTimeZone?: (timeZone: TimeZone) => void;
    hideTimeZone?: boolean;
    placeholder?: string;
    clearable?: boolean;
    /** Controls horizontal alignment of the picker menu */
    isReversed?: boolean;
    /** Controls visibility of the preset time ranges (e.g. **Last 5 minutes**) in the picker menu */
    hideQuickRanges?: boolean;
    disabled?: boolean;
    showIcon?: boolean;
}
export declare const TimeRangeInput: ({ value, onChange, onChangeTimeZone, clearable, hideTimeZone, timeZone, placeholder, isReversed, hideQuickRanges, disabled, showIcon, }: TimeRangeInputProps) => React.JSX.Element;
