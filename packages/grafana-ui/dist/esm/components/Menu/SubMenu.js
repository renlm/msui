import { cx, css } from '@emotion/css';
import React__default, { useRef, useState, useEffect } from 'react';
import { selectors } from '@grafana/e2e-selectors';
import '@grafana/data';
import { useStyles2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';
import { Icon } from '../Icon/Icon.js';
import { useMenuFocus } from './hooks.js';
import { isElementOverflowing } from './utils.js';

const SubMenu = React__default.memo(({ items, isOpen, close, customStyle }) => {
  const styles = useStyles2(getStyles);
  const localRef = useRef(null);
  const [handleKeys] = useMenuFocus({
    localRef,
    isMenuOpen: isOpen,
    close
  });
  const [pushLeft, setPushLeft] = useState(false);
  useEffect(() => {
    if (isOpen && localRef.current) {
      setPushLeft(isElementOverflowing(localRef.current));
    }
  }, [isOpen]);
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement("div", { className: styles.iconWrapper, "aria-hidden": true, "data-testid": selectors.components.Menu.SubMenu.icon }, /* @__PURE__ */ React__default.createElement(Icon, { name: "angle-right", className: styles.icon })), isOpen && /* @__PURE__ */ React__default.createElement(
    "div",
    {
      ref: localRef,
      className: cx(styles.subMenu, { [styles.pushLeft]: pushLeft }),
      "data-testid": selectors.components.Menu.SubMenu.container,
      style: customStyle
    },
    /* @__PURE__ */ React__default.createElement("div", { tabIndex: -1, className: styles.itemsWrapper, role: "menu", onKeyDown: handleKeys }, items)
  ));
});
SubMenu.displayName = "SubMenu";
const getStyles = (theme) => {
  return {
    iconWrapper: css({
      display: "flex",
      flex: 1,
      justifyContent: "end"
    }),
    icon: css({
      opacity: 0.7,
      marginLeft: theme.spacing(1),
      color: theme.colors.text.secondary
    }),
    itemsWrapper: css({
      background: theme.colors.background.primary,
      boxShadow: theme.shadows.z3,
      display: "inline-block",
      borderRadius: theme.shape.radius.default
    }),
    pushLeft: css({
      right: "100%",
      left: "unset"
    }),
    subMenu: css({
      position: "absolute",
      top: 0,
      left: "100%",
      zIndex: theme.zIndex.dropdown
    })
  };
};

export { SubMenu };
//# sourceMappingURL=SubMenu.js.map
