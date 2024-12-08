import { cx, css } from '@emotion/css';
import React__default, { useCallback } from 'react';
import { formattedValueToString } from '@grafana/data';
import { useStyles2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import { hoverColor } from '../../themes/mixins.js';
import '../../utils/skeleton.js';
import { VizLegendSeriesIcon } from './VizLegendSeriesIcon.js';

const LegendTableItem = ({
  item,
  onLabelClick,
  onLabelMouseOver,
  onLabelMouseOut,
  className,
  readonly
}) => {
  var _a;
  const styles = useStyles2(getStyles);
  const onMouseOver = useCallback(
    (event) => {
      if (onLabelMouseOver) {
        onLabelMouseOver(item, event);
      }
    },
    [item, onLabelMouseOver]
  );
  const onMouseOut = useCallback(
    (event) => {
      if (onLabelMouseOut) {
        onLabelMouseOut(item, event);
      }
    },
    [item, onLabelMouseOut]
  );
  const onClick = useCallback(
    (event) => {
      if (onLabelClick) {
        onLabelClick(item, event);
      }
    },
    [item, onLabelClick]
  );
  return /* @__PURE__ */ React__default.createElement("tr", { className: cx(styles.row, className) }, /* @__PURE__ */ React__default.createElement("td", null, /* @__PURE__ */ React__default.createElement("span", { className: styles.itemWrapper }, /* @__PURE__ */ React__default.createElement(
    VizLegendSeriesIcon,
    {
      color: item.color,
      seriesName: (_a = item.fieldName) != null ? _a : item.label,
      readonly,
      lineStyle: item.lineStyle
    }
  ), /* @__PURE__ */ React__default.createElement(
    "button",
    {
      disabled: readonly,
      type: "button",
      title: item.label,
      onBlur: onMouseOut,
      onFocus: onMouseOver,
      onMouseOver,
      onMouseOut,
      onClick: !readonly ? onClick : void 0,
      className: cx(styles.label, item.disabled && styles.labelDisabled)
    },
    item.label,
    " ",
    item.yAxis === 2 && /* @__PURE__ */ React__default.createElement("span", { className: styles.yAxisLabel }, "(right y-axis)")
  ))), item.getDisplayValues && item.getDisplayValues().map((stat, index) => {
    return /* @__PURE__ */ React__default.createElement("td", { className: styles.value, key: `${stat.title}-${index}` }, formattedValueToString(stat));
  }));
};
LegendTableItem.displayName = "LegendTableItem";
const getStyles = (theme) => {
  const rowHoverBg = hoverColor(theme.colors.background.primary, theme);
  return {
    row: css({
      label: "LegendRow",
      fontSize: theme.v1.typography.size.sm,
      borderBottom: `1px solid ${theme.colors.border.weak}`,
      td: {
        padding: theme.spacing(0.25, 1),
        whiteSpace: "nowrap"
      },
      "&:hover": {
        background: rowHoverBg
      }
    }),
    label: css({
      label: "LegendLabel",
      whiteSpace: "nowrap",
      background: "none",
      border: "none",
      fontSize: "inherit",
      padding: 0,
      maxWidth: "600px",
      textOverflow: "ellipsis",
      overflow: "hidden",
      userSelect: "text"
    }),
    labelDisabled: css({
      label: "LegendLabelDisabled",
      color: theme.colors.text.disabled
    }),
    itemWrapper: css({
      display: "flex",
      whiteSpace: "nowrap",
      alignItems: "center"
    }),
    value: css({
      textAlign: "right"
    }),
    yAxisLabel: css({
      color: theme.colors.text.secondary
    })
  };
};

export { LegendTableItem };
//# sourceMappingURL=VizLegendTableItem.js.map
