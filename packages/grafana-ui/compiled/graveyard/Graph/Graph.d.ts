/// <reference types="jquery" />
import React, { PureComponent } from 'react';
import { TimeRange, GraphSeriesXY, TimeZone } from '@grafana/data';
import { VizTooltipProps } from '../../components/VizTooltip';
import { FlotPosition } from '../../components/VizTooltip/VizTooltip';
import { FlotItem } from './types';
/** @deprecated */
export interface GraphProps {
    ariaLabel?: string;
    children?: JSX.Element | JSX.Element[];
    series: GraphSeriesXY[];
    timeRange: TimeRange;
    timeZone?: TimeZone;
    showLines?: boolean;
    showPoints?: boolean;
    showBars?: boolean;
    width: number;
    height: number;
    isStacked?: boolean;
    lineWidth?: number;
    onHorizontalRegionSelected?: (from: number, to: number) => void;
}
/** @deprecated */
interface GraphState {
    pos?: FlotPosition;
    contextPos?: FlotPosition;
    isTooltipVisible: boolean;
    isContextVisible: boolean;
    activeItem?: FlotItem<GraphSeriesXY>;
    contextItem?: FlotItem<GraphSeriesXY>;
}
/**
 * This is a react wrapper for the angular, flot based graph visualization.
 * Rather than using this component, you should use the `<PanelRender .../> with
 * timeseries panel configs.
 *
 * @deprecated
 */
export declare class Graph extends PureComponent<GraphProps, GraphState> {
    static defaultProps: {
        showLines: boolean;
        showPoints: boolean;
        showBars: boolean;
        isStacked: boolean;
        lineWidth: number;
    };
    state: GraphState;
    element: HTMLElement | null;
    $element: JQuery<HTMLElement> | null;
    componentDidUpdate(prevProps: GraphProps, prevState: GraphState): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    onPlotSelected: (event: JQuery.Event, ranges: {
        xaxis: {
            from: number;
            to: number;
        };
    }) => void;
    onPlotHover: (event: JQuery.Event, pos: FlotPosition, item?: FlotItem<GraphSeriesXY>) => void;
    onPlotClick: (event: JQuery.Event, contextPos: FlotPosition, item?: FlotItem<GraphSeriesXY>) => void;
    getYAxes(series: GraphSeriesXY[]): {
        show: boolean;
        index: number;
        position: string;
        min: number | null;
        tickDecimals: number | null;
    }[] | {
        show: boolean;
        min: number;
        max: number;
    }[];
    renderTooltip: () => React.ReactElement<VizTooltipProps, string | React.JSXElementConstructor<any>> | null;
    renderContextMenu: () => React.JSX.Element | null;
    getBarWidth: () => number;
    draw(): void;
    render(): React.JSX.Element;
}
export default Graph;
