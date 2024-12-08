import { css } from '@emotion/css';
import React__default, { memo } from 'react';
import Calendar from 'react-calendar';
import '@grafana/data';
import { useStyles2 } from '../../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../../utils/skeleton.js';
import { ClickOutsideWrapper } from '../../ClickOutsideWrapper/ClickOutsideWrapper.js';
import { Icon } from '../../Icon/Icon.js';
import { getBodyStyles } from '../TimeRangePicker/CalendarBody.js';

var __defProp = Object.defineProperty;
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
const DatePicker = memo((props) => {
  const styles = useStyles2(getStyles);
  const { isOpen, onClose } = props;
  if (!isOpen) {
    return null;
  }
  return /* @__PURE__ */ React__default.createElement(ClickOutsideWrapper, { useCapture: true, includeButtonPress: false, onClick: onClose }, /* @__PURE__ */ React__default.createElement("div", { className: styles.modal, "data-testid": "date-picker" }, /* @__PURE__ */ React__default.createElement(Body, __spreadValues({}, props))));
});
DatePicker.displayName = "DatePicker";
const Body = memo(({ value, minDate, maxDate, onChange }) => {
  const styles = useStyles2(getBodyStyles);
  return /* @__PURE__ */ React__default.createElement(
    Calendar,
    {
      className: styles.body,
      tileClassName: styles.title,
      value: value || /* @__PURE__ */ new Date(),
      minDate,
      maxDate,
      nextLabel: /* @__PURE__ */ React__default.createElement(Icon, { name: "angle-right" }),
      prevLabel: /* @__PURE__ */ React__default.createElement(Icon, { name: "angle-left" }),
      onChange: (ev) => {
        if (ev && !Array.isArray(ev)) {
          onChange(ev);
        }
      },
      locale: "en"
    }
  );
});
Body.displayName = "Body";
const getStyles = (theme) => {
  return {
    modal: css({
      zIndex: theme.zIndex.modal,
      boxShadow: theme.shadows.z3,
      backgroundColor: theme.colors.background.primary,
      border: `1px solid ${theme.colors.border.weak}`,
      borderTopLeftRadius: theme.shape.radius.default,
      borderBottomLeftRadius: theme.shape.radius.default,
      "button:disabled": {
        color: theme.colors.text.disabled
      }
    })
  };
};

export { DatePicker, getStyles };
//# sourceMappingURL=DatePicker.js.map
