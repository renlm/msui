import React, { Component } from 'react';
import { DataFrame, TimeRange } from '@grafana/data';
import { PanelContextRoot } from '../../components/PanelChrome/PanelContext';
import { UPlotConfigBuilder } from '../../components/uPlot/config/UPlotConfigBuilder';
import { GraphNGProps } from '../GraphNG/GraphNG';
type TimeSeriesProps = Omit<GraphNGProps, 'prepConfig' | 'propsToDiff' | 'renderLegend'>;
export declare class UnthemedTimeSeries extends Component<TimeSeriesProps> {
    static contextType: React.Context<import("../../components/PanelChrome/PanelContext").PanelContext>;
    context: React.ContextType<typeof PanelContextRoot>;
    prepConfig: (alignedFrame: DataFrame, allFrames: DataFrame[], getTimeRange: () => TimeRange) => UPlotConfigBuilder;
    renderLegend: (config: UPlotConfigBuilder) => React.JSX.Element | null;
    render(): React.JSX.Element;
}
export declare const TimeSeries: React.FunctionComponent<{
    fields?: import("../GraphNG/types").XYFieldMatchers | undefined;
    width: number;
    options?: Record<string, any> | undefined;
    timeZone: string | string[];
    structureRev?: number | undefined;
    legend: import("@grafana/schema").VizLegendOptions;
    children?: ((builder: UPlotConfigBuilder, alignedFrame: DataFrame) => React.ReactNode) | undefined;
    height: number;
    timeRange: TimeRange;
    frames: DataFrame[];
    renderers?: import("../../components/uPlot/config/UPlotConfigBuilder").Renderers | undefined;
    tweakScale?: ((opts: import("../../components/uPlot/config/UPlotScaleBuilder").ScaleProps, forField: import("@grafana/data").Field<any>) => import("../../components/uPlot/config/UPlotScaleBuilder").ScaleProps) | undefined;
    tweakAxis?: ((opts: import("../../components/uPlot/config/UPlotAxisBuilder").AxisProps, forField: import("@grafana/data").Field<any>) => import("../../components/uPlot/config/UPlotAxisBuilder").AxisProps) | undefined;
    onLegendClick?: ((event: import("../..").GraphNGLegendEvent) => void) | undefined;
    preparePlotFrame?: ((frames: DataFrame[], dimFields: import("../GraphNG/types").XYFieldMatchers) => DataFrame | null) | undefined;
}>;
export {};
