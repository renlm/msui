import { css } from '@emotion/css';
import React__default, { useMemo } from 'react';
import '@grafana/data';
import { useStyles2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';
import '../../utils/dom.js';
import '../../utils/colors.js';
import 'slate';
import { getTagColorsFromName } from '../../utils/tags.js';
import 'lodash';
import 'ansicolor';
import '../../utils/logger.js';
import { IconButton } from '../IconButton/IconButton.js';

const TagItem = ({ name, disabled, onRemove }) => {
  const { color, borderColor } = useMemo(() => getTagColorsFromName(name), [name]);
  const styles = useStyles2(getStyles);
  return /* @__PURE__ */ React__default.createElement("li", { className: styles.itemStyle, style: { backgroundColor: color, borderColor } }, /* @__PURE__ */ React__default.createElement("span", { className: styles.nameStyle }, name), /* @__PURE__ */ React__default.createElement(
    IconButton,
    {
      name: "times",
      size: "lg",
      disabled,
      tooltip: `Remove "${name}" tag`,
      onClick: () => onRemove(name),
      className: styles.buttonStyles
    }
  ));
};
const getStyles = (theme) => {
  const height = theme.spacing.gridSize * 3;
  return {
    itemStyle: css({
      display: "flex",
      gap: "3px",
      alignItems: "center",
      height: `${height}px`,
      lineHeight: `${height - 2}px`,
      color: "#fff",
      borderWidth: "1px",
      borderStyle: "solid",
      borderRadius: theme.shape.radius.default,
      padding: `0 ${theme.spacing(0.5)}`,
      whiteSpace: "nowrap",
      textShadow: "none",
      fontWeight: 500,
      fontSize: theme.typography.size.sm
    }),
    nameStyle: css({
      maxWidth: "25ch",
      textOverflow: "ellipsis",
      overflow: "hidden"
    }),
    buttonStyles: css({
      margin: 0,
      "&:hover::before": {
        display: "none"
      }
    })
  };
};

export { TagItem };
//# sourceMappingURL=TagItem.js.map
