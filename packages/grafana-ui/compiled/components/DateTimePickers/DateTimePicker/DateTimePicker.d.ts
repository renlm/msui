import React, { ReactNode } from 'react';
import { DateTime } from '@grafana/data';
export interface Props {
    /** Input date for the component */
    date?: DateTime;
    /** Callback for returning the selected date */
    onChange: (date?: DateTime) => void;
    /** label for the input field */
    label?: ReactNode;
    /** Set the latest selectable date */
    maxDate?: Date;
    /** Set the minimum selectable date */
    minDate?: Date;
    /** Display seconds on the time picker */
    showSeconds?: boolean;
    /** Set the hours that can't be selected */
    disabledHours?: () => number[];
    /** Set the minutes that can't be selected */
    disabledMinutes?: () => number[];
    /** Set the seconds that can't be selected */
    disabledSeconds?: () => number[];
    /** Can input be cleared/have empty values */
    clearable?: boolean;
}
export declare const DateTimePicker: ({ date, maxDate, minDate, label, onChange, disabledHours, disabledMinutes, disabledSeconds, showSeconds, clearable, }: Props) => React.JSX.Element;
