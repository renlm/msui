import { css } from '@emotion/css';
import debounce from 'debounce-promise';
import React, { useState, useCallback } from 'react';
import Highlighter from 'react-highlight-words';
import { toOption } from '@grafana/data';
import { EditorFieldGroup, EditorField } from '@grafana/experimental';
import { config } from '@grafana/runtime';
import { useStyles2, InlineFieldRow, InlineField, AsyncSelect, Button, Icon, useTheme2, getSelectStyles, CustomScrollbar } from '@grafana/ui';
import { SelectMenuOptions } from '../../gcopypaste/packages/grafana-ui/src/components/Select/SelectBase.js';
import { truncateResult } from '../../language_utils.js';
import { regexifyLabelValuesQueryString } from '../parsingUtils.js';
import { MetricsModal } from './metrics-modal/MetricsModal.js';
import { tracking } from './metrics-modal/state/helpers.js';
import { selectors } from '../../grafana-e2e-selectors/src/selectors/index.js';

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
const splitSeparator = " ";
const PROMETHEUS_QUERY_BUILDER_MAX_RESULTS = 1e3;
function MetricSelect({
  datasource,
  query,
  onChange,
  onGetMetrics,
  labelsFilters,
  metricLookupDisabled,
  onBlur,
  variableEditor
}) {
  var _a;
  const styles = useStyles2(getStyles);
  const [state, setState] = useState({});
  const prometheusMetricEncyclopedia = config.featureToggles.prometheusMetricEncyclopedia;
  const metricsModalOption = [
    {
      value: "BrowseMetrics",
      label: "Metrics explorer",
      description: "Browse and filter all metrics and metadata with a fuzzy search"
    }
  ];
  const customFilterOption = useCallback(
    (option, searchQuery) => {
      var _a2;
      const label = (_a2 = option.label) != null ? _a2 : option.value;
      if (!label) {
        return false;
      }
      if (!label.toLowerCase) {
        return true;
      }
      const searchWords = searchQuery.split(splitSeparator);
      return searchWords.reduce((acc, cur) => {
        const matcheSearch = label.toLowerCase().includes(cur.toLowerCase());
        let browseOption = false;
        if (prometheusMetricEncyclopedia) {
          browseOption = label === "Metrics explorer";
        }
        return acc && (matcheSearch || browseOption);
      }, true);
    },
    [prometheusMetricEncyclopedia]
  );
  const formatOptionLabel = useCallback(
    (option, meta) => {
      var _a2;
      if (option["__isNew__"]) {
        return option.label;
      }
      return /* @__PURE__ */ React.createElement(
        Highlighter,
        {
          searchWords: meta.inputValue.split(splitSeparator),
          textToHighlight: (_a2 = option.label) != null ? _a2 : "",
          highlightClassName: styles.highlight
        }
      );
    },
    [styles.highlight]
  );
  const formatKeyValueStringsForLabelValuesQuery = (query2, labelsFilters2) => {
    const queryString = regexifyLabelValuesQueryString(query2);
    return formatPrometheusLabelFiltersToString(queryString, labelsFilters2);
  };
  const getMetricLabels = (query2) => {
    const results = datasource.metricFindQuery(formatKeyValueStringsForLabelValuesQuery(query2, labelsFilters));
    return results.then((results2) => {
      const resultsLength = results2.length;
      truncateResult(results2);
      if (resultsLength > results2.length) {
        setState(__spreadProps(__spreadValues({}, state), { resultsTruncated: true }));
      } else {
        setState(__spreadProps(__spreadValues({}, state), { resultsTruncated: false }));
      }
      const resultsOptions = results2.map((result) => {
        return {
          label: result.text,
          value: result.text
        };
      });
      if (prometheusMetricEncyclopedia) {
        return [...metricsModalOption, ...resultsOptions];
      } else {
        return resultsOptions;
      }
    });
  };
  const metricLookupDisabledSearch = () => Promise.resolve([]);
  const debouncedSearch = debounce(
    (query2) => getMetricLabels(query2),
    datasource.getDebounceTimeInMilliseconds()
  );
  const CustomOption = (props) => {
    const option = props.data;
    if (option.value === "BrowseMetrics") {
      const isFocused = props.isFocused ? styles.focus : "";
      return (
        // TODO: fix keyboard a11y
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        /* @__PURE__ */ React.createElement(
          "div",
          __spreadProps(__spreadValues({}, props.innerProps), {
            ref: props.innerRef,
            className: `${styles.customOptionWidth} metric-encyclopedia-open`,
            "data-testid": selectors.components.Select.option,
            onKeyDown: (e) => {
              if (e.code === "Enter") {
                setState(__spreadProps(__spreadValues({}, state), { metricsModalOpen: true }));
              }
            }
          }),
          /* @__PURE__ */ React.createElement("div", { className: `${styles.customOption} ${isFocused} metric-encyclopedia-open` }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "metric-encyclopedia-open" }, option.label), /* @__PURE__ */ React.createElement("div", { className: `${styles.customOptionDesc} metric-encyclopedia-open` }, option.description)), /* @__PURE__ */ React.createElement(
            Button,
            {
              fill: "text",
              size: "sm",
              variant: "secondary",
              onClick: () => setState(__spreadProps(__spreadValues({}, state), { metricsModalOpen: true })),
              className: "metric-encyclopedia-open"
            },
            "Open",
            /* @__PURE__ */ React.createElement(Icon, { name: "arrow-right" })
          ))
        )
      );
    }
    return SelectMenuOptions(props);
  };
  const CustomMenu = ({ children, maxHeight, innerRef, innerProps }) => {
    const theme = useTheme2();
    const stylesMenu = getSelectStyles(theme);
    const optionsLoaded = !React.isValidElement(children) && state.resultsTruncated;
    return /* @__PURE__ */ React.createElement(
      "div",
      __spreadProps(__spreadValues({}, innerProps), {
        className: `${stylesMenu.menu} ${styles.customMenuContainer}`,
        style: { maxHeight: Math.round(maxHeight * 0.9) },
        "aria-label": "Select options menu"
      }),
      /* @__PURE__ */ React.createElement(
        CustomScrollbar,
        {
          scrollRefCallback: innerRef,
          autoHide: false,
          autoHeightMax: "inherit",
          hideHorizontalTrack: true,
          showScrollIndicators: true
        },
        children
      ),
      optionsLoaded && /* @__PURE__ */ React.createElement("div", { className: styles.customMenuFooter }, /* @__PURE__ */ React.createElement("div", null, "Only the top 1000 metrics are displayed in the metric select. Use the metrics explorer to view all metrics."))
    );
  };
  const asyncSelect = () => {
    var _a2;
    return /* @__PURE__ */ React.createElement(
      AsyncSelect,
      {
        "data-testid": selectors.components.DataSource.Prometheus.queryEditor.builder.metricSelect,
        isClearable: Boolean(variableEditor),
        inputId: "prometheus-metric-select",
        className: styles.select,
        value: query.metric ? toOption(query.metric) : void 0,
        placeholder: "Select metric",
        allowCustomValue: true,
        formatOptionLabel,
        filterOption: customFilterOption,
        minMenuHeight: 250,
        onOpenMenu: async () => {
          if (metricLookupDisabled) {
            return;
          }
          setState({ isLoading: true });
          const metrics = await onGetMetrics();
          const initialMetrics = metrics.map((m) => m.value);
          const resultsLength = metrics.length;
          if (metrics.length > PROMETHEUS_QUERY_BUILDER_MAX_RESULTS) {
            truncateResult(metrics);
          }
          if (prometheusMetricEncyclopedia) {
            setState({
              // add the modal button option to the options
              metrics: [...metricsModalOption, ...metrics],
              isLoading: void 0,
              // pass the initial metrics into the metrics explorer
              initialMetrics,
              resultsTruncated: resultsLength > metrics.length
            });
          } else {
            setState({
              metrics,
              isLoading: void 0,
              resultsTruncated: resultsLength > metrics.length
            });
          }
        },
        loadOptions: metricLookupDisabled ? metricLookupDisabledSearch : debouncedSearch,
        isLoading: state.isLoading,
        defaultOptions: (_a2 = state.metrics) != null ? _a2 : Array.from(new Array(25), () => ({ value: "" })),
        onChange: (input) => {
          const value = input == null ? void 0 : input.value;
          if (value) {
            if (prometheusMetricEncyclopedia && value === "BrowseMetrics") {
              tracking("grafana_prometheus_metric_encyclopedia_open", null, "", query);
              setState(__spreadProps(__spreadValues({}, state), { metricsModalOpen: true }));
            } else {
              onChange(__spreadProps(__spreadValues({}, query), { metric: value }));
            }
          } else {
            onChange(__spreadProps(__spreadValues({}, query), { metric: "" }));
          }
        },
        components: prometheusMetricEncyclopedia ? { Option: CustomOption, MenuList: CustomMenu } : { MenuList: CustomMenu },
        onBlur
      }
    );
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, prometheusMetricEncyclopedia && !datasource.lookupsDisabled && state.metricsModalOpen && /* @__PURE__ */ React.createElement(
    MetricsModal,
    {
      datasource,
      isOpen: state.metricsModalOpen,
      onClose: () => setState(__spreadProps(__spreadValues({}, state), { metricsModalOpen: false })),
      query,
      onChange,
      initialMetrics: (_a = state.initialMetrics) != null ? _a : []
    }
  ), variableEditor ? /* @__PURE__ */ React.createElement(InlineFieldRow, null, /* @__PURE__ */ React.createElement(
    InlineField,
    {
      label: "Metric",
      labelWidth: 20,
      tooltip: /* @__PURE__ */ React.createElement("div", null, "Optional: returns a list of label values for the label name in the specified metric.")
    },
    asyncSelect()
  )) : /* @__PURE__ */ React.createElement(EditorFieldGroup, null, /* @__PURE__ */ React.createElement(EditorField, { label: "Metric" }, asyncSelect())));
}
const getStyles = (theme) => ({
  select: css({
    minWidth: "125px"
  }),
  highlight: css({
    label: "select__match-highlight",
    background: "inherit",
    padding: "inherit",
    color: theme.colors.warning.contrastText,
    backgroundColor: theme.colors.warning.main
  }),
  customOption: css({
    padding: "8px",
    display: "flex",
    justifyContent: "space-between",
    cursor: "pointer",
    ":hover": {
      backgroundColor: theme.colors.emphasize(theme.colors.background.primary, 0.1)
    }
  }),
  customOptionlabel: css({
    color: theme.colors.text.primary
  }),
  customOptionDesc: css({
    color: theme.colors.text.secondary,
    fontSize: theme.typography.size.xs,
    opacity: "50%"
  }),
  focus: css({
    backgroundColor: theme.colors.emphasize(theme.colors.background.primary, 0.1)
  }),
  customOptionWidth: css({
    minWidth: "400px"
  }),
  customMenuFooter: css({
    flex: 0,
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(1.5),
    borderTop: `1px solid ${theme.colors.border.weak}`,
    color: theme.colors.text.secondary
  }),
  customMenuContainer: css({
    display: "flex",
    flexDirection: "column",
    background: theme.colors.background.primary,
    boxShadow: theme.shadows.z3
  })
});
const formatPrometheusLabelFiltersToString = (queryString, labelsFilters) => {
  const filterArray = labelsFilters ? formatPrometheusLabelFilters(labelsFilters) : [];
  return `label_values({__name__=~".*${queryString}"${filterArray ? filterArray.join("") : ""}},__name__)`;
};
const formatPrometheusLabelFilters = (labelsFilters) => {
  return labelsFilters.map((label) => {
    return `,${label.label}="${label.value}"`;
  });
};

export { MetricSelect, PROMETHEUS_QUERY_BUILDER_MAX_RESULTS, formatPrometheusLabelFilters, formatPrometheusLabelFiltersToString };
//# sourceMappingURL=MetricSelect.js.map
