import { cx, css } from '@emotion/css';
import React__default, { useState, useRef, useEffect } from 'react';
import '@grafana/data';
import { useStyles2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';

const ScrollIndicators = ({ children }) => {
  const [showScrollTopIndicator, setShowTopScrollIndicator] = useState(false);
  const [showScrollBottomIndicator, setShowBottomScrollIndicator] = useState(false);
  const scrollTopMarker = useRef(null);
  const scrollBottomMarker = useRef(null);
  const styles = useStyles2(getStyles);
  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === scrollTopMarker.current) {
          setShowTopScrollIndicator(!entry.isIntersecting);
        } else if (entry.target === scrollBottomMarker.current) {
          setShowBottomScrollIndicator(!entry.isIntersecting);
        }
      });
    });
    [scrollTopMarker, scrollBottomMarker].forEach((ref) => {
      if (ref.current) {
        intersectionObserver.observe(ref.current);
      }
    });
    return () => intersectionObserver.disconnect();
  }, []);
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(
    "div",
    {
      className: cx(styles.scrollIndicator, styles.scrollTopIndicator, {
        [styles.scrollIndicatorVisible]: showScrollTopIndicator
      })
    }
  ), /* @__PURE__ */ React__default.createElement("div", { className: styles.scrollContent }, /* @__PURE__ */ React__default.createElement("div", { ref: scrollTopMarker }), children, /* @__PURE__ */ React__default.createElement("div", { ref: scrollBottomMarker })), /* @__PURE__ */ React__default.createElement(
    "div",
    {
      className: cx(styles.scrollIndicator, styles.scrollBottomIndicator, {
        [styles.scrollIndicatorVisible]: showScrollBottomIndicator
      })
    }
  ));
};
const getStyles = (theme) => {
  return {
    scrollContent: css({
      flex: 1,
      position: "relative"
    }),
    scrollIndicator: css({
      height: theme.spacing(6),
      left: 0,
      opacity: 0,
      pointerEvents: "none",
      position: "absolute",
      right: 0,
      [theme.transitions.handleMotion("no-preference", "reduce")]: {
        transition: theme.transitions.create("opacity")
      },
      zIndex: 1
    }),
    scrollTopIndicator: css({
      background: `linear-gradient(0deg, transparent, ${theme.colors.background.canvas})`,
      top: 0
    }),
    scrollBottomIndicator: css({
      background: `linear-gradient(180deg, transparent, ${theme.colors.background.canvas})`,
      bottom: 0
    }),
    scrollIndicatorVisible: css({
      opacity: 1
    })
  };
};

export { ScrollIndicators };
//# sourceMappingURL=ScrollIndicators.js.map
