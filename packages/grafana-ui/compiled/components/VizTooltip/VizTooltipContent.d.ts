import React, { ReactNode } from 'react';
import { VizTooltipItem } from './types';
interface VizTooltipContentProps {
    items: VizTooltipItem[];
    children?: ReactNode;
    scrollable?: boolean;
    isPinned: boolean;
    maxHeight?: number;
}
export declare const VizTooltipContent: ({ items, children, isPinned, scrollable, maxHeight, }: VizTooltipContentProps) => React.JSX.Element;
export {};
