import { css } from '@emotion/css';
import { useDialog } from '@react-aria/dialog';
import { FocusScope } from '@react-aria/focus';
import { useOverlay, OverlayContainer } from '@react-aria/overlays';
import React__default, { memo } from 'react';
import { selectors } from '@grafana/e2e-selectors';
import '@grafana/data';
import { useTheme2, useStyles2 } from '../../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../../utils/skeleton.js';
import { getModalStyles } from '../../Modal/getModalStyles.js';
import { Body } from './CalendarBody.js';
import { Footer } from './CalendarFooter.js';
import { Header } from './CalendarHeader.js';

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
const getStyles = (theme, isReversed = false) => {
  return {
    container: css({
      top: 0,
      position: "absolute",
      [`${isReversed ? "left" : "right"}`]: "546px"
      // lmao
    }),
    modalContainer: css({
      label: "modalContainer",
      margin: "0 auto"
    }),
    calendar: css({
      display: "flex",
      flexDirection: "column",
      gap: theme.spacing(1),
      padding: theme.spacing(1),
      label: "calendar",
      boxShadow: theme.shadows.z3,
      backgroundColor: theme.colors.background.primary,
      border: `1px solid ${theme.colors.border.weak}`,
      borderRadius: theme.shape.radius.default
    }),
    modal: css({
      label: "modal",
      boxShadow: theme.shadows.z3,
      left: "50%",
      position: "fixed",
      top: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: theme.zIndex.modal
    })
  };
};
function TimePickerCalendar(props) {
  const theme = useTheme2();
  const { modalBackdrop } = useStyles2(getModalStyles);
  const styles = getStyles(theme, props.isReversed);
  const { isOpen, isFullscreen: isFullscreenProp, onClose } = props;
  const ref = React__default.createRef();
  const { dialogProps } = useDialog(
    {
      "aria-label": selectors.components.TimePicker.calendar.label
    },
    ref
  );
  const { overlayProps } = useOverlay(
    {
      isDismissable: true,
      isOpen,
      onClose
    },
    ref
  );
  const showInModal = !isFullscreenProp;
  if (!isOpen) {
    return null;
  }
  const calendar = /* @__PURE__ */ React__default.createElement(
    "section",
    __spreadProps(__spreadValues(__spreadValues({
      className: styles.calendar,
      ref
    }, overlayProps), dialogProps), {
      "data-testid": selectors.components.TimePicker.calendar.label
    }),
    /* @__PURE__ */ React__default.createElement(Header, __spreadValues({}, props)),
    /* @__PURE__ */ React__default.createElement(Body, __spreadValues({}, props)),
    showInModal && /* @__PURE__ */ React__default.createElement(Footer, __spreadValues({}, props))
  );
  if (!showInModal) {
    return /* @__PURE__ */ React__default.createElement(FocusScope, { contain: true, restoreFocus: true, autoFocus: true }, /* @__PURE__ */ React__default.createElement("div", { className: styles.container }, calendar));
  }
  return /* @__PURE__ */ React__default.createElement(OverlayContainer, null, /* @__PURE__ */ React__default.createElement("div", { className: modalBackdrop }), /* @__PURE__ */ React__default.createElement(FocusScope, { contain: true, autoFocus: true, restoreFocus: true }, /* @__PURE__ */ React__default.createElement("div", { className: styles.modal }, /* @__PURE__ */ React__default.createElement("div", { className: styles.modalContainer }, calendar))));
}
var TimePickerCalendar$1 = memo(TimePickerCalendar);
TimePickerCalendar.displayName = "TimePickerCalendar";

export { TimePickerCalendar$1 as default, getStyles };
//# sourceMappingURL=TimePickerCalendar.js.map
