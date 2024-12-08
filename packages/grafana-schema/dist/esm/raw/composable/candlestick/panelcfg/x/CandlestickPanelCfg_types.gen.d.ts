import * as common from '@grafana/schema';
export declare const pluginVersion = "11.1.11";
export declare enum VizDisplayMode {
    Candles = "candles",
    CandlesVolume = "candles+volume",
    Volume = "volume"
}
export declare enum CandleStyle {
    Candles = "candles",
    OHLCBars = "ohlcbars"
}
export declare enum ColorStrategy {
    CloseClose = "close-close",
    OpenClose = "open-close"
}
export interface CandlestickFieldMap {
    /**
     * Corresponds to the final (end) value of the given period
     */
    close?: string;
    /**
     * Corresponds to the highest value of the given period
     */
    high?: string;
    /**
     * Corresponds to the lowest value of the given period
     */
    low?: string;
    /**
     * Corresponds to the starting value of the given period
     */
    open?: string;
    /**
     * Corresponds to the sample count in the given period. (e.g. number of trades)
     */
    volume?: string;
}
export interface CandlestickColors {
    down: string;
    flat: string;
    up: string;
}
export declare const defaultCandlestickColors: Partial<CandlestickColors>;
export interface Options extends common.OptionsWithLegend, common.OptionsWithTooltip {
    /**
     * Sets the style of the candlesticks
     */
    candleStyle: CandleStyle;
    /**
     * Sets the color strategy for the candlesticks
     */
    colorStrategy: ColorStrategy;
    /**
     * Set which colors are used when the price movement is up or down
     */
    colors: CandlestickColors;
    /**
     * Map fields to appropriate dimension
     */
    fields: CandlestickFieldMap;
    /**
     * When enabled, all fields will be sent to the graph
     */
    includeAllFields?: boolean;
    /**
     * Sets which dimensions are used for the visualization
     */
    mode: VizDisplayMode;
}
export declare const defaultOptions: Partial<Options>;
export interface FieldConfig extends common.GraphFieldConfig {
}
