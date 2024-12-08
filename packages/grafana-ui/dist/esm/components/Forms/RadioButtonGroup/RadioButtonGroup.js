import { cx, css } from '@emotion/css';
import { uniqueId } from 'lodash';
import React__default, { useCallback, useRef, useEffect } from 'react';
import { toIconName } from '@grafana/data';
import { useStyles2 } from '../../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../../utils/skeleton.js';
import { Icon } from '../../Icon/Icon.js';
import { RadioButton } from './RadioButton.js';

function RadioButtonGroup({
  options,
  value,
  onChange,
  onClick,
  disabled,
  disabledOptions,
  size = "md",
  id,
  className,
  fullWidth = false,
  autoFocus = false,
  "aria-label": ariaLabel,
  invalid = false
}) {
  const handleOnChange = useCallback(
    (option) => {
      return () => {
        if (onChange) {
          onChange(option.value);
        }
      };
    },
    [onChange]
  );
  const handleOnClick = useCallback(
    (option) => {
      return () => {
        if (onClick) {
          onClick(option.value);
        }
      };
    },
    [onClick]
  );
  const internalId = id != null ? id : uniqueId("radiogroup-");
  const groupName = useRef(internalId);
  const styles = useStyles2(getStyles);
  const activeButtonRef = useRef(null);
  useEffect(() => {
    if (autoFocus && activeButtonRef.current) {
      activeButtonRef.current.focus();
    }
  }, [autoFocus]);
  return /* @__PURE__ */ React__default.createElement(
    "div",
    {
      role: "radiogroup",
      "aria-label": ariaLabel,
      className: cx(styles.radioGroup, fullWidth && styles.fullWidth, invalid && styles.invalid, className)
    },
    options.map((opt, i) => {
      const isItemDisabled = disabledOptions && opt.value && disabledOptions.includes(opt.value);
      const icon = opt.icon ? toIconName(opt.icon) : void 0;
      const hasNonIconPart = Boolean(opt.imgUrl || opt.label || opt.component);
      return /* @__PURE__ */ React__default.createElement(
        RadioButton,
        {
          size,
          disabled: isItemDisabled || disabled,
          active: value === opt.value,
          key: `o.label-${i}`,
          "aria-label": opt.ariaLabel,
          onChange: handleOnChange(opt),
          onClick: handleOnClick(opt),
          id: `option-${opt.value}-${internalId}`,
          name: groupName.current,
          description: opt.description,
          fullWidth,
          ref: value === opt.value ? activeButtonRef : void 0
        },
        icon && /* @__PURE__ */ React__default.createElement(Icon, { name: icon, className: cx(hasNonIconPart && styles.icon) }),
        opt.imgUrl && /* @__PURE__ */ React__default.createElement("img", { src: opt.imgUrl, alt: opt.label, className: styles.img }),
        opt.label,
        " ",
        opt.component ? /* @__PURE__ */ React__default.createElement(opt.component, null) : null
      );
    })
  );
}
RadioButtonGroup.displayName = "RadioButtonGroup";
const getStyles = (theme) => {
  return {
    radioGroup: css({
      display: "inline-flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      border: `1px solid ${theme.components.input.borderColor}`,
      borderRadius: theme.shape.radius.default,
      padding: "2px"
    }),
    fullWidth: css({
      display: "flex"
    }),
    icon: css({
      marginRight: "6px"
    }),
    img: css({
      width: theme.spacing(2),
      height: theme.spacing(2),
      marginRight: theme.spacing(1)
    }),
    invalid: css({
      border: `1px solid ${theme.colors.error.border}`
    })
  };
};

export { RadioButtonGroup };
//# sourceMappingURL=RadioButtonGroup.js.map
