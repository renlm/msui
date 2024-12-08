import { css } from '@emotion/css';
import React__default from 'react';
import { IconButton } from '../../IconButton/IconButton.js';
import { useStyles2 } from '../../../themes/ThemeContext.js';

const CloseButton = ({ onClick, "aria-label": ariaLabel, style }) => {
  const styles = useStyles2(getStyles);
  return /* @__PURE__ */ React__default.createElement(IconButton, { "aria-label": ariaLabel != null ? ariaLabel : "Close", className: styles, name: "times", onClick, style });
};
const getStyles = (theme) => css({
  position: "absolute",
  margin: "0px",
  right: theme.spacing(1),
  top: theme.spacing(1.25)
});

export { CloseButton };
//# sourceMappingURL=CloseButton.js.map
