import { cx, css } from '@emotion/css';
import RcTimePicker from 'rc-time-picker';
import React__default from 'react';
import { dateTimeAsMoment, isDateTimeInput, dateTime } from '@grafana/data';
import { useStyles2 } from '../../themes/ThemeContext.js';
import { getFocusStyles } from '../../themes/mixins.js';
import { inputSizes } from '../Forms/commonStyles.js';
import { Icon } from '../Icon/Icon.js';
import 'rc-time-picker/assets/index.css';

const POPUP_CLASS_NAME = "time-of-day-picker-panel";
const TimeOfDayPicker = ({
  minuteStep = 1,
  showHour = true,
  showSeconds = false,
  onChange,
  value,
  size = "auto",
  disabled,
  disabledHours,
  disabledMinutes,
  disabledSeconds
}) => {
  const styles = useStyles2(getStyles);
  return /* @__PURE__ */ React__default.createElement(
    RcTimePicker,
    {
      className: cx(inputSizes()[size], styles.input),
      popupClassName: cx(styles.picker, POPUP_CLASS_NAME),
      defaultValue: dateTimeAsMoment(),
      onChange: (value2) => {
        if (isDateTimeInput(value2)) {
          return onChange(dateTime(value2));
        }
      },
      allowEmpty: false,
      showSecond: showSeconds,
      value: dateTimeAsMoment(value),
      showHour,
      minuteStep,
      inputIcon: /* @__PURE__ */ React__default.createElement(Caret, { wrapperStyle: styles.caretWrapper }),
      disabled,
      disabledHours,
      disabledMinutes,
      disabledSeconds
    }
  );
};
const Caret = ({ wrapperStyle = "" }) => {
  return /* @__PURE__ */ React__default.createElement("div", { className: wrapperStyle }, /* @__PURE__ */ React__default.createElement(Icon, { name: "angle-down" }));
};
const getStyles = (theme) => {
  const bgColor = theme.components.input.background;
  const menuShadowColor = theme.v1.palette.black;
  const optionBgHover = theme.colors.background.secondary;
  const borderRadius = theme.shape.radius.default;
  const borderColor = theme.components.input.borderColor;
  return {
    caretWrapper: css({
      position: "absolute",
      right: "8px",
      top: "50%",
      transform: "translateY(-50%)",
      display: "inline-block",
      textAlign: "right",
      color: theme.colors.text.secondary
    }),
    picker: css({
      ".rc-time-picker-panel-select": {
        fontSize: "14px",
        backgroundColor: bgColor,
        color: theme.colors.text.secondary,
        borderColor,
        li: {
          outlineWidth: "2px",
          "&.rc-time-picker-panel-select-option-selected": {
            backgroundColor: "inherit",
            border: `1px solid ${theme.v1.palette.orange}`,
            borderRadius,
            color: theme.colors.text.primary
          },
          "&:hover": {
            background: optionBgHover,
            color: theme.colors.text.primary
          },
          "&.rc-time-picker-panel-select-option-disabled": {
            color: theme.colors.action.disabledText
          }
        }
      },
      ".rc-time-picker-panel-inner": {
        boxShadow: `0px 4px 4px ${menuShadowColor}`,
        backgroundColor: bgColor,
        borderColor,
        borderRadius,
        marginTop: "3px",
        ".rc-time-picker-panel-input-wrap": {
          marginRight: "2px",
          "&, .rc-time-picker-panel-input": {
            backgroundColor: bgColor,
            paddingTop: "2px"
          }
        },
        ".rc-time-picker-panel-combobox": {
          display: "flex"
        }
      }
    }),
    input: css({
      ".rc-time-picker-input": {
        backgroundColor: bgColor,
        borderRadius,
        borderColor,
        color: theme.colors.text.primary,
        height: theme.spacing(4),
        "&:focus": getFocusStyles(theme),
        "&:disabled": {
          backgroundColor: theme.colors.action.disabledBackground,
          color: theme.colors.action.disabledText,
          border: `1px solid ${theme.colors.action.disabledBackground}`,
          "&:focus": {
            boxShadow: "none"
          }
        }
      }
    })
  };
};

export { POPUP_CLASS_NAME, TimeOfDayPicker };
//# sourceMappingURL=TimeOfDayPicker.js.map
