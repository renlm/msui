import React__default, { memo, useRef, useState, useMemo, useEffect, useCallback } from 'react';
import { useTable, useFilters, useSortBy, useAbsoluteLayout, useResizeColumns, useExpanded, usePagination } from 'react-table';
import { ReducerID, FieldType, getRowUniqueId } from '@grafana/data';
import { selectors } from '@grafana/e2e-selectors';
import { TableCellHeight } from '@grafana/schema';
import { useTheme2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';
import { CustomScrollbar } from '../CustomScrollbar/CustomScrollbar.js';
import { Pagination } from '../Pagination/Pagination.js';
import { FooterRow } from './FooterRow.js';
import { HeaderRow } from './HeaderRow.js';
import { RowsList } from './RowsList.js';
import { useResetVariableListSizeCache, useFixScrollbarContainer } from './hooks.js';
import { useTableStateReducer, getInitialState } from './reducer.js';
import { useTableStyles } from './styles.js';
import { getColumns, sortNumber, sortCaseInsensitive, getFooterItems, createFooterCalculationValues, guessLongestField } from './utils.js';

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
const COLUMN_MIN_WIDTH = 150;
const FOOTER_ROW_HEIGHT = 36;
const NO_DATA_TEXT = "No data";
const Table = memo((props) => {
  var _a, _b, _c, _d;
  const {
    ariaLabel,
    data,
    height,
    onCellFilterAdded,
    width,
    columnMinWidth = COLUMN_MIN_WIDTH,
    noHeader,
    resizable = true,
    initialSortBy,
    footerOptions,
    showTypeIcons,
    footerValues,
    enablePagination,
    cellHeight = TableCellHeight.Sm,
    timeRange,
    enableSharedCrosshair = false,
    initialRowIndex = void 0,
    fieldConfig
  } = props;
  const listRef = useRef(null);
  const tableDivRef = useRef(null);
  const variableSizeListScrollbarRef = useRef(null);
  const theme = useTheme2();
  const tableStyles = useTableStyles(theme, cellHeight);
  const headerHeight = noHeader ? 0 : tableStyles.rowHeight;
  const [footerItems, setFooterItems] = useState(footerValues);
  const noValuesDisplayText = (_b = (_a = fieldConfig == null ? void 0 : fieldConfig.defaults) == null ? void 0 : _a.noValue) != null ? _b : NO_DATA_TEXT;
  const footerHeight = useMemo(() => {
    const EXTENDED_ROW_HEIGHT = FOOTER_ROW_HEIGHT;
    let length = 0;
    if (!footerItems) {
      return 0;
    }
    for (const fv of footerItems) {
      if (Array.isArray(fv) && fv.length > length) {
        length = fv.length;
      }
    }
    if (length > 1) {
      return EXTENDED_ROW_HEIGHT * length;
    }
    return EXTENDED_ROW_HEIGHT;
  }, [footerItems]);
  const memoizedData = useMemo(() => {
    if (!data.fields.length) {
      return [];
    }
    return Array(data.length).fill(0);
  }, [data]);
  const isCountRowsSet = Boolean(
    (footerOptions == null ? void 0 : footerOptions.countRows) && footerOptions.reducer && footerOptions.reducer.length && footerOptions.reducer[0] === ReducerID.count
  );
  const nestedDataField = data.fields.find((f) => f.type === FieldType.nestedFrames);
  const hasNestedData = nestedDataField !== void 0;
  const memoizedColumns = useMemo(
    () => getColumns(data, width, columnMinWidth, hasNestedData, footerItems, isCountRowsSet),
    [data, width, columnMinWidth, footerItems, hasNestedData, isCountRowsSet]
  );
  const toggleAllRowsExpandedRef = useRef();
  const stateReducer = useTableStateReducer(__spreadProps(__spreadValues({}, props), {
    onSortByChange: (state2) => {
      toggleAllRowsExpandedRef.current(false);
      if (props.onSortByChange) {
        props.onSortByChange(state2);
      }
    }
  }));
  const hasUniqueId = !!((_d = (_c = data.meta) == null ? void 0 : _c.uniqueRowIdFields) == null ? void 0 : _d.length);
  const options = useMemo(() => {
    const options2 = {
      columns: memoizedColumns,
      data: memoizedData,
      disableResizing: !resizable,
      stateReducer,
      autoResetPage: false,
      initialState: getInitialState(initialSortBy, memoizedColumns),
      autoResetFilters: false,
      sortTypes: {
        // the builtin number type on react-table does not handle NaN values
        number: sortNumber,
        // should be replaced with the builtin string when react-table is upgraded,
        // see https://github.com/tannerlinsley/react-table/pull/3235
        "alphanumeric-insensitive": sortCaseInsensitive
      }
    };
    if (hasUniqueId) {
      options2.getRowId = (row, relativeIndex) => getRowUniqueId(data, relativeIndex);
      options2.autoResetExpanded = false;
    }
    return options2;
  }, [initialSortBy, memoizedColumns, memoizedData, resizable, stateReducer, hasUniqueId, data]);
  const {
    getTableProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    totalColumnsWidth,
    page,
    state,
    gotoPage,
    setPageSize,
    pageOptions,
    toggleAllRowsExpanded
  } = useTable(options, useFilters, useSortBy, useAbsoluteLayout, useResizeColumns, useExpanded, usePagination);
  const extendedState = state;
  toggleAllRowsExpandedRef.current = toggleAllRowsExpanded;
  useEffect(() => {
    if (!footerOptions) {
      setFooterItems(footerValues);
    }
  }, [footerValues, footerOptions]);
  useEffect(() => {
    var _a2, _b2, _c2;
    if (!footerOptions) {
      return;
    }
    if (!footerOptions.show) {
      setFooterItems(void 0);
      return;
    }
    if (isCountRowsSet) {
      const footerItemsCountRows = [];
      footerItemsCountRows[0] = (_c2 = (_b2 = (_a2 = headerGroups[0]) == null ? void 0 : _a2.headers[0]) == null ? void 0 : _b2.filteredRows.length.toString()) != null ? _c2 : data.length.toString();
      setFooterItems(footerItemsCountRows);
      return;
    }
    const footerItems2 = getFooterItems(
      headerGroups[0].headers,
      createFooterCalculationValues(rows),
      footerOptions,
      theme
    );
    setFooterItems(footerItems2);
  }, [footerOptions, theme, state.filters, data]);
  let listHeight = height - (headerHeight + footerHeight);
  if (enablePagination) {
    listHeight -= tableStyles.cellHeight;
  }
  const pageSize = Math.round(listHeight / tableStyles.rowHeight) - 1;
  useEffect(() => {
    if (pageSize <= 0) {
      return;
    }
    setPageSize(pageSize);
  }, [pageSize, setPageSize]);
  useEffect(() => {
    if (data.length / pageSize < state.pageIndex) {
      gotoPage(0);
    }
  }, [data]);
  useResetVariableListSizeCache(extendedState, listRef, data, hasUniqueId);
  useFixScrollbarContainer(variableSizeListScrollbarRef, tableDivRef);
  const onNavigate = useCallback(
    (toPage) => {
      gotoPage(toPage - 1);
    },
    [gotoPage]
  );
  const itemCount = enablePagination ? page.length : rows.length;
  let paginationEl = null;
  if (enablePagination) {
    const itemsRangeStart = state.pageIndex * state.pageSize + 1;
    let itemsRangeEnd = itemsRangeStart + state.pageSize - 1;
    const isSmall = width < 550;
    if (itemsRangeEnd > data.length) {
      itemsRangeEnd = data.length;
    }
    paginationEl = /* @__PURE__ */ React__default.createElement("div", { className: tableStyles.paginationWrapper }, /* @__PURE__ */ React__default.createElement(
      Pagination,
      {
        currentPage: state.pageIndex + 1,
        numberOfPages: pageOptions.length,
        showSmallVersion: isSmall,
        onNavigate
      }
    ), isSmall ? null : /* @__PURE__ */ React__default.createElement("div", { className: tableStyles.paginationSummary }, itemsRangeStart, " - ", itemsRangeEnd, " of ", data.length, " rows"));
  }
  const longestField = guessLongestField(fieldConfig, data);
  return /* @__PURE__ */ React__default.createElement(
    "div",
    __spreadProps(__spreadValues({}, getTableProps()), {
      className: tableStyles.table,
      "aria-label": ariaLabel,
      role: "table",
      ref: tableDivRef,
      style: { width, height }
    }),
    /* @__PURE__ */ React__default.createElement(CustomScrollbar, { hideVerticalTrack: true }, /* @__PURE__ */ React__default.createElement("div", { className: tableStyles.tableContentWrapper(totalColumnsWidth) }, !noHeader && /* @__PURE__ */ React__default.createElement(HeaderRow, { headerGroups, showTypeIcons, tableStyles }), itemCount > 0 ? /* @__PURE__ */ React__default.createElement("div", { "data-testid": selectors.components.Panels.Visualization.Table.body, ref: variableSizeListScrollbarRef }, /* @__PURE__ */ React__default.createElement(
      RowsList,
      {
        headerGroups,
        data,
        rows,
        width,
        cellHeight,
        headerHeight,
        rowHeight: tableStyles.rowHeight,
        itemCount,
        pageIndex: state.pageIndex,
        listHeight,
        listRef,
        tableState: state,
        prepareRow,
        timeRange,
        onCellFilterAdded,
        nestedDataField,
        tableStyles,
        footerPaginationEnabled: Boolean(enablePagination),
        enableSharedCrosshair,
        initialRowIndex,
        longestField
      }
    )) : /* @__PURE__ */ React__default.createElement("div", { style: { height: height - headerHeight, width }, className: tableStyles.noData }, noValuesDisplayText), footerItems && /* @__PURE__ */ React__default.createElement(
      FooterRow,
      {
        isPaginationVisible: Boolean(enablePagination),
        footerValues: footerItems,
        footerGroups,
        totalColumnsWidth,
        tableStyles
      }
    ))),
    paginationEl
  );
});
Table.displayName = "Table";

export { Table };
//# sourceMappingURL=Table.js.map
