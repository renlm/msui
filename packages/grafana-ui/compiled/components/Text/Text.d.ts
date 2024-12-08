import React, { CSSProperties } from 'react';
import { GrafanaTheme2, ThemeTypographyVariantTypes } from '@grafana/data';
export interface TextProps extends Omit<React.HTMLAttributes<HTMLElement>, 'className' | 'style'> {
    /** Defines what HTML element is defined underneath. "span" by default */
    element?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p';
    /** What typograpy variant should be used for the component. Only use if default variant for the defined element is not what is needed */
    variant?: keyof ThemeTypographyVariantTypes;
    /** Override the default weight for the used variant */
    weight?: 'light' | 'regular' | 'medium' | 'bold';
    /** Color to use for text */
    color?: keyof GrafanaTheme2['colors']['text'] | 'error' | 'success' | 'warning' | 'info';
    /** Use to cut the text off with ellipsis if there isn't space to show all of it. On hover shows the rest of the text */
    truncate?: boolean;
    /** If true, show the text as italic. False by default */
    italic?: boolean;
    /** If true, numbers will have fixed width, useful for displaying tabular data. False by default */
    tabular?: boolean;
    /** Whether to align the text to left, center or right */
    textAlignment?: CSSProperties['textAlign'];
    children: NonNullable<React.ReactNode>;
}
export declare const Text: React.ForwardRefExoticComponent<TextProps & React.RefAttributes<HTMLElement>>;
