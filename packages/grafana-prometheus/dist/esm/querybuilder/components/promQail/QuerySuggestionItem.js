import { cx } from '@emotion/css';
import React, { useState } from 'react';
import { reportInteraction } from '@grafana/runtime';
import { useTheme2, Button, Spinner, Toggletip, RadioButtonList, TextArea } from '@grafana/ui';
import { buildVisualQueryFromString } from '../../parsing.js';
import { getStyles } from './PromQail.js';

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
const suggestionOptions = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" }
];
const explationOptions = [
  { label: "Too vague", value: "too vague" },
  { label: "Too technical", value: "too technical" },
  { label: "Inaccurate", value: "inaccurate" },
  { label: "Other", value: "other" }
];
function QuerySuggestionItem(props) {
  const { querySuggestion, order, queryExplain, historical, onChange, closeDrawer, last, allSuggestions, prompt } = props;
  const [showExp, updShowExp] = useState(false);
  const [gaveExplanationFeedback, updateGaveExplanationFeedback] = useState(false);
  const [gaveSuggestionFeedback, updateGaveSuggestionFeedback] = useState(false);
  const [suggestionFeedback, setSuggestionFeedback] = useState({
    radioInput: "",
    text: ""
  });
  const [explanationFeedback, setExplanationFeedback] = useState({
    radioInput: "",
    text: ""
  });
  const theme = useTheme2();
  const styles = getStyles(theme);
  const { query, explanation } = querySuggestion;
  const feedbackToggleTip = (type) => {
    const updateRadioFeedback = (value) => {
      if (type === "explanation") {
        setExplanationFeedback(__spreadProps(__spreadValues({}, explanationFeedback), {
          radioInput: value
        }));
      } else {
        setSuggestionFeedback(__spreadProps(__spreadValues({}, suggestionFeedback), {
          radioInput: value
        }));
      }
    };
    const updateTextFeedback = (e) => {
      if (type === "explanation") {
        setExplanationFeedback(__spreadProps(__spreadValues({}, explanationFeedback), {
          text: e.currentTarget.value
        }));
      } else {
        setSuggestionFeedback(__spreadProps(__spreadValues({}, suggestionFeedback), {
          text: e.currentTarget.value
        }));
      }
    };
    const disabledButton = () => type === "explanation" ? !explanationFeedback.radioInput : !suggestionFeedback.radioInput;
    const questionOne = type === "explanation" ? "Why was the explanation not helpful?" : "Were the query suggestions helpful?";
    return /* @__PURE__ */ React.createElement("div", { className: styles.suggestionFeedback }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: styles.feedbackQuestion }, /* @__PURE__ */ React.createElement("h6", null, questionOne), /* @__PURE__ */ React.createElement("i", null, "(Required)")), /* @__PURE__ */ React.createElement(
      RadioButtonList,
      {
        name: "default",
        options: type === "explanation" ? explationOptions : suggestionOptions,
        value: type === "explanation" ? explanationFeedback.radioInput : suggestionFeedback.radioInput,
        onChange: updateRadioFeedback
      }
    )), /* @__PURE__ */ React.createElement("div", { className: cx(type === "explanation" && styles.explationTextInput) }, type !== "explanation" && /* @__PURE__ */ React.createElement("div", { className: styles.feedbackQuestion }, /* @__PURE__ */ React.createElement("h6", null, "How can we improve the query suggestions?")), /* @__PURE__ */ React.createElement(
      TextArea,
      {
        type: "text",
        "aria-label": "Promqail suggestion text",
        placeholder: "Enter your feedback",
        value: type === "explanation" ? explanationFeedback.text : suggestionFeedback.text,
        onChange: updateTextFeedback,
        cols: 100
      }
    )), /* @__PURE__ */ React.createElement("div", { className: styles.submitFeedback }, /* @__PURE__ */ React.createElement(
      Button,
      {
        variant: "primary",
        size: "sm",
        disabled: disabledButton(),
        onClick: () => {
          if (type === "explanation") {
            explanationFeedbackEvent(
              explanationFeedback.radioInput,
              explanationFeedback.text,
              querySuggestion,
              historical,
              prompt
            );
            updateGaveExplanationFeedback(true);
          } else {
            suggestionFeedbackEvent(
              suggestionFeedback.radioInput,
              suggestionFeedback.text,
              allSuggestions != null ? allSuggestions : "",
              historical,
              prompt
            );
            updateGaveSuggestionFeedback(true);
          }
        }
      },
      "Submit"
    )));
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: styles.querySuggestion }, /* @__PURE__ */ React.createElement("div", { title: query, className: cx(styles.codeText, styles.longCode) }, `${order}.  ${query}`), /* @__PURE__ */ React.createElement("div", { className: styles.useButton }, /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: "primary",
      size: "sm",
      onClick: () => {
        reportInteraction("grafana_prometheus_promqail_use_query_button_clicked", {
          query: querySuggestion.query
        });
        const pvq = buildVisualQueryFromString(querySuggestion.query);
        onChange(pvq.query);
        closeDrawer();
      }
    },
    "Use"
  ))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(
    Button,
    {
      fill: "text",
      variant: "secondary",
      icon: showExp ? "angle-up" : "angle-down",
      onClick: () => {
        updShowExp(!showExp);
        queryExplain(order - 1);
      },
      className: cx(styles.bodySmall),
      size: "sm"
    },
    "Explainer"
  ), !showExp && order !== 5 && /* @__PURE__ */ React.createElement("div", { className: styles.textPadding }), showExp && !querySuggestion.explanation && /* @__PURE__ */ React.createElement("div", { className: styles.center }, /* @__PURE__ */ React.createElement(Spinner, null)), showExp && querySuggestion.explanation && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: cx(styles.bodySmall, styles.explainPadding) }, /* @__PURE__ */ React.createElement("div", { className: styles.textPadding }, "This query is trying to answer the question:"), /* @__PURE__ */ React.createElement("div", { className: styles.textPadding }, explanation), /* @__PURE__ */ React.createElement("div", { className: styles.textPadding }, "Learn more with this", " ", /* @__PURE__ */ React.createElement(
    "a",
    {
      className: styles.doc,
      href: "https://prometheus.io/docs/prometheus/latest/querying/examples/#query-examples",
      target: "_blank",
      rel: "noopener noreferrer"
    },
    "Prometheus doc"
  )), /* @__PURE__ */ React.createElement("div", { className: cx(styles.rightButtons, styles.secondaryText) }, "Was this explanation helpful?", /* @__PURE__ */ React.createElement("div", { className: styles.floatRight }, !gaveExplanationFeedback ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
    Button,
    {
      fill: "outline",
      variant: "secondary",
      size: "sm",
      className: styles.leftButton,
      onClick: () => {
        explanationFeedbackEvent("Yes", "", querySuggestion, historical, prompt);
        updateGaveExplanationFeedback(true);
      }
    },
    "Yes"
  ), /* @__PURE__ */ React.createElement(
    Toggletip,
    {
      "aria-label": "Suggestion feedback",
      content: feedbackToggleTip("explanation"),
      placement: "bottom-end",
      closeButton: true
    },
    /* @__PURE__ */ React.createElement(Button, { fill: "outline", variant: "secondary", size: "sm" }, "No")
  )) : "Thank you for your feedback!"))), !last && /* @__PURE__ */ React.createElement("hr", null)), last && /* @__PURE__ */ React.createElement("div", { className: cx(styles.feedbackStyle) }, !gaveSuggestionFeedback ? /* @__PURE__ */ React.createElement(
    Toggletip,
    {
      "aria-label": "Suggestion feedback",
      content: feedbackToggleTip("suggestion"),
      placement: "bottom-end",
      closeButton: true
    },
    /* @__PURE__ */ React.createElement(Button, { fill: "outline", variant: "secondary", size: "sm" }, "Give feedback on suggestions")
  ) : (
    // do this weird thing because the toggle tip doesn't allow an extra close function
    /* @__PURE__ */ React.createElement(Button, { fill: "outline", variant: "secondary", size: "sm", disabled: true }, "Thank you for your feedback!")
  ))));
}
function explanationFeedbackEvent(radioInputFeedback, textFeedback, querySuggestion, historical, prompt) {
  const event = "grafana_prometheus_promqail_explanation_feedback";
  reportInteraction(event, {
    helpful: radioInputFeedback,
    textFeedback,
    suggestionType: historical ? "historical" : "AI",
    query: querySuggestion.query,
    explanation: querySuggestion.explanation,
    prompt
  });
}
function suggestionFeedbackEvent(radioInputFeedback, textFeedback, allSuggestions, historical, prompt) {
  const event = "grafana_prometheus_promqail_suggestion_feedback";
  reportInteraction(event, {
    helpful: radioInputFeedback,
    textFeedback,
    suggestionType: historical ? "historical" : "AI",
    allSuggestions,
    prompt
  });
}

export { QuerySuggestionItem };
//# sourceMappingURL=QuerySuggestionItem.js.map
