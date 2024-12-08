import React, { ButtonHTMLAttributes } from 'react';
import { IconName } from '@grafana/data';
import { IconSize } from '../../types/icon';
type CommonProps = {
    /** Icon name */
    icon?: IconName | React.ReactNode;
    /** Icon size */
    iconSize?: IconSize;
    /** Tooltip */
    tooltip?: string;
    /** For image icons */
    imgSrc?: string;
    /** Alt text for imgSrc */
    imgAlt?: string;
    /** if true or false will show angle-down/up */
    isOpen?: boolean;
    /** Controls flex-grow: 1 */
    fullWidth?: boolean;
    /** reduces padding to xs */
    narrow?: boolean;
    /** variant */
    variant?: ToolbarButtonVariant;
    /** Hide any children and only show icon */
    iconOnly?: boolean;
    /** Show highlight dot */
    isHighlighted?: boolean;
};
export type ToolbarButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement>;
export type ToolbarButtonVariant = 'default' | 'primary' | 'destructive' | 'active' | 'canvas';
export declare const ToolbarButton: React.ForwardRefExoticComponent<CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement> & React.RefAttributes<HTMLButtonElement>>;
export {};
