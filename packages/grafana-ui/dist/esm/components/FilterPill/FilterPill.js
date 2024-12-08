import { cx, css } from '@emotion/css';
import React__default from 'react';
import '@grafana/data';
import { useStyles2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';
import { clearButtonStyles } from '../Button/Button.js';
import '../Button/ButtonGroup.js';
import { Icon } from '../Icon/Icon.js';

const FilterPill = ({ label, selected, onClick, icon = "check" }) => {
  const styles = useStyles2(getStyles);
  const clearButton = useStyles2(clearButtonStyles);
  return /* @__PURE__ */ React__default.createElement("button", { type: "button", className: cx(clearButton, styles.wrapper, selected && styles.selected), onClick }, /* @__PURE__ */ React__default.createElement("span", null, label), selected && /* @__PURE__ */ React__default.createElement(Icon, { name: icon, className: styles.icon }));
};
const getStyles = (theme) => {
  return {
    wrapper: css({
      background: theme.colors.background.secondary,
      borderRadius: theme.shape.radius.pill,
      padding: theme.spacing(0, 2),
      fontSize: theme.typography.bodySmall.fontSize,
      fontWeight: theme.typography.fontWeightMedium,
      lineHeight: theme.typography.bodySmall.lineHeight,
      color: theme.colors.text.secondary,
      display: "flex",
      alignItems: "center",
      height: "32px",
      position: "relative",
      border: `1px solid ${theme.colors.background.secondary}`,
      whiteSpace: "nowrap",
      "&:hover": {
        background: theme.colors.action.hover,
        color: theme.colors.text.primary
      }
    }),
    selected: css({
      color: theme.colors.text.primary,
      background: theme.colors.action.selected,
      "&:hover": {
        background: theme.colors.action.focus
      }
    }),
    icon: css({
      marginLeft: theme.spacing(0.5)
    })
  };
};

export { FilterPill };
//# sourceMappingURL=FilterPill.js.map
