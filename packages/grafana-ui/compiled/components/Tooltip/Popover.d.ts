import React from 'react';
import { PopoverContent, TooltipPlacement } from './types';
interface Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
    show: boolean;
    placement?: TooltipPlacement;
    content: PopoverContent;
    referenceElement: HTMLElement;
    wrapperClassName?: string;
    renderArrow?: boolean;
}
export declare function Popover({ content, show, placement, className, wrapperClassName, referenceElement, renderArrow, ...rest }: Props): React.JSX.Element | undefined;
export {};
