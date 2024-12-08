import { css, cx } from '@emotion/css';
import { useDialog } from '@react-aria/dialog';
import { FocusScope } from '@react-aria/focus';
import { useOverlay } from '@react-aria/overlays';
import React__default, { memo, useState, useEffect, createRef } from 'react';
import { rangeUtil, dateMath, dateTimeFormat, timeZoneFormatUserFriendly } from '@grafana/data';
import { selectors } from '@grafana/e2e-selectors';
import { useStyles2 } from '../../themes/ThemeContext.js';
import { t, Trans } from '../../utils/i18n.js';
import '../Button/Button.js';
import { ButtonGroup } from '../Button/ButtonGroup.js';
import { getModalStyles } from '../Modal/getModalStyles.js';
import { ToolbarButton } from '../ToolbarButton/ToolbarButton.js';
import '../ToolbarButton/ToolbarButtonRow.js';
import { Tooltip } from '../Tooltip/Tooltip.js';
import { TimePickerContent } from './TimeRangePicker/TimePickerContent.js';
import { quickOptions } from './options.js';

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
function TimeRangePicker(props) {
  var _a;
  const [isOpen, setOpen] = useState(false);
  const {
    value,
    onMoveBackward,
    onMoveForward,
    onZoom,
    onError,
    timeZone,
    fiscalYearStartMonth,
    timeSyncButton,
    isSynced,
    history,
    onChangeTimeZone,
    onChangeFiscalYearStartMonth,
    hideQuickRanges,
    widthOverride,
    isOnCanvas,
    onToolbarTimePickerClick
  } = props;
  const onChange = (timeRange) => {
    props.onChange(timeRange);
    setOpen(false);
  };
  useEffect(() => {
    if (isOpen && onToolbarTimePickerClick) {
      onToolbarTimePickerClick();
    }
  }, [isOpen, onToolbarTimePickerClick]);
  const onToolbarButtonSwitch = () => {
    setOpen((prevState) => !prevState);
  };
  const onClose = () => {
    setOpen(false);
  };
  const overlayRef = createRef();
  const buttonRef = createRef();
  const { overlayProps, underlayProps } = useOverlay(
    {
      onClose,
      isDismissable: true,
      isOpen,
      shouldCloseOnInteractOutside: (element) => {
        var _a2;
        return !((_a2 = buttonRef.current) == null ? void 0 : _a2.contains(element));
      }
    },
    overlayRef
  );
  const { dialogProps } = useDialog({}, overlayRef);
  const styles = useStyles2(getStyles);
  const { modalBackdrop } = useStyles2(getModalStyles);
  const hasAbsolute = !rangeUtil.isRelativeTime(value.raw.from) || !rangeUtil.isRelativeTime(value.raw.to);
  const variant = isSynced ? "active" : isOnCanvas ? "canvas" : "default";
  const isFromAfterTo = (_a = value == null ? void 0 : value.to) == null ? void 0 : _a.isBefore(value.from);
  const timePickerIcon = isFromAfterTo ? "exclamation-triangle" : "clock-nine";
  const currentTimeRange = formattedRange(value, timeZone);
  return /* @__PURE__ */ React__default.createElement(ButtonGroup, { className: styles.container }, hasAbsolute && /* @__PURE__ */ React__default.createElement(
    ToolbarButton,
    {
      "aria-label": t("time-picker.range-picker.backwards-time-aria-label", "Move time range backwards"),
      variant,
      onClick: onMoveBackward,
      icon: "angle-left",
      narrow: true
    }
  ), /* @__PURE__ */ React__default.createElement(
    Tooltip,
    {
      ref: buttonRef,
      content: /* @__PURE__ */ React__default.createElement(TimePickerTooltip, { timeRange: value, timeZone }),
      placement: "bottom",
      interactive: true
    },
    /* @__PURE__ */ React__default.createElement(
      ToolbarButton,
      {
        "data-testid": selectors.components.TimePicker.openButton,
        "aria-label": t("time-picker.range-picker.current-time-selected", "Time range selected: {{currentTimeRange}}", {
          currentTimeRange
        }),
        "aria-controls": "TimePickerContent",
        onClick: onToolbarButtonSwitch,
        icon: timePickerIcon,
        isOpen,
        variant
      },
      /* @__PURE__ */ React__default.createElement(TimePickerButtonLabel, __spreadValues({}, props))
    )
  ), isOpen && /* @__PURE__ */ React__default.createElement("div", { "data-testid": selectors.components.TimePicker.overlayContent }, /* @__PURE__ */ React__default.createElement("div", __spreadValues({ role: "presentation", className: cx(modalBackdrop, styles.backdrop) }, underlayProps)), /* @__PURE__ */ React__default.createElement(FocusScope, { contain: true, autoFocus: true, restoreFocus: true }, /* @__PURE__ */ React__default.createElement("section", __spreadValues(__spreadValues({ className: styles.content, ref: overlayRef }, overlayProps), dialogProps), /* @__PURE__ */ React__default.createElement(
    TimePickerContent,
    {
      timeZone,
      fiscalYearStartMonth,
      value,
      onChange,
      quickOptions,
      history,
      showHistory: true,
      widthOverride,
      onChangeTimeZone,
      onChangeFiscalYearStartMonth,
      hideQuickRanges,
      onError
    }
  )))), timeSyncButton, hasAbsolute && /* @__PURE__ */ React__default.createElement(
    ToolbarButton,
    {
      "aria-label": t("time-picker.range-picker.forwards-time-aria-label", "Move time range forwards"),
      onClick: onMoveForward,
      icon: "angle-right",
      narrow: true,
      variant
    }
  ), /* @__PURE__ */ React__default.createElement(Tooltip, { content: ZoomOutTooltip, placement: "bottom" }, /* @__PURE__ */ React__default.createElement(
    ToolbarButton,
    {
      "aria-label": t("time-picker.range-picker.zoom-out-button", "Zoom out time range"),
      onClick: onZoom,
      icon: "search-minus",
      variant
    }
  )));
}
TimeRangePicker.displayName = "TimeRangePicker";
const ZoomOutTooltip = () => /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Trans, { i18nKey: "time-picker.range-picker.zoom-out-tooltip" }, "Time range zoom out ", /* @__PURE__ */ React__default.createElement("br", null), " CTRL+Z"));
const TimePickerTooltip = ({ timeRange, timeZone }) => {
  const styles = useStyles2(getLabelStyles);
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, dateTimeFormat(timeRange.from, { timeZone }), /* @__PURE__ */ React__default.createElement("div", { className: "text-center" }, /* @__PURE__ */ React__default.createElement(Trans, { i18nKey: "time-picker.range-picker.to" }, "to")), dateTimeFormat(timeRange.to, { timeZone }), /* @__PURE__ */ React__default.createElement("div", { className: "text-center" }, /* @__PURE__ */ React__default.createElement("span", { className: styles.utc }, timeZoneFormatUserFriendly(timeZone))));
};
const TimePickerButtonLabel = memo(({ hideText, value, timeZone }) => {
  const styles = useStyles2(getLabelStyles);
  if (hideText) {
    return null;
  }
  return /* @__PURE__ */ React__default.createElement("span", { className: styles.container, "aria-live": "polite", "aria-atomic": "true" }, /* @__PURE__ */ React__default.createElement("span", null, formattedRange(value, timeZone)), /* @__PURE__ */ React__default.createElement("span", { className: styles.utc }, rangeUtil.describeTimeRangeAbbreviation(value, timeZone)));
});
TimePickerButtonLabel.displayName = "TimePickerButtonLabel";
const formattedRange = (value, timeZone) => {
  const adjustedTimeRange = {
    to: dateMath.isMathString(value.raw.to) ? value.raw.to : value.to,
    from: dateMath.isMathString(value.raw.from) ? value.raw.from : value.from
  };
  return rangeUtil.describeTimeRange(adjustedTimeRange, timeZone);
};
const getStyles = (theme) => {
  return {
    container: css({
      position: "relative",
      display: "flex",
      verticalAlign: "middle"
    }),
    backdrop: css({
      display: "none",
      [theme.breakpoints.down("sm")]: {
        display: "block"
      }
    }),
    content: css({
      position: "absolute",
      right: 0,
      top: "116%",
      zIndex: theme.zIndex.dropdown,
      [theme.breakpoints.down("sm")]: {
        position: "fixed",
        right: "50%",
        top: "50%",
        transform: "translate(50%, -50%)",
        zIndex: theme.zIndex.modal
      }
    })
  };
};
const getLabelStyles = (theme) => {
  return {
    container: css({
      display: "flex",
      alignItems: "center",
      whiteSpace: "nowrap"
    }),
    utc: css({
      color: theme.v1.palette.orange,
      fontSize: theme.typography.size.sm,
      paddingLeft: "6px",
      lineHeight: "28px",
      verticalAlign: "bottom",
      fontWeight: theme.typography.fontWeightMedium
    })
  };
};

export { TimePickerButtonLabel, TimePickerTooltip, TimeRangePicker };
//# sourceMappingURL=TimeRangePicker.js.map
