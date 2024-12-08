import React, { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import { GrafanaTheme2 } from '@grafana/data';
import { ComponentSize, IconSize, IconType } from '../../types';
import { IconName } from '../../types/icon';
import { PopoverContent, TooltipPlacement } from '../Tooltip';
export type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'success';
export declare const allButtonVariants: ButtonVariant[];
export type ButtonFill = 'solid' | 'outline' | 'text';
export declare const allButtonFills: ButtonFill[];
type CommonProps = {
    size?: ComponentSize;
    variant?: ButtonVariant;
    fill?: ButtonFill;
    icon?: IconName | React.ReactElement;
    className?: string;
    children?: React.ReactNode;
    fullWidth?: boolean;
    type?: string;
    /** Tooltip content to display on hover */
    tooltip?: PopoverContent;
    /** Position of the tooltip */
    tooltipPlacement?: TooltipPlacement;
};
export type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement>;
export declare const Button: React.ForwardRefExoticComponent<CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement> & React.RefAttributes<HTMLButtonElement>>;
export type ButtonLinkProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & AnchorHTMLAttributes<HTMLAnchorElement>;
export declare const LinkButton: React.ForwardRefExoticComponent<CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement> & React.AnchorHTMLAttributes<HTMLAnchorElement> & React.RefAttributes<HTMLAnchorElement>>;
interface IconRendererProps {
    icon?: IconName | React.ReactElement<{
        className?: string;
        size?: IconSize;
    }>;
    size?: IconSize;
    className?: string;
    iconType?: IconType;
}
export declare const IconRenderer: ({ icon, size, className, iconType }: IconRendererProps) => React.JSX.Element | null;
export interface StyleProps {
    size: ComponentSize;
    variant: ButtonVariant;
    fill?: ButtonFill;
    iconOnly?: boolean;
    theme: GrafanaTheme2;
    fullWidth?: boolean;
    narrow?: boolean;
}
export declare const getButtonStyles: (props: StyleProps) => {
    button: string;
    disabled: string;
    img: string;
    icon: string;
    content: string;
};
export declare function getPropertiesForVariant(theme: GrafanaTheme2, variant: ButtonVariant, fill: ButtonFill): {
    background: string;
    color: string;
    border: string;
    transition: string;
    '&:hover': {
        background: string;
        borderColor: string;
        color: string;
        textDecoration?: undefined;
        boxShadow?: undefined;
    };
    '&:focus'?: undefined;
} | {
    background: string;
    color: string;
    border: string;
    transition: string;
    '&:focus': {
        outline: string;
        textDecoration: string;
    };
    '&:hover': {
        background: string;
        textDecoration: string;
        borderColor?: undefined;
        color?: undefined;
        boxShadow?: undefined;
    };
} | {
    background: string;
    color: string;
    border: string;
    transition: string;
    '&:hover': {
        background: string;
        color: string;
        boxShadow: string;
        borderColor: string;
        textDecoration?: undefined;
    };
    '&:focus'?: undefined;
};
export declare const clearButtonStyles: (theme: GrafanaTheme2) => string;
export declare const clearLinkButtonStyles: (theme: GrafanaTheme2) => string;
export {};
