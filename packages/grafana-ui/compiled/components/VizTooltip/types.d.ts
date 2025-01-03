import { LineStyle } from '@grafana/schema';
export declare enum ColorIndicator {
    series = "series",
    value = "value",
    hexagon = "hexagon",
    pie_1_4 = "pie_1_4",
    pie_2_4 = "pie_2_4",
    pie_3_4 = "pie_3_4",
    marker_sm = "marker_sm",
    marker_md = "marker_md",
    marker_lg = "marker_lg"
}
export declare enum ColorPlacement {
    hidden = "hidden",
    first = "first",
    leading = "leading",
    trailing = "trailing"
}
export interface VizTooltipItem {
    label: string;
    value: string;
    color?: string;
    colorIndicator?: ColorIndicator;
    colorPlacement?: ColorPlacement;
    isActive?: boolean;
    lineStyle?: LineStyle;
    numeric?: number;
}
export declare const DEFAULT_COLOR_INDICATOR = ColorIndicator.series;
