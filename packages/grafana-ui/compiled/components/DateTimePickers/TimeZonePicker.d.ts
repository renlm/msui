import React from 'react';
import { TimeZone, InternalTimeZones } from '@grafana/data';
export interface Props {
    onChange: (timeZone?: TimeZone) => void;
    value?: TimeZone;
    width?: number;
    autoFocus?: boolean;
    onBlur?: () => void;
    includeInternal?: boolean | InternalTimeZones[];
    disabled?: boolean;
    inputId?: string;
    menuShouldPortal?: boolean;
    openMenuOnFocus?: boolean;
}
export declare const TimeZonePicker: (props: Props) => React.JSX.Element;
