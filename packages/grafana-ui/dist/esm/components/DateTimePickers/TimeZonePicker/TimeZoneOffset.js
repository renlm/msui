import { cx, css } from '@emotion/css';
import { isString } from 'lodash';
import React__default from 'react';
import { dateTimeFormat } from '@grafana/data';
import { useStyles2 } from '../../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../../utils/skeleton.js';

const TimeZoneOffset = (props) => {
  const { timestamp, timeZone, className } = props;
  const styles = useStyles2(getStyles);
  if (!isString(timeZone)) {
    return null;
  }
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement("span", { className: cx(styles.offset, className) }, formatUtcOffset(timestamp, timeZone)));
};
const formatUtcOffset = (timestamp, timeZone) => {
  const offset = dateTimeFormat(timestamp, {
    timeZone,
    format: "Z"
  });
  return `UTC${offset}`;
};
const getStyles = (theme) => {
  const textBase = css({
    fontWeight: "normal",
    fontSize: theme.typography.size.sm,
    color: theme.colors.text.secondary,
    whiteSpace: "normal"
  });
  return {
    offset: css(textBase, {
      color: theme.colors.text.primary,
      background: theme.colors.background.secondary,
      padding: "2px 5px",
      borderRadius: theme.shape.radius.default,
      marginLeft: "4px"
    })
  };
};

export { TimeZoneOffset, formatUtcOffset };
//# sourceMappingURL=TimeZoneOffset.js.map
