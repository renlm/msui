import React from 'react';
import { TooltipProps, PopoverContent } from '../Tooltip';
interface InfoTooltipProps extends Omit<TooltipProps, 'children' | 'content'> {
    children: PopoverContent;
}
export declare const InfoTooltip: ({ children, ...restProps }: InfoTooltipProps) => React.JSX.Element;
export {};
