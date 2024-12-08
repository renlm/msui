import React__default from 'react';
import { Icon } from '../Icon/Icon.js';

function DropdownIndicator({ selectProps }) {
  const isOpen = selectProps.menuIsOpen;
  const icon = isOpen ? "search" : "angle-down";
  const size = isOpen ? "sm" : "md";
  return /* @__PURE__ */ React__default.createElement(Icon, { name: icon, size });
}

export { DropdownIndicator };
//# sourceMappingURL=DropdownIndicator.js.map
