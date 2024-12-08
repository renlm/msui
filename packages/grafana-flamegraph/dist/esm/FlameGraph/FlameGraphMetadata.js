import { css } from '@emotion/css';
import React from 'react';
import { getValueFormat } from '@grafana/data';
import { useStyles2, Icon, IconButton } from '@grafana/ui';

const FlameGraphMetadata = React.memo(
  ({ data, focusedItem, totalTicks, sandwichedLabel, onFocusPillClick, onSandwichPillClick }) => {
    const styles = useStyles2(getStyles);
    const parts = [];
    const ticksVal = getValueFormat("short")(totalTicks);
    const displayValue = data.valueDisplayProcessor(totalTicks);
    let unitValue = displayValue.text + displayValue.suffix;
    const unitTitle = data.getUnitTitle();
    if (unitTitle === "Count") {
      if (!displayValue.suffix) {
        unitValue = displayValue.text;
      }
    }
    parts.push(
      /* @__PURE__ */ React.createElement("div", { className: styles.metadataPill, key: "default" }, unitValue, " | ", ticksVal.text, ticksVal.suffix, " samples (", unitTitle, ")")
    );
    if (sandwichedLabel) {
      parts.push(
        /* @__PURE__ */ React.createElement("span", { key: "sandwich" }, /* @__PURE__ */ React.createElement(Icon, { size: "sm", name: "angle-right" }), /* @__PURE__ */ React.createElement("div", { className: styles.metadataPill }, /* @__PURE__ */ React.createElement(Icon, { size: "sm", name: "gf-show-context" }), " ", /* @__PURE__ */ React.createElement("span", { className: styles.metadataPillName }, sandwichedLabel.substring(sandwichedLabel.lastIndexOf("/") + 1)), /* @__PURE__ */ React.createElement(
          IconButton,
          {
            className: styles.pillCloseButton,
            name: "times",
            size: "sm",
            onClick: onSandwichPillClick,
            tooltip: "Remove sandwich view",
            "aria-label": "Remove sandwich view"
          }
        )))
      );
    }
    if (focusedItem) {
      const percentValue = Math.round(1e4 * (focusedItem.item.value / totalTicks)) / 100;
      parts.push(
        /* @__PURE__ */ React.createElement("span", { key: "focus" }, /* @__PURE__ */ React.createElement(Icon, { size: "sm", name: "angle-right" }), /* @__PURE__ */ React.createElement("div", { className: styles.metadataPill }, /* @__PURE__ */ React.createElement(Icon, { size: "sm", name: "eye" }), " ", percentValue, "% of total", /* @__PURE__ */ React.createElement(
          IconButton,
          {
            className: styles.pillCloseButton,
            name: "times",
            size: "sm",
            onClick: onFocusPillClick,
            tooltip: "Remove focus",
            "aria-label": "Remove focus"
          }
        )))
      );
    }
    return /* @__PURE__ */ React.createElement("div", { className: styles.metadata }, parts);
  }
);
FlameGraphMetadata.displayName = "FlameGraphMetadata";
const getStyles = (theme) => ({
  metadataPill: css({
    label: "metadataPill",
    display: "inline-flex",
    alignItems: "center",
    background: theme.colors.background.secondary,
    borderRadius: theme.shape.borderRadius(8),
    padding: theme.spacing(0.5, 1),
    fontSize: theme.typography.bodySmall.fontSize,
    fontWeight: theme.typography.fontWeightMedium,
    lineHeight: theme.typography.bodySmall.lineHeight,
    color: theme.colors.text.secondary
  }),
  pillCloseButton: css({
    label: "pillCloseButton",
    verticalAlign: "text-bottom",
    margin: theme.spacing(0, 0.5)
  }),
  metadata: css({
    margin: "8px 0",
    textAlign: "center"
  }),
  metadataPillName: css({
    label: "metadataPillName",
    maxWidth: "200px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    marginLeft: theme.spacing(0.5)
  })
});

export { FlameGraphMetadata as default };
//# sourceMappingURL=FlameGraphMetadata.js.map
