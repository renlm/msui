import React, { InputHTMLAttributes } from 'react';
import { PopoverContent } from '../Tooltip';
export interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onReset'> {
    onReset: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
    isConfigured: boolean;
    label?: string;
    tooltip?: PopoverContent;
    labelWidth?: number;
    inputWidth?: number;
    placeholder?: string;
    interactive?: boolean;
}
/**
 * Form field that has 2 states configured and not configured. If configured it will not show its contents and adds
 * a reset button that will clear the input and makes it accessible. In non configured state it behaves like normal
 * form field. This is used for passwords or anything that is encrypted on the server and is later returned encrypted
 * to the user (like datasource passwords).
 *
 * @deprecated Please use the {@link SecretInput} component with a {@link Field} instead, {@link https://developers.grafana.com/ui/latest/index.html?path=/story/forms-secretinput--basic as seen in Storybook}
 */
export declare const SecretFormField: {
    ({ label, labelWidth, inputWidth, onReset, isConfigured, tooltip, placeholder, interactive, ...inputProps }: Props): React.JSX.Element;
    displayName: string;
};
