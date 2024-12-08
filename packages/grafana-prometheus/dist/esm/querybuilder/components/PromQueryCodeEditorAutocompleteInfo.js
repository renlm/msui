import React, { useState, useCallback, useEffect } from 'react';
import { config } from '@grafana/runtime';
import { Stack, Text, IconButton } from '@grafana/ui';
import { isSuggestionsIncompleteEvent, CODE_MODE_SUGGESTIONS_INCOMPLETE_EVENT } from '../../components/monaco-query-field/monaco-completion-provider/data_provider.js';
import { QueryEditorMode } from '../shared/types.js';
import { selectors } from '../../grafana-e2e-selectors/src/selectors/index.js';

function PromQueryCodeEditorAutocompleteInfo(props) {
  const [autocompleteLimit, setAutocompleteLimit] = useState("n");
  const [autocompleteLimitExceeded, setAutocompleteLimitExceeded] = useState(false);
  const handleSuggestionsIncompleteEvent = useCallback(
    (e) => {
      if (!isSuggestionsIncompleteEvent(e)) {
        return;
      }
      if (e.detail.datasourceUid === props.datasourceUid) {
        setAutocompleteLimitExceeded(true);
        setAutocompleteLimit(e.detail.limit.toString());
      }
    },
    [props.datasourceUid]
  );
  useEffect(() => {
    addEventListener(CODE_MODE_SUGGESTIONS_INCOMPLETE_EVENT, handleSuggestionsIncompleteEvent);
    return () => {
      removeEventListener(CODE_MODE_SUGGESTIONS_INCOMPLETE_EVENT, handleSuggestionsIncompleteEvent);
    };
  }, [handleSuggestionsIncompleteEvent]);
  const showCodeModeAutocompleteDisclaimer = () => {
    return Boolean(config.featureToggles.prometheusCodeModeMetricNamesSearch) && props.editorMode === QueryEditorMode.Code && autocompleteLimitExceeded;
  };
  if (!showCodeModeAutocompleteDisclaimer()) {
    return null;
  }
  return /* @__PURE__ */ React.createElement("div", { "data-testid": selectors.components.DataSource.Prometheus.queryEditor.code.metricsCountInfo }, /* @__PURE__ */ React.createElement(Stack, { direction: "row", gap: 1 }, /* @__PURE__ */ React.createElement(Text, { color: "secondary", element: "p", italic: true }, "Autocomplete suggestions limited"), /* @__PURE__ */ React.createElement(
    IconButton,
    {
      name: "info-circle",
      tooltip: `The number of metric names exceeds the autocomplete limit. Only the ${autocompleteLimit}-most relevant metrics are displayed. You can adjust the threshold in the data source settings.`
    }
  )));
}

export { PromQueryCodeEditorAutocompleteInfo };
//# sourceMappingURL=PromQueryCodeEditorAutocompleteInfo.js.map
