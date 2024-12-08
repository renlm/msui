import React__default, { PureComponent, createRef } from 'react';

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class ClickOutsideWrapper extends PureComponent {
  constructor() {
    super(...arguments);
    __publicField(this, "myRef", createRef());
    __publicField(this, "state", {
      hasEventListener: false
    });
    __publicField(this, "onOutsideClick", (event) => {
      const domNode = this.myRef.current;
      if (!domNode || event.target instanceof Node && !domNode.contains(event.target)) {
        this.props.onClick();
      }
    });
  }
  componentDidMount() {
    this.props.parent.addEventListener("click", this.onOutsideClick, this.props.useCapture);
    if (this.props.includeButtonPress) {
      this.props.parent.addEventListener("keyup", this.onOutsideClick, this.props.useCapture);
    }
  }
  componentWillUnmount() {
    this.props.parent.removeEventListener("click", this.onOutsideClick, this.props.useCapture);
    if (this.props.includeButtonPress) {
      this.props.parent.removeEventListener("keyup", this.onOutsideClick, this.props.useCapture);
    }
  }
  render() {
    return /* @__PURE__ */ React__default.createElement("div", { ref: this.myRef }, this.props.children);
  }
}
__publicField(ClickOutsideWrapper, "defaultProps", {
  includeButtonPress: true,
  parent: typeof window !== "undefined" ? window : void 0,
  useCapture: false
});

export { ClickOutsideWrapper };
//# sourceMappingURL=ClickOutsideWrapper.js.map
