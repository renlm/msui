import { css } from '@emotion/css';
import React__default from 'react';
import '@grafana/data';
import { useStyles2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';

function MenuDivider() {
  const styles = useStyles2(getStyles);
  return /* @__PURE__ */ React__default.createElement("div", { className: styles.divider });
}
const getStyles = (theme) => {
  return {
    divider: css({
      height: 1,
      backgroundColor: theme.colors.border.weak,
      margin: theme.spacing(0.5, 0)
    })
  };
};

export { MenuDivider };
//# sourceMappingURL=MenuDivider.js.map
