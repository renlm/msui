export declare const pluginVersion = "11.1.11";
export type UpdateConfig = {
    render: boolean;
    dataChanged: boolean;
    schemaChanged: boolean;
};
export declare enum DebugMode {
    Cursor = "cursor",
    Events = "events",
    Render = "render",
    State = "State",
    ThrowError = "ThrowError"
}
export interface Options {
    counters?: UpdateConfig;
    mode: DebugMode;
}
