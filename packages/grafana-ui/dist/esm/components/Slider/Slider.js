import { cx } from '@emotion/css';
import { Global } from '@emotion/react';
import SliderComponent from 'rc-slider';
import React__default, { useState, useCallback } from 'react';
import { useStyles2 } from '../../themes/ThemeContext.js';
import { Input } from '../Input/Input.js';
import { getStyles } from './styles.js';

const Slider = ({
  min,
  max,
  onChange,
  onAfterChange,
  orientation = "horizontal",
  reverse,
  step,
  value,
  ariaLabelForHandle,
  marks,
  included
}) => {
  const isHorizontal = orientation === "horizontal";
  const styles = useStyles2(getStyles, isHorizontal, Boolean(marks));
  const SliderWithTooltip = SliderComponent;
  const [sliderValue, setSliderValue] = useState(value != null ? value : min);
  const onSliderChange = useCallback(
    (v) => {
      const value2 = typeof v === "number" ? v : v[0];
      setSliderValue(value2);
      onChange == null ? void 0 : onChange(value2);
    },
    [setSliderValue, onChange]
  );
  const onSliderInputChange = useCallback(
    (e) => {
      let v = +e.target.value;
      if (Number.isNaN(v)) {
        v = 0;
      }
      setSliderValue(v);
      if (onChange) {
        onChange(v);
      }
      if (onAfterChange) {
        onAfterChange(v);
      }
    },
    [onChange, onAfterChange]
  );
  const onSliderInputBlur = useCallback(
    (e) => {
      const v = +e.target.value;
      if (v > max) {
        setSliderValue(max);
      } else if (v < min) {
        setSliderValue(min);
      }
    },
    [max, min]
  );
  const handleChangeComplete = useCallback(
    (v) => {
      const value2 = typeof v === "number" ? v : v[0];
      onAfterChange == null ? void 0 : onAfterChange(value2);
    },
    [onAfterChange]
  );
  const sliderInputClassNames = !isHorizontal ? [styles.sliderInputVertical] : [];
  const sliderInputFieldClassNames = !isHorizontal ? [styles.sliderInputFieldVertical] : [];
  return /* @__PURE__ */ React__default.createElement("div", { className: cx(styles.container, styles.slider) }, /* @__PURE__ */ React__default.createElement(Global, { styles: styles.tooltip }), /* @__PURE__ */ React__default.createElement("div", { className: cx(styles.sliderInput, ...sliderInputClassNames) }, /* @__PURE__ */ React__default.createElement(
    SliderWithTooltip,
    {
      min,
      max,
      step,
      defaultValue: value,
      value: sliderValue,
      onChange: onSliderChange,
      onChangeComplete: handleChangeComplete,
      vertical: !isHorizontal,
      reverse,
      ariaLabelForHandle,
      marks,
      included
    }
  ), /* @__PURE__ */ React__default.createElement(
    Input,
    {
      type: "text",
      className: cx(styles.sliderInputField, ...sliderInputFieldClassNames),
      value: sliderValue,
      onChange: onSliderInputChange,
      onBlur: onSliderInputBlur,
      min,
      max
    }
  )));
};
Slider.displayName = "Slider";

export { Slider };
//# sourceMappingURL=Slider.js.map
