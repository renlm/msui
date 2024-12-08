import React from 'react';
import { reportInteraction } from '@grafana/runtime';
import { useTheme2, Button, Tooltip } from '@grafana/ui';
import { getStyles } from './PromQail.js';
import AI_Logo_color from './resources/AI_Logo_color.svg.js';
import { selectors } from '../../../grafana-e2e-selectors/src/selectors/index.js';

function QueryAssistantButton(props) {
  const { llmAppEnabled, metric, setShowDrawer } = props;
  const llmAppDisabled = !llmAppEnabled;
  const noMetricSelected = !metric;
  const theme = useTheme2();
  const styles = getStyles(theme);
  const button = () => {
    return /* @__PURE__ */ React.createElement(
      Button,
      {
        variant: "secondary",
        onClick: () => {
          reportInteraction("grafana_prometheus_promqail_ai_button_clicked", {
            metric
          });
          setShowDrawer(true);
        },
        disabled: !metric || !llmAppEnabled,
        "data-testid": selectors.components.DataSource.Prometheus.queryEditor.builder.queryAdvisor
      },
      /* @__PURE__ */ React.createElement("img", { height: 16, src: AI_Logo_color, alt: "AI logo black and white" }),
      "\xA0",
      "Get query suggestions"
    );
  };
  const selectMetricMessage = /* @__PURE__ */ React.createElement(Tooltip, { content: "First, select a metric.", placement: "bottom-end" }, button());
  const llmAppMessage = /* @__PURE__ */ React.createElement(
    Tooltip,
    {
      interactive: true,
      placement: "auto-end",
      content: /* @__PURE__ */ React.createElement("div", { className: styles.enableButtonTooltip }, /* @__PURE__ */ React.createElement("h6", null, "Query Advisor is disabled"), /* @__PURE__ */ React.createElement("div", { className: styles.enableButtonTooltipText }, "To enable Query Advisor you must:"), /* @__PURE__ */ React.createElement("div", { className: styles.enableButtonTooltipText }, /* @__PURE__ */ React.createElement("ul", null, /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement(
        "a",
        {
          href: "https://grafana.com/docs/grafana-cloud/alerting-and-irm/machine-learning/llm-plugin/",
          target: "_blank",
          rel: "noreferrer noopener",
          className: styles.link
        },
        "Install and enable the LLM plugin"
      )), /* @__PURE__ */ React.createElement("li", null, "Select a metric"))))
    },
    button()
  );
  if (llmAppDisabled) {
    return llmAppMessage;
  } else if (noMetricSelected) {
    return selectMetricMessage;
  } else {
    return button();
  }
}

export { QueryAssistantButton };
//# sourceMappingURL=QueryAssistantButton.js.map
