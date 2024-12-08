import React from 'react';
import { PopoverContent } from '../Tooltip';
import { FieldProps } from './Field';
export interface Props extends Omit<FieldProps, 'css' | 'horizontal' | 'description' | 'error'> {
    /** Content for the label's tooltip */
    tooltip?: PopoverContent;
    /** Custom width for the label as a multiple of 8px */
    labelWidth?: number | 'auto';
    /** Make the field's child to fill the width of the row. Equivalent to setting `flex-grow:1` on the field */
    grow?: boolean;
    /** Make the field's child shrink with width of the row. Equivalent to setting `flex-shrink:1` on the field */
    shrink?: boolean;
    /** Make field's background transparent */
    transparent?: boolean;
    /** Error message to display */
    error?: string | null;
    htmlFor?: string;
    /** Make tooltip interactive */
    interactive?: boolean;
}
export declare const InlineField: {
    ({ children, label, tooltip, labelWidth, invalid, loading, disabled, required, className, htmlFor, grow, shrink, error, transparent, interactive, ...htmlProps }: Props): React.JSX.Element;
    displayName: string;
};
