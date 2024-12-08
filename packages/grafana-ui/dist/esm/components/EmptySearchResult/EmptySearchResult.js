import { css } from '@emotion/css';
import React__default from 'react';
import '@grafana/data';
import { useStyles2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';

const EmptySearchResult = ({ children }) => {
  const styles = useStyles2(getStyles);
  return /* @__PURE__ */ React__default.createElement("div", { className: styles.container }, children);
};
const getStyles = (theme) => {
  return {
    container: css({
      borderLeft: `3px solid ${theme.colors.info.main}`,
      backgroundColor: `${theme.colors.background.secondary}`,
      padding: theme.spacing(2),
      minWidth: "350px",
      borderRadius: theme.shape.radius.default,
      marginBottom: theme.spacing(4)
    })
  };
};

export { EmptySearchResult };
//# sourceMappingURL=EmptySearchResult.js.map
