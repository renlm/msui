import { cx } from '@emotion/css';
import React__default, { useCallback } from 'react';
import { selectors } from '@grafana/e2e-selectors';
import { Dropdown } from '../Dropdown/Dropdown.js';
import { ToolbarButton } from '../ToolbarButton/ToolbarButton.js';
import '../ToolbarButton/ToolbarButtonRow.js';

function PanelMenu({
  menu,
  title,
  placement = "bottom",
  offset,
  dragClassCancel,
  menuButtonClass,
  onOpenMenu
}) {
  const testId = title ? selectors.components.Panels.Panel.menu(title) : `panel-menu-button`;
  const handleVisibility = useCallback(
    (show) => {
      if (show && onOpenMenu) {
        onOpenMenu();
      }
    },
    [onOpenMenu]
  );
  return /* @__PURE__ */ React__default.createElement(Dropdown, { overlay: menu, placement, offset, onVisibleChange: handleVisibility }, /* @__PURE__ */ React__default.createElement(
    ToolbarButton,
    {
      "aria-label": `Menu for panel with ${title ? `title ${title}` : "no title"}`,
      title: "Menu",
      icon: "ellipsis-v",
      iconSize: "md",
      narrow: true,
      "data-testid": testId,
      className: cx(menuButtonClass, dragClassCancel)
    }
  ));
}

export { PanelMenu };
//# sourceMappingURL=PanelMenu.js.map
