import { cx, css } from '@emotion/css';
import React__default, { useMemo } from 'react';
import { dateTime } from '@grafana/data';
import { useTheme2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';
import { Tooltip } from '../Tooltip/Tooltip.js';

const formatViewed = (dateString) => {
  const date = dateTime(dateString);
  const diffHours = date.diff(dateTime(), "hours", false);
  return `Active last ${(Math.floor(-diffHours / 24) + 1) * 24}h`;
};
const getUserInitials = (name) => {
  var _a, _b;
  if (!name) {
    return "";
  }
  const [first, last] = name.split(" ");
  return `${(_a = first == null ? void 0 : first[0]) != null ? _a : ""}${(_b = last == null ? void 0 : last[0]) != null ? _b : ""}`.toUpperCase();
};
const UserIcon = ({
  userView,
  className,
  children,
  onClick,
  showTooltip = true
}) => {
  const { user, lastActiveAt } = userView;
  const isActive = dateTime(lastActiveAt).diff(dateTime(), "minutes", true) >= -15;
  const theme = useTheme2();
  const styles = useMemo(() => getStyles(theme, isActive), [theme, isActive]);
  const content = /* @__PURE__ */ React__default.createElement(
    "button",
    {
      type: "button",
      onClick,
      className: cx(styles.container, onClick && styles.pointer, className),
      "aria-label": `${user.name} icon`
    },
    children ? /* @__PURE__ */ React__default.createElement("div", { className: cx(styles.content, styles.textContent) }, children) : user.avatarUrl ? /* @__PURE__ */ React__default.createElement("img", { className: styles.content, src: user.avatarUrl, alt: `${user.name} avatar` }) : /* @__PURE__ */ React__default.createElement("div", { className: cx(styles.content, styles.textContent) }, getUserInitials(user.name))
  );
  if (showTooltip) {
    const tooltip = /* @__PURE__ */ React__default.createElement("div", { className: styles.tooltipContainer }, /* @__PURE__ */ React__default.createElement("div", { className: styles.tooltipName }, user.name), /* @__PURE__ */ React__default.createElement("div", { className: styles.tooltipDate }, isActive ? /* @__PURE__ */ React__default.createElement("div", { className: styles.dotContainer }, /* @__PURE__ */ React__default.createElement("span", null, "Active last 15m"), /* @__PURE__ */ React__default.createElement("span", { className: styles.dot })) : formatViewed(lastActiveAt)));
    return /* @__PURE__ */ React__default.createElement(Tooltip, { content: tooltip }, content);
  } else {
    return content;
  }
};
const getIconBorder = (color) => {
  return `0 0 0 1px ${color}`;
};
const getStyles = (theme, isActive) => {
  const shadowColor = isActive ? theme.colors.primary.main : theme.colors.border.medium;
  const shadowHoverColor = isActive ? theme.colors.primary.text : theme.colors.border.strong;
  return {
    container: css({
      padding: 0,
      width: "30px",
      height: "30px",
      background: "none",
      border: "none",
      borderRadius: theme.shape.radius.circle,
      "& > *": {
        borderRadius: theme.shape.radius.circle
      }
    }),
    content: css({
      lineHeight: "24px",
      maxWidth: "100%",
      border: `3px ${theme.colors.background.primary} solid`,
      boxShadow: getIconBorder(shadowColor),
      backgroundClip: "padding-box",
      "&:hover": {
        boxShadow: getIconBorder(shadowHoverColor)
      }
    }),
    textContent: css({
      background: theme.colors.background.primary,
      padding: 0,
      color: theme.colors.text.secondary,
      textAlign: "center",
      fontSize: theme.typography.size.sm,
      "&:focus": {
        boxShadow: getIconBorder(shadowColor)
      }
    }),
    tooltipContainer: css({
      textAlign: "center",
      padding: theme.spacing(0, 1)
    }),
    tooltipName: css({
      fontWeight: theme.typography.fontWeightBold
    }),
    tooltipDate: css({
      fontWeight: theme.typography.fontWeightRegular
    }),
    dotContainer: css({
      display: "flex",
      alignItems: "center"
    }),
    dot: css({
      height: "6px",
      width: "6px",
      backgroundColor: theme.colors.primary.main,
      borderRadius: theme.shape.radius.circle,
      display: "inline-block",
      marginLeft: theme.spacing(1)
    }),
    pointer: css({
      cursor: "pointer"
    })
  };
};

export { UserIcon, getStyles };
//# sourceMappingURL=UserIcon.js.map
