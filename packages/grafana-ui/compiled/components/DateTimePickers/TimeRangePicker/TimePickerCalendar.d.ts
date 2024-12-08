import React, { FormEvent } from 'react';
import { DateTime, GrafanaTheme2, TimeZone } from '@grafana/data';
export declare const getStyles: (theme: GrafanaTheme2, isReversed?: boolean) => {
    container: string;
    modalContainer: string;
    calendar: string;
    modal: string;
};
export interface TimePickerCalendarProps {
    isOpen: boolean;
    from: DateTime;
    to: DateTime;
    onClose: () => void;
    onApply: (e: FormEvent<HTMLButtonElement>) => void;
    onChange: (from: DateTime, to: DateTime) => void;
    /**
     * When true, the calendar is rendered as a floating "tooltip" next to the input.
     * When false, the calendar is rendered "fullscreen" in a modal. Yes. Don't ask.
     */
    isFullscreen: boolean;
    timeZone?: TimeZone;
    isReversed?: boolean;
}
declare function TimePickerCalendar(props: TimePickerCalendarProps): React.JSX.Element | null;
declare namespace TimePickerCalendar {
    var displayName: string;
}
declare const _default: React.MemoExoticComponent<typeof TimePickerCalendar>;
export default _default;
