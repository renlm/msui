/**
 * A topic is attached to DataFrame metadata in query results.
 * This specifies where the data should be used.
 */
export declare enum DataTopic {
    AlertStates = "alertStates",
    Annotations = "annotations",
    Series = "series"
}
/**
 * TODO docs
 */
export interface DataSourceJsonData {
    alertmanagerUid?: string;
    authType?: string;
    defaultRegion?: string;
    manageAlerts?: boolean;
    profile?: string;
}
/**
 * These are the common properties available to all queries in all datasources.
 * Specific implementations will *extend* this interface, adding the required
 * properties for the given context.
 */
export interface DataQuery {
    /**
     * For mixed data sources the selected datasource is on the query level.
     * For non mixed scenarios this is undefined.
     * TODO find a better way to do this ^ that's friendly to schema
     * TODO this shouldn't be unknown but DataSourceRef | null
     */
    datasource?: unknown;
    /**
     * If hide is set to true, Grafana will filter out the response(s) associated with this query before returning it to the panel.
     */
    hide?: boolean;
    /**
     * Specify the query flavor
     * TODO make this required and give it a default
     */
    queryType?: string;
    /**
     * A unique identifier for the query within the list of targets.
     * In server side expressions, the refId is used as a variable name to identify results.
     * By default, the UI will assign A->Z; however setting meaningful names may be useful.
     */
    refId: string;
}
export interface BaseDimensionConfig {
    /**
     * fixed: T -- will be added by each element
     */
    field?: string;
}
export declare enum ScaleDimensionMode {
    Linear = "linear",
    Quad = "quad"
}
export interface ScaleDimensionConfig extends BaseDimensionConfig {
    fixed?: number;
    max: number;
    min: number;
    mode?: ScaleDimensionMode;
}
export interface ColorDimensionConfig extends BaseDimensionConfig {
    fixed?: string;
}
export declare enum ScalarDimensionMode {
    Clamped = "clamped",
    Mod = "mod"
}
export interface ScalarDimensionConfig extends BaseDimensionConfig {
    fixed?: number;
    max: number;
    min: number;
    mode?: ScalarDimensionMode;
}
export declare enum TextDimensionMode {
    Field = "field",
    Fixed = "fixed",
    Template = "template"
}
export interface TextDimensionConfig extends BaseDimensionConfig {
    fixed?: string;
    mode: TextDimensionMode;
}
export declare enum ResourceDimensionMode {
    Field = "field",
    Fixed = "fixed",
    Mapping = "mapping"
}
export interface MapLayerOptions {
    /**
     * Custom options depending on the type
     */
    config?: unknown;
    /**
     * Defines a frame MatcherConfig that may filter data for the given layer
     */
    filterData?: unknown;
    /**
     * Common method to define geometry fields
     */
    location?: FrameGeometrySource;
    /**
     * configured unique display name
     */
    name: string;
    /**
     * Common properties:
     * https://openlayers.org/en/latest/apidoc/module-ol_layer_Base-BaseLayer.html
     * Layer opacity (0-1)
     */
    opacity?: number;
    /**
     * Check tooltip (defaults to true)
     */
    tooltip?: boolean;
    type: string;
}
export declare enum FrameGeometrySourceMode {
    Auto = "auto",
    Coords = "coords",
    Geohash = "geohash",
    Lookup = "lookup"
}
export declare enum HeatmapCalculationMode {
    Count = "count",
    Size = "size"
}
export declare enum HeatmapCellLayout {
    auto = "auto",
    ge = "ge",
    le = "le",
    unknown = "unknown"
}
export interface HeatmapCalculationBucketConfig {
    /**
     * Sets the bucket calculation mode
     */
    mode?: HeatmapCalculationMode;
    /**
     * Controls the scale of the buckets
     */
    scale?: ScaleDistributionConfig;
    /**
     * The number of buckets to use for the axis in the heatmap
     */
    value?: string;
}
export declare enum LogsSortOrder {
    Ascending = "Ascending",
    Descending = "Descending"
}
/**
 * TODO docs
 */
export declare enum AxisPlacement {
    Auto = "auto",
    Bottom = "bottom",
    Hidden = "hidden",
    Left = "left",
    Right = "right",
    Top = "top"
}
/**
 * TODO docs
 */
export declare enum AxisColorMode {
    Series = "series",
    Text = "text"
}
/**
 * TODO docs
 */
export declare enum VisibilityMode {
    Always = "always",
    Auto = "auto",
    Never = "never"
}
/**
 * TODO docs
 */
export declare enum GraphDrawStyle {
    Bars = "bars",
    Line = "line",
    Points = "points"
}
/**
 * TODO docs
 */
export declare enum GraphTransform {
    Constant = "constant",
    NegativeY = "negative-Y"
}
/**
 * TODO docs
 */
export declare enum LineInterpolation {
    Linear = "linear",
    Smooth = "smooth",
    StepAfter = "stepAfter",
    StepBefore = "stepBefore"
}
/**
 * TODO docs
 */
export declare enum ScaleDistribution {
    Linear = "linear",
    Log = "log",
    Ordinal = "ordinal",
    Symlog = "symlog"
}
/**
 * TODO docs
 */
export declare enum GraphGradientMode {
    Hue = "hue",
    None = "none",
    Opacity = "opacity",
    Scheme = "scheme"
}
/**
 * TODO docs
 */
export declare enum StackingMode {
    None = "none",
    Normal = "normal",
    Percent = "percent"
}
/**
 * TODO docs
 */
export declare enum BarAlignment {
    After = 1,
    Before = -1,
    Center = 0
}
/**
 * TODO docs
 */
export declare enum ScaleOrientation {
    Horizontal = 0,
    Vertical = 1
}
/**
 * TODO docs
 */
export declare enum ScaleDirection {
    Down = -1,
    Left = -1,
    Right = 1,
    Up = 1
}
/**
 * TODO docs
 */
export interface LineStyle {
    dash?: Array<number>;
    fill?: ('solid' | 'dash' | 'dot' | 'square');
}
export declare const defaultLineStyle: Partial<LineStyle>;
/**
 * TODO docs
 */
export interface LineConfig {
    lineColor?: string;
    lineInterpolation?: LineInterpolation;
    lineStyle?: LineStyle;
    lineWidth?: number;
    /**
     * Indicate if null values should be treated as gaps or connected.
     * When the value is a number, it represents the maximum delta in the
     * X axis that should be considered connected.  For timeseries, this is milliseconds
     */
    spanNulls?: (boolean | number);
}
/**
 * TODO docs
 */
export interface BarConfig {
    barAlignment?: BarAlignment;
    barMaxWidth?: number;
    barWidthFactor?: number;
}
/**
 * TODO docs
 */
export interface FillConfig {
    fillBelowTo?: string;
    fillColor?: string;
    fillOpacity?: number;
}
/**
 * TODO docs
 */
export interface PointsConfig {
    pointColor?: string;
    pointSize?: number;
    pointSymbol?: string;
    showPoints?: VisibilityMode;
}
/**
 * TODO docs
 */
export interface ScaleDistributionConfig {
    linearThreshold?: number;
    log?: number;
    type: ScaleDistribution;
}
/**
 * TODO docs
 */
export interface AxisConfig {
    axisBorderShow?: boolean;
    axisCenteredZero?: boolean;
    axisColorMode?: AxisColorMode;
    axisGridShow?: boolean;
    axisLabel?: string;
    axisPlacement?: AxisPlacement;
    axisSoftMax?: number;
    axisSoftMin?: number;
    axisWidth?: number;
    scaleDistribution?: ScaleDistributionConfig;
}
/**
 * TODO docs
 */
export interface HideSeriesConfig {
    legend: boolean;
    tooltip: boolean;
    viz: boolean;
}
/**
 * TODO docs
 */
export interface StackingConfig {
    group?: string;
    mode?: StackingMode;
}
/**
 * TODO docs
 */
export interface StackableFieldConfig {
    stacking?: StackingConfig;
}
/**
 * TODO docs
 */
export interface HideableFieldConfig {
    hideFrom?: HideSeriesConfig;
}
/**
 * TODO docs
 */
export declare enum GraphThresholdsStyleMode {
    Area = "area",
    Dashed = "dashed",
    DashedAndArea = "dashed+area",
    Line = "line",
    LineAndArea = "line+area",
    Off = "off",
    Series = "series"
}
/**
 * TODO docs
 */
export interface GraphThresholdsStyleConfig {
    mode: GraphThresholdsStyleMode;
}
/**
 * TODO docs
 */
export type LegendPlacement = ('bottom' | 'right');
/**
 * TODO docs
 * Note: "hidden" needs to remain as an option for plugins compatibility
 */
export declare enum LegendDisplayMode {
    Hidden = "hidden",
    List = "list",
    Table = "table"
}
/**
 * TODO docs
 */
export interface SingleStatBaseOptions extends OptionsWithTextFormatting {
    orientation: VizOrientation;
    reduceOptions: ReduceDataOptions;
}
/**
 * TODO docs
 */
export interface ReduceDataOptions {
    /**
     * When !values, pick one value for the whole field
     */
    calcs: Array<string>;
    /**
     * Which fields to show.  By default this is only numeric fields
     */
    fields?: string;
    /**
     * if showing all values limit
     */
    limit?: number;
    /**
     * If true show each row value
     */
    values?: boolean;
}
export declare const defaultReduceDataOptions: Partial<ReduceDataOptions>;
/**
 * TODO docs
 */
export declare enum VizOrientation {
    Auto = "auto",
    Horizontal = "horizontal",
    Vertical = "vertical"
}
/**
 * TODO docs
 */
export interface OptionsWithTooltip {
    tooltip: VizTooltipOptions;
}
/**
 * TODO docs
 */
export interface OptionsWithLegend {
    legend: VizLegendOptions;
}
/**
 * TODO docs
 */
export interface OptionsWithTimezones {
    timezone?: Array<TimeZone>;
}
export declare const defaultOptionsWithTimezones: Partial<OptionsWithTimezones>;
/**
 * TODO docs
 */
export interface OptionsWithTextFormatting {
    text?: VizTextDisplayOptions;
}
/**
 * TODO docs
 */
export declare enum BigValueColorMode {
    Background = "background",
    BackgroundSolid = "background_solid",
    None = "none",
    Value = "value"
}
/**
 * TODO docs
 */
export declare enum BigValueGraphMode {
    Area = "area",
    Line = "line",
    None = "none"
}
/**
 * TODO docs
 */
export declare enum BigValueJustifyMode {
    Auto = "auto",
    Center = "center"
}
/**
 * TODO docs
 */
export declare enum BigValueTextMode {
    Auto = "auto",
    Name = "name",
    None = "none",
    Value = "value",
    ValueAndName = "value_and_name"
}
/**
 * TODO docs
 */
export declare enum PercentChangeColorMode {
    Inverted = "inverted",
    SameAsValue = "same_as_value",
    Standard = "standard"
}
/**
 * TODO -- should not be table specific!
 * TODO docs
 */
export type FieldTextAlignment = ('auto' | 'left' | 'right' | 'center');
/**
 * Controls the value alignment in the TimelineChart component
 */
export type TimelineValueAlignment = ('center' | 'left' | 'right');
/**
 * TODO docs
 */
export interface VizTextDisplayOptions {
    /**
     * Explicit title text size
     */
    titleSize?: number;
    /**
     * Explicit value text size
     */
    valueSize?: number;
}
/**
 * TODO docs
 */
export declare enum TooltipDisplayMode {
    Multi = "multi",
    None = "none",
    Single = "single"
}
/**
 * TODO docs
 */
export declare enum SortOrder {
    Ascending = "asc",
    Descending = "desc",
    None = "none"
}
/**
 * TODO docs
 */
export interface GraphFieldConfig extends LineConfig, FillConfig, PointsConfig, AxisConfig, BarConfig, StackableFieldConfig, HideableFieldConfig {
    drawStyle?: GraphDrawStyle;
    gradientMode?: GraphGradientMode;
    insertNulls?: (boolean | number);
    thresholdsStyle?: GraphThresholdsStyleConfig;
    transform?: GraphTransform;
}
/**
 * TODO docs
 */
export interface VizLegendOptions {
    asTable?: boolean;
    calcs: Array<string>;
    displayMode: LegendDisplayMode;
    isVisible?: boolean;
    placement: LegendPlacement;
    showLegend: boolean;
    sortBy?: string;
    sortDesc?: boolean;
    width?: number;
}
export declare const defaultVizLegendOptions: Partial<VizLegendOptions>;
/**
 * Enum expressing the possible display modes
 * for the bar gauge component of Grafana UI
 */
export declare enum BarGaugeDisplayMode {
    Basic = "basic",
    Gradient = "gradient",
    Lcd = "lcd"
}
/**
 * Allows for the table cell gauge display type to set the gauge mode.
 */
export declare enum BarGaugeValueMode {
    Color = "color",
    Hidden = "hidden",
    Text = "text"
}
/**
 * Allows for the bar gauge name to be placed explicitly
 */
export declare enum BarGaugeNamePlacement {
    Auto = "auto",
    Left = "left",
    Top = "top"
}
/**
 * Allows for the bar gauge size to be set explicitly
 */
export declare enum BarGaugeSizing {
    Auto = "auto",
    Manual = "manual"
}
/**
 * TODO docs
 */
export interface VizTooltipOptions {
    maxHeight?: number;
    maxWidth?: number;
    mode: TooltipDisplayMode;
    sort: SortOrder;
}
export interface Labels {
}
/**
 * Internally, this is the "type" of cell that's being displayed
 * in the table such as colored text, JSON, gauge, etc.
 * The color-background-solid, gradient-gauge, and lcd-gauge
 * modes are deprecated in favor of new cell subOptions
 */
export declare enum TableCellDisplayMode {
    Auto = "auto",
    BasicGauge = "basic",
    ColorBackground = "color-background",
    ColorBackgroundSolid = "color-background-solid",
    ColorText = "color-text",
    Custom = "custom",
    DataLinks = "data-links",
    Gauge = "gauge",
    GradientGauge = "gradient-gauge",
    Image = "image",
    JSONView = "json-view",
    LcdGauge = "lcd-gauge",
    Sparkline = "sparkline"
}
/**
 * Display mode to the "Colored Background" display
 * mode for table cells. Either displays a solid color (basic mode)
 * or a gradient.
 */
export declare enum TableCellBackgroundDisplayMode {
    Basic = "basic",
    Gradient = "gradient"
}
/**
 * Sort by field state
 */
export interface TableSortByFieldState {
    /**
     * Flag used to indicate descending sort order
     */
    desc?: boolean;
    /**
     * Sets the display name of the field to sort by
     */
    displayName: string;
}
/**
 * Footer options
 */
export interface TableFooterOptions {
    countRows?: boolean;
    enablePagination?: boolean;
    fields?: Array<string>;
    reducer: Array<string>;
    show: boolean;
}
export declare const defaultTableFooterOptions: Partial<TableFooterOptions>;
/**
 * Auto mode table cell options
 */
export interface TableAutoCellOptions {
    type: TableCellDisplayMode.Auto;
    wrapText?: boolean;
}
/**
 * Colored text cell options
 */
export interface TableColorTextCellOptions {
    type: TableCellDisplayMode.ColorText;
    wrapText?: boolean;
}
/**
 * Json view cell options
 */
export interface TableJsonViewCellOptions {
    type: TableCellDisplayMode.JSONView;
}
/**
 * Json view cell options
 */
export interface TableImageCellOptions {
    type: TableCellDisplayMode.Image;
}
/**
 * Show data links in the cell
 */
export interface TableDataLinksCellOptions {
    type: TableCellDisplayMode.DataLinks;
}
/**
 * Gauge cell options
 */
export interface TableBarGaugeCellOptions {
    mode?: BarGaugeDisplayMode;
    type: TableCellDisplayMode.Gauge;
    valueDisplayMode?: BarGaugeValueMode;
}
/**
 * Sparkline cell options
 */
export interface TableSparklineCellOptions extends GraphFieldConfig {
    hideValue?: boolean;
    type: TableCellDisplayMode.Sparkline;
}
/**
 * Colored background cell options
 */
export interface TableColoredBackgroundCellOptions {
    applyToRow?: boolean;
    mode?: TableCellBackgroundDisplayMode;
    type: TableCellDisplayMode.ColorBackground;
    wrapText?: boolean;
}
/**
 * Height of a table cell
 */
export declare enum TableCellHeight {
    Auto = "auto",
    Lg = "lg",
    Md = "md",
    Sm = "sm"
}
/**
 * Table cell options. Each cell has a display mode
 * and other potential options for that display.
 */
export type TableCellOptions = (TableAutoCellOptions | TableSparklineCellOptions | TableBarGaugeCellOptions | TableColoredBackgroundCellOptions | TableColorTextCellOptions | TableImageCellOptions | TableDataLinksCellOptions | TableJsonViewCellOptions);
/**
 * Use UTC/GMT timezone
 */
export type TimeZoneUtc = 'utc';
/**
 * Use the timezone defined by end user web browser
 */
export type TimeZoneBrowser = 'browser';
/**
 * Optional formats for the template variable replace functions
 * See also https://grafana.com/docs/grafana/latest/dashboards/variables/variable-syntax/#advanced-variable-format-options
 */
export declare enum VariableFormatID {
    CSV = "csv",
    Date = "date",
    Distributed = "distributed",
    DoubleQuote = "doublequote",
    Glob = "glob",
    HTML = "html",
    JSON = "json",
    Lucene = "lucene",
    PercentEncode = "percentencode",
    Pipe = "pipe",
    QueryParam = "queryparam",
    Raw = "raw",
    Regex = "regex",
    SQLString = "sqlstring",
    SingleQuote = "singlequote",
    Text = "text",
    UriEncode = "uriencode"
}
export interface DataSourceRef {
    /**
     * The plugin type-id
     */
    type?: string;
    /**
     * Specific datasource instance
     */
    uid?: string;
}
/**
 * Links to a resource (image/svg path)
 */
export interface ResourceDimensionConfig extends BaseDimensionConfig {
    fixed?: string;
    mode: ResourceDimensionMode;
}
export interface FrameGeometrySource {
    /**
     * Path to Gazetteer
     */
    gazetteer?: string;
    /**
     * Field mappings
     */
    geohash?: string;
    latitude?: string;
    longitude?: string;
    lookup?: string;
    mode: FrameGeometrySourceMode;
    wkt?: string;
}
export interface HeatmapCalculationOptions {
    /**
     * The number of buckets to use for the xAxis in the heatmap
     */
    xBuckets?: HeatmapCalculationBucketConfig;
    /**
     * The number of buckets to use for the yAxis in the heatmap
     */
    yBuckets?: HeatmapCalculationBucketConfig;
}
export declare enum LogsDedupStrategy {
    exact = "exact",
    none = "none",
    numbers = "numbers",
    signature = "signature"
}
/**
 * Compare two values
 */
export declare enum ComparisonOperation {
    EQ = "eq",
    GT = "gt",
    GTE = "gte",
    LT = "lt",
    LTE = "lte",
    NEQ = "neq"
}
/**
 * Field options for each field within a table (e.g 10, "The String", 64.20, etc.)
 * Generally defines alignment, filtering capabilties, display options, etc.
 */
export interface TableFieldOptions {
    align: FieldTextAlignment;
    cellOptions: TableCellOptions;
    /**
     * This field is deprecated in favor of using cellOptions
     */
    displayMode?: TableCellDisplayMode;
    filterable?: boolean;
    hidden?: boolean;
    /**
     * Hides any header for a column, useful for columns that show some static content or buttons.
     */
    hideHeader?: boolean;
    inspect: boolean;
    minWidth?: number;
    width?: number;
}
export declare const defaultTableFieldOptions: Partial<TableFieldOptions>;
/**
 * A specific timezone from https://en.wikipedia.org/wiki/Tz_database
 */
export type TimeZone = (TimeZoneUtc | TimeZoneBrowser | string);
export declare const defaultTimeZone: TimeZone;
