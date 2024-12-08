import React from 'react';
import { DateTime } from '@grafana/data';
import { FormInputSize } from '../Forms/types';
import 'rc-time-picker/assets/index.css';
export interface Props {
    onChange: (value: DateTime) => void;
    value?: DateTime;
    showHour?: boolean;
    showSeconds?: boolean;
    minuteStep?: number;
    size?: FormInputSize;
    disabled?: boolean;
    disabledHours?: () => number[];
    disabledMinutes?: () => number[];
    disabledSeconds?: () => number[];
}
export declare const POPUP_CLASS_NAME = "time-of-day-picker-panel";
export declare const TimeOfDayPicker: ({ minuteStep, showHour, showSeconds, onChange, value, size, disabled, disabledHours, disabledMinutes, disabledSeconds, }: Props) => React.JSX.Element;
