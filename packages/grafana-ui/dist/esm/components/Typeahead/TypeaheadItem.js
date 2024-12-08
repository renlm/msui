import { cx, css } from '@emotion/css';
import React__default from 'react';
import Highlighter from 'react-highlight-words';
import { useStyles2 } from '../../themes/ThemeContext.js';
import { CompletionItemKind } from '../../types/completion.js';
import { PartialHighlighter } from './PartialHighlighter.js';

const getStyles = (theme) => ({
  typeaheadItem: css({
    border: "none",
    background: "none",
    textAlign: "left",
    label: "type-ahead-item",
    height: "auto",
    fontFamily: theme.typography.fontFamilyMonospace,
    padding: theme.spacing(1, 1, 1, 2),
    fontSize: theme.typography.bodySmall.fontSize,
    textOverflow: "ellipsis",
    overflow: "hidden",
    zIndex: 11,
    display: "block",
    whiteSpace: "nowrap",
    cursor: "pointer",
    [theme.transitions.handleMotion("no-preference", "reduce")]: {
      transition: "color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), border-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), background 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), padding 0.15s cubic-bezier(0.645, 0.045, 0.355, 1)"
    }
  }),
  typeaheadItemSelected: css({
    label: "type-ahead-item-selected",
    backgroundColor: theme.colors.background.secondary
  }),
  typeaheadItemMatch: css({
    label: "type-ahead-item-match",
    color: theme.v1.palette.yellow,
    borderBottom: `1px solid ${theme.v1.palette.yellow}`,
    padding: "inherit",
    background: "inherit"
  }),
  typeaheadItemGroupTitle: css({
    label: "type-ahead-item-group-title",
    color: theme.colors.text.secondary,
    fontSize: theme.typography.bodySmall.fontSize,
    lineHeight: theme.typography.body.lineHeight,
    padding: theme.spacing(1)
  })
});
const TypeaheadItem = (props) => {
  const styles = useStyles2(getStyles);
  const { isSelected, item, prefix, style, onMouseEnter, onMouseLeave, onClickItem } = props;
  const className = isSelected ? cx([styles.typeaheadItem, styles.typeaheadItemSelected]) : cx([styles.typeaheadItem]);
  const highlightClassName = cx([styles.typeaheadItemMatch]);
  const itemGroupTitleClassName = cx([styles.typeaheadItemGroupTitle]);
  const label = item.label || "";
  if (item.kind === CompletionItemKind.GroupTitle) {
    return /* @__PURE__ */ React__default.createElement("li", { className: itemGroupTitleClassName, style }, /* @__PURE__ */ React__default.createElement("span", null, label));
  }
  return /* @__PURE__ */ React__default.createElement("li", { role: "none" }, /* @__PURE__ */ React__default.createElement(
    "button",
    {
      role: "menuitem",
      className,
      style,
      onMouseDown: onClickItem,
      onMouseEnter,
      onMouseLeave,
      type: "button"
    },
    item.highlightParts !== void 0 ? /* @__PURE__ */ React__default.createElement(
      PartialHighlighter,
      {
        text: label,
        highlightClassName,
        highlightParts: item.highlightParts
      }
    ) : /* @__PURE__ */ React__default.createElement(
      Highlighter,
      {
        textToHighlight: label,
        searchWords: [prefix != null ? prefix : ""],
        autoEscape: true,
        highlightClassName
      }
    )
  ));
};

export { TypeaheadItem };
//# sourceMappingURL=TypeaheadItem.js.map
