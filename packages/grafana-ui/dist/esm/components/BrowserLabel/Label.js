import { cx, css } from '@emotion/css';
import React__default, { forwardRef, useCallback } from 'react';
import Highlighter from 'react-highlight-words';
import '@grafana/data';
import { useTheme2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';
import { PartialHighlighter } from '../Typeahead/PartialHighlighter.js';

var __defProp = Object.defineProperty;
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
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const Label = forwardRef(
  (_a, ref) => {
    var _b = _a, {
      name,
      value,
      hidden,
      facets,
      onClick,
      className,
      loading,
      searchTerm,
      active,
      style,
      title,
      highlightParts
    } = _b, rest = __objRest(_b, [
      "name",
      "value",
      "hidden",
      "facets",
      "onClick",
      "className",
      "loading",
      "searchTerm",
      "active",
      "style",
      "title",
      "highlightParts"
    ]);
    const theme = useTheme2();
    const styles = getLabelStyles(theme);
    const searchWords = searchTerm ? [searchTerm] : [];
    const onLabelClick = useCallback(
      (event) => {
        if (onClick && !hidden) {
          onClick(name, value, event);
        }
      },
      [onClick, name, hidden, value]
    );
    let text = value || name;
    if (facets) {
      text = `${text} (${facets})`;
    }
    return /* @__PURE__ */ React__default.createElement(
      "button",
      __spreadValues({
        key: text,
        ref,
        onClick: onLabelClick,
        style,
        title: title || text,
        type: "button",
        role: "option",
        "aria-selected": !!active,
        className: cx(
          styles.base,
          active && styles.active,
          loading && styles.loading,
          hidden && styles.hidden,
          className,
          onClick && !hidden && styles.hover
        )
      }, rest),
      highlightParts !== void 0 ? /* @__PURE__ */ React__default.createElement(PartialHighlighter, { text, highlightClassName: styles.matchHighLight, highlightParts }) : /* @__PURE__ */ React__default.createElement(
        Highlighter,
        {
          textToHighlight: text,
          searchWords,
          autoEscape: true,
          highlightClassName: styles.matchHighLight
        }
      )
    );
  }
);
Label.displayName = "Label";
const getLabelStyles = (theme) => ({
  base: css({
    display: "inline-block",
    cursor: "pointer",
    fontSize: theme.typography.size.sm,
    lineHeight: theme.typography.bodySmall.lineHeight,
    backgroundColor: theme.colors.background.secondary,
    color: theme.colors.text.primary,
    whiteSpace: "nowrap",
    textShadow: "none",
    padding: theme.spacing(0.5),
    borderRadius: theme.shape.radius.default,
    border: "none",
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(0.5)
  }),
  loading: css({
    fontWeight: theme.typography.fontWeightMedium,
    backgroundColor: theme.colors.primary.shade,
    color: theme.colors.text.primary,
    [theme.transitions.handleMotion("no-preference", "reduce")]: {
      animation: "pulse 3s ease-out 0s infinite normal forwards"
    },
    "@keyframes pulse": {
      "0%": {
        color: theme.colors.text.primary
      },
      "50%": {
        color: theme.colors.text.secondary
      },
      "100%": {
        color: theme.colors.text.disabled
      }
    }
  }),
  active: css({
    fontWeight: theme.typography.fontWeightMedium,
    backgroundColor: theme.colors.primary.main,
    color: theme.colors.primary.contrastText
  }),
  matchHighLight: css({
    background: "inherit",
    color: theme.components.textHighlight.text,
    backgroundColor: theme.components.textHighlight.background
  }),
  hidden: css({
    opacity: 0.6,
    cursor: "default",
    border: "1px solid transparent"
  }),
  hover: css({
    ["&:hover"]: {
      opacity: 0.85,
      cursor: "pointer"
    }
  })
});

export { Label };
//# sourceMappingURL=Label.js.map
