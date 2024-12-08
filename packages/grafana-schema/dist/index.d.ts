/**
 * A topic is attached to DataFrame metadata in query results.
 * This specifies where the data should be used.
 */
declare enum DataTopic {
    AlertStates = "alertStates",
    Annotations = "annotations",
    Series = "series"
}
/**
 * TODO docs
 */
interface DataSourceJsonData {
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
interface DataQuery$1 {
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
interface BaseDimensionConfig$1 {
    /**
     * fixed: T -- will be added by each element
     */
    field?: string;
}
declare enum ScaleDimensionMode {
    Linear = "linear",
    Quad = "quad"
}
interface ScaleDimensionConfig$1 extends BaseDimensionConfig$1 {
    fixed?: number;
    max: number;
    min: number;
    mode?: ScaleDimensionMode;
}
interface ColorDimensionConfig$1 extends BaseDimensionConfig$1 {
    fixed?: string;
}
declare enum ScalarDimensionMode {
    Clamped = "clamped",
    Mod = "mod"
}
interface ScalarDimensionConfig$1 extends BaseDimensionConfig$1 {
    fixed?: number;
    max: number;
    min: number;
    mode?: ScalarDimensionMode;
}
declare enum TextDimensionMode {
    Field = "field",
    Fixed = "fixed",
    Template = "template"
}
interface TextDimensionConfig$1 extends BaseDimensionConfig$1 {
    fixed?: string;
    mode: TextDimensionMode;
}
declare enum ResourceDimensionMode {
    Field = "field",
    Fixed = "fixed",
    Mapping = "mapping"
}
interface MapLayerOptions$1 {
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
declare enum FrameGeometrySourceMode {
    Auto = "auto",
    Coords = "coords",
    Geohash = "geohash",
    Lookup = "lookup"
}
declare enum HeatmapCalculationMode {
    Count = "count",
    Size = "size"
}
declare enum HeatmapCellLayout {
    auto = "auto",
    ge = "ge",
    le = "le",
    unknown = "unknown"
}
interface HeatmapCalculationBucketConfig {
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
declare enum LogsSortOrder {
    Ascending = "Ascending",
    Descending = "Descending"
}
/**
 * TODO docs
 */
declare enum AxisPlacement {
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
declare enum AxisColorMode {
    Series = "series",
    Text = "text"
}
/**
 * TODO docs
 */
declare enum VisibilityMode {
    Always = "always",
    Auto = "auto",
    Never = "never"
}
/**
 * TODO docs
 */
declare enum GraphDrawStyle {
    Bars = "bars",
    Line = "line",
    Points = "points"
}
/**
 * TODO docs
 */
declare enum GraphTransform {
    Constant = "constant",
    NegativeY = "negative-Y"
}
/**
 * TODO docs
 */
declare enum LineInterpolation {
    Linear = "linear",
    Smooth = "smooth",
    StepAfter = "stepAfter",
    StepBefore = "stepBefore"
}
/**
 * TODO docs
 */
declare enum ScaleDistribution {
    Linear = "linear",
    Log = "log",
    Ordinal = "ordinal",
    Symlog = "symlog"
}
/**
 * TODO docs
 */
declare enum GraphGradientMode {
    Hue = "hue",
    None = "none",
    Opacity = "opacity",
    Scheme = "scheme"
}
/**
 * TODO docs
 */
declare enum StackingMode {
    None = "none",
    Normal = "normal",
    Percent = "percent"
}
/**
 * TODO docs
 */
declare enum BarAlignment {
    After = 1,
    Before = -1,
    Center = 0
}
/**
 * TODO docs
 */
declare enum ScaleOrientation {
    Horizontal = 0,
    Vertical = 1
}
/**
 * TODO docs
 */
declare enum ScaleDirection {
    Down = -1,
    Left = -1,
    Right = 1,
    Up = 1
}
/**
 * TODO docs
 */
interface LineStyle {
    dash?: Array<number>;
    fill?: ('solid' | 'dash' | 'dot' | 'square');
}
declare const defaultLineStyle: Partial<LineStyle>;
/**
 * TODO docs
 */
interface LineConfig {
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
interface BarConfig {
    barAlignment?: BarAlignment;
    barMaxWidth?: number;
    barWidthFactor?: number;
}
/**
 * TODO docs
 */
interface FillConfig {
    fillBelowTo?: string;
    fillColor?: string;
    fillOpacity?: number;
}
/**
 * TODO docs
 */
interface PointsConfig {
    pointColor?: string;
    pointSize?: number;
    pointSymbol?: string;
    showPoints?: VisibilityMode;
}
/**
 * TODO docs
 */
interface ScaleDistributionConfig {
    linearThreshold?: number;
    log?: number;
    type: ScaleDistribution;
}
/**
 * TODO docs
 */
interface AxisConfig {
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
interface HideSeriesConfig {
    legend: boolean;
    tooltip: boolean;
    viz: boolean;
}
/**
 * TODO docs
 */
interface StackingConfig {
    group?: string;
    mode?: StackingMode;
}
/**
 * TODO docs
 */
interface StackableFieldConfig {
    stacking?: StackingConfig;
}
/**
 * TODO docs
 */
interface HideableFieldConfig {
    hideFrom?: HideSeriesConfig;
}
/**
 * TODO docs
 */
declare enum GraphThresholdsStyleMode {
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
interface GraphThresholdsStyleConfig {
    mode: GraphThresholdsStyleMode;
}
/**
 * TODO docs
 */
type LegendPlacement = ('bottom' | 'right');
/**
 * TODO docs
 * Note: "hidden" needs to remain as an option for plugins compatibility
 */
declare enum LegendDisplayMode {
    Hidden = "hidden",
    List = "list",
    Table = "table"
}
/**
 * TODO docs
 */
interface SingleStatBaseOptions extends OptionsWithTextFormatting {
    orientation: VizOrientation;
    reduceOptions: ReduceDataOptions;
}
/**
 * TODO docs
 */
interface ReduceDataOptions {
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
declare const defaultReduceDataOptions: Partial<ReduceDataOptions>;
/**
 * TODO docs
 */
declare enum VizOrientation {
    Auto = "auto",
    Horizontal = "horizontal",
    Vertical = "vertical"
}
/**
 * TODO docs
 */
interface OptionsWithTooltip {
    tooltip: VizTooltipOptions;
}
/**
 * TODO docs
 */
interface OptionsWithLegend {
    legend: VizLegendOptions;
}
/**
 * TODO docs
 */
interface OptionsWithTimezones {
    timezone?: Array<TimeZone>;
}
declare const defaultOptionsWithTimezones: Partial<OptionsWithTimezones>;
/**
 * TODO docs
 */
interface OptionsWithTextFormatting {
    text?: VizTextDisplayOptions;
}
/**
 * TODO docs
 */
declare enum BigValueColorMode {
    Background = "background",
    BackgroundSolid = "background_solid",
    None = "none",
    Value = "value"
}
/**
 * TODO docs
 */
declare enum BigValueGraphMode {
    Area = "area",
    Line = "line",
    None = "none"
}
/**
 * TODO docs
 */
declare enum BigValueJustifyMode {
    Auto = "auto",
    Center = "center"
}
/**
 * TODO docs
 */
declare enum BigValueTextMode {
    Auto = "auto",
    Name = "name",
    None = "none",
    Value = "value",
    ValueAndName = "value_and_name"
}
/**
 * TODO docs
 */
declare enum PercentChangeColorMode {
    Inverted = "inverted",
    SameAsValue = "same_as_value",
    Standard = "standard"
}
/**
 * TODO -- should not be table specific!
 * TODO docs
 */
type FieldTextAlignment = ('auto' | 'left' | 'right' | 'center');
/**
 * Controls the value alignment in the TimelineChart component
 */
type TimelineValueAlignment = ('center' | 'left' | 'right');
/**
 * TODO docs
 */
interface VizTextDisplayOptions {
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
declare enum TooltipDisplayMode {
    Multi = "multi",
    None = "none",
    Single = "single"
}
/**
 * TODO docs
 */
declare enum SortOrder {
    Ascending = "asc",
    Descending = "desc",
    None = "none"
}
/**
 * TODO docs
 */
interface GraphFieldConfig extends LineConfig, FillConfig, PointsConfig, AxisConfig, BarConfig, StackableFieldConfig, HideableFieldConfig {
    drawStyle?: GraphDrawStyle;
    gradientMode?: GraphGradientMode;
    insertNulls?: (boolean | number);
    thresholdsStyle?: GraphThresholdsStyleConfig;
    transform?: GraphTransform;
}
/**
 * TODO docs
 */
interface VizLegendOptions {
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
declare const defaultVizLegendOptions: Partial<VizLegendOptions>;
/**
 * Enum expressing the possible display modes
 * for the bar gauge component of Grafana UI
 */
declare enum BarGaugeDisplayMode {
    Basic = "basic",
    Gradient = "gradient",
    Lcd = "lcd"
}
/**
 * Allows for the table cell gauge display type to set the gauge mode.
 */
declare enum BarGaugeValueMode {
    Color = "color",
    Hidden = "hidden",
    Text = "text"
}
/**
 * Allows for the bar gauge name to be placed explicitly
 */
declare enum BarGaugeNamePlacement {
    Auto = "auto",
    Left = "left",
    Top = "top"
}
/**
 * Allows for the bar gauge size to be set explicitly
 */
declare enum BarGaugeSizing {
    Auto = "auto",
    Manual = "manual"
}
/**
 * TODO docs
 */
interface VizTooltipOptions {
    maxHeight?: number;
    maxWidth?: number;
    mode: TooltipDisplayMode;
    sort: SortOrder;
}
interface Labels {
}
/**
 * Internally, this is the "type" of cell that's being displayed
 * in the table such as colored text, JSON, gauge, etc.
 * The color-background-solid, gradient-gauge, and lcd-gauge
 * modes are deprecated in favor of new cell subOptions
 */
declare enum TableCellDisplayMode {
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
declare enum TableCellBackgroundDisplayMode {
    Basic = "basic",
    Gradient = "gradient"
}
/**
 * Sort by field state
 */
interface TableSortByFieldState {
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
interface TableFooterOptions {
    countRows?: boolean;
    enablePagination?: boolean;
    fields?: Array<string>;
    reducer: Array<string>;
    show: boolean;
}
declare const defaultTableFooterOptions: Partial<TableFooterOptions>;
/**
 * Auto mode table cell options
 */
interface TableAutoCellOptions {
    type: TableCellDisplayMode.Auto;
    wrapText?: boolean;
}
/**
 * Colored text cell options
 */
interface TableColorTextCellOptions {
    type: TableCellDisplayMode.ColorText;
    wrapText?: boolean;
}
/**
 * Json view cell options
 */
interface TableJsonViewCellOptions {
    type: TableCellDisplayMode.JSONView;
}
/**
 * Json view cell options
 */
interface TableImageCellOptions {
    type: TableCellDisplayMode.Image;
}
/**
 * Show data links in the cell
 */
interface TableDataLinksCellOptions {
    type: TableCellDisplayMode.DataLinks;
}
/**
 * Gauge cell options
 */
interface TableBarGaugeCellOptions {
    mode?: BarGaugeDisplayMode;
    type: TableCellDisplayMode.Gauge;
    valueDisplayMode?: BarGaugeValueMode;
}
/**
 * Sparkline cell options
 */
interface TableSparklineCellOptions extends GraphFieldConfig {
    hideValue?: boolean;
    type: TableCellDisplayMode.Sparkline;
}
/**
 * Colored background cell options
 */
interface TableColoredBackgroundCellOptions {
    applyToRow?: boolean;
    mode?: TableCellBackgroundDisplayMode;
    type: TableCellDisplayMode.ColorBackground;
    wrapText?: boolean;
}
/**
 * Height of a table cell
 */
declare enum TableCellHeight {
    Auto = "auto",
    Lg = "lg",
    Md = "md",
    Sm = "sm"
}
/**
 * Table cell options. Each cell has a display mode
 * and other potential options for that display.
 */
type TableCellOptions = (TableAutoCellOptions | TableSparklineCellOptions | TableBarGaugeCellOptions | TableColoredBackgroundCellOptions | TableColorTextCellOptions | TableImageCellOptions | TableDataLinksCellOptions | TableJsonViewCellOptions);
/**
 * Use UTC/GMT timezone
 */
type TimeZoneUtc = 'utc';
/**
 * Use the timezone defined by end user web browser
 */
type TimeZoneBrowser = 'browser';
/**
 * Optional formats for the template variable replace functions
 * See also https://grafana.com/docs/grafana/latest/dashboards/variables/variable-syntax/#advanced-variable-format-options
 */
declare enum VariableFormatID {
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
interface DataSourceRef$1 {
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
interface ResourceDimensionConfig$1 extends BaseDimensionConfig$1 {
    fixed?: string;
    mode: ResourceDimensionMode;
}
interface FrameGeometrySource {
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
interface HeatmapCalculationOptions {
    /**
     * The number of buckets to use for the xAxis in the heatmap
     */
    xBuckets?: HeatmapCalculationBucketConfig;
    /**
     * The number of buckets to use for the yAxis in the heatmap
     */
    yBuckets?: HeatmapCalculationBucketConfig;
}
declare enum LogsDedupStrategy {
    exact = "exact",
    none = "none",
    numbers = "numbers",
    signature = "signature"
}
/**
 * Compare two values
 */
declare enum ComparisonOperation {
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
interface TableFieldOptions {
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
/**
 * A specific timezone from https://en.wikipedia.org/wiki/Tz_database
 */
type TimeZone = (TimeZoneUtc | TimeZoneBrowser | string);
declare const defaultTimeZone: TimeZone;

/**
 * TODO: this should be a regular DataQuery that depends on the selected dashboard
 * these match the properties of the "grafana" datasouce that is default in most dashboards
 */
interface AnnotationTarget {
    /**
     * Only required/valid for the grafana datasource...
     * but code+tests is already depending on it so hard to change
     */
    limit: number;
    /**
     * Only required/valid for the grafana datasource...
     * but code+tests is already depending on it so hard to change
     */
    matchAny: boolean;
    /**
     * Only required/valid for the grafana datasource...
     * but code+tests is already depending on it so hard to change
     */
    tags: Array<string>;
    /**
     * Only required/valid for the grafana datasource...
     * but code+tests is already depending on it so hard to change
     */
    type: string;
}
declare const defaultAnnotationTarget: Partial<AnnotationTarget>;
interface AnnotationPanelFilter {
    /**
     * Should the specified panels be included or excluded
     */
    exclude?: boolean;
    /**
     * Panel IDs that should be included or excluded
     */
    ids: Array<number>;
}
declare const defaultAnnotationPanelFilter: Partial<AnnotationPanelFilter>;
/**
 * Contains the list of annotations that are associated with the dashboard.
 * Annotations are used to overlay event markers and overlay event tags on graphs.
 * Grafana comes with a native annotation store and the ability to add annotation events directly from the graph panel or via the HTTP API.
 * See https://grafana.com/docs/grafana/latest/dashboards/build-dashboards/annotate-visualizations/
 */
interface AnnotationContainer$1 {
    /**
     * List of annotations
     */
    list?: Array<AnnotationQuery$1>;
}
/**
 * TODO docs
 * FROM: AnnotationQuery in grafana-data/src/types/annotations.ts
 */
interface AnnotationQuery$1 {
    /**
     * Set to 1 for the standard annotation query all dashboards have by default.
     */
    builtIn?: number;
    /**
     * Datasource where the annotations data is
     */
    datasource: DataSourceRef;
    /**
     * When enabled the annotation query is issued with every dashboard refresh
     */
    enable: boolean;
    /**
     * Filters to apply when fetching annotations
     */
    filter?: AnnotationPanelFilter;
    /**
     * Annotation queries can be toggled on or off at the top of the dashboard.
     * When hide is true, the toggle is not shown in the dashboard.
     */
    hide?: boolean;
    /**
     * Color to use for the annotation event markers
     */
    iconColor: string;
    /**
     * Name of annotation.
     */
    name: string;
    /**
     * TODO.. this should just be a normal query target
     */
    target?: AnnotationTarget;
    /**
     * TODO -- this should not exist here, it is based on the --grafana-- datasource
     */
    type?: string;
}
/**
 * A variable is a placeholder for a value. You can use variables in metric queries and in panel titles.
 */
interface VariableModel$1 {
    /**
     * Custom all value
     */
    allValue?: string;
    /**
     * Shows current selected variable text/value on the dashboard
     */
    current?: VariableOption;
    /**
     * Data source used to fetch values for a variable. It can be defined but `null`.
     */
    datasource?: DataSourceRef;
    /**
     * Description of variable. It can be defined but `null`.
     */
    description?: string;
    /**
     * Visibility configuration for the variable
     */
    hide?: VariableHide$1;
    /**
     * Whether all value option is available or not
     */
    includeAll?: boolean;
    /**
     * Optional display name
     */
    label?: string;
    /**
     * Whether multiple values can be selected or not from variable value list
     */
    multi?: boolean;
    /**
     * Name of variable
     */
    name: string;
    /**
     * Options that can be selected for a variable.
     */
    options?: Array<VariableOption>;
    /**
     * Query used to fetch values for a variable
     */
    query?: (string | Record<string, unknown>);
    /**
     * Options to config when to refresh a variable
     */
    refresh?: VariableRefresh;
    /**
     * Optional field, if you want to extract part of a series name or metric node segment.
     * Named capture groups can be used to separate the display text and value.
     */
    regex?: string;
    /**
     * Whether the variable value should be managed by URL query params or not
     */
    skipUrlSync?: boolean;
    /**
     * Options sort order
     */
    sort?: VariableSort;
    /**
     * Type of variable
     */
    type: VariableType;
}
/**
 * Option to be selected in a variable.
 */
interface VariableOption {
    /**
     * Whether the option is selected or not
     */
    selected?: boolean;
    /**
     * Text to be displayed for the option
     */
    text: (string | Array<string>);
    /**
     * Value of the option
     */
    value: (string | Array<string>);
}
/**
 * Options to config when to refresh a variable
 * `0`: Never refresh the variable
 * `1`: Queries the data source every time the dashboard loads.
 * `2`: Queries the data source when the dashboard time range changes.
 */
declare enum VariableRefresh {
    never = 0,
    onDashboardLoad = 1,
    onTimeRangeChanged = 2
}
/**
 * Determine if the variable shows on dashboard
 * Accepted values are 0 (show label and value), 1 (show value only), 2 (show nothing).
 */
declare enum VariableHide$1 {
    dontHide = 0,
    hideLabel = 1,
    hideVariable = 2
}
/**
 * Sort variable options
 * Accepted values are:
 * `0`: No sorting
 * `1`: Alphabetical ASC
 * `2`: Alphabetical DESC
 * `3`: Numerical ASC
 * `4`: Numerical DESC
 * `5`: Alphabetical Case Insensitive ASC
 * `6`: Alphabetical Case Insensitive DESC
 * `7`: Natural ASC
 * `8`: Natural DESC
 */
declare enum VariableSort {
    alphabeticalAsc = 1,
    alphabeticalCaseInsensitiveAsc = 5,
    alphabeticalCaseInsensitiveDesc = 6,
    alphabeticalDesc = 2,
    disabled = 0,
    naturalAsc = 7,
    naturalDesc = 8,
    numericalAsc = 3,
    numericalDesc = 4
}
/**
 * Ref to a DataSource instance
 */
interface DataSourceRef {
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
 * Links with references to other dashboards or external resources
 */
interface DashboardLink {
    /**
     * If true, all dashboards links will be displayed in a dropdown. If false, all dashboards links will be displayed side by side. Only valid if the type is dashboards
     */
    asDropdown: boolean;
    /**
     * Icon name to be displayed with the link
     */
    icon: string;
    /**
     * If true, includes current template variables values in the link as query params
     */
    includeVars: boolean;
    /**
     * If true, includes current time range in the link as query params
     */
    keepTime: boolean;
    /**
     * List of tags to limit the linked dashboards. If empty, all dashboards will be displayed. Only valid if the type is dashboards
     */
    tags: Array<string>;
    /**
     * If true, the link will be opened in a new tab
     */
    targetBlank: boolean;
    /**
     * Title to display with the link
     */
    title: string;
    /**
     * Tooltip to display when the user hovers their mouse over it
     */
    tooltip: string;
    /**
     * Link type. Accepted values are dashboards (to refer to another dashboard) and link (to refer to an external resource)
     */
    type: DashboardLinkType;
    /**
     * Link URL. Only required/valid if the type is link
     */
    url?: string;
}
declare const defaultDashboardLink: Partial<DashboardLink>;
/**
 * Dashboard Link type. Accepted values are dashboards (to refer to another dashboard) and link (to refer to an external resource)
 */
type DashboardLinkType = ('link' | 'dashboards');
/**
 * Dashboard variable type
 * `query`: Query-generated list of values such as metric names, server names, sensor IDs, data centers, and so on.
 * `adhoc`: Key/value filters that are automatically added to all metric queries for a data source (Prometheus, Loki, InfluxDB, and Elasticsearch only).
 * `constant`: 	Define a hidden constant.
 * `datasource`: Quickly change the data source for an entire dashboard.
 * `interval`: Interval variables represent time spans.
 * `textbox`: Display a free text input field with an optional default value.
 * `custom`: Define the variable options manually using a comma-separated list.
 * `system`: Variables defined by Grafana. See: https://grafana.com/docs/grafana/latest/dashboards/variables/add-template-variables/#global-variables
 */
type VariableType = ('query' | 'adhoc' | 'groupby' | 'constant' | 'datasource' | 'interval' | 'textbox' | 'custom' | 'system');
/**
 * Color mode for a field. You can specify a single color, or select a continuous (gradient) color schemes, based on a value.
 * Continuous color interpolates a color using the percentage of a value relative to min and max.
 * Accepted values are:
 * `thresholds`: From thresholds. Informs Grafana to take the color from the matching threshold
 * `palette-classic`: Classic palette. Grafana will assign color by looking up a color in a palette by series index. Useful for Graphs and pie charts and other categorical data visualizations
 * `palette-classic-by-name`: Classic palette (by name). Grafana will assign color by looking up a color in a palette by series name. Useful for Graphs and pie charts and other categorical data visualizations
 * `continuous-GrYlRd`: ontinuous Green-Yellow-Red palette mode
 * `continuous-RdYlGr`: Continuous Red-Yellow-Green palette mode
 * `continuous-BlYlRd`: Continuous Blue-Yellow-Red palette mode
 * `continuous-YlRd`: Continuous Yellow-Red palette mode
 * `continuous-BlPu`: Continuous Blue-Purple palette mode
 * `continuous-YlBl`: Continuous Yellow-Blue palette mode
 * `continuous-blues`: Continuous Blue palette mode
 * `continuous-reds`: Continuous Red palette mode
 * `continuous-greens`: Continuous Green palette mode
 * `continuous-purples`: Continuous Purple palette mode
 * `shades`: Shades of a single color. Specify a single color, useful in an override rule.
 * `fixed`: Fixed color mode. Specify a single color, useful in an override rule.
 */
declare enum FieldColorModeId {
    ContinuousBlPu = "continuous-BlPu",
    ContinuousBlYlRd = "continuous-BlYlRd",
    ContinuousBlues = "continuous-blues",
    ContinuousGrYlRd = "continuous-GrYlRd",
    ContinuousGreens = "continuous-greens",
    ContinuousPurples = "continuous-purples",
    ContinuousRdYlGr = "continuous-RdYlGr",
    ContinuousReds = "continuous-reds",
    ContinuousYlBl = "continuous-YlBl",
    ContinuousYlRd = "continuous-YlRd",
    Fixed = "fixed",
    PaletteClassic = "palette-classic",
    PaletteClassicByName = "palette-classic-by-name",
    Shades = "shades",
    Thresholds = "thresholds"
}
/**
 * Defines how to assign a series color from "by value" color schemes. For example for an aggregated data points like a timeseries, the color can be assigned by the min, max or last value.
 */
type FieldColorSeriesByMode = ('min' | 'max' | 'last');
/**
 * Map a field to a color.
 */
interface FieldColor {
    /**
     * The fixed color value for fixed or shades color modes.
     */
    fixedColor?: string;
    /**
     * The main color scheme mode.
     */
    mode: FieldColorModeId;
    /**
     * Some visualizations need to know how to assign a series color from by value color schemes.
     */
    seriesBy?: FieldColorSeriesByMode;
}
/**
 * Position and dimensions of a panel in the grid
 */
interface GridPos {
    /**
     * Panel height. The height is the number of rows from the top edge of the panel.
     */
    h: number;
    /**
     * Whether the panel is fixed within the grid. If true, the panel will not be affected by other panels' interactions
     */
    static?: boolean;
    /**
     * Panel width. The width is the number of columns from the left edge of the panel.
     */
    w: number;
    /**
     * Panel x. The x coordinate is the number of columns from the left edge of the grid
     */
    x: number;
    /**
     * Panel y. The y coordinate is the number of rows from the top edge of the grid
     */
    y: number;
}
declare const defaultGridPos: Partial<GridPos>;
/**
 * User-defined value for a metric that triggers visual changes in a panel when this value is met or exceeded
 * They are used to conditionally style and color visualizations based on query results , and can be applied to most visualizations.
 */
interface Threshold {
    /**
     * Color represents the color of the visual change that will occur in the dashboard when the threshold value is met or exceeded.
     */
    color: string;
    /**
     * Value represents a specified metric for the threshold, which triggers a visual change in the dashboard when this value is met or exceeded.
     * Nulls currently appear here when serializing -Infinity to JSON.
     */
    value: (number | null);
}
/**
 * Thresholds can either be `absolute` (specific number) or `percentage` (relative to min or max, it will be values between 0 and 1).
 */
declare enum ThresholdsMode {
    Absolute = "absolute",
    Percentage = "percentage"
}
/**
 * Thresholds configuration for the panel
 */
interface ThresholdsConfig {
    /**
     * Thresholds mode.
     */
    mode: ThresholdsMode;
    /**
     * Must be sorted by 'value', first value is always -Infinity
     */
    steps: Array<Threshold>;
}
declare const defaultThresholdsConfig: Partial<ThresholdsConfig>;
/**
 * Allow to transform the visual representation of specific data values in a visualization, irrespective of their original units
 */
type ValueMapping = (ValueMap | RangeMap | RegexMap | SpecialValueMap);
/**
 * Supported value mapping types
 * `value`: Maps text values to a color or different display text and color. For example, you can configure a value mapping so that all instances of the value 10 appear as Perfection! rather than the number.
 * `range`: Maps numerical ranges to a display text and color. For example, if a value is within a certain range, you can configure a range value mapping to display Low or High rather than the number.
 * `regex`: Maps regular expressions to replacement text and a color. For example, if a value is www.example.com, you can configure a regex value mapping so that Grafana displays www and truncates the domain.
 * `special`: Maps special values like Null, NaN (not a number), and boolean values like true and false to a display text and color. See SpecialValueMatch to see the list of special values. For example, you can configure a special value mapping so that null values appear as N/A.
 */
declare enum MappingType {
    RangeToText = "range",
    RegexToText = "regex",
    SpecialValue = "special",
    ValueToText = "value"
}
/**
 * Maps text values to a color or different display text and color.
 * For example, you can configure a value mapping so that all instances of the value 10 appear as Perfection! rather than the number.
 */
interface ValueMap {
    /**
     * Map with <value_to_match>: ValueMappingResult. For example: { "10": { text: "Perfection!", color: "green" } }
     */
    options: Record<string, ValueMappingResult>;
    type: MappingType.ValueToText;
}
/**
 * Maps numerical ranges to a display text and color.
 * For example, if a value is within a certain range, you can configure a range value mapping to display Low or High rather than the number.
 */
interface RangeMap {
    /**
     * Range to match against and the result to apply when the value is within the range
     */
    options: {
        /**
         * Min value of the range. It can be null which means -Infinity
         */
        from: (number | null);
        /**
         * Max value of the range. It can be null which means +Infinity
         */
        to: (number | null);
        /**
         * Config to apply when the value is within the range
         */
        result: ValueMappingResult;
    };
    type: MappingType.RangeToText;
}
/**
 * Maps regular expressions to replacement text and a color.
 * For example, if a value is www.example.com, you can configure a regex value mapping so that Grafana displays www and truncates the domain.
 */
interface RegexMap {
    /**
     * Regular expression to match against and the result to apply when the value matches the regex
     */
    options: {
        /**
         * Regular expression to match against
         */
        pattern: string;
        /**
         * Config to apply when the value matches the regex
         */
        result: ValueMappingResult;
    };
    type: MappingType.RegexToText;
}
/**
 * Maps special values like Null, NaN (not a number), and boolean values like true and false to a display text and color.
 * See SpecialValueMatch to see the list of special values.
 * For example, you can configure a special value mapping so that null values appear as N/A.
 */
interface SpecialValueMap {
    options: {
        /**
         * Special value to match against
         */
        match: SpecialValueMatch;
        /**
         * Config to apply when the value matches the special value
         */
        result: ValueMappingResult;
    };
    type: MappingType.SpecialValue;
}
/**
 * Special value types supported by the `SpecialValueMap`
 */
declare enum SpecialValueMatch {
    Empty = "empty",
    False = "false",
    NaN = "nan",
    Null = "null",
    NullAndNan = "null+nan",
    True = "true"
}
/**
 * Result used as replacement with text and color when the value matches
 */
interface ValueMappingResult {
    /**
     * Text to use when the value matches
     */
    color?: string;
    /**
     * Icon to display when the value matches. Only specific visualizations.
     */
    icon?: string;
    /**
     * Position in the mapping array. Only used internally.
     */
    index?: number;
    /**
     * Text to display when the value matches
     */
    text?: string;
}
/**
 * Transformations allow to manipulate data returned by a query before the system applies a visualization.
 * Using transformations you can: rename fields, join time series data, perform mathematical operations across queries,
 * use the output of one transformation as the input to another transformation, etc.
 */
interface DataTransformerConfig$1 {
    /**
     * Disabled transformations are skipped
     */
    disabled?: boolean;
    /**
     * Optional frame matcher. When missing it will be applied to all results
     */
    filter?: MatcherConfig$1;
    /**
     * Unique identifier of transformer
     */
    id: string;
    /**
     * Options to be passed to the transformer
     * Valid options depend on the transformer id
     */
    options: unknown;
    /**
     * Where to pull DataFrames from as input to transformation
     */
    topic?: ('series' | 'annotations' | 'alertStates');
}
/**
 * Time picker configuration
 * It defines the default config for the time picker and the refresh picker for the specific dashboard.
 */
interface TimePickerConfig$1 {
    /**
     * Whether timepicker is visible or not.
     */
    hidden?: boolean;
    /**
     * Override the now time by entering a time delay. Use this option to accommodate known delays in data aggregation to avoid null values.
     */
    nowDelay?: string;
    /**
     * Interval options available in the refresh picker dropdown.
     */
    refresh_intervals?: Array<string>;
    /**
     * Selectable options available in the time picker dropdown. Has no effect on provisioned dashboard.
     */
    time_options?: Array<string>;
}
/**
 * 0 for no shared crosshair or tooltip (default).
 * 1 for shared crosshair.
 * 2 for shared crosshair AND shared tooltip.
 */
declare enum DashboardCursorSync {
    Crosshair = 1,
    Off = 0,
    Tooltip = 2
}
declare const defaultDashboardCursorSync: DashboardCursorSync;
/**
 * Dashboard panels are the basic visualization building blocks.
 */
interface Panel$1 {
    /**
     * Sets panel queries cache timeout.
     */
    cacheTimeout?: string;
    /**
     * The datasource used in all targets.
     */
    datasource?: DataSourceRef;
    /**
     * Panel description.
     */
    description?: string;
    /**
     * Field options allow you to change how the data is displayed in your visualizations.
     */
    fieldConfig?: FieldConfigSource$1;
    /**
     * Grid position.
     */
    gridPos?: GridPos;
    /**
     * Controls if the timeFrom or timeShift overrides are shown in the panel header
     */
    hideTimeOverride?: boolean;
    /**
     * Unique identifier of the panel. Generated by Grafana when creating a new panel. It must be unique within a dashboard, but not globally.
     */
    id?: number;
    /**
     * The min time interval setting defines a lower limit for the $__interval and $__interval_ms variables.
     * This value must be formatted as a number followed by a valid time
     * identifier like: "40s", "3d", etc.
     * See: https://grafana.com/docs/grafana/latest/panels-visualizations/query-transform-data/#query-options
     */
    interval?: string;
    /**
     * Dynamically load the panel
     */
    libraryPanel?: LibraryPanelRef;
    /**
     * Panel links.
     */
    links?: Array<DashboardLink>;
    /**
     * The maximum number of data points that the panel queries are retrieving.
     */
    maxDataPoints?: number;
    /**
     * Option for repeated panels that controls max items per row
     * Only relevant for horizontally repeated panels
     */
    maxPerRow?: number;
    /**
     * It depends on the panel plugin. They are specified by the Options field in panel plugin schemas.
     */
    options?: Record<string, unknown>;
    /**
     * The version of the plugin that is used for this panel. This is used to find the plugin to display the panel and to migrate old panel configs.
     */
    pluginVersion?: string;
    /**
     * Overrides the data source configured time-to-live for a query cache item in milliseconds
     */
    queryCachingTTL?: number;
    /**
     * Name of template variable to repeat for.
     */
    repeat?: string;
    /**
     * Direction to repeat in if 'repeat' is set.
     * `h` for horizontal, `v` for vertical.
     */
    repeatDirection?: ('h' | 'v');
    /**
     * Depends on the panel plugin. See the plugin documentation for details.
     */
    targets?: Array<Record<string, unknown>>;
    /**
     * Overrides the relative time range for individual panels,
     * which causes them to be different than what is selected in
     * the dashboard time picker in the top-right corner of the dashboard. You can use this to show metrics from different
     * time periods or days on the same dashboard.
     * The value is formatted as time operation like: `now-5m` (Last 5 minutes), `now/d` (the day so far),
     * `now-5d/d`(Last 5 days), `now/w` (This week so far), `now-2y/y` (Last 2 years).
     * Note: Panel time overrides have no effect when the dashboard’s time range is absolute.
     * See: https://grafana.com/docs/grafana/latest/panels-visualizations/query-transform-data/#query-options
     */
    timeFrom?: string;
    /**
     * Overrides the time range for individual panels by shifting its start and end relative to the time picker.
     * For example, you can shift the time range for the panel to be two hours earlier than the dashboard time picker setting `2h`.
     * Note: Panel time overrides have no effect when the dashboard’s time range is absolute.
     * See: https://grafana.com/docs/grafana/latest/panels-visualizations/query-transform-data/#query-options
     */
    timeShift?: string;
    /**
     * Panel title.
     */
    title?: string;
    /**
     * List of transformations that are applied to the panel data before rendering.
     * When there are multiple transformations, Grafana applies them in the order they are listed.
     * Each transformation creates a result set that then passes on to the next transformation in the processing pipeline.
     */
    transformations?: Array<DataTransformerConfig$1>;
    /**
     * Whether to display the panel without a background.
     */
    transparent?: boolean;
    /**
     * The panel plugin type id. This is used to find the plugin to display the panel.
     */
    type: string;
}
/**
 * The data model used in Grafana, namely the data frame, is a columnar-oriented table structure that unifies both time series and table query results.
 * Each column within this structure is called a field. A field can represent a single time series or table column.
 * Field options allow you to change how the data is displayed in your visualizations.
 */
interface FieldConfigSource$1 {
    /**
     * Defaults are the options applied to all fields.
     */
    defaults: FieldConfig$1;
    /**
     * Overrides are the options applied to specific fields overriding the defaults.
     */
    overrides: Array<{
        matcher: MatcherConfig$1;
        properties: Array<{
            id: string;
            value?: unknown;
        }>;
    }>;
}
/**
 * A library panel is a reusable panel that you can use in any dashboard.
 * When you make a change to a library panel, that change propagates to all instances of where the panel is used.
 * Library panels streamline reuse of panels across multiple dashboards.
 */
interface LibraryPanelRef {
    /**
     * Library panel name
     */
    name: string;
    /**
     * Library panel uid
     */
    uid: string;
}
/**
 * Matcher is a predicate configuration. Based on the config a set of field(s) or values is filtered in order to apply override / transformation.
 * It comes with in id ( to resolve implementation from registry) and a configuration that’s specific to a particular matcher type.
 */
interface MatcherConfig$1 {
    /**
     * The matcher id. This is used to find the matcher implementation from registry.
     */
    id: string;
    /**
     * The matcher options. This is specific to the matcher implementation.
     */
    options?: unknown;
}
/**
 * The data model used in Grafana, namely the data frame, is a columnar-oriented table structure that unifies both time series and table query results.
 * Each column within this structure is called a field. A field can represent a single time series or table column.
 * Field options allow you to change how the data is displayed in your visualizations.
 */
interface FieldConfig$1 {
    /**
     * Panel color configuration
     */
    color?: FieldColor;
    /**
     * custom is specified by the FieldConfig field
     * in panel plugin schemas.
     */
    custom?: Record<string, unknown>;
    /**
     * Specify the number of decimals Grafana includes in the rendered value.
     * If you leave this field blank, Grafana automatically truncates the number of decimals based on the value.
     * For example 1.1234 will display as 1.12 and 100.456 will display as 100.
     * To display all decimals, set the unit to `String`.
     */
    decimals?: number;
    /**
     * Human readable field metadata
     */
    description?: string;
    /**
     * The display value for this field.  This supports template variables blank is auto
     */
    displayName?: string;
    /**
     * This can be used by data sources that return and explicit naming structure for values and labels
     * When this property is configured, this value is used rather than the default naming strategy.
     */
    displayNameFromDS?: string;
    /**
     * True if data source field supports ad-hoc filters
     */
    filterable?: boolean;
    /**
     * The behavior when clicking on a result
     */
    links?: Array<unknown>;
    /**
     * Convert input values into a display string
     */
    mappings?: Array<ValueMapping>;
    /**
     * The maximum value used in percentage threshold calculations. Leave blank for auto calculation based on all series and fields.
     */
    max?: number;
    /**
     * The minimum value used in percentage threshold calculations. Leave blank for auto calculation based on all series and fields.
     */
    min?: number;
    /**
     * Alternative to empty string
     */
    noValue?: string;
    /**
     * An explicit path to the field in the datasource.  When the frame meta includes a path,
     * This will default to `${frame.meta.path}/${field.name}
     *
     * When defined, this value can be used as an identifier within the datasource scope, and
     * may be used to update the results
     */
    path?: string;
    /**
     * Map numeric values to states
     */
    thresholds?: ThresholdsConfig;
    /**
     * Unit a field should use. The unit you select is applied to all fields except time.
     * You can use the units ID availables in Grafana or a custom unit.
     * Available units in Grafana: https://github.com/grafana/grafana/blob/main/packages/grafana-data/src/valueFormats/categories.ts
     * As custom unit, you can use the following formats:
     * `suffix:<suffix>` for custom unit that should go after value.
     * `prefix:<prefix>` for custom unit that should go before value.
     * `time:<format>` For custom date time formats type for example `time:YYYY-MM-DD`.
     * `si:<base scale><unit characters>` for custom SI units. For example: `si: mF`. This one is a bit more advanced as you can specify both a unit and the source data scale. So if your source data is represented as milli (thousands of) something prefix the unit with that SI scale character.
     * `count:<unit>` for a custom count unit.
     * `currency:<unit>` for custom a currency unit.
     */
    unit?: string;
    /**
     * True if data source can write a value to the path. Auth/authz are supported separately
     */
    writeable?: boolean;
}
/**
 * Row panel
 */
interface RowPanel$1 {
    /**
     * Whether this row should be collapsed or not.
     */
    collapsed: boolean;
    /**
     * Name of default datasource for the row
     */
    datasource?: DataSourceRef;
    /**
     * Row grid position
     */
    gridPos?: GridPos;
    /**
     * Unique identifier of the panel. Generated by Grafana when creating a new panel. It must be unique within a dashboard, but not globally.
     */
    id: number;
    /**
     * List of panels in the row
     */
    panels: Array<Panel$1>;
    /**
     * Name of template variable to repeat for.
     */
    repeat?: string;
    /**
     * Row title
     */
    title?: string;
    /**
     * The panel type
     */
    type: 'row';
}
interface Dashboard$1 {
    /**
     * Contains the list of annotations that are associated with the dashboard.
     * Annotations are used to overlay event markers and overlay event tags on graphs.
     * Grafana comes with a native annotation store and the ability to add annotation events directly from the graph panel or via the HTTP API.
     * See https://grafana.com/docs/grafana/latest/dashboards/build-dashboards/annotate-visualizations/
     */
    annotations?: AnnotationContainer$1;
    /**
     * Description of dashboard.
     */
    description?: string;
    /**
     * Whether a dashboard is editable or not.
     */
    editable?: boolean;
    /**
     * The month that the fiscal year starts on.  0 = January, 11 = December
     */
    fiscalYearStartMonth?: number;
    /**
     * ID of a dashboard imported from the https://grafana.com/grafana/dashboards/ portal
     */
    gnetId?: string;
    /**
     * Configuration of dashboard cursor sync behavior.
     * Accepted values are 0 (sync turned off), 1 (shared crosshair), 2 (shared crosshair and tooltip).
     */
    graphTooltip?: DashboardCursorSync;
    /**
     * Unique numeric identifier for the dashboard.
     * `id` is internal to a specific Grafana instance. `uid` should be used to identify a dashboard across Grafana instances.
     */
    id?: (number | null);
    /**
     * Links with references to other dashboards or external websites.
     */
    links?: Array<DashboardLink>;
    /**
     * When set to true, the dashboard will redraw panels at an interval matching the pixel width.
     * This will keep data "moving left" regardless of the query refresh rate. This setting helps
     * avoid dashboards presenting stale live data
     */
    liveNow?: boolean;
    /**
     * List of dashboard panels
     */
    panels?: Array<(Panel$1 | RowPanel$1)>;
    /**
     * Refresh rate of dashboard. Represented via interval string, e.g. "5s", "1m", "1h", "1d".
     */
    refresh?: string;
    /**
     * This property should only be used in dashboards defined by plugins.  It is a quick check
     * to see if the version has changed since the last time.
     */
    revision?: number;
    /**
     * Version of the JSON schema, incremented each time a Grafana update brings
     * changes to said schema.
     */
    schemaVersion: number;
    /**
     * Snapshot options. They are present only if the dashboard is a snapshot.
     */
    snapshot?: {
        /**
         * Time when the snapshot was created
         */
        created: string;
        /**
         * Time when the snapshot expires, default is never to expire
         */
        expires: string;
        /**
         * Is the snapshot saved in an external grafana instance
         */
        external: boolean;
        /**
         * external url, if snapshot was shared in external grafana instance
         */
        externalUrl: string;
        /**
         * original url, url of the dashboard that was snapshotted
         */
        originalUrl: string;
        /**
         * Unique identifier of the snapshot
         */
        id: number;
        /**
         * Optional, defined the unique key of the snapshot, required if external is true
         */
        key: string;
        /**
         * Optional, name of the snapshot
         */
        name: string;
        /**
         * org id of the snapshot
         */
        orgId: number;
        /**
         * last time when the snapshot was updated
         */
        updated: string;
        /**
         * url of the snapshot, if snapshot was shared internally
         */
        url?: string;
        /**
         * user id of the snapshot creator
         */
        userId: number;
    };
    /**
     * Tags associated with dashboard.
     */
    tags?: Array<string>;
    /**
     * Configured template variables
     */
    templating?: {
        /**
         * List of configured template variables with their saved values along with some other metadata
         */
        list?: Array<VariableModel$1>;
    };
    /**
     * Time range for dashboard.
     * Accepted values are relative time strings like {from: 'now-6h', to: 'now'} or absolute time strings like {from: '2020-07-10T08:00:00.000Z', to: '2020-07-10T14:00:00.000Z'}.
     */
    time?: {
        from: string;
        to: string;
    };
    /**
     * Configuration of the time picker shown at the top of a dashboard.
     */
    timepicker?: TimePickerConfig$1;
    /**
     * Timezone of dashboard. Accepted values are IANA TZDB zone ID or "browser" or "utc".
     */
    timezone?: string;
    /**
     * Title of dashboard.
     */
    title?: string;
    /**
     * Unique dashboard identifier that can be generated by anyone. string (8-40)
     */
    uid?: string;
    /**
     * Version of the dashboard, incremented each time the dashboard is updated.
     */
    version?: number;
    /**
     * Day when the week starts. Expressed by the name of the day in lowercase, e.g. "monday".
     */
    weekStart?: string;
}

interface Panel<TOptions = Record<string, unknown>, TCustomFieldConfig = Record<string, unknown>> extends Omit<Panel$1, 'fieldConfig'> {
    fieldConfig?: FieldConfigSource<TCustomFieldConfig>;
}
interface RowPanel extends Omit<RowPanel$1, 'panels'> {
    panels: Panel[];
}
declare enum VariableHide {
    dontHide = 0,
    hideLabel = 1,
    hideVariable = 2
}
interface VariableModel extends Omit<VariableModel$1, 'datasource'> {
    datasource?: DataSourceRef$1 | null;
}
interface Dashboard extends Omit<Dashboard$1, 'templating' | 'annotations' | 'panels'> {
    panels?: Array<Panel | RowPanel>;
    annotations?: AnnotationContainer;
    templating?: {
        list?: VariableModel[];
    };
}
interface AnnotationQuery<TQuery extends DataQuery = DataQuery> extends Omit<AnnotationQuery$1, 'target' | 'datasource'> {
    datasource?: DataSourceRef$1 | null;
    target?: TQuery;
    snapshotData?: unknown;
}
interface AnnotationContainer extends Omit<AnnotationContainer$1, 'list'> {
    list?: AnnotationQuery[];
}
interface FieldConfig<TOptions = Record<string, unknown>> extends FieldConfig$1 {
    custom?: TOptions & Record<string, unknown>;
}
interface FieldConfigSource<TOptions = Record<string, unknown>> extends Omit<FieldConfigSource$1, 'defaults'> {
    defaults: FieldConfig<TOptions>;
}
interface MatcherConfig<TConfig = any> extends MatcherConfig$1 {
    options?: TConfig;
}
interface DataTransformerConfig<TOptions = any> extends DataTransformerConfig$1 {
    options: TOptions;
    topic?: DataTopic;
}
interface TimePickerConfig extends TimePickerConfig$1 {
}
declare const defaultDashboard: Dashboard;
declare const defaultVariableModel: VariableModel;
declare const defaultTimePickerConfig: TimePickerConfig;
declare const defaultPanel: Partial<Panel>;
declare const defaultRowPanel: Partial<Panel>;
declare const defaultFieldConfig: Partial<FieldConfig>;
declare const defaultFieldConfigSource: Partial<FieldConfigSource>;
declare const defaultMatcherConfig: Partial<MatcherConfig>;
declare const defaultAnnotationQuery: Partial<AnnotationQuery>;
declare const defaultAnnotationContainer: Partial<AnnotationContainer>;

interface MapLayerOptions<TConfig = any> extends MapLayerOptions$1 {
    config?: TConfig;
    filterData?: MatcherConfig;
}
interface DataQuery extends DataQuery$1 {
    /**
     * Unique, guid like, string (used only in explore mode)
     */
    key?: string;
    datasource?: DataSourceRef$1 | null;
}
interface BaseDimensionConfig<T = string | number> extends Omit<BaseDimensionConfig$1, 'fixed'> {
    fixed: T;
}
interface ScaleDimensionConfig extends BaseDimensionConfig<number>, Omit<ScaleDimensionConfig$1, 'fixed'> {
}
interface ScalarDimensionConfig extends BaseDimensionConfig<number>, Omit<ScalarDimensionConfig$1, 'fixed'> {
}
interface TextDimensionConfig extends BaseDimensionConfig<string>, Omit<TextDimensionConfig$1, 'fixed'> {
}
interface ColorDimensionConfig extends BaseDimensionConfig<string>, Omit<ColorDimensionConfig$1, 'fixed'> {
}
interface ColorDimensionConfig extends BaseDimensionConfig<string>, Omit<ColorDimensionConfig$1, 'fixed'> {
}
interface ResourceDimensionConfig extends BaseDimensionConfig<string>, Omit<ResourceDimensionConfig$1, 'fixed'> {
}

declare const defaultTableFieldOptions: TableFieldOptions;
/**
 * Represent panel data loading state.
 * @deprecated Please use LoadingState from @grafana/data
 */
declare enum LoadingState {
    NotStarted = "NotStarted",
    Loading = "Loading",
    Streaming = "Streaming",
    Done = "Done",
    Error = "Error"
}

interface RoleRef {
    /**
     * Policies can apply to roles, teams, or users
     * Applying policies to individual users is supported, but discouraged
     */
    kind: ('Role' | 'BuiltinRole' | 'Team' | 'User');
    name: string;
    xname: string;
}
interface ResourceRef {
    kind: string;
    name: string;
}
interface AccessRule {
    /**
     * The kind this rule applies to (dashboards, alert, etc)
     */
    kind: ('*' | string);
    /**
     * Specific sub-elements like "alert.rules" or "dashboard.permissions"????
     */
    target?: string;
    /**
     * READ, WRITE, CREATE, DELETE, ...
     * should move to k8s style verbs like: "get", "list", "watch", "create", "update", "patch", "delete"
     */
    verb: ('*' | 'none' | string);
}
interface AccessPolicy {
    /**
     * The role that must apply this policy
     */
    role: RoleRef;
    /**
     * The set of rules to apply.  Note that * is required to modify
     * access policy rules, and that "none" will reject all actions
     */
    rules: Array<AccessRule>;
    /**
     * The scope where these policies should apply
     */
    scope: ResourceRef;
}
declare const defaultAccessPolicy: Partial<AccessPolicy>;

interface LibraryElementDTOMetaUser {
    avatarUrl: string;
    id: number;
    name: string;
}
interface LibraryElementDTOMeta {
    connectedDashboards: number;
    created: string;
    createdBy: LibraryElementDTOMetaUser;
    folderName: string;
    folderUid: string;
    updated: string;
    updatedBy: LibraryElementDTOMetaUser;
}
interface LibraryPanel$1 {
    /**
     * Panel description
     */
    description?: string;
    /**
     * Folder UID
     */
    folderUid?: string;
    /**
     * Object storage metadata
     */
    meta?: LibraryElementDTOMeta;
    /**
     * TODO: should be the same panel schema defined in dashboard
     * Typescript: Omit<Panel, 'gridPos' | 'id' | 'libraryPanel'>;
     */
    model: Record<string, unknown>;
    /**
     * Panel name (also saved in the model)
     */
    name: string;
    /**
     * Dashboard version when this was saved (zero if unknown)
     */
    schemaVersion?: number;
    /**
     * The panel type (from inside the model)
     */
    type: string;
    /**
     * Library element UID
     */
    uid: string;
    /**
     * panel version, incremented each time the dashboard is updated.
     */
    version: number;
}

interface LibraryPanel extends LibraryPanel$1 {
    model: Omit<Panel, 'gridPos' | 'id' | 'libraryPanel'>;
}

interface QueryHistoryPreference {
    /**
     * one of: '' | 'query' | 'starred';
     */
    homeTab?: string;
}
interface CookiePreferences {
    analytics?: Record<string, unknown>;
    functional?: Record<string, unknown>;
    performance?: Record<string, unknown>;
}
/**
 * Spec defines user, team or org Grafana preferences
 * swagger:model Preferences
 */
interface Preferences {
    /**
     * Cookie preferences
     */
    cookiePreferences?: CookiePreferences;
    /**
     * UID for the home dashboard
     */
    homeDashboardUID?: string;
    /**
     * Selected language (beta)
     */
    language?: string;
    /**
     * Explore query history preferences
     */
    queryHistory?: QueryHistoryPreference;
    /**
     * light, dark, empty is default
     */
    theme?: string;
    /**
     * The timezone selection
     * TODO: this should use the timezone defined in common
     */
    timezone?: string;
    /**
     * day of the week (sunday, monday, etc)
     */
    weekStart?: string;
}

interface PublicDashboard {
    /**
     * Unique public access token
     */
    accessToken?: string;
    /**
     * Flag that indicates if annotations are enabled
     */
    annotationsEnabled: boolean;
    /**
     * Dashboard unique identifier referenced by this public dashboard
     */
    dashboardUid: string;
    /**
     * Flag that indicates if the public dashboard is enabled
     */
    isEnabled: boolean;
    /**
     * Flag that indicates if the time range picker is enabled
     */
    timeSelectionEnabled: boolean;
    /**
     * Unique public dashboard identifier
     */
    uid: string;
}

interface Role {
    /**
     * Role description
     */
    description?: string;
    /**
     * Optional display
     */
    displayName?: string;
    /**
     * Name of the team.
     */
    groupName?: string;
    /**
     * Do not show this role
     */
    hidden: (boolean | false);
    /**
     * The role identifier `managed:builtins:editor:permissions`
     */
    name: string;
}

interface CustomRoleRef {
    kind: 'Role';
    name: string;
}
interface BuiltinRoleRef {
    kind: 'BuiltinRole';
    name: ('viewer' | 'editor' | 'admin');
}
interface RoleBindingSubject {
    kind: ('Team' | 'User');
    /**
     * The team/user identifier name
     */
    name: string;
}
interface RoleBinding {
    /**
     * The role we are discussing
     */
    role: (BuiltinRoleRef | CustomRoleRef);
    /**
     * The team or user that has the specified role
     */
    subject: RoleBindingSubject;
}

interface Team {
    /**
     * Email of the team.
     */
    email?: string;
    /**
     * Name of the team.
     */
    name: string;
}

export { AccessPolicy, AccessRule, AnnotationContainer, AnnotationPanelFilter, AnnotationQuery, AnnotationTarget, AxisColorMode, AxisConfig, AxisPlacement, BarAlignment, BarConfig, BarGaugeDisplayMode, BarGaugeNamePlacement, BarGaugeSizing, BarGaugeValueMode, BaseDimensionConfig, BigValueColorMode, BigValueGraphMode, BigValueJustifyMode, BigValueTextMode, BuiltinRoleRef, ColorDimensionConfig, ComparisonOperation, CookiePreferences, CustomRoleRef, Dashboard, DashboardCursorSync, DashboardLink, DashboardLinkType, DataQuery, DataSourceJsonData, DataSourceRef$1 as DataSourceRef, DataTopic, DataTransformerConfig, FieldColor, FieldColorModeId, FieldColorSeriesByMode, FieldConfig, FieldConfigSource, FieldTextAlignment, FillConfig, FrameGeometrySource, FrameGeometrySourceMode, GraphDrawStyle, GraphFieldConfig, GraphGradientMode, GraphThresholdsStyleConfig, GraphThresholdsStyleMode, GraphTransform, GridPos, HeatmapCalculationBucketConfig, HeatmapCalculationMode, HeatmapCalculationOptions, HeatmapCellLayout, HideSeriesConfig, HideableFieldConfig, Labels, LegendDisplayMode, LegendPlacement, LibraryElementDTOMeta, LibraryElementDTOMetaUser, LibraryPanel, LibraryPanelRef, LineConfig, LineInterpolation, LineStyle, LoadingState, LogsDedupStrategy, LogsSortOrder, MapLayerOptions, MappingType, MatcherConfig, OptionsWithLegend, OptionsWithTextFormatting, OptionsWithTimezones, OptionsWithTooltip, Panel, PercentChangeColorMode, PointsConfig, Preferences, PublicDashboard, QueryHistoryPreference, RangeMap, ReduceDataOptions, RegexMap, ResourceDimensionConfig, ResourceDimensionMode, ResourceRef, Role, RoleBinding, RoleBindingSubject, RoleRef, RowPanel, ScalarDimensionConfig, ScalarDimensionMode, ScaleDimensionConfig, ScaleDimensionMode, ScaleDirection, ScaleDistribution, ScaleDistributionConfig, ScaleOrientation, SingleStatBaseOptions, SortOrder, SpecialValueMap, SpecialValueMatch, StackableFieldConfig, StackingConfig, StackingMode, TableAutoCellOptions, TableBarGaugeCellOptions, TableCellBackgroundDisplayMode, TableCellDisplayMode, TableCellHeight, TableCellOptions, TableColorTextCellOptions, TableColoredBackgroundCellOptions, TableDataLinksCellOptions, TableFieldOptions, TableFooterOptions, TableImageCellOptions, TableJsonViewCellOptions, TableSortByFieldState, TableSparklineCellOptions, Team, TextDimensionConfig, TextDimensionMode, Threshold, ThresholdsConfig, ThresholdsMode, TimePickerConfig, TimeZone, TimeZoneBrowser, TimeZoneUtc, TimelineValueAlignment, TooltipDisplayMode, ValueMap, ValueMapping, ValueMappingResult, VariableFormatID, VariableHide, VariableModel, VariableOption, VariableRefresh, VariableSort, VariableType, VisibilityMode, VizLegendOptions, VizOrientation, VizTextDisplayOptions, VizTooltipOptions, defaultAccessPolicy, defaultAnnotationContainer, defaultAnnotationPanelFilter, defaultAnnotationQuery, defaultAnnotationTarget, defaultDashboard, defaultDashboardCursorSync, defaultDashboardLink, defaultFieldConfig, defaultFieldConfigSource, defaultGridPos, defaultLineStyle, defaultMatcherConfig, defaultOptionsWithTimezones, defaultPanel, defaultReduceDataOptions, defaultRowPanel, defaultTableFieldOptions, defaultTableFooterOptions, defaultThresholdsConfig, defaultTimePickerConfig, defaultTimeZone, defaultVariableModel, defaultVizLegendOptions };
