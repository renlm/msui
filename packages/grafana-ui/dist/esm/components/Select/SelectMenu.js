import { cx } from '@emotion/css';
import { max } from 'lodash';
import React__default, { useRef, useMemo, useLayoutEffect } from 'react';
import { FixedSizeList } from 'react-window';
import { toIconName } from '@grafana/data';
import { selectors } from '@grafana/e2e-selectors';
import { useTheme2 } from '../../themes/ThemeContext.js';
import { CustomScrollbar } from '../CustomScrollbar/CustomScrollbar.js';
import { Icon } from '../Icon/Icon.js';
import { getSelectStyles } from './getSelectStyles.js';

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
const SelectMenu = ({ children, maxHeight, innerRef, innerProps }) => {
  const theme = useTheme2();
  const styles = getSelectStyles(theme);
  return /* @__PURE__ */ React__default.createElement("div", __spreadProps(__spreadValues({}, innerProps), { className: styles.menu, style: { maxHeight }, "aria-label": "Select options menu" }), /* @__PURE__ */ React__default.createElement(CustomScrollbar, { scrollRefCallback: innerRef, autoHide: false, autoHeightMax: "inherit", hideHorizontalTrack: true }, children));
};
SelectMenu.displayName = "SelectMenu";
const VIRTUAL_LIST_ITEM_HEIGHT = 37;
const VIRTUAL_LIST_WIDTH_ESTIMATE_MULTIPLIER = 8;
const VIRTUAL_LIST_PADDING = 8;
const VIRTUAL_LIST_WIDTH_EXTRA = 36;
const VirtualizedSelectMenu = ({
  children,
  maxHeight,
  innerRef: scrollRef,
  options,
  focusedOption
}) => {
  var _a;
  const theme = useTheme2();
  const styles = getSelectStyles(theme);
  const listRef = useRef(null);
  const flattenedOptions = useMemo(
    () => options.flatMap((option) => option.options ? [option, ...option.options] : [option]),
    [options]
  );
  const focusedIndex = flattenedOptions.findIndex(
    (option) => option.value === (focusedOption == null ? void 0 : focusedOption.value)
  );
  useLayoutEffect(() => {
    var _a2;
    (_a2 = listRef.current) == null ? void 0 : _a2.scrollToItem(focusedIndex);
  }, [focusedIndex]);
  if (!Array.isArray(children)) {
    return null;
  }
  const flattenedChildren = children.flatMap((child) => {
    if (hasArrayChildren(child)) {
      const childWithoutChildren = React__default.cloneElement(child, {
        children: null
      });
      return [childWithoutChildren, ...child.props.children];
    }
    return [child];
  });
  const longestOption = (_a = max(flattenedOptions.map((option) => {
    var _a2;
    return (_a2 = option.label) == null ? void 0 : _a2.length;
  }))) != null ? _a : 0;
  const widthEstimate = longestOption * VIRTUAL_LIST_WIDTH_ESTIMATE_MULTIPLIER + VIRTUAL_LIST_PADDING * 2 + VIRTUAL_LIST_WIDTH_EXTRA;
  const heightEstimate = Math.min(flattenedChildren.length * VIRTUAL_LIST_ITEM_HEIGHT, maxHeight);
  return /* @__PURE__ */ React__default.createElement(
    FixedSizeList,
    {
      outerRef: scrollRef,
      ref: listRef,
      className: styles.menu,
      height: heightEstimate,
      width: widthEstimate,
      "aria-label": "Select options menu",
      itemCount: flattenedChildren.length,
      itemSize: VIRTUAL_LIST_ITEM_HEIGHT
    },
    ({ index, style }) => /* @__PURE__ */ React__default.createElement("div", { style: __spreadProps(__spreadValues({}, style), { overflow: "hidden" }) }, flattenedChildren[index])
  );
};
const hasArrayChildren = (child) => {
  return React__default.isValidElement(child) && Array.isArray(child.props.children);
};
VirtualizedSelectMenu.displayName = "VirtualizedSelectMenu";
const SelectMenuOptions = ({
  children,
  data,
  innerProps,
  innerRef,
  isFocused,
  isSelected,
  renderOptionLabel
}) => {
  const theme = useTheme2();
  const styles = getSelectStyles(theme);
  const icon = data.icon ? toIconName(data.icon) : void 0;
  const _a = innerProps, rest = __objRest(_a, ["onMouseMove", "onMouseOver"]);
  return /* @__PURE__ */ React__default.createElement(
    "div",
    __spreadProps(__spreadValues({
      ref: innerRef,
      className: cx(
        styles.option,
        isFocused && styles.optionFocused,
        isSelected && styles.optionSelected,
        data.isDisabled && styles.optionDisabled
      )
    }, rest), {
      "data-testid": selectors.components.Select.option,
      title: data.title
    }),
    icon && /* @__PURE__ */ React__default.createElement(Icon, { name: icon, className: styles.optionIcon }),
    data.imgUrl && /* @__PURE__ */ React__default.createElement("img", { className: styles.optionImage, src: data.imgUrl, alt: data.label || String(data.value) }),
    /* @__PURE__ */ React__default.createElement("div", { className: styles.optionBody }, /* @__PURE__ */ React__default.createElement("span", null, renderOptionLabel ? renderOptionLabel(data) : children), data.description && /* @__PURE__ */ React__default.createElement("div", { className: styles.optionDescription }, data.description), data.component && /* @__PURE__ */ React__default.createElement(data.component, null))
  );
};
SelectMenuOptions.displayName = "SelectMenuOptions";

export { SelectMenu, SelectMenuOptions, VirtualizedSelectMenu };
//# sourceMappingURL=SelectMenu.js.map
