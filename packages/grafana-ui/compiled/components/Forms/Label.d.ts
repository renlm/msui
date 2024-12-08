import React from 'react';
import { GrafanaTheme2 } from '@grafana/data';
export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    children: React.ReactNode;
    description?: React.ReactNode;
    category?: React.ReactNode[];
}
export declare const Label: ({ children, description, className, category, ...labelProps }: LabelProps) => React.JSX.Element;
export declare const getLabelStyles: (theme: GrafanaTheme2) => {
    label: string;
    labelContent: string;
    description: string;
    categories: string;
    chevron: string;
};
