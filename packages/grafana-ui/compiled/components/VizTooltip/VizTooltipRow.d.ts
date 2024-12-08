import React, { ReactNode } from 'react';
import { VizTooltipItem } from './types';
interface VizTooltipRowProps extends Omit<VizTooltipItem, 'value'> {
    value: string | number | null | ReactNode;
    justify?: string;
    isActive?: boolean;
    marginRight?: string;
    isPinned: boolean;
    showValueScroll?: boolean;
}
export declare const VizTooltipRow: ({ label, value, color, colorIndicator, colorPlacement, justify, isActive, marginRight, isPinned, lineStyle, showValueScroll, }: VizTooltipRowProps) => React.JSX.Element;
export {};
