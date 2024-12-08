import { css } from '@emotion/css';
import React__default, { useRef, useEffect } from 'react';
import SVG from 'react-inlinesvg';
import '@grafana/data';
import { useStyles2 } from '../../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../../utils/skeleton.js';
import notFoundSvg from './grot-not-found.svg.js';

const MIN_ARM_ROTATION = -20;
const MAX_ARM_ROTATION = 5;
const MIN_ARM_TRANSLATION = -5;
const MAX_ARM_TRANSLATION = 5;
const GrotNotFound = ({ width = "auto", height }) => {
  const svgRef = useRef(null);
  const styles = useStyles2(getStyles);
  useEffect(() => {
    const handleMouseMove = (event) => {
      var _a, _b;
      if (window.matchMedia("(prefers-reduced-motion: reduce").matches) {
        return;
      }
      const grotArm = (_a = svgRef.current) == null ? void 0 : _a.querySelector("#grot-not-found-arm");
      const grotMagnifier = (_b = svgRef.current) == null ? void 0 : _b.querySelector("#grot-not-found-magnifier");
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;
      const heightRatio = clientY / innerHeight;
      const widthRatio = clientX / innerWidth;
      const rotation = getIntermediateValue(heightRatio, MIN_ARM_ROTATION, MAX_ARM_ROTATION);
      const translation = getIntermediateValue(widthRatio, MIN_ARM_TRANSLATION, MAX_ARM_TRANSLATION);
      window.requestAnimationFrame(() => {
        grotArm == null ? void 0 : grotArm.setAttribute("style", `transform: rotate(${rotation}deg) translateX(${translation}%)`);
        grotMagnifier == null ? void 0 : grotMagnifier.setAttribute("style", `transform: rotate(${rotation}deg) translateX(${translation}%)`);
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  return /* @__PURE__ */ React__default.createElement(SVG, { innerRef: svgRef, src: notFoundSvg, className: styles.svg, height, width });
};
GrotNotFound.displayName = "GrotNotFound";
const getStyles = (theme) => {
  return {
    svg: css({
      "#grot-not-found-arm, #grot-not-found-magnifier": {
        transformOrigin: "center"
      }
    })
  };
};
const getIntermediateValue = (ratio, start, end) => {
  const value = ratio * (end - start) + start;
  return value;
};

export { GrotNotFound };
//# sourceMappingURL=GrotNotFound.js.map
