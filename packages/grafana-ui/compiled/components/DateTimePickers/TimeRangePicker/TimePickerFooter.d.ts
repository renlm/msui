import React from 'react';
import { TimeZone } from '@grafana/data';
interface Props {
    timeZone?: TimeZone;
    fiscalYearStartMonth?: number;
    timestamp?: number;
    onChangeTimeZone: (timeZone: TimeZone) => void;
    onChangeFiscalYearStartMonth?: (month: number) => void;
}
export declare const TimePickerFooter: (props: Props) => React.JSX.Element | null;
export {};
