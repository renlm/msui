import { cx, css } from '@emotion/css';
import { uniqueId } from 'lodash';
import React__default from 'react';
import '@grafana/data';
import { useStyles2 } from '../../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../../utils/skeleton.js';
import { RadioButtonDot } from './RadioButtonDot.js';

function RadioButtonList({
  name,
  id,
  options,
  value,
  onChange,
  className,
  disabled,
  disabledOptions = []
}) {
  const styles = useStyles2(getStyles);
  const internalId = id != null ? id : uniqueId("radiogroup-list-");
  return /* @__PURE__ */ React__default.createElement("div", { id, className: cx(styles.container, className), role: "radiogroup" }, options.map((option, index) => {
    const itemId = `${internalId}-${index}`;
    const isChecked = value && value === option.value;
    const isDisabled = disabled || disabledOptions.some((optionValue) => optionValue === option.value);
    const handleChange = () => onChange && option.value && onChange(option.value);
    return /* @__PURE__ */ React__default.createElement(
      RadioButtonDot,
      {
        key: index,
        id: itemId,
        name,
        label: option.label,
        description: option.description,
        checked: isChecked,
        value: option.value,
        disabled: isDisabled,
        onChange: handleChange
      }
    );
  }));
}
const getStyles = (theme) => ({
  container: css({
    display: "grid",
    gap: theme.spacing(1)
  })
});

export { RadioButtonList };
//# sourceMappingURL=RadioButtonList.js.map
