import * as ui from '@grafana/schema';
export declare const pluginVersion = "11.1.11";
export interface Options {
    basemap: ui.MapLayerOptions;
    controls: ControlsOptions;
    layers: Array<ui.MapLayerOptions>;
    tooltip: TooltipOptions;
    view: MapViewConfig;
}
export declare const defaultOptions: Partial<Options>;
export interface MapViewConfig {
    allLayers?: boolean;
    id: string;
    lastOnly?: boolean;
    lat?: number;
    layer?: string;
    lon?: number;
    maxZoom?: number;
    minZoom?: number;
    padding?: number;
    shared?: boolean;
    zoom?: number;
}
export declare const defaultMapViewConfig: Partial<MapViewConfig>;
export interface ControlsOptions {
    /**
     * let the mouse wheel zoom
     */
    mouseWheelZoom?: boolean;
    /**
     * Lower right
     */
    showAttribution?: boolean;
    /**
     * Show debug
     */
    showDebug?: boolean;
    /**
     * Show measure
     */
    showMeasure?: boolean;
    /**
     * Scale options
     */
    showScale?: boolean;
    /**
     * Zoom (upper left)
     */
    showZoom?: boolean;
}
export interface TooltipOptions {
    mode: TooltipMode;
}
export declare enum TooltipMode {
    Details = "details",
    None = "none"
}
export declare enum MapCenterID {
    Coords = "coords",
    Fit = "fit",
    Zero = "zero"
}
