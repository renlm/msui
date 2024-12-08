import React from 'react';
import { IconName, IconSize, IconType } from '../../types/icon';
import { TooltipPlacement, PopoverContent } from '../Tooltip';
export type IconButtonVariant = 'primary' | 'secondary' | 'destructive';
interface BaseProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label'> {
    /** Name of the icon **/
    name: IconName;
    /** Icon size - sizes xxl and xxxl are deprecated and when used being decreased to xl*/
    size?: IconSize;
    /** Type of the icon - mono or default */
    iconType?: IconType;
    /** Variant to change the color of the Icon */
    variant?: IconButtonVariant;
}
export interface BasePropsWithTooltip extends BaseProps {
    /** Tooltip content to display on hover and as the aria-label */
    tooltip: PopoverContent;
    /** Position of the tooltip */
    tooltipPlacement?: TooltipPlacement;
}
interface BasePropsWithAriaLabel extends BaseProps {
    /** @deprecated use aria-label instead*/
    ariaLabel?: string;
    /** Text available only for screen readers. No tooltip will be set in this case. */
    ['aria-label']: string;
}
export type Props = BasePropsWithTooltip | BasePropsWithAriaLabel;
export declare const IconButton: React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLButtonElement>>;
export {};
