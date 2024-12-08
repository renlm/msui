import React from 'react';
import { TimeRangePickerProps } from '../TimeRangePicker';
type LabelProps = Pick<TimeRangePickerProps, 'hideText' | 'value' | 'timeZone'> & {
    placeholder?: string;
    className?: string;
};
export declare const TimeRangeLabel: React.NamedExoticComponent<LabelProps>;
export {};
