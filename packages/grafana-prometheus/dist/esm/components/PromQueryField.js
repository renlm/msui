import { cx } from '@emotion/css';
import React from 'react';
import { isDataFrame, toLegacyResponseData } from '@grafana/data';
import { reportInteraction } from '@grafana/runtime';
import { Icon, clearButtonStyles, withTheme2 } from '@grafana/ui';
import { LocalStorageValueProvider } from '../gcopypaste/app/core/components/LocalStorageValueProvider/LocalStorageValueProvider.js';
import { makePromiseCancelable, isCancelablePromiseRejection } from '../gcopypaste/app/core/utils/CancelablePromise.js';
import { roundMsToMin } from '../language_utils.js';
import { PrometheusMetricsBrowser } from './PrometheusMetricsBrowser.js';
import { MonacoQueryFieldWrapper } from './monaco-query-field/MonacoQueryFieldWrapper.js';
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
const LAST_USED_LABELS_KEY = "grafana.datasources.prometheus.browser.labels";
function getChooserText(metricsLookupDisabled, hasSyntax, hasMetrics) {
  if (metricsLookupDisabled) {
    return "(Disabled)";
  }
  if (!hasSyntax) {
    return "Loading metrics...";
  }
  if (!hasMetrics) {
    return "(No metrics found)";
  }
  return "Metrics browser";
}
class PromQueryFieldClass extends React.PureComponent {
  constructor(props) {
    super(props);
    __publicField(this, "refreshHint", () => {
      const { datasource, query, data } = this.props;
      const initHints = datasource.getInitHints();
      const initHint = initHints.length > 0 ? initHints[0] : null;
      if (!data || data.series.length === 0) {
        this.setState({
          hint: initHint
        });
        return;
      }
      const result = isDataFrame(data.series[0]) ? data.series.map(toLegacyResponseData) : data.series;
      const queryHints = datasource.getQueryHints(query, result);
      let queryHint = queryHints.length > 0 ? queryHints[0] : null;
      this.setState({ hint: queryHint != null ? queryHint : initHint });
    });
    __publicField(this, "refreshMetrics", async () => {
      const {
        range,
        datasource: { languageProvider }
      } = this.props;
      this.languageProviderInitializationPromise = makePromiseCancelable(languageProvider.start(range));
      try {
        const remainingTasks = await this.languageProviderInitializationPromise.promise;
        await Promise.all(remainingTasks);
        this.onUpdateLanguage();
      } catch (err) {
        if (isCancelablePromiseRejection(err) && err.isCanceled) ; else {
          throw err;
        }
      }
    });
    /**
     * TODO #33976: Remove this, add histogram group (query = `histogram_quantile(0.95, sum(rate(${metric}[5m])) by (le))`;)
     */
    __publicField(this, "onChangeLabelBrowser", (selector) => {
      this.onChangeQuery(selector, true);
      this.setState({ labelBrowserVisible: false });
    });
    __publicField(this, "onChangeQuery", (value, override) => {
      const { query, onChange, onRunQuery } = this.props;
      if (onChange) {
        const nextQuery = __spreadProps(__spreadValues({}, query), { expr: value });
        onChange(nextQuery);
        if (override && onRunQuery) {
          onRunQuery();
        }
      }
    });
    __publicField(this, "onClickChooserButton", () => {
      var _a, _b;
      this.setState((state) => ({ labelBrowserVisible: !state.labelBrowserVisible }));
      reportInteraction("user_grafana_prometheus_metrics_browser_clicked", {
        editorMode: this.state.labelBrowserVisible ? "metricViewClosed" : "metricViewOpen",
        app: (_b = (_a = this.props) == null ? void 0 : _a.app) != null ? _b : ""
      });
    });
    __publicField(this, "onClickHintFix", () => {
      var _a;
      const { datasource, query, onChange, onRunQuery } = this.props;
      const { hint } = this.state;
      if ((_a = hint == null ? void 0 : hint.fix) == null ? void 0 : _a.action) {
        onChange(datasource.modifyQuery(query, hint.fix.action));
      }
      onRunQuery();
    });
    __publicField(this, "onUpdateLanguage", () => {
      const {
        datasource: { languageProvider }
      } = this.props;
      const { metrics } = languageProvider;
      if (!metrics) {
        return;
      }
      this.setState({ syntaxLoaded: true });
    });
    this.state = {
      labelBrowserVisible: false,
      syntaxLoaded: false,
      hint: null
    };
  }
  componentDidMount() {
    if (this.props.datasource.languageProvider) {
      this.refreshMetrics();
    }
    this.refreshHint();
  }
  componentWillUnmount() {
    if (this.languageProviderInitializationPromise) {
      this.languageProviderInitializationPromise.cancel();
    }
  }
  componentDidUpdate(prevProps) {
    const {
      data,
      datasource: { languageProvider },
      range
    } = this.props;
    if (languageProvider !== prevProps.datasource.languageProvider) {
      this.setState({
        syntaxLoaded: false
      });
    }
    const changedRangeToRefresh = this.rangeChangedToRefresh(range, prevProps.range);
    if (languageProvider !== prevProps.datasource.languageProvider || changedRangeToRefresh) {
      this.refreshMetrics();
    }
    if (data && prevProps.data && prevProps.data.series !== data.series) {
      this.refreshHint();
    }
  }
  rangeChangedToRefresh(range, prevRange) {
    if (range && prevRange) {
      const sameMinuteFrom = roundMsToMin(range.from.valueOf()) === roundMsToMin(prevRange.from.valueOf());
      const sameMinuteTo = roundMsToMin(range.to.valueOf()) === roundMsToMin(prevRange.to.valueOf());
      return !(sameMinuteFrom && sameMinuteTo);
    }
    return false;
  }
  render() {
    const {
      datasource,
      datasource: { languageProvider },
      query,
      ExtraFieldElement,
      history = [],
      theme
    } = this.props;
    const { labelBrowserVisible, syntaxLoaded, hint } = this.state;
    const hasMetrics = languageProvider.metrics.length > 0;
    const chooserText = getChooserText(datasource.lookupsDisabled, syntaxLoaded, hasMetrics);
    const buttonDisabled = !(syntaxLoaded && hasMetrics);
    return /* @__PURE__ */ React.createElement(LocalStorageValueProvider, { storageKey: LAST_USED_LABELS_KEY, defaultValue: [] }, (lastUsedLabels, onLastUsedLabelsSave, onLastUsedLabelsDelete) => {
      var _a;
      return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
        "div",
        {
          className: "gf-form-inline gf-form-inline--xs-view-flex-column flex-grow-1",
          "data-testid": this.props["data-testid"]
        },
        /* @__PURE__ */ React.createElement(
          "button",
          {
            className: "gf-form-label query-keyword pointer",
            onClick: this.onClickChooserButton,
            disabled: buttonDisabled,
            type: "button",
            "data-testid": selectors.components.DataSource.Prometheus.queryEditor.code.metricsBrowser.openButton
          },
          chooserText,
          /* @__PURE__ */ React.createElement(Icon, { name: labelBrowserVisible ? "angle-down" : "angle-right" })
        ),
        /* @__PURE__ */ React.createElement("div", { className: "flex-grow-1 min-width-15" }, /* @__PURE__ */ React.createElement(
          MonacoQueryFieldWrapper,
          {
            languageProvider,
            history,
            onChange: this.onChangeQuery,
            onRunQuery: this.props.onRunQuery,
            initialValue: (_a = query.expr) != null ? _a : "",
            placeholder: "Enter a PromQL query\u2026",
            datasource
          }
        ))
      ), labelBrowserVisible && /* @__PURE__ */ React.createElement("div", { className: "gf-form" }, /* @__PURE__ */ React.createElement(
        PrometheusMetricsBrowser,
        {
          languageProvider,
          onChange: this.onChangeLabelBrowser,
          lastUsedLabels: lastUsedLabels || [],
          storeLastUsedLabels: onLastUsedLabelsSave,
          deleteLastUsedLabels: onLastUsedLabelsDelete,
          timeRange: this.props.range
        }
      )), ExtraFieldElement, hint ? /* @__PURE__ */ React.createElement("div", { className: "query-row-break" }, /* @__PURE__ */ React.createElement("div", { className: "prom-query-field-info text-warning" }, hint.label, " ", hint.fix ? /* @__PURE__ */ React.createElement(
        "button",
        {
          type: "button",
          className: cx(clearButtonStyles(theme), "text-link", "muted"),
          onClick: this.onClickHintFix
        },
        hint.fix.label
      ) : null)) : null);
    });
  }
}
const PromQueryField = withTheme2(PromQueryFieldClass);

export { PromQueryField };
//# sourceMappingURL=PromQueryField.js.map
