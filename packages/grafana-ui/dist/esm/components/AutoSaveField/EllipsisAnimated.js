import { css, keyframes } from '@emotion/css';
import React__default from 'react';
import '@grafana/data';
import { useStyles2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';

const EllipsisAnimated = React__default.memo(() => {
  const styles = useStyles2(getStyles);
  return /* @__PURE__ */ React__default.createElement("div", { className: styles.ellipsis }, /* @__PURE__ */ React__default.createElement("span", { className: styles.firstDot }, "."), /* @__PURE__ */ React__default.createElement("span", { className: styles.secondDot }, "."), /* @__PURE__ */ React__default.createElement("span", { className: styles.thirdDot }, "."));
});
EllipsisAnimated.displayName = "EllipsisAnimated";
const getStyles = (theme) => {
  return {
    ellipsis: css({
      display: "inline"
    }),
    firstDot: css({
      [theme.transitions.handleMotion("no-preference", "reduce")]: {
        animation: `${firstDot} 2s linear infinite`
      }
    }),
    secondDot: css({
      [theme.transitions.handleMotion("no-preference", "reduce")]: {
        animation: `${secondDot} 2s linear infinite`
      }
    }),
    thirdDot: css({
      [theme.transitions.handleMotion("no-preference", "reduce")]: {
        animation: `${thirdDot} 2s linear infinite`
      }
    })
  };
};
const firstDot = keyframes`
  0% {
    opacity: 1;
  }
  65% {
    opacity: 1;
  }
  66% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
  }
  `;
const secondDot = keyframes`
  0% {
    opacity: 0;
  }
  21% {
    opacity: 0.5;
  }
  22% {
    opacity: 1;
  }
  65% {
    opacity: 1;
  }
  66% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
  }
  `;
const thirdDot = keyframes`
  0% {
    opacity: 0;
  }
  43% {
    opacity: 0.5;
  }
  44% {
    opacity: 1;
  }
  65% {
    opacity: 1;
  }
  66% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
  }
  `;

export { EllipsisAnimated };
//# sourceMappingURL=EllipsisAnimated.js.map
