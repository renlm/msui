import { SelectableValue } from '@grafana/data';
import { AxisPlacement, BarAlignment, GraphDrawStyle, GraphGradientMode, GraphThresholdsStyleMode, LineInterpolation, VisibilityMode, StackingMode } from '@grafana/schema';
/**
 * @alpha
 */
export declare const graphFieldOptions: {
    drawStyle: Array<SelectableValue<GraphDrawStyle>>;
    lineInterpolation: Array<SelectableValue<LineInterpolation>>;
    barAlignment: Array<SelectableValue<BarAlignment>>;
    showPoints: Array<SelectableValue<VisibilityMode>>;
    axisPlacement: Array<SelectableValue<AxisPlacement>>;
    fillGradient: Array<SelectableValue<GraphGradientMode>>;
    stacking: Array<SelectableValue<StackingMode>>;
    thresholdsDisplayModes: Array<SelectableValue<GraphThresholdsStyleMode>>;
};
