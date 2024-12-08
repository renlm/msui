import { css } from '@emotion/css';
import React__default from 'react';
import { selectors } from '@grafana/e2e-selectors';
import '@grafana/data';
import { useStyles2 } from '../../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import { getFocusStyles, getMouseFocusStyles } from '../../../themes/mixins.js';
import '../../../utils/skeleton.js';
import { Tooltip } from '../../Tooltip/Tooltip.js';
import { getPropertiesForButtonSize } from '../commonStyles.js';

const RadioButton = React__default.forwardRef(
  ({
    children,
    active = false,
    disabled = false,
    size = "md",
    onChange,
    onClick,
    id,
    name = void 0,
    description,
    fullWidth,
    "aria-label": ariaLabel
  }, ref) => {
    const styles = useStyles2(getRadioButtonStyles, size, fullWidth);
    const inputRadioButton = /* @__PURE__ */ React__default.createElement(
      "input",
      {
        type: "radio",
        className: styles.radio,
        onChange,
        onClick,
        disabled,
        id,
        checked: active,
        name,
        "aria-label": ariaLabel,
        ref
      }
    );
    return description ? /* @__PURE__ */ React__default.createElement("div", { className: styles.radioOption, "data-testid": selectors.components.RadioButton.container }, /* @__PURE__ */ React__default.createElement(Tooltip, { content: description, placement: "bottom" }, inputRadioButton), /* @__PURE__ */ React__default.createElement("label", { className: styles.radioLabel, htmlFor: id, title: description || ariaLabel }, children)) : /* @__PURE__ */ React__default.createElement("div", { className: styles.radioOption, "data-testid": selectors.components.RadioButton.container }, inputRadioButton, /* @__PURE__ */ React__default.createElement("label", { className: styles.radioLabel, htmlFor: id, title: description || ariaLabel }, children));
  }
);
RadioButton.displayName = "RadioButton";
const getRadioButtonStyles = (theme, size, fullWidth) => {
  const { fontSize, height, padding } = getPropertiesForButtonSize(size, theme);
  const textColor = theme.colors.text.secondary;
  const textColorHover = theme.colors.text.primary;
  const labelHeight = height * theme.spacing.gridSize - 4 - 2;
  return {
    radioOption: css({
      display: "flex",
      justifyContent: "space-between",
      position: "relative",
      flex: fullWidth ? `1 0 0` : "none",
      textAlign: "center"
    }),
    radio: css({
      position: "absolute",
      opacity: 0,
      zIndex: 2,
      width: "100% !important",
      height: "100%",
      cursor: "pointer",
      "&:checked + label": {
        color: theme.colors.text.primary,
        fontWeight: theme.typography.fontWeightMedium,
        background: theme.colors.action.selected,
        zIndex: 1
      },
      "&:focus + label, &:focus-visible + label": getFocusStyles(theme),
      "&:focus:not(:focus-visible) + label": getMouseFocusStyles(),
      "&:disabled + label": {
        color: theme.colors.text.disabled,
        cursor: "not-allowed"
      }
    }),
    radioLabel: css({
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize,
      height: `${labelHeight}px`,
      // Deduct border from line-height for perfect vertical centering on windows and linux
      lineHeight: `${labelHeight}px`,
      color: textColor,
      padding: theme.spacing(0, padding),
      borderRadius: theme.shape.radius.default,
      background: theme.colors.background.primary,
      cursor: "pointer",
      userSelect: "none",
      whiteSpace: "nowrap",
      flexGrow: 1,
      "&:hover": {
        color: textColorHover
      }
    })
  };
};

export { RadioButton };
//# sourceMappingURL=RadioButton.js.map
