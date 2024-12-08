import React__default from 'react';
import '../../utils/dom.js';
import '../../utils/colors.js';
import 'slate';
import { getCellLinks } from '../../utils/table.js';
import 'lodash';
import 'ansicolor';
import '../../utils/logger.js';
import { DataLinksContextMenu } from '../DataLinks/DataLinksContextMenu.js';

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
const DATALINKS_HEIGHT_OFFSET = 10;
const ImageCell = (props) => {
  var _a;
  const { field, cell, tableStyles, row, cellProps } = props;
  const displayValue = field.display(cell.value);
  const hasLinks = Boolean((_a = getCellLinks(field, row)) == null ? void 0 : _a.length);
  return /* @__PURE__ */ React__default.createElement("div", __spreadProps(__spreadValues({}, cellProps), { className: tableStyles.cellContainer }), !hasLinks && /* @__PURE__ */ React__default.createElement(
    "img",
    {
      style: { height: tableStyles.cellHeight - DATALINKS_HEIGHT_OFFSET, width: "auto" },
      src: displayValue.text,
      className: tableStyles.imageCell,
      alt: ""
    }
  ), hasLinks && /* @__PURE__ */ React__default.createElement(
    DataLinksContextMenu,
    {
      style: { height: tableStyles.cellHeight - DATALINKS_HEIGHT_OFFSET, width: "auto" },
      links: () => getCellLinks(field, row) || []
    },
    (api) => {
      const img = /* @__PURE__ */ React__default.createElement(
        "img",
        {
          style: { height: tableStyles.cellHeight - DATALINKS_HEIGHT_OFFSET, width: "auto" },
          src: displayValue.text,
          className: tableStyles.imageCell,
          alt: ""
        }
      );
      if (api.openMenu) {
        return /* @__PURE__ */ React__default.createElement(
          "div",
          {
            onClick: api.openMenu,
            role: "button",
            tabIndex: 0,
            onKeyDown: (e) => {
              if (e.key === "Enter" && api.openMenu) {
                api.openMenu(e);
              }
            }
          },
          img
        );
      } else {
        return img;
      }
    }
  ));
};

export { ImageCell };
//# sourceMappingURL=ImageCell.js.map
