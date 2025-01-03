export type QuerySuggestion = {
    query: string;
    explanation: string;
};
export declare enum SuggestionType {
    Historical = "historical",
    AI = "AI"
}
export type Interaction = {
    prompt: string;
    suggestionType: SuggestionType;
    suggestions: QuerySuggestion[];
    isLoading: boolean;
    explanationIsLoading: boolean;
};
