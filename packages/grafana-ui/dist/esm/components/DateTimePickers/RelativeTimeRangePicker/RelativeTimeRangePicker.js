import { css, cx } from '@emotion/css';
import { flip, shift, useFloating, autoUpdate, useClick, useDismiss, useInteractions } from '@floating-ui/react';
import { useDialog } from '@react-aria/dialog';
import { FocusScope } from '@react-aria/focus';
import { useOverlay } from '@react-aria/overlays';
import React__default, { useState, useCallback, useRef } from 'react';
import '@grafana/data';
import { useStyles2 } from '../../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../../utils/skeleton.js';
import { t, Trans } from '../../../utils/i18n.js';
import { Button } from '../../Button/Button.js';
import '../../Button/ButtonGroup.js';
import { CustomScrollbar } from '../../CustomScrollbar/CustomScrollbar.js';
import { Field } from '../../Forms/Field.js';
import { Icon } from '../../Icon/Icon.js';
import { Input, getInputStyles } from '../../Input/Input.js';
import { Tooltip } from '../../Tooltip/Tooltip.js';
import { TimePickerTitle } from '../TimeRangePicker/TimePickerTitle.js';
import { TimeRangeList } from '../TimeRangePicker/TimeRangeList.js';
import { quickOptions } from '../options.js';
import { isRelativeFormat, mapRelativeTimeRangeToOption, isRangeValid, mapOptionToRelativeTimeRange } from './utils.js';

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
const validOptions = quickOptions.filter((o) => isRelativeFormat(o.from));
function RelativeTimeRangePicker(props) {
  const { timeRange, onChange } = props;
  const [isOpen, setIsOpen] = useState(false);
  const onClose = useCallback(() => setIsOpen(false), []);
  const timeOption = mapRelativeTimeRangeToOption(timeRange);
  const [from, setFrom] = useState({ value: timeOption.from, validation: isRangeValid(timeOption.from) });
  const [to, setTo] = useState({ value: timeOption.to, validation: isRangeValid(timeOption.to) });
  const ref = useRef(null);
  const { overlayProps, underlayProps } = useOverlay(
    { onClose: () => setIsOpen(false), isDismissable: true, isOpen },
    ref
  );
  const { dialogProps } = useDialog({}, ref);
  const middleware = [
    flip({
      // see https://floating-ui.com/docs/flip#combining-with-shift
      crossAxis: false,
      boundary: document.body
    }),
    shift()
  ];
  const { context, refs, floatingStyles } = useFloating({
    open: isOpen,
    placement: "bottom-start",
    onOpenChange: setIsOpen,
    middleware,
    whileElementsMounted: autoUpdate,
    strategy: "fixed"
  });
  const click = useClick(context);
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss, click]);
  const styles = useStyles2(getStyles(from.validation.errorMessage, to.validation.errorMessage));
  const onChangeTimeOption = (option) => {
    const relativeTimeRange = mapOptionToRelativeTimeRange(option);
    if (!relativeTimeRange) {
      return;
    }
    onClose();
    setFrom(__spreadProps(__spreadValues({}, from), { value: option.from }));
    setTo(__spreadProps(__spreadValues({}, to), { value: option.to }));
    onChange(relativeTimeRange);
  };
  const onOpen = useCallback(
    (event) => {
      event.stopPropagation();
      event.preventDefault();
      setIsOpen(!isOpen);
    },
    [isOpen]
  );
  const onApply = (event) => {
    event.preventDefault();
    if (!to.validation.isValid || !from.validation.isValid) {
      return;
    }
    const timeRange2 = mapOptionToRelativeTimeRange({
      from: from.value,
      to: to.value,
      display: ""
    });
    if (!timeRange2) {
      return;
    }
    onChange(timeRange2);
    setIsOpen(false);
  };
  return /* @__PURE__ */ React__default.createElement("div", { className: styles.container }, /* @__PURE__ */ React__default.createElement(
    "button",
    __spreadValues({
      ref: refs.setReference,
      className: styles.pickerInput,
      type: "button",
      onClick: onOpen
    }, getReferenceProps()),
    /* @__PURE__ */ React__default.createElement("span", { className: styles.clockIcon }, /* @__PURE__ */ React__default.createElement(Icon, { name: "clock-nine" })),
    /* @__PURE__ */ React__default.createElement("span", null, timeOption.from, " to ", timeOption.to),
    /* @__PURE__ */ React__default.createElement("span", { className: styles.caretIcon }, /* @__PURE__ */ React__default.createElement(Icon, { name: isOpen ? "angle-up" : "angle-down", size: "lg" }))
  ), isOpen && /* @__PURE__ */ React__default.createElement("div", null, /* @__PURE__ */ React__default.createElement("div", __spreadValues({ role: "presentation", className: styles.backdrop }, underlayProps)), /* @__PURE__ */ React__default.createElement(FocusScope, { contain: true, autoFocus: true, restoreFocus: true }, /* @__PURE__ */ React__default.createElement("div", __spreadValues(__spreadValues({ ref }, overlayProps), dialogProps), /* @__PURE__ */ React__default.createElement("div", __spreadValues({ className: styles.content, ref: refs.setFloating, style: floatingStyles }, getFloatingProps()), /* @__PURE__ */ React__default.createElement("div", { className: styles.body }, /* @__PURE__ */ React__default.createElement(CustomScrollbar, { className: styles.leftSide, hideHorizontalTrack: true }, /* @__PURE__ */ React__default.createElement(
    TimeRangeList,
    {
      title: t("time-picker.time-range.example-title", "Example time ranges"),
      options: validOptions,
      onChange: onChangeTimeOption,
      value: timeOption
    }
  )), /* @__PURE__ */ React__default.createElement("div", { className: styles.rightSide }, /* @__PURE__ */ React__default.createElement("div", { className: styles.title }, /* @__PURE__ */ React__default.createElement(TimePickerTitle, null, /* @__PURE__ */ React__default.createElement(Tooltip, { content: /* @__PURE__ */ React__default.createElement(TooltipContent, null), placement: "bottom", theme: "info" }, /* @__PURE__ */ React__default.createElement("div", null, /* @__PURE__ */ React__default.createElement(Trans, { i18nKey: "time-picker.time-range.specify" }, "Specify time range ", /* @__PURE__ */ React__default.createElement(Icon, { name: "info-circle" })))))), /* @__PURE__ */ React__default.createElement(Field, { label: "From", invalid: !from.validation.isValid, error: from.validation.errorMessage }, /* @__PURE__ */ React__default.createElement(
    Input,
    {
      onClick: (event) => event.stopPropagation(),
      onBlur: () => setFrom(__spreadProps(__spreadValues({}, from), { validation: isRangeValid(from.value) })),
      onChange: (event) => setFrom(__spreadProps(__spreadValues({}, from), { value: event.currentTarget.value })),
      value: from.value
    }
  )), /* @__PURE__ */ React__default.createElement(Field, { label: "To", invalid: !to.validation.isValid, error: to.validation.errorMessage }, /* @__PURE__ */ React__default.createElement(
    Input,
    {
      onClick: (event) => event.stopPropagation(),
      onBlur: () => setTo(__spreadProps(__spreadValues({}, to), { validation: isRangeValid(to.value) })),
      onChange: (event) => setTo(__spreadProps(__spreadValues({}, to), { value: event.currentTarget.value })),
      value: to.value
    }
  )), /* @__PURE__ */ React__default.createElement(Button, { "aria-label": "TimePicker submit button", onClick: onApply }, "Apply time range"))))))));
}
const TooltipContent = () => {
  const styles = useStyles2(toolTipStyles);
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement("div", { className: styles.supported }, "Supported formats: ", /* @__PURE__ */ React__default.createElement("code", { className: styles.tooltip }, "now-[digit]s/m/h/d/w")), /* @__PURE__ */ React__default.createElement("div", null, "Example: to select a time range from 10 minutes ago to now"), /* @__PURE__ */ React__default.createElement("code", { className: styles.tooltip }, "From: now-10m To: now"), /* @__PURE__ */ React__default.createElement("div", { className: styles.link }, "For more information see", " ", /* @__PURE__ */ React__default.createElement("a", { href: "https://grafana.com/docs/grafana/latest/dashboards/time-range-controls/" }, "docs ", /* @__PURE__ */ React__default.createElement(Icon, { name: "external-link-alt" })), "."));
};
const toolTipStyles = (theme) => ({
  supported: css({
    marginBottom: theme.spacing(1)
  }),
  tooltip: css({
    margin: 0
  }),
  link: css({
    marginTop: theme.spacing(1)
  })
});
const getStyles = (fromError, toError) => (theme) => {
  const inputStyles = getInputStyles({ theme, invalid: false });
  const bodyMinimumHeight = 250;
  const bodyHeight = bodyMinimumHeight + calculateErrorHeight(theme, fromError) + calculateErrorHeight(theme, toError);
  return {
    backdrop: css({
      position: "fixed",
      zIndex: theme.zIndex.modalBackdrop,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }),
    container: css({
      display: "flex",
      position: "relative"
    }),
    pickerInput: cx(
      inputStyles.input,
      inputStyles.wrapper,
      css({
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        cursor: "pointer",
        paddingRight: 0,
        paddingLeft: 0,
        lineHeight: `${theme.spacing.gridSize * theme.components.height.md - 2}px`
      })
    ),
    caretIcon: cx(
      inputStyles.suffix,
      css({
        position: "relative",
        marginLeft: theme.spacing(0.5)
      })
    ),
    clockIcon: cx(
      inputStyles.prefix,
      css({
        position: "relative",
        marginRight: theme.spacing(0.5)
      })
    ),
    content: css({
      background: theme.colors.background.primary,
      boxShadow: theme.shadows.z3,
      position: "absolute",
      zIndex: theme.zIndex.modal,
      width: "500px",
      top: "100%",
      borderRadius: theme.shape.radius.default,
      border: `1px solid ${theme.colors.border.weak}`,
      left: 0,
      whiteSpace: "normal"
    }),
    body: css({
      display: "flex",
      height: `${bodyHeight}px`
    }),
    description: css({
      color: theme.colors.text.secondary,
      fontSize: theme.typography.size.sm
    }),
    leftSide: css({
      width: "50% !important",
      borderRight: `1px solid ${theme.colors.border.medium}`
    }),
    rightSide: css({
      width: "50%",
      padding: theme.spacing(1)
    }),
    title: css({
      marginBottom: theme.spacing(1)
    })
  };
};
function calculateErrorHeight(theme, errorMessage) {
  if (!errorMessage) {
    return 0;
  }
  if (errorMessage.length > 34) {
    return theme.spacing.gridSize * 6.5;
  }
  return theme.spacing.gridSize * 4;
}

export { RelativeTimeRangePicker };
//# sourceMappingURL=RelativeTimeRangePicker.js.map
