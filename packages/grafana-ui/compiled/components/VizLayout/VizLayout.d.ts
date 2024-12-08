import React, { FC, ComponentType } from 'react';
import { GrafanaTheme2 } from '@grafana/data';
import { LegendPlacement } from '@grafana/schema';
/**
 * @beta
 */
export interface VizLayoutProps {
    width: number;
    height: number;
    legend?: React.ReactElement<VizLayoutLegendProps> | null;
    children: (width: number, height: number) => React.ReactNode;
}
/**
 * @beta
 */
export interface VizLayoutComponentType extends FC<VizLayoutProps> {
    Legend: ComponentType<VizLayoutLegendProps>;
}
/**
 * @beta
 */
export declare const VizLayout: VizLayoutComponentType;
export declare const getVizStyles: (theme: GrafanaTheme2) => {
    viz: string;
};
/**
 * @beta
 */
export interface VizLayoutLegendProps {
    placement: LegendPlacement;
    children: React.ReactNode;
    maxHeight?: string;
    maxWidth?: string;
    width?: number;
}
/**
 * @beta
 */
export declare const VizLayoutLegend: FC<VizLayoutLegendProps>;
