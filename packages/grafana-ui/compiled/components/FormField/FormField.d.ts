import React, { InputHTMLAttributes } from 'react';
import { PopoverContent } from '../Tooltip';
export interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    tooltip?: PopoverContent;
    labelWidth?: number;
    inputWidth?: number | null;
    inputEl?: React.ReactNode;
    /** Make tooltip interactive */
    interactive?: boolean;
}
/**
 * Default form field including label used in Grafana UI. Default input element is simple <input />. You can also pass
 * custom inputEl if required in which case inputWidth and inputProps are ignored.
 * @deprecated Please use the {@link Field} component, {@link https://developers.grafana.com/ui/latest/index.html?path=/story/forms-field--simple See Storybook}.
 * For inline fields, use {@link InlineField}, {@link https://developers.grafana.com/ui/latest/index.html?path=/story/forms-inlinefield--basic See Storybook}.
 */
export declare const FormField: {
    ({ label, tooltip, labelWidth, inputWidth, inputEl, className, interactive, ...inputProps }: Props): React.JSX.Element;
    displayName: string;
};
