import React, { ReactNode } from 'react';
import { PopoverContent } from '../Tooltip';
interface Props {
    children: ReactNode;
    className?: string;
    htmlFor?: string;
    isFocused?: boolean;
    isInvalid?: boolean;
    tooltip?: PopoverContent;
    width?: number | 'auto';
    /** Make tooltip interactive */
    interactive?: boolean;
}
export declare const FormLabel: ({ children, isFocused, isInvalid, className, htmlFor, tooltip, width, interactive, ...rest }: Props) => React.JSX.Element;
export declare const InlineFormLabel: ({ children, isFocused, isInvalid, className, htmlFor, tooltip, width, interactive, ...rest }: Props) => React.JSX.Element;
export {};
