import { css } from '@emotion/css';
import React__default, { useMemo } from 'react';
import '@grafana/data';
import { useStyles2 } from '../../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../../utils/skeleton.js';

const TimeZoneDescription = ({ info }) => {
  const styles = useStyles2(getStyles);
  const description = useDescription(info);
  if (!info) {
    return null;
  }
  return /* @__PURE__ */ React__default.createElement("div", { className: styles.description }, description);
};
const useDescription = (info) => {
  return useMemo(() => {
    const parts = [];
    if (!info) {
      return "";
    }
    if (info.name === "Europe/Simferopol") {
      return "Ukraine, EEST";
    }
    if (info.countries.length > 0) {
      const country = info.countries[0];
      parts.push(country.name);
    }
    if (info.abbreviation) {
      parts.push(info.abbreviation);
    }
    return parts.join(", ");
  }, [info]);
};
const getStyles = (theme) => {
  return {
    description: css({
      fontWeight: "normal",
      fontSize: theme.typography.size.sm,
      color: theme.colors.text.secondary,
      whiteSpace: "normal",
      textOverflow: "ellipsis"
    })
  };
};

export { TimeZoneDescription };
//# sourceMappingURL=TimeZoneDescription.js.map
