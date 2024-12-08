import React from 'react';
import { LegendDisplayMode, LegendPlacement } from '@grafana/schema';
import { GraphProps } from './Graph';
export interface GraphWithLegendProps extends GraphProps {
    legendDisplayMode: LegendDisplayMode;
    legendVisibility: boolean;
    placement: LegendPlacement;
    hideEmpty?: boolean;
    hideZero?: boolean;
    sortLegendBy?: string;
    sortLegendDesc?: boolean;
    onSeriesToggle?: (label: string, event: React.MouseEvent<HTMLElement>) => void;
    onToggleSort: (sortBy: string) => void;
}
export declare const GraphWithLegend: (props: GraphWithLegendProps) => React.JSX.Element;
