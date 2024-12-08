import React__default, { Component } from 'react';

var __defProp = Object.defineProperty;
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
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const ModalsContext = React__default.createContext({
  component: null,
  props: {},
  showModal: () => {
  },
  hideModal: () => {
  }
});
class ModalsProvider extends Component {
  constructor(props) {
    super(props);
    __publicField(this, "showModal", (component, props) => {
      this.setState({
        component,
        props
      });
    });
    __publicField(this, "hideModal", () => {
      this.setState({
        component: null,
        props: {}
      });
    });
    this.state = {
      component: props.component || null,
      props: props.props || {},
      showModal: this.showModal,
      hideModal: this.hideModal
    };
  }
  render() {
    return /* @__PURE__ */ React__default.createElement(ModalsContext.Provider, { value: this.state }, this.props.children);
  }
}
const ModalRoot = () => /* @__PURE__ */ React__default.createElement(ModalsContext.Consumer, null, ({ component: Component2, props }) => {
  return Component2 ? /* @__PURE__ */ React__default.createElement(Component2, __spreadValues({}, props)) : null;
});
const ModalsController = ModalsContext.Consumer;

export { ModalRoot, ModalsContext, ModalsController, ModalsProvider };
//# sourceMappingURL=ModalsContext.js.map
