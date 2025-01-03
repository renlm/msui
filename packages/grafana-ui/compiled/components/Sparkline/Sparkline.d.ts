import React, { PureComponent } from 'react';
import { AlignedData, Range } from 'uplot';
import { DataFrame, Field, FieldConfig, FieldSparkline } from '@grafana/data';
import { GraphFieldConfig } from '@grafana/schema';
import { Themeable2 } from '../../types';
import { UPlotConfigBuilder } from '../uPlot/config/UPlotConfigBuilder';
export interface SparklineProps extends Themeable2 {
    width: number;
    height: number;
    config?: FieldConfig<GraphFieldConfig>;
    sparkline: FieldSparkline;
}
interface State {
    data: AlignedData;
    alignedDataFrame: DataFrame;
    configBuilder: UPlotConfigBuilder;
}
/** @internal */
export declare class Sparkline extends PureComponent<SparklineProps, State> {
    constructor(props: SparklineProps);
    static getDerivedStateFromProps(props: SparklineProps, state: State): {
        data: AlignedData;
        alignedDataFrame: DataFrame;
        configBuilder: UPlotConfigBuilder;
    };
    componentDidUpdate(prevProps: SparklineProps, prevState: State): void;
    getYRange(field: Field): Range.MinMax;
    prepareConfig(data: DataFrame): UPlotConfigBuilder;
    render(): React.JSX.Element;
}
export {};
