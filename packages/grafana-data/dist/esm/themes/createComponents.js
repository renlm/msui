function createComponents(colors, shadows) {
  const panel = {
    padding: 1,
    headerHeight: 4,
    background: colors.background.primary,
    borderColor: colors.border.weak,
    boxShadow: "none"
  };
  const input = {
    borderColor: colors.border.medium,
    borderHover: colors.border.strong,
    text: colors.text.primary,
    background: colors.mode === "dark" ? colors.background.canvas : colors.background.primary
  };
  return {
    height: {
      sm: 3,
      md: 4,
      lg: 6
    },
    input,
    panel,
    dropdown: {
      background: input.background
    },
    tooltip: {
      background: colors.background.secondary,
      text: colors.text.primary
    },
    dashboard: {
      background: colors.background.canvas,
      padding: 1
    },
    overlay: {
      background: colors.mode === "dark" ? "rgba(63, 62, 62, 0.45)" : "rgba(208, 209, 211, 0.24)"
    },
    sidemenu: {
      width: 57
    },
    menuTabs: {
      height: 42
    },
    textHighlight: {
      text: colors.warning.contrastText,
      background: colors.warning.main
    },
    horizontalDrawer: {
      defaultHeight: 400
    },
    table: {
      rowHoverBackground: colors.emphasize(colors.background.primary, 0.03)
    }
  };
}

export { createComponents };
//# sourceMappingURL=createComponents.js.map
