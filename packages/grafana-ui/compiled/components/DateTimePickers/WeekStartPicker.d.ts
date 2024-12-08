import React from 'react';
export interface Props {
    onChange: (weekStart: string) => void;
    value: string;
    width?: number;
    autoFocus?: boolean;
    onBlur?: () => void;
    disabled?: boolean;
    inputId?: string;
}
export declare const WeekStartPicker: (props: Props) => React.JSX.Element;
