import { css } from '@emotion/css';
import React__default from 'react';
import '@grafana/data';
import { useStyles2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';
import { Portal } from '../Portal/Portal.js';
import { VizTooltipContainer } from './VizTooltipContainer.js';

const VizTooltip = ({ content, position, offset }) => {
  const styles = useStyles2(getStyles);
  if (position) {
    return /* @__PURE__ */ React__default.createElement(Portal, { className: styles.portal }, /* @__PURE__ */ React__default.createElement(VizTooltipContainer, { position, offset: offset || { x: 0, y: 0 } }, content));
  }
  return null;
};
VizTooltip.displayName = "VizTooltip";
const getStyles = () => {
  return {
    portal: css({
      position: "absolute",
      top: 0,
      left: 0,
      pointerEvents: "none",
      width: "100%",
      height: "100%"
    })
  };
};

export { VizTooltip };
//# sourceMappingURL=VizTooltip.js.map
