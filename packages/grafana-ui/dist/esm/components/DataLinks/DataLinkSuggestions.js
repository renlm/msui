import { cx, css } from '@emotion/css';
import { groupBy, capitalize } from 'lodash';
import React__default, { useRef, useMemo } from 'react';
import useClickAway from 'react-use/lib/useClickAway';
import '@grafana/data';
import { useStyles2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';
import { List } from '../List/List.js';

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const getStyles = (theme) => {
  return {
    list: css({
      borderBottom: `1px solid ${theme.colors.border.weak}`,
      "&:last-child": {
        border: "none"
      }
    }),
    wrapper: css({
      background: theme.colors.background.primary,
      width: "250px"
    }),
    item: css({
      background: "none",
      padding: "2px 8px",
      userSelect: "none",
      color: theme.colors.text.primary,
      cursor: "pointer",
      "&:hover": {
        background: theme.colors.action.hover
      }
    }),
    label: css({
      color: theme.colors.text.secondary
    }),
    activeItem: css({
      background: theme.colors.background.secondary,
      "&:hover": {
        background: theme.colors.background.secondary
      }
    }),
    itemValue: css({
      fontFamily: theme.typography.fontFamilyMonospace,
      fontSize: theme.typography.size.sm
    })
  };
};
const DataLinkSuggestions = (_a) => {
  var _b = _a, { suggestions } = _b, otherProps = __objRest(_b, ["suggestions"]);
  const ref = useRef(null);
  useClickAway(ref, () => {
    if (otherProps.onClose) {
      otherProps.onClose();
    }
  });
  const groupedSuggestions = useMemo(() => {
    return groupBy(suggestions, (s) => s.origin);
  }, [suggestions]);
  const styles = useStyles2(getStyles);
  return /* @__PURE__ */ React__default.createElement("div", { role: "menu", ref, className: styles.wrapper }, Object.keys(groupedSuggestions).map((key, i) => {
    const indexOffset = i === 0 ? 0 : Object.keys(groupedSuggestions).reduce((acc, current, index) => {
      if (index >= i) {
        return acc;
      }
      return acc + groupedSuggestions[current].length;
    }, 0);
    return /* @__PURE__ */ React__default.createElement(
      DataLinkSuggestionsList,
      __spreadProps(__spreadValues({}, otherProps), {
        suggestions: groupedSuggestions[key],
        label: `${capitalize(key)}`,
        activeIndex: otherProps.activeIndex,
        activeIndexOffset: indexOffset,
        key
      })
    );
  }));
};
DataLinkSuggestions.displayName = "DataLinkSuggestions";
const DataLinkSuggestionsList = React__default.memo(
  ({
    activeIndex,
    activeIndexOffset,
    label,
    onClose,
    onSuggestionSelect,
    suggestions,
    activeRef: selectedRef
  }) => {
    const styles = useStyles2(getStyles);
    return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(
      List,
      {
        className: styles.list,
        items: suggestions,
        renderItem: (item, index) => {
          const isActive = index + activeIndexOffset === activeIndex;
          return (
            // key events are handled by DataLinkInput
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events
            /* @__PURE__ */ React__default.createElement(
              "div",
              {
                role: "menuitem",
                tabIndex: 0,
                className: cx(styles.item, isActive && styles.activeItem),
                ref: isActive ? selectedRef : void 0,
                onClick: () => {
                  onSuggestionSelect(item);
                },
                title: item.documentation
              },
              /* @__PURE__ */ React__default.createElement("span", { className: styles.itemValue }, /* @__PURE__ */ React__default.createElement("span", { className: styles.label }, label), " ", item.label)
            )
          );
        }
      }
    ));
  }
);
DataLinkSuggestionsList.displayName = "DataLinkSuggestionsList";

export { DataLinkSuggestions };
//# sourceMappingURL=DataLinkSuggestions.js.map
