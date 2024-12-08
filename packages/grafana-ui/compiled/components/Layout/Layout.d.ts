import React, { HTMLProps } from 'react';
declare enum Orientation {
    Horizontal = 0,
    Vertical = 1
}
type Spacing = 'none' | 'xs' | 'sm' | 'md' | 'lg';
type Justify = 'flex-start' | 'flex-end' | 'space-between' | 'center';
type Align = 'normal' | 'flex-start' | 'flex-end' | 'center';
export interface LayoutProps extends Omit<HTMLProps<HTMLDivElement>, 'align' | 'children' | 'wrap'> {
    children: React.ReactNode[] | React.ReactNode;
    orientation?: Orientation;
    spacing?: Spacing;
    justify?: Justify;
    align?: Align;
    width?: string;
    wrap?: boolean;
}
export interface ContainerProps {
    padding?: Spacing;
    margin?: Spacing;
    grow?: number;
    shrink?: number;
}
/**
 * @deprecated use Stack component instead
 */
export declare const Layout: ({ children, orientation, spacing, justify, align, wrap, width, height, ...rest }: LayoutProps) => React.JSX.Element;
/**
 * @deprecated use Stack component instead
 */
export declare const HorizontalGroup: ({ children, spacing, justify, align, wrap, width, height, }: Omit<LayoutProps, 'orientation'>) => React.JSX.Element;
/**
 * @deprecated use Stack component with the "column" direction instead
 */
export declare const VerticalGroup: ({ children, spacing, justify, align, width, height, }: Omit<LayoutProps, 'orientation' | 'wrap'>) => React.JSX.Element;
export declare const Container: ({ children, padding, margin, grow, shrink }: React.PropsWithChildren<ContainerProps>) => React.JSX.Element;
export {};
