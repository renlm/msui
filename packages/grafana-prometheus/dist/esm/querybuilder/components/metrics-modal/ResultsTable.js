import { css } from '@emotion/css';
import React from 'react';
import Highlighter from 'react-highlight-words';
import { useTheme2, Button, Tooltip, Icon } from '@grafana/ui';
import { docsTip } from '../../../configuration/ConfigEditor.js';
import { tracking } from './state/helpers.js';

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
function ResultsTable(props) {
  const { metrics, onChange, onClose, query, state, disableTextWrap } = props;
  const theme = useTheme2();
  const styles = getStyles(theme, disableTextWrap);
  function selectMetric(metric) {
    if (metric.value) {
      onChange(__spreadProps(__spreadValues({}, query), { metric: metric.value }));
      tracking("grafana_prom_metric_encycopedia_tracking", state, metric.value);
      onClose();
    }
  }
  function metaRows(metric) {
    var _a, _b, _c, _d;
    if (state.fullMetaSearch && metric) {
      return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("td", null, displayType((_a = metric.type) != null ? _a : "")), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement(
        Highlighter,
        {
          textToHighlight: (_b = metric.description) != null ? _b : "",
          searchWords: state.metaHaystackMatches,
          autoEscape: true,
          highlightClassName: styles.matchHighLight
        }
      )));
    } else {
      return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("td", null, displayType((_c = metric.type) != null ? _c : "")), /* @__PURE__ */ React.createElement("td", null, (_d = metric.description) != null ? _d : ""));
    }
  }
  function addHelpIcon(fullType, descriptiveType, link) {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, fullType, /* @__PURE__ */ React.createElement("span", { className: styles.tooltipSpace }, /* @__PURE__ */ React.createElement(
      Tooltip,
      {
        content: /* @__PURE__ */ React.createElement(React.Fragment, null, "When creating a ", descriptiveType, ", Prometheus exposes multiple series with the type counter.", " ", docsTip(link)),
        placement: "bottom-start",
        interactive: true
      },
      /* @__PURE__ */ React.createElement(Icon, { name: "info-circle", size: "xs" })
    )));
  }
  function displayType(type) {
    if (!type) {
      return "";
    }
    if (type.includes("(summary)")) {
      return addHelpIcon(type, "summary", "https://prometheus.io/docs/concepts/metric_types/#summary");
    }
    if (type.includes("(histogram)")) {
      return addHelpIcon(type, "histogram", "https://prometheus.io/docs/concepts/metric_types/#histogram");
    }
    return type;
  }
  function noMetricsMessages() {
    let message;
    if (!state.fuzzySearchQuery) {
      message = "There are no metrics found in the data source.";
    }
    if (query.labels.length > 0) {
      message = "There are no metrics found. Try to expand your label filters.";
    }
    if (state.fuzzySearchQuery || state.selectedTypes.length > 0) {
      message = "There are no metrics found. Try to expand your search and filters.";
    }
    return /* @__PURE__ */ React.createElement("tr", { className: styles.noResults }, /* @__PURE__ */ React.createElement("td", { colSpan: 3 }, message));
  }
  function textHighlight(state2) {
    if (state2.useBackend) {
      return [state2.fuzzySearchQuery];
    } else if (state2.fullMetaSearch) {
      return state2.metaHaystackMatches;
    } else {
      return state2.nameHaystackMatches;
    }
  }
  return /* @__PURE__ */ React.createElement("table", { className: styles.table }, /* @__PURE__ */ React.createElement("thead", { className: styles.stickyHeader }, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", { className: `${styles.nameWidth} ${styles.tableHeaderPadding}` }, "Name"), state.hasMetadata && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("th", { className: `${styles.typeWidth} ${styles.tableHeaderPadding}` }, "Type"), /* @__PURE__ */ React.createElement("th", { className: `${styles.descriptionWidth} ${styles.tableHeaderPadding}` }, "Description")), /* @__PURE__ */ React.createElement("th", { className: styles.selectButtonWidth }, " "))), /* @__PURE__ */ React.createElement("tbody", null, /* @__PURE__ */ React.createElement(React.Fragment, null, metrics.length > 0 && metrics.map((metric, idx) => {
    var _a, _b;
    return /* @__PURE__ */ React.createElement("tr", { key: (_a = metric == null ? void 0 : metric.value) != null ? _a : idx, className: styles.row }, /* @__PURE__ */ React.createElement("td", { className: styles.nameOverflow }, /* @__PURE__ */ React.createElement(
      Highlighter,
      {
        textToHighlight: (_b = metric == null ? void 0 : metric.value) != null ? _b : "",
        searchWords: textHighlight(state),
        autoEscape: true,
        highlightClassName: styles.matchHighLight
      }
    )), state.hasMetadata && metaRows(metric), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement(
      Button,
      {
        size: "md",
        variant: "secondary",
        onClick: () => selectMetric(metric),
        className: styles.centerButton
      },
      "Select"
    )));
  }), metrics.length === 0 && !state.isLoading && noMetricsMessages())));
}
const getStyles = (theme, disableTextWrap) => {
  return {
    table: css({
      tableLayout: disableTextWrap ? void 0 : "fixed",
      borderRadius: theme.shape.radius.default,
      width: "100%",
      whiteSpace: disableTextWrap ? "nowrap" : "normal",
      td: {
        padding: theme.spacing(1)
      },
      "td,th": {
        minWidth: theme.spacing(3),
        borderBottom: `1px solid ${theme.colors.border.weak}`
      }
    }),
    row: css({
      label: "row",
      borderBottom: `1px solid ${theme.colors.border.weak}`,
      "&:last-child": {
        borderBottom: 0
      }
    }),
    tableHeaderPadding: css({
      padding: "8px"
    }),
    matchHighLight: css({
      background: "inherit",
      color: theme.components.textHighlight.text,
      backgroundColor: theme.components.textHighlight.background
    }),
    nameWidth: css({
      width: disableTextWrap ? void 0 : "37.5%"
    }),
    nameOverflow: css({
      overflowWrap: disableTextWrap ? void 0 : "anywhere"
    }),
    typeWidth: css({
      width: disableTextWrap ? void 0 : "15%"
    }),
    descriptionWidth: css({
      width: disableTextWrap ? void 0 : "35%"
    }),
    selectButtonWidth: css({
      width: disableTextWrap ? void 0 : "12.5%"
    }),
    stickyHeader: css({
      position: "sticky",
      top: 0,
      backgroundColor: theme.colors.background.primary
    }),
    noResults: css({
      textAlign: "center",
      color: theme.colors.text.secondary
    }),
    tooltipSpace: css({
      marginLeft: "4px"
    }),
    centerButton: css({
      display: "block",
      margin: "auto",
      border: "none"
    })
  };
};

export { ResultsTable };
//# sourceMappingURL=ResultsTable.js.map
