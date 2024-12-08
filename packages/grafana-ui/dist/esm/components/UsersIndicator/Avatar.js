import { css } from '@emotion/css';
import React__default from 'react';
import '@grafana/data';
import { useStyles2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';
import { getResponsiveStyle } from '../Layout/utils/responsiveness.js';

const Avatar = ({ src, alt, width, height }) => {
  const styles = useStyles2(getStyles, width, height);
  return /* @__PURE__ */ React__default.createElement("img", { className: styles.image, src, alt });
};
const getStyles = (theme, width = 3, height = 3) => {
  return {
    image: css([
      getResponsiveStyle(theme, width, (val) => ({
        width: theme.spacing(val)
      })),
      getResponsiveStyle(theme, height, (val) => ({
        height: theme.spacing(val)
      })),
      { borderRadius: theme.shape.radius.circle }
    ])
  };
};

export { Avatar };
//# sourceMappingURL=Avatar.js.map
