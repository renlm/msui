/** @beta */
export interface ThemeBreakpointValues {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
}
/** @beta */
export type ThemeBreakpointsKey = keyof ThemeBreakpointValues;
/** @beta */
export interface ThemeBreakpoints {
    values: ThemeBreakpointValues;
    keys: string[];
    unit: string;
    up: (key: ThemeBreakpointsKey | number) => string;
    down: (key: ThemeBreakpointsKey | number) => string;
}
/** @internal */
export declare function createBreakpoints(): ThemeBreakpoints;
