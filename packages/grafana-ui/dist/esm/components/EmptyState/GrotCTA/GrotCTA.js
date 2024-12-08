import { css } from '@emotion/css';
import React__default from 'react';
import SVG from 'react-inlinesvg';
import '@grafana/data';
import { useStyles2 } from '../../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../../utils/skeleton.js';
import grotCTASvg from './grot-cta.svg.js';

const GrotCTA = ({ width = "auto", height }) => {
  const styles = useStyles2(getStyles);
  return /* @__PURE__ */ React__default.createElement(SVG, { src: grotCTASvg, className: styles.svg, height, width });
};
GrotCTA.displayName = "GrotCTA";
const getStyles = (theme) => {
  return {
    svg: css({
      "#grot-cta-cactus-1, #grot-cta-cactus-2": {
        fill: theme.isDark ? "#58558c" : "#c9c5f4"
      }
    })
  };
};

export { GrotCTA };
//# sourceMappingURL=GrotCTA.js.map
