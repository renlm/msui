import { css } from '@emotion/css';
import React__default from 'react';
import { locale } from '@grafana/data';
import { useStyles2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';

const Counter = ({ value }) => {
  const styles = useStyles2(getStyles);
  return /* @__PURE__ */ React__default.createElement("span", { className: styles.counter }, locale(value, 0).text);
};
const getStyles = (theme) => ({
  counter: css({
    label: "counter",
    marginLeft: theme.spacing(1),
    borderRadius: theme.spacing(3),
    backgroundColor: theme.colors.action.hover,
    padding: theme.spacing(0.25, 1),
    color: theme.colors.text.secondary,
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: theme.typography.size.sm
  })
});

export { Counter };
//# sourceMappingURL=Counter.js.map
