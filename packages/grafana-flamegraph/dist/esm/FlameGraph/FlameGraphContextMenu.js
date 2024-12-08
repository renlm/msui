import React from 'react';
import { ContextMenu, MenuItem, MenuGroup } from '@grafana/ui';

const FlameGraphContextMenu = ({
  data,
  itemData,
  onMenuItemClick,
  onItemFocus,
  onSandwich,
  collapseConfig,
  onExpandGroup,
  onCollapseGroup,
  onExpandAllGroups,
  onCollapseAllGroups,
  getExtraContextMenuButtons,
  collapsing,
  allGroupsExpanded,
  allGroupsCollapsed,
  selectedView,
  search
}) => {
  function renderItems() {
    const extraButtons = (getExtraContextMenuButtons == null ? void 0 : getExtraContextMenuButtons(itemData, data.data, {
      selectedView,
      isDiff: data.isDiffFlamegraph(),
      search,
      collapseConfig
    })) || [];
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
      MenuItem,
      {
        label: "Focus block",
        icon: "eye",
        onClick: () => {
          onItemFocus();
          onMenuItemClick();
        }
      }
    ), /* @__PURE__ */ React.createElement(
      MenuItem,
      {
        label: "Copy function name",
        icon: "copy",
        onClick: () => {
          navigator.clipboard.writeText(itemData.label).then(() => {
            onMenuItemClick();
          });
        }
      }
    ), /* @__PURE__ */ React.createElement(
      MenuItem,
      {
        label: "Sandwich view",
        icon: "gf-show-context",
        onClick: () => {
          onSandwich();
          onMenuItemClick();
        }
      }
    ), extraButtons.map(({ label, icon, onClick }) => {
      return /* @__PURE__ */ React.createElement(MenuItem, { label, icon, onClick: () => onClick(), key: label });
    }), collapsing && /* @__PURE__ */ React.createElement(MenuGroup, { label: "Grouping" }, collapseConfig ? collapseConfig.collapsed ? /* @__PURE__ */ React.createElement(
      MenuItem,
      {
        label: "Expand group",
        icon: "angle-double-down",
        onClick: () => {
          onExpandGroup();
          onMenuItemClick();
        }
      }
    ) : /* @__PURE__ */ React.createElement(
      MenuItem,
      {
        label: "Collapse group",
        icon: "angle-double-up",
        onClick: () => {
          onCollapseGroup();
          onMenuItemClick();
        }
      }
    ) : null, !allGroupsExpanded && /* @__PURE__ */ React.createElement(
      MenuItem,
      {
        label: "Expand all groups",
        icon: "angle-double-down",
        onClick: () => {
          onExpandAllGroups();
          onMenuItemClick();
        }
      }
    ), !allGroupsCollapsed && /* @__PURE__ */ React.createElement(
      MenuItem,
      {
        label: "Collapse all groups",
        icon: "angle-double-up",
        onClick: () => {
          onCollapseAllGroups();
          onMenuItemClick();
        }
      }
    )));
  }
  return /* @__PURE__ */ React.createElement("div", { "data-testid": "contextMenu" }, /* @__PURE__ */ React.createElement(
    ContextMenu,
    {
      renderMenuItems: renderItems,
      x: itemData.posX + 10,
      y: itemData.posY,
      focusOnOpen: false
    }
  ));
};

export { FlameGraphContextMenu as default };
//# sourceMappingURL=FlameGraphContextMenu.js.map
