import { cx, css } from '@emotion/css';
import React__default from 'react';
import { useTheme2 } from '../../themes/ThemeContext.js';
import { getInputStyles } from '../Input/Input.js';

const IndicatorsContainer = React__default.forwardRef((props, ref) => {
  const { children } = props;
  const theme = useTheme2();
  const styles = getInputStyles({ theme, invalid: false });
  return /* @__PURE__ */ React__default.createElement(
    "div",
    {
      className: cx(
        styles.suffix,
        css({
          position: "relative"
        })
      ),
      ref
    },
    children
  );
});
IndicatorsContainer.displayName = "IndicatorsContainer";

export { IndicatorsContainer };
//# sourceMappingURL=IndicatorsContainer.js.map
