const DEFAULT_RESULTS_PER_PAGE = 100;
const MAXIMUM_RESULTS_PER_PAGE = 1e3;
function initialState(query) {
  var _a, _b, _c, _d;
  return {
    isLoading: true,
    metrics: [],
    hasMetadata: true,
    metaHaystackDictionary: {},
    metaHaystackMatches: [],
    metaHaystackOrder: [],
    nameHaystackDictionary: {},
    nameHaystackOrder: [],
    nameHaystackMatches: [],
    totalMetricCount: 0,
    filteredMetricCount: null,
    resultsPerPage: DEFAULT_RESULTS_PER_PAGE,
    pageNum: 1,
    fuzzySearchQuery: "",
    fullMetaSearch: (_a = query == null ? void 0 : query.fullMetaSearch) != null ? _a : false,
    includeNullMetadata: (_b = query == null ? void 0 : query.includeNullMetadata) != null ? _b : true,
    selectedTypes: [],
    useBackend: (_c = query == null ? void 0 : query.useBackend) != null ? _c : false,
    disableTextWrap: (_d = query == null ? void 0 : query.disableTextWrap) != null ? _d : false,
    showAdditionalSettings: false
  };
}
function getSettings(visQuery) {
  var _a, _b, _c, _d;
  return {
    useBackend: (_a = visQuery == null ? void 0 : visQuery.useBackend) != null ? _a : false,
    disableTextWrap: (_b = visQuery == null ? void 0 : visQuery.disableTextWrap) != null ? _b : false,
    fullMetaSearch: (_c = visQuery == null ? void 0 : visQuery.fullMetaSearch) != null ? _c : false,
    includeNullMetadata: (_d = visQuery.includeNullMetadata) != null ? _d : false
  };
}

export { DEFAULT_RESULTS_PER_PAGE, MAXIMUM_RESULTS_PER_PAGE, getSettings, initialState };
//# sourceMappingURL=state.js.map
