import classNames from 'classnames';
import React__default, { PureComponent } from 'react';
import '../../../../utils/dom.js';
import '../../../../utils/colors.js';
import { validate, EventsWithValidation, hasValidationEvent } from '../../../../utils/validate.js';
import 'slate';
import 'lodash';
import 'ansicolor';
import '../../../../utils/logger.js';

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
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var LegacyInputStatus = /* @__PURE__ */ ((LegacyInputStatus2) => {
  LegacyInputStatus2["Invalid"] = "invalid";
  LegacyInputStatus2["Valid"] = "valid";
  return LegacyInputStatus2;
})(LegacyInputStatus || {});
class Input extends PureComponent {
  constructor() {
    super(...arguments);
    __publicField(this, "state", {
      error: null
    });
    __publicField(this, "validatorAsync", (validationRules) => {
      return (evt) => {
        const errors = validate(evt.target.value, validationRules);
        this.setState((prevState) => {
          return __spreadProps(__spreadValues({}, prevState), { error: errors ? errors[0] : null });
        });
      };
    });
    __publicField(this, "populateEventPropsWithStatus", (restProps, validationEvents) => {
      const inputElementProps = __spreadValues({}, restProps);
      if (!validationEvents) {
        return inputElementProps;
      }
      Object.keys(EventsWithValidation).forEach((eventName) => {
        if (hasValidationEvent(eventName, validationEvents) || restProps[eventName]) {
          inputElementProps[eventName] = async (evt) => {
            evt.persist();
            if (hasValidationEvent(eventName, validationEvents)) {
              await this.validatorAsync(validationEvents[eventName]).apply(this, [evt]);
            }
            if (restProps[eventName]) {
              restProps[eventName].apply(null, [evt, this.status]);
            }
          };
        }
      });
      return inputElementProps;
    });
  }
  get status() {
    return this.state.error ? "invalid" /* Invalid */ : "valid" /* Valid */;
  }
  get isInvalid() {
    return this.status === "invalid" /* Invalid */;
  }
  render() {
    const _a = this.props, { validationEvents, className, hideErrorMessage, inputRef } = _a, restProps = __objRest(_a, ["validationEvents", "className", "hideErrorMessage", "inputRef"]);
    const { error } = this.state;
    const inputClassName = classNames("gf-form-input", { invalid: this.isInvalid }, className);
    const inputElementProps = this.populateEventPropsWithStatus(restProps, validationEvents);
    return /* @__PURE__ */ React__default.createElement("div", { style: { flexGrow: 1 } }, /* @__PURE__ */ React__default.createElement("input", __spreadProps(__spreadValues({}, inputElementProps), { ref: inputRef, className: inputClassName })), error && !hideErrorMessage && /* @__PURE__ */ React__default.createElement("span", null, error));
  }
}
__publicField(Input, "defaultProps", {
  className: ""
});

export { Input, LegacyInputStatus };
//# sourceMappingURL=Input.js.map
