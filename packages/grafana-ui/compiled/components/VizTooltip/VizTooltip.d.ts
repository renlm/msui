import React from 'react';
import { Dimensions, TimeZone } from '@grafana/data';
import { TooltipDisplayMode } from '@grafana/schema';
export interface FlotPosition {
    pageX: number;
    pageY: number;
    x: number;
    x1: number;
    y: number;
    y1: number;
}
export type ActiveDimensions<T extends Dimensions = any> = {
    [key in keyof T]: [number, number | undefined] | null;
};
export interface VizTooltipContentProps<T extends Dimensions = any> {
    dimensions: T;
    activeDimensions?: ActiveDimensions<T>;
    timeZone?: TimeZone;
    pos: FlotPosition;
    mode: TooltipDisplayMode;
}
export interface VizTooltipProps {
    /** Element used as tooltips content */
    content?: React.ReactElement;
    /** Optional component to be used as a tooltip content */
    tooltipComponent?: React.ComponentType<React.PropsWithChildren<VizTooltipContentProps>>;
    /** x/y position relative to the window */
    position?: {
        x: number;
        y: number;
    };
    /** x/y offset relative to tooltip origin element, i.e. graph's datapoint */
    offset?: {
        x: number;
        y: number;
    };
    mode?: TooltipDisplayMode;
}
/**
 * @public
 */
export declare const VizTooltip: {
    ({ content, position, offset }: VizTooltipProps): React.JSX.Element | null;
    displayName: string;
};
