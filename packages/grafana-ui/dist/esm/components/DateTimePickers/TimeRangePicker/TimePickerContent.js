import { css, cx } from '@emotion/css';
import React__default, { memo, useState, useMemo } from 'react';
import { isDateTime, rangeUtil } from '@grafana/data';
import { selectors } from '@grafana/e2e-selectors';
import { useStyles2, useTheme2 } from '../../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import { getFocusStyles } from '../../../themes/mixins.js';
import '../../../utils/skeleton.js';
import { t, Trans } from '../../../utils/i18n.js';
import { FilterInput } from '../../FilterInput/FilterInput.js';
import { Icon } from '../../Icon/Icon.js';
import { TimePickerFooter } from './TimePickerFooter.js';
import { TimePickerTitle } from './TimePickerTitle.js';
import { TimeRangeContent } from './TimeRangeContent.js';
import { TimeRangeList } from './TimeRangeList.js';
import { mapRangeToTimeOption, mapOptionToTimeRange } from './mapper.js';

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
const TimePickerContentWithScreenSize = (props) => {
  const {
    quickOptions = [],
    isReversed,
    isFullscreen,
    hideQuickRanges,
    timeZone,
    fiscalYearStartMonth,
    value,
    onChange,
    history,
    showHistory,
    className,
    hideTimeZone,
    onChangeTimeZone,
    onChangeFiscalYearStartMonth
  } = props;
  const isHistoryEmpty = !(history == null ? void 0 : history.length);
  const isContainerTall = isFullscreen && showHistory || !isFullscreen && (showHistory && !isHistoryEmpty || !hideQuickRanges);
  const styles = useStyles2(getStyles, isReversed, hideQuickRanges, isContainerTall, isFullscreen);
  const historyOptions = mapToHistoryOptions(history, timeZone);
  const timeOption = useTimeOption(value.raw, quickOptions);
  const [searchTerm, setSearchQuery] = useState("");
  const filteredQuickOptions = quickOptions.filter((o) => o.display.toLowerCase().includes(searchTerm.toLowerCase()));
  const onChangeTimeOption = (timeOption2) => {
    return onChange(mapOptionToTimeRange(timeOption2));
  };
  return /* @__PURE__ */ React__default.createElement("div", { id: "TimePickerContent", className: cx(styles.container, className) }, /* @__PURE__ */ React__default.createElement("div", { className: styles.body }, (!isFullscreen || !hideQuickRanges) && /* @__PURE__ */ React__default.createElement("div", { className: styles.rightSide }, /* @__PURE__ */ React__default.createElement("div", { className: styles.timeRangeFilter }, /* @__PURE__ */ React__default.createElement(
    FilterInput,
    {
      width: 0,
      value: searchTerm,
      onChange: setSearchQuery,
      placeholder: t("time-picker.content.filter-placeholder", "Search quick ranges")
    }
  )), /* @__PURE__ */ React__default.createElement("div", { className: styles.scrollContent }, !isFullscreen && /* @__PURE__ */ React__default.createElement(NarrowScreenForm, __spreadProps(__spreadValues({}, props), { historyOptions })), !hideQuickRanges && /* @__PURE__ */ React__default.createElement(TimeRangeList, { options: filteredQuickOptions, onChange: onChangeTimeOption, value: timeOption }))), isFullscreen && /* @__PURE__ */ React__default.createElement("div", { className: styles.leftSide }, /* @__PURE__ */ React__default.createElement(FullScreenForm, __spreadProps(__spreadValues({}, props), { historyOptions })))), !hideTimeZone && isFullscreen && /* @__PURE__ */ React__default.createElement(
    TimePickerFooter,
    {
      timeZone,
      fiscalYearStartMonth,
      onChangeTimeZone,
      onChangeFiscalYearStartMonth
    }
  ));
};
const TimePickerContent = (props) => {
  const { widthOverride } = props;
  const theme = useTheme2();
  const isFullscreen = (widthOverride || window.innerWidth) >= theme.breakpoints.values.lg;
  return /* @__PURE__ */ React__default.createElement(TimePickerContentWithScreenSize, __spreadProps(__spreadValues({}, props), { isFullscreen }));
};
const NarrowScreenForm = (props) => {
  const { value, hideQuickRanges, onChange, timeZone, historyOptions = [], showHistory, onError } = props;
  const styles = useStyles2(getNarrowScreenStyles);
  const isAbsolute = isDateTime(value.raw.from) || isDateTime(value.raw.to);
  const [collapsedFlag, setCollapsedFlag] = useState(!isAbsolute);
  const collapsed = hideQuickRanges ? false : collapsedFlag;
  const onChangeTimeOption = (timeOption) => {
    return onChange(mapOptionToTimeRange(timeOption, timeZone));
  };
  return /* @__PURE__ */ React__default.createElement("fieldset", null, /* @__PURE__ */ React__default.createElement("div", { className: styles.header }, /* @__PURE__ */ React__default.createElement(
    "button",
    {
      type: "button",
      className: styles.expandButton,
      onClick: () => {
        if (!hideQuickRanges) {
          setCollapsedFlag(!collapsed);
        }
      },
      "data-testid": selectors.components.TimePicker.absoluteTimeRangeTitle,
      "aria-expanded": !collapsed,
      "aria-controls": "expanded-timerange"
    },
    /* @__PURE__ */ React__default.createElement(TimePickerTitle, null, /* @__PURE__ */ React__default.createElement(Trans, { i18nKey: "time-picker.absolute.title" }, "Absolute time range")),
    !hideQuickRanges && /* @__PURE__ */ React__default.createElement(Icon, { name: !collapsed ? "angle-up" : "angle-down" })
  )), !collapsed && /* @__PURE__ */ React__default.createElement("div", { className: styles.body, id: "expanded-timerange" }, /* @__PURE__ */ React__default.createElement("div", { className: styles.form }, /* @__PURE__ */ React__default.createElement(
    TimeRangeContent,
    {
      value,
      onApply: onChange,
      timeZone,
      isFullscreen: false,
      onError
    }
  )), showHistory && /* @__PURE__ */ React__default.createElement(
    TimeRangeList,
    {
      title: t("time-picker.absolute.recent-title", "Recently used absolute ranges"),
      options: historyOptions,
      onChange: onChangeTimeOption,
      placeholderEmpty: null
    }
  )));
};
const FullScreenForm = (props) => {
  const { onChange, value, timeZone, fiscalYearStartMonth, isReversed, historyOptions, onError } = props;
  const styles = useStyles2(getFullScreenStyles, props.hideQuickRanges);
  const onChangeTimeOption = (timeOption) => {
    return onChange(mapOptionToTimeRange(timeOption, timeZone));
  };
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement("div", { className: styles.container }, /* @__PURE__ */ React__default.createElement("div", { className: styles.title, "data-testid": selectors.components.TimePicker.absoluteTimeRangeTitle }, /* @__PURE__ */ React__default.createElement(TimePickerTitle, null, /* @__PURE__ */ React__default.createElement(Trans, { i18nKey: "time-picker.absolute.title" }, "Absolute time range"))), /* @__PURE__ */ React__default.createElement(
    TimeRangeContent,
    {
      value,
      timeZone,
      fiscalYearStartMonth,
      onApply: onChange,
      isFullscreen: true,
      isReversed,
      onError
    }
  )), props.showHistory && /* @__PURE__ */ React__default.createElement("div", { className: styles.recent }, /* @__PURE__ */ React__default.createElement(
    TimeRangeList,
    {
      title: t("time-picker.absolute.recent-title", "Recently used absolute ranges"),
      options: historyOptions || [],
      onChange: onChangeTimeOption,
      placeholderEmpty: /* @__PURE__ */ React__default.createElement(EmptyRecentList, null)
    }
  )));
};
const EmptyRecentList = memo(() => {
  const styles = useStyles2(getEmptyListStyles);
  const emptyRecentListText = t(
    "time-picker.content.empty-recent-list-info",
    "It looks like you haven't used this time picker before. As soon as you enter some time intervals, recently used intervals will appear here."
  );
  return /* @__PURE__ */ React__default.createElement("div", { className: styles.container }, /* @__PURE__ */ React__default.createElement("div", null, /* @__PURE__ */ React__default.createElement("span", null, emptyRecentListText)), /* @__PURE__ */ React__default.createElement(Trans, { i18nKey: "time-picker.content.empty-recent-list-docs" }, /* @__PURE__ */ React__default.createElement("div", null, /* @__PURE__ */ React__default.createElement(
    "a",
    {
      className: styles.link,
      href: "https://grafana.com/docs/grafana/latest/dashboards/time-range-controls",
      target: "_new"
    },
    "Read the documentation"
  ), /* @__PURE__ */ React__default.createElement("span", null, " to find out more about how to enter custom time ranges."))));
});
function mapToHistoryOptions(ranges, timeZone) {
  if (!Array.isArray(ranges) || ranges.length === 0) {
    return [];
  }
  return ranges.map((range) => mapRangeToTimeOption(range, timeZone));
}
EmptyRecentList.displayName = "EmptyRecentList";
const useTimeOption = (raw, quickOptions) => {
  return useMemo(() => {
    if (!rangeUtil.isRelativeTimeRange(raw)) {
      return;
    }
    return quickOptions.find((option) => {
      return option.from === raw.from && option.to === raw.to;
    });
  }, [raw, quickOptions]);
};
const getStyles = (theme, isReversed, hideQuickRanges, isContainerTall, isFullscreen) => ({
  container: css({
    background: theme.colors.background.primary,
    boxShadow: theme.shadows.z3,
    width: `${isFullscreen ? "546px" : "262px"}`,
    borderRadius: theme.shape.radius.default,
    border: `1px solid ${theme.colors.border.weak}`,
    [`${isReversed ? "left" : "right"}`]: 0,
    display: "flex",
    flexDirection: "column"
  }),
  body: css({
    display: "flex",
    flexDirection: "row-reverse",
    height: `${isContainerTall ? "381px" : "217px"}`,
    maxHeight: "100vh"
  }),
  leftSide: css({
    display: "flex",
    flexDirection: "column",
    borderRight: `${isReversed ? "none" : `1px solid ${theme.colors.border.weak}`}`,
    width: `${!hideQuickRanges ? "60%" : "100%"}`,
    overflow: "auto",
    scrollbarWidth: "thin",
    order: isReversed ? 1 : 0
  }),
  rightSide: css({
    width: `${isFullscreen ? "40%" : "100%"}; !important`,
    borderRight: isReversed ? `1px solid ${theme.colors.border.weak}` : "none",
    display: "flex",
    flexDirection: "column"
  }),
  timeRangeFilter: css({
    padding: theme.spacing(1)
  }),
  spacing: css({
    marginTop: "16px"
  }),
  scrollContent: css({
    overflowY: "auto",
    scrollbarWidth: "thin"
  })
});
const getNarrowScreenStyles = (theme) => ({
  header: css({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: `1px solid ${theme.colors.border.weak}`,
    padding: "7px 9px 7px 9px"
  }),
  expandButton: css({
    backgroundColor: "transparent",
    border: "none",
    display: "flex",
    width: "100%",
    "&:focus-visible": getFocusStyles(theme)
  }),
  body: css({
    borderBottom: `1px solid ${theme.colors.border.weak}`
  }),
  form: css({
    padding: "7px 9px 7px 9px"
  })
});
const getFullScreenStyles = (theme, hideQuickRanges) => ({
  container: css({
    paddingTop: "9px",
    paddingLeft: "11px",
    paddingRight: !hideQuickRanges ? "20%" : "11px"
  }),
  title: css({
    marginBottom: "11px"
  }),
  recent: css({
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    paddingTop: theme.spacing(1)
  })
});
const getEmptyListStyles = (theme) => ({
  container: css({
    padding: "12px",
    margin: "12px",
    "a, span": {
      fontSize: "13px"
    }
  }),
  link: css({
    color: theme.colors.text.link
  })
});

export { TimePickerContent, TimePickerContentWithScreenSize };
//# sourceMappingURL=TimePickerContent.js.map
