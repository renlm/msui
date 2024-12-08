import { GrafanaTheme2, ThemeTypographyVariantTypes } from '@grafana/data';
import { TextProps } from './Text';
export declare const customWeight: (weight: TextProps['weight'], theme: GrafanaTheme2) => number;
export declare const customColor: (color: TextProps['color'], theme: GrafanaTheme2) => string | undefined;
export declare const customVariant: (theme: GrafanaTheme2, element: TextProps['element'], variant?: keyof ThemeTypographyVariantTypes) => import("@grafana/data").ThemeTypographyVariant | undefined;
