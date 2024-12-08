import React__default from 'react';
import { getMinMaxAndDelta, isDataFrameWithValue, FieldType, isDataFrame } from '@grafana/data';
import { TableCellDisplayMode, GraphDrawStyle, LineInterpolation, GraphGradientMode, BarAlignment, VisibilityMode } from '@grafana/schema';
import { useTheme2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';
import '../../utils/dom.js';
import '../../utils/colors.js';
import 'slate';
import { measureText } from '../../utils/measureText.js';
import 'lodash';
import 'ansicolor';
import '../../utils/logger.js';
import { FormattedValueDisplay } from '../FormattedValueDisplay/FormattedValueDisplay.js';
import { Sparkline } from '../Sparkline/Sparkline.js';
import { getAlignmentFactor, getCellOptions } from './utils.js';

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
const defaultSparklineCellConfig = {
  type: TableCellDisplayMode.Sparkline,
  drawStyle: GraphDrawStyle.Line,
  lineInterpolation: LineInterpolation.Smooth,
  lineWidth: 1,
  fillOpacity: 17,
  gradientMode: GraphGradientMode.Hue,
  pointSize: 2,
  barAlignment: BarAlignment.Center,
  showPoints: VisibilityMode.Never,
  hideValue: false
};
const SparklineCell = (props) => {
  var _a, _b, _c, _d;
  const { field, innerWidth, tableStyles, cell, cellProps, timeRange } = props;
  const sparkline = getSparkline(cell.value);
  const theme = useTheme2();
  if (!sparkline) {
    return /* @__PURE__ */ React__default.createElement("div", __spreadProps(__spreadValues({}, cellProps), { className: tableStyles.cellContainer }), field.config.noValue || "no data");
  }
  if (sparkline.x && !sparkline.x.config.interval && sparkline.x.values.length > 1) {
    sparkline.x.config.interval = sparkline.x.values[1] - sparkline.x.values[0];
  }
  sparkline.y.values = sparkline.y.values.map((v) => {
    if (!Number.isFinite(v)) {
      return null;
    } else {
      return v;
    }
  });
  const range = getMinMaxAndDelta(sparkline.y);
  sparkline.y.config.min = range.min;
  sparkline.y.config.max = range.max;
  sparkline.y.state = { range };
  sparkline.timeRange = timeRange;
  const cellOptions = getTableSparklineCellOptions(field);
  const config = {
    color: field.config.color,
    custom: __spreadValues(__spreadValues({}, defaultSparklineCellConfig), cellOptions)
  };
  const hideValue = (_b = (_a = field.config.custom) == null ? void 0 : _a.cellOptions) == null ? void 0 : _b.hideValue;
  let valueWidth = 0;
  let valueElement = null;
  if (!hideValue) {
    const value = isDataFrameWithValue(cell.value) ? cell.value.value : null;
    const displayValue = field.display(value);
    const alignmentFactor = getAlignmentFactor(field, displayValue, cell.row.index);
    valueWidth = measureText(`${(_c = alignmentFactor.prefix) != null ? _c : ""}${alignmentFactor.text}${(_d = alignmentFactor.suffix) != null ? _d : ""}`, 16).width + theme.spacing.gridSize;
    valueElement = /* @__PURE__ */ React__default.createElement(
      FormattedValueDisplay,
      {
        style: {
          width: `${valueWidth - theme.spacing.gridSize}px`,
          textAlign: "right",
          marginRight: theme.spacing(1)
        },
        value: displayValue
      }
    );
  }
  return /* @__PURE__ */ React__default.createElement("div", __spreadProps(__spreadValues({}, cellProps), { className: tableStyles.cellContainer }), valueElement, /* @__PURE__ */ React__default.createElement("div", null, /* @__PURE__ */ React__default.createElement(
    Sparkline,
    {
      width: innerWidth - valueWidth,
      height: tableStyles.cellHeightInner,
      sparkline,
      config,
      theme: tableStyles.theme
    }
  )));
};
function getSparkline(value) {
  if (Array.isArray(value)) {
    return {
      y: {
        name: "test",
        type: FieldType.number,
        values: value,
        config: {}
      }
    };
  }
  if (isDataFrame(value)) {
    const timeField = value.fields.find((x) => x.type === FieldType.time);
    const numberField = value.fields.find((x) => x.type === FieldType.number);
    if (timeField && numberField) {
      return { x: timeField, y: numberField };
    }
  }
  return;
}
function getTableSparklineCellOptions(field) {
  let options = getCellOptions(field);
  if (options.type === TableCellDisplayMode.Auto) {
    options = __spreadProps(__spreadValues({}, options), { type: TableCellDisplayMode.Sparkline });
  }
  if (options.type === TableCellDisplayMode.Sparkline) {
    return options;
  }
  throw new Error(`Expected options type ${TableCellDisplayMode.Sparkline} but got ${options.type}`);
}

export { SparklineCell, defaultSparklineCellConfig };
//# sourceMappingURL=SparklineCell.js.map
