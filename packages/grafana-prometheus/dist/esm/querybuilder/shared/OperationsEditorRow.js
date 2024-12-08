import { css } from '@emotion/css';
import React from 'react';
import { useStyles2, Stack } from '@grafana/ui';

function OperationsEditorRow({ children }) {
  const styles = useStyles2(getStyles);
  return /* @__PURE__ */ React.createElement("div", { className: styles.root }, /* @__PURE__ */ React.createElement(Stack, { gap: 1 }, children));
}
const getStyles = (theme) => {
  return {
    root: css({
      padding: theme.spacing(1, 1, 0, 1),
      backgroundColor: theme.colors.background.secondary,
      borderRadius: theme.shape.radius.default
    })
  };
};

export { OperationsEditorRow };
//# sourceMappingURL=OperationsEditorRow.js.map
