import React, { HTMLProps, ReactNode } from 'react';
import { GrafanaTheme2 } from '@grafana/data';
export interface Props extends Omit<HTMLProps<HTMLInputElement>, 'prefix' | 'size'> {
    /** Sets the width to a multiple of 8px. Should only be used with inline forms. Setting width of the container is preferred in other cases.*/
    width?: number;
    /** Show an invalid state around the input */
    invalid?: boolean;
    /** Show an icon as a prefix in the input */
    prefix?: ReactNode;
    /** Show an icon as a suffix in the input */
    suffix?: ReactNode;
    /** Show a loading indicator as a suffix in the input */
    loading?: boolean;
    /** Add a component as an addon before the input  */
    addonBefore?: ReactNode;
    /** Add a component as an addon after the input */
    addonAfter?: ReactNode;
}
interface StyleDeps {
    theme: GrafanaTheme2;
    invalid?: boolean;
    width?: number;
}
export declare const Input: React.ForwardRefExoticComponent<Omit<Props, "ref"> & React.RefAttributes<HTMLInputElement>>;
export declare const getInputStyles: import("micro-memoize").Memoized<({ theme, invalid, width }: StyleDeps) => {
    wrapper: string;
    inputWrapper: string;
    input: string;
    inputDisabled: string;
    addon: string;
    prefix: string;
    suffix: string;
    loadingIndicator: string;
}>;
export {};
