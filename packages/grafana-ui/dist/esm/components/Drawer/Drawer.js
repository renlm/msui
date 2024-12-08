import { cx, css } from '@emotion/css';
import { useDialog } from '@react-aria/dialog';
import { FocusScope } from '@react-aria/focus';
import { useOverlay } from '@react-aria/overlays';
import RcDrawer from 'rc-drawer';
import React__default, { useState, useCallback, useEffect } from 'react';
import { selectors } from '@grafana/e2e-selectors';
import '@grafana/data';
import { useStyles2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';
import { t } from '../../utils/i18n.js';
import { CustomScrollbar } from '../CustomScrollbar/CustomScrollbar.js';
import { getDragStyles } from '../DragHandle/DragHandle.js';
import { IconButton } from '../IconButton/IconButton.js';
import { Text } from '../Text/Text.js';
import 'rc-drawer/assets/index.css';

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
function Drawer({
  children,
  onClose,
  closeOnMaskClick = true,
  scrollableContent = true,
  title,
  subtitle,
  width,
  size = "md",
  tabs
}) {
  const [drawerWidth, onMouseDown, onTouchStart] = useResizebleDrawer();
  const styles = useStyles2(getStyles);
  const sizeStyles = useStyles2(getSizeStyles, size, drawerWidth != null ? drawerWidth : width);
  const dragStyles = useStyles2(getDragStyles);
  const overlayRef = React__default.useRef(null);
  const { dialogProps, titleProps } = useDialog({}, overlayRef);
  const { overlayProps } = useOverlay(
    {
      isDismissable: false,
      isOpen: true,
      onClose
    },
    overlayRef
  );
  useBodyClassWhileOpen();
  const rootClass = cx(styles.drawer, sizeStyles);
  const content = /* @__PURE__ */ React__default.createElement("div", { className: styles.content }, children);
  return /* @__PURE__ */ React__default.createElement(
    RcDrawer,
    {
      open: true,
      onClose,
      placement: "right",
      getContainer: ".main-view",
      className: styles.drawerContent,
      rootClassName: rootClass,
      width: "",
      motion: {
        motionAppear: true,
        motionName: styles.drawerMotion
      },
      maskClassName: styles.mask,
      maskClosable: closeOnMaskClick,
      maskMotion: {
        motionAppear: true,
        motionName: styles.maskMotion
      }
    },
    /* @__PURE__ */ React__default.createElement(FocusScope, { restoreFocus: true, contain: true, autoFocus: true }, /* @__PURE__ */ React__default.createElement(
      "div",
      __spreadProps(__spreadValues(__spreadValues({
        "aria-label": typeof title === "string" ? selectors.components.Drawer.General.title(title) : selectors.components.Drawer.General.title("no title"),
        className: styles.container
      }, overlayProps), dialogProps), {
        ref: overlayRef
      }),
      /* @__PURE__ */ React__default.createElement(
        "div",
        {
          className: cx(dragStyles.dragHandleVertical, styles.resizer),
          onMouseDown,
          onTouchStart
        }
      ),
      typeof title === "string" && /* @__PURE__ */ React__default.createElement("div", { className: cx(styles.header, Boolean(tabs) && styles.headerWithTabs) }, /* @__PURE__ */ React__default.createElement("div", { className: styles.actions }, /* @__PURE__ */ React__default.createElement(
        IconButton,
        {
          name: "times",
          variant: "secondary",
          onClick: onClose,
          "data-testid": selectors.components.Drawer.General.close,
          tooltip: t(`grafana-ui.drawer.close`, "Close")
        }
      )), /* @__PURE__ */ React__default.createElement("div", { className: styles.titleWrapper }, /* @__PURE__ */ React__default.createElement(Text, __spreadValues({ element: "h3" }, titleProps), title), subtitle && /* @__PURE__ */ React__default.createElement("div", { className: styles.subtitle, "data-testid": selectors.components.Drawer.General.subtitle }, subtitle), tabs && /* @__PURE__ */ React__default.createElement("div", { className: styles.tabsWrapper }, tabs))),
      typeof title !== "string" && title,
      !scrollableContent ? content : /* @__PURE__ */ React__default.createElement(CustomScrollbar, null, content)
    ))
  );
}
function useResizebleDrawer() {
  const [drawerWidth, setDrawerWidth] = useState(void 0);
  const onMouseMove = useCallback((e) => {
    setDrawerWidth(getCustomDrawerWidth(e.clientX));
  }, []);
  const onTouchMove = useCallback((e) => {
    const touch = e.touches[0];
    setDrawerWidth(getCustomDrawerWidth(touch.clientX));
  }, []);
  const onMouseUp = useCallback(
    (e) => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    },
    [onMouseMove]
  );
  const onTouchEnd = useCallback(
    (e) => {
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
    },
    [onTouchMove]
  );
  function onMouseDown(e) {
    e.stopPropagation();
    e.preventDefault();
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  }
  function onTouchStart(e) {
    e.stopPropagation();
    e.preventDefault();
    document.addEventListener("touchmove", onTouchMove);
    document.addEventListener("touchend", onTouchEnd);
  }
  return [drawerWidth, onMouseDown, onTouchStart];
}
function getCustomDrawerWidth(clientX) {
  let offsetRight = document.body.offsetWidth - (clientX - document.body.offsetLeft);
  let widthPercent = Math.min(offsetRight / document.body.clientWidth * 100, 98).toFixed(2);
  return `${widthPercent}vw`;
}
function useBodyClassWhileOpen() {
  useEffect(() => {
    if (!document.body) {
      return;
    }
    document.body.classList.add("body-drawer-open");
    return () => {
      document.body.classList.remove("body-drawer-open");
    };
  }, []);
}
const getStyles = (theme) => {
  return {
    container: css({
      display: "flex",
      flexDirection: "column",
      height: "100%",
      flex: "1 1 0",
      minHeight: "100%",
      position: "relative"
    }),
    drawer: css({
      ".main-view &": {
        top: 80
      },
      ".main-view--search-bar-hidden &": {
        top: 40
      },
      ".main-view--chrome-hidden &": {
        top: 0
      },
      ".rc-drawer-content-wrapper": {
        boxShadow: theme.shadows.z3
      }
    }),
    drawerContent: css({
      backgroundColor: `${theme.colors.background.primary} !important`,
      display: "flex",
      overflow: "unset !important",
      flexDirection: "column"
    }),
    drawerMotion: css({
      "&-appear": {
        transform: "translateX(100%)",
        transition: "none !important",
        "&-active": {
          transition: `${theme.transitions.create("transform")} !important`,
          transform: "translateX(0)"
        }
      }
    }),
    // we want the mask itself to span the whole page including the top bar
    // this ensures trying to click something in the top bar will close the drawer correctly
    // but we don't want the backdrop styling to apply over the top bar as it looks weird
    // instead have a child pseudo element to apply the backdrop styling below the top bar
    mask: css({
      backgroundColor: "transparent",
      position: "fixed",
      "&:before": {
        backgroundColor: `${theme.components.overlay.background} !important`,
        backdropFilter: "blur(1px)",
        bottom: 0,
        content: '""',
        left: 0,
        position: "fixed",
        right: 0,
        ".main-view &": {
          top: 80
        },
        ".main-view--search-bar-hidden &": {
          top: 40
        },
        ".main-view--chrome-hidden &": {
          top: 0
        }
      }
    }),
    maskMotion: css({
      "&-appear": {
        opacity: 0,
        "&-active": {
          opacity: 1,
          transition: theme.transitions.create("opacity")
        }
      }
    }),
    header: css({
      label: "drawer-header",
      flexGrow: 0,
      padding: theme.spacing(2, 2, 3),
      borderBottom: `1px solid ${theme.colors.border.weak}`
    }),
    headerWithTabs: css({
      borderBottom: "none"
    }),
    actions: css({
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1)
    }),
    titleWrapper: css({
      label: "drawer-title",
      overflowWrap: "break-word"
    }),
    subtitle: css({
      label: "drawer-subtitle",
      color: theme.colors.text.secondary,
      paddingTop: theme.spacing(1)
    }),
    content: css({
      padding: theme.spacing(2),
      height: "100%",
      flexGrow: 1
    }),
    tabsWrapper: css({
      label: "drawer-tabs",
      paddingLeft: theme.spacing(2),
      margin: theme.spacing(1, -1, -3, -3)
    }),
    resizer: css({
      top: 0,
      left: theme.spacing(-1),
      bottom: 0,
      position: "absolute",
      zIndex: theme.zIndex.modal
    })
  };
};
const drawerSizes = {
  sm: { width: "25vw", minWidth: 384 },
  md: { width: "50vw", minWidth: 568 },
  lg: { width: "75vw", minWidth: 744 }
};
function getSizeStyles(theme, size, overrideWidth) {
  let width = overrideWidth != null ? overrideWidth : drawerSizes[size].width;
  let minWidth = drawerSizes[size].minWidth;
  return css({
    ".rc-drawer-content-wrapper": {
      label: `drawer-content-wrapper-${size}`,
      width,
      minWidth,
      overflow: "unset",
      [theme.breakpoints.down("md")]: {
        width: `calc(100% - ${theme.spacing(2)}) !important`,
        minWidth: 0
      }
    }
  });
}

export { Drawer };
//# sourceMappingURL=Drawer.js.map
