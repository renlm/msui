import { cx, css } from '@emotion/css';
import React__default, { useRef, useCallback } from 'react';
import { selectors } from '@grafana/e2e-selectors';
import '@grafana/data';
import { useStyles2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';
import { Icon } from '../Icon/Icon.js';
import { PanelMenu } from './PanelMenu.js';

function HoverWidget({ menu, title, dragClass, children, offset = -32, onOpenMenu }) {
  const styles = useStyles2(getStyles);
  const draggableRef = useRef(null);
  const selectors$1 = selectors.components.Panels.Panel.HoverWidget;
  const onPointerDown = useCallback((e) => {
    var _a;
    (_a = draggableRef.current) == null ? void 0 : _a.setPointerCapture(e.pointerId);
  }, []);
  const onPointerUp = useCallback((e) => {
    var _a;
    (_a = draggableRef.current) == null ? void 0 : _a.releasePointerCapture(e.pointerId);
  }, []);
  if (children === void 0 || React__default.Children.count(children) === 0) {
    return null;
  }
  return /* @__PURE__ */ React__default.createElement("div", { className: cx(styles.container, "show-on-hover"), style: { top: offset }, "data-testid": selectors$1.container }, dragClass && /* @__PURE__ */ React__default.createElement(
    "div",
    {
      className: cx(styles.square, styles.draggable, dragClass),
      onPointerDown,
      onPointerUp,
      ref: draggableRef,
      "data-testid": selectors$1.dragIcon
    },
    /* @__PURE__ */ React__default.createElement(Icon, { name: "expand-arrows", className: styles.draggableIcon })
  ), children, menu && /* @__PURE__ */ React__default.createElement(
    PanelMenu,
    {
      menu,
      title,
      placement: "bottom",
      menuButtonClass: styles.menuButton,
      onOpenMenu
    }
  ));
}
function getStyles(theme) {
  return {
    container: css({
      label: "hover-container-widget",
      [theme.transitions.handleMotion("no-preference", "reduce")]: {
        transition: `all .1s linear`
      },
      display: "flex",
      position: "absolute",
      zIndex: 1,
      right: 0,
      boxSizing: "content-box",
      alignItems: "center",
      background: theme.colors.background.secondary,
      color: theme.colors.text.primary,
      border: `1px solid ${theme.colors.border.weak}`,
      borderRadius: theme.shape.radius.default,
      height: theme.spacing(4),
      boxShadow: theme.shadows.z1
    }),
    square: css({
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: theme.spacing(4),
      height: "100%"
    }),
    draggable: css({
      cursor: "move",
      // mobile do not support draggable panels
      [theme.breakpoints.down("md")]: {
        display: "none"
      }
    }),
    menuButton: css({
      // Background and border are overriden when topnav toggle is disabled
      background: "inherit",
      border: "none",
      "&:hover": {
        background: theme.colors.secondary.main
      }
    }),
    draggableIcon: css({
      transform: "rotate(45deg)",
      color: theme.colors.text.secondary,
      "&:hover": {
        color: theme.colors.text.primary
      }
    })
  };
}

export { HoverWidget };
//# sourceMappingURL=HoverWidget.js.map
