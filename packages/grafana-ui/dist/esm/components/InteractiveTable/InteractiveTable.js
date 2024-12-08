import { cx, css } from '@emotion/css';
import { uniqueId } from 'lodash';
import React__default, { useMemo, useCallback, useEffect, Fragment } from 'react';
import { useTable, useSortBy, useExpanded, usePagination } from 'react-table';
import { isTruthy } from '@grafana/data';
import { useStyles2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';
import { Icon } from '../Icon/Icon.js';
import { Pagination } from '../Pagination/Pagination.js';
import { Tooltip } from '../Tooltip/Tooltip.js';
import { getColumns, EXPANDER_CELL_ID } from './utils.js';

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
const getStyles = (theme) => {
  const rowHoverBg = theme.colors.emphasize(theme.colors.background.primary, 0.03);
  return {
    container: css({
      display: "flex",
      gap: theme.spacing(2),
      flexDirection: "column",
      width: "100%",
      overflowX: "auto"
    }),
    cell: css({
      padding: theme.spacing(1),
      minWidth: theme.spacing(3)
    }),
    table: css({
      borderRadius: theme.shape.radius.default,
      width: "100%"
    }),
    disableGrow: css({
      width: 0
    }),
    header: css({
      borderBottom: `1px solid ${theme.colors.border.weak}`,
      minWidth: theme.spacing(3),
      "&, & > button": {
        position: "relative",
        whiteSpace: "nowrap",
        padding: theme.spacing(1)
      },
      "& > button": {
        "&:after": {
          content: '"\\00a0"'
        },
        width: "100%",
        height: "100%",
        background: "none",
        border: "none",
        paddingRight: theme.spacing(2.5),
        textAlign: "left",
        fontWeight: theme.typography.fontWeightMedium
      }
    }),
    row: css({
      label: "row",
      borderBottom: `1px solid ${theme.colors.border.weak}`,
      "&:hover": {
        backgroundColor: rowHoverBg
      },
      "&:last-child": {
        borderBottom: 0
      }
    }),
    expandedRow: css({
      label: "expanded-row-content",
      borderBottom: "none"
    }),
    expandedContentCell: css({
      borderBottom: `1px solid ${theme.colors.border.weak}`,
      position: "relative",
      padding: theme.spacing(2, 2, 2, 5),
      "&:before": {
        content: '""',
        position: "absolute",
        width: "1px",
        top: 0,
        left: "16px",
        bottom: theme.spacing(2),
        background: theme.colors.border.medium
      }
    }),
    expandedContentRow: css({
      label: "expanded-row-content"
    }),
    sortableHeader: css({
      /* increases selector's specificity so that it always takes precedence over default styles  */
      "&&": {
        padding: 0
      }
    })
  };
};
function InteractiveTable({
  className,
  columns,
  data,
  getRowId,
  headerTooltips,
  pageSize = 0,
  renderExpandedRow,
  showExpandAll = false,
  fetchData
}) {
  const styles = useStyles2(getStyles);
  const tableColumns = useMemo(() => {
    return getColumns(columns, showExpandAll);
  }, [columns, showExpandAll]);
  const id = useUniqueId();
  const getRowHTMLID = useCallback(
    (row) => {
      return `${id}-${row.id}`.replace(/\s/g, "");
    },
    [id]
  );
  const tableHooks = [useSortBy, useExpanded];
  const multiplePages = data.length > pageSize;
  const paginationEnabled = pageSize > 0;
  if (paginationEnabled) {
    tableHooks.push(usePagination);
  }
  const tableInstance = useTable(
    {
      columns: tableColumns,
      data,
      autoResetExpanded: false,
      autoResetSortBy: false,
      disableMultiSort: true,
      // If fetchData is provided, we disable client-side sorting
      manualSortBy: Boolean(fetchData),
      getRowId,
      initialState: {
        hiddenColumns: [
          !renderExpandedRow && EXPANDER_CELL_ID,
          ...tableColumns.filter((col) => !(col.visible ? col.visible(data) : true)).map((c) => c.id).filter(isTruthy)
        ].filter(isTruthy)
      }
    },
    ...tableHooks
  );
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow } = tableInstance;
  const { sortBy } = tableInstance.state;
  useEffect(() => {
    if (fetchData) {
      fetchData({ sortBy });
    }
  }, [sortBy, fetchData]);
  useEffect(() => {
    if (paginationEnabled) {
      tableInstance.setPageSize(pageSize);
    }
  }, [paginationEnabled, pageSize, tableInstance.setPageSize, tableInstance]);
  return /* @__PURE__ */ React__default.createElement("div", { className: styles.container }, /* @__PURE__ */ React__default.createElement("table", __spreadProps(__spreadValues({}, getTableProps()), { className: cx(styles.table, className) }), /* @__PURE__ */ React__default.createElement("thead", null, headerGroups.map((headerGroup) => {
    const _a = headerGroup.getHeaderGroupProps(), { key } = _a, headerRowProps = __objRest(_a, ["key"]);
    return /* @__PURE__ */ React__default.createElement("tr", __spreadValues({ key }, headerRowProps), headerGroup.headers.map((column) => {
      const _a2 = column.getHeaderProps(), { key: key2 } = _a2, headerCellProps = __objRest(_a2, ["key"]);
      const headerTooltip = headerTooltips == null ? void 0 : headerTooltips[column.id];
      return /* @__PURE__ */ React__default.createElement(
        "th",
        __spreadValues(__spreadValues({
          key: key2,
          className: cx(styles.header, {
            [styles.disableGrow]: column.width === 0,
            [styles.sortableHeader]: column.canSort
          })
        }, headerCellProps), column.isSorted && { "aria-sort": column.isSortedDesc ? "descending" : "ascending" }),
        /* @__PURE__ */ React__default.createElement(ColumnHeader, { column, headerTooltip })
      );
    }));
  })), /* @__PURE__ */ React__default.createElement("tbody", __spreadValues({}, getTableBodyProps()), (paginationEnabled ? tableInstance.page : tableInstance.rows).map((row) => {
    prepareRow(row);
    const _a = row.getRowProps(), { key } = _a, otherRowProps = __objRest(_a, ["key"]);
    const rowId = getRowHTMLID(row);
    const isExpanded = row.isExpanded;
    return /* @__PURE__ */ React__default.createElement(Fragment, { key }, /* @__PURE__ */ React__default.createElement("tr", __spreadProps(__spreadValues({}, otherRowProps), { className: cx(styles.row, isExpanded && styles.expandedRow) }), row.cells.map((cell) => {
      const _a2 = cell.getCellProps(), { key: key2 } = _a2, otherCellProps = __objRest(_a2, ["key"]);
      return /* @__PURE__ */ React__default.createElement("td", __spreadValues({ className: styles.cell, key: key2 }, otherCellProps), cell.render("Cell", { __rowID: rowId }));
    })), isExpanded && renderExpandedRow && /* @__PURE__ */ React__default.createElement("tr", __spreadProps(__spreadValues({}, otherRowProps), { id: rowId, className: styles.expandedContentRow }), /* @__PURE__ */ React__default.createElement("td", { className: styles.expandedContentCell, colSpan: row.cells.length }, renderExpandedRow(row.original))));
  }))), paginationEnabled && multiplePages && /* @__PURE__ */ React__default.createElement("span", null, /* @__PURE__ */ React__default.createElement(
    Pagination,
    {
      currentPage: tableInstance.state.pageIndex + 1,
      numberOfPages: tableInstance.pageOptions.length,
      onNavigate: (toPage) => tableInstance.gotoPage(toPage - 1)
    }
  )));
}
const useUniqueId = () => {
  return useMemo(() => uniqueId("InteractiveTable"), []);
};
const getColumnHeaderStyles = (theme) => ({
  sortIcon: css({
    position: "absolute",
    top: theme.spacing(1)
  }),
  headerTooltipIcon: css({
    marginLeft: theme.spacing(0.5)
  })
});
function ColumnHeader({
  column: { canSort, render, isSorted, isSortedDesc, getSortByToggleProps },
  headerTooltip
}) {
  const styles = useStyles2(getColumnHeaderStyles);
  const { onClick } = getSortByToggleProps();
  const children = /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, render("Header"), headerTooltip && /* @__PURE__ */ React__default.createElement(Tooltip, { theme: "info-alt", content: headerTooltip.content, placement: "top-end" }, /* @__PURE__ */ React__default.createElement(
    Icon,
    {
      className: styles.headerTooltipIcon,
      name: headerTooltip.iconName || "info-circle",
      "data-testid": "header-tooltip-icon"
    }
  )), isSorted && /* @__PURE__ */ React__default.createElement("span", { "aria-hidden": "true", className: styles.sortIcon }, /* @__PURE__ */ React__default.createElement(Icon, { name: isSortedDesc ? "angle-down" : "angle-up" })));
  if (canSort) {
    return /* @__PURE__ */ React__default.createElement("button", { type: "button", onClick }, children);
  }
  return children;
}

export { InteractiveTable };
//# sourceMappingURL=InteractiveTable.js.map
