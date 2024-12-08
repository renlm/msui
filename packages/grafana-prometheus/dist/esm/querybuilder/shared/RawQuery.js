import { cx, css } from '@emotion/css';
import Prism from 'prismjs';
import React from 'react';
import { useTheme2 } from '@grafana/ui';

function RawQuery({ query, lang, className }) {
  const theme = useTheme2();
  const styles = getStyles(theme);
  const highlighted = Prism.highlight(query, lang.grammar, lang.name);
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      className: cx(styles.editorField, "prism-syntax-highlight", className),
      "aria-label": "selector",
      dangerouslySetInnerHTML: { __html: highlighted }
    }
  );
}
const getStyles = (theme) => {
  return {
    editorField: css({
      fontFamily: theme.typography.fontFamilyMonospace,
      fontSize: theme.typography.bodySmall.fontSize
    })
  };
};

export { RawQuery };
//# sourceMappingURL=RawQuery.js.map
