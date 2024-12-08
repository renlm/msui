import { cx, css } from '@emotion/css';
import React__default, { useId } from 'react';
import { useToggle, useMeasure } from 'react-use';
import { LoadingState } from '@grafana/data';
import { selectors } from '@grafana/e2e-selectors';
import { useTheme2, useStyles2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import { getFocusStyles } from '../../themes/mixins.js';
import '../../utils/skeleton.js';
import { DelayRender } from '../../utils/DelayRender.js';
import { Icon } from '../Icon/Icon.js';
import { LoadingBar } from '../LoadingBar/LoadingBar.js';
import { Text } from '../Text/Text.js';
import { Tooltip } from '../Tooltip/Tooltip.js';
import { HoverWidget } from './HoverWidget.js';
import { PanelDescription } from './PanelDescription.js';
import { PanelMenu } from './PanelMenu.js';
import { PanelStatus } from './PanelStatus.js';
import { TitleItem } from './TitleItem.js';

function PanelChrome({
  width,
  height,
  children,
  padding = "md",
  title = "",
  description = "",
  displayMode = "default",
  titleItems,
  menu,
  dragClass,
  dragClassCancel,
  hoverHeader = false,
  hoverHeaderOffset,
  loadingState,
  statusMessage,
  statusMessageOnClick,
  leftItems,
  actions,
  onCancelQuery,
  onOpenMenu,
  collapsible = false,
  collapsed,
  onToggleCollapse,
  onFocus,
  onMouseMove
}) {
  const theme = useTheme2();
  const styles = useStyles2(getStyles);
  const panelContentId = useId();
  const hasHeader = !hoverHeader;
  const [isOpen, toggleOpen] = useToggle(true);
  if (collapsed === void 0) {
    collapsed = !isOpen;
  }
  const showOnHoverClass = "show-on-hover";
  const isPanelTransparent = displayMode === "transparent";
  const headerHeight = getHeaderHeight(theme, hasHeader);
  const { contentStyle, innerWidth, innerHeight } = getContentStyle(
    padding,
    theme,
    headerHeight,
    collapsed,
    height,
    width
  );
  const headerStyles = {
    height: headerHeight,
    cursor: dragClass ? "move" : "auto"
  };
  const containerStyles = { width, height: collapsed ? void 0 : height };
  const [ref, { width: loadingBarWidth }] = useMeasure();
  if (leftItems) {
    actions = leftItems;
  }
  const testid = typeof title === "string" ? selectors.components.Panels.Panel.title(title) : "Panel";
  const headerContent = /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, !collapsible && title && /* @__PURE__ */ React__default.createElement("div", { className: styles.title }, /* @__PURE__ */ React__default.createElement(Text, { element: "h2", variant: "h6", truncate: true, title: typeof title === "string" ? title : void 0 }, title)), collapsible && /* @__PURE__ */ React__default.createElement("div", { className: styles.title }, /* @__PURE__ */ React__default.createElement(Text, { element: "h2", variant: "h6" }, /* @__PURE__ */ React__default.createElement(
    "button",
    {
      type: "button",
      className: styles.clearButtonStyles,
      onClick: () => {
        toggleOpen();
        if (onToggleCollapse) {
          onToggleCollapse(!collapsed);
        }
      },
      "aria-expanded": !collapsed,
      "aria-controls": !collapsed ? panelContentId : void 0
    },
    /* @__PURE__ */ React__default.createElement(
      Icon,
      {
        name: !collapsed ? "angle-down" : "angle-right",
        "aria-hidden": !!title,
        "aria-label": !title ? "toggle collapse panel" : void 0
      }
    ),
    /* @__PURE__ */ React__default.createElement(Text, { variant: "h6", truncate: true }, title)
  ))), /* @__PURE__ */ React__default.createElement("div", { className: cx(styles.titleItems, dragClassCancel), "data-testid": "title-items-container" }, /* @__PURE__ */ React__default.createElement(PanelDescription, { description, className: dragClassCancel }), titleItems), loadingState === LoadingState.Streaming && /* @__PURE__ */ React__default.createElement(Tooltip, { content: onCancelQuery ? "Stop streaming" : "Streaming" }, /* @__PURE__ */ React__default.createElement(TitleItem, { className: dragClassCancel, "data-testid": "panel-streaming", onClick: onCancelQuery }, /* @__PURE__ */ React__default.createElement(Icon, { name: "circle-mono", size: "md", className: styles.streaming }))), loadingState === LoadingState.Loading && onCancelQuery && /* @__PURE__ */ React__default.createElement(DelayRender, { delay: 2e3 }, /* @__PURE__ */ React__default.createElement(Tooltip, { content: "Cancel query" }, /* @__PURE__ */ React__default.createElement(
    TitleItem,
    {
      className: cx(dragClassCancel, styles.pointer),
      "data-testid": "panel-cancel-query",
      onClick: onCancelQuery
    },
    /* @__PURE__ */ React__default.createElement(Icon, { name: "sync-slash", size: "md" })
  ))), /* @__PURE__ */ React__default.createElement("div", { className: styles.rightAligned }, actions && /* @__PURE__ */ React__default.createElement("div", { className: styles.rightActions }, itemsRenderer(actions, (item) => item))));
  return (
    // tabIndex={0} is needed for keyboard accessibility in the plot area
    /* @__PURE__ */ React__default.createElement(
      "section",
      {
        className: cx(styles.container, { [styles.transparentContainer]: isPanelTransparent }),
        style: containerStyles,
        "data-testid": testid,
        tabIndex: 0,
        onFocus,
        onMouseMove,
        ref
      },
      /* @__PURE__ */ React__default.createElement("div", { className: styles.loadingBarContainer }, loadingState === LoadingState.Loading ? /* @__PURE__ */ React__default.createElement(LoadingBar, { width: loadingBarWidth, ariaLabel: "Panel loading bar" }) : null),
      hoverHeader && /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(
        HoverWidget,
        {
          menu,
          title: typeof title === "string" ? title : void 0,
          offset: hoverHeaderOffset,
          dragClass,
          onOpenMenu
        },
        headerContent
      ), statusMessage && /* @__PURE__ */ React__default.createElement("div", { className: styles.errorContainerFloating }, /* @__PURE__ */ React__default.createElement(PanelStatus, { message: statusMessage, onClick: statusMessageOnClick, ariaLabel: "Panel status" }))),
      hasHeader && /* @__PURE__ */ React__default.createElement("div", { className: cx(styles.headerContainer, dragClass), style: headerStyles, "data-testid": "header-container" }, statusMessage && /* @__PURE__ */ React__default.createElement("div", { className: dragClassCancel }, /* @__PURE__ */ React__default.createElement(PanelStatus, { message: statusMessage, onClick: statusMessageOnClick, ariaLabel: "Panel status" })), headerContent, menu && /* @__PURE__ */ React__default.createElement(
        PanelMenu,
        {
          menu,
          title: typeof title === "string" ? title : void 0,
          placement: "bottom-end",
          menuButtonClass: cx(styles.menuItem, dragClassCancel, showOnHoverClass),
          onOpenMenu
        }
      )),
      !collapsed && /* @__PURE__ */ React__default.createElement(
        "div",
        {
          id: panelContentId,
          "data-testid": selectors.components.Panels.Panel.content,
          className: cx(styles.content, height === void 0 && styles.containNone),
          style: contentStyle
        },
        typeof children === "function" ? children(innerWidth, innerHeight) : children
      )
    )
  );
}
const itemsRenderer = (items, renderer) => {
  const toRender = React__default.Children.toArray(items).filter(Boolean);
  return toRender.length > 0 ? renderer(toRender) : null;
};
const getHeaderHeight = (theme, hasHeader) => {
  if (hasHeader) {
    return theme.spacing.gridSize * theme.components.panel.headerHeight;
  }
  return 0;
};
const getContentStyle = (padding, theme, headerHeight, collapsed, height, width) => {
  const chromePadding = (padding === "md" ? theme.components.panel.padding : 0) * theme.spacing.gridSize;
  const panelPadding = chromePadding * 2;
  const panelBorder = 1 * 2;
  let innerWidth = 0;
  if (width) {
    innerWidth = width - panelPadding - panelBorder;
  }
  let innerHeight = 0;
  if (height) {
    innerHeight = height - headerHeight - panelPadding - panelBorder;
  }
  if (collapsed) {
    innerHeight = headerHeight;
  }
  const contentStyle = {
    padding: chromePadding
  };
  return { contentStyle, innerWidth, innerHeight };
};
const getStyles = (theme) => {
  const { background, borderColor, padding } = theme.components.panel;
  return {
    container: css({
      label: "panel-container",
      backgroundColor: background,
      border: `1px solid ${borderColor}`,
      position: "relative",
      borderRadius: theme.shape.radius.default,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      ".show-on-hover": {
        opacity: "0",
        visibility: "hidden"
      },
      "&:focus-visible, &:hover": {
        // only show menu icon on hover or focused panel
        ".show-on-hover": {
          opacity: "1",
          visibility: "visible"
        }
      },
      "&:focus-visible": getFocusStyles(theme),
      // The not:(:focus) clause is so that this rule is only applied when decendants are focused (important otherwise the hover header is visible when panel is clicked).
      "&:focus-within:not(:focus)": {
        ".show-on-hover": {
          visibility: "visible",
          opacity: "1"
        }
      }
    }),
    transparentContainer: css({
      label: "panel-transparent-container",
      backgroundColor: "transparent",
      border: "1px solid transparent",
      boxSizing: "border-box",
      "&:hover": {
        border: `1px solid ${borderColor}`
      }
    }),
    loadingBarContainer: css({
      label: "panel-loading-bar-container",
      position: "absolute",
      top: 0,
      width: "100%"
    }),
    containNone: css({
      contain: "none"
    }),
    content: css({
      label: "panel-content",
      flexGrow: 1,
      contain: "size layout"
    }),
    headerContainer: css({
      label: "panel-header",
      display: "flex",
      alignItems: "center"
    }),
    pointer: css({
      cursor: "pointer"
    }),
    streaming: css({
      label: "panel-streaming",
      marginRight: 0,
      color: theme.colors.success.text,
      "&:hover": {
        color: theme.colors.success.text
      }
    }),
    title: css({
      label: "panel-title",
      display: "flex",
      padding: theme.spacing(0, padding),
      minWidth: 0,
      "& > h2": {
        minWidth: 0
      }
    }),
    items: css({
      display: "flex"
    }),
    item: css({
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }),
    hiddenMenu: css({
      visibility: "hidden"
    }),
    menuItem: css({
      label: "panel-menu",
      border: "none",
      background: theme.colors.secondary.main,
      "&:hover": {
        background: theme.colors.secondary.shade
      }
    }),
    errorContainerFloating: css({
      label: "error-container",
      position: "absolute",
      left: 0,
      top: 0,
      zIndex: 1
    }),
    rightActions: css({
      display: "flex",
      padding: theme.spacing(0, padding),
      gap: theme.spacing(1)
    }),
    rightAligned: css({
      label: "right-aligned-container",
      marginLeft: "auto",
      display: "flex",
      alignItems: "center"
    }),
    titleItems: css({
      display: "flex",
      height: "100%"
    }),
    clearButtonStyles: css({
      alignItems: "center",
      display: "flex",
      gap: theme.spacing(0.5),
      background: "transparent",
      border: "none",
      padding: 0,
      maxWidth: "100%"
    })
  };
};

export { PanelChrome };
//# sourceMappingURL=PanelChrome.js.map
