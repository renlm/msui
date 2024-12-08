import { css, cx } from '@emotion/css';
import React__default, { useState, useMemo, useCallback, useEffect } from 'react';
import { VariableSizeList } from 'react-window';
import { Subscription, debounceTime } from 'rxjs';
import { FieldType, hasTimeField, DataHoverEvent, DataHoverClearEvent } from '@grafana/data';
import { TableCellHeight, TableCellDisplayMode } from '@grafana/schema';
import { useTheme2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';
import { CustomScrollbar } from '../CustomScrollbar/CustomScrollbar.js';
import '../PanelChrome/index.js';
import { ExpandedRow, getExpandedRowHeight } from './ExpandedRow.js';
import { TableCell } from './TableCell.js';
import { calculateAroundPointThreshold, isPointTimeValAroundTableTimeVal, guessTextBoundingBox, getCellColors } from './utils.js';
import { usePanelContext } from '../PanelChrome/PanelContext.js';

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
const RowsList = (props) => {
  const {
    data,
    rows,
    headerHeight,
    footerPaginationEnabled,
    rowHeight,
    itemCount,
    pageIndex,
    tableState,
    prepareRow,
    onCellFilterAdded,
    width,
    cellHeight = TableCellHeight.Sm,
    timeRange,
    tableStyles,
    nestedDataField,
    listHeight,
    listRef,
    enableSharedCrosshair = false,
    initialRowIndex = void 0,
    headerGroups,
    longestField
  } = props;
  const [rowHighlightIndex, setRowHighlightIndex] = useState(initialRowIndex);
  if (initialRowIndex === void 0 && rowHighlightIndex !== void 0) {
    setRowHighlightIndex(void 0);
  }
  const theme = useTheme2();
  const panelContext = usePanelContext();
  let osContext = null;
  if (window.OffscreenCanvas !== void 0) {
    osContext = new OffscreenCanvas(256, 1024).getContext("2d");
  }
  if (osContext !== void 0 && osContext !== null) {
    osContext.font = `${theme.typography.fontSize}px ${theme.typography.body.fontFamily}`;
  }
  const threshold = useMemo(() => {
    const timeField = data.fields.find((f) => f.type === FieldType.time);
    if (!timeField) {
      return 0;
    }
    return calculateAroundPointThreshold(timeField);
  }, [data]);
  const onRowHover = useCallback(
    (idx, frame) => {
      if (!panelContext || !enableSharedCrosshair || !hasTimeField(frame)) {
        return;
      }
      const timeField = frame.fields.find((f) => f.type === FieldType.time);
      panelContext.eventBus.publish(
        new DataHoverEvent({
          point: {
            time: timeField.values[idx]
          }
        })
      );
    },
    [enableSharedCrosshair, panelContext]
  );
  const onRowLeave = useCallback(() => {
    if (!panelContext || !enableSharedCrosshair) {
      return;
    }
    panelContext.eventBus.publish(new DataHoverClearEvent());
  }, [enableSharedCrosshair, panelContext]);
  const onDataHoverEvent = useCallback(
    (evt) => {
      var _a;
      if (((_a = evt.payload.point) == null ? void 0 : _a.time) && evt.payload.rowIndex !== void 0) {
        const timeField = data.fields.find((f) => f.type === FieldType.time);
        const time = timeField.values[evt.payload.rowIndex];
        const pointTime = evt.payload.point.time;
        if (isPointTimeValAroundTableTimeVal(pointTime, time, threshold)) {
          setRowHighlightIndex(evt.payload.rowIndex);
          return;
        }
        const matchedRowIndex = timeField.values.findIndex(
          (t) => isPointTimeValAroundTableTimeVal(pointTime, t, threshold)
        );
        if (matchedRowIndex !== -1) {
          setRowHighlightIndex(matchedRowIndex);
          return;
        }
        setRowHighlightIndex(void 0);
      }
    },
    [data.fields, threshold]
  );
  useEffect(() => {
    if (!panelContext || !enableSharedCrosshair || !hasTimeField(data) || footerPaginationEnabled) {
      return;
    }
    const subs = new Subscription();
    subs.add(
      panelContext.eventBus.getStream(DataHoverEvent).pipe(debounceTime(250)).subscribe({
        next: (evt) => {
          if (panelContext.eventBus === evt.origin) {
            return;
          }
          onDataHoverEvent(evt);
        }
      })
    );
    subs.add(
      panelContext.eventBus.getStream(DataHoverClearEvent).pipe(debounceTime(250)).subscribe({
        next: (evt) => {
          if (panelContext.eventBus === evt.origin) {
            return;
          }
          setRowHighlightIndex(void 0);
        }
      })
    );
    return () => {
      subs.unsubscribe();
    };
  }, [data, enableSharedCrosshair, footerPaginationEnabled, onDataHoverEvent, panelContext]);
  let scrollTop = void 0;
  if (rowHighlightIndex !== void 0) {
    const firstMatchedRowIndex = rows.findIndex((row) => row.index === rowHighlightIndex);
    if (firstMatchedRowIndex !== -1) {
      scrollTop = headerHeight + (firstMatchedRowIndex - 1) * rowHeight;
    }
  }
  const rowIndexForPagination = useCallback(
    (index) => {
      return tableState.pageIndex * tableState.pageSize + index;
    },
    [tableState.pageIndex, tableState.pageSize]
  );
  let rowBg = void 0;
  let textWrapField = void 0;
  for (const field of data.fields) {
    const fieldOptions = field.config.custom;
    const cellOptionsExist = fieldOptions !== void 0 && fieldOptions.cellOptions !== void 0;
    if (cellOptionsExist && fieldOptions.cellOptions.type === TableCellDisplayMode.ColorBackground && fieldOptions.cellOptions.applyToRow) {
      rowBg = (rowIndex) => {
        const display = field.display(field.values.get(rowIndex));
        const colors = getCellColors(tableStyles, fieldOptions.cellOptions, display);
        return colors;
      };
    }
    if (cellOptionsExist && (fieldOptions.cellOptions.type === TableCellDisplayMode.Auto || fieldOptions.cellOptions.type === TableCellDisplayMode.ColorBackground || fieldOptions.cellOptions.type === TableCellDisplayMode.ColorText) && fieldOptions.cellOptions.wrapText) {
      textWrapField = field;
    } else if (longestField !== void 0) {
      textWrapField = longestField;
    }
  }
  const RenderRow = useCallback(
    ({ index, style, rowHighlightIndex: rowHighlightIndex2 }) => {
      const indexForPagination = rowIndexForPagination(index);
      const row = rows[indexForPagination];
      let additionalProps = {};
      prepareRow(row);
      const expandedRowStyle = tableState.expanded[row.id] ? css({ "&:hover": { background: "inherit" } }) : {};
      if (rowHighlightIndex2 !== void 0 && row.index === rowHighlightIndex2) {
        style = __spreadProps(__spreadValues({}, style), { backgroundColor: theme.components.table.rowHoverBackground });
        additionalProps = {
          "aria-selected": "true"
        };
      }
      if (rowBg) {
        const { bgColor, textColor } = rowBg(row.index);
        style.background = bgColor;
        style.color = textColor;
      }
      if (textWrapField) {
        const seriesIndex = data.fields.findIndex((field) => field.name === textWrapField.name);
        const pxLineHeight = theme.typography.body.lineHeight * theme.typography.fontSize;
        const bbox = guessTextBoundingBox(
          textWrapField.values[index],
          headerGroups[0].headers[seriesIndex],
          osContext,
          pxLineHeight,
          tableStyles.rowHeight
        );
        style.height = bbox.height;
      }
      return /* @__PURE__ */ React__default.createElement(
        "div",
        __spreadProps(__spreadValues({}, row.getRowProps(__spreadValues({ style }, additionalProps))), {
          className: cx(tableStyles.row, expandedRowStyle),
          onMouseEnter: () => onRowHover(index, data),
          onMouseLeave: onRowLeave
        }),
        nestedDataField && tableState.expanded[row.id] && /* @__PURE__ */ React__default.createElement(
          ExpandedRow,
          {
            nestedData: nestedDataField,
            tableStyles,
            rowIndex: row.index,
            width,
            cellHeight
          }
        ),
        row.cells.map((cell, index2) => /* @__PURE__ */ React__default.createElement(
          TableCell,
          {
            key: index2,
            tableStyles,
            cell,
            onCellFilterAdded,
            columnIndex: index2,
            columnCount: row.cells.length,
            timeRange,
            frame: data,
            rowStyled: rowBg !== void 0,
            textWrapped: textWrapField !== void 0,
            height: Number(style.height)
          }
        ))
      );
    },
    [
      cellHeight,
      data,
      nestedDataField,
      onCellFilterAdded,
      onRowHover,
      onRowLeave,
      prepareRow,
      rowIndexForPagination,
      rows,
      tableState.expanded,
      tableStyles,
      textWrapField,
      theme.components.table.rowHoverBackground,
      theme.typography.fontSize,
      theme.typography.body.lineHeight,
      timeRange,
      width,
      rowBg,
      headerGroups,
      osContext
    ]
  );
  const getItemSize = (index) => {
    const indexForPagination = rowIndexForPagination(index);
    const row = rows[indexForPagination];
    if (tableState.expanded[row.id] && nestedDataField) {
      return getExpandedRowHeight(nestedDataField, row.index, tableStyles);
    }
    if (textWrapField) {
      const seriesIndex = data.fields.findIndex((field) => field.name === textWrapField.name);
      const pxLineHeight = theme.typography.fontSize * theme.typography.body.lineHeight;
      return guessTextBoundingBox(
        textWrapField.values[index],
        headerGroups[0].headers[seriesIndex],
        osContext,
        pxLineHeight,
        tableStyles.rowHeight
      ).height;
    }
    return tableStyles.rowHeight;
  };
  const handleScroll = (event) => {
    const { scrollTop: scrollTop2 } = event.currentTarget;
    if (listRef.current !== null) {
      listRef.current.scrollTo(scrollTop2);
    }
  };
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(CustomScrollbar, { onScroll: handleScroll, hideHorizontalTrack: true, scrollTop }, /* @__PURE__ */ React__default.createElement(
    VariableSizeList,
    {
      key: rowHeight + pageIndex,
      height: listHeight,
      itemCount,
      itemSize: getItemSize,
      width: "100%",
      ref: listRef,
      style: { overflow: void 0 }
    },
    ({ index, style }) => RenderRow({ index, style, rowHighlightIndex })
  )));
};

export { RowsList };
//# sourceMappingURL=RowsList.js.map
