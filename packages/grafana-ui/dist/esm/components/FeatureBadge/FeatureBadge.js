import React__default from 'react';
import { FeatureState } from '@grafana/data';
import { Badge } from '../Badge/Badge.js';

const FeatureBadge = ({ featureState, tooltip }) => {
  const display = getPanelStateBadgeDisplayModel(featureState);
  return /* @__PURE__ */ React__default.createElement(Badge, { text: display.text, color: display.color, icon: display.icon, tooltip });
};
function getPanelStateBadgeDisplayModel(featureState) {
  switch (featureState) {
    case FeatureState.alpha:
      return {
        text: "Alpha",
        icon: "exclamation-triangle",
        color: "orange"
      };
    case FeatureState.beta:
      return {
        text: "Beta",
        icon: "rocket",
        color: "blue"
      };
    case FeatureState.experimental:
      return {
        text: "Experimental",
        icon: "exclamation-triangle",
        color: "orange"
      };
    case FeatureState.preview:
      return {
        text: "Preview",
        icon: "rocket",
        color: "blue"
      };
    case FeatureState.privatePreview:
      return {
        text: "Private preview",
        icon: "rocket",
        color: "blue"
      };
  }
}

export { FeatureBadge };
//# sourceMappingURL=FeatureBadge.js.map
