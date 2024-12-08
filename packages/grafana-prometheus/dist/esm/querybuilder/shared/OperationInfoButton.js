import { css } from '@emotion/css';
import { offset, flip, shift, useFloating, autoUpdate, useClick, useDismiss, useInteractions } from '@floating-ui/react';
import React, { useState } from 'react';
import { renderMarkdown } from '@grafana/data';
import { FlexItem } from '@grafana/experimental';
import { useStyles2, Button, Portal } from '@grafana/ui';

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
const OperationInfoButton = React.memo(({ def, operation }) => {
  const styles = useStyles2(getStyles);
  const [show, setShow] = useState(false);
  const middleware = [
    offset(16),
    flip({
      fallbackAxisSideDirection: "end",
      // see https://floating-ui.com/docs/flip#combining-with-shift
      crossAxis: false,
      boundary: document.body
    }),
    shift()
  ];
  const { context, refs, floatingStyles } = useFloating({
    open: show,
    placement: "top",
    onOpenChange: setShow,
    middleware,
    whileElementsMounted: autoUpdate
  });
  const click = useClick(context);
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss, click]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
    Button,
    __spreadValues({
      title: "Click to show description",
      ref: refs.setReference,
      icon: "info-circle",
      size: "sm",
      variant: "secondary",
      fill: "text"
    }, getReferenceProps())
  ), show && /* @__PURE__ */ React.createElement(Portal, null, /* @__PURE__ */ React.createElement("div", __spreadProps(__spreadValues({ ref: refs.setFloating, style: floatingStyles }, getFloatingProps()), { className: styles.docBox }), /* @__PURE__ */ React.createElement("div", { className: styles.docBoxHeader }, /* @__PURE__ */ React.createElement("span", null, def.renderer(operation, def, "<expr>")), /* @__PURE__ */ React.createElement(FlexItem, { grow: 1 }), /* @__PURE__ */ React.createElement(
    Button,
    {
      icon: "times",
      onClick: () => setShow(false),
      fill: "text",
      variant: "secondary",
      title: "Remove operation"
    }
  )), /* @__PURE__ */ React.createElement(
    "div",
    {
      className: styles.docBoxBody,
      dangerouslySetInnerHTML: { __html: getOperationDocs(def, operation) }
    }
  ))));
});
OperationInfoButton.displayName = "OperationDocs";
const getStyles = (theme) => {
  return {
    docBox: css({
      overflow: "hidden",
      background: theme.colors.background.primary,
      border: `1px solid ${theme.colors.border.strong}`,
      boxShadow: theme.shadows.z3,
      maxWidth: "600px",
      padding: theme.spacing(1),
      borderRadius: theme.shape.radius.default,
      zIndex: theme.zIndex.tooltip
    }),
    docBoxHeader: css({
      fontSize: theme.typography.h5.fontSize,
      fontFamily: theme.typography.fontFamilyMonospace,
      paddingBottom: theme.spacing(1),
      display: "flex",
      alignItems: "center"
    }),
    docBoxBody: css({
      // The markdown paragraph has a marginBottom this removes it
      marginBottom: theme.spacing(-1),
      color: theme.colors.text.secondary
    })
  };
};
function getOperationDocs(def, op) {
  var _a;
  return renderMarkdown(def.explainHandler ? def.explainHandler(op, def) : (_a = def.documentation) != null ? _a : "no docs");
}

export { OperationInfoButton };
//# sourceMappingURL=OperationInfoButton.js.map
