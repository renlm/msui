import React, { ReactNode } from 'react';
import { GrafanaTheme2 } from '@grafana/data';
export interface LabelProps extends React.HTMLAttributes<HTMLLegendElement> {
    children: string | ReactNode;
    description?: string;
}
export declare const getLegendStyles: (theme: GrafanaTheme2) => {
    legend: string;
};
export declare const Legend: ({ children, className, ...legendProps }: LabelProps) => React.JSX.Element;
