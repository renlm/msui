import React, { PureComponent } from 'react';
import { DisplayValue, FieldConfig, GrafanaTheme2 } from '@grafana/data';
import { VizTextDisplayOptions, VizOrientation } from '@grafana/schema';
export interface Props {
    height: number;
    field: FieldConfig;
    showThresholdMarkers: boolean;
    showThresholdLabels: boolean;
    width: number;
    value: DisplayValue;
    text?: VizTextDisplayOptions;
    onClick?: React.MouseEventHandler<HTMLElement>;
    className?: string;
    theme: GrafanaTheme2;
    orientation?: VizOrientation;
}
export declare class Gauge extends PureComponent<Props> {
    canvasElement: HTMLDivElement | null;
    static defaultProps: Partial<Props>;
    componentDidMount(): void;
    componentDidUpdate(): void;
    draw(): void;
    renderVisualization: () => React.JSX.Element;
    render(): React.JSX.Element;
}
