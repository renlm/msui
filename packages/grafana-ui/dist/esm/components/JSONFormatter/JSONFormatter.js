import React__default, { PureComponent, createRef } from 'react';
import { JsonExplorer } from './json_explorer/json_explorer.js';

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class JSONFormatter extends PureComponent {
  constructor() {
    super(...arguments);
    __publicField(this, "wrapperRef", createRef());
    __publicField(this, "renderJson", () => {
      const { json, config, open, onDidRender } = this.props;
      const wrapperEl = this.wrapperRef.current;
      const formatter = new JsonExplorer(json, open, config);
      const hasChildren = wrapperEl.hasChildNodes();
      if (hasChildren) {
        wrapperEl.replaceChild(formatter.render(), wrapperEl.lastChild);
      } else {
        wrapperEl.appendChild(formatter.render());
      }
      if (onDidRender) {
        onDidRender(formatter.json);
      }
    });
  }
  componentDidMount() {
    this.renderJson();
  }
  componentDidUpdate() {
    this.renderJson();
  }
  render() {
    const { className } = this.props;
    return /* @__PURE__ */ React__default.createElement("div", { className, ref: this.wrapperRef });
  }
}
__publicField(JSONFormatter, "defaultProps", {
  open: 3,
  config: {
    animateOpen: true
  }
});

export { JSONFormatter };
//# sourceMappingURL=JSONFormatter.js.map
