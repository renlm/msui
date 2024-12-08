import { cx, css } from '@emotion/css';
import { isString } from 'lodash';
import React__default, { useState, useCallback } from 'react';
import { getTimeZoneInfo } from '@grafana/data';
import { selectors } from '@grafana/e2e-selectors';
import { useStyles2 } from '../../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../../utils/skeleton.js';
import { t, Trans } from '../../../utils/i18n.js';
import { Button } from '../../Button/Button.js';
import '../../Button/ButtonGroup.js';
import { Field } from '../../Forms/Field.js';
import { RadioButtonGroup } from '../../Forms/RadioButtonGroup/RadioButtonGroup.js';
import { Select } from '../../Select/Select.js';
import { TimeZonePicker } from '../TimeZonePicker.js';
import { TimeZoneDescription } from '../TimeZonePicker/TimeZoneDescription.js';
import { TimeZoneOffset } from '../TimeZonePicker/TimeZoneOffset.js';
import { TimeZoneTitle } from '../TimeZonePicker/TimeZoneTitle.js';
import { monthOptions } from '../options.js';

const TimePickerFooter = (props) => {
  const {
    timeZone,
    fiscalYearStartMonth,
    timestamp = Date.now(),
    onChangeTimeZone,
    onChangeFiscalYearStartMonth
  } = props;
  const [isEditing, setEditing] = useState(false);
  const [editMode, setEditMode] = useState("tz");
  const onToggleChangeTimeSettings = useCallback(
    (event) => {
      if (event) {
        event.stopPropagation();
      }
      setEditing(!isEditing);
    },
    [isEditing, setEditing]
  );
  const style = useStyles2(getStyle);
  if (!isString(timeZone)) {
    return null;
  }
  const info = getTimeZoneInfo(timeZone, timestamp);
  if (!info) {
    return null;
  }
  return /* @__PURE__ */ React__default.createElement("div", null, /* @__PURE__ */ React__default.createElement(
    "section",
    {
      "aria-label": t("time-picker.footer.time-zone-selection", "Time zone selection"),
      className: style.container
    },
    /* @__PURE__ */ React__default.createElement("div", { className: style.timeZoneContainer }, /* @__PURE__ */ React__default.createElement("div", { className: style.timeZone }, /* @__PURE__ */ React__default.createElement(TimeZoneTitle, { title: info.name }), /* @__PURE__ */ React__default.createElement("div", { className: style.spacer }), /* @__PURE__ */ React__default.createElement(TimeZoneDescription, { info })), /* @__PURE__ */ React__default.createElement(TimeZoneOffset, { timeZone, timestamp })),
    /* @__PURE__ */ React__default.createElement("div", { className: style.spacer }),
    /* @__PURE__ */ React__default.createElement(
      Button,
      {
        "data-testid": selectors.components.TimeZonePicker.changeTimeSettingsButton,
        variant: "secondary",
        onClick: onToggleChangeTimeSettings,
        size: "sm"
      },
      /* @__PURE__ */ React__default.createElement(Trans, { i18nKey: "time-picker.footer.change-settings-button" }, "Change time settings")
    )
  ), isEditing ? /* @__PURE__ */ React__default.createElement("div", { className: style.editContainer }, /* @__PURE__ */ React__default.createElement("div", null, /* @__PURE__ */ React__default.createElement(
    RadioButtonGroup,
    {
      value: editMode,
      options: [
        { label: t("time-picker.footer.time-zone-option", "Time zone"), value: "tz" },
        { label: t("time-picker.footer.fiscal-year-option", "Fiscal year"), value: "fy" }
      ],
      onChange: setEditMode
    }
  )), editMode === "tz" ? /* @__PURE__ */ React__default.createElement(
    "section",
    {
      "data-testid": selectors.components.TimeZonePicker.containerV2,
      className: cx(style.timeZoneContainer, style.timeSettingContainer)
    },
    /* @__PURE__ */ React__default.createElement(
      TimeZonePicker,
      {
        includeInternal: true,
        onChange: (timeZone2) => {
          onToggleChangeTimeSettings();
          if (isString(timeZone2)) {
            onChangeTimeZone(timeZone2);
          }
        },
        onBlur: onToggleChangeTimeSettings,
        menuShouldPortal: false
      }
    )
  ) : /* @__PURE__ */ React__default.createElement(
    "section",
    {
      "data-testid": selectors.components.TimeZonePicker.containerV2,
      className: cx(style.timeZoneContainer, style.timeSettingContainer)
    },
    /* @__PURE__ */ React__default.createElement(
      Field,
      {
        className: style.fiscalYearField,
        label: t("time-picker.footer.fiscal-year-start", "Fiscal year start month")
      },
      /* @__PURE__ */ React__default.createElement(
        Select,
        {
          value: fiscalYearStartMonth,
          menuShouldPortal: false,
          options: monthOptions,
          onChange: (value) => {
            var _a;
            if (onChangeFiscalYearStartMonth) {
              onChangeFiscalYearStartMonth((_a = value.value) != null ? _a : 0);
            }
          }
        }
      )
    )
  )) : null);
};
const getStyle = (theme) => ({
  container: css({
    borderTop: `1px solid ${theme.colors.border.weak}`,
    padding: "11px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }),
  editContainer: css({
    borderTop: `1px solid ${theme.colors.border.weak}`,
    padding: "11px",
    justifyContent: "space-between",
    alignItems: "center"
  }),
  spacer: css({
    marginLeft: "7px"
  }),
  timeSettingContainer: css({
    paddingTop: theme.spacing(1)
  }),
  fiscalYearField: css({
    marginBottom: 0
  }),
  timeZoneContainer: css({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexGrow: 1
  }),
  timeZone: css({
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    flexGrow: 1
  })
});

export { TimePickerFooter };
//# sourceMappingURL=TimePickerFooter.js.map
