export declare const promQueryEditorExplainKey = "PrometheusQueryEditorExplainDefault";
export type QueryEditorFlags = typeof promQueryEditorExplainKey;
type UseFlagHookReturnType = {
    flag: boolean;
    setFlag: (val: boolean) => void;
};
/**
 *
 * Use and store value of explain switch in local storage.
 * Needs to be a hook with local state to trigger re-renders.
 */
export declare function useFlag(key: QueryEditorFlags, defaultValue?: boolean): UseFlagHookReturnType;
export {};
