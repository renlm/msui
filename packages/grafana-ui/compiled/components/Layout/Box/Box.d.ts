import React, { ElementType } from 'react';
import { GrafanaTheme2, ThemeSpacingTokens, ThemeShape, ThemeShadows } from '@grafana/data';
import { AlignItems, Direction, FlexProps, JustifyContent } from '../types';
import { ResponsiveProp } from '../utils/responsiveness';
import { SizeProps } from '../utils/styles';
type Display = 'flex' | 'block' | 'inline' | 'inline-block' | 'none';
export type BackgroundColor = keyof GrafanaTheme2['colors']['background'] | 'error' | 'success' | 'warning' | 'info';
export type BorderStyle = 'solid' | 'dashed';
export type BorderColor = keyof GrafanaTheme2['colors']['border'] | 'error' | 'success' | 'warning' | 'info';
export type BorderRadius = keyof ThemeShape['radius'];
export type BoxShadow = keyof ThemeShadows;
interface BoxProps extends FlexProps, SizeProps, Omit<React.HTMLAttributes<HTMLElement>, 'className' | 'style'> {
    /** Sets the property `margin` */
    margin?: ResponsiveProp<ThemeSpacingTokens>;
    /** Sets the properties `margin-top` and `margin-bottom`. Higher priority than margin. */
    marginX?: ResponsiveProp<ThemeSpacingTokens>;
    /** Sets the properties `margin-left` and `margin-right`. Higher priority than margin. */
    marginY?: ResponsiveProp<ThemeSpacingTokens>;
    /** Sets the property `margin-top`. Higher priority than margin and marginY. */
    marginTop?: ResponsiveProp<ThemeSpacingTokens>;
    /** Sets the property `margin-bottom`. Higher priority than margin and marginXY */
    marginBottom?: ResponsiveProp<ThemeSpacingTokens>;
    /** Sets the property `margin-left`. Higher priority than margin and marginX. */
    marginLeft?: ResponsiveProp<ThemeSpacingTokens>;
    /** Sets the property `margin-right`. Higher priority than margin and marginX. */
    marginRight?: ResponsiveProp<ThemeSpacingTokens>;
    /** Sets the property `padding` */
    padding?: ResponsiveProp<ThemeSpacingTokens>;
    /** Sets the properties `padding-top` and `padding-bottom`. Higher priority than padding. */
    paddingX?: ResponsiveProp<ThemeSpacingTokens>;
    /** Sets the properties `padding-left` and `padding-right`. Higher priority than padding. */
    paddingY?: ResponsiveProp<ThemeSpacingTokens>;
    /** Sets the property `padding-top`. Higher priority than padding and paddingY. */
    paddingTop?: ResponsiveProp<ThemeSpacingTokens>;
    /** Sets the property `padding-bottom`. Higher priority than padding and paddingY. */
    paddingBottom?: ResponsiveProp<ThemeSpacingTokens>;
    /** Sets the property `padding-left`. Higher priority than padding and paddingX. */
    paddingLeft?: ResponsiveProp<ThemeSpacingTokens>;
    /** Sets the property `padding-right`. Higher priority than padding and paddingX. */
    paddingRight?: ResponsiveProp<ThemeSpacingTokens>;
    borderStyle?: ResponsiveProp<BorderStyle>;
    borderColor?: ResponsiveProp<BorderColor>;
    borderRadius?: ResponsiveProp<BorderRadius>;
    alignItems?: ResponsiveProp<AlignItems>;
    direction?: ResponsiveProp<Direction>;
    justifyContent?: ResponsiveProp<JustifyContent>;
    gap?: ResponsiveProp<ThemeSpacingTokens>;
    backgroundColor?: ResponsiveProp<BackgroundColor>;
    display?: ResponsiveProp<Display>;
    boxShadow?: ResponsiveProp<BoxShadow>;
    /** Sets the HTML element that will be rendered as a Box. Defaults to 'div' */
    element?: ElementType;
}
export declare const Box: React.ForwardRefExoticComponent<BoxProps & {
    children?: React.ReactNode;
} & React.RefAttributes<HTMLElement>>;
export {};
