import React, { HTMLProps } from 'react';
import { GrafanaTheme2 } from '@grafana/data';
export interface CheckboxProps extends Omit<HTMLProps<HTMLInputElement>, 'value'> {
    /** Label to display next to checkbox */
    label?: string;
    /** Description to display under the label */
    description?: string | React.ReactElement;
    /** Current value of the checkbox */
    value?: boolean;
    /** htmlValue allows to specify the input "value" attribute */
    htmlValue?: string | number;
    /** Sets the checkbox into a "mixed" state. This is only a visual change and does not affect the value. */
    indeterminate?: boolean;
    /** Show an invalid state around the input */
    invalid?: boolean;
}
export declare const Checkbox: React.ForwardRefExoticComponent<Omit<CheckboxProps, "ref"> & React.RefAttributes<HTMLInputElement>>;
export declare const getCheckboxStyles: (theme: GrafanaTheme2, invalid?: boolean) => {
    wrapper: string;
    input: string;
    inputIndeterminate: string;
    checkboxWrapper: string;
    checkmark: string;
    label: string;
    description: string;
};
