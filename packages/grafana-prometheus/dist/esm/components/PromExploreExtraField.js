import { cx, css } from '@emotion/css';
import { isEqual } from 'lodash';
import React, { memo, useCallback } from 'react';
import { usePrevious } from 'react-use';
import { InlineFormLabel, RadioButtonGroup } from '@grafana/ui';
import { PromExemplarField } from './PromExemplarField.js';

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
const PromExploreExtraField = memo(({ query, datasource, onChange, onRunQuery }) => {
  var _a;
  const rangeOptions = getQueryTypeOptions(true);
  const prevQuery = usePrevious(query);
  const onExemplarChange = useCallback(
    (exemplar) => {
      if (!isEqual(query, prevQuery) || exemplar !== query.exemplar) {
        onChange(__spreadProps(__spreadValues({}, query), { exemplar }));
      }
    },
    [prevQuery, query, onChange]
  );
  function onChangeQueryStep(interval) {
    onChange(__spreadProps(__spreadValues({}, query), { interval }));
  }
  function onStepChange(e) {
    if (e.currentTarget.value !== query.interval) {
      onChangeQueryStep(e.currentTarget.value);
    }
  }
  function onReturnKeyDown(e) {
    if (e.key === "Enter" && e.shiftKey) {
      onRunQuery();
    }
  }
  const onQueryTypeChange = getQueryTypeChangeHandler(query, onChange);
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      "aria-label": "Prometheus extra field",
      className: "gf-form-inline",
      "data-testid": promExploreExtraFieldTestIds.extraFieldEditor
    },
    /* @__PURE__ */ React.createElement(
      "div",
      {
        "data-testid": promExploreExtraFieldTestIds.queryTypeField,
        className: cx(
          "gf-form explore-input-margin",
          css({
            flexWrap: "nowrap"
          })
        ),
        "aria-label": "Query type field"
      },
      /* @__PURE__ */ React.createElement(InlineFormLabel, { width: "auto" }, "Query type"),
      /* @__PURE__ */ React.createElement(
        RadioButtonGroup,
        {
          options: rangeOptions,
          value: query.range && query.instant ? "both" : query.instant ? "instant" : "range",
          onChange: onQueryTypeChange
        }
      )
    ),
    /* @__PURE__ */ React.createElement(
      "div",
      {
        "data-testid": promExploreExtraFieldTestIds.stepField,
        className: cx(
          "gf-form",
          css({
            flexWrap: "nowrap"
          })
        ),
        "aria-label": "Step field"
      },
      /* @__PURE__ */ React.createElement(
        InlineFormLabel,
        {
          width: 6,
          tooltip: "Time units and built-in variables can be used here, for example: $__interval, $__rate_interval, 5s, 1m, 3h, 1d, 1y (Default if no unit is specified: s)"
        },
        "Min step"
      ),
      /* @__PURE__ */ React.createElement(
        "input",
        {
          type: "text",
          className: "gf-form-input width-4",
          placeholder: "auto",
          onChange: onStepChange,
          onKeyDown: onReturnKeyDown,
          value: (_a = query.interval) != null ? _a : ""
        }
      )
    ),
    /* @__PURE__ */ React.createElement(PromExemplarField, { onChange: onExemplarChange, datasource, query })
  );
});
PromExploreExtraField.displayName = "PromExploreExtraField";
function getQueryTypeOptions(includeBoth) {
  const rangeOptions = [
    { value: "range", label: "Range", description: "Run query over a range of time" },
    {
      value: "instant",
      label: "Instant",
      description: 'Run query against a single point in time. For this query, the "To" time is used'
    }
  ];
  if (includeBoth) {
    rangeOptions.push({ value: "both", label: "Both", description: "Run an Instant query and a Range query" });
  }
  return rangeOptions;
}
function getQueryTypeChangeHandler(query, onChange) {
  return (queryType) => {
    if (queryType === "instant") {
      onChange(__spreadProps(__spreadValues({}, query), { instant: true, range: false, exemplar: false }));
    } else if (queryType === "range") {
      onChange(__spreadProps(__spreadValues({}, query), { instant: false, range: true }));
    } else {
      onChange(__spreadProps(__spreadValues({}, query), { instant: true, range: true }));
    }
  };
}
const promExploreExtraFieldTestIds = {
  extraFieldEditor: "prom-editor-extra-field",
  stepField: "prom-editor-extra-field-step",
  queryTypeField: "prom-editor-extra-field-query-type"
};

export { PromExploreExtraField, getQueryTypeChangeHandler, getQueryTypeOptions, promExploreExtraFieldTestIds };
//# sourceMappingURL=PromExploreExtraField.js.map
