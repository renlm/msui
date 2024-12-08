/// <reference types="react" />
/// <reference types="lodash" />
/// <reference types="trusted-types" />
import { SortOrder, TimeZone as TimeZone$1, TimeZoneBrowser as TimeZoneBrowser$1, TimeZoneUtc as TimeZoneUtc$1, DataQuery as DataQuery$1, MatcherConfig, DataSourceRef as DataSourceRef$1, DataTransformerConfig, AnnotationQuery as AnnotationQuery$1, DataSourceJsonData as DataSourceJsonData$1, HideSeriesConfig, DataTopic, MapLayerOptions, ComparisonOperation } from '@grafana/schema';
export { DataTopic, DataTransformerConfig, FrameGeometrySource, FrameGeometrySourceMode, LogsDedupStrategy, LogsSortOrder, MapLayerOptions, MatcherConfig } from '@grafana/schema';
import React$1, { ComponentType, ComponentClass, ReactNode, PropsWithChildren, ReactElement } from 'react';
import moment from 'moment';
import { Observable, Unsubscribable, MonoTypeOperatorFunction } from 'rxjs';
import { Location } from 'history';
import * as lodash from 'lodash';
import moment$1 from 'moment-timezone';
import { Interval, Duration } from 'date-fns';
import { Map } from 'ol';
import BaseLayer from 'ol/layer/Base';

/** @internal */
declare function moveItemImmutably<T>(arr: T[], from: number, to: number): T[];
/** @internal */
declare function insertBeforeImmutably<T>(array: T[], item: T, index: number): T[];
/** @internal */
declare function insertAfterImmutably<T>(array: T[], item: T, index: number): T[];
declare function sortValues(sort: SortOrder.Ascending | SortOrder.Descending): (a: unknown, b: unknown) => number;

declare const arrayUtils_d_moveItemImmutably: typeof moveItemImmutably;
declare const arrayUtils_d_insertBeforeImmutably: typeof insertBeforeImmutably;
declare const arrayUtils_d_insertAfterImmutably: typeof insertAfterImmutably;
declare const arrayUtils_d_sortValues: typeof sortValues;
declare namespace arrayUtils_d {
  export {
    arrayUtils_d_moveItemImmutably as moveItemImmutably,
    arrayUtils_d_insertBeforeImmutably as insertBeforeImmutably,
    arrayUtils_d_insertAfterImmutably as insertAfterImmutably,
    arrayUtils_d_sortValues as sortValues,
  };
}

declare const GAUGE_DEFAULT_MINIMUM = 0;
declare const GAUGE_DEFAULT_MAXIMUM = 100;
declare const DEFAULT_SAML_NAME = "SAML";

interface FormattedValue {
    text: string;
    prefix?: string;
    suffix?: string;
}
declare function formattedValueToString(val: FormattedValue): string;
type ValueFormatter = (value: number, decimals?: DecimalCount, scaledDecimals?: DecimalCount, timeZone?: TimeZone, showMs?: boolean) => FormattedValue;
interface ValueFormat {
    name: string;
    id: string;
    fn: ValueFormatter;
}
interface ValueFormatCategory {
    name: string;
    formats: ValueFormat[];
}
interface ValueFormatterIndex {
    [id: string]: ValueFormatter;
}
declare function toFixed(value: number, decimals?: DecimalCount): string;
declare function toFixedScaled(value: number, decimals: DecimalCount, ext?: string): FormattedValue;
declare function toFixedUnit(unit: string, asPrefix?: boolean): ValueFormatter;
declare function isBooleanUnit(unit?: string): boolean | "" | undefined;
declare function booleanValueFormatter(t: string, f: string): ValueFormatter;
declare function scaledUnits(factor: number, extArray: string[], offset?: number): ValueFormatter;
declare function locale(value: number, decimals: DecimalCount): FormattedValue;
declare function simpleCountUnit(symbol: string): ValueFormatter;
declare function stringFormater(value: number): FormattedValue;
declare function getValueFormat(id?: string | null): ValueFormatter;
declare function getValueFormatterIndex(): ValueFormatterIndex;
declare function getValueFormats(): {
    text: string;
    submenu: {
        text: string;
        value: string;
    }[];
}[];

type DisplayProcessor = (value: unknown, decimals?: DecimalCount) => DisplayValue;
interface DisplayValue extends FormattedValue {
    /**
     *  Use isNaN to check if it is a real number
     */
    numeric: number;
    /**
     *  0-1 between min & max
     */
    percent?: number;
    /**
     *  0-1 percent change across range
     */
    percentChange?: number;
    /**
     *  Color based on mappings or threshold
     */
    color?: string;
    /**
     *  Icon based on mappings or threshold
     */
    icon?: string;
    title?: string;
    /**
     * Used in limited scenarios like legend reducer calculations
     */
    description?: string;
}
/**
 * These represents the display value with the longest title and text.
 * Used to align widths and heights when displaying multiple DisplayValues
 */
interface DisplayValueAlignmentFactors extends FormattedValue {
    title?: string;
}
type DecimalCount = number | null | undefined;
interface DecimalInfo {
    decimals: DecimalCount;
    scaledDecimals: DecimalCount;
}

interface ScopedVar<T = any> {
    text?: any;
    value: T;
}
interface ScopedVars {
    __dataContext?: DataContextScopedVar;
    [key: string]: ScopedVar | undefined;
}
/**
 * Used by data link macros
 */
interface DataContextScopedVar {
    value: {
        data: DataFrame[];
        frame: DataFrame;
        field: Field;
        rowIndex?: number;
        frameIndex?: number;
        calculatedValue?: DisplayValue;
    };
}

interface DateTimeBuiltinFormat {
    __momentBuiltinFormatBrand: any;
}
declare const ISO_8601: DateTimeBuiltinFormat;
type DateTimeInput = Date | string | number | Array<string | number> | DateTime | null;
type FormatInput = string | DateTimeBuiltinFormat | undefined;
type DurationInput = string | number | DateTimeDuration;
type DurationUnit = 'year' | 'years' | 'y' | 'month' | 'months' | 'M' | 'week' | 'weeks' | 'isoWeek' | 'w' | 'day' | 'days' | 'd' | 'hour' | 'hours' | 'h' | 'minute' | 'minutes' | 'm' | 'second' | 'seconds' | 's' | 'millisecond' | 'milliseconds' | 'ms' | 'quarter' | 'quarters' | 'Q';
interface DateTimeLocale {
    firstDayOfWeek: () => number;
}
interface DateTimeDuration {
    asHours: () => number;
    hours: () => number;
    minutes: () => number;
    seconds: () => number;
    asSeconds: () => number;
}
interface DateTime extends Object {
    add: (amount?: DateTimeInput, unit?: DurationUnit) => DateTime;
    set: (unit: DurationUnit | 'date', amount: DateTimeInput) => void;
    diff: (amount: DateTimeInput, unit?: DurationUnit, truncate?: boolean) => number;
    endOf: (unitOfTime: DurationUnit) => DateTime;
    format: (formatInput?: FormatInput) => string;
    fromNow: (withoutSuffix?: boolean) => string;
    from: (formaInput: DateTimeInput) => string;
    isSame: (input?: DateTimeInput, granularity?: DurationUnit) => boolean;
    isBefore: (input?: DateTimeInput) => boolean;
    isValid: () => boolean;
    local: () => DateTime;
    locale: (locale: string) => DateTime;
    startOf: (unitOfTime: DurationUnit) => DateTime;
    subtract: (amount?: DateTimeInput, unit?: DurationUnit) => DateTime;
    toDate: () => Date;
    toISOString: (keepOffset?: boolean) => string;
    isoWeekday: (day?: number | string) => number | string;
    valueOf: () => number;
    unix: () => number;
    utc: () => DateTime;
    utcOffset: () => number;
    hour?: () => number;
    minute?: () => number;
}
declare const setLocale: (language: string) => void;
declare const getLocale: () => string;
declare const getLocaleData: () => DateTimeLocale;
declare const isDateTimeInput: (value: unknown) => value is DateTimeInput;
declare const isDateTime: (value: unknown) => value is DateTime;
declare const toUtc: (input?: DateTimeInput, formatInput?: FormatInput) => DateTime;
declare const toDuration: (input?: DurationInput, unit?: DurationUnit) => DateTimeDuration;
declare const dateTime: (input?: DateTimeInput, formatInput?: FormatInput) => DateTime;
declare const dateTimeAsMoment: (input?: DateTimeInput) => moment.Moment;
declare const dateTimeForTimeZone: (timezone?: TimeZone, input?: DateTimeInput, formatInput?: FormatInput) => DateTime;
declare const getWeekdayIndex: (day: string) => number;
declare const getWeekdayIndexByEnglishName: (day: string) => number;
declare const setWeekStart: (weekStart?: string) => void;

interface RawTimeRange {
    from: DateTime | string;
    to: DateTime | string;
}
interface TimeRange {
    from: DateTime;
    to: DateTime;
    raw: RawTimeRange;
}
/**
 * Type to describe relative time to now in seconds.
 * @internal
 */
interface RelativeTimeRange {
    from: number;
    to: number;
}
interface AbsoluteTimeRange {
    from: number;
    to: number;
}
interface IntervalValues {
    interval: string;
    intervalMs: number;
}
interface TimeOption {
    from: string;
    to: string;
    display: string;
    invalid?: boolean;
    section?: number;
}
/** @deprecated use TimeZone from schema  */
type TimeZone = TimeZone$1;
/** @deprecated use TimeZoneBrowser from schema  */
type TimeZoneBrowser = TimeZoneBrowser$1;
/** @deprecated use TimeZoneUtc from schema  */
type TimeZoneUtc = TimeZoneUtc$1;
/** @deprecated use defaultTimeZone from schema  */
declare const DefaultTimeZone: string;
interface TimeOptions {
    [key: string]: TimeOption[];
}
type TimeFragment = string | DateTime;
declare const TIME_FORMAT = "YYYY-MM-DD HH:mm:ss";
declare function getDefaultTimeRange(): TimeRange;
/**
 * Returns the default realtive time range.
 *
 * @public
 */
declare function getDefaultRelativeTimeRange(): RelativeTimeRange;
/**
 * Simple helper to quickly create a TimeRange object either from string representations of a dateTime or directly
 * DateTime objects.
 */
declare function makeTimeRange(from: DateTime | string, to: DateTime | string): TimeRange;

type AnyQuery = DataQuery$1 & Record<string, any>;
type URLRangeValue = string | {
    __brand: 'URL Range Value';
};
/**
 * @internal
 */
type URLRange = {
    from: URLRangeValue;
    to: URLRangeValue;
};
/** @internal */
interface ExploreUrlState<T extends DataQuery$1 = AnyQuery> {
    datasource: string | null;
    queries: T[];
    range: URLRange;
    panelsState?: ExplorePanelsState;
}
interface ExplorePanelsState extends Partial<Record<PreferredVisualisationType, {}>> {
    trace?: ExploreTracePanelState;
    logs?: ExploreLogsPanelState;
}
/**
 * Keep a list of vars the correlations editor / helper in explore will use
 *
 * vars can be modified by transformation variables, origVars is so we can rebuild the original list
 */
/** @internal */
interface ExploreCorrelationHelperData {
    resultField: string;
    origVars: Record<string, string>;
    vars: Record<string, string>;
}
interface ExploreTracePanelState {
    spanId?: string;
}
interface ExploreLogsPanelState {
    id?: string;
    columns?: Record<number, string>;
    visualisationType?: 'table' | 'logs';
    labelFieldName?: string;
    refId?: string;
}
interface SplitOpenOptions<T extends AnyQuery = AnyQuery> {
    datasourceUid: string;
    queries: T[];
    range?: TimeRange;
    panelsState?: ExplorePanelsState;
    correlationHelperData?: ExploreCorrelationHelperData;
}
/**
 * SplitOpen type is used in Explore and related components.
 */
type SplitOpen = (options?: SplitOpenOptions | undefined) => void;

/**
 * @alpha
 * internal interface
 */
interface BusEvent {
    readonly type: string;
    readonly payload?: any;
    origin?: EventBus;
}
/**
 * @alpha
 * Base event type
 */
declare abstract class BusEventBase implements BusEvent {
    readonly type: string;
    readonly payload?: any;
    readonly origin?: EventBus;
    /** @internal */
    tags?: Set<string>;
    constructor();
    /**
     * @internal
     * Tag event for finer-grained filtering in subscribers
     */
    setTags(tags: string[]): this;
}
/**
 * @alpha
 * Base event type with payload
 */
declare abstract class BusEventWithPayload<T> extends BusEventBase {
    readonly payload: T;
    constructor(payload: T);
}
interface BusEventType<T extends BusEvent> {
    type: string;
    new (...args: any[]): T;
}
/**
 * @alpha
 * Event callback/handler type
 */
interface BusEventHandler<T extends BusEvent> {
    (event: T): void;
}
/**
 * @alpha
 * Main minimal interface
 */
interface EventFilterOptions {
    onlyLocal: boolean;
}
/**
 * @alpha
 * Main minimal interface
 */
interface EventBus {
    /**
     * Publish single event
     */
    publish<T extends BusEvent>(event: T): void;
    /**
     * Get observable of events
     */
    getStream<T extends BusEvent>(eventType: BusEventType<T>): Observable<T>;
    /**
     * Subscribe to an event stream
     *
     * This function is a wrapper around the `getStream(...)` function
     */
    subscribe<T extends BusEvent>(eventType: BusEventType<T>, handler: BusEventHandler<T>): Unsubscribable;
    /**
     * Remove all event subscriptions
     */
    removeAllListeners(): void;
    /**
     * Returns a new bus scoped that knows where it exists in a heiarchy
     *
     * @internal -- This is included for internal use only should not be used directly
     */
    newScopedBus(key: string, filter: EventFilterOptions): EventBus;
}
/**
 * @public
 * @deprecated event type
 */
interface AppEvent<T> {
    readonly name: string;
    payload?: T;
}
/** @public */
interface LegacyEmitter {
    /**
     * @deprecated use $emit
     */
    emit<T>(event: AppEvent<T> | string, payload?: T): void;
    /**
     * @deprecated use $on
     */
    on<T>(event: AppEvent<T> | string, handler: LegacyEventHandler<T>, scope?: any): void;
    /**
     * @deprecated use $on
     */
    off<T>(event: AppEvent<T> | string, handler: (payload?: T | any) => void): void;
}
/** @public */
interface LegacyEventHandler<T> {
    (payload: T): void;
    wrapper?: (event: BusEvent) => void;
}
/** @alpha */
interface EventBusExtended extends EventBus, LegacyEmitter {
}

declare function eventFactory<T = undefined>(name: string): AppEvent<T>;

/**
 * @alpha
 */
declare class EventBusSrv implements EventBus, LegacyEmitter {
    private emitter;
    private subscribers;
    constructor();
    publish<T extends BusEvent>(event: T): void;
    subscribe<T extends BusEvent>(typeFilter: BusEventType<T>, handler: BusEventHandler<T>): Unsubscribable;
    getStream<T extends BusEvent = BusEvent>(eventType: BusEventType<T>): Observable<T>;
    newScopedBus(key: string, filter?: EventFilterOptions): ScopedEventBus;
    /**
     * Legacy functions
     */
    emit<T>(event: AppEvent<T> | string, payload?: T | any): void;
    on<T>(event: AppEvent<T> | string, handler: LegacyEventHandler<T>, scope?: any): void;
    off<T>(event: AppEvent<T> | string, handler: LegacyEventHandler<T>): void;
    removeAllListeners(): void;
}
/**
 * Wraps EventBus and adds a source to help with identifying if a subscriber should react to the event or not.
 */
declare class ScopedEventBus implements EventBus {
    path: string[];
    private eventBus;
    filterConfig: EventFilterOptions;
    constructor(path: string[], eventBus: EventBus, filter?: EventFilterOptions);
    publish<T extends BusEvent>(event: T): void;
    filter<T extends BusEvent>(event: T): boolean;
    getStream<T extends BusEvent>(eventType: BusEventType<T>): Observable<T>;
    subscribe<T extends BusEvent>(typeFilter: BusEventType<T>, handler: BusEventHandler<T>): Unsubscribable;
    removeAllListeners(): void;
    /**
     * Creates a nested event bus structure
     */
    newScopedBus(key: string, filter: EventFilterOptions): EventBus;
}

/**
 * When hovering over an element this will identify
 *
 * For performance reasons, this object will usually be mutated between updates.  This
 * will avoid creating new objects for events that fire frequently (ie each mouse pixel)
 *
 * @alpha
 */
interface DataHoverPayload {
    data?: DataFrame;
    rowIndex?: number;
    columnIndex?: number;
    dataId?: string;
    point: Record<string, number | null>;
    down?: Record<string, number | null>;
}
/** @alpha */
declare class DataHoverEvent extends BusEventWithPayload<DataHoverPayload> {
    static type: string;
}
/** @alpha */
declare class DataHoverClearEvent extends BusEventBase {
    static type: string;
}
/** @alpha */
declare class DataSelectEvent extends BusEventWithPayload<DataHoverPayload> {
    static type: string;
}
/** @alpha */
declare class AnnotationChangeEvent extends BusEventWithPayload<Partial<AnnotationEvent>> {
    static type: string;
}
type DashboardLoadedEventPayload<T> = {
    dashboardId: string;
    orgId?: number;
    userId?: number;
    grafanaVersion?: string;
    queries: Record<string, T[]>;
};
/** @alpha */
declare class DashboardLoadedEvent<T> extends BusEventWithPayload<DashboardLoadedEventPayload<T>> {
    static type: string;
}
declare class DataSourceUpdatedSuccessfully extends BusEventBase {
    static type: string;
}
declare class DataSourceTestSucceeded extends BusEventBase {
    static type: string;
}
declare class DataSourceTestFailed extends BusEventBase {
    static type: string;
}
declare class SetPanelAttentionEvent extends BusEventWithPayload<{
    panelId: string | number;
}> {
    static type: string;
}

/**
 * @public
 * @deprecated use a simple Arrays
 */
declare abstract class FunctionalVector<T = unknown> {
    abstract get length(): number;
    abstract get(index: number): T;
    iterator(): Generator<T, void, unknown>;
    set(index: number, value: T): void;
    add(value: T): void;
    push(...vals: T[]): number;
    [Symbol.iterator](): Generator<T, void, unknown>;
    forEach(iterator: (row: T, index: number, array: T[]) => void): void;
    map<V>(transform: (item: T, index: number, array: T[]) => V): V[];
    filter(predicate: (item: T, index: number, array: T[]) => boolean): T[];
    at(index: number): T | undefined;
    toArray(): T[];
    join(separator?: string | undefined): string;
    toJSON(): any;
    [n: number]: T;
    pop(): T | undefined;
    concat(...items: Array<ConcatArray<T>>): T[];
    reverse(): T[];
    shift(): T | undefined;
    sort(compareFn?: ((a: T, b: T) => number) | undefined): this;
    splice(start: number, deleteCount?: number | undefined): T[];
    unshift(...items: T[]): number;
    fill(value: T, start?: number | undefined, end?: number | undefined): this;
    copyWithin(target: number, start: number, end?: number | undefined): this;
    [Symbol.unscopables]: {};
    slice(start?: number | undefined, end?: number | undefined): T[];
    indexOf(searchElement: T, fromIndex?: number | undefined): number;
    lastIndexOf(searchElement: T, fromIndex?: number | undefined): number;
    every<S extends T>(predicate: (value: T, index: number, array: T[]) => value is S, thisArg?: any): this is S[];
    every(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): boolean;
    some(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): boolean;
    reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T): T;
    reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue: T): T;
    reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;
    reduceRight(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T): T;
    reduceRight(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue: T): T;
    reduceRight<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;
    find<S extends T>(predicate: (this: void, value: T, index: number, obj: T[]) => value is S, thisArg?: any): S | undefined;
    findIndex(predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): number;
    entries(): IterableIterator<[number, T]>;
    keys(): IterableIterator<number>;
    values(): IterableIterator<T>;
    includes(searchElement: T, fromIndex?: number | undefined): boolean;
    flatMap<U, This = undefined>(callback: (this: This, value: T, index: number, array: T[]) => U | readonly U[], thisArg?: This | undefined): U[];
    flat<A, D extends number = 1>(this: A, depth?: D | undefined): Array<FlatArray<A, D>>;
}
/**
 * Use functional programming with your vector
 *
 * @deprecated use a simple Arrays
 */
declare function vectorator<T>(vector: FunctionalVector<T>): {
    [Symbol.iterator](): Generator<T, void, unknown>;
    forEach(iterator: (row: T, index: number, array: T[]) => void): void;
    map<V>(transform: (item: T, index: number, array: T[]) => V): V[];
    /** Add a predicate where you return true if it should *keep* the value */
    filter(predicate: (item: T, index: number, array: T[]) => boolean): T[];
};

/**
 * This abstraction will present the contents of a DataFrame as if
 * it were a well typed javascript object Vector.
 *
 * @remarks
 * The {@link DataFrameView.get} is optimized for use in a loop and will return same object.
 * See function for more details.
 *
 * @typeParam T - Type of object stored in the DataFrame.
 * @beta
 */
declare class DataFrameView<T extends object = any> extends FunctionalVector<T> {
    private data;
    private index;
    private obj;
    readonly fields: {
        readonly [Property in keyof T]: Field<T[Property]>;
    };
    constructor(data: DataFrame);
    get dataFrame(): DataFrame;
    get length(): number;
    /**
     * Helper function to return the {@link DisplayProcessor} for a given field column.
     * @param colIndex - the field column index for the data frame.
     */
    getFieldDisplayProcessor(colIndex: number): DisplayProcessor | undefined;
    /**
     * The contents of the object returned from this function
     * are optimized for use in a loop. All calls return the same object
     * but the index has changed.
     *
     * @example
     * ```typescript
     *   // `first`, `second` and `third` will all point to the same contents at index 2:
     *   const first = view.get(0);
     *   const second = view.get(1);
     *   const third = view.get(2);
     *
     *   // If you need three different objects, consider something like:
     *   const first = { ...view.get(0) };
     *   const second = { ...view.get(1) };
     *   const third = { ...view.get(2) };
     * ```
     * @param idx - The index of the object you currently are inspecting
     */
    get(idx: number): T;
    toArray(): T[];
}

declare enum GrafanaThemeType {
    Light = "light",
    Dark = "dark"
}
interface GrafanaThemeCommons {
    name: string;
    breakpoints: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        xxl: string;
    };
    typography: {
        fontFamily: {
            sansSerif: string;
            monospace: string;
        };
        size: {
            base: string;
            xs: string;
            sm: string;
            md: string;
            lg: string;
        };
        weight: {
            light: number;
            regular: number;
            semibold: number;
            bold: number;
        };
        lineHeight: {
            xs: number;
            sm: number;
            md: number;
            lg: number;
        };
        heading: {
            h1: string;
            h2: string;
            h3: string;
            h4: string;
            h5: string;
            h6: string;
        };
        link: {
            decoration: string;
            hoverDecoration: string;
        };
    };
    spacing: {
        base: number;
        insetSquishMd: string;
        d: string;
        xxs: string;
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        gutter: string;
        formSpacingBase: number;
        formMargin: string;
        formFieldsetMargin: string;
        formInputHeight: number;
        formButtonHeight: number;
        formInputPaddingHorizontal: string;
        formInputAffixPaddingHorizontal: string;
        formInputMargin: string;
        formLabelPadding: string;
        formLabelMargin: string;
        formValidationMessagePadding: string;
        formValidationMessageMargin: string;
        inlineFormMargin: string;
    };
    border: {
        radius: {
            sm: string;
            md: string;
            lg: string;
        };
        width: {
            sm: string;
        };
    };
    height: {
        sm: number;
        md: number;
        lg: number;
    };
    panelPadding: number;
    panelHeaderHeight: number;
    zIndex: {
        dropdown: number;
        navbarFixed: number;
        sidemenu: number;
        tooltip: number;
        modalBackdrop: number;
        modal: number;
        portal: number;
        typeahead: number;
    };
}
interface GrafanaTheme extends GrafanaThemeCommons {
    type: GrafanaThemeType;
    isDark: boolean;
    isLight: boolean;
    palette: {
        black: string;
        white: string;
        dark1: string;
        dark2: string;
        dark3: string;
        dark4: string;
        dark5: string;
        dark6: string;
        dark7: string;
        dark8: string;
        dark9: string;
        dark10: string;
        gray1: string;
        gray2: string;
        gray3: string;
        gray4: string;
        gray5: string;
        gray6: string;
        gray7: string;
        gray98: string;
        gray97: string;
        gray95: string;
        gray90: string;
        gray85: string;
        gray70: string;
        gray60: string;
        gray33: string;
        gray25: string;
        gray15: string;
        gray10: string;
        gray05: string;
        blue95: string;
        blue85: string;
        blue80: string;
        blue77: string;
        red88: string;
        redBase: string;
        redShade: string;
        greenBase: string;
        greenShade: string;
        red: string;
        yellow: string;
        purple: string;
        orange: string;
        orangeDark: string;
        queryRed: string;
        queryGreen: string;
        queryPurple: string;
        queryOrange: string;
        brandPrimary: string;
        brandSuccess: string;
        brandWarning: string;
        brandDanger: string;
        online: string;
        warn: string;
        critical: string;
    };
    colors: {
        bg1: string;
        bg2: string;
        bg3: string;
        border1: string;
        border2: string;
        border3: string;
        bgBlue1: string;
        bgBlue2: string;
        dashboardBg: string;
        bodyBg: string;
        panelBg: string;
        panelBorder: string;
        pageHeaderBg: string;
        pageHeaderBorder: string;
        dropdownBg: string;
        dropdownShadow: string;
        dropdownOptionHoverBg: string;
        link: string;
        linkDisabled: string;
        linkHover: string;
        linkExternal: string;
        textStrong: string;
        textHeading: string;
        text: string;
        textSemiWeak: string;
        textWeak: string;
        textFaint: string;
        textBlue: string;
        formLabel: string;
        formDescription: string;
        formInputBg: string;
        formInputBgDisabled: string;
        formInputBorder: string;
        formInputBorderHover: string;
        formInputBorderActive: string;
        formInputBorderInvalid: string;
        formFocusOutline: string;
        formInputText: string;
        formInputDisabledText: string;
        formInputPlaceholderText: string;
        formValidationMessageText: string;
        formValidationMessageBg: string;
    };
    shadows: {
        listItem: string;
    };
    visualization: ThemeVisualizationColors;
}

/** @beta */
interface ThemeBreakpointValues {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
}
/** @beta */
type ThemeBreakpointsKey = keyof ThemeBreakpointValues;
/** @beta */
interface ThemeBreakpoints {
    values: ThemeBreakpointValues;
    keys: string[];
    unit: string;
    up: (key: ThemeBreakpointsKey | number) => string;
    down: (key: ThemeBreakpointsKey | number) => string;
}

/** @beta */
interface ThemeShadows {
    z1: string;
    z2: string;
    z3: string;
}

/** @beta */
interface ThemeComponents {
    /** Applies to normal buttons, inputs, radio buttons, etc */
    height: {
        sm: number;
        md: number;
        lg: number;
    };
    input: {
        background: string;
        borderColor: string;
        borderHover: string;
        text: string;
    };
    tooltip: {
        text: string;
        background: string;
    };
    panel: {
        padding: number;
        headerHeight: number;
        borderColor: string;
        boxShadow: string;
        background: string;
    };
    dropdown: {
        background: string;
    };
    overlay: {
        background: string;
    };
    dashboard: {
        background: string;
        padding: number;
    };
    textHighlight: {
        background: string;
        text: string;
    };
    sidemenu: {
        width: number;
    };
    menuTabs: {
        height: number;
    };
    horizontalDrawer: {
        defaultHeight: number;
    };
    table: {
        rowHoverBackground: string;
    };
}

/** @beta */
interface ThemeShape {
    /**
     * @deprecated Use `theme.shape.radius.default`, `theme.shape.radius.pill` or `theme.shape.radius.circle` instead
     */
    borderRadius: (amount?: number) => string;
    radius: Radii;
}
interface Radii {
    default: string;
    pill: string;
    circle: string;
}
/** @internal */
interface ThemeShapeInput {
    borderRadius?: number;
}

/** @internal */
type ThemeSpacingOptions = {
    gridSize?: number;
};
/** @internal */
type ThemeSpacingArgument = number | string;
/**
 * @beta
 * The different signatures imply different meaning for their arguments that can't be expressed structurally.
 * We express the difference with variable names.
 * tslint:disable:unified-signatures */
interface ThemeSpacing extends SpacingTokens {
    (): string;
    (value: ThemeSpacingArgument): string;
    (topBottom: ThemeSpacingArgument, rightLeft: ThemeSpacingArgument): string;
    (top: ThemeSpacingArgument, rightLeft: ThemeSpacingArgument, bottom: ThemeSpacingArgument): string;
    (top: ThemeSpacingArgument, right: ThemeSpacingArgument, bottom: ThemeSpacingArgument, left: ThemeSpacingArgument): string;
    gridSize: number;
}
type ThemeSpacingTokens = 0 | 0.25 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 4 | 5 | 6 | 8 | 10;
type SpacingTokens = {
    [key in `x${Exclude<ThemeSpacingTokens, 0.25 | 0.5 | 1.5 | 2.5> | '0_25' | '0_5' | '1_5' | '2_5'}`]: string;
};

declare const easing: {
    easeInOut: string;
    easeOut: string;
    easeIn: string;
    sharp: string;
};
declare const duration: {
    shortest: number;
    shorter: number;
    short: number;
    standard: number;
    complex: number;
    enteringScreen: number;
    leavingScreen: number;
};
/** @alpha */
interface CreateTransitionOptions {
    duration?: number | string;
    easing?: string;
    delay?: number | string;
}
/** @alpha */
declare function create(props?: string | string[], options?: CreateTransitionOptions): string;
type ReducedMotionProps = 'no-preference' | 'reduce';
declare function handleMotion(...props: ReducedMotionProps[]): string;
declare function getAutoHeightDuration(height: number): number;
/** @alpha */
interface ThemeTransitions {
    create: typeof create;
    duration: typeof duration;
    easing: typeof easing;
    getAutoHeightDuration: typeof getAutoHeightDuration;
    handleMotion: typeof handleMotion;
}

/** @beta */
interface ThemeTypography extends ThemeTypographyVariantTypes {
    fontFamily: string;
    fontFamilyMonospace: string;
    fontSize: number;
    fontWeightLight: number;
    fontWeightRegular: number;
    fontWeightMedium: number;
    fontWeightBold: number;
    htmlFontSize?: number;
    /**
     * @deprecated
     * from legacy old theme
     * */
    size: {
        base: string;
        xs: string;
        sm: string;
        md: string;
        lg: string;
    };
    pxToRem: (px: number) => string;
}
interface ThemeTypographyVariant {
    fontSize: string;
    fontWeight: number;
    lineHeight: number;
    fontFamily: string;
    letterSpacing?: string;
}
interface ThemeTypographyInput {
    fontFamily?: string;
    fontFamilyMonospace?: string;
    fontSize?: number;
    fontWeightLight?: number;
    fontWeightRegular?: number;
    fontWeightMedium?: number;
    fontWeightBold?: number;
    htmlFontSize?: number;
}
interface ThemeTypographyVariantTypes {
    h1: ThemeTypographyVariant;
    h2: ThemeTypographyVariant;
    h3: ThemeTypographyVariant;
    h4: ThemeTypographyVariant;
    h5: ThemeTypographyVariant;
    h6: ThemeTypographyVariant;
    body: ThemeTypographyVariant;
    bodySmall: ThemeTypographyVariant;
    code: ThemeTypographyVariant;
}

/**
 * @alpha
 */
interface ThemeVisualizationColors {
    /** Only for internal use by color schemes */
    palette: string[];
    /** Lookup the real color given the name */
    getColorByName: (color: string) => string;
    /** Colors organized by hue */
    hues: ThemeVizHue[];
}
/**
 * @alpha
 */
interface ThemeVizColor {
    color: string;
    name: string;
    aliases?: string[];
    primary?: boolean;
}
/**
 * @alpha
 */
interface ThemeVizHue {
    name: string;
    shades: ThemeVizColor[];
}

declare const zIndex: {
    activePanel: number;
    navbarFixed: number;
    sidemenu: number;
    dropdown: number;
    typeahead: number;
    tooltip: number;
    modalBackdrop: number;
    modal: number;
    portal: number;
};
/** @beta */
type ThemeZIndices = typeof zIndex;

/**
 * @beta
 * Next gen theme model introduced in Grafana v8.
 */
interface GrafanaTheme2 {
    name: string;
    isDark: boolean;
    isLight: boolean;
    colors: ThemeColors;
    breakpoints: ThemeBreakpoints;
    spacing: ThemeSpacing;
    shape: ThemeShape;
    components: ThemeComponents;
    typography: ThemeTypography;
    zIndex: ThemeZIndices;
    shadows: ThemeShadows;
    visualization: ThemeVisualizationColors;
    transitions: ThemeTransitions;
    /** @deprecated Will be removed in a future version */
    v1: GrafanaTheme;
    /** feature flags that might impact component looks */
    flags: {};
}
/** @alpha */
interface ThemeRichColor {
    /** color intent (primary, secondary, info, error, etc) */
    name: string;
    /** Main color */
    main: string;
    /** Used for hover */
    shade: string;
    /** Used for text */
    text: string;
    /** Used for borders */
    border: string;
    /** Used subtly colored backgrounds */
    transparent: string;
    /** Used for weak colored borders like larger alert/banner boxes and smaller badges and tags */
    borderTransparent: string;
    /** Text color for text ontop of main */
    contrastText: string;
}
/** @internal */
type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};

/** @internal */
type ThemeColorsMode = 'light' | 'dark';
/** @internal */
interface ThemeColorsBase<TColor> {
    mode: ThemeColorsMode;
    primary: TColor;
    secondary: TColor;
    info: TColor;
    error: TColor;
    success: TColor;
    warning: TColor;
    text: {
        primary: string;
        secondary: string;
        disabled: string;
        link: string;
        /** Used for auto white or dark text on colored backgrounds */
        maxContrast: string;
    };
    background: {
        /** Dashboard and body background */
        canvas: string;
        /** Primary content pane background (panels etc) */
        primary: string;
        /** Cards and elements that need to stand out on the primary background */
        secondary: string;
    };
    border: {
        weak: string;
        medium: string;
        strong: string;
    };
    gradients: {
        brandVertical: string;
        brandHorizontal: string;
    };
    action: {
        /** Used for selected menu item / select option */
        selected: string;
        /**
         * @alpha (Do not use from plugins)
         * Used for selected items when background only change is not enough (Currently only used for FilterPill)
         **/
        selectedBorder: string;
        /** Used for hovered menu item / select option */
        hover: string;
        /** Used for button/colored background hover opacity */
        hoverOpacity: number;
        /** Used focused menu item / select option */
        focus: string;
        /** Used for disabled buttons and inputs */
        disabledBackground: string;
        /** Disabled text */
        disabledText: string;
        /** Disablerd opacity */
        disabledOpacity: number;
    };
    hoverFactor: number;
    contrastThreshold: number;
    tonalOffset: number;
}
/** @beta */
interface ThemeColors extends ThemeColorsBase<ThemeRichColor> {
    /** Returns a text color for the background */
    getContrastText(background: string, threshold?: number): string;
    emphasize(color: string, amount?: number): string;
}
/** @internal */
type ThemeColorsInput = DeepPartial<ThemeColorsBase<ThemeRichColor>>;

/** @internal */
interface NewThemeOptions {
    name?: string;
    colors?: ThemeColorsInput;
    spacing?: ThemeSpacingOptions;
    shape?: ThemeShapeInput;
    typography?: ThemeTypographyInput;
}
/** @internal */
declare function createTheme(options?: NewThemeOptions): GrafanaTheme2;

interface ThemeRegistryItem extends RegistryItem {
    isExtra?: boolean;
    build: () => GrafanaTheme2;
}
/**
 * @internal
 * Only for internal use, never use this from a plugin
 **/
declare function getThemeById(id: string): GrafanaTheme2;
/**
 * @internal
 * For internal use only
 */
declare function getBuiltInThemes(includeExtras?: boolean): ThemeRegistryItem[];

/**
 * Converts a color from CSS hex format to CSS rgb format.
 * @param color - Hex color, i.e. #nnn or #nnnnnn
 * @returns A CSS rgb color string
 * @beta
 */
declare function hexToRgb(color: string): string;
/**
 * Converts a color from CSS rgb format to CSS hex format.
 * @param color - RGB color, i.e. rgb(n, n, n)
 * @returns A CSS rgb color string, i.e. #nnnnnn
 * @beta
 */
declare function rgbToHex(color: string): string;
/**
 * Converts a color to hex6 format if there is no alpha, hex8 if there is.
 * @param color - Hex, RGB, HSL color
 * @returns A hex color string, i.e. #ff0000 or #ff0000ff
 */
declare function asHexString(color: string): string;
/**
 * Converts a color to rgb string
 */
declare function asRgbString(color: string): string;
/**
 * Converts a color from hsl format to rgb format.
 * @param color - HSL color values
 * @returns rgb color values
 * @beta
 */
declare function hslToRgb(color: string | DecomposeColor): string;
/**
 * Returns an object with the type and values of a color.
 *
 * Note: Does not support rgb % values.
 * @param color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @returns {object} - A MUI color object: {type: string, values: number[]}
 * @beta
 */
declare function decomposeColor(color: string | DecomposeColor): DecomposeColor;
/**
 * Converts a color object with type and values to a string.
 * @param {object} color - Decomposed color
 * @param color.type - One of: 'rgb', 'rgba', 'hsl', 'hsla'
 * @param {array} color.values - [n,n,n] or [n,n,n,n]
 * @returns A CSS color string
 * @beta
 */
declare function recomposeColor(color: DecomposeColor): string;
/**
 * Calculates the contrast ratio between two colors.
 *
 * Formula: https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
 * @param foreground - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @param background - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @param canvas - A CSS color that alpha based backgrounds blends into
 * @returns A contrast ratio value in the range 0 - 21.
 * @beta
 */
declare function getContrastRatio(foreground: string, background: string, canvas?: string): number;
/**
 * The relative brightness of any point in a color space,
 * normalized to 0 for darkest black and 1 for lightest white.
 *
 * Formula: https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
 * @param color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @param background - CSS color that needs to be take in to account to calculate luminance for colors with opacity
 * @returns The relative brightness of the color in the range 0 - 1
 * @beta
 */
declare function getLuminance(color: string, background?: string): number;
/**
 * Darken or lighten a color, depending on its luminance.
 * Light colors are darkened, dark colors are lightened.
 * @param color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @param coefficient=0.15 - multiplier in the range 0 - 1
 * @returns A CSS color string. Hex input values are returned as rgb
 * @beta
 */
declare function emphasize(color: string, coefficient?: number): string;
/**
 * Set the absolute transparency of a color.
 * Any existing alpha values are overwritten.
 * @param color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @param value - value to set the alpha channel to in the range 0 - 1
 * @returns A CSS color string. Hex input values are returned as rgb
 * @beta
 */
declare function alpha(color: string, value: number): string;
/**
 * Darkens a color.
 * @param color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @param coefficient - multiplier in the range 0 - 1
 * @returns A CSS color string. Hex input values are returned as rgb
 * @beta
 */
declare function darken(color: string, coefficient: number): string;
/**
 * Lightens a color.
 * @param color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @param coefficient - multiplier in the range 0 - 1
 * @returns A CSS color string. Hex input values are returned as rgb
 * @beta
 */
declare function lighten(color: string, coefficient: number): string;
interface DecomposeColor {
    type: string;
    values: any;
    colorSpace?: string;
}

declare const colorManipulator_d_hexToRgb: typeof hexToRgb;
declare const colorManipulator_d_rgbToHex: typeof rgbToHex;
declare const colorManipulator_d_asHexString: typeof asHexString;
declare const colorManipulator_d_asRgbString: typeof asRgbString;
declare const colorManipulator_d_hslToRgb: typeof hslToRgb;
declare const colorManipulator_d_decomposeColor: typeof decomposeColor;
declare const colorManipulator_d_recomposeColor: typeof recomposeColor;
declare const colorManipulator_d_getContrastRatio: typeof getContrastRatio;
declare const colorManipulator_d_getLuminance: typeof getLuminance;
declare const colorManipulator_d_emphasize: typeof emphasize;
declare const colorManipulator_d_alpha: typeof alpha;
declare const colorManipulator_d_darken: typeof darken;
declare const colorManipulator_d_lighten: typeof lighten;
declare namespace colorManipulator_d {
  export {
    colorManipulator_d_hexToRgb as hexToRgb,
    colorManipulator_d_rgbToHex as rgbToHex,
    colorManipulator_d_asHexString as asHexString,
    colorManipulator_d_asRgbString as asRgbString,
    colorManipulator_d_hslToRgb as hslToRgb,
    colorManipulator_d_decomposeColor as decomposeColor,
    colorManipulator_d_recomposeColor as recomposeColor,
    colorManipulator_d_getContrastRatio as getContrastRatio,
    colorManipulator_d_getLuminance as getLuminance,
    colorManipulator_d_emphasize as emphasize,
    colorManipulator_d_alpha as alpha,
    colorManipulator_d_darken as darken,
    colorManipulator_d_lighten as lighten,
  };
}

/** @public */
declare const ThemeContext: React$1.Context<GrafanaTheme2>;

/**
 * Options for how to turn DataFrames into an array of display values
 */
interface ReduceDataOptions {
    values?: boolean;
    /** if showing all values limit */
    limit?: number;
    /** When !values, pick one value for the whole field */
    calcs: string[];
    /** Which fields to show.  By default this is only numeric fields */
    fields?: string;
}
declare const VAR_SERIES_NAME = "__series.name";
declare const VAR_FIELD_NAME = "__field.displayName";
declare const VAR_FIELD_LABELS = "__field.labels";
declare const VAR_CALC = "__calc";
declare const VAR_CELL_PREFIX = "__cell_";
interface FieldSparkline {
    y: Field;
    x?: Field;
    timeRange?: TimeRange;
    highlightIndex?: number;
}
interface FieldDisplay {
    name: string;
    field: FieldConfig;
    display: DisplayValue;
    sparkline?: FieldSparkline;
    view?: DataFrameView;
    colIndex?: number;
    rowIndex?: number;
    getLinks?: () => LinkModel[];
    hasLinks: boolean;
}
interface GetFieldDisplayValuesOptions {
    data?: DataFrame[];
    reduceOptions: ReduceDataOptions;
    fieldConfig: FieldConfigSource;
    replaceVariables: InterpolateFunction;
    sparkline?: boolean;
    percentChange?: boolean;
    theme: GrafanaTheme2;
    timeZone?: TimeZone;
}
declare const DEFAULT_FIELD_DISPLAY_VALUES_LIMIT = 25;
declare const getFieldDisplayValues: (options: GetFieldDisplayValuesOptions) => FieldDisplay[];
declare function hasLinks(field: Field): boolean;
declare function getDisplayValueAlignmentFactors(values: FieldDisplay[]): DisplayValueAlignmentFactors;
declare function fixCellTemplateExpressions(str: string): string;

interface DisplayProcessorOptions {
    field: Partial<Field>;
    /**
     * Will pick browser timezone if not defined
     */
    timeZone?: TimeZone;
    /**
     * Will pick 'dark' if not defined
     */
    theme: GrafanaTheme2;
}
declare function getDisplayProcessor(options?: DisplayProcessorOptions): DisplayProcessor;
declare function getRawDisplayProcessor(): DisplayProcessor;

/**
 * Base class for editor builders
 *
 * @beta
 */
interface OptionEditorConfig<TOptions, TSettings = any, TValue = any> {
    /**
     * Path of the option property to control.
     *
     * @example
     * Given options object of a type:
     * ```ts
     * interface Options {
     *   a: {
     *     b: string;
     *   }
     * }
     * ```
     *
     * path can be either 'a' or 'a.b'.
     */
    path: (keyof TOptions & string) | string;
    /**
     * Name of the option. Will be displayed in the UI as form element label.
     */
    name: string;
    /**
     * Description of the option. Will be displayed in the UI as form element description.
     */
    description?: string;
    /**
     * Custom settings of the editor.
     */
    settings?: TSettings;
    /**
     * Array of strings representing category of the option. First element in the array will make option render as collapsible section.
     */
    category?: string[];
    /**
     * Set this value if undefined
     */
    defaultValue?: TValue;
    /**
     * Function that enables configuration of when option editor should be shown based on current panel option properties.
     */
    showIf?: (currentOptions: TOptions, data?: DataFrame[]) => boolean | undefined;
}

/**
 * Option editor registry item
 */
interface OptionsEditorItem<TOptions, TSettings, TEditorProps, TValue> extends RegistryItem, OptionEditorConfig<TOptions, TSettings, TValue> {
    /**
     * React component used to edit the options property
     */
    editor: ComponentType<TEditorProps>;
    getItemsCount?: (value?: TValue) => number;
}
/**
 * Describes an API for option editors UI builder
 */
interface OptionsUIRegistryBuilderAPI<TOptions, TEditorProps, T extends OptionsEditorItem<TOptions, any, TEditorProps, any>> {
    addNumberInput?<TSettings extends NumberFieldConfigSettings = NumberFieldConfigSettings>(config: OptionEditorConfig<TOptions, TSettings, number>): this;
    addSliderInput?<TSettings extends SliderFieldConfigSettings = SliderFieldConfigSettings>(config: OptionEditorConfig<TOptions, TSettings, number>): this;
    addTextInput?<TSettings extends StringFieldConfigSettings = StringFieldConfigSettings>(config: OptionEditorConfig<TOptions, TSettings, string>): this;
    addStringArray?<TSettings extends StringFieldConfigSettings = StringFieldConfigSettings>(config: OptionEditorConfig<TOptions, TSettings, string[]>): this;
    addSelect?<TOption, TSettings extends SelectFieldConfigSettings<TOption>>(config: OptionEditorConfig<TOptions, TSettings, TOption>): this;
    addRadio?<TOption, TSettings extends SelectFieldConfigSettings<TOption> = SelectFieldConfigSettings<TOption>>(config: OptionEditorConfig<TOptions, TSettings, TOption>): this;
    addBooleanSwitch?<TSettings = any>(config: OptionEditorConfig<TOptions, TSettings, boolean>): this;
    addUnitPicker?<TSettings = any>(config: OptionEditorConfig<TOptions, TSettings, string>): this;
    addColorPicker?<TSettings = any>(config: OptionEditorConfig<TOptions, TSettings, string>): this;
    /**
     * Enables custom editor definition
     * @param config
     */
    addCustomEditor<TSettings, TValue>(config: OptionsEditorItem<TOptions, TSettings, TEditorProps, TValue>): this;
    /**
     * Returns registry of option editors
     */
    getRegistry: () => Registry<T>;
}
declare abstract class OptionsUIRegistryBuilder<TOptions, TEditorProps, T extends OptionsEditorItem<TOptions, any, TEditorProps, any>> implements OptionsUIRegistryBuilderAPI<TOptions, TEditorProps, T> {
    private properties;
    addCustomEditor<TSettings, TValue>(config: T & OptionsEditorItem<TOptions, TSettings, TEditorProps, TValue>): this;
    getRegistry(): Registry<T>;
    getItems(): T[];
}

interface DynamicConfigValue {
    id: string;
    value?: any;
}
interface ConfigOverrideRule {
    matcher: MatcherConfig;
    properties: DynamicConfigValue[];
}
/**
 * Describes config override rules created when interacting with Grafana.
 *
 * @internal
 */
interface SystemConfigOverrideRule extends ConfigOverrideRule {
    __systemRef: string;
}
/**
 * Guard functionality to check if an override rule is of type {@link SystemConfigOverrideRule}.
 * It will only return true if the {@link SystemConfigOverrideRule} has the passed systemRef.
 *
 * @param ref system override reference
 * @internal
 */
declare function isSystemOverrideWithRef<T extends SystemConfigOverrideRule>(ref: string): (override: ConfigOverrideRule) => override is T;
/**
 * Guard functionality to check if an override rule is of type {@link SystemConfigOverrideRule}.
 * It will return true if the {@link SystemConfigOverrideRule} has any systemRef set.
 *
 * @internal
 */
declare const isSystemOverride: (override: ConfigOverrideRule) => override is SystemConfigOverrideRule;
interface FieldConfigSource<TOptions = any> {
    defaults: FieldConfig<TOptions>;
    overrides: ConfigOverrideRule[];
}
interface FieldOverrideContext extends StandardEditorContext<any> {
    field?: Field;
    dataFrameIndex?: number;
}
/** @deprecated Use StandardEditorProps instead */
type FieldConfigEditorProps<TValue, TSettings extends {}> = StandardEditorProps<TValue, TSettings>;
/** @deprecated Use StandardEditorProps instead */
type FieldOverrideEditorProps<TValue, TSettings extends {}> = StandardEditorProps<TValue, TSettings>;
interface FieldConfigEditorConfig<TOptions, TSettings = any, TValue = any> extends OptionEditorConfig<TOptions, TSettings, TValue> {
    /**
     * Function that allows specifying whether or not this field config should apply to a given field.
     * @param field
     */
    shouldApply?: (field: Field) => boolean;
    /** Indicates that option shoukd not be available in the Field config tab */
    hideFromDefaults?: boolean;
    /** Indicates that option should not be available for the overrides */
    hideFromOverrides?: boolean;
}
interface FieldConfigPropertyItem<TOptions = any, TValue = any, TSettings extends {} = any> extends OptionsEditorItem<TOptions, TSettings, StandardEditorProps<TValue, TSettings>, TValue> {
    override: ComponentType<StandardEditorProps<TValue, TSettings>>;
    /** true for plugin field config properties */
    isCustom?: boolean;
    /** Hides option from the Field config tab */
    hideFromDefaults?: boolean;
    /** Indicates that option should not be available for the overrides */
    hideFromOverrides?: boolean;
    /** Convert the override value to a well typed value */
    process: (value: any, context: FieldOverrideContext, settings?: TSettings) => TValue | undefined | null;
    /** Checks if field should be processed */
    shouldApply: (field: Field) => boolean;
}
type DataLinkPostProcessorOptions = {
    frame: DataFrame;
    field: Field;
    dataLinkScopedVars: ScopedVars;
    replaceVariables: InterpolateFunction;
    timeZone?: TimeZone;
    config: ValueLinkConfig;
    link: DataLink;
    linkModel: LinkModel;
};
type DataLinkPostProcessor = (options: DataLinkPostProcessorOptions) => LinkModel<Field> | undefined;
interface ApplyFieldOverrideOptions {
    data?: DataFrame[];
    fieldConfig: FieldConfigSource;
    fieldConfigRegistry?: FieldConfigOptionsRegistry;
    replaceVariables: InterpolateFunction;
    theme: GrafanaTheme2;
    timeZone?: TimeZone;
    dataLinkPostProcessor?: DataLinkPostProcessor;
}
declare enum FieldConfigProperty {
    Unit = "unit",
    Min = "min",
    Max = "max",
    Decimals = "decimals",
    DisplayName = "displayName",
    NoValue = "noValue",
    Thresholds = "thresholds",
    Mappings = "mappings",
    Links = "links",
    Color = "color",
    Filterable = "filterable"
}

declare class FieldConfigOptionsRegistry extends Registry<FieldConfigPropertyItem> {
}

interface StandardEditorContext<TOptions, TState = any> {
    data: DataFrame[];
    replaceVariables?: InterpolateFunction;
    eventBus?: EventBus;
    getSuggestions?: (scope?: VariableSuggestionsScope) => VariableSuggestion[];
    options?: TOptions;
    instanceState?: TState;
    isOverride?: boolean;
}
interface StandardEditorProps<TValue = any, TSettings = any, TOptions = any, TState = any> {
    value: TValue;
    onChange: (value?: TValue) => void;
    context: StandardEditorContext<TOptions, TState>;
    id?: string;
    item: RegistryItem & {
        settings?: TSettings;
    };
}
interface StandardEditorsRegistryItem<TValue = any, TSettings = any> extends RegistryItem {
    editor: ComponentType<StandardEditorProps<TValue, TSettings>>;
    settings?: TSettings;
}
declare const standardFieldConfigEditorRegistry: FieldConfigOptionsRegistry;
declare const standardEditorsRegistry: Registry<StandardEditorsRegistryItem<any, any>>;

declare const identityOverrideProcessor: <T>(value: T) => T;
interface NumberFieldConfigSettings {
    placeholder?: string;
    integer?: boolean;
    min?: number;
    max?: number;
    step?: number;
}
declare const numberOverrideProcessor: (value: any, context: FieldOverrideContext, settings?: NumberFieldConfigSettings) => number | undefined;
declare const displayNameOverrideProcessor: (value: unknown, context: FieldOverrideContext, settings?: StringFieldConfigSettings) => string | null | undefined;
interface SliderFieldConfigSettings {
    min: number;
    max: number;
    step?: number;
    included?: boolean;
    marks?: SliderMarks;
    ariaLabelForHandle?: string;
}
interface DataLinksFieldConfigSettings {
}
declare const dataLinksOverrideProcessor: (value: any, _context: FieldOverrideContext, _settings?: DataLinksFieldConfigSettings) => DataLink[];
interface ValueMappingFieldConfigSettings {
}
declare const valueMappingsOverrideProcessor: (value: any, _context: FieldOverrideContext, _settings?: ValueMappingFieldConfigSettings) => ValueMapping[];
interface SelectFieldConfigSettings<T> {
    allowCustomValue?: boolean;
    isClearable?: boolean;
    /** The default options */
    options: Array<SelectableValue<T>>;
    /** Optionally use the context to define the options */
    getOptions?: (context: FieldOverrideContext) => Promise<Array<SelectableValue<T>>>;
}
declare const selectOverrideProcessor: (value: any, _context: FieldOverrideContext, _settings?: SelectFieldConfigSettings<any>) => any;
interface StringFieldConfigSettings {
    placeholder?: string;
    maxLength?: number;
    expandTemplateVars?: boolean;
    useTextarea?: boolean;
    rows?: number;
}
declare const stringOverrideProcessor: (value: unknown, context: FieldOverrideContext, settings?: StringFieldConfigSettings) => string | null | undefined;
interface ThresholdsFieldConfigSettings {
}
declare const thresholdsOverrideProcessor: (value: any, _context: FieldOverrideContext, _settings?: ThresholdsFieldConfigSettings) => ThresholdsConfig;
interface UnitFieldConfigSettings {
    isClearable?: boolean;
}
declare const unitOverrideProcessor: (value: boolean, _context: FieldOverrideContext, _settings?: UnitFieldConfigSettings) => boolean;
declare const booleanOverrideProcessor: (value: boolean, _context: FieldOverrideContext, _settings?: ThresholdsFieldConfigSettings) => boolean;
interface FieldColorConfigSettings {
    /**
     * When switching to a visualization that does not support by value coloring then Grafana will
     * switch to a by series palette based color mode
     */
    byValueSupport?: boolean;
    /**
     * When switching to a visualization that has this set to true then Grafana will change color mode
     * to from thresholds if it was set to a by series palette
     */
    preferThresholdsMode?: boolean;
    /**
     * Set to true if the visualization supports both by value and by series
     * This will enable the Color by series UI option that sets the `color.seriesBy` option.
     */
    bySeriesSupport?: boolean;
}
interface StatsPickerConfigSettings {
    /**
     * Enable multi-selection in the stats picker
     */
    allowMultiple: boolean;
    /**
     * Default stats to be use in the stats picker
     */
    defaultStat?: string;
}
declare enum FieldNamePickerBaseNameMode {
    IncludeAll = "all",
    ExcludeBaseNames = "exclude",
    OnlyBaseNames = "only"
}
interface FieldNamePickerConfigSettings {
    /**
     * Function is a predicate, to test each element of the array.
     * Return a value that coerces to true to keep the field, or to false otherwise.
     */
    filter?: (field: Field) => boolean;
    /**
     * Show this text when no values are found
     */
    noFieldsMessage?: string;
    /**
     * Sets the width to a pixel value.
     */
    width?: number;
    /**
     * Exclude names that can match a collection of values
     */
    baseNameMode?: FieldNamePickerBaseNameMode;
    /**
     * Placeholder text to display when nothing is selected.
     */
    placeholderText?: string;
    /** When set to false, the value can not be removed */
    isClearable?: boolean;
}

interface ColorScaleValue {
    percent: number;
    threshold: Threshold | undefined;
    color: string;
}
type ScaleCalculator = (value: number) => ColorScaleValue;
declare function getScaleCalculator(field: Field, theme: GrafanaTheme2): ScaleCalculator;
declare function getMinMaxAndDelta(field: Field): NumericRange;
/**
 * @internal
 */
declare function getFieldConfigWithMinMax(field: Field, local?: boolean): FieldConfig;

/** @beta */
type FieldValueColorCalculator = (value: number, percent: number, Threshold?: Threshold) => string;
/** @beta */
interface FieldColorMode extends RegistryItem {
    getCalculator: (field: Field, theme: GrafanaTheme2) => FieldValueColorCalculator;
    getColors?: (theme: GrafanaTheme2) => string[];
    isContinuous?: boolean;
    isByValue?: boolean;
    useSeriesName?: boolean;
}
/** @internal */
declare const fieldColorModeRegistry: Registry<FieldColorMode>;
/** @beta */
declare function getFieldColorModeForField(field: Field): FieldColorMode;
/** @beta */
declare function getFieldColorMode(mode?: FieldColorModeId | string): FieldColorMode;
/**
 * @alpha
 * Function that will return a series color for any given color mode. If the color mode is a by value color
 * mode it will use the field.config.color.seriesBy property to figure out which value to use
 */
declare function getFieldSeriesColor(field: Field, theme: GrafanaTheme2): ColorScaleValue;

declare function getActiveThreshold(value: number, thresholds: Threshold[] | undefined): Threshold;
/**
 * Sorts the thresholds
 */
declare function sortThresholds(thresholds: Threshold[]): Threshold[];

/**
 * Fluent API for declarative creation of field config option editors
 */
declare class FieldConfigEditorBuilder<TOptions> extends OptionsUIRegistryBuilder<TOptions, StandardEditorProps<any, any>, FieldConfigPropertyItem<TOptions>> {
    addNumberInput<TSettings>(config: FieldConfigEditorConfig<TOptions, TSettings & NumberFieldConfigSettings, number>): this;
    addSliderInput<TSettings>(config: FieldConfigEditorConfig<TOptions, TSettings & SliderFieldConfigSettings, number>): this;
    addTextInput<TSettings>(config: FieldConfigEditorConfig<TOptions, TSettings & StringFieldConfigSettings, string>): this;
    addSelect<TOption, TSettings extends SelectFieldConfigSettings<TOption>>(config: FieldConfigEditorConfig<TOptions, TSettings, TOption>): this;
    addRadio<TOption, TSettings = any>(config: FieldConfigEditorConfig<TOptions, TSettings, TOption>): this;
    addBooleanSwitch<TSettings = any>(config: FieldConfigEditorConfig<TOptions, TSettings, boolean>): this;
    addColorPicker<TSettings = any>(config: FieldConfigEditorConfig<TOptions, TSettings, string>): this;
    addUnitPicker<TSettings = any>(config: FieldConfigEditorConfig<TOptions, TSettings & UnitFieldConfigSettings, string>): this;
    addFieldNamePicker<TSettings = any>(config: FieldConfigEditorConfig<TOptions, TSettings & FieldNamePickerConfigSettings, string>): this;
    addGenericEditor<TSettings = any>(config: FieldConfigEditorConfig<TOptions, TSettings & any>, // & any... i give up!
    editor: (props: StandardEditorProps<TSettings>) => JSX.Element): this;
}
interface NestedValueAccess {
    getValue: (path: string) => any;
    onChange: (path: string, value: any) => void;
    getContext?: (parent: StandardEditorContext<any, any>) => StandardEditorContext<any, any>;
}
interface NestedPanelOptions<TSub = any> {
    path: string;
    category?: string[];
    defaultValue?: TSub;
    build: PanelOptionsSupplier<TSub>;
    values?: (parent: NestedValueAccess) => NestedValueAccess;
}
/**
 * Fluent API for declarative creation of panel options
 */
declare class PanelOptionsEditorBuilder<TOptions> extends OptionsUIRegistryBuilder<TOptions, StandardEditorProps, PanelOptionsEditorItem<TOptions>> {
    addNestedOptions<Sub>(opts: NestedPanelOptions<Sub>): this;
    addNumberInput<TSettings>(config: PanelOptionsEditorConfig<TOptions, TSettings & NumberFieldConfigSettings, number>): this;
    addSliderInput<TSettings>(config: PanelOptionsEditorConfig<TOptions, TSettings & SliderFieldConfigSettings, number>): this;
    addTextInput<TSettings>(config: PanelOptionsEditorConfig<TOptions, TSettings & StringFieldConfigSettings, string>): this;
    addStringArray<TSettings>(config: PanelOptionsEditorConfig<TOptions, TSettings & StringFieldConfigSettings, string[]>): this;
    addSelect<TOption, TSettings extends SelectFieldConfigSettings<TOption>>(config: PanelOptionsEditorConfig<TOptions, TSettings, TOption>): this;
    addMultiSelect<TOption, TSettings extends SelectFieldConfigSettings<TOption>>(config: PanelOptionsEditorConfig<TOptions, TSettings, TOption>): this;
    addRadio<TOption, TSettings extends SelectFieldConfigSettings<TOption>>(config: PanelOptionsEditorConfig<TOptions, TSettings, TOption>): this;
    addBooleanSwitch<TSettings = any>(config: PanelOptionsEditorConfig<TOptions, TSettings, boolean>): this;
    addColorPicker<TSettings = any>(config: PanelOptionsEditorConfig<TOptions, TSettings, string>): this;
    addTimeZonePicker<TSettings = any>(config: PanelOptionsEditorConfig<TOptions, TSettings, string>): this;
    addUnitPicker<TSettings = any>(config: PanelOptionsEditorConfig<TOptions, TSettings & UnitFieldConfigSettings, string>): this;
    addFieldNamePicker<TSettings = any>(config: PanelOptionsEditorConfig<TOptions, TSettings & FieldNamePickerConfigSettings, string>): this;
    addDashboardPicker<TSettings = any>(config: PanelOptionsEditorConfig<TOptions, TSettings & FieldNamePickerConfigSettings, string>): this;
}

/** @beta */
type StandardOptionConfig = {
    defaultValue?: any;
    settings?: any;
    hideFromDefaults?: boolean;
};
/** @beta */
interface SetFieldConfigOptionsArgs<TFieldConfigOptions = any> {
    /**
     * Configuration object of the standard field config properites
     *
     * @example
     * ```typescript
     * {
     *   standardOptions: {
     *     [FieldConfigProperty.Decimals]: {
     *       defaultValue: 3
     *     }
     *   }
     * }
     * ```
     */
    standardOptions?: Partial<Record<FieldConfigProperty, StandardOptionConfig>>;
    /**
     * Array of standard field config properties that should not be available in the panel
     * @example
     * ```typescript
     * {
     *   disableStandardOptions: [FieldConfigProperty.Min, FieldConfigProperty.Max, FieldConfigProperty.Unit]
     * }
     * ```
     */
    disableStandardOptions?: FieldConfigProperty[];
    /**
     * Function that allows custom field config properties definition.
     *
     * @param builder
     *
     * @example
     * ```typescript
     * useCustomConfig: builder => {
     *   builder
     *    .addNumberInput({
     *      id: 'shapeBorderWidth',
     *      name: 'Border width',
     *      description: 'Border width of the shape',
     *      settings: {
     *        min: 1,
     *        max: 5,
     *      },
     *    })
     *    .addSelect({
     *      id: 'displayMode',
     *      name: 'Display mode',
     *      description: 'How the shape shout be rendered'
     *      settings: {
     *      options: [{value: 'fill', label: 'Fill' }, {value: 'transparent', label: 'Transparent }]
     *    },
     *  })
     * }
     * ```
     */
    useCustomConfig?: (builder: FieldConfigEditorBuilder<TFieldConfigOptions>) => void;
}
type PanelOptionsSupplier<TOptions> = (builder: PanelOptionsEditorBuilder<TOptions>, context: StandardEditorContext<TOptions>) => void;
declare class PanelPlugin<TOptions = any, TFieldConfigOptions extends object = any> extends GrafanaPlugin<PanelPluginMeta> {
    private _defaults?;
    private _fieldConfigDefaults;
    private _fieldConfigRegistry?;
    private _initConfigRegistry;
    private optionsSupplier?;
    private suggestionsSupplier?;
    panel: ComponentType<PanelProps<TOptions>> | null;
    editor?: ComponentClass<PanelEditorProps<TOptions>>;
    onPanelMigration?: PanelMigrationHandler<TOptions>;
    onPanelTypeChanged?: PanelTypeChangedHandler<TOptions>;
    noPadding?: boolean;
    dataSupport: PanelPluginDataSupport;
    /**
     * Legacy angular ctrl. If this exists it will be used instead of the panel
     */
    angularPanelCtrl?: any;
    constructor(panel: ComponentType<PanelProps<TOptions>> | null);
    get defaults(): {};
    get fieldConfigDefaults(): FieldConfigSource<TFieldConfigOptions>;
    /**
     * @deprecated setDefaults is deprecated in favor of setPanelOptions
     */
    setDefaults(defaults: TOptions): this;
    get fieldConfigRegistry(): FieldConfigOptionsRegistry;
    /**
     * @deprecated setEditor is deprecated in favor of setPanelOptions
     */
    setEditor(editor: ComponentClass<PanelEditorProps<TOptions>>): this;
    setNoPadding(): this;
    /**
     * This function is called before the panel first loads if
     * the current version is different than the version that was saved.
     *
     * This is a good place to support any changes to the options model
     */
    setMigrationHandler(handler: PanelMigrationHandler<TOptions>): this;
    /**
     * This function is called when the visualization was changed. This
     * passes in the panel model for previous visualisation options inspection
     * and panel model updates.
     *
     * This is useful for supporting PanelModel API updates when changing
     * between Angular and React panels.
     */
    setPanelChangeHandler(handler: PanelTypeChangedHandler): this;
    /**
     * Enables panel options editor creation
     *
     * @example
     * ```typescript
     *
     * import { ShapePanel } from './ShapePanel';
     *
     * interface ShapePanelOptions {}
     *
     * export const plugin = new PanelPlugin<ShapePanelOptions>(ShapePanel)
     *   .setPanelOptions(builder => {
     *     builder
     *       .addSelect({
     *         id: 'shape',
     *         name: 'Shape',
     *         description: 'Select shape to render'
     *         settings: {
     *           options: [
     *             {value: 'circle', label: 'Circle' },
     *             {value: 'square', label: 'Square },
     *             {value: 'triangle', label: 'Triangle }
     *            ]
     *         },
     *       })
     *   })
     * ```
     *
     * @public
     **/
    setPanelOptions(builder: PanelOptionsSupplier<TOptions>): this;
    /**
     * This is used while building the panel options editor.
     *
     * @internal
     */
    getPanelOptionsSupplier(): PanelOptionsSupplier<TOptions>;
    /**
     * Tells Grafana if the plugin should subscribe to annotation and alertState results.
     *
     * @example
     * ```typescript
     *
     * import { ShapePanel } from './ShapePanel';
     *
     * interface ShapePanelOptions {}
     *
     * export const plugin = new PanelPlugin<ShapePanelOptions>(ShapePanel)
     *     .useFieldConfig({})
     *     ...
     *     ...
     *     .setDataSupport({
     *       annotations: true,
     *       alertStates: true,
     *     });
     * ```
     *
     * @public
     **/
    setDataSupport(support: Partial<PanelPluginDataSupport>): this;
    /**
     * Allows specifying which standard field config options panel should use and defining default values
     *
     * @example
     * ```typescript
     *
     * import { ShapePanel } from './ShapePanel';
     *
     * interface ShapePanelOptions {}
     *
     * // when plugin should use all standard options
     * export const plugin = new PanelPlugin<ShapePanelOptions>(ShapePanel)
     *  .useFieldConfig();
     *
     * // when plugin should only display specific standard options
     * // note, that options will be displayed in the order they are provided
     * export const plugin = new PanelPlugin<ShapePanelOptions>(ShapePanel)
     *  .useFieldConfig({
     *    standardOptions: [FieldConfigProperty.Min, FieldConfigProperty.Max]
     *   });
     *
     * // when standard option's default value needs to be provided
     * export const plugin = new PanelPlugin<ShapePanelOptions>(ShapePanel)
     *  .useFieldConfig({
     *    standardOptions: [FieldConfigProperty.Min, FieldConfigProperty.Max],
     *    standardOptionsDefaults: {
     *      [FieldConfigProperty.Min]: 20,
     *      [FieldConfigProperty.Max]: 100
     *    }
     *  });
     *
     * // when custom field config options needs to be provided
     * export const plugin = new PanelPlugin<ShapePanelOptions>(ShapePanel)
     *  .useFieldConfig({
     *    useCustomConfig: builder => {
     *      builder
     *       .addNumberInput({
     *         id: 'shapeBorderWidth',
     *         name: 'Border width',
     *         description: 'Border width of the shape',
     *         settings: {
     *           min: 1,
     *           max: 5,
     *         },
     *       })
     *       .addSelect({
     *         id: 'displayMode',
     *         name: 'Display mode',
     *         description: 'How the shape shout be rendered'
     *         settings: {
     *         options: [{value: 'fill', label: 'Fill' }, {value: 'transparent', label: 'Transparent }]
     *       },
     *     })
     *   },
     *  });
     *
     * ```
     *
     * @public
     */
    useFieldConfig(config?: SetFieldConfigOptionsArgs<TFieldConfigOptions>): this;
    /**
     * Sets function that can return visualization examples and suggestions.
     * @alpha
     */
    setSuggestionsSupplier(supplier: VisualizationSuggestionsSupplier): this;
    /**
     * Returns the suggestions supplier
     * @alpha
     */
    getSuggestionsSupplier(): VisualizationSuggestionsSupplier | undefined;
    hasPluginId(pluginId: string): boolean;
}

/**
 * Return a copy of the DataFrame with all rules applied
 */
declare function applyFieldOverrides(options: ApplyFieldOverrideOptions): DataFrame[];
/**
 * This checks that all options on FieldConfig make sense.  It mutates any value that needs
 * fixed.  In particular this makes sure that the first threshold value is -Infinity (not valid in JSON)
 */
declare function validateFieldConfig(config: FieldConfig): void;
declare const getLinksSupplier: (frame: DataFrame, field: Field, fieldScopedVars: ScopedVars, replaceVariables: InterpolateFunction, timeZone?: TimeZone, dataLinkPostProcessor?: DataLinkPostProcessor) => (config: ValueLinkConfig) => Array<LinkModel<Field>>;
/**
 * Return a copy of the DataFrame with raw data
 */
declare function applyRawFieldOverrides(data: DataFrame[]): DataFrame[];
/**
 * @internal
 */
declare function useFieldOverrides(plugin: PanelPlugin | undefined, fieldConfig: FieldConfigSource | undefined, data: PanelData | undefined, timeZone: string, theme: GrafanaTheme2, replace: InterpolateFunction, dataLinkPostProcessor?: DataLinkPostProcessor): PanelData | undefined;

/**
 * Creates a proxy object that allows accessing fields on dataFrame through various means and then returns it's
 * display value. This is mainly useful for example in data links interpolation where you can easily create a scoped
 * variable that will allow you to access dataFrame data with ${__data.fields.fieldName}.
 * Allows accessing fields by name, index, displayName or 'name' label
 *
 * @param options
 * @internal
 */
declare function getFieldDisplayValuesProxy(options: {
    frame: DataFrame;
    rowIndex: number;
    timeZone?: TimeZone;
}): Record<string, DisplayValue>;

/**
 * Get an appropriate display title
 */
declare function getFrameDisplayName(frame: DataFrame, index?: number): string;
declare function cacheFieldDisplayNames(frames: DataFrame[]): void;
declare function getFieldDisplayName(field: Field, frame?: DataFrame, allFrames?: DataFrame[]): string;
declare function getUniqueFieldName(field: Field, frame?: DataFrame): string;

/**
 * @internal
 */
declare enum AlertState {
    NoData = "no_data",
    Paused = "paused",
    Alerting = "alerting",
    OK = "ok",
    Pending = "pending",
    Unknown = "unknown"
}
/**
 * @internal
 */
interface AlertStateInfo {
    id: number;
    dashboardId: number;
    panelId: number;
    state: AlertState;
}

/**
 * @deprecated use the type from @grafana/schema
 */
interface DataQuery extends DataQuery$1 {
}
/**
 * @deprecated use the type from @grafana/schema
 */
interface DataSourceRef extends DataSourceRef$1 {
}

/**
 * Abstract representation of any label-based query
 * @internal
 */
interface AbstractQuery extends DataQuery$1 {
    labelMatchers: AbstractLabelMatcher[];
}
/**
 * @internal
 */
declare enum AbstractLabelOperator {
    Equal = "Equal",
    NotEqual = "NotEqual",
    EqualRegEx = "EqualRegEx",
    NotEqualRegEx = "NotEqualRegEx"
}
/**
 * @internal
 */
type AbstractLabelMatcher = {
    name: string;
    value: string;
    operator: AbstractLabelOperator;
};
/**
 * @internal
 */
interface DataSourceWithQueryImportSupport<TQuery extends DataQuery$1> {
    importFromAbstractQueries(labelBasedQuery: AbstractQuery[]): Promise<TQuery[]>;
}
/**
 * @internal
 */
interface DataSourceWithQueryExportSupport<TQuery extends DataQuery$1> {
    exportToAbstractQueries(query: TQuery[]): Promise<AbstractQuery[]>;
}
/**
 * @internal
 */
declare const hasQueryImportSupport: <TQuery extends DataQuery$1>(datasource: unknown) => datasource is DataSourceWithQueryImportSupport<TQuery>;
/**
 * @internal
 */
declare const hasQueryExportSupport: <TQuery extends DataQuery$1>(datasource: unknown) => datasource is DataSourceWithQueryExportSupport<TQuery>;

declare enum DashboardCursorSync {
    Off = 0,
    Crosshair = 1,
    Tooltip = 2
}
/**
 * @public
 */
interface PanelModel<TOptions = any, TCustomFieldConfig = any> {
    /** ID of the panel within the current dashboard */
    id: number;
    /** The panel type */
    type: string;
    /** Panel title */
    title?: string;
    /** Description */
    description?: string;
    /** Panel options */
    options: TOptions;
    /** Field options configuration */
    fieldConfig: FieldConfigSource<TCustomFieldConfig>;
    /** Version of the panel plugin */
    pluginVersion?: string;
    /** The datasource used in all targets */
    datasource?: DataSourceRef | null;
    /** The queries in a panel */
    targets?: DataQuery[];
    /** Optionally process data after query */
    transformations?: DataTransformerConfig[];
    /** alerting v1 object */
    alert?: any;
}

/**
 * This JSON object is stored in the dashboard json model.
 */
interface AnnotationQuery<TQuery extends DataQuery$1 = DataQuery$1> extends AnnotationQuery$1<TQuery> {
    snapshotData?: any;
    mappings?: AnnotationEventMappings;
    type?: string;
    [key: string]: any;
}
interface AnnotationEvent {
    id?: string;
    annotation?: any;
    dashboardId?: number;
    /** May be null if it isn't set via the HTTP API */
    dashboardUID?: string | null;
    panelId?: number;
    userId?: number;
    login?: string;
    email?: string;
    avatarUrl?: string;
    time?: number;
    timeEnd?: number;
    isRegion?: boolean;
    title?: string;
    text?: string;
    type?: string;
    tags?: string[];
    color?: string;
    alertId?: number;
    newState?: string;
    source?: any;
}
interface AnnotationEventUIModel {
    id?: string;
    from: number;
    to: number;
    tags: string[];
    description: string;
}
/**
 * @alpha -- any value other than `field` is experimental
 */
declare enum AnnotationEventFieldSource {
    Field = "field",// Default -- find the value with a matching key
    Text = "text",// Write a constant string into the value
    Skip = "skip"
}
interface AnnotationEventFieldMapping {
    source?: AnnotationEventFieldSource;
    value?: string;
    regex?: string;
}
type AnnotationEventMappings = Partial<Record<keyof AnnotationEvent, AnnotationEventFieldMapping>>;
type AnnotationQueryEditorProps<TQuery extends DataQuery$1> = QueryEditorProps<any, TQuery> & {
    annotation?: AnnotationQuery<TQuery>;
    onAnnotationChange?: (annotation: AnnotationQuery<TQuery>) => void;
};
/**
 * Since Grafana 7.2
 *
 * This offers a generic approach to annotation processing
 */
interface AnnotationSupport<TQuery extends DataQuery$1 = DataQuery$1, TAnno = AnnotationQuery<TQuery>> {
    /**
     * This hook lets you manipulate any existing stored values before running them though the processor.
     * This is particularly helpful when dealing with migrating old formats.  ie query as a string vs object.
     */
    prepareAnnotation?(json: any): TAnno;
    /**
     * Convert the stored JSON model to a standard datasource query object.
     * This query will be executed in the datasource and the results converted into events.
     * Returning an undefined result will quietly skip query execution
     */
    prepareQuery?(anno: TAnno): TQuery | undefined;
    /**
     * When the standard frame > event processing is insufficient, this allows explicit control of the mappings
     */
    processEvents?(anno: TAnno, data: DataFrame[]): Observable<AnnotationEvent[] | undefined>;
    /**
     * Specify a custom QueryEditor for the annotation page. If not specified, the standard one will be used
     */
    QueryEditor?: ComponentType<AnnotationQueryEditorProps<TQuery>>;
    /**
     * Define this method if you want to pre-populate the editor with a default query
     */
    getDefaultQuery?(): Partial<TQuery>;
}

declare const availableIconsIndex: {
    google: boolean;
    microsoft: boolean;
    github: boolean;
    gitlab: boolean;
    okta: boolean;
    discord: boolean;
    hipchat: boolean;
    amazon: boolean;
    'google-hangouts-alt': boolean;
    pagerduty: boolean;
    line: boolean;
    anchor: boolean;
    'adjust-circle': boolean;
    'angle-double-down': boolean;
    'angle-double-right': boolean;
    'angle-double-left': boolean;
    'angle-double-up': boolean;
    'angle-down': boolean;
    'angle-left': boolean;
    'angle-right': boolean;
    'angle-up': boolean;
    'align-left': boolean;
    'align-right': boolean;
    'application-observability': boolean;
    apps: boolean;
    'archive-alt': boolean;
    arrow: boolean;
    'arrow-down': boolean;
    'arrow-from-right': boolean;
    'arrow-left': boolean;
    'arrow-random': boolean;
    'arrow-right': boolean;
    'arrow-to-right': boolean;
    'arrow-up': boolean;
    'arrows-h': boolean;
    'arrows-v': boolean;
    asserts: boolean;
    'expand-arrows': boolean;
    'expand-arrows-alt': boolean;
    at: boolean;
    ai: boolean;
    backward: boolean;
    bars: boolean;
    bell: boolean;
    'bell-slash': boolean;
    bolt: boolean;
    book: boolean;
    bookmark: boolean;
    'book-open': boolean;
    'brackets-curly': boolean;
    bug: boolean;
    building: boolean;
    'calculator-alt': boolean;
    'calendar-alt': boolean;
    'calendar-slash': boolean;
    camera: boolean;
    capture: boolean;
    'channel-add': boolean;
    'chart-line': boolean;
    check: boolean;
    'check-circle': boolean;
    'check-square': boolean;
    circle: boolean;
    'circle-mono': boolean;
    'clipboard-alt': boolean;
    'clock-nine': boolean;
    cloud: boolean;
    'cloud-download': boolean;
    'cloud-upload': boolean;
    'code-branch': boolean;
    cog: boolean;
    columns: boolean;
    'comment-alt': boolean;
    'comment-alt-message': boolean;
    'comment-alt-share': boolean;
    'comments-alt': boolean;
    compass: boolean;
    'compress-arrows': boolean;
    copy: boolean;
    'corner-down-right-alt': boolean;
    'create-dashboard': boolean;
    'credit-card': boolean;
    crosshair: boolean;
    cube: boolean;
    dashboard: boolean;
    database: boolean;
    'dice-three': boolean;
    docker: boolean;
    'document-info': boolean;
    'document-layout-left': boolean;
    'download-alt': boolean;
    draggabledots: boolean;
    edit: boolean;
    'ellipsis-v': boolean;
    enter: boolean;
    envelope: boolean;
    'exchange-alt': boolean;
    'exclamation-triangle': boolean;
    'exclamation-circle': boolean;
    exclamation: boolean;
    'external-link-alt': boolean;
    eye: boolean;
    'eye-slash': boolean;
    'ellipsis-h': boolean;
    'fa fa-spinner': boolean;
    favorite: boolean;
    'file-alt': boolean;
    'file-blank': boolean;
    'file-copy-alt': boolean;
    'file-download': boolean;
    'file-edit-alt': boolean;
    'file-landscape-alt': boolean;
    filter: boolean;
    flip: boolean;
    folder: boolean;
    font: boolean;
    fire: boolean;
    'folder-open': boolean;
    'folder-plus': boolean;
    'folder-upload': boolean;
    forward: boolean;
    'frontend-observability': boolean;
    'gf-bar-alignment-after': boolean;
    'gf-bar-alignment-before': boolean;
    'gf-bar-alignment-center': boolean;
    'gf-glue': boolean;
    'gf-grid': boolean;
    'gf-interpolation-linear': boolean;
    'gf-interpolation-smooth': boolean;
    'gf-interpolation-step-after': boolean;
    'gf-interpolation-step-before': boolean;
    'gf-landscape': boolean;
    'gf-layout-simple': boolean;
    'gf-logs': boolean;
    'gf-ml': boolean;
    'gf-movepane-left': boolean;
    'gf-movepane-right': boolean;
    'gf-portrait': boolean;
    'gf-service-account': boolean;
    'gf-show-context': boolean;
    'gf-pin': boolean;
    'gf-prometheus': boolean;
    'gf-traces': boolean;
    globe: boolean;
    grafana: boolean;
    'graph-bar': boolean;
    heart: boolean;
    'heart-rate': boolean;
    'heart-break': boolean;
    history: boolean;
    'history-alt': boolean;
    home: boolean;
    'home-alt': boolean;
    'horizontal-align-center': boolean;
    'horizontal-align-left': boolean;
    'horizontal-align-right': boolean;
    hourglass: boolean;
    import: boolean;
    info: boolean;
    'info-circle': boolean;
    k6: boolean;
    'key-skeleton-alt': boolean;
    keyboard: boolean;
    kubernetes: boolean;
    'layer-group': boolean;
    'layers-alt': boolean;
    'library-panel': boolean;
    'line-alt': boolean;
    link: boolean;
    'list-ui-alt': boolean;
    'list-ul': boolean;
    'list-ol': boolean;
    lock: boolean;
    'map-marker': boolean;
    'map-marker-plus': boolean;
    'map-marker-minus': boolean;
    message: boolean;
    minus: boolean;
    'minus-circle': boolean;
    'mobile-android': boolean;
    monitor: boolean;
    palette: boolean;
    'panel-add': boolean;
    paragraph: boolean;
    'pathfinder-unite': boolean;
    pause: boolean;
    'pause-circle': boolean;
    pen: boolean;
    percentage: boolean;
    play: boolean;
    plug: boolean;
    plus: boolean;
    'plus-circle': boolean;
    'plus-square': boolean;
    power: boolean;
    'presentation-play': boolean;
    process: boolean;
    'question-circle': boolean;
    'record-audio': boolean;
    repeat: boolean;
    rocket: boolean;
    'ruler-combined': boolean;
    save: boolean;
    search: boolean;
    'search-minus': boolean;
    'search-plus': boolean;
    'share-alt': boolean;
    shield: boolean;
    'shield-exclamation': boolean;
    signal: boolean;
    signin: boolean;
    signout: boolean;
    sitemap: boolean;
    slack: boolean;
    'sliders-v-alt': boolean;
    spinner: boolean;
    'sort-amount-down': boolean;
    'sort-amount-up': boolean;
    'square-shape': boolean;
    star: boolean;
    'step-backward': boolean;
    stopwatch: boolean;
    'stopwatch-slash': boolean;
    sync: boolean;
    'sync-slash': boolean;
    table: boolean;
    'table-collapse-all': boolean;
    'table-expand-all': boolean;
    'tag-alt': boolean;
    'telegram-alt': boolean;
    'text-fields': boolean;
    'thumbs-up': boolean;
    times: boolean;
    'times-circle': boolean;
    'toggle-on': boolean;
    'toggle-off': boolean;
    'trash-alt': boolean;
    unarchive: boolean;
    unlock: boolean;
    upload: boolean;
    user: boolean;
    'users-alt': boolean;
    'user-arrows': boolean;
    'vertical-align-bottom': boolean;
    'vertical-align-center': boolean;
    'vertical-align-top': boolean;
    'web-section-alt': boolean;
    'wrap-text': boolean;
    rss: boolean;
    x: boolean;
    'add-user': boolean;
    attach: boolean;
};
type IconName = keyof typeof availableIconsIndex;
declare function isIconName(iconName: unknown): iconName is IconName;
declare function toIconName(iconName: string): IconName | undefined;

interface NavLinkDTO {
    id?: string;
    text: string;
    subTitle?: string;
    icon?: IconName;
    img?: string;
    url?: string;
    target?: LinkTarget;
    sortWeight?: number;
    hideFromTabs?: boolean;
    roundIcon?: boolean;
    /**
     * This is true for some sections that have no children (but is still a section)
     **/
    isSection?: boolean;
    children?: NavLinkDTO[];
    highlightText?: string;
    highlightId?: string;
    emptyMessageId?: string;
    pluginId?: string;
    isCreateAction?: boolean;
    keywords?: string[];
}
interface NavModelItem extends NavLinkDTO {
    children?: NavModelItem[];
    active?: boolean;
    parentItem?: NavModelItem;
    onClick?: () => void;
    tabSuffix?: ComponentType<{
        className?: string;
    }>;
    tabCounter?: number;
    hideFromBreadcrumbs?: boolean;
    emptyMessage?: string;
}
/**
 *  Interface used to describe  different kinds of page titles and page navigation. Navmodels are usually generated in the backend and stored in Redux.
 */
interface NavModel {
    /**
     *  Main page. that wraps the navigation. Generate the `children` property generate tabs when used with the Page component.
     */
    main: NavModelItem;
    /**
     *   This is the current active tab/navigation.
     */
    node: NavModelItem;
}
type NavIndex = {
    [s: string]: NavModelItem;
};
declare enum PageLayoutType {
    Standard = 0,
    Canvas = 1,
    Custom = 2
}

/** Describes plugins life cycle status */
declare enum PluginState {
    alpha = "alpha",// Only included if `enable_alpha` config option is true
    beta = "beta",// Will show a warning banner
    stable = "stable",// Will not show anything
    deprecated = "deprecated"
}
/** Describes {@link https://grafana.com/docs/grafana/latest/plugins | type of plugin} */
declare enum PluginType {
    panel = "panel",
    datasource = "datasource",
    app = "app",
    renderer = "renderer",
    secretsmanager = "secretsmanager"
}
/** Describes status of {@link https://grafana.com/docs/grafana/latest/plugins/plugin-signatures/ | plugin signature} */
declare enum PluginSignatureStatus {
    internal = "internal",// core plugin, no signature
    valid = "valid",// signed and accurate MANIFEST
    invalid = "invalid",// invalid signature
    modified = "modified",// valid signature, but content mismatch
    missing = "missing"
}
/** Describes level of {@link https://grafana.com/docs/grafana/latest/plugins/plugin-signatures/#plugin-signature-levels/ | plugin signature level} */
declare enum PluginSignatureType {
    grafana = "grafana",
    commercial = "commercial",
    community = "community",
    private = "private",
    core = "core"
}
/** Describes error code returned from Grafana plugins API call */
declare enum PluginErrorCode {
    missingSignature = "signatureMissing",
    invalidSignature = "signatureInvalid",
    modifiedSignature = "signatureModified",
    failedBackendStart = "failedBackendStart",
    angular = "angular"
}
/** Describes error returned from Grafana plugins API call */
interface PluginError {
    errorCode: PluginErrorCode;
    pluginId: string;
    pluginType?: PluginType;
}
interface AngularMeta {
    detected: boolean;
    hideDeprecation: boolean;
}
interface PluginMeta<T extends KeyValue = {}> {
    id: string;
    name: string;
    type: PluginType;
    info: PluginMetaInfo;
    includes?: PluginInclude[];
    state?: PluginState;
    aliasIDs?: string[];
    module: string;
    baseUrl: string;
    dependencies?: PluginDependencies;
    jsonData?: T;
    secureJsonData?: KeyValue;
    secureJsonFields?: KeyValue<boolean>;
    enabled?: boolean;
    defaultNavUrl?: string;
    hasUpdate?: boolean;
    enterprise?: boolean;
    latestVersion?: string;
    pinned?: boolean;
    signature?: PluginSignatureStatus;
    signatureType?: PluginSignatureType;
    signatureOrg?: string;
    live?: boolean;
    angular?: AngularMeta;
    angularDetected?: boolean;
}
interface PluginDependencyInfo {
    id: string;
    name: string;
    version: string;
    type: PluginType;
}
interface PluginDependencies {
    grafanaDependency?: string;
    grafanaVersion: string;
    plugins: PluginDependencyInfo[];
}
declare enum PluginIncludeType {
    dashboard = "dashboard",
    page = "page",
    panel = "panel",
    datasource = "datasource"
}
interface PluginInclude {
    type: PluginIncludeType;
    name: string;
    path?: string;
    icon?: string;
    role?: string;
    action?: string;
    addToNav?: boolean;
    component?: string;
}
interface PluginMetaInfoLink {
    name: string;
    url: string;
    target?: '_blank' | '_self' | '_parent' | '_top';
}
interface PluginBuildInfo {
    time?: number;
    repo?: string;
    branch?: string;
    hash?: string;
    number?: number;
    pr?: number;
}
interface ScreenshotInfo {
    name: string;
    path: string;
}
interface PluginMetaInfo {
    author: {
        name: string;
        url?: string;
    };
    description: string;
    links: PluginMetaInfoLink[];
    logos: {
        large: string;
        small: string;
    };
    build?: PluginBuildInfo;
    screenshots: ScreenshotInfo[];
    updated: string;
    version: string;
}
interface PluginConfigPageProps<T extends PluginMeta> {
    plugin: GrafanaPlugin<T>;
    query: KeyValue;
}
interface PluginConfigPage<T extends PluginMeta> {
    title: string;
    icon?: IconName;
    id: string;
    body: ComponentType<PluginConfigPageProps<T>>;
}
declare class GrafanaPlugin<T extends PluginMeta = PluginMeta> {
    meta: T;
    loadError?: boolean;
    angularConfigCtrl?: any;
    configPages?: Array<PluginConfigPage<T>>;
    addConfigPage(tab: PluginConfigPage<T>): this;
    /**
     * @deprecated -- this is no longer necessary and will be removed
     */
    setChannelSupport(): this;
    constructor();
}

declare enum PluginExtensionTypes {
    link = "link",
    component = "component"
}
type PluginExtensionBase = {
    id: string;
    type: PluginExtensionTypes;
    title: string;
    description: string;
    pluginId: string;
};
type PluginExtensionLink = PluginExtensionBase & {
    type: PluginExtensionTypes.link;
    path?: string;
    onClick?: (event?: React$1.MouseEvent) => void;
    icon?: IconName;
    category?: string;
};
type PluginExtensionComponent<Props = {}> = PluginExtensionBase & {
    type: PluginExtensionTypes.component;
    component: React$1.ComponentType<Props>;
};
type PluginExtension = PluginExtensionLink | PluginExtensionComponent;
type PluginExtensionLinkConfig<Context extends object = object> = {
    type: PluginExtensionTypes.link;
    title: string;
    description: string;
    path?: string;
    onClick?: (event: React$1.MouseEvent | undefined, helpers: PluginExtensionEventHelpers<Context>) => void;
    /**
     * The unique identifier of the Extension Point
     * (Core Grafana extension point ids are available in the `PluginExtensionPoints` enum)
     */
    extensionPointId: string;
    configure?: (context?: Readonly<Context>) => Partial<{
        title: string;
        description: string;
        path: string;
        onClick: (event: React$1.MouseEvent | undefined, helpers: PluginExtensionEventHelpers<Context>) => void;
        icon: IconName;
        category: string;
    }> | undefined;
    icon?: IconName;
    category?: string;
};
type PluginExtensionComponentConfig<Props = {}> = {
    type: PluginExtensionTypes.component;
    title: string;
    description: string;
    component: React$1.ComponentType<Props>;
    /**
     * The unique identifier of the Extension Point
     * (Core Grafana extension point ids are available in the `PluginExtensionPoints` enum)
     */
    extensionPointId: string;
};
type PluginExtensionConfig = PluginExtensionLinkConfig | PluginExtensionComponentConfig;
type PluginExtensionOpenModalOptions = {
    title: string;
    body: React$1.ElementType<{
        onDismiss?: () => void;
    }>;
    width?: string | number;
    height?: string | number;
};
type PluginExtensionEventHelpers<Context extends object = object> = {
    context?: Readonly<Context>;
    openModal: (options: PluginExtensionOpenModalOptions) => void;
};
declare enum PluginExtensionPoints {
    AlertInstanceAction = "grafana/alerting/instance/action",
    AlertingHomePage = "grafana/alerting/home",
    AlertingAlertingRuleAction = "grafana/alerting/alertingrule/action",
    AlertingRecordingRuleAction = "grafana/alerting/recordingrule/action",
    CommandPalette = "grafana/commandpalette/action",
    DashboardPanelMenu = "grafana/dashboard/panel/menu",
    DataSourceConfig = "grafana/datasources/config",
    ExploreToolbarAction = "grafana/explore/toolbar/action",
    UserProfileTab = "grafana/user/profile/tab"
}
type PluginExtensionPanelContext = {
    pluginId: string;
    id: number;
    title: string;
    timeRange: RawTimeRange;
    timeZone: TimeZone;
    dashboard: Dashboard;
    targets: DataQuery$1[];
    scopedVars?: ScopedVars;
    data?: PanelData;
};
type PluginExtensionDataSourceConfigContext<JsonData extends DataSourceJsonData$1 = DataSourceJsonData$1> = {
    dataSource: DataSourceSettings<JsonData>;
    dataSourceMeta: DataSourcePluginMeta;
    testingStatus?: {
        message?: string | null;
        status?: string | null;
    };
    setJsonData: (jsonData: JsonData) => void;
};
type PluginExtensionCommandPaletteContext = {};
type Dashboard = {
    uid: string;
    title: string;
    tags: string[];
};

/**
 * @public
 * The app container that is loading another plugin (panel or query editor)
 * */
declare enum CoreApp {
    CloudAlerting = "cloud-alerting",
    UnifiedAlerting = "unified-alerting",
    Dashboard = "dashboard",
    Explore = "explore",
    Correlations = "correlations",
    Unknown = "unknown",
    PanelEditor = "panel-editor",
    PanelViewer = "panel-viewer"
}
interface AppRootProps<T extends KeyValue = KeyValue> {
    meta: AppPluginMeta<T>;
    /**
     * base URL segment for an app, /app/pluginId
     */
    basename: string;
    /**
     * Pass the nav model to the container... is there a better way?
     * @deprecated Use PluginPage component exported from @grafana/runtime instead
     */
    onNavChanged: (nav: NavModel) => void;
    /**
     * The URL query parameters
     * @deprecated Use react-router instead
     */
    query: KeyValue;
    /**
     * The URL path to this page
     * @deprecated Use react-router instead
     */
    path: string;
}
interface AppPluginMeta<T extends KeyValue = KeyValue> extends PluginMeta<T> {
}
declare class AppPlugin<T extends KeyValue = KeyValue> extends GrafanaPlugin<AppPluginMeta<T>> {
    private _extensionConfigs;
    root?: ComponentType<AppRootProps<T>>;
    /**
     * Called after the module has loaded, and before the app is used.
     * This function may be called multiple times on the same instance.
     * The first time, `this.meta` will be undefined
     */
    init(meta: AppPluginMeta<T>): void;
    /**
     * Set the component displayed under:
     *   /a/${plugin-id}/*
     *
     * If the NavModel is configured, the page will have a managed frame, otheriwse it has full control.
     */
    setRootPage(root: ComponentType<AppRootProps<T>>): this;
    setComponentsFromLegacyExports(pluginExports: any): void;
    get extensionConfigs(): PluginExtensionConfig[];
    addLink<Context extends object>(extensionConfig: {
        targets: string | string[];
    } & Omit<PluginExtensionLinkConfig<Context>, 'type' | 'extensionPointId'>): this;
    addComponent<Props = {}>(extensionConfig: {
        targets: string | string[];
    } & Omit<PluginExtensionComponentConfig<Props>, 'type' | 'extensionPointId'>): this;
    exposeComponent<Props = {}>(componentConfig: {
        id: string;
    } & Omit<PluginExtensionComponentConfig<Props>, 'type' | 'extensionPointId'>): this;
    /** @deprecated Use .addLink() instead */
    configureExtensionLink<Context extends object>(extension: Omit<PluginExtensionLinkConfig<Context>, 'type'>): this;
    /** @deprecated Use .addComponent() instead */
    configureExtensionComponent<Props = {}>(extension: Omit<PluginExtensionComponentConfig<Props>, 'type'>): this;
}
/**
 * Defines life cycle of a feature
 * @internal
 */
declare enum FeatureState {
    /** @deprecated in favor of experimental */
    alpha = "alpha",
    /** @deprecated in favor of preview */
    beta = "beta",
    /** used to mark experimental features with high/unknown risk */
    experimental = "experimental",
    /** used to mark features that are in public preview with medium/hight risk */
    privatePreview = "private preview",
    /** used to mark features that are in public preview with low/medium risk, or as a shared badge for public and private previews */
    preview = "preview"
}

/**
 * Enum with the different variable support types
 */
declare enum VariableSupportType {
    Legacy = "legacy",
    Standard = "standard",
    Custom = "custom",
    Datasource = "datasource"
}
/**
 * Base class for VariableSupport classes
 */
declare abstract class VariableSupportBase<DSType extends DataSourceApi<TQuery, TOptions>, TQuery extends DataQuery = DataSourceQueryType<DSType>, TOptions extends DataSourceJsonData = DataSourceOptionsType<DSType>> {
    abstract getType(): VariableSupportType;
    /**
     * Define this method in the config if you want to pre-populate the editor with a default query.
     */
    getDefaultQuery?(): Partial<TQuery>;
}
/**
 * Extend this class in a data source plugin to use the standard query editor for Query variables
 */
declare abstract class StandardVariableSupport<DSType extends DataSourceApi<TQuery, TOptions>, TQuery extends DataQuery = DataSourceQueryType<DSType>, TOptions extends DataSourceJsonData = DataSourceOptionsType<DSType>> extends VariableSupportBase<DSType, TQuery, TOptions> {
    getType(): VariableSupportType;
    abstract toDataQuery(query: StandardVariableQuery): TQuery;
    query?(request: DataQueryRequest<TQuery>): Observable<DataQueryResponse>;
}
/**
 * Extend this class in a data source plugin to use a customized query editor for Query variables
 */
declare abstract class CustomVariableSupport<DSType extends DataSourceApi<TQuery, TOptions>, VariableQuery extends DataQuery = any, TQuery extends DataQuery = DataSourceQueryType<DSType>, TOptions extends DataSourceJsonData = DataSourceOptionsType<DSType>> extends VariableSupportBase<DSType, TQuery, TOptions> {
    getType(): VariableSupportType;
    abstract editor: ComponentType<QueryEditorProps<DSType, TQuery, TOptions, VariableQuery>>;
    /**
     * This can return data in various formats as DataQueryResponse allows multiple types. In general though the
     * assumption is that there will be a string Field or value in an Array of objects that will be taken as the possible
     * variable values. You can also use this type directly MetricFindValue or just use text/value/expendable fields/keys
     * in the response.
     * @param request
     */
    abstract query(request: DataQueryRequest<VariableQuery>): Observable<DataQueryResponse>;
}
/**
 * Extend this class in a data source plugin to use the query editor in the data source plugin for Query variables
 */
declare abstract class DataSourceVariableSupport<DSType extends DataSourceApi<TQuery, TOptions>, TQuery extends DataQuery = DataSourceQueryType<DSType>, TOptions extends DataSourceJsonData = DataSourceOptionsType<DSType>> extends VariableSupportBase<DSType, TQuery, TOptions> {
    getType(): VariableSupportType;
}
/**
 * Defines the standard DatQuery used by data source plugins that implement StandardVariableSupport
 */
interface StandardVariableQuery extends DataQuery {
    query: string;
}

interface DataSourcePluginOptionsEditorProps<JSONData extends DataSourceJsonData = DataSourceJsonData, SecureJSONData = {}> {
    options: DataSourceSettings<JSONData, SecureJSONData>;
    onOptionsChange: (options: DataSourceSettings<JSONData, SecureJSONData>) => void;
}
type DataSourceQueryType<DSType> = DSType extends DataSourceApi<infer TQuery, any> ? TQuery : never;
type DataSourceOptionsType<DSType> = DSType extends DataSourceApi<any, infer TOptions> ? TOptions : never;
declare class DataSourcePlugin<DSType extends DataSourceApi<TQuery, TOptions>, TQuery extends DataQuery = DataSourceQueryType<DSType>, TOptions extends DataSourceJsonData = DataSourceOptionsType<DSType>, TSecureOptions = {}> extends GrafanaPlugin<DataSourcePluginMeta<TOptions>> {
    DataSourceClass: DataSourceConstructor<DSType, TQuery, TOptions>;
    components: DataSourcePluginComponents<DSType, TQuery, TOptions, TSecureOptions>;
    constructor(DataSourceClass: DataSourceConstructor<DSType, TQuery, TOptions>);
    setConfigEditor(editor: ComponentType<DataSourcePluginOptionsEditorProps<TOptions, TSecureOptions>>): this;
    setConfigCtrl(ConfigCtrl: any): this;
    setQueryCtrl(QueryCtrl: any): this;
    /** @deprecated -- register the annotation support in the instance constructor */
    setAnnotationQueryCtrl(AnnotationsQueryCtrl: any): this;
    setQueryEditor(QueryEditor: ComponentType<QueryEditorProps<DSType, TQuery, TOptions>>): this;
    /** @deprecated Use `setQueryEditor` instead. When using Explore `props.app` is equal to `CoreApp.Explore` */
    setExploreQueryField(ExploreQueryField: ComponentType<QueryEditorProps<DSType, TQuery, TOptions>>): this;
    /** @deprecated Use `setQueryEditor` instead. */
    setExploreMetricsQueryField(ExploreQueryField: ComponentType<QueryEditorProps<DSType, TQuery, TOptions>>): this;
    /** @deprecated Use `setQueryEditor` instead. */
    setExploreLogsQueryField(ExploreQueryField: ComponentType<QueryEditorProps<DSType, TQuery, TOptions>>): this;
    setQueryEditorHelp(QueryEditorHelp: ComponentType<QueryEditorHelpProps<TQuery>>): this;
    /**
     * @deprecated prefer using `setQueryEditorHelp`
     */
    setExploreStartPage(ExploreStartPage: ComponentType<QueryEditorHelpProps<TQuery>>): this;
    /**
     * @deprecated -- prefer using {@link StandardVariableSupport} or {@link CustomVariableSupport} or {@link DataSourceVariableSupport} in data source instead
     */
    setVariableQueryEditor(VariableQueryEditor: any): this;
    setMetadataInspector(MetadataInspector: ComponentType<MetadataInspectorProps<DSType, TQuery, TOptions>>): this;
    setComponentsFromLegacyExports(pluginExports: any): void;
}
interface DataSourcePluginMeta<T extends KeyValue = {}> extends PluginMeta<T> {
    builtIn?: boolean;
    metrics?: boolean;
    logs?: boolean;
    annotations?: boolean;
    alerting?: boolean;
    tracing?: boolean;
    mixed?: boolean;
    hasQueryHelp?: boolean;
    category?: string;
    queryOptions?: PluginMetaQueryOptions;
    sort?: number;
    streaming?: boolean;
    unlicensed?: boolean;
    backend?: boolean;
    isBackend?: boolean;
}
interface PluginMetaQueryOptions {
    cacheTimeout?: boolean;
    maxDataPoints?: boolean;
    minInterval?: boolean;
}
interface PluginQueryCachingConfig {
    enabled?: boolean;
    TTLMs?: number;
}
interface DataSourcePluginComponents<DSType extends DataSourceApi<TQuery, TOptions>, TQuery extends DataQuery = DataQuery, TOptions extends DataSourceJsonData = DataSourceJsonData, TSecureOptions = {}> {
    QueryCtrl?: any;
    AnnotationsQueryCtrl?: any;
    VariableQueryEditor?: any;
    QueryEditor?: ComponentType<QueryEditorProps<DSType, TQuery, TOptions>>;
    /** @deprecated it will be removed in a future release and `QueryEditor` will be used instead. */
    ExploreQueryField?: ComponentType<QueryEditorProps<DSType, TQuery, TOptions>>;
    /** @deprecated it will be removed in a future release and `QueryEditor` will be used instead. */
    ExploreMetricsQueryField?: ComponentType<QueryEditorProps<DSType, TQuery, TOptions>>;
    /** @deprecated it will be removed in a future release and `QueryEditor` will be used instead. */
    ExploreLogsQueryField?: ComponentType<QueryEditorProps<DSType, TQuery, TOptions>>;
    QueryEditorHelp?: ComponentType<QueryEditorHelpProps<TQuery>>;
    ConfigEditor?: ComponentType<DataSourcePluginOptionsEditorProps<TOptions, TSecureOptions>>;
    MetadataInspector?: ComponentType<MetadataInspectorProps<DSType, TQuery, TOptions>>;
}
interface DataSourceConstructor<DSType extends DataSourceApi<TQuery, TOptions>, TQuery extends DataQuery = DataQuery, TOptions extends DataSourceJsonData = DataSourceJsonData> {
    new (instanceSettings: DataSourceInstanceSettings<TOptions>, ...args: any[]): DSType;
}
type VariableSupport<TQuery extends DataQuery, TOptions extends DataSourceJsonData> = StandardVariableSupport<DataSourceApi<TQuery, TOptions>> | CustomVariableSupport<DataSourceApi<TQuery, TOptions>> | DataSourceVariableSupport<DataSourceApi<TQuery, TOptions>>;
/**
 * The main data source abstraction interface, represents an instance of a data source
 */
declare abstract class DataSourceApi<TQuery extends DataQuery = DataQuery, TOptions extends DataSourceJsonData = DataSourceJsonData, TQueryImportConfiguration extends Record<string, object> = {}> {
    /**
     *  Set in constructor
     */
    readonly name: string;
    /**
     *  Set in constructor
     */
    readonly id: number;
    /**
     *  Set in constructor
     */
    readonly type: string;
    /**
     *  Set in constructor
     */
    readonly uid: string;
    /**
     *  min interval range
     */
    interval?: string;
    constructor(instanceSettings: DataSourceInstanceSettings<TOptions>);
    /**
     * @deprecated use DataSourceWithQueryImportSupport and DataSourceWithQueryExportSupport
     */
    importQueries?(queries: DataQuery[], originDataSource: DataSourceApi<DataQuery>): Promise<TQuery[]>;
    /**
     * Returns configuration for importing queries from other data sources
     */
    getImportQueryConfiguration?(): TQueryImportConfiguration;
    /**
     * Initializes a datasource after instantiation
     */
    init?: () => void;
    /**
     * Query for data, and optionally stream results
     */
    abstract query(request: DataQueryRequest<TQuery>): Promise<DataQueryResponse> | Observable<DataQueryResponse>;
    /**
     * Test & verify datasource settings & connection details (returning TestingStatus)
     *
     * When verification fails - errors specific to the data source should be handled here and converted to
     * a TestingStatus object. Unknown errors and HTTP errors can be re-thrown and will be handled here:
     * public/app/features/datasources/state/actions.ts
     */
    abstract testDatasource(): Promise<TestDataSourceResponse>;
    /**
     * Optionally, you can implement this method to prevent certain queries from being executed.
     * Return false to prevent the query from being executed.
     */
    filterQuery?(query: TQuery): boolean;
    /**
     *  Get hints for query improvements
     */
    getQueryHints?(query: TQuery, results: any[], ...rest: any): QueryHint[];
    /**
     * Convert a query to a simple text string
     */
    getQueryDisplayText?(query: TQuery): string;
    /**
     * Variable query action.
     */
    metricFindQuery?(query: any, options?: LegacyMetricFindQueryOptions): Promise<MetricFindValue[]>;
    /**
     * Get tag keys for adhoc filters
     */
    getTagKeys?(options?: DataSourceGetTagKeysOptions<TQuery>): Promise<GetTagResponse> | Promise<MetricFindValue[]>;
    /**
     * Get tag values for adhoc filters
     */
    getTagValues?(options: DataSourceGetTagValuesOptions<TQuery>): Promise<GetTagResponse> | Promise<MetricFindValue[]>;
    /**
     * Set after constructor call, as the data source instance is the most common thing to pass around
     * we attach the components to this instance for easy access
     */
    components?: DataSourcePluginComponents<DataSourceApi<TQuery, TOptions>, TQuery, TOptions>;
    /**
     * static information about the datasource
     */
    meta: DataSourcePluginMeta;
    /**
     * Information about the datasource's query caching configuration
     * When the caching feature is disabled, this config will always be falsy
     */
    cachingConfig?: PluginQueryCachingConfig;
    /**
     * Used by alerting to check if query contains template variables
     */
    targetContainsTemplate?(query: TQuery): boolean;
    /**
     * Used in explore
     */
    modifyQuery?(query: TQuery, action: QueryFixAction): TQuery;
    /** Get an identifier object for this datasource instance */
    getRef(): DataSourceRef;
    /**
     * Used in explore
     */
    languageProvider?: any;
    getVersion?(optionalOptions?: any): Promise<string>;
    interpolateVariablesInQueries?(queries: TQuery[], scopedVars: ScopedVars, filters?: AdHocVariableFilter[]): TQuery[];
    /**
     * An annotation processor allows explicit control for how annotations are managed.
     *
     * It is only necessary to configure an annotation processor if the default behavior is not desirable
     */
    annotations?: AnnotationSupport<TQuery>;
    /**
     * Can be optionally implemented to allow datasource to be a source of annotations for dashboard.
     * This function will only be called if an angular {@link AnnotationsQueryCtrl} is configured and
     * the {@link annotations} is undefined
     *
     * @deprecated -- prefer using {@link AnnotationSupport}
     */
    annotationQuery?(options: AnnotationQueryRequest<TQuery>): Promise<AnnotationEvent[]>;
    /**
     * Defines new variable support
     * @alpha -- experimental
     */
    variables?: VariableSupport<TQuery, TOptions>;
    getDefaultQuery?(app: CoreApp): Partial<TQuery>;
}
/**
 * Options argument to DataSourceAPI.getTagKeys
 */
interface DataSourceGetTagKeysOptions<TQuery extends DataQuery = DataQuery> {
    /**
     * The other existing filters or base filters. New in v10.3
     */
    filters: AdHocVariableFilter[];
    /**
     * Context time range. New in v10.3
     */
    timeRange?: TimeRange;
    queries?: TQuery[];
}
/**
 * Options argument to DataSourceAPI.getTagValues
 */
interface DataSourceGetTagValuesOptions<TQuery extends DataQuery = DataQuery> {
    key: string;
    /**
     * The other existing filters or base filters. New in v10.3
     */
    filters: AdHocVariableFilter[];
    /**
     * Context time range. New in v10.3
     */
    timeRange?: TimeRange;
    queries?: TQuery[];
}
interface MetadataInspectorProps<DSType extends DataSourceApi<TQuery, TOptions>, TQuery extends DataQuery = DataQuery, TOptions extends DataSourceJsonData = DataSourceJsonData> {
    datasource: DSType;
    data: DataFrame[];
}
interface LegacyMetricFindQueryOptions {
    searchFilter?: string;
    scopedVars?: ScopedVars;
    range?: TimeRange;
    variable?: {
        name: string;
    };
}
interface QueryEditorProps<DSType extends DataSourceApi<TQuery, TOptions>, TQuery extends DataQuery = DataQuery, TOptions extends DataSourceJsonData = DataSourceJsonData, TVQuery extends DataQuery = TQuery> {
    datasource: DSType;
    query: TVQuery;
    onRunQuery: () => void;
    onChange: (value: TVQuery) => void;
    onBlur?: () => void;
    onAddQuery?: (query: TQuery) => void;
    /**
     * Contains query response filtered by refId of QueryResultBase and possible query error
     */
    data?: PanelData;
    range?: TimeRange;
    history?: Array<HistoryItem<TQuery>>;
    queries?: DataQuery[];
    app?: CoreApp;
}
declare enum ExploreMode {
    Logs = "Logs",
    Metrics = "Metrics",
    Tracing = "Tracing"
}
interface QueryEditorHelpProps<TQuery extends DataQuery = DataQuery> {
    datasource: DataSourceApi<TQuery>;
    query: TQuery;
    onClickExample: (query: TQuery) => void;
    exploreId?: any;
}
/**
 * Starting in v6.2 DataFrame can represent both TimeSeries and TableData
 */
type LegacyResponseData = TimeSeries | TableData | any;
type DataQueryResponseData = DataFrame | DataFrameDTO | LegacyResponseData;
interface DataQueryResponse {
    /**
     * The response data.  When streaming, this may be empty
     * or a partial result set
     */
    data: DataQueryResponseData[];
    /**
     * When returning multiple partial responses or streams
     * Use this key to inform Grafana how to combine the partial responses
     * Multiple responses with same key are replaced (latest used)
     */
    key?: string;
    /**
     * Optionally include error info along with the response data
     * @deprecated use errors instead -- will be removed in Grafana 10+
     */
    error?: DataQueryError;
    /**
     * Optionally include multiple errors for different targets
     */
    errors?: DataQueryError[];
    /**
     * Use this to control which state the response should have
     * Defaults to LoadingState.Done if state is not defined
     */
    state?: LoadingState;
    /**
     * traceIds related to the response, if available
     */
    traceIds?: string[];
}
interface TestDataSourceResponse {
    status: string;
    message: string;
    error?: Error;
    details?: {
        message?: string;
        verboseMessage?: string;
    };
}
declare enum DataQueryErrorType {
    Cancelled = "cancelled",
    Timeout = "timeout",
    Unknown = "unknown"
}
interface DataQueryError {
    data?: {
        /**
         * Short information about the error
         */
        message?: string;
        /**
         * Detailed information about the error. Only returned when app_mode is development.
         */
        error?: string;
    };
    message?: string;
    status?: number;
    statusText?: string;
    refId?: string;
    traceId?: string;
    type?: DataQueryErrorType;
}
interface DataQueryRequest<TQuery extends DataQuery = DataQuery> {
    requestId: string;
    interval: string;
    intervalMs: number;
    maxDataPoints?: number;
    range: TimeRange;
    scopedVars: ScopedVars;
    targets: TQuery[];
    timezone: string;
    app: CoreApp | string;
    cacheTimeout?: string | null;
    queryCachingTTL?: number | null;
    skipQueryCache?: boolean;
    rangeRaw?: RawTimeRange;
    timeInfo?: string;
    panelId?: number;
    panelPluginId?: string;
    dashboardUID?: string;
    /** Filters to dynamically apply to all queries */
    filters?: AdHocVariableFilter[];
    groupByKeys?: string[];
    startTime: number;
    endTime?: number;
    liveStreaming?: boolean;
    hideFromInspector?: boolean;
    queryGroupId?: string;
    scopes?: Scope[] | undefined;
}
interface DataQueryTimings {
    dataProcessingTime: number;
}
interface QueryFix {
    title?: string;
    label: string;
    action?: QueryFixAction;
}
type QueryFixType = 'ADD_FILTER' | 'ADD_FILTER_OUT' | 'ADD_STRING_FILTER' | 'ADD_STRING_FILTER_OUT';
interface QueryFixAction {
    query?: string;
    preventSubmit?: boolean;
    /**
     * The type of action to perform. Will be passed to the data source to handle.
     */
    type: QueryFixType | string;
    /**
     * A key value map of options that will be passed. Usually used to pass e.g. the label and value.
     */
    options?: KeyValue<string>;
    /**
     * An optional single row data frame containing the row that triggered the QueryFixAction.
     */
    frame?: DataFrame;
}
interface QueryHint {
    type: string;
    label: string;
    fix?: QueryFix;
}
interface MetricFindValue {
    text: string;
    value?: string | number;
    group?: string;
    expandable?: boolean;
}
interface DataSourceJsonData {
    authType?: string;
    defaultRegion?: string;
    profile?: string;
    manageAlerts?: boolean;
    alertmanagerUid?: string;
    disableGrafanaCache?: boolean;
}
/**
 * Data Source instance edit model.  This is returned from:
 *  /api/datasources
 */
interface DataSourceSettings<T extends DataSourceJsonData = DataSourceJsonData, S = {}> extends WithAccessControlMetadata {
    id: number;
    uid: string;
    orgId: number;
    name: string;
    typeLogoUrl: string;
    type: string;
    typeName: string;
    access: string;
    url: string;
    user: string;
    /**
     *  @deprecated -- use jsonData to store information related to database.
     *  This field should only be used by Elasticsearch and Influxdb.
     */
    database: string;
    basicAuth: boolean;
    basicAuthUser: string;
    isDefault: boolean;
    jsonData: T;
    secureJsonData?: S;
    secureJsonFields: KeyValue<boolean>;
    readOnly: boolean;
    withCredentials: boolean;
    version?: number;
}
/**
 * Frontend settings model that is passed to Datasource constructor. This differs a bit from the model above
 * as this data model is available to every user who has access to a data source (Viewers+).  This is loaded
 * in bootData (on page load), or from: /api/frontend/settings
 */
interface DataSourceInstanceSettings<T extends DataSourceJsonData = DataSourceJsonData> {
    id: number;
    uid: string;
    type: string;
    name: string;
    meta: DataSourcePluginMeta;
    cachingConfig?: PluginQueryCachingConfig;
    readOnly: boolean;
    url?: string;
    jsonData: T;
    username?: string;
    password?: string;
    /**
     *  @deprecated -- use jsonData to store information related to database.
     *  This field should only be used by Elasticsearch and Influxdb.
     */
    database?: string;
    isDefault?: boolean;
    access: 'direct' | 'proxy';
    /**
     * This is the full Authorization header if basic auth is enabled.
     * Only available here when access is Browser (direct), when access is Server (proxy)
     * The basic auth header, username & password is never exposed to browser/Frontend
     * so this will be empty then.
     */
    basicAuth?: string;
    withCredentials?: boolean;
    /** When the name+uid are based on template variables, maintain access to the real values */
    rawRef?: DataSourceRef;
}
/**
 * @deprecated -- use {@link DataSourceInstanceSettings} instead
 */
interface DataSourceSelectItem {
    name: string;
    value: string | null;
    meta: DataSourcePluginMeta;
}
/**
 * Options passed to the datasource.annotationQuery method. See docs/plugins/developing/datasource.md
 *
 * @deprecated -- use {@link AnnotationSupport}
 */
interface AnnotationQueryRequest<MoreOptions = {}> {
    range: TimeRange;
    rangeRaw: RawTimeRange;
    dashboard: any;
    annotation: AnnotationQuery;
}
interface HistoryItem<TQuery extends DataQuery = DataQuery> {
    ts: number;
    query: TQuery;
}
interface GetTagResponse {
    data: MetricFindValue[];
    error?: DataQueryError;
}
declare abstract class LanguageProvider {
    abstract datasource: DataSourceApi<any, any>;
    abstract request: (url: string, params?: any) => Promise<any>;
    /**
     * Returns startTask that resolves with a task list when main syntax is loaded.
     * Task list consists of secondary promises that load more detailed language features.
     */
    abstract start: (timeRange?: TimeRange) => Promise<Array<Promise<any>>>;
    startTask?: Promise<any[]>;
}

/**
 * Context passed to transformDataFrame and to each transform operator
 */
interface DataTransformContext {
    interpolate: InterpolateFunction;
}
/**
 * We score for how applicable a given transformation is.
 * Currently :
 *  0 is considered as not-applicable
 *  1 is considered applicable
 *  2 is considered as highly applicable (i.e. should be highlighted)
 */
type TransformationApplicabilityScore = number;
declare enum TransformationApplicabilityLevels {
    NotPossible = -1,
    NotApplicable = 0,
    Applicable = 1,
    HighlyApplicable = 2
}
/**
 * Function that transform data frames (AKA transformer)
 *
 * @public
 */
interface DataTransformerInfo<TOptions = any> extends RegistryItemWithOptions {
    /**
     * Function that configures transformation and returns a transformer
     * @param options
     */
    operator: (options: TOptions, context: DataTransformContext) => MonoTypeOperatorFunction<DataFrame[]>;
    /**
     * Function that is present will indicate whether a transformation is applicable
     * given the current data.
     * @param options
     */
    isApplicable?: (data: DataFrame[]) => TransformationApplicabilityScore;
    /**
     * A description of the applicator. Can either simply be a string
     * or function which when given the current dataset returns a string.
     * This way descriptions can be tailored relative to the underlying data.
     */
    isApplicableDescription?: string | ((data: DataFrame[]) => string);
}
/**
 * Function that returns a cutsom transform operator for transforming data frames
 *
 * @public
 */
type CustomTransformOperator = (context: DataTransformContext) => MonoTypeOperatorFunction<DataFrame[]>;
/**
 * Many transformations can be called with a simple synchronous function.
 * When a transformer is defined, it should have identical behavior to using the operator
 *
 * @public
 */
interface SynchronousDataTransformerInfo<TOptions = any> extends DataTransformerInfo<TOptions> {
    transformer: (options: TOptions, context: DataTransformContext) => (frames: DataFrame[]) => DataFrame[];
}

type FrameMatcher = (frame: DataFrame) => boolean;
type FieldMatcher = (field: Field, frame: DataFrame, allFrames: DataFrame[]) => boolean;
/**
 * Value matcher type to describe the matcher function
 * @public
 */
type ValueMatcher = (valueIndex: number, field: Field, frame: DataFrame, allFrames: DataFrame[]) => boolean;
interface FieldMatcherInfo<TOptions = any> extends RegistryItemWithOptions<TOptions> {
    get: (options: TOptions) => FieldMatcher;
}
interface FrameMatcherInfo<TOptions = any> extends RegistryItemWithOptions<TOptions> {
    get: (options: TOptions) => FrameMatcher;
}
/**
 * Registry item to represent all the different valu matchers supported
 * in the Grafana platform.
 * @public
 */
interface ValueMatcherInfo<TOptions = any> extends RegistryItemWithOptions<TOptions> {
    get: (options: TOptions) => ValueMatcher;
    isApplicable: (field: Field) => boolean;
    getDefaultOptions: (field: Field) => TOptions;
}
/**
 * @public
 */
declare enum SpecialValue {
    True = "true",
    False = "false",
    Null = "null",
    Empty = "empty"
}

type InterpolateFunction = (value: string, scopedVars?: ScopedVars, format?: string | Function) => string;
interface PanelPluginMeta extends PluginMeta {
    /** Indicates that panel does not issue queries */
    skipDataQuery?: boolean;
    /** Indicates that panel should not be available in visualisation picker */
    hideFromList?: boolean;
    /** Sort order */
    sort: number;
}
interface PanelData {
    /** State of the data (loading, done, error, streaming) */
    state: LoadingState;
    /** Contains data frames with field overrides applied */
    series: DataFrame[];
    /**
     * This is a key that will change when the DataFrame[] structure changes.
     * The revision is a useful way to know if only data has changed or data+structure
     */
    structureRev?: number;
    /** A list of annotation items */
    annotations?: DataFrame[];
    /**
     * @internal
     */
    alertState?: AlertStateInfo;
    /** Request contains the queries and properties sent to the datasource */
    request?: DataQueryRequest;
    /** Timing measurements */
    timings?: DataQueryTimings;
    /** Any query errors */
    errors?: DataQueryError[];
    /**
     * Single error for legacy reasons
     * @deprecated use errors instead -- will be removed in Grafana 10+
     */
    error?: DataQueryError;
    /** Contains the range from the request or a shifted time range if a request uses relative time */
    timeRange: TimeRange;
    /** traceIds collected during the processing of the requests */
    traceIds?: string[];
}
interface PanelProps<T = any> {
    /** Unique ID of the panel within the current dashboard */
    id: number;
    /** Data available as result of running panel queries, includes dataframes and loading state **/
    data: PanelData;
    /** Time range of the current dashboard */
    timeRange: TimeRange;
    /** Time zone of the current dashboard */
    timeZone: TimeZone;
    /** Panel options set by the user in the panel editor. Includes both default and custom panel options */
    options: T;
    /** Indicates whether or not panel should be rendered transparent */
    transparent: boolean;
    /** Current width of the panel in pixels */
    width: number;
    /** Current height of the panel in pixels */
    height: number;
    /** Field options configuration. Controls how field values are displayed (e.g., units, min, max, decimals, thresholds) */
    fieldConfig: FieldConfigSource;
    /** @internal */
    renderCounter: number;
    /** Panel title */
    title: string;
    /** Grafana EventBus  */
    eventBus: EventBus;
    /** Handler for options change. Invoke it to update the panel custom options. */
    onOptionsChange: (options: T) => void;
    /** Field config change handler. Invoke it to update the panel field config. */
    onFieldConfigChange: (config: FieldConfigSource) => void;
    /** Template variables interpolation function. Given a string containing template variables, it returns the string with interpolated values. */
    replaceVariables: InterpolateFunction;
    /** Time range change handler */
    onChangeTimeRange: (timeRange: AbsoluteTimeRange) => void;
}
interface PanelEditorProps<T = any> {
    /** Panel options */
    options: T;
    /** Panel options change handler */
    onOptionsChange: (options: T, callback?: () => void) => void;
    /** Result set of panel queries */
    data?: PanelData;
}
/**
 * Called when a panel is first loaded with current panel model to migrate panel options if needed.
 * Can return panel options, or a Promise that resolves to panel options for async migrations
 */
type PanelMigrationHandler<TOptions = any> = (panel: PanelModel<TOptions>) => Partial<TOptions> | Promise<Partial<TOptions>>;
/**
 * Called before a panel is initialized. Allows panel inspection for any updates before changing the panel type.
 */
type PanelTypeChangedHandler<TOptions = any> = (panel: PanelModel<TOptions>, prevPluginId: string, prevOptions: Record<string, any>, prevFieldConfig: FieldConfigSource) => Partial<TOptions>;
type PanelOptionEditorsRegistry = Registry<PanelOptionsEditorItem>;
interface PanelOptionsEditorProps<TValue> extends StandardEditorProps<TValue> {
}
interface PanelOptionsEditorItem<TOptions = any, TValue = any, TSettings = any> extends OptionsEditorItem<TOptions, TSettings, PanelOptionsEditorProps<TValue>, TValue> {
}
interface PanelOptionsEditorConfig<TOptions, TSettings = any, TValue = any> extends OptionEditorConfig<TOptions, TSettings, TValue> {
}
/**
 * @internal
 */
interface PanelMenuItem {
    type?: 'submenu' | 'divider' | 'group';
    text: string;
    iconClassName?: IconName;
    onClick?: (event: React.MouseEvent<any>) => void;
    shortcut?: string;
    href?: string;
    subMenu?: PanelMenuItem[];
}
/**
 * @internal
 */
interface AngularPanelMenuItem {
    click: Function;
    icon: string;
    href: string;
    divider: boolean;
    text: string;
    shortcut: string;
    submenu: any[];
}
declare enum VizOrientation {
    Auto = "auto",
    Vertical = "vertical",
    Horizontal = "horizontal"
}
interface PanelPluginDataSupport {
    annotations: boolean;
    alertStates: boolean;
}
/**
 * @alpha
 */
interface VisualizationSuggestion<TOptions = any, TFieldConfig = any> {
    /** Name of suggestion */
    name: string;
    /** Description */
    description?: string;
    /** Panel plugin id */
    pluginId: string;
    /** Panel plugin options */
    options?: Partial<TOptions>;
    /** Panel plugin field options */
    fieldConfig?: FieldConfigSource<Partial<TFieldConfig>>;
    /** Data transformations */
    transformations?: DataTransformerConfig[];
    /** Options for how to render suggestion card */
    cardOptions?: {
        /** Tweak for small preview */
        previewModifier?: (suggestion: VisualizationSuggestion) => void;
        icon?: string;
        imgSrc?: string;
    };
    /** A value between 0-100 how suitable suggestion is */
    score?: VisualizationSuggestionScore;
}
/**
 * @alpha
 */
declare enum VisualizationSuggestionScore {
    /** We are pretty sure this is the best possible option */
    Best = 100,
    /** Should be a really good option */
    Good = 70,
    /** Can be visualized but there are likely better options. If no score is set this score is assumed */
    OK = 50
}
/**
 * @alpha
 */
interface PanelDataSummary {
    hasData?: boolean;
    rowCountTotal: number;
    rowCountMax: number;
    frameCount: number;
    fieldCount: number;
    numberFieldCount: number;
    timeFieldCount: number;
    stringFieldCount: number;
    hasNumberField?: boolean;
    hasTimeField?: boolean;
    hasStringField?: boolean;
    /** The first frame that set's this value */
    preferredVisualisationType?: PreferredVisualisationType;
}
/**
 * @alpha
 */
declare class VisualizationSuggestionsBuilder {
    /** Current data */
    data?: PanelData;
    /** Current panel & options */
    panel?: PanelModel;
    /** Summary stats for current data */
    dataSummary: PanelDataSummary;
    private list;
    constructor(data?: PanelData, panel?: PanelModel);
    getListAppender<TOptions, TFieldConfig>(defaults: VisualizationSuggestion<TOptions, TFieldConfig>): VisualizationSuggestionsListAppender<TOptions, TFieldConfig>;
    private computeDataSummary;
    getList(): VisualizationSuggestion<any, any>[];
}
/**
 * @alpha
 */
type VisualizationSuggestionsSupplier = {
    /**
     * Adds good suitable suggestions for the current data
     */
    getSuggestionsForData: (builder: VisualizationSuggestionsBuilder) => void;
};
/**
 * Helps with typings and defaults
 * @alpha
 */
declare class VisualizationSuggestionsListAppender<TOptions, TFieldConfig> {
    private list;
    private defaults;
    constructor(list: VisualizationSuggestion[], defaults: VisualizationSuggestion<TOptions, TFieldConfig>);
    append(overrides: Partial<VisualizationSuggestion<TOptions, TFieldConfig>>): void;
}

/**
 * Callback info for DataLink click events
 */
interface DataLinkClickEvent<T = any> {
    origin: T;
    replaceVariables: InterpolateFunction | undefined;
    e?: any;
}
/**
 * Data Links can be created by data source plugins or correlations.
 * Origin is set in DataLink object and indicates where the link was created.
 */
declare enum DataLinkConfigOrigin {
    Datasource = "Datasource",
    Correlations = "Correlations",
    ExploreCorrelationsEditor = "CorrelationsEditor"
}
/**
 * Link configuration. The values may contain variables that need to be
 * processed before showing the link to user.
 *
 * TODO: <T extends DataQuery> is not strictly true for internal links as we do not need refId for example but all
 *  data source defined queries extend this so this is more for documentation.
 */
interface DataLink<T extends DataQuery = any> {
    title: string;
    targetBlank?: boolean;
    url: string;
    onBuildUrl?: (event: DataLinkClickEvent) => string;
    onClick?: (event: DataLinkClickEvent) => void;
    internal?: InternalDataLink<T>;
    origin?: DataLinkConfigOrigin;
}
/**
 * We provide tooltips with information about these to guide the user, please
 * check for validity when adding more transformation types.
 *
 * @internal
 */
declare enum SupportedTransformationType {
    Regex = "regex",
    Logfmt = "logfmt"
}
/** @internal */
interface DataLinkTransformationConfig {
    type: SupportedTransformationType;
    field?: string;
    expression?: string;
    mapValue?: string;
}
/** @internal */
interface InternalDataLink<T extends DataQuery = any> {
    query: T;
    datasourceUid: string;
    datasourceName: string;
    panelsState?: ExplorePanelsState;
    meta?: {
        correlationData?: ExploreCorrelationHelperData;
    };
    transformations?: DataLinkTransformationConfig[];
    range?: TimeRange;
}
type LinkTarget = '_blank' | '_self' | undefined;
/**
 * Processed Link Model. The values are ready to use
 */
interface LinkModel<T = any> {
    href: string;
    title: string;
    target: LinkTarget;
    origin: T;
    onClick?: (e: any, origin?: any) => void;
}
/**
 * Provides a way to produce links on demand
 *
 * TODO: ScopedVars in in GrafanaUI package!
 */
interface LinkModelSupplier<T extends object> {
    getLinks(replaceVariables?: InterpolateFunction): Array<LinkModel<T>>;
}
declare enum VariableOrigin {
    Series = "series",
    Field = "field",
    Fields = "fields",
    Value = "value",
    BuiltIn = "built-in",
    Template = "template"
}
interface VariableSuggestion {
    value: string;
    label: string;
    documentation?: string;
    origin: VariableOrigin;
}
declare enum VariableSuggestionsScope {
    Values = "values"
}

/**
 * @public
 */
declare enum FieldColorModeId {
    Thresholds = "thresholds",
    PaletteClassic = "palette-classic",
    PaletteClassicByName = "palette-classic-by-name",
    PaletteSaturated = "palette-saturated",
    ContinuousGrYlRd = "continuous-GrYlRd",
    ContinuousRdYlGr = "continuous-RdYlGr",
    ContinuousBlYlRd = "continuous-BlYlRd",
    ContinuousYlRd = "continuous-YlRd",
    ContinuousBlPu = "continuous-BlPu",
    ContinuousYlBl = "continuous-YlBl",
    ContinuousBlues = "continuous-blues",
    ContinuousReds = "continuous-reds",
    ContinuousGreens = "continuous-greens",
    ContinuousPurples = "continuous-purples",
    Fixed = "fixed",
    Shades = "shades"
}
/**
 * @public
 */
interface FieldColor {
    /** The main color scheme mode */
    mode: FieldColorModeId | string;
    /** Stores the fixed color value if mode is fixed */
    fixedColor?: string;
    /** Some visualizations need to know how to assign a series color from by value color schemes */
    seriesBy?: FieldColorSeriesByMode;
}
/**
 * @beta
 */
type FieldColorSeriesByMode = 'min' | 'max' | 'last';
declare const FALLBACK_COLOR = "#808080";

interface Threshold {
    value: number;
    color: string;
    /**
     *  Warning, Error, LowLow, Low, OK, High, HighHigh etc
     */
    state?: string;
}
/**
 *  Display mode
 */
declare enum ThresholdsMode {
    Absolute = "absolute",
    /**
     *  between 0 and 1 (based on min/max)
     */
    Percentage = "percentage"
}
/**
 *  Config that is passed to the ThresholdsEditor
 */
interface ThresholdsConfig {
    mode: ThresholdsMode;
    /**
     *  Must be sorted by 'value', first value is always -Infinity
     */
    steps: Threshold[];
}

/**
 * @alpha
 */
declare enum MappingType {
    ValueToText = "value",// was 1
    RangeToText = "range",// was 2
    RegexToText = "regex",
    SpecialValue = "special"
}
/**
 * @alpha
 */
interface ValueMappingResult {
    text?: string;
    color?: string;
    icon?: string;
    index?: number;
}
/**
 * @alpha
 */
interface BaseValueMap<T> {
    type: MappingType;
    options: T;
}
/**
 * @alpha
 */
interface ValueMap extends BaseValueMap<Record<string, ValueMappingResult>> {
    type: MappingType.ValueToText;
}
/**
 * @alpha
 */
interface RangeMapOptions {
    from: number | null;
    to: number | null;
    result: ValueMappingResult;
}
/**
 * @alpha
 */
interface RangeMap extends BaseValueMap<RangeMapOptions> {
    type: MappingType.RangeToText;
}
/**
 * @alpha
 */
interface RegexMapOptions {
    pattern: string;
    result: ValueMappingResult;
}
/**
 * @alpha
 */
interface RegexMap extends BaseValueMap<RegexMapOptions> {
    type: MappingType.RegexToText;
}
/**
 * @alpha
 */
interface SpecialValueOptions {
    match: SpecialValueMatch;
    result: ValueMappingResult;
}
/**
 * @alpha
 */
declare enum SpecialValueMatch {
    True = "true",
    False = "false",
    Null = "null",
    NaN = "nan",
    NullAndNaN = "null+nan",
    Empty = "empty"
}
/**
 * @alpha
 */
interface SpecialValueMap extends BaseValueMap<SpecialValueOptions> {
    type: MappingType.SpecialValue;
}
/**
 * @alpha
 */
type ValueMapping = ValueMap | RangeMap | RegexMap | SpecialValueMap;

/** @public */
declare enum FieldType {
    time = "time",// or date
    number = "number",
    string = "string",
    boolean = "boolean",
    trace = "trace",
    geo = "geo",
    enum = "enum",
    other = "other",// Object, Array, etc
    frame = "frame",// DataFrame
    nestedFrames = "nestedFrames"
}
/**
 * @public
 * Every property is optional
 *
 * Plugins may extend this with additional properties. Something like series overrides
 */
interface FieldConfig<TOptions = any> {
    /**
     * The display value for this field.  This supports template variables blank is auto.
     * If you are a datasource plugin, do not set this. Use `field.value` and if that
     * is not enough, use `field.config.displayNameFromDS`.
     */
    displayName?: string;
    /**
     * This can be used by data sources that need to customize how values are named.
     * When this property is configured, this value is used rather than the default naming strategy.
     */
    displayNameFromDS?: string;
    /**
     * Human readable field metadata
     */
    description?: string;
    /**
     * An explict path to the field in the datasource.  When the frame meta includes a path,
     * This will default to `${frame.meta.path}/${field.name}
     *
     * When defined, this value can be used as an identifier within the datasource scope, and
     * may be used to update the results
     */
    path?: string;
    /**
     * True if data source can write a value to the path.  Auth/authz are supported separately
     */
    writeable?: boolean;
    /**
     * True if data source field supports ad-hoc filters
     */
    filterable?: boolean;
    unit?: string;
    decimals?: DecimalCount;
    min?: number | null;
    max?: number | null;
    interval?: number | null;
    mappings?: ValueMapping[];
    thresholds?: ThresholdsConfig;
    color?: FieldColor;
    nullValueMode?: NullValueMode;
    links?: DataLink[];
    noValue?: string;
    type?: FieldTypeConfig;
    custom?: TOptions;
    fieldMinMax?: boolean;
}
interface FieldTypeConfig {
    enum?: EnumFieldConfig;
}
interface EnumFieldConfig {
    text?: string[];
    color?: string[];
    icon?: string[];
    description?: string[];
}
/** @public */
interface ValueLinkConfig {
    /**
     * Result of field reduction
     */
    calculatedValue?: DisplayValue;
    /**
     * Index of the value row within Field. Should be provided only when value is not a result of a reduction
     */
    valueRowIndex?: number;
}
interface Field<T = any> {
    /**
     * Name of the field (column)
     */
    name: string;
    /**
     *  Field value type (string, number, etc)
     */
    type: FieldType;
    /**
     *  Meta info about how field and how to display it
     */
    config: FieldConfig;
    /**
     * The raw field values
     */
    values: T[];
    /**
     * When type === FieldType.Time, this can optionally store
     * the nanosecond-precison fractions as integers between
     * 0 and 999999.
     */
    nanos?: number[];
    labels?: Labels;
    /**
     * Cached values with appropriate display and id values
     */
    state?: FieldState | null;
    /**
     * Convert a value for display
     */
    display?: DisplayProcessor;
    /**
     * Get value data links with variables interpolated
     */
    getLinks?: (config: ValueLinkConfig) => Array<LinkModel<Field>>;
}
/** @alpha */
interface FieldState {
    /**
     * An appropriate name for the field (does not include frame info)
     */
    displayName?: string | null;
    /**
     * Cache of reduced values
     */
    calcs?: FieldCalcs;
    /**
     * The numeric range for values in this field.  This value will respect the min/max
     * set in field config, or when set to `auto` this will have the min/max for all data
     * in the response
     */
    range?: NumericRange;
    /**
     * Appropriate values for templating
     */
    scopedVars?: ScopedVars;
    /**
     * Series index is index for this field in a larger data set that can span multiple DataFrames
     * Useful for assigning color to series by looking up a color in a palette using this index
     */
    seriesIndex?: number;
    /**
     * Location of this field within the context frames results
     *
     * @internal -- we will try to make this unnecessary
     */
    origin?: DataFrameFieldIndex;
    /**
     * Boolean value is true if field is in a larger data set with multiple frames.
     * This is only related to the cached displayName property above.
     */
    multipleFrames?: boolean;
    /**
     * Boolean value is true if a null filling threshold has been applied
     * against the frame of the field. This is used to avoid cases in which
     * this would applied more than one time.
     */
    nullThresholdApplied?: boolean;
    /**
     * Can be used by visualizations to cache max display value lengths to aid alignment.
     * It's up to each visualization to calculate and set this.
     */
    alignmentFactors?: DisplayValueAlignmentFactors;
    /**
     * This is the current ad-hoc state of whether this series is hidden in viz, tooltip, and legend.
     *
     * Currently this will match field.config.custom.hideFrom because fieldOverrides applies the special __system
     * override to the actual config during toggle via legend. This should go away once we have a unified system
     * for layering ad hoc field overrides and options but still being able to get the stateless fieldConfig and panel options
     */
    hideFrom?: HideSeriesConfig;
}
/** @public */
interface NumericRange {
    min?: number | null;
    max?: number | null;
    delta: number;
}
interface DataFrame extends QueryResultBase {
    name?: string;
    fields: Field[];
    length: number;
}
interface DataFrameWithValue extends DataFrame {
    value: number | null;
}
/**
 * @public
 * Like a field, but properties are optional and values may be a simple array
 */
interface FieldDTO<T = any> {
    name: string;
    type?: FieldType;
    config?: FieldConfig;
    values?: T[];
    labels?: Labels;
}
/**
 * @public
 * Like a DataFrame, but fields may be a FieldDTO
 */
interface DataFrameDTO extends QueryResultBase {
    name?: string;
    fields: Array<FieldDTO | Field>;
}
interface FieldCalcs extends Record<string, any> {
}
/** @deprecated check data plane docs: https://grafana.com/developers/dataplane/heatmap **/
declare const TIME_SERIES_VALUE_FIELD_NAME = "Value";
declare const TIME_SERIES_TIME_FIELD_NAME = "Time";
declare const TIME_SERIES_METRIC_FIELD_NAME = "Metric";
/**
 * Describes where a specific data frame field is located within a
 * dataset of type DataFrame[]
 *
 * @internal -- we will try to make this unnecessary
 */
interface DataFrameFieldIndex {
    frameIndex: number;
    fieldIndex: number;
}

/**
 * See also:
 * https://github.com/grafana/grafana-plugin-sdk-go/blob/main/data/frame_type.go
 *
 * @public
 */
declare enum DataFrameType {
    TimeSeriesWide = "timeseries-wide",
    TimeSeriesLong = "timeseries-long",
    /** @deprecated in favor of TimeSeriesMulti */
    TimeSeriesMany = "timeseries-many",
    TimeSeriesMulti = "timeseries-multi",
    /** Numeric types: https://grafana.com/developers/dataplane/numeric */
    NumericWide = "numeric-wide",
    NumericMulti = "numeric-multi",
    NumericLong = "numeric-long",
    /** Logs types: https://grafana.com/developers/dataplane/logs */
    LogLines = "log-lines",
    /** Directory listing */
    DirectoryListing = "directory-listing",
    /**
     * First field is X, the rest are ordinal values used as rows in the heatmap
     */
    HeatmapRows = "heatmap-rows",
    /**
     * Explicit fields for:
     *  xMin, yMin, count, ...
     *
     * All values in the grid exist and have regular spacing
     *
     * If the y value is actually ordinal, use `meta.custom` to specify the bucket lookup values
     */
    HeatmapCells = "heatmap-cells",
    /**
     * Explicit fields for:
     *  xMin, xMax, count
     */
    Histogram = "histogram"
}

type KeyValue<T = any> = Record<string, T>;
/**
 * Represent panel data loading state.
 * @public
 */
declare enum LoadingState {
    NotStarted = "NotStarted",
    Loading = "Loading",
    Streaming = "Streaming",
    Done = "Done",
    Error = "Error"
}
declare const preferredVisualizationTypes: readonly ["graph", "table", "logs", "trace", "nodeGraph", "flamegraph", "rawPrometheus"];
type PreferredVisualisationType = (typeof preferredVisualizationTypes)[number];
/**
 * Should be kept in sync with https://github.com/grafana/grafana-plugin-sdk-go/blob/main/data/frame_meta.go
 * @public
 */
interface QueryResultMeta {
    type?: DataFrameType;
    /**
     * TypeVersion is the version of the Type property. Versions greater than 0.0 correspond to the dataplane
     * contract documentation https://github.com/grafana/grafana-plugin-sdk-go/tree/main/data/contract_docs.
     */
    typeVersion?: [number, number];
    /** DatasSource Specific Values */
    custom?: Record<string, any>;
    /** Stats */
    stats?: QueryResultMetaStat[];
    /** Meta Notices */
    notices?: QueryResultMetaNotice[];
    /** Currently used to show results in Explore only in preferred visualisation option */
    preferredVisualisationType?: PreferredVisualisationType;
    /** Set the panel plugin id to use to render the data when using Explore. If the plugin cannot be found
     * will fall back to {@link preferredVisualisationType}.
     *
     * @alpha
     */
    preferredVisualisationPluginId?: string;
    /** The path for live stream updates for this frame */
    channel?: string;
    /** Did the query response come from the cache */
    isCachedResponse?: boolean;
    /**
     * Optionally identify which topic the frame should be assigned to.
     * A value specified in the response will override what the request asked for.
     */
    dataTopic?: DataTopic;
    /**
     * This is the raw query sent to the underlying system.  All macros and templating
     * as been applied.  When metadata contains this value, it will be shown in the query inspector
     */
    executedQueryString?: string;
    /**
     * A browsable path on the datasource
     */
    path?: string;
    /**
     * defaults to '/'
     */
    pathSeparator?: string;
    /** A time shift metadata indicating a result of comparison */
    timeCompare?: {
        diffMs: number;
        isTimeShiftQuery: boolean;
    };
    /**
     * Legacy data source specific, should be moved to custom
     * */
    searchWords?: string[];
    limit?: number;
    json?: boolean;
    instant?: boolean;
    /**
     * Array of field indices which values create a unique id for each row. Ideally this should be globally unique ID
     * but that isn't guarantied. Should help with keeping track and deduplicating rows in visualizations, especially
     * with streaming data with frequent updates.
     * Example: TraceID in Tempo, table name + primary key in SQL
     */
    uniqueRowIdFields?: number[];
}
interface QueryResultMetaStat extends FieldConfig {
    displayName: string;
    value: number;
}
/**
 * QueryResultMetaNotice is a structure that provides user notices for query result data
 * @public
 */
interface QueryResultMetaNotice {
    /**
     * Specify the notice severity
     */
    severity: 'info' | 'warning' | 'error';
    /**
     * Notice descriptive text
     */
    text: string;
    /**
     * An optional link that may be displayed in the UI.
     * This value may be an absolute URL or relative to grafana root
     */
    link?: string;
    /**
     * Optionally suggest an appropriate tab for the panel inspector
     */
    inspect?: 'meta' | 'error' | 'data' | 'stats';
}
/**
 * @public
 */
interface QueryResultBase {
    /**
     * Matches the query target refId
     */
    refId?: string;
    /**
     * Used by some backend data sources to communicate back info about the execution (generated sql, timing)
     */
    meta?: QueryResultMeta;
}
interface Labels {
    [key: string]: string;
}
/** @deprecated this is a very old (pre Grafana 7 + DataFrame) representation for tabular data  */
interface Column {
    text: string;
    filterable?: boolean;
    unit?: string;
    custom?: Record<string, any>;
}
/** @deprecated this is a very old (pre Grafana 7 + DataFrame) representation for tabular data  */
interface TableData extends QueryResultBase {
    name?: string;
    columns: Column[];
    rows: any[][];
    type?: string;
}
/** @deprecated this is a very old (pre Grafana 7 + DataFrame) representation for tabular data  */
type TimeSeriesValue = number | null;
/** @deprecated this is a very old (pre Grafana 7 + DataFrame) representation for tabular data  */
type TimeSeriesPoints = TimeSeriesValue[][];
/** @deprecated this is a very old (pre Grafana 7 + DataFrame) representation for tabular data  */
interface TimeSeries extends QueryResultBase {
    target: string;
    /**
     * If name is manually configured via an alias / legend pattern
     */
    title?: string;
    datapoints: TimeSeriesPoints;
    unit?: string;
    tags?: Labels;
}
declare enum NullValueMode {
    Null = "null",
    Ignore = "connected",
    AsZero = "null as zero"
}
/**
 * Describes and API for exposing panel specific data configurations.
 */
interface DataConfigSource {
    configRev?: number;
    getDataSupport: () => PanelPluginDataSupport;
    getTransformations: () => DataTransformerConfig[] | undefined;
    getFieldOverrideOptions: () => ApplyFieldOverrideOptions | undefined;
    snapshotData?: DataFrameDTO[];
}
type Truthy<T> = T extends false | '' | 0 | null | undefined ? never : T;
declare const isTruthy: <T>(value: T) => value is Truthy<T>;
/**
 * Utility type predicate to check if a value is typeof object, but excludes "null".
 *
 * We normally discourage the use of type predicates in favor of just inline typescript narrowing,
 * but this is a special case to handle null annoyingly being typeof object
 */
declare function isObject(value: unknown): value is object;

/**
 * Mapping of log level abbreviation to canonical log level.
 * Supported levels are reduce to limit color variation.
 */
declare enum LogLevel {
    emerg = "critical",
    fatal = "critical",
    alert = "critical",
    crit = "critical",
    critical = "critical",
    warn = "warning",
    warning = "warning",
    err = "error",
    eror = "error",
    error = "error",
    info = "info",
    information = "info",
    informational = "info",
    notice = "info",
    dbug = "debug",
    debug = "debug",
    trace = "trace",
    unknown = "unknown"
}
/**
 * Mapping of log level abbreviation to canonical log level.
 * Supported levels are reduce to limit color variation.
 */
declare const NumericLogLevel: Record<string, LogLevel>;
declare enum LogsMetaKind {
    Number = 0,
    String = 1,
    LabelsMap = 2,
    Error = 3
}
interface LogsMetaItem {
    label: string;
    value: string | number | Labels;
    kind: LogsMetaKind;
}
interface LogRowModel {
    entryFieldIndex: number;
    rowIndex: number;
    rowId?: string;
    dataFrame: DataFrame;
    duplicates?: number;
    entry: string;
    hasAnsi: boolean;
    hasUnescapedContent: boolean;
    labels: Labels;
    logLevel: LogLevel;
    raw: string;
    searchWords?: string[];
    timeFromNow: string;
    timeEpochMs: number;
    timeEpochNs: string;
    timeLocal: string;
    timeUtc: string;
    uid: string;
    uniqueLabels?: Labels;
    datasourceType?: string;
}
interface LogsModel {
    hasUniqueLabels: boolean;
    meta?: LogsMetaItem[];
    rows: LogRowModel[];
    series?: DataFrame[];
    visibleRange?: AbsoluteTimeRange;
    queries?: DataQuery$1[];
    bucketSize?: number;
}
interface LogSearchMatch {
    start: number;
    length: number;
    text: string;
}
interface LogLabelStatsModel {
    active?: boolean;
    count: number;
    proportion: number;
    value: string;
}
declare enum LogsDedupDescription {
    none = "No de-duplication",
    exact = "De-duplication of successive lines that are identical, ignoring ISO datetimes.",
    numbers = "De-duplication of successive lines that are identical when ignoring numbers, e.g., IP addresses, latencies.",
    signature = "De-duplication of successive lines that have identical punctuation and whitespace."
}
interface LogRowContextOptions {
    direction?: LogRowContextQueryDirection;
    limit?: number;
}
declare enum LogRowContextQueryDirection {
    Backward = "BACKWARD",
    Forward = "FORWARD"
}
/**
 * Data sources that allow showing context rows around the provided LowRowModel should implement this method.
 * This will enable "context" button in Logs Panel.
 */
interface DataSourceWithLogsContextSupport<TQuery extends DataQuery$1 = DataQuery$1> {
    /**
     * Retrieve context for a given log row
     */
    getLogRowContext: (row: LogRowModel, options?: LogRowContextOptions, query?: TQuery) => Promise<DataQueryResponse>;
    /**
     * Retrieve the context query object for a given log row. This is currently used to open LogContext queries in a split view and in a new browser tab.
     * The `cacheFilters` parameter can be used to force a refetch of the cached applied filters. Default value `true`.
     */
    getLogRowContextQuery?: (row: LogRowModel, options?: LogRowContextOptions, query?: TQuery, cacheFilters?: boolean) => Promise<TQuery | null>;
    /**
     * @deprecated Deprecated since 10.3. To display the context option and support the feature implement DataSourceWithLogsContextSupport interface instead.
     */
    showContextToggle?(row?: LogRowModel): boolean;
    /**
     * This method can be used to display a custom UI in the context view.
     * @alpha
     * @internal
     */
    getLogRowContextUi?(row: LogRowModel, runContextQuery?: () => void, origQuery?: TQuery): React.ReactNode;
}
declare const hasLogsContextSupport: (datasource: unknown) => datasource is DataSourceWithLogsContextSupport<DataQuery$1>;
/**
 * Types of supplementary queries that can be run in Explore.
 * @internal
 */
declare enum SupplementaryQueryType {
    LogsVolume = "LogsVolume",
    LogsSample = "LogsSample"
}
/**
 * @internal
 */
type SupplementaryQueryOptions = LogsVolumeOption | LogsSampleOptions;
/**
 * @internal
 */
type LogsVolumeOption = {
    type: SupplementaryQueryType.LogsVolume;
    field?: string;
};
/**
 * @internal
 */
type LogsSampleOptions = {
    type: SupplementaryQueryType.LogsSample;
    limit?: number;
};
/**
 * Types of logs volume responses. A data source may return full range histogram (based on selected range)
 * or limited (based on returned results). This information is attached to DataFrame.meta.custom object.
 * @internal
 */
declare enum LogsVolumeType {
    FullRange = "FullRange",
    Limited = "Limited"
}
/**
 * Custom meta information required by Logs Volume responses
 */
type LogsVolumeCustomMetaData = {
    absoluteRange: AbsoluteTimeRange;
    logsVolumeType: LogsVolumeType;
    datasourceName: string;
    sourceQuery: DataQuery$1;
};
/**
 * Data sources that support supplementary queries in Explore.
 * This will enable users to see additional data when running original queries.
 * Supported supplementary queries are defined in SupplementaryQueryType enum.
 * @internal
 */
interface DataSourceWithSupplementaryQueriesSupport<TQuery extends DataQuery$1> {
    /**
     * Returns an observable that will be used to fetch supplementary data based on the provided
     * supplementary query type and original request.
     * @deprecated Use getSupplementaryQueryRequest() instead
     */
    getDataProvider?(type: SupplementaryQueryType, request: DataQueryRequest<TQuery>): Observable<DataQueryResponse> | undefined;
    /**
     * Receives a SupplementaryQueryType and a DataQueryRequest and returns a new DataQueryRequest to fetch supplementary data.
     * If provided type or request is not suitable for a supplementary data request, returns undefined.
     */
    getSupplementaryRequest?(type: SupplementaryQueryType, request: DataQueryRequest<TQuery>, options?: SupplementaryQueryOptions): DataQueryRequest<TQuery> | undefined;
    /**
     * Returns supplementary query types that data source supports.
     */
    getSupportedSupplementaryQueryTypes(): SupplementaryQueryType[];
    /**
     * Returns a supplementary query to be used to fetch supplementary data based on the provided type and original query.
     * If the provided query is not suitable for the provided supplementary query type, undefined should be returned.
     */
    getSupplementaryQuery(options: SupplementaryQueryOptions, originalQuery: TQuery): TQuery | undefined;
}
declare const hasSupplementaryQuerySupport: <TQuery extends DataQuery$1>(datasource: DataSourceApi | (DataSourceApi & DataSourceWithSupplementaryQueriesSupport<TQuery>), type: SupplementaryQueryType) => datasource is DataSourceApi<DataQuery, DataSourceJsonData, {}> & DataSourceWithSupplementaryQueriesSupport<TQuery>;
declare const hasLogsContextUiSupport: (datasource: unknown) => datasource is DataSourceWithLogsContextSupport<DataQuery$1>;
interface QueryFilterOptions extends KeyValue<string> {
}
interface ToggleFilterAction {
    type: 'FILTER_FOR' | 'FILTER_OUT';
    options: QueryFilterOptions;
    frame?: DataFrame;
}
/**
 * Data sources that support toggleable filters through `toggleQueryFilter`, and displaying the active
 * state of filters through `queryHasFilter`, in the Log Details component in Explore.
 * @internal
 * @alpha
 */
interface DataSourceWithToggleableQueryFiltersSupport<TQuery extends DataQuery$1> {
    /**
     * Toggle filters on and off from query.
     * If the filter is already present, it should be removed.
     * If the opposite filter is present, it should be replaced.
     */
    toggleQueryFilter(query: TQuery, filter: ToggleFilterAction): TQuery;
    /**
     * Given a query, determine if it has a filter that matches the options.
     */
    queryHasFilter(query: TQuery, filter: QueryFilterOptions): boolean;
}
/**
 * @internal
 */
declare const hasToggleableQueryFiltersSupport: <TQuery extends DataQuery$1>(datasource: unknown) => datasource is DataSourceWithToggleableQueryFiltersSupport<TQuery>;
/**
 * Data sources that support query modification actions from Log Details (ADD_FILTER, ADD_FILTER_OUT),
 * and Popover Menu (ADD_STRING_FILTER, ADD_STRING_FILTER_OUT) in Explore.
 * @internal
 * @alpha
 */
interface DataSourceWithQueryModificationSupport<TQuery extends DataQuery$1> {
    /**
     * Given a query, applies a query modification `action`, returning the updated query.
     * Explore currently supports the following action types:
     * - ADD_FILTER: adds a <key, value> filter to the query.
     * - ADD_FILTER_OUT: adds a negative <key, value> filter to the query.
     * - ADD_STRING_FILTER: adds a string filter to the query.
     * - ADD_STRING_FILTER_OUT: adds a negative string filter to the query.
     */
    modifyQuery(query: TQuery, action: QueryFixAction): TQuery;
    /**
     * Returns a list of supported action types for `modifyQuery()`.
     */
    getSupportedQueryModifications(): Array<QueryFixType | string>;
}
/**
 * @internal
 */
declare const hasQueryModificationSupport: <TQuery extends DataQuery$1>(datasource: unknown) => datasource is DataSourceWithQueryModificationSupport<TQuery>;

/**
 * Used in select elements
 */
interface SelectableValue<T = any> {
    label?: string;
    ariaLabel?: string;
    value?: T;
    imgUrl?: string;
    icon?: string;
    description?: string;
    title?: string;
    component?: React.ComponentType;
    isDisabled?: boolean;
    [key: string]: any;
}

interface YAxis {
    index: number;
    min?: number;
    tickDecimals?: number;
}
type GraphSeriesValue = number | null;
/** View model projection of a series */
interface GraphSeriesXY {
    color?: string;
    data: GraphSeriesValue[][];
    isVisible: boolean;
    label: string;
    yAxis: YAxis;
    timeField: Field;
    valueField: Field;
    seriesIndex: number;
    timeStep: number;
    info?: DisplayValue[];
}
interface CreatePlotOverlay {
    (element: JQuery, event: any, plot: {
        getOptions: () => {
            events: {
                manager: any;
            };
        };
    }): any;
}

declare global {
    interface Array<T> {
        /** @deprecated Use [idx]. This only exists to help migrate Vector to Array */
        get(idx: number): T;
        /** @deprecated Use [idx]. This only exists to help migrate Vector to Array */
        set(idx: number, value: T): void;
        /** @deprecated Use .push(value). This only exists to help migrate Vector to Array */
        add(value: T): void;
        /** @deprecated this is not necessary.  This only exists to help migrate Vector to Array */
        toArray(): T[];
    }
}
declare function patchArrayVectorProrotypeMethods(): void;

type VariableType = TypedVariableModel['type'];
/** @deprecated Use TypedVariableModel instead */
interface VariableModel {
    type: VariableType;
    name: string;
    label?: string;
}
type TypedVariableModel = QueryVariableModel | AdHocVariableModel | GroupByVariableModel | ConstantVariableModel | DataSourceVariableModel | IntervalVariableModel | TextBoxVariableModel | CustomVariableModel | UserVariableModel | OrgVariableModel | DashboardVariableModel;
declare enum VariableRefresh {
    never = 0,// removed from the UI
    onDashboardLoad = 1,
    onTimeRangeChanged = 2
}
declare enum VariableSort {
    disabled = 0,
    alphabeticalAsc = 1,
    alphabeticalDesc = 2,
    numericalAsc = 3,
    numericalDesc = 4,
    alphabeticalCaseInsensitiveAsc = 5,
    alphabeticalCaseInsensitiveDesc = 6,
    naturalAsc = 7,
    naturalDesc = 8
}
declare enum VariableHide {
    dontHide = 0,
    hideLabel = 1,
    hideVariable = 2
}
interface AdHocVariableFilter {
    key: string;
    operator: string;
    value: string;
    /** @deprecated  */
    condition?: string;
}
interface AdHocVariableModel extends BaseVariableModel {
    type: 'adhoc';
    datasource: DataSourceRef | null;
    filters: AdHocVariableFilter[];
    /**
     * Filters that are always applied to the lookup of keys. Not shown in the AdhocFilterBuilder UI.
     */
    baseFilters?: AdHocVariableFilter[];
    /**
     * Static keys that override any dynamic keys from the datasource.
     */
    defaultKeys?: MetricFindValue[];
}
interface GroupByVariableModel extends VariableWithOptions {
    type: 'groupby';
    datasource: DataSourceRef | null;
    multi: true;
}
interface VariableOption {
    selected: boolean;
    text: string | string[];
    value: string | string[];
    isNone?: boolean;
}
interface IntervalVariableModel extends VariableWithOptions {
    type: 'interval';
    auto: boolean;
    auto_min: string;
    auto_count: number;
    refresh: VariableRefresh;
}
interface CustomVariableModel extends VariableWithMultiSupport {
    type: 'custom';
}
interface DataSourceVariableModel extends VariableWithMultiSupport {
    type: 'datasource';
    regex: string;
    refresh: VariableRefresh;
}
interface QueryVariableModel extends VariableWithMultiSupport {
    type: 'query';
    datasource: DataSourceRef | null;
    definition: string;
    sort: VariableSort;
    queryValue?: string;
    query: any;
    regex: string;
    refresh: VariableRefresh;
}
interface TextBoxVariableModel extends VariableWithOptions {
    type: 'textbox';
    originalQuery: string | null;
}
interface ConstantVariableModel extends VariableWithOptions {
    type: 'constant';
}
interface VariableWithMultiSupport extends VariableWithOptions {
    multi: boolean;
    includeAll: boolean;
    allValue?: string | null;
}
interface VariableWithOptions extends BaseVariableModel {
    current: VariableOption | Record<string, never>;
    options: VariableOption[];
    query: string;
}
interface DashboardProps {
    name: string;
    uid: string;
    toString: () => string;
}
interface DashboardVariableModel extends SystemVariable<DashboardProps> {
}
interface OrgProps {
    name: string;
    id: number;
    toString: () => string;
}
interface OrgVariableModel extends SystemVariable<OrgProps> {
}
interface UserProps {
    login: string;
    id: number;
    email?: string;
    toString: () => string;
}
interface UserVariableModel extends SystemVariable<UserProps> {
}
interface SystemVariable<TProps extends {
    toString: () => string;
}> extends BaseVariableModel {
    type: 'system';
    current: {
        value: TProps;
    };
}
interface BaseVariableModel {
    name: string;
    label?: string;
    id: string;
    type: VariableType;
    rootStateKey: string | null;
    global: boolean;
    hide: VariableHide;
    skipUrlSync: boolean;
    index: number;
    state: LoadingState;
    error: any | null;
    description: string | null;
    usedInRepeat?: boolean;
}

interface UserOrgDTO {
    orgId: number;
    name: string;
    role: OrgRole;
}
declare enum OrgRole {
    None = "None",
    Viewer = "Viewer",
    Editor = "Editor",
    Admin = "Admin"
}

interface FlotDataPoint {
    dataIndex: number;
    datapoint: number[];
    pageX: number;
    pageY: number;
    series: any;
    seriesIndex: number;
}

/**
 * Type representing a tag in a trace span or fields of a log.
 */
type TraceKeyValuePair<T = any> = {
    key: string;
    value: T;
};
/**
 * Type representing a log in a span.
 */
type TraceLog = {
    timestamp: number;
    fields: TraceKeyValuePair[];
};
type TraceSpanReference = {
    traceID: string;
    spanID: string;
    tags?: TraceKeyValuePair[];
};
/**
 * This describes the structure of the dataframe that should be returned from a tracing data source to show trace
 * in a TraceView component.
 */
interface TraceSpanRow {
    traceID: string;
    spanID: string;
    parentSpanID: string | undefined;
    operationName: string;
    serviceName: string;
    serviceTags: TraceKeyValuePair[];
    startTime: number;
    duration: number;
    logs?: TraceLog[];
    references?: TraceSpanReference[];
    tags?: TraceKeyValuePair[];
    kind?: string;
    statusCode?: number;
    statusMessage?: string;
    instrumentationLibraryName?: string;
    instrumentationLibraryVersion?: string;
    traceState?: string;
    warnings?: string[];
    stackTraces?: string[];
    errorIconColor?: string;
}

type AlertPayload = [string, string?, string?];
type AlertErrorPayload = [string, (string | Error)?, string?];
declare const AppEvents: {
    alertSuccess: AppEvent<AlertPayload>;
    alertWarning: AppEvent<AlertPayload>;
    alertError: AppEvent<AlertErrorPayload>;
};
declare const PanelEvents: {
    refresh: AppEvent<undefined>;
    componentDidMount: AppEvent<undefined>;
    dataReceived: AppEvent<any[]>;
    dataError: AppEvent<DataQueryError>;
    dataFramesReceived: AppEvent<DataFrame[]>;
    dataSnapshotLoad: AppEvent<any[]>;
    editModeInitialized: AppEvent<undefined>;
    initPanelActions: AppEvent<AngularPanelMenuItem[]>;
    initialized: AppEvent<undefined>;
    panelTeardown: AppEvent<undefined>;
    render: AppEvent<any>;
};
/** @public */
interface LegacyGraphHoverEventPayload extends DataHoverPayload {
    pos: any;
    panel: {
        id: number;
    };
}
/** @alpha */
declare class LegacyGraphHoverEvent extends BusEventWithPayload<LegacyGraphHoverEventPayload> {
    static type: string;
}
/** @alpha */
declare class LegacyGraphHoverClearEvent extends BusEventBase {
    static type: string;
    payload: DataHoverPayload;
}

/**
 * The channel id is defined as:
 *
 *   ${scope}/${namespace}/${path}
 *
 * The scope drives how the namespace is used and controlled
 *
 * @alpha
 */
declare enum LiveChannelScope {
    DataSource = "ds",// namespace = data source ID
    Plugin = "plugin",// namespace = plugin name (singleton works for apps too)
    Grafana = "grafana",// namespace = feature
    Stream = "stream"
}
/**
 * The type of data to expect in a given channel
 *
 * @alpha
 */
declare enum LiveChannelType {
    DataStream = "stream",// each message contains a batch of rows that will be appended to previous values
    DataFrame = "frame",// each message is an entire data frame and should *replace* previous content
    JSON = "json"
}
declare enum LiveChannelConnectionState {
    /** The connection is not yet established */
    Pending = "pending",
    /** Connected to the channel */
    Connected = "connected",
    /** Connecting to a channel */
    Connecting = "connecting",
    /** Disconnected from the channel.  The channel will reconnect when possible */
    Disconnected = "disconnected",
    /** Was at some point connected, and will not try to reconnect */
    Shutdown = "shutdown",
    /** Channel configuration was invalid and will not connect */
    Invalid = "invalid"
}
declare enum LiveChannelEventType {
    Status = "status",
    Join = "join",
    Leave = "leave",
    Message = "message"
}
/**
 * @alpha -- experimental
 */
interface LiveChannelStatusEvent {
    type: LiveChannelEventType.Status;
    /**
     * {scope}/{namespace}/{path}
     */
    id: string;
    /**
     * unix millies timestamp for the last status change
     */
    timestamp: number;
    /**
     * flag if the channel is actively connected to the channel.
     * This may be false while the connections get established or if the network is lost
     * As long as the `shutdown` flag is not set, the connection will try to reestablish
     */
    state: LiveChannelConnectionState;
    /**
     * When joining a channel, there may be an initial packet in the subscribe method
     */
    message?: any;
    /**
     * The last error.
     *
     * This will remain in the status until a new message is successfully received from the channel
     */
    error?: any;
}
interface LiveChannelJoinEvent {
    type: LiveChannelEventType.Join;
    user: any;
}
interface LiveChannelLeaveEvent {
    type: LiveChannelEventType.Leave;
    user: any;
}
interface LiveChannelMessageEvent<T> {
    type: LiveChannelEventType.Message;
    message: T;
}
type LiveChannelEvent<T = any> = LiveChannelStatusEvent | LiveChannelJoinEvent | LiveChannelLeaveEvent | LiveChannelMessageEvent<T>;
declare function isLiveChannelStatusEvent<T>(evt: LiveChannelEvent<T>): evt is LiveChannelStatusEvent;
declare function isLiveChannelJoinEvent<T>(evt: LiveChannelEvent<T>): evt is LiveChannelJoinEvent;
declare function isLiveChannelLeaveEvent<T>(evt: LiveChannelEvent<T>): evt is LiveChannelLeaveEvent;
declare function isLiveChannelMessageEvent<T>(evt: LiveChannelEvent<T>): evt is LiveChannelMessageEvent<T>;
/**
 * @alpha -- experimental
 */
interface LiveChannelPresenceStatus {
    users: any;
}
/**
 * @alpha -- experimental
 */
type LiveChannelId = string;
/**
 * @alpha -- experimental
 */
interface LiveChannelAddress {
    scope: LiveChannelScope;
    namespace: string;
    path: string;
    /**
     * Additional metadata passed to a channel.  The backend will propagate this JSON object to
     * each OnSubscribe and RunStream calls.  This value should be constant across multiple requests
     * to the same channel path
     */
    data?: any;
}
/**
 * Return an address from a string
 *
 * @alpha -- experimental
 */
declare function parseLiveChannelAddress(id?: string): LiveChannelAddress | undefined;
/**
 * Check if the address has a scope, namespace, and path
 *
 * @alpha -- experimental
 */
declare function isValidLiveChannelAddress(addr?: LiveChannelAddress): addr is LiveChannelAddress;
/**
 * Convert the address to an explicit channel path
 *
 * @alpha -- experimental
 */
declare function toLiveChannelId(addr: LiveChannelAddress): LiveChannelId;

/**
 * A coordinate on a two dimensional plane.
 */
interface CartesianCoords2D {
    x: number;
    y: number;
}
/**
 * 2d object dimensions.
 */
interface Dimensions2D {
    width: number;
    height: number;
}

/**
 * Utility function to check if a plugin is unsigned.
 *
 * @param signature - the plugin meta signature
 * @internal
 */
declare function isUnsignedPluginSignature(signature?: PluginSignatureStatus): boolean | undefined;

/**
 * Determine if a string contains a relative date time.
 * @param text
 */
declare function isMathString(text: string | DateTime | Date): boolean;
/**
 * Parses different types input to a moment instance. There is a specific formatting language that can be used
 * if text arg is string. See unit tests for examples.
 * @param text
 * @param roundUp See parseDateMath function.
 * @param timezone Only string 'utc' is acceptable here, for anything else, local timezone is used.
 */
declare function parse(text?: string | DateTime | Date | null, roundUp?: boolean, timezone?: TimeZone, fiscalYearStartMonth?: number): DateTime | undefined;
/**
 * Checks if text is a valid date which in this context means that it is either a Moment instance or it can be parsed
 * by parse function. See parse function to see what is considered acceptable.
 * @param text
 */
declare function isValid(text: string | DateTime): boolean;
/**
 * Parses math part of the time string and shifts supplied time according to that math. See unit tests for examples.
 * @param mathString
 * @param time
 * @param roundUp If true it will round the time to endOf time unit, otherwise to startOf time unit.
 */
declare function parseDateMath(mathString: string, time: any, roundUp?: boolean, fiscalYearStartMonth?: number): DateTime | undefined;
declare function roundToFiscal(fyStartMonth: number, dateTime: any, unit: string, roundUp: boolean | undefined): any;

declare const datemath_d_isMathString: typeof isMathString;
declare const datemath_d_parse: typeof parse;
declare const datemath_d_isValid: typeof isValid;
declare const datemath_d_parseDateMath: typeof parseDateMath;
declare const datemath_d_roundToFiscal: typeof roundToFiscal;
declare namespace datemath_d {
  export {
    datemath_d_isMathString as isMathString,
    datemath_d_parse as parse,
    datemath_d_isValid as isValid,
    datemath_d_parseDateMath as parseDateMath,
    datemath_d_roundToFiscal as roundToFiscal,
  };
}

declare function describeTextRange(expr: string): TimeOption;
/**
 * Use this function to get a properly formatted string representation of a {@link @grafana/data:RawTimeRange | range}.
 *
 * @example
 * ```
 * // Prints "2":
 * console.log(add(1,1));
 * ```
 * @category TimeUtils
 * @param range - a time range (usually specified by the TimePicker)
 * @alpha
 */
declare function describeTimeRange(range: RawTimeRange, timeZone?: TimeZone): string;
declare const isValidTimeSpan: (value: string) => boolean;
declare const describeTimeRangeAbbreviation: (range: TimeRange, timeZone?: TimeZone) => string;
declare const convertRawToRange: (raw: RawTimeRange, timeZone?: TimeZone, fiscalYearStartMonth?: number, format?: string) => TimeRange;
declare function isRelativeTime(v: DateTime | string): boolean;
declare function isFiscal(timeRange: TimeRange): boolean;
declare function isRelativeTimeRange(raw: RawTimeRange): boolean;
declare function secondsToHms(seconds: number): string;
declare function msRangeToTimeString(rangeMs: number): string;
declare function calculateInterval(range: TimeRange, resolution: number, lowLimitInterval?: string): IntervalValues;
declare function describeInterval(str: string): {
    sec: number;
    type: string;
    count: number;
};
declare function intervalToSeconds(str: string): number;
declare function intervalToMs(str: string): number;
declare function roundInterval(interval: number): 1 | 100 | 10 | 1000 | 20 | 50 | 200 | 500 | 2000 | 5000 | 10000 | 15000 | 20000 | 30000 | 60000 | 120000 | 300000 | 600000 | 900000 | 1200000 | 1800000 | 3600000 | 7200000 | 10800000 | 21600000 | 43200000 | 86400000 | 604800000 | 2592000000 | 31536000000;
/**
 * Converts a TimeRange to a RelativeTimeRange that can be used in
 * e.g. alerting queries/rules.
 *
 * @internal
 */
declare function timeRangeToRelative(timeRange: TimeRange, now?: DateTime): RelativeTimeRange;
/**
 * Converts a RelativeTimeRange to a TimeRange
 *
 * @internal
 */
declare function relativeToTimeRange(relativeTimeRange: RelativeTimeRange, now?: DateTime): TimeRange;

declare const rangeutil_d_describeTextRange: typeof describeTextRange;
declare const rangeutil_d_describeTimeRange: typeof describeTimeRange;
declare const rangeutil_d_isValidTimeSpan: typeof isValidTimeSpan;
declare const rangeutil_d_describeTimeRangeAbbreviation: typeof describeTimeRangeAbbreviation;
declare const rangeutil_d_convertRawToRange: typeof convertRawToRange;
declare const rangeutil_d_isRelativeTime: typeof isRelativeTime;
declare const rangeutil_d_isFiscal: typeof isFiscal;
declare const rangeutil_d_isRelativeTimeRange: typeof isRelativeTimeRange;
declare const rangeutil_d_secondsToHms: typeof secondsToHms;
declare const rangeutil_d_msRangeToTimeString: typeof msRangeToTimeString;
declare const rangeutil_d_calculateInterval: typeof calculateInterval;
declare const rangeutil_d_describeInterval: typeof describeInterval;
declare const rangeutil_d_intervalToSeconds: typeof intervalToSeconds;
declare const rangeutil_d_intervalToMs: typeof intervalToMs;
declare const rangeutil_d_roundInterval: typeof roundInterval;
declare const rangeutil_d_timeRangeToRelative: typeof timeRangeToRelative;
declare const rangeutil_d_relativeToTimeRange: typeof relativeToTimeRange;
declare namespace rangeutil_d {
  export {
    rangeutil_d_describeTextRange as describeTextRange,
    rangeutil_d_describeTimeRange as describeTimeRange,
    rangeutil_d_isValidTimeSpan as isValidTimeSpan,
    rangeutil_d_describeTimeRangeAbbreviation as describeTimeRangeAbbreviation,
    rangeutil_d_convertRawToRange as convertRawToRange,
    rangeutil_d_isRelativeTime as isRelativeTime,
    rangeutil_d_isFiscal as isFiscal,
    rangeutil_d_isRelativeTimeRange as isRelativeTimeRange,
    rangeutil_d_secondsToHms as secondsToHms,
    rangeutil_d_msRangeToTimeString as msRangeToTimeString,
    rangeutil_d_calculateInterval as calculateInterval,
    rangeutil_d_describeInterval as describeInterval,
    rangeutil_d_intervalToSeconds as intervalToSeconds,
    rangeutil_d_intervalToMs as intervalToMs,
    rangeutil_d_roundInterval as roundInterval,
    rangeutil_d_timeRangeToRelative as timeRangeToRelative,
    rangeutil_d_relativeToTimeRange as relativeToTimeRange,
  };
}

declare enum InternalTimeZones {
    default = "",
    localBrowserTime = "browser",
    utc = "utc"
}
declare const timeZoneFormatUserFriendly: (timeZone: TimeZone | undefined) => string | undefined;
declare const getZone: (timeZone: string) => moment$1.MomentZone | null;
interface TimeZoneCountry {
    code: string;
    name: string;
}
interface TimeZoneInfo {
    name: string;
    zone: string;
    countries: TimeZoneCountry[];
    abbreviation: string;
    offsetInMins: number;
    ianaName: string;
}
interface GroupedTimeZones {
    name: string;
    zones: TimeZone[];
}
declare const getTimeZoneInfo: (zone: string, timestamp: number) => TimeZoneInfo | undefined;
declare const getTimeZones: ((includeInternal?: boolean | InternalTimeZones[]) => TimeZone[]) & lodash.MemoizedFunction;
declare const getTimeZoneGroups: ((includeInternal?: boolean | InternalTimeZones[]) => GroupedTimeZones[]) & lodash.MemoizedFunction;

interface SystemDateFormatSettings {
    fullDate: string;
    interval: {
        millisecond: string;
        second: string;
        minute: string;
        hour: string;
        day: string;
        month: string;
        year: string;
    };
    useBrowserLocale: boolean;
}
declare class SystemDateFormatsState {
    fullDate: string;
    fullDateMS: string;
    interval: {
        millisecond: string;
        second: string;
        minute: string;
        hour: string;
        day: string;
        month: string;
        year: string;
    };
    update(settings: SystemDateFormatSettings): void;
    useBrowserLocale(): void;
    getTimeFieldUnit(useMsResolution?: boolean): string;
}
/**
 * localTimeFormat helps to generate date formats for momentjs based on browser's locale
 *
 * @param locale browser locale, or default
 * @param options DateTimeFormatOptions to format date
 * @param fallback default format if Intl API is not present
 */
declare function localTimeFormat(options: Intl.DateTimeFormatOptions, locale?: string | string[] | null, fallback?: string): string;
declare const systemDateFormats: SystemDateFormatsState;

/**
 * Used for helper functions handling time zones.
 *
 * @public
 */
interface TimeZoneOptions {
    /**
     * Specify this if you want to override the timeZone used when parsing or formatting
     * a date and time value. If no timeZone is set, the default timeZone for the current
     * user is used.
     */
    timeZone?: TimeZone;
}
/**
 * The type describing date and time options. Used for all the helper functions
 * available to parse or format date and time values.
 *
 * @public
 */
interface DateTimeOptions extends TimeZoneOptions {
    /**
     * Specify a {@link https://momentjs.com/docs/#/displaying/format | momentjs} format to
     * use a custom formatting pattern or parsing pattern. If no format is set,
     * then system configured default format is used.
     */
    format?: string;
}
/**
 * The type to describe the time zone resolver function that will be used to access
 * the default time zone of a user.
 *
 * @public
 */
type TimeZoneResolver = () => TimeZone | undefined;
/**
 * Used by Grafana internals to set the {@link TimeZoneResolver} to access the current
 * user timeZone.
 *
 * @internal
 */
declare const setTimeZoneResolver: (resolver: TimeZoneResolver) => void;
/**
 * Used to get the current selected time zone. If a valid time zone is passed in the
 * options it will be returned. If no valid time zone is passed either the time zone
 * configured for the user account will be returned or the default for Grafana.
 *
 * @public
 */
declare const getTimeZone: <T extends TimeZoneOptions>(options?: T) => TimeZone;

/**
 * The type describing the options that can be passed to the {@link dateTimeFormat}
 * helper function to control how the date and time value passed to the function is
 * formatted.
 *
 * @public
 */
interface DateTimeOptionsWithFormat extends DateTimeOptions {
    /**
     * Set this value to `true` if you want to include milliseconds when formatting date and time
     */
    defaultWithMS?: boolean;
}
type DateTimeFormatter<T extends DateTimeOptions = DateTimeOptions> = (dateInUtc: DateTimeInput, options?: T) => string;
/**
 * Helper function to format date and time according to the specified options. If no options
 * are supplied, then default values are used. For more details, see {@link DateTimeOptionsWithFormat}.
 *
 * @param dateInUtc - date in UTC format, e.g. string formatted with UTC offset, UNIX epoch in seconds etc.
 * @param options
 *
 * @public
 */
declare const dateTimeFormat: DateTimeFormatter<DateTimeOptionsWithFormat>;
/**
 * Helper function to format date and time according to the standard ISO format e.g. 2013-02-04T22:44:30.652Z.
 * If no options are supplied, then default values are used. For more details, see {@link DateTimeOptionsWithFormat}.
 *
 * @param dateInUtc - date in UTC format, e.g. string formatted with UTC offset, UNIX epoch in seconds etc.
 * @param options
 *
 * @public
 */
declare const dateTimeFormatISO: DateTimeFormatter;
/**
 * Helper function to return elapsed time since passed date. The returned value will be formatted
 * in a human readable format e.g. 4 years ago. If no options are supplied, then default values are used.
 * For more details, see {@link DateTimeOptions}.
 *
 * @param dateInUtc - date in UTC format, e.g. string formatted with UTC offset, UNIX epoch in seconds etc.
 * @param options
 *
 * @public
 */
declare const dateTimeFormatTimeAgo: DateTimeFormatter;
/**
 * Helper function to format date and time according to the Grafana default formatting, but it
 * also appends the time zone abbreviation at the end e.g. 2020-05-20 13:37:00 CET. If no options
 * are supplied, then default values are used. For more details please see {@link DateTimeOptions}.
 *
 * @param dateInUtc - date in UTC format, e.g. string formatted with UTC offset, UNIX epoch in seconds etc.
 * @param options
 *
 * @public
 */
declare const dateTimeFormatWithAbbrevation: DateTimeFormatter;
/**
 * Helper function to return only the time zone abbreviation for a given date and time value. If no options
 * are supplied, then default values are used. For more details please see {@link DateTimeOptions}.
 *
 * @param dateInUtc - date in UTC format, e.g. string formatted with UTC offset, UNIX epoch in seconds etc.
 * @param options
 *
 * @public
 */
declare const timeZoneAbbrevation: DateTimeFormatter;

/**
 * The type that describes options that can be passed when parsing a date and time value.
 * @public
 */
interface DateTimeOptionsWhenParsing extends DateTimeOptions {
    /**
     * If the input is a Grafana quick date, e.g. now-6h, then you can specify this to control
     * whether the last part of the date and time value is included or excluded.
     *
     * Example: now-6h and the current time is 12:20:00 if roundUp is set to true
     * the returned DateTime value will be 06:00:00.
     */
    roundUp?: boolean;
    fiscalYearStartMonth?: number;
}
type DateTimeParser<T extends DateTimeOptions = DateTimeOptions> = (value: DateTimeInput, options?: T) => DateTime;
/**
 * Helper function to parse a number, text or Date to a DateTime value. If a timeZone is supplied the incoming value
 * is parsed with that timeZone as a base. The only exception to this is if the passed value is in a UTC-based
 * format. Then it will use UTC as the base. If no format is specified the current system format will be assumed.
 *
 * It can also parse the Grafana quick date and time format, e.g. now-6h will be parsed as Date.now() - 6 hours and
 * returned as a valid DateTime value.
 *
 * If no options are supplied, then default values are used. For more details please see {@link DateTimeOptions}.
 *
 * @param value - should be a parsable date and time value
 * @param options
 *
 * @public
 */
declare const dateTimeParse: DateTimeParser<DateTimeOptionsWhenParsing>;

/**
 * intervalToAbbreviatedDurationString converts interval to readable duration string
 *
 * @param interval - interval to convert
 * @param includeSeconds - optional, default true. If false, will not include seconds unless interval is less than 1 minute
 *
 * @public
 */
declare function intervalToAbbreviatedDurationString(interval: Interval, includeSeconds?: boolean): string;
/**
 * parseDuration parses duration string into datefns Duration object
 *
 * @param durationString - string to convert. For example '2m', '5h 20s'
 *
 * @public
 */
declare function parseDuration(durationString: string): Duration;
/**
 * addDurationToDate adds given duration to given date and returns a new Date object
 *
 * @param date - date to add to. Can be either Date object or a number (milliseconds since epoch)
 * @param duration - duration to add. For example '2m', '5h 20s'
 *
 * @public
 */
declare function addDurationToDate(date: Date | number, duration: Duration): Date;
/**
 * durationToMilliseconds convert a duration object to milliseconds
 *
 * @param duration - datefns Duration object
 *
 * @public
 */
declare function durationToMilliseconds(duration: Duration): number;
/**
 * isValidDate returns true if given string can be parsed into valid Date object, false otherwise
 *
 * @param dateString - string representation of a date
 *
 * @public
 */
declare function isValidDate(dateString: string): boolean;
/**
 * isValidDuration returns true if the given string can be parsed into a valid `date-fns` `Duration` object, false otherwise
 *
 * Valid time units are "y", "Y", "years", "M", "months", "w", "W", "weeks", "d", "D", "days", "h", "H", "hours", "m", "minutes", "s", "S", "seconds"
 *
 * @see https://date-fns.org/v2.30.0/docs/Duration
 * @param durationString - string representation of a duration
 *
 * @public
 */
declare function isValidDuration(durationString: string): boolean;
/**
 * isValidGoDuration returns true if the given string can be parsed into a valid Duration object based on
 * Go's time.parseDuration, false otherwise.
 *
 * Valid time units are "ns", "us" (or "µs"), "ms", "s", "m", "h".
 *
 * @see https://pkg.go.dev/time#ParseDuration
 *
 * @param durationString - string representation of a duration
 *
 * @internal
 */
declare function isValidGoDuration(durationString: string): boolean;
/**
 * isValidGrafanaDuration returns `true` if the given string can be parsed into a valid Duration object based on
 * the Grafana SDK's gtime.parseDuration, `false` otherwise.
 *
 * Valid time units are "ns", "us" (or "µs"), "ms", "s", "m", "h", "d", "w", "M", "y".
 *
 * @see https://pkg.go.dev/github.com/grafana/grafana-plugin-sdk-go/backend/gtime#ParseDuration
 *
 * @param durationString - string representation of a duration
 *
 * @internal
 */
declare function isValidGrafanaDuration(durationString: string): boolean;

/**
 * @alpha
 */
interface MapLayerHandler<TConfig = any> {
    init: () => BaseLayer;
    /**
     * The update function should only be implemented if the layer type makes use of query data
     */
    update?: (data: PanelData) => void;
    /** Optional callback for cleanup before getting removed */
    dispose?: () => void;
    /** return react node for the legend */
    legend?: ReactNode;
    /**
     * Show custom elements in the panel edit UI
     */
    registerOptionsUI?: (builder: PanelOptionsEditorBuilder<MapLayerOptions<TConfig>>, context: StandardEditorContext<any>) => void;
}
/**
 * Map layer configuration
 *
 * @alpha
 */
interface MapLayerRegistryItem<TConfig = MapLayerOptions> extends RegistryItemWithOptions {
    /**
     * This layer can be used as a background
     */
    isBaseMap?: boolean;
    /**
     * Show location controls
     */
    showLocation?: boolean;
    /**
     * Hide transparency controls in UI
     */
    hideOpacity?: boolean;
    /**
     * Function that configures transformation and returns a transformer
     * @param options
     */
    create: (map: Map, options: MapLayerOptions<TConfig>, eventBus: EventBus, theme: GrafanaTheme2) => Promise<MapLayerHandler>;
}

/**
 * Describes available feature toggles in Grafana. These can be configured via
 * conf/custom.ini to enable features under development or not yet available in
 * stable version.
 *
 * Only enabled values will be returned in this interface.
 *
 * NOTE: the possible values may change between versions without notice, although
 * this may cause compilation issues when depending on removed feature keys, the
 * runtime state will continue to work.
 *
 * @public
 */
interface FeatureToggles {
    disableEnvelopeEncryption?: boolean;
    ['live-service-web-worker']?: boolean;
    queryOverLive?: boolean;
    panelTitleSearch?: boolean;
    publicDashboards?: boolean;
    publicDashboardsEmailSharing?: boolean;
    publicDashboardsScene?: boolean;
    lokiExperimentalStreaming?: boolean;
    featureHighlights?: boolean;
    storage?: boolean;
    correlations?: boolean;
    exploreContentOutline?: boolean;
    datasourceQueryMultiStatus?: boolean;
    autoMigrateOldPanels?: boolean;
    autoMigrateGraphPanel?: boolean;
    autoMigrateTablePanel?: boolean;
    autoMigratePiechartPanel?: boolean;
    autoMigrateWorldmapPanel?: boolean;
    autoMigrateStatPanel?: boolean;
    autoMigrateXYChartPanel?: boolean;
    disableAngular?: boolean;
    canvasPanelNesting?: boolean;
    scenes?: boolean;
    disableSecretsCompatibility?: boolean;
    logRequestsInstrumentedAsUnknown?: boolean;
    topnav?: boolean;
    grpcServer?: boolean;
    unifiedStorage?: boolean;
    cloudWatchCrossAccountQuerying?: boolean;
    showDashboardValidationWarnings?: boolean;
    mysqlAnsiQuotes?: boolean;
    accessControlOnCall?: boolean;
    nestedFolders?: boolean;
    alertingBacktesting?: boolean;
    editPanelCSVDragAndDrop?: boolean;
    alertingNoNormalState?: boolean;
    logsContextDatasourceUi?: boolean;
    lokiQuerySplitting?: boolean;
    lokiQuerySplittingConfig?: boolean;
    individualCookiePreferences?: boolean;
    prometheusMetricEncyclopedia?: boolean;
    influxdbBackendMigration?: boolean;
    influxqlStreamingParser?: boolean;
    influxdbRunQueriesInParallel?: boolean;
    prometheusDataplane?: boolean;
    lokiMetricDataplane?: boolean;
    lokiLogsDataplane?: boolean;
    dataplaneFrontendFallback?: boolean;
    disableSSEDataplane?: boolean;
    alertStateHistoryLokiSecondary?: boolean;
    alertStateHistoryLokiPrimary?: boolean;
    alertStateHistoryLokiOnly?: boolean;
    unifiedRequestLog?: boolean;
    renderAuthJWT?: boolean;
    refactorVariablesTimeRange?: boolean;
    faroDatasourceSelector?: boolean;
    enableDatagridEditing?: boolean;
    extraThemes?: boolean;
    lokiPredefinedOperations?: boolean;
    pluginsFrontendSandbox?: boolean;
    frontendSandboxMonitorOnly?: boolean;
    sqlDatasourceDatabaseSelection?: boolean;
    recordedQueriesMulti?: boolean;
    vizAndWidgetSplit?: boolean;
    prometheusIncrementalQueryInstrumentation?: boolean;
    logsExploreTableVisualisation?: boolean;
    awsDatasourcesTempCredentials?: boolean;
    transformationsRedesign?: boolean;
    mlExpressions?: boolean;
    traceQLStreaming?: boolean;
    metricsSummary?: boolean;
    grafanaAPIServerWithExperimentalAPIs?: boolean;
    grafanaAPIServerEnsureKubectlAccess?: boolean;
    featureToggleAdminPage?: boolean;
    awsAsyncQueryCaching?: boolean;
    permissionsFilterRemoveSubquery?: boolean;
    prometheusConfigOverhaulAuth?: boolean;
    configurableSchedulerTick?: boolean;
    alertingNoDataErrorExecution?: boolean;
    angularDeprecationUI?: boolean;
    dashgpt?: boolean;
    aiGeneratedDashboardChanges?: boolean;
    reportingRetries?: boolean;
    sseGroupByDatasource?: boolean;
    libraryPanelRBAC?: boolean;
    lokiRunQueriesInParallel?: boolean;
    wargamesTesting?: boolean;
    alertingInsights?: boolean;
    externalCorePlugins?: boolean;
    pluginsAPIMetrics?: boolean;
    idForwarding?: boolean;
    externalServiceAccounts?: boolean;
    panelMonitoring?: boolean;
    enableNativeHTTPHistogram?: boolean;
    formatString?: boolean;
    transformationsVariableSupport?: boolean;
    kubernetesPlaylists?: boolean;
    kubernetesSnapshots?: boolean;
    kubernetesDashboards?: boolean;
    datasourceQueryTypes?: boolean;
    queryService?: boolean;
    queryServiceRewrite?: boolean;
    queryServiceFromUI?: boolean;
    cloudWatchBatchQueries?: boolean;
    recoveryThreshold?: boolean;
    lokiStructuredMetadata?: boolean;
    teamHttpHeaders?: boolean;
    awsDatasourcesNewFormStyling?: boolean;
    cachingOptimizeSerializationMemoryUsage?: boolean;
    panelTitleSearchInV1?: boolean;
    managedPluginsInstall?: boolean;
    prometheusPromQAIL?: boolean;
    prometheusCodeModeMetricNamesSearch?: boolean;
    addFieldFromCalculationStatFunctions?: boolean;
    alertmanagerRemoteSecondary?: boolean;
    alertmanagerRemotePrimary?: boolean;
    alertmanagerRemoteOnly?: boolean;
    annotationPermissionUpdate?: boolean;
    extractFieldsNameDeduplication?: boolean;
    dashboardSceneForViewers?: boolean;
    dashboardSceneSolo?: boolean;
    dashboardScene?: boolean;
    panelFilterVariable?: boolean;
    pdfTables?: boolean;
    ssoSettingsApi?: boolean;
    canvasPanelPanZoom?: boolean;
    logsInfiniteScrolling?: boolean;
    flameGraphItemCollapsing?: boolean;
    exploreMetrics?: boolean;
    alertingSimplifiedRouting?: boolean;
    logRowsPopoverMenu?: boolean;
    pluginsSkipHostEnvVars?: boolean;
    tableSharedCrosshair?: boolean;
    regressionTransformation?: boolean;
    lokiQueryHints?: boolean;
    kubernetesFeatureToggles?: boolean;
    cloudRBACRoles?: boolean;
    alertingQueryOptimization?: boolean;
    newFolderPicker?: boolean;
    jitterAlertRulesWithinGroups?: boolean;
    onPremToCloudMigrations?: boolean;
    alertingSaveStatePeriodic?: boolean;
    promQLScope?: boolean;
    sqlExpressions?: boolean;
    nodeGraphDotLayout?: boolean;
    groupToNestedTableTransformation?: boolean;
    newPDFRendering?: boolean;
    tlsMemcached?: boolean;
    kubernetesAggregator?: boolean;
    expressionParser?: boolean;
    groupByVariable?: boolean;
    betterPageScrolling?: boolean;
    authAPIAccessTokenAuth?: boolean;
    scopeFilters?: boolean;
    ssoSettingsSAML?: boolean;
    oauthRequireSubClaim?: boolean;
    newDashboardWithFiltersAndGroupBy?: boolean;
    cloudWatchNewLabelParsing?: boolean;
    accessActionSets?: boolean;
    disableNumericMetricsSortingInExpressions?: boolean;
    grafanaManagedRecordingRules?: boolean;
    queryLibrary?: boolean;
    autofixDSUID?: boolean;
    logsExploreTableDefaultVisualization?: boolean;
    newDashboardSharingComponent?: boolean;
    alertingListViewV2?: boolean;
    notificationBanner?: boolean;
    dashboardRestore?: boolean;
    datasourceProxyDisableRBAC?: boolean;
    alertingDisableSendAlertsExternal?: boolean;
    preserveDashboardStateWhenNavigating?: boolean;
    alertingCentralAlertHistory?: boolean;
    pluginProxyPreserveTrailingSlash?: boolean;
    azureMonitorPrometheusExemplars?: boolean;
    prometheusAzureOverrideAudience?: boolean;
}

/**
 * Describes the build information that will be available via the Grafana configuration.
 *
 * @public
 */
interface BuildInfo {
    version: string;
    versionString: string;
    commit: string;
    env: string;
    edition: GrafanaEdition;
    latestVersion: string;
    hasUpdate: boolean;
    hideVersion: boolean;
}
/**
 * @internal
 */
declare enum GrafanaEdition {
    OpenSource = "Open Source",
    Pro = "Pro",
    Enterprise = "Enterprise"
}
/**
 * Describes the license information about the current running instance of Grafana.
 *
 * @public
 */
interface LicenseInfo {
    expiry: number;
    licenseUrl: string;
    stateInfo: string;
    edition: GrafanaEdition;
    enabledFeatures: {
        [key: string]: boolean;
    };
    trialExpiry?: number;
}
/**
 * Describes GrafanaJavascriptAgentConfig integration config
 *
 * @public
 */
interface GrafanaJavascriptAgentConfig {
    enabled: boolean;
    customEndpoint: string;
    errorInstrumentalizationEnabled: boolean;
    consoleInstrumentalizationEnabled: boolean;
    webVitalsInstrumentalizationEnabled: boolean;
    apiKey: string;
}
interface UnifiedAlertingConfig {
    minInterval: string;
    alertStateHistoryBackend?: string;
    alertStateHistoryPrimary?: string;
}
/** Supported OAuth services
 *
 * @public
 */
type OAuth = 'github' | 'gitlab' | 'google' | 'generic_oauth' | 'grafana_com' | 'azuread' | 'okta';
/** Map of enabled OAuth services and their respective names
 *
 * @public
 */
type OAuthSettings = Partial<Record<OAuth, {
    name: string;
    icon?: IconName;
}>>;
/**
 * Information needed for analytics providers
 *
 * @internal
 */
interface AnalyticsSettings {
    identifier: string;
    intercomIdentifier?: string;
}
/** Current user info included in bootData
 *
 * @internal
 */
interface CurrentUserDTO {
    isSignedIn: boolean;
    id: number;
    uid: string;
    externalUserId: string;
    login: string;
    email: string;
    name: string;
    theme: string;
    orgCount: number;
    orgId: number;
    orgName: string;
    orgRole: OrgRole | '';
    isGrafanaAdmin: boolean;
    gravatarUrl: string;
    timezone: string;
    weekStart: string;
    locale: string;
    language: string;
    permissions?: Record<string, boolean>;
    analytics: AnalyticsSettings;
    authenticatedBy: string;
    /** @deprecated Use theme instead */
    lightTheme: boolean;
}
/** Contains essential user and config info
 *
 * @internal
 */
interface BootData {
    user: CurrentUserDTO;
    settings: GrafanaConfig;
    navTree: NavLinkDTO[];
    assets: {
        light: string;
        dark: string;
    };
}
/**
 * Describes all the different Grafana configuration values available for an instance.
 *
 * @internal
 */
interface GrafanaConfig {
    publicDashboardAccessToken?: string;
    publicDashboardsEnabled: boolean;
    snapshotEnabled: boolean;
    datasources: {
        [str: string]: DataSourceInstanceSettings;
    };
    panels: {
        [key: string]: PanelPluginMeta;
    };
    auth: AuthSettings;
    minRefreshInterval: string;
    appSubUrl: string;
    windowTitlePrefix: string;
    buildInfo: BuildInfo;
    newPanelTitle: string;
    bootData: BootData;
    externalUserMngLinkUrl: string;
    externalUserMngLinkName: string;
    externalUserMngInfo: string;
    allowOrgCreate: boolean;
    disableLoginForm: boolean;
    defaultDatasource: string;
    authProxyEnabled: boolean;
    exploreEnabled: boolean;
    queryHistoryEnabled: boolean;
    helpEnabled: boolean;
    profileEnabled: boolean;
    newsFeedEnabled: boolean;
    ldapEnabled: boolean;
    sigV4AuthEnabled: boolean;
    azureAuthEnabled: boolean;
    samlEnabled: boolean;
    autoAssignOrg: boolean;
    verifyEmailEnabled: boolean;
    oauth: OAuthSettings;
    /** @deprecated always set to true. */
    rbacEnabled: boolean;
    disableUserSignUp: boolean;
    loginHint: string;
    passwordHint: string;
    loginError?: string;
    viewersCanEdit: boolean;
    editorsCanAdmin: boolean;
    disableSanitizeHtml: boolean;
    trustedTypesDefaultPolicyEnabled: boolean;
    cspReportOnlyEnabled: boolean;
    liveEnabled: boolean;
    /** @deprecated Use `theme2` instead. */
    theme: GrafanaTheme;
    theme2: GrafanaTheme2;
    anonymousEnabled: boolean;
    anonymousDeviceLimit: number | undefined;
    featureToggles: FeatureToggles;
    licenseInfo: LicenseInfo;
    http2Enabled: boolean;
    dateFormats?: SystemDateFormatSettings;
    grafanaJavascriptAgent: GrafanaJavascriptAgentConfig;
    customTheme?: any;
    geomapDefaultBaseLayer?: MapLayerOptions;
    geomapDisableCustomBaseLayer?: boolean;
    unifiedAlertingEnabled: boolean;
    unifiedAlerting: UnifiedAlertingConfig;
    angularSupportEnabled: boolean;
    feedbackLinksEnabled: boolean;
    secretsManagerPluginEnabled: boolean;
    supportBundlesEnabled: boolean;
    secureSocksDSProxyEnabled: boolean;
    googleAnalyticsId: string | undefined;
    googleAnalytics4Id: string | undefined;
    googleAnalytics4SendManualPageViews: boolean;
    rudderstackWriteKey: string | undefined;
    rudderstackDataPlaneUrl: string | undefined;
    rudderstackSdkUrl: string | undefined;
    rudderstackConfigUrl: string | undefined;
    rudderstackIntegrationsUrl: string | undefined;
    sqlConnectionLimits: SqlConnectionLimits;
    sharedWithMeFolderUID?: string;
    rootFolderUID?: string;
    localFileSystemAvailable?: boolean;
    cloudMigrationIsTarget?: boolean;
    listDashboardScopesEndpoint?: string;
    listScopesEndpoint?: string;
    namespace: string;
    /**
     * Language used in Grafana's UI. This is after the user's preference (or deteceted locale) is resolved to one of
     * Grafana's supported language.
     */
    language: string | undefined;
}
interface SqlConnectionLimits {
    maxOpenConns: number;
    maxIdleConns: number;
    connMaxLifetime: number;
}
interface AuthSettings {
    AuthProxyEnableLoginToken?: boolean;
    OAuthSkipOrgRoleUpdateSync?: boolean;
    SAMLSkipOrgRoleSync?: boolean;
    LDAPSkipOrgRoleSync?: boolean;
    JWTAuthSkipOrgRoleSync?: boolean;
    GrafanaComSkipOrgRoleSync?: boolean;
    GithubSkipOrgRoleSync?: boolean;
    GitLabSkipOrgRoleSync?: boolean;
    OktaSkipOrgRoleSync?: boolean;
    AzureADSkipOrgRoleSync?: boolean;
    GoogleSkipOrgRoleSync?: boolean;
    GenericOAuthSkipOrgRoleSync?: boolean;
    disableLogin?: boolean;
    basicAuthStrongPasswordPolicy?: boolean;
}

type SliderMarks = Record<number, React.ReactNode | {
    style?: React.CSSProperties;
    label?: string;
}>;

/**
 * With RBAC, the backend will return additional access control metadata to objects.
 * These metadata will contain user permissions associated to a given resource.
 *
 * For example:
 * {
 *   accessControl: { "datasources:read": true, "datasources:write": true }
 * }
 */
interface WithAccessControlMetadata {
    accessControl?: Record<string, boolean>;
}

interface ScopeDashboardBindingSpec {
    dashboard: string;
    dashboardTitle: string;
    scope: string;
}
interface ScopeDashboardBinding {
    metadata: {
        name: string;
    };
    spec: ScopeDashboardBindingSpec;
}
type ScopeFilterOperator = 'equals' | 'not-equals' | 'regex-match' | 'regex-not-match';
declare const scopeFilterOperatorMap: Record<string, ScopeFilterOperator>;
interface ScopeSpecFilter {
    key: string;
    value: string;
    operator: ScopeFilterOperator;
}
interface ScopeSpec {
    title: string;
    type: string;
    description: string;
    category: string;
    filters: ScopeSpecFilter[];
}
interface Scope {
    metadata: {
        name: string;
    };
    spec: ScopeSpec;
}
type ScopeNodeNodeType = 'container' | 'leaf';
type ScopeNodeLinkType = 'scope';
interface ScopeNodeSpec {
    nodeType: ScopeNodeNodeType;
    title: string;
    description?: string;
    disableMultiSelect?: boolean;
    linkId?: string;
    linkType?: ScopeNodeLinkType;
}
interface ScopeNode {
    metadata: {
        name: string;
    };
    spec: ScopeNodeSpec;
}

interface RegistryItem {
    id: string;
    name: string;
    description?: string;
    aliasIds?: string[];
    /**
     * Some extensions should not be user selectable
     *  like: 'all' and 'any' matchers;
     */
    excludeFromPicker?: boolean;
    /**
     * Optional feature state
     */
    state?: PluginState;
}
interface RegistryItemWithOptions<TOptions = any> extends RegistryItem {
    /**
     * Convert the options to a string
     */
    getOptionsDisplayText?: (options: TOptions) => string;
    /**
     * Default options used if nothing else is specified
     */
    defaultOptions?: TOptions;
}
interface RegistrySelectInfo {
    options: Array<SelectableValue<string>>;
    current: Array<SelectableValue<string>>;
}
declare class Registry<T extends RegistryItem> {
    private init?;
    private ordered;
    private byId;
    private initialized;
    constructor(init?: (() => T[]) | undefined);
    setInit: (init: () => T[]) => void;
    getIfExists(id: string | undefined): T | undefined;
    private initialize;
    get(id: string): T;
    selectOptions(current?: string[], filter?: (ext: T) => boolean): RegistrySelectInfo;
    /**
     * Return a list of values by ID, or all values if not specified
     */
    list(ids?: string[]): T[];
    isEmpty(): boolean;
    register(ext: T): void;
    private sort;
}

/**
 * Convert instance settings to a reference
 *
 * @public
 */
declare function getDataSourceRef(ds: DataSourceInstanceSettings): DataSourceRef;
/**
 * Returns true if the argument is a DataSourceRef
 *
 * @public
 */
declare function isDataSourceRef(ref: DataSourceRef | string | null | undefined): ref is DataSourceRef;
/**
 * Get the UID from a string of reference
 *
 * @public
 */
declare function getDataSourceUID(ref: DataSourceRef | string | null): string | undefined;
declare const onUpdateDatasourceOption: (props: DataSourcePluginOptionsEditorProps, key: keyof DataSourceSettings) => (event: React.SyntheticEvent<HTMLInputElement | HTMLSelectElement>) => void;
declare const onUpdateDatasourceJsonDataOption: <J extends DataSourceJsonData, S, K extends keyof J>(props: DataSourcePluginOptionsEditorProps<J, S>, key: K) => (event: React.SyntheticEvent<HTMLInputElement | HTMLSelectElement>) => void;
declare const onUpdateDatasourceSecureJsonDataOption: <J extends DataSourceJsonData, S extends {} = KeyValue>(props: DataSourcePluginOptionsEditorProps<J, S>, key: string) => (event: React.SyntheticEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
declare const onUpdateDatasourceJsonDataOptionSelect: <J extends DataSourceJsonData, S, K extends keyof J>(props: DataSourcePluginOptionsEditorProps<J, S>, key: K) => (selected: SelectableValue) => void;
declare const onUpdateDatasourceJsonDataOptionChecked: <J extends DataSourceJsonData, S, K extends keyof J>(props: DataSourcePluginOptionsEditorProps<J, S>, key: K) => (event: React.SyntheticEvent<HTMLInputElement>) => void;
declare const onUpdateDatasourceSecureJsonDataOptionSelect: <J extends DataSourceJsonData, S extends {} = KeyValue>(props: DataSourcePluginOptionsEditorProps<J, S>, key: string) => (selected: SelectableValue) => void;
declare const onUpdateDatasourceResetOption: (props: DataSourcePluginOptionsEditorProps, key: string) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
declare function updateDatasourcePluginOption<J extends DataSourceJsonData, S extends {} = KeyValue>(props: DataSourcePluginOptionsEditorProps<J, S>, key: keyof DataSourceSettings, val: unknown): void;
declare const updateDatasourcePluginJsonDataOption: <J extends DataSourceJsonData, S, K extends keyof J>(props: DataSourcePluginOptionsEditorProps<J, S>, key: K, val: unknown) => void;
declare const updateDatasourcePluginSecureJsonDataOption: <J extends DataSourceJsonData, S extends {} = KeyValue>(props: DataSourcePluginOptionsEditorProps<J, S>, key: string, val: unknown) => void;
declare const updateDatasourcePluginResetOption: <J extends DataSourceJsonData, S extends {} = KeyValue>(props: DataSourcePluginOptionsEditorProps<J, S>, key: string) => void;

declare const deprecationWarning: (file: string, oldName: string, newName?: string) => void;

/** @deprecated */
type MutableField<T = any> = Field<T>;
/** @deprecated */
type MutableVectorCreator = (buffer?: unknown[]) => unknown[];
declare const MISSING_VALUE: undefined;
/**
 * MutableDataFrame is a complex wrapper around the DataFrame interface
 *
 * @deprecated use standard DataFrame, or create one with PartialDataFrame
 */
declare class MutableDataFrame<T = any> extends FunctionalVector<T> implements DataFrame {
    name?: string;
    refId?: string;
    meta?: QueryResultMeta;
    fields: MutableField[];
    private first;
    private creator;
    constructor(source?: DataFrame | DataFrameDTO, creator?: MutableVectorCreator);
    get length(): number;
    addFieldFor(value: unknown, name?: string): Field;
    addField(f: Field | FieldDTO, startLength?: number): Field;
    validate(): void;
    private parsers;
    /**
     * @deprecated unclear if this is actually used
     */
    setParser(field: Field, parser: (v: string) => any): (v: string) => any;
    private parseValue;
    /**
     * This will add each value to the corresponding column
     */
    appendRow(row: unknown[]): void;
    /** support standard array push syntax */
    push(...vals: T[]): number;
    reverse(): this;
    /**
     * Add values from an object to corresponding fields. Similar to appendRow but does not create new fields.
     */
    add(value: T): void;
    set(index: number, value: T): void;
    /**
     * Get an object with a property for each field in the DataFrame
     */
    get(idx: number): T;
    /**
     * The simplified JSON values used in JSON.stringify()
     */
    toJSON(): DataFrameDTO;
}

declare enum CSVHeaderStyle {
    full = 0,
    name = 1,
    none = 2
}
interface CSVConfig {
    delimiter?: string;
    newline?: string;
    quoteChar?: string;
    encoding?: string;
    useExcelHeader?: boolean;
    headerStyle?: CSVHeaderStyle;
}
interface CSVParseCallbacks {
    /**
     * Get a callback before any rows are processed
     * This can return a modified table to force any
     * Column configurations
     */
    onHeader: (fields: Field[]) => void;
    onRow: (row: string[]) => void;
}
interface CSVOptions {
    config?: CSVConfig;
    callback?: CSVParseCallbacks;
}
declare function readCSV(csv: string, options?: CSVOptions): DataFrame[];
declare enum ParseState {
    Starting = 0,
    InHeader = 1,
    ReadingRows = 2
}
declare class CSVReader {
    config: CSVConfig;
    callback?: CSVParseCallbacks;
    state: ParseState;
    data: MutableDataFrame[];
    current: MutableDataFrame;
    constructor(options?: CSVOptions);
    private chunk;
    readCSV(text: string): MutableDataFrame[];
}
declare function toCSV(data: DataFrame[], config?: CSVConfig): string;

/**
 * Returns a map of label keys to value from an input selector string.
 *
 * Example: `parseLabels('{job="foo", instance="bar"}) // {job: "foo", instance: "bar"}`
 */
declare function parseLabels(labels: string): Labels;
/**
 * Returns a map labels that are common to the given label sets.
 */
declare function findCommonLabels(labelsSets: Labels[]): Labels;
/**
 * Returns a map of labels that are in `labels`, but not in `commonLabels`.
 */
declare function findUniqueLabels(labels: Labels | undefined, commonLabels: Labels): Labels;
/**
 * Check that all labels exist in another set of labels
 */
declare function matchAllLabels(expect: Labels, against?: Labels): boolean;
/**
 * Serializes the given labels to a string.
 */
declare function formatLabels(labels: Labels, defaultValue?: string, withoutBraces?: boolean): string;

/**
 * Round half away from zero ('commercial' rounding)
 * Uses correction to offset floating-point inaccuracies.
 * Works symmetrically for positive and negative numbers.
 *
 * ref: https://stackoverflow.com/a/48764436
 */
declare function roundDecimals(val: number, dec?: number): number;
/**
 * Tries to guess number of decimals needed to format a number
 *
 * used for determining minimum decimals required to uniformly
 * format a numric sequence, e.g. 10, 10.125, 10.25, 10.5
 *
 * good for precisce increments:  0.125            -> 3
 * bad  for arbitrary floats:     371.499999999999 -> 12
 */
declare function guessDecimals(num: number): number;

declare const objRemoveUndefined: (obj: {
    [key: string]: unknown;
}) => {
    [key: string]: unknown;
};
declare const isEmptyObject: (value: unknown) => value is Record<string, never>;

declare const classicColors: string[];

/**
 * Returns minimal time step from series time field
 * @param timeField
 */
declare const getSeriesTimeStep: (timeField: Field) => number;
/**
 * Checks if series time field has ms resolution
 * @param timeField
 */
declare const hasMsResolution: (timeField: Field) => boolean;

declare enum BinaryOperationID {
    Add = "+",
    Subtract = "-",
    Divide = "/",
    Multiply = "*"
}
type BinaryOperation = (left: number, right: number) => number;
interface BinaryOperatorInfo extends RegistryItem {
    operation: BinaryOperation;
    binaryOperationID: BinaryOperationID;
}
declare const binaryOperators: Registry<BinaryOperatorInfo>;

declare enum UnaryOperationID {
    Abs = "abs",
    Exp = "exp",
    Ln = "ln",
    Floor = "floor",
    Ceil = "ceil"
}
type UnaryOperation = (value: number) => number;
interface UnaryOperatorInfo extends RegistryItem {
    operation: UnaryOperation;
    unaryOperationID: UnaryOperationID;
}
declare const unaryOperators: Registry<UnaryOperatorInfo>;

declare enum NodeGraphDataFrameFieldNames {
    id = "id",
    title = "title",
    subTitle = "subtitle",
    mainStat = "mainstat",
    secondaryStat = "secondarystat",
    arc = "arc__",
    icon = "icon",
    color = "color",
    source = "source",
    target = "target",
    detail = "detail__",
    nodeRadius = "noderadius",
    thickness = "thickness",
    highlighted = "highlighted",
    strokeDasharray = "strokedasharray",
    fixedX = "fixedx",
    fixedY = "fixedy"
}

declare const toOption: (value: string) => SelectableValue<string>;

interface FlotPairsOptions {
    xField: Field;
    yField: Field;
    nullValueMode?: NullValueMode;
}
declare function getFlotPairs({ xField, yField, nullValueMode }: FlotPairsOptions): GraphSeriesValue[][];
/**
 * Returns a constant series based on the first value from the provide series.
 * @param seriesData Series
 * @param range Start and end time for the constant series
 */
declare function getFlotPairsConstant(seriesData: GraphSeriesValue[][], range: TimeRange): GraphSeriesValue[][];

/**
 * @preserve jquery-param (c) 2015 KNOWLEDGECODE | MIT
 */

/**
 * Type to represent the value of a single query variable.
 *
 * @public
 */
type UrlQueryValue = string | number | boolean | string[] | number[] | boolean[] | undefined | null;
/**
 * Type to represent the values parsed from the query string.
 *
 * @public
 */
type UrlQueryMap = Record<string, UrlQueryValue>;
declare function renderUrl(path: string, query: UrlQueryMap | undefined): string;
/**
 *  Encodes URL parameters in the style of AngularJS.
 *  Use `serializeParams` to encode parameters using `encodeURIComponent` instead.
 */
declare function toUrlParams(a: any, encodeAsAngularJS?: boolean): string;
/**
 * Converts params into a URL-encoded query string.
 *
 * @param params data to serialize
 * @returns A URL-encoded string representing the provided data.
 */
declare function serializeParams(params: unknown): string;
declare function appendQueryToUrl(url: string, stringToAppend: string): string;
/**
 * Return search part (as object) of current url
 */
declare function getUrlSearchParams(): UrlQueryMap;
/**
 * Parses an escaped url query string into key-value pairs.
 * Attribution: Code dervived from https://github.com/angular/angular.js/master/src/Angular.js#L1396
 * @returns {Object.<string,boolean|Array>}
 */
declare function parseKeyValue(keyValue: string): any;
declare const urlUtil: {
    renderUrl: typeof renderUrl;
    toUrlParams: typeof toUrlParams;
    appendQueryToUrl: typeof appendQueryToUrl;
    getUrlSearchParams: typeof getUrlSearchParams;
    parseKeyValue: typeof parseKeyValue;
    serializeParams: typeof serializeParams;
};
/**
 * Create an string that is used in URL to represent the Explore state. This is basically just a stringified json
 * that is used as a state of a single Explore pane so it does not represent full Explore URL so some properties
 * may be omitted (they will be filled in with default values).
 *
 * @param urlState
 * @param compact this parameter is deprecated and will be removed in a future release.
 */
declare function serializeStateToUrlParam(urlState: Partial<ExploreUrlState>, compact?: boolean): string;
/**
 * Converts RawTimeRange to a string that is stored in the URL
 * - relative - stays as it is (e.g. "now")
 * - absolute - converted to ms
 */
declare const toURLRange: (range: RawTimeRange) => URLRange;

interface LocationUtilDependencies {
    config: GrafanaConfig;
    getTimeRangeForUrl: () => RawTimeRange;
    getVariablesUrlParams: (scopedVars?: ScopedVars) => UrlQueryMap;
}
declare const locationUtil: {
    /**
     *
     * @param getConfig
     * @param getAllVariableValuesForUrl
     * @param getTimeRangeForUrl
     * @internal
     */
    initialize: (dependencies: LocationUtilDependencies) => void;
    stripBaseFromUrl: (urlOrPath: string) => string;
    assureBaseUrl: (url: string) => string;
    updateSearchParams: (init: string, partial: string) => string;
    getTimeRangeUrlParams: () => string | null;
    getVariablesUrlParams: (scopedVars?: ScopedVars) => string | null;
    getUrlForPartial: (location: Location, searchParamsToUpdate: UrlQueryMap) => string;
    processUrl: (url: string) => string;
};

declare const DataLinkBuiltInVars: {
    keepTime: string;
    timeRangeFrom: string;
    timeRangeTo: string;
    includeVars: string;
    seriesName: string;
    fieldName: string;
    valueTime: string;
    valueNumeric: string;
    valueText: string;
    valueRaw: string;
    valueCalc: string;
};
type LinkToExploreOptions = {
    link: DataLink;
    scopedVars: ScopedVars;
    range?: TimeRange;
    field: Field;
    internalLink: InternalDataLink;
    onClickFn?: SplitOpen;
    replaceVariables: InterpolateFunction;
};
declare function mapInternalLinkToExplore(options: LinkToExploreOptions): LinkModel<Field>;

/**
 * Enumeration of documentation topics
 * @internal
 */
declare enum DocsId {
    Transformations = 0,
    FieldConfig = 1,
    FieldConfigOverrides = 2
}

/**
 * @beta
 * Proxies a ES6 class so that it can be used as a base class for an ES5 class
 */
declare function makeClassES5Compatible<T extends abstract new (...args: ConstructorParameters<T>) => InstanceType<T>>(ES6Class: T): T;

/**
 * Will return any value as a number or NaN
 *
 * @internal
 * */
declare function anyToNumber(value: unknown): number;

/**
 * @internal
 */
type WithLoadingIndicatorOptions<T> = {
    whileLoading: T;
    source: Observable<T>;
};
/**
 * @internal
 */
declare function withLoadingIndicator<T>({ whileLoading, source }: WithLoadingIndicatorOptions<T>): Observable<T>;

/**
 * @deprecated use MappingType instead
 * @internal
 */
declare enum LegacyMappingType {
    ValueToText = 1,
    RangeToText = 2
}
/**
 * @alpha
 * Converts the old Angular value mappings to new react style
 */
declare function convertOldAngularValueMappings(panel: any, migratedThresholds?: ThresholdsConfig): ValueMapping[];

declare const containsSearchFilter: (query: string | unknown) => boolean;
interface SearchFilterOptions {
    searchFilter?: string;
}
declare const getSearchFilterScopedVar: (args: {
    query: string;
    wildcardChar: string;
    options?: SearchFilterOptions;
}) => ScopedVars;

/** replace labels in a string.  Used for loki+prometheus legend formats */
declare function renderLegendFormat(aliasPattern: string, aliasData: Labels): string;

declare function matchPluginId(idToMatch: string, pluginMeta: PluginMeta): boolean;

interface FieldWithIndex extends Field {
    index: number;
}
declare class FieldCache {
    fields: FieldWithIndex[];
    private fieldByName;
    private fieldByType;
    constructor(data: DataFrame);
    getFields(type?: FieldType): FieldWithIndex[];
    hasFieldOfType(type: FieldType): boolean;
    getFirstFieldOfType(type: FieldType, includeHidden?: boolean): FieldWithIndex | undefined;
    hasFieldNamed(name: string): boolean;
    hasFieldWithNameAndType(name: string, type: FieldType): boolean;
    /**
     * Returns the first field with the given name.
     */
    getFieldByName(name: string): FieldWithIndex | undefined;
    /**
     * Returns the fields with the given label.
     */
    getFieldsByLabel(label: string, value: string): FieldWithIndex[];
}

/**
 * Given a name and value, this will pick a reasonable field type
 */
declare function guessFieldTypeFromNameAndValue(name: string, v: unknown): FieldType;
/**
 * Check the field type to see what the contents are
 */
declare function getFieldTypeFromValue(v: unknown): FieldType;
/**
 * Given a value this will guess the best column type
 *
 * NOTE: this is will try to see if string values can be mapped to other types (like number)
 */
declare function guessFieldTypeFromValue(v: unknown): FieldType;
/**
 * Looks at the data to guess the column type.  This ignores any existing setting
 */
declare function guessFieldTypeForField(field: Field): FieldType | undefined;
/**
 * @returns A copy of the series with the best guess for each field type.
 * If the series already has field types defined, they will be used, unless `guessDefined` is true.
 * @param series The DataFrame whose field's types should be guessed
 * @param guessDefined Whether to guess types of fields with already defined types
 */
declare const guessFieldTypes: (series: DataFrame, guessDefined?: boolean) => DataFrame;
declare const isTableData: (data: unknown) => data is DataFrame;
declare const isDataFrame: (data: unknown) => data is DataFrame;
declare const isDataFrameWithValue: (data: unknown) => data is DataFrameWithValue;
/**
 * Inspect any object and return the results as a DataFrame
 */
declare function toDataFrame(data: any): DataFrame;
declare const toLegacyResponseData: (frame: DataFrame) => TimeSeries | TableData;
declare function sortDataFrame(data: DataFrame, sortIndex?: number, reverse?: boolean): DataFrame;
/**
 * Returns a copy with all values reversed
 */
declare function reverseDataFrame(data: DataFrame): DataFrame;
/**
 * Wrapper to get an array from each field value
 */
declare function getDataFrameRow(data: DataFrame, row: number): unknown[];
/**
 * Returns a copy that does not include functions
 */
declare function toDataFrameDTO(data: DataFrame): DataFrameDTO;
declare function toFilteredDataFrameDTO(data: DataFrame, fieldPredicate?: (f: Field) => boolean): DataFrameDTO;
declare const getTimeField: (series: DataFrame) => {
    timeField?: Field;
    timeIndex?: number;
};
/**
 * Given data request results, will return data frames with field types set
 *
 * This is also used by PanelChrome for snapshot support
 */
declare function getProcessedDataFrames(results?: DataQueryResponseData[]): DataFrame[];
/**
 * Will process the panel data frames and in case of loading state with no data, will return the last result data but with loading state
 * This is to have panels not flicker temporarily with "no data" while loading
 */
declare function preProcessPanelData(data: PanelData, lastResult?: PanelData): PanelData;
interface PartialDataFrame extends Omit<DataFrame, 'fields' | 'length'> {
    fields: Array<Partial<Field>>;
}
declare function createDataFrame(input: PartialDataFrame): DataFrame;

interface Dimension<T = any> {
    name: string;
    columns: Array<Field<T>>;
}
type Dimensions = KeyValue<Dimension>;
declare const createDimension: (name: string, columns: Field[]) => Dimension;
declare const getColumnsFromDimension: (dimension: Dimension) => Field<any>[];
declare const getColumnFromDimension: (dimension: Dimension, column: number) => Field<any>;
declare const getValueFromDimension: (dimension: Dimension, column: number, row: number) => any;
declare const getAllValuesFromDimension: (dimension: Dimension, column: number, row: number) => any[];
declare const getDimensionByName: (dimensions: Dimensions, name: string) => Dimension<any>;

/**
 * The ArrayDataFrame takes an array of objects and presents it as a DataFrame
 *
 * @deprecated use arrayToDataFrame
 */
declare class ArrayDataFrame<T = any> implements DataFrame {
    fields: Field[];
    length: number;
    name?: string;
    refId?: string;
    meta?: QueryResultMeta;
    constructor(source: T[], names?: string[]);
}
/**
 * arrayToDataFrame will convert any array into a DataFrame.
 * @param source - can be an array of objects or an array of simple values.
 * @param names - will be used for ordering of fields. Source needs to be array of objects if names are provided.
 *
 * @public
 */
declare function arrayToDataFrame(source: Array<Record<string, unknown>> | unknown[], names?: string[]): DataFrame;

/**
 * The JSON transfer object for DataFrames.  Values are stored in simple JSON
 *
 * @alpha
 */
interface DataFrameJSON {
    /**
     * The schema defines the field type and configuration.
     */
    schema?: DataFrameSchema;
    /**
     * The field data
     */
    data?: DataFrameData;
}
type FieldValues = unknown[];
/**
 * @alpha
 */
interface DataFrameData {
    /**
     * A columnar store that matches fields defined by schema.
     */
    values: FieldValues[];
    /**
     * Since JSON cannot encode NaN, Inf, -Inf, and undefined, these entities
     * are decoded after JSON.parse() using this struct
     */
    entities?: Array<FieldValueEntityLookup | null>;
    /**
     * Holds value bases per field so we can encode numbers from fixed points
     * e.g. [1612900958, 1612900959, 1612900960] -> 1612900958 + [0, 1, 2]
     */
    bases?: number[];
    /**
     * Holds value multipliers per field so we can encode large numbers concisely
     * e.g. [4900000000, 35000000000] -> 1e9 + [4.9, 35]
     */
    factors?: number[];
    /**
     * Holds enums per field so we can encode recurring string values as ints
     * e.g. ["foo", "foo", "baz", "foo"] -> ["foo", "baz"] + [0,0,1,0]
     *
     * NOTE: currently only decoding is implemented
     */
    enums?: Array<string[] | null>;
    /**
     * Holds integers between 0 and 999999, used by time-fields
     * to store the nanosecond-precision that cannot be represented
     * by the millisecond-based base value.
     */
    nanos?: Array<number[] | null>;
}
/**
 * The JSON transfer object for DataFrames.  Values are stored in simple JSON
 *
 * @alpha
 */
interface DataFrameSchema {
    /**
     * Matches the query target refId
     */
    refId?: string;
    /**
     * Initial response global metadata
     */
    meta?: QueryResultMeta;
    /**
     * Frame name
     */
    name?: string;
    /**
     * Field definition without any metadata
     */
    fields: FieldSchema[];
}
/**
 * Field object passed over JSON
 *
 * @alpha
 */
interface FieldSchema {
    name: string;
    type?: FieldType;
    config?: FieldConfig;
    labels?: Labels;
}
/**
 * Since JSON cannot encode NaN, Inf, -Inf, and undefined, the locations
 * of these entities in field value arrays are stored here for restoration
 * after JSON.parse()
 *
 * @alpha
 */
interface FieldValueEntityLookup {
    NaN?: number[];
    Undef?: number[];
    Inf?: number[];
    NegInf?: number[];
}
/**
 * @internal use locally
 */
declare function decodeFieldValueEntities(lookup: FieldValueEntityLookup, values: FieldValues): void;
/**
 * @internal use locally
 */
declare function decodeFieldValueEnums(lookup: string[], values: FieldValues): void;
/**
 * NOTE: dto.data.values will be mutated and decoded/inflated using entities,bases,factors,enums
 *
 * @alpha
 */
declare function dataFrameFromJSON(dto: DataFrameJSON): DataFrame;
/**
 * This converts DataFrame to a json representation with distinct schema+data
 *
 * @alpha
 */
declare function dataFrameToJSON(frame: DataFrame): DataFrameJSON;

/**
 * Returns true if both frames have the same name, fields, labels and configs.
 *
 * @example
 * To compare multiple frames use:
 * ```
 * compareArrayValues(a, b, framesHaveSameStructure);
 * ```
 * @beta
 */
declare function compareDataFrameStructures(a: DataFrame, b: DataFrame, skipConfig?: boolean): boolean;
/**
 * Check if all values in two arrays match the compare function
 *
 * @beta
 */
declare function compareArrayValues<T>(a: T[], b: T[], cmp: (a: T, b: T) => boolean): boolean;
type Cmp = (valA: unknown, valB: unknown) => boolean;
/**
 * Checks if two objects are equal shallowly
 *
 * @beta
 */
declare function shallowCompare<T extends {}>(a: T, b: T, cmp?: Cmp): boolean;

declare function isTimeSeriesFrame(frame: DataFrame): boolean;
declare function isTimeSeriesFrames(data: DataFrame[]): boolean;
/**
 * Determines if a field is a time field in ascending
 * order within the sampling range specified by
 * MAX_TIME_COMPARISONS
 *
 * @param field
 * @returns boolean
 */
declare function isTimeSeriesField(field: Field): boolean;
/**
 * Indicates if there is any time field in the array of data frames
 * @param data
 */
declare function anySeriesWithTimeField(data: DataFrame[]): boolean;
/**
 * Indicates if there is any time field in the data frame
 * @param data
 */
declare function hasTimeField(data: DataFrame): boolean;
/**
 * Get row id based on the meta.uniqueRowIdFields attribute.
 * @param dataFrame
 * @param rowIndex
 */
declare function getRowUniqueId(dataFrame: DataFrame, rowIndex: number): string | undefined;
/**
 * Simple helper to add values to a data frame. Doesn't do any validation so make sure you are adding the right types
 * of values.
 * @param dataFrame
 * @param row Either an array of values or an object with keys that match the field names.
 */
declare function addRow(dataFrame: DataFrame, row: Record<string, unknown> | unknown[]): void;

/**
 * Indicate if the frame is appened or replace
 *
 * @alpha
 */
declare enum StreamingFrameAction {
    Append = "append",
    Replace = "replace"
}
/**
 * @alpha
 * */
interface StreamingFrameOptions {
    maxLength: number;
    maxDelta: number;
    action: StreamingFrameAction;
    /** optionally format field names based on labels */
    displayNameFormat?: string;
}
/**
 * Stream packet info is attached to StreamingDataFrames and indicate how many
 * rows were added to the end of the frame.  The number of discarded rows can be
 * calculated from previous state
 */
interface StreamPacketInfo {
    number: number;
    action: StreamingFrameAction;
    length: number;
    schemaChanged: boolean;
}
declare enum PushMode {
    wide = 0,
    labels = 1
}
type SerializedStreamingDataFrame = {
    name?: string;
    fields: FieldDTO[];
    refId?: string;
    meta: QueryResultMeta;
    schemaFields: FieldSchema[];
    timeFieldIndex: number;
    pushMode: PushMode;
    length: number;
    packetInfo: StreamPacketInfo;
    options: StreamingFrameOptions;
    labels: Set<string>;
};
/**
 * Unlike a circular buffer, this will append and periodically slice the front
 */
declare class StreamingDataFrame implements DataFrame {
    options: StreamingFrameOptions;
    name?: string;
    refId?: string;
    meta: QueryResultMeta;
    fields: Field[];
    length: number;
    private schemaFields;
    private timeFieldIndex;
    private pushMode;
    private labels;
    readonly packetInfo: StreamPacketInfo;
    private constructor();
    serialize: (fieldPredicate?: (f: Field) => boolean, optionsOverride?: Partial<StreamingFrameOptions>, trimValues?: {
        maxLength?: number;
    }) => SerializedStreamingDataFrame;
    private initFromSerialized;
    static deserialize: (serialized: SerializedStreamingDataFrame) => StreamingDataFrame;
    static empty: (opts?: Partial<StreamingFrameOptions>) => StreamingDataFrame;
    static fromDataFrameJSON: (frame: DataFrameJSON, opts?: Partial<StreamingFrameOptions>) => StreamingDataFrame;
    private get alwaysReplace();
    needsResizing: ({ maxLength, maxDelta }: StreamingFrameOptions) => boolean;
    resize: ({ maxLength, maxDelta }: Partial<StreamingFrameOptions>) => void;
    /**
     * apply the new message to the existing data.  This will replace the existing schema
     * if a new schema is included in the message, or append data matching the current schema
     */
    push(msg: DataFrameJSON): StreamPacketInfo;
    pushNewValues: (values: unknown[][]) => void;
    resetStateCalculations: () => void;
    getMatchingFieldIndexes: (fieldPredicate: (f: Field) => boolean) => number[];
    getValuesFromLastPacket: () => unknown[][];
    hasAtLeastOnePacket: () => boolean;
    private addLabel;
    getOptions: () => Readonly<StreamingFrameOptions>;
}
declare function closestIdx(num: number, arr: number[], lo?: number, hi?: number): number;

declare enum MatcherID {
    anyMatch = "anyMatch",// checks children
    allMatch = "allMatch",// checks children
    invertMatch = "invertMatch",// checks child
    alwaysMatch = "alwaysMatch",
    neverMatch = "neverMatch"
}
declare enum FieldMatcherID {
    numeric = "numeric",
    time = "time",// Can be multiple times
    first = "first",
    firstTimeField = "firstTimeField",// Only the first time field
    byType = "byType",
    byTypes = "byTypes",
    byName = "byName",
    byNames = "byNames",
    byRegexp = "byRegexp",
    byRegexpOrNames = "byRegexpOrNames",
    byFrameRefID = "byFrameRefID",
    byValue = "byValue"
}
/**
 * Field name matchers
 */
declare enum FrameMatcherID {
    byName = "byName",
    byRefId = "byRefId",
    byIndex = "byIndex"
}
/**
 * @public
 */
declare enum ValueMatcherID {
    regex = "regex",
    isNull = "isNull",
    isNotNull = "isNotNull",
    greater = "greater",
    greaterOrEqual = "greaterOrEqual",
    lower = "lower",
    lowerOrEqual = "lowerOrEqual",
    equal = "equal",
    notEqual = "notEqual",
    substring = "substring",
    notSubstring = "notSubstring",
    between = "between"
}

declare enum DataTransformerID {
    append = "append",
    reduce = "reduce",
    order = "order",
    organize = "organize",
    rename = "rename",
    calculateField = "calculateField",
    /** @deprecated use joinByField */
    seriesToColumns = "seriesToColumns",
    seriesToRows = "seriesToRows",
    merge = "merge",
    concatenate = "concatenate",
    labelsToFields = "labelsToFields",
    filterFields = "filterFields",
    filterFieldsByName = "filterFieldsByName",
    filterFrames = "filterFrames",
    filterByRefId = "filterByRefId",
    renameByRegex = "renameByRegex",
    filterByValue = "filterByValue",
    noop = "noop",
    ensureColumns = "ensureColumns",
    groupBy = "groupBy",
    sortBy = "sortBy",
    histogram = "histogram",
    configFromData = "configFromData",
    rowsToFields = "rowsToFields",
    prepareTimeSeries = "prepareTimeSeries",
    convertFieldType = "convertFieldType",
    fieldLookup = "fieldLookup",
    heatmap = "heatmap",
    spatial = "spatial",
    joinByField = "joinByField",
    joinByLabels = "joinByLabels",
    extractFields = "extractFields",
    groupingToMatrix = "groupingToMatrix",
    limit = "limit",
    partitionByValues = "partitionByValues",
    timeSeriesTable = "timeSeriesTable",
    formatTime = "formatTime",
    formatString = "formatString",
    regression = "regression",
    groupToNestedTable = "groupToNestedTable"
}

declare enum ReducerID {
    sum = "sum",
    max = "max",
    min = "min",
    logmin = "logmin",
    mean = "mean",
    variance = "variance",
    stdDev = "stdDev",
    last = "last",
    first = "first",
    count = "count",
    range = "range",
    diff = "diff",
    diffperc = "diffperc",
    delta = "delta",
    step = "step",
    firstNotNull = "firstNotNull",
    lastNotNull = "lastNotNull",
    changeCount = "changeCount",
    distinctCount = "distinctCount",
    allIsZero = "allIsZero",
    allIsNull = "allIsNull",
    allValues = "allValues",
    uniqueValues = "uniqueValues",
    p1 = "p1",
    p2 = "p2",
    p3 = "p3",
    p4 = "p4",
    p5 = "p5",
    p6 = "p6",
    p7 = "p7",
    p8 = "p8",
    p9 = "p9",
    p10 = "p10",
    p11 = "p11",
    p12 = "p12",
    p13 = "p13",
    p14 = "p14",
    p15 = "p15",
    p16 = "p16",
    p17 = "p17",
    p18 = "p18",
    p19 = "p19",
    p20 = "p20",
    p21 = "p21",
    p22 = "p22",
    p23 = "p23",
    p24 = "p24",
    p25 = "p25",
    p26 = "p26",
    p27 = "p27",
    p28 = "p28",
    p29 = "p29",
    p30 = "p30",
    p31 = "p31",
    p32 = "p32",
    p33 = "p33",
    p34 = "p34",
    p35 = "p35",
    p36 = "p36",
    p37 = "p37",
    p38 = "p38",
    p39 = "p39",
    p40 = "p40",
    p41 = "p41",
    p42 = "p42",
    p43 = "p43",
    p44 = "p44",
    p45 = "p45",
    p46 = "p46",
    p47 = "p47",
    p48 = "p48",
    p49 = "p49",
    p50 = "p50",
    p51 = "p51",
    p52 = "p52",
    p53 = "p53",
    p54 = "p54",
    p55 = "p55",
    p56 = "p56",
    p57 = "p57",
    p58 = "p58",
    p59 = "p59",
    p60 = "p60",
    p61 = "p61",
    p62 = "p62",
    p63 = "p63",
    p64 = "p64",
    p65 = "p65",
    p66 = "p66",
    p67 = "p67",
    p68 = "p68",
    p69 = "p69",
    p70 = "p70",
    p71 = "p71",
    p72 = "p72",
    p73 = "p73",
    p74 = "p74",
    p75 = "p75",
    p76 = "p76",
    p77 = "p77",
    p78 = "p78",
    p79 = "p79",
    p80 = "p80",
    p81 = "p81",
    p82 = "p82",
    p83 = "p83",
    p84 = "p84",
    p85 = "p85",
    p86 = "p86",
    p87 = "p87",
    p88 = "p88",
    p89 = "p89",
    p90 = "p90",
    p91 = "p91",
    p92 = "p92",
    p93 = "p93",
    p94 = "p94",
    p95 = "p95",
    p96 = "p96",
    p97 = "p97",
    p98 = "p98",
    p99 = "p99"
}
declare function isReducerID(id: string): id is ReducerID;
type FieldReducer = (field: Field, ignoreNulls: boolean, nullAsZero: boolean) => FieldCalcs;
interface FieldReducerInfo extends RegistryItem {
    emptyInputResult?: unknown;
    standard: boolean;
    preservesUnits: boolean;
    reduce?: FieldReducer;
}
interface ReduceFieldOptions {
    field: Field;
    reducers: string[];
}
/**
 * @returns an object with a key for each selected stat
 * NOTE: This will also modify the 'field.state' object,
 * leaving values in a cache until cleared.
 */
declare function reduceField(options: ReduceFieldOptions): FieldCalcs;
declare const fieldReducers: Registry<FieldReducerInfo>;
declare const defaultCalcs: FieldCalcs;
declare function doStandardCalcs(field: Field, ignoreNulls: boolean, nullAsZero: boolean): FieldCalcs;

interface FieldValueMatcherConfig {
    reducer: ReducerID;
    op?: ComparisonOperation;
    value?: number;
}

/**
 * Registry that contains all of the built in field matchers.
 * @public
 */
declare const fieldMatchers: Registry<FieldMatcherInfo<any>>;
/**
 * Registry that contains all of the built in frame matchers.
 * @public
 */
declare const frameMatchers: Registry<FrameMatcherInfo<any>>;
/**
 * Registry that contains all of the built in value matchers.
 * @public
 */
declare const valueMatchers: Registry<ValueMatcherInfo<any>>;
/**
 * Resolves a field matcher from the registry for given config.
 * Will throw an error if matcher can not be resolved.
 * @public
 */
declare function getFieldMatcher(config: MatcherConfig): FieldMatcher;
/**
 * Resolves a frame matcher from the registry for given config.
 * Will throw an error if matcher can not be resolved.
 * @public
 */
declare function getFrameMatchers(config: MatcherConfig): FrameMatcher;
/**
 * Resolves a value matcher from the registry for given config.
 * Will throw an error if matcher can not be resolved.
 * @public
 */
declare function getValueMatcher(config: MatcherConfig): ValueMatcher;

declare enum GroupByOperationID {
    aggregate = "aggregate",
    groupBy = "groupby"
}
interface GroupByFieldOptions {
    aggregations: ReducerID[];
    operation: GroupByOperationID | null;
}
interface GroupByTransformerOptions {
    fields: Record<string, GroupByFieldOptions>;
}

interface GroupToNestedTableTransformerOptions {
    showSubframeHeaders?: boolean;
    fields: Record<string, GroupByFieldOptions>;
}

interface LimitTransformerOptions {
    limitField?: number | string;
}

interface GroupingToMatrixTransformerOptions {
    columnField?: string;
    rowField?: string;
    valueField?: string;
    emptyValue?: SpecialValue;
}

interface ConvertFieldTypeTransformerOptions {
    conversions: ConvertFieldTypeOptions[];
}
interface ConvertFieldTypeOptions {
    /**
     * The field to convert field type
     */
    targetField?: string;
    /**
     * The field type to convert to
     */
    destinationType?: FieldType;
    /**
     * Date format to parse a string datetime
     */
    dateFormat?: string;
    /**
     * When converting an array to a string, the values can be joined with a custom separator
     */
    joinWith?: string;
    /**
     * When converting a date to a string an option timezone.
     */
    timezone?: TimeZone$1;
    /**
     * When converting to an enumeration, this is the target config
     */
    enumConfig?: EnumFieldConfig;
}
/**
 * Checks the first value. Assumes any number should be time fieldtype. Otherwise attempts to make the fieldtype time.
 * @param field - field to ensure is a time fieldtype
 * @param dateFormat - date format used to parse a string datetime
 * @returns field as time
 *
 * @public
 */
declare function ensureTimeField(field: Field, dateFormat?: string): Field;

/**
 * @internal
 */
declare const histogramBucketSizes: number[];
interface HistogramTransformerInputs {
    bucketCount?: number;
    bucketSize?: string | number;
    bucketOffset?: string | number;
    combine?: boolean;
}
/**
 * @alpha
 */
interface HistogramTransformerOptions {
    bucketCount?: number;
    bucketSize?: number;
    bucketOffset?: number;
    combine?: boolean;
}
/**
 * This is a helper class to use the same text in both a panel and transformer UI
 *
 * @internal
 */
declare const histogramFieldInfo: {
    bucketCount: {
        name: string;
        description: string;
    };
    bucketSize: {
        name: string;
        description: undefined;
    };
    bucketOffset: {
        name: string;
        description: string;
    };
    combine: {
        name: string;
        description: string;
    };
};
/**
 * @alpha
 */
declare const histogramTransformer: SynchronousDataTransformerInfo<HistogramTransformerInputs>;
/**
 * @internal
 */
declare const histogramFrameBucketMinFieldName = "xMin";
/**
 * @internal
 */
declare function isHistogramFrameBucketMinFieldName(v: string): boolean;
/**
 * @internal
 */
declare const histogramFrameBucketMaxFieldName = "xMax";
/**
 * @internal
 */
declare function isHistogramFrameBucketMaxFieldName(v: string): boolean;
/**
 * @alpha
 */
interface HistogramFields {
    xMin: Field;
    xMax: Field;
    counts: Field[];
}
/**
 * Given a frame, find the explicit histogram fields
 *
 * @alpha
 */
declare function getHistogramFields(frame: DataFrame): HistogramFields | undefined;
/**
 * @alpha
 */
declare function buildHistogram(frames: DataFrame[], options?: HistogramTransformerOptions): HistogramFields | null;
/**
 * @internal
 */
declare function incrRound(num: number, incr: number): number;
/**
 * @internal
 */
declare function incrRoundUp(num: number, incr: number): number;
/**
 * @internal
 */
declare function incrRoundDn(num: number, incr: number): number;
/**
 * @internal
 */
declare function histogramFieldsToFrame(info: HistogramFields, theme?: GrafanaTheme2): DataFrame;

/**
 * Options for renameByRegexTransformer
 *
 * @public
 */
interface RenameByRegexTransformerOptions {
    regex: string;
    renamePattern: string;
}

interface MergeTransformerOptions {
}

interface SortByField {
    field: string;
    desc?: boolean;
    index?: number;
}
interface SortByTransformerOptions {
    sort: SortByField[];
}

declare enum LabelsToFieldsMode {
    Columns = "columns",// default mode
    Rows = "rows"
}
interface LabelsToFieldsOptions {
    mode?: LabelsToFieldsMode;
    /** When empty, this will keep all labels, otherwise it will keep only labels matching the value */
    keepLabels?: string[];
    /**
     * When in column mode and if set this will use this label's value as the value field name.
     */
    valueLabel?: string;
}

interface RenameFieldsTransformerOptions {
    renameByName: Record<string, string>;
}

interface SeriesToRowsTransformerOptions {
}

declare enum JoinMode {
    outer = "outer",// best for time series, non duplicated join on values
    inner = "inner",
    outerTabular = "outerTabular"
}
interface JoinByFieldOptions {
    byField?: string;
    mode?: JoinMode;
}

declare enum CalculateFieldMode {
    ReduceRow = "reduceRow",
    CumulativeFunctions = "cumulativeFunctions",
    WindowFunctions = "windowFunctions",
    BinaryOperation = "binary",
    UnaryOperation = "unary",
    Index = "index"
}
declare enum WindowSizeMode {
    Percentage = "percentage",
    Fixed = "fixed"
}
declare enum WindowAlignment {
    Trailing = "trailing",
    Centered = "centered"
}
interface ReduceOptions {
    include?: string[];
    reducer: ReducerID;
    nullValueMode?: NullValueMode;
}
interface CumulativeOptions {
    field?: string;
    reducer: ReducerID;
}
interface WindowOptions extends CumulativeOptions {
    windowSize?: number;
    windowSizeMode?: WindowSizeMode;
    windowAlignment?: WindowAlignment;
}
interface UnaryOptions {
    operator: UnaryOperationID;
    fieldName: string;
}
interface BinaryOptions {
    left: string;
    operator: BinaryOperationID;
    right: string;
}
interface IndexOptions {
    asPercentile: boolean;
}
interface CalculateFieldTransformerOptions {
    timeSeries?: boolean;
    mode: CalculateFieldMode;
    reduce?: ReduceOptions;
    window?: WindowOptions;
    cumulative?: CumulativeOptions;
    binary?: BinaryOptions;
    unary?: UnaryOptions;
    index?: IndexOptions;
    replaceFields?: boolean;
    alias?: string;
}

declare enum ConcatenateFrameNameMode {
    /**
     * Ignore the source frame name when moving to the destination
     */
    Drop = "drop",
    /**
     * Copy the source frame name to the destination field.  The final field will contain
     * both the frame and field name
     */
    FieldName = "field",
    /**
     * Copy the source frame name to a label on the field.  The label key is controlled
     * by frameNameLabel
     */
    Label = "label"
}
interface ConcatenateTransformerOptions {
    frameNameMode?: ConcatenateFrameNameMode;
    frameNameLabel?: string;
}

declare enum ReduceTransformerMode {
    SeriesToRows = "seriesToRows",// default
    ReduceFields = "reduceFields"
}
interface ReduceTransformerOptions {
    reducers: ReducerID[];
    fields?: MatcherConfig;
    mode?: ReduceTransformerMode;
    includeTimeField?: boolean;
    labelsToFields?: boolean;
}

interface OrderFieldsTransformerOptions {
    indexByName: Record<string, number>;
}

interface OrganizeFieldsTransformerOptions extends OrderFieldsTransformerOptions, RenameFieldsTransformerOptions {
    excludeByName: Record<string, boolean>;
    includeByName?: Record<string, boolean>;
}

interface FormatTimeTransformerOptions {
    timeField: string;
    outputFormat: string;
    timezone: TimeZone$1;
}

declare enum FormatStringOutput {
    UpperCase = "Upper Case",
    LowerCase = "Lower Case",
    SentenceCase = "Sentence Case",
    TitleCase = "Title Case",
    PascalCase = "Pascal Case",
    CamelCase = "Camel Case",
    SnakeCase = "Snake Case",
    KebabCase = "Kebab Case",
    Trim = "Trim",
    Substring = "Substring"
}
interface FormatStringTransformerOptions {
    stringField: string;
    substringStart: number;
    substringEnd: number;
    outputFormat: FormatStringOutput;
}

declare enum FilterByValueType {
    exclude = "exclude",
    include = "include"
}
declare enum FilterByValueMatch {
    all = "all",
    any = "any"
}
interface FilterByValueFilter {
    fieldName: string;
    config: MatcherConfig;
}
interface FilterByValueTransformerOptions {
    filters: FilterByValueFilter[];
    type: FilterByValueType;
    match: FilterByValueMatch;
}

interface FilterFramesByRefIdTransformerOptions {
    include?: string;
    exclude?: string;
}

interface RegexpOrNamesMatcherOptions {
    pattern?: string;
    names?: string[];
    variable?: string;
}
/**
 * Mode to be able to toggle if the names matcher should match fields in provided
 * list or all except provided names.
 * @public
 */
declare enum ByNamesMatcherMode {
    exclude = "exclude",
    include = "include"
}
/**
 * Options to instruct the by names matcher to either match all fields in given list
 * or all except the fields in the list.
 * @public
 */
interface ByNamesMatcherOptions {
    mode?: ByNamesMatcherMode;
    names?: string[];
    readOnly?: boolean;
    prefix?: string;
}

interface FilterFieldsByNameTransformerOptions {
    include?: RegexpOrNamesMatcherOptions;
    exclude?: RegexpOrNamesMatcherOptions;
    byVariable?: boolean;
}

interface FilterOptions {
    include?: MatcherConfig;
    exclude?: MatcherConfig;
}

interface NoopTransformerOptions {
}

declare const standardTransformers: {
    noopTransformer: SynchronousDataTransformerInfo<NoopTransformerOptions>;
    filterFieldsTransformer: DataTransformerInfo<FilterOptions>;
    filterFieldsByNameTransformer: DataTransformerInfo<FilterFieldsByNameTransformerOptions>;
    filterFramesTransformer: DataTransformerInfo<FilterOptions>;
    filterFramesByRefIdTransformer: DataTransformerInfo<FilterFramesByRefIdTransformerOptions>;
    filterByValueTransformer: DataTransformerInfo<FilterByValueTransformerOptions>;
    formatStringTransformer: DataTransformerInfo<FormatStringTransformerOptions>;
    formatTimeTransformer: DataTransformerInfo<FormatTimeTransformerOptions>;
    orderFieldsTransformer: DataTransformerInfo<OrderFieldsTransformerOptions>;
    organizeFieldsTransformer: DataTransformerInfo<OrganizeFieldsTransformerOptions>;
    reduceTransformer: DataTransformerInfo<ReduceTransformerOptions>;
    concatenateTransformer: DataTransformerInfo<ConcatenateTransformerOptions>;
    calculateFieldTransformer: DataTransformerInfo<CalculateFieldTransformerOptions>;
    joinByFieldTransformer: SynchronousDataTransformerInfo<JoinByFieldOptions>;
    /** @deprecated */
    seriesToColumnsTransformer: SynchronousDataTransformerInfo<JoinByFieldOptions>;
    seriesToRowsTransformer: DataTransformerInfo<SeriesToRowsTransformerOptions>;
    renameFieldsTransformer: DataTransformerInfo<RenameFieldsTransformerOptions>;
    labelsToFieldsTransformer: SynchronousDataTransformerInfo<LabelsToFieldsOptions>;
    ensureColumnsTransformer: SynchronousDataTransformerInfo<any>;
    groupByTransformer: DataTransformerInfo<GroupByTransformerOptions>;
    sortByTransformer: DataTransformerInfo<SortByTransformerOptions>;
    mergeTransformer: DataTransformerInfo<MergeTransformerOptions>;
    renameByRegexTransformer: DataTransformerInfo<RenameByRegexTransformerOptions>;
    histogramTransformer: SynchronousDataTransformerInfo<HistogramTransformerInputs>;
    convertFieldTypeTransformer: SynchronousDataTransformerInfo<ConvertFieldTypeTransformerOptions>;
    groupingToMatrixTransformer: DataTransformerInfo<GroupingToMatrixTransformerOptions>;
    limitTransformer: DataTransformerInfo<LimitTransformerOptions>;
    groupToNestedTable: DataTransformerInfo<GroupToNestedTableTransformerOptions>;
};

/**
 * Apply configured transformations to the input data
 */
declare function transformDataFrame(options: Array<DataTransformerConfig | CustomTransformOperator>, data: DataFrame[], ctx?: DataTransformContext): Observable<DataFrame[]>;

interface TransformerUIProps<T> {
    /**
     * Transformer configuration, persisted on panel's model
     */
    options: T;
    /**
     * Pre-transform data frames
     */
    input: DataFrame[];
    onChange: (options: T) => void;
}
interface TransformerRegistryItem<TOptions> extends RegistryItem {
    /**
     * Object describing transformer configuration
     */
    transformation: DataTransformerInfo<TOptions>;
    /** Markdown with more detailed description and help */
    help?: string;
    /**
     * React component used as UI for the transformer
     */
    editor: React$1.ComponentType<TransformerUIProps<TOptions>>;
    /**
     * Set of categories associated with the transformer
     */
    categories?: Set<TransformerCategory>;
}
declare enum TransformerCategory {
    Combine = "combine",
    CalculateNewFields = "calculateNewFields",
    CreateNewVisualization = "createNewVisualization",
    Filter = "filter",
    PerformSpatialOperations = "performSpatialOperations",
    Reformat = "reformat",
    ReorderAndRename = "reorderAndRename"
}
/**
 * Registry of transformation options that can be driven by
 * stored configuration files.
 */
declare const standardTransformersRegistry: Registry<TransformerRegistryItem<any>>;

/**
 * @internal
 */
interface JoinOptions {
    /**
     * The input fields
     */
    frames: DataFrame[];
    /**
     * The field to join -- frames that do not have this field will be dropped
     */
    joinBy?: FieldMatcher;
    /**
     * Optionally filter the non-join fields
     */
    keep?: FieldMatcher;
    /**
     * @internal -- used when we need to keep a reference to the original frame/field index
     */
    keepOriginIndices?: boolean;
    /**
     * @internal -- keep any pre-cached state.displayName
     */
    keepDisplayNames?: boolean;
    /**
     * @internal -- Optionally specify how to treat null values
     */
    nullMode?: (field: Field) => JoinNullMode;
    /**
     * @internal -- Optionally specify a join mode (outer or inner)
     */
    mode?: JoinMode;
}
/**
 * This will return a single frame joined by the first matching field.  When a join field is not specified,
 * the default will use the first time field
 */
declare function joinDataFrames(options: JoinOptions): DataFrame | undefined;
type JoinNullMode = number;
declare function isLikelyAscendingVector(data: any[], samples?: number): boolean;

type InsertMode = (prev: number, next: number, threshold: number) => number;
interface NullInsertOptions {
    frame: DataFrame;
    refFieldName?: string | null;
    refFieldPseudoMax?: number;
    refFieldPseudoMin?: number;
    insertMode?: InsertMode;
}
/** @internal */
declare function applyNullInsertThreshold(opts: NullInsertOptions): DataFrame;

declare function nullToValue(frame: DataFrame): {
    fields: Field<any>[];
    name?: string | undefined;
    length: number;
    refId?: string | undefined;
    meta?: QueryResultMeta | undefined;
};

declare function escapeStringForRegex(value: string): string;
declare function unEscapeStringFromRegex(value: string): string;
declare function stringStartsAsRegEx(str: string): boolean;
declare function stringToJsRegex(str: string): RegExp;
declare function stringToMs(str: string): number;
declare function toNumberString(value: number | undefined | null): string;
declare function toIntegerOrUndefined(value: string): number | undefined;
declare function toFloatOrUndefined(value: string): number | undefined;
declare function toPascalCase(string: string): string;
declare function escapeRegex(value: string): string;

interface RenderMarkdownOptions {
    noSanitize?: boolean;
    breaks?: boolean;
}
declare function renderMarkdown(str?: string, options?: RenderMarkdownOptions): string;
declare function renderTextPanelMarkdown(str?: string, options?: RenderMarkdownOptions): string;

interface TextMatch {
    text: string;
    start: number;
    length: number;
    end: number;
}
/**
 * Adapt findMatchesInText for react-highlight-words findChunks handler.
 * See https://github.com/bvaughn/react-highlight-words#props
 */
declare function findHighlightChunksInText({ searchWords, textToHighlight, }: {
    searchWords: Array<string | RegExp>;
    textToHighlight: string;
}): TextMatch[];
/**
 * Returns a list of substring regexp matches.
 */
declare function findMatchesInText(haystack: string, needle: string): TextMatch[];
/**
 * Converts any mode modifiers in the text to the Javascript equivalent flag
 */
declare function parseFlags(text: string): {
    cleaned: string;
    flags: string;
};

/**
 * Return a sanitized string that is going to be rendered in the browser to prevent XSS attacks.
 * Note that sanitized tags will be removed, such as "<script>".
 * We don't allow form or input elements.
 */
declare function sanitize(unsanitizedString: string): string;
declare function sanitizeTrustedTypesRSS(unsanitizedString: string): TrustedHTML;
declare function sanitizeTrustedTypes(unsanitizedString: string): TrustedHTML;
/**
 * Returns string safe from XSS attacks to be used in the Text panel plugin.
 *
 * Even though we allow the style-attribute, there's still default filtering applied to it
 * Info: https://github.com/leizongmin/js-xss#customize-css-filter
 * Whitelist: https://github.com/leizongmin/js-css-filter/blob/master/lib/default.js
 */
declare function sanitizeTextPanelContent(unsanitizedString: string): string;
declare function sanitizeSVGContent(unsanitizedString: string): string;
declare function sanitizeUrl(url: string): string;
declare function hasAnsiCodes(input: string): boolean;
declare function escapeHtml(str: string): string;

declare const textUtil: {
    escapeHtml: typeof escapeHtml;
    hasAnsiCodes: typeof hasAnsiCodes;
    sanitize: typeof sanitize;
    sanitizeTextPanelContent: typeof sanitizeTextPanelContent;
    sanitizeUrl: typeof sanitizeUrl;
    sanitizeSVGContent: typeof sanitizeSVGContent;
    sanitizeTrustedTypes: typeof sanitizeTrustedTypes;
    sanitizeTrustedTypesRSS: typeof sanitizeTrustedTypesRSS;
};

/**
 * @alpha
 */
interface MonacoLanguageRegistryItem extends RegistryItem {
    init: () => Worker;
}
/**
 * @alpha
 */
declare const monacoLanguageRegistry: Registry<MonacoLanguageRegistryItem>;

/**
 * Finds the next available refId for a query
 */
declare const getNextRefId: (queries: DataQuery$1[]) => string;

/**
 * Describes a empty value matcher option.
 * @public
 */
interface ValueMatcherOptions {
}
/**
 * Describes a basic value matcher option that has a single value.
 * @public
 */
interface BasicValueMatcherOptions<T = any> extends ValueMatcherOptions {
    value: T;
}
/**
 * Describes a range value matcher option that has a to and a from value to
 * be able to match a range.
 * @public
 */
interface RangeValueMatcherOptions<T = any> extends ValueMatcherOptions {
    from: T;
    to: T;
}

type LayoutMode = LayoutModes.Grid | LayoutModes.List;
declare enum LayoutModes {
    Grid = "grid",
    List = "list"
}

interface Props {
    plugin: PanelPlugin;
    currentFieldConfig: FieldConfigSource;
    currentOptions: Record<string, unknown>;
    isAfterPluginChange: boolean;
}
interface OptionDefaults {
    options: Record<string, unknown>;
    fieldConfig: FieldConfigSource;
}
/**
 * This will return the panel options with defaults applied.
 * Used internally, not intended for external use.
 * @internal
 */
declare function getPanelOptionsWithDefaults({ plugin, currentOptions, currentFieldConfig, isAfterPluginChange, }: Props): OptionDefaults;
/**
 * Used internally, not intended for external use.
 * @internal
 */
declare function filterFieldConfigOverrides(overrides: ConfigOverrideRule[], condition: (value: DynamicConfigValue) => boolean): ConfigOverrideRule[];
/**
 * Used internally, not intended for external use.
 * @internal
 */
declare function restoreCustomOverrideRules(current: FieldConfigSource, old: FieldConfigSource): FieldConfigSource;
/**
 * Used internally, not intended for external use.
 * @internal
 */
declare function isCustomFieldProp(prop: DynamicConfigValue): boolean;
/**
 * Used internally, not intended for external use.
 * @internal
 */
declare function isStandardFieldProp(prop: DynamicConfigValue): boolean;

/**
 * Helper functionality to create a field config registry.
 *
 * @param config - configuration to base the registry on.
 * @param pluginName - name of the plugin that will use the registry.
 * @internal
 */
declare function createFieldConfigRegistry<TFieldConfigOptions>(config: SetFieldConfigOptionsArgs<TFieldConfigOptions> | undefined, pluginName: string): FieldConfigOptionsRegistry;

/**
 * Describes the options used when triggering a query via the {@link QueryRunner}.
 *
 * @internal
 */
interface QueryRunnerOptions {
    datasource: DataSourceRef | DataSourceApi | null;
    queries: DataQuery[];
    panelId?: number;
    dashboardUID?: string;
    timezone: TimeZone;
    timeRange: TimeRange;
    timeInfo?: string;
    maxDataPoints: number;
    minInterval: string | undefined | null;
    scopedVars?: ScopedVars;
    cacheTimeout?: string;
    queryCachingTTL?: number;
    app?: string;
}
/**
 * Describes the QueryRunner that can used to exectue queries in e.g. app plugins.
 * QueryRunner instances can be created via the {@link @grafana/runtime#createQueryRunner | createQueryRunner}.
 *
 * @internal
 */
interface QueryRunner {
    get(): Observable<PanelData>;
    run(options: QueryRunnerOptions): void;
    cancel(): void;
    destroy(): void;
}

interface PluginContextType {
    meta: PluginMeta;
}
interface DataSourcePluginContextType extends PluginContextType {
    instanceSettings: DataSourceInstanceSettings;
}

type PluginContextProviderProps = {
    meta: PluginMeta;
};
declare function PluginContextProvider(props: PropsWithChildren<PluginContextProviderProps>): ReactElement;

type DataSourcePluginContextProviderProps = {
    instanceSettings: DataSourceInstanceSettings;
};
declare function DataSourcePluginContextProvider(props: PropsWithChildren<DataSourcePluginContextProviderProps>): ReactElement;

declare function usePluginContext(): PluginContextType;

declare function isDataSourcePluginContext(context: PluginContextType): context is DataSourcePluginContextType;

interface CircularOptions$1<T> {
    buffer?: T[];
    append?: 'head' | 'tail';
    capacity?: number;
}
/**
 * Circular vector uses a single buffer to capture a stream of values
 * overwriting the oldest value on add.
 *
 * This supports adding to the 'head' or 'tail' and will grow the buffer
 * to match a configured capacity.
 *
 * @public
 * @deprecated use a simple Arrays
 */
declare class CircularVector<T = any> extends FunctionalVector<T> {
    private buffer;
    private index;
    private capacity;
    private tail;
    constructor(options: CircularOptions$1<T>);
    /**
     * This gets the appropriate add function depending on the buffer state:
     *  * head vs tail
     *  * growing buffer vs overwriting values
     */
    private getAddFunction;
    setCapacity(v: number): void;
    setAppendMode(mode: 'head' | 'tail'): void;
    reverse(): T[];
    get(index: number): T;
    set(index: number, value: T): void;
    get length(): number;
}

/**
 * @public
 *
 * @deprecated use a simple Array<T>
 */
declare class ArrayVector<T = unknown> extends Array<T> {
    get buffer(): T[];
    set buffer(values: T[]);
    /**
     * ArrayVector is deprecated and should not be used. If you get a Typescript error here, use plain arrays for field.values.
     */
    constructor(buffer: never);
    toJSON(): T[];
}

interface CircularOptions {
    append?: 'head' | 'tail';
    capacity?: number;
}
/**
 * This dataframe can have values constantly added, and will never
 * exceed the given capacity
 */
declare class CircularDataFrame<T = any> extends MutableDataFrame<T> {
    constructor(options: CircularOptions);
}

export { AbsoluteTimeRange, AbstractLabelMatcher, AbstractLabelOperator, AbstractQuery, AdHocVariableFilter, AdHocVariableModel, AlertErrorPayload, AlertPayload, AlertState, AlertStateInfo, AnalyticsSettings, AngularMeta, AngularPanelMenuItem, AnnotationChangeEvent, AnnotationEvent, AnnotationEventFieldMapping, AnnotationEventFieldSource, AnnotationEventMappings, AnnotationEventUIModel, AnnotationQuery, AnnotationQueryRequest, AnnotationSupport, AppEvent, AppEvents, AppPlugin, AppPluginMeta, AppRootProps, ApplyFieldOverrideOptions, ArrayDataFrame, ArrayVector, AuthSettings, BaseVariableModel, BasicValueMatcherOptions, BinaryOperation, BinaryOperationID, BootData, BuildInfo, BusEvent, BusEventBase, BusEventHandler, BusEventType, BusEventWithPayload, ByNamesMatcherMode, ByNamesMatcherOptions, CSVConfig, CSVHeaderStyle, CSVOptions, CSVParseCallbacks, CSVReader, CartesianCoords2D, CircularDataFrame, CircularVector, Column, ConfigOverrideRule, ConstantVariableModel, CoreApp, CreatePlotOverlay, CurrentUserDTO, CustomTransformOperator, CustomVariableModel, CustomVariableSupport, DEFAULT_FIELD_DISPLAY_VALUES_LIMIT, DEFAULT_SAML_NAME, DashboardCursorSync, DashboardLoadedEvent, DashboardLoadedEventPayload, DashboardProps, DashboardVariableModel, DataConfigSource, DataContextScopedVar, DataFrame, DataFrameDTO, DataFrameData, DataFrameFieldIndex, DataFrameJSON, DataFrameSchema, DataFrameType, DataFrameView, DataFrameWithValue, DataHoverClearEvent, DataHoverEvent, DataHoverPayload, DataLink, DataLinkBuiltInVars, DataLinkClickEvent, DataLinkConfigOrigin, DataLinkPostProcessor, DataLinkPostProcessorOptions, DataLinkTransformationConfig, DataLinksFieldConfigSettings, DataQuery, DataQueryError, DataQueryErrorType, DataQueryRequest, DataQueryResponse, DataQueryResponseData, DataQueryTimings, DataSelectEvent, DataSourceApi, DataSourceConstructor, DataSourceGetTagKeysOptions, DataSourceGetTagValuesOptions, DataSourceInstanceSettings, DataSourceJsonData, DataSourceOptionsType, DataSourcePlugin, DataSourcePluginComponents, DataSourcePluginContextProvider, DataSourcePluginContextProviderProps, DataSourcePluginContextType, DataSourcePluginMeta, DataSourcePluginOptionsEditorProps, DataSourceQueryType, DataSourceRef, DataSourceSelectItem, DataSourceSettings, DataSourceTestFailed, DataSourceTestSucceeded, DataSourceUpdatedSuccessfully, DataSourceVariableModel, DataSourceVariableSupport, DataSourceWithLogsContextSupport, DataSourceWithQueryExportSupport, DataSourceWithQueryImportSupport, DataSourceWithQueryModificationSupport, DataSourceWithSupplementaryQueriesSupport, DataSourceWithToggleableQueryFiltersSupport, DataTransformContext, DataTransformerID, DataTransformerInfo, DateTime, DateTimeBuiltinFormat, DateTimeDuration, DateTimeInput, DateTimeLocale, DateTimeOptions, DateTimeOptionsWhenParsing, DateTimeOptionsWithFormat, DecimalCount, DecimalInfo, DefaultTimeZone, Dimension, Dimensions, Dimensions2D, DisplayProcessor, DisplayValue, DisplayValueAlignmentFactors, DocsId, DurationInput, DurationUnit, DynamicConfigValue, EnumFieldConfig, EventBus, EventBusExtended, EventBusSrv, EventFilterOptions, ExploreCorrelationHelperData, ExploreLogsPanelState, ExploreMode, ExplorePanelsState, ExploreTracePanelState, ExploreUrlState, FALLBACK_COLOR, FeatureState, FeatureToggles, Field, FieldCache, FieldCalcs, FieldColor, FieldColorConfigSettings, FieldColorMode, FieldColorModeId, FieldColorSeriesByMode, FieldConfig, FieldConfigEditorBuilder, FieldConfigEditorConfig, FieldConfigEditorProps, FieldConfigOptionsRegistry, FieldConfigProperty, FieldConfigPropertyItem, FieldConfigSource, FieldDTO, FieldDisplay, FieldMatcher, FieldMatcherID, FieldMatcherInfo, FieldNamePickerBaseNameMode, FieldNamePickerConfigSettings, FieldOverrideContext, FieldOverrideEditorProps, FieldReducerInfo, FieldSchema, FieldSparkline, FieldState, FieldType, FieldTypeConfig, FieldValueEntityLookup, FieldValueMatcherConfig, FieldWithIndex, FlotDataPoint, FormatInput, FormattedValue, FrameMatcher, FrameMatcherID, FrameMatcherInfo, GAUGE_DEFAULT_MAXIMUM, GAUGE_DEFAULT_MINIMUM, GetFieldDisplayValuesOptions, GetTagResponse, GrafanaConfig, GrafanaPlugin, GrafanaTheme, GrafanaTheme2, GrafanaThemeCommons, GrafanaThemeType, GraphSeriesValue, GraphSeriesXY, GroupByVariableModel, GroupedTimeZones, GroupingToMatrixTransformerOptions, HistogramFields, HistogramTransformerInputs, HistogramTransformerOptions, HistoryItem, ISO_8601, IconName, InternalDataLink, InternalTimeZones, InterpolateFunction, IntervalValues, IntervalVariableModel, KeyValue, Labels, LanguageProvider, LayoutMode, LayoutModes, LegacyEmitter, LegacyEventHandler, LegacyGraphHoverClearEvent, LegacyGraphHoverEvent, LegacyGraphHoverEventPayload, LegacyMappingType, LegacyMetricFindQueryOptions, LegacyResponseData, LicenseInfo, LinkModel, LinkModelSupplier, LinkTarget, LiveChannelAddress, LiveChannelConnectionState, LiveChannelEvent, LiveChannelEventType, LiveChannelId, LiveChannelJoinEvent, LiveChannelLeaveEvent, LiveChannelMessageEvent, LiveChannelPresenceStatus, LiveChannelScope, LiveChannelStatusEvent, LiveChannelType, LoadingState, LogLabelStatsModel, LogLevel, LogRowContextOptions, LogRowContextQueryDirection, LogRowModel, LogSearchMatch, LogsDedupDescription, LogsMetaItem, LogsMetaKind, LogsModel, LogsSampleOptions, LogsVolumeCustomMetaData, LogsVolumeOption, LogsVolumeType, MISSING_VALUE, MapLayerHandler, MapLayerRegistryItem, MappingType, MatcherID, MetadataInspectorProps, MetricFindValue, MonacoLanguageRegistryItem, MutableDataFrame, MutableField, NavIndex, NavLinkDTO, NavModel, NavModelItem, NewThemeOptions, NodeGraphDataFrameFieldNames, NullValueMode, NumberFieldConfigSettings, NumericLogLevel, NumericRange, OAuth, OAuthSettings, OptionDefaults, OrgProps, OrgRole, OrgVariableModel, PageLayoutType, PanelData, PanelDataSummary, PanelEditorProps, PanelEvents, PanelMenuItem, PanelMigrationHandler, PanelModel, PanelOptionEditorsRegistry, PanelOptionsEditorBuilder, PanelOptionsEditorConfig, PanelOptionsEditorItem, PanelOptionsEditorProps, PanelPlugin, PanelPluginDataSupport, PanelPluginMeta, PanelProps, PanelTypeChangedHandler, PartialDataFrame, PluginBuildInfo, PluginConfigPage, PluginConfigPageProps, PluginContextProvider, PluginContextProviderProps, PluginContextType, PluginDependencies, PluginError, PluginErrorCode, PluginExtension, PluginExtensionCommandPaletteContext, PluginExtensionComponent, PluginExtensionComponentConfig, PluginExtensionConfig, PluginExtensionDataSourceConfigContext, PluginExtensionEventHelpers, PluginExtensionLink, PluginExtensionLinkConfig, PluginExtensionOpenModalOptions, PluginExtensionPanelContext, PluginExtensionPoints, PluginExtensionTypes, PluginInclude, PluginIncludeType, PluginMeta, PluginMetaInfo, PluginSignatureStatus, PluginSignatureType, PluginState, PluginType, PreferredVisualisationType, QueryEditorHelpProps, QueryEditorProps, QueryFilterOptions, QueryFix, QueryFixAction, QueryFixType, QueryHint, QueryResultBase, QueryResultMeta, QueryResultMetaNotice, QueryResultMetaStat, QueryRunner, QueryRunnerOptions, QueryVariableModel, RangeMap, RangeMapOptions, RangeValueMatcherOptions, RawTimeRange, ReduceDataOptions, ReducerID, RegexMap, RegexMapOptions, RegexpOrNamesMatcherOptions, Registry, RegistryItem, RegistryItemWithOptions, RelativeTimeRange, RenameByRegexTransformerOptions, RenderMarkdownOptions, Scope, ScopeDashboardBinding, ScopeDashboardBindingSpec, ScopeFilterOperator, ScopeNode, ScopeNodeLinkType, ScopeNodeNodeType, ScopeNodeSpec, ScopeSpec, ScopeSpecFilter, ScopedVar, ScopedVars, ScreenshotInfo, SearchFilterOptions, SelectFieldConfigSettings, SelectableValue, SetFieldConfigOptionsArgs, SetPanelAttentionEvent, SliderFieldConfigSettings, SliderMarks, SpecialValue, SpecialValueMap, SpecialValueMatch, SpecialValueOptions, SplitOpen, SplitOpenOptions, StandardEditorContext, StandardEditorProps, StandardEditorsRegistryItem, StandardOptionConfig, StandardVariableQuery, StandardVariableSupport, StatsPickerConfigSettings, StreamingDataFrame, StreamingFrameAction, StreamingFrameOptions, StringFieldConfigSettings, SupplementaryQueryOptions, SupplementaryQueryType, SupportedTransformationType, SynchronousDataTransformerInfo, SystemConfigOverrideRule, SystemDateFormatSettings, SystemDateFormatsState, SystemVariable, TIME_FORMAT, TIME_SERIES_METRIC_FIELD_NAME, TIME_SERIES_TIME_FIELD_NAME, TIME_SERIES_VALUE_FIELD_NAME, TableData, TestDataSourceResponse, TextBoxVariableModel, TextMatch, ThemeBreakpoints, ThemeBreakpointsKey, ThemeColors, ThemeContext, ThemeRegistryItem, ThemeRichColor, ThemeShadows, ThemeShape, ThemeSpacing, ThemeSpacingTokens, ThemeTransitions, ThemeTypography, ThemeTypographyVariant, ThemeTypographyVariantTypes, ThemeVisualizationColors, ThemeVizColor, ThemeVizHue, ThemeZIndices, Threshold, ThresholdsConfig, ThresholdsFieldConfigSettings, ThresholdsMode, TimeFragment, TimeOption, TimeOptions, TimeRange, TimeSeries, TimeSeriesPoints, TimeSeriesValue, TimeZone, TimeZoneBrowser, TimeZoneCountry, TimeZoneInfo, TimeZoneResolver, TimeZoneUtc, ToggleFilterAction, TraceKeyValuePair, TraceLog, TraceSpanReference, TraceSpanRow, TransformationApplicabilityLevels, TransformationApplicabilityScore, TransformerCategory, TransformerRegistryItem, TransformerUIProps, TypedVariableModel, URLRange, URLRangeValue, UnaryOperation, UnaryOperationID, UnitFieldConfigSettings, UrlQueryMap, UrlQueryValue, UserOrgDTO, UserProps, UserVariableModel, VAR_CALC, VAR_CELL_PREFIX, VAR_FIELD_LABELS, VAR_FIELD_NAME, VAR_SERIES_NAME, ValueFormat, ValueFormatCategory, ValueFormatter, ValueFormatterIndex, ValueLinkConfig, ValueMap, ValueMapping, ValueMappingFieldConfigSettings, ValueMappingResult, ValueMatcher, ValueMatcherID, ValueMatcherInfo, ValueMatcherOptions, VariableHide, VariableModel, VariableOption, VariableOrigin, VariableRefresh, VariableSort, VariableSuggestion, VariableSuggestionsScope, VariableSupportBase, VariableSupportType, VariableType, VariableWithMultiSupport, VariableWithOptions, VisualizationSuggestion, VisualizationSuggestionScore, VisualizationSuggestionsBuilder, VisualizationSuggestionsListAppender, VisualizationSuggestionsSupplier, VizOrientation, WithAccessControlMetadata, WithLoadingIndicatorOptions, YAxis, addDurationToDate, addRow, anySeriesWithTimeField, anyToNumber, applyFieldOverrides, applyNullInsertThreshold, applyRawFieldOverrides, arrayToDataFrame, arrayUtils_d as arrayUtils, availableIconsIndex, binaryOperators, booleanOverrideProcessor, booleanValueFormatter, buildHistogram, cacheFieldDisplayNames, classicColors, closestIdx, colorManipulator_d as colorManipulator, compareArrayValues, compareDataFrameStructures, containsSearchFilter, convertOldAngularValueMappings, createDataFrame, createDimension, createFieldConfigRegistry, createTheme, dataFrameFromJSON, dataFrameToJSON, dataLinksOverrideProcessor, datemath_d as dateMath, dateTime, dateTimeAsMoment, dateTimeForTimeZone, dateTimeFormat, dateTimeFormatISO, dateTimeFormatTimeAgo, dateTimeFormatWithAbbrevation, dateTimeParse, decodeFieldValueEntities, decodeFieldValueEnums, defaultCalcs, deprecationWarning, displayNameOverrideProcessor, doStandardCalcs, durationToMilliseconds, ensureTimeField, escapeRegex, escapeStringForRegex, eventFactory, fieldColorModeRegistry, fieldMatchers, fieldReducers, filterFieldConfigOverrides, findCommonLabels, findHighlightChunksInText, findMatchesInText, findUniqueLabels, fixCellTemplateExpressions, formatLabels, formattedValueToString, frameMatchers, getActiveThreshold, getAllValuesFromDimension, getBuiltInThemes, getColumnFromDimension, getColumnsFromDimension, getDataFrameRow, getDataSourceRef, getDataSourceUID, getDefaultRelativeTimeRange, getDefaultTimeRange, getDimensionByName, getDisplayProcessor, getDisplayValueAlignmentFactors, getFieldColorMode, getFieldColorModeForField, getFieldConfigWithMinMax, getFieldDisplayName, getFieldDisplayValues, getFieldDisplayValuesProxy, getFieldMatcher, getFieldSeriesColor, getFieldTypeFromValue, getFlotPairs, getFlotPairsConstant, getFrameDisplayName, getFrameMatchers, getHistogramFields, getLinksSupplier, getLocale, getLocaleData, getMinMaxAndDelta, getNextRefId, getPanelOptionsWithDefaults, getProcessedDataFrames, getRawDisplayProcessor, getRowUniqueId, getScaleCalculator, getSearchFilterScopedVar, getSeriesTimeStep, getThemeById, getTimeField, getTimeZone, getTimeZoneGroups, getTimeZoneInfo, getTimeZones, getUniqueFieldName, getValueFormat, getValueFormats, getValueFormatterIndex, getValueFromDimension, getValueMatcher, getWeekdayIndex, getWeekdayIndexByEnglishName, getZone, guessDecimals, guessFieldTypeForField, guessFieldTypeFromNameAndValue, guessFieldTypeFromValue, guessFieldTypes, hasLinks, hasLogsContextSupport, hasLogsContextUiSupport, hasMsResolution, hasQueryExportSupport, hasQueryImportSupport, hasQueryModificationSupport, hasSupplementaryQuerySupport, hasTimeField, hasToggleableQueryFiltersSupport, histogramBucketSizes, histogramFieldInfo, histogramFieldsToFrame, histogramFrameBucketMaxFieldName, histogramFrameBucketMinFieldName, histogramTransformer, identityOverrideProcessor, incrRound, incrRoundDn, incrRoundUp, intervalToAbbreviatedDurationString, isBooleanUnit, isCustomFieldProp, isDataFrame, isDataFrameWithValue, isDataSourcePluginContext, isDataSourceRef, isDateTime, isDateTimeInput, isEmptyObject, isHistogramFrameBucketMaxFieldName, isHistogramFrameBucketMinFieldName, isIconName, isLikelyAscendingVector, isLiveChannelJoinEvent, isLiveChannelLeaveEvent, isLiveChannelMessageEvent, isLiveChannelStatusEvent, isObject, isReducerID, isStandardFieldProp, isSystemOverride, isSystemOverrideWithRef, isTableData, isTimeSeriesField, isTimeSeriesFrame, isTimeSeriesFrames, isTruthy, isUnsignedPluginSignature, isValidDate, isValidDuration, isValidGoDuration, isValidGrafanaDuration, isValidLiveChannelAddress, localTimeFormat, locale, locationUtil, makeClassES5Compatible, makeTimeRange, mapInternalLinkToExplore, matchAllLabels, matchPluginId, monacoLanguageRegistry, nullToValue, numberOverrideProcessor, objRemoveUndefined, onUpdateDatasourceJsonDataOption, onUpdateDatasourceJsonDataOptionChecked, onUpdateDatasourceJsonDataOptionSelect, onUpdateDatasourceOption, onUpdateDatasourceResetOption, onUpdateDatasourceSecureJsonDataOption, onUpdateDatasourceSecureJsonDataOptionSelect, joinDataFrames as outerJoinDataFrames, parseDuration, parseFlags, parseLabels, parseLiveChannelAddress, patchArrayVectorProrotypeMethods, preProcessPanelData, preferredVisualizationTypes, rangeutil_d as rangeUtil, readCSV, reduceField, renderLegendFormat, renderMarkdown, renderTextPanelMarkdown, restoreCustomOverrideRules, reverseDataFrame, roundDecimals, scaledUnits, scopeFilterOperatorMap, selectOverrideProcessor, serializeStateToUrlParam, setLocale, setTimeZoneResolver, setWeekStart, shallowCompare, simpleCountUnit, sortDataFrame, sortThresholds, standardEditorsRegistry, standardFieldConfigEditorRegistry, standardTransformers, standardTransformersRegistry, stringFormater, stringOverrideProcessor, stringStartsAsRegEx, stringToJsRegex, stringToMs, systemDateFormats, textUtil, thresholdsOverrideProcessor, timeZoneAbbrevation, timeZoneFormatUserFriendly, toCSV, toDataFrame, toDataFrameDTO, toDuration, toFilteredDataFrameDTO, toFixed, toFixedScaled, toFixedUnit, toFloatOrUndefined, toIconName, toIntegerOrUndefined, toLegacyResponseData, toLiveChannelId, toNumberString, toOption, toPascalCase, toURLRange, toUtc, transformDataFrame, unEscapeStringFromRegex, unaryOperators, unitOverrideProcessor, updateDatasourcePluginJsonDataOption, updateDatasourcePluginOption, updateDatasourcePluginResetOption, updateDatasourcePluginSecureJsonDataOption, urlUtil, useFieldOverrides, usePluginContext, validateFieldConfig, valueMappingsOverrideProcessor, valueMatchers, vectorator, withLoadingIndicator };
