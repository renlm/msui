import { Field } from '@grafana/data';
import { SortOrder, TooltipDisplayMode } from '@grafana/schema';
import { ColorIndicatorStyles } from './VizTooltipColorIndicator';
import { VizTooltipItem } from './types';
export declare const calculateTooltipPosition: (xPos?: number, yPos?: number, tooltipWidth?: number, tooltipHeight?: number, xOffset?: number, yOffset?: number, windowWidth?: number, windowHeight?: number) => {
    x: number;
    y: number;
};
export declare const getColorIndicatorClass: (colorIndicator: string, styles: ColorIndicatorStyles) => string;
export declare const getContentItems: (fields: Field[], xField: Field, dataIdxs: Array<number | null>, seriesIdx: number | null | undefined, mode: TooltipDisplayMode, sortOrder: SortOrder, fieldFilter?: (field: Field) => boolean) => VizTooltipItem[];
