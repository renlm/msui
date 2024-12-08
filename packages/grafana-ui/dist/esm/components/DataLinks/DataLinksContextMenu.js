import { css } from '@emotion/css';
import React__default from 'react';
import { selectors } from '@grafana/e2e-selectors';
import { linkModelToContextMenuItems } from '../../utils/dataLinks.js';
import { WithContextMenu } from '../ContextMenu/WithContextMenu.js';
import { MenuGroup } from '../Menu/MenuGroup.js';
import { MenuItem } from '../Menu/MenuItem.js';

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
const DataLinksContextMenu = ({ children, links, style }) => {
  const itemsGroup = [{ items: linkModelToContextMenuItems(links), label: "Data links" }];
  const linksCounter = itemsGroup[0].items.length;
  const renderMenuGroupItems = () => {
    return itemsGroup.map((group, groupIdx) => /* @__PURE__ */ React__default.createElement(MenuGroup, { key: `${group.label}${groupIdx}`, label: group.label }, (group.items || []).map((item, itemIdx) => /* @__PURE__ */ React__default.createElement(
      MenuItem,
      {
        key: `${group.label}-${groupIdx}-${itemIdx}}`,
        url: item.url,
        label: item.label,
        target: item.target,
        icon: item.icon,
        active: item.active,
        onClick: item.onClick
      }
    ))));
  };
  const targetClassName = css({
    cursor: "context-menu"
  });
  if (linksCounter > 1) {
    return /* @__PURE__ */ React__default.createElement(WithContextMenu, { renderMenuItems: renderMenuGroupItems }, ({ openMenu }) => {
      return children({ openMenu, targetClassName });
    });
  } else {
    const linkModel = links()[0];
    return /* @__PURE__ */ React__default.createElement(
      "a",
      {
        href: linkModel.href,
        onClick: linkModel.onClick,
        target: linkModel.target,
        title: linkModel.title,
        style: __spreadProps(__spreadValues({}, style), { overflow: "hidden", display: "flex" }),
        "data-testid": selectors.components.DataLinksContextMenu.singleLink
      },
      children({})
    );
  }
};

export { DataLinksContextMenu };
//# sourceMappingURL=DataLinksContextMenu.js.map
