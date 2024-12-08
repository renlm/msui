function initialState(query, showStartingMessage) {
  return {
    query: query != null ? query : {
      metric: "",
      labels: [],
      operations: []
    },
    showExplainer: false,
    showStartingMessage: showStartingMessage != null ? showStartingMessage : true,
    indicateCheckbox: false,
    askForQueryHelp: false,
    interactions: []
  };
}
function createInteraction(suggestionType, isLoading) {
  return {
    suggestionType,
    prompt: "",
    suggestions: [],
    isLoading: isLoading != null ? isLoading : false,
    explanationIsLoading: false
  };
}

export { createInteraction, initialState };
//# sourceMappingURL=state.js.map
