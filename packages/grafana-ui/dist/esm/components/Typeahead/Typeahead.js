import { css } from '@emotion/css';
import { isEqual } from 'lodash';
import React__default, { PureComponent, createRef } from 'react';
import ReactDOM from 'react-dom';
import { FixedSizeList } from 'react-window';
import { ThemeContext } from '@grafana/data';
import { CompletionItemKind } from '../../types/completion.js';
import { flattenGroupItems, calculateLongestLabel, calculateListSizes } from '../../utils/typeahead.js';
import { TypeaheadInfo } from './TypeaheadInfo.js';
import { TypeaheadItem } from './TypeaheadItem.js';

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const modulo = (a, n) => a - n * Math.floor(a / n);
class Typeahead extends PureComponent {
  constructor() {
    super(...arguments);
    __publicField(this, "context");
    __publicField(this, "listRef", createRef());
    __publicField(this, "state", {
      hoveredItem: null,
      typeaheadIndex: null,
      allItems: [],
      listWidth: -1,
      listHeight: -1,
      itemHeight: -1
    });
    __publicField(this, "componentDidMount", () => {
      if (this.props.menuRef) {
        this.props.menuRef(this);
      }
      document.addEventListener("selectionchange", this.handleSelectionChange);
      const allItems = flattenGroupItems(this.props.groupedItems);
      const longestLabel = calculateLongestLabel(allItems);
      const { listWidth, listHeight, itemHeight } = calculateListSizes(this.context, allItems, longestLabel);
      this.setState({
        listWidth,
        listHeight,
        itemHeight,
        allItems
      });
    });
    __publicField(this, "componentWillUnmount", () => {
      document.removeEventListener("selectionchange", this.handleSelectionChange);
    });
    __publicField(this, "handleSelectionChange", () => {
      this.forceUpdate();
    });
    __publicField(this, "componentDidUpdate", (prevProps, prevState) => {
      if (this.state.typeaheadIndex !== null && prevState.typeaheadIndex !== this.state.typeaheadIndex && this.listRef && this.listRef.current) {
        if (this.state.typeaheadIndex === 1) {
          this.listRef.current.scrollToItem(0);
          return;
        }
        this.listRef.current.scrollToItem(this.state.typeaheadIndex);
      }
      if (isEqual(prevProps.groupedItems, this.props.groupedItems) === false) {
        const allItems = flattenGroupItems(this.props.groupedItems);
        const longestLabel = calculateLongestLabel(allItems);
        const { listWidth, listHeight, itemHeight } = calculateListSizes(this.context, allItems, longestLabel);
        this.setState({ listWidth, listHeight, itemHeight, allItems, typeaheadIndex: null });
      }
    });
    __publicField(this, "onMouseEnter", (index) => {
      this.setState({
        hoveredItem: index
      });
    });
    __publicField(this, "onMouseLeave", () => {
      this.setState({
        hoveredItem: null
      });
    });
    __publicField(this, "moveMenuIndex", (moveAmount) => {
      const itemCount = this.state.allItems.length;
      if (itemCount) {
        const typeaheadIndex = this.state.typeaheadIndex || 0;
        let newTypeaheadIndex = modulo(typeaheadIndex + moveAmount, itemCount);
        if (this.state.allItems[newTypeaheadIndex].kind === CompletionItemKind.GroupTitle) {
          newTypeaheadIndex = modulo(newTypeaheadIndex + moveAmount, itemCount);
        }
        this.setState({
          typeaheadIndex: newTypeaheadIndex
        });
        return;
      }
    });
    __publicField(this, "insertSuggestion", () => {
      if (this.props.onSelectSuggestion && this.state.typeaheadIndex !== null) {
        this.props.onSelectSuggestion(this.state.allItems[this.state.typeaheadIndex]);
      }
    });
  }
  get menuPosition() {
    if (!window.getSelection) {
      return "";
    }
    const selection = window.getSelection();
    const node = selection && selection.anchorNode;
    if (node && node.parentElement) {
      const rect = node.parentElement.getBoundingClientRect();
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;
      return `position: absolute; display: flex; top: ${rect.top + scrollY + rect.height + 6}px; left: ${rect.left + scrollX - 2}px`;
    }
    return "";
  }
  render() {
    const { prefix, isOpen = false, origin } = this.props;
    const { allItems, listWidth, listHeight, itemHeight, hoveredItem, typeaheadIndex } = this.state;
    const styles = getStyles(this.context);
    const showDocumentation = hoveredItem || typeaheadIndex;
    const documentationItem = allItems[hoveredItem ? hoveredItem : typeaheadIndex || 0];
    return /* @__PURE__ */ React__default.createElement(Portal, { origin, isOpen, style: this.menuPosition }, /* @__PURE__ */ React__default.createElement("ul", { role: "menu", className: styles.typeahead, "data-testid": "typeahead" }, /* @__PURE__ */ React__default.createElement(
      FixedSizeList,
      {
        ref: this.listRef,
        itemCount: allItems.length,
        itemSize: itemHeight,
        itemKey: (index) => {
          const item = allItems && allItems[index];
          const key = item ? `${index}-${item.label}` : `${index}`;
          return key;
        },
        width: listWidth,
        height: listHeight
      },
      ({ index, style }) => {
        const item = allItems && allItems[index];
        if (!item) {
          return null;
        }
        return /* @__PURE__ */ React__default.createElement(
          TypeaheadItem,
          {
            onClickItem: () => this.props.onSelectSuggestion ? this.props.onSelectSuggestion(item) : {},
            isSelected: typeaheadIndex === null ? false : allItems[typeaheadIndex] === item,
            item,
            prefix,
            style,
            onMouseEnter: () => this.onMouseEnter(index),
            onMouseLeave: this.onMouseLeave
          }
        );
      }
    )), showDocumentation && /* @__PURE__ */ React__default.createElement(TypeaheadInfo, { height: listHeight, item: documentationItem }));
  }
}
__publicField(Typeahead, "contextType", ThemeContext);
class Portal extends PureComponent {
  constructor(props) {
    super(props);
    __publicField(this, "node");
    const { index = 0, origin = "query", style } = props;
    this.node = document.createElement("div");
    this.node.setAttribute("style", style);
    this.node.classList.add(`slate-typeahead-${origin}-${index}`);
    document.body.appendChild(this.node);
  }
  componentWillUnmount() {
    document.body.removeChild(this.node);
  }
  render() {
    if (this.props.isOpen) {
      this.node.setAttribute("style", this.props.style);
      this.node.classList.add(`slate-typeahead--open`);
      return ReactDOM.createPortal(this.props.children, this.node);
    } else {
      this.node.classList.remove(`slate-typeahead--open`);
    }
    return null;
  }
}
const getStyles = (theme) => ({
  typeahead: css({
    position: "relative",
    zIndex: theme.zIndex.typeahead,
    borderRadius: theme.shape.radius.default,
    border: `1px solid ${theme.components.panel.borderColor}`,
    maxHeight: "66vh",
    overflowY: "scroll",
    overflowX: "hidden",
    outline: "none",
    listStyle: "none",
    background: theme.components.panel.background,
    color: theme.colors.text.primary,
    boxShadow: theme.shadows.z2,
    strong: {
      color: theme.v1.palette.yellow
    }
  })
});

export { Typeahead };
//# sourceMappingURL=Typeahead.js.map
