import { cx, css } from '@emotion/css';
import { createSlice } from '@reduxjs/toolkit';
import React, { useReducer, useState, useRef, useEffect } from 'react';
import { reportInteraction } from '@grafana/runtime';
import { useTheme2, Button, Alert, Checkbox, Input, Spinner } from '@grafana/ui';
import store from '../../../gcopypaste/app/core/store.js';
import { QuerySuggestionContainer } from './QuerySuggestionContainer.js';
import AI_Logo_color from './resources/AI_Logo_color.svg.js';
import { promQailSuggest, promQailExplain } from './state/helpers.js';
import { initialState, createInteraction } from './state/state.js';
import { SuggestionType } from './types.js';

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
const SKIP_STARTING_MESSAGE = "SKIP_STARTING_MESSAGE";
const PromQail = (props) => {
  const { query, closeDrawer, onChange, datasource } = props;
  const skipStartingMessage = store.getBool(SKIP_STARTING_MESSAGE, false);
  const [state, dispatch] = useReducer(stateSlice.reducer, initialState(query, !skipStartingMessage));
  const [labelNames, setLabelNames] = useState([]);
  const suggestions = state.interactions.reduce((acc, int) => acc + int.suggestions.length, 0);
  const responsesEndRef = useRef(null);
  const scrollToBottom = () => {
    var _a;
    if (responsesEndRef) {
      (_a = responsesEndRef == null ? void 0 : responsesEndRef.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [state.interactions.length, suggestions]);
  useEffect(() => {
    const fetchLabels = async () => {
      let labelsIndex = await datasource.languageProvider.fetchLabelsWithMatch(query.metric);
      setLabelNames(Object.keys(labelsIndex));
    };
    fetchLabels();
  }, [query, datasource]);
  const theme = useTheme2();
  const styles = getStyles(theme);
  return /* @__PURE__ */ React.createElement("div", { className: styles.containerPadding }, /* @__PURE__ */ React.createElement("div", { className: styles.header }, /* @__PURE__ */ React.createElement("h3", null, "Query advisor"), /* @__PURE__ */ React.createElement(Button, { icon: "times", fill: "text", variant: "secondary", onClick: closeDrawer })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: styles.iconSection }, /* @__PURE__ */ React.createElement("img", { src: AI_Logo_color, alt: "AI logo color" }), " Assistant"), state.showStartingMessage ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: styles.dataList }, /* @__PURE__ */ React.createElement("ol", null, /* @__PURE__ */ React.createElement("li", { className: styles.textPadding }, "Query Advisor suggests queries based on a metric and requests you type in."), /* @__PURE__ */ React.createElement("li", { className: styles.textPadding }, "Query Advisor sends Prometheus metrics, labels and metadata to the LLM provider you've configured. Be sure to align its usage with your company's internal policies."), /* @__PURE__ */ React.createElement("li", { className: styles.textPadding }, "An AI-suggested query may not fully answer your question. Always take a moment to understand a query before you use it."))), /* @__PURE__ */ React.createElement(
    Alert,
    {
      title: "",
      severity: "info",
      key: "promqail-llm-app",
      className: cx(styles.textPadding, styles.noMargin)
    },
    "Query Advisor is currently in Private Preview. Feedback is appreciated and can be provided on explanations and suggestions."
  ), /* @__PURE__ */ React.createElement("div", { className: styles.textPadding }, /* @__PURE__ */ React.createElement(
    Checkbox,
    {
      checked: state.indicateCheckbox,
      value: state.indicateCheckbox,
      onChange: () => {
        const val = store.getBool(SKIP_STARTING_MESSAGE, false);
        store.set(SKIP_STARTING_MESSAGE, !val);
        dispatch(indicateCheckbox(!val));
      },
      label: "Don't show this message again"
    }
  )), /* @__PURE__ */ React.createElement("div", { className: styles.rightButtonsWrapper }, /* @__PURE__ */ React.createElement("div", { className: styles.rightButtons }, /* @__PURE__ */ React.createElement(Button, { className: styles.leftButton, fill: "outline", variant: "secondary", onClick: closeDrawer }, "Cancel"), /* @__PURE__ */ React.createElement(
    Button,
    {
      fill: "solid",
      variant: "primary",
      onClick: () => dispatch(showStartingMessage(false)),
      "data-testid": queryAssistanttestIds.securityInfoButton
    },
    "Continue"
  )))) : /* @__PURE__ */ React.createElement("div", { className: styles.bodySmall }, /* @__PURE__ */ React.createElement("div", { className: styles.textPadding }, "Here is the metric you have selected:"), /* @__PURE__ */ React.createElement("div", { className: styles.infoContainerWrapper }, /* @__PURE__ */ React.createElement("div", { className: styles.infoContainer }, /* @__PURE__ */ React.createElement("table", { className: styles.metricTable }, /* @__PURE__ */ React.createElement("tbody", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", { className: styles.metricTableName }, "metric"), /* @__PURE__ */ React.createElement("td", { className: styles.metricTableValue }, state.query.metric), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement(
    Button,
    {
      fill: "outline",
      variant: "secondary",
      onClick: closeDrawer,
      className: styles.metricTableButton,
      size: "sm"
    },
    "Choose new metric"
  ))), state.query.labels.map((label, idx) => {
    const text = idx === 0 ? "labels" : "";
    return /* @__PURE__ */ React.createElement("tr", { key: `${label.label}-${idx}` }, /* @__PURE__ */ React.createElement("td", null, text), /* @__PURE__ */ React.createElement("td", { className: styles.metricTableValue }, `${label.label}${label.op}${label.value}`), /* @__PURE__ */ React.createElement("td", null, " "));
  }))))), !state.askForQueryHelp && state.interactions.length === 0 && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: styles.queryQuestion }, "Do you know what you want to query?"), /* @__PURE__ */ React.createElement("div", { className: styles.rightButtonsWrapper }, /* @__PURE__ */ React.createElement("div", { className: styles.rightButtons }, /* @__PURE__ */ React.createElement(
    Button,
    {
      className: styles.leftButton,
      fill: "solid",
      variant: "secondary",
      "data-testid": queryAssistanttestIds.clickForHistorical,
      onClick: () => {
        const isLoading = true;
        const suggestionType = SuggestionType.Historical;
        dispatch(addInteraction({ suggestionType, isLoading }));
        reportInteraction("grafana_prometheus_promqail_know_what_you_want_to_query", {
          promVisualQuery: query,
          doYouKnow: "no"
        });
        promQailSuggest(dispatch, 0, query, labelNames, datasource);
      }
    },
    "No"
  ), /* @__PURE__ */ React.createElement(
    Button,
    {
      fill: "solid",
      variant: "primary",
      "data-testid": queryAssistanttestIds.clickForAi,
      onClick: () => {
        reportInteraction("grafana_prometheus_promqail_know_what_you_want_to_query", {
          promVisualQuery: query,
          doYouKnow: "yes"
        });
        const isLoading = false;
        const suggestionType = SuggestionType.AI;
        dispatch(addInteraction({ suggestionType, isLoading }));
      }
    },
    "Yes"
  )))), state.interactions.map((interaction, idx) => {
    var _a, _b;
    return /* @__PURE__ */ React.createElement("div", { key: idx }, interaction.suggestionType === SuggestionType.AI ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: styles.textPadding }, "What kind of data do you want to see with your metric?"), /* @__PURE__ */ React.createElement("div", { className: cx(styles.secondaryText, styles.bottomMargin) }, /* @__PURE__ */ React.createElement("div", null, "You do not need to enter in a metric or a label again in the prompt."), /* @__PURE__ */ React.createElement("div", null, "Example: I want to monitor request latency, not errors.")), /* @__PURE__ */ React.createElement("div", { className: styles.inputPadding }, /* @__PURE__ */ React.createElement(
      Input,
      {
        value: interaction.prompt,
        spellCheck: false,
        placeholder: "Enter prompt",
        disabled: interaction.suggestions.length > 0,
        onChange: (e) => {
          const prompt = e.currentTarget.value;
          const payload = {
            idx,
            interaction: __spreadProps(__spreadValues({}, interaction), { prompt })
          };
          dispatch(updateInteraction(payload));
        }
      }
    )), interaction.suggestions.length === 0 ? interaction.isLoading ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: styles.loadingMessageContainer }, "Waiting for OpenAI ", /* @__PURE__ */ React.createElement(Spinner, { className: styles.floatRight }))) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: styles.rightButtonsWrapper }, /* @__PURE__ */ React.createElement("div", { className: styles.rightButtons }, /* @__PURE__ */ React.createElement(
      Button,
      {
        className: styles.leftButton,
        fill: "outline",
        variant: "secondary",
        onClick: closeDrawer
      },
      "Cancel"
    ), /* @__PURE__ */ React.createElement(
      Button,
      {
        className: styles.leftButton,
        fill: "outline",
        variant: "secondary",
        onClick: () => {
          const newInteraction = __spreadProps(__spreadValues({}, interaction), {
            suggestionType: SuggestionType.Historical,
            isLoading: true
          });
          const payload = {
            idx,
            interaction: newInteraction
          };
          reportInteraction("grafana_prometheus_promqail_suggest_query_instead", {
            promVisualQuery: query
          });
          dispatch(updateInteraction(payload));
          promQailSuggest(dispatch, idx, query, labelNames, datasource, newInteraction);
        }
      },
      "Suggest queries instead"
    ), /* @__PURE__ */ React.createElement(
      Button,
      {
        fill: "solid",
        variant: "primary",
        "data-testid": queryAssistanttestIds.submitPrompt + idx,
        onClick: () => {
          const newInteraction = __spreadProps(__spreadValues({}, interaction), {
            isLoading: true
          });
          const payload = {
            idx,
            interaction: newInteraction
          };
          reportInteraction("grafana_prometheus_promqail_prompt_submitted", {
            promVisualQuery: query,
            prompt: interaction.prompt
          });
          dispatch(updateInteraction(payload));
          promQailSuggest(dispatch, idx, query, labelNames, datasource, interaction);
        }
      },
      "Submit"
    )))) : (
      // LIST OF SUGGESTED QUERIES FROM AI
      /* @__PURE__ */ React.createElement(
        QuerySuggestionContainer,
        {
          suggestionType: SuggestionType.AI,
          querySuggestions: interaction.suggestions,
          closeDrawer,
          nextInteraction: () => {
            const isLoading = false;
            const suggestionType = SuggestionType.AI;
            dispatch(addInteraction({ suggestionType, isLoading }));
          },
          queryExplain: (suggIdx) => interaction.suggestions[suggIdx].explanation === "" ? promQailExplain(dispatch, idx, query, interaction, suggIdx, datasource) : interaction.suggestions[suggIdx].explanation,
          onChange,
          prompt: (_a = interaction.prompt) != null ? _a : ""
        }
      )
    )) : (
      // HISTORICAL SUGGESTIONS
      interaction.isLoading ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: styles.loadingMessageContainer }, "Waiting for OpenAI ", /* @__PURE__ */ React.createElement(Spinner, { className: styles.floatRight }))) : (
        // LIST OF SUGGESTED QUERIES FROM HISTORICAL DATA
        /* @__PURE__ */ React.createElement(
          QuerySuggestionContainer,
          {
            suggestionType: SuggestionType.Historical,
            querySuggestions: interaction.suggestions,
            closeDrawer,
            nextInteraction: () => {
              const isLoading = false;
              const suggestionType = SuggestionType.AI;
              dispatch(addInteraction({ suggestionType, isLoading }));
            },
            queryExplain: (suggIdx) => interaction.suggestions[suggIdx].explanation === "" ? promQailExplain(dispatch, idx, query, interaction, suggIdx, datasource) : interaction.suggestions[suggIdx].explanation,
            onChange,
            prompt: (_b = interaction.prompt) != null ? _b : ""
          }
        )
      )
    ));
  }))), /* @__PURE__ */ React.createElement("div", { ref: responsesEndRef }));
};
const getStyles = (theme) => {
  return {
    sectionPadding: css({
      padding: "20px"
    }),
    header: css({
      display: "flex",
      button: {
        marginLeft: "auto"
      }
    }),
    iconSection: css({
      padding: "0 0 10px 0",
      color: `${theme.colors.text.secondary}`,
      img: {
        paddingRight: "4px"
      }
    }),
    rightButtonsWrapper: css({
      display: "flex"
    }),
    rightButtons: css({
      marginLeft: "auto"
    }),
    leftButton: css({
      marginRight: "10px"
    }),
    dataList: css({
      padding: "0px 28px 0px 28px"
    }),
    textPadding: css({
      paddingBottom: "12px"
    }),
    containerPadding: css({
      padding: "28px"
    }),
    infoContainer: css({
      border: `${theme.colors.border.strong}`,
      padding: "16px",
      backgroundColor: `${theme.colors.background.secondary}`,
      borderRadius: `8px`,
      borderBottomLeftRadius: 0
    }),
    infoContainerWrapper: css({
      paddingBottom: "24px"
    }),
    metricTable: css({
      width: "100%"
    }),
    metricTableName: css({
      width: "15%"
    }),
    metricTableValue: css({
      fontFamily: `${theme.typography.fontFamilyMonospace}`,
      fontSize: `${theme.typography.bodySmall.fontSize}`,
      overflow: "scroll",
      textWrap: "nowrap",
      maxWidth: "150px",
      width: "60%",
      maskImage: `linear-gradient(to right, rgba(0, 0, 0, 1) 90%, rgba(0, 0, 0, 0))`
    }),
    metricTableButton: css({
      float: "right"
    }),
    queryQuestion: css({
      textAlign: "end",
      padding: "8px 0"
    }),
    secondaryText: css({
      color: `${theme.colors.text.secondary}`
    }),
    loadingMessageContainer: css({
      border: `${theme.colors.border.strong}`,
      padding: `16px`,
      backgroundColor: `${theme.colors.background.secondary}`,
      marginBottom: `20px`,
      borderRadius: `8px`,
      color: `${theme.colors.text.secondary}`,
      fontStyle: "italic"
    }),
    floatRight: css({
      float: "right"
    }),
    codeText: css({
      fontFamily: `${theme.typography.fontFamilyMonospace}`,
      fontSize: `${theme.typography.bodySmall.fontSize}`
    }),
    bodySmall: css({
      fontSize: `${theme.typography.bodySmall.fontSize}`
    }),
    explainPadding: css({
      paddingLeft: "26px"
    }),
    bottomMargin: css({
      marginBottom: "20px"
    }),
    topPadding: css({
      paddingTop: "22px"
    }),
    doc: css({
      textDecoration: "underline"
    }),
    afterButtons: css({
      display: "flex",
      justifyContent: "flex-end"
    }),
    feedbackStyle: css({
      margin: 0,
      textAlign: "right",
      paddingTop: "22px",
      paddingBottom: "22px"
    }),
    nextInteractionHeight: css({
      height: "88px"
    }),
    center: css({
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }),
    inputPadding: css({
      paddingBottom: "24px"
    }),
    querySuggestion: css({
      display: "flex",
      flexWrap: "nowrap"
    }),
    longCode: css({
      width: "90%",
      textWrap: "nowrap",
      overflow: "scroll",
      maskImage: `linear-gradient(to right, rgba(0, 0, 0, 1) 90%, rgba(0, 0, 0, 0))`,
      div: {
        display: "inline-block"
      }
    }),
    useButton: css({
      marginLeft: "auto"
    }),
    suggestionFeedback: css({
      textAlign: "left"
    }),
    feedbackQuestion: css({
      display: "flex",
      padding: "8px 0px",
      h6: { marginBottom: 0 },
      i: {
        marginTop: "1px"
      }
    }),
    explationTextInput: css({
      paddingLeft: "24px"
    }),
    submitFeedback: css({
      padding: "16px 0"
    }),
    noMargin: css({
      margin: 0
    }),
    enableButtonTooltip: css({
      padding: 8
    }),
    enableButtonTooltipText: css({
      color: `${theme.colors.text.secondary}`,
      ul: {
        marginLeft: 16
      }
    }),
    link: css({
      color: `${theme.colors.text.link} !important`
    })
  };
};
const queryAssistanttestIds = {
  promQail: "prom-qail",
  securityInfoButton: "security-info-button",
  clickForHistorical: "click-for-historical",
  clickForAi: "click-for-ai",
  submitPrompt: "submit-prompt",
  refinePrompt: "refine-prompt"
};
const stateSlice = createSlice({
  name: "metrics-modal-state",
  initialState: initialState(),
  reducers: {
    showExplainer: (state, action) => {
      state.showExplainer = action.payload;
    },
    showStartingMessage: (state, action) => {
      state.showStartingMessage = action.payload;
    },
    indicateCheckbox: (state, action) => {
      state.indicateCheckbox = action.payload;
    },
    askForQueryHelp: (state, action) => {
      state.askForQueryHelp = action.payload;
    },
    /*
     * start working on a collection of interactions
     * {
     *  askForhelp y n
     *  prompt question
     *  queries querySuggestions
     * }
     *
     */
    addInteraction: (state, action) => {
      const interaction = createInteraction(action.payload.suggestionType, action.payload.isLoading);
      const interactions = state.interactions;
      state.interactions = interactions.concat([interaction]);
    },
    updateInteraction: (state, action) => {
      const index = action.payload.idx;
      const updInteraction = action.payload.interaction;
      state.interactions = state.interactions.map((interaction, idx) => {
        if (idx === index) {
          return updInteraction;
        }
        return interaction;
      });
    }
  }
});
const { showStartingMessage, indicateCheckbox, addInteraction, updateInteraction } = stateSlice.actions;

export { PromQail, addInteraction, getStyles, indicateCheckbox, queryAssistanttestIds, showStartingMessage, updateInteraction };
//# sourceMappingURL=PromQail.js.map
