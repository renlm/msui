import { cx, css } from '@emotion/css';
import { uniqueId } from 'lodash';
import React__default, { PureComponent } from 'react';
import '@grafana/data';
import { withTheme2 } from '../../../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../../../utils/skeleton.js';
import { Icon } from '../../../Icon/Icon.js';
import { Tooltip } from '../../../Tooltip/Tooltip.js';

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class UnthemedSwitch extends PureComponent {
  constructor() {
    super(...arguments);
    __publicField(this, "state", {
      id: uniqueId()
    });
    __publicField(this, "internalOnChange", (event) => {
      event.stopPropagation();
      this.props.onChange(event);
    });
  }
  render() {
    const {
      labelClass = "",
      switchClass = "",
      label,
      checked,
      disabled,
      transparent,
      className,
      theme,
      tooltip,
      tooltipPlacement
    } = this.props;
    const styles = getStyles(theme);
    const labelId = this.state.id;
    const labelClassName = `gf-form-label ${labelClass} ${transparent ? "gf-form-label--transparent" : ""} pointer`;
    const switchClassName = cx(styles.switch, switchClass, {
      [styles.switchTransparent]: transparent
    });
    return /* @__PURE__ */ React__default.createElement("div", { className: styles.container }, /* @__PURE__ */ React__default.createElement("label", { htmlFor: labelId, className: cx("gf-form", styles.labelContainer, className) }, label && /* @__PURE__ */ React__default.createElement("div", { className: labelClassName }, label, tooltip && /* @__PURE__ */ React__default.createElement(Tooltip, { placement: tooltipPlacement ? tooltipPlacement : "auto", content: tooltip, theme: "info" }, /* @__PURE__ */ React__default.createElement(Icon, { name: "info-circle", size: "sm", style: { marginLeft: "10px" } }))), /* @__PURE__ */ React__default.createElement("div", { className: switchClassName }, /* @__PURE__ */ React__default.createElement(
      "input",
      {
        disabled,
        id: labelId,
        type: "checkbox",
        checked,
        onChange: this.internalOnChange
      }
    ), /* @__PURE__ */ React__default.createElement("span", { className: styles.slider }))));
  }
}
const Switch = withTheme2(UnthemedSwitch);
const getStyles = (theme) => {
  const slider = css({
    background: theme.v1.palette.gray1,
    borderRadius: theme.shape.radius.pill,
    height: "16px",
    width: "32px",
    display: "block",
    position: "relative",
    "&::before": {
      position: "absolute",
      content: "''",
      height: "12px",
      width: "12px",
      left: "2px",
      top: "2px",
      background: theme.components.input.background,
      transition: "0.4s",
      borderRadius: theme.shape.radius.circle,
      boxShadow: theme.shadows.z1
    }
  });
  return {
    container: css({
      display: "flex",
      flexShrink: 0
    }),
    labelContainer: css({
      display: "flex",
      cursor: "pointer",
      marginRight: theme.spacing(0.5)
    }),
    switch: css({
      display: "flex",
      position: "relative",
      width: "56px",
      height: theme.spacing(4),
      background: theme.components.input.background,
      border: `1px solid ${theme.components.input.borderColor}`,
      borderRadius: theme.shape.radius.default,
      alignItems: "center",
      justifyContent: "center",
      input: {
        opacity: 0,
        width: 0,
        height: 0
      },
      [`input:checked + .${slider}`]: {
        background: theme.colors.primary.main
      },
      [`input:checked + .${slider}::before`]: {
        transform: "translateX(16px)"
      }
    }),
    switchTransparent: css({
      background: "transparent",
      border: 0,
      width: "40px"
    }),
    slider
  };
};

export { Switch };
//# sourceMappingURL=Switch.js.map
