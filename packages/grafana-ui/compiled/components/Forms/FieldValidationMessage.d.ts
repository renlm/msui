import React from 'react';
import { GrafanaTheme2 } from '@grafana/data';
export interface FieldValidationMessageProps {
    /** Override component style */
    className?: string;
    horizontal?: boolean;
}
export declare const FieldValidationMessage: ({ children, horizontal, className, }: React.PropsWithChildren<FieldValidationMessageProps>) => React.JSX.Element;
export declare const getFieldValidationMessageStyles: (theme: GrafanaTheme2) => {
    vertical: string;
    horizontal: string;
    fieldValidationMessageIcon: string;
};
