import { i as VizOrientation, V as VisibilityMode, S as StackingMode, G as GraphGradientMode } from '../../../../../common.gen-8ea2300f.js';

const pluginVersion = "11.1.11";
const defaultOptions = {
  barRadius: 0,
  barWidth: 0.97,
  fullHighlight: false,
  groupWidth: 0.7,
  orientation: VizOrientation.Auto,
  showValue: VisibilityMode.Auto,
  stacking: StackingMode.None,
  xTickLabelRotation: 0,
  xTickLabelSpacing: 0
};
const defaultFieldConfig = {
  fillOpacity: 80,
  gradientMode: GraphGradientMode.None,
  lineWidth: 1
};

export { defaultFieldConfig, defaultOptions, pluginVersion };
