import React, { Component } from 'react';
import { GraphSeriesXY } from '@grafana/data';
/** @deprecated */
export interface GraphSeriesTogglerAPI {
    onSeriesToggle: (label: string, event: React.MouseEvent<HTMLElement>) => void;
    toggledSeries: GraphSeriesXY[];
}
/** @deprecated */
export interface GraphSeriesTogglerProps {
    children: (api: GraphSeriesTogglerAPI) => JSX.Element;
    series: GraphSeriesXY[];
    onHiddenSeriesChanged?: (hiddenSeries: string[]) => void;
}
/** @deprecated */
export interface GraphSeriesTogglerState {
    hiddenSeries: string[];
    toggledSeries: GraphSeriesXY[];
}
/** @deprecated */
export declare class GraphSeriesToggler extends Component<GraphSeriesTogglerProps, GraphSeriesTogglerState> {
    constructor(props: GraphSeriesTogglerProps);
    componentDidUpdate(prevProps: Readonly<GraphSeriesTogglerProps>): void;
    onSeriesToggle(label: string, event: React.MouseEvent<HTMLElement>): void;
    render(): JSX.Element;
}
