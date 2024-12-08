import { cx } from '@emotion/css';
import { Global } from '@emotion/react';
import SliderComponent from 'rc-slider';
import React__default, { useCallback } from 'react';
import { useStyles2 } from '../../themes/ThemeContext.js';
import HandleTooltip from './HandleTooltip.js';
import { getStyles } from './styles.js';

const RangeSlider = ({
  min,
  max,
  onChange,
  onAfterChange,
  orientation = "horizontal",
  reverse,
  step,
  formatTooltipResult,
  value,
  tooltipAlwaysVisible = true
}) => {
  const handleChange = useCallback(
    (v) => {
      const value2 = typeof v === "number" ? [v, v] : v;
      onChange == null ? void 0 : onChange(value2);
    },
    [onChange]
  );
  const handleChangeComplete = useCallback(
    (v) => {
      const value2 = typeof v === "number" ? [v, v] : v;
      onAfterChange == null ? void 0 : onAfterChange(value2);
    },
    [onAfterChange]
  );
  const isHorizontal = orientation === "horizontal";
  const styles = useStyles2(getStyles, isHorizontal);
  const tipHandleRender = (node, handleProps) => {
    return /* @__PURE__ */ React__default.createElement(
      HandleTooltip,
      {
        value: handleProps.value,
        visible: tooltipAlwaysVisible || handleProps.dragging,
        tipFormatter: formatTooltipResult ? () => formatTooltipResult(handleProps.value) : void 0,
        placement: isHorizontal ? "top" : "right"
      },
      node
    );
  };
  return /* @__PURE__ */ React__default.createElement("div", { className: cx(styles.container, styles.slider) }, /* @__PURE__ */ React__default.createElement(Global, { styles: styles.tooltip }), /* @__PURE__ */ React__default.createElement(
    SliderComponent,
    {
      min,
      max,
      step,
      defaultValue: value,
      range: true,
      onChange: handleChange,
      onChangeComplete: handleChangeComplete,
      vertical: !isHorizontal,
      reverse,
      handleRender: tipHandleRender
    }
  ));
};
RangeSlider.displayName = "RangeSlider";

export { RangeSlider };
//# sourceMappingURL=RangeSlider.js.map
