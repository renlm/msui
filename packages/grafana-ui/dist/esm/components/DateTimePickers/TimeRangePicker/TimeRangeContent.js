import { css } from '@emotion/css';
import React__default, { useState, useId, useEffect, useCallback } from 'react';
import { rangeUtil, dateTimeParse, isDateTime, dateTimeFormat } from '@grafana/data';
import { selectors } from '@grafana/e2e-selectors';
import { useStyles2 } from '../../../themes/ThemeContext.js';
import { t, Trans } from '../../../utils/i18n.js';
import { Button } from '../../Button/Button.js';
import '../../Button/ButtonGroup.js';
import { Field } from '../../Forms/Field.js';
import { Icon } from '../../Icon/Icon.js';
import { Input } from '../../Input/Input.js';
import { Tooltip } from '../../Tooltip/Tooltip.js';
import { isValid } from '../utils.js';
import TimePickerCalendar from './TimePickerCalendar.js';

const ERROR_MESSAGES = {
  default: () => t("time-picker.range-content.default-error", 'Please enter a past date or "now"'),
  range: () => t("time-picker.range-content.range-error", `"From" can't be after "To"`)
};
const TimeRangeContent = (props) => {
  const {
    value,
    isFullscreen = false,
    timeZone,
    onApply: onApplyFromProps,
    isReversed,
    fiscalYearStartMonth,
    onError
  } = props;
  const [fromValue, toValue] = valueToState(value.raw.from, value.raw.to, timeZone);
  const style = useStyles2(getStyles);
  const [from, setFrom] = useState(fromValue);
  const [to, setTo] = useState(toValue);
  const [isOpen, setOpen] = useState(false);
  const fromFieldId = useId();
  const toFieldId = useId();
  useEffect(() => {
    const [fromValue2, toValue2] = valueToState(value.raw.from, value.raw.to, timeZone);
    setFrom(fromValue2);
    setTo(toValue2);
  }, [value.raw.from, value.raw.to, timeZone]);
  const onOpen = useCallback(
    (event) => {
      event.preventDefault();
      setOpen(true);
    },
    [setOpen]
  );
  const onApply = useCallback(() => {
    if (to.invalid || from.invalid) {
      return;
    }
    const raw = { from: from.value, to: to.value };
    const timeRange = rangeUtil.convertRawToRange(raw, timeZone, fiscalYearStartMonth);
    onApplyFromProps(timeRange);
  }, [from.invalid, from.value, onApplyFromProps, timeZone, to.invalid, to.value, fiscalYearStartMonth]);
  const onChange = useCallback(
    (from2, to2) => {
      const [fromValue2, toValue2] = valueToState(from2, to2, timeZone);
      setFrom(fromValue2);
      setTo(toValue2);
    },
    [timeZone]
  );
  const submitOnEnter = (event) => {
    if (event.key === "Enter") {
      onApply();
    }
  };
  const onCopy = () => {
    const raw = { from: from.value, to: to.value };
    navigator.clipboard.writeText(JSON.stringify(raw));
  };
  const onPaste = async () => {
    const raw = await navigator.clipboard.readText();
    let range;
    try {
      range = JSON.parse(raw);
    } catch (error) {
      if (onError) {
        onError(raw);
      }
      return;
    }
    const [fromValue2, toValue2] = valueToState(range.from, range.to, timeZone);
    setFrom(fromValue2);
    setTo(toValue2);
  };
  const fiscalYear = rangeUtil.convertRawToRange({ from: "now/fy", to: "now/fy" }, timeZone, fiscalYearStartMonth);
  const fiscalYearMessage = t("time-picker.range-content.fiscal-year", "Fiscal year");
  const fyTooltip = /* @__PURE__ */ React__default.createElement("div", { className: style.tooltip }, rangeUtil.isFiscal(value) ? /* @__PURE__ */ React__default.createElement(
    Tooltip,
    {
      content: `${fiscalYearMessage}: ${fiscalYear.from.format("MMM-DD")} - ${fiscalYear.to.format("MMM-DD")}`
    },
    /* @__PURE__ */ React__default.createElement(Icon, { name: "info-circle" })
  ) : null);
  const icon = /* @__PURE__ */ React__default.createElement(
    Button,
    {
      "aria-label": t("time-picker.range-content.open-input-calendar", "Open calendar"),
      "data-testid": selectors.components.TimePicker.calendar.openButton,
      icon: "calendar-alt",
      variant: "secondary",
      type: "button",
      onClick: onOpen
    }
  );
  return /* @__PURE__ */ React__default.createElement("div", null, /* @__PURE__ */ React__default.createElement("div", { className: style.fieldContainer }, /* @__PURE__ */ React__default.createElement(
    Field,
    {
      label: t("time-picker.range-content.from-input", "From"),
      invalid: from.invalid,
      error: from.errorMessage
    },
    /* @__PURE__ */ React__default.createElement(
      Input,
      {
        id: fromFieldId,
        onClick: (event) => event.stopPropagation(),
        onChange: (event) => onChange(event.currentTarget.value, to.value),
        addonAfter: icon,
        onKeyDown: submitOnEnter,
        "data-testid": selectors.components.TimePicker.fromField,
        value: from.value
      }
    )
  ), fyTooltip), /* @__PURE__ */ React__default.createElement("div", { className: style.fieldContainer }, /* @__PURE__ */ React__default.createElement(Field, { label: t("time-picker.range-content.to-input", "To"), invalid: to.invalid, error: to.errorMessage }, /* @__PURE__ */ React__default.createElement(
    Input,
    {
      id: toFieldId,
      onClick: (event) => event.stopPropagation(),
      onChange: (event) => onChange(from.value, event.currentTarget.value),
      addonAfter: icon,
      onKeyDown: submitOnEnter,
      "data-testid": selectors.components.TimePicker.toField,
      value: to.value
    }
  )), fyTooltip), /* @__PURE__ */ React__default.createElement("div", { className: style.buttonsContainer }, /* @__PURE__ */ React__default.createElement(
    Button,
    {
      "data-testid": selectors.components.TimePicker.copyTimeRange,
      icon: "copy",
      variant: "secondary",
      tooltip: t("time-picker.copy-paste.tooltip-copy", "Copy time range to clipboard"),
      type: "button",
      onClick: onCopy
    }
  ), /* @__PURE__ */ React__default.createElement(
    Button,
    {
      "data-testid": selectors.components.TimePicker.pasteTimeRange,
      icon: "clipboard-alt",
      variant: "secondary",
      tooltip: t("time-picker.copy-paste.tooltip-paste", "Paste time range"),
      type: "button",
      onClick: onPaste
    }
  ), /* @__PURE__ */ React__default.createElement(Button, { "data-testid": selectors.components.TimePicker.applyTimeRange, type: "button", onClick: onApply }, /* @__PURE__ */ React__default.createElement(Trans, { i18nKey: "time-picker.range-content.apply-button" }, "Apply time range"))), /* @__PURE__ */ React__default.createElement(
    TimePickerCalendar,
    {
      isFullscreen,
      isOpen,
      from: dateTimeParse(from.value, { timeZone }),
      to: dateTimeParse(to.value, { timeZone }),
      onApply,
      onClose: () => setOpen(false),
      onChange,
      timeZone,
      isReversed
    }
  ));
};
function isRangeInvalid(from, to, timezone) {
  const raw = { from, to };
  const timeRange = rangeUtil.convertRawToRange(raw, timezone);
  const valid = timeRange.from.isSame(timeRange.to) || timeRange.from.isBefore(timeRange.to);
  return !valid;
}
function valueToState(rawFrom, rawTo, timeZone) {
  const fromValue = valueAsString(rawFrom, timeZone);
  const toValue = valueAsString(rawTo, timeZone);
  const fromInvalid = !isValid(fromValue, false, timeZone);
  const toInvalid = !isValid(toValue, true, timeZone);
  const rangeInvalid = isRangeInvalid(fromValue, toValue, timeZone) && !toInvalid;
  return [
    {
      value: fromValue,
      invalid: fromInvalid || rangeInvalid,
      errorMessage: rangeInvalid && !fromInvalid ? ERROR_MESSAGES.range() : ERROR_MESSAGES.default()
    },
    { value: toValue, invalid: toInvalid, errorMessage: ERROR_MESSAGES.default() }
  ];
}
function valueAsString(value, timeZone) {
  if (isDateTime(value)) {
    return dateTimeFormat(value, { timeZone });
  }
  return value;
}
function getStyles(theme) {
  return {
    fieldContainer: css({
      display: "flex"
    }),
    buttonsContainer: css({
      display: "flex",
      gap: theme.spacing(0.5),
      marginTop: theme.spacing(1)
    }),
    tooltip: css({
      paddingLeft: theme.spacing(1),
      paddingTop: theme.spacing(3)
    })
  };
}

export { TimeRangeContent };
//# sourceMappingURL=TimeRangeContent.js.map
