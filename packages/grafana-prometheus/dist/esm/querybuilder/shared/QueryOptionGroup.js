import { css } from '@emotion/css';
import React from 'react';
import { useToggle } from 'react-use';
import { useStyles2, Collapse, Stack } from '@grafana/ui';

function QueryOptionGroup({ title, children, collapsedInfo }) {
  const [isOpen, toggleOpen] = useToggle(false);
  const styles = useStyles2(getStyles);
  return /* @__PURE__ */ React.createElement("div", { className: styles.wrapper }, /* @__PURE__ */ React.createElement(
    Collapse,
    {
      className: styles.collapse,
      collapsible: true,
      isOpen,
      onToggle: toggleOpen,
      label: /* @__PURE__ */ React.createElement(Stack, { gap: 0 }, /* @__PURE__ */ React.createElement("h6", { className: styles.title }, title), !isOpen && /* @__PURE__ */ React.createElement("div", { className: styles.description }, collapsedInfo.map((x, i) => /* @__PURE__ */ React.createElement("span", { key: i }, x))))
    },
    /* @__PURE__ */ React.createElement("div", { className: styles.body }, children)
  ));
}
const getStyles = (theme) => {
  return {
    collapse: css({
      backgroundColor: "unset",
      border: "unset",
      marginBottom: 0,
      ["> button"]: {
        padding: theme.spacing(0, 1)
      }
    }),
    wrapper: css({
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline"
    }),
    title: css({
      flexGrow: 1,
      overflow: "hidden",
      fontSize: theme.typography.bodySmall.fontSize,
      fontWeight: theme.typography.fontWeightMedium,
      margin: 0
    }),
    description: css({
      color: theme.colors.text.secondary,
      fontSize: theme.typography.bodySmall.fontSize,
      fontWeight: theme.typography.bodySmall.fontWeight,
      paddingLeft: theme.spacing(2),
      gap: theme.spacing(2),
      display: "flex"
    }),
    body: css({
      display: "flex",
      gap: theme.spacing(2),
      flexWrap: "wrap"
    }),
    tooltip: css({
      marginRight: theme.spacing(0.25)
    })
  };
};

export { QueryOptionGroup };
//# sourceMappingURL=QueryOptionGroup.js.map
