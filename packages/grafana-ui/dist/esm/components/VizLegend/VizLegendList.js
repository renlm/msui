import { cx, css } from '@emotion/css';
import React__default from 'react';
import '@grafana/data';
import { useStyles2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';
import { InlineList } from '../List/InlineList.js';
import { List } from '../List/List.js';
import { VizLegendListItem } from './VizLegendListItem.js';

const VizLegendList = ({
  items,
  itemRenderer,
  onLabelMouseOver,
  onLabelMouseOut,
  onLabelClick,
  placement,
  className,
  readonly
}) => {
  const styles = useStyles2(getStyles);
  if (!itemRenderer) {
    itemRenderer = (item) => /* @__PURE__ */ React__default.createElement(
      VizLegendListItem,
      {
        item,
        onLabelClick,
        onLabelMouseOver,
        onLabelMouseOut,
        readonly
      }
    );
  }
  const getItemKey = (item) => `${item.getItemKey ? item.getItemKey() : item.label}`;
  switch (placement) {
    case "right": {
      const renderItem = (item, index) => {
        return /* @__PURE__ */ React__default.createElement("span", { className: styles.itemRight }, itemRenderer(item, index));
      };
      return /* @__PURE__ */ React__default.createElement("div", { className: cx(styles.rightWrapper, className) }, /* @__PURE__ */ React__default.createElement(List, { items, renderItem, getItemKey }));
    }
    case "bottom":
    default: {
      const leftItems = items.filter((item) => item.yAxis === 1);
      const rightItems = items.filter((item) => item.yAxis !== 1);
      const renderItem = (item, index) => {
        return /* @__PURE__ */ React__default.createElement("span", { className: styles.itemBottom }, itemRenderer(item, index));
      };
      return /* @__PURE__ */ React__default.createElement("div", { className: cx(styles.bottomWrapper, className) }, leftItems.length > 0 && /* @__PURE__ */ React__default.createElement("div", { className: styles.section }, /* @__PURE__ */ React__default.createElement(InlineList, { items: leftItems, renderItem, getItemKey })), rightItems.length > 0 && /* @__PURE__ */ React__default.createElement("div", { className: cx(styles.section, styles.sectionRight) }, /* @__PURE__ */ React__default.createElement(InlineList, { items: rightItems, renderItem, getItemKey })));
    }
  }
};
VizLegendList.displayName = "VizLegendList";
const getStyles = (theme) => {
  const itemStyles = css({
    paddingRight: "10px",
    display: "flex",
    fontSize: theme.typography.bodySmall.fontSize,
    whiteSpace: "nowrap"
  });
  return {
    itemBottom: itemStyles,
    itemRight: cx(
      itemStyles,
      css({
        marginBottom: theme.spacing(0.5)
      })
    ),
    rightWrapper: css({
      paddingLeft: theme.spacing(0.5)
    }),
    bottomWrapper: css({
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      width: "100%",
      paddingLeft: theme.spacing(0.5),
      gap: "15px 25px"
    }),
    section: css({
      display: "flex"
    }),
    sectionRight: css({
      justifyContent: "flex-end",
      flexGrow: 1,
      flexBasis: "50%"
    })
  };
};

export { VizLegendList };
//# sourceMappingURL=VizLegendList.js.map
