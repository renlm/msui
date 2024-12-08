import { cx } from '@emotion/css';
import React, { useState } from 'react';
import { useTheme2, Button } from '@grafana/ui';
import { getStyles, queryAssistanttestIds } from './PromQail.js';
import { QuerySuggestionItem } from './QuerySuggestionItem.js';
import { SuggestionType } from './types.js';

function QuerySuggestionContainer(props) {
  const { suggestionType, querySuggestions, closeDrawer, nextInteraction, queryExplain, onChange, prompt } = props;
  const [hasNextInteraction, updateHasNextInteraction] = useState(false);
  const theme = useTheme2();
  const styles = getStyles(theme);
  let text, secondaryText, refineText;
  if (suggestionType === SuggestionType.Historical) {
    text = `Here are ${querySuggestions.length} query suggestions:`;
    refineText = "I want to write a prompt";
  } else if (suggestionType === SuggestionType.AI) {
    text = text = "Here is your query suggestion:";
    secondaryText = "This query is based off of natural language descriptions of the most commonly used PromQL queries.";
    refineText = "Refine prompt";
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, suggestionType === SuggestionType.Historical ? /* @__PURE__ */ React.createElement("div", { className: styles.bottomMargin }, text) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: styles.textPadding }, text), /* @__PURE__ */ React.createElement("div", { className: cx(styles.secondaryText, styles.bottomMargin) }, secondaryText)), /* @__PURE__ */ React.createElement("div", { className: styles.infoContainerWrapper }, /* @__PURE__ */ React.createElement("div", { className: styles.infoContainer }, querySuggestions.map((qs, idx) => {
    return /* @__PURE__ */ React.createElement(
      QuerySuggestionItem,
      {
        historical: suggestionType === SuggestionType.Historical,
        querySuggestion: qs,
        key: idx,
        order: idx + 1,
        queryExplain,
        onChange,
        closeDrawer,
        last: idx === querySuggestions.length - 1,
        allSuggestions: querySuggestions.reduce((acc, qs2) => {
          return acc + "$$" + qs2.query;
        }, ""),
        prompt: prompt != null ? prompt : ""
      }
    );
  }))), !hasNextInteraction && /* @__PURE__ */ React.createElement("div", { className: styles.nextInteractionHeight }, /* @__PURE__ */ React.createElement("div", { className: cx(styles.afterButtons, styles.textPadding) }, /* @__PURE__ */ React.createElement(
    Button,
    {
      onClick: () => {
        updateHasNextInteraction(true);
        nextInteraction();
      },
      "data-testid": queryAssistanttestIds.refinePrompt,
      fill: "outline",
      variant: "secondary",
      size: "md"
    },
    refineText
  )), /* @__PURE__ */ React.createElement("div", { className: cx(styles.textPadding, styles.floatRight) }, /* @__PURE__ */ React.createElement(Button, { fill: "outline", variant: "secondary", size: "md", onClick: closeDrawer }, "Cancel"))));
}

export { QuerySuggestionContainer };
//# sourceMappingURL=QuerySuggestionContainer.js.map
