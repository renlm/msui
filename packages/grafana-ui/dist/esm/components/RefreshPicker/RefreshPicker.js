import { formatDuration } from 'date-fns';
import React__default, { PureComponent } from 'react';
import { parseDuration } from '@grafana/data';
import { selectors } from '@grafana/e2e-selectors';
import { t } from '../../utils/i18n.js';
import '../Button/Button.js';
import { ButtonGroup } from '../Button/ButtonGroup.js';
import { ButtonSelect } from '../Dropdown/ButtonSelect.js';
import { ToolbarButton } from '../ToolbarButton/ToolbarButton.js';
import '../ToolbarButton/ToolbarButtonRow.js';

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const defaultIntervals = ["5s", "10s", "30s", "1m", "5m", "15m", "30m", "1h", "2h", "1d"];
const _RefreshPicker = class _RefreshPicker extends PureComponent {
  constructor(props) {
    super(props);
    __publicField(this, "onChangeSelect", (item) => {
      const { onIntervalChanged } = this.props;
      if (onIntervalChanged && item.value != null) {
        onIntervalChanged(item.value);
      }
    });
  }
  getVariant() {
    if (this.props.isLive) {
      return "primary";
    }
    if (this.props.primary) {
      return "primary";
    }
    return this.props.isOnCanvas ? "canvas" : "default";
  }
  render() {
    const { onRefresh, intervals, tooltip, value, text, isLoading, noIntervalPicker, width, showAutoInterval } = this.props;
    const currentValue = value || "";
    const variant = this.getVariant();
    const options = intervalsToOptions({ intervals, showAutoInterval });
    const option = options.find(({ value: value2 }) => value2 === currentValue);
    const translatedOffOption = translateOption(_RefreshPicker.offOption.value);
    let selectedValue = option || translatedOffOption;
    if (selectedValue.label === translatedOffOption.label) {
      selectedValue = { value: "" };
    }
    const durationAriaLabel = selectedValue.ariaLabel;
    const ariaLabelDurationSelectedMessage = t(
      "refresh-picker.aria-label.duration-selected",
      "Choose refresh time interval with current interval {{durationAriaLabel}} selected",
      { durationAriaLabel }
    );
    const ariaLabelChooseIntervalMessage = t(
      "refresh-picker.aria-label.choose-interval",
      "Auto refresh turned off. Choose refresh time interval"
    );
    const ariaLabel = selectedValue.value === "" ? ariaLabelChooseIntervalMessage : ariaLabelDurationSelectedMessage;
    const tooltipIntervalSelected = t("refresh-picker.tooltip.interval-selected", "Set auto refresh interval");
    const tooltipAutoRefreshOff = t("refresh-picker.tooltip.turned-off", "Auto refresh off");
    const tooltipAutoRefresh = selectedValue.value === "" ? tooltipAutoRefreshOff : tooltipIntervalSelected;
    return /* @__PURE__ */ React__default.createElement(ButtonGroup, { className: "refresh-picker" }, /* @__PURE__ */ React__default.createElement(
      ToolbarButton,
      {
        "aria-label": text,
        tooltip,
        onClick: onRefresh,
        variant,
        icon: isLoading ? "spinner" : "sync",
        style: width ? { width } : void 0,
        "data-testid": selectors.components.RefreshPicker.runButtonV2
      },
      text
    ), !noIntervalPicker && /* @__PURE__ */ React__default.createElement(
      ButtonSelect,
      {
        value: selectedValue,
        options,
        onChange: this.onChangeSelect,
        variant,
        "data-testid": selectors.components.RefreshPicker.intervalButtonV2,
        "aria-label": ariaLabel,
        tooltip: tooltipAutoRefresh
      }
    ));
  }
};
__publicField(_RefreshPicker, "offOption", {
  label: "Off",
  value: "",
  ariaLabel: "Turn off auto refresh"
});
__publicField(_RefreshPicker, "liveOption", {
  label: "Live",
  value: "LIVE",
  ariaLabel: "Turn on live streaming"
});
__publicField(_RefreshPicker, "autoOption", {
  label: "Auto",
  value: "auto",
  ariaLabel: "Select refresh from the query range"
});
__publicField(_RefreshPicker, "isLive", (refreshInterval) => refreshInterval === _RefreshPicker.liveOption.value);
let RefreshPicker = _RefreshPicker;
function translateOption(option) {
  switch (option) {
    case RefreshPicker.liveOption.value:
      return {
        label: t("refresh-picker.live-option.label", "Live"),
        value: option,
        ariaLabel: t("refresh-picker.live-option.aria-label", "Turn on live streaming")
      };
    case RefreshPicker.offOption.value:
      return {
        label: t("refresh-picker.off-option.label", "Off"),
        value: option,
        ariaLabel: t("refresh-picker.off-option.aria-label", "Turn off auto refresh")
      };
    case RefreshPicker.autoOption.value:
      return {
        label: t("refresh-picker.auto-option.label", RefreshPicker.autoOption.label),
        value: option,
        ariaLabel: t("refresh-picker.auto-option.aria-label", RefreshPicker.autoOption.ariaLabel)
      };
  }
  return {
    label: option,
    value: option
  };
}
function intervalsToOptions({
  intervals = defaultIntervals,
  showAutoInterval = false
} = {}) {
  const options = intervals.map((interval) => {
    const duration = parseDuration(interval);
    const ariaLabel = formatDuration(duration);
    return {
      label: interval,
      value: interval,
      ariaLabel
    };
  });
  if (showAutoInterval) {
    options.unshift(translateOption(RefreshPicker.autoOption.value));
  }
  options.unshift(translateOption(RefreshPicker.offOption.value));
  return options;
}

export { RefreshPicker, defaultIntervals, intervalsToOptions, translateOption };
//# sourceMappingURL=RefreshPicker.js.map
