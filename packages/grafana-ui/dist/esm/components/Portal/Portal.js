import React__default, { useRef, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';
import '@grafana/data';
import { useTheme2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';

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
function Portal(props) {
  const { children, className, root, forwardedRef } = props;
  const theme = useTheme2();
  const node = useRef(null);
  const portalRoot = root != null ? root : getPortalContainer();
  if (!node.current) {
    node.current = document.createElement("div");
    if (className) {
      node.current.className = className;
    }
    node.current.style.position = "relative";
    node.current.style.zIndex = `${theme.zIndex.portal}`;
  }
  useLayoutEffect(() => {
    if (node.current) {
      portalRoot.appendChild(node.current);
    }
    return () => {
      if (node.current) {
        portalRoot.removeChild(node.current);
      }
    };
  }, [portalRoot]);
  return ReactDOM.createPortal(/* @__PURE__ */ React__default.createElement("div", { ref: forwardedRef }, children), node.current);
}
function getPortalContainer() {
  var _a;
  return (_a = window.document.getElementById("grafana-portal-container")) != null ? _a : document.body;
}
function PortalContainer() {
  return /* @__PURE__ */ React__default.createElement("div", { id: "grafana-portal-container" });
}
const RefForwardingPortal = React__default.forwardRef((props, ref) => {
  return /* @__PURE__ */ React__default.createElement(Portal, __spreadProps(__spreadValues({}, props), { forwardedRef: ref }));
});
RefForwardingPortal.displayName = "RefForwardingPortal";

export { Portal, PortalContainer, RefForwardingPortal, getPortalContainer };
//# sourceMappingURL=Portal.js.map
