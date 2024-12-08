import { CoreApp } from '@grafana/data';
import { reportInteraction, config } from '@grafana/runtime';

function trackQuery(response, request, startTime) {
  var _a, _b, _c, _d;
  const { app, targets: queries } = request;
  if (app !== CoreApp.Explore) {
    return;
  }
  for (const query of queries) {
    reportInteraction("grafana_prometheus_query_executed", {
      app,
      grafana_version: config.buildInfo.version,
      has_data: response.data.some((frame) => frame.length > 0),
      has_error: response.error !== void 0,
      expr: query.expr,
      format: query.format,
      instant: query.instant,
      range: query.range,
      exemplar: query.exemplar,
      hinting: query.hinting,
      interval: query.interval,
      intervalFactor: query.intervalFactor,
      utcOffsetSec: query.utcOffsetSec,
      legend: query.legendFormat,
      valueWithRefId: query.valueWithRefId,
      requestId: request.requestId,
      showingGraph: query.showingGraph,
      showingTable: query.showingTable,
      editor_mode: query.editorMode,
      simultaneously_sent_query_count: queries.length,
      time_range_from: (_b = (_a = request == null ? void 0 : request.range) == null ? void 0 : _a.from) == null ? void 0 : _b.toISOString(),
      time_range_to: (_d = (_c = request == null ? void 0 : request.range) == null ? void 0 : _c.to) == null ? void 0 : _d.toISOString(),
      time_taken: Date.now() - startTime.getTime()
    });
  }
}

export { trackQuery };
//# sourceMappingURL=tracking.js.map
