import React from 'react';
import { TimeZone } from '@grafana/data';
interface Props {
    timestamp: number;
    timeZone: TimeZone | undefined;
    className?: string;
}
export declare const TimeZoneOffset: (props: Props) => React.JSX.Element | null;
export declare const formatUtcOffset: (timestamp: number, timeZone: TimeZone) => string;
export {};
