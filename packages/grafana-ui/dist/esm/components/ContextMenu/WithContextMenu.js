import React__default, { useState } from 'react';
import { ContextMenu } from './ContextMenu.js';

const WithContextMenu = ({ children, renderMenuItems, focusOnOpen = true }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, children({
    openMenu: (e) => {
      setIsMenuOpen(true);
      setMenuPosition({
        x: e.pageX,
        y: e.pageY
      });
    }
  }), isMenuOpen && /* @__PURE__ */ React__default.createElement(
    ContextMenu,
    {
      onClose: () => setIsMenuOpen(false),
      x: menuPosition.x,
      y: menuPosition.y,
      renderMenuItems,
      focusOnOpen
    }
  ));
};

export { WithContextMenu };
//# sourceMappingURL=WithContextMenu.js.map
