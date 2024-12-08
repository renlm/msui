import { css, cx } from '@emotion/css';
import React from 'react';
import { FixedSizeList } from 'react-window';
import { stylesFactory, LoadingPlaceholder, HorizontalGroup, Label, Input, BrowserLabel, Button, withTheme2 } from '@grafana/ui';
import { escapeLabelValueInRegexSelector, escapeLabelValueInExactSelector } from '../language_utils.js';
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
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const EMPTY_SELECTOR = "{}";
const METRIC_LABEL = "__name__";
const LIST_ITEM_SIZE = 25;
function buildSelector(labels) {
  let singleMetric = "";
  const selectedLabels = [];
  for (const label of labels) {
    if ((label.name === METRIC_LABEL || label.selected) && label.values && label.values.length > 0) {
      const selectedValues = label.values.filter((value) => value.selected).map((value) => value.name);
      if (selectedValues.length > 1) {
        selectedLabels.push(`${label.name}=~"${selectedValues.map(escapeLabelValueInRegexSelector).join("|")}"`);
      } else if (selectedValues.length === 1) {
        if (label.name === METRIC_LABEL) {
          singleMetric = selectedValues[0];
        } else {
          selectedLabels.push(`${label.name}="${escapeLabelValueInExactSelector(selectedValues[0])}"`);
        }
      }
    }
  }
  return [singleMetric, "{", selectedLabels.join(","), "}"].join("");
}
function facetLabels(labels, possibleLabels, lastFacetted) {
  return labels.map((label) => {
    var _a;
    const possibleValues = possibleLabels[label.name];
    if (possibleValues) {
      let existingValues;
      if (label.name === lastFacetted && label.values) {
        existingValues = label.values;
      } else {
        const selectedValues = new Set(
          ((_a = label.values) == null ? void 0 : _a.filter((value) => value.selected).map((value) => value.name)) || []
        );
        existingValues = possibleValues.map((value) => ({ name: value, selected: selectedValues.has(value) }));
      }
      return __spreadProps(__spreadValues({}, label), {
        loading: false,
        values: existingValues,
        hidden: !possibleValues,
        facets: existingValues.length
      });
    }
    return __spreadProps(__spreadValues({}, label), { loading: false, hidden: !possibleValues, values: void 0, facets: 0 });
  });
}
const getStyles = stylesFactory((theme) => ({
  wrapper: css({
    backgroundColor: theme.colors.background.secondary,
    padding: theme.spacing(1),
    width: "100%"
  }),
  list: css({
    marginTop: theme.spacing(1),
    display: "flex",
    flexWrap: "wrap",
    maxHeight: "200px",
    overflow: "auto",
    alignContent: "flex-start"
  }),
  section: css({
    "& + &": {
      margin: `${theme.spacing(2)} 0`
    },
    position: "relative"
  }),
  selector: css({
    fontFamily: theme.typography.fontFamilyMonospace,
    marginBottom: theme.spacing(1)
  }),
  status: css({
    padding: theme.spacing(0.5),
    color: theme.colors.text.secondary,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    /* using absolute positioning because flex interferes with ellipsis */
    position: "absolute",
    width: "50%",
    right: 0,
    textAlign: "right",
    opacity: 0,
    [theme.transitions.handleMotion("no-preference", "reduce")]: {
      transition: "opacity 100ms linear"
    }
  }),
  statusShowing: css({
    opacity: 1
  }),
  error: css({
    color: theme.colors.error.main
  }),
  valueList: css({
    marginRight: theme.spacing(1),
    resize: "horizontal"
  }),
  valueListWrapper: css({
    borderLeft: `1px solid ${theme.colors.border.medium}`,
    margin: `${theme.spacing(1)} 0`,
    padding: `${theme.spacing(1)} 0 ${theme.spacing(1)} ${theme.spacing(1)}`
  }),
  valueListArea: css({
    display: "flex",
    flexWrap: "wrap",
    marginTop: theme.spacing(1)
  }),
  valueTitle: css({
    marginLeft: `-${theme.spacing(0.5)}`,
    marginBottom: theme.spacing(1)
  }),
  validationStatus: css({
    padding: theme.spacing(0.5),
    marginBottom: theme.spacing(1),
    color: theme.colors.text.maxContrast,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  })
}));
class UnthemedPrometheusMetricsBrowser extends React.Component {
  constructor() {
    super(...arguments);
    __publicField(this, "valueListsRef", React.createRef());
    __publicField(this, "state", {
      labels: [],
      labelSearchTerm: "",
      metricSearchTerm: "",
      status: "Ready",
      error: "",
      validationStatus: "",
      valueSearchTerm: ""
    });
    __publicField(this, "onChangeLabelSearch", (event) => {
      this.setState({ labelSearchTerm: event.target.value });
    });
    __publicField(this, "onChangeMetricSearch", (event) => {
      this.setState({ metricSearchTerm: event.target.value });
    });
    __publicField(this, "onChangeValueSearch", (event) => {
      this.setState({ valueSearchTerm: event.target.value });
    });
    __publicField(this, "onClickRunQuery", () => {
      const selector = buildSelector(this.state.labels);
      this.props.onChange(selector);
    });
    __publicField(this, "onClickRunRateQuery", () => {
      const selector = buildSelector(this.state.labels);
      const query = `rate(${selector}[$__rate_interval])`;
      this.props.onChange(query);
    });
    __publicField(this, "onClickClear", () => {
      this.setState((state) => {
        const labels = state.labels.map((label) => __spreadProps(__spreadValues({}, label), {
          values: void 0,
          selected: false,
          loading: false,
          hidden: false,
          facets: void 0
        }));
        return {
          labels,
          labelSearchTerm: "",
          metricSearchTerm: "",
          status: "",
          error: "",
          validationStatus: "",
          valueSearchTerm: ""
        };
      });
      this.props.deleteLastUsedLabels();
      this.fetchValues(METRIC_LABEL, EMPTY_SELECTOR);
    });
    __publicField(this, "onClickLabel", (name, value, event) => {
      const label = this.state.labels.find((l) => l.name === name);
      if (!label) {
        return;
      }
      const selected = !label.selected;
      let nextValue = { selected };
      if (label.values && !selected) {
        const values = label.values.map((value2) => __spreadProps(__spreadValues({}, value2), { selected: false }));
        nextValue = __spreadProps(__spreadValues({}, nextValue), { facets: 0, values });
      }
      this.setState({ labelSearchTerm: "" });
      this.updateLabelState(name, nextValue, "", () => this.doFacettingForLabel(name));
    });
    __publicField(this, "onClickValue", (name, value, event) => {
      const label = this.state.labels.find((l) => l.name === name);
      if (!label || !label.values) {
        return;
      }
      this.setState({ labelSearchTerm: "" });
      const values = label.values.map((v) => __spreadProps(__spreadValues({}, v), { selected: v.name === value ? !v.selected : v.selected }));
      this.updateLabelState(name, { values }, "", () => this.doFacetting(name));
    });
    __publicField(this, "onClickMetric", (name, value, event) => {
      const label = this.state.labels.find((l) => l.name === name);
      if (!label || !label.values) {
        return;
      }
      this.setState({ metricSearchTerm: "" });
      const values = label.values.map((v) => __spreadProps(__spreadValues({}, v), {
        selected: v.name === value || v.selected ? !v.selected : v.selected
      }));
      const selected = values.some((v) => v.selected);
      this.updateLabelState(name, { selected, values }, "", () => this.doFacetting(name));
    });
    __publicField(this, "onClickValidate", () => {
      const selector = buildSelector(this.state.labels);
      this.validateSelector(selector);
    });
    __publicField(this, "doFacetting", (lastFacetted) => {
      const selector = buildSelector(this.state.labels);
      if (selector === EMPTY_SELECTOR) {
        const labels = this.state.labels.map((label) => {
          return __spreadProps(__spreadValues({}, label), { facets: 0, values: void 0, hidden: false });
        });
        this.setState({ labels }, () => {
          this.state.labels.forEach(
            (label) => (label.selected || label.name === METRIC_LABEL) && this.fetchValues(label.name, selector)
          );
        });
      } else {
        this.fetchSeries(selector, lastFacetted);
      }
    });
  }
  updateLabelState(name, updatedFields, status = "", cb) {
    this.setState((state) => {
      const labels = state.labels.map((label) => {
        if (label.name === name) {
          return __spreadValues(__spreadValues({}, label), updatedFields);
        }
        return label;
      });
      const error = status ? "" : state.error;
      return { labels, status, error, validationStatus: "" };
    }, cb);
  }
  componentDidMount() {
    const { languageProvider, lastUsedLabels } = this.props;
    if (languageProvider) {
      const selectedLabels = lastUsedLabels;
      languageProvider.start(this.props.timeRange).then(() => {
        let rawLabels = languageProvider.getLabelKeys();
        this.fetchValues(METRIC_LABEL, EMPTY_SELECTOR);
        const labels = rawLabels.map((label, i, arr) => ({
          name: label,
          selected: selectedLabels.includes(label),
          loading: false
        }));
        this.setState({ labels }, () => {
          this.state.labels.forEach((label) => {
            if (label.selected) {
              this.fetchValues(label.name, EMPTY_SELECTOR);
            }
          });
        });
      });
    }
  }
  doFacettingForLabel(name) {
    const label = this.state.labels.find((l) => l.name === name);
    if (!label) {
      return;
    }
    const selectedLabels = this.state.labels.filter((label2) => label2.selected).map((label2) => label2.name);
    this.props.storeLastUsedLabels(selectedLabels);
    if (label.selected) {
      if (!label.values) {
        this.fetchValues(name, buildSelector(this.state.labels));
      }
    } else {
      this.doFacetting();
    }
  }
  async fetchValues(name, selector) {
    const { languageProvider } = this.props;
    this.updateLabelState(name, { loading: true }, `Fetching values for ${name}`);
    try {
      let rawValues = await languageProvider.getLabelValues(name);
      if (selector !== buildSelector(this.state.labels)) {
        this.updateLabelState(name, { loading: false });
        return;
      }
      const values = [];
      const { metricsMetadata } = languageProvider;
      for (const labelValue of rawValues) {
        const value = { name: labelValue };
        if (name === METRIC_LABEL && metricsMetadata) {
          const meta = metricsMetadata[labelValue];
          if (meta) {
            value.details = `(${meta.type}) ${meta.help}`;
          }
        }
        values.push(value);
      }
      this.updateLabelState(name, { values, loading: false });
    } catch (error) {
      console.error(error);
    }
  }
  async fetchSeries(selector, lastFacetted) {
    const { languageProvider } = this.props;
    if (lastFacetted) {
      this.updateLabelState(lastFacetted, { loading: true }, `Facetting labels for ${selector}`);
    }
    try {
      const possibleLabels = await languageProvider.fetchSeriesLabels(selector, true);
      if (selector !== buildSelector(this.state.labels)) {
        if (lastFacetted) {
          this.updateLabelState(lastFacetted, { loading: false });
        }
        return;
      }
      if (Object.keys(possibleLabels).length === 0) {
        this.setState({ error: `Empty results, no matching label for ${selector}` });
        return;
      }
      const labels = facetLabels(this.state.labels, possibleLabels, lastFacetted);
      this.setState({ labels, error: "" });
      if (lastFacetted) {
        this.updateLabelState(lastFacetted, { loading: false });
      }
    } catch (error) {
      console.error(error);
    }
  }
  async validateSelector(selector) {
    const { languageProvider } = this.props;
    this.setState({ validationStatus: `Validating selector ${selector}`, error: "" });
    const streams = await languageProvider.fetchSeries(selector);
    this.setState({ validationStatus: `Selector is valid (${streams.length} series found)` });
  }
  render() {
    var _a, _b;
    const { theme } = this.props;
    const { labels, labelSearchTerm, metricSearchTerm, status, error, validationStatus, valueSearchTerm } = this.state;
    const styles = getStyles(theme);
    if (labels.length === 0) {
      return /* @__PURE__ */ React.createElement("div", { className: styles.wrapper }, /* @__PURE__ */ React.createElement(LoadingPlaceholder, { text: "Loading labels..." }));
    }
    let metrics = labels.find((label) => label.name === METRIC_LABEL);
    if (metrics && metricSearchTerm) {
      metrics = __spreadProps(__spreadValues({}, metrics), {
        values: (_a = metrics.values) == null ? void 0 : _a.filter((value) => value.selected || value.name.includes(metricSearchTerm))
      });
    }
    let nonMetricLabels = labels.filter((label) => !label.hidden && label.name !== METRIC_LABEL);
    if (labelSearchTerm) {
      nonMetricLabels = nonMetricLabels.filter((label) => label.selected || label.name.includes(labelSearchTerm));
    }
    let selectedLabels = nonMetricLabels.filter((label) => label.selected && label.values);
    if (valueSearchTerm) {
      selectedLabels = selectedLabels.map((label) => {
        var _a2;
        return __spreadProps(__spreadValues({}, label), {
          values: (_a2 = label.values) == null ? void 0 : _a2.filter((value) => value.selected || value.name.includes(valueSearchTerm))
        });
      });
    }
    const selector = buildSelector(this.state.labels);
    const empty = selector === EMPTY_SELECTOR;
    const metricCount = ((_b = metrics == null ? void 0 : metrics.values) == null ? void 0 : _b.length) || 0;
    return /* @__PURE__ */ React.createElement("div", { className: styles.wrapper }, /* @__PURE__ */ React.createElement(HorizontalGroup, { align: "flex-start", spacing: "lg" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: styles.section }, /* @__PURE__ */ React.createElement(Label, { description: "Once a metric is selected only possible labels are shown." }, "1. Select a metric"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(
      Input,
      {
        onChange: this.onChangeMetricSearch,
        "aria-label": "Filter expression for metric",
        value: metricSearchTerm,
        "data-testid": selectors.components.DataSource.Prometheus.queryEditor.code.metricsBrowser.selectMetric
      }
    )), /* @__PURE__ */ React.createElement(
      "div",
      {
        role: "list",
        className: styles.valueListWrapper,
        "data-testid": selectors.components.DataSource.Prometheus.queryEditor.code.metricsBrowser.metricList
      },
      /* @__PURE__ */ React.createElement(
        FixedSizeList,
        {
          height: Math.min(450, metricCount * LIST_ITEM_SIZE),
          itemCount: metricCount,
          itemSize: LIST_ITEM_SIZE,
          itemKey: (i) => metrics.values[i].name,
          width: 300,
          className: styles.valueList
        },
        ({ index, style }) => {
          var _a2;
          const value = (_a2 = metrics == null ? void 0 : metrics.values) == null ? void 0 : _a2[index];
          if (!value) {
            return null;
          }
          return /* @__PURE__ */ React.createElement("div", { style }, /* @__PURE__ */ React.createElement(
            BrowserLabel,
            {
              name: metrics.name,
              value: value == null ? void 0 : value.name,
              title: value.details,
              active: value == null ? void 0 : value.selected,
              onClick: this.onClickMetric,
              searchTerm: metricSearchTerm
            }
          ));
        }
      )
    ))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: styles.section }, /* @__PURE__ */ React.createElement(Label, { description: "Once label values are selected, only possible label combinations are shown." }, "2. Select labels to search in"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(
      Input,
      {
        onChange: this.onChangeLabelSearch,
        "aria-label": "Filter expression for label",
        value: labelSearchTerm,
        "data-testid": selectors.components.DataSource.Prometheus.queryEditor.code.metricsBrowser.labelNamesFilter
      }
    )), /* @__PURE__ */ React.createElement("div", { className: styles.list, style: { height: 120 } }, nonMetricLabels.map((label) => /* @__PURE__ */ React.createElement(
      BrowserLabel,
      {
        key: label.name,
        name: label.name,
        loading: label.loading,
        active: label.selected,
        hidden: label.hidden,
        facets: label.facets,
        onClick: this.onClickLabel,
        searchTerm: labelSearchTerm
      }
    )))), /* @__PURE__ */ React.createElement("div", { className: styles.section }, /* @__PURE__ */ React.createElement(Label, { description: "Use the search field to find values across selected labels." }, "3. Select (multiple) values for your labels"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(
      Input,
      {
        onChange: this.onChangeValueSearch,
        "aria-label": "Filter expression for label values",
        value: valueSearchTerm,
        "data-testid": selectors.components.DataSource.Prometheus.queryEditor.code.metricsBrowser.labelValuesFilter
      }
    )), /* @__PURE__ */ React.createElement("div", { className: styles.valueListArea, ref: this.valueListsRef }, selectedLabels.map((label) => {
      var _a2, _b2, _c;
      return /* @__PURE__ */ React.createElement(
        "div",
        {
          role: "list",
          key: label.name,
          "aria-label": `Values for ${label.name}`,
          className: styles.valueListWrapper
        },
        /* @__PURE__ */ React.createElement("div", { className: styles.valueTitle }, /* @__PURE__ */ React.createElement(
          BrowserLabel,
          {
            name: label.name,
            loading: label.loading,
            active: label.selected,
            hidden: label.hidden,
            facets: label.facets || ((_a2 = label.values) == null ? void 0 : _a2.length),
            onClick: this.onClickLabel
          }
        )),
        /* @__PURE__ */ React.createElement(
          FixedSizeList,
          {
            height: Math.min(200, LIST_ITEM_SIZE * (((_b2 = label.values) == null ? void 0 : _b2.length) || 0)),
            itemCount: ((_c = label.values) == null ? void 0 : _c.length) || 0,
            itemSize: 28,
            itemKey: (i) => label.values[i].name,
            width: 200,
            className: styles.valueList
          },
          ({ index, style }) => {
            var _a3;
            const value = (_a3 = label.values) == null ? void 0 : _a3[index];
            if (!value) {
              return null;
            }
            return /* @__PURE__ */ React.createElement("div", { style }, /* @__PURE__ */ React.createElement(
              BrowserLabel,
              {
                name: label.name,
                value: value == null ? void 0 : value.name,
                active: value == null ? void 0 : value.selected,
                onClick: this.onClickValue,
                searchTerm: valueSearchTerm
              }
            ));
          }
        )
      );
    }))))), /* @__PURE__ */ React.createElement("div", { className: styles.section }, /* @__PURE__ */ React.createElement(Label, null, "4. Resulting selector"), /* @__PURE__ */ React.createElement("div", { "aria-label": "selector", className: styles.selector }, selector), validationStatus && /* @__PURE__ */ React.createElement("div", { className: styles.validationStatus }, validationStatus), /* @__PURE__ */ React.createElement(HorizontalGroup, null, /* @__PURE__ */ React.createElement(
      Button,
      {
        "data-testid": selectors.components.DataSource.Prometheus.queryEditor.code.metricsBrowser.useQuery,
        "aria-label": "Use selector for query button",
        disabled: empty,
        onClick: this.onClickRunQuery
      },
      "Use query"
    ), /* @__PURE__ */ React.createElement(
      Button,
      {
        "data-testid": selectors.components.DataSource.Prometheus.queryEditor.code.metricsBrowser.useAsRateQuery,
        "aria-label": "Use selector as metrics button",
        variant: "secondary",
        disabled: empty,
        onClick: this.onClickRunRateQuery
      },
      "Use as rate query"
    ), /* @__PURE__ */ React.createElement(
      Button,
      {
        "data-testid": selectors.components.DataSource.Prometheus.queryEditor.code.metricsBrowser.validateSelector,
        "aria-label": "Validate submit button",
        variant: "secondary",
        disabled: empty,
        onClick: this.onClickValidate
      },
      "Validate selector"
    ), /* @__PURE__ */ React.createElement(
      Button,
      {
        "data-testid": selectors.components.DataSource.Prometheus.queryEditor.code.metricsBrowser.clear,
        "aria-label": "Selector clear button",
        variant: "secondary",
        onClick: this.onClickClear
      },
      "Clear"
    ), /* @__PURE__ */ React.createElement("div", { className: cx(styles.status, (status || error) && styles.statusShowing) }, /* @__PURE__ */ React.createElement("span", { className: error ? styles.error : "" }, error || status)))));
  }
}
const PrometheusMetricsBrowser = withTheme2(UnthemedPrometheusMetricsBrowser);

export { PrometheusMetricsBrowser, UnthemedPrometheusMetricsBrowser, buildSelector, facetLabels };
//# sourceMappingURL=PrometheusMetricsBrowser.js.map
