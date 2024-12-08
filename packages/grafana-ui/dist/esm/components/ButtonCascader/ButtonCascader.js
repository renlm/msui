import { cx, css } from '@emotion/css';
import RCCascader from 'rc-cascader';
import React__default from 'react';
import '@grafana/data';
import { useStyles2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';
import { Button } from '../Button/Button.js';
import '../Button/ButtonGroup.js';
import { onChangeCascader, onLoadDataCascader } from '../Cascader/optionMappings.js';
import { getCascaderStyles } from '../Cascader/styles.js';
import { Icon } from '../Icon/Icon.js';

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
const ButtonCascader = (props) => {
  const _a = props, { onChange, className, loadData, icon, buttonProps, hideDownIcon, variant, disabled } = _a, rest = __objRest(_a, ["onChange", "className", "loadData", "icon", "buttonProps", "hideDownIcon", "variant", "disabled"]);
  const styles = useStyles2(getStyles);
  const cascaderStyles = useStyles2(getCascaderStyles);
  let content = props.children;
  if (!hideDownIcon) {
    content = [props.children, /* @__PURE__ */ React__default.createElement(Icon, { key: "down-icon", name: "angle-down", className: styles.icons.right })];
  }
  return /* @__PURE__ */ React__default.createElement(
    RCCascader,
    __spreadProps(__spreadValues({
      onChange: onChangeCascader(onChange),
      loadData: onLoadDataCascader(loadData),
      dropdownClassName: cx(cascaderStyles.dropdown, styles.popup)
    }, rest), {
      expandIcon: null
    }),
    /* @__PURE__ */ React__default.createElement(Button, __spreadValues({ icon, disabled, variant }, buttonProps != null ? buttonProps : {}), content)
  );
};
ButtonCascader.displayName = "ButtonCascader";
const getStyles = (theme) => {
  return {
    popup: css({
      label: "popup",
      zIndex: theme.zIndex.dropdown
    }),
    icons: {
      right: css({
        margin: "1px 0 0 4px"
      }),
      left: css({
        margin: "-1px 4px 0 0"
      })
    }
  };
};

export { ButtonCascader };
//# sourceMappingURL=ButtonCascader.js.map
