import { keyframes, css } from '@emotion/css';
import React__default from 'react';
import '@grafana/data';
import { useStyles2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';

const BAR_WIDTH = 28;
const MILLISECONDS_PER_PIXEL = 2.4;
const MIN_DURATION_MS = 500;
const MAX_DURATION_MS = 4e3;
const DEFAULT_ANIMATION_DELAY = 300;
const MAX_TRANSLATE_X = 100 / BAR_WIDTH * 100;
function LoadingBar({ width, delay = DEFAULT_ANIMATION_DELAY, ariaLabel = "Loading bar" }) {
  const durationMs = Math.min(Math.max(Math.round(width * MILLISECONDS_PER_PIXEL), MIN_DURATION_MS), MAX_DURATION_MS);
  const styles = useStyles2(getStyles, delay, durationMs);
  const containerStyles = {
    overflow: "hidden"
  };
  return /* @__PURE__ */ React__default.createElement("div", { style: containerStyles }, /* @__PURE__ */ React__default.createElement("div", { "aria-label": ariaLabel, className: styles.bar }));
}
const getStyles = (theme, delay, duration) => {
  const animation = keyframes({
    "0%": {
      transform: "translateX(-100%)"
    },
    // this gives us a delay between iterations
    "85%, 100%": {
      transform: `translateX(${MAX_TRANSLATE_X}%)`
    }
  });
  return {
    bar: css({
      width: BAR_WIDTH + "%",
      height: 1,
      background: "linear-gradient(90deg, rgba(110, 159, 255, 0) 0%, #6E9FFF 80.75%, rgba(110, 159, 255, 0) 100%)",
      transform: "translateX(-100%)",
      willChange: "transform",
      [theme.transitions.handleMotion("no-preference")]: {
        animationName: animation,
        // an initial delay to prevent the loader from showing if the response is faster than the delay
        animationDelay: `${delay}ms`,
        animationTimingFunction: "linear",
        animationIterationCount: "infinite",
        animationDuration: `${duration}ms`
      },
      [theme.transitions.handleMotion("reduce")]: {
        animationName: animation,
        // an initial delay to prevent the loader from showing if the response is faster than the delay
        animationDelay: `${delay}ms`,
        animationTimingFunction: "linear",
        animationIterationCount: "infinite",
        animationDuration: `${4 * duration}ms`
      }
    })
  };
};

export { LoadingBar };
//# sourceMappingURL=LoadingBar.js.map
