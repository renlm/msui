import { DisplayValue, FieldConfig, GrafanaTheme, GrafanaTheme2, Threshold, ThresholdsConfig } from '@grafana/data';
import { VizOrientation } from '@grafana/schema';
interface GaugeAutoProps {
    titleFontSize: number;
    gaugeHeight: number;
    showLabel: boolean;
}
export declare const DEFAULT_THRESHOLDS: ThresholdsConfig;
export declare function calculateGaugeAutoProps(width: number, height: number, title: string | undefined, orientation?: VizOrientation): GaugeAutoProps;
export declare function getFormattedThresholds(decimals: number, field: FieldConfig, value: DisplayValue, theme: GrafanaTheme | GrafanaTheme2): Threshold[];
export {};
