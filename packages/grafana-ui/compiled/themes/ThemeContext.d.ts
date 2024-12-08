import React from 'react';
import { GrafanaTheme, GrafanaTheme2 } from '@grafana/data';
import { Themeable, Themeable2 } from '../types/theme';
type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
type Subtract<T, K> = Omit<T, keyof K>;
export declare const memoizedStyleCreators: WeakMap<object, any>;
/** @deprecated use withTheme2 */
/** @public */
export declare const withTheme: <P extends Themeable, S extends {} = {}>(Component: React.ComponentType<P>) => React.FunctionComponent<Subtract<P, Themeable>> & S;
/** @alpha */
export declare const withTheme2: <P extends Themeable2, S extends {} = {}>(Component: React.ComponentType<P>) => React.FunctionComponent<Subtract<P, Themeable2>> & S;
/** @deprecated use useTheme2 */
/** @public */
export declare function useTheme(): GrafanaTheme;
/** @public */
export declare function useTheme2(): GrafanaTheme2;
/**
 * Hook for using memoized styles with access to the theme.
 *
 * NOTE: For memoization to work, you need to ensure that the function
 * you pass in doesn't change, or only if it needs to. (i.e. declare
 * your style creator outside of a function component or use `useCallback()`.)
 * */
/** @deprecated use useStyles2 */
/** @public */
export declare function useStyles<T>(getStyles: (theme: GrafanaTheme) => T): T;
/**
 * Hook for using memoized styles with access to the theme. Pass additional
 * arguments to the getStyles function as additional arguments to this hook.
 *
 * Prefer using primitive values (boolean, number, string, etc) for
 * additional arguments for better performance
 *
 * ```
 * const getStyles = (theme, isDisabled, isOdd) => {css(...)}
 * [...]
 * const styles = useStyles2(getStyles, true, Boolean(index % 2))
 * ```
 *
 * NOTE: For memoization to work, ensure that all arguments don't change
 * across renders (or only change if they need to)
 *
 * @public
 * */
export declare function useStyles2<T extends unknown[], CSSReturnValue>(getStyles: (theme: GrafanaTheme2, ...args: T) => CSSReturnValue, ...additionalArguments: T): CSSReturnValue;
/**
 * Enables theme context mocking
 */
/** @public */
export declare const mockThemeContext: (theme: Partial<GrafanaTheme2>) => () => void;
export {};
