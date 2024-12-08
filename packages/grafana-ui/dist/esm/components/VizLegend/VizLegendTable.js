import { cx, css } from '@emotion/css';
import React__default from 'react';
import { useStyles2 } from '../../themes/ThemeContext.js';
import { Icon } from '../Icon/Icon.js';
import { LegendTableItem } from './VizLegendTableItem.js';

const nameSortKey = "Name";
const naturalCompare = new Intl.Collator(void 0, { numeric: true, sensitivity: "base" }).compare;
const VizLegendTable = ({
  items,
  sortBy: sortKey,
  sortDesc,
  itemRenderer,
  className,
  onToggleSort,
  onLabelClick,
  onLabelMouseOver,
  onLabelMouseOut,
  readonly,
  isSortable
}) => {
  var _a, _b;
  const styles = useStyles2(getStyles);
  const header = {};
  if (isSortable) {
    header[nameSortKey] = "";
  }
  for (const item of items) {
    if (item.getDisplayValues) {
      for (const displayValue of item.getDisplayValues()) {
        header[(_a = displayValue.title) != null ? _a : "?"] = (_b = displayValue.description) != null ? _b : "";
      }
    }
  }
  if (sortKey != null) {
    let itemVals = /* @__PURE__ */ new Map();
    items.forEach((item) => {
      if (sortKey !== nameSortKey && item.getDisplayValues) {
        const stat = item.getDisplayValues().find((stat2) => stat2.title === sortKey);
        const val = stat == null || Number.isNaN(stat.numeric) ? -Infinity : stat.numeric;
        itemVals.set(item, val);
      }
    });
    let sortMult = sortDesc ? -1 : 1;
    if (sortKey === nameSortKey) {
      items.sort((a, b) => {
        return sortMult * naturalCompare(a.label, b.label);
      });
    } else {
      items.sort((a, b) => {
        var _a2, _b2;
        const aVal = (_a2 = itemVals.get(a)) != null ? _a2 : 0;
        const bVal = (_b2 = itemVals.get(b)) != null ? _b2 : 0;
        return sortMult * (aVal - bVal);
      });
    }
  }
  if (!itemRenderer) {
    itemRenderer = (item, index) => /* @__PURE__ */ React__default.createElement(
      LegendTableItem,
      {
        key: `${item.label}-${index}`,
        item,
        onLabelClick,
        onLabelMouseOver,
        onLabelMouseOut,
        readonly
      }
    );
  }
  return /* @__PURE__ */ React__default.createElement("table", { className: cx(styles.table, className) }, /* @__PURE__ */ React__default.createElement("thead", null, /* @__PURE__ */ React__default.createElement("tr", null, !isSortable && /* @__PURE__ */ React__default.createElement("th", null), Object.keys(header).map((columnTitle) => /* @__PURE__ */ React__default.createElement(
    "th",
    {
      title: header[columnTitle],
      key: columnTitle,
      className: cx(styles.header, onToggleSort && styles.headerSortable, isSortable && styles.nameHeader, {
        [styles.withIcon]: sortKey === columnTitle
      }),
      onClick: () => {
        if (onToggleSort) {
          onToggleSort(columnTitle);
        }
      }
    },
    columnTitle,
    sortKey === columnTitle && /* @__PURE__ */ React__default.createElement(Icon, { size: "xs", name: sortDesc ? "angle-down" : "angle-up" })
  )))), /* @__PURE__ */ React__default.createElement("tbody", null, items.map(itemRenderer)));
};
const getStyles = (theme) => ({
  table: css({
    width: "100%",
    "th:first-child": {
      width: "100%",
      borderBottom: `1px solid ${theme.colors.border.weak}`
    }
  }),
  header: css({
    color: theme.colors.primary.text,
    fontWeight: theme.typography.fontWeightMedium,
    borderBottom: `1px solid ${theme.colors.border.weak}`,
    padding: theme.spacing(0.25, 1, 0.25, 1),
    fontSize: theme.typography.bodySmall.fontSize,
    textAlign: "right",
    whiteSpace: "nowrap"
  }),
  nameHeader: css({
    textAlign: "left",
    paddingLeft: "30px"
  }),
  // This needs to be padding-right - icon size(xs==12) to avoid jumping
  withIcon: css({
    paddingRight: "4px"
  }),
  headerSortable: css({
    cursor: "pointer"
  })
});

export { VizLegendTable };
//# sourceMappingURL=VizLegendTable.js.map
