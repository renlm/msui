import { llms } from '@grafana/experimental';
import { reportInteraction } from '@grafana/runtime';
import { getMetadataType, getMetadataHelp } from '../../../../language_provider.js';
import { promQueryModeller } from '../../../PromQueryModeller.js';
import { buildVisualQueryFromString } from '../../../parsing.js';
import { updateInteraction } from '../PromQail.js';
import { ExplainSystemPrompt, GetExplainUserPrompt, SuggestSystemPrompt, GetSuggestUserPrompt } from '../prompts.js';
import { SuggestionType } from '../types.js';
import { createInteraction } from './state.js';
import { getTemplateSuggestions } from './templates.js';

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
const OPENAI_MODEL_NAME = "gpt-3.5-turbo-1106";
const promQLTemplatesCollection = "grafana.promql.templates";
function getExplainMessage(query, metric, datasource) {
  var _a, _b;
  let metricMetadata = "";
  let metricType = "";
  const pvq = buildVisualQueryFromString(query);
  if (datasource.languageProvider.metricsMetadata) {
    metricType = (_a = getMetadataType(metric, datasource.languageProvider.metricsMetadata)) != null ? _a : "";
    metricMetadata = (_b = getMetadataHelp(metric, datasource.languageProvider.metricsMetadata)) != null ? _b : "";
  }
  const documentationBody = pvq.query.operations.map((op) => {
    const def = promQueryModeller.getOperationDef(op.id);
    if (!def) {
      return "";
    }
    const title = def.renderer(op, def, "<expr>");
    const body = def.explainHandler ? def.explainHandler(op, def) : def.documentation;
    if (!body) {
      return "";
    }
    return `### ${title}:
${body}`;
  }).filter((item) => item !== "").join("\n");
  return [
    { role: "system", content: ExplainSystemPrompt },
    {
      role: "user",
      content: GetExplainUserPrompt({
        documentation: documentationBody,
        metricName: metric,
        metricType,
        metricMetadata,
        query
      })
    }
  ];
}
function getSuggestMessages({
  promql,
  question,
  metricType,
  labels,
  templates
}) {
  return [
    { role: "system", content: SuggestSystemPrompt },
    { role: "user", content: GetSuggestUserPrompt({ promql, question, metricType, labels, templates }) }
  ];
}
async function promQailExplain(dispatch, idx, query, interaction, suggIdx, datasource) {
  const suggestedQuery = interaction.suggestions[suggIdx].query;
  const promptMessages = getExplainMessage(suggestedQuery, query.metric, datasource);
  const interactionToUpdate = interaction;
  return llms.openai.streamChatCompletions({
    model: OPENAI_MODEL_NAME,
    messages: promptMessages,
    temperature: 0
  }).pipe(llms.openai.accumulateContent()).subscribe((response) => {
    const updatedSuggestions = interactionToUpdate.suggestions.map((sg, sidx) => {
      if (suggIdx === sidx) {
        return {
          query: interactionToUpdate.suggestions[suggIdx].query,
          explanation: response
        };
      }
      return sg;
    });
    const payload = {
      idx,
      interaction: __spreadProps(__spreadValues({}, interactionToUpdate), {
        suggestions: updatedSuggestions,
        explanationIsLoading: false
      })
    };
    dispatch(updateInteraction(payload));
  });
}
function isContainedIn(sublist, superlist) {
  for (const item of sublist) {
    if (!superlist.includes(item)) {
      return false;
    }
  }
  return true;
}
function guessMetricType(metric, allMetrics) {
  const synthetic_metrics = /* @__PURE__ */ new Set([
    "up",
    "scrape_duration_seconds",
    "scrape_samples_post_metric_relabeling",
    "scrape_series_added",
    "scrape_samples_scraped",
    "ALERTS",
    "ALERTS_FOR_STATE"
  ]);
  if (synthetic_metrics.has(metric)) {
    return "counter";
  }
  if (metric.startsWith(":")) {
    return "gauge";
  }
  if (metric.endsWith("_info")) {
    return "counter";
  }
  if (metric.endsWith("_created") || metric.endsWith("_total")) {
    return "counter";
  }
  const underscoreIndex = metric.lastIndexOf("_");
  if (underscoreIndex < 0) {
    return "gauge";
  }
  const [root, suffix] = [metric.slice(0, underscoreIndex), metric.slice(underscoreIndex + 1)];
  if (["bucket", "count", "sum"].includes(suffix)) {
    let familyMetrics2 = [`${root}_bucket`, `${root}_count`, `${root}_sum`, root];
    if (isContainedIn(familyMetrics2, allMetrics)) {
      return "histogram,summary";
    }
    familyMetrics2 = [`${root}_bucket`, `${root}_count`, `${root}_sum`];
    if (isContainedIn(familyMetrics2, allMetrics)) {
      return "histogram";
    }
    familyMetrics2 = [`${root}_sum`, `${root}_count`, root];
    if (isContainedIn(familyMetrics2, allMetrics)) {
      return "summary";
    }
    return "counter";
  }
  const familyMetrics = [`${metric}_sum`, `${metric}_count`, metric];
  if (isContainedIn(familyMetrics, allMetrics)) {
    if (allMetrics.includes(`${metric}_bucket`)) {
      return "histogram,summary";
    } else {
      return "summary";
    }
  }
  return "gauge";
}
function generateMetricTypeFilters(types) {
  return types.map((type) => ({
    metric_type: {
      $eq: type
    }
  }));
}
function guessMetricFamily(metric) {
  if (metric.endsWith("_bucket") || metric.endsWith("_count") || metric.endsWith("_sum")) {
    return metric.slice(0, metric.lastIndexOf("_"));
  }
  return metric;
}
async function isLLMPluginEnabled() {
  const openaiEnabled = llms.openai.health().then((response) => response.ok);
  const vectorEnabled = llms.vector.health().then((response) => response.ok);
  return Promise.all([openaiEnabled, vectorEnabled]).then((results) => {
    return results.every((result) => result);
  });
}
async function promQailSuggest(dispatch, idx, query, labelNames, datasource, interaction) {
  var _a;
  const interactionToUpdate = interaction ? interaction : createInteraction(SuggestionType.Historical);
  let metricType = "";
  if (!datasource.languageProvider.metricsMetadata) {
    await datasource.languageProvider.loadMetricsMetadata();
  }
  if (datasource.languageProvider.metricsMetadata) {
    const metricFamilyGuess = guessMetricFamily(query.metric);
    metricType = (_a = getMetadataType(metricFamilyGuess, datasource.languageProvider.metricsMetadata)) != null ? _a : "";
  }
  if (metricType === "") {
    metricType = guessMetricType(query.metric, datasource.languageProvider.metrics);
  }
  if (interactionToUpdate.suggestionType === SuggestionType.Historical) {
    return new Promise((resolve) => {
      return setTimeout(() => {
        const suggestions = getTemplateSuggestions(
          query.metric,
          metricType,
          promQueryModeller.renderLabels(query.labels)
        );
        const payload = {
          idx,
          interaction: __spreadProps(__spreadValues({}, interactionToUpdate), { suggestions, isLoading: false })
        };
        dispatch(updateInteraction(payload));
        resolve();
      }, 1e3);
    });
  } else {
    const metricLabels = await datasource.languageProvider.fetchLabelsWithMatch(query.metric);
    let feedTheAI = {
      metric: query.metric,
      // drop __name__ label because it's not useful
      labels: Object.keys(metricLabels).filter((label) => label !== "__name__").join(",")
    };
    let results = [];
    if ((interaction == null ? void 0 : interaction.suggestionType) === SuggestionType.AI) {
      feedTheAI = __spreadProps(__spreadValues({}, feedTheAI), { prompt: interaction.prompt });
      results = await llms.vector.search({
        query: interaction.prompt,
        collection: promQLTemplatesCollection,
        topK: 5,
        filter: {
          $or: generateMetricTypeFilters(metricType.split(",").concat(["*"]))
        }
      });
      reportInteraction("grafana_prometheus_promqail_vector_results", {
        metric: query.metric,
        prompt: interaction.prompt,
        results
      });
    }
    const resultsString = results.map((r) => {
      return `${r.payload.promql} | ${r.payload.description} (score=${(r.score * 100).toFixed(1)})`;
    }).join("\n");
    const promptMessages = getSuggestMessages({
      promql: query.metric,
      question: interaction ? interaction.prompt : "",
      metricType,
      labels: labelNames.join(", "),
      templates: resultsString
    });
    return llms.openai.streamChatCompletions({
      model: OPENAI_MODEL_NAME,
      messages: promptMessages,
      temperature: 0.5
    }).pipe(llms.openai.accumulateContent()).subscribe((response) => {
      const payload = {
        idx,
        interaction: __spreadProps(__spreadValues({}, interactionToUpdate), {
          suggestions: [
            {
              query: response,
              explanation: ""
            }
          ],
          isLoading: false
        })
      };
      dispatch(updateInteraction(payload));
    });
  }
}

export { getExplainMessage, guessMetricType, isLLMPluginEnabled, promQailExplain, promQailSuggest };
//# sourceMappingURL=helpers.js.map
