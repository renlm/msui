import React, { CSSProperties } from 'react';
import { DisplayValue, ThemeVisualizationColors } from '@grafana/data';
import { PercentChangeColorMode } from '@grafana/schema';
import { Props, BigValueJustifyMode } from './BigValue';
export declare abstract class BigValueLayout {
    private props;
    titleFontSize: number;
    valueFontSize: number;
    chartHeight: number;
    chartWidth: number;
    valueColor: string;
    panelPadding: number;
    justifyCenter: boolean;
    titleToAlignTo?: string;
    valueToAlignTo: string;
    maxTextWidth: number;
    maxTextHeight: number;
    textValues: BigValueTextValues;
    constructor(props: Props);
    getTitleStyles(): CSSProperties;
    getValueStyles(): CSSProperties;
    getPercentChangeStyles(percentChange: number, percentChangeColorMode: PercentChangeColorMode | undefined, valueStyles: React.CSSProperties): PercentChangeStyles;
    getValueAndTitleContainerStyles(): React.CSSProperties;
    getPanelStyles(): CSSProperties;
    renderChart(): JSX.Element | null;
    getChartStyles(): CSSProperties;
}
export declare class WideNoChartLayout extends BigValueLayout {
    constructor(props: Props);
    getValueAndTitleContainerStyles(): React.CSSProperties;
    renderChart(): JSX.Element | null;
    getPanelStyles(): React.CSSProperties;
}
export declare class WideWithChartLayout extends BigValueLayout {
    constructor(props: Props);
    getValueAndTitleContainerStyles(): React.CSSProperties;
    getPanelStyles(): React.CSSProperties;
}
export declare class StackedWithChartLayout extends BigValueLayout {
    constructor(props: Props);
    getValueAndTitleContainerStyles(): React.CSSProperties;
    getPanelStyles(): React.CSSProperties;
}
export declare class StackedWithNoChartLayout extends BigValueLayout {
    constructor(props: Props);
    getValueAndTitleContainerStyles(): React.CSSProperties;
    renderChart(): JSX.Element | null;
    getPanelStyles(): React.CSSProperties;
}
export declare function buildLayout(props: Props): BigValueLayout;
export declare function shouldJustifyCenter(justifyMode?: BigValueJustifyMode, title?: string): boolean;
export interface BigValueTextValues extends DisplayValue {
    valueToAlignTo: string;
    titleToAlignTo?: string;
    tooltip?: string;
}
export interface PercentChangeStyles {
    containerStyles: CSSProperties;
    iconSize: number;
}
export declare function getPercentChangeColor(percentChange: number, percentChangeColorMode: PercentChangeColorMode | undefined, valueStyles: CSSProperties, themeVisualizationColors: ThemeVisualizationColors): string | undefined;
