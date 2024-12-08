import { cx, css } from '@emotion/css';
import React__default from 'react';
import { components } from 'react-select';
import { toIconName } from '@grafana/data';
import { useStyles2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';
import { useDelayedSwitch } from '../../utils/useDelayedSwitch.js';
import { Icon } from '../Icon/Icon.js';
import { Spinner } from '../Spinner/Spinner.js';
import { FadeTransition } from '../transitions/FadeTransition.js';
import { SlideOutTransition } from '../transitions/SlideOutTransition.js';

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
const getStyles = (theme) => {
  return {
    singleValue: css({
      label: "singleValue",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      boxSizing: "border-box",
      maxWidth: "100%",
      gridArea: "1 / 1 / 2 / 3"
    }),
    spinnerWrapper: css({
      width: "16px",
      height: "16px",
      display: "inline-block",
      marginRight: "10px",
      position: "relative",
      verticalAlign: "middle",
      overflow: "hidden"
    }),
    spinnerIcon: css({
      width: "100%",
      height: "100%",
      position: "absolute"
    }),
    optionIcon: css({
      marginRight: theme.spacing(1),
      color: theme.colors.text.secondary
    }),
    disabled: css({
      color: theme.colors.text.disabled
    }),
    isOpen: css({
      color: theme.colors.text.disabled
    })
  };
};
const SingleValue = (props) => {
  var _a;
  const { children, data, isDisabled } = props;
  const styles = useStyles2(getStyles);
  const loading = useDelayedSwitch(data.loading || false, { delay: 250, duration: 750 });
  const icon = data.icon ? toIconName(data.icon) : void 0;
  return /* @__PURE__ */ React__default.createElement(
    components.SingleValue,
    __spreadProps(__spreadValues({}, props), {
      className: cx(styles.singleValue, isDisabled && styles.disabled, props.selectProps.menuIsOpen && styles.isOpen)
    }),
    data.imgUrl ? /* @__PURE__ */ React__default.createElement(FadeWithImage, { loading, imgUrl: data.imgUrl, styles, alt: String((_a = data.label) != null ? _a : data.value) }) : /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(SlideOutTransition, { horizontal: true, size: 16, visible: loading, duration: 150 }, /* @__PURE__ */ React__default.createElement("div", { className: styles.spinnerWrapper }, /* @__PURE__ */ React__default.createElement(Spinner, { className: styles.spinnerIcon, inline: true }))), icon && /* @__PURE__ */ React__default.createElement(Icon, { name: icon, role: "img", className: styles.optionIcon })),
    !data.hideText && children
  );
};
const FadeWithImage = (props) => {
  return /* @__PURE__ */ React__default.createElement("div", { className: props.styles.spinnerWrapper }, /* @__PURE__ */ React__default.createElement(FadeTransition, { duration: 150, visible: props.loading }, /* @__PURE__ */ React__default.createElement(Spinner, { className: props.styles.spinnerIcon, inline: true })), /* @__PURE__ */ React__default.createElement(FadeTransition, { duration: 150, visible: !props.loading }, /* @__PURE__ */ React__default.createElement("img", { className: props.styles.spinnerIcon, src: props.imgUrl, alt: props.alt })));
};

export { SingleValue };
//# sourceMappingURL=SingleValue.js.map
