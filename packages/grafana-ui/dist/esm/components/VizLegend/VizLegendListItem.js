import { cx, css } from '@emotion/css';
import React__default, { useCallback } from 'react';
import { selectors } from '@grafana/e2e-selectors';
import '@grafana/data';
import { useStyles2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';
import { VizLegendSeriesIcon } from './VizLegendSeriesIcon.js';
import { VizLegendStatsList } from './VizLegendStatsList.js';

const VizLegendListItem = ({
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
  return /* @__PURE__ */ React__default.createElement(
    "div",
    {
      className: cx(styles.itemWrapper, item.disabled && styles.itemDisabled, className),
      "data-testid": selectors.components.VizLegend.seriesName(item.label)
    },
    /* @__PURE__ */ React__default.createElement(
      VizLegendSeriesIcon,
      {
        seriesName: (_a = item.fieldName) != null ? _a : item.label,
        color: item.color,
        gradient: item.gradient,
        readonly,
        lineStyle: item.lineStyle
      }
    ),
    /* @__PURE__ */ React__default.createElement(
      "button",
      {
        disabled: readonly,
        type: "button",
        onBlur: onMouseOut,
        onFocus: onMouseOver,
        onMouseOver,
        onMouseOut,
        onClick,
        className: styles.label
      },
      item.label
    ),
    item.getDisplayValues && /* @__PURE__ */ React__default.createElement(VizLegendStatsList, { stats: item.getDisplayValues() })
  );
};
VizLegendListItem.displayName = "VizLegendListItem";
const getStyles = (theme) => ({
  label: css({
    label: "LegendLabel",
    whiteSpace: "nowrap",
    background: "none",
    border: "none",
    fontSize: "inherit",
    padding: 0,
    userSelect: "text"
  }),
  itemDisabled: css({
    label: "LegendLabelDisabled",
    color: theme.colors.text.disabled
  }),
  itemWrapper: css({
    label: "LegendItemWrapper",
    display: "flex",
    whiteSpace: "nowrap",
    alignItems: "center",
    flexGrow: 1
  }),
  value: css({
    textAlign: "right"
  }),
  yAxisLabel: css({
    color: theme.v1.palette.gray2
  })
});

export { VizLegendListItem };
//# sourceMappingURL=VizLegendListItem.js.map
