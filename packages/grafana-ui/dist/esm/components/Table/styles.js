import { css } from '@emotion/css';

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
function useTableStyles(theme, cellHeightOption) {
  const borderColor = theme.colors.border.weak;
  const resizerColor = theme.colors.primary.border;
  const cellPadding = 6;
  const cellHeight = getCellHeight(theme, cellHeightOption, cellPadding);
  const rowHeight = cellHeight + 2;
  const headerHeight = 28;
  const buildCellContainerStyle = (color, background, backgroundHover, overflowOnHover, asCellText, textShouldWrap, textWrapped, rowStyled) => {
    return css(__spreadProps(__spreadValues({
      label: overflowOnHover ? "cellContainerOverflow" : "cellContainerNoOverflow",
      padding: `${cellPadding}px`,
      width: "100%",
      // Cell height need to account for row border
      height: `${rowHeight - 1}px`,
      wordBreak: textWrapped ? "break-all" : "inherit",
      display: "flex"
    }, asCellText ? {
      overflow: "hidden",
      textOverflow: "ellipsis",
      userSelect: "text",
      whiteSpace: "nowrap"
    } : {}), {
      alignItems: "center",
      borderRight: `1px solid ${borderColor}`,
      color: rowStyled ? "inherit" : color != null ? color : void 0,
      background: rowStyled ? void 0 : background != null ? background : void 0,
      backgroundClip: "padding-box",
      "&:last-child:not(:only-child)": {
        borderRight: "none"
      },
      "&:hover": {
        overflow: overflowOnHover && !textWrapped ? "visible" : void 0,
        width: textShouldWrap || !overflowOnHover ? "auto" : "auto !important",
        height: (textShouldWrap || overflowOnHover) && !textWrapped ? "auto !important" : `${rowHeight - 1}px`,
        minHeight: `${rowHeight - 1}px`,
        wordBreak: textShouldWrap ? "break-word" : void 0,
        whiteSpace: textShouldWrap && overflowOnHover ? "normal" : "nowrap",
        boxShadow: overflowOnHover ? `0 0 2px ${theme.colors.primary.main}` : void 0,
        background: rowStyled ? "inherit" : backgroundHover != null ? backgroundHover : theme.colors.background.primary,
        zIndex: 1,
        ".cellActions": {
          color: "#FFF",
          visibility: "visible",
          opacity: 1,
          width: "auto",
          background: "rgba(0, 0, 0, 0.6)"
        }
      },
      a: {
        color: "inherit"
      },
      ".cellActions": {
        display: "flex",
        position: overflowOnHover ? void 0 : "absolute",
        top: overflowOnHover ? void 0 : "1px",
        right: overflowOnHover ? void 0 : 0,
        margin: overflowOnHover ? theme.spacing(0, -0.5, 0, 0.5) : "auto",
        visibility: "hidden",
        opacity: 0,
        width: 0,
        alignItems: "center",
        height: "100%",
        padding: theme.spacing(1, 0.5, 1, 1),
        background: background ? "none" : "rgba(0, 0, 0, 0.5)",
        svg: {
          color
        }
      },
      ".cellActionsLeft": {
        right: "auto !important",
        left: 0
      },
      ".cellActionsTransparent": {
        background: "none"
      }
    }));
  };
  return {
    theme,
    cellHeight,
    buildCellContainerStyle,
    cellPadding,
    cellHeightInner: cellHeight - cellPadding * 2,
    rowHeight,
    table: css({
      height: "100%",
      width: "100%",
      overflow: "auto",
      display: "flex",
      flexDirection: "column"
    }),
    thead: css({
      label: "thead",
      height: `${headerHeight}px`,
      overflowY: "auto",
      overflowX: "hidden",
      position: "relative"
    }),
    tfoot: css({
      label: "tfoot",
      height: `${headerHeight}px`,
      borderTop: `1px solid ${borderColor}`,
      overflowY: "auto",
      overflowX: "hidden",
      position: "relative"
    }),
    headerRow: css({
      label: "row",
      borderBottom: `1px solid ${borderColor}`
    }),
    headerCell: css({
      height: "100%",
      padding: `0 ${cellPadding}px`,
      overflow: "hidden",
      whiteSpace: "nowrap",
      display: "flex",
      alignItems: "center",
      fontWeight: theme.typography.fontWeightMedium,
      "&:last-child": {
        borderRight: "none"
      }
    }),
    headerCellLabel: css({
      border: "none",
      padding: 0,
      background: "inherit",
      cursor: "pointer",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      fontWeight: theme.typography.fontWeightMedium,
      display: "flex",
      alignItems: "center",
      marginRight: theme.spacing(0.5),
      "&:hover": {
        textDecoration: "underline",
        color: theme.colors.text.link
      }
    }),
    cellContainerText: buildCellContainerStyle(void 0, void 0, void 0, true, true),
    cellContainerTextNoOverflow: buildCellContainerStyle(void 0, void 0, void 0, false, true),
    cellContainer: buildCellContainerStyle(void 0, void 0, void 0, true, false),
    cellContainerNoOverflow: buildCellContainerStyle(void 0, void 0, void 0, false, false),
    cellText: css({
      overflow: "hidden",
      textOverflow: "ellipsis",
      userSelect: "text",
      whiteSpace: "nowrap"
    }),
    sortIcon: css({
      marginLeft: theme.spacing(0.5)
    }),
    cellLink: css({
      cursor: "pointer",
      overflow: "hidden",
      textOverflow: "ellipsis",
      userSelect: "text",
      whiteSpace: "nowrap",
      color: theme.colors.text.link,
      fontWeight: theme.typography.fontWeightMedium,
      paddingRight: theme.spacing(1.5),
      "&:hover": {
        textDecoration: "underline",
        color: theme.colors.text.link
      }
    }),
    cellLinkForColoredCell: css({
      cursor: "pointer",
      overflow: "hidden",
      textOverflow: "ellipsis",
      userSelect: "text",
      whiteSpace: "nowrap",
      fontWeight: theme.typography.fontWeightMedium,
      textDecoration: "underline"
    }),
    imageCellLink: css({
      cursor: "pointer",
      overflow: "hidden",
      height: "100%"
    }),
    headerFilter: css({
      background: "transparent",
      border: "none",
      label: "headerFilter",
      padding: 0
    }),
    paginationWrapper: css({
      display: "flex",
      height: `${cellHeight}px`,
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      li: {
        marginBottom: 0
      }
    }),
    paginationSummary: css({
      color: theme.colors.text.secondary,
      fontSize: theme.typography.bodySmall.fontSize,
      display: "flex",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1, 0, 2)
    }),
    tableContentWrapper: (totalColumnsWidth) => {
      const width = totalColumnsWidth !== void 0 ? `${totalColumnsWidth}px` : "100%";
      return css({
        label: "tableContentWrapper",
        width,
        display: "flex",
        flexDirection: "column"
      });
    },
    row: css({
      label: "row",
      borderBottom: `1px solid ${borderColor}`,
      "&:hover": {
        backgroundColor: theme.components.table.rowHoverBackground
      },
      "&:last-child": {
        borderBottom: 0
      }
    }),
    imageCell: css({
      height: "100%"
    }),
    resizeHandle: css({
      label: "resizeHandle",
      cursor: "col-resize !important",
      display: "inline-block",
      background: resizerColor,
      opacity: 0,
      [theme.transitions.handleMotion("no-preference", "reduce")]: {
        transition: "opacity 0.2s ease-in-out"
      },
      width: "8px",
      height: "100%",
      position: "absolute",
      right: "-4px",
      borderRadius: theme.shape.radius.default,
      top: 0,
      touchAction: "none",
      "&:hover": {
        opacity: 1
      }
    }),
    typeIcon: css({
      marginRight: theme.spacing(1),
      color: theme.colors.text.secondary
    }),
    noData: css({
      alignItems: "center",
      display: "flex",
      height: "100%",
      justifyContent: "center",
      width: "100%"
    }),
    expanderCell: css({
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      height: `${rowHeight}px`,
      cursor: "pointer"
    })
  };
}
function getCellHeight(theme, cellHeightOption, cellPadding) {
  const bodyFontSize = theme.typography.fontSize;
  const lineHeight = theme.typography.body.lineHeight;
  switch (cellHeightOption) {
    case "md":
      return 42;
    case "lg":
      return 48;
    case "sm":
    default:
      return cellPadding * 2 + bodyFontSize * lineHeight;
  }
}

export { useTableStyles };
//# sourceMappingURL=styles.js.map
