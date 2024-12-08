const pluginVersion = "%VERSION%";
const defaultTempoQuery = {
  filters: [],
  groupBy: []
};
var SearchStreamingState = /* @__PURE__ */ ((SearchStreamingState2) => {
  SearchStreamingState2["Done"] = "done";
  SearchStreamingState2["Error"] = "error";
  SearchStreamingState2["Pending"] = "pending";
  SearchStreamingState2["Streaming"] = "streaming";
  return SearchStreamingState2;
})(SearchStreamingState || {});
var SearchTableType = /* @__PURE__ */ ((SearchTableType2) => {
  SearchTableType2["Raw"] = "raw";
  SearchTableType2["Spans"] = "spans";
  SearchTableType2["Traces"] = "traces";
  return SearchTableType2;
})(SearchTableType || {});
var TraceqlSearchScope = /* @__PURE__ */ ((TraceqlSearchScope2) => {
  TraceqlSearchScope2["Intrinsic"] = "intrinsic";
  TraceqlSearchScope2["Resource"] = "resource";
  TraceqlSearchScope2["Span"] = "span";
  TraceqlSearchScope2["Unscoped"] = "unscoped";
  return TraceqlSearchScope2;
})(TraceqlSearchScope || {});

export { SearchStreamingState, SearchTableType, TraceqlSearchScope, defaultTempoQuery, pluginVersion };
