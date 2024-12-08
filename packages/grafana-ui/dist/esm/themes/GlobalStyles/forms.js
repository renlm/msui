import { css } from '@emotion/react';

function getFormElementStyles(theme) {
  return css({
    "input, button, select, textarea": {
      fontFamily: theme.typography.body.fontFamily,
      fontSize: theme.typography.body.fontSize,
      fontWeight: theme.typography.body.fontWeight,
      lineHeight: theme.typography.body.lineHeight
    },
    "input, select": {
      backgroundColor: theme.components.input.background,
      color: theme.components.input.text,
      border: "none",
      boxShadow: "none"
    },
    textarea: {
      height: "auto"
    },
    // Reset width of input images, buttons, radios, checkboxes
    "input[type='file'], input[type='image'], input[type='submit'], input[type='reset'], input[type='button'], input[type='radio'], input[type='checkbox']": {
      width: "auto"
      // Override of generic input selector
    }
  });
}

export { getFormElementStyles };
//# sourceMappingURL=forms.js.map
