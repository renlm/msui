import { cx, css } from '@emotion/css';
import React__default, { memo } from 'react';
import { v4 } from 'uuid';
import { useStyles2 } from '../../../themes/ThemeContext.js';
import { getFocusStyles } from '../../../themes/mixins.js';

const getStyles = (theme) => {
  return {
    container: css({
      display: "flex",
      alignItems: "center",
      flexDirection: "row-reverse",
      justifyContent: "space-between"
    }),
    selected: css({
      background: theme.colors.action.selected,
      fontWeight: theme.typography.fontWeightMedium
    }),
    radio: css({
      opacity: 0,
      width: "0 !important",
      "&:focus-visible + label": getFocusStyles(theme)
    }),
    label: css({
      cursor: "pointer",
      flex: 1,
      padding: "7px 9px 7px 9px",
      "&:hover": {
        background: theme.colors.action.hover,
        cursor: "pointer"
      }
    })
  };
};
const TimeRangeOption = memo(({ value, onSelect, selected = false, name }) => {
  const styles = useStyles2(getStyles);
  const id = v4();
  return /* @__PURE__ */ React__default.createElement("li", { className: cx(styles.container, selected && styles.selected) }, /* @__PURE__ */ React__default.createElement(
    "input",
    {
      className: styles.radio,
      checked: selected,
      name,
      type: "checkbox",
      "data-role": "item",
      tabIndex: -1,
      id,
      onChange: () => onSelect(value)
    }
  ), /* @__PURE__ */ React__default.createElement("label", { className: styles.label, htmlFor: id }, value.display));
});
TimeRangeOption.displayName = "TimeRangeOption";

export { TimeRangeOption };
//# sourceMappingURL=TimeRangeOption.js.map
