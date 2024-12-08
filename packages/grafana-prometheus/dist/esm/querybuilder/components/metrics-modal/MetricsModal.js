import { cx } from '@emotion/css';
import { createSlice } from '@reduxjs/toolkit';
import debounce from 'debounce-promise';
import React, { useReducer, useCallback, useEffect, useMemo } from 'react';
import { useTheme2, Modal, Input, MultiSelect, Spinner, Toggletip, ButtonGroup, Button, Icon, Pagination } from '@grafana/ui';
import { AdditionalSettings } from './AdditionalSettings.js';
import { FeedbackLink } from './FeedbackLink.js';
import { ResultsTable } from './ResultsTable.js';
import { setMetrics, promTypes, getBackendSearchMetrics, placeholders, displayedMetrics, calculatePageList, calculateResultsPerPage, tracking } from './state/helpers.js';
import { initialState, MAXIMUM_RESULTS_PER_PAGE, DEFAULT_RESULTS_PER_PAGE } from './state/state.js';
import { getStyles } from './styles.js';
import { debouncedFuzzySearch } from './uFuzzy.js';
import { selectors } from '../../../grafana-e2e-selectors/src/selectors/index.js';

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
const MetricsModal = (props) => {
  var _a;
  const { datasource, isOpen, onClose, onChange, query, initialMetrics } = props;
  const [state, dispatch] = useReducer(stateSlice.reducer, initialState(query));
  const theme = useTheme2();
  const styles = getStyles(theme, state.disableTextWrap);
  const updateMetricsMetadata = useCallback(async () => {
    dispatch(setIsLoading(true));
    const data = await setMetrics(datasource, query, initialMetrics);
    dispatch(
      buildMetrics({
        isLoading: false,
        hasMetadata: data.hasMetadata,
        metrics: data.metrics,
        metaHaystackDictionary: data.metaHaystackDictionary,
        nameHaystackDictionary: data.nameHaystackDictionary,
        totalMetricCount: data.metrics.length,
        filteredMetricCount: data.metrics.length
      })
    );
  }, [query, datasource, initialMetrics]);
  useEffect(() => {
    updateMetricsMetadata();
  }, [updateMetricsMetadata]);
  const typeOptions = promTypes.map((t) => {
    return {
      value: t.value,
      label: t.value,
      description: t.description
    };
  });
  const debouncedBackendSearch = useMemo(
    () => debounce(async (metricText) => {
      dispatch(setIsLoading(true));
      const metrics = await getBackendSearchMetrics(metricText, query.labels, datasource);
      dispatch(
        filterMetricsBackend({
          metrics,
          filteredMetricCount: metrics.length,
          isLoading: false
        })
      );
    }, datasource.getDebounceTimeInMilliseconds()),
    [datasource, query]
  );
  function fuzzyNameDispatch(haystackData) {
    dispatch(setNameHaystack(haystackData));
  }
  function fuzzyMetaDispatch(haystackData) {
    dispatch(setMetaHaystack(haystackData));
  }
  function searchCallback(query2, fullMetaSearchVal) {
    if (state.useBackend && query2 === "") {
      updateMetricsMetadata();
    } else if (state.useBackend) {
      debouncedBackendSearch(query2);
    } else {
      if (fullMetaSearchVal) {
        debouncedFuzzySearch(Object.keys(state.metaHaystackDictionary), query2, fuzzyMetaDispatch);
      } else {
        debouncedFuzzySearch(Object.keys(state.nameHaystackDictionary), query2, fuzzyNameDispatch);
      }
    }
  }
  const additionalSettings = /* @__PURE__ */ React.createElement(
    AdditionalSettings,
    {
      state,
      onChangeFullMetaSearch: () => {
        const newVal = !state.fullMetaSearch;
        dispatch(setFullMetaSearch(newVal));
        onChange(__spreadProps(__spreadValues({}, query), { fullMetaSearch: newVal }));
        searchCallback(state.fuzzySearchQuery, newVal);
      },
      onChangeIncludeNullMetadata: () => {
        dispatch(setIncludeNullMetadata(!state.includeNullMetadata));
        onChange(__spreadProps(__spreadValues({}, query), { includeNullMetadata: !state.includeNullMetadata }));
      },
      onChangeDisableTextWrap: () => {
        dispatch(setDisableTextWrap());
        onChange(__spreadProps(__spreadValues({}, query), { disableTextWrap: !state.disableTextWrap }));
        tracking("grafana_prom_metric_encycopedia_disable_text_wrap_interaction", state, "");
      },
      onChangeUseBackend: () => {
        const newVal = !state.useBackend;
        dispatch(setUseBackend(newVal));
        onChange(__spreadProps(__spreadValues({}, query), { useBackend: newVal }));
        if (newVal === false) {
          updateMetricsMetadata();
        } else {
          if (state.fuzzySearchQuery !== "") {
            debouncedBackendSearch(state.fuzzySearchQuery);
          }
        }
      }
    }
  );
  return /* @__PURE__ */ React.createElement(
    Modal,
    {
      "data-testid": metricsModaltestIds.metricModal,
      isOpen,
      title: "Metrics explorer",
      onDismiss: onClose,
      "aria-label": "Browse metrics",
      className: styles.modal
    },
    /* @__PURE__ */ React.createElement(FeedbackLink, { feedbackUrl: "https://forms.gle/DEMAJHoAMpe3e54CA" }),
    /* @__PURE__ */ React.createElement(
      "div",
      {
        className: styles.inputWrapper,
        "data-testid": selectors.components.DataSource.Prometheus.queryEditor.builder.metricsExplorer
      },
      /* @__PURE__ */ React.createElement("div", { className: cx(styles.inputItem, styles.inputItemFirst) }, /* @__PURE__ */ React.createElement(
        Input,
        {
          autoFocus: true,
          "data-testid": metricsModaltestIds.searchMetric,
          placeholder: placeholders.browse,
          value: state.fuzzySearchQuery,
          onInput: (e) => {
            var _a2;
            const value = (_a2 = e.currentTarget.value) != null ? _a2 : "";
            dispatch(setFuzzySearchQuery(value));
            searchCallback(value, state.fullMetaSearch);
          }
        }
      )),
      state.hasMetadata && /* @__PURE__ */ React.createElement("div", { className: styles.inputItem }, /* @__PURE__ */ React.createElement(
        MultiSelect,
        {
          "data-testid": metricsModaltestIds.selectType,
          inputId: "my-select",
          options: typeOptions,
          value: state.selectedTypes,
          placeholder: placeholders.type,
          onChange: (v) => dispatch(setSelectedTypes(v))
        }
      )),
      /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Spinner, { className: `${styles.loadingSpinner} ${state.isLoading ? styles.visible : ""}` })),
      /* @__PURE__ */ React.createElement("div", { className: styles.inputItem }, /* @__PURE__ */ React.createElement(
        Toggletip,
        {
          "aria-label": "Additional settings",
          content: additionalSettings,
          placement: "bottom-end",
          closeButton: false
        },
        /* @__PURE__ */ React.createElement(ButtonGroup, { className: styles.settingsBtn }, /* @__PURE__ */ React.createElement(
          Button,
          {
            variant: "secondary",
            size: "md",
            onClick: () => dispatch(showAdditionalSettings()),
            "data-testid": metricsModaltestIds.showAdditionalSettings,
            className: styles.noBorder
          },
          "Additional Settings"
        ), /* @__PURE__ */ React.createElement(
          Button,
          {
            className: styles.noBorder,
            variant: "secondary",
            icon: state.showAdditionalSettings ? "angle-up" : "angle-down"
          }
        ))
      ))
    ),
    /* @__PURE__ */ React.createElement("div", { className: styles.resultsData }, query.metric && /* @__PURE__ */ React.createElement("i", { className: styles.currentlySelected }, "Currently selected: ", query.metric), query.labels.length > 0 && /* @__PURE__ */ React.createElement("div", { className: styles.resultsDataFiltered }, /* @__PURE__ */ React.createElement(Icon, { name: "info-circle", size: "sm" }), /* @__PURE__ */ React.createElement("div", { className: styles.resultsDataFilteredText }, "\xA0These metrics have been pre-filtered by labels chosen in the label filters."))),
    /* @__PURE__ */ React.createElement("div", { className: styles.results }, state.metrics && /* @__PURE__ */ React.createElement(
      ResultsTable,
      {
        metrics: displayedMetrics(state, dispatch),
        onChange,
        onClose,
        query,
        state,
        disableTextWrap: state.disableTextWrap
      }
    )),
    /* @__PURE__ */ React.createElement("div", { className: styles.resultsFooter }, /* @__PURE__ */ React.createElement("div", { className: styles.resultsAmount }, "Showing ", state.filteredMetricCount, " of ", state.totalMetricCount, " results"), /* @__PURE__ */ React.createElement(
      Pagination,
      {
        currentPage: (_a = state.pageNum) != null ? _a : 1,
        numberOfPages: calculatePageList(state).length,
        onNavigate: (val) => {
          const page = val != null ? val : 1;
          dispatch(setPageNum(page));
        }
      }
    ), /* @__PURE__ */ React.createElement("div", { className: styles.resultsPerPageWrapper }, /* @__PURE__ */ React.createElement("p", { className: styles.resultsPerPageLabel }, "# Results per page\xA0"), /* @__PURE__ */ React.createElement(
      Input,
      {
        "data-testid": metricsModaltestIds.resultsPerPage,
        value: calculateResultsPerPage(state.resultsPerPage, DEFAULT_RESULTS_PER_PAGE, MAXIMUM_RESULTS_PER_PAGE),
        placeholder: "results per page",
        width: 10,
        title: "The maximum results per page is " + MAXIMUM_RESULTS_PER_PAGE,
        type: "number",
        onInput: (e) => {
          const value = +e.currentTarget.value;
          if (isNaN(value) || value >= MAXIMUM_RESULTS_PER_PAGE) {
            return;
          }
          dispatch(setResultsPerPage(value));
        }
      }
    )))
  );
};
const metricsModaltestIds = {
  metricModal: "metric-modal",
  searchMetric: "search-metric",
  searchWithMetadata: "search-with-metadata",
  selectType: "select-type",
  metricCard: "metric-card",
  useMetric: "use-metric",
  searchPage: "search-page",
  resultsPerPage: "results-per-page",
  setUseBackend: "set-use-backend",
  showAdditionalSettings: "show-additional-settings"
};
const stateSlice = createSlice({
  name: "metrics-modal-state",
  initialState: initialState(),
  reducers: {
    filterMetricsBackend: (state, action) => {
      state.metrics = action.payload.metrics;
      state.filteredMetricCount = action.payload.filteredMetricCount;
      state.isLoading = action.payload.isLoading;
    },
    buildMetrics: (state, action) => {
      state.isLoading = action.payload.isLoading;
      state.metrics = action.payload.metrics;
      state.hasMetadata = action.payload.hasMetadata;
      state.metaHaystackDictionary = action.payload.metaHaystackDictionary;
      state.nameHaystackDictionary = action.payload.nameHaystackDictionary;
      state.totalMetricCount = action.payload.totalMetricCount;
      state.filteredMetricCount = action.payload.filteredMetricCount;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setFilteredMetricCount: (state, action) => {
      state.filteredMetricCount = action.payload;
    },
    setResultsPerPage: (state, action) => {
      state.resultsPerPage = action.payload;
    },
    setPageNum: (state, action) => {
      state.pageNum = action.payload;
    },
    setFuzzySearchQuery: (state, action) => {
      state.fuzzySearchQuery = action.payload;
      state.pageNum = 1;
    },
    setNameHaystack: (state, action) => {
      state.nameHaystackOrder = action.payload[0];
      state.nameHaystackMatches = action.payload[1];
    },
    setMetaHaystack: (state, action) => {
      state.metaHaystackOrder = action.payload[0];
      state.metaHaystackMatches = action.payload[1];
    },
    setFullMetaSearch: (state, action) => {
      state.fullMetaSearch = action.payload;
      state.pageNum = 1;
    },
    setIncludeNullMetadata: (state, action) => {
      state.includeNullMetadata = action.payload;
      state.pageNum = 1;
    },
    setSelectedTypes: (state, action) => {
      state.selectedTypes = action.payload;
      state.pageNum = 1;
    },
    setUseBackend: (state, action) => {
      state.useBackend = action.payload;
      state.fullMetaSearch = false;
      state.pageNum = 1;
    },
    setDisableTextWrap: (state) => {
      state.disableTextWrap = !state.disableTextWrap;
    },
    showAdditionalSettings: (state) => {
      state.showAdditionalSettings = !state.showAdditionalSettings;
    }
  }
});
const {
  setIsLoading,
  buildMetrics,
  filterMetricsBackend,
  setResultsPerPage,
  setPageNum,
  setFuzzySearchQuery,
  setNameHaystack,
  setMetaHaystack,
  setFullMetaSearch,
  setIncludeNullMetadata,
  setSelectedTypes,
  setUseBackend,
  setDisableTextWrap,
  showAdditionalSettings,
  setFilteredMetricCount
} = stateSlice.actions;

export { MetricsModal, buildMetrics, filterMetricsBackend, metricsModaltestIds, setDisableTextWrap, setFilteredMetricCount, setFullMetaSearch, setFuzzySearchQuery, setIncludeNullMetadata, setIsLoading, setMetaHaystack, setNameHaystack, setPageNum, setResultsPerPage, setSelectedTypes, setUseBackend, showAdditionalSettings };
//# sourceMappingURL=MetricsModal.js.map
