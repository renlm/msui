import { cx } from '@emotion/css';
import React__default, { PureComponent } from 'react';
import { clearButtonStyles } from '../Button/Button.js';
import '../Button/ButtonGroup.js';
import { FormattedValueDisplay } from '../FormattedValueDisplay/FormattedValueDisplay.js';
import { buildLayout } from './BigValueLayout.js';
import { PercentChange } from './PercentChange.js';

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var BigValueColorMode = /* @__PURE__ */ ((BigValueColorMode2) => {
  BigValueColorMode2["Background"] = "background";
  BigValueColorMode2["BackgroundSolid"] = "background_solid";
  BigValueColorMode2["None"] = "none";
  BigValueColorMode2["Value"] = "value";
  return BigValueColorMode2;
})(BigValueColorMode || {});
var BigValueGraphMode = /* @__PURE__ */ ((BigValueGraphMode2) => {
  BigValueGraphMode2["None"] = "none";
  BigValueGraphMode2["Line"] = "line";
  BigValueGraphMode2["Area"] = "area";
  return BigValueGraphMode2;
})(BigValueGraphMode || {});
var BigValueJustifyMode = /* @__PURE__ */ ((BigValueJustifyMode2) => {
  BigValueJustifyMode2["Auto"] = "auto";
  BigValueJustifyMode2["Center"] = "center";
  return BigValueJustifyMode2;
})(BigValueJustifyMode || {});
var BigValueTextMode = /* @__PURE__ */ ((BigValueTextMode2) => {
  BigValueTextMode2["Auto"] = "auto";
  BigValueTextMode2["Value"] = "value";
  BigValueTextMode2["ValueAndName"] = "value_and_name";
  BigValueTextMode2["Name"] = "name";
  BigValueTextMode2["None"] = "none";
  return BigValueTextMode2;
})(BigValueTextMode || {});
class BigValue extends PureComponent {
  render() {
    const { onClick, className, hasLinks, theme } = this.props;
    const layout = buildLayout(this.props);
    const panelStyles = layout.getPanelStyles();
    const valueAndTitleContainerStyles = layout.getValueAndTitleContainerStyles();
    const valueStyles = layout.getValueStyles();
    const titleStyles = layout.getTitleStyles();
    const textValues = layout.textValues;
    const percentChange = this.props.value.percentChange;
    const percentChangeColorMode = this.props.percentChangeColorMode;
    const showPercentChange = percentChange != null && !Number.isNaN(percentChange);
    const tooltip = hasLinks ? void 0 : textValues.tooltip;
    if (!onClick) {
      return /* @__PURE__ */ React__default.createElement("div", { className, style: panelStyles, title: tooltip }, /* @__PURE__ */ React__default.createElement("div", { style: valueAndTitleContainerStyles }, textValues.title && /* @__PURE__ */ React__default.createElement("div", { style: titleStyles }, textValues.title), /* @__PURE__ */ React__default.createElement(FormattedValueDisplay, { value: textValues, style: valueStyles }), showPercentChange && /* @__PURE__ */ React__default.createElement(
        PercentChange,
        {
          percentChange,
          styles: layout.getPercentChangeStyles(percentChange, percentChangeColorMode, valueStyles)
        }
      )), layout.renderChart());
    }
    return /* @__PURE__ */ React__default.createElement(
      "button",
      {
        type: "button",
        className: cx(clearButtonStyles(theme), className),
        style: panelStyles,
        onClick,
        title: tooltip
      },
      /* @__PURE__ */ React__default.createElement("div", { style: valueAndTitleContainerStyles }, textValues.title && /* @__PURE__ */ React__default.createElement("div", { style: titleStyles }, textValues.title), /* @__PURE__ */ React__default.createElement(FormattedValueDisplay, { value: textValues, style: valueStyles })),
      layout.renderChart()
    );
  }
}
__publicField(BigValue, "defaultProps", {
  justifyMode: "auto" /* Auto */
});

export { BigValue, BigValueColorMode, BigValueGraphMode, BigValueJustifyMode, BigValueTextMode };
//# sourceMappingURL=BigValue.js.map
