import { css } from '@emotion/react';

function getAgularPanelStyles(theme) {
  return css({
    ".panel-options-group": {
      borderBottom: `1px solid ${theme.colors.border.weak}`
    },
    ".panel-options-group__header": {
      padding: theme.spacing(1, 2, 1, 1),
      position: "relative",
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      fontWeight: 500,
      color: theme.colors.text.primary,
      "&:hover": {
        background: theme.colors.emphasize(theme.colors.background.primary, 0.03)
      }
    },
    ".panel-options-group__icon": {
      color: theme.colors.text.secondary,
      marginRight: theme.spacing(1),
      padding: theme.spacing(0, 0.9, 0, 0.6)
    },
    ".panel-options-group__title": {
      position: "relative"
    },
    ".panel-options-group__body": {
      padding: theme.spacing(1, 2, 1, 4)
    }
  });
}

export { getAgularPanelStyles };
//# sourceMappingURL=angularPanelStyles.js.map
