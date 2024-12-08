import { css, cx } from '@emotion/css';
import { isString } from 'lodash';
import React__default from 'react';
import '@grafana/data';
import { useStyles2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';
import '../../utils/dom.js';
import '../../utils/colors.js';
import 'slate';
import { getCellLinks } from '../../utils/table.js';
import 'ansicolor';
import '../../utils/logger.js';
import { clearLinkButtonStyles, Button } from '../Button/Button.js';
import '../Button/ButtonGroup.js';
import { DataLinksContextMenu } from '../DataLinks/DataLinksContextMenu.js';
import { CellActions } from './CellActions.js';

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
function JSONViewCell(props) {
  var _a, _b;
  const { cell, tableStyles, cellProps, field, row } = props;
  const inspectEnabled = Boolean((_a = field.config.custom) == null ? void 0 : _a.inspect);
  const txt = css({
    cursor: "pointer",
    fontFamily: "monospace"
  });
  let value = cell.value;
  let displayValue = value;
  if (isString(value)) {
    try {
      value = JSON.parse(value);
    } catch (e) {
    }
  } else {
    displayValue = JSON.stringify(value, null, " ");
  }
  const hasLinks = Boolean((_b = getCellLinks(field, row)) == null ? void 0 : _b.length);
  const clearButtonStyle = useStyles2(clearLinkButtonStyles);
  return /* @__PURE__ */ React__default.createElement("div", __spreadProps(__spreadValues({}, cellProps), { className: inspectEnabled ? tableStyles.cellContainerNoOverflow : tableStyles.cellContainer }), /* @__PURE__ */ React__default.createElement("div", { className: cx(tableStyles.cellText, txt) }, !hasLinks && /* @__PURE__ */ React__default.createElement("div", { className: tableStyles.cellText }, displayValue), hasLinks && /* @__PURE__ */ React__default.createElement(DataLinksContextMenu, { links: () => getCellLinks(field, row) || [] }, (api) => {
    if (api.openMenu) {
      return /* @__PURE__ */ React__default.createElement(Button, { className: cx(clearButtonStyle), onClick: api.openMenu }, displayValue);
    } else {
      return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, displayValue);
    }
  })), inspectEnabled && /* @__PURE__ */ React__default.createElement(CellActions, __spreadProps(__spreadValues({}, props), { previewMode: "code" })));
}

export { JSONViewCell };
//# sourceMappingURL=JSONViewCell.js.map
