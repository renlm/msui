import React from 'react';
import { GrafanaTheme2, DateTime } from '@grafana/data';
import { TimePickerCalendarProps } from './TimePickerCalendar';
export declare function Body({ onChange, from, to, timeZone }: TimePickerCalendarProps): React.JSX.Element;
export declare namespace Body {
    var displayName: string;
}
export declare function inputToValue(from: DateTime, to: DateTime, invalidDateDefault?: Date, timezone?: string): [Date, Date];
export declare const getBodyStyles: (theme: GrafanaTheme2) => {
    title: string;
    body: string;
};
