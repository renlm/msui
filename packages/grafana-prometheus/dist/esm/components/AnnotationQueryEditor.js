import React from 'react';
import { EditorRows, EditorRow, EditorField, EditorSwitch } from '@grafana/experimental';
import { AutoSizeInput, Space, Input } from '@grafana/ui';
import { PromQueryCodeEditor } from '../querybuilder/components/PromQueryCodeEditor.js';
import { selectors } from '../grafana-e2e-selectors/src/selectors/index.js';

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
function AnnotationQueryEditor(props) {
  const annotation = props.annotation;
  const onAnnotationChange = props.onAnnotationChange;
  const query = { expr: annotation.expr, refId: annotation.name, interval: annotation.step };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(EditorRows, null, /* @__PURE__ */ React.createElement(
    PromQueryCodeEditor,
    __spreadProps(__spreadValues({}, props), {
      query,
      showExplain: false,
      onChange: (query2) => {
        onAnnotationChange(__spreadProps(__spreadValues({}, annotation), {
          expr: query2.expr
        }));
      }
    })
  ), /* @__PURE__ */ React.createElement(EditorRow, null, /* @__PURE__ */ React.createElement(
    EditorField,
    {
      label: "Min step",
      tooltip: /* @__PURE__ */ React.createElement(React.Fragment, null, "An additional lower limit for the step parameter of the Prometheus query and for the", " ", /* @__PURE__ */ React.createElement("code", null, "$__interval"), " and ", /* @__PURE__ */ React.createElement("code", null, "$__rate_interval"), " variables.")
    },
    /* @__PURE__ */ React.createElement(
      AutoSizeInput,
      {
        type: "text",
        "aria-label": "Set lower limit for the step parameter",
        placeholder: "auto",
        minWidth: 10,
        onCommitChange: (ev) => {
          onAnnotationChange(__spreadProps(__spreadValues({}, annotation), {
            step: ev.currentTarget.value
          }));
        },
        defaultValue: query.interval,
        id: selectors.components.DataSource.Prometheus.annotations.minStep
      }
    )
  ))), /* @__PURE__ */ React.createElement(Space, { v: 0.5 }), /* @__PURE__ */ React.createElement(EditorRow, null, /* @__PURE__ */ React.createElement(
    EditorField,
    {
      label: "Title",
      tooltip: "Use either the name or a pattern. For example, {{instance}} is replaced with label value for the label instance."
    },
    /* @__PURE__ */ React.createElement(
      Input,
      {
        type: "text",
        placeholder: "{{alertname}}",
        value: annotation.titleFormat,
        onChange: (event) => {
          onAnnotationChange(__spreadProps(__spreadValues({}, annotation), {
            titleFormat: event.currentTarget.value
          }));
        },
        "data-testid": selectors.components.DataSource.Prometheus.annotations.title
      }
    )
  ), /* @__PURE__ */ React.createElement(EditorField, { label: "Tags" }, /* @__PURE__ */ React.createElement(
    Input,
    {
      type: "text",
      placeholder: "label1,label2",
      value: annotation.tagKeys,
      onChange: (event) => {
        onAnnotationChange(__spreadProps(__spreadValues({}, annotation), {
          tagKeys: event.currentTarget.value
        }));
      },
      "data-testid": selectors.components.DataSource.Prometheus.annotations.tags
    }
  )), /* @__PURE__ */ React.createElement(
    EditorField,
    {
      label: "Text",
      tooltip: "Use either the name or a pattern. For example, {{instance}} is replaced with label value for the label instance."
    },
    /* @__PURE__ */ React.createElement(
      Input,
      {
        type: "text",
        placeholder: "{{instance}}",
        value: annotation.textFormat,
        onChange: (event) => {
          onAnnotationChange(__spreadProps(__spreadValues({}, annotation), {
            textFormat: event.currentTarget.value
          }));
        },
        "data-testid": selectors.components.DataSource.Prometheus.annotations.text
      }
    )
  ), /* @__PURE__ */ React.createElement(
    EditorField,
    {
      label: "Series value as timestamp",
      tooltip: "The unit of timestamp is milliseconds. If the unit of the series value is seconds, multiply its range vector by 1000."
    },
    /* @__PURE__ */ React.createElement(
      EditorSwitch,
      {
        value: annotation.useValueForTime,
        onChange: (event) => {
          onAnnotationChange(__spreadProps(__spreadValues({}, annotation), {
            useValueForTime: event.currentTarget.value
          }));
        },
        "data-testid": selectors.components.DataSource.Prometheus.annotations.seriesValueAsTimestamp
      }
    )
  )));
}

export { AnnotationQueryEditor };
//# sourceMappingURL=AnnotationQueryEditor.js.map
