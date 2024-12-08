import { css } from '@emotion/css';
import React__default, { memo } from 'react';
import '@grafana/data';
import { useStyles2 } from '../../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../../utils/skeleton.js';

const getStyles = (theme) => {
  return {
    text: css({
      fontSize: theme.typography.size.md,
      fontWeight: theme.typography.fontWeightMedium,
      color: theme.colors.text.primary,
      margin: 0,
      display: "flex"
    })
  };
};
const TimePickerTitle = memo(({ children }) => {
  const styles = useStyles2(getStyles);
  return /* @__PURE__ */ React__default.createElement("h3", { className: styles.text }, children);
});
TimePickerTitle.displayName = "TimePickerTitle";

export { TimePickerTitle };
//# sourceMappingURL=TimePickerTitle.js.map
