import tinycolor from 'tinycolor2';

function cardChrome(theme) {
  return `
    background: ${theme.colors.background.secondary};
    &:hover {
      background: ${hoverColor(theme.colors.background.secondary, theme)};
    }
    box-shadow: ${theme.components.panel.boxShadow};
    border-radius: ${theme.shape.radius.default};
`;
}
function hoverColor(color, theme) {
  return theme.isDark ? tinycolor(color).brighten(2).toString() : tinycolor(color).darken(2).toString();
}
function listItem(theme) {
  return `
  background: ${theme.colors.background.secondary};
  &:hover {
    background: ${hoverColor(theme.colors.background.secondary, theme)};
  }
  box-shadow: ${theme.components.panel.boxShadow};
  border-radius: ${theme.shape.radius.default};
`;
}
function listItemSelected(theme) {
  return `
    background: ${hoverColor(theme.colors.background.secondary, theme)};
    color: ${theme.colors.text.maxContrast};
`;
}
function mediaUp(breakpoint) {
  return `only screen and (min-width: ${breakpoint})`;
}
const isGrafanaTheme2 = (theme) => theme.hasOwnProperty("v1");
const focusCss = (theme) => {
  const isTheme2 = isGrafanaTheme2(theme);
  const firstColor = isTheme2 ? theme.colors.background.canvas : theme.colors.bodyBg;
  const secondColor = isTheme2 ? theme.colors.primary.main : theme.colors.formFocusOutline;
  return `
  outline: 2px dotted transparent;
  outline-offset: 2px;
  box-shadow: 0 0 0 2px ${firstColor}, 0 0 0px 4px ${secondColor};
  transition-property: outline, outline-offset, box-shadow;
  transition-duration: 0.2s;
  transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);`;
};
function getMouseFocusStyles(theme) {
  return {
    outline: "none",
    boxShadow: `none`
  };
}
function getFocusStyles(theme) {
  return {
    outline: "2px dotted transparent",
    outlineOffset: "2px",
    boxShadow: `0 0 0 2px ${theme.colors.background.canvas}, 0 0 0px 4px ${theme.colors.primary.main}`,
    transitionTimingFunction: `cubic-bezier(0.19, 1, 0.22, 1)`,
    transitionDuration: "0.2s",
    transitionProperty: "outline, outline-offset, box-shadow"
  };
}
const getTooltipContainerStyles = (theme) => ({
  overflow: "hidden",
  background: theme.colors.background.secondary,
  boxShadow: theme.shadows.z2,
  maxWidth: "800px",
  padding: theme.spacing(1),
  borderRadius: theme.shape.radius.default,
  zIndex: theme.zIndex.tooltip
});

export { cardChrome, focusCss, getFocusStyles, getMouseFocusStyles, getTooltipContainerStyles, hoverColor, listItem, listItemSelected, mediaUp };
//# sourceMappingURL=mixins.js.map
