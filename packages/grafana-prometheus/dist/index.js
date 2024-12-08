'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var data = require('@grafana/data');
var lodash = require('lodash');
var experimental = require('@grafana/experimental');
var runtime = require('@grafana/runtime');
var ui = require('@grafana/ui');
var css = require('@emotion/css');
var pluralize = require('pluralize');
var Prism = require('prismjs');
var lezerPromql = require('@prometheus-io/lezer-promql');
var toolkit = require('@reduxjs/toolkit');
var reactBeautifulDnd = require('react-beautiful-dnd');
var reactUse = require('react-use');
var react = require('@floating-ui/react');
var debounce = require('debounce-promise');
var Highlighter = require('react-highlight-words');
var reactWindow = require('react-window');
var faroWebSdk = require('@grafana/faro-web-sdk');
var uFuzzy = require('@leeoniya/ufuzzy');
var monacoPromql = require('monaco-promql');
var uuid = require('uuid');
var rxjs = require('rxjs');
var operators$3 = require('rxjs/operators');
var semver = require('semver/preload');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var pluralize__default = /*#__PURE__*/_interopDefaultLegacy(pluralize);
var Prism__default = /*#__PURE__*/_interopDefaultLegacy(Prism);
var debounce__default = /*#__PURE__*/_interopDefaultLegacy(debounce);
var Highlighter__default = /*#__PURE__*/_interopDefaultLegacy(Highlighter);
var uFuzzy__default = /*#__PURE__*/_interopDefaultLegacy(uFuzzy);
var semver__default = /*#__PURE__*/_interopDefaultLegacy(semver);

const Components = {
  RadioButton: {
    container: "data-testid radio-button"
  },
  Breadcrumbs: {
    breadcrumb: (title) => `data-testid ${title} breadcrumb`
  },
  TimePicker: {
    openButton: "data-testid TimePicker Open Button",
    overlayContent: "data-testid TimePicker Overlay Content",
    fromField: "data-testid Time Range from field",
    toField: "data-testid Time Range to field",
    applyTimeRange: "data-testid TimePicker submit button",
    copyTimeRange: "data-testid TimePicker copy button",
    pasteTimeRange: "data-testid TimePicker paste button",
    calendar: {
      label: "data-testid Time Range calendar",
      openButton: "data-testid Open time range calendar",
      closeButton: "data-testid Close time range Calendar"
    },
    absoluteTimeRangeTitle: "data-testid-absolute-time-range-narrow"
  },
  DataSourcePermissions: {
    form: () => 'form[name="addPermission"]',
    roleType: "Role to add new permission to",
    rolePicker: "Built-in role picker",
    permissionLevel: "Permission Level"
  },
  DateTimePicker: {
    input: "data-testid date-time-input"
  },
  DataSource: {
    TestData: {
      QueryTab: {
        scenarioSelectContainer: "Test Data Query scenario select container",
        scenarioSelect: "Test Data Query scenario select",
        max: "TestData max",
        min: "TestData min",
        noise: "TestData noise",
        seriesCount: "TestData series count",
        spread: "TestData spread",
        startValue: "TestData start value",
        drop: "TestData drop values"
      }
    },
    DataSourceHttpSettings: {
      urlInput: "data-testid Datasource HTTP settings url"
    },
    Jaeger: {
      traceIDInput: "Trace ID"
    },
    Prometheus: {
      configPage: {
        connectionSettings: "Data source connection URL",
        // aria-label in grafana experimental
        manageAlerts: "prometheus-alerts-manager",
        // id for switch component
        scrapeInterval: "data-testid scrape interval",
        queryTimeout: "data-testid query timeout",
        defaultEditor: "data-testid default editor",
        disableMetricLookup: "disable-metric-lookup",
        // id for switch component
        prometheusType: "data-testid prometheus type",
        prometheusVersion: "data-testid prometheus version",
        cacheLevel: "data-testid cache level",
        incrementalQuerying: "prometheus-incremental-querying",
        // id for switch component
        queryOverlapWindow: "data-testid query overlap window",
        disableRecordingRules: "disable-recording-rules",
        // id for switch component
        customQueryParameters: "data-testid custom query parameters",
        httpMethod: "data-testid http method",
        exemplarsAddButton: "data-testid Add exemplar config button",
        internalLinkSwitch: "data-testid Internal link switch",
        codeModeMetricNamesSuggestionLimit: "data-testid code mode metric names suggestion limit"
      },
      queryEditor: {
        // kickstart: '', see QueryBuilder queryPatterns below
        explain: "data-testid prometheus explain switch wrapper",
        editorToggle: "data-testid QueryEditorModeToggle",
        // wrapper for toggle
        options: "data-testid prometheus options",
        // wrapper for options group
        legend: "data-testid prometheus legend wrapper",
        // wrapper for multiple compomnents
        format: "data-testid prometheus format",
        step: "prometheus-step",
        // id for autosize component
        type: "data-testid prometheus type",
        //wrapper for radio button group
        exemplars: "prometheus-exemplars",
        // id for editor switch component
        builder: {
          // see QueryBuilder below for commented selectors
          // labelSelect: 'data-testid Select label',
          // valueSelect: 'data-testid Select value',
          // matchOperatorSelect: 'data-testid Select match operator',
          metricSelect: "data-testid metric select",
          hints: "data-testid prometheus hints",
          // wrapper for hints component
          metricsExplorer: "data-testid metrics explorer",
          queryAdvisor: "data-testid query advisor"
        },
        code: {
          queryField: "data-testid prometheus query field",
          metricsCountInfo: "data-testid metrics count disclaimer",
          metricsBrowser: {
            openButton: "data-testid open metrics browser",
            selectMetric: "data-testid select a metric",
            metricList: "data-testid metric list",
            labelNamesFilter: "data-testid label names filter",
            labelValuesFilter: "data-testid label values filter",
            useQuery: "data-testid use query",
            useAsRateQuery: "data-testid use as rate query",
            validateSelector: "data-testid validate selector",
            clear: "data-testid clear"
          }
        }
      },
      exemplarMarker: "data-testid Exemplar marker",
      variableQueryEditor: {
        queryType: "data-testid query type",
        labelnames: {
          metricRegex: "data-testid label names metric regex"
        },
        labelValues: {
          labelSelect: "data-testid label values label select"
          // metric select see queryEditor: builder for more context
          // label select for metric filtering see queryEditor: builder for more context
        },
        metricNames: {
          metricRegex: "data-testid metric names metric regex"
        },
        varQueryResult: "data-testid variable query result",
        seriesQuery: "data-testid prometheus series query",
        classicQuery: "data-testid prometheus classic query"
      },
      annotations: {
        minStep: "prometheus-annotation-min-step",
        // id for autosize input
        title: "data-testid prometheus annotation title",
        tags: "data-testid prometheus annotation tags",
        text: "data-testid prometheus annotation text",
        seriesValueAsTimestamp: "data-testid prometheus annotation series value as timestamp"
      }
    }
  },
  Menu: {
    MenuComponent: (title) => `${title} menu`,
    MenuGroup: (title) => `${title} menu group`,
    MenuItem: (title) => `${title} menu item`,
    SubMenu: {
      container: "data-testid SubMenu container",
      icon: "data-testid SubMenu icon"
    }
  },
  Panels: {
    Panel: {
      title: (title) => `data-testid Panel header ${title}`,
      content: "data-testid panel content",
      headerItems: (item) => `data-testid Panel header item ${item}`,
      menuItems: (item) => `data-testid Panel menu item ${item}`,
      menu: (title) => `data-testid Panel menu ${title}`,
      containerByTitle: (title) => `${title} panel`,
      headerCornerInfo: (mode) => `Panel header ${mode}`,
      status: (status) => `data-testid Panel status ${status}`,
      loadingBar: () => `Panel loading bar`,
      HoverWidget: {
        container: "data-testid hover-header-container",
        dragIcon: "data-testid drag-icon"
      },
      PanelDataErrorMessage: "data-testid Panel data error message"
    },
    Visualization: {
      Graph: {
        container: "Graph container",
        VisualizationTab: {
          legendSection: "Legend section"
        },
        Legend: {
          legendItemAlias: (name) => `gpl alias ${name}`,
          showLegendSwitch: "gpl show legend"
        },
        xAxis: {
          labels: () => "div.flot-x-axis > div.flot-tick-label"
        }
      },
      BarGauge: {
        /**
         * @deprecated use valueV2 from Grafana 8.3 instead
         */
        value: "Bar gauge value",
        valueV2: "data-testid Bar gauge value"
      },
      PieChart: {
        svgSlice: "data testid Pie Chart Slice"
      },
      Text: {
        container: () => ".markdown-html"
      },
      Table: {
        header: "table header",
        footer: "table-footer",
        body: "data-testid table body"
      }
    }
  },
  VizLegend: {
    seriesName: (name) => `data-testid VizLegend series ${name}`
  },
  Drawer: {
    General: {
      title: (title) => `Drawer title ${title}`,
      expand: "Drawer expand",
      contract: "Drawer contract",
      close: "data-testid Drawer close",
      rcContentWrapper: () => ".rc-drawer-content-wrapper",
      subtitle: "data-testid drawer subtitle"
    },
    DashboardSaveDrawer: {
      saveButton: "data-testid Save dashboard drawer button",
      saveAsButton: "data-testid Save as dashboard drawer button",
      saveAsTitleInput: "Save dashboard title field"
    }
  },
  PanelEditor: {
    General: {
      content: "data-testid Panel editor content"
    },
    OptionsPane: {
      content: "data-testid Panel editor option pane content",
      select: "Panel editor option pane select",
      fieldLabel: (type) => `${type} field property editor`,
      fieldInput: (title) => `data-testid Panel editor option pane field input ${title}`
    },
    // not sure about the naming *DataPane*
    DataPane: {
      content: "data-testid Panel editor data pane content"
    },
    applyButton: "data-testid Apply changes and go back to dashboard",
    toggleVizPicker: "data-testid toggle-viz-picker",
    toggleVizOptions: "data-testid toggle-viz-options",
    toggleTableView: "data-testid toggle-table-view",
    // [Geomap] Map controls
    showZoomField: "Map controls Show zoom control field property editor",
    showAttributionField: "Map controls Show attribution field property editor",
    showScaleField: "Map controls Show scale field property editor",
    showMeasureField: "Map controls Show measure tools field property editor",
    showDebugField: "Map controls Show debug field property editor",
    measureButton: "show measure tools"
  },
  PanelInspector: {
    Data: {
      content: "Panel inspector Data content"
    },
    Stats: {
      content: "Panel inspector Stats content"
    },
    Json: {
      content: "data-testid Panel inspector Json content"
    },
    Query: {
      content: "Panel inspector Query content",
      refreshButton: "Panel inspector Query refresh button",
      jsonObjectKeys: () => ".json-formatter-key"
    }
  },
  Tab: {
    title: (title) => `Tab ${title}`,
    active: () => '[class*="-activeTabStyle"]'
  },
  RefreshPicker: {
    /**
     * @deprecated use runButtonV2 from Grafana 8.3 instead
     */
    runButton: "RefreshPicker run button",
    /**
     * @deprecated use intervalButtonV2 from Grafana 8.3 instead
     */
    intervalButton: "RefreshPicker interval button",
    runButtonV2: "data-testid RefreshPicker run button",
    intervalButtonV2: "data-testid RefreshPicker interval button"
  },
  QueryTab: {
    content: "Query editor tab content",
    queryInspectorButton: "Query inspector button",
    queryHistoryButton: "data-testid query-history-button",
    addQuery: "data-testid query-tab-add-query",
    queryGroupTopSection: "data-testid query group top section",
    addExpression: "data-testid query-tab-add-expression"
  },
  QueryHistory: {
    queryText: "Query text"
  },
  QueryEditorRows: {
    rows: "Query editor row"
  },
  QueryEditorRow: {
    actionButton: (title) => `data-testid ${title}`,
    title: (refId) => `Query editor row title ${refId}`,
    container: (refId) => `Query editor row ${refId}`
  },
  AlertTab: {
    content: "data-testid Alert editor tab content"
  },
  AlertRules: {
    groupToggle: "data-testid group-collapse-toggle",
    toggle: "data-testid collapse-toggle",
    expandedContent: "data-testid expanded-content",
    previewButton: "data-testid alert-rule preview-button",
    ruleNameField: "data-testid alert-rule name-field",
    newFolderButton: "data-testid alert-rule new-folder-button",
    newFolderNameField: "data-testid alert-rule name-folder-name-field",
    newFolderNameCreateButton: "data-testid alert-rule name-folder-name-create-button",
    newEvaluationGroupButton: "data-testid alert-rule new-evaluation-group-button",
    newEvaluationGroupName: "data-testid alert-rule new-evaluation-group-name",
    newEvaluationGroupInterval: "data-testid alert-rule new-evaluation-group-interval",
    newEvaluationGroupCreate: "data-testid alert-rule new-evaluation-group-create-button"
  },
  Alert: {
    /**
     * @deprecated use alertV2 from Grafana 8.3 instead
     */
    alert: (severity) => `Alert ${severity}`,
    alertV2: (severity) => `data-testid Alert ${severity}`
  },
  TransformTab: {
    content: "data-testid Transform editor tab content",
    newTransform: (name) => `data-testid New transform ${name}`,
    transformationEditor: (name) => `data-testid Transformation editor ${name}`,
    transformationEditorDebugger: (name) => `data-testid Transformation editor debugger ${name}`
  },
  Transforms: {
    card: (name) => `data-testid New transform ${name}`,
    disableTransformationButton: "data-testid Disable transformation button",
    Reduce: {
      modeLabel: "data-testid Transform mode label",
      calculationsLabel: "data-testid Transform calculations label"
    },
    SpatialOperations: {
      actionLabel: "root Action field property editor",
      locationLabel: "root Location Mode field property editor",
      location: {
        autoOption: "Auto location option",
        coords: {
          option: "Coords location option",
          latitudeFieldLabel: "root Latitude field field property editor",
          longitudeFieldLabel: "root Longitude field field property editor"
        },
        geohash: {
          option: "Geohash location option",
          geohashFieldLabel: "root Geohash field field property editor"
        },
        lookup: {
          option: "Lookup location option",
          lookupFieldLabel: "root Lookup field field property editor",
          gazetteerFieldLabel: "root Gazetteer field property editor"
        }
      }
    },
    searchInput: "data-testid search transformations",
    noTransformationsMessage: "data-testid no transformations message",
    addTransformationButton: "data-testid add transformation button",
    removeAllTransformationsButton: "data-testid remove all transformations button"
  },
  NavBar: {
    Configuration: {
      button: "Configuration"
    },
    Toggle: {
      button: "data-testid Toggle menu"
    },
    Reporting: {
      button: "Reporting"
    }
  },
  NavMenu: {
    Menu: "data-testid navigation mega-menu",
    item: "data-testid Nav menu item"
  },
  NavToolbar: {
    container: "data-testid Nav toolbar",
    shareDashboard: "data-testid Share dashboard",
    markAsFavorite: "data-testid Mark as favorite",
    editDashboard: {
      editButton: "data-testid Edit dashboard button",
      saveButton: "data-testid Save dashboard button",
      exitButton: "data-testid Exit edit mode button",
      settingsButton: "data-testid Dashboard settings",
      addRowButton: "data-testid Add row button",
      addLibraryPanelButton: "data-testid Add a panel from the panel library button",
      addVisualizationButton: "data-testid Add new visualization menu item",
      pastePanelButton: "data-testid Paste panel button",
      discardChangesButton: "data-testid Discard changes button",
      discardLibraryPanelButton: "data-testid Discard library panel button",
      unlinkLibraryPanelButton: "data-testid Unlink library panel button",
      saveLibraryPanelButton: "data-testid Save library panel button",
      backToDashboardButton: "data-testid Back to dashboard button"
    }
  },
  PageToolbar: {
    container: () => ".page-toolbar",
    item: (tooltip) => `${tooltip}`,
    itemButton: (title) => `data-testid ${title}`
  },
  QueryEditorToolbarItem: {
    button: (title) => `QueryEditor toolbar item button ${title}`
  },
  BackButton: {
    backArrow: "data-testid Go Back"
  },
  OptionsGroup: {
    group: (title) => title ? `data-testid Options group ${title}` : "data-testid Options group",
    toggle: (title) => title ? `data-testid Options group ${title} toggle` : "data-testid Options group toggle"
  },
  PluginVisualization: {
    item: (title) => `Plugin visualization item ${title}`,
    current: () => '[class*="-currentVisualizationItem"]'
  },
  Select: {
    option: "data-testid Select option",
    input: () => 'input[id*="time-options-input"]',
    singleValue: () => 'div[class*="-singleValue"]'
  },
  FieldConfigEditor: {
    content: "Field config editor content"
  },
  OverridesConfigEditor: {
    content: "Field overrides editor content"
  },
  FolderPicker: {
    /**
     * @deprecated use containerV2 from Grafana 8.3 instead
     */
    container: "Folder picker select container",
    containerV2: "data-testid Folder picker select container",
    input: "data-testid folder-picker-input"
  },
  ReadonlyFolderPicker: {
    container: "data-testid Readonly folder picker select container"
  },
  DataSourcePicker: {
    container: "data-testid Data source picker select container",
    /**
     * @deprecated use inputV2 instead
     */
    input: () => 'input[id="data-source-picker"]',
    inputV2: "data-testid Select a data source",
    dataSourceList: "data-testid Data source list dropdown",
    advancedModal: {
      dataSourceList: "data-testid Data source list",
      builtInDataSourceList: "data-testid Built in data source list"
    }
  },
  TimeZonePicker: {
    /**
     * @deprecated use TimeZonePicker.containerV2 from Grafana 8.3 instead
     */
    container: "Time zone picker select container",
    containerV2: "data-testid Time zone picker select container",
    changeTimeSettingsButton: "data-testid Time zone picker Change time settings button"
  },
  WeekStartPicker: {
    /**
     * @deprecated use WeekStartPicker.containerV2 from Grafana 8.3 instead
     */
    container: "Choose starting day of the week",
    containerV2: "data-testid Choose starting day of the week",
    placeholder: "Choose starting day of the week"
  },
  TraceViewer: {
    spanBar: "data-testid SpanBar--wrapper"
  },
  QueryField: { container: "data-testid Query field" },
  QueryBuilder: {
    queryPatterns: "data-testid Query patterns",
    labelSelect: "data-testid Select label",
    inputSelect: "data-testid Select label-input",
    valueSelect: "data-testid Select value",
    matchOperatorSelect: "data-testid Select match operator"
  },
  ValuePicker: {
    button: (name) => `data-testid Value picker button ${name}`,
    select: (name) => `data-testid Value picker select ${name}`
  },
  Search: {
    /**
     * @deprecated use sectionV2 from Grafana 8.3 instead
     */
    section: "Search section",
    sectionV2: "data-testid Search section",
    /**
     * @deprecated use itemsV2 from Grafana 8.3 instead
     */
    items: "Search items",
    itemsV2: "data-testid Search items",
    cards: "data-testid Search cards",
    collapseFolder: (sectionId) => `data-testid Collapse folder ${sectionId}`,
    expandFolder: (sectionId) => `data-testid Expand folder ${sectionId}`,
    dashboardItem: (item) => `${Components.Search.dashboardItems} ${item}`,
    dashboardCard: (item) => `data-testid Search card ${item}`,
    folderHeader: (folderName) => `data-testid Folder header ${folderName}`,
    folderContent: (folderName) => `data-testid Folder content ${folderName}`,
    dashboardItems: "data-testid Dashboard search item"
  },
  DashboardLinks: {
    container: "data-testid Dashboard link container",
    dropDown: "data-testid Dashboard link dropdown",
    link: "data-testid Dashboard link"
  },
  LoadingIndicator: {
    icon: "data-testid Loading indicator"
  },
  CallToActionCard: {
    /**
     * @deprecated use buttonV2 from Grafana 8.3 instead
     */
    button: (name) => `Call to action button ${name}`,
    buttonV2: (name) => `data-testid Call to action button ${name}`
  },
  DataLinksContextMenu: {
    singleLink: "data-testid Data link"
  },
  CodeEditor: {
    container: "data-testid Code editor container"
  },
  ReactMonacoEditor: {
    editorLazy: "data-testid ReactMonacoEditor editorLazy"
  },
  DashboardImportPage: {
    textarea: "data-testid-import-dashboard-textarea",
    submit: "data-testid-load-dashboard"
  },
  ImportDashboardForm: {
    name: "data-testid-import-dashboard-title",
    submit: "data-testid-import-dashboard-submit"
  },
  PanelAlertTabContent: {
    content: "data-testid Unified alert editor tab content"
  },
  VisualizationPreview: {
    card: (name) => `data-testid suggestion-${name}`
  },
  ColorSwatch: {
    name: `data-testid-colorswatch`
  },
  DashboardRow: {
    title: (title) => `data-testid dashboard-row-title-${title}`
  },
  UserProfile: {
    profileSaveButton: "data-testid-user-profile-save",
    preferencesSaveButton: "data-testid-shared-prefs-save",
    orgsTable: "data-testid-user-orgs-table",
    sessionsTable: "data-testid-user-sessions-table",
    extensionPointTabs: "data-testid-extension-point-tabs",
    extensionPointTab: (tabId) => `data-testid-extension-point-tab-${tabId}`
  },
  FileUpload: {
    inputField: "data-testid-file-upload-input-field",
    fileNameSpan: "data-testid-file-upload-file-name"
  },
  DebugOverlay: {
    wrapper: "debug-overlay"
  },
  OrgRolePicker: {
    input: "Role"
  },
  AnalyticsToolbarButton: {
    button: "Dashboard insights"
  },
  Variables: {
    variableOption: "data-testid variable-option"
  },
  Annotations: {
    annotationsTypeInput: "data-testid annotations-type-input",
    annotationsChoosePanelInput: "data-testid choose-panels-input",
    editor: {
      testButton: "data-testid annotations-test-button",
      resultContainer: "data-testid annotations-query-result-container"
    }
  },
  Tooltip: {
    container: "data-testid tooltip"
  },
  ReturnToPrevious: {
    buttonGroup: "data-testid dismissable button group",
    backButton: "data-testid back",
    dismissButton: "data-testid dismiss"
  },
  SQLQueryEditor: {
    selectColumn: "data-testid select-column",
    selectAggregation: "data-testid select-aggregation",
    selectAlias: "data-testid select-alias",
    filterConjunction: "data-testid filter-conjunction",
    filterField: "data-testid filter-field",
    filterOperator: "data-testid filter-operator",
    headerTableSelector: "data-testid header-table-selector",
    headerFilterSwitch: "data-testid header-filter-switch",
    headerGroupSwitch: "data-testid header-group-switch",
    headerOrderSwitch: "data-testid header-order-switch",
    headerPreviewSwitch: "data-testid header-preview-switch"
  }
};

const Pages = {
  Login: {
    url: "/login",
    username: "data-testid Username input field",
    password: "data-testid Password input field",
    submit: "data-testid Login button",
    skip: "data-testid Skip change password button"
  },
  Home: {
    url: "/"
  },
  DataSource: {
    name: "data-testid Data source settings page name input field",
    delete: "Data source settings page Delete button",
    readOnly: "data-testid Data source settings page read only message",
    saveAndTest: "data-testid Data source settings page Save and Test button",
    alert: "data-testid Data source settings page Alert"
  },
  DataSources: {
    url: "/datasources",
    dataSources: (dataSourceName) => `Data source list item ${dataSourceName}`
  },
  EditDataSource: {
    url: (dataSourceUid) => `/datasources/edit/${dataSourceUid}`,
    settings: "Datasource settings page basic settings"
  },
  AddDataSource: {
    url: "/datasources/new",
    /** @deprecated Use dataSourcePluginsV2 */
    dataSourcePlugins: (pluginName) => `Data source plugin item ${pluginName}`,
    dataSourcePluginsV2: (pluginName) => `Add new data source ${pluginName}`
  },
  ConfirmModal: {
    delete: "data-testid Confirm Modal Danger Button"
  },
  AddDashboard: {
    url: "/dashboard/new",
    itemButton: (title) => `data-testid ${title}`,
    addNewPanel: "data-testid Add new panel",
    addNewRow: "data-testid Add new row",
    addNewPanelLibrary: "data-testid Add new panel from panel library"
  },
  Dashboard: {
    url: (uid) => `/d/${uid}`,
    DashNav: {
      /**
       * @deprecated use navV2 from Grafana 8.3 instead
       */
      nav: "Dashboard navigation",
      navV2: "data-testid Dashboard navigation",
      publicDashboardTag: "data-testid public dashboard tag",
      shareButton: "data-testid share-button",
      scrollContainer: "data-testid Dashboard canvas scroll container",
      newShareButton: {
        container: "data-testid new share button",
        shareLink: "data-testid new share link-button",
        arrowMenu: "data-testid new share button arrow menu",
        menu: {
          container: "data-testid new share button menu",
          shareInternally: "data-testid new share button share internally"
        }
      },
      playlistControls: {
        prev: "data-testid playlist previous dashboard button",
        stop: "data-testid playlist stop dashboard button",
        next: "data-testid playlist next dashboard button"
      }
    },
    Controls: "data-testid dashboard controls",
    SubMenu: {
      submenu: "Dashboard submenu",
      submenuItem: "data-testid template variable",
      submenuItemLabels: (item) => `data-testid Dashboard template variables submenu Label ${item}`,
      submenuItemValueDropDownValueLinkTexts: (item) => `data-testid Dashboard template variables Variable Value DropDown value link text ${item}`,
      submenuItemValueDropDownDropDown: "Variable options",
      submenuItemValueDropDownOptionTexts: (item) => `data-testid Dashboard template variables Variable Value DropDown option text ${item}`,
      Annotations: {
        annotationsWrapper: "data-testid annotation-wrapper",
        annotationLabel: (label) => `data-testid Dashboard annotations submenu Label ${label}`,
        annotationToggle: (label) => `data-testid Dashboard annotations submenu Toggle ${label}`
      }
    },
    Settings: {
      Actions: {
        close: "data-testid dashboard-settings-close"
      },
      General: {
        deleteDashBoard: "data-testid Dashboard settings page delete dashboard button",
        sectionItems: (item) => `Dashboard settings section item ${item}`,
        saveDashBoard: "Dashboard settings aside actions Save button",
        saveAsDashBoard: "Dashboard settings aside actions Save As button",
        /**
         * @deprecated use components.TimeZonePicker.containerV2 from Grafana 8.3 instead
         */
        timezone: "Time zone picker select container",
        title: "Tab General"
      },
      Annotations: {
        List: {
          /**
           * @deprecated use addAnnotationCTAV2 from Grafana 8.3 instead
           */
          addAnnotationCTA: Components.CallToActionCard.button("Add annotation query"),
          addAnnotationCTAV2: Components.CallToActionCard.buttonV2("Add annotation query"),
          annotations: "data-testid list-annotations"
        },
        Settings: {
          name: "data-testid Annotations settings name input"
        },
        NewAnnotation: {
          panelFilterSelect: "data-testid annotations-panel-filter",
          showInLabel: "data-testid show-in-label",
          previewInDashboard: "data-testid annotations-preview",
          delete: "data-testid annotations-delete",
          apply: "data-testid annotations-apply",
          enable: "data-testid annotation-enable",
          hide: "data-testid annotation-hide"
        }
      },
      Variables: {
        List: {
          /**
           * @deprecated use addVariableCTAV2 from Grafana 8.3 instead
           */
          addVariableCTA: Components.CallToActionCard.button("Add variable"),
          addVariableCTAV2: Components.CallToActionCard.buttonV2("Add variable"),
          newButton: "Variable editor New variable button",
          table: "Variable editor Table",
          tableRowNameFields: (variableName) => `Variable editor Table Name field ${variableName}`,
          tableRowDefinitionFields: (variableName) => `Variable editor Table Definition field ${variableName}`,
          tableRowArrowUpButtons: (variableName) => `Variable editor Table ArrowUp button ${variableName}`,
          tableRowArrowDownButtons: (variableName) => `Variable editor Table ArrowDown button ${variableName}`,
          tableRowDuplicateButtons: (variableName) => `Variable editor Table Duplicate button ${variableName}`,
          tableRowRemoveButtons: (variableName) => `Variable editor Table Remove button ${variableName}`
        },
        Edit: {
          General: {
            headerLink: "Variable editor Header link",
            modeLabelNew: "Variable editor Header mode New",
            /**
             * @deprecated
             */
            modeLabelEdit: "Variable editor Header mode Edit",
            generalNameInput: "Variable editor Form Name field",
            generalNameInputV2: "data-testid Variable editor Form Name field",
            generalTypeSelect: "Variable editor Form Type select",
            generalTypeSelectV2: "data-testid Variable editor Form Type select",
            generalLabelInput: "Variable editor Form Label field",
            generalLabelInputV2: "data-testid Variable editor Form Label field",
            generalHideSelect: "Variable editor Form Hide select",
            generalHideSelectV2: "data-testid Variable editor Form Hide select",
            selectionOptionsMultiSwitch: "data-testid Variable editor Form Multi switch",
            selectionOptionsIncludeAllSwitch: "data-testid Variable editor Form IncludeAll switch",
            selectionOptionsCustomAllInput: "data-testid Variable editor Form IncludeAll field",
            previewOfValuesOption: "data-testid Variable editor Preview of Values option",
            submitButton: "data-testid Variable editor Run Query button",
            applyButton: "data-testid Variable editor Apply button"
          },
          QueryVariable: {
            queryOptionsDataSourceSelect: Components.DataSourcePicker.inputV2,
            queryOptionsRefreshSelect: "Variable editor Form Query Refresh select",
            queryOptionsRefreshSelectV2: "data-testid Variable editor Form Query Refresh select",
            queryOptionsRegExInput: "Variable editor Form Query RegEx field",
            queryOptionsRegExInputV2: "data-testid Variable editor Form Query RegEx field",
            queryOptionsSortSelect: "Variable editor Form Query Sort select",
            queryOptionsSortSelectV2: "data-testid Variable editor Form Query Sort select",
            queryOptionsQueryInput: "data-testid Variable editor Form Default Variable Query Editor textarea",
            valueGroupsTagsEnabledSwitch: "Variable editor Form Query UseTags switch",
            valueGroupsTagsTagsQueryInput: "Variable editor Form Query TagsQuery field",
            valueGroupsTagsTagsValuesQueryInput: "Variable editor Form Query TagsValuesQuery field"
          },
          ConstantVariable: {
            constantOptionsQueryInput: "Variable editor Form Constant Query field",
            constantOptionsQueryInputV2: "data-testid Variable editor Form Constant Query field"
          },
          DatasourceVariable: {
            datasourceSelect: "data-testid datasource variable datasource type"
          },
          TextBoxVariable: {
            textBoxOptionsQueryInput: "Variable editor Form TextBox Query field",
            textBoxOptionsQueryInputV2: "data-testid Variable editor Form TextBox Query field"
          },
          CustomVariable: {
            customValueInput: "data-testid custom-variable-input"
          },
          IntervalVariable: {
            intervalsValueInput: "data-testid interval variable intervals input",
            autoEnabledCheckbox: "data-testid interval variable auto value checkbox",
            stepCountIntervalSelect: "data-testid interval variable step count input",
            minIntervalInput: "data-testid interval variable mininum interval input"
          },
          GroupByVariable: {
            dataSourceSelect: Components.DataSourcePicker.inputV2,
            infoText: "data-testid group by variable info text",
            modeToggle: "data-testid group by variable mode toggle"
          },
          AdHocFiltersVariable: {
            datasourceSelect: Components.DataSourcePicker.inputV2,
            infoText: "data-testid ad-hoc filters variable info text",
            modeToggle: "data-testid ad-hoc filters variable mode toggle"
          }
        }
      }
    },
    Annotations: {
      marker: "data-testid annotation-marker"
    },
    Rows: {
      Repeated: {
        ConfigSection: {
          warningMessage: "data-testid Repeated rows warning message"
        }
      }
    }
  },
  Dashboards: {
    url: "/dashboards",
    /**
     * @deprecated use components.Search.dashboardItem from Grafana 8.3 instead
     */
    dashboards: (title) => `Dashboard search item ${title}`
  },
  SaveDashboardAsModal: {
    newName: "Save dashboard title field",
    save: "Save dashboard button"
  },
  SaveDashboardModal: {
    save: "Dashboard settings Save Dashboard Modal Save button",
    saveVariables: "Dashboard settings Save Dashboard Modal Save variables checkbox",
    saveTimerange: "Dashboard settings Save Dashboard Modal Save timerange checkbox",
    saveRefresh: "Dashboard settings Save Dashboard Modal Save refresh checkbox"
  },
  SharePanelModal: {
    linkToRenderedImage: "Link to rendered image"
  },
  ShareDashboardModal: {
    PublicDashboard: {
      Tab: "Tab Public dashboard",
      WillBePublicCheckbox: "data-testid public dashboard will be public checkbox",
      LimitedDSCheckbox: "data-testid public dashboard limited datasources checkbox",
      CostIncreaseCheckbox: "data-testid public dashboard cost may increase checkbox",
      PauseSwitch: "data-testid public dashboard pause switch",
      EnableAnnotationsSwitch: "data-testid public dashboard on off switch for annotations",
      CreateButton: "data-testid public dashboard create button",
      DeleteButton: "data-testid public dashboard delete button",
      CopyUrlInput: "data-testid public dashboard copy url input",
      CopyUrlButton: "data-testid public dashboard copy url button",
      SettingsDropdown: "data-testid public dashboard settings dropdown",
      TemplateVariablesWarningAlert: "data-testid public dashboard disabled template variables alert",
      UnsupportedDataSourcesWarningAlert: "data-testid public dashboard unsupported data sources alert",
      NoUpsertPermissionsWarningAlert: "data-testid public dashboard no upsert permissions alert",
      EnableTimeRangeSwitch: "data-testid public dashboard on off switch for time range",
      EmailSharingConfiguration: {
        Container: "data-testid email sharing config container",
        ShareType: "data-testid public dashboard share type",
        EmailSharingInput: "data-testid public dashboard email sharing input",
        EmailSharingInviteButton: "data-testid public dashboard email sharing invite button",
        EmailSharingList: "data-testid public dashboard email sharing list",
        DeleteEmail: "data-testid public dashboard delete email button",
        ReshareLink: "data-testid public dashboard reshare link button"
      }
    },
    PublicDashboardScene: {
      Tab: "Tab Public Dashboard"
    },
    SnapshotScene: {
      url: (key) => `/dashboard/snapshot/${key}`,
      Tab: "Tab Snapshot",
      PublishSnapshot: "data-testid publish snapshot button",
      CopyUrlButton: "data-testid snapshot copy url button",
      CopyUrlInput: "data-testid snapshot copy url input"
    }
  },
  PublicDashboard: {
    page: "public-dashboard-page",
    NotAvailable: {
      container: "public-dashboard-not-available",
      title: "public-dashboard-title",
      pausedDescription: "public-dashboard-paused-description"
    },
    footer: "public-dashboard-footer"
  },
  PublicDashboardScene: {
    loadingPage: "public-dashboard-scene-loading-page",
    page: "public-dashboard-scene-page",
    controls: "public-dashboard-controls"
  },
  RequestViewAccess: {
    form: "request-view-access-form",
    recipientInput: "request-view-access-recipient-input",
    submitButton: "request-view-access-submit-button"
  },
  PublicDashboardConfirmAccess: {
    submitButton: "data-testid confirm-access-submit-button"
  },
  Explore: {
    url: "/explore",
    General: {
      container: "data-testid Explore",
      graph: "Explore Graph",
      table: "Explore Table",
      scrollView: "data-testid explorer scroll view"
    },
    QueryHistory: {
      container: "data-testid QueryHistory"
    }
  },
  SoloPanel: {
    url: (page) => `/d-solo/${page}`
  },
  PluginsList: {
    page: "Plugins list page",
    list: "Plugins list",
    listItem: "Plugins list item",
    signatureErrorNotice: "data-testid Unsigned plugins notice"
  },
  PluginPage: {
    page: "Plugin page",
    signatureInfo: "data-testid Plugin signature info",
    disabledInfo: "data-testid Plugin disabled info"
  },
  PlaylistForm: {
    name: "Playlist name",
    interval: "Playlist interval",
    itemDelete: "data-testid playlist-form-delete-item"
  },
  BrowseDashboards: {
    table: {
      body: "data-testid browse-dashboards-table",
      row: (name) => `data-testid browse dashboards row ${name}`,
      checkbox: (uid) => `data-testid ${uid} checkbox`
    },
    NewFolderForm: {
      form: "data-testid new folder form",
      nameInput: "data-testid new-folder-name-input",
      createButton: "data-testid new-folder-create-button"
    }
  },
  Search: {
    url: "/?search=openn",
    FolderView: {
      url: "/?search=open&layout=folders"
    }
  },
  PublicDashboards: {
    ListItem: {
      linkButton: "public-dashboard-link-button",
      configButton: "public-dashboard-configuration-button",
      trashcanButton: "public-dashboard-remove-button",
      pauseSwitch: "data-testid public dashboard pause switch"
    }
  },
  UserListPage: {
    tabs: {
      allUsers: "data-testid all-users-tab",
      orgUsers: "data-testid org-users-tab",
      anonUserDevices: "data-testid anon-user-devices-tab",
      publicDashboardsUsers: "data-testid public-dashboards-users-tab",
      users: "data-testid users-tab"
    },
    org: {
      url: "/org/users"
    },
    admin: {
      url: "/admin/users"
    },
    publicDashboards: {
      container: "data-testid public-dashboards-users-list"
    },
    UserListAdminPage: {
      container: "data-testid user-list-admin-page"
    },
    UsersListPage: {
      container: "data-testid users-list-page"
    },
    UserAnonListPage: {
      container: "data-testid user-anon-list-page"
    },
    UsersListPublicDashboardsPage: {
      container: "data-testid users-list-public-dashboards-page",
      DashboardsListModal: {
        listItem: (uid) => `data-testid dashboards-list-item-${uid}`
      }
    }
  },
  ProfilePage: {
    url: "/profile"
  }
};

const selectors = {
  pages: Pages,
  components: Components
};

const getNextRefIdChar = (queries) => {
  for (let num = 0; ; num++) {
    const refId = getRefId(num);
    if (!queries.some((query) => query.refId === refId)) {
      return refId;
    }
  }
};
function getRefId(num) {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (num < letters.length) {
    return letters[num];
  } else {
    return getRefId(Math.floor(num / letters.length) - 1) + letters[num % letters.length];
  }
}

const OPERATORS = ["by", "group_left", "group_right", "ignoring", "on", "offset", "without"];
const TRIGONOMETRIC_FUNCTIONS = [
  {
    label: "acos",
    insertText: "acos",
    detail: "acos(v instant-vector)",
    documentation: "calculates the arccosine of all elements in v"
  },
  {
    label: "acosh",
    insertText: "acosh",
    detail: "acosh(v instant-vector)",
    documentation: "calculates the inverse hyperbolic cosine of all elements in v"
  },
  {
    label: "asin",
    insertText: "asin",
    detail: "asin(v instant-vector)",
    documentation: "calculates the arcsine of all elements in v"
  },
  {
    label: "asinh",
    insertText: "asinh",
    detail: "asinh(v instant-vector)",
    documentation: "calculates the inverse hyperbolic sine of all elements in v"
  },
  {
    label: "atan",
    insertText: "atan",
    detail: "atan(v instant-vector)",
    documentation: "calculates the arctangent of all elements in v"
  },
  {
    label: "atanh",
    insertText: "atanh",
    detail: "atanh(v instant-vector)",
    documentation: "calculates the inverse hyperbolic tangent of all elements in v"
  },
  {
    label: "cos",
    insertText: "cos",
    detail: "cos(v instant-vector)",
    documentation: "calculates the cosine of all elements in v"
  },
  {
    label: "cosh",
    insertText: "cosh",
    detail: "cosh(v instant-vector)",
    documentation: "calculates the hyperbolic cosine of all elements in v"
  },
  {
    label: "sin",
    insertText: "sin",
    detail: "sin(v instant-vector)",
    documentation: "calculates the sine of all elements in v"
  },
  {
    label: "sinh",
    insertText: "sinh",
    detail: "sinh(v instant-vector)",
    documentation: "calculates the hyperbolic sine of all elements in v"
  },
  {
    label: "tan",
    insertText: "tan",
    detail: "tan(v instant-vector)",
    documentation: "calculates the tangent of all elements in v"
  },
  {
    label: "tanh",
    insertText: "tanh",
    detail: "tanh(v instant-vector)",
    documentation: "calculates the hyperbolic tangent of all elements in v"
  }
];
const AGGREGATION_OPERATORS = [
  {
    label: "sum",
    insertText: "sum",
    documentation: "Calculate sum over dimensions"
  },
  {
    label: "min",
    insertText: "min",
    documentation: "Select minimum over dimensions"
  },
  {
    label: "max",
    insertText: "max",
    documentation: "Select maximum over dimensions"
  },
  {
    label: "avg",
    insertText: "avg",
    documentation: "Calculate the average over dimensions"
  },
  {
    label: "group",
    insertText: "group",
    documentation: "All values in the resulting vector are 1"
  },
  {
    label: "stddev",
    insertText: "stddev",
    documentation: "Calculate population standard deviation over dimensions"
  },
  {
    label: "stdvar",
    insertText: "stdvar",
    documentation: "Calculate population standard variance over dimensions"
  },
  {
    label: "count",
    insertText: "count",
    documentation: "Count number of elements in the vector"
  },
  {
    label: "count_values",
    insertText: "count_values",
    documentation: "Count number of elements with the same value"
  },
  {
    label: "bottomk",
    insertText: "bottomk",
    documentation: "Smallest k elements by sample value"
  },
  {
    label: "topk",
    insertText: "topk",
    documentation: "Largest k elements by sample value"
  },
  {
    label: "quantile",
    insertText: "quantile",
    documentation: "Calculate \u03C6-quantile (0 \u2264 \u03C6 \u2264 1) over dimensions"
  }
];
const FUNCTIONS = [
  ...AGGREGATION_OPERATORS,
  ...TRIGONOMETRIC_FUNCTIONS,
  {
    insertText: "abs",
    label: "abs",
    detail: "abs(v instant-vector)",
    documentation: "Returns the input vector with all sample values converted to their absolute value."
  },
  {
    insertText: "absent",
    label: "absent",
    detail: "absent(v instant-vector)",
    documentation: "Returns an empty vector if the vector passed to it has any elements and a 1-element vector with the value 1 if the vector passed to it has no elements. This is useful for alerting on when no time series exist for a given metric name and label combination."
  },
  {
    insertText: "absent_over_time",
    label: "absent_over_time",
    detail: "absent(v range-vector)",
    documentation: "Returns an empty vector if the range vector passed to it has any elements and a 1-element vector with the value 1 if the range vector passed to it has no elements."
  },
  {
    insertText: "ceil",
    label: "ceil",
    detail: "ceil(v instant-vector)",
    documentation: "Rounds the sample values of all elements in `v` up to the nearest integer."
  },
  {
    insertText: "changes",
    label: "changes",
    detail: "changes(v range-vector)",
    documentation: "For each input time series, `changes(v range-vector)` returns the number of times its value has changed within the provided time range as an instant vector."
  },
  {
    insertText: "clamp",
    label: "clamp",
    detail: "clamp(v instant-vector, min scalar, max scalar)",
    documentation: "Clamps the sample values of all elements in `v` to have a lower limit of `min` and an upper limit of `max`."
  },
  {
    insertText: "clamp_max",
    label: "clamp_max",
    detail: "clamp_max(v instant-vector, max scalar)",
    documentation: "Clamps the sample values of all elements in `v` to have an upper limit of `max`."
  },
  {
    insertText: "clamp_min",
    label: "clamp_min",
    detail: "clamp_min(v instant-vector, min scalar)",
    documentation: "Clamps the sample values of all elements in `v` to have a lower limit of `min`."
  },
  {
    insertText: "count_scalar",
    label: "count_scalar",
    detail: "count_scalar(v instant-vector)",
    documentation: "Returns the number of elements in a time series vector as a scalar. This is in contrast to the `count()` aggregation operator, which always returns a vector (an empty one if the input vector is empty) and allows grouping by labels via a `by` clause."
  },
  {
    insertText: "deg",
    label: "deg",
    detail: "deg(v instant-vector)",
    documentation: "Converts radians to degrees for all elements in v"
  },
  {
    insertText: "day_of_month",
    label: "day_of_month",
    detail: "day_of_month(v=vector(time()) instant-vector)",
    documentation: "Returns the day of the month for each of the given times in UTC. Returned values are from 1 to 31."
  },
  {
    insertText: "day_of_week",
    label: "day_of_week",
    detail: "day_of_week(v=vector(time()) instant-vector)",
    documentation: "Returns the day of the week for each of the given times in UTC. Returned values are from 0 to 6, where 0 means Sunday etc."
  },
  {
    insertText: "day_of_year",
    label: "day_of_year",
    detail: "day_of_year(v=vector(time()) instant-vector)",
    documentation: "Returns the day of the year for each of the given times in UTC. Returned values are from 1 to 365 for non-leap years, and 1 to 366 in leap years."
  },
  {
    insertText: "days_in_month",
    label: "days_in_month",
    detail: "days_in_month(v=vector(time()) instant-vector)",
    documentation: "Returns number of days in the month for each of the given times in UTC. Returned values are from 28 to 31."
  },
  {
    insertText: "delta",
    label: "delta",
    detail: "delta(v range-vector)",
    documentation: "Calculates the difference between the first and last value of each time series element in a range vector `v`, returning an instant vector with the given deltas and equivalent labels. The delta is extrapolated to cover the full time range as specified in the range vector selector, so that it is possible to get a non-integer result even if the sample values are all integers."
  },
  {
    insertText: "deriv",
    label: "deriv",
    detail: "deriv(v range-vector)",
    documentation: "Calculates the per-second derivative of the time series in a range vector `v`, using simple linear regression."
  },
  {
    insertText: "drop_common_labels",
    label: "drop_common_labels",
    detail: "drop_common_labels(instant-vector)",
    documentation: "Drops all labels that have the same name and value across all series in the input vector."
  },
  {
    insertText: "exp",
    label: "exp",
    detail: "exp(v instant-vector)",
    documentation: "Calculates the exponential function for all elements in `v`.\nSpecial cases are:\n* `Exp(+Inf) = +Inf` \n* `Exp(NaN) = NaN`"
  },
  {
    insertText: "floor",
    label: "floor",
    detail: "floor(v instant-vector)",
    documentation: "Rounds the sample values of all elements in `v` down to the nearest integer."
  },
  {
    insertText: "histogram_quantile",
    label: "histogram_quantile",
    detail: "histogram_quantile(\u03C6 float, b instant-vector)",
    documentation: "Calculates the \u03C6-quantile (0 \u2264 \u03C6 \u2264 1) from the buckets `b` of a histogram. The samples in `b` are the counts of observations in each bucket. Each sample must have a label `le` where the label value denotes the inclusive upper bound of the bucket. (Samples without such a label are silently ignored.) The histogram metric type automatically provides time series with the `_bucket` suffix and the appropriate labels."
  },
  {
    insertText: "holt_winters",
    label: "holt_winters",
    detail: "holt_winters(v range-vector, sf scalar, tf scalar)",
    documentation: "Produces a smoothed value for time series based on the range in `v`. The lower the smoothing factor `sf`, the more importance is given to old data. The higher the trend factor `tf`, the more trends in the data is considered. Both `sf` and `tf` must be between 0 and 1."
  },
  {
    insertText: "hour",
    label: "hour",
    detail: "hour(v=vector(time()) instant-vector)",
    documentation: "Returns the hour of the day for each of the given times in UTC. Returned values are from 0 to 23."
  },
  {
    insertText: "idelta",
    label: "idelta",
    detail: "idelta(v range-vector)",
    documentation: "Calculates the difference between the last two samples in the range vector `v`, returning an instant vector with the given deltas and equivalent labels."
  },
  {
    insertText: "increase",
    label: "increase",
    detail: "increase(v range-vector)",
    documentation: "Calculates the increase in the time series in the range vector. Breaks in monotonicity (such as counter resets due to target restarts) are automatically adjusted for. The increase is extrapolated to cover the full time range as specified in the range vector selector, so that it is possible to get a non-integer result even if a counter increases only by integer increments."
  },
  {
    insertText: "irate",
    label: "irate",
    detail: "irate(v range-vector)",
    documentation: "Calculates the per-second instant rate of increase of the time series in the range vector. This is based on the last two data points. Breaks in monotonicity (such as counter resets due to target restarts) are automatically adjusted for."
  },
  {
    insertText: "label_join",
    label: "label_join",
    detail: "label_join(v instant-vector, dst_label string, separator string, src_label_1 string, src_label_2 string, ...)",
    documentation: "For each timeseries in `v`, joins all the values of all the `src_labels` using `separator` and returns the timeseries with the label `dst_label` containing the joined value. There can be any number of `src_labels` in this function."
  },
  {
    insertText: "label_replace",
    label: "label_replace",
    detail: "label_replace(v instant-vector, dst_label string, replacement string, src_label string, regex string)",
    documentation: "For each timeseries in `v`, `label_replace(v instant-vector, dst_label string, replacement string, src_label string, regex string)`  matches the regular expression `regex` against the label `src_label`.  If it matches, then the timeseries is returned with the label `dst_label` replaced by the expansion of `replacement`. `$1` is replaced with the first matching subgroup, `$2` with the second etc. If the regular expression doesn't match then the timeseries is returned unchanged."
  },
  {
    insertText: "ln",
    label: "ln",
    detail: "ln(v instant-vector)",
    documentation: "Calculates the natural logarithm for all elements in `v`.\nSpecial cases are:\n * `ln(+Inf) = +Inf`\n * `ln(0) = -Inf`\n * `ln(x < 0) = NaN`\n * `ln(NaN) = NaN`"
  },
  {
    insertText: "log2",
    label: "log2",
    detail: "log2(v instant-vector)",
    documentation: "Calculates the binary logarithm for all elements in `v`. The special cases are equivalent to those in `ln`."
  },
  {
    insertText: "log10",
    label: "log10",
    detail: "log10(v instant-vector)",
    documentation: "Calculates the decimal logarithm for all elements in `v`. The special cases are equivalent to those in `ln`."
  },
  {
    insertText: "minute",
    label: "minute",
    detail: "minute(v=vector(time()) instant-vector)",
    documentation: "Returns the minute of the hour for each of the given times in UTC. Returned values are from 0 to 59."
  },
  {
    insertText: "month",
    label: "month",
    detail: "month(v=vector(time()) instant-vector)",
    documentation: "Returns the month of the year for each of the given times in UTC. Returned values are from 1 to 12, where 1 means January etc."
  },
  {
    insertText: "pi",
    label: "pi",
    detail: "pi()",
    documentation: "Returns pi"
  },
  {
    insertText: "predict_linear",
    label: "predict_linear",
    detail: "predict_linear(v range-vector, t scalar)",
    documentation: "Predicts the value of time series `t` seconds from now, based on the range vector `v`, using simple linear regression."
  },
  {
    insertText: "rad",
    label: "rad",
    detail: "rad(v instant-vector)",
    documentation: "Converts degrees to radians for all elements in v"
  },
  {
    insertText: "rate",
    label: "rate",
    detail: "rate(v range-vector)",
    documentation: "Calculates the per-second average rate of increase of the time series in the range vector. Breaks in monotonicity (such as counter resets due to target restarts) are automatically adjusted for. Also, the calculation extrapolates to the ends of the time range, allowing for missed scrapes or imperfect alignment of scrape cycles with the range's time period."
  },
  {
    insertText: "resets",
    label: "resets",
    detail: "resets(v range-vector)",
    documentation: "For each input time series, `resets(v range-vector)` returns the number of counter resets within the provided time range as an instant vector. Any decrease in the value between two consecutive samples is interpreted as a counter reset."
  },
  {
    insertText: "round",
    label: "round",
    detail: "round(v instant-vector, to_nearest=1 scalar)",
    documentation: "Rounds the sample values of all elements in `v` to the nearest integer. Ties are resolved by rounding up. The optional `to_nearest` argument allows specifying the nearest multiple to which the sample values should be rounded. This multiple may also be a fraction."
  },
  {
    insertText: "scalar",
    label: "scalar",
    detail: "scalar(v instant-vector)",
    documentation: "Given a single-element input vector, `scalar(v instant-vector)` returns the sample value of that single element as a scalar. If the input vector does not have exactly one element, `scalar` will return `NaN`."
  },
  {
    insertText: "sgn",
    label: "sgn",
    detail: "sgn(v instant-vector)",
    documentation: "Returns a vector with all sample values converted to their sign, defined as this: 1 if v is positive, -1 if v is negative and 0 if v is equal to zero."
  },
  {
    insertText: "sort",
    label: "sort",
    detail: "sort(v instant-vector)",
    documentation: "Returns vector elements sorted by their sample values, in ascending order."
  },
  {
    insertText: "sort_desc",
    label: "sort_desc",
    detail: "sort_desc(v instant-vector)",
    documentation: "Returns vector elements sorted by their sample values, in descending order."
  },
  {
    insertText: "sqrt",
    label: "sqrt",
    detail: "sqrt(v instant-vector)",
    documentation: "Calculates the square root of all elements in `v`."
  },
  {
    insertText: "time",
    label: "time",
    detail: "time()",
    documentation: "Returns the number of seconds since January 1, 1970 UTC. Note that this does not actually return the current time, but the time at which the expression is to be evaluated."
  },
  {
    insertText: "timestamp",
    label: "timestamp",
    detail: "timestamp(v instant-vector)",
    documentation: "Returns the timestamp of each of the samples of the given vector as the number of seconds since January 1, 1970 UTC."
  },
  {
    insertText: "vector",
    label: "vector",
    detail: "vector(s scalar)",
    documentation: "Returns the scalar `s` as a vector with no labels."
  },
  {
    insertText: "year",
    label: "year",
    detail: "year(v=vector(time()) instant-vector)",
    documentation: "Returns the year for each of the given times in UTC."
  },
  {
    insertText: "avg_over_time",
    label: "avg_over_time",
    detail: "avg_over_time(range-vector)",
    documentation: "The average value of all points in the specified interval."
  },
  {
    insertText: "min_over_time",
    label: "min_over_time",
    detail: "min_over_time(range-vector)",
    documentation: "The minimum value of all points in the specified interval."
  },
  {
    insertText: "max_over_time",
    label: "max_over_time",
    detail: "max_over_time(range-vector)",
    documentation: "The maximum value of all points in the specified interval."
  },
  {
    insertText: "sum_over_time",
    label: "sum_over_time",
    detail: "sum_over_time(range-vector)",
    documentation: "The sum of all values in the specified interval."
  },
  {
    insertText: "count_over_time",
    label: "count_over_time",
    detail: "count_over_time(range-vector)",
    documentation: "The count of all values in the specified interval."
  },
  {
    insertText: "quantile_over_time",
    label: "quantile_over_time",
    detail: "quantile_over_time(scalar, range-vector)",
    documentation: "The \u03C6-quantile (0 \u2264 \u03C6 \u2264 1) of the values in the specified interval."
  },
  {
    insertText: "stddev_over_time",
    label: "stddev_over_time",
    detail: "stddev_over_time(range-vector)",
    documentation: "The population standard deviation of the values in the specified interval."
  },
  {
    insertText: "stdvar_over_time",
    label: "stdvar_over_time",
    detail: "stdvar_over_time(range-vector)",
    documentation: "The population standard variance of the values in the specified interval."
  },
  {
    insertText: "last_over_time",
    label: "last_over_time",
    detail: "last_over_time(range-vector)",
    documentation: "The most recent point value in specified interval."
  },
  {
    insertText: "present_over_time",
    label: "present_over_time",
    detail: "present_over_time(range-vector)",
    documentation: "The value 1 for any series in the specified interval."
  },
  {
    insertText: "histogram_avg",
    label: "histogram_avg",
    detail: "histogram_avg(v instant-vector)",
    documentation: "Returns the arithmetic average of observed values stored in a native histogram. Samples that are not native histograms are ignored and do not show up in the returned vector."
  },
  {
    insertText: "histogram_count",
    label: "histogram_count",
    detail: "histogram_count(v instant-vector)",
    documentation: "Returns the count of observations stored in a native histogram."
  },
  {
    insertText: "histogram_sum",
    label: "histogram_sum",
    detail: "histogram_sum(v instant-vector)",
    documentation: "Returns the sum of observations stored in a native histogram."
  },
  {
    insertText: "histogram_fraction",
    label: "histogram_fraction",
    detail: "histogram_fraction(lower scalar, upper scalar, v instant-vector)",
    documentation: "Returns the estimated fraction of observations between the provided lower and upper values."
  },
  {
    insertText: "histogram_stddev",
    label: "histogram_stddev",
    detail: "histogram_stddev(v instant-vector)",
    documentation: "Returns the estimated standard deviation of observations in a native histogram, based on the geometric mean of the buckets where the observations lie."
  },
  {
    insertText: "histogram_stdvar",
    label: "histogram_stdvar",
    detail: "histogram_stdvar(v instant-vector)",
    documentation: "Returns the estimated standard variance of observations in a native histogram."
  }
];
FUNCTIONS.map((keyword) => keyword.label);
const promqlGrammar = {
  comment: {
    pattern: /#.*/
  },
  "context-aggregation": {
    pattern: /((by|without)\s*)\([^)]*\)/,
    // by ()
    lookbehind: true,
    inside: {
      "label-key": {
        pattern: /[^(),\s][^,)]*[^),\s]*/,
        alias: "attr-name"
      },
      punctuation: /[()]/
    }
  },
  "context-labels": {
    pattern: /\{[^}]*(?=}?)/,
    greedy: true,
    inside: {
      comment: {
        pattern: /#.*/
      },
      "label-key": {
        pattern: /[a-z_]\w*(?=\s*(=|!=|=~|!~))/,
        alias: "attr-name",
        greedy: true
      },
      "label-value": {
        pattern: /"(?:\\.|[^\\"])*"/,
        greedy: true,
        alias: "attr-value"
      },
      punctuation: /[{]/
    }
  },
  function: new RegExp(`\\b(?:${FUNCTIONS.map((f) => f.label).join("|")})(?=\\s*\\()`, "i"),
  "context-range": [
    {
      pattern: /\[[^\]]*(?=])/,
      // [1m]
      inside: {
        "range-duration": {
          pattern: /\b\d+[smhdwy]\b/i,
          alias: "number"
        }
      }
    },
    {
      pattern: /(offset\s+)\w+/,
      // offset 1m
      lookbehind: true,
      inside: {
        "range-duration": {
          pattern: /\b\d+[smhdwy]\b/i,
          alias: "number"
        }
      }
    }
  ],
  idList: {
    pattern: /\d+(\|\d+)+/,
    alias: "number"
  },
  number: /\b-?\d+((\.\d*)?([eE][+-]?\d+)?)?\b/,
  operator: new RegExp(`/[-+*/=%^~]|&&?|\\|?\\||!=?|<(?:=>?|<|>)?|>[>=]?|\\b(?:${OPERATORS.join("|")})\\b`, "i"),
  punctuation: /[{};()`,.]/
};

function LabelParamEditor({
  onChange,
  index,
  operationId,
  value,
  query,
  datasource
}) {
  const [state, setState] = React.useState({});
  return /* @__PURE__ */ React__default["default"].createElement(
    ui.Select,
    {
      inputId: getOperationParamId(operationId, index),
      autoFocus: value === "" ? true : void 0,
      openMenuOnFocus: true,
      onOpenMenu: async () => {
        setState({ isLoading: true });
        const options = await loadGroupByLabels(query, datasource);
        setState({ options, isLoading: void 0 });
      },
      isLoading: state.isLoading,
      allowCustomValue: true,
      noOptionsMessage: "No labels found",
      loadingMessage: "Loading labels",
      options: state.options,
      value: data.toOption(value),
      onChange: (value2) => onChange(index, value2.value)
    }
  );
}
async function loadGroupByLabels(query, datasource) {
  let labels = query.labels;
  if (datasource.type === "prometheus") {
    labels = [{ label: "__name__", op: "=", value: query.metric }, ...query.labels];
  }
  const expr = promQueryModeller.renderLabels(labels);
  const result = await datasource.languageProvider.fetchLabelsWithMatch(expr);
  return Object.keys(result).map((x) => ({
    label: x,
    value: x
  }));
}

var PromVisualQueryOperationCategory = /* @__PURE__ */ ((PromVisualQueryOperationCategory2) => {
  PromVisualQueryOperationCategory2["Aggregations"] = "Aggregations";
  PromVisualQueryOperationCategory2["RangeFunctions"] = "Range functions";
  PromVisualQueryOperationCategory2["Functions"] = "Functions";
  PromVisualQueryOperationCategory2["BinaryOps"] = "Binary operations";
  PromVisualQueryOperationCategory2["Trigonometric"] = "Trigonometric";
  PromVisualQueryOperationCategory2["Time"] = "Time Functions";
  return PromVisualQueryOperationCategory2;
})(PromVisualQueryOperationCategory || {});
var PromOperationId = /* @__PURE__ */ ((PromOperationId2) => {
  PromOperationId2["Abs"] = "abs";
  PromOperationId2["Absent"] = "absent";
  PromOperationId2["AbsentOverTime"] = "absent_over_time";
  PromOperationId2["Acos"] = "acos";
  PromOperationId2["Acosh"] = "acosh";
  PromOperationId2["Asin"] = "asin";
  PromOperationId2["Asinh"] = "asinh";
  PromOperationId2["Atan"] = "atan";
  PromOperationId2["Atanh"] = "atanh";
  PromOperationId2["Avg"] = "avg";
  PromOperationId2["AvgOverTime"] = "avg_over_time";
  PromOperationId2["BottomK"] = "bottomk";
  PromOperationId2["Ceil"] = "ceil";
  PromOperationId2["Changes"] = "changes";
  PromOperationId2["Clamp"] = "clamp";
  PromOperationId2["ClampMax"] = "clamp_max";
  PromOperationId2["ClampMin"] = "clamp_min";
  PromOperationId2["Cos"] = "cos";
  PromOperationId2["Cosh"] = "cosh";
  PromOperationId2["Count"] = "count";
  PromOperationId2["CountOverTime"] = "count_over_time";
  PromOperationId2["CountScalar"] = "count_scalar";
  PromOperationId2["CountValues"] = "count_values";
  PromOperationId2["DayOfMonth"] = "day_of_month";
  PromOperationId2["DayOfWeek"] = "day_of_week";
  PromOperationId2["DayOfYear"] = "day_of_year";
  PromOperationId2["DaysInMonth"] = "days_in_month";
  PromOperationId2["Deg"] = "deg";
  PromOperationId2["Delta"] = "delta";
  PromOperationId2["Deriv"] = "deriv";
  PromOperationId2["DropCommonLabels"] = "drop_common_labels";
  PromOperationId2["Exp"] = "exp";
  PromOperationId2["Floor"] = "floor";
  PromOperationId2["Group"] = "group";
  PromOperationId2["HistogramQuantile"] = "histogram_quantile";
  PromOperationId2["HistogramAvg"] = "histogram_avg";
  PromOperationId2["HistogramCount"] = "histogram_count";
  PromOperationId2["HistogramSum"] = "histogram_sum";
  PromOperationId2["HistogramFraction"] = "histogram_fraction";
  PromOperationId2["HistogramStddev"] = "histogram_stddev";
  PromOperationId2["HistogramStdvar"] = "histogram_stdvar";
  PromOperationId2["HoltWinters"] = "holt_winters";
  PromOperationId2["Hour"] = "hour";
  PromOperationId2["Idelta"] = "idelta";
  PromOperationId2["Increase"] = "increase";
  PromOperationId2["Irate"] = "irate";
  PromOperationId2["LabelJoin"] = "label_join";
  PromOperationId2["LabelReplace"] = "label_replace";
  PromOperationId2["Last"] = "last";
  PromOperationId2["LastOverTime"] = "last_over_time";
  PromOperationId2["Ln"] = "ln";
  PromOperationId2["Log10"] = "log10";
  PromOperationId2["Log2"] = "log2";
  PromOperationId2["Max"] = "max";
  PromOperationId2["MaxOverTime"] = "max_over_time";
  PromOperationId2["Min"] = "min";
  PromOperationId2["MinOverTime"] = "min_over_time";
  PromOperationId2["Minute"] = "minute";
  PromOperationId2["Month"] = "month";
  PromOperationId2["Pi"] = "pi";
  PromOperationId2["PredictLinear"] = "predict_linear";
  PromOperationId2["Present"] = "present";
  PromOperationId2["PresentOverTime"] = "present_over_time";
  PromOperationId2["Quantile"] = "quantile";
  PromOperationId2["QuantileOverTime"] = "quantile_over_time";
  PromOperationId2["Rad"] = "rad";
  PromOperationId2["Rate"] = "rate";
  PromOperationId2["Resets"] = "resets";
  PromOperationId2["Round"] = "round";
  PromOperationId2["Scalar"] = "scalar";
  PromOperationId2["Sgn"] = "sgn";
  PromOperationId2["Sin"] = "sin";
  PromOperationId2["Sinh"] = "sinh";
  PromOperationId2["Sort"] = "sort";
  PromOperationId2["SortDesc"] = "sort_desc";
  PromOperationId2["Sqrt"] = "sqrt";
  PromOperationId2["Stddev"] = "stddev";
  PromOperationId2["StddevOverTime"] = "stddev_over_time";
  PromOperationId2["Sum"] = "sum";
  PromOperationId2["SumOverTime"] = "sum_over_time";
  PromOperationId2["Tan"] = "tan";
  PromOperationId2["Tanh"] = "tanh";
  PromOperationId2["Time"] = "time";
  PromOperationId2["Timestamp"] = "timestamp";
  PromOperationId2["TopK"] = "topk";
  PromOperationId2["Vector"] = "vector";
  PromOperationId2["Year"] = "year";
  PromOperationId2["Addition"] = "__addition";
  PromOperationId2["Subtraction"] = "__subtraction";
  PromOperationId2["MultiplyBy"] = "__multiply_by";
  PromOperationId2["DivideBy"] = "__divide_by";
  PromOperationId2["Modulo"] = "__modulo";
  PromOperationId2["Exponent"] = "__exponent";
  PromOperationId2["NestedQuery"] = "__nested_query";
  PromOperationId2["EqualTo"] = "__equal_to";
  PromOperationId2["NotEqualTo"] = "__not_equal_to";
  PromOperationId2["GreaterThan"] = "__greater_than";
  PromOperationId2["LessThan"] = "__less_than";
  PromOperationId2["GreaterOrEqual"] = "__greater_or_equal";
  PromOperationId2["LessOrEqual"] = "__less_or_equal";
  return PromOperationId2;
})(PromOperationId || {});
var PromQueryPatternType = /* @__PURE__ */ ((PromQueryPatternType2) => {
  PromQueryPatternType2["Rate"] = "rate";
  PromQueryPatternType2["Histogram"] = "histogram";
  PromQueryPatternType2["Binary"] = "binary";
  return PromQueryPatternType2;
})(PromQueryPatternType || {});

var __defProp$K = Object.defineProperty;
var __defProps$D = Object.defineProperties;
var __getOwnPropDescs$D = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$J = Object.getOwnPropertySymbols;
var __hasOwnProp$J = Object.prototype.hasOwnProperty;
var __propIsEnum$J = Object.prototype.propertyIsEnumerable;
var __defNormalProp$K = (obj, key, value) => key in obj ? __defProp$K(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$I = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$J.call(b, prop))
      __defNormalProp$K(a, prop, b[prop]);
  if (__getOwnPropSymbols$J)
    for (var prop of __getOwnPropSymbols$J(b)) {
      if (__propIsEnum$J.call(b, prop))
        __defNormalProp$K(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$D = (a, b) => __defProps$D(a, __getOwnPropDescs$D(b));
function functionRendererLeft(model, def, innerExpr) {
  const params = renderParams(model, def);
  const str = model.id + "(";
  if (innerExpr) {
    params.push(innerExpr);
  }
  return str + params.join(", ") + ")";
}
function functionRendererRight(model, def, innerExpr) {
  const params = renderParams(model, def);
  const str = model.id + "(";
  if (innerExpr) {
    params.unshift(innerExpr);
  }
  return str + params.join(", ") + ")";
}
function rangeRendererWithParams(model, def, innerExpr, renderLeft) {
  var _a, _b;
  if (def.params.length < 2) {
    throw `Cannot render a function with params of length [${def.params.length}]`;
  }
  let rangeVector = (_b = ((_a = model.params) != null ? _a : [])[0]) != null ? _b : "5m";
  const params = renderParams(
    __spreadProps$D(__spreadValues$I({}, model), {
      params: model.params.slice(1)
    }),
    __spreadProps$D(__spreadValues$I({}, def), {
      params: def.params.slice(1),
      defaultParams: def.defaultParams.slice(1)
    }));
  const str = model.id + "(";
  if (innerExpr) {
    renderLeft ? params.push(`${innerExpr}[${rangeVector}]`) : params.unshift(`${innerExpr}[${rangeVector}]`);
  }
  return str + params.join(", ") + ")";
}
function rangeRendererRightWithParams(model, def, innerExpr) {
  return rangeRendererWithParams(model, def, innerExpr, false);
}
function rangeRendererLeftWithParams(model, def, innerExpr) {
  return rangeRendererWithParams(model, def, innerExpr, true);
}
function renderParams(model, def, innerExpr) {
  var _a;
  return ((_a = model.params) != null ? _a : []).map((value, index) => {
    const paramDef = def.params[index];
    if (paramDef.type === "string") {
      return '"' + value + '"';
    }
    return value;
  });
}
function defaultAddOperationHandler(def, query) {
  const newOperation = {
    id: def.id,
    params: def.defaultParams
  };
  return __spreadProps$D(__spreadValues$I({}, query), {
    operations: [...query.operations, newOperation]
  });
}
function getPromOperationDisplayName(funcName) {
  return lodash.capitalize(funcName.replace(/_/g, " "));
}
function getOperationParamId(operationId, paramIndex) {
  return `operations.${operationId}.param.${paramIndex}`;
}
function getRangeVectorParamDef(withRateInterval = false) {
  const options = [
    {
      label: "$__interval",
      value: "$__interval"
      // tooltip: 'Dynamic interval based on max data points, scrape and min interval',
    },
    { label: "1m", value: "1m" },
    { label: "5m", value: "5m" },
    { label: "10m", value: "10m" },
    { label: "1h", value: "1h" },
    { label: "24h", value: "24h" }
  ];
  if (withRateInterval) {
    options.unshift({
      label: "$__rate_interval",
      value: "$__rate_interval"
      // tooltip: 'Always above 4x scrape interval',
    });
  }
  const param = {
    name: "Range",
    type: "string",
    options
  };
  return param;
}
function createAggregationOperation(name, overrides = {}) {
  const operations = [
    __spreadValues$I({
      id: name,
      name: getPromOperationDisplayName(name),
      params: [
        {
          name: "By label",
          type: "string",
          restParam: true,
          optional: true
        }
      ],
      defaultParams: [],
      alternativesKey: "plain aggregations",
      category: PromVisualQueryOperationCategory.Aggregations,
      renderer: functionRendererLeft,
      paramChangedHandler: getOnLabelAddedHandler(`__${name}_by`),
      explainHandler: getAggregationExplainer(name, ""),
      addOperationHandler: defaultAddOperationHandler
    }, overrides),
    __spreadValues$I({
      id: `__${name}_by`,
      name: `${getPromOperationDisplayName(name)} by`,
      params: [
        {
          name: "Label",
          type: "string",
          restParam: true,
          optional: true,
          editor: LabelParamEditor
        }
      ],
      defaultParams: [""],
      alternativesKey: "aggregations by",
      category: PromVisualQueryOperationCategory.Aggregations,
      renderer: getAggregationByRenderer(name),
      paramChangedHandler: getLastLabelRemovedHandler(name),
      explainHandler: getAggregationExplainer(name, "by"),
      addOperationHandler: defaultAddOperationHandler,
      hideFromList: true
    }, overrides),
    __spreadValues$I({
      id: `__${name}_without`,
      name: `${getPromOperationDisplayName(name)} without`,
      params: [
        {
          name: "Label",
          type: "string",
          restParam: true,
          optional: true,
          editor: LabelParamEditor
        }
      ],
      defaultParams: [""],
      alternativesKey: "aggregations by",
      category: PromVisualQueryOperationCategory.Aggregations,
      renderer: getAggregationWithoutRenderer(name),
      paramChangedHandler: getLastLabelRemovedHandler(name),
      explainHandler: getAggregationExplainer(name, "without"),
      addOperationHandler: defaultAddOperationHandler,
      hideFromList: true
    }, overrides)
  ];
  return operations;
}
function createAggregationOperationWithParam(name, paramsDef, overrides = {}) {
  const operations = createAggregationOperation(name, overrides);
  operations[0].params.unshift(...paramsDef.params);
  operations[1].params.unshift(...paramsDef.params);
  operations[2].params.unshift(...paramsDef.params);
  operations[0].defaultParams = paramsDef.defaultParams;
  operations[1].defaultParams = [...paramsDef.defaultParams, ""];
  operations[2].defaultParams = [...paramsDef.defaultParams, ""];
  operations[1].renderer = getAggregationByRendererWithParameter(name);
  operations[2].renderer = getAggregationByRendererWithParameter(name);
  return operations;
}
function getAggregationByRenderer(aggregation) {
  return function aggregationRenderer(model, def, innerExpr) {
    return `${aggregation} by(${model.params.join(", ")}) (${innerExpr})`;
  };
}
function getAggregationWithoutRenderer(aggregation) {
  return function aggregationRenderer(model, def, innerExpr) {
    return `${aggregation} without(${model.params.join(", ")}) (${innerExpr})`;
  };
}
function getAggregationExplainer(aggregationName, mode) {
  return function aggregationExplainer(model) {
    const labels = model.params.map((label) => `\`${label}\``).join(" and ");
    const labelWord = pluralize__default["default"]("label", model.params.length);
    switch (mode) {
      case "by":
        return `Calculates ${aggregationName} over dimensions while preserving ${labelWord} ${labels}.`;
      case "without":
        return `Calculates ${aggregationName} over the dimensions ${labels}. All other labels are preserved.`;
      default:
        return `Calculates ${aggregationName} over the dimensions.`;
    }
  };
}
function getAggregationByRendererWithParameter(aggregation) {
  return function aggregationRenderer(model, def, innerExpr) {
    const restParamIndex = def.params.findIndex((param) => param.restParam);
    const params = model.params.slice(0, restParamIndex);
    const restParams = model.params.slice(restParamIndex);
    return `${aggregation} by(${restParams.join(", ")}) (${params.map((param, idx) => def.params[idx].type === "string" ? `"${param}"` : param).join(", ")}, ${innerExpr})`;
  };
}
function getLastLabelRemovedHandler(changeToOperationId) {
  return function onParamChanged(index, op, def) {
    if (op.params.length < def.params.length) {
      return __spreadProps$D(__spreadValues$I({}, op), {
        id: changeToOperationId
      });
    }
    return op;
  };
}
function getOnLabelAddedHandler(changeToOperationId) {
  return function onParamChanged(index, op, def) {
    if (op.params.length === def.params.length) {
      return __spreadProps$D(__spreadValues$I({}, op), {
        id: changeToOperationId
      });
    }
    return op;
  };
}

const binaryScalarDefs = [
  {
    id: PromOperationId.Addition,
    name: "Add scalar",
    sign: "+"
  },
  {
    id: PromOperationId.Subtraction,
    name: "Subtract scalar",
    sign: "-"
  },
  {
    id: PromOperationId.MultiplyBy,
    name: "Multiply by scalar",
    sign: "*"
  },
  {
    id: PromOperationId.DivideBy,
    name: "Divide by scalar",
    sign: "/"
  },
  {
    id: PromOperationId.Modulo,
    name: "Modulo by scalar",
    sign: "%"
  },
  {
    id: PromOperationId.Exponent,
    name: "Exponent",
    sign: "^"
  },
  {
    id: PromOperationId.EqualTo,
    name: "Equal to",
    sign: "==",
    comparison: true
  },
  {
    id: PromOperationId.NotEqualTo,
    name: "Not equal to",
    sign: "!=",
    comparison: true
  },
  {
    id: PromOperationId.GreaterThan,
    name: "Greater than",
    sign: ">",
    comparison: true
  },
  {
    id: PromOperationId.LessThan,
    name: "Less than",
    sign: "<",
    comparison: true
  },
  {
    id: PromOperationId.GreaterOrEqual,
    name: "Greater or equal to",
    sign: ">=",
    comparison: true
  },
  {
    id: PromOperationId.LessOrEqual,
    name: "Less or equal to",
    sign: "<=",
    comparison: true
  }
];
const binaryScalarOperatorToOperatorName = binaryScalarDefs.reduce((acc, def) => {
  acc[def.sign] = {
    id: def.id,
    comparison: def.comparison
  };
  return acc;
}, {});
const binaryScalarOperations = binaryScalarDefs.map((opDef) => {
  const params = [{ name: "Value", type: "number" }];
  let defaultParams = [2];
  if (opDef.comparison) {
    params.push({
      name: "Bool",
      type: "boolean",
      description: "If checked comparison will return 0 or 1 for the value rather than filtering."
    });
    defaultParams = [2, false];
  }
  return {
    id: opDef.id,
    name: opDef.name,
    params,
    defaultParams,
    alternativesKey: "binary scalar operations",
    category: PromVisualQueryOperationCategory.BinaryOps,
    renderer: getSimpleBinaryRenderer(opDef.sign),
    addOperationHandler: defaultAddOperationHandler
  };
});
function getSimpleBinaryRenderer(operator) {
  return function binaryRenderer(model, def, innerExpr) {
    let param = model.params[0];
    let bool = "";
    if (model.params.length === 2) {
      bool = model.params[1] ? " bool" : "";
    }
    return `${innerExpr} ${operator}${bool} ${param}`;
  };
}

var __defProp$J = Object.defineProperty;
var __defProps$C = Object.defineProperties;
var __getOwnPropDescs$C = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$I = Object.getOwnPropertySymbols;
var __hasOwnProp$I = Object.prototype.hasOwnProperty;
var __propIsEnum$I = Object.prototype.propertyIsEnumerable;
var __defNormalProp$J = (obj, key, value) => key in obj ? __defProp$J(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$H = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$I.call(b, prop))
      __defNormalProp$J(a, prop, b[prop]);
  if (__getOwnPropSymbols$I)
    for (var prop of __getOwnPropSymbols$I(b)) {
      if (__propIsEnum$I.call(b, prop))
        __defNormalProp$J(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$C = (a, b) => __defProps$C(a, __getOwnPropDescs$C(b));
function getOperationDefinitions() {
  const list = [
    {
      id: PromOperationId.HistogramQuantile,
      name: "Histogram quantile",
      params: [{ name: "Quantile", type: "number", options: [0.99, 0.95, 0.9, 0.75, 0.5, 0.25] }],
      defaultParams: [0.9],
      category: PromVisualQueryOperationCategory.Functions,
      renderer: functionRendererLeft,
      addOperationHandler: defaultAddOperationHandler
    },
    createFunction({ id: PromOperationId.HistogramAvg }),
    createFunction({ id: PromOperationId.HistogramCount }),
    createFunction({ id: PromOperationId.HistogramSum }),
    {
      id: PromOperationId.HistogramFraction,
      name: "Histogram fraction",
      params: [
        { name: "Lower scalar", type: "number" },
        { name: "Upper scalar", type: "number" }
      ],
      defaultParams: [0, 0.2],
      category: PromVisualQueryOperationCategory.Functions,
      renderer: functionRendererLeft,
      addOperationHandler: defaultAddOperationHandler
    },
    createFunction({ id: PromOperationId.HistogramStddev }),
    createFunction({ id: PromOperationId.HistogramStdvar }),
    {
      id: PromOperationId.LabelReplace,
      name: "Label replace",
      params: [
        { name: "Destination label", type: "string" },
        { name: "Replacement", type: "string" },
        { name: "Source label", type: "string" },
        { name: "Regex", type: "string" }
      ],
      category: PromVisualQueryOperationCategory.Functions,
      defaultParams: ["", "$1", "", "(.*)"],
      renderer: functionRendererRight,
      addOperationHandler: defaultAddOperationHandler
    },
    {
      id: PromOperationId.Ln,
      name: "Ln",
      params: [],
      defaultParams: [],
      category: PromVisualQueryOperationCategory.Functions,
      renderer: functionRendererLeft,
      addOperationHandler: defaultAddOperationHandler
    },
    createRangeFunction(PromOperationId.Changes),
    createRangeFunction(PromOperationId.Rate, true),
    createRangeFunction(PromOperationId.Irate),
    createRangeFunction(PromOperationId.Increase, true),
    createRangeFunction(PromOperationId.Idelta),
    createRangeFunction(PromOperationId.Delta),
    createFunction({
      id: PromOperationId.HoltWinters,
      params: [
        getRangeVectorParamDef(),
        { name: "Smoothing Factor", type: "number" },
        { name: "Trend Factor", type: "number" }
      ],
      defaultParams: ["$__interval", 0.5, 0.5],
      alternativesKey: "range function",
      category: PromVisualQueryOperationCategory.RangeFunctions,
      renderer: rangeRendererRightWithParams,
      addOperationHandler: addOperationWithRangeVector,
      changeTypeHandler: operationTypeChangedHandlerForRangeFunction
    }),
    createFunction({
      id: PromOperationId.PredictLinear,
      params: [getRangeVectorParamDef(), { name: "Seconds from now", type: "number" }],
      defaultParams: ["$__interval", 60],
      alternativesKey: "range function",
      category: PromVisualQueryOperationCategory.RangeFunctions,
      renderer: rangeRendererRightWithParams,
      addOperationHandler: addOperationWithRangeVector,
      changeTypeHandler: operationTypeChangedHandlerForRangeFunction
    }),
    createFunction({
      id: PromOperationId.QuantileOverTime,
      params: [getRangeVectorParamDef(), { name: "Quantile", type: "number" }],
      defaultParams: ["$__interval", 0.5],
      alternativesKey: "overtime function",
      category: PromVisualQueryOperationCategory.RangeFunctions,
      renderer: rangeRendererLeftWithParams,
      addOperationHandler: addOperationWithRangeVector,
      changeTypeHandler: operationTypeChangedHandlerForRangeFunction
    }),
    ...binaryScalarOperations,
    {
      id: PromOperationId.NestedQuery,
      name: "Binary operation with query",
      params: [],
      defaultParams: [],
      category: PromVisualQueryOperationCategory.BinaryOps,
      renderer: (model, def, innerExpr) => innerExpr,
      addOperationHandler: addNestedQueryHandler
    },
    createFunction({ id: PromOperationId.Abs }),
    createFunction({ id: PromOperationId.Absent }),
    createFunction({
      id: PromOperationId.Acos,
      category: PromVisualQueryOperationCategory.Trigonometric
    }),
    createFunction({
      id: PromOperationId.Acosh,
      category: PromVisualQueryOperationCategory.Trigonometric
    }),
    createFunction({
      id: PromOperationId.Asin,
      category: PromVisualQueryOperationCategory.Trigonometric
    }),
    createFunction({
      id: PromOperationId.Asinh,
      category: PromVisualQueryOperationCategory.Trigonometric
    }),
    createFunction({
      id: PromOperationId.Atan,
      category: PromVisualQueryOperationCategory.Trigonometric
    }),
    createFunction({
      id: PromOperationId.Atanh,
      category: PromVisualQueryOperationCategory.Trigonometric
    }),
    createFunction({ id: PromOperationId.Ceil }),
    createFunction({
      id: PromOperationId.Clamp,
      name: "Clamp",
      params: [
        { name: "Minimum Scalar", type: "number" },
        { name: "Maximum Scalar", type: "number" }
      ],
      defaultParams: [1, 1]
    }),
    createFunction({
      id: PromOperationId.ClampMax,
      params: [{ name: "Maximum Scalar", type: "number" }],
      defaultParams: [1]
    }),
    createFunction({
      id: PromOperationId.ClampMin,
      params: [{ name: "Minimum Scalar", type: "number" }],
      defaultParams: [1]
    }),
    createFunction({
      id: PromOperationId.Cos,
      category: PromVisualQueryOperationCategory.Trigonometric
    }),
    createFunction({
      id: PromOperationId.Cosh,
      category: PromVisualQueryOperationCategory.Trigonometric
    }),
    createFunction({
      id: PromOperationId.DayOfMonth,
      category: PromVisualQueryOperationCategory.Time
    }),
    createFunction({
      id: PromOperationId.DayOfWeek,
      category: PromVisualQueryOperationCategory.Time
    }),
    createFunction({
      id: PromOperationId.DayOfYear,
      category: PromVisualQueryOperationCategory.Time
    }),
    createFunction({
      id: PromOperationId.DaysInMonth,
      category: PromVisualQueryOperationCategory.Time
    }),
    createFunction({ id: PromOperationId.Deg }),
    createRangeFunction(PromOperationId.Deriv),
    //
    createFunction({ id: PromOperationId.Exp }),
    createFunction({ id: PromOperationId.Floor }),
    createFunction({ id: PromOperationId.Group }),
    createFunction({ id: PromOperationId.Hour }),
    createFunction({
      id: PromOperationId.LabelJoin,
      params: [
        {
          name: "Destination Label",
          type: "string",
          editor: LabelParamEditor
        },
        {
          name: "Separator",
          type: "string"
        },
        {
          name: "Source Label",
          type: "string",
          restParam: true,
          optional: true,
          editor: LabelParamEditor
        }
      ],
      defaultParams: ["", ",", ""],
      renderer: labelJoinRenderer,
      explainHandler: labelJoinExplainHandler,
      addOperationHandler: labelJoinAddOperationHandler
    }),
    createFunction({ id: PromOperationId.Log10 }),
    createFunction({ id: PromOperationId.Log2 }),
    createFunction({ id: PromOperationId.Minute }),
    createFunction({ id: PromOperationId.Month }),
    createFunction({
      id: PromOperationId.Pi,
      renderer: (model) => `${model.id}()`
    }),
    createFunction({
      id: PromOperationId.Quantile,
      params: [{ name: "Value", type: "number" }],
      defaultParams: [1],
      renderer: functionRendererLeft
    }),
    createFunction({ id: PromOperationId.Rad }),
    createRangeFunction(PromOperationId.Resets),
    createFunction({
      id: PromOperationId.Round,
      category: PromVisualQueryOperationCategory.Functions,
      params: [{ name: "To Nearest", type: "number" }],
      defaultParams: [1]
    }),
    createFunction({ id: PromOperationId.Scalar }),
    createFunction({ id: PromOperationId.Sgn }),
    createFunction({ id: PromOperationId.Sin, category: PromVisualQueryOperationCategory.Trigonometric }),
    createFunction({
      id: PromOperationId.Sinh,
      category: PromVisualQueryOperationCategory.Trigonometric
    }),
    createFunction({ id: PromOperationId.Sort }),
    createFunction({ id: PromOperationId.SortDesc }),
    createFunction({ id: PromOperationId.Sqrt }),
    createFunction({ id: PromOperationId.Stddev }),
    createFunction({
      id: PromOperationId.Tan,
      category: PromVisualQueryOperationCategory.Trigonometric
    }),
    createFunction({
      id: PromOperationId.Tanh,
      category: PromVisualQueryOperationCategory.Trigonometric
    }),
    createFunction({
      id: PromOperationId.Time,
      renderer: (model) => `${model.id}()`
    }),
    createFunction({ id: PromOperationId.Timestamp }),
    createFunction({
      id: PromOperationId.Vector,
      params: [{ name: "Value", type: "number" }],
      defaultParams: [1],
      renderer: (model) => `${model.id}(${model.params[0]})`
    }),
    createFunction({ id: PromOperationId.Year })
  ];
  return list;
}
function createFunction(definition) {
  var _a, _b, _c, _d, _e, _f;
  return __spreadProps$C(__spreadValues$H({}, definition), {
    id: definition.id,
    name: (_a = definition.name) != null ? _a : getPromOperationDisplayName(definition.id),
    params: (_b = definition.params) != null ? _b : [],
    defaultParams: (_c = definition.defaultParams) != null ? _c : [],
    category: (_d = definition.category) != null ? _d : PromVisualQueryOperationCategory.Functions,
    renderer: (_e = definition.renderer) != null ? _e : definition.params ? functionRendererRight : functionRendererLeft,
    addOperationHandler: (_f = definition.addOperationHandler) != null ? _f : defaultAddOperationHandler
  });
}
function createRangeFunction(name, withRateInterval = false) {
  return {
    id: name,
    name: getPromOperationDisplayName(name),
    params: [getRangeVectorParamDef(withRateInterval)],
    defaultParams: [withRateInterval ? "$__rate_interval" : "$__interval"],
    alternativesKey: "range function",
    category: PromVisualQueryOperationCategory.RangeFunctions,
    renderer: operationWithRangeVectorRenderer$1,
    addOperationHandler: addOperationWithRangeVector,
    changeTypeHandler: operationTypeChangedHandlerForRangeFunction
  };
}
function operationTypeChangedHandlerForRangeFunction(operation, newDef) {
  if (operation.params[0] === "$__rate_interval" && newDef.defaultParams[0] !== "$__rate_interval") {
    operation.params = newDef.defaultParams;
  } else if (operation.params[0] === "$__interval" && newDef.defaultParams[0] !== "$__interval") {
    operation.params = newDef.defaultParams;
  }
  return operation;
}
function operationWithRangeVectorRenderer$1(model, def, innerExpr) {
  var _a, _b;
  let rangeVector = (_b = ((_a = model.params) != null ? _a : [])[0]) != null ? _b : "5m";
  return `${def.id}(${innerExpr}[${rangeVector}])`;
}
function addOperationWithRangeVector(def, query, modeller) {
  const newOperation = {
    id: def.id,
    params: def.defaultParams
  };
  if (query.operations.length > 0) {
    const firstOp = modeller.getOperationDef(query.operations[0].id);
    if (firstOp.addOperationHandler === addOperationWithRangeVector) {
      return __spreadProps$C(__spreadValues$H({}, query), {
        operations: [newOperation, ...query.operations.slice(1)]
      });
    }
  }
  return __spreadProps$C(__spreadValues$H({}, query), {
    operations: [newOperation, ...query.operations]
  });
}
function addNestedQueryHandler(def, query) {
  var _a;
  return __spreadProps$C(__spreadValues$H({}, query), {
    binaryQueries: [
      ...(_a = query.binaryQueries) != null ? _a : [],
      {
        operator: "/",
        query
      }
    ]
  });
}
function labelJoinRenderer(model, def, innerExpr) {
  var _a, _b;
  const paramZero = (_a = model.params[0]) != null ? _a : "";
  const paramOne = (_b = model.params[1]) != null ? _b : "";
  const separator = `"${paramOne}"`;
  return `${model.id}(${innerExpr}, "${paramZero}", ${separator}, "${model.params.slice(2).join(separator)}")`;
}
function labelJoinExplainHandler(op, def) {
  var _a;
  let explainMessage = (_a = def == null ? void 0 : def.documentation) != null ? _a : "no docs";
  if (typeof op.params[1] !== "string") {
    explainMessage += " \u{1F6A8}\u{1F6A8}\u{1F6A8} The `separator` must be a string.";
  }
  return explainMessage;
}
function labelJoinAddOperationHandler(def, query) {
  const newOperation = {
    id: def.id,
    params: def.defaultParams
  };
  return __spreadProps$C(__spreadValues$H({}, query), {
    operations: [...query.operations, newOperation]
  });
}

function getAggregationOperations() {
  return [
    ...createAggregationOperation(PromOperationId.Sum),
    ...createAggregationOperation(PromOperationId.Avg),
    ...createAggregationOperation(PromOperationId.Min),
    ...createAggregationOperation(PromOperationId.Max),
    ...createAggregationOperation(PromOperationId.Count),
    ...createAggregationOperationWithParam(PromOperationId.TopK, {
      params: [{ name: "K-value", type: "number" }],
      defaultParams: [5]
    }),
    ...createAggregationOperationWithParam(PromOperationId.BottomK, {
      params: [{ name: "K-value", type: "number" }],
      defaultParams: [5]
    }),
    ...createAggregationOperationWithParam(PromOperationId.CountValues, {
      params: [{ name: "Identifier", type: "string" }],
      defaultParams: ["count"]
    }),
    createAggregationOverTime(PromOperationId.SumOverTime),
    createAggregationOverTime(PromOperationId.AvgOverTime),
    createAggregationOverTime(PromOperationId.MinOverTime),
    createAggregationOverTime(PromOperationId.MaxOverTime),
    createAggregationOverTime(PromOperationId.CountOverTime),
    createAggregationOverTime(PromOperationId.LastOverTime),
    createAggregationOverTime(PromOperationId.PresentOverTime),
    createAggregationOverTime(PromOperationId.AbsentOverTime),
    createAggregationOverTime(PromOperationId.StddevOverTime)
  ];
}
function createAggregationOverTime(name) {
  return {
    id: name,
    name: getPromOperationDisplayName(name),
    params: [getRangeVectorParamDef()],
    defaultParams: ["$__interval"],
    alternativesKey: "overtime function",
    category: PromVisualQueryOperationCategory.RangeFunctions,
    renderer: operationWithRangeVectorRenderer,
    addOperationHandler: addOperationWithRangeVector
  };
}
function operationWithRangeVectorRenderer(model, def, innerExpr) {
  var _a, _b;
  let rangeVector = (_b = ((_a = model.params) != null ? _a : [])[0]) != null ? _b : "$__interval";
  return `${def.id}(${innerExpr}[${rangeVector}])`;
}

var __defProp$I = Object.defineProperty;
var __defNormalProp$I = (obj, key, value) => key in obj ? __defProp$I(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$8 = (obj, key, value) => {
  __defNormalProp$I(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class LokiAndPromQueryModellerBase {
  constructor(getOperations) {
    __publicField$8(this, "operationsRegistry");
    __publicField$8(this, "categories", []);
    this.operationsRegistry = new data.Registry(getOperations);
  }
  setOperationCategories(categories) {
    this.categories = categories;
  }
  getOperationsForCategory(category) {
    return this.operationsRegistry.list().filter((op) => op.category === category && !op.hideFromList);
  }
  getAlternativeOperations(key) {
    return this.operationsRegistry.list().filter((op) => op.alternativesKey && op.alternativesKey === key);
  }
  getCategories() {
    return this.categories;
  }
  getOperationDef(id) {
    return this.operationsRegistry.getIfExists(id);
  }
  renderOperations(queryString, operations) {
    for (const operation of operations) {
      const def = this.operationsRegistry.getIfExists(operation.id);
      if (!def) {
        throw new Error(`Could not find operation ${operation.id} in the registry`);
      }
      queryString = def.renderer(operation, def, queryString);
    }
    return queryString;
  }
  renderBinaryQueries(queryString, binaryQueries) {
    if (binaryQueries) {
      for (const binQuery of binaryQueries) {
        queryString = `${this.renderBinaryQuery(queryString, binQuery)}`;
      }
    }
    return queryString;
  }
  renderBinaryQuery(leftOperand, binaryQuery) {
    let result = leftOperand + ` ${binaryQuery.operator} `;
    if (binaryQuery.vectorMatches) {
      result += `${binaryQuery.vectorMatchesType}(${binaryQuery.vectorMatches}) `;
    }
    return result + this.renderQuery(binaryQuery.query, true);
  }
  renderLabels(labels) {
    if (labels.length === 0) {
      return "";
    }
    let expr = "{";
    for (const filter of labels) {
      if (expr !== "{") {
        expr += ", ";
      }
      expr += `${filter.label}${filter.op}"${filter.value}"`;
    }
    return expr + `}`;
  }
  renderQuery(query, nested) {
    var _a, _b, _c;
    let queryString = `${(_a = query.metric) != null ? _a : ""}${this.renderLabels(query.labels)}`;
    queryString = this.renderOperations(queryString, query.operations);
    if (!nested && this.hasBinaryOp(query) && Boolean((_b = query.binaryQueries) == null ? void 0 : _b.length)) {
      queryString = `(${queryString})`;
    }
    queryString = this.renderBinaryQueries(queryString, query.binaryQueries);
    if (nested && (this.hasBinaryOp(query) || Boolean((_c = query.binaryQueries) == null ? void 0 : _c.length))) {
      queryString = `(${queryString})`;
    }
    return queryString;
  }
  hasBinaryOp(query) {
    return query.operations.find((op) => {
      const def = this.getOperationDef(op.id);
      return (def == null ? void 0 : def.category) === PromVisualQueryOperationCategory.BinaryOps;
    }) !== void 0;
  }
}

class PromQueryModeller extends LokiAndPromQueryModellerBase {
  constructor() {
    super(() => {
      const allOperations = [...getOperationDefinitions(), ...getAggregationOperations()];
      for (const op of allOperations) {
        const func = FUNCTIONS.find((x) => x.insertText === op.id);
        if (func) {
          op.documentation = func.documentation;
        }
      }
      return allOperations;
    });
    this.setOperationCategories([
      PromVisualQueryOperationCategory.Aggregations,
      PromVisualQueryOperationCategory.RangeFunctions,
      PromVisualQueryOperationCategory.Functions,
      PromVisualQueryOperationCategory.BinaryOps,
      PromVisualQueryOperationCategory.Trigonometric,
      PromVisualQueryOperationCategory.Time
    ]);
  }
  getQueryPatterns() {
    return [
      {
        name: "Rate then sum",
        type: PromQueryPatternType.Rate,
        operations: [
          { id: "rate", params: ["$__rate_interval"] },
          { id: "sum", params: [] }
        ]
      },
      {
        name: "Rate then sum by(label) then avg",
        type: PromQueryPatternType.Rate,
        operations: [
          { id: "rate", params: ["$__rate_interval"] },
          { id: "__sum_by", params: [""] },
          { id: "avg", params: [] }
        ]
      },
      {
        name: "Histogram quantile on rate",
        type: PromQueryPatternType.Histogram,
        operations: [
          { id: "rate", params: ["$__rate_interval"] },
          { id: "__sum_by", params: ["le"] },
          { id: "histogram_quantile", params: [0.95] }
        ]
      },
      {
        name: "Histogram quantile on increase",
        type: PromQueryPatternType.Histogram,
        operations: [
          { id: "increase", params: ["$__rate_interval"] },
          { id: "__max_by", params: ["le"] },
          { id: "histogram_quantile", params: [0.95] }
        ]
      },
      {
        name: "Binary Query",
        type: PromQueryPatternType.Binary,
        operations: [
          { id: "rate", params: ["$__rate_interval"] },
          { id: "sum", params: [] }
        ],
        binaryQueries: [
          {
            operator: "/",
            query: {
              metric: "",
              labels: [],
              operations: [
                { id: "rate", params: ["$__rate_interval"] },
                { id: "sum", params: [] }
              ]
            }
          }
        ]
      }
    ];
  }
}
const promQueryModeller = new PromQueryModeller();

function RawQuery({ query, lang, className }) {
  const theme = ui.useTheme2();
  const styles = getStyles$n(theme);
  const highlighted = Prism__default["default"].highlight(query, lang.grammar, lang.name);
  return /* @__PURE__ */ React__default["default"].createElement(
    "div",
    {
      className: css.cx(styles.editorField, "prism-syntax-highlight", className),
      "aria-label": "selector",
      dangerouslySetInnerHTML: { __html: highlighted }
    }
  );
}
const getStyles$n = (theme) => {
  return {
    editorField: css.css({
      fontFamily: theme.typography.fontFamilyMonospace,
      fontSize: theme.typography.bodySmall.fontSize
    })
  };
};

const QueryPattern = (props) => {
  const { pattern, onPatternSelect, hasNewQueryOption, hasPreviousQuery, selectedPatternName, setSelectedPatternName } = props;
  const styles = ui.useStyles2(getStyles$m);
  const lang = { grammar: promqlGrammar, name: "promql" };
  return /* @__PURE__ */ React__default["default"].createElement(ui.Card, { className: styles.card }, /* @__PURE__ */ React__default["default"].createElement(ui.Card.Heading, null, pattern.name), /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.rawQueryContainer }, /* @__PURE__ */ React__default["default"].createElement(
    RawQuery,
    {
      "aria-label": `${pattern.name} raw query`,
      query: promQueryModeller.renderQuery({
        labels: [],
        operations: pattern.operations,
        binaryQueries: pattern.binaryQueries
      }),
      lang,
      className: styles.rawQuery
    }
  )), /* @__PURE__ */ React__default["default"].createElement(ui.Card.Actions, null, selectedPatternName !== pattern.name ? /* @__PURE__ */ React__default["default"].createElement(
    ui.Button,
    {
      size: "sm",
      "aria-label": "use this query button",
      onClick: () => {
        if (hasPreviousQuery) {
          setSelectedPatternName(pattern.name);
        } else {
          onPatternSelect(pattern);
        }
      }
    },
    "Use this query"
  ) : /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.spacing }, `If you would like to use this query, ${hasNewQueryOption ? "you can either apply this query pattern or create a new query" : "this query pattern will be applied to your current query"}.`), /* @__PURE__ */ React__default["default"].createElement(ui.Button, { size: "sm", "aria-label": "back button", fill: "outline", onClick: () => setSelectedPatternName(null) }, "Back"), /* @__PURE__ */ React__default["default"].createElement(
    ui.Button,
    {
      size: "sm",
      "aria-label": "apply query starter button",
      onClick: () => {
        onPatternSelect(pattern);
      }
    },
    "Apply query"
  ), hasNewQueryOption && /* @__PURE__ */ React__default["default"].createElement(
    ui.Button,
    {
      size: "sm",
      "aria-label": "create new query button",
      onClick: () => {
        onPatternSelect(pattern, true);
      }
    },
    "Create new query"
  ))));
};
const getStyles$m = (theme) => {
  return {
    card: css.css({
      width: "49.5%",
      display: "flex",
      flexDirection: "column"
    }),
    rawQueryContainer: css.css({
      flexGrow: 1
    }),
    rawQuery: css.css({
      backgroundColor: theme.colors.background.primary,
      padding: theme.spacing(1),
      marginTop: theme.spacing(1)
    }),
    spacing: css.css({
      marginBottom: theme.spacing(1)
    })
  };
};

const ErrorId$1 = 0;
function getLeftMostChild(cur) {
  return cur.firstChild ? getLeftMostChild(cur.firstChild) : cur;
}
function makeError(expr, node) {
  var _a;
  return {
    text: getString(expr, node),
    // TODO: this are positions in the string with the replaced variables. Means it cannot be used to show exact
    //  placement of the error for the user. We need some translation table to positions before the variable
    //  replace.
    from: node.from,
    to: node.to,
    parentType: (_a = node.parent) == null ? void 0 : _a.name
  };
}
const variableRegex = /\$(\w+)|\[\[([\s\S]+?)(?::(\w+))?\]\]|\${(\w+)(?:\.([^:^\}]+))?(?::([^\}]+))?}/g;
function replaceVariables(expr) {
  return expr.replace(variableRegex, (match, var1, var2, fmt2, var3, fieldPath, fmt3) => {
    const fmt = fmt2 || fmt3;
    let variable = var1;
    let varType = "0";
    if (var2) {
      variable = var2;
      varType = "1";
    }
    if (var3) {
      variable = var3;
      varType = "2";
    }
    return `__V_${varType}__` + variable + "__V__" + (fmt ? "__F__" + fmt + "__F__" : "");
  });
}
const varTypeFunc = [
  (v, f) => `$${v}`,
  (v, f) => `[[${v}${f ? `:${f}` : ""}]]`,
  (v, f) => `\${${v}${f ? `:${f}` : ""}}`
];
function returnVariables(expr) {
  return expr.replace(/__V_(\d)__(.+?)__V__(?:__F__(\w+)__F__)?/g, (match, type, v, f) => {
    return varTypeFunc[parseInt(type, 10)](v, f);
  });
}
function getString(expr, node) {
  if (!node) {
    return "";
  }
  return returnVariables(expr.substring(node.from, node.to));
}
function makeBinOp(opDef, expr, numberNode, hasBool) {
  const params = [parseFloat(getString(expr, numberNode))];
  if (opDef.comparison) {
    params.push(hasBool);
  }
  return {
    id: opDef.id,
    params
  };
}
function getAllByType(expr, cur, type) {
  if (cur.type.id === type) {
    return [getString(expr, cur)];
  }
  const values = [];
  let pos = 0;
  let child = cur.childAfter(pos);
  while (child) {
    values.push(...getAllByType(expr, child, type));
    pos = child.to;
    child = cur.childAfter(pos);
  }
  return values;
}
const regexifyLabelValuesQueryString = (query) => {
  const queryArray = query.split(" ");
  return queryArray.map((query2) => `${query2}.*`).join("");
};

function buildVisualQueryFromString(expr) {
  const replacedExpr = replaceVariables(expr);
  const tree = lezerPromql.parser.parse(replacedExpr);
  const node = tree.topNode;
  const visQuery = {
    metric: "",
    labels: [],
    operations: []
  };
  const context = {
    query: visQuery,
    errors: []
  };
  try {
    handleExpression(replacedExpr, node, context);
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      context.errors.push({
        text: err.message
      });
    }
  }
  if (isEmptyQuery(context.query)) {
    context.errors = [];
  }
  if (isValidPromQLMinusGrafanaGlobalVariables(expr)) {
    context.errors = [];
  }
  return context;
}
function isValidPromQLMinusGrafanaGlobalVariables(expr) {
  const context = {
    query: {
      metric: "",
      labels: [],
      operations: []
    },
    errors: []
  };
  expr = expr.replace(/\$__interval/g, "1s");
  expr = expr.replace(/\$__interval_ms/g, "1000");
  expr = expr.replace(/\$__rate_interval/g, "1s");
  expr = expr.replace(/\$__range_ms/g, "1000");
  expr = expr.replace(/\$__range_s/g, "1");
  expr = expr.replace(/\$__range/g, "1s");
  const tree = lezerPromql.parser.parse(expr);
  const node = tree.topNode;
  try {
    handleExpression(expr, node, context);
  } catch (err) {
    return false;
  }
  return context.errors.length === 0;
}
function handleExpression(expr, node, context) {
  const visQuery = context.query;
  switch (node.type.id) {
    case lezerPromql.Identifier: {
      visQuery.metric = getString(expr, node);
      break;
    }
    case lezerPromql.LabelMatcher: {
      visQuery.labels.push(getLabel$1(expr, node));
      const err = node.getChild(ErrorId$1);
      if (err) {
        context.errors.push(makeError(expr, err));
      }
      break;
    }
    case lezerPromql.FunctionCall: {
      handleFunction(expr, node, context);
      break;
    }
    case lezerPromql.AggregateExpr: {
      handleAggregation(expr, node, context);
      break;
    }
    case lezerPromql.BinaryExpr: {
      handleBinary(expr, node, context);
      break;
    }
    case ErrorId$1: {
      if (isIntervalVariableError(node)) {
        break;
      }
      context.errors.push(makeError(expr, node));
      break;
    }
    default: {
      if (node.type.id === lezerPromql.ParenExpr) {
        context.errors.push(makeError(expr, node));
      }
      let child = node.firstChild;
      while (child) {
        handleExpression(expr, child, context);
        child = child.nextSibling;
      }
    }
  }
}
function isIntervalVariableError(node) {
  var _a, _b;
  return ((_b = (_a = node.prevSibling) == null ? void 0 : _a.firstChild) == null ? void 0 : _b.type.id) === lezerPromql.VectorSelector;
}
function getLabel$1(expr, node) {
  const label = getString(expr, node.getChild(lezerPromql.LabelName));
  const op = getString(expr, node.getChild(lezerPromql.MatchOp));
  const value = getString(expr, node.getChild(lezerPromql.StringLiteral)).replace(/"/g, "");
  return {
    label,
    op,
    value
  };
}
const rangeFunctions = ["changes", "rate", "irate", "increase", "delta"];
function handleFunction(expr, node, context) {
  const visQuery = context.query;
  const nameNode = node.getChild(lezerPromql.FunctionIdentifier);
  const funcName = getString(expr, nameNode);
  const body = node.getChild(lezerPromql.FunctionCallBody);
  const params = [];
  let interval = "";
  if (rangeFunctions.includes(funcName) || funcName.endsWith("_over_time")) {
    let match = getString(expr, node).match(/\[(.+)\]/);
    if (match == null ? void 0 : match[1]) {
      interval = match[1];
      params.push(match[1]);
    }
  }
  const op = { id: funcName, params };
  visQuery.operations.unshift(op);
  if (body) {
    if (getString(expr, body) === "([" + interval + "])") {
      return;
    }
    updateFunctionArgs(expr, body, context, op);
  }
}
function handleAggregation(expr, node, context) {
  const visQuery = context.query;
  const nameNode = node.getChild(lezerPromql.AggregateOp);
  let funcName = getString(expr, nameNode);
  const modifier = node.getChild(lezerPromql.AggregateModifier);
  const labels = [];
  if (modifier) {
    const byModifier = modifier.getChild(`By`);
    if (byModifier && funcName) {
      funcName = `__${funcName}_by`;
    }
    const withoutModifier = modifier.getChild(lezerPromql.Without);
    if (withoutModifier) {
      funcName = `__${funcName}_without`;
    }
    labels.push(...getAllByType(expr, modifier, lezerPromql.LabelName));
  }
  const body = node.getChild(lezerPromql.FunctionCallBody);
  const op = { id: funcName, params: [] };
  visQuery.operations.unshift(op);
  updateFunctionArgs(expr, body, context, op);
  op.params.push(...labels);
}
function updateFunctionArgs(expr, node, context, op) {
  if (!node) {
    return;
  }
  switch (node.type.id) {
    case lezerPromql.FunctionCallBody: {
      let child = node.firstChild;
      while (child) {
        let binaryExpressionWithinFunctionArgs;
        if (child.type.id === lezerPromql.BinaryExpr) {
          binaryExpressionWithinFunctionArgs = child;
        } else {
          binaryExpressionWithinFunctionArgs = child.getChild(lezerPromql.BinaryExpr);
        }
        if (binaryExpressionWithinFunctionArgs) {
          context.errors.push({
            text: "Query parsing is ambiguous.",
            from: binaryExpressionWithinFunctionArgs.from,
            to: binaryExpressionWithinFunctionArgs.to
          });
        }
        updateFunctionArgs(expr, child, context, op);
        child = child.nextSibling;
      }
      break;
    }
    case lezerPromql.NumberLiteral: {
      op.params.push(parseFloat(getString(expr, node)));
      break;
    }
    case lezerPromql.StringLiteral: {
      op.params.push(getString(expr, node).replace(/"/g, ""));
      break;
    }
    default: {
      handleExpression(expr, node, context);
    }
  }
}
function handleBinary(expr, node, context) {
  var _a;
  const visQuery = context.query;
  const left = node.firstChild;
  const op = getString(expr, left.nextSibling);
  const binModifier = getBinaryModifier(expr, (_a = node.getChild(lezerPromql.BoolModifier)) != null ? _a : node.getChild(lezerPromql.MatchingModifierClause));
  const right = node.lastChild;
  const opDef = binaryScalarOperatorToOperatorName[op];
  const leftNumber = left.type.id === lezerPromql.NumberLiteral;
  const rightNumber = right.type.id === lezerPromql.NumberLiteral;
  const rightBinary = right.type.id === lezerPromql.BinaryExpr;
  if (leftNumber) ; else {
    handleExpression(expr, left, context);
  }
  if (rightNumber) {
    visQuery.operations.push(makeBinOp(opDef, expr, right, !!(binModifier == null ? void 0 : binModifier.isBool)));
  } else if (rightBinary) {
    const leftMostChild = getLeftMostChild(right);
    if ((leftMostChild == null ? void 0 : leftMostChild.type.id) === lezerPromql.NumberLiteral) {
      visQuery.operations.push(makeBinOp(opDef, expr, leftMostChild, !!(binModifier == null ? void 0 : binModifier.isBool)));
    }
    handleExpression(expr, right, context);
  } else {
    visQuery.binaryQueries = visQuery.binaryQueries || [];
    const binQuery = {
      operator: op,
      query: {
        metric: "",
        labels: [],
        operations: []
      }
    };
    if (binModifier == null ? void 0 : binModifier.isMatcher) {
      binQuery.vectorMatchesType = binModifier.matchType;
      binQuery.vectorMatches = binModifier.matches;
    }
    visQuery.binaryQueries.push(binQuery);
    handleExpression(expr, right, {
      query: binQuery.query,
      errors: context.errors
    });
  }
}
function getBinaryModifier(expr, node) {
  if (!node) {
    return void 0;
  }
  if (node.getChild("Bool")) {
    return { isBool: true, isMatcher: false };
  } else {
    let labels = "";
    const groupingLabels = node.getChild(lezerPromql.GroupingLabels);
    if (groupingLabels) {
      labels = getAllByType(expr, groupingLabels, lezerPromql.LabelName).join(", ");
    }
    return {
      isMatcher: true,
      isBool: false,
      matches: labels,
      matchType: node.getChild(lezerPromql.On) ? "on" : "ignoring"
    };
  }
}
function isEmptyQuery(query) {
  if (query.labels.length === 0 && query.operations.length === 0 && !query.metric) {
    return true;
  }
  return false;
}

var __defProp$H = Object.defineProperty;
var __defProps$B = Object.defineProperties;
var __getOwnPropDescs$B = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$H = Object.getOwnPropertySymbols;
var __hasOwnProp$H = Object.prototype.hasOwnProperty;
var __propIsEnum$H = Object.prototype.propertyIsEnumerable;
var __defNormalProp$H = (obj, key, value) => key in obj ? __defProp$H(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$G = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$H.call(b, prop))
      __defNormalProp$H(a, prop, b[prop]);
  if (__getOwnPropSymbols$H)
    for (var prop of __getOwnPropSymbols$H(b)) {
      if (__propIsEnum$H.call(b, prop))
        __defNormalProp$H(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$B = (a, b) => __defProps$B(a, __getOwnPropDescs$B(b));
const QueryPatternsModal = (props) => {
  const { isOpen, onClose, onChange, onAddQuery, query, queries, app } = props;
  const [openTabs, setOpenTabs] = React.useState([]);
  const [selectedPatternName, setSelectedPatternName] = React.useState(null);
  const styles = ui.useStyles2(getStyles$l);
  const hasNewQueryOption = !!onAddQuery;
  const hasPreviousQuery = React.useMemo(() => {
    var _a;
    const visualQuery = buildVisualQueryFromString((_a = query.expr) != null ? _a : "");
    const hasOperations = visualQuery.query.operations.length > 0, hasMetric = visualQuery.query.metric, hasLabels = visualQuery.query.labels.length > 0, hasBinaryQueries = visualQuery.query.binaryQueries ? visualQuery.query.binaryQueries.length > 0 : false;
    return hasOperations || hasMetric || hasLabels || hasBinaryQueries;
  }, [query.expr]);
  const onPatternSelect = (pattern, selectAsNewQuery = false) => {
    const visualQuery = buildVisualQueryFromString(selectAsNewQuery ? "" : query.expr);
    runtime.reportInteraction("grafana_prom_kickstart_your_query_selected", {
      app: app != null ? app : "",
      editorMode: query.editorMode,
      selectedPattern: pattern.name,
      preSelectedOperationsCount: visualQuery.query.operations.length,
      preSelectedLabelsCount: visualQuery.query.labels.length,
      createNewQuery: hasNewQueryOption && selectAsNewQuery
    });
    visualQuery.query.operations = pattern.operations;
    visualQuery.query.binaryQueries = pattern.binaryQueries;
    if (hasNewQueryOption && selectAsNewQuery) {
      onAddQuery(__spreadProps$B(__spreadValues$G({}, query), {
        refId: getNextRefIdChar(queries != null ? queries : [query]),
        expr: promQueryModeller.renderQuery(visualQuery.query)
      }));
    } else {
      onChange(__spreadProps$B(__spreadValues$G({}, query), {
        expr: promQueryModeller.renderQuery(visualQuery.query)
      }));
    }
    setSelectedPatternName(null);
    onClose();
  };
  return /* @__PURE__ */ React__default["default"].createElement(ui.Modal, { "aria-label": "Kick start your query modal", isOpen, title: "Kick start your query", onDismiss: onClose }, /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.spacing }, "Kick start your query by selecting one of these queries. You can then continue to complete your query."), Object.values(PromQueryPatternType).map((patternType) => {
    return /* @__PURE__ */ React__default["default"].createElement(
      ui.Collapse,
      {
        "aria-label": `open and close ${patternType} query starter card`,
        key: patternType,
        label: `${lodash.capitalize(patternType)} query starters`,
        isOpen: openTabs.includes(patternType),
        collapsible: true,
        onToggle: () => setOpenTabs(
          (tabs) => (
            // close tab if it's already open, otherwise open it
            tabs.includes(patternType) ? tabs.filter((t) => t !== patternType) : [...tabs, patternType]
          )
        )
      },
      /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.cardsContainer }, promQueryModeller.getQueryPatterns().filter((pattern) => pattern.type === patternType).map((pattern) => /* @__PURE__ */ React__default["default"].createElement(
        QueryPattern,
        {
          key: pattern.name,
          pattern,
          hasNewQueryOption,
          hasPreviousQuery,
          onPatternSelect,
          selectedPatternName,
          setSelectedPatternName
        }
      )))
    );
  }), /* @__PURE__ */ React__default["default"].createElement(ui.Button, { "aria-label": "close kick start your query modal", variant: "secondary", onClick: onClose }, "Close"));
};
const getStyles$l = (theme) => {
  return {
    cardsContainer: css.css({
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between"
    }),
    spacing: css.css({
      marginBottom: theme.spacing(1)
    })
  };
};

class Store {
  get(key) {
    return window.localStorage[key];
  }
  set(key, value) {
    window.localStorage[key] = value;
  }
  getBool(key, def) {
    if (def !== void 0 && !this.exists(key)) {
      return def;
    }
    return window.localStorage[key] === "true";
  }
  getObject(key, def) {
    let ret = def;
    if (this.exists(key)) {
      const json = window.localStorage[key];
      try {
        ret = JSON.parse(json);
      } catch (error) {
        console.error(`Error parsing store object: ${key}. Returning default: ${def}. [${error}]`);
      }
    }
    return ret;
  }
  /* Returns true when successfully stored, throws error if not successfully stored */
  setObject(key, value) {
    let json;
    try {
      json = JSON.stringify(value);
    } catch (error) {
      throw new Error(`Could not stringify object: ${key}. [${error}]`);
    }
    try {
      this.set(key, json);
    } catch (error) {
      const errorToThrow = new Error(`Could not save item in localStorage: ${key}. [${error}]`);
      if (error instanceof Error) {
        errorToThrow.name = error.name;
      }
      throw errorToThrow;
    }
    return true;
  }
  exists(key) {
    return window.localStorage[key] !== void 0;
  }
  delete(key) {
    window.localStorage.removeItem(key);
  }
}
const store = new Store();

const promQueryEditorExplainKey = "PrometheusQueryEditorExplainDefault";
function getFlagValue(key, defaultValue = false) {
  const val = store.get(key);
  return val === void 0 ? defaultValue : Boolean(parseInt(val, 10));
}
function setFlagValue(key, value) {
  store.set(key, value ? "1" : "0");
}
function useFlag(key, defaultValue = false) {
  const [flag, updateFlag] = React.useState(getFlagValue(key, defaultValue));
  const setter = React.useCallback(
    (value) => {
      setFlagValue(key, value);
      updateFlag(value);
    },
    [key]
  );
  return { flag, setFlag: setter };
}

var QueryEditorMode = /* @__PURE__ */ ((QueryEditorMode2) => {
  QueryEditorMode2["Code"] = "code";
  QueryEditorMode2["Builder"] = "builder";
  return QueryEditorMode2;
})(QueryEditorMode || {});

const editorModes = [
  { label: "Builder", value: QueryEditorMode.Builder },
  { label: "Code", value: QueryEditorMode.Code }
];
function QueryEditorModeToggle({ mode, onChange }) {
  return /* @__PURE__ */ React__default["default"].createElement("div", { "data-testid": "QueryEditorModeToggle" }, /* @__PURE__ */ React__default["default"].createElement(ui.RadioButtonGroup, { options: editorModes, size: "sm", value: mode, onChange }));
}

var __defProp$G = Object.defineProperty;
var __defProps$A = Object.defineProperties;
var __getOwnPropDescs$A = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$G = Object.getOwnPropertySymbols;
var __hasOwnProp$G = Object.prototype.hasOwnProperty;
var __propIsEnum$G = Object.prototype.propertyIsEnumerable;
var __defNormalProp$G = (obj, key, value) => key in obj ? __defProp$G(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$F = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$G.call(b, prop))
      __defNormalProp$G(a, prop, b[prop]);
  if (__getOwnPropSymbols$G)
    for (var prop of __getOwnPropSymbols$G(b)) {
      if (__propIsEnum$G.call(b, prop))
        __defNormalProp$G(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$A = (a, b) => __defProps$A(a, __getOwnPropDescs$A(b));
var __objRest$6 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$G.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$G)
    for (var prop of __getOwnPropSymbols$G(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$G.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function QueryHeaderSwitch(_a) {
  var _b = _a, { label } = _b, inputProps = __objRest$6(_b, ["label"]);
  const dashedLabel = label.replace(" ", "-");
  const switchIdRef = React.useRef(lodash.uniqueId(`switch-${dashedLabel}`));
  const styles = ui.useStyles2(getStyles$k);
  return /* @__PURE__ */ React__default["default"].createElement(ui.Stack, { gap: 1 }, /* @__PURE__ */ React__default["default"].createElement("label", { htmlFor: switchIdRef.current, className: styles.switchLabel }, label), /* @__PURE__ */ React__default["default"].createElement(ui.Switch, __spreadProps$A(__spreadValues$F({}, inputProps), { id: switchIdRef.current })));
}
const getStyles$k = (theme) => {
  return {
    switchLabel: css.css({
      color: theme.colors.text.secondary,
      cursor: "pointer",
      fontSize: theme.typography.bodySmall.fontSize,
      "&:hover": {
        color: theme.colors.text.primary
      }
    })
  };
};

var PrometheusCacheLevel = /* @__PURE__ */ ((PrometheusCacheLevel2) => {
  PrometheusCacheLevel2["Low"] = "Low";
  PrometheusCacheLevel2["Medium"] = "Medium";
  PrometheusCacheLevel2["High"] = "High";
  PrometheusCacheLevel2["None"] = "None";
  return PrometheusCacheLevel2;
})(PrometheusCacheLevel || {});
var PromApplication = /* @__PURE__ */ ((PromApplication2) => {
  PromApplication2["Cortex"] = "Cortex";
  PromApplication2["Mimir"] = "Mimir";
  PromApplication2["Prometheus"] = "Prometheus";
  PromApplication2["Thanos"] = "Thanos";
  return PromApplication2;
})(PromApplication || {});
var LegendFormatMode = /* @__PURE__ */ ((LegendFormatMode2) => {
  LegendFormatMode2["Auto"] = "__auto";
  LegendFormatMode2["Verbose"] = "__verbose";
  LegendFormatMode2["Custom"] = "__custom";
  return LegendFormatMode2;
})(LegendFormatMode || {});
var PromVariableQueryType = /* @__PURE__ */ ((PromVariableQueryType2) => {
  PromVariableQueryType2[PromVariableQueryType2["LabelNames"] = 0] = "LabelNames";
  PromVariableQueryType2[PromVariableQueryType2["LabelValues"] = 1] = "LabelValues";
  PromVariableQueryType2[PromVariableQueryType2["MetricNames"] = 2] = "MetricNames";
  PromVariableQueryType2[PromVariableQueryType2["VarQueryResult"] = 3] = "VarQueryResult";
  PromVariableQueryType2[PromVariableQueryType2["SeriesQuery"] = 4] = "SeriesQuery";
  PromVariableQueryType2[PromVariableQueryType2["ClassicQuery"] = 5] = "ClassicQuery";
  return PromVariableQueryType2;
})(PromVariableQueryType || {});

var __defProp$F = Object.defineProperty;
var __defProps$z = Object.defineProperties;
var __getOwnPropDescs$z = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$F = Object.getOwnPropertySymbols;
var __hasOwnProp$F = Object.prototype.hasOwnProperty;
var __propIsEnum$F = Object.prototype.propertyIsEnumerable;
var __defNormalProp$F = (obj, key, value) => key in obj ? __defProp$F(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$E = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$F.call(b, prop))
      __defNormalProp$F(a, prop, b[prop]);
  if (__getOwnPropSymbols$F)
    for (var prop of __getOwnPropSymbols$F(b)) {
      if (__propIsEnum$F.call(b, prop))
        __defNormalProp$F(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$z = (a, b) => __defProps$z(a, __getOwnPropDescs$z(b));
const queryEditorModeDefaultLocalStorageKey = "PrometheusQueryEditorModeDefault";
function changeEditorMode(query, editorMode, onChange) {
  if (query.expr === "") {
    store.set(queryEditorModeDefaultLocalStorageKey, editorMode);
  }
  onChange(__spreadProps$z(__spreadValues$E({}, query), { editorMode }));
}
function getDefaultEditorMode(expr, defaultEditor = QueryEditorMode.Builder) {
  if (expr != null && expr !== "") {
    return QueryEditorMode.Code;
  }
  const value = store.get(queryEditorModeDefaultLocalStorageKey);
  switch (value) {
    case QueryEditorMode.Builder:
    case QueryEditorMode.Code:
      return value;
    default:
      return defaultEditor;
  }
}
function getQueryWithDefaults(query, app, defaultEditor) {
  let result = query;
  if (!query.editorMode) {
    result = __spreadProps$z(__spreadValues$E({}, query), { editorMode: getDefaultEditorMode(query.expr, defaultEditor) });
  }
  if (!query.expr) {
    result = __spreadProps$z(__spreadValues$E({}, result), { expr: "", legendFormat: LegendFormatMode.Auto });
  }
  if (query.range == null && query.instant == null) {
    result = __spreadProps$z(__spreadValues$E({}, result), { range: true });
    if (app === data.CoreApp.Explore) {
      result.instant = true;
    }
  }
  const isBothInstantAndRange = query.instant && query.range;
  if (app === data.CoreApp.UnifiedAlerting && isBothInstantAndRange) {
    result = __spreadProps$z(__spreadValues$E({}, result), { instant: false, range: true });
  }
  return result;
}

function OperationExplainedBox({ title, stepNumber, markdown, children }) {
  const styles = ui.useStyles2(getStyles$j);
  return /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.box }, stepNumber !== void 0 && /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.stepNumber }, stepNumber), /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.boxInner }, title && /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.header }, /* @__PURE__ */ React__default["default"].createElement("span", null, title)), /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.body }, markdown && /* @__PURE__ */ React__default["default"].createElement("div", { dangerouslySetInnerHTML: { __html: data.renderMarkdown(markdown) } }), children)));
}
const getStyles$j = (theme) => {
  return {
    box: css.css({
      background: theme.colors.background.secondary,
      padding: theme.spacing(1),
      borderRadius: theme.shape.radius.default,
      position: "relative"
    }),
    boxInner: css.css({
      marginLeft: theme.spacing(4)
    }),
    stepNumber: css.css({
      fontWeight: theme.typography.fontWeightMedium,
      background: theme.colors.secondary.main,
      width: "20px",
      height: "20px",
      borderRadius: theme.shape.radius.circle,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      top: "10px",
      left: "11px",
      fontSize: theme.typography.bodySmall.fontSize
    }),
    header: css.css({
      paddingBottom: theme.spacing(0.5),
      display: "flex",
      alignItems: "center",
      fontFamily: theme.typography.fontFamilyMonospace
    }),
    body: css.css({
      color: theme.colors.text.secondary,
      "p:last-child": {
        margin: 0
      },
      a: {
        color: theme.colors.text.link,
        textDecoration: "underline"
      }
    })
  };
};

var __defProp$E = Object.defineProperty;
var __defProps$y = Object.defineProperties;
var __getOwnPropDescs$y = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$E = Object.getOwnPropertySymbols;
var __hasOwnProp$E = Object.prototype.hasOwnProperty;
var __propIsEnum$E = Object.prototype.propertyIsEnumerable;
var __defNormalProp$E = (obj, key, value) => key in obj ? __defProp$E(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$D = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$E.call(b, prop))
      __defNormalProp$E(a, prop, b[prop]);
  if (__getOwnPropSymbols$E)
    for (var prop of __getOwnPropSymbols$E(b)) {
      if (__propIsEnum$E.call(b, prop))
        __defNormalProp$E(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$y = (a, b) => __defProps$y(a, __getOwnPropDescs$y(b));
const OperationInfoButton = React__default["default"].memo(({ def, operation }) => {
  const styles = ui.useStyles2(getStyles$i);
  const [show, setShow] = React.useState(false);
  const middleware = [
    react.offset(16),
    react.flip({
      fallbackAxisSideDirection: "end",
      // see https://floating-ui.com/docs/flip#combining-with-shift
      crossAxis: false,
      boundary: document.body
    }),
    react.shift()
  ];
  const { context, refs, floatingStyles } = react.useFloating({
    open: show,
    placement: "top",
    onOpenChange: setShow,
    middleware,
    whileElementsMounted: react.autoUpdate
  });
  const click = react.useClick(context);
  const dismiss = react.useDismiss(context);
  const { getReferenceProps, getFloatingProps } = react.useInteractions([dismiss, click]);
  return /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, /* @__PURE__ */ React__default["default"].createElement(
    ui.Button,
    __spreadValues$D({
      title: "Click to show description",
      ref: refs.setReference,
      icon: "info-circle",
      size: "sm",
      variant: "secondary",
      fill: "text"
    }, getReferenceProps())
  ), show && /* @__PURE__ */ React__default["default"].createElement(ui.Portal, null, /* @__PURE__ */ React__default["default"].createElement("div", __spreadProps$y(__spreadValues$D({ ref: refs.setFloating, style: floatingStyles }, getFloatingProps()), { className: styles.docBox }), /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.docBoxHeader }, /* @__PURE__ */ React__default["default"].createElement("span", null, def.renderer(operation, def, "<expr>")), /* @__PURE__ */ React__default["default"].createElement(experimental.FlexItem, { grow: 1 }), /* @__PURE__ */ React__default["default"].createElement(
    ui.Button,
    {
      icon: "times",
      onClick: () => setShow(false),
      fill: "text",
      variant: "secondary",
      title: "Remove operation"
    }
  )), /* @__PURE__ */ React__default["default"].createElement(
    "div",
    {
      className: styles.docBoxBody,
      dangerouslySetInnerHTML: { __html: getOperationDocs(def, operation) }
    }
  ))));
});
OperationInfoButton.displayName = "OperationDocs";
const getStyles$i = (theme) => {
  return {
    docBox: css.css({
      overflow: "hidden",
      background: theme.colors.background.primary,
      border: `1px solid ${theme.colors.border.strong}`,
      boxShadow: theme.shadows.z3,
      maxWidth: "600px",
      padding: theme.spacing(1),
      borderRadius: theme.shape.radius.default,
      zIndex: theme.zIndex.tooltip
    }),
    docBoxHeader: css.css({
      fontSize: theme.typography.h5.fontSize,
      fontFamily: theme.typography.fontFamilyMonospace,
      paddingBottom: theme.spacing(1),
      display: "flex",
      alignItems: "center"
    }),
    docBoxBody: css.css({
      // The markdown paragraph has a marginBottom this removes it
      marginBottom: theme.spacing(-1),
      color: theme.colors.text.secondary
    })
  };
};
function getOperationDocs(def, op) {
  var _a;
  return data.renderMarkdown(def.explainHandler ? def.explainHandler(op, def) : (_a = def.documentation) != null ? _a : "no docs");
}

var __defProp$D = Object.defineProperty;
var __defProps$x = Object.defineProperties;
var __getOwnPropDescs$x = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$D = Object.getOwnPropertySymbols;
var __hasOwnProp$D = Object.prototype.hasOwnProperty;
var __propIsEnum$D = Object.prototype.propertyIsEnumerable;
var __defNormalProp$D = (obj, key, value) => key in obj ? __defProp$D(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$C = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$D.call(b, prop))
      __defNormalProp$D(a, prop, b[prop]);
  if (__getOwnPropSymbols$D)
    for (var prop of __getOwnPropSymbols$D(b)) {
      if (__propIsEnum$D.call(b, prop))
        __defNormalProp$D(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$x = (a, b) => __defProps$x(a, __getOwnPropDescs$x(b));
const OperationHeader = React__default["default"].memo(
  ({ operation, def, index, onChange, onRemove, queryModeller, dragHandleProps }) => {
    var _a;
    const styles = ui.useStyles2(getStyles$h);
    const [state, setState] = React.useState({});
    const onToggleSwitcher = () => {
      if (state.isOpen) {
        setState(__spreadProps$x(__spreadValues$C({}, state), { isOpen: false }));
      } else {
        const alternatives = queryModeller.getAlternativeOperations(def.alternativesKey).map((alt) => ({ label: alt.name, value: alt }));
        setState({ isOpen: true, alternatives });
      }
    };
    return /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.header }, !state.isOpen && /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, /* @__PURE__ */ React__default["default"].createElement("div", __spreadValues$C({}, dragHandleProps), (_a = def.name) != null ? _a : def.id), /* @__PURE__ */ React__default["default"].createElement(experimental.FlexItem, { grow: 1 }), /* @__PURE__ */ React__default["default"].createElement("div", { className: `${styles.operationHeaderButtons} operation-header-show-on-hover` }, /* @__PURE__ */ React__default["default"].createElement(
      ui.Button,
      {
        icon: "angle-down",
        size: "sm",
        onClick: onToggleSwitcher,
        fill: "text",
        variant: "secondary",
        title: "Click to view alternative operations"
      }
    ), /* @__PURE__ */ React__default["default"].createElement(OperationInfoButton, { def, operation }), /* @__PURE__ */ React__default["default"].createElement(
      ui.Button,
      {
        icon: "times",
        size: "sm",
        onClick: () => onRemove(index),
        fill: "text",
        variant: "secondary",
        title: "Remove operation"
      }
    ))), state.isOpen && /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.selectWrapper }, /* @__PURE__ */ React__default["default"].createElement(
      ui.Select,
      {
        autoFocus: true,
        openMenuOnFocus: true,
        placeholder: "Replace with",
        options: state.alternatives,
        isOpen: true,
        onCloseMenu: onToggleSwitcher,
        onChange: (value) => {
          if (value.value) {
            const newDef = queryModeller.getOperationDef(value.value.id);
            const newParams = [...newDef.defaultParams];
            for (let i = 0; i < Math.min(operation.params.length, newParams.length); i++) {
              if (newDef.params[i].type === def.params[i].type) {
                newParams[i] = operation.params[i];
              }
            }
            const changedOp = __spreadProps$x(__spreadValues$C({}, operation), { params: newParams, id: value.value.id });
            onChange(index, def.changeTypeHandler ? def.changeTypeHandler(changedOp, newDef) : changedOp);
          }
        }
      }
    )));
  }
);
OperationHeader.displayName = "OperationHeader";
const getStyles$h = (theme) => {
  return {
    header: css.css({
      borderBottom: `1px solid ${theme.colors.border.medium}`,
      padding: theme.spacing(0.5, 0.5, 0.5, 1),
      display: "flex",
      alignItems: "center"
    }),
    operationHeaderButtons: css.css({
      opacity: 1
    }),
    selectWrapper: css.css({
      paddingRight: theme.spacing(2)
    })
  };
};

function getOperationParamEditor(paramDef) {
  if (paramDef.editor) {
    return paramDef.editor;
  }
  if (paramDef.options) {
    return SelectInputParamEditor;
  }
  switch (paramDef.type) {
    case "boolean":
      return BoolInputParamEditor;
    case "number":
    case "string":
    default:
      return SimpleInputParamEditor;
  }
}
function SimpleInputParamEditor(props) {
  var _a;
  return /* @__PURE__ */ React__default["default"].createElement(
    ui.AutoSizeInput,
    {
      id: getOperationParamId(props.operationId, props.index),
      defaultValue: (_a = props.value) == null ? void 0 : _a.toString(),
      minWidth: props.paramDef.minWidth,
      placeholder: props.paramDef.placeholder,
      title: props.paramDef.description,
      maxWidth: (props.paramDef.minWidth || 20) * 3,
      onCommitChange: (evt) => {
        props.onChange(props.index, evt.currentTarget.value);
        if (props.paramDef.runQueryOnEnter && evt.type === "keydown") {
          props.onRunQuery();
        }
      }
    }
  );
}
function BoolInputParamEditor(props) {
  return /* @__PURE__ */ React__default["default"].createElement(
    ui.Checkbox,
    {
      id: getOperationParamId(props.operationId, props.index),
      value: Boolean(props.value),
      onChange: (evt) => props.onChange(props.index, evt.currentTarget.checked)
    }
  );
}
function SelectInputParamEditor({
  paramDef,
  value,
  index,
  operationId,
  onChange
}) {
  var _a, _b;
  const styles = ui.useStyles2(getStyles$g);
  let selectOptions = paramDef.options;
  if (!((_a = selectOptions[0]) == null ? void 0 : _a.label)) {
    selectOptions = paramDef.options.map((option) => ({
      label: option.toString(),
      value: option
    }));
  }
  let valueOption = (_b = selectOptions.find((x) => x.value === value)) != null ? _b : data.toOption(value);
  if (!value && paramDef.optional) {
    return /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.optionalParam }, /* @__PURE__ */ React__default["default"].createElement(
      ui.Button,
      {
        size: "sm",
        variant: "secondary",
        title: `Add ${paramDef.name}`,
        icon: "plus",
        onClick: () => onChange(index, selectOptions[0].value)
      },
      paramDef.name
    ));
  }
  return /* @__PURE__ */ React__default["default"].createElement(ui.Stack, { gap: 0.5, direction: "row", alignItems: "center" }, /* @__PURE__ */ React__default["default"].createElement(
    ui.Select,
    {
      id: getOperationParamId(operationId, index),
      value: valueOption,
      options: selectOptions,
      placeholder: paramDef.placeholder,
      allowCustomValue: true,
      onChange: (value2) => onChange(index, value2.value),
      width: paramDef.minWidth || "auto"
    }
  ), paramDef.optional && /* @__PURE__ */ React__default["default"].createElement(
    ui.Button,
    {
      "data-testid": `operations.${index}.remove-param`,
      size: "sm",
      fill: "text",
      icon: "times",
      variant: "secondary",
      title: `Remove ${paramDef.name}`,
      onClick: () => onChange(index, "")
    }
  ));
}
const getStyles$g = (theme) => {
  return {
    optionalParam: css.css({
      marginTop: theme.spacing(1)
    })
  };
};

var __defProp$C = Object.defineProperty;
var __defProps$w = Object.defineProperties;
var __getOwnPropDescs$w = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$C = Object.getOwnPropertySymbols;
var __hasOwnProp$C = Object.prototype.hasOwnProperty;
var __propIsEnum$C = Object.prototype.propertyIsEnumerable;
var __defNormalProp$C = (obj, key, value) => key in obj ? __defProp$C(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$B = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$C.call(b, prop))
      __defNormalProp$C(a, prop, b[prop]);
  if (__getOwnPropSymbols$C)
    for (var prop of __getOwnPropSymbols$C(b)) {
      if (__propIsEnum$C.call(b, prop))
        __defNormalProp$C(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$w = (a, b) => __defProps$w(a, __getOwnPropDescs$w(b));
function OperationEditor({
  operation,
  index,
  onRemove,
  onChange,
  onRunQuery,
  queryModeller,
  query,
  datasource,
  flash,
  highlight,
  timeRange
}) {
  const styles = ui.useStyles2(getStyles$f);
  const def = queryModeller.getOperationDef(operation.id);
  const shouldFlash = useFlash(flash);
  const id = React.useId();
  if (!def) {
    return /* @__PURE__ */ React__default["default"].createElement("span", null, "Operation ", operation.id, " not found");
  }
  const onParamValueChanged = (paramIdx, value) => {
    const update = __spreadProps$w(__spreadValues$B({}, operation), { params: [...operation.params] });
    update.params[paramIdx] = value;
    callParamChangedThenOnChange(def, update, index, paramIdx, onChange);
  };
  const onAddRestParam = () => {
    const update = __spreadProps$w(__spreadValues$B({}, operation), { params: [...operation.params, ""] });
    callParamChangedThenOnChange(def, update, index, operation.params.length, onChange);
  };
  const onRemoveRestParam = (paramIdx) => {
    const update = __spreadProps$w(__spreadValues$B({}, operation), {
      params: [...operation.params.slice(0, paramIdx), ...operation.params.slice(paramIdx + 1)]
    });
    callParamChangedThenOnChange(def, update, index, paramIdx, onChange);
  };
  const operationElements = [];
  for (let paramIndex = 0; paramIndex < operation.params.length; paramIndex++) {
    const paramDef = def.params[Math.min(def.params.length - 1, paramIndex)];
    const Editor = getOperationParamEditor(paramDef);
    operationElements.push(
      /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.paramRow, key: `${paramIndex}-1` }, !paramDef.hideName && /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.paramName }, /* @__PURE__ */ React__default["default"].createElement("label", { htmlFor: getOperationParamId(id, paramIndex) }, paramDef.name), paramDef.description && /* @__PURE__ */ React__default["default"].createElement(ui.Tooltip, { placement: "top", content: paramDef.description, theme: "info" }, /* @__PURE__ */ React__default["default"].createElement(ui.Icon, { name: "info-circle", size: "sm", className: styles.infoIcon }))), /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.paramValue }, /* @__PURE__ */ React__default["default"].createElement(ui.Stack, { gap: 0.5, direction: "row", alignItems: "center" }, /* @__PURE__ */ React__default["default"].createElement(
        Editor,
        {
          index: paramIndex,
          paramDef,
          value: operation.params[paramIndex],
          operation,
          operationId: id,
          onChange: onParamValueChanged,
          onRunQuery,
          query,
          datasource,
          timeRange
        }
      ), paramDef.restParam && (operation.params.length > def.params.length || paramDef.optional) && /* @__PURE__ */ React__default["default"].createElement(
        ui.Button,
        {
          "data-testid": `operations.${index}.remove-rest-param`,
          size: "sm",
          fill: "text",
          icon: "times",
          variant: "secondary",
          title: `Remove ${paramDef.name}`,
          onClick: () => onRemoveRestParam(paramIndex)
        }
      ))))
    );
  }
  let restParam;
  if (def.params.length > 0) {
    const lastParamDef = def.params[def.params.length - 1];
    if (lastParamDef.restParam) {
      restParam = renderAddRestParamButton(lastParamDef, onAddRestParam, index, operation.params.length, styles);
    }
  }
  return /* @__PURE__ */ React__default["default"].createElement(reactBeautifulDnd.Draggable, { draggableId: `operation-${index}`, index }, (provided) => /* @__PURE__ */ React__default["default"].createElement(
    "div",
    __spreadProps$w(__spreadValues$B({
      className: css.cx(styles.card, (shouldFlash || highlight) && styles.cardHighlight),
      ref: provided.innerRef
    }, provided.draggableProps), {
      "data-testid": `operations.${index}.wrapper`
    }),
    /* @__PURE__ */ React__default["default"].createElement(
      OperationHeader,
      {
        operation,
        dragHandleProps: provided.dragHandleProps,
        def,
        index,
        onChange,
        onRemove,
        queryModeller
      }
    ),
    /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.body }, operationElements),
    restParam,
    index < query.operations.length - 1 && /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.arrow }, /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.arrowLine }), /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.arrowArrow }))
  ));
}
function useFlash(flash) {
  const [keepFlash, setKeepFlash] = React.useState(true);
  React.useEffect(() => {
    let t;
    if (flash) {
      t = setTimeout(() => {
        setKeepFlash(false);
      }, 1e3);
    } else {
      setKeepFlash(true);
    }
    return () => clearTimeout(t);
  }, [flash]);
  return keepFlash && flash;
}
function renderAddRestParamButton(paramDef, onAddRestParam, operationIndex, paramIndex, styles) {
  return /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.restParam, key: `${paramIndex}-2` }, /* @__PURE__ */ React__default["default"].createElement(
    ui.Button,
    {
      size: "sm",
      icon: "plus",
      title: `Add ${paramDef.name}`.trimEnd(),
      variant: "secondary",
      onClick: onAddRestParam,
      "data-testid": `operations.${operationIndex}.add-rest-param`
    },
    paramDef.name
  ));
}
function callParamChangedThenOnChange(def, operation, operationIndex, paramIndex, onChange) {
  if (def.paramChangedHandler) {
    onChange(operationIndex, def.paramChangedHandler(paramIndex, operation, def));
  } else {
    onChange(operationIndex, operation);
  }
}
const getStyles$f = (theme) => {
  return {
    cardWrapper: css.css({
      alignItems: "stretch"
    }),
    error: css.css({
      marginBottom: theme.spacing(1)
    }),
    card: css.css({
      background: theme.colors.background.primary,
      border: `1px solid ${theme.colors.border.medium}`,
      cursor: "grab",
      borderRadius: theme.shape.radius.default,
      marginBottom: theme.spacing(1),
      position: "relative",
      [theme.transitions.handleMotion("no-preference", "reduce")]: {
        transition: "all 0.5s ease-in 0s"
      },
      height: "100%"
    }),
    cardError: css.css({
      boxShadow: `0px 0px 4px 0px ${theme.colors.warning.main}`,
      border: `1px solid ${theme.colors.warning.main}`
    }),
    cardHighlight: css.css({
      boxShadow: `0px 0px 4px 0px ${theme.colors.primary.border}`,
      border: `1px solid ${theme.colors.primary.border}`
    }),
    infoIcon: css.css({
      marginLeft: theme.spacing(0.5),
      color: theme.colors.text.secondary,
      ":hover": {
        color: theme.colors.text.primary
      }
    }),
    body: css.css({
      margin: theme.spacing(1, 1, 0.5, 1),
      display: "table"
    }),
    paramRow: css.css({
      label: "paramRow",
      display: "table-row",
      verticalAlign: "middle"
    }),
    paramName: css.css({
      display: "table-cell",
      padding: theme.spacing(0, 1, 0, 0),
      fontSize: theme.typography.bodySmall.fontSize,
      fontWeight: theme.typography.fontWeightMedium,
      verticalAlign: "middle",
      height: "32px"
    }),
    paramValue: css.css({
      label: "paramValue",
      display: "table-cell",
      verticalAlign: "middle"
    }),
    restParam: css.css({
      padding: theme.spacing(0, 1, 1, 1)
    }),
    arrow: css.css({
      position: "absolute",
      top: "0",
      right: "-18px",
      display: "flex"
    }),
    arrowLine: css.css({
      height: "2px",
      width: "8px",
      backgroundColor: theme.colors.border.strong,
      position: "relative",
      top: "14px"
    }),
    arrowArrow: css.css({
      width: 0,
      height: 0,
      borderTop: `5px solid transparent`,
      borderBottom: `5px solid transparent`,
      borderLeft: `7px solid ${theme.colors.border.strong}`,
      position: "relative",
      top: "10px"
    })
  };
};

var __defProp$B = Object.defineProperty;
var __defProps$v = Object.defineProperties;
var __getOwnPropDescs$v = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$B = Object.getOwnPropertySymbols;
var __hasOwnProp$B = Object.prototype.hasOwnProperty;
var __propIsEnum$B = Object.prototype.propertyIsEnumerable;
var __defNormalProp$B = (obj, key, value) => key in obj ? __defProp$B(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$A = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$B.call(b, prop))
      __defNormalProp$B(a, prop, b[prop]);
  if (__getOwnPropSymbols$B)
    for (var prop of __getOwnPropSymbols$B(b)) {
      if (__propIsEnum$B.call(b, prop))
        __defNormalProp$B(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$v = (a, b) => __defProps$v(a, __getOwnPropDescs$v(b));
function OperationList({
  query,
  datasource,
  queryModeller,
  onChange,
  onRunQuery,
  highlightedOp,
  timeRange
}) {
  const styles = ui.useStyles2(getStyles$e);
  const { operations } = query;
  const opsToHighlight = useOperationsHighlight(operations);
  const [cascaderOpen, setCascaderOpen] = React.useState(false);
  const onOperationChange = (index, update) => {
    const updatedList = [...operations];
    updatedList.splice(index, 1, update);
    onChange(__spreadProps$v(__spreadValues$A({}, query), { operations: updatedList }));
  };
  const onRemove = (index) => {
    const updatedList = [...operations.slice(0, index), ...operations.slice(index + 1)];
    onChange(__spreadProps$v(__spreadValues$A({}, query), { operations: updatedList }));
  };
  const addOptions = queryModeller.getCategories().map((category) => {
    return {
      value: category,
      label: category,
      items: queryModeller.getOperationsForCategory(category).map((operation) => ({
        value: operation.id,
        label: operation.name,
        isLeaf: true
      }))
    };
  });
  const onAddOperation = (value) => {
    const operationDef = queryModeller.getOperationDef(value);
    if (!operationDef) {
      return;
    }
    onChange(operationDef.addOperationHandler(operationDef, query, queryModeller));
    setCascaderOpen(false);
  };
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const updatedList = [...operations];
    const element = updatedList[result.source.index];
    updatedList.splice(result.source.index, 1);
    updatedList.splice(result.destination.index, 0, element);
    onChange(__spreadProps$v(__spreadValues$A({}, query), { operations: updatedList }));
  };
  const onCascaderBlur = () => {
    setCascaderOpen(false);
  };
  return /* @__PURE__ */ React__default["default"].createElement(ui.Stack, { gap: 1, direction: "column" }, /* @__PURE__ */ React__default["default"].createElement(ui.Stack, { gap: 1 }, operations.length > 0 && /* @__PURE__ */ React__default["default"].createElement(reactBeautifulDnd.DragDropContext, { onDragEnd }, /* @__PURE__ */ React__default["default"].createElement(reactBeautifulDnd.Droppable, { droppableId: "sortable-field-mappings", direction: "horizontal" }, (provided) => /* @__PURE__ */ React__default["default"].createElement("div", __spreadValues$A({ className: styles.operationList, ref: provided.innerRef }, provided.droppableProps), operations.map((op, index) => {
    return /* @__PURE__ */ React__default["default"].createElement(
      OperationEditor,
      {
        key: op.id + JSON.stringify(op.params) + index,
        queryModeller,
        index,
        operation: op,
        query,
        datasource,
        onChange: onOperationChange,
        onRemove,
        onRunQuery,
        flash: opsToHighlight[index],
        highlight: highlightedOp === op,
        timeRange
      }
    );
  }), provided.placeholder))), /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.addButton }, cascaderOpen ? /* @__PURE__ */ React__default["default"].createElement(
    ui.Cascader,
    {
      options: addOptions,
      onSelect: onAddOperation,
      onBlur: onCascaderBlur,
      autoFocus: true,
      alwaysOpen: true,
      hideActiveLevelLabel: true,
      placeholder: "Search"
    }
  ) : /* @__PURE__ */ React__default["default"].createElement(ui.Button, { icon: "plus", variant: "secondary", onClick: () => setCascaderOpen(true), title: "Add operation" }, "Operations"))));
}
function useOperationsHighlight(operations) {
  const isMounted = reactUse.useMountedState();
  const prevOperations = reactUse.usePrevious(operations);
  if (!isMounted()) {
    return operations.map(() => false);
  }
  if (!prevOperations) {
    return operations.map(() => true);
  }
  let newOps = [];
  if (prevOperations.length - 1 === operations.length && operations.every((op) => prevOperations.includes(op))) {
    return operations.map(() => false);
  }
  if (prevOperations.length + 1 === operations.length && prevOperations.every((op) => operations.includes(op))) {
    const newOp = operations.find((op) => !prevOperations.includes(op));
    newOps = operations.map((op) => {
      return op === newOp;
    });
  } else {
    newOps = operations.map((op, index) => {
      var _a;
      return !isSameOp(op.id, (_a = prevOperations[index]) == null ? void 0 : _a.id);
    });
  }
  return newOps;
}
function isSameOp(op1, op2) {
  return op1 === op2 || `__${op1}_by` === op2 || op1 === `__${op2}_by`;
}
const getStyles$e = (theme) => {
  return {
    heading: css.css({
      label: "heading",
      fontSize: 12,
      fontWeight: theme.typography.fontWeightMedium,
      marginBottom: 0
    }),
    operationList: css.css({
      label: "operationList",
      display: "flex",
      flexWrap: "wrap",
      gap: theme.spacing(2)
    }),
    addButton: css.css({
      label: "addButton",
      width: 126,
      paddingBottom: theme.spacing(1)
    })
  };
};

function OperationListExplained({
  query,
  queryModeller,
  stepNumber,
  lang,
  onMouseEnter,
  onMouseLeave
}) {
  return /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, query.operations.map((op, index) => {
    var _a;
    const def = queryModeller.getOperationDef(op.id);
    if (!def) {
      return `Operation ${op.id} not found`;
    }
    const title = def.renderer(op, def, "<expr>");
    const body = def.explainHandler ? def.explainHandler(op, def) : (_a = def.documentation) != null ? _a : "no docs";
    return /* @__PURE__ */ React__default["default"].createElement(
      "div",
      {
        key: index,
        onMouseEnter: () => onMouseEnter == null ? void 0 : onMouseEnter(op, index),
        onMouseLeave: () => onMouseLeave == null ? void 0 : onMouseLeave(op, index)
      },
      /* @__PURE__ */ React__default["default"].createElement(
        OperationExplainedBox,
        {
          stepNumber: index + stepNumber,
          title: /* @__PURE__ */ React__default["default"].createElement(RawQuery, { query: title, lang }),
          markdown: body
        }
      )
    );
  }));
}

function OperationsEditorRow({ children }) {
  const styles = ui.useStyles2(getStyles$d);
  return /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.root }, /* @__PURE__ */ React__default["default"].createElement(ui.Stack, { gap: 1 }, children));
}
const getStyles$d = (theme) => {
  return {
    root: css.css({
      padding: theme.spacing(1, 1, 0, 1),
      backgroundColor: theme.colors.background.secondary,
      borderRadius: theme.shape.radius.default
    })
  };
};

const QueryBuilderHints = ({
  datasource,
  query: visualQuery,
  onChange,
  data,
  queryModeller,
  buildVisualQueryFromString
}) => {
  const [hints, setHints] = React.useState([]);
  const styles = ui.useStyles2(getStyles$c);
  React.useEffect(() => {
    const query = { expr: queryModeller.renderQuery(visualQuery), refId: "" };
    const hints2 = datasource.getQueryHints(query, (data == null ? void 0 : data.series) || []).filter((hint) => {
      var _a;
      return (_a = hint.fix) == null ? void 0 : _a.action;
    });
    setHints(hints2);
  }, [datasource, visualQuery, data, queryModeller]);
  return /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, hints.length > 0 && /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.container }, hints.map((hint) => {
    var _a, _b, _c, _d;
    return /* @__PURE__ */ React__default["default"].createElement(ui.Tooltip, { content: `${hint.label} ${(_a = hint.fix) == null ? void 0 : _a.label}`, key: hint.type }, /* @__PURE__ */ React__default["default"].createElement(
      ui.Button,
      {
        onClick: () => {
          var _a2;
          runtime.reportInteraction("grafana_query_builder_hints_clicked", {
            hint: hint.type,
            datasourceType: datasource.type
          });
          if ((_a2 = hint == null ? void 0 : hint.fix) == null ? void 0 : _a2.action) {
            const query = { expr: queryModeller.renderQuery(visualQuery), refId: "" };
            const newQuery = datasource.modifyQuery(query, hint.fix.action);
            const newVisualQuery = buildVisualQueryFromString(newQuery.expr);
            return onChange(newVisualQuery.query);
          }
        },
        fill: "outline",
        size: "sm",
        className: styles.hint
      },
      "hint: ",
      ((_b = hint.fix) == null ? void 0 : _b.title) || ((_d = (_c = hint.fix) == null ? void 0 : _c.action) == null ? void 0 : _d.type.toLowerCase().replace("_", " "))
    ));
  })));
};
QueryBuilderHints.displayName = "QueryBuilderHints";
const getStyles$c = (theme) => {
  return {
    container: css.css({
      display: "flex",
      alignItems: "start"
    }),
    hint: css.css({
      marginRight: theme.spacing(1)
    })
  };
};

function addLabelToQuery(query, key, value, operator = "=") {
  if (!key || !value) {
    throw new Error("Need label to add to query.");
  }
  const vectorSelectorPositions = getVectorSelectorPositions(query);
  if (!vectorSelectorPositions.length) {
    return query;
  }
  const filter = toLabelFilter(key, value, operator);
  return addFilter(query, vectorSelectorPositions, filter);
}
function getVectorSelectorPositions(query) {
  const tree = lezerPromql.parser.parse(query);
  const positions = [];
  tree.iterate({
    enter: ({ to, from, type }) => {
      if (type.id === lezerPromql.VectorSelector) {
        const visQuery = buildVisualQueryFromString(query.substring(from, to));
        positions.push({ query: visQuery.query, from, to });
        return false;
      }
    }
  });
  return positions;
}
function toLabelFilter(key, value, operator) {
  const transformedValue = value === Infinity ? "+Inf" : value.toString();
  return { label: key, op: operator, value: transformedValue };
}
function addFilter(query, vectorSelectorPositions, filter) {
  const modeller = new PromQueryModeller();
  let newQuery = "";
  let prev = 0;
  for (let i = 0; i < vectorSelectorPositions.length; i++) {
    const match = vectorSelectorPositions[i];
    const isLast = i === vectorSelectorPositions.length - 1;
    const start = query.substring(prev, match.from);
    const end = isLast ? query.substring(match.to) : "";
    if (!labelExists(match.query.labels, filter)) {
      match.query.labels.push(filter);
    }
    const newLabels = modeller.renderQuery(match.query);
    newQuery += start + newLabels + end;
    prev = match.to;
  }
  return newQuery;
}
function labelExists(labels, filter) {
  return labels.find((label) => label.label === filter.label && label.value === filter.value);
}

var __defProp$A = Object.defineProperty;
var __defProps$u = Object.defineProperties;
var __getOwnPropDescs$u = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$A = Object.getOwnPropertySymbols;
var __hasOwnProp$A = Object.prototype.hasOwnProperty;
var __propIsEnum$A = Object.prototype.propertyIsEnumerable;
var __defNormalProp$A = (obj, key, value) => key in obj ? __defProp$A(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$z = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$A.call(b, prop))
      __defNormalProp$A(a, prop, b[prop]);
  if (__getOwnPropSymbols$A)
    for (var prop of __getOwnPropSymbols$A(b)) {
      if (__propIsEnum$A.call(b, prop))
        __defNormalProp$A(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$u = (a, b) => __defProps$u(a, __getOwnPropDescs$u(b));
var __objRest$5 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$A.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$A)
    for (var prop of __getOwnPropSymbols$A(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$A.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const SelectMenuOptions = ({
  children,
  data: data$1,
  innerProps,
  innerRef,
  isFocused,
  isSelected,
  renderOptionLabel
}) => {
  const theme = ui.useTheme2();
  const styles = ui.getSelectStyles(theme);
  const icon = data$1.icon ? data.toIconName(data$1.icon) : void 0;
  const _a = innerProps, rest = __objRest$5(_a, ["onMouseMove", "onMouseOver"]);
  return /* @__PURE__ */ React__default["default"].createElement(
    "div",
    __spreadProps$u(__spreadValues$z({
      ref: innerRef,
      className: css.cx(
        styles.option,
        isFocused && styles.optionFocused,
        isSelected && styles.optionSelected,
        data$1.isDisabled && styles.optionDisabled
      )
    }, rest), {
      "data-testid": selectors.components.Select.option,
      title: data$1.title
    }),
    icon && /* @__PURE__ */ React__default["default"].createElement(ui.Icon, { name: icon, className: styles.optionIcon }),
    data$1.imgUrl && /* @__PURE__ */ React__default["default"].createElement("img", { className: styles.optionImage, src: data$1.imgUrl, alt: data$1.label || String(data$1.value) }),
    /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.optionBody }, /* @__PURE__ */ React__default["default"].createElement("span", null, renderOptionLabel ? renderOptionLabel(data$1) : children), data$1.description && /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.optionDescription }, data$1.description), data$1.component && /* @__PURE__ */ React__default["default"].createElement(data$1.component, null))
  );
};
SelectMenuOptions.displayName = "SelectMenuOptions";

async function setMetrics(datasource, query, initialMetrics) {
  var _a, _b;
  let hasMetadata = true;
  const metadata = datasource.languageProvider.metricsMetadata;
  if (metadata && Object.keys(metadata).length === 0) {
    hasMetadata = false;
  }
  let nameHaystackDictionaryData = {};
  let metaHaystackDictionaryData = {};
  let metricsData;
  metricsData = initialMetrics == null ? void 0 : initialMetrics.map((m) => {
    const metricData = buildMetricData(m, datasource);
    const metaDataString = `${m}\xA6${metricData.description}`;
    nameHaystackDictionaryData[m] = metricData;
    metaHaystackDictionaryData[metaDataString] = metricData;
    return metricData;
  });
  return {
    isLoading: false,
    hasMetadata,
    metrics: metricsData != null ? metricsData : [],
    metaHaystackDictionary: metaHaystackDictionaryData,
    nameHaystackDictionary: nameHaystackDictionaryData,
    totalMetricCount: (_a = metricsData == null ? void 0 : metricsData.length) != null ? _a : 0,
    filteredMetricCount: (_b = metricsData == null ? void 0 : metricsData.length) != null ? _b : 0
  };
}
function buildMetricData(metric, datasource) {
  let type = getMetadataType(metric, datasource.languageProvider.metricsMetadata);
  const description = getMetadataHelp(metric, datasource.languageProvider.metricsMetadata);
  ["histogram", "summary"].forEach((t) => {
    if ((description == null ? void 0 : description.toLowerCase().includes(t)) && type !== t) {
      type += ` (${t})`;
    }
  });
  const oldHistogramMatch = metric.match(/^\w+_bucket$|^\w+_bucket{.*}$/);
  if (type === "histogram" && !oldHistogramMatch) {
    type = "native histogram";
  }
  const metricData = {
    value: metric,
    type,
    description
  };
  return metricData;
}
function displayedMetrics(state, dispatch) {
  const filteredSorted = filterMetrics(state);
  if (!state.isLoading && state.filteredMetricCount !== filteredSorted.length) {
    dispatch(setFilteredMetricCount(filteredSorted.length));
  }
  return sliceMetrics(filteredSorted, state.pageNum, state.resultsPerPage);
}
function filterMetrics(state) {
  let filteredMetrics = state.metrics;
  if (state.fuzzySearchQuery && !state.useBackend) {
    if (state.fullMetaSearch) {
      filteredMetrics = state.metaHaystackOrder.map((needle) => state.metaHaystackDictionary[needle]);
    } else {
      filteredMetrics = state.nameHaystackOrder.map((needle) => state.nameHaystackDictionary[needle]);
    }
  }
  if (state.selectedTypes.length > 0) {
    filteredMetrics = filteredMetrics.filter((m, idx) => {
      const matchesSelectedType = state.selectedTypes.some((t) => {
        if (m.type && t.value) {
          return m.type.includes(t.value);
        }
        if (!m.type && t.value === "no type") {
          return true;
        }
        return false;
      });
      return matchesSelectedType;
    });
  }
  if (!state.includeNullMetadata) {
    filteredMetrics = filteredMetrics.filter((m) => {
      return m.type !== void 0 && m.description !== void 0;
    });
  }
  return filteredMetrics;
}
function calculatePageList(state) {
  if (!state.metrics.length) {
    return [];
  }
  const calcResultsPerPage = state.resultsPerPage === 0 ? 1 : state.resultsPerPage;
  const pages = Math.floor(filterMetrics(state).length / calcResultsPerPage) + 1;
  return [...Array(pages).keys()].map((i) => i + 1);
}
function sliceMetrics(metrics, pageNum, resultsPerPage) {
  const calcResultsPerPage = resultsPerPage === 0 ? 1 : resultsPerPage;
  const start = pageNum === 1 ? 0 : (pageNum - 1) * calcResultsPerPage;
  const end = start + calcResultsPerPage;
  return metrics.slice(start, end);
}
const calculateResultsPerPage = (results, defaultResults, max) => {
  if (results < 1) {
    return 1;
  }
  if (results > max) {
    return max;
  }
  return results != null ? results : defaultResults;
};
async function getBackendSearchMetrics(metricText, labels, datasource) {
  const queryString = regexifyLabelValuesQueryString(metricText);
  const labelsParams = labels.map((label) => {
    return `,${label.label}="${label.value}"`;
  });
  const params = `label_values({__name__=~".*${queryString}"${labels ? labelsParams.join() : ""}},__name__)`;
  const results = datasource.metricFindQuery(params);
  return await results.then((results2) => {
    return results2.map((result) => buildMetricData(result.text, datasource));
  });
}
function tracking(event, state, metric, query) {
  switch (event) {
    case "grafana_prom_metric_encycopedia_tracking":
      runtime.reportInteraction(event, {
        metric,
        hasMetadata: state == null ? void 0 : state.hasMetadata,
        totalMetricCount: state == null ? void 0 : state.totalMetricCount,
        fuzzySearchQuery: state == null ? void 0 : state.fuzzySearchQuery,
        fullMetaSearch: state == null ? void 0 : state.fullMetaSearch,
        selectedTypes: state == null ? void 0 : state.selectedTypes,
        useRegexSearch: state == null ? void 0 : state.useBackend,
        includeResultsWithoutMetadata: state == null ? void 0 : state.includeNullMetadata
      });
    case "grafana_prom_metric_encycopedia_disable_text_wrap_interaction":
      runtime.reportInteraction(event, {
        disableTextWrap: state == null ? void 0 : state.disableTextWrap
      });
    case "grafana_prometheus_metric_encyclopedia_open":
      runtime.reportInteraction(event, {
        query
      });
  }
}
const promTypes = [
  {
    value: "counter",
    description: "A cumulative metric that represents a single monotonically increasing counter whose value can only increase or be reset to zero on restart."
  },
  {
    value: "gauge",
    description: "A metric that represents a single numerical value that can arbitrarily go up and down."
  },
  {
    value: "histogram",
    description: "A histogram samples observations (usually things like request durations or response sizes) and counts them in configurable buckets."
  },
  {
    value: "native histogram",
    description: "Native histograms are different from classic Prometheus histograms in a number of ways: Native histogram bucket boundaries are calculated by a formula that depends on the scale (resolution) of the native histogram, and are not user defined."
  },
  {
    value: "summary",
    description: "A summary samples observations (usually things like request durations and response sizes) and can calculate configurable quantiles over a sliding time window."
  },
  {
    value: "unknown",
    description: "These metrics have been given the type unknown in the metadata."
  },
  {
    value: "no type",
    description: "These metrics have no defined type in the metadata."
  }
];
const placeholders = {
  browse: "Search metrics by name",
  metadataSearchSwitch: "Include description in search",
  type: "Filter by type",
  includeNullMetadata: "Include results with no metadata",
  setUseBackend: "Enable regex search"
};

function AdditionalSettings(props) {
  const { state, onChangeFullMetaSearch, onChangeIncludeNullMetadata, onChangeDisableTextWrap, onChangeUseBackend } = props;
  const theme = ui.useTheme2();
  const styles = getStyles$b(theme);
  return /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.selectItem }, /* @__PURE__ */ React__default["default"].createElement(
    ui.Switch,
    {
      "data-testid": metricsModaltestIds.searchWithMetadata,
      value: state.fullMetaSearch,
      disabled: state.useBackend || !state.hasMetadata,
      onChange: () => onChangeFullMetaSearch()
    }
  ), /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.selectItemLabel }, placeholders.metadataSearchSwitch)), /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.selectItem }, /* @__PURE__ */ React__default["default"].createElement(
    ui.Switch,
    {
      value: state.includeNullMetadata,
      disabled: !state.hasMetadata,
      onChange: () => onChangeIncludeNullMetadata()
    }
  ), /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.selectItemLabel }, placeholders.includeNullMetadata)), /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.selectItem }, /* @__PURE__ */ React__default["default"].createElement(ui.Switch, { value: state.disableTextWrap, onChange: () => onChangeDisableTextWrap() }), /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.selectItemLabel }, "Disable text wrap")), /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.selectItem }, /* @__PURE__ */ React__default["default"].createElement(
    ui.Switch,
    {
      "data-testid": metricsModaltestIds.setUseBackend,
      value: state.useBackend,
      onChange: () => onChangeUseBackend()
    }
  ), /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.selectItemLabel }, placeholders.setUseBackend, "\xA0"), /* @__PURE__ */ React__default["default"].createElement(
    ui.Tooltip,
    {
      content: "Filter metric names by regex search, using an additional call on the Prometheus API.",
      placement: "bottom-end"
    },
    /* @__PURE__ */ React__default["default"].createElement(ui.Icon, { name: "info-circle", size: "xs", className: styles.settingsIcon })
  )));
}
function getStyles$b(theme) {
  return {
    settingsIcon: css.css({
      color: theme.colors.text.secondary
    }),
    selectItem: css.css({
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      padding: "4px 0"
    }),
    selectItemLabel: css.css({
      margin: `0 0 0 ${theme.spacing(1)}`,
      alignSelf: "center",
      color: theme.colors.text.secondary,
      fontSize: "12px"
    })
  };
}

function FeedbackLink({ feedbackUrl }) {
  const styles = ui.useStyles2(getStyles$a);
  return /* @__PURE__ */ React__default["default"].createElement(ui.Stack, null, /* @__PURE__ */ React__default["default"].createElement(
    "a",
    {
      href: feedbackUrl,
      className: styles.link,
      title: "The metrics explorer is new, please let us know how we can improve it",
      target: "_blank",
      rel: "noreferrer noopener"
    },
    /* @__PURE__ */ React__default["default"].createElement(ui.Icon, { name: "comment-alt-message" }),
    " Give feedback"
  ));
}
function getStyles$a(theme) {
  return {
    link: css.css({
      color: theme.colors.text.secondary,
      fontSize: theme.typography.bodySmall.fontSize,
      ":hover": {
        color: theme.colors.text.link
      },
      margin: `-25px 0 30px 0`
    })
  };
}

var __defProp$z = Object.defineProperty;
var __defProps$t = Object.defineProperties;
var __getOwnPropDescs$t = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$z = Object.getOwnPropertySymbols;
var __hasOwnProp$z = Object.prototype.hasOwnProperty;
var __propIsEnum$z = Object.prototype.propertyIsEnumerable;
var __defNormalProp$z = (obj, key, value) => key in obj ? __defProp$z(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$y = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$z.call(b, prop))
      __defNormalProp$z(a, prop, b[prop]);
  if (__getOwnPropSymbols$z)
    for (var prop of __getOwnPropSymbols$z(b)) {
      if (__propIsEnum$z.call(b, prop))
        __defNormalProp$z(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$t = (a, b) => __defProps$t(a, __getOwnPropDescs$t(b));
function AlertingSettingsOverhaul({
  options,
  onOptionsChange
}) {
  const theme = ui.useTheme2();
  const styles = overhaulStyles(theme);
  return /* @__PURE__ */ React__default["default"].createElement(experimental.ConfigSubSection, { title: "Alerting", className: css.cx(styles.container, styles.alertingTop) }, /* @__PURE__ */ React__default["default"].createElement("div", { className: "gf-form-group" }, /* @__PURE__ */ React__default["default"].createElement("div", { className: "gf-form-inline" }, /* @__PURE__ */ React__default["default"].createElement("div", { className: "gf-form" }, /* @__PURE__ */ React__default["default"].createElement(
    ui.InlineField,
    {
      labelWidth: 30,
      label: "Manage alerts via Alerting UI",
      disabled: options.readOnly,
      tooltip: /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, "Manage alert rules for this data source. To manage other alerting resources, add an Alertmanager data source. ", docsTip()),
      interactive: true,
      className: styles.switchField
    },
    /* @__PURE__ */ React__default["default"].createElement(
      ui.Switch,
      {
        value: options.jsonData.manageAlerts !== false,
        onChange: (event) => onOptionsChange(__spreadProps$t(__spreadValues$y({}, options), {
          jsonData: __spreadProps$t(__spreadValues$y({}, options.jsonData), { manageAlerts: event.currentTarget.checked })
        })),
        id: selectors.components.DataSource.Prometheus.configPage.manageAlerts
      }
    )
  )))));
}

var __defProp$y = Object.defineProperty;
var __defProps$s = Object.defineProperties;
var __getOwnPropDescs$s = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$y = Object.getOwnPropertySymbols;
var __hasOwnProp$y = Object.prototype.hasOwnProperty;
var __propIsEnum$y = Object.prototype.propertyIsEnumerable;
var __defNormalProp$y = (obj, key, value) => key in obj ? __defProp$y(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$x = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$y.call(b, prop))
      __defNormalProp$y(a, prop, b[prop]);
  if (__getOwnPropSymbols$y)
    for (var prop of __getOwnPropSymbols$y(b)) {
      if (__propIsEnum$y.call(b, prop))
        __defNormalProp$y(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$s = (a, b) => __defProps$s(a, __getOwnPropDescs$s(b));
const DataSourceHttpSettingsOverhaul = (props) => {
  const { options, onOptionsChange, secureSocksDSProxyEnabled } = props;
  const newAuthProps = experimental.convertLegacyAuthProps({
    config: options,
    onChange: onOptionsChange
  });
  const theme = ui.useTheme2();
  const styles = overhaulStyles(theme);
  function returnSelectedMethod() {
    return newAuthProps.selectedMethod;
  }
  let urlTooltip;
  switch (options.access) {
    case "direct":
      urlTooltip = /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, "Your access method is ", /* @__PURE__ */ React__default["default"].createElement("em", null, "Browser"), ", this means the URL needs to be accessible from the browser.", docsTip());
      break;
    case "proxy":
      urlTooltip = /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, "Your access method is ", /* @__PURE__ */ React__default["default"].createElement("em", null, "Server"), ", this means the URL needs to be accessible from the grafana backend/server.", docsTip());
      break;
    default:
      urlTooltip = /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, "Specify a complete HTTP URL (for example http://your_server:8080) ", docsTip());
  }
  return /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, /* @__PURE__ */ React__default["default"].createElement(
    experimental.ConnectionSettings,
    {
      urlPlaceholder: "http://localhost:9090",
      config: options,
      onChange: onOptionsChange,
      urlLabel: "Prometheus server URL",
      urlTooltip
    }
  ), /* @__PURE__ */ React__default["default"].createElement("hr", { className: `${styles.hrTopSpace} ${styles.hrBottomSpace}` }), /* @__PURE__ */ React__default["default"].createElement(
    experimental.Auth,
    __spreadProps$s(__spreadValues$x({}, newAuthProps), {
      onAuthMethodSelect: (method) => {
        onOptionsChange(__spreadProps$s(__spreadValues$x({}, options), {
          basicAuth: method === experimental.AuthMethod.BasicAuth,
          withCredentials: method === experimental.AuthMethod.CrossSiteCredentials,
          jsonData: __spreadProps$s(__spreadValues$x({}, options.jsonData), {
            oauthPassThru: method === experimental.AuthMethod.OAuthForward
          })
        }));
      },
      selectedMethod: returnSelectedMethod()
    })
  ), /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.sectionBottomPadding }), secureSocksDSProxyEnabled && /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, /* @__PURE__ */ React__default["default"].createElement(ui.SecureSocksProxySettings, { options, onOptionsChange }), /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.sectionBottomPadding })));
};

function amendTable(prevTable, nextTable) {
  let [prevTimes] = prevTable;
  let [nextTimes] = nextTable;
  let pLen = prevTimes.length;
  let pStart = prevTimes[0];
  let pEnd = prevTimes[pLen - 1];
  let nLen = nextTimes.length;
  let nStart = nextTimes[0];
  let nEnd = nextTimes[nLen - 1];
  let outTable;
  if (pLen) {
    if (nLen) {
      if (nStart > pEnd) {
        outTable = prevTable.map((_, i) => prevTable[i].concat(nextTable[i]));
      } else if (nEnd < pStart) {
        outTable = nextTable.map((_, i) => nextTable[i].concat(prevTable[i]));
      } else if (nStart <= pStart && nEnd >= pEnd) {
        outTable = nextTable;
      } else if (nStart > pStart && nEnd < pEnd) ; else if (nStart >= pStart) {
        let idx = data.closestIdx(nStart, prevTimes);
        idx = prevTimes[idx] < nStart ? idx - 1 : idx;
        outTable = prevTable.map((_, i) => prevTable[i].slice(0, idx).concat(nextTable[i]));
      } else if (nEnd >= pStart) {
        let idx = data.closestIdx(nEnd, prevTimes);
        idx = prevTimes[idx] < nEnd ? idx : idx + 1;
        outTable = nextTable.map((_, i) => nextTable[i].concat(prevTable[i].slice(idx)));
      }
    } else {
      outTable = prevTable;
    }
  } else {
    if (nLen) {
      outTable = nextTable;
    } else {
      outTable = [[]];
    }
  }
  return outTable;
}
function trimTable(table, fromTime, toTime) {
  let [times, ...vals] = table;
  let fromIdx;
  let toIdx;
  if (times[0] < fromTime) {
    fromIdx = data.closestIdx(fromTime, times);
    if (times[fromIdx] < fromTime) {
      fromIdx++;
    }
  }
  if (times[times.length - 1] > toTime) {
    toIdx = data.closestIdx(toTime, times);
    if (times[toIdx] > toTime) {
      toIdx--;
    }
  }
  if (fromIdx != null || toIdx != null) {
    times = times.slice(fromIdx != null ? fromIdx : 0, toIdx);
    vals = vals.map((vals2) => vals2.slice(fromIdx != null ? fromIdx : 0, toIdx));
  }
  return [times, ...vals];
}

var __defProp$x = Object.defineProperty;
var __defProps$r = Object.defineProperties;
var __getOwnPropDescs$r = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$x = Object.getOwnPropertySymbols;
var __hasOwnProp$x = Object.prototype.hasOwnProperty;
var __propIsEnum$x = Object.prototype.propertyIsEnumerable;
var __defNormalProp$x = (obj, key, value) => key in obj ? __defProp$x(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$w = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$x.call(b, prop))
      __defNormalProp$x(a, prop, b[prop]);
  if (__getOwnPropSymbols$x)
    for (var prop of __getOwnPropSymbols$x(b)) {
      if (__propIsEnum$x.call(b, prop))
        __defNormalProp$x(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$r = (a, b) => __defProps$r(a, __getOwnPropDescs$r(b));
var __publicField$7 = (obj, key, value) => {
  __defNormalProp$x(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const defaultPrometheusQueryOverlapWindow = "10m";
const getFieldIdent = (field) => {
  var _a;
  return `${field.type}|${field.name}|${JSON.stringify((_a = field.labels) != null ? _a : "")}`;
};
class QueryCache {
  constructor(options) {
    __publicField$7(this, "overlapWindowMs");
    __publicField$7(this, "getTargetSignature");
    __publicField$7(this, "getProfileData");
    __publicField$7(this, "perfObeserver");
    __publicField$7(this, "shouldProfile");
    // send profile events every 10 minutes
    __publicField$7(this, "sendEventsInterval", 6e4 * 10);
    __publicField$7(this, "pendingRequestIdsToTargSigs", /* @__PURE__ */ new Map());
    __publicField$7(this, "pendingAccumulatedEvents", /* @__PURE__ */ new Map());
    __publicField$7(this, "cache", /* @__PURE__ */ new Map());
    __publicField$7(this, "sendPendingTrackingEvents", () => {
      const entries = this.pendingAccumulatedEvents.entries();
      for (let [key, value] of entries) {
        if (!value.sent) {
          const event = {
            datasource: value.datasource.toString(),
            requestCount: value.requestCount.toString(),
            savedBytesTotal: value.savedBytesTotal.toString(),
            initialRequestSize: value.initialRequestSize.toString(),
            lastRequestSize: value.lastRequestSize.toString(),
            panelId: value.panelId.toString(),
            dashId: value.dashId.toString(),
            expr: value.expr.toString(),
            refreshIntervalMs: value.refreshIntervalMs.toString(),
            from: value.from.toString(),
            queryRangeSeconds: value.queryRangeSeconds.toString()
          };
          if (runtime.config.featureToggles.prometheusIncrementalQueryInstrumentation) {
            runtime.reportInteraction("grafana_incremental_queries_profile", event);
          } else if (faroWebSdk.faro.api.pushEvent) {
            faroWebSdk.faro.api.pushEvent("incremental query response size", event, "no-interaction", {
              skipDedupe: true
            });
          }
          this.pendingAccumulatedEvents.set(key, __spreadProps$r(__spreadValues$w({}, value), {
            sent: true,
            requestCount: 0,
            savedBytesTotal: 0,
            initialRequestSize: 0,
            lastRequestSize: 0
          }));
        }
      }
    });
    var _a;
    const unverifiedOverlap = options.overlapString;
    if (data.isValidDuration(unverifiedOverlap)) {
      const duration = data.parseDuration(unverifiedOverlap);
      this.overlapWindowMs = data.durationToMilliseconds(duration);
    } else {
      const duration = data.parseDuration(defaultPrometheusQueryOverlapWindow);
      this.overlapWindowMs = data.durationToMilliseconds(duration);
    }
    if ((runtime.config.grafanaJavascriptAgent.enabled || ((_a = runtime.config.featureToggles) == null ? void 0 : _a.prometheusIncrementalQueryInstrumentation)) && options.profileFunction !== void 0) {
      this.profile();
      this.shouldProfile = true;
    } else {
      this.shouldProfile = false;
    }
    this.getProfileData = options.profileFunction;
    this.getTargetSignature = options.getTargetSignature;
  }
  profile() {
    if (typeof PerformanceObserver === "function") {
      this.perfObeserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
          const entryTypeCast = entry;
          const isSupported = typeof (entryTypeCast == null ? void 0 : entryTypeCast.transferSize) === "number";
          if ((entryTypeCast == null ? void 0 : entryTypeCast.initiatorType) === "fetch" && isSupported) {
            let fetchUrl = entryTypeCast.name;
            if (fetchUrl.includes("/api/ds/query")) {
              let match = fetchUrl.match(/requestId=([a-z\d]+)/i);
              if (match) {
                let requestId = match[1];
                const requestTransferSize = Math.round(entryTypeCast.transferSize);
                const currentRequest = this.pendingRequestIdsToTargSigs.get(requestId);
                if (currentRequest) {
                  const entries = this.pendingRequestIdsToTargSigs.entries();
                  for (let [, value] of entries) {
                    if (value.identity === currentRequest.identity && value.bytes !== null) {
                      const previous = this.pendingAccumulatedEvents.get(value.identity);
                      const savedBytes = value.bytes - requestTransferSize;
                      this.pendingAccumulatedEvents.set(value.identity, {
                        datasource: (_a = value.datasource) != null ? _a : "N/A",
                        requestCount: ((_b = previous == null ? void 0 : previous.requestCount) != null ? _b : 0) + 1,
                        savedBytesTotal: ((_c = previous == null ? void 0 : previous.savedBytesTotal) != null ? _c : 0) + savedBytes,
                        initialRequestSize: value.bytes,
                        lastRequestSize: requestTransferSize,
                        panelId: (_e = (_d = currentRequest.panelId) == null ? void 0 : _d.toString()) != null ? _e : "",
                        dashId: (_f = currentRequest.dashboardUID) != null ? _f : "",
                        expr: (_g = currentRequest.expr) != null ? _g : "",
                        refreshIntervalMs: (_h = currentRequest.refreshIntervalMs) != null ? _h : 0,
                        sent: false,
                        from: (_i = currentRequest.from) != null ? _i : "",
                        queryRangeSeconds: (_j = currentRequest.queryRangeSeconds) != null ? _j : 0
                      });
                      this.pendingRequestIdsToTargSigs.delete(requestId);
                      return;
                    }
                  }
                  this.pendingRequestIdsToTargSigs.set(requestId, __spreadProps$r(__spreadValues$w({}, currentRequest), { bytes: requestTransferSize }));
                }
              }
            }
          }
        });
      });
      this.perfObeserver.observe({ type: "resource", buffered: false });
      setInterval(this.sendPendingTrackingEvents, this.sendEventsInterval);
      window.addEventListener("beforeunload", this.sendPendingTrackingEvents);
    }
  }
  // can be used to change full range request to partial, split into multiple requests
  requestInfo(request) {
    var _a, _b, _c;
    const newFrom = request.range.from.valueOf();
    const newTo = request.range.to.valueOf();
    const shouldCache = ((_b = (_a = request.rangeRaw) == null ? void 0 : _a.to) == null ? void 0 : _b.toString()) === "now";
    let doPartialQuery = shouldCache;
    let prevTo = void 0;
    const refreshIntervalMs = request.intervalMs;
    const reqTargSigs = /* @__PURE__ */ new Map();
    request.targets.forEach((targ) => {
      var _a2, _b2, _c2, _d;
      let targIdent = `${request.dashboardUID}|${request.panelId}|${targ.refId}`;
      let targSig = this.getTargetSignature(request, targ);
      if (this.shouldProfile && this.getProfileData) {
        this.pendingRequestIdsToTargSigs.set(request.requestId, __spreadProps$r(__spreadValues$w({}, this.getProfileData(request, targ)), {
          identity: targIdent + "|" + targSig,
          bytes: null,
          panelId: request.panelId,
          dashboardUID: (_a2 = request.dashboardUID) != null ? _a2 : "",
          from: (_c2 = (_b2 = request.rangeRaw) == null ? void 0 : _b2.from.toString()) != null ? _c2 : "",
          queryRangeSeconds: (_d = request.range.to.diff(request.range.from, "seconds")) != null ? _d : "",
          refreshIntervalMs: refreshIntervalMs != null ? refreshIntervalMs : 0
        }));
      }
      reqTargSigs.set(targIdent, targSig);
    });
    for (const [targIdent, targSig] of reqTargSigs) {
      let cached = this.cache.get(targIdent);
      let cachedSig = cached == null ? void 0 : cached.sig;
      if (cachedSig !== targSig) {
        doPartialQuery = false;
      } else {
        prevTo = (_c = cached == null ? void 0 : cached.prevTo) != null ? _c : Infinity;
        doPartialQuery = newTo > prevTo && newFrom <= prevTo;
      }
      if (!doPartialQuery) {
        break;
      }
    }
    if (doPartialQuery && prevTo) {
      let newFromPartial = Math.max(prevTo - this.overlapWindowMs, newFrom);
      const newToDate = data.dateTime(newTo);
      const newFromPartialDate = data.dateTime(data.incrRoundDn(newFromPartial, request.intervalMs));
      request = __spreadProps$r(__spreadValues$w({}, request), {
        range: __spreadProps$r(__spreadValues$w({}, request.range), {
          from: newFromPartialDate,
          to: newToDate
        })
      });
    } else {
      reqTargSigs.forEach((targSig, targIdent) => {
        this.cache.delete(targIdent);
      });
    }
    return {
      requests: [request],
      targSigs: reqTargSigs,
      shouldCache
    };
  }
  // should amend existing cache with new frames and return full response
  procFrames(request, requestInfo, respFrames) {
    if (requestInfo == null ? void 0 : requestInfo.shouldCache) {
      const newFrom = request.range.from.valueOf();
      const newTo = request.range.to.valueOf();
      const respByTarget = /* @__PURE__ */ new Map();
      respFrames.forEach((frame) => {
        let targIdent = `${request.dashboardUID}|${request.panelId}|${frame.refId}`;
        let frames = respByTarget.get(targIdent);
        if (!frames) {
          frames = [];
          respByTarget.set(targIdent, frames);
        }
        frames.push(frame);
      });
      let outFrames = [];
      respByTarget.forEach((respFrames2, targIdent) => {
        var _a, _b;
        let cachedFrames = (_b = targIdent ? (_a = this.cache.get(targIdent)) == null ? void 0 : _a.frames : null) != null ? _b : [];
        respFrames2.forEach((respFrame) => {
          if (respFrame.length === 0 || respFrame.fields.length === 0) {
            return;
          }
          let respFrameIdent = getFieldIdent(respFrame.fields[1]);
          let cachedFrame = cachedFrames.find((cached) => getFieldIdent(cached.fields[1]) === respFrameIdent);
          if (!cachedFrame) {
            cachedFrames.push(respFrame);
          } else {
            let prevTable = cachedFrame.fields.map((field) => field.values);
            let nextTable = respFrame.fields.map((field) => field.values);
            let amendedTable = amendTable(prevTable, nextTable);
            if (amendedTable) {
              for (let i = 0; i < amendedTable.length; i++) {
                cachedFrame.fields[i].values = amendedTable[i];
              }
              cachedFrame.length = cachedFrame.fields[0].values.length;
            }
          }
        });
        let nonEmptyCachedFrames = [];
        cachedFrames.forEach((frame) => {
          let table = frame.fields.map((field) => field.values);
          let trimmed = trimTable(table, newFrom, newTo);
          if (trimmed[0].length > 0) {
            for (let i = 0; i < trimmed.length; i++) {
              frame.fields[i].values = trimmed[i];
            }
            nonEmptyCachedFrames.push(frame);
          }
        });
        this.cache.set(targIdent, {
          sig: requestInfo.targSigs.get(targIdent),
          frames: nonEmptyCachedFrames,
          prevTo: newTo
        });
        outFrames.push(...nonEmptyCachedFrames);
      });
      respFrames = outFrames.map((frame) => __spreadProps$r(__spreadValues$w({}, frame), {
        fields: frame.fields.map((field) => __spreadProps$r(__spreadValues$w({}, field), {
          config: __spreadValues$w({}, field.config),
          values: field.values.slice()
        }))
      }));
    }
    return respFrames;
  }
}

var __defProp$w = Object.defineProperty;
var __defProps$q = Object.defineProperties;
var __getOwnPropDescs$q = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$w = Object.getOwnPropertySymbols;
var __hasOwnProp$w = Object.prototype.hasOwnProperty;
var __propIsEnum$w = Object.prototype.propertyIsEnumerable;
var __defNormalProp$w = (obj, key, value) => key in obj ? __defProp$w(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$v = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$w.call(b, prop))
      __defNormalProp$w(a, prop, b[prop]);
  if (__getOwnPropSymbols$w)
    for (var prop of __getOwnPropSymbols$w(b)) {
      if (__propIsEnum$w.call(b, prop))
        __defNormalProp$w(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$q = (a, b) => __defProps$q(a, __getOwnPropDescs$q(b));
function ExemplarSetting({ value, onChange, onDelete, disabled }) {
  const [isInternalLink, setIsInternalLink] = React.useState(Boolean(value.datasourceUid));
  const theme = ui.useTheme2();
  const styles = overhaulStyles(theme);
  return /* @__PURE__ */ React__default["default"].createElement("div", { className: "gf-form-group" }, /* @__PURE__ */ React__default["default"].createElement(
    ui.InlineField,
    {
      label: "Internal link",
      labelWidth: PROM_CONFIG_LABEL_WIDTH,
      disabled,
      tooltip: /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, "Enable this option if you have an internal link. When enabled, this reveals the data source selector. Select the backend tracing data store for your exemplar data. ", docsTip()),
      interactive: true,
      className: styles.switchField
    },
    /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, /* @__PURE__ */ React__default["default"].createElement(
      ui.Switch,
      {
        value: isInternalLink,
        "data-testid": selectors.components.DataSource.Prometheus.configPage.internalLinkSwitch,
        onChange: (ev) => setIsInternalLink(ev.currentTarget.checked)
      }
    ))
  ), isInternalLink ? /* @__PURE__ */ React__default["default"].createElement(
    ui.InlineField,
    {
      label: "Data source",
      labelWidth: PROM_CONFIG_LABEL_WIDTH,
      tooltip: /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, "The data source the exemplar is going to navigate to. ", docsTip()),
      disabled,
      interactive: true
    },
    /* @__PURE__ */ React__default["default"].createElement(
      runtime.DataSourcePicker,
      {
        filter: runtime.config.featureToggles.azureMonitorPrometheusExemplars ? void 0 : (ds) => ds.type !== "grafana-azure-monitor-datasource",
        tracing: true,
        current: value.datasourceUid,
        noDefault: true,
        width: 40,
        onChange: (ds) => onChange(__spreadProps$q(__spreadValues$v({}, value), {
          datasourceUid: ds.uid,
          url: void 0
        }))
      }
    )
  ) : /* @__PURE__ */ React__default["default"].createElement(
    ui.InlineField,
    {
      label: "URL",
      labelWidth: PROM_CONFIG_LABEL_WIDTH,
      tooltip: /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, "The URL of the trace backend the user would go to see its trace. ", docsTip()),
      disabled,
      interactive: true
    },
    /* @__PURE__ */ React__default["default"].createElement(
      ui.Input,
      {
        placeholder: "https://example.com/${__value.raw}",
        spellCheck: false,
        width: 40,
        value: value.url,
        onChange: (event) => onChange(__spreadProps$q(__spreadValues$v({}, value), {
          datasourceUid: void 0,
          url: event.currentTarget.value
        }))
      }
    )
  ), /* @__PURE__ */ React__default["default"].createElement(
    ui.InlineField,
    {
      label: "URL Label",
      labelWidth: PROM_CONFIG_LABEL_WIDTH,
      tooltip: /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, "Use to override the button label on the exemplar traceID field. ", docsTip()),
      disabled,
      interactive: true
    },
    /* @__PURE__ */ React__default["default"].createElement(
      ui.Input,
      {
        placeholder: "Go to example.com",
        spellCheck: false,
        width: 40,
        value: value.urlDisplayLabel,
        onChange: (event) => onChange(__spreadProps$q(__spreadValues$v({}, value), {
          urlDisplayLabel: event.currentTarget.value
        }))
      }
    )
  ), /* @__PURE__ */ React__default["default"].createElement(
    ui.InlineField,
    {
      label: "Label name",
      labelWidth: PROM_CONFIG_LABEL_WIDTH,
      tooltip: /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, "The name of the field in the labels object that should be used to get the traceID. ", docsTip()),
      disabled,
      interactive: true
    },
    /* @__PURE__ */ React__default["default"].createElement(
      ui.Input,
      {
        placeholder: "traceID",
        spellCheck: false,
        width: 40,
        value: value.name,
        onChange: (event) => onChange(__spreadProps$q(__spreadValues$v({}, value), {
          name: event.currentTarget.value
        }))
      }
    )
  ), !disabled && /* @__PURE__ */ React__default["default"].createElement(ui.InlineField, { label: "Remove exemplar link", labelWidth: PROM_CONFIG_LABEL_WIDTH, disabled }, /* @__PURE__ */ React__default["default"].createElement(
    ui.Button,
    {
      variant: "destructive",
      title: "Remove exemplar link",
      icon: "times",
      onClick: (event) => {
        event.preventDefault();
        onDelete();
      }
    }
  )));
}

function ExemplarsSettings({ options, onChange, disabled }) {
  const theme = ui.useTheme2();
  const styles = overhaulStyles(theme);
  return /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.sectionBottomPadding }, /* @__PURE__ */ React__default["default"].createElement(experimental.ConfigSubSection, { title: "Exemplars", className: styles.container }, options && options.map((option, index) => {
    return /* @__PURE__ */ React__default["default"].createElement(
      ExemplarSetting,
      {
        key: index,
        value: option,
        onChange: (newField) => {
          const newOptions = [...options];
          newOptions.splice(index, 1, newField);
          onChange(newOptions);
        },
        onDelete: () => {
          const newOptions = [...options];
          newOptions.splice(index, 1);
          onChange(newOptions);
        },
        disabled
      }
    );
  }), !disabled && /* @__PURE__ */ React__default["default"].createElement(
    ui.Button,
    {
      variant: "secondary",
      "data-testid": selectors.components.DataSource.Prometheus.configPage.exemplarsAddButton,
      className: css.css({
        marginBottom: "10px"
      }),
      icon: "plus",
      onClick: (event) => {
        event.preventDefault();
        const newOptions = [...options || [], { name: "traceID" }];
        onChange(newOptions);
      }
    },
    "Add"
  ), disabled && !options && /* @__PURE__ */ React__default["default"].createElement("i", null, "No exemplars configurations")));
}

const PromFlavorVersions = {
  Prometheus: [
    { value: void 0, label: "Please select" },
    { value: "2.0.0", label: "< 2.14.x" },
    { value: "2.14.0", label: "2.14.x" },
    { value: "2.15.0", label: "2.15.x" },
    { value: "2.16.0", label: "2.16.x" },
    { value: "2.17.0", label: "2.17.x" },
    { value: "2.18.0", label: "2.18.x" },
    { value: "2.19.0", label: "2.19.x" },
    { value: "2.20.0", label: "2.20.x" },
    { value: "2.21.0", label: "2.21.x" },
    { value: "2.22.0", label: "2.22.x" },
    { value: "2.23.0", label: "2.23.x" },
    { value: "2.24.0", label: "2.24.x" },
    { value: "2.25.0", label: "2.25.x" },
    { value: "2.26.0", label: "2.26.x" },
    { value: "2.27.0", label: "2.27.x" },
    { value: "2.28.0", label: "2.28.x" },
    { value: "2.29.0", label: "2.29.x" },
    { value: "2.30.0", label: "2.30.x" },
    { value: "2.31.0", label: "2.31.x" },
    { value: "2.32.0", label: "2.32.x" },
    { value: "2.33.0", label: "2.33.x" },
    { value: "2.34.0", label: "2.34.x" },
    { value: "2.35.0", label: "2.35.x" },
    { value: "2.36.0", label: "2.36.x" },
    { value: "2.37.0", label: "2.37.x" },
    { value: "2.38.0", label: "2.38.x" },
    { value: "2.39.0", label: "2.39.x" },
    { value: "2.40.0", label: "2.40.x" },
    { value: "2.41.0", label: "2.41.x" },
    { value: "2.42.0", label: "2.42.x" },
    { value: "2.43.0", label: "2.43.x" },
    { value: "2.44.0", label: "2.44.x" },
    { value: "2.45.0", label: "2.45.x" },
    { value: "2.46.0", label: "2.46.x" },
    { value: "2.47.0", label: "2.47.x" },
    { value: "2.48.0", label: "2.48.x" },
    { value: "2.49.0", label: "2.49.x" },
    { value: "2.50.0", label: "2.50.x" },
    // This value will be returned for future versions of prometheus until we add new entries to this object
    { value: "2.50.1", label: "> 2.50.x" }
  ],
  Mimir: [
    { value: void 0, label: "Please select" },
    { value: "2.0.0", label: "2.0.x" },
    { value: "2.1.0", label: "2.1.x" },
    { value: "2.2.0", label: "2.2.x" },
    { value: "2.3.0", label: "2.3.x" },
    { value: "2.4.0", label: "2.4.x" },
    { value: "2.5.0", label: "2.5.x" },
    { value: "2.6.0", label: "2.6.x" },
    { value: "2.7.0", label: "2.7.x" },
    { value: "2.8.0", label: "2.8.x" },
    { value: "2.9.0", label: "2.9.x" },
    { value: "2.9.1", label: "> 2.9.x" }
  ],
  Thanos: [
    { value: void 0, label: "Please select" },
    { value: "0.0.0", label: "< 0.16.x" },
    { value: "0.16.0", label: "0.16.x" },
    { value: "0.17.0", label: "0.17.x" },
    { value: "0.18.0", label: "0.18.x" },
    { value: "0.19.0", label: "0.19.x" },
    { value: "0.20.0", label: "0.20.x" },
    { value: "0.21.0", label: "0.21.x" },
    { value: "0.22.0", label: "0.22.x" },
    { value: "0.23.0", label: "0.23.x" },
    { value: "0.24.0", label: "0.24.x" },
    { value: "0.25.0", label: "0.25.x" },
    { value: "0.26.0", label: "0.26.x" },
    { value: "0.27.0", label: "0.27.x" },
    { value: "0.28.0", label: "0.28.x" },
    { value: "0.29.0", label: "0.29.x" },
    { value: "0.30.0", label: "0.30.x" },
    { value: "0.31.0", label: "0.31.x" },
    { value: "0.31.1", label: "> 0.31.x" }
  ],
  Cortex: [
    { value: void 0, label: "Please select" },
    { value: "0.0.0", label: "< 1.0.0" },
    { value: "1.0.0", label: "1.0.0" },
    { value: "1.1.0", label: "1.1.x" },
    { value: "1.2.0", label: "1.2.x" },
    { value: "1.3.0", label: "1.3.x" },
    { value: "1.4.0", label: "1.4.x" },
    { value: "1.5.0", label: "1.5.x" },
    { value: "1.6.0", label: "1.6.x" },
    { value: "1.7.0", label: "1.7.x" },
    { value: "1.8.0", label: "1.8.x" },
    { value: "1.9.0", label: "1.9.x" },
    { value: "1.10.0", label: "1.10.x" },
    { value: "1.11.0", label: "1.11.x" },
    { value: "1.13.0", label: "1.13.x" },
    { value: "1.14.0", label: "> 1.13.x" }
  ]
};

var __defProp$v = Object.defineProperty;
var __defProps$p = Object.defineProperties;
var __getOwnPropDescs$p = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$v = Object.getOwnPropertySymbols;
var __hasOwnProp$v = Object.prototype.hasOwnProperty;
var __propIsEnum$v = Object.prototype.propertyIsEnumerable;
var __defNormalProp$v = (obj, key, value) => key in obj ? __defProp$v(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$u = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$v.call(b, prop))
      __defNormalProp$v(a, prop, b[prop]);
  if (__getOwnPropSymbols$v)
    for (var prop of __getOwnPropSymbols$v(b)) {
      if (__propIsEnum$v.call(b, prop))
        __defNormalProp$v(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$p = (a, b) => __defProps$p(a, __getOwnPropDescs$p(b));
const httpOptions = [
  { value: "POST", label: "POST" },
  { value: "GET", label: "GET" }
];
const editorOptions = [
  { value: QueryEditorMode.Builder, label: "Builder" },
  { value: QueryEditorMode.Code, label: "Code" }
];
const cacheValueOptions = [
  { value: PrometheusCacheLevel.Low, label: "Low" },
  { value: PrometheusCacheLevel.Medium, label: "Medium" },
  { value: PrometheusCacheLevel.High, label: "High" },
  { value: PrometheusCacheLevel.None, label: "None" }
];
const prometheusFlavorSelectItems = [
  { value: PromApplication.Prometheus, label: PromApplication.Prometheus },
  { value: PromApplication.Cortex, label: PromApplication.Cortex },
  { value: PromApplication.Mimir, label: PromApplication.Mimir },
  { value: PromApplication.Thanos, label: PromApplication.Thanos }
];
const DURATION_REGEX = /^$|^\d+(ms|[Mwdhmsy])$/;
const MULTIPLE_DURATION_REGEX = /(\d+)(.+)/;
const NON_NEGATIVE_INTEGER_REGEX = /^(0|[1-9]\d*)(\.\d+)?(e\+?\d+)?$/;
const durationError = "Value is not valid, you can use number with time unit specifier: y, M, w, d, h, m, s";
const countError = "Value is not valid, you can use non-negative integers, including scientific notation";
const PromSettings = (props) => {
  var _a, _b, _c, _d, _e, _f, _g;
  const { options, onOptionsChange } = props;
  if (!options.jsonData.httpMethod) {
    options.jsonData.httpMethod = "POST";
  }
  const theme = ui.useTheme2();
  const styles = overhaulStyles(theme);
  const [validDuration, updateValidDuration] = React.useState({
    timeInterval: "",
    queryTimeout: "",
    incrementalQueryOverlapWindow: ""
  });
  const [validCount, updateValidCount] = React.useState({
    codeModeMetricNamesSuggestionLimit: ""
  });
  return /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, /* @__PURE__ */ React__default["default"].createElement(experimental.ConfigSubSection, { title: "Interval behaviour", className: styles.container }, /* @__PURE__ */ React__default["default"].createElement("div", { className: "gf-form-group" }, /* @__PURE__ */ React__default["default"].createElement("div", { className: "gf-form-inline" }, /* @__PURE__ */ React__default["default"].createElement("div", { className: "gf-form" }, /* @__PURE__ */ React__default["default"].createElement(
    ui.InlineField,
    {
      label: "Scrape interval",
      labelWidth: PROM_CONFIG_LABEL_WIDTH,
      tooltip: /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, "This interval is how frequently Prometheus scrapes targets. Set this to the typical scrape and evaluation interval configured in your Prometheus config file. If you set this to a greater value than your Prometheus config file interval, Grafana will evaluate the data according to this interval and you will see less data points. Defaults to 15s. ", docsTip()),
      interactive: true,
      disabled: options.readOnly
    },
    /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, /* @__PURE__ */ React__default["default"].createElement(
      ui.Input,
      {
        className: "width-20",
        value: options.jsonData.timeInterval,
        spellCheck: false,
        placeholder: "15s",
        onChange: onChangeHandler("timeInterval", options, onOptionsChange),
        onBlur: (e) => updateValidDuration(__spreadProps$p(__spreadValues$u({}, validDuration), {
          timeInterval: e.currentTarget.value
        })),
        "data-testid": selectors.components.DataSource.Prometheus.configPage.scrapeInterval
      }
    ), validateInput(validDuration.timeInterval, DURATION_REGEX, durationError))
  ))), /* @__PURE__ */ React__default["default"].createElement("div", { className: "gf-form-inline" }, /* @__PURE__ */ React__default["default"].createElement("div", { className: "gf-form" }, /* @__PURE__ */ React__default["default"].createElement(
    ui.InlineField,
    {
      label: "Query timeout",
      labelWidth: PROM_CONFIG_LABEL_WIDTH,
      tooltip: /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, "Set the Prometheus query timeout. ", docsTip()),
      interactive: true,
      disabled: options.readOnly
    },
    /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, /* @__PURE__ */ React__default["default"].createElement(
      ui.Input,
      {
        className: "width-20",
        value: options.jsonData.queryTimeout,
        onChange: onChangeHandler("queryTimeout", options, onOptionsChange),
        spellCheck: false,
        placeholder: "60s",
        onBlur: (e) => updateValidDuration(__spreadProps$p(__spreadValues$u({}, validDuration), {
          queryTimeout: e.currentTarget.value
        })),
        "data-testid": selectors.components.DataSource.Prometheus.configPage.queryTimeout
      }
    ), validateInput(validDuration.queryTimeout, DURATION_REGEX, durationError))
  ))))), /* @__PURE__ */ React__default["default"].createElement(experimental.ConfigSubSection, { title: "Query editor", className: styles.container }, /* @__PURE__ */ React__default["default"].createElement("div", { className: "gf-form-group" }, /* @__PURE__ */ React__default["default"].createElement("div", { className: "gf-form" }, /* @__PURE__ */ React__default["default"].createElement(
    ui.InlineField,
    {
      label: "Default editor",
      labelWidth: PROM_CONFIG_LABEL_WIDTH,
      tooltip: /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, "Set default editor option for all users of this data source. ", docsTip()),
      interactive: true,
      disabled: options.readOnly
    },
    /* @__PURE__ */ React__default["default"].createElement(
      ui.Select,
      {
        "aria-label": `Default Editor (Code or Builder)`,
        options: editorOptions,
        value: (_a = editorOptions.find((o) => o.value === options.jsonData.defaultEditor)) != null ? _a : editorOptions.find((o) => o.value === QueryEditorMode.Builder),
        onChange: onChangeHandler("defaultEditor", options, onOptionsChange),
        width: 40,
        "data-testid": selectors.components.DataSource.Prometheus.configPage.defaultEditor
      }
    )
  )), /* @__PURE__ */ React__default["default"].createElement("div", { className: "gf-form" }, /* @__PURE__ */ React__default["default"].createElement(
    ui.InlineField,
    {
      labelWidth: PROM_CONFIG_LABEL_WIDTH,
      label: "Disable metrics lookup",
      tooltip: /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, "Checking this option will disable the metrics chooser and metric/label support in the query field's autocomplete. This helps if you have performance issues with bigger Prometheus instances.", " ", docsTip()),
      interactive: true,
      disabled: options.readOnly,
      className: styles.switchField
    },
    /* @__PURE__ */ React__default["default"].createElement(
      ui.Switch,
      {
        value: (_b = options.jsonData.disableMetricsLookup) != null ? _b : false,
        onChange: data.onUpdateDatasourceJsonDataOptionChecked(props, "disableMetricsLookup"),
        id: selectors.components.DataSource.Prometheus.configPage.disableMetricLookup
      }
    )
  )))), /* @__PURE__ */ React__default["default"].createElement(experimental.ConfigSubSection, { title: "Performance", className: styles.container }, !options.jsonData.prometheusType && !options.jsonData.prometheusVersion && options.readOnly && /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.versionMargin }, "For more information on configuring prometheus type and version in data sources, see the", " ", /* @__PURE__ */ React__default["default"].createElement(
    "a",
    {
      className: styles.textUnderline,
      href: "https://grafana.com/docs/grafana/latest/administration/provisioning/"
    },
    "provisioning documentation"
  ), "."), /* @__PURE__ */ React__default["default"].createElement("div", { className: "gf-form-group" }, /* @__PURE__ */ React__default["default"].createElement("div", { className: "gf-form-inline" }, /* @__PURE__ */ React__default["default"].createElement("div", { className: "gf-form" }, /* @__PURE__ */ React__default["default"].createElement(
    ui.InlineField,
    {
      label: "Prometheus type",
      labelWidth: PROM_CONFIG_LABEL_WIDTH,
      tooltip: /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, "Set this to the type of your prometheus database, e.g. Prometheus, Cortex, Mimir or Thanos. Changing this field will save your current settings. Certain types of Prometheus supports or does not support various APIs. For example, some types support regex matching for label queries to improve performance. Some types have an API for metadata. If you set this incorrectly you may experience odd behavior when querying metrics and labels. Please check your Prometheus documentation to ensure you enter the correct type. ", docsTip()),
      interactive: true,
      disabled: options.readOnly
    },
    /* @__PURE__ */ React__default["default"].createElement(
      ui.Select,
      {
        "aria-label": "Prometheus type",
        options: prometheusFlavorSelectItems,
        value: prometheusFlavorSelectItems.find((o) => o.value === options.jsonData.prometheusType),
        onChange: onChangeHandler("prometheusType", options, onOptionsChange),
        width: 40,
        "data-testid": selectors.components.DataSource.Prometheus.configPage.prometheusType
      }
    )
  ))), /* @__PURE__ */ React__default["default"].createElement("div", { className: "gf-form-inline" }, options.jsonData.prometheusType && /* @__PURE__ */ React__default["default"].createElement("div", { className: "gf-form" }, /* @__PURE__ */ React__default["default"].createElement(
    ui.InlineField,
    {
      label: `${options.jsonData.prometheusType} version`,
      labelWidth: PROM_CONFIG_LABEL_WIDTH,
      tooltip: /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, "Use this to set the version of your ", options.jsonData.prometheusType, " instance if it is not automatically configured. ", docsTip()),
      interactive: true,
      disabled: options.readOnly
    },
    /* @__PURE__ */ React__default["default"].createElement(
      ui.Select,
      {
        "aria-label": `${options.jsonData.prometheusType} type`,
        options: PromFlavorVersions[options.jsonData.prometheusType],
        value: (_c = PromFlavorVersions[options.jsonData.prometheusType]) == null ? void 0 : _c.find(
          (o) => o.value === options.jsonData.prometheusVersion
        ),
        onChange: onChangeHandler("prometheusVersion", options, onOptionsChange),
        width: 40,
        "data-testid": selectors.components.DataSource.Prometheus.configPage.prometheusVersion
      }
    )
  ))), /* @__PURE__ */ React__default["default"].createElement("div", { className: "gf-form-inline" }, /* @__PURE__ */ React__default["default"].createElement("div", { className: "gf-form max-width-30" }, /* @__PURE__ */ React__default["default"].createElement(
    ui.InlineField,
    {
      label: "Cache level",
      labelWidth: PROM_CONFIG_LABEL_WIDTH,
      tooltip: /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, "Sets the browser caching level for editor queries. Higher cache settings are recommended for high cardinality data sources."),
      interactive: true,
      disabled: options.readOnly
    },
    /* @__PURE__ */ React__default["default"].createElement(
      ui.Select,
      {
        width: 40,
        onChange: onChangeHandler("cacheLevel", options, onOptionsChange),
        options: cacheValueOptions,
        value: (_d = cacheValueOptions.find((o) => o.value === options.jsonData.cacheLevel)) != null ? _d : PrometheusCacheLevel.Low,
        "data-testid": selectors.components.DataSource.Prometheus.configPage.cacheLevel
      }
    )
  ))), runtime.config.featureToggles.prometheusCodeModeMetricNamesSearch && /* @__PURE__ */ React__default["default"].createElement("div", { className: "gf-form-inline" }, /* @__PURE__ */ React__default["default"].createElement("div", { className: "gf-form" }, /* @__PURE__ */ React__default["default"].createElement(
    ui.InlineField,
    {
      label: "Metric names suggestion limit",
      labelWidth: PROM_CONFIG_LABEL_WIDTH,
      tooltip: /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, "The maximum number of metric names that may appear as autocomplete suggestions in the query editor's Code mode."),
      interactive: true,
      disabled: options.readOnly
    },
    /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, /* @__PURE__ */ React__default["default"].createElement(
      ui.Input,
      {
        className: "width-20",
        value: options.jsonData.codeModeMetricNamesSuggestionLimit,
        onChange: onChangeHandler("codeModeMetricNamesSuggestionLimit", options, onOptionsChange),
        spellCheck: false,
        placeholder: SUGGESTIONS_LIMIT.toString(),
        onBlur: (e) => updateValidCount(__spreadProps$p(__spreadValues$u({}, validCount), {
          codeModeMetricNamesSuggestionLimit: e.currentTarget.value
        })),
        "data-testid": selectors.components.DataSource.Prometheus.configPage.codeModeMetricNamesSuggestionLimit
      }
    ), validateInput(
      validCount.codeModeMetricNamesSuggestionLimit,
      NON_NEGATIVE_INTEGER_REGEX,
      countError
    ))
  ))), /* @__PURE__ */ React__default["default"].createElement("div", { className: "gf-form-inline" }, /* @__PURE__ */ React__default["default"].createElement("div", { className: "gf-form max-width-30" }, /* @__PURE__ */ React__default["default"].createElement(
    ui.InlineField,
    {
      label: "Incremental querying (beta)",
      labelWidth: PROM_CONFIG_LABEL_WIDTH,
      tooltip: /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, "This feature will change the default behavior of relative queries to always request fresh data from the prometheus instance, instead query results will be cached, and only new records are requested. Turn this on to decrease database and network load."),
      interactive: true,
      className: styles.switchField,
      disabled: options.readOnly
    },
    /* @__PURE__ */ React__default["default"].createElement(
      ui.Switch,
      {
        value: (_e = options.jsonData.incrementalQuerying) != null ? _e : false,
        onChange: data.onUpdateDatasourceJsonDataOptionChecked(props, "incrementalQuerying"),
        id: selectors.components.DataSource.Prometheus.configPage.incrementalQuerying
      }
    )
  ))), /* @__PURE__ */ React__default["default"].createElement("div", { className: "gf-form-inline" }, options.jsonData.incrementalQuerying && /* @__PURE__ */ React__default["default"].createElement(
    ui.InlineField,
    {
      label: "Query overlap window",
      labelWidth: PROM_CONFIG_LABEL_WIDTH,
      tooltip: /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, "Set a duration like 10m or 120s or 0s. Default of 10 minutes. This duration will be added to the duration of each incremental request."),
      interactive: true,
      disabled: options.readOnly
    },
    /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, /* @__PURE__ */ React__default["default"].createElement(
      ui.Input,
      {
        onBlur: (e) => updateValidDuration(__spreadProps$p(__spreadValues$u({}, validDuration), {
          incrementalQueryOverlapWindow: e.currentTarget.value
        })),
        className: "width-20",
        value: (_f = options.jsonData.incrementalQueryOverlapWindow) != null ? _f : defaultPrometheusQueryOverlapWindow,
        onChange: onChangeHandler("incrementalQueryOverlapWindow", options, onOptionsChange),
        spellCheck: false,
        "data-testid": selectors.components.DataSource.Prometheus.configPage.queryOverlapWindow
      }
    ), validateInput(validDuration.incrementalQueryOverlapWindow, MULTIPLE_DURATION_REGEX, durationError))
  )), /* @__PURE__ */ React__default["default"].createElement("div", { className: "gf-form-inline" }, /* @__PURE__ */ React__default["default"].createElement("div", { className: "gf-form max-width-30" }, /* @__PURE__ */ React__default["default"].createElement(
    ui.InlineField,
    {
      label: "Disable recording rules (beta)",
      labelWidth: PROM_CONFIG_LABEL_WIDTH,
      tooltip: /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, "This feature will disable recording rules Turn this on to improve dashboard performance"),
      interactive: true,
      className: styles.switchField,
      disabled: options.readOnly
    },
    /* @__PURE__ */ React__default["default"].createElement(
      ui.Switch,
      {
        value: (_g = options.jsonData.disableRecordingRules) != null ? _g : false,
        onChange: data.onUpdateDatasourceJsonDataOptionChecked(props, "disableRecordingRules"),
        id: selectors.components.DataSource.Prometheus.configPage.disableRecordingRules
      }
    )
  ))))), /* @__PURE__ */ React__default["default"].createElement(experimental.ConfigSubSection, { title: "Other", className: styles.container }, /* @__PURE__ */ React__default["default"].createElement("div", { className: "gf-form-group" }, /* @__PURE__ */ React__default["default"].createElement("div", { className: "gf-form-inline" }, /* @__PURE__ */ React__default["default"].createElement("div", { className: "gf-form max-width-30" }, /* @__PURE__ */ React__default["default"].createElement(
    ui.InlineField,
    {
      label: "Custom query parameters",
      labelWidth: PROM_CONFIG_LABEL_WIDTH,
      tooltip: /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, "Add custom parameters to the Prometheus query URL. For example timeout, partial_response, dedup, or max_source_resolution. Multiple parameters should be concatenated together with an \u2018&\u2019. ", docsTip()),
      interactive: true,
      disabled: options.readOnly
    },
    /* @__PURE__ */ React__default["default"].createElement(
      ui.Input,
      {
        className: "width-20",
        value: options.jsonData.customQueryParameters,
        onChange: onChangeHandler("customQueryParameters", options, onOptionsChange),
        spellCheck: false,
        placeholder: "Example: max_source_resolution=5m&timeout=10",
        "data-testid": selectors.components.DataSource.Prometheus.configPage.customQueryParameters
      }
    )
  ))), /* @__PURE__ */ React__default["default"].createElement("div", { className: "gf-form-inline" }, /* @__PURE__ */ React__default["default"].createElement("div", { className: "gf-form" }, /* @__PURE__ */ React__default["default"].createElement(
    ui.InlineField,
    {
      labelWidth: PROM_CONFIG_LABEL_WIDTH,
      tooltip: /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, "You can use either POST or GET HTTP method to query your Prometheus data source. POST is the recommended method as it allows bigger queries. Change this to GET if you have a Prometheus version older than 2.1 or if POST requests are restricted in your network. ", docsTip()),
      interactive: true,
      label: "HTTP method",
      disabled: options.readOnly
    },
    /* @__PURE__ */ React__default["default"].createElement(
      ui.Select,
      {
        width: 40,
        "aria-label": "Select HTTP method",
        options: httpOptions,
        value: httpOptions.find((o) => o.value === options.jsonData.httpMethod),
        onChange: onChangeHandler("httpMethod", options, onOptionsChange),
        "data-testid": selectors.components.DataSource.Prometheus.configPage.httpMethod
      }
    )
  ))))), /* @__PURE__ */ React__default["default"].createElement(
    ExemplarsSettings,
    {
      options: options.jsonData.exemplarTraceIdDestinations,
      onChange: (exemplarOptions) => data.updateDatasourcePluginJsonDataOption(
        { onOptionsChange, options },
        "exemplarTraceIdDestinations",
        exemplarOptions
      ),
      disabled: options.readOnly
    }
  ));
};
const getValueFromEventItem = (eventItem) => {
  if (!eventItem) {
    return "";
  }
  if ("currentTarget" in eventItem) {
    return eventItem.currentTarget.value;
  }
  return eventItem.value;
};
const onChangeHandler = (key, options, onOptionsChange) => (eventItem) => {
  onOptionsChange(__spreadProps$p(__spreadValues$u({}, options), {
    jsonData: __spreadProps$p(__spreadValues$u({}, options.jsonData), {
      [key]: getValueFromEventItem(eventItem)
    })
  }));
};

const PROM_CONFIG_LABEL_WIDTH = 30;
const ConfigEditor = (props) => {
  const { options, onOptionsChange } = props;
  const theme = ui.useTheme2();
  const styles = overhaulStyles(theme);
  return /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, options.access === "direct" && /* @__PURE__ */ React__default["default"].createElement(ui.Alert, { title: "Error", severity: "error" }, "Browser access mode in the Prometheus data source is no longer available. Switch to server access mode."), /* @__PURE__ */ React__default["default"].createElement(
    experimental.DataSourceDescription,
    {
      dataSourceName: "Prometheus",
      docsLink: "https://grafana.com/docs/grafana/latest/datasources/prometheus/configure-prometheus-data-source/"
    }
  ), /* @__PURE__ */ React__default["default"].createElement("hr", { className: `${styles.hrTopSpace} ${styles.hrBottomSpace}` }), /* @__PURE__ */ React__default["default"].createElement(
    DataSourceHttpSettingsOverhaul,
    {
      options,
      onOptionsChange,
      secureSocksDSProxyEnabled: runtime.config.secureSocksDSProxyEnabled
    }
  ), /* @__PURE__ */ React__default["default"].createElement("hr", null), /* @__PURE__ */ React__default["default"].createElement(
    experimental.ConfigSection,
    {
      className: styles.advancedSettings,
      title: "Advanced settings",
      description: "Additional settings are optional settings that can be configured for more control over your data source."
    },
    /* @__PURE__ */ React__default["default"].createElement(
      experimental.AdvancedHttpSettings,
      {
        className: styles.advancedHTTPSettingsMargin,
        config: options,
        onChange: onOptionsChange
      }
    ),
    /* @__PURE__ */ React__default["default"].createElement(AlertingSettingsOverhaul, { options, onOptionsChange }),
    /* @__PURE__ */ React__default["default"].createElement(PromSettings, { options, onOptionsChange })
  ));
};
function docsTip(url) {
  const docsUrl = "https://grafana.com/docs/grafana/latest/datasources/prometheus/#configure-the-data-source";
  return /* @__PURE__ */ React__default["default"].createElement("a", { href: url ? url : docsUrl, target: "_blank", rel: "noopener noreferrer" }, "Visit docs for more details here.");
}
const validateInput = (input, pattern, errorMessage) => {
  const defaultErrorMessage = "Value is not valid";
  if (input && !input.match(pattern)) {
    return /* @__PURE__ */ React__default["default"].createElement(ui.FieldValidationMessage, null, errorMessage ? errorMessage : defaultErrorMessage);
  } else {
    return true;
  }
};
function overhaulStyles(theme) {
  return {
    additionalSettings: css.css({
      marginBottom: "25px"
    }),
    secondaryGrey: css.css({
      color: theme.colors.secondary.text,
      opacity: "65%"
    }),
    inlineError: css.css({
      margin: "0px 0px 4px 245px"
    }),
    switchField: css.css({
      alignItems: "center"
    }),
    sectionHeaderPadding: css.css({
      paddingTop: "32px"
    }),
    sectionBottomPadding: css.css({
      paddingBottom: "28px"
    }),
    subsectionText: css.css({
      fontSize: "12px"
    }),
    hrBottomSpace: css.css({
      marginBottom: "56px"
    }),
    hrTopSpace: css.css({
      marginTop: "50px"
    }),
    textUnderline: css.css({
      textDecoration: "underline"
    }),
    versionMargin: css.css({
      marginBottom: "12px"
    }),
    advancedHTTPSettingsMargin: css.css({
      margin: "24px 0 8px 0"
    }),
    advancedSettings: css.css({
      paddingTop: "32px"
    }),
    alertingTop: css.css({
      marginTop: "40px !important"
    }),
    overhaulPageHeading: css.css({
      fontWeight: 400
    }),
    container: css.css({
      maxwidth: 578
    })
  };
}

var __defProp$u = Object.defineProperty;
var __defProps$o = Object.defineProperties;
var __getOwnPropDescs$o = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$u = Object.getOwnPropertySymbols;
var __hasOwnProp$u = Object.prototype.hasOwnProperty;
var __propIsEnum$u = Object.prototype.propertyIsEnumerable;
var __defNormalProp$u = (obj, key, value) => key in obj ? __defProp$u(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$t = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$u.call(b, prop))
      __defNormalProp$u(a, prop, b[prop]);
  if (__getOwnPropSymbols$u)
    for (var prop of __getOwnPropSymbols$u(b)) {
      if (__propIsEnum$u.call(b, prop))
        __defNormalProp$u(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$o = (a, b) => __defProps$o(a, __getOwnPropDescs$o(b));
function ResultsTable(props) {
  const { metrics, onChange, onClose, query, state, disableTextWrap } = props;
  const theme = ui.useTheme2();
  const styles = getStyles$9(theme, disableTextWrap);
  function selectMetric(metric) {
    if (metric.value) {
      onChange(__spreadProps$o(__spreadValues$t({}, query), { metric: metric.value }));
      tracking("grafana_prom_metric_encycopedia_tracking", state, metric.value);
      onClose();
    }
  }
  function metaRows(metric) {
    var _a, _b, _c, _d;
    if (state.fullMetaSearch && metric) {
      return /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, /* @__PURE__ */ React__default["default"].createElement("td", null, displayType((_a = metric.type) != null ? _a : "")), /* @__PURE__ */ React__default["default"].createElement("td", null, /* @__PURE__ */ React__default["default"].createElement(
        Highlighter__default["default"],
        {
          textToHighlight: (_b = metric.description) != null ? _b : "",
          searchWords: state.metaHaystackMatches,
          autoEscape: true,
          highlightClassName: styles.matchHighLight
        }
      )));
    } else {
      return /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, /* @__PURE__ */ React__default["default"].createElement("td", null, displayType((_c = metric.type) != null ? _c : "")), /* @__PURE__ */ React__default["default"].createElement("td", null, (_d = metric.description) != null ? _d : ""));
    }
  }
  function addHelpIcon(fullType, descriptiveType, link) {
    return /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, fullType, /* @__PURE__ */ React__default["default"].createElement("span", { className: styles.tooltipSpace }, /* @__PURE__ */ React__default["default"].createElement(
      ui.Tooltip,
      {
        content: /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, "When creating a ", descriptiveType, ", Prometheus exposes multiple series with the type counter.", " ", docsTip(link)),
        placement: "bottom-start",
        interactive: true
      },
      /* @__PURE__ */ React__default["default"].createElement(ui.Icon, { name: "info-circle", size: "xs" })
    )));
  }
  function displayType(type) {
    if (!type) {
      return "";
    }
    if (type.includes("(summary)")) {
      return addHelpIcon(type, "summary", "https://prometheus.io/docs/concepts/metric_types/#summary");
    }
    if (type.includes("(histogram)")) {
      return addHelpIcon(type, "histogram", "https://prometheus.io/docs/concepts/metric_types/#histogram");
    }
    return type;
  }
  function noMetricsMessages() {
    let message;
    if (!state.fuzzySearchQuery) {
      message = "There are no metrics found in the data source.";
    }
    if (query.labels.length > 0) {
      message = "There are no metrics found. Try to expand your label filters.";
    }
    if (state.fuzzySearchQuery || state.selectedTypes.length > 0) {
      message = "There are no metrics found. Try to expand your search and filters.";
    }
    return /* @__PURE__ */ React__default["default"].createElement("tr", { className: styles.noResults }, /* @__PURE__ */ React__default["default"].createElement("td", { colSpan: 3 }, message));
  }
  function textHighlight(state2) {
    if (state2.useBackend) {
      return [state2.fuzzySearchQuery];
    } else if (state2.fullMetaSearch) {
      return state2.metaHaystackMatches;
    } else {
      return state2.nameHaystackMatches;
    }
  }
  return /* @__PURE__ */ React__default["default"].createElement("table", { className: styles.table }, /* @__PURE__ */ React__default["default"].createElement("thead", { className: styles.stickyHeader }, /* @__PURE__ */ React__default["default"].createElement("tr", null, /* @__PURE__ */ React__default["default"].createElement("th", { className: `${styles.nameWidth} ${styles.tableHeaderPadding}` }, "Name"), state.hasMetadata && /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, /* @__PURE__ */ React__default["default"].createElement("th", { className: `${styles.typeWidth} ${styles.tableHeaderPadding}` }, "Type"), /* @__PURE__ */ React__default["default"].createElement("th", { className: `${styles.descriptionWidth} ${styles.tableHeaderPadding}` }, "Description")), /* @__PURE__ */ React__default["default"].createElement("th", { className: styles.selectButtonWidth }, " "))), /* @__PURE__ */ React__default["default"].createElement("tbody", null, /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, metrics.length > 0 && metrics.map((metric, idx) => {
    var _a, _b;
    return /* @__PURE__ */ React__default["default"].createElement("tr", { key: (_a = metric == null ? void 0 : metric.value) != null ? _a : idx, className: styles.row }, /* @__PURE__ */ React__default["default"].createElement("td", { className: styles.nameOverflow }, /* @__PURE__ */ React__default["default"].createElement(
      Highlighter__default["default"],
      {
        textToHighlight: (_b = metric == null ? void 0 : metric.value) != null ? _b : "",
        searchWords: textHighlight(state),
        autoEscape: true,
        highlightClassName: styles.matchHighLight
      }
    )), state.hasMetadata && metaRows(metric), /* @__PURE__ */ React__default["default"].createElement("td", null, /* @__PURE__ */ React__default["default"].createElement(
      ui.Button,
      {
        size: "md",
        variant: "secondary",
        onClick: () => selectMetric(metric),
        className: styles.centerButton
      },
      "Select"
    )));
  }), metrics.length === 0 && !state.isLoading && noMetricsMessages())));
}
const getStyles$9 = (theme, disableTextWrap) => {
  return {
    table: css.css({
      tableLayout: disableTextWrap ? void 0 : "fixed",
      borderRadius: theme.shape.radius.default,
      width: "100%",
      whiteSpace: disableTextWrap ? "nowrap" : "normal",
      td: {
        padding: theme.spacing(1)
      },
      "td,th": {
        minWidth: theme.spacing(3),
        borderBottom: `1px solid ${theme.colors.border.weak}`
      }
    }),
    row: css.css({
      label: "row",
      borderBottom: `1px solid ${theme.colors.border.weak}`,
      "&:last-child": {
        borderBottom: 0
      }
    }),
    tableHeaderPadding: css.css({
      padding: "8px"
    }),
    matchHighLight: css.css({
      background: "inherit",
      color: theme.components.textHighlight.text,
      backgroundColor: theme.components.textHighlight.background
    }),
    nameWidth: css.css({
      width: disableTextWrap ? void 0 : "37.5%"
    }),
    nameOverflow: css.css({
      overflowWrap: disableTextWrap ? void 0 : "anywhere"
    }),
    typeWidth: css.css({
      width: disableTextWrap ? void 0 : "15%"
    }),
    descriptionWidth: css.css({
      width: disableTextWrap ? void 0 : "35%"
    }),
    selectButtonWidth: css.css({
      width: disableTextWrap ? void 0 : "12.5%"
    }),
    stickyHeader: css.css({
      position: "sticky",
      top: 0,
      backgroundColor: theme.colors.background.primary
    }),
    noResults: css.css({
      textAlign: "center",
      color: theme.colors.text.secondary
    }),
    tooltipSpace: css.css({
      marginLeft: "4px"
    }),
    centerButton: css.css({
      display: "block",
      margin: "auto",
      border: "none"
    })
  };
};

const DEFAULT_RESULTS_PER_PAGE = 100;
const MAXIMUM_RESULTS_PER_PAGE = 1e3;
function initialState$2(query) {
  var _a, _b, _c, _d;
  return {
    isLoading: true,
    metrics: [],
    hasMetadata: true,
    metaHaystackDictionary: {},
    metaHaystackMatches: [],
    metaHaystackOrder: [],
    nameHaystackDictionary: {},
    nameHaystackOrder: [],
    nameHaystackMatches: [],
    totalMetricCount: 0,
    filteredMetricCount: null,
    resultsPerPage: DEFAULT_RESULTS_PER_PAGE,
    pageNum: 1,
    fuzzySearchQuery: "",
    fullMetaSearch: (_a = query == null ? void 0 : query.fullMetaSearch) != null ? _a : false,
    includeNullMetadata: (_b = query == null ? void 0 : query.includeNullMetadata) != null ? _b : true,
    selectedTypes: [],
    useBackend: (_c = query == null ? void 0 : query.useBackend) != null ? _c : false,
    disableTextWrap: (_d = query == null ? void 0 : query.disableTextWrap) != null ? _d : false,
    showAdditionalSettings: false
  };
}
function getSettings(visQuery) {
  var _a, _b, _c, _d;
  return {
    useBackend: (_a = visQuery == null ? void 0 : visQuery.useBackend) != null ? _a : false,
    disableTextWrap: (_b = visQuery == null ? void 0 : visQuery.disableTextWrap) != null ? _b : false,
    fullMetaSearch: (_c = visQuery == null ? void 0 : visQuery.fullMetaSearch) != null ? _c : false,
    includeNullMetadata: (_d = visQuery.includeNullMetadata) != null ? _d : false
  };
}

const getStyles$8 = (theme, disableTextWrap) => {
  return {
    modal: css.css({
      width: "85vw",
      [theme.breakpoints.down("md")]: {
        width: "100%"
      },
      [theme.breakpoints.up("xl")]: {
        width: "60%"
      }
    }),
    inputWrapper: css.css({
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap"
    }),
    inputItemFirst: css.css({
      flexBasis: "40%",
      paddingRight: "16px",
      [theme.breakpoints.down("md")]: {
        paddingRight: "0px",
        paddingBottom: "16px"
      }
    }),
    inputItem: css.css({
      flexGrow: 1,
      flexBasis: "20%",
      [theme.breakpoints.down("md")]: {
        minWidth: "100%"
      }
    }),
    selectWrapper: css.css({
      marginBottom: theme.spacing(1)
    }),
    resultsAmount: css.css({
      color: theme.colors.text.secondary,
      fontSize: "0.85rem",
      padding: "0 0 4px 0"
    }),
    resultsData: css.css({
      margin: `4px 0 ${theme.spacing(2)} 0`
    }),
    resultsDataCount: css.css({
      margin: 0
    }),
    resultsDataFiltered: css.css({
      color: theme.colors.text.secondary,
      textAlign: "center",
      border: "solid 1px rgba(204, 204, 220, 0.25)",
      padding: "7px"
    }),
    resultsDataFilteredText: css.css({
      display: "inline",
      verticalAlign: "text-top"
    }),
    results: css.css({
      height: "calc(80vh - 310px)",
      overflowY: "scroll"
    }),
    resultsFooter: css.css({
      marginTop: "24px",
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      alignItems: "center",
      position: "sticky"
    }),
    currentlySelected: css.css({
      color: "grey",
      opacity: "75%",
      fontSize: "0.75rem"
    }),
    loadingSpinner: css.css({
      visibility: "hidden"
    }),
    visible: css.css({
      visibility: "visible"
    }),
    settingsBtn: css.css({
      float: "right"
    }),
    noBorder: css.css({
      border: "none"
    }),
    resultsPerPageLabel: css.css({
      color: theme.colors.text.secondary,
      opacity: "75%",
      paddingTop: "5px",
      fontSize: "0.85rem",
      marginRight: "8px"
    }),
    resultsPerPageWrapper: css.css({
      display: "flex"
    })
  };
};

const uf = new uFuzzy__default["default"]({
  intraMode: 1,
  intraIns: 1,
  intraSub: 1,
  intraTrn: 1,
  intraDel: 1
});
function fuzzySearch(haystack, query, dispatcher) {
  const [idxs, info, order] = uf.search(haystack, query, 0, 1e5);
  let haystackOrder = [];
  let matchesSet = /* @__PURE__ */ new Set();
  if (idxs && order) {
    const mark = (part, matched) => {
      if (matched) {
        matchesSet.add(part);
      }
    };
    for (let i = 0; i < order.length; i++) {
      let infoIdx = order[i];
      uFuzzy__default["default"].highlight(haystack[info.idx[infoIdx]], info.ranges[infoIdx], mark);
      haystackOrder.push(haystack[info.idx[infoIdx]]);
    }
    dispatcher([haystackOrder, [...matchesSet]]);
  } else if (!query) {
    dispatcher([[], []]);
  }
}
const debouncedFuzzySearch = lodash.debounce(fuzzySearch, 300);

var __defProp$t = Object.defineProperty;
var __defProps$n = Object.defineProperties;
var __getOwnPropDescs$n = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$t = Object.getOwnPropertySymbols;
var __hasOwnProp$t = Object.prototype.hasOwnProperty;
var __propIsEnum$t = Object.prototype.propertyIsEnumerable;
var __defNormalProp$t = (obj, key, value) => key in obj ? __defProp$t(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$s = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$t.call(b, prop))
      __defNormalProp$t(a, prop, b[prop]);
  if (__getOwnPropSymbols$t)
    for (var prop of __getOwnPropSymbols$t(b)) {
      if (__propIsEnum$t.call(b, prop))
        __defNormalProp$t(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$n = (a, b) => __defProps$n(a, __getOwnPropDescs$n(b));
const MetricsModal = (props) => {
  var _a;
  const { datasource, isOpen, onClose, onChange, query, initialMetrics } = props;
  const [state, dispatch] = React.useReducer(stateSlice$2.reducer, initialState$2(query));
  const theme = ui.useTheme2();
  const styles = getStyles$8(theme, state.disableTextWrap);
  const updateMetricsMetadata = React.useCallback(async () => {
    dispatch(setIsLoading(true));
    const data = await setMetrics(datasource, query, initialMetrics);
    dispatch(
      buildMetrics({
        isLoading: false,
        hasMetadata: data.hasMetadata,
        metrics: data.metrics,
        metaHaystackDictionary: data.metaHaystackDictionary,
        nameHaystackDictionary: data.nameHaystackDictionary,
        totalMetricCount: data.metrics.length,
        filteredMetricCount: data.metrics.length
      })
    );
  }, [query, datasource, initialMetrics]);
  React.useEffect(() => {
    updateMetricsMetadata();
  }, [updateMetricsMetadata]);
  const typeOptions = promTypes.map((t) => {
    return {
      value: t.value,
      label: t.value,
      description: t.description
    };
  });
  const debouncedBackendSearch = React.useMemo(
    () => debounce__default["default"](async (metricText) => {
      dispatch(setIsLoading(true));
      const metrics = await getBackendSearchMetrics(metricText, query.labels, datasource);
      dispatch(
        filterMetricsBackend({
          metrics,
          filteredMetricCount: metrics.length,
          isLoading: false
        })
      );
    }, datasource.getDebounceTimeInMilliseconds()),
    [datasource, query]
  );
  function fuzzyNameDispatch(haystackData) {
    dispatch(setNameHaystack(haystackData));
  }
  function fuzzyMetaDispatch(haystackData) {
    dispatch(setMetaHaystack(haystackData));
  }
  function searchCallback(query2, fullMetaSearchVal) {
    if (state.useBackend && query2 === "") {
      updateMetricsMetadata();
    } else if (state.useBackend) {
      debouncedBackendSearch(query2);
    } else {
      if (fullMetaSearchVal) {
        debouncedFuzzySearch(Object.keys(state.metaHaystackDictionary), query2, fuzzyMetaDispatch);
      } else {
        debouncedFuzzySearch(Object.keys(state.nameHaystackDictionary), query2, fuzzyNameDispatch);
      }
    }
  }
  const additionalSettings = /* @__PURE__ */ React__default["default"].createElement(
    AdditionalSettings,
    {
      state,
      onChangeFullMetaSearch: () => {
        const newVal = !state.fullMetaSearch;
        dispatch(setFullMetaSearch(newVal));
        onChange(__spreadProps$n(__spreadValues$s({}, query), { fullMetaSearch: newVal }));
        searchCallback(state.fuzzySearchQuery, newVal);
      },
      onChangeIncludeNullMetadata: () => {
        dispatch(setIncludeNullMetadata(!state.includeNullMetadata));
        onChange(__spreadProps$n(__spreadValues$s({}, query), { includeNullMetadata: !state.includeNullMetadata }));
      },
      onChangeDisableTextWrap: () => {
        dispatch(setDisableTextWrap());
        onChange(__spreadProps$n(__spreadValues$s({}, query), { disableTextWrap: !state.disableTextWrap }));
        tracking("grafana_prom_metric_encycopedia_disable_text_wrap_interaction", state, "");
      },
      onChangeUseBackend: () => {
        const newVal = !state.useBackend;
        dispatch(setUseBackend(newVal));
        onChange(__spreadProps$n(__spreadValues$s({}, query), { useBackend: newVal }));
        if (newVal === false) {
          updateMetricsMetadata();
        } else {
          if (state.fuzzySearchQuery !== "") {
            debouncedBackendSearch(state.fuzzySearchQuery);
          }
        }
      }
    }
  );
  return /* @__PURE__ */ React__default["default"].createElement(
    ui.Modal,
    {
      "data-testid": metricsModaltestIds.metricModal,
      isOpen,
      title: "Metrics explorer",
      onDismiss: onClose,
      "aria-label": "Browse metrics",
      className: styles.modal
    },
    /* @__PURE__ */ React__default["default"].createElement(FeedbackLink, { feedbackUrl: "https://forms.gle/DEMAJHoAMpe3e54CA" }),
    /* @__PURE__ */ React__default["default"].createElement(
      "div",
      {
        className: styles.inputWrapper,
        "data-testid": selectors.components.DataSource.Prometheus.queryEditor.builder.metricsExplorer
      },
      /* @__PURE__ */ React__default["default"].createElement("div", { className: css.cx(styles.inputItem, styles.inputItemFirst) }, /* @__PURE__ */ React__default["default"].createElement(
        ui.Input,
        {
          autoFocus: true,
          "data-testid": metricsModaltestIds.searchMetric,
          placeholder: placeholders.browse,
          value: state.fuzzySearchQuery,
          onInput: (e) => {
            var _a2;
            const value = (_a2 = e.currentTarget.value) != null ? _a2 : "";
            dispatch(setFuzzySearchQuery(value));
            searchCallback(value, state.fullMetaSearch);
          }
        }
      )),
      state.hasMetadata && /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.inputItem }, /* @__PURE__ */ React__default["default"].createElement(
        ui.MultiSelect,
        {
          "data-testid": metricsModaltestIds.selectType,
          inputId: "my-select",
          options: typeOptions,
          value: state.selectedTypes,
          placeholder: placeholders.type,
          onChange: (v) => dispatch(setSelectedTypes(v))
        }
      )),
      /* @__PURE__ */ React__default["default"].createElement("div", null, /* @__PURE__ */ React__default["default"].createElement(ui.Spinner, { className: `${styles.loadingSpinner} ${state.isLoading ? styles.visible : ""}` })),
      /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.inputItem }, /* @__PURE__ */ React__default["default"].createElement(
        ui.Toggletip,
        {
          "aria-label": "Additional settings",
          content: additionalSettings,
          placement: "bottom-end",
          closeButton: false
        },
        /* @__PURE__ */ React__default["default"].createElement(ui.ButtonGroup, { className: styles.settingsBtn }, /* @__PURE__ */ React__default["default"].createElement(
          ui.Button,
          {
            variant: "secondary",
            size: "md",
            onClick: () => dispatch(showAdditionalSettings()),
            "data-testid": metricsModaltestIds.showAdditionalSettings,
            className: styles.noBorder
          },
          "Additional Settings"
        ), /* @__PURE__ */ React__default["default"].createElement(
          ui.Button,
          {
            className: styles.noBorder,
            variant: "secondary",
            icon: state.showAdditionalSettings ? "angle-up" : "angle-down"
          }
        ))
      ))
    ),
    /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.resultsData }, query.metric && /* @__PURE__ */ React__default["default"].createElement("i", { className: styles.currentlySelected }, "Currently selected: ", query.metric), query.labels.length > 0 && /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.resultsDataFiltered }, /* @__PURE__ */ React__default["default"].createElement(ui.Icon, { name: "info-circle", size: "sm" }), /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.resultsDataFilteredText }, "\xA0These metrics have been pre-filtered by labels chosen in the label filters."))),
    /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.results }, state.metrics && /* @__PURE__ */ React__default["default"].createElement(
      ResultsTable,
      {
        metrics: displayedMetrics(state, dispatch),
        onChange,
        onClose,
        query,
        state,
        disableTextWrap: state.disableTextWrap
      }
    )),
    /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.resultsFooter }, /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.resultsAmount }, "Showing ", state.filteredMetricCount, " of ", state.totalMetricCount, " results"), /* @__PURE__ */ React__default["default"].createElement(
      ui.Pagination,
      {
        currentPage: (_a = state.pageNum) != null ? _a : 1,
        numberOfPages: calculatePageList(state).length,
        onNavigate: (val) => {
          const page = val != null ? val : 1;
          dispatch(setPageNum(page));
        }
      }
    ), /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.resultsPerPageWrapper }, /* @__PURE__ */ React__default["default"].createElement("p", { className: styles.resultsPerPageLabel }, "# Results per page\xA0"), /* @__PURE__ */ React__default["default"].createElement(
      ui.Input,
      {
        "data-testid": metricsModaltestIds.resultsPerPage,
        value: calculateResultsPerPage(state.resultsPerPage, DEFAULT_RESULTS_PER_PAGE, MAXIMUM_RESULTS_PER_PAGE),
        placeholder: "results per page",
        width: 10,
        title: "The maximum results per page is " + MAXIMUM_RESULTS_PER_PAGE,
        type: "number",
        onInput: (e) => {
          const value = +e.currentTarget.value;
          if (isNaN(value) || value >= MAXIMUM_RESULTS_PER_PAGE) {
            return;
          }
          dispatch(setResultsPerPage(value));
        }
      }
    )))
  );
};
const metricsModaltestIds = {
  metricModal: "metric-modal",
  searchMetric: "search-metric",
  searchWithMetadata: "search-with-metadata",
  selectType: "select-type",
  metricCard: "metric-card",
  useMetric: "use-metric",
  searchPage: "search-page",
  resultsPerPage: "results-per-page",
  setUseBackend: "set-use-backend",
  showAdditionalSettings: "show-additional-settings"
};
const stateSlice$2 = toolkit.createSlice({
  name: "metrics-modal-state",
  initialState: initialState$2(),
  reducers: {
    filterMetricsBackend: (state, action) => {
      state.metrics = action.payload.metrics;
      state.filteredMetricCount = action.payload.filteredMetricCount;
      state.isLoading = action.payload.isLoading;
    },
    buildMetrics: (state, action) => {
      state.isLoading = action.payload.isLoading;
      state.metrics = action.payload.metrics;
      state.hasMetadata = action.payload.hasMetadata;
      state.metaHaystackDictionary = action.payload.metaHaystackDictionary;
      state.nameHaystackDictionary = action.payload.nameHaystackDictionary;
      state.totalMetricCount = action.payload.totalMetricCount;
      state.filteredMetricCount = action.payload.filteredMetricCount;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setFilteredMetricCount: (state, action) => {
      state.filteredMetricCount = action.payload;
    },
    setResultsPerPage: (state, action) => {
      state.resultsPerPage = action.payload;
    },
    setPageNum: (state, action) => {
      state.pageNum = action.payload;
    },
    setFuzzySearchQuery: (state, action) => {
      state.fuzzySearchQuery = action.payload;
      state.pageNum = 1;
    },
    setNameHaystack: (state, action) => {
      state.nameHaystackOrder = action.payload[0];
      state.nameHaystackMatches = action.payload[1];
    },
    setMetaHaystack: (state, action) => {
      state.metaHaystackOrder = action.payload[0];
      state.metaHaystackMatches = action.payload[1];
    },
    setFullMetaSearch: (state, action) => {
      state.fullMetaSearch = action.payload;
      state.pageNum = 1;
    },
    setIncludeNullMetadata: (state, action) => {
      state.includeNullMetadata = action.payload;
      state.pageNum = 1;
    },
    setSelectedTypes: (state, action) => {
      state.selectedTypes = action.payload;
      state.pageNum = 1;
    },
    setUseBackend: (state, action) => {
      state.useBackend = action.payload;
      state.fullMetaSearch = false;
      state.pageNum = 1;
    },
    setDisableTextWrap: (state) => {
      state.disableTextWrap = !state.disableTextWrap;
    },
    showAdditionalSettings: (state) => {
      state.showAdditionalSettings = !state.showAdditionalSettings;
    }
  }
});
const {
  setIsLoading,
  buildMetrics,
  filterMetricsBackend,
  setResultsPerPage,
  setPageNum,
  setFuzzySearchQuery,
  setNameHaystack,
  setMetaHaystack,
  setFullMetaSearch,
  setIncludeNullMetadata,
  setSelectedTypes,
  setUseBackend,
  setDisableTextWrap,
  showAdditionalSettings,
  setFilteredMetricCount
} = stateSlice$2.actions;

var __defProp$s = Object.defineProperty;
var __defProps$m = Object.defineProperties;
var __getOwnPropDescs$m = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$s = Object.getOwnPropertySymbols;
var __hasOwnProp$s = Object.prototype.hasOwnProperty;
var __propIsEnum$s = Object.prototype.propertyIsEnumerable;
var __defNormalProp$s = (obj, key, value) => key in obj ? __defProp$s(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$r = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$s.call(b, prop))
      __defNormalProp$s(a, prop, b[prop]);
  if (__getOwnPropSymbols$s)
    for (var prop of __getOwnPropSymbols$s(b)) {
      if (__propIsEnum$s.call(b, prop))
        __defNormalProp$s(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$m = (a, b) => __defProps$m(a, __getOwnPropDescs$m(b));
const splitSeparator = " ";
const PROMETHEUS_QUERY_BUILDER_MAX_RESULTS = 1e3;
function MetricSelect({
  datasource,
  query,
  onChange,
  onGetMetrics,
  labelsFilters,
  metricLookupDisabled,
  onBlur,
  variableEditor
}) {
  var _a;
  const styles = ui.useStyles2(getStyles$7);
  const [state, setState] = React.useState({});
  const prometheusMetricEncyclopedia = runtime.config.featureToggles.prometheusMetricEncyclopedia;
  const metricsModalOption = [
    {
      value: "BrowseMetrics",
      label: "Metrics explorer",
      description: "Browse and filter all metrics and metadata with a fuzzy search"
    }
  ];
  const customFilterOption = React.useCallback(
    (option, searchQuery) => {
      var _a2;
      const label = (_a2 = option.label) != null ? _a2 : option.value;
      if (!label) {
        return false;
      }
      if (!label.toLowerCase) {
        return true;
      }
      const searchWords = searchQuery.split(splitSeparator);
      return searchWords.reduce((acc, cur) => {
        const matcheSearch = label.toLowerCase().includes(cur.toLowerCase());
        let browseOption = false;
        if (prometheusMetricEncyclopedia) {
          browseOption = label === "Metrics explorer";
        }
        return acc && (matcheSearch || browseOption);
      }, true);
    },
    [prometheusMetricEncyclopedia]
  );
  const formatOptionLabel = React.useCallback(
    (option, meta) => {
      var _a2;
      if (option["__isNew__"]) {
        return option.label;
      }
      return /* @__PURE__ */ React__default["default"].createElement(
        Highlighter__default["default"],
        {
          searchWords: meta.inputValue.split(splitSeparator),
          textToHighlight: (_a2 = option.label) != null ? _a2 : "",
          highlightClassName: styles.highlight
        }
      );
    },
    [styles.highlight]
  );
  const formatKeyValueStringsForLabelValuesQuery = (query2, labelsFilters2) => {
    const queryString = regexifyLabelValuesQueryString(query2);
    return formatPrometheusLabelFiltersToString(queryString, labelsFilters2);
  };
  const getMetricLabels = (query2) => {
    const results = datasource.metricFindQuery(formatKeyValueStringsForLabelValuesQuery(query2, labelsFilters));
    return results.then((results2) => {
      const resultsLength = results2.length;
      truncateResult(results2);
      if (resultsLength > results2.length) {
        setState(__spreadProps$m(__spreadValues$r({}, state), { resultsTruncated: true }));
      } else {
        setState(__spreadProps$m(__spreadValues$r({}, state), { resultsTruncated: false }));
      }
      const resultsOptions = results2.map((result) => {
        return {
          label: result.text,
          value: result.text
        };
      });
      if (prometheusMetricEncyclopedia) {
        return [...metricsModalOption, ...resultsOptions];
      } else {
        return resultsOptions;
      }
    });
  };
  const metricLookupDisabledSearch = () => Promise.resolve([]);
  const debouncedSearch = debounce__default["default"](
    (query2) => getMetricLabels(query2),
    datasource.getDebounceTimeInMilliseconds()
  );
  const CustomOption = (props) => {
    const option = props.data;
    if (option.value === "BrowseMetrics") {
      const isFocused = props.isFocused ? styles.focus : "";
      return (
        // TODO: fix keyboard a11y
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        /* @__PURE__ */ React__default["default"].createElement(
          "div",
          __spreadProps$m(__spreadValues$r({}, props.innerProps), {
            ref: props.innerRef,
            className: `${styles.customOptionWidth} metric-encyclopedia-open`,
            "data-testid": selectors.components.Select.option,
            onKeyDown: (e) => {
              if (e.code === "Enter") {
                setState(__spreadProps$m(__spreadValues$r({}, state), { metricsModalOpen: true }));
              }
            }
          }),
          /* @__PURE__ */ React__default["default"].createElement("div", { className: `${styles.customOption} ${isFocused} metric-encyclopedia-open` }, /* @__PURE__ */ React__default["default"].createElement("div", null, /* @__PURE__ */ React__default["default"].createElement("div", { className: "metric-encyclopedia-open" }, option.label), /* @__PURE__ */ React__default["default"].createElement("div", { className: `${styles.customOptionDesc} metric-encyclopedia-open` }, option.description)), /* @__PURE__ */ React__default["default"].createElement(
            ui.Button,
            {
              fill: "text",
              size: "sm",
              variant: "secondary",
              onClick: () => setState(__spreadProps$m(__spreadValues$r({}, state), { metricsModalOpen: true })),
              className: "metric-encyclopedia-open"
            },
            "Open",
            /* @__PURE__ */ React__default["default"].createElement(ui.Icon, { name: "arrow-right" })
          ))
        )
      );
    }
    return SelectMenuOptions(props);
  };
  const CustomMenu = ({ children, maxHeight, innerRef, innerProps }) => {
    const theme = ui.useTheme2();
    const stylesMenu = ui.getSelectStyles(theme);
    const optionsLoaded = !React__default["default"].isValidElement(children) && state.resultsTruncated;
    return /* @__PURE__ */ React__default["default"].createElement(
      "div",
      __spreadProps$m(__spreadValues$r({}, innerProps), {
        className: `${stylesMenu.menu} ${styles.customMenuContainer}`,
        style: { maxHeight: Math.round(maxHeight * 0.9) },
        "aria-label": "Select options menu"
      }),
      /* @__PURE__ */ React__default["default"].createElement(
        ui.CustomScrollbar,
        {
          scrollRefCallback: innerRef,
          autoHide: false,
          autoHeightMax: "inherit",
          hideHorizontalTrack: true,
          showScrollIndicators: true
        },
        children
      ),
      optionsLoaded && /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.customMenuFooter }, /* @__PURE__ */ React__default["default"].createElement("div", null, "Only the top 1000 metrics are displayed in the metric select. Use the metrics explorer to view all metrics."))
    );
  };
  const asyncSelect = () => {
    var _a2;
    return /* @__PURE__ */ React__default["default"].createElement(
      ui.AsyncSelect,
      {
        "data-testid": selectors.components.DataSource.Prometheus.queryEditor.builder.metricSelect,
        isClearable: Boolean(variableEditor),
        inputId: "prometheus-metric-select",
        className: styles.select,
        value: query.metric ? data.toOption(query.metric) : void 0,
        placeholder: "Select metric",
        allowCustomValue: true,
        formatOptionLabel,
        filterOption: customFilterOption,
        minMenuHeight: 250,
        onOpenMenu: async () => {
          if (metricLookupDisabled) {
            return;
          }
          setState({ isLoading: true });
          const metrics = await onGetMetrics();
          const initialMetrics = metrics.map((m) => m.value);
          const resultsLength = metrics.length;
          if (metrics.length > PROMETHEUS_QUERY_BUILDER_MAX_RESULTS) {
            truncateResult(metrics);
          }
          if (prometheusMetricEncyclopedia) {
            setState({
              // add the modal button option to the options
              metrics: [...metricsModalOption, ...metrics],
              isLoading: void 0,
              // pass the initial metrics into the metrics explorer
              initialMetrics,
              resultsTruncated: resultsLength > metrics.length
            });
          } else {
            setState({
              metrics,
              isLoading: void 0,
              resultsTruncated: resultsLength > metrics.length
            });
          }
        },
        loadOptions: metricLookupDisabled ? metricLookupDisabledSearch : debouncedSearch,
        isLoading: state.isLoading,
        defaultOptions: (_a2 = state.metrics) != null ? _a2 : Array.from(new Array(25), () => ({ value: "" })),
        onChange: (input) => {
          const value = input == null ? void 0 : input.value;
          if (value) {
            if (prometheusMetricEncyclopedia && value === "BrowseMetrics") {
              tracking("grafana_prometheus_metric_encyclopedia_open", null, "", query);
              setState(__spreadProps$m(__spreadValues$r({}, state), { metricsModalOpen: true }));
            } else {
              onChange(__spreadProps$m(__spreadValues$r({}, query), { metric: value }));
            }
          } else {
            onChange(__spreadProps$m(__spreadValues$r({}, query), { metric: "" }));
          }
        },
        components: prometheusMetricEncyclopedia ? { Option: CustomOption, MenuList: CustomMenu } : { MenuList: CustomMenu },
        onBlur
      }
    );
  };
  return /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, prometheusMetricEncyclopedia && !datasource.lookupsDisabled && state.metricsModalOpen && /* @__PURE__ */ React__default["default"].createElement(
    MetricsModal,
    {
      datasource,
      isOpen: state.metricsModalOpen,
      onClose: () => setState(__spreadProps$m(__spreadValues$r({}, state), { metricsModalOpen: false })),
      query,
      onChange,
      initialMetrics: (_a = state.initialMetrics) != null ? _a : []
    }
  ), variableEditor ? /* @__PURE__ */ React__default["default"].createElement(ui.InlineFieldRow, null, /* @__PURE__ */ React__default["default"].createElement(
    ui.InlineField,
    {
      label: "Metric",
      labelWidth: 20,
      tooltip: /* @__PURE__ */ React__default["default"].createElement("div", null, "Optional: returns a list of label values for the label name in the specified metric.")
    },
    asyncSelect()
  )) : /* @__PURE__ */ React__default["default"].createElement(experimental.EditorFieldGroup, null, /* @__PURE__ */ React__default["default"].createElement(experimental.EditorField, { label: "Metric" }, asyncSelect())));
}
const getStyles$7 = (theme) => ({
  select: css.css({
    minWidth: "125px"
  }),
  highlight: css.css({
    label: "select__match-highlight",
    background: "inherit",
    padding: "inherit",
    color: theme.colors.warning.contrastText,
    backgroundColor: theme.colors.warning.main
  }),
  customOption: css.css({
    padding: "8px",
    display: "flex",
    justifyContent: "space-between",
    cursor: "pointer",
    ":hover": {
      backgroundColor: theme.colors.emphasize(theme.colors.background.primary, 0.1)
    }
  }),
  customOptionlabel: css.css({
    color: theme.colors.text.primary
  }),
  customOptionDesc: css.css({
    color: theme.colors.text.secondary,
    fontSize: theme.typography.size.xs,
    opacity: "50%"
  }),
  focus: css.css({
    backgroundColor: theme.colors.emphasize(theme.colors.background.primary, 0.1)
  }),
  customOptionWidth: css.css({
    minWidth: "400px"
  }),
  customMenuFooter: css.css({
    flex: 0,
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(1.5),
    borderTop: `1px solid ${theme.colors.border.weak}`,
    color: theme.colors.text.secondary
  }),
  customMenuContainer: css.css({
    display: "flex",
    flexDirection: "column",
    background: theme.colors.background.primary,
    boxShadow: theme.shadows.z3
  })
});
const formatPrometheusLabelFiltersToString = (queryString, labelsFilters) => {
  const filterArray = labelsFilters ? formatPrometheusLabelFilters(labelsFilters) : [];
  return `label_values({__name__=~".*${queryString}"${filterArray ? filterArray.join("") : ""}},__name__)`;
};
const formatPrometheusLabelFilters = (labelsFilters) => {
  return labelsFilters.map((label) => {
    return `,${label.label}="${label.value}"`;
  });
};

var __defProp$r = Object.defineProperty;
var __getOwnPropSymbols$r = Object.getOwnPropertySymbols;
var __hasOwnProp$r = Object.prototype.hasOwnProperty;
var __propIsEnum$r = Object.prototype.propertyIsEnumerable;
var __defNormalProp$r = (obj, key, value) => key in obj ? __defProp$r(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$q = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$r.call(b, prop))
      __defNormalProp$r(a, prop, b[prop]);
  if (__getOwnPropSymbols$r)
    for (var prop of __getOwnPropSymbols$r(b)) {
      if (__propIsEnum$r.call(b, prop))
        __defNormalProp$r(a, prop, b[prop]);
    }
  return a;
};
var __objRest$4 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$r.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$r)
    for (var prop of __getOwnPropSymbols$r(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$r.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const processHistogramMetrics = (metrics) => {
  const resultSet = /* @__PURE__ */ new Set();
  const regexp = new RegExp("_bucket($|:)");
  for (let index = 0; index < metrics.length; index++) {
    const metric = metrics[index];
    const isHistogramValue = regexp.test(metric);
    if (isHistogramValue) {
      resultSet.add(metric);
    }
  }
  return [...resultSet];
};
function processLabels(labels, withName = false) {
  const valueSet = {};
  labels.forEach((label) => {
    const _a = label, { __name__ } = _a, rest = __objRest$4(_a, ["__name__"]);
    if (withName) {
      valueSet["__name__"] = valueSet["__name__"] || /* @__PURE__ */ new Set();
      if (!valueSet["__name__"].has(__name__)) {
        valueSet["__name__"].add(__name__);
      }
    }
    Object.keys(rest).forEach((key) => {
      if (!valueSet[key]) {
        valueSet[key] = /* @__PURE__ */ new Set();
      }
      if (!valueSet[key].has(rest[key])) {
        valueSet[key].add(rest[key]);
      }
    });
  });
  const valueArray = {};
  limitSuggestions(Object.keys(valueSet)).forEach((key) => {
    valueArray[key] = limitSuggestions(Array.from(valueSet[key]));
  });
  return { values: valueArray, keys: Object.keys(valueArray) };
}
const labelRegexp = /\b(\w+)(!?=~?)("[^"\n]*?")(,)?(\s*)?/g;
function expandRecordingRules(query, mapping) {
  const getRuleRegex = (ruleName) => new RegExp(`(\\s|\\(|^)(${ruleName})(\\s|$|\\(|\\[|\\{)`, "ig");
  const tmpSplitParts = Object.keys(mapping).reduce(
    (prev, curr) => {
      let parts = [];
      let tmpParts = [];
      let removeIdx = [];
      prev.filter(Boolean).forEach((p, i) => {
        const doesMatch = p.match(getRuleRegex(curr));
        if (doesMatch) {
          parts = p.split(curr);
          if (parts.length === 2) {
            removeIdx.push(i);
            tmpParts.push(...[parts[0], curr, parts[1]].filter(Boolean));
          } else if (parts.length > 2) {
            removeIdx.push(i);
            parts = parts.map((p2) => p2 === "" ? curr : p2);
            tmpParts.push(...parts);
          }
        }
      });
      removeIdx.forEach((ri) => prev[ri] = "");
      prev = prev.filter(Boolean);
      prev.push(...tmpParts);
      return prev;
    },
    [query]
  );
  let labelFound = false;
  const trulyExpandedQuery = tmpSplitParts.map((tsp, i) => {
    if (labelFound) {
      labelFound = false;
      return "";
    }
    if (mapping[tsp]) {
      const recordingRule = mapping[tsp];
      if (i + 1 !== tmpSplitParts.length && tmpSplitParts[i + 1].match(labelRegexp)) {
        labelFound = true;
        const labels = tmpSplitParts[i + 1];
        const invalidLabelsRegex = /(\)\{|\}\{|\]\{)/;
        return addLabelsToExpression(recordingRule + labels, invalidLabelsRegex);
      } else {
        return recordingRule;
      }
    }
    return tsp;
  });
  return trulyExpandedQuery.filter(Boolean).join("");
}
function addLabelsToExpression(expr, invalidLabelsRegexp) {
  var _a;
  const match = expr.match(invalidLabelsRegexp);
  if (!match) {
    return expr;
  }
  const indexOfRegexMatch = (_a = match.index) != null ? _a : 0;
  const exprBeforeRegexMatch = expr.slice(0, indexOfRegexMatch + 1);
  const exprAfterRegexMatch = expr.slice(indexOfRegexMatch + 1);
  const arrayOfLabelObjects = [];
  exprAfterRegexMatch.replace(labelRegexp, (label, key, operator, value, comma, space) => {
    arrayOfLabelObjects.push({ key, operator, value, comma, space });
    return "";
  });
  let result = exprBeforeRegexMatch;
  arrayOfLabelObjects.filter(Boolean).forEach((obj) => {
    const value = obj.value.slice(1, -1);
    result = addLabelToQuery(result, obj.key, value, obj.operator);
  });
  let existingLabel = arrayOfLabelObjects.reduce((prev, curr) => {
    var _a2, _b;
    prev += `${curr.key}${curr.operator}${curr.value}${(_a2 = curr.comma) != null ? _a2 : ""}${(_b = curr.space) != null ? _b : ""}`;
    return prev;
  }, "");
  existingLabel = "{" + existingLabel + "}";
  const potentialLeftOver = exprAfterRegexMatch.replace(existingLabel, "");
  return result + potentialLeftOver;
}
function fixSummariesMetadata(metadata) {
  if (!metadata) {
    return metadata;
  }
  const baseMetadata = {};
  const summaryMetadata = {};
  for (const metric in metadata) {
    const item = metadata[metric][0];
    baseMetadata[metric] = item;
    if (item.type === "histogram") {
      summaryMetadata[`${metric}_bucket`] = {
        type: "counter",
        help: `Cumulative counters for the observation buckets (${item.help})`
      };
      summaryMetadata[`${metric}_count`] = {
        type: "counter",
        help: `Count of events that have been observed for the histogram metric (${item.help})`
      };
      summaryMetadata[`${metric}_sum`] = {
        type: "counter",
        help: `Total sum of all observed values for the histogram metric (${item.help})`
      };
    }
    if (item.type === "summary") {
      summaryMetadata[`${metric}_count`] = {
        type: "counter",
        help: `Count of events that have been observed for the base metric (${item.help})`
      };
      summaryMetadata[`${metric}_sum`] = {
        type: "counter",
        help: `Total sum of all observed values for the base metric (${item.help})`
      };
    }
  }
  const syntheticMetadata = {};
  syntheticMetadata["ALERTS"] = {
    type: "counter",
    help: "Time series showing pending and firing alerts. The sample value is set to 1 as long as the alert is in the indicated active (pending or firing) state."
  };
  return __spreadValues$q(__spreadValues$q(__spreadValues$q({}, baseMetadata), summaryMetadata), syntheticMetadata);
}
function roundMsToMin(milliseconds) {
  return roundSecToMin(milliseconds / 1e3);
}
function roundSecToMin(seconds) {
  return Math.floor(seconds / 60);
}
function roundSecToNextMin(seconds, secondsToRound = 1) {
  return Math.ceil(seconds / 60) - Math.ceil(seconds / 60) % secondsToRound;
}
function limitSuggestions(items) {
  return items.slice(0, SUGGESTIONS_LIMIT);
}
const RE2_METACHARACTERS = /[*+?()|\\.\[\]{}^$]/g;
function escapePrometheusRegexp(value) {
  return value.replace(RE2_METACHARACTERS, "\\$&");
}
function escapeLabelValueInExactSelector(labelValue) {
  return labelValue.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/"/g, '\\"');
}
function escapeLabelValueInRegexSelector(labelValue) {
  return escapeLabelValueInExactSelector(escapePrometheusRegexp(labelValue));
}
const FromPromLikeMap = {
  "=": data.AbstractLabelOperator.Equal,
  "!=": data.AbstractLabelOperator.NotEqual,
  "=~": data.AbstractLabelOperator.EqualRegEx,
  "!~": data.AbstractLabelOperator.NotEqualRegEx
};
const ToPromLikeMap = lodash.invert(FromPromLikeMap);
function toPromLikeExpr(labelBasedQuery) {
  const expr = labelBasedQuery.labelMatchers.map((selector) => {
    const operator = ToPromLikeMap[selector.operator];
    if (operator) {
      return `${selector.name}${operator}"${selector.value}"`;
    } else {
      return "";
    }
  }).filter((e) => e !== "").join(", ");
  return expr ? `{${expr}}` : "";
}
function toPromLikeQuery(labelBasedQuery) {
  return {
    refId: labelBasedQuery.refId,
    expr: toPromLikeExpr(labelBasedQuery),
    range: true
  };
}
function getMaybeTokenStringContent(token) {
  if (typeof token.content === "string") {
    return token.content;
  }
  return "";
}
function extractLabelMatchers(tokens) {
  const labelMatchers = [];
  for (const token of tokens) {
    if (!(token instanceof Prism.Token)) {
      continue;
    }
    if (token.type === "context-labels") {
      let labelKey = "";
      let labelValue = "";
      let labelOperator = "";
      const contentTokens = Array.isArray(token.content) ? token.content : [token.content];
      for (let currentToken of contentTokens) {
        if (typeof currentToken === "string") {
          let currentStr;
          currentStr = currentToken;
          if (currentStr === "=" || currentStr === "!=" || currentStr === "=~" || currentStr === "!~") {
            labelOperator = currentStr;
          }
        } else if (currentToken instanceof Prism.Token) {
          switch (currentToken.type) {
            case "label-key":
              labelKey = getMaybeTokenStringContent(currentToken);
              break;
            case "label-value":
              labelValue = getMaybeTokenStringContent(currentToken);
              labelValue = labelValue.substring(1, labelValue.length - 1);
              const labelComparator = FromPromLikeMap[labelOperator];
              if (labelComparator) {
                labelMatchers.push({ name: labelKey, operator: labelComparator, value: labelValue });
              }
              break;
          }
        }
      }
    }
  }
  return labelMatchers;
}
function getRangeSnapInterval(cacheLevel, range) {
  if (cacheLevel === PrometheusCacheLevel.None) {
    return {
      start: getPrometheusTime(range.from, false).toString(),
      end: getPrometheusTime(range.to, true).toString()
    };
  }
  const startTime = getPrometheusTime(range.from, false);
  const startTimeQuantizedSeconds = data.incrRoundDn(startTime, getClientCacheDurationInMinutes(cacheLevel) * 60);
  const endTime = getPrometheusTime(range.to, true);
  const endTimeQuantizedSeconds = roundSecToNextMin(endTime, getClientCacheDurationInMinutes(cacheLevel)) * 60;
  if (startTimeQuantizedSeconds === endTimeQuantizedSeconds) {
    const endTimePlusOneStep = endTimeQuantizedSeconds + getClientCacheDurationInMinutes(cacheLevel) * 60;
    return { start: startTimeQuantizedSeconds.toString(), end: endTimePlusOneStep.toString() };
  }
  const start = startTimeQuantizedSeconds.toString();
  const end = endTimeQuantizedSeconds.toString();
  return { start, end };
}
function getClientCacheDurationInMinutes(cacheLevel) {
  switch (cacheLevel) {
    case PrometheusCacheLevel.Medium:
      return 10;
    case PrometheusCacheLevel.High:
      return 60;
    default:
      return 1;
  }
}
function getPrometheusTime(date, roundUp) {
  if (typeof date === "string") {
    date = data.dateMath.parse(date, roundUp);
  }
  return Math.ceil(date.valueOf() / 1e3);
}
function truncateResult(array, limit) {
  if (limit === void 0) {
    limit = PROMETHEUS_QUERY_BUILDER_MAX_RESULTS;
  }
  array.length = Math.min(array.length, limit);
  return array;
}

var __defProp$q = Object.defineProperty;
var __defProps$l = Object.defineProperties;
var __getOwnPropDescs$l = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$q = Object.getOwnPropertySymbols;
var __hasOwnProp$q = Object.prototype.hasOwnProperty;
var __propIsEnum$q = Object.prototype.propertyIsEnumerable;
var __defNormalProp$q = (obj, key, value) => key in obj ? __defProp$q(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$p = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$q.call(b, prop))
      __defNormalProp$q(a, prop, b[prop]);
  if (__getOwnPropSymbols$q)
    for (var prop of __getOwnPropSymbols$q(b)) {
      if (__propIsEnum$q.call(b, prop))
        __defNormalProp$q(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$l = (a, b) => __defProps$l(a, __getOwnPropDescs$l(b));
var __publicField$6 = (obj, key, value) => {
  __defNormalProp$q(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const DEFAULT_KEYS = ["job", "instance"];
const EMPTY_SELECTOR$1 = "{}";
const SUGGESTIONS_LIMIT = 1e4;
const buildCacheHeaders = (durationInSeconds) => {
  return {
    headers: {
      "X-Grafana-Cache": `private, max-age=${durationInSeconds}`
    }
  };
};
function getMetadataString(metric, metadata) {
  if (!metadata[metric]) {
    return void 0;
  }
  const { type, help } = metadata[metric];
  return `${type.toUpperCase()}: ${help}`;
}
function getMetadataHelp(metric, metadata) {
  if (!metadata[metric]) {
    return void 0;
  }
  return metadata[metric].help;
}
function getMetadataType(metric, metadata) {
  if (!metadata[metric]) {
    return void 0;
  }
  return metadata[metric].type;
}
const PREFIX_DELIMITER_REGEX = /(="|!="|=~"|!~"|\{|\[|\(|\+|-|\/|\*|%|\^|\band\b|\bor\b|\bunless\b|==|>=|!=|<=|>|<|=|~|,)/;
const secondsInDay = 86400;
class PromQlLanguageProvider extends data.LanguageProvider {
  constructor(datasource, initialValues) {
    super();
    __publicField$6(this, "histogramMetrics");
    __publicField$6(this, "timeRange");
    __publicField$6(this, "metrics");
    __publicField$6(this, "metricsMetadata");
    __publicField$6(this, "datasource");
    __publicField$6(this, "labelKeys", []);
    __publicField$6(this, "request", async (url, defaultValue, params = {}, options) => {
      try {
        const res = await this.datasource.metadataRequest(url, params, options);
        return res.data.data;
      } catch (error) {
        if (!isCancelledError(error)) {
          console.error(error);
        }
      }
      return defaultValue;
    });
    __publicField$6(this, "start", async (timeRange) => {
      this.timeRange = timeRange != null ? timeRange : data.getDefaultTimeRange();
      if (this.datasource.lookupsDisabled) {
        return [];
      }
      this.metrics = await this.fetchLabelValues("__name__") || [];
      this.histogramMetrics = processHistogramMetrics(this.metrics).sort();
      return Promise.all([this.loadMetricsMetadata(), this.fetchLabels()]);
    });
    /**
     * @param key
     */
    __publicField$6(this, "fetchLabelValues", async (key) => {
      const params = this.datasource.getAdjustedInterval(this.timeRange);
      const interpolatedName = this.datasource.interpolateString(key);
      const url = `/api/v1/label/${interpolatedName}/values`;
      const value = await this.request(url, [], params, this.getDefaultCacheHeaders());
      return value != null ? value : [];
    });
    /**
     * Fetches all label keys
     */
    __publicField$6(this, "fetchLabels", async (timeRange, queries) => {
      if (timeRange) {
        this.timeRange = timeRange;
      }
      let url = "/api/v1/labels";
      const timeParams = this.datasource.getAdjustedInterval(this.timeRange);
      this.labelFetchTs = Date.now().valueOf();
      const searchParams = new URLSearchParams(__spreadValues$p({}, timeParams));
      queries == null ? void 0 : queries.forEach((q) => {
        const visualQuery = buildVisualQueryFromString(q.expr);
        if (visualQuery.query.metric !== "") {
          searchParams.append("match[]", visualQuery.query.metric);
          if (visualQuery.query.binaryQueries) {
            visualQuery.query.binaryQueries.forEach((bq) => {
              searchParams.append("match[]", bq.query.metric);
            });
          }
        }
      });
      if (this.datasource.httpMethod === "GET") {
        url += `?${searchParams.toString()}`;
      }
      const res = await this.request(url, [], searchParams, this.getDefaultCacheHeaders());
      if (Array.isArray(res)) {
        this.labelKeys = res.slice().sort();
      }
      return [];
    });
    /**
     * Gets series values
     * Function to replace old getSeries calls in a way that will provide faster endpoints for new prometheus instances,
     * while maintaining backward compatability
     * @param labelName
     * @param selector
     */
    __publicField$6(this, "getSeriesValues", async (labelName, selector) => {
      var _a;
      if (!this.datasource.hasLabelsMatchAPISupport()) {
        const data = await this.getSeries(selector);
        return (_a = data[labelName]) != null ? _a : [];
      }
      return await this.fetchSeriesValuesWithMatch(labelName, selector);
    });
    /**
     * Fetches all values for a label, with optional match[]
     * @param name
     * @param match
     * @param timeRange
     * @param requestId
     */
    __publicField$6(this, "fetchSeriesValuesWithMatch", async (name, match, requestId, timeRange = this.timeRange) => {
      const interpolatedName = name ? this.datasource.interpolateString(name) : null;
      const interpolatedMatch = match ? this.datasource.interpolateString(match) : null;
      const range = this.datasource.getAdjustedInterval(timeRange);
      const urlParams = __spreadValues$p(__spreadValues$p({}, range), interpolatedMatch && { "match[]": interpolatedMatch });
      let requestOptions = __spreadValues$p(__spreadValues$p({}, this.getDefaultCacheHeaders()), requestId && { requestId });
      if (!Object.keys(requestOptions).length) {
        requestOptions = void 0;
      }
      const value = await this.request(`/api/v1/label/${interpolatedName}/values`, [], urlParams, requestOptions);
      return value != null ? value : [];
    });
    /**
     * Gets series labels
     * Function to replace old getSeries calls in a way that will provide faster endpoints for new prometheus instances,
     * while maintaining backward compatability. The old API call got the labels and the values in a single query,
     * but with the new query we need two calls, one to get the labels, and another to get the values.
     *
     * @param selector
     * @param otherLabels
     */
    __publicField$6(this, "getSeriesLabels", async (selector, otherLabels) => {
      let possibleLabelNames, data;
      if (!this.datasource.hasLabelsMatchAPISupport()) {
        data = await this.getSeries(selector);
        possibleLabelNames = Object.keys(data);
      } else {
        otherLabels.push({ name: "__name__", value: "", op: "!=" });
        data = await this.fetchSeriesLabelsMatch(selector);
        possibleLabelNames = Object.keys(data);
      }
      const usedLabelNames = new Set(otherLabels.map((l) => l.name));
      return possibleLabelNames.filter((l) => !usedLabelNames.has(l));
    });
    /**
     * Fetch labels using the best endpoint that datasource supports.
     * This is cached by its args but also by the global timeRange currently selected as they can change over requested time.
     * @param name
     * @param withName
     */
    __publicField$6(this, "fetchLabelsWithMatch", async (name, withName) => {
      if (this.datasource.hasLabelsMatchAPISupport()) {
        return this.fetchSeriesLabelsMatch(name, withName);
      } else {
        return this.fetchSeriesLabels(name, withName);
      }
    });
    /**
     * Fetch labels for a series using /series endpoint. This is cached by its args but also by the global timeRange currently selected as
     * they can change over requested time.
     * @param name
     * @param withName
     */
    __publicField$6(this, "fetchSeriesLabels", async (name, withName) => {
      const interpolatedName = this.datasource.interpolateString(name);
      const range = this.datasource.getAdjustedInterval(this.timeRange);
      const urlParams = __spreadProps$l(__spreadValues$p({}, range), {
        "match[]": interpolatedName
      });
      const url = `/api/v1/series`;
      const data = await this.request(url, [], urlParams, this.getDefaultCacheHeaders());
      const { values } = processLabels(data, withName);
      return values;
    });
    /**
     * Fetch labels for a series using /labels endpoint.  This is cached by its args but also by the global timeRange currently selected as
     * they can change over requested time.
     * @param name
     * @param withName
     */
    __publicField$6(this, "fetchSeriesLabelsMatch", async (name, withName) => {
      const interpolatedName = this.datasource.interpolateString(name);
      const range = this.datasource.getAdjustedInterval(this.timeRange);
      const urlParams = __spreadProps$l(__spreadValues$p({}, range), {
        "match[]": interpolatedName
      });
      const url = `/api/v1/labels`;
      const data = await this.request(url, [], urlParams, this.getDefaultCacheHeaders());
      return data.reduce((ac, a) => __spreadProps$l(__spreadValues$p({}, ac), { [a]: "" }), {});
    });
    /**
     * Fetch series for a selector. Use this for raw results. Use fetchSeriesLabels() to get labels.
     * @param match
     */
    __publicField$6(this, "fetchSeries", async (match) => {
      const url = "/api/v1/series";
      const range = this.datasource.getTimeRangeParams(this.timeRange);
      const params = __spreadProps$l(__spreadValues$p({}, range), { "match[]": match });
      return await this.request(url, {}, params, this.getDefaultCacheHeaders());
    });
    /**
     * Fetch this only one as we assume this won't change over time. This is cached differently from fetchSeriesLabels
     * because we can cache more aggressively here and also we do not want to invalidate this cache the same way as in
     * fetchSeriesLabels.
     */
    __publicField$6(this, "fetchDefaultSeries", lodash.once(async () => {
      const values = await Promise.all(DEFAULT_KEYS.map((key) => this.fetchLabelValues(key)));
      return DEFAULT_KEYS.reduce((acc, key, i) => __spreadProps$l(__spreadValues$p({}, acc), { [key]: values[i] }), {});
    }));
    this.datasource = datasource;
    this.histogramMetrics = [];
    this.timeRange = data.getDefaultTimeRange();
    this.metrics = [];
    Object.assign(this, initialValues);
  }
  getDefaultCacheHeaders() {
    if (this.datasource.cacheLevel !== PrometheusCacheLevel.None) {
      return buildCacheHeaders(this.datasource.getCacheDurationInMinutes() * 60);
    }
    return;
  }
  // Strip syntax chars so that typeahead suggestions can work on clean inputs
  cleanText(s) {
    const parts = s.split(PREFIX_DELIMITER_REGEX);
    const last = parts.pop();
    return last.trimLeft().replace(/"$/, "").replace(/^"/, "");
  }
  get syntax() {
    return promqlGrammar;
  }
  async loadMetricsMetadata() {
    const headers = buildCacheHeaders(this.datasource.getDaysToCacheMetadata() * secondsInDay);
    this.metricsMetadata = fixSummariesMetadata(
      await this.request(
        "/api/v1/metadata",
        {},
        {},
        __spreadValues$p({
          showErrorAlert: false
        }, headers)
      )
    );
  }
  getLabelKeys() {
    return this.labelKeys;
  }
  importFromAbstractQuery(labelBasedQuery) {
    return toPromLikeQuery(labelBasedQuery);
  }
  exportToAbstractQuery(query) {
    const promQuery = query.expr;
    if (!promQuery || promQuery.length === 0) {
      return { refId: query.refId, labelMatchers: [] };
    }
    const tokens = Prism__default["default"].tokenize(promQuery, promqlGrammar);
    const labelMatchers = extractLabelMatchers(tokens);
    const nameLabelValue = getNameLabelValue(promQuery, tokens);
    if (nameLabelValue && nameLabelValue.length > 0) {
      labelMatchers.push({
        name: "__name__",
        operator: data.AbstractLabelOperator.Equal,
        value: nameLabelValue
      });
    }
    return {
      refId: query.refId,
      labelMatchers
    };
  }
  async getSeries(selector, withName) {
    if (this.datasource.lookupsDisabled) {
      return {};
    }
    try {
      if (selector === EMPTY_SELECTOR$1) {
        return await this.fetchDefaultSeries();
      } else {
        return await this.fetchSeriesLabels(selector, withName);
      }
    } catch (error) {
      console.error(error);
      return {};
    }
  }
  async getLabelValues(key) {
    return await this.fetchLabelValues(key);
  }
}
function getNameLabelValue(promQuery, tokens) {
  let nameLabelValue = "";
  for (const token of tokens) {
    if (typeof token === "string") {
      nameLabelValue = token;
      break;
    }
  }
  return nameLabelValue;
}
function isCancelledError(error) {
  return typeof error === "object" && error !== null && "cancelled" in error && error.cancelled === true;
}

var __defProp$p = Object.defineProperty;
var __defProps$k = Object.defineProperties;
var __getOwnPropDescs$k = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$p = Object.getOwnPropertySymbols;
var __hasOwnProp$p = Object.prototype.hasOwnProperty;
var __propIsEnum$p = Object.prototype.propertyIsEnumerable;
var __defNormalProp$p = (obj, key, value) => key in obj ? __defProp$p(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$o = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$p.call(b, prop))
      __defNormalProp$p(a, prop, b[prop]);
  if (__getOwnPropSymbols$p)
    for (var prop of __getOwnPropSymbols$p(b)) {
      if (__propIsEnum$p.call(b, prop))
        __defNormalProp$p(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$k = (a, b) => __defProps$k(a, __getOwnPropDescs$k(b));
function LabelFilterItem({
  item,
  defaultOp,
  onChange,
  onDelete,
  onGetLabelNames,
  onGetLabelValues,
  invalidLabel,
  invalidValue,
  getLabelValuesAutofillSuggestions,
  debounceDuration
}) {
  var _a, _b, _c, _d;
  const [state, setState] = React.useState({});
  const [labelNamesMenuOpen, setLabelNamesMenuOpen] = React.useState(false);
  const [labelValuesMenuOpen, setLabelValuesMenuOpen] = React.useState(false);
  const isMultiSelect = (operator = item.op) => {
    var _a2;
    return (_a2 = operators$2.find((op) => op.label === operator)) == null ? void 0 : _a2.isMultiValue;
  };
  const getSelectOptionsFromString = (item2) => {
    if (item2) {
      const regExp = /\(([^)]+)\)/;
      const matches = item2 == null ? void 0 : item2.match(regExp);
      if (matches && matches[0].indexOf("|") > 0) {
        return [item2];
      }
      if (item2.indexOf("|") > 0) {
        return item2.split("|");
      }
      return [item2];
    }
    return [];
  };
  const labelValueSearch = debounce__default["default"](
    (query) => getLabelValuesAutofillSuggestions(query, item.label),
    debounceDuration
  );
  const itemValue = (_a = item == null ? void 0 : item.value) != null ? _a : "";
  return /* @__PURE__ */ React__default["default"].createElement("div", { key: itemValue, "data-testid": "prometheus-dimensions-filter-item" }, /* @__PURE__ */ React__default["default"].createElement(experimental.InputGroup, null, /* @__PURE__ */ React__default["default"].createElement(
    ui.Select,
    {
      placeholder: "Select label",
      "data-testid": selectors.components.QueryBuilder.labelSelect,
      inputId: "prometheus-dimensions-filter-item-key",
      width: "auto",
      value: item.label ? data.toOption(item.label) : null,
      allowCustomValue: true,
      onOpenMenu: async () => {
        setState({ isLoadingLabelNames: true });
        const labelNames = await onGetLabelNames(item);
        setLabelNamesMenuOpen(true);
        setState({ labelNames, isLoadingLabelNames: void 0 });
      },
      onCloseMenu: () => {
        setLabelNamesMenuOpen(false);
      },
      isOpen: labelNamesMenuOpen,
      isLoading: (_b = state.isLoadingLabelNames) != null ? _b : false,
      options: state.labelNames,
      onChange: (change) => {
        var _a2;
        if (change.label) {
          onChange(__spreadProps$k(__spreadValues$o({}, item), {
            op: (_a2 = item.op) != null ? _a2 : defaultOp,
            label: change.label
            // eslint-ignore
          }));
        }
      },
      invalid: invalidLabel
    }
  ), /* @__PURE__ */ React__default["default"].createElement(
    ui.Select,
    {
      "data-testid": selectors.components.QueryBuilder.matchOperatorSelect,
      className: "query-segment-operator",
      value: data.toOption((_c = item.op) != null ? _c : defaultOp),
      options: operators$2,
      width: "auto",
      onChange: (change) => {
        if (change.value != null) {
          onChange(__spreadProps$k(__spreadValues$o({}, item), {
            op: change.value,
            value: isMultiSelect(change.value) ? item.value : getSelectOptionsFromString(item == null ? void 0 : item.value)[0]
            // eslint-ignore
          }));
        }
      }
    }
  ), /* @__PURE__ */ React__default["default"].createElement(
    ui.AsyncSelect,
    {
      placeholder: "Select value",
      "data-testid": selectors.components.QueryBuilder.valueSelect,
      inputId: "prometheus-dimensions-filter-item-value",
      width: "auto",
      value: isMultiSelect() ? getSelectOptionsFromString(itemValue).map(data.toOption) : getSelectOptionsFromString(itemValue).map(data.toOption)[0],
      allowCustomValue: true,
      formatCreateLabel: (input) => input,
      createOptionPosition: ((_d = item.op) == null ? void 0 : _d.includes("~")) ? "first" : "last",
      onOpenMenu: async () => {
        setState({ isLoadingLabelValues: true });
        const labelValues = await onGetLabelValues(item);
        truncateResult(labelValues);
        setLabelValuesMenuOpen(true);
        setState(__spreadProps$k(__spreadValues$o({}, state), {
          labelValues,
          isLoadingLabelValues: void 0
        }));
      },
      onCloseMenu: () => {
        setLabelValuesMenuOpen(false);
      },
      isOpen: labelValuesMenuOpen,
      defaultOptions: state.labelValues,
      isMulti: isMultiSelect(),
      isLoading: state.isLoadingLabelValues,
      loadOptions: labelValueSearch,
      onChange: (change) => {
        var _a2, _b2;
        if (change.value) {
          onChange(__spreadProps$k(__spreadValues$o({}, item), {
            value: change.value,
            op: (_a2 = item.op) != null ? _a2 : defaultOp
            // eslint-ignore
          }));
        } else {
          const changes = change.map((change2) => {
            return change2.label;
          }).join("|");
          onChange(__spreadProps$k(__spreadValues$o({}, item), { value: changes, op: (_b2 = item.op) != null ? _b2 : defaultOp }));
        }
      },
      invalid: invalidValue
    }
  ), /* @__PURE__ */ React__default["default"].createElement(experimental.AccessoryButton, { "aria-label": `remove-${item.label}`, icon: "times", variant: "secondary", onClick: onDelete })));
}
const operators$2 = [
  { label: "=", value: "=", isMultiValue: false },
  { label: "!=", value: "!=", isMultiValue: false },
  { label: "=~", value: "=~", isMultiValue: true },
  { label: "!~", value: "!~", isMultiValue: true }
];

const MISSING_LABEL_FILTER_ERROR_MESSAGE = "Select at least 1 label filter (label and value)";
function LabelFilters({
  labelsFilters,
  onChange,
  onGetLabelNames,
  onGetLabelValues,
  labelFilterRequired,
  getLabelValuesAutofillSuggestions,
  debounceDuration,
  variableEditor
}) {
  const defaultOp = "=";
  const [items, setItems] = React.useState([{ op: defaultOp }]);
  React.useEffect(() => {
    if (labelsFilters.length > 0) {
      setItems(labelsFilters);
    } else {
      setItems([{ op: defaultOp }]);
    }
  }, [labelsFilters]);
  const onLabelsChange = (newItems) => {
    setItems(newItems);
    const newLabels = newItems.filter((x) => x.label != null && x.value != null);
    if (!lodash.isEqual(newLabels, labelsFilters)) {
      onChange(newLabels);
    }
  };
  const hasLabelFilter = items.some((item) => item.label && item.value);
  const editorList = () => {
    return /* @__PURE__ */ React__default["default"].createElement(
      experimental.EditorList,
      {
        items,
        onChange: onLabelsChange,
        renderItem: (item, onChangeItem, onDelete) => /* @__PURE__ */ React__default["default"].createElement(
          LabelFilterItem,
          {
            debounceDuration,
            item,
            defaultOp,
            onChange: onChangeItem,
            onDelete,
            onGetLabelNames,
            onGetLabelValues,
            invalidLabel: labelFilterRequired && !item.label,
            invalidValue: labelFilterRequired && !item.value,
            getLabelValuesAutofillSuggestions
          }
        )
      }
    );
  };
  return /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, variableEditor ? /* @__PURE__ */ React__default["default"].createElement(ui.InlineFieldRow, null, /* @__PURE__ */ React__default["default"].createElement(
    "div",
    {
      className: css.cx(
        css.css({
          display: "flex"
        })
      )
    },
    /* @__PURE__ */ React__default["default"].createElement(
      ui.InlineLabel,
      {
        width: 20,
        tooltip: /* @__PURE__ */ React__default["default"].createElement("div", null, "Optional: used to filter the metric select for this query type.")
      },
      "Label filters"
    ),
    editorList()
  )) : /* @__PURE__ */ React__default["default"].createElement(experimental.EditorFieldGroup, null, /* @__PURE__ */ React__default["default"].createElement(
    experimental.EditorField,
    {
      label: "Label filters",
      error: MISSING_LABEL_FILTER_ERROR_MESSAGE,
      invalid: labelFilterRequired && !hasLabelFilter
    },
    editorList()
  )));
}

var __defProp$o = Object.defineProperty;
var __defProps$j = Object.defineProperties;
var __getOwnPropDescs$j = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$o = Object.getOwnPropertySymbols;
var __hasOwnProp$o = Object.prototype.hasOwnProperty;
var __propIsEnum$o = Object.prototype.propertyIsEnumerable;
var __defNormalProp$o = (obj, key, value) => key in obj ? __defProp$o(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$n = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$o.call(b, prop))
      __defNormalProp$o(a, prop, b[prop]);
  if (__getOwnPropSymbols$o)
    for (var prop of __getOwnPropSymbols$o(b)) {
      if (__propIsEnum$o.call(b, prop))
        __defNormalProp$o(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$j = (a, b) => __defProps$j(a, __getOwnPropDescs$j(b));
function MetricsLabelsSection({
  datasource,
  query,
  onChange,
  onBlur,
  variableEditor
}) {
  const onChangeLabels = (labels) => {
    onChange(__spreadProps$j(__spreadValues$n({}, query), { labels }));
  };
  const withTemplateVariableOptions = React.useCallback(
    async (optionsPromise) => {
      const variables = datasource.getVariables();
      const options = await optionsPromise;
      return [
        ...variables.map((value) => ({ label: value, value })),
        ...options.map((option) => ({
          label: option.value,
          value: option.value,
          title: option.description
        }))
      ];
    },
    [datasource]
  );
  const onGetLabelNames = async (forLabel) => {
    if (!query.metric) {
      await datasource.languageProvider.fetchLabels();
      return datasource.languageProvider.getLabelKeys().map((k) => ({ value: k }));
    }
    const labelsToConsider = query.labels.filter((x) => x !== forLabel);
    labelsToConsider.push({ label: "__name__", op: "=", value: query.metric });
    const expr = promQueryModeller.renderLabels(labelsToConsider);
    let labelsIndex = await datasource.languageProvider.fetchLabelsWithMatch(expr);
    return Object.keys(labelsIndex).filter((labelName) => !labelsToConsider.find((filter) => filter.label === labelName)).map((k) => ({ value: k }));
  };
  const getLabelValuesAutocompleteSuggestions = (queryString, labelName) => {
    const forLabel = {
      label: labelName != null ? labelName : "__name__",
      op: "=~",
      value: regexifyLabelValuesQueryString(`.*${queryString}`)
    };
    const labelsToConsider = query.labels.filter((x) => x.label !== forLabel.label);
    labelsToConsider.push(forLabel);
    if (query.metric) {
      labelsToConsider.push({ label: "__name__", op: "=", value: query.metric });
    }
    const interpolatedLabelsToConsider = labelsToConsider.map((labelObject) => __spreadProps$j(__spreadValues$n({}, labelObject), {
      label: datasource.interpolateString(labelObject.label),
      value: datasource.interpolateString(labelObject.value)
    }));
    const expr = promQueryModeller.renderLabels(interpolatedLabelsToConsider);
    let response;
    if (datasource.hasLabelsMatchAPISupport()) {
      response = getLabelValuesFromLabelValuesAPI(forLabel, expr);
    } else {
      response = getLabelValuesFromSeriesAPI(forLabel, expr);
    }
    return response.then((response2) => {
      truncateResult(response2);
      return response2;
    });
  };
  const getLabelValuesFromSeriesAPI = (forLabel, promQLExpression) => {
    if (!forLabel.label) {
      return Promise.resolve([]);
    }
    const result = datasource.languageProvider.fetchSeries(promQLExpression);
    const forLabelInterpolated = datasource.interpolateString(forLabel.label);
    return result.then((result2) => {
      const set = /* @__PURE__ */ new Set();
      result2.forEach((labelValue) => {
        const labelNameString = labelValue[forLabelInterpolated];
        set.add(labelNameString);
      });
      return Array.from(set).map((labelValues) => ({ label: labelValues, value: labelValues }));
    });
  };
  const getLabelValuesFromLabelValuesAPI = (forLabel, promQLExpression) => {
    if (!forLabel.label) {
      return Promise.resolve([]);
    }
    const requestId = `[${datasource.uid}][${query.metric}][${forLabel.label}][${forLabel.op}]`;
    return datasource.languageProvider.fetchSeriesValuesWithMatch(forLabel.label, promQLExpression, requestId).then((response) => response.map((v) => ({ value: v, label: v })));
  };
  const onGetLabelValues = async (forLabel) => {
    if (!forLabel.label) {
      return [];
    }
    if (!query.metric) {
      return (await datasource.languageProvider.getLabelValues(forLabel.label)).map((v) => ({ value: v }));
    }
    const labelsToConsider = query.labels.filter((x) => x !== forLabel);
    labelsToConsider.push({ label: "__name__", op: "=", value: query.metric });
    const interpolatedLabelsToConsider = labelsToConsider.map((labelObject) => __spreadProps$j(__spreadValues$n({}, labelObject), {
      label: datasource.interpolateString(labelObject.label),
      value: datasource.interpolateString(labelObject.value)
    }));
    const expr = promQueryModeller.renderLabels(interpolatedLabelsToConsider);
    if (datasource.hasLabelsMatchAPISupport()) {
      return getLabelValuesFromLabelValuesAPI(forLabel, expr);
    } else {
      return getLabelValuesFromSeriesAPI(forLabel, expr);
    }
  };
  const onGetMetrics = React.useCallback(() => {
    return withTemplateVariableOptions(getMetrics(datasource, query));
  }, [datasource, query, withTemplateVariableOptions]);
  return /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, /* @__PURE__ */ React__default["default"].createElement(
    MetricSelect,
    {
      query,
      onChange,
      onGetMetrics,
      datasource,
      labelsFilters: query.labels,
      metricLookupDisabled: datasource.lookupsDisabled,
      onBlur: onBlur ? onBlur : () => {
      },
      variableEditor
    }
  ), /* @__PURE__ */ React__default["default"].createElement(
    LabelFilters,
    {
      debounceDuration: datasource.getDebounceTimeInMilliseconds(),
      getLabelValuesAutofillSuggestions: getLabelValuesAutocompleteSuggestions,
      labelsFilters: query.labels,
      onChange: onChangeLabels,
      onGetLabelNames: (forLabel) => withTemplateVariableOptions(onGetLabelNames(forLabel)),
      onGetLabelValues: (forLabel) => withTemplateVariableOptions(onGetLabelValues(forLabel)),
      variableEditor
    }
  ));
}
async function getMetrics(datasource, query) {
  var _a, _b;
  if (!datasource.languageProvider.metricsMetadata) {
    await datasource.languageProvider.loadMetricsMetadata();
  }
  if (!datasource.languageProvider.metricsMetadata) {
    datasource.languageProvider.metricsMetadata = {};
  }
  let metrics;
  if (query.labels.length > 0) {
    const expr = promQueryModeller.renderLabels(query.labels);
    metrics = (_a = (await datasource.languageProvider.getSeries(expr, true))["__name__"]) != null ? _a : [];
  } else {
    metrics = (_b = await datasource.languageProvider.getLabelValues("__name__")) != null ? _b : [];
  }
  return metrics.map((m) => ({
    value: m,
    description: getMetadataString(m, datasource.languageProvider.metricsMetadata)
  }));
}

var __defProp$n = Object.defineProperty;
var __defProps$i = Object.defineProperties;
var __getOwnPropDescs$i = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$n = Object.getOwnPropertySymbols;
var __hasOwnProp$n = Object.prototype.hasOwnProperty;
var __propIsEnum$n = Object.prototype.propertyIsEnumerable;
var __defNormalProp$n = (obj, key, value) => key in obj ? __defProp$n(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$m = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$n.call(b, prop))
      __defNormalProp$n(a, prop, b[prop]);
  if (__getOwnPropSymbols$n)
    for (var prop of __getOwnPropSymbols$n(b)) {
      if (__propIsEnum$n.call(b, prop))
        __defNormalProp$n(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$i = (a, b) => __defProps$i(a, __getOwnPropDescs$i(b));
const NestedQuery = React__default["default"].memo((props) => {
  const { nestedQuery, index, datasource, onChange, onRemove, onRunQuery, showExplain } = props;
  const styles = ui.useStyles2(getStyles$6);
  return /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.card }, /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.header }, /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.name }, "Operator"), /* @__PURE__ */ React__default["default"].createElement(
    ui.Select,
    {
      width: "auto",
      options: operators$1,
      value: data.toOption(nestedQuery.operator),
      onChange: (value) => {
        onChange(index, __spreadProps$i(__spreadValues$m({}, nestedQuery), {
          operator: value.value
        }));
      }
    }
  ), /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.name }, "Vector matches"), /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.vectorMatchWrapper }, /* @__PURE__ */ React__default["default"].createElement(
    ui.Select,
    {
      width: "auto",
      value: nestedQuery.vectorMatchesType || "on",
      allowCustomValue: true,
      options: [
        { value: "on", label: "on" },
        { value: "ignoring", label: "ignoring" }
      ],
      onChange: (val) => {
        onChange(index, __spreadProps$i(__spreadValues$m({}, nestedQuery), {
          vectorMatchesType: val.value
        }));
      }
    }
  ), /* @__PURE__ */ React__default["default"].createElement(
    ui.AutoSizeInput,
    {
      className: styles.vectorMatchInput,
      minWidth: 20,
      defaultValue: nestedQuery.vectorMatches,
      onCommitChange: (evt) => {
        onChange(index, __spreadProps$i(__spreadValues$m({}, nestedQuery), {
          vectorMatches: evt.currentTarget.value,
          vectorMatchesType: nestedQuery.vectorMatchesType || "on"
        }));
      }
    }
  )), /* @__PURE__ */ React__default["default"].createElement(experimental.FlexItem, { grow: 1 }), /* @__PURE__ */ React__default["default"].createElement(ui.IconButton, { name: "times", size: "sm", onClick: () => onRemove(index), tooltip: "Remove match" })), /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.body }, /* @__PURE__ */ React__default["default"].createElement(experimental.EditorRows, null, /* @__PURE__ */ React__default["default"].createElement(
    PromQueryBuilder,
    {
      showExplain,
      query: nestedQuery.query,
      datasource,
      onRunQuery,
      onChange: (update) => {
        onChange(index, __spreadProps$i(__spreadValues$m({}, nestedQuery), { query: update }));
      }
    }
  ))));
});
const operators$1 = binaryScalarDefs.map((def) => ({ label: def.sign, value: def.sign }));
NestedQuery.displayName = "NestedQuery";
const getStyles$6 = (theme) => {
  return {
    card: css.css({
      label: "card",
      display: "flex",
      flexDirection: "column",
      gap: theme.spacing(0.5)
    }),
    header: css.css({
      label: "header",
      padding: theme.spacing(0.5, 0.5, 0.5, 1),
      gap: theme.spacing(1),
      display: "flex",
      alignItems: "center"
    }),
    name: css.css({
      label: "name",
      whiteSpace: "nowrap"
    }),
    body: css.css({
      label: "body",
      paddingLeft: theme.spacing(2)
    }),
    vectorMatchInput: css.css({
      label: "vectorMatchInput",
      marginLeft: -1
    }),
    vectorMatchWrapper: css.css({
      label: "vectorMatchWrapper",
      display: "flex"
    })
  };
};

var __defProp$m = Object.defineProperty;
var __defProps$h = Object.defineProperties;
var __getOwnPropDescs$h = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$m = Object.getOwnPropertySymbols;
var __hasOwnProp$m = Object.prototype.hasOwnProperty;
var __propIsEnum$m = Object.prototype.propertyIsEnumerable;
var __defNormalProp$m = (obj, key, value) => key in obj ? __defProp$m(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$l = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$m.call(b, prop))
      __defNormalProp$m(a, prop, b[prop]);
  if (__getOwnPropSymbols$m)
    for (var prop of __getOwnPropSymbols$m(b)) {
      if (__propIsEnum$m.call(b, prop))
        __defNormalProp$m(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$h = (a, b) => __defProps$h(a, __getOwnPropDescs$h(b));
function NestedQueryList(props) {
  var _a;
  const { query, datasource, onChange, onRunQuery, showExplain } = props;
  const nestedQueries = (_a = query.binaryQueries) != null ? _a : [];
  const onNestedQueryUpdate = (index, update) => {
    const updatedList = [...nestedQueries];
    updatedList.splice(index, 1, update);
    onChange(__spreadProps$h(__spreadValues$l({}, query), { binaryQueries: updatedList }));
  };
  const onRemove = (index) => {
    const updatedList = [...nestedQueries.slice(0, index), ...nestedQueries.slice(index + 1)];
    onChange(__spreadProps$h(__spreadValues$l({}, query), { binaryQueries: updatedList }));
  };
  return /* @__PURE__ */ React__default["default"].createElement(ui.Stack, { direction: "column", gap: 1 }, nestedQueries.map((nestedQuery, index) => /* @__PURE__ */ React__default["default"].createElement(
    NestedQuery,
    {
      key: index.toString(),
      nestedQuery,
      index,
      onChange: onNestedQueryUpdate,
      datasource,
      onRemove,
      onRunQuery,
      showExplain
    }
  )));
}

const EXPLAIN_LABEL_FILTER_CONTENT = "Fetch all series matching metric name and label filters.";
const PromQueryBuilderExplained = React__default["default"].memo(({ query }) => {
  const visQuery = buildVisualQueryFromString(query || "").query;
  const lang = { grammar: promqlGrammar, name: "promql" };
  return /* @__PURE__ */ React__default["default"].createElement(ui.Stack, { gap: 0.5, direction: "column" }, /* @__PURE__ */ React__default["default"].createElement(
    OperationExplainedBox,
    {
      stepNumber: 1,
      title: /* @__PURE__ */ React__default["default"].createElement(RawQuery, { query: `${visQuery.metric} ${promQueryModeller.renderLabels(visQuery.labels)}`, lang })
    },
    EXPLAIN_LABEL_FILTER_CONTENT
  ), /* @__PURE__ */ React__default["default"].createElement(
    OperationListExplained,
    {
      stepNumber: 2,
      queryModeller: promQueryModeller,
      query: visQuery,
      lang
    }
  ));
});
PromQueryBuilderExplained.displayName = "PromQueryBuilderExplained";

var __defProp$l = Object.defineProperty;
var __defProps$g = Object.defineProperties;
var __getOwnPropDescs$g = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$l = Object.getOwnPropertySymbols;
var __hasOwnProp$l = Object.prototype.hasOwnProperty;
var __propIsEnum$l = Object.prototype.propertyIsEnumerable;
var __defNormalProp$l = (obj, key, value) => key in obj ? __defProp$l(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$k = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$l.call(b, prop))
      __defNormalProp$l(a, prop, b[prop]);
  if (__getOwnPropSymbols$l)
    for (var prop of __getOwnPropSymbols$l(b)) {
      if (__propIsEnum$l.call(b, prop))
        __defNormalProp$l(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$g = (a, b) => __defProps$g(a, __getOwnPropDescs$g(b));
const suggestionOptions = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" }
];
const explationOptions = [
  { label: "Too vague", value: "too vague" },
  { label: "Too technical", value: "too technical" },
  { label: "Inaccurate", value: "inaccurate" },
  { label: "Other", value: "other" }
];
function QuerySuggestionItem(props) {
  const { querySuggestion, order, queryExplain, historical, onChange, closeDrawer, last, allSuggestions, prompt } = props;
  const [showExp, updShowExp] = React.useState(false);
  const [gaveExplanationFeedback, updateGaveExplanationFeedback] = React.useState(false);
  const [gaveSuggestionFeedback, updateGaveSuggestionFeedback] = React.useState(false);
  const [suggestionFeedback, setSuggestionFeedback] = React.useState({
    radioInput: "",
    text: ""
  });
  const [explanationFeedback, setExplanationFeedback] = React.useState({
    radioInput: "",
    text: ""
  });
  const theme = ui.useTheme2();
  const styles = getStyles$5(theme);
  const { query, explanation } = querySuggestion;
  const feedbackToggleTip = (type) => {
    const updateRadioFeedback = (value) => {
      if (type === "explanation") {
        setExplanationFeedback(__spreadProps$g(__spreadValues$k({}, explanationFeedback), {
          radioInput: value
        }));
      } else {
        setSuggestionFeedback(__spreadProps$g(__spreadValues$k({}, suggestionFeedback), {
          radioInput: value
        }));
      }
    };
    const updateTextFeedback = (e) => {
      if (type === "explanation") {
        setExplanationFeedback(__spreadProps$g(__spreadValues$k({}, explanationFeedback), {
          text: e.currentTarget.value
        }));
      } else {
        setSuggestionFeedback(__spreadProps$g(__spreadValues$k({}, suggestionFeedback), {
          text: e.currentTarget.value
        }));
      }
    };
    const disabledButton = () => type === "explanation" ? !explanationFeedback.radioInput : !suggestionFeedback.radioInput;
    const questionOne = type === "explanation" ? "Why was the explanation not helpful?" : "Were the query suggestions helpful?";
    return /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.suggestionFeedback }, /* @__PURE__ */ React__default["default"].createElement("div", null, /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.feedbackQuestion }, /* @__PURE__ */ React__default["default"].createElement("h6", null, questionOne), /* @__PURE__ */ React__default["default"].createElement("i", null, "(Required)")), /* @__PURE__ */ React__default["default"].createElement(
      ui.RadioButtonList,
      {
        name: "default",
        options: type === "explanation" ? explationOptions : suggestionOptions,
        value: type === "explanation" ? explanationFeedback.radioInput : suggestionFeedback.radioInput,
        onChange: updateRadioFeedback
      }
    )), /* @__PURE__ */ React__default["default"].createElement("div", { className: css.cx(type === "explanation" && styles.explationTextInput) }, type !== "explanation" && /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.feedbackQuestion }, /* @__PURE__ */ React__default["default"].createElement("h6", null, "How can we improve the query suggestions?")), /* @__PURE__ */ React__default["default"].createElement(
      ui.TextArea,
      {
        type: "text",
        "aria-label": "Promqail suggestion text",
        placeholder: "Enter your feedback",
        value: type === "explanation" ? explanationFeedback.text : suggestionFeedback.text,
        onChange: updateTextFeedback,
        cols: 100
      }
    )), /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.submitFeedback }, /* @__PURE__ */ React__default["default"].createElement(
      ui.Button,
      {
        variant: "primary",
        size: "sm",
        disabled: disabledButton(),
        onClick: () => {
          if (type === "explanation") {
            explanationFeedbackEvent(
              explanationFeedback.radioInput,
              explanationFeedback.text,
              querySuggestion,
              historical,
              prompt
            );
            updateGaveExplanationFeedback(true);
          } else {
            suggestionFeedbackEvent(
              suggestionFeedback.radioInput,
              suggestionFeedback.text,
              allSuggestions != null ? allSuggestions : "",
              historical,
              prompt
            );
            updateGaveSuggestionFeedback(true);
          }
        }
      },
      "Submit"
    )));
  };
  return /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.querySuggestion }, /* @__PURE__ */ React__default["default"].createElement("div", { title: query, className: css.cx(styles.codeText, styles.longCode) }, `${order}.  ${query}`), /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.useButton }, /* @__PURE__ */ React__default["default"].createElement(
    ui.Button,
    {
      variant: "primary",
      size: "sm",
      onClick: () => {
        runtime.reportInteraction("grafana_prometheus_promqail_use_query_button_clicked", {
          query: querySuggestion.query
        });
        const pvq = buildVisualQueryFromString(querySuggestion.query);
        onChange(pvq.query);
        closeDrawer();
      }
    },
    "Use"
  ))), /* @__PURE__ */ React__default["default"].createElement("div", null, /* @__PURE__ */ React__default["default"].createElement(
    ui.Button,
    {
      fill: "text",
      variant: "secondary",
      icon: showExp ? "angle-up" : "angle-down",
      onClick: () => {
        updShowExp(!showExp);
        queryExplain(order - 1);
      },
      className: css.cx(styles.bodySmall),
      size: "sm"
    },
    "Explainer"
  ), !showExp && order !== 5 && /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.textPadding }), showExp && !querySuggestion.explanation && /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.center }, /* @__PURE__ */ React__default["default"].createElement(ui.Spinner, null)), showExp && querySuggestion.explanation && /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, /* @__PURE__ */ React__default["default"].createElement("div", { className: css.cx(styles.bodySmall, styles.explainPadding) }, /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.textPadding }, "This query is trying to answer the question:"), /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.textPadding }, explanation), /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.textPadding }, "Learn more with this", " ", /* @__PURE__ */ React__default["default"].createElement(
    "a",
    {
      className: styles.doc,
      href: "https://prometheus.io/docs/prometheus/latest/querying/examples/#query-examples",
      target: "_blank",
      rel: "noopener noreferrer"
    },
    "Prometheus doc"
  )), /* @__PURE__ */ React__default["default"].createElement("div", { className: css.cx(styles.rightButtons, styles.secondaryText) }, "Was this explanation helpful?", /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.floatRight }, !gaveExplanationFeedback ? /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, /* @__PURE__ */ React__default["default"].createElement(
    ui.Button,
    {
      fill: "outline",
      variant: "secondary",
      size: "sm",
      className: styles.leftButton,
      onClick: () => {
        explanationFeedbackEvent("Yes", "", querySuggestion, historical, prompt);
        updateGaveExplanationFeedback(true);
      }
    },
    "Yes"
  ), /* @__PURE__ */ React__default["default"].createElement(
    ui.Toggletip,
    {
      "aria-label": "Suggestion feedback",
      content: feedbackToggleTip("explanation"),
      placement: "bottom-end",
      closeButton: true
    },
    /* @__PURE__ */ React__default["default"].createElement(ui.Button, { fill: "outline", variant: "secondary", size: "sm" }, "No")
  )) : "Thank you for your feedback!"))), !last && /* @__PURE__ */ React__default["default"].createElement("hr", null)), last && /* @__PURE__ */ React__default["default"].createElement("div", { className: css.cx(styles.feedbackStyle) }, !gaveSuggestionFeedback ? /* @__PURE__ */ React__default["default"].createElement(
    ui.Toggletip,
    {
      "aria-label": "Suggestion feedback",
      content: feedbackToggleTip("suggestion"),
      placement: "bottom-end",
      closeButton: true
    },
    /* @__PURE__ */ React__default["default"].createElement(ui.Button, { fill: "outline", variant: "secondary", size: "sm" }, "Give feedback on suggestions")
  ) : (
    // do this weird thing because the toggle tip doesn't allow an extra close function
    /* @__PURE__ */ React__default["default"].createElement(ui.Button, { fill: "outline", variant: "secondary", size: "sm", disabled: true }, "Thank you for your feedback!")
  ))));
}
function explanationFeedbackEvent(radioInputFeedback, textFeedback, querySuggestion, historical, prompt) {
  const event = "grafana_prometheus_promqail_explanation_feedback";
  runtime.reportInteraction(event, {
    helpful: radioInputFeedback,
    textFeedback,
    suggestionType: historical ? "historical" : "AI",
    query: querySuggestion.query,
    explanation: querySuggestion.explanation,
    prompt
  });
}
function suggestionFeedbackEvent(radioInputFeedback, textFeedback, allSuggestions, historical, prompt) {
  const event = "grafana_prometheus_promqail_suggestion_feedback";
  runtime.reportInteraction(event, {
    helpful: radioInputFeedback,
    textFeedback,
    suggestionType: historical ? "historical" : "AI",
    allSuggestions,
    prompt
  });
}

var SuggestionType = /* @__PURE__ */ ((SuggestionType2) => {
  SuggestionType2["Historical"] = "historical";
  SuggestionType2["AI"] = "AI";
  return SuggestionType2;
})(SuggestionType || {});

function QuerySuggestionContainer(props) {
  const { suggestionType, querySuggestions, closeDrawer, nextInteraction, queryExplain, onChange, prompt } = props;
  const [hasNextInteraction, updateHasNextInteraction] = React.useState(false);
  const theme = ui.useTheme2();
  const styles = getStyles$5(theme);
  let text, secondaryText, refineText;
  if (suggestionType === SuggestionType.Historical) {
    text = `Here are ${querySuggestions.length} query suggestions:`;
    refineText = "I want to write a prompt";
  } else if (suggestionType === SuggestionType.AI) {
    text = text = "Here is your query suggestion:";
    secondaryText = "This query is based off of natural language descriptions of the most commonly used PromQL queries.";
    refineText = "Refine prompt";
  }
  return /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, suggestionType === SuggestionType.Historical ? /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.bottomMargin }, text) : /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.textPadding }, text), /* @__PURE__ */ React__default["default"].createElement("div", { className: css.cx(styles.secondaryText, styles.bottomMargin) }, secondaryText)), /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.infoContainerWrapper }, /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.infoContainer }, querySuggestions.map((qs, idx) => {
    return /* @__PURE__ */ React__default["default"].createElement(
      QuerySuggestionItem,
      {
        historical: suggestionType === SuggestionType.Historical,
        querySuggestion: qs,
        key: idx,
        order: idx + 1,
        queryExplain,
        onChange,
        closeDrawer,
        last: idx === querySuggestions.length - 1,
        allSuggestions: querySuggestions.reduce((acc, qs2) => {
          return acc + "$$" + qs2.query;
        }, ""),
        prompt: prompt != null ? prompt : ""
      }
    );
  }))), !hasNextInteraction && /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.nextInteractionHeight }, /* @__PURE__ */ React__default["default"].createElement("div", { className: css.cx(styles.afterButtons, styles.textPadding) }, /* @__PURE__ */ React__default["default"].createElement(
    ui.Button,
    {
      onClick: () => {
        updateHasNextInteraction(true);
        nextInteraction();
      },
      "data-testid": queryAssistanttestIds.refinePrompt,
      fill: "outline",
      variant: "secondary",
      size: "md"
    },
    refineText
  )), /* @__PURE__ */ React__default["default"].createElement("div", { className: css.cx(styles.textPadding, styles.floatRight) }, /* @__PURE__ */ React__default["default"].createElement(ui.Button, { fill: "outline", variant: "secondary", size: "md", onClick: closeDrawer }, "Cancel"))));
}

var img = "data:image/svg+xml,%3csvg width='26' height='27' viewBox='0 0 26 27' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M0 9.5C0 4.52944 4.02944 0.5 9 0.5H17C21.9706 0.5 26 4.52944 26 9.5V15.5C26 20.4706 21.9706 24.5 17 24.5H0V9.5Z' fill='url(%23paint0_linear_68_17626)'/%3e%3cpath d='M8.91193 18.7053C7.14915 18.7053 5.77876 17.7031 5.77876 15.88C5.77876 13.7731 7.57777 13.3143 9.33452 13.109C11.0007 12.9158 11.6768 12.9279 11.6768 12.2699V12.2276C11.6768 11.1772 11.0792 10.5675 9.91406 10.5675C8.70064 10.5675 8.0245 11.2013 7.75888 11.8594L6.0625 11.473C6.66619 9.78267 8.21165 9.10653 9.88992 9.10653C11.3629 9.10653 13.4879 9.64382 13.4879 12.3423V18.5H11.7251V17.2322H11.6527C11.3086 17.9265 10.4453 18.7053 8.91193 18.7053ZM9.30433 17.2564C10.8075 17.2564 11.6829 16.2543 11.6829 15.1555V13.9602C11.4233 14.2198 10.0348 14.3768 9.44922 14.4553C8.40483 14.5941 7.54759 14.9382 7.54759 15.9041C7.54759 16.7976 8.28409 17.2564 9.30433 17.2564ZM15.8921 18.5V9.22727H17.6972V18.5H15.8921ZM16.8037 7.79652C16.1759 7.79652 15.6627 7.31357 15.6627 6.72195C15.6627 6.13033 16.1759 5.64133 16.8037 5.64133C17.4255 5.64133 17.9447 6.13033 17.9447 6.72195C17.9447 7.31357 17.4255 7.79652 16.8037 7.79652Z' fill='white'/%3e%3cpath d='M0 24.5H3L0 26.5V24.5Z' fill='%235B5CC2'/%3e%3cdefs%3e%3clinearGradient id='paint0_linear_68_17626' x1='4.76666' y1='-5.1' x2='24.472' y2='5.4613' gradientUnits='userSpaceOnUse'%3e%3cstop offset='0.0333246' stop-color='%23965AFB'/%3e%3cstop offset='1' stop-color='%23096174'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e";
  var AI_Logo_color = img;

const ExplainSystemPrompt = `You are an expert in Prometheus, the event monitoring and alerting application.

You are given relevant PromQL documentation, a type and description for a Prometheus metric, and a PromQL query on that metric. Using the provided information for reference, please explain what the output of a given query is in 1 sentences. Do not walk through what the functions do separately, make your answer concise. 

Input will be in the form:


PromQL Documentation:
<PromQL documentation>

PromQL Metrics Metadata:
<metric_name>(<metric type of the metric queried>): <description of what the metric means>

PromQL Expression: 
<PromQL query>

Examples of input and output
----------
PromQL Documentation:
A counter is a cumulative metric that represents a single monotonically increasing counter whose value can only increase or be reset to zero on restart. For example, you can use a counter to represent the number of requests served, tasks completed, or errors.
topk (largest k elements by sample value)
sum (calculate sum over dimensions)
rate(v range-vector) calculates the per-second average rate of increase of the time series in the range vector. Breaks in monotonicity (such as counter resets due to target restarts) are automatically adjusted for. 

PromQL Metrics Metadata:
traces_exporter_sent_spans(counter): Number of spans successfully sent to destination.

PromQL Expression:
topk(3, sum by(cluster) (rate(traces_exporter_sent_spans{exporter="otlp"}[5m])))

This query is trying to answer the question:
What is the top 3 clusters that have successfully sent the most number of spans to the destination?
`;
function GetExplainUserPrompt({
  documentation,
  metricName,
  metricType,
  metricMetadata,
  query
}) {
  if (documentation === "") {
    documentation = "No documentation provided.";
  }
  if (metricMetadata === "") {
    metricMetadata = "No description provided.";
  }
  return `
        PromQL Documentation: 
        ${documentation}

        PromQL Metrics Metadata:
        ${metricName}(${metricType}): ${metricMetadata}

        PromQL Expression: 
        ${query}

        This query is trying to answer the question:
    `;
}
const SuggestSystemPrompt = `You are a Prometheus Query Language (PromQL) expert assistant inside Grafana.
When the user asks a question, respond with a valid PromQL query and only the query.

To help you answer the question, you will receive:
- List of potentially relevant PromQL templates with descriptions, ranked by semantic search score
- Prometheus metric
- Metric type
- Available Prometheus metric labels
- User question

Policy:
- Do not invent labels names, you can only use the available labels
- For rate queries, use the $__rate_interval variable`;
function GetSuggestUserPrompt({
  promql,
  question,
  metricType,
  labels,
  templates
}) {
  if (templates === "") {
    templates = "No templates provided.";
  } else {
    templates = templates.replace(/\n/g, "\n  ");
  }
  return `Relevant PromQL templates:
  ${templates}
  
  Prometheus metric: ${promql}
  Metric type: ${metricType}
  Available Prometheus metric labels: ${labels}
  User question: ${question}
  
  \`\`\`promql`;
}

function initialState$1(query, showStartingMessage) {
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

const generalTemplates = [
  {
    template: "metric_a{}",
    description: 'Get the data for "metric_a"'
  },
  {
    template: "avg by(c) (metric_a{})",
    description: 'Average of all series in "metric_a" grouped by the label "c"'
  },
  {
    template: "count by(d) (metric_a{})",
    description: 'Number of series in the metric "metric_a" grouped by the label "d"'
  },
  {
    template: "sum by(g) (sum_over_time(metric_a{}[1h]))",
    description: 'For each series in the metric "metric_a", sum all values over 1 hour, then group those series by label "g" and sum.'
  },
  {
    template: "count(metric_a{})",
    description: 'Count of series in the metric "metric_a"'
  },
  {
    template: "(metric_a{})",
    description: 'Get the data for "metric_a"'
  },
  {
    template: "count_over_time(metric_a{}[1h])",
    description: "Number of series of metric_a in a 1 hour interval"
  },
  {
    template: "changes(metric_a{}[1m])",
    description: "Number of times the values of each series in metric_a have changed in 1 minute periods"
  },
  {
    template: "count(count by(g) (metric_a{}))",
    description: "Total number of series in metric_a"
  },
  {
    template: "last_over_time(metric_a{}[1h])",
    description: "For each series in metric_a, get the last value in the 1 hour period."
  },
  {
    template: "sum by(g) (count_over_time(metric_a{}[1h]))",
    description: 'Grouped sum over the label "g" of the number of series of metric_a in a 1 hour period'
  },
  {
    template: "count(metric_a{} == 99)",
    description: "Number of series of metric_a that have value 99"
  },
  {
    template: "min(metric_a{})",
    description: 'At each timestamp, find the minimum of all series of the metric "metric_a"'
  },
  {
    template: "metric_a{} != 99",
    description: "Series of metric_a which do not have the value 99"
  },
  {
    template: "metric_a{} - 99",
    description: "metric_a minus 99"
  },
  {
    template: "quantile_over_time(0.99,metric_a{}[1h])",
    description: "The 99th quantile of values of metric_a in 1 hour"
  },
  {
    template: 'count_values("aaaa",metric_a{})',
    description: 'Count number of label values for a label named "aaaa"'
  }
];
const counterTemplates = [
  {
    template: "sum by(d) (rate(metric_a{}[1h]))",
    description: 'Sum of the rate of increase or decrease of the metric "metric_a" per 1 hour period, grouped by the label "d"'
  },
  {
    template: "rate(metric_a{}[1m])",
    description: 'Rate of change of the metric "metric_a" over 1 minute'
  },
  {
    template: "sum by(a) (increase(metric_a{}[5m]))",
    description: 'Taking the metric "metric_a" find the increase in 5 minute periods of each series and aggregate sum over the label "a"'
  },
  {
    template: "sum(rate(metric_a{}[1m]))",
    description: 'Total rate of change of all series of metric "metric_a" in 1 minute intervals'
  },
  {
    template: "sum(increase(metric_a{}[10m]))",
    description: 'Total increase for each series of metric "metric_a" in 10 minute intervals'
  },
  {
    template: "increase(metric_a{}[1h])",
    description: 'Increase in all series of "metric_a" in 1 hour period'
  },
  {
    template: "sum by(d) (irate(metric_a{}[1h]))",
    description: 'Sum of detailed rate of change of the metric "metric_a" over 1 hour grouped by label "d"'
  },
  {
    template: "irate(metric_a{}[1h])",
    description: 'Detailed rate of change of the metric "metric_a" over 1 hour'
  },
  {
    template: "avg by(d) (rate(metric_a{}[1h]))",
    description: 'Taking the rate of change of the metric "metric_a" in a 1 hour period, group by the label "d" and find the average of each group'
  },
  {
    template: "topk(5,sum by(g) (rate(metric_a{}[1h])))",
    description: 'Top 5 of the summed groups "g" of the rate of change of metric_a'
  },
  {
    template: "sum(rate(metric_a{}[1h])) / sum(rate(metric_a{}[1h]))",
    description: "Relative sums of metric_a with different labels"
  },
  {
    template: "histogram_quantile(99,rate(metric_a{}[1h]))",
    description: "99th percentile of the rate of change of metric_a in 1 hour periods"
  },
  {
    template: "avg(rate(metric_a{}[1m]))",
    description: "Average of the rate of all series of metric_a in 1 minute periods"
  },
  {
    template: "rate(metric_a{}[5m]) > 99",
    description: "Show series of metric_a only if their rate over 5 minutes is greater than 99"
  },
  {
    template: "count by(g) (rate(metric_a{}[1h]))",
    description: 'Count of series of metric_a over all labels "g"'
  }
];
const histogramTemplates = [
  {
    template: "histogram_quantile(99,sum by(le) (rate(metric_a{}[1h])))",
    description: 'Calculate the rate at which the metric "metric_a" is increasing or decreasing, summed over each bucket label "le", and then calculates the 99th percentile of those rates.'
  },
  {
    template: "histogram_quantile(99,sum by(g) (metric_a{}))",
    description: '99th percentile of the sum of metric_a grouped by label "g"'
  },
  {
    template: "histogram_quantile(99,sum by(g) (irate(metric_a{}[1h])))",
    description: '99th percentile of the grouped by "g" sum of the rate of each series in metric_a in an hour'
  },
  {
    template: "histogram_quantile(99,metric_a{})",
    description: "99th percentile of metric_a"
  }
];
const gaugeTemplates = [
  {
    template: "sum by(c) (metric_a{})",
    description: 'Sum the metric "metric_a" by each value in label "c"'
  },
  {
    template: "sum(metric_a{})",
    description: 'Total sum of all the series of the metric named "metric_a"'
  },
  {
    template: "max by(dd) (metric_a{})",
    description: 'Grouping the series the metric "metric_a" by the label "dd", get the maximum value of each group'
  },
  {
    template: "max(metric_a{})",
    description: 'Maximum value of all series of the metric "metric_a" '
  },
  {
    template: "avg(metric_a{})",
    description: 'Average value of all the series of metric "metric_a"'
  },
  {
    template: "metric_a{} > 99",
    description: 'Show only the series of metric "metric_a" which currently have value greater than 99'
  },
  {
    template: "metric_a{} / 99",
    description: 'Values for "metric_a" all divided by 99'
  },
  {
    template: "metric_a{} == 99",
    description: "Show series of metric_a that have value 99"
  },
  {
    template: "sum_over_time(metric_a{}[1h])",
    description: "Sum each series of metric_a over 1 hour"
  },
  {
    template: "avg_over_time(metric_a{}[1h])",
    description: "Average of each series of metric_a in a 1 hour period"
  },
  {
    template: "sum(sum_over_time(metric_a{}[1h]))",
    description: "Sum of all values in all series in a 1 hour period"
  },
  {
    template: "delta(metric_a{}[1m])",
    description: 'Span or delta (maximum - minimum) of values of the metric "metric_a" in a 1 minute period. '
  },
  {
    template: "avg by(g) (avg_over_time(metric_a{}[1h]))",
    description: 'For 1 hour, take each series and find the average, then group by label "g" and find the average of each group'
  },
  {
    template: "max_over_time(metric_a{}[1h])",
    description: 'Maximum values of each series in metric "metric_a" in a 1 hour period'
  },
  {
    template: "metric_a{} * 99",
    description: "Values of metric_a multiplied by 99"
  },
  {
    template: "metric_a{} < 99",
    description: "Series of metric_a that have values less than 99"
  },
  {
    template: "max by() (max_over_time(metric_a{}[1h]))",
    description: "Find maximum value of all series in 1 hour periods"
  },
  {
    template: "topk(99,metric_a{})",
    description: "First 5 series of metric_a that have the highest values"
  },
  {
    template: "min by(g) (metric_a{})",
    description: 'Minimum values of the series of metric_a grouped by label "g"'
  },
  {
    template: "topk(10,sum by(g) (metric_a{}))",
    description: "Top 10 of the series of metric_a grouped and summed by the label 'g'"
  },
  {
    template: "avg(avg_over_time(metric_a{}[1h]))",
    description: "Average of all values inside a 1 hour period"
  },
  {
    template: "quantile by(h) (0.95,metric_a{})",
    description: 'Calculate 95th percentile of metric_a when aggregated by the label "h"'
  },
  {
    template: "avg by(g) (metric_a{} > 99)",
    description: 'Taking all series of metric_a with value greater than 99, group by label "g" and find the average of each group'
  },
  {
    template: "sum(metric_a{}) / 99",
    description: "Sum of all series of metric_a divided by 99"
  },
  {
    template: "count(sum by(g) (metric_a{}))",
    description: 'Number of series of metric_a grouped by the label "g"'
  },
  {
    template: "max(max_over_time(metric_a{}[1h]))",
    description: "Find the max value of all series of metric_a in a 1 hour period"
  }
];
function processTemplate(templateData, metric, labels) {
  return {
    query: templateData.template.replace("metric_a", metric).replace("{}", labels),
    explanation: templateData.description.replace("metric_a", metric)
  };
}
function getTemplateSuggestions(metricName, metricType, labels) {
  let templateSuggestions = [];
  switch (metricType) {
    case "counter":
      templateSuggestions = templateSuggestions.concat(
        counterTemplates.map((t) => processTemplate(t, metricName, labels)).sort(() => Math.random() - 0.5).slice(0, 2)
      );
      templateSuggestions = templateSuggestions.concat(
        generalTemplates.map((t) => processTemplate(t, metricName, labels)).sort(() => Math.random() - 0.5).slice(0, 3)
      );
      break;
    case "gauge":
      templateSuggestions = templateSuggestions.concat(
        gaugeTemplates.map((t) => processTemplate(t, metricName, labels)).sort(() => Math.random() - 0.5).slice(0, 2)
      );
      templateSuggestions = templateSuggestions.concat(
        generalTemplates.map((t) => processTemplate(t, metricName, labels)).sort(() => Math.random() - 0.5).slice(0, 3)
      );
      break;
    case "histogram":
      templateSuggestions = templateSuggestions.concat(
        histogramTemplates.map((t) => processTemplate(t, metricName, labels)).sort(() => Math.random() - 0.5).slice(0, 2)
      );
      templateSuggestions = templateSuggestions.concat(
        generalTemplates.map((t) => processTemplate(t, metricName, labels)).sort(() => Math.random() - 0.5).slice(0, 3)
      );
      break;
    default:
      templateSuggestions = templateSuggestions.concat(
        generalTemplates.map((t) => processTemplate(t, metricName, labels)).sort(() => Math.random() - 0.5).slice(0, 5)
      );
      break;
  }
  return templateSuggestions;
}

var __defProp$k = Object.defineProperty;
var __defProps$f = Object.defineProperties;
var __getOwnPropDescs$f = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$k = Object.getOwnPropertySymbols;
var __hasOwnProp$k = Object.prototype.hasOwnProperty;
var __propIsEnum$k = Object.prototype.propertyIsEnumerable;
var __defNormalProp$k = (obj, key, value) => key in obj ? __defProp$k(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$j = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$k.call(b, prop))
      __defNormalProp$k(a, prop, b[prop]);
  if (__getOwnPropSymbols$k)
    for (var prop of __getOwnPropSymbols$k(b)) {
      if (__propIsEnum$k.call(b, prop))
        __defNormalProp$k(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$f = (a, b) => __defProps$f(a, __getOwnPropDescs$f(b));
const OPENAI_MODEL_NAME = "gpt-3.5-turbo-1106";
const promQLTemplatesCollection = "grafana.promql.templates";
function getExplainMessage(query, metric, datasource) {
  var _a, _b;
  let metricMetadata = "";
  let metricType = "";
  const pvq = buildVisualQueryFromString(query);
  if (datasource.languageProvider.metricsMetadata) {
    metricType = (_a = getMetadataType(metric, datasource.languageProvider.metricsMetadata)) != null ? _a : "";
    metricMetadata = (_b = getMetadataHelp(metric, datasource.languageProvider.metricsMetadata)) != null ? _b : "";
  }
  const documentationBody = pvq.query.operations.map((op) => {
    const def = promQueryModeller.getOperationDef(op.id);
    if (!def) {
      return "";
    }
    const title = def.renderer(op, def, "<expr>");
    const body = def.explainHandler ? def.explainHandler(op, def) : def.documentation;
    if (!body) {
      return "";
    }
    return `### ${title}:
${body}`;
  }).filter((item) => item !== "").join("\n");
  return [
    { role: "system", content: ExplainSystemPrompt },
    {
      role: "user",
      content: GetExplainUserPrompt({
        documentation: documentationBody,
        metricName: metric,
        metricType,
        metricMetadata,
        query
      })
    }
  ];
}
function getSuggestMessages({
  promql,
  question,
  metricType,
  labels,
  templates
}) {
  return [
    { role: "system", content: SuggestSystemPrompt },
    { role: "user", content: GetSuggestUserPrompt({ promql, question, metricType, labels, templates }) }
  ];
}
async function promQailExplain(dispatch, idx, query, interaction, suggIdx, datasource) {
  const suggestedQuery = interaction.suggestions[suggIdx].query;
  const promptMessages = getExplainMessage(suggestedQuery, query.metric, datasource);
  const interactionToUpdate = interaction;
  return experimental.llms.openai.streamChatCompletions({
    model: OPENAI_MODEL_NAME,
    messages: promptMessages,
    temperature: 0
  }).pipe(experimental.llms.openai.accumulateContent()).subscribe((response) => {
    const updatedSuggestions = interactionToUpdate.suggestions.map((sg, sidx) => {
      if (suggIdx === sidx) {
        return {
          query: interactionToUpdate.suggestions[suggIdx].query,
          explanation: response
        };
      }
      return sg;
    });
    const payload = {
      idx,
      interaction: __spreadProps$f(__spreadValues$j({}, interactionToUpdate), {
        suggestions: updatedSuggestions,
        explanationIsLoading: false
      })
    };
    dispatch(updateInteraction(payload));
  });
}
function isContainedIn(sublist, superlist) {
  for (const item of sublist) {
    if (!superlist.includes(item)) {
      return false;
    }
  }
  return true;
}
function guessMetricType(metric, allMetrics) {
  const synthetic_metrics = /* @__PURE__ */ new Set([
    "up",
    "scrape_duration_seconds",
    "scrape_samples_post_metric_relabeling",
    "scrape_series_added",
    "scrape_samples_scraped",
    "ALERTS",
    "ALERTS_FOR_STATE"
  ]);
  if (synthetic_metrics.has(metric)) {
    return "counter";
  }
  if (metric.startsWith(":")) {
    return "gauge";
  }
  if (metric.endsWith("_info")) {
    return "counter";
  }
  if (metric.endsWith("_created") || metric.endsWith("_total")) {
    return "counter";
  }
  const underscoreIndex = metric.lastIndexOf("_");
  if (underscoreIndex < 0) {
    return "gauge";
  }
  const [root, suffix] = [metric.slice(0, underscoreIndex), metric.slice(underscoreIndex + 1)];
  if (["bucket", "count", "sum"].includes(suffix)) {
    let familyMetrics2 = [`${root}_bucket`, `${root}_count`, `${root}_sum`, root];
    if (isContainedIn(familyMetrics2, allMetrics)) {
      return "histogram,summary";
    }
    familyMetrics2 = [`${root}_bucket`, `${root}_count`, `${root}_sum`];
    if (isContainedIn(familyMetrics2, allMetrics)) {
      return "histogram";
    }
    familyMetrics2 = [`${root}_sum`, `${root}_count`, root];
    if (isContainedIn(familyMetrics2, allMetrics)) {
      return "summary";
    }
    return "counter";
  }
  const familyMetrics = [`${metric}_sum`, `${metric}_count`, metric];
  if (isContainedIn(familyMetrics, allMetrics)) {
    if (allMetrics.includes(`${metric}_bucket`)) {
      return "histogram,summary";
    } else {
      return "summary";
    }
  }
  return "gauge";
}
function generateMetricTypeFilters(types) {
  return types.map((type) => ({
    metric_type: {
      $eq: type
    }
  }));
}
function guessMetricFamily(metric) {
  if (metric.endsWith("_bucket") || metric.endsWith("_count") || metric.endsWith("_sum")) {
    return metric.slice(0, metric.lastIndexOf("_"));
  }
  return metric;
}
async function isLLMPluginEnabled() {
  const openaiEnabled = experimental.llms.openai.health().then((response) => response.ok);
  const vectorEnabled = experimental.llms.vector.health().then((response) => response.ok);
  return Promise.all([openaiEnabled, vectorEnabled]).then((results) => {
    return results.every((result) => result);
  });
}
async function promQailSuggest(dispatch, idx, query, labelNames, datasource, interaction) {
  var _a;
  const interactionToUpdate = interaction ? interaction : createInteraction(SuggestionType.Historical);
  let metricType = "";
  if (!datasource.languageProvider.metricsMetadata) {
    await datasource.languageProvider.loadMetricsMetadata();
  }
  if (datasource.languageProvider.metricsMetadata) {
    const metricFamilyGuess = guessMetricFamily(query.metric);
    metricType = (_a = getMetadataType(metricFamilyGuess, datasource.languageProvider.metricsMetadata)) != null ? _a : "";
  }
  if (metricType === "") {
    metricType = guessMetricType(query.metric, datasource.languageProvider.metrics);
  }
  if (interactionToUpdate.suggestionType === SuggestionType.Historical) {
    return new Promise((resolve) => {
      return setTimeout(() => {
        const suggestions = getTemplateSuggestions(
          query.metric,
          metricType,
          promQueryModeller.renderLabels(query.labels)
        );
        const payload = {
          idx,
          interaction: __spreadProps$f(__spreadValues$j({}, interactionToUpdate), { suggestions, isLoading: false })
        };
        dispatch(updateInteraction(payload));
        resolve();
      }, 1e3);
    });
  } else {
    const metricLabels = await datasource.languageProvider.fetchLabelsWithMatch(query.metric);
    let feedTheAI = {
      metric: query.metric,
      // drop __name__ label because it's not useful
      labels: Object.keys(metricLabels).filter((label) => label !== "__name__").join(",")
    };
    let results = [];
    if ((interaction == null ? void 0 : interaction.suggestionType) === SuggestionType.AI) {
      feedTheAI = __spreadProps$f(__spreadValues$j({}, feedTheAI), { prompt: interaction.prompt });
      results = await experimental.llms.vector.search({
        query: interaction.prompt,
        collection: promQLTemplatesCollection,
        topK: 5,
        filter: {
          $or: generateMetricTypeFilters(metricType.split(",").concat(["*"]))
        }
      });
      runtime.reportInteraction("grafana_prometheus_promqail_vector_results", {
        metric: query.metric,
        prompt: interaction.prompt,
        results
      });
    }
    const resultsString = results.map((r) => {
      return `${r.payload.promql} | ${r.payload.description} (score=${(r.score * 100).toFixed(1)})`;
    }).join("\n");
    const promptMessages = getSuggestMessages({
      promql: query.metric,
      question: interaction ? interaction.prompt : "",
      metricType,
      labels: labelNames.join(", "),
      templates: resultsString
    });
    return experimental.llms.openai.streamChatCompletions({
      model: OPENAI_MODEL_NAME,
      messages: promptMessages,
      temperature: 0.5
    }).pipe(experimental.llms.openai.accumulateContent()).subscribe((response) => {
      const payload = {
        idx,
        interaction: __spreadProps$f(__spreadValues$j({}, interactionToUpdate), {
          suggestions: [
            {
              query: response,
              explanation: ""
            }
          ],
          isLoading: false
        })
      };
      dispatch(updateInteraction(payload));
    });
  }
}

var __defProp$j = Object.defineProperty;
var __defProps$e = Object.defineProperties;
var __getOwnPropDescs$e = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$j = Object.getOwnPropertySymbols;
var __hasOwnProp$j = Object.prototype.hasOwnProperty;
var __propIsEnum$j = Object.prototype.propertyIsEnumerable;
var __defNormalProp$j = (obj, key, value) => key in obj ? __defProp$j(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$i = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$j.call(b, prop))
      __defNormalProp$j(a, prop, b[prop]);
  if (__getOwnPropSymbols$j)
    for (var prop of __getOwnPropSymbols$j(b)) {
      if (__propIsEnum$j.call(b, prop))
        __defNormalProp$j(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$e = (a, b) => __defProps$e(a, __getOwnPropDescs$e(b));
const SKIP_STARTING_MESSAGE = "SKIP_STARTING_MESSAGE";
const PromQail = (props) => {
  const { query, closeDrawer, onChange, datasource } = props;
  const skipStartingMessage = store.getBool(SKIP_STARTING_MESSAGE, false);
  const [state, dispatch] = React.useReducer(stateSlice$1.reducer, initialState$1(query, !skipStartingMessage));
  const [labelNames, setLabelNames] = React.useState([]);
  const suggestions = state.interactions.reduce((acc, int) => acc + int.suggestions.length, 0);
  const responsesEndRef = React.useRef(null);
  const scrollToBottom = () => {
    var _a;
    if (responsesEndRef) {
      (_a = responsesEndRef == null ? void 0 : responsesEndRef.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
    }
  };
  React.useEffect(() => {
    scrollToBottom();
  }, [state.interactions.length, suggestions]);
  React.useEffect(() => {
    const fetchLabels = async () => {
      let labelsIndex = await datasource.languageProvider.fetchLabelsWithMatch(query.metric);
      setLabelNames(Object.keys(labelsIndex));
    };
    fetchLabels();
  }, [query, datasource]);
  const theme = ui.useTheme2();
  const styles = getStyles$5(theme);
  return /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.containerPadding }, /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.header }, /* @__PURE__ */ React__default["default"].createElement("h3", null, "Query advisor"), /* @__PURE__ */ React__default["default"].createElement(ui.Button, { icon: "times", fill: "text", variant: "secondary", onClick: closeDrawer })), /* @__PURE__ */ React__default["default"].createElement("div", null, /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.iconSection }, /* @__PURE__ */ React__default["default"].createElement("img", { src: AI_Logo_color, alt: "AI logo color" }), " Assistant"), state.showStartingMessage ? /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.dataList }, /* @__PURE__ */ React__default["default"].createElement("ol", null, /* @__PURE__ */ React__default["default"].createElement("li", { className: styles.textPadding }, "Query Advisor suggests queries based on a metric and requests you type in."), /* @__PURE__ */ React__default["default"].createElement("li", { className: styles.textPadding }, "Query Advisor sends Prometheus metrics, labels and metadata to the LLM provider you've configured. Be sure to align its usage with your company's internal policies."), /* @__PURE__ */ React__default["default"].createElement("li", { className: styles.textPadding }, "An AI-suggested query may not fully answer your question. Always take a moment to understand a query before you use it."))), /* @__PURE__ */ React__default["default"].createElement(
    ui.Alert,
    {
      title: "",
      severity: "info",
      key: "promqail-llm-app",
      className: css.cx(styles.textPadding, styles.noMargin)
    },
    "Query Advisor is currently in Private Preview. Feedback is appreciated and can be provided on explanations and suggestions."
  ), /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.textPadding }, /* @__PURE__ */ React__default["default"].createElement(
    ui.Checkbox,
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
  )), /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.rightButtonsWrapper }, /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.rightButtons }, /* @__PURE__ */ React__default["default"].createElement(ui.Button, { className: styles.leftButton, fill: "outline", variant: "secondary", onClick: closeDrawer }, "Cancel"), /* @__PURE__ */ React__default["default"].createElement(
    ui.Button,
    {
      fill: "solid",
      variant: "primary",
      onClick: () => dispatch(showStartingMessage(false)),
      "data-testid": queryAssistanttestIds.securityInfoButton
    },
    "Continue"
  )))) : /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.bodySmall }, /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.textPadding }, "Here is the metric you have selected:"), /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.infoContainerWrapper }, /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.infoContainer }, /* @__PURE__ */ React__default["default"].createElement("table", { className: styles.metricTable }, /* @__PURE__ */ React__default["default"].createElement("tbody", null, /* @__PURE__ */ React__default["default"].createElement("tr", null, /* @__PURE__ */ React__default["default"].createElement("td", { className: styles.metricTableName }, "metric"), /* @__PURE__ */ React__default["default"].createElement("td", { className: styles.metricTableValue }, state.query.metric), /* @__PURE__ */ React__default["default"].createElement("td", null, /* @__PURE__ */ React__default["default"].createElement(
    ui.Button,
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
    return /* @__PURE__ */ React__default["default"].createElement("tr", { key: `${label.label}-${idx}` }, /* @__PURE__ */ React__default["default"].createElement("td", null, text), /* @__PURE__ */ React__default["default"].createElement("td", { className: styles.metricTableValue }, `${label.label}${label.op}${label.value}`), /* @__PURE__ */ React__default["default"].createElement("td", null, " "));
  }))))), !state.askForQueryHelp && state.interactions.length === 0 && /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.queryQuestion }, "Do you know what you want to query?"), /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.rightButtonsWrapper }, /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.rightButtons }, /* @__PURE__ */ React__default["default"].createElement(
    ui.Button,
    {
      className: styles.leftButton,
      fill: "solid",
      variant: "secondary",
      "data-testid": queryAssistanttestIds.clickForHistorical,
      onClick: () => {
        const isLoading = true;
        const suggestionType = SuggestionType.Historical;
        dispatch(addInteraction({ suggestionType, isLoading }));
        runtime.reportInteraction("grafana_prometheus_promqail_know_what_you_want_to_query", {
          promVisualQuery: query,
          doYouKnow: "no"
        });
        promQailSuggest(dispatch, 0, query, labelNames, datasource);
      }
    },
    "No"
  ), /* @__PURE__ */ React__default["default"].createElement(
    ui.Button,
    {
      fill: "solid",
      variant: "primary",
      "data-testid": queryAssistanttestIds.clickForAi,
      onClick: () => {
        runtime.reportInteraction("grafana_prometheus_promqail_know_what_you_want_to_query", {
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
    return /* @__PURE__ */ React__default["default"].createElement("div", { key: idx }, interaction.suggestionType === SuggestionType.AI ? /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.textPadding }, "What kind of data do you want to see with your metric?"), /* @__PURE__ */ React__default["default"].createElement("div", { className: css.cx(styles.secondaryText, styles.bottomMargin) }, /* @__PURE__ */ React__default["default"].createElement("div", null, "You do not need to enter in a metric or a label again in the prompt."), /* @__PURE__ */ React__default["default"].createElement("div", null, "Example: I want to monitor request latency, not errors.")), /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.inputPadding }, /* @__PURE__ */ React__default["default"].createElement(
      ui.Input,
      {
        value: interaction.prompt,
        spellCheck: false,
        placeholder: "Enter prompt",
        disabled: interaction.suggestions.length > 0,
        onChange: (e) => {
          const prompt = e.currentTarget.value;
          const payload = {
            idx,
            interaction: __spreadProps$e(__spreadValues$i({}, interaction), { prompt })
          };
          dispatch(updateInteraction(payload));
        }
      }
    )), interaction.suggestions.length === 0 ? interaction.isLoading ? /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.loadingMessageContainer }, "Waiting for OpenAI ", /* @__PURE__ */ React__default["default"].createElement(ui.Spinner, { className: styles.floatRight }))) : /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.rightButtonsWrapper }, /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.rightButtons }, /* @__PURE__ */ React__default["default"].createElement(
      ui.Button,
      {
        className: styles.leftButton,
        fill: "outline",
        variant: "secondary",
        onClick: closeDrawer
      },
      "Cancel"
    ), /* @__PURE__ */ React__default["default"].createElement(
      ui.Button,
      {
        className: styles.leftButton,
        fill: "outline",
        variant: "secondary",
        onClick: () => {
          const newInteraction = __spreadProps$e(__spreadValues$i({}, interaction), {
            suggestionType: SuggestionType.Historical,
            isLoading: true
          });
          const payload = {
            idx,
            interaction: newInteraction
          };
          runtime.reportInteraction("grafana_prometheus_promqail_suggest_query_instead", {
            promVisualQuery: query
          });
          dispatch(updateInteraction(payload));
          promQailSuggest(dispatch, idx, query, labelNames, datasource, newInteraction);
        }
      },
      "Suggest queries instead"
    ), /* @__PURE__ */ React__default["default"].createElement(
      ui.Button,
      {
        fill: "solid",
        variant: "primary",
        "data-testid": queryAssistanttestIds.submitPrompt + idx,
        onClick: () => {
          const newInteraction = __spreadProps$e(__spreadValues$i({}, interaction), {
            isLoading: true
          });
          const payload = {
            idx,
            interaction: newInteraction
          };
          runtime.reportInteraction("grafana_prometheus_promqail_prompt_submitted", {
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
      /* @__PURE__ */ React__default["default"].createElement(
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
      interaction.isLoading ? /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.loadingMessageContainer }, "Waiting for OpenAI ", /* @__PURE__ */ React__default["default"].createElement(ui.Spinner, { className: styles.floatRight }))) : (
        // LIST OF SUGGESTED QUERIES FROM HISTORICAL DATA
        /* @__PURE__ */ React__default["default"].createElement(
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
  }))), /* @__PURE__ */ React__default["default"].createElement("div", { ref: responsesEndRef }));
};
const getStyles$5 = (theme) => {
  return {
    sectionPadding: css.css({
      padding: "20px"
    }),
    header: css.css({
      display: "flex",
      button: {
        marginLeft: "auto"
      }
    }),
    iconSection: css.css({
      padding: "0 0 10px 0",
      color: `${theme.colors.text.secondary}`,
      img: {
        paddingRight: "4px"
      }
    }),
    rightButtonsWrapper: css.css({
      display: "flex"
    }),
    rightButtons: css.css({
      marginLeft: "auto"
    }),
    leftButton: css.css({
      marginRight: "10px"
    }),
    dataList: css.css({
      padding: "0px 28px 0px 28px"
    }),
    textPadding: css.css({
      paddingBottom: "12px"
    }),
    containerPadding: css.css({
      padding: "28px"
    }),
    infoContainer: css.css({
      border: `${theme.colors.border.strong}`,
      padding: "16px",
      backgroundColor: `${theme.colors.background.secondary}`,
      borderRadius: `8px`,
      borderBottomLeftRadius: 0
    }),
    infoContainerWrapper: css.css({
      paddingBottom: "24px"
    }),
    metricTable: css.css({
      width: "100%"
    }),
    metricTableName: css.css({
      width: "15%"
    }),
    metricTableValue: css.css({
      fontFamily: `${theme.typography.fontFamilyMonospace}`,
      fontSize: `${theme.typography.bodySmall.fontSize}`,
      overflow: "scroll",
      textWrap: "nowrap",
      maxWidth: "150px",
      width: "60%",
      maskImage: `linear-gradient(to right, rgba(0, 0, 0, 1) 90%, rgba(0, 0, 0, 0))`
    }),
    metricTableButton: css.css({
      float: "right"
    }),
    queryQuestion: css.css({
      textAlign: "end",
      padding: "8px 0"
    }),
    secondaryText: css.css({
      color: `${theme.colors.text.secondary}`
    }),
    loadingMessageContainer: css.css({
      border: `${theme.colors.border.strong}`,
      padding: `16px`,
      backgroundColor: `${theme.colors.background.secondary}`,
      marginBottom: `20px`,
      borderRadius: `8px`,
      color: `${theme.colors.text.secondary}`,
      fontStyle: "italic"
    }),
    floatRight: css.css({
      float: "right"
    }),
    codeText: css.css({
      fontFamily: `${theme.typography.fontFamilyMonospace}`,
      fontSize: `${theme.typography.bodySmall.fontSize}`
    }),
    bodySmall: css.css({
      fontSize: `${theme.typography.bodySmall.fontSize}`
    }),
    explainPadding: css.css({
      paddingLeft: "26px"
    }),
    bottomMargin: css.css({
      marginBottom: "20px"
    }),
    topPadding: css.css({
      paddingTop: "22px"
    }),
    doc: css.css({
      textDecoration: "underline"
    }),
    afterButtons: css.css({
      display: "flex",
      justifyContent: "flex-end"
    }),
    feedbackStyle: css.css({
      margin: 0,
      textAlign: "right",
      paddingTop: "22px",
      paddingBottom: "22px"
    }),
    nextInteractionHeight: css.css({
      height: "88px"
    }),
    center: css.css({
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }),
    inputPadding: css.css({
      paddingBottom: "24px"
    }),
    querySuggestion: css.css({
      display: "flex",
      flexWrap: "nowrap"
    }),
    longCode: css.css({
      width: "90%",
      textWrap: "nowrap",
      overflow: "scroll",
      maskImage: `linear-gradient(to right, rgba(0, 0, 0, 1) 90%, rgba(0, 0, 0, 0))`,
      div: {
        display: "inline-block"
      }
    }),
    useButton: css.css({
      marginLeft: "auto"
    }),
    suggestionFeedback: css.css({
      textAlign: "left"
    }),
    feedbackQuestion: css.css({
      display: "flex",
      padding: "8px 0px",
      h6: { marginBottom: 0 },
      i: {
        marginTop: "1px"
      }
    }),
    explationTextInput: css.css({
      paddingLeft: "24px"
    }),
    submitFeedback: css.css({
      padding: "16px 0"
    }),
    noMargin: css.css({
      margin: 0
    }),
    enableButtonTooltip: css.css({
      padding: 8
    }),
    enableButtonTooltipText: css.css({
      color: `${theme.colors.text.secondary}`,
      ul: {
        marginLeft: 16
      }
    }),
    link: css.css({
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
const stateSlice$1 = toolkit.createSlice({
  name: "metrics-modal-state",
  initialState: initialState$1(),
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
const { showStartingMessage, indicateCheckbox, addInteraction, updateInteraction } = stateSlice$1.actions;

function QueryAssistantButton(props) {
  const { llmAppEnabled, metric, setShowDrawer } = props;
  const llmAppDisabled = !llmAppEnabled;
  const noMetricSelected = !metric;
  const theme = ui.useTheme2();
  const styles = getStyles$5(theme);
  const button = () => {
    return /* @__PURE__ */ React__default["default"].createElement(
      ui.Button,
      {
        variant: "secondary",
        onClick: () => {
          runtime.reportInteraction("grafana_prometheus_promqail_ai_button_clicked", {
            metric
          });
          setShowDrawer(true);
        },
        disabled: !metric || !llmAppEnabled,
        "data-testid": selectors.components.DataSource.Prometheus.queryEditor.builder.queryAdvisor
      },
      /* @__PURE__ */ React__default["default"].createElement("img", { height: 16, src: AI_Logo_color, alt: "AI logo black and white" }),
      "\xA0",
      "Get query suggestions"
    );
  };
  const selectMetricMessage = /* @__PURE__ */ React__default["default"].createElement(ui.Tooltip, { content: "First, select a metric.", placement: "bottom-end" }, button());
  const llmAppMessage = /* @__PURE__ */ React__default["default"].createElement(
    ui.Tooltip,
    {
      interactive: true,
      placement: "auto-end",
      content: /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.enableButtonTooltip }, /* @__PURE__ */ React__default["default"].createElement("h6", null, "Query Advisor is disabled"), /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.enableButtonTooltipText }, "To enable Query Advisor you must:"), /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.enableButtonTooltipText }, /* @__PURE__ */ React__default["default"].createElement("ul", null, /* @__PURE__ */ React__default["default"].createElement("li", null, /* @__PURE__ */ React__default["default"].createElement(
        "a",
        {
          href: "https://grafana.com/docs/grafana-cloud/alerting-and-irm/machine-learning/llm-plugin/",
          target: "_blank",
          rel: "noreferrer noopener",
          className: styles.link
        },
        "Install and enable the LLM plugin"
      )), /* @__PURE__ */ React__default["default"].createElement("li", null, "Select a metric"))))
    },
    button()
  );
  if (llmAppDisabled) {
    return llmAppMessage;
  } else if (noMetricSelected) {
    return selectMetricMessage;
  } else {
    return button();
  }
}

const PromQueryBuilder = React__default["default"].memo((props) => {
  const { datasource, query, onChange, onRunQuery, data, showExplain } = props;
  const [highlightedOp, setHighlightedOp] = React.useState();
  const [showDrawer, setShowDrawer] = React.useState(false);
  const [llmAppEnabled, updateLlmAppEnabled] = React.useState(false);
  const { prometheusPromQAIL } = runtime.config.featureToggles;
  const lang = { grammar: promqlGrammar, name: "promql" };
  const initHints = datasource.getInitHints();
  React.useEffect(() => {
    async function checkLlms() {
      const check = await isLLMPluginEnabled();
      updateLlmAppEnabled(check);
    }
    if (prometheusPromQAIL) {
      checkLlms();
    }
  }, [prometheusPromQAIL]);
  return /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, prometheusPromQAIL && showDrawer && /* @__PURE__ */ React__default["default"].createElement(ui.Drawer, { closeOnMaskClick: false, onClose: () => setShowDrawer(false) }, /* @__PURE__ */ React__default["default"].createElement(
    PromQail,
    {
      query,
      closeDrawer: () => setShowDrawer(false),
      onChange,
      datasource
    }
  )), /* @__PURE__ */ React__default["default"].createElement(experimental.EditorRow, null, /* @__PURE__ */ React__default["default"].createElement(MetricsLabelsSection, { query, onChange, datasource })), initHints.length ? /* @__PURE__ */ React__default["default"].createElement("div", { className: "query-row-break" }, /* @__PURE__ */ React__default["default"].createElement("div", { className: "prom-query-field-info text-warning" }, initHints[0].label, " ", initHints[0].fix ? /* @__PURE__ */ React__default["default"].createElement("button", { type: "button", className: "text-warning" }, initHints[0].fix.label) : null)) : null, showExplain && /* @__PURE__ */ React__default["default"].createElement(
    OperationExplainedBox,
    {
      stepNumber: 1,
      title: /* @__PURE__ */ React__default["default"].createElement(RawQuery, { query: `${query.metric} ${promQueryModeller.renderLabels(query.labels)}`, lang })
    },
    EXPLAIN_LABEL_FILTER_CONTENT
  ), /* @__PURE__ */ React__default["default"].createElement(OperationsEditorRow, null, /* @__PURE__ */ React__default["default"].createElement(
    OperationList,
    {
      queryModeller: promQueryModeller,
      datasource,
      query,
      onChange,
      onRunQuery,
      highlightedOp
    }
  ), prometheusPromQAIL && /* @__PURE__ */ React__default["default"].createElement(
    "div",
    {
      className: css.css({
        padding: "0 0 0 6px"
      })
    },
    /* @__PURE__ */ React__default["default"].createElement(QueryAssistantButton, { llmAppEnabled, metric: query.metric, setShowDrawer })
  ), /* @__PURE__ */ React__default["default"].createElement("div", { "data-testid": selectors.components.DataSource.Prometheus.queryEditor.builder.hints }, /* @__PURE__ */ React__default["default"].createElement(
    QueryBuilderHints,
    {
      datasource,
      query,
      onChange,
      data,
      queryModeller: promQueryModeller,
      buildVisualQueryFromString
    }
  ))), showExplain && /* @__PURE__ */ React__default["default"].createElement(
    OperationListExplained,
    {
      lang,
      query,
      stepNumber: 2,
      queryModeller: promQueryModeller,
      onMouseEnter: (op) => setHighlightedOp(op),
      onMouseLeave: () => setHighlightedOp(void 0)
    }
  ), query.binaryQueries && query.binaryQueries.length > 0 && /* @__PURE__ */ React__default["default"].createElement(
    NestedQueryList,
    {
      query,
      datasource,
      onChange,
      onRunQuery,
      showExplain
    }
  ));
});
PromQueryBuilder.displayName = "PromQueryBuilder";

function QueryPreview({ query }) {
  if (!query) {
    return null;
  }
  return /* @__PURE__ */ React__default["default"].createElement(experimental.EditorRow, null, /* @__PURE__ */ React__default["default"].createElement(experimental.EditorFieldGroup, null, /* @__PURE__ */ React__default["default"].createElement(RawQuery, { query, lang: { grammar: promqlGrammar, name: "promql" } })));
}

var __defProp$i = Object.defineProperty;
var __defProps$d = Object.defineProperties;
var __getOwnPropDescs$d = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$i = Object.getOwnPropertySymbols;
var __hasOwnProp$i = Object.prototype.hasOwnProperty;
var __propIsEnum$i = Object.prototype.propertyIsEnumerable;
var __defNormalProp$i = (obj, key, value) => key in obj ? __defProp$i(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$h = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$i.call(b, prop))
      __defNormalProp$i(a, prop, b[prop]);
  if (__getOwnPropSymbols$i)
    for (var prop of __getOwnPropSymbols$i(b)) {
      if (__propIsEnum$i.call(b, prop))
        __defNormalProp$i(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$d = (a, b) => __defProps$d(a, __getOwnPropDescs$d(b));
const prometheusMetricEncyclopedia = runtime.config.featureToggles.prometheusMetricEncyclopedia;
function PromQueryBuilderContainer(props) {
  const { query, onChange, onRunQuery, datasource, data, showExplain } = props;
  const [state, dispatch] = React.useReducer(stateSlice.reducer, { expr: query.expr });
  React.useEffect(() => {
    var _a, _b, _c, _d;
    dispatch(exprChanged(query.expr));
    if (prometheusMetricEncyclopedia) {
      dispatch(
        setMetricsModalSettings({
          useBackend: (_a = query.useBackend) != null ? _a : false,
          disableTextWrap: (_b = query.disableTextWrap) != null ? _b : false,
          fullMetaSearch: (_c = query.fullMetaSearch) != null ? _c : false,
          includeNullMetadata: (_d = query.includeNullMetadata) != null ? _d : true
        })
      );
    }
  }, [query]);
  React.useEffect(() => {
    datasource.languageProvider.start(data == null ? void 0 : data.timeRange);
  }, [data == null ? void 0 : data.timeRange, datasource.languageProvider]);
  const onVisQueryChange = (visQuery) => {
    const expr = promQueryModeller.renderQuery(visQuery);
    dispatch(visualQueryChange({ visQuery, expr }));
    if (prometheusMetricEncyclopedia) {
      const metricsModalSettings = getSettings(visQuery);
      onChange(__spreadValues$h(__spreadProps$d(__spreadValues$h({}, props.query), { expr }), metricsModalSettings));
    } else {
      onChange(__spreadProps$d(__spreadValues$h({}, props.query), { expr }));
    }
  };
  if (!state.visQuery) {
    return null;
  }
  return /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, /* @__PURE__ */ React__default["default"].createElement(
    PromQueryBuilder,
    {
      query: state.visQuery,
      datasource,
      onChange: onVisQueryChange,
      onRunQuery,
      data,
      showExplain
    }
  ), /* @__PURE__ */ React__default["default"].createElement(QueryPreview, { query: query.expr }));
}
const initialState = {
  expr: ""
};
const stateSlice = toolkit.createSlice({
  name: "prom-builder-container",
  initialState,
  reducers: {
    visualQueryChange: (state, action) => {
      state.expr = action.payload.expr;
      state.visQuery = action.payload.visQuery;
    },
    exprChanged: (state, action) => {
      var _a;
      if (!state.visQuery || state.expr !== action.payload) {
        state.expr = action.payload;
        const parseResult = buildVisualQueryFromString((_a = action.payload) != null ? _a : "");
        state.visQuery = parseResult.query;
      }
    },
    setMetricsModalSettings: (state, action) => {
      if (state.visQuery && prometheusMetricEncyclopedia) {
        state.visQuery.useBackend = action.payload.useBackend;
        state.visQuery.disableTextWrap = action.payload.disableTextWrap;
        state.visQuery.fullMetaSearch = action.payload.fullMetaSearch;
        state.visQuery.includeNullMetadata = action.payload.includeNullMetadata;
      }
    }
  }
});
const { visualQueryChange, exprChanged, setMetricsModalSettings } = stateSlice.actions;

var __getOwnPropSymbols$h = Object.getOwnPropertySymbols;
var __hasOwnProp$h = Object.prototype.hasOwnProperty;
var __propIsEnum$h = Object.prototype.propertyIsEnumerable;
var __objRest$3 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$h.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$h)
    for (var prop of __getOwnPropSymbols$h(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$h.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function PromExemplarField(_a) {
  var _b = _a, { datasource, onChange, query } = _b, rest = __objRest$3(_b, ["datasource", "onChange", "query"]);
  const [error, setError] = React.useState(null);
  const styles = ui.useStyles2(getStyles$4);
  const prevError = reactUse.usePrevious(error);
  React.useEffect(() => {
    if (!datasource.exemplarsAvailable) {
      setError("Exemplars for this query are not available");
      onChange(false);
    } else if (query.instant && !query.range) {
      setError("Exemplars are not available for instant queries");
      onChange(false);
    } else {
      setError(null);
      if (prevError && !error) {
        onChange(true);
      }
    }
  }, [datasource.exemplarsAvailable, query.instant, query.range, onChange, prevError, error]);
  const iconButtonStyles = css.cx(
    {
      [styles.activeIcon]: !!query.exemplar
    },
    styles.eyeIcon
  );
  return /* @__PURE__ */ React__default["default"].createElement(ui.InlineLabel, { width: "auto", "data-testid": rest["data-testid"] }, /* @__PURE__ */ React__default["default"].createElement(ui.Tooltip, { content: error != null ? error : "" }, /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.iconWrapper }, "Exemplars", /* @__PURE__ */ React__default["default"].createElement(
    ui.IconButton,
    {
      name: "eye",
      tooltip: !!query.exemplar ? "Disable query with exemplars" : "Enable query with exemplars",
      disabled: !!error,
      className: iconButtonStyles,
      onClick: () => {
        onChange(!query.exemplar);
      }
    }
  ))));
}
function getStyles$4(theme) {
  return {
    eyeIcon: css.css({
      marginLeft: theme.spacing(2)
    }),
    activeIcon: css.css({
      color: theme.colors.primary.main
    }),
    iconWrapper: css.css({
      display: "flex",
      alignItems: "center"
    })
  };
}

var __defProp$h = Object.defineProperty;
var __defProps$c = Object.defineProperties;
var __getOwnPropDescs$c = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$g = Object.getOwnPropertySymbols;
var __hasOwnProp$g = Object.prototype.hasOwnProperty;
var __propIsEnum$g = Object.prototype.propertyIsEnumerable;
var __defNormalProp$h = (obj, key, value) => key in obj ? __defProp$h(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$g = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$g.call(b, prop))
      __defNormalProp$h(a, prop, b[prop]);
  if (__getOwnPropSymbols$g)
    for (var prop of __getOwnPropSymbols$g(b)) {
      if (__propIsEnum$g.call(b, prop))
        __defNormalProp$h(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$c = (a, b) => __defProps$c(a, __getOwnPropDescs$c(b));
const PromExploreExtraField = React.memo(({ query, datasource, onChange, onRunQuery }) => {
  var _a;
  const rangeOptions = getQueryTypeOptions(true);
  const prevQuery = reactUse.usePrevious(query);
  const onExemplarChange = React.useCallback(
    (exemplar) => {
      if (!lodash.isEqual(query, prevQuery) || exemplar !== query.exemplar) {
        onChange(__spreadProps$c(__spreadValues$g({}, query), { exemplar }));
      }
    },
    [prevQuery, query, onChange]
  );
  function onChangeQueryStep(interval) {
    onChange(__spreadProps$c(__spreadValues$g({}, query), { interval }));
  }
  function onStepChange(e) {
    if (e.currentTarget.value !== query.interval) {
      onChangeQueryStep(e.currentTarget.value);
    }
  }
  function onReturnKeyDown(e) {
    if (e.key === "Enter" && e.shiftKey) {
      onRunQuery();
    }
  }
  const onQueryTypeChange = getQueryTypeChangeHandler(query, onChange);
  return /* @__PURE__ */ React__default["default"].createElement(
    "div",
    {
      "aria-label": "Prometheus extra field",
      className: "gf-form-inline",
      "data-testid": promExploreExtraFieldTestIds.extraFieldEditor
    },
    /* @__PURE__ */ React__default["default"].createElement(
      "div",
      {
        "data-testid": promExploreExtraFieldTestIds.queryTypeField,
        className: css.cx(
          "gf-form explore-input-margin",
          css.css({
            flexWrap: "nowrap"
          })
        ),
        "aria-label": "Query type field"
      },
      /* @__PURE__ */ React__default["default"].createElement(ui.InlineFormLabel, { width: "auto" }, "Query type"),
      /* @__PURE__ */ React__default["default"].createElement(
        ui.RadioButtonGroup,
        {
          options: rangeOptions,
          value: query.range && query.instant ? "both" : query.instant ? "instant" : "range",
          onChange: onQueryTypeChange
        }
      )
    ),
    /* @__PURE__ */ React__default["default"].createElement(
      "div",
      {
        "data-testid": promExploreExtraFieldTestIds.stepField,
        className: css.cx(
          "gf-form",
          css.css({
            flexWrap: "nowrap"
          })
        ),
        "aria-label": "Step field"
      },
      /* @__PURE__ */ React__default["default"].createElement(
        ui.InlineFormLabel,
        {
          width: 6,
          tooltip: "Time units and built-in variables can be used here, for example: $__interval, $__rate_interval, 5s, 1m, 3h, 1d, 1y (Default if no unit is specified: s)"
        },
        "Min step"
      ),
      /* @__PURE__ */ React__default["default"].createElement(
        "input",
        {
          type: "text",
          className: "gf-form-input width-4",
          placeholder: "auto",
          onChange: onStepChange,
          onKeyDown: onReturnKeyDown,
          value: (_a = query.interval) != null ? _a : ""
        }
      )
    ),
    /* @__PURE__ */ React__default["default"].createElement(PromExemplarField, { onChange: onExemplarChange, datasource, query })
  );
});
PromExploreExtraField.displayName = "PromExploreExtraField";
function getQueryTypeOptions(includeBoth) {
  const rangeOptions = [
    { value: "range", label: "Range", description: "Run query over a range of time" },
    {
      value: "instant",
      label: "Instant",
      description: 'Run query against a single point in time. For this query, the "To" time is used'
    }
  ];
  if (includeBoth) {
    rangeOptions.push({ value: "both", label: "Both", description: "Run an Instant query and a Range query" });
  }
  return rangeOptions;
}
function getQueryTypeChangeHandler(query, onChange) {
  return (queryType) => {
    if (queryType === "instant") {
      onChange(__spreadProps$c(__spreadValues$g({}, query), { instant: true, range: false, exemplar: false }));
    } else if (queryType === "range") {
      onChange(__spreadProps$c(__spreadValues$g({}, query), { instant: false, range: true }));
    } else {
      onChange(__spreadProps$c(__spreadValues$g({}, query), { instant: true, range: true }));
    }
  };
}
const promExploreExtraFieldTestIds = {
  extraFieldEditor: "prom-editor-extra-field",
  stepField: "prom-editor-extra-field-step",
  queryTypeField: "prom-editor-extra-field-query-type"
};

function QueryOptionGroup({ title, children, collapsedInfo }) {
  const [isOpen, toggleOpen] = reactUse.useToggle(false);
  const styles = ui.useStyles2(getStyles$3);
  return /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.wrapper }, /* @__PURE__ */ React__default["default"].createElement(
    ui.Collapse,
    {
      className: styles.collapse,
      collapsible: true,
      isOpen,
      onToggle: toggleOpen,
      label: /* @__PURE__ */ React__default["default"].createElement(ui.Stack, { gap: 0 }, /* @__PURE__ */ React__default["default"].createElement("h6", { className: styles.title }, title), !isOpen && /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.description }, collapsedInfo.map((x, i) => /* @__PURE__ */ React__default["default"].createElement("span", { key: i }, x))))
    },
    /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.body }, children)
  ));
}
const getStyles$3 = (theme) => {
  return {
    collapse: css.css({
      backgroundColor: "unset",
      border: "unset",
      marginBottom: 0,
      ["> button"]: {
        padding: theme.spacing(0, 1)
      }
    }),
    wrapper: css.css({
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline"
    }),
    title: css.css({
      flexGrow: 1,
      overflow: "hidden",
      fontSize: theme.typography.bodySmall.fontSize,
      fontWeight: theme.typography.fontWeightMedium,
      margin: 0
    }),
    description: css.css({
      color: theme.colors.text.secondary,
      fontSize: theme.typography.bodySmall.fontSize,
      fontWeight: theme.typography.bodySmall.fontWeight,
      paddingLeft: theme.spacing(2),
      gap: theme.spacing(2),
      display: "flex"
    }),
    body: css.css({
      display: "flex",
      gap: theme.spacing(2),
      flexWrap: "wrap"
    }),
    tooltip: css.css({
      marginRight: theme.spacing(0.25)
    })
  };
};

const legendModeOptions = [
  {
    label: "Auto",
    value: LegendFormatMode.Auto,
    description: "Only includes unique labels"
  },
  { label: "Verbose", value: LegendFormatMode.Verbose, description: "All label names and values" },
  { label: "Custom", value: LegendFormatMode.Custom, description: "Provide a naming template" }
];
const PromQueryLegendEditor = React__default["default"].memo(
  ({ legendFormat, onChange, onRunQuery }) => {
    const mode = getLegendMode(legendFormat);
    const inputRef = React.useRef(null);
    const onLegendFormatChanged = (evt) => {
      let newFormat = evt.currentTarget.value;
      if (newFormat.length === 0) {
        newFormat = LegendFormatMode.Auto;
      }
      if (newFormat !== legendFormat) {
        onChange(newFormat);
        onRunQuery();
      }
    };
    const onLegendModeChanged = (value) => {
      switch (value.value) {
        case LegendFormatMode.Auto:
          onChange(LegendFormatMode.Auto);
          break;
        case LegendFormatMode.Custom:
          onChange("{{label_name}}");
          setTimeout(() => {
            var _a, _b;
            (_a = inputRef.current) == null ? void 0 : _a.focus();
            (_b = inputRef.current) == null ? void 0 : _b.setSelectionRange(2, 12, "forward");
          }, 10);
          break;
        case LegendFormatMode.Verbose:
          onChange("");
          break;
      }
      onRunQuery();
    };
    return /* @__PURE__ */ React__default["default"].createElement(
      experimental.EditorField,
      {
        label: "Legend",
        tooltip: "Series name override or template. Ex. {{hostname}} will be replaced with label value for hostname.",
        "data-testid": selectors.components.DataSource.Prometheus.queryEditor.legend
      },
      /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, mode === LegendFormatMode.Custom && /* @__PURE__ */ React__default["default"].createElement(
        ui.AutoSizeInput,
        {
          id: "legendFormat",
          minWidth: 22,
          placeholder: "auto",
          defaultValue: legendFormat,
          onCommitChange: onLegendFormatChanged,
          ref: inputRef
        }
      ), mode !== LegendFormatMode.Custom && /* @__PURE__ */ React__default["default"].createElement(
        ui.Select,
        {
          inputId: "legend.mode",
          isSearchable: false,
          placeholder: "Select legend mode",
          options: legendModeOptions,
          width: 22,
          onChange: onLegendModeChanged,
          value: legendModeOptions.find((x) => x.value === mode)
        }
      ))
    );
  }
);
PromQueryLegendEditor.displayName = "PromQueryLegendEditor";
function getLegendMode(legendFormat) {
  if (legendFormat === LegendFormatMode.Auto) {
    return LegendFormatMode.Auto;
  }
  if (legendFormat == null || legendFormat === "") {
    return LegendFormatMode.Verbose;
  }
  return LegendFormatMode.Custom;
}
function getLegendModeLabel(legendFormat) {
  var _a;
  const mode = getLegendMode(legendFormat);
  if (mode !== LegendFormatMode.Custom) {
    return (_a = legendModeOptions.find((x) => x.value === mode)) == null ? void 0 : _a.label;
  }
  return legendFormat;
}

var __defProp$g = Object.defineProperty;
var __defProps$b = Object.defineProperties;
var __getOwnPropDescs$b = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$f = Object.getOwnPropertySymbols;
var __hasOwnProp$f = Object.prototype.hasOwnProperty;
var __propIsEnum$f = Object.prototype.propertyIsEnumerable;
var __defNormalProp$g = (obj, key, value) => key in obj ? __defProp$g(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$f = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$f.call(b, prop))
      __defNormalProp$g(a, prop, b[prop]);
  if (__getOwnPropSymbols$f)
    for (var prop of __getOwnPropSymbols$f(b)) {
      if (__propIsEnum$f.call(b, prop))
        __defNormalProp$g(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$b = (a, b) => __defProps$b(a, __getOwnPropDescs$b(b));
const PromQueryBuilderOptions = React__default["default"].memo(
  ({ query, app, onChange, onRunQuery }) => {
    const onChangeFormat = (value) => {
      onChange(__spreadProps$b(__spreadValues$f({}, query), { format: value.value }));
      onRunQuery();
    };
    const onChangeStep = (evt) => {
      onChange(__spreadProps$b(__spreadValues$f({}, query), { interval: evt.currentTarget.value.trim() }));
      onRunQuery();
    };
    const queryTypeOptions = getQueryTypeOptions(
      app === data.CoreApp.Explore || app === data.CoreApp.Correlations || app === data.CoreApp.PanelEditor
    );
    const onQueryTypeChange = getQueryTypeChangeHandler(query, onChange);
    const onExemplarChange = (event) => {
      const isEnabled = event.currentTarget.checked;
      onChange(__spreadProps$b(__spreadValues$f({}, query), { exemplar: isEnabled }));
      onRunQuery();
    };
    const onIntervalFactorChange = (value) => {
      onChange(__spreadProps$b(__spreadValues$f({}, query), { intervalFactor: value.value }));
      onRunQuery();
    };
    const formatOption = FORMAT_OPTIONS.find((option) => option.value === query.format) || FORMAT_OPTIONS[0];
    const queryTypeValue = getQueryTypeValue(query);
    const queryTypeLabel = queryTypeOptions.find((x) => x.value === queryTypeValue).label;
    return /* @__PURE__ */ React__default["default"].createElement(experimental.EditorRow, null, /* @__PURE__ */ React__default["default"].createElement("div", { "data-testid": selectors.components.DataSource.Prometheus.queryEditor.options }, /* @__PURE__ */ React__default["default"].createElement(
      QueryOptionGroup,
      {
        title: "Options",
        collapsedInfo: getCollapsedInfo(query, formatOption.label, queryTypeLabel, app)
      },
      /* @__PURE__ */ React__default["default"].createElement(
        PromQueryLegendEditor,
        {
          legendFormat: query.legendFormat,
          onChange: (legendFormat) => onChange(__spreadProps$b(__spreadValues$f({}, query), { legendFormat })),
          onRunQuery
        }
      ),
      /* @__PURE__ */ React__default["default"].createElement(
        experimental.EditorField,
        {
          label: "Min step",
          tooltip: /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, "An additional lower limit for the step parameter of the Prometheus query and for the", " ", /* @__PURE__ */ React__default["default"].createElement("code", null, "$__interval"), " and ", /* @__PURE__ */ React__default["default"].createElement("code", null, "$__rate_interval"), " variables.")
        },
        /* @__PURE__ */ React__default["default"].createElement(
          ui.AutoSizeInput,
          {
            type: "text",
            "aria-label": "Set lower limit for the step parameter",
            placeholder: "auto",
            minWidth: 10,
            onCommitChange: onChangeStep,
            defaultValue: query.interval,
            id: selectors.components.DataSource.Prometheus.queryEditor.step
          }
        )
      ),
      /* @__PURE__ */ React__default["default"].createElement(experimental.EditorField, { label: "Format" }, /* @__PURE__ */ React__default["default"].createElement(
        ui.Select,
        {
          "data-testid": selectors.components.DataSource.Prometheus.queryEditor.format,
          value: formatOption,
          allowCustomValue: true,
          onChange: onChangeFormat,
          options: FORMAT_OPTIONS
        }
      )),
      /* @__PURE__ */ React__default["default"].createElement(experimental.EditorField, { label: "Type", "data-testid": selectors.components.DataSource.Prometheus.queryEditor.type }, /* @__PURE__ */ React__default["default"].createElement(ui.RadioButtonGroup, { options: queryTypeOptions, value: queryTypeValue, onChange: onQueryTypeChange })),
      shouldShowExemplarSwitch(query, app) && /* @__PURE__ */ React__default["default"].createElement(experimental.EditorField, { label: "Exemplars" }, /* @__PURE__ */ React__default["default"].createElement(
        experimental.EditorSwitch,
        {
          value: query.exemplar || false,
          onChange: onExemplarChange,
          id: selectors.components.DataSource.Prometheus.queryEditor.exemplars
        }
      )),
      query.intervalFactor && query.intervalFactor > 1 && /* @__PURE__ */ React__default["default"].createElement(experimental.EditorField, { label: "Resolution" }, /* @__PURE__ */ React__default["default"].createElement(
        ui.Select,
        {
          "aria-label": "Select resolution",
          isSearchable: false,
          options: INTERVAL_FACTOR_OPTIONS,
          onChange: onIntervalFactorChange,
          value: INTERVAL_FACTOR_OPTIONS.find((option) => option.value === query.intervalFactor)
        }
      ))
    )));
  }
);
function shouldShowExemplarSwitch(query, app) {
  if (app === data.CoreApp.UnifiedAlerting || !query.range) {
    return false;
  }
  return true;
}
function getQueryTypeValue(query) {
  return query.range && query.instant ? "both" : query.instant ? "instant" : "range";
}
function getCollapsedInfo(query, formatOption, queryType, app) {
  var _a;
  const items = [];
  items.push(`Legend: ${getLegendModeLabel(query.legendFormat)}`);
  items.push(`Format: ${formatOption}`);
  items.push(`Step: ${(_a = query.interval) != null ? _a : "auto"}`);
  items.push(`Type: ${queryType}`);
  if (shouldShowExemplarSwitch(query, app)) {
    if (query.exemplar) {
      items.push(`Exemplars: true`);
    } else {
      items.push(`Exemplars: false`);
    }
  }
  return items;
}
PromQueryBuilderOptions.displayName = "PromQueryBuilderOptions";

const LocalStorageValueProvider = (props) => {
  const { children, storageKey, defaultValue } = props;
  const [state, setState] = React.useState({ value: store.getObject(props.storageKey, props.defaultValue) });
  React.useEffect(() => {
    const onStorageUpdate = (v) => {
      if (v.key === storageKey) {
        setState({ value: store.getObject(props.storageKey, props.defaultValue) });
      }
    };
    window.addEventListener("storage", onStorageUpdate);
    return () => {
      window.removeEventListener("storage", onStorageUpdate);
    };
  });
  const onSaveToStore = (value) => {
    try {
      store.setObject(storageKey, value);
    } catch (error) {
      console.error(error);
    }
    setState({ value });
  };
  const onDeleteFromStore = () => {
    try {
      store.delete(storageKey);
    } catch (error) {
      console.log(error);
    }
    setState({ value: defaultValue });
  };
  return /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, children(state.value, onSaveToStore, onDeleteFromStore));
};

function isCancelablePromiseRejection(promise) {
  return typeof promise === "object" && promise !== null && "isCanceled" in promise;
}
const makePromiseCancelable = (promise) => {
  let hasCanceled_ = false;
  const wrappedPromise = new Promise((resolve, reject) => {
    const canceledPromiseRejection = { isCanceled: true };
    promise.then((val) => hasCanceled_ ? reject(canceledPromiseRejection) : resolve(val));
    promise.catch((error) => hasCanceled_ ? reject(canceledPromiseRejection) : reject(error));
  });
  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled_ = true;
    }
  };
};

var __defProp$f = Object.defineProperty;
var __defProps$a = Object.defineProperties;
var __getOwnPropDescs$a = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$e = Object.getOwnPropertySymbols;
var __hasOwnProp$e = Object.prototype.hasOwnProperty;
var __propIsEnum$e = Object.prototype.propertyIsEnumerable;
var __defNormalProp$f = (obj, key, value) => key in obj ? __defProp$f(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$e = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$e.call(b, prop))
      __defNormalProp$f(a, prop, b[prop]);
  if (__getOwnPropSymbols$e)
    for (var prop of __getOwnPropSymbols$e(b)) {
      if (__propIsEnum$e.call(b, prop))
        __defNormalProp$f(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$a = (a, b) => __defProps$a(a, __getOwnPropDescs$a(b));
var __publicField$5 = (obj, key, value) => {
  __defNormalProp$f(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const EMPTY_SELECTOR = "{}";
const METRIC_LABEL = "__name__";
const LIST_ITEM_SIZE = 25;
function buildSelector(labels) {
  let singleMetric = "";
  const selectedLabels = [];
  for (const label of labels) {
    if ((label.name === METRIC_LABEL || label.selected) && label.values && label.values.length > 0) {
      const selectedValues = label.values.filter((value) => value.selected).map((value) => value.name);
      if (selectedValues.length > 1) {
        selectedLabels.push(`${label.name}=~"${selectedValues.map(escapeLabelValueInRegexSelector).join("|")}"`);
      } else if (selectedValues.length === 1) {
        if (label.name === METRIC_LABEL) {
          singleMetric = selectedValues[0];
        } else {
          selectedLabels.push(`${label.name}="${escapeLabelValueInExactSelector(selectedValues[0])}"`);
        }
      }
    }
  }
  return [singleMetric, "{", selectedLabels.join(","), "}"].join("");
}
function facetLabels(labels, possibleLabels, lastFacetted) {
  return labels.map((label) => {
    var _a;
    const possibleValues = possibleLabels[label.name];
    if (possibleValues) {
      let existingValues;
      if (label.name === lastFacetted && label.values) {
        existingValues = label.values;
      } else {
        const selectedValues = new Set(
          ((_a = label.values) == null ? void 0 : _a.filter((value) => value.selected).map((value) => value.name)) || []
        );
        existingValues = possibleValues.map((value) => ({ name: value, selected: selectedValues.has(value) }));
      }
      return __spreadProps$a(__spreadValues$e({}, label), {
        loading: false,
        values: existingValues,
        hidden: !possibleValues,
        facets: existingValues.length
      });
    }
    return __spreadProps$a(__spreadValues$e({}, label), { loading: false, hidden: !possibleValues, values: void 0, facets: 0 });
  });
}
const getStyles$2 = ui.stylesFactory((theme) => ({
  wrapper: css.css({
    backgroundColor: theme.colors.background.secondary,
    padding: theme.spacing(1),
    width: "100%"
  }),
  list: css.css({
    marginTop: theme.spacing(1),
    display: "flex",
    flexWrap: "wrap",
    maxHeight: "200px",
    overflow: "auto",
    alignContent: "flex-start"
  }),
  section: css.css({
    "& + &": {
      margin: `${theme.spacing(2)} 0`
    },
    position: "relative"
  }),
  selector: css.css({
    fontFamily: theme.typography.fontFamilyMonospace,
    marginBottom: theme.spacing(1)
  }),
  status: css.css({
    padding: theme.spacing(0.5),
    color: theme.colors.text.secondary,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    /* using absolute positioning because flex interferes with ellipsis */
    position: "absolute",
    width: "50%",
    right: 0,
    textAlign: "right",
    opacity: 0,
    [theme.transitions.handleMotion("no-preference", "reduce")]: {
      transition: "opacity 100ms linear"
    }
  }),
  statusShowing: css.css({
    opacity: 1
  }),
  error: css.css({
    color: theme.colors.error.main
  }),
  valueList: css.css({
    marginRight: theme.spacing(1),
    resize: "horizontal"
  }),
  valueListWrapper: css.css({
    borderLeft: `1px solid ${theme.colors.border.medium}`,
    margin: `${theme.spacing(1)} 0`,
    padding: `${theme.spacing(1)} 0 ${theme.spacing(1)} ${theme.spacing(1)}`
  }),
  valueListArea: css.css({
    display: "flex",
    flexWrap: "wrap",
    marginTop: theme.spacing(1)
  }),
  valueTitle: css.css({
    marginLeft: `-${theme.spacing(0.5)}`,
    marginBottom: theme.spacing(1)
  }),
  validationStatus: css.css({
    padding: theme.spacing(0.5),
    marginBottom: theme.spacing(1),
    color: theme.colors.text.maxContrast,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  })
}));
class UnthemedPrometheusMetricsBrowser extends React__default["default"].Component {
  constructor() {
    super(...arguments);
    __publicField$5(this, "valueListsRef", React__default["default"].createRef());
    __publicField$5(this, "state", {
      labels: [],
      labelSearchTerm: "",
      metricSearchTerm: "",
      status: "Ready",
      error: "",
      validationStatus: "",
      valueSearchTerm: ""
    });
    __publicField$5(this, "onChangeLabelSearch", (event) => {
      this.setState({ labelSearchTerm: event.target.value });
    });
    __publicField$5(this, "onChangeMetricSearch", (event) => {
      this.setState({ metricSearchTerm: event.target.value });
    });
    __publicField$5(this, "onChangeValueSearch", (event) => {
      this.setState({ valueSearchTerm: event.target.value });
    });
    __publicField$5(this, "onClickRunQuery", () => {
      const selector = buildSelector(this.state.labels);
      this.props.onChange(selector);
    });
    __publicField$5(this, "onClickRunRateQuery", () => {
      const selector = buildSelector(this.state.labels);
      const query = `rate(${selector}[$__rate_interval])`;
      this.props.onChange(query);
    });
    __publicField$5(this, "onClickClear", () => {
      this.setState((state) => {
        const labels = state.labels.map((label) => __spreadProps$a(__spreadValues$e({}, label), {
          values: void 0,
          selected: false,
          loading: false,
          hidden: false,
          facets: void 0
        }));
        return {
          labels,
          labelSearchTerm: "",
          metricSearchTerm: "",
          status: "",
          error: "",
          validationStatus: "",
          valueSearchTerm: ""
        };
      });
      this.props.deleteLastUsedLabels();
      this.fetchValues(METRIC_LABEL, EMPTY_SELECTOR);
    });
    __publicField$5(this, "onClickLabel", (name, value, event) => {
      const label = this.state.labels.find((l) => l.name === name);
      if (!label) {
        return;
      }
      const selected = !label.selected;
      let nextValue = { selected };
      if (label.values && !selected) {
        const values = label.values.map((value2) => __spreadProps$a(__spreadValues$e({}, value2), { selected: false }));
        nextValue = __spreadProps$a(__spreadValues$e({}, nextValue), { facets: 0, values });
      }
      this.setState({ labelSearchTerm: "" });
      this.updateLabelState(name, nextValue, "", () => this.doFacettingForLabel(name));
    });
    __publicField$5(this, "onClickValue", (name, value, event) => {
      const label = this.state.labels.find((l) => l.name === name);
      if (!label || !label.values) {
        return;
      }
      this.setState({ labelSearchTerm: "" });
      const values = label.values.map((v) => __spreadProps$a(__spreadValues$e({}, v), { selected: v.name === value ? !v.selected : v.selected }));
      this.updateLabelState(name, { values }, "", () => this.doFacetting(name));
    });
    __publicField$5(this, "onClickMetric", (name, value, event) => {
      const label = this.state.labels.find((l) => l.name === name);
      if (!label || !label.values) {
        return;
      }
      this.setState({ metricSearchTerm: "" });
      const values = label.values.map((v) => __spreadProps$a(__spreadValues$e({}, v), {
        selected: v.name === value || v.selected ? !v.selected : v.selected
      }));
      const selected = values.some((v) => v.selected);
      this.updateLabelState(name, { selected, values }, "", () => this.doFacetting(name));
    });
    __publicField$5(this, "onClickValidate", () => {
      const selector = buildSelector(this.state.labels);
      this.validateSelector(selector);
    });
    __publicField$5(this, "doFacetting", (lastFacetted) => {
      const selector = buildSelector(this.state.labels);
      if (selector === EMPTY_SELECTOR) {
        const labels = this.state.labels.map((label) => {
          return __spreadProps$a(__spreadValues$e({}, label), { facets: 0, values: void 0, hidden: false });
        });
        this.setState({ labels }, () => {
          this.state.labels.forEach(
            (label) => (label.selected || label.name === METRIC_LABEL) && this.fetchValues(label.name, selector)
          );
        });
      } else {
        this.fetchSeries(selector, lastFacetted);
      }
    });
  }
  updateLabelState(name, updatedFields, status = "", cb) {
    this.setState((state) => {
      const labels = state.labels.map((label) => {
        if (label.name === name) {
          return __spreadValues$e(__spreadValues$e({}, label), updatedFields);
        }
        return label;
      });
      const error = status ? "" : state.error;
      return { labels, status, error, validationStatus: "" };
    }, cb);
  }
  componentDidMount() {
    const { languageProvider, lastUsedLabels } = this.props;
    if (languageProvider) {
      const selectedLabels = lastUsedLabels;
      languageProvider.start(this.props.timeRange).then(() => {
        let rawLabels = languageProvider.getLabelKeys();
        this.fetchValues(METRIC_LABEL, EMPTY_SELECTOR);
        const labels = rawLabels.map((label, i, arr) => ({
          name: label,
          selected: selectedLabels.includes(label),
          loading: false
        }));
        this.setState({ labels }, () => {
          this.state.labels.forEach((label) => {
            if (label.selected) {
              this.fetchValues(label.name, EMPTY_SELECTOR);
            }
          });
        });
      });
    }
  }
  doFacettingForLabel(name) {
    const label = this.state.labels.find((l) => l.name === name);
    if (!label) {
      return;
    }
    const selectedLabels = this.state.labels.filter((label2) => label2.selected).map((label2) => label2.name);
    this.props.storeLastUsedLabels(selectedLabels);
    if (label.selected) {
      if (!label.values) {
        this.fetchValues(name, buildSelector(this.state.labels));
      }
    } else {
      this.doFacetting();
    }
  }
  async fetchValues(name, selector) {
    const { languageProvider } = this.props;
    this.updateLabelState(name, { loading: true }, `Fetching values for ${name}`);
    try {
      let rawValues = await languageProvider.getLabelValues(name);
      if (selector !== buildSelector(this.state.labels)) {
        this.updateLabelState(name, { loading: false });
        return;
      }
      const values = [];
      const { metricsMetadata } = languageProvider;
      for (const labelValue of rawValues) {
        const value = { name: labelValue };
        if (name === METRIC_LABEL && metricsMetadata) {
          const meta = metricsMetadata[labelValue];
          if (meta) {
            value.details = `(${meta.type}) ${meta.help}`;
          }
        }
        values.push(value);
      }
      this.updateLabelState(name, { values, loading: false });
    } catch (error) {
      console.error(error);
    }
  }
  async fetchSeries(selector, lastFacetted) {
    const { languageProvider } = this.props;
    if (lastFacetted) {
      this.updateLabelState(lastFacetted, { loading: true }, `Facetting labels for ${selector}`);
    }
    try {
      const possibleLabels = await languageProvider.fetchSeriesLabels(selector, true);
      if (selector !== buildSelector(this.state.labels)) {
        if (lastFacetted) {
          this.updateLabelState(lastFacetted, { loading: false });
        }
        return;
      }
      if (Object.keys(possibleLabels).length === 0) {
        this.setState({ error: `Empty results, no matching label for ${selector}` });
        return;
      }
      const labels = facetLabels(this.state.labels, possibleLabels, lastFacetted);
      this.setState({ labels, error: "" });
      if (lastFacetted) {
        this.updateLabelState(lastFacetted, { loading: false });
      }
    } catch (error) {
      console.error(error);
    }
  }
  async validateSelector(selector) {
    const { languageProvider } = this.props;
    this.setState({ validationStatus: `Validating selector ${selector}`, error: "" });
    const streams = await languageProvider.fetchSeries(selector);
    this.setState({ validationStatus: `Selector is valid (${streams.length} series found)` });
  }
  render() {
    var _a, _b;
    const { theme } = this.props;
    const { labels, labelSearchTerm, metricSearchTerm, status, error, validationStatus, valueSearchTerm } = this.state;
    const styles = getStyles$2(theme);
    if (labels.length === 0) {
      return /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.wrapper }, /* @__PURE__ */ React__default["default"].createElement(ui.LoadingPlaceholder, { text: "Loading labels..." }));
    }
    let metrics = labels.find((label) => label.name === METRIC_LABEL);
    if (metrics && metricSearchTerm) {
      metrics = __spreadProps$a(__spreadValues$e({}, metrics), {
        values: (_a = metrics.values) == null ? void 0 : _a.filter((value) => value.selected || value.name.includes(metricSearchTerm))
      });
    }
    let nonMetricLabels = labels.filter((label) => !label.hidden && label.name !== METRIC_LABEL);
    if (labelSearchTerm) {
      nonMetricLabels = nonMetricLabels.filter((label) => label.selected || label.name.includes(labelSearchTerm));
    }
    let selectedLabels = nonMetricLabels.filter((label) => label.selected && label.values);
    if (valueSearchTerm) {
      selectedLabels = selectedLabels.map((label) => {
        var _a2;
        return __spreadProps$a(__spreadValues$e({}, label), {
          values: (_a2 = label.values) == null ? void 0 : _a2.filter((value) => value.selected || value.name.includes(valueSearchTerm))
        });
      });
    }
    const selector = buildSelector(this.state.labels);
    const empty = selector === EMPTY_SELECTOR;
    const metricCount = ((_b = metrics == null ? void 0 : metrics.values) == null ? void 0 : _b.length) || 0;
    return /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.wrapper }, /* @__PURE__ */ React__default["default"].createElement(ui.HorizontalGroup, { align: "flex-start", spacing: "lg" }, /* @__PURE__ */ React__default["default"].createElement("div", null, /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.section }, /* @__PURE__ */ React__default["default"].createElement(ui.Label, { description: "Once a metric is selected only possible labels are shown." }, "1. Select a metric"), /* @__PURE__ */ React__default["default"].createElement("div", null, /* @__PURE__ */ React__default["default"].createElement(
      ui.Input,
      {
        onChange: this.onChangeMetricSearch,
        "aria-label": "Filter expression for metric",
        value: metricSearchTerm,
        "data-testid": selectors.components.DataSource.Prometheus.queryEditor.code.metricsBrowser.selectMetric
      }
    )), /* @__PURE__ */ React__default["default"].createElement(
      "div",
      {
        role: "list",
        className: styles.valueListWrapper,
        "data-testid": selectors.components.DataSource.Prometheus.queryEditor.code.metricsBrowser.metricList
      },
      /* @__PURE__ */ React__default["default"].createElement(
        reactWindow.FixedSizeList,
        {
          height: Math.min(450, metricCount * LIST_ITEM_SIZE),
          itemCount: metricCount,
          itemSize: LIST_ITEM_SIZE,
          itemKey: (i) => metrics.values[i].name,
          width: 300,
          className: styles.valueList
        },
        ({ index, style }) => {
          var _a2;
          const value = (_a2 = metrics == null ? void 0 : metrics.values) == null ? void 0 : _a2[index];
          if (!value) {
            return null;
          }
          return /* @__PURE__ */ React__default["default"].createElement("div", { style }, /* @__PURE__ */ React__default["default"].createElement(
            ui.BrowserLabel,
            {
              name: metrics.name,
              value: value == null ? void 0 : value.name,
              title: value.details,
              active: value == null ? void 0 : value.selected,
              onClick: this.onClickMetric,
              searchTerm: metricSearchTerm
            }
          ));
        }
      )
    ))), /* @__PURE__ */ React__default["default"].createElement("div", null, /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.section }, /* @__PURE__ */ React__default["default"].createElement(ui.Label, { description: "Once label values are selected, only possible label combinations are shown." }, "2. Select labels to search in"), /* @__PURE__ */ React__default["default"].createElement("div", null, /* @__PURE__ */ React__default["default"].createElement(
      ui.Input,
      {
        onChange: this.onChangeLabelSearch,
        "aria-label": "Filter expression for label",
        value: labelSearchTerm,
        "data-testid": selectors.components.DataSource.Prometheus.queryEditor.code.metricsBrowser.labelNamesFilter
      }
    )), /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.list, style: { height: 120 } }, nonMetricLabels.map((label) => /* @__PURE__ */ React__default["default"].createElement(
      ui.BrowserLabel,
      {
        key: label.name,
        name: label.name,
        loading: label.loading,
        active: label.selected,
        hidden: label.hidden,
        facets: label.facets,
        onClick: this.onClickLabel,
        searchTerm: labelSearchTerm
      }
    )))), /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.section }, /* @__PURE__ */ React__default["default"].createElement(ui.Label, { description: "Use the search field to find values across selected labels." }, "3. Select (multiple) values for your labels"), /* @__PURE__ */ React__default["default"].createElement("div", null, /* @__PURE__ */ React__default["default"].createElement(
      ui.Input,
      {
        onChange: this.onChangeValueSearch,
        "aria-label": "Filter expression for label values",
        value: valueSearchTerm,
        "data-testid": selectors.components.DataSource.Prometheus.queryEditor.code.metricsBrowser.labelValuesFilter
      }
    )), /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.valueListArea, ref: this.valueListsRef }, selectedLabels.map((label) => {
      var _a2, _b2, _c;
      return /* @__PURE__ */ React__default["default"].createElement(
        "div",
        {
          role: "list",
          key: label.name,
          "aria-label": `Values for ${label.name}`,
          className: styles.valueListWrapper
        },
        /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.valueTitle }, /* @__PURE__ */ React__default["default"].createElement(
          ui.BrowserLabel,
          {
            name: label.name,
            loading: label.loading,
            active: label.selected,
            hidden: label.hidden,
            facets: label.facets || ((_a2 = label.values) == null ? void 0 : _a2.length),
            onClick: this.onClickLabel
          }
        )),
        /* @__PURE__ */ React__default["default"].createElement(
          reactWindow.FixedSizeList,
          {
            height: Math.min(200, LIST_ITEM_SIZE * (((_b2 = label.values) == null ? void 0 : _b2.length) || 0)),
            itemCount: ((_c = label.values) == null ? void 0 : _c.length) || 0,
            itemSize: 28,
            itemKey: (i) => label.values[i].name,
            width: 200,
            className: styles.valueList
          },
          ({ index, style }) => {
            var _a3;
            const value = (_a3 = label.values) == null ? void 0 : _a3[index];
            if (!value) {
              return null;
            }
            return /* @__PURE__ */ React__default["default"].createElement("div", { style }, /* @__PURE__ */ React__default["default"].createElement(
              ui.BrowserLabel,
              {
                name: label.name,
                value: value == null ? void 0 : value.name,
                active: value == null ? void 0 : value.selected,
                onClick: this.onClickValue,
                searchTerm: valueSearchTerm
              }
            ));
          }
        )
      );
    }))))), /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.section }, /* @__PURE__ */ React__default["default"].createElement(ui.Label, null, "4. Resulting selector"), /* @__PURE__ */ React__default["default"].createElement("div", { "aria-label": "selector", className: styles.selector }, selector), validationStatus && /* @__PURE__ */ React__default["default"].createElement("div", { className: styles.validationStatus }, validationStatus), /* @__PURE__ */ React__default["default"].createElement(ui.HorizontalGroup, null, /* @__PURE__ */ React__default["default"].createElement(
      ui.Button,
      {
        "data-testid": selectors.components.DataSource.Prometheus.queryEditor.code.metricsBrowser.useQuery,
        "aria-label": "Use selector for query button",
        disabled: empty,
        onClick: this.onClickRunQuery
      },
      "Use query"
    ), /* @__PURE__ */ React__default["default"].createElement(
      ui.Button,
      {
        "data-testid": selectors.components.DataSource.Prometheus.queryEditor.code.metricsBrowser.useAsRateQuery,
        "aria-label": "Use selector as metrics button",
        variant: "secondary",
        disabled: empty,
        onClick: this.onClickRunRateQuery
      },
      "Use as rate query"
    ), /* @__PURE__ */ React__default["default"].createElement(
      ui.Button,
      {
        "data-testid": selectors.components.DataSource.Prometheus.queryEditor.code.metricsBrowser.validateSelector,
        "aria-label": "Validate submit button",
        variant: "secondary",
        disabled: empty,
        onClick: this.onClickValidate
      },
      "Validate selector"
    ), /* @__PURE__ */ React__default["default"].createElement(
      ui.Button,
      {
        "data-testid": selectors.components.DataSource.Prometheus.queryEditor.code.metricsBrowser.clear,
        "aria-label": "Selector clear button",
        variant: "secondary",
        onClick: this.onClickClear
      },
      "Clear"
    ), /* @__PURE__ */ React__default["default"].createElement("div", { className: css.cx(styles.status, (status || error) && styles.statusShowing) }, /* @__PURE__ */ React__default["default"].createElement("span", { className: error ? styles.error : "" }, error || status)))));
  }
}
const PrometheusMetricsBrowser = ui.withTheme2(UnthemedPrometheusMetricsBrowser);

function makeStorageService() {
  const strings = /* @__PURE__ */ new Map();
  strings.set("expandSuggestionDocs", true.toString());
  return {
    // we do not implement the on* handlers
    onDidChangeValue: (data) => void 0,
    onDidChangeTarget: (data) => void 0,
    onWillSaveState: (data) => void 0,
    get: (key, scope, fallbackValue) => {
      var _a;
      return (_a = strings.get(key)) != null ? _a : fallbackValue;
    },
    getBoolean: (key, scope, fallbackValue) => {
      const val = strings.get(key);
      if (val !== void 0) {
        return val === "true";
      } else {
        return fallbackValue;
      }
    },
    getNumber: (key, scope, fallbackValue) => {
      const val = strings.get(key);
      if (val !== void 0) {
        return parseInt(val, 10);
      } else {
        return fallbackValue;
      }
    },
    store: (key, value, scope, target) => {
      if (value === null || value === void 0) {
        strings.delete(key);
      } else {
        strings.set(key, value.toString());
      }
    },
    remove: (key, scope) => {
      strings.delete(key);
    },
    keys: (scope, target) => {
      return Array.from(strings.keys());
    },
    logStorage: () => {
      console.log("logStorage: not implemented");
    },
    migrate: () => {
      return Promise.resolve(void 0);
    },
    isNew: (scope) => {
      return true;
    },
    flush: (reason) => {
      return Promise.resolve(void 0);
    }
  };
}
let overrideServices = null;
function getOverrideServices() {
  if (overrideServices === null) {
    overrideServices = {
      storageService: makeStorageService()
    };
  }
  return overrideServices;
}

class NeverCaseError extends Error {
  constructor(value) {
    super("should never happen");
  }
}

const metricNamesSearchClient = new uFuzzy__default["default"]({ intraMode: 1 });
function getAllMetricNamesCompletions(dataProvider) {
  var _a, _b;
  let metricNames = dataProvider.getAllMetricNames();
  if (runtime.config.featureToggles.prometheusCodeModeMetricNamesSearch && metricNames.length > dataProvider.metricNamesSuggestionLimit) {
    const { monacoSettings } = dataProvider;
    monacoSettings.enableAutocompleteSuggestionsUpdate();
    if (monacoSettings.inputInRange) {
      metricNames = (_b = (_a = metricNamesSearchClient.filter(metricNames, monacoSettings.inputInRange)) == null ? void 0 : _a.slice(0, dataProvider.metricNamesSuggestionLimit).map((idx) => metricNames[idx])) != null ? _b : [];
    } else {
      metricNames = metricNames.slice(0, dataProvider.metricNamesSuggestionLimit);
    }
  }
  return dataProvider.metricNamesToMetrics(metricNames).map((metric) => ({
    type: "METRIC_NAME",
    label: metric.name,
    insertText: metric.name,
    detail: `${metric.name} : ${metric.type}`,
    documentation: metric.help
  }));
}
const FUNCTION_COMPLETIONS = FUNCTIONS.map((f) => {
  var _a;
  return {
    type: "FUNCTION",
    label: f.label,
    insertText: (_a = f.insertText) != null ? _a : "",
    // i don't know what to do when this is nullish. it should not be.
    detail: f.detail,
    documentation: f.documentation
  };
});
async function getAllFunctionsAndMetricNamesCompletions(dataProvider) {
  const metricNames = getAllMetricNamesCompletions(dataProvider);
  return [...FUNCTION_COMPLETIONS, ...metricNames];
}
const DURATION_COMPLETIONS = [
  "$__interval",
  "$__range",
  "$__rate_interval",
  "1m",
  "5m",
  "10m",
  "30m",
  "1h",
  "1d"
].map((text) => ({
  type: "DURATION",
  label: text,
  insertText: text
}));
function getAllHistoryCompletions(dataProvider) {
  const allHistory = dataProvider.getHistory();
  return allHistory.slice(0, 10).map((expr) => ({
    type: "HISTORY",
    label: expr,
    insertText: expr
  }));
}
function makeSelector(metricName, labels) {
  const allLabels = [...labels];
  if (metricName !== void 0) {
    allLabels.push({ name: "__name__", value: metricName, op: "=" });
  }
  const allLabelTexts = allLabels.map(
    (label) => `${label.name}${label.op}"${escapeLabelValueInExactSelector(label.value)}"`
  );
  return `{${allLabelTexts.join(",")}}`;
}
async function getLabelNames(metric, otherLabels, dataProvider) {
  if (metric === void 0 && otherLabels.length === 0) {
    return Promise.resolve(dataProvider.getAllLabelNames());
  } else {
    const selector = makeSelector(metric, otherLabels);
    return await dataProvider.getSeriesLabels(selector, otherLabels);
  }
}
async function getLabelNamesForCompletions(metric, suffix, triggerOnInsert, otherLabels, dataProvider) {
  const labelNames = await getLabelNames(metric, otherLabels, dataProvider);
  return labelNames.map((text) => ({
    type: "LABEL_NAME",
    label: text,
    insertText: `${text}${suffix}`,
    triggerOnInsert
  }));
}
async function getLabelNamesForSelectorCompletions(metric, otherLabels, dataProvider) {
  return getLabelNamesForCompletions(metric, "=", true, otherLabels, dataProvider);
}
async function getLabelNamesForByCompletions(metric, otherLabels, dataProvider) {
  return getLabelNamesForCompletions(metric, "", false, otherLabels, dataProvider);
}
async function getLabelValues(metric, labelName, otherLabels, dataProvider) {
  if (metric === void 0 && otherLabels.length === 0) {
    return dataProvider.getLabelValues(labelName);
  } else {
    const selector = makeSelector(metric, otherLabels);
    return await dataProvider.getSeriesValues(labelName, selector);
  }
}
async function getLabelValuesForMetricCompletions(metric, labelName, betweenQuotes, otherLabels, dataProvider) {
  const values = await getLabelValues(metric, labelName, otherLabels, dataProvider);
  return values.map((text) => ({
    type: "LABEL_VALUE",
    label: text,
    insertText: betweenQuotes ? text : `"${text}"`
    // FIXME: escaping strange characters?
  }));
}
function getCompletions(situation, dataProvider) {
  switch (situation.type) {
    case "IN_DURATION":
      return Promise.resolve(DURATION_COMPLETIONS);
    case "IN_FUNCTION":
      return getAllFunctionsAndMetricNamesCompletions(dataProvider);
    case "AT_ROOT": {
      return getAllFunctionsAndMetricNamesCompletions(dataProvider);
    }
    case "EMPTY": {
      const metricNames = getAllMetricNamesCompletions(dataProvider);
      const historyCompletions = getAllHistoryCompletions(dataProvider);
      return Promise.resolve([...historyCompletions, ...FUNCTION_COMPLETIONS, ...metricNames]);
    }
    case "IN_LABEL_SELECTOR_NO_LABEL_NAME":
      return getLabelNamesForSelectorCompletions(situation.metricName, situation.otherLabels, dataProvider);
    case "IN_GROUPING":
      return getLabelNamesForByCompletions(situation.metricName, situation.otherLabels, dataProvider);
    case "IN_LABEL_SELECTOR_WITH_LABEL_NAME":
      return getLabelValuesForMetricCompletions(
        situation.metricName,
        situation.labelName,
        situation.betweenQuotes,
        situation.otherLabels,
        dataProvider
      );
    default:
      throw new NeverCaseError(situation);
  }
}

function move(node, direction) {
  switch (direction) {
    case "parent":
      return node.parent;
    case "firstChild":
      return node.firstChild;
    case "lastChild":
      return node.lastChild;
    case "nextSibling":
      return node.nextSibling;
    default:
      throw new NeverCaseError(direction);
  }
}
function walk(node, path) {
  let current = node;
  for (const [direction, expectedType] of path) {
    current = move(current, direction);
    if (current === null) {
      return null;
    }
    if (current.type.id !== expectedType) {
      return null;
    }
  }
  return current;
}
function getNodeText(node, text) {
  return text.slice(node.from, node.to);
}
function parsePromQLStringLiteral(text) {
  const inside = text.slice(1, text.length - 1);
  if (text.startsWith('"') && text.endsWith('"')) {
    return inside.replace(/\\"/, '"');
  }
  if (text.startsWith("'") && text.endsWith("'")) {
    return inside.replace(/\\'/, "'");
  }
  if (text.startsWith("`") && text.endsWith("`")) {
    return inside;
  }
  throw new Error("FIXME: invalid string literal");
}
function isPathMatch(resolverPath, cursorPath) {
  return resolverPath.every((item, index) => item === cursorPath[index]);
}
const ERROR_NODE_NAME = 0;
const RESOLVERS = [
  {
    path: [lezerPromql.LabelMatchers, lezerPromql.VectorSelector],
    fun: resolveLabelKeysWithEquals
  },
  {
    path: [lezerPromql.PromQL],
    fun: resolveTopLevel
  },
  {
    path: [lezerPromql.FunctionCallBody],
    fun: resolveInFunction
  },
  {
    path: [lezerPromql.StringLiteral, lezerPromql.LabelMatcher],
    fun: resolveLabelMatcher
  },
  {
    path: [ERROR_NODE_NAME, lezerPromql.BinaryExpr, lezerPromql.PromQL],
    fun: resolveTopLevel
  },
  {
    path: [ERROR_NODE_NAME, lezerPromql.LabelMatcher],
    fun: resolveLabelMatcher
  },
  {
    path: [ERROR_NODE_NAME, lezerPromql.MatrixSelector],
    fun: resolveDurations
  },
  {
    path: [lezerPromql.GroupingLabels],
    fun: resolveLabelsForGrouping
  }
];
const LABEL_OP_MAP = /* @__PURE__ */ new Map([
  [lezerPromql.EqlSingle, "="],
  [lezerPromql.EqlRegex, "=~"],
  [lezerPromql.Neq, "!="],
  [lezerPromql.NeqRegex, "!~"]
]);
function getLabelOp(opNode) {
  var _a;
  const opChild = opNode.firstChild;
  if (opChild === null) {
    return null;
  }
  return (_a = LABEL_OP_MAP.get(opChild.type.id)) != null ? _a : null;
}
function getLabel(labelMatcherNode, text) {
  if (labelMatcherNode.type.id !== lezerPromql.LabelMatcher) {
    return null;
  }
  const nameNode = walk(labelMatcherNode, [["firstChild", lezerPromql.LabelName]]);
  if (nameNode === null) {
    return null;
  }
  const opNode = walk(nameNode, [["nextSibling", lezerPromql.MatchOp]]);
  if (opNode === null) {
    return null;
  }
  const op = getLabelOp(opNode);
  if (op === null) {
    return null;
  }
  const valueNode = walk(labelMatcherNode, [["lastChild", lezerPromql.StringLiteral]]);
  if (valueNode === null) {
    return null;
  }
  const name = getNodeText(nameNode, text);
  const value = parsePromQLStringLiteral(getNodeText(valueNode, text));
  return { name, value, op };
}
function getLabels(labelMatchersNode, text) {
  if (labelMatchersNode.type.id !== lezerPromql.LabelMatchers) {
    return [];
  }
  const labelNodes = labelMatchersNode.getChildren(lezerPromql.LabelMatcher);
  return labelNodes.map((ln) => getLabel(ln, text)).filter(notEmpty);
}
function getNodeChildren(node) {
  let child = node.firstChild;
  const children = [];
  while (child !== null) {
    children.push(child);
    child = child.nextSibling;
  }
  return children;
}
function getNodeInSubtree(node, typeId) {
  if (node.type.id === typeId) {
    return node;
  }
  const children = getNodeChildren(node);
  for (const child of children) {
    const n = getNodeInSubtree(child, typeId);
    if (n !== null) {
      return n;
    }
  }
  return null;
}
function resolveLabelsForGrouping(node, text, pos) {
  const aggrExpNode = walk(node, [
    ["parent", lezerPromql.AggregateModifier],
    ["parent", lezerPromql.AggregateExpr]
  ]);
  if (aggrExpNode === null) {
    return null;
  }
  const bodyNode = aggrExpNode.getChild(lezerPromql.FunctionCallBody);
  if (bodyNode === null) {
    return null;
  }
  const metricIdNode = getNodeInSubtree(bodyNode, lezerPromql.Identifier);
  if (metricIdNode === null) {
    return null;
  }
  const metricName = getNodeText(metricIdNode, text);
  return {
    type: "IN_GROUPING",
    metricName,
    otherLabels: []
  };
}
function resolveLabelMatcher(node, text, pos) {
  const inStringNode = !node.type.isError;
  const parent = walk(node, [["parent", lezerPromql.LabelMatcher]]);
  if (parent === null) {
    return null;
  }
  const labelNameNode = walk(parent, [["firstChild", lezerPromql.LabelName]]);
  if (labelNameNode === null) {
    return null;
  }
  const labelName = getNodeText(labelNameNode, text);
  const labelMatchersNode = walk(parent, [["parent", lezerPromql.LabelMatchers]]);
  if (labelMatchersNode === null) {
    return null;
  }
  const allLabels = getLabels(labelMatchersNode, text);
  const otherLabels = allLabels.filter((label) => label.name !== labelName);
  const metricNameNode = walk(labelMatchersNode, [
    ["parent", lezerPromql.VectorSelector],
    ["firstChild", lezerPromql.Identifier]
  ]);
  if (metricNameNode === null) {
    return {
      type: "IN_LABEL_SELECTOR_WITH_LABEL_NAME",
      labelName,
      betweenQuotes: inStringNode,
      otherLabels
    };
  }
  const metricName = getNodeText(metricNameNode, text);
  return {
    type: "IN_LABEL_SELECTOR_WITH_LABEL_NAME",
    metricName,
    labelName,
    betweenQuotes: inStringNode,
    otherLabels
  };
}
function resolveTopLevel(node, text, pos) {
  return {
    type: "AT_ROOT"
  };
}
function resolveInFunction(node, text, pos) {
  return {
    type: "IN_FUNCTION"
  };
}
function resolveDurations(node, text, pos) {
  return {
    type: "IN_DURATION"
  };
}
function resolveLabelKeysWithEquals(node, text, pos) {
  const child = walk(node, [["firstChild", lezerPromql.LabelMatcher]]);
  if (child !== null) {
    const textToCheck = text.slice(child.to, pos);
    if (!textToCheck.includes(",")) {
      return null;
    }
  }
  const metricNameNode = walk(node, [
    ["parent", lezerPromql.VectorSelector],
    ["firstChild", lezerPromql.Identifier]
  ]);
  const otherLabels = getLabels(node, text);
  if (metricNameNode === null) {
    return {
      type: "IN_LABEL_SELECTOR_NO_LABEL_NAME",
      otherLabels
    };
  }
  const metricName = getNodeText(metricNameNode, text);
  return {
    type: "IN_LABEL_SELECTOR_NO_LABEL_NAME",
    metricName,
    otherLabels
  };
}
function getErrorNode(tree, pos) {
  const cur = tree.cursorAt(pos);
  while (true) {
    if (cur.from === pos && cur.to === pos) {
      const { node } = cur;
      if (node.type.isError) {
        return node;
      }
    }
    if (!cur.next()) {
      break;
    }
  }
  return null;
}
function getSituation(text, pos) {
  if (text === "") {
    return {
      type: "EMPTY"
    };
  }
  const tree = lezerPromql.parser.parse(text);
  const maybeErrorNode = getErrorNode(tree, pos);
  const cur = maybeErrorNode != null ? maybeErrorNode.cursor() : tree.cursorAt(pos);
  const currentNode = cur.node;
  const ids = [cur.type.id];
  while (cur.parent()) {
    ids.push(cur.type.id);
  }
  for (let resolver of RESOLVERS) {
    if (isPathMatch(resolver.path, ids)) {
      return resolver.fun(currentNode, text, pos);
    }
  }
  return null;
}
function notEmpty(value) {
  return value !== null && value !== void 0;
}

function getSuggestOptions() {
  return {
    // monaco-editor sometimes provides suggestions automatically, i am not
    // sure based on what, seems to be by analyzing the words already
    // written.
    // to try it out:
    // - enter `go_goroutines{job~`
    // - have the cursor at the end of the string
    // - press ctrl-enter
    // - you will get two suggestions
    // those were not provided by grafana, they are offered automatically.
    // i want to remove those. the only way i found is:
    // - every suggestion-item has a `kind` attribute,
    //   that controls the icon to the left of the suggestion.
    // - items auto-generated by monaco have `kind` set to `text`.
    // - we make sure grafana-provided suggestions do not have `kind` set to `text`.
    // - and then we tell monaco not to show suggestions of kind `text`
    showWords: false
  };
}
function getMonacoCompletionItemKind(type, monaco) {
  switch (type) {
    case "DURATION":
      return monaco.languages.CompletionItemKind.Unit;
    case "FUNCTION":
      return monaco.languages.CompletionItemKind.Variable;
    case "HISTORY":
      return monaco.languages.CompletionItemKind.Snippet;
    case "LABEL_NAME":
      return monaco.languages.CompletionItemKind.Enum;
    case "LABEL_VALUE":
      return monaco.languages.CompletionItemKind.EnumMember;
    case "METRIC_NAME":
      return monaco.languages.CompletionItemKind.Constructor;
    default:
      throw new NeverCaseError(type);
  }
}
function getCompletionProvider(monaco, dataProvider) {
  const provideCompletionItems = (model, position) => {
    var _a;
    const word = model.getWordAtPosition(position);
    const range = word != null ? monaco.Range.lift({
      startLineNumber: position.lineNumber,
      endLineNumber: position.lineNumber,
      startColumn: word.startColumn,
      endColumn: word.endColumn
    }) : monaco.Range.fromPositions(position);
    const positionClone = {
      column: position.column,
      lineNumber: position.lineNumber
    };
    dataProvider.monacoSettings.setInputInRange(model.getValueInRange(range));
    if (window.getSelection) {
      const selectedText = (_a = window.getSelection()) == null ? void 0 : _a.toString();
      if (selectedText && selectedText.length > 0) {
        positionClone.column = positionClone.column - selectedText.length;
      }
    }
    const offset = model.getOffsetAt(positionClone);
    const situation = getSituation(model.getValue(), offset);
    const completionsPromise = situation != null ? getCompletions(situation, dataProvider) : Promise.resolve([]);
    return completionsPromise.then((items) => {
      const maxIndexDigits = items.length.toString().length;
      const suggestions = items.map((item, index) => ({
        kind: getMonacoCompletionItemKind(item.type, monaco),
        label: item.label,
        insertText: item.insertText,
        detail: item.detail,
        documentation: item.documentation,
        sortText: index.toString().padStart(maxIndexDigits, "0"),
        // to force the order we have
        range,
        command: item.triggerOnInsert ? {
          id: "editor.action.triggerSuggest",
          title: ""
        } : void 0
      }));
      return { suggestions, incomplete: dataProvider.monacoSettings.suggestionsIncomplete };
    });
  };
  return {
    triggerCharacters: ["{", ",", "[", "(", "=", "~", " ", '"'],
    provideCompletionItems
  };
}

var __defProp$e = Object.defineProperty;
var __defNormalProp$e = (obj, key, value) => key in obj ? __defProp$e(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$4 = (obj, key, value) => {
  __defNormalProp$e(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const CODE_MODE_SUGGESTIONS_INCOMPLETE_EVENT = "codeModeSuggestionsIncomplete";
function isSuggestionsIncompleteEvent(e) {
  return e.type === CODE_MODE_SUGGESTIONS_INCOMPLETE_EVENT && "detail" in e && typeof e.detail === "object" && e.detail !== null && "limit" in e.detail && "datasourceUid" in e.detail;
}
class DataProvider {
  constructor(params) {
    __publicField$4(this, "languageProvider");
    __publicField$4(this, "historyProvider");
    __publicField$4(this, "getSeriesLabels");
    __publicField$4(this, "getSeriesValues");
    __publicField$4(this, "getAllLabelNames");
    __publicField$4(this, "getLabelValues");
    __publicField$4(this, "metricNamesSuggestionLimit");
    /**
     * The text that's been typed so far within the current {@link Monaco.Range | Range}.
     *
     * @remarks
     * This is useful with fuzzy searching items to provide as Monaco autocomplete suggestions.
     */
    __publicField$4(this, "inputInRange");
    __publicField$4(this, "suggestionsIncomplete");
    this.languageProvider = params.languageProvider;
    this.historyProvider = params.historyProvider;
    this.inputInRange = "";
    this.metricNamesSuggestionLimit = this.languageProvider.datasource.metricNamesAutocompleteSuggestionLimit;
    this.suggestionsIncomplete = false;
    this.getSeriesLabels = this.languageProvider.getSeriesLabels.bind(this.languageProvider);
    this.getSeriesValues = this.languageProvider.getSeriesValues.bind(this.languageProvider);
    this.getAllLabelNames = this.languageProvider.getLabelKeys.bind(this.languageProvider);
    this.getLabelValues = this.languageProvider.getLabelValues.bind(this.languageProvider);
  }
  getHistory() {
    return this.historyProvider.map((h) => h.query.expr).filter(Boolean);
  }
  getAllMetricNames() {
    return this.languageProvider.metrics;
  }
  metricNamesToMetrics(metricNames) {
    const { metricsMetadata } = this.languageProvider;
    const result = metricNames.map((m) => {
      var _a, _b;
      const metaItem = metricsMetadata == null ? void 0 : metricsMetadata[m];
      return {
        name: m,
        help: (_a = metaItem == null ? void 0 : metaItem.help) != null ? _a : "",
        type: (_b = metaItem == null ? void 0 : metaItem.type) != null ? _b : ""
      };
    });
    return result;
  }
  enableAutocompleteSuggestionsUpdate() {
    this.suggestionsIncomplete = true;
    dispatchEvent(
      new CustomEvent(CODE_MODE_SUGGESTIONS_INCOMPLETE_EVENT, {
        detail: { limit: this.metricNamesSuggestionLimit, datasourceUid: this.languageProvider.datasource.uid }
      })
    );
  }
  setInputInRange(textInput) {
    this.inputInRange = textInput;
  }
  get monacoSettings() {
    return {
      /**
       * Enable autocomplete suggestions update on every input change.
       *
       * @remarks
       * If fuzzy search is used in `getCompletions` to trim down results to improve performance,
       * we need to instruct Monaco to update the completions on every input change, so that the
       * completions reflect the current input.
       */
      enableAutocompleteSuggestionsUpdate: this.enableAutocompleteSuggestionsUpdate.bind(this),
      inputInRange: this.inputInRange,
      setInputInRange: this.setInputInRange.bind(this),
      suggestionsIncomplete: this.suggestionsIncomplete
    };
  }
}

const ErrorId = 0;
function validateQuery(query, interpolatedQuery, queryLines, parser) {
  if (!query) {
    return false;
  }
  const interpolatedErrors = parseQuery(interpolatedQuery, parser);
  if (!interpolatedErrors.length) {
    return false;
  }
  let parseErrors = interpolatedErrors;
  if (query !== interpolatedQuery) {
    const queryErrors = parseQuery(query, parser);
    parseErrors = interpolatedErrors.flatMap(
      (interpolatedError) => queryErrors.filter((queryError) => interpolatedError.text === queryError.text) || interpolatedError
    );
  }
  return parseErrors.map((parseError) => findErrorBoundary(query, queryLines, parseError)).filter(isErrorBoundary);
}
function parseQuery(query, parser) {
  const parseErrors = [];
  const tree = parser.parse(query);
  tree.iterate({
    enter: (nodeRef) => {
      if (nodeRef.type.id === ErrorId) {
        const node = nodeRef.node;
        parseErrors.push({
          node,
          text: query.substring(node.from, node.to)
        });
      }
    }
  });
  return parseErrors;
}
function findErrorBoundary(query, queryLines, parseError) {
  if (queryLines.length === 1) {
    const isEmptyString = parseError.node.from === parseError.node.to;
    const errorNode = isEmptyString && parseError.node.parent ? parseError.node.parent : parseError.node;
    const error = isEmptyString ? query.substring(errorNode.from, errorNode.to) : parseError.text;
    return {
      startLineNumber: 1,
      startColumn: errorNode.from + 1,
      endLineNumber: 1,
      endColumn: errorNode.to + 1,
      error
    };
  }
  let startPos = 0, endPos = 0;
  for (let line = 0; line < queryLines.length; line++) {
    endPos = startPos + queryLines[line].length;
    if (parseError.node.from > endPos) {
      startPos += queryLines[line].length + 1;
      continue;
    }
    return {
      startLineNumber: line + 1,
      startColumn: parseError.node.from - startPos + 1,
      endLineNumber: line + 1,
      endColumn: parseError.node.to - startPos + 1,
      error: parseError.text
    };
  }
  return null;
}
function isErrorBoundary(boundary) {
  return boundary !== null;
}
const placeHolderScopedVars = {
  __interval: { text: "1s", value: "1s" },
  __rate_interval: { text: "1s", value: "1s" },
  __auto: { text: "1s", value: "1s" },
  __interval_ms: { text: "1000", value: 1e3 },
  __range_ms: { text: "1000", value: 1e3 },
  __range_s: { text: "1", value: 1 },
  __range: { text: "1s", value: "1s" }
};

const languageConfiguration = {
  // the default separators except `@$`
  wordPattern: /(-?\d*\.\d\w*)|([^`~!#%^&*()\-=+\[{\]}\\|;:'",.<>\/?\s]+)/g,
  // Not possible to make comments in PromQL syntax
  comments: {
    lineComment: "#"
  },
  brackets: [
    ["{", "}"],
    ["[", "]"],
    ["(", ")"]
  ],
  autoClosingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: '"', close: '"' },
    { open: "'", close: "'" }
  ],
  surroundingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: '"', close: '"' },
    { open: "'", close: "'" },
    { open: "<", close: ">" }
  ],
  folding: {}
};
const aggregations = [
  "sum",
  "min",
  "max",
  "avg",
  "group",
  "stddev",
  "stdvar",
  "count",
  "count_values",
  "bottomk",
  "topk",
  "quantile"
];
const functions = [
  "abs",
  "absent",
  "ceil",
  "changes",
  "clamp_max",
  "clamp_min",
  "day_of_month",
  "day_of_week",
  "days_in_month",
  "delta",
  "deriv",
  "exp",
  "floor",
  "histogram_quantile",
  "histogram_avg",
  "histogram_count",
  "histogram_sum",
  "histogram_fraction",
  "histogram_stddev",
  "histogram_stdvar",
  "holt_winters",
  "hour",
  "idelta",
  "increase",
  "irate",
  "label_join",
  "label_replace",
  "ln",
  "log2",
  "log10",
  "minute",
  "month",
  "predict_linear",
  "rate",
  "resets",
  "round",
  "scalar",
  "sort",
  "sort_desc",
  "sqrt",
  "time",
  "timestamp",
  "vector",
  "year"
];
const aggregationsOverTime = [];
for (let _i = 0, aggregations_1 = aggregations; _i < aggregations_1.length; _i++) {
  let agg = aggregations_1[_i];
  aggregationsOverTime.push(agg + "_over_time");
}
const vectorMatching = ["on", "ignoring", "group_right", "group_left", "by", "without"];
const vectorMatchingRegex = "(" + vectorMatching.reduce(function(prev, curr) {
  return prev + "|" + curr;
}) + ")";
const operators = ["+", "-", "*", "/", "%", "^", "==", "!=", ">", "<", ">=", "<=", "and", "or", "unless"];
const offsetModifier = ["offset"];
const keywords = aggregations.concat(functions).concat(aggregationsOverTime).concat(vectorMatching).concat(offsetModifier);
const language = {
  ignoreCase: false,
  defaultToken: "",
  tokenPostfix: ".promql",
  keywords,
  operators,
  vectorMatching: vectorMatchingRegex,
  // we include these common regular expressions
  symbols: /[=><!~?:&|+\-*\/^%]+/,
  escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
  digits: /\d+(_+\d+)*/,
  octaldigits: /[0-7]+(_+[0-7]+)*/,
  binarydigits: /[0-1]+(_+[0-1]+)*/,
  hexdigits: /[[0-9a-fA-F]+(_+[0-9a-fA-F]+)*/,
  integersuffix: /(ll|LL|u|U|l|L)?(ll|LL|u|U|l|L)?/,
  floatsuffix: /[fFlL]?/,
  // The main tokenizer for our languages
  tokenizer: {
    root: [
      // 'by', 'without' and vector matching
      [/@vectorMatching\s*(?=\()/, "type", "@clauses"],
      // labels
      [/[a-z_]\w*(?=\s*(=|!=|=~|!~))/, "tag"],
      // comments
      [/(^#.*$)/, "comment"],
      // all keywords have the same color
      [
        /[a-zA-Z_]\w*/,
        {
          cases: {
            "@keywords": "type",
            "@default": "identifier"
          }
        }
      ],
      // strings
      [/"([^"\\]|\\.)*$/, "string.invalid"],
      [/'([^'\\]|\\.)*$/, "string.invalid"],
      [/"/, "string", "@string_double"],
      [/'/, "string", "@string_single"],
      [/`/, "string", "@string_backtick"],
      // whitespace
      { include: "@whitespace" },
      // delimiters and operators
      [/[{}()\[\]]/, "@brackets"],
      [/[<>](?!@symbols)/, "@brackets"],
      [
        /@symbols/,
        {
          cases: {
            "@operators": "delimiter",
            "@default": ""
          }
        }
      ],
      // numbers
      [/\d+[smhdwy]/, "number"],
      [/\d*\d+[eE]([\-+]?\d+)?(@floatsuffix)/, "number.float"],
      [/\d*\.\d+([eE][\-+]?\d+)?(@floatsuffix)/, "number.float"],
      [/0[xX][0-9a-fA-F']*[0-9a-fA-F](@integersuffix)/, "number.hex"],
      [/0[0-7']*[0-7](@integersuffix)/, "number.octal"],
      [/0[bB][0-1']*[0-1](@integersuffix)/, "number.binary"],
      [/\d[\d']*\d(@integersuffix)/, "number"],
      [/\d(@integersuffix)/, "number"]
    ],
    string_double: [
      [/[^\\"]+/, "string"],
      [/@escapes/, "string.escape"],
      [/\\./, "string.escape.invalid"],
      [/"/, "string", "@pop"]
    ],
    string_single: [
      [/[^\\']+/, "string"],
      [/@escapes/, "string.escape"],
      [/\\./, "string.escape.invalid"],
      [/'/, "string", "@pop"]
    ],
    string_backtick: [
      [/[^\\`$]+/, "string"],
      [/@escapes/, "string.escape"],
      [/\\./, "string.escape.invalid"],
      [/`/, "string", "@pop"]
    ],
    clauses: [
      [/[^(,)]/, "tag"],
      [/\)/, "identifier", "@pop"]
    ],
    whitespace: [[/[ \t\r\n]+/, "white"]]
  }
};

var __defProp$d = Object.defineProperty;
var __defProps$9 = Object.defineProperties;
var __getOwnPropDescs$9 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$d = Object.getOwnPropertySymbols;
var __hasOwnProp$d = Object.prototype.hasOwnProperty;
var __propIsEnum$d = Object.prototype.propertyIsEnumerable;
var __defNormalProp$d = (obj, key, value) => key in obj ? __defProp$d(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$d = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$d.call(b, prop))
      __defNormalProp$d(a, prop, b[prop]);
  if (__getOwnPropSymbols$d)
    for (var prop of __getOwnPropSymbols$d(b)) {
      if (__propIsEnum$d.call(b, prop))
        __defNormalProp$d(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$9 = (a, b) => __defProps$9(a, __getOwnPropDescs$9(b));
var __objRest$2 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$d.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$d)
    for (var prop of __getOwnPropSymbols$d(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$d.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const options = {
  codeLens: false,
  contextmenu: false,
  // we need `fixedOverflowWidgets` because otherwise in grafana-dashboards
  // the popup is clipped by the panel-visualizations.
  fixedOverflowWidgets: true,
  folding: false,
  fontSize: 14,
  lineDecorationsWidth: 8,
  // used as "padding-left"
  lineNumbers: "off",
  minimap: { enabled: false },
  overviewRulerBorder: false,
  overviewRulerLanes: 0,
  padding: {
    // these numbers were picked so that visually this matches the previous version
    // of the query-editor the best
    top: 4,
    bottom: 5
  },
  renderLineHighlight: "none",
  scrollbar: {
    vertical: "hidden",
    verticalScrollbarSize: 8,
    // used as "padding-right"
    horizontal: "hidden",
    horizontalScrollbarSize: 0,
    alwaysConsumeMouseWheel: false
  },
  scrollBeyondLastLine: false,
  suggest: getSuggestOptions(),
  suggestFontSize: 12,
  wordWrap: "on"
};
const EDITOR_HEIGHT_OFFSET = 2;
const PROMQL_LANG_ID = monacoPromql.promLanguageDefinition.id;
let PROMQL_SETUP_STARTED = false;
function ensurePromQL(monaco) {
  if (PROMQL_SETUP_STARTED === false) {
    PROMQL_SETUP_STARTED = true;
    const { aliases, extensions, mimetypes } = monacoPromql.promLanguageDefinition;
    monaco.languages.register({ id: PROMQL_LANG_ID, aliases, extensions, mimetypes });
    monaco.languages.setMonarchTokensProvider(PROMQL_LANG_ID, language);
    monaco.languages.setLanguageConfiguration(PROMQL_LANG_ID, languageConfiguration);
  }
}
const getStyles$1 = (theme, placeholder) => {
  return {
    container: css.css({
      borderRadius: theme.shape.radius.default,
      border: `1px solid ${theme.components.input.borderColor}`,
      display: "flex",
      flexDirection: "row",
      justifyContent: "start",
      alignItems: "center",
      height: "100%"
    }),
    placeholder: css.css({
      "::after": {
        content: `'${placeholder}'`,
        fontFamily: theme.typography.fontFamilyMonospace,
        opacity: 0.6
      }
    })
  };
};
const MonacoQueryField = (props) => {
  const id = uuid.v4();
  const overrideServicesRef = React.useRef(getOverrideServices());
  const containerRef = React.useRef(null);
  const { languageProvider, history, onBlur, onRunQuery, initialValue, placeholder, onChange, datasource } = props;
  const lpRef = reactUse.useLatest(languageProvider);
  const historyRef = reactUse.useLatest(history);
  const onRunQueryRef = reactUse.useLatest(onRunQuery);
  const onBlurRef = reactUse.useLatest(onBlur);
  const onChangeRef = reactUse.useLatest(onChange);
  const autocompleteDisposeFun = React.useRef(null);
  const theme = ui.useTheme2();
  const styles = getStyles$1(theme, placeholder);
  React.useEffect(() => {
    return () => {
      var _a;
      (_a = autocompleteDisposeFun.current) == null ? void 0 : _a.call(autocompleteDisposeFun);
    };
  }, []);
  return /* @__PURE__ */ React__default["default"].createElement(
    "div",
    {
      "data-testid": selectors.components.QueryField.container,
      className: styles.container,
      ref: containerRef
    },
    /* @__PURE__ */ React__default["default"].createElement(
      ui.ReactMonacoEditor,
      {
        overrideServices: overrideServicesRef.current,
        options,
        language: "promql",
        value: initialValue,
        beforeMount: (monaco) => {
          ensurePromQL(monaco);
        },
        onMount: (editor, monaco) => {
          var _a;
          const isEditorFocused = editor.createContextKey("isEditorFocused" + id, false);
          editor.onDidBlurEditorWidget(() => {
            isEditorFocused.set(false);
            onBlurRef.current(editor.getValue());
          });
          editor.onDidFocusEditorText(() => {
            isEditorFocused.set(true);
          });
          const dataProvider = new DataProvider({
            historyProvider: historyRef.current,
            languageProvider: lpRef.current
          });
          const completionProvider = getCompletionProvider(monaco, dataProvider);
          const filteringCompletionProvider = __spreadProps$9(__spreadValues$d({}, completionProvider), {
            provideCompletionItems: (model, position, context, token) => {
              var _a2;
              if (((_a2 = editor.getModel()) == null ? void 0 : _a2.id) !== model.id) {
                return { suggestions: [] };
              }
              return completionProvider.provideCompletionItems(model, position, context, token);
            }
          });
          const { dispose } = monaco.languages.registerCompletionItemProvider(
            PROMQL_LANG_ID,
            filteringCompletionProvider
          );
          autocompleteDisposeFun.current = dispose;
          const updateElementHeight = () => {
            const containerDiv = containerRef.current;
            if (containerDiv !== null) {
              const pixelHeight = editor.getContentHeight();
              containerDiv.style.height = `${pixelHeight + EDITOR_HEIGHT_OFFSET}px`;
              containerDiv.style.width = "100%";
              const pixelWidth = containerDiv.clientWidth;
              editor.layout({ width: pixelWidth, height: pixelHeight });
            }
          };
          editor.onDidContentSizeChange(updateElementHeight);
          updateElementHeight();
          const updateCurrentEditorValue = lodash.debounce(() => {
            const editorValue = editor.getValue();
            onChangeRef.current(editorValue);
          }, lpRef.current.datasource.getDebounceTimeInMilliseconds());
          (_a = editor.getModel()) == null ? void 0 : _a.onDidChangeContent(() => {
            updateCurrentEditorValue();
          });
          editor.addCommand(
            monaco.KeyMod.Shift | monaco.KeyCode.Enter,
            () => {
              onRunQueryRef.current(editor.getValue());
            },
            "isEditorFocused" + id
          );
          monaco.editor.addKeybindingRule({
            keybinding: monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyF,
            command: null
          });
          editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyK, function() {
            global.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));
          });
          if (placeholder) {
            const placeholderDecorators = [
              {
                range: new monaco.Range(1, 1, 1, 1),
                options: {
                  className: styles.placeholder,
                  isWholeLine: true
                }
              }
            ];
            let decorators = [];
            const checkDecorators = () => {
              const model = editor.getModel();
              if (!model) {
                return;
              }
              const newDecorators = model.getValueLength() === 0 ? placeholderDecorators : [];
              decorators = model.deltaDecorations(decorators, newDecorators);
            };
            checkDecorators();
            editor.onDidChangeModelContent(checkDecorators);
            editor.onDidChangeModelContent((e) => {
              const model = editor.getModel();
              if (!model) {
                return;
              }
              const query = model.getValue();
              const errors = validateQuery(
                query,
                datasource.interpolateString(query, placeHolderScopedVars),
                model.getLinesContent(),
                lezerPromql.parser
              ) || [];
              const markers = errors.map((_a2) => {
                var _b = _a2, { error } = _b, boundary = __objRest$2(_b, ["error"]);
                return __spreadValues$d({
                  message: `${error ? `Error parsing "${error}"` : "Parse error"}. The query appears to be incorrect and could fail to be executed.`,
                  severity: monaco.MarkerSeverity.Error
                }, boundary);
              });
              monaco.editor.setModelMarkers(model, "owner", markers);
            });
          }
        }
      }
    )
  );
};

var __defProp$c = Object.defineProperty;
var __getOwnPropSymbols$c = Object.getOwnPropertySymbols;
var __hasOwnProp$c = Object.prototype.hasOwnProperty;
var __propIsEnum$c = Object.prototype.propertyIsEnumerable;
var __defNormalProp$c = (obj, key, value) => key in obj ? __defProp$c(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$c = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$c.call(b, prop))
      __defNormalProp$c(a, prop, b[prop]);
  if (__getOwnPropSymbols$c)
    for (var prop of __getOwnPropSymbols$c(b)) {
      if (__propIsEnum$c.call(b, prop))
        __defNormalProp$c(a, prop, b[prop]);
    }
  return a;
};
const MonacoQueryFieldLazy = (props) => {
  return /* @__PURE__ */ React__default["default"].createElement(React.Suspense, { fallback: null }, /* @__PURE__ */ React__default["default"].createElement(MonacoQueryField, __spreadValues$c({}, props)));
};

var __defProp$b = Object.defineProperty;
var __getOwnPropSymbols$b = Object.getOwnPropertySymbols;
var __hasOwnProp$b = Object.prototype.hasOwnProperty;
var __propIsEnum$b = Object.prototype.propertyIsEnumerable;
var __defNormalProp$b = (obj, key, value) => key in obj ? __defProp$b(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$b = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$b.call(b, prop))
      __defNormalProp$b(a, prop, b[prop]);
  if (__getOwnPropSymbols$b)
    for (var prop of __getOwnPropSymbols$b(b)) {
      if (__propIsEnum$b.call(b, prop))
        __defNormalProp$b(a, prop, b[prop]);
    }
  return a;
};
var __objRest$1 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$b.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$b)
    for (var prop of __getOwnPropSymbols$b(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$b.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const MonacoQueryFieldWrapper = (props) => {
  const lastRunValueRef = React.useRef(null);
  const _a = props, { onRunQuery, onChange } = _a, rest = __objRest$1(_a, ["onRunQuery", "onChange"]);
  const handleRunQuery = (value) => {
    lastRunValueRef.current = value;
    onChange(value);
    onRunQuery();
  };
  const handleBlur = (value) => {
    onChange(value);
  };
  const handleChange = (value) => {
    onChange(value);
  };
  return /* @__PURE__ */ React__default["default"].createElement(MonacoQueryFieldLazy, __spreadValues$b({ onChange: handleChange, onRunQuery: handleRunQuery, onBlur: handleBlur }, rest));
};

var __defProp$a = Object.defineProperty;
var __defProps$8 = Object.defineProperties;
var __getOwnPropDescs$8 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$a = Object.getOwnPropertySymbols;
var __hasOwnProp$a = Object.prototype.hasOwnProperty;
var __propIsEnum$a = Object.prototype.propertyIsEnumerable;
var __defNormalProp$a = (obj, key, value) => key in obj ? __defProp$a(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$a = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$a.call(b, prop))
      __defNormalProp$a(a, prop, b[prop]);
  if (__getOwnPropSymbols$a)
    for (var prop of __getOwnPropSymbols$a(b)) {
      if (__propIsEnum$a.call(b, prop))
        __defNormalProp$a(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$8 = (a, b) => __defProps$8(a, __getOwnPropDescs$8(b));
var __publicField$3 = (obj, key, value) => {
  __defNormalProp$a(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const LAST_USED_LABELS_KEY = "grafana.datasources.prometheus.browser.labels";
function getChooserText(metricsLookupDisabled, hasSyntax, hasMetrics) {
  if (metricsLookupDisabled) {
    return "(Disabled)";
  }
  if (!hasSyntax) {
    return "Loading metrics...";
  }
  if (!hasMetrics) {
    return "(No metrics found)";
  }
  return "Metrics browser";
}
class PromQueryFieldClass extends React__default["default"].PureComponent {
  constructor(props) {
    super(props);
    __publicField$3(this, "refreshHint", () => {
      const { datasource, query, data: data$1 } = this.props;
      const initHints = datasource.getInitHints();
      const initHint = initHints.length > 0 ? initHints[0] : null;
      if (!data$1 || data$1.series.length === 0) {
        this.setState({
          hint: initHint
        });
        return;
      }
      const result = data.isDataFrame(data$1.series[0]) ? data$1.series.map(data.toLegacyResponseData) : data$1.series;
      const queryHints = datasource.getQueryHints(query, result);
      let queryHint = queryHints.length > 0 ? queryHints[0] : null;
      this.setState({ hint: queryHint != null ? queryHint : initHint });
    });
    __publicField$3(this, "refreshMetrics", async () => {
      const {
        range,
        datasource: { languageProvider }
      } = this.props;
      this.languageProviderInitializationPromise = makePromiseCancelable(languageProvider.start(range));
      try {
        const remainingTasks = await this.languageProviderInitializationPromise.promise;
        await Promise.all(remainingTasks);
        this.onUpdateLanguage();
      } catch (err) {
        if (isCancelablePromiseRejection(err) && err.isCanceled) ; else {
          throw err;
        }
      }
    });
    /**
     * TODO #33976: Remove this, add histogram group (query = `histogram_quantile(0.95, sum(rate(${metric}[5m])) by (le))`;)
     */
    __publicField$3(this, "onChangeLabelBrowser", (selector) => {
      this.onChangeQuery(selector, true);
      this.setState({ labelBrowserVisible: false });
    });
    __publicField$3(this, "onChangeQuery", (value, override) => {
      const { query, onChange, onRunQuery } = this.props;
      if (onChange) {
        const nextQuery = __spreadProps$8(__spreadValues$a({}, query), { expr: value });
        onChange(nextQuery);
        if (override && onRunQuery) {
          onRunQuery();
        }
      }
    });
    __publicField$3(this, "onClickChooserButton", () => {
      var _a, _b;
      this.setState((state) => ({ labelBrowserVisible: !state.labelBrowserVisible }));
      runtime.reportInteraction("user_grafana_prometheus_metrics_browser_clicked", {
        editorMode: this.state.labelBrowserVisible ? "metricViewClosed" : "metricViewOpen",
        app: (_b = (_a = this.props) == null ? void 0 : _a.app) != null ? _b : ""
      });
    });
    __publicField$3(this, "onClickHintFix", () => {
      var _a;
      const { datasource, query, onChange, onRunQuery } = this.props;
      const { hint } = this.state;
      if ((_a = hint == null ? void 0 : hint.fix) == null ? void 0 : _a.action) {
        onChange(datasource.modifyQuery(query, hint.fix.action));
      }
      onRunQuery();
    });
    __publicField$3(this, "onUpdateLanguage", () => {
      const {
        datasource: { languageProvider }
      } = this.props;
      const { metrics } = languageProvider;
      if (!metrics) {
        return;
      }
      this.setState({ syntaxLoaded: true });
    });
    this.state = {
      labelBrowserVisible: false,
      syntaxLoaded: false,
      hint: null
    };
  }
  componentDidMount() {
    if (this.props.datasource.languageProvider) {
      this.refreshMetrics();
    }
    this.refreshHint();
  }
  componentWillUnmount() {
    if (this.languageProviderInitializationPromise) {
      this.languageProviderInitializationPromise.cancel();
    }
  }
  componentDidUpdate(prevProps) {
    const {
      data,
      datasource: { languageProvider },
      range
    } = this.props;
    if (languageProvider !== prevProps.datasource.languageProvider) {
      this.setState({
        syntaxLoaded: false
      });
    }
    const changedRangeToRefresh = this.rangeChangedToRefresh(range, prevProps.range);
    if (languageProvider !== prevProps.datasource.languageProvider || changedRangeToRefresh) {
      this.refreshMetrics();
    }
    if (data && prevProps.data && prevProps.data.series !== data.series) {
      this.refreshHint();
    }
  }
  rangeChangedToRefresh(range, prevRange) {
    if (range && prevRange) {
      const sameMinuteFrom = roundMsToMin(range.from.valueOf()) === roundMsToMin(prevRange.from.valueOf());
      const sameMinuteTo = roundMsToMin(range.to.valueOf()) === roundMsToMin(prevRange.to.valueOf());
      return !(sameMinuteFrom && sameMinuteTo);
    }
    return false;
  }
  render() {
    const {
      datasource,
      datasource: { languageProvider },
      query,
      ExtraFieldElement,
      history = [],
      theme
    } = this.props;
    const { labelBrowserVisible, syntaxLoaded, hint } = this.state;
    const hasMetrics = languageProvider.metrics.length > 0;
    const chooserText = getChooserText(datasource.lookupsDisabled, syntaxLoaded, hasMetrics);
    const buttonDisabled = !(syntaxLoaded && hasMetrics);
    return /* @__PURE__ */ React__default["default"].createElement(LocalStorageValueProvider, { storageKey: LAST_USED_LABELS_KEY, defaultValue: [] }, (lastUsedLabels, onLastUsedLabelsSave, onLastUsedLabelsDelete) => {
      var _a;
      return /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, /* @__PURE__ */ React__default["default"].createElement(
        "div",
        {
          className: "gf-form-inline gf-form-inline--xs-view-flex-column flex-grow-1",
          "data-testid": this.props["data-testid"]
        },
        /* @__PURE__ */ React__default["default"].createElement(
          "button",
          {
            className: "gf-form-label query-keyword pointer",
            onClick: this.onClickChooserButton,
            disabled: buttonDisabled,
            type: "button",
            "data-testid": selectors.components.DataSource.Prometheus.queryEditor.code.metricsBrowser.openButton
          },
          chooserText,
          /* @__PURE__ */ React__default["default"].createElement(ui.Icon, { name: labelBrowserVisible ? "angle-down" : "angle-right" })
        ),
        /* @__PURE__ */ React__default["default"].createElement("div", { className: "flex-grow-1 min-width-15" }, /* @__PURE__ */ React__default["default"].createElement(
          MonacoQueryFieldWrapper,
          {
            languageProvider,
            history,
            onChange: this.onChangeQuery,
            onRunQuery: this.props.onRunQuery,
            initialValue: (_a = query.expr) != null ? _a : "",
            placeholder: "Enter a PromQL query\u2026",
            datasource
          }
        ))
      ), labelBrowserVisible && /* @__PURE__ */ React__default["default"].createElement("div", { className: "gf-form" }, /* @__PURE__ */ React__default["default"].createElement(
        PrometheusMetricsBrowser,
        {
          languageProvider,
          onChange: this.onChangeLabelBrowser,
          lastUsedLabels: lastUsedLabels || [],
          storeLastUsedLabels: onLastUsedLabelsSave,
          deleteLastUsedLabels: onLastUsedLabelsDelete,
          timeRange: this.props.range
        }
      )), ExtraFieldElement, hint ? /* @__PURE__ */ React__default["default"].createElement("div", { className: "query-row-break" }, /* @__PURE__ */ React__default["default"].createElement("div", { className: "prom-query-field-info text-warning" }, hint.label, " ", hint.fix ? /* @__PURE__ */ React__default["default"].createElement(
        "button",
        {
          type: "button",
          className: css.cx(ui.clearButtonStyles(theme), "text-link", "muted"),
          onClick: this.onClickHintFix
        },
        hint.fix.label
      ) : null)) : null);
    });
  }
}
const PromQueryField = ui.withTheme2(PromQueryFieldClass);

function PromQueryCodeEditor(props) {
  const { query, datasource, range, onRunQuery, onChange, data, app, showExplain } = props;
  const styles = ui.useStyles2(getStyles);
  return /* @__PURE__ */ React__default["default"].createElement(
    "div",
    {
      "data-testid": selectors.components.DataSource.Prometheus.queryEditor.code.queryField,
      className: styles.wrapper
    },
    /* @__PURE__ */ React__default["default"].createElement(
      PromQueryField,
      {
        datasource,
        query,
        range,
        onRunQuery,
        onChange,
        history: [],
        data,
        app
      }
    ),
    showExplain && /* @__PURE__ */ React__default["default"].createElement(PromQueryBuilderExplained, { query: query.expr })
  );
}
const getStyles = (theme) => {
  return {
    // This wrapper styling can be removed after the old PromQueryEditor is removed.
    // This is removing margin bottom on the old legacy inline form styles
    wrapper: css.css({
      ".gf-form": {
        marginBottom: 0
      }
    })
  };
};

function PromQueryCodeEditorAutocompleteInfo(props) {
  const [autocompleteLimit, setAutocompleteLimit] = React.useState("n");
  const [autocompleteLimitExceeded, setAutocompleteLimitExceeded] = React.useState(false);
  const handleSuggestionsIncompleteEvent = React.useCallback(
    (e) => {
      if (!isSuggestionsIncompleteEvent(e)) {
        return;
      }
      if (e.detail.datasourceUid === props.datasourceUid) {
        setAutocompleteLimitExceeded(true);
        setAutocompleteLimit(e.detail.limit.toString());
      }
    },
    [props.datasourceUid]
  );
  React.useEffect(() => {
    addEventListener(CODE_MODE_SUGGESTIONS_INCOMPLETE_EVENT, handleSuggestionsIncompleteEvent);
    return () => {
      removeEventListener(CODE_MODE_SUGGESTIONS_INCOMPLETE_EVENT, handleSuggestionsIncompleteEvent);
    };
  }, [handleSuggestionsIncompleteEvent]);
  const showCodeModeAutocompleteDisclaimer = () => {
    return Boolean(runtime.config.featureToggles.prometheusCodeModeMetricNamesSearch) && props.editorMode === QueryEditorMode.Code && autocompleteLimitExceeded;
  };
  if (!showCodeModeAutocompleteDisclaimer()) {
    return null;
  }
  return /* @__PURE__ */ React__default["default"].createElement("div", { "data-testid": selectors.components.DataSource.Prometheus.queryEditor.code.metricsCountInfo }, /* @__PURE__ */ React__default["default"].createElement(ui.Stack, { direction: "row", gap: 1 }, /* @__PURE__ */ React__default["default"].createElement(ui.Text, { color: "secondary", element: "p", italic: true }, "Autocomplete suggestions limited"), /* @__PURE__ */ React__default["default"].createElement(
    ui.IconButton,
    {
      name: "info-circle",
      tooltip: `The number of metric names exceeds the autocomplete limit. Only the ${autocompleteLimit}-most relevant metrics are displayed. You can adjust the threshold in the data source settings.`
    }
  )));
}

var __defProp$9 = Object.defineProperty;
var __defProps$7 = Object.defineProperties;
var __getOwnPropDescs$7 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$9 = Object.getOwnPropertySymbols;
var __hasOwnProp$9 = Object.prototype.hasOwnProperty;
var __propIsEnum$9 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$9 = (obj, key, value) => key in obj ? __defProp$9(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$9 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$9.call(b, prop))
      __defNormalProp$9(a, prop, b[prop]);
  if (__getOwnPropSymbols$9)
    for (var prop of __getOwnPropSymbols$9(b)) {
      if (__propIsEnum$9.call(b, prop))
        __defNormalProp$9(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$7 = (a, b) => __defProps$7(a, __getOwnPropDescs$7(b));
const FORMAT_OPTIONS = [
  { label: "Time series", value: "time_series" },
  { label: "Table", value: "table" },
  { label: "Heatmap", value: "heatmap" }
];
const INTERVAL_FACTOR_OPTIONS = lodash.map([1, 2, 3, 4, 5, 10], (value) => ({
  value,
  label: "1/" + value
}));
const PromQueryEditorSelector = React__default["default"].memo((props) => {
  const {
    onChange,
    onRunQuery,
    data: data$1,
    app,
    onAddQuery,
    datasource: { defaultEditor },
    queries
  } = props;
  const [parseModalOpen, setParseModalOpen] = React.useState(false);
  const [queryPatternsModalOpen, setQueryPatternsModalOpen] = React.useState(false);
  const [dataIsStale, setDataIsStale] = React.useState(false);
  const { flag: explain, setFlag: setExplain } = useFlag(promQueryEditorExplainKey);
  const query = getQueryWithDefaults(props.query, app, defaultEditor);
  const editorMode = query.editorMode;
  const onEditorModeChange = React.useCallback(
    (newMetricEditorMode) => {
      var _a;
      runtime.reportInteraction("user_grafana_prometheus_editor_mode_clicked", {
        newEditor: newMetricEditorMode,
        previousEditor: (_a = query.editorMode) != null ? _a : "",
        newQuery: !query.expr,
        app: app != null ? app : ""
      });
      if (newMetricEditorMode === QueryEditorMode.Builder) {
        const result = buildVisualQueryFromString(query.expr || "");
        if (result.errors.length) {
          setParseModalOpen(true);
          return;
        }
      }
      changeEditorMode(query, newMetricEditorMode, onChange);
    },
    [onChange, query, app]
  );
  React.useEffect(() => {
    setDataIsStale(false);
  }, [data$1]);
  const onChangeInternal = (query2) => {
    if (!lodash.isEqual(query2, props.query)) {
      setDataIsStale(true);
    }
    onChange(query2);
  };
  const onShowExplainChange = (e) => {
    setExplain(e.currentTarget.checked);
  };
  return /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, /* @__PURE__ */ React__default["default"].createElement(
    ui.ConfirmModal,
    {
      isOpen: parseModalOpen,
      title: "Parsing error: Switch to the builder mode?",
      body: "There is a syntax error, or the query structure cannot be visualized when switching to the builder mode. Parts of the query may be lost. ",
      confirmText: "Continue",
      onConfirm: () => {
        changeEditorMode(query, QueryEditorMode.Builder, onChange);
        setParseModalOpen(false);
      },
      onDismiss: () => setParseModalOpen(false)
    }
  ), /* @__PURE__ */ React__default["default"].createElement(
    QueryPatternsModal,
    {
      isOpen: queryPatternsModalOpen,
      onClose: () => setQueryPatternsModalOpen(false),
      query,
      queries,
      app,
      onChange,
      onAddQuery
    }
  ), /* @__PURE__ */ React__default["default"].createElement(experimental.EditorHeader, null, /* @__PURE__ */ React__default["default"].createElement(
    ui.Button,
    {
      "data-testid": selectors.components.QueryBuilder.queryPatterns,
      variant: "secondary",
      size: "sm",
      onClick: () => setQueryPatternsModalOpen((prevValue) => !prevValue)
    },
    "Kick start your query"
  ), /* @__PURE__ */ React__default["default"].createElement("div", { "data-testid": selectors.components.DataSource.Prometheus.queryEditor.explain }, /* @__PURE__ */ React__default["default"].createElement(QueryHeaderSwitch, { label: "Explain", value: explain, onChange: onShowExplainChange })), /* @__PURE__ */ React__default["default"].createElement(experimental.FlexItem, { grow: 1 }), app !== data.CoreApp.Explore && app !== data.CoreApp.Correlations && /* @__PURE__ */ React__default["default"].createElement(
    ui.Button,
    {
      variant: dataIsStale ? "primary" : "secondary",
      size: "sm",
      onClick: onRunQuery,
      icon: (data$1 == null ? void 0 : data$1.state) === data.LoadingState.Loading ? "spinner" : void 0,
      disabled: (data$1 == null ? void 0 : data$1.state) === data.LoadingState.Loading
    },
    "Run queries"
  ), /* @__PURE__ */ React__default["default"].createElement(PromQueryCodeEditorAutocompleteInfo, { datasourceUid: props.datasource.uid, editorMode }), /* @__PURE__ */ React__default["default"].createElement("div", { "data-testid": selectors.components.DataSource.Prometheus.queryEditor.editorToggle }, /* @__PURE__ */ React__default["default"].createElement(QueryEditorModeToggle, { mode: editorMode, onChange: onEditorModeChange }))), /* @__PURE__ */ React__default["default"].createElement(ui.Space, { v: 0.5 }), /* @__PURE__ */ React__default["default"].createElement(experimental.EditorRows, null, editorMode === QueryEditorMode.Code && /* @__PURE__ */ React__default["default"].createElement(PromQueryCodeEditor, __spreadProps$7(__spreadValues$9({}, props), { query, showExplain: explain, onChange: onChangeInternal })), editorMode === QueryEditorMode.Builder && /* @__PURE__ */ React__default["default"].createElement(
    PromQueryBuilderContainer,
    {
      query,
      datasource: props.datasource,
      onChange: onChangeInternal,
      onRunQuery: props.onRunQuery,
      data: data$1,
      showExplain: explain
    }
  ), /* @__PURE__ */ React__default["default"].createElement(PromQueryBuilderOptions, { query, app: props.app, onChange, onRunQuery })));
});
PromQueryEditorSelector.displayName = "PromQueryEditorSelector";

function PromQueryEditorForAlerting(props) {
  const { datasource, query, range, data, onChange, onRunQuery } = props;
  return /* @__PURE__ */ React__default["default"].createElement(
    PromQueryField,
    {
      datasource,
      query,
      onRunQuery,
      onChange,
      history: [],
      range,
      data,
      "data-testid": alertingTestIds.editor
    }
  );
}
const alertingTestIds = {
  editor: "prom-editor-cloud-alerting"
};

var __defProp$8 = Object.defineProperty;
var __getOwnPropSymbols$8 = Object.getOwnPropertySymbols;
var __hasOwnProp$8 = Object.prototype.hasOwnProperty;
var __propIsEnum$8 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$8 = (obj, key, value) => key in obj ? __defProp$8(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$8 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$8.call(b, prop))
      __defNormalProp$8(a, prop, b[prop]);
  if (__getOwnPropSymbols$8)
    for (var prop of __getOwnPropSymbols$8(b)) {
      if (__propIsEnum$8.call(b, prop))
        __defNormalProp$8(a, prop, b[prop]);
    }
  return a;
};
function PromQueryEditorByAppBase(props) {
  const { app } = props;
  switch (app) {
    case data.CoreApp.CloudAlerting:
      return /* @__PURE__ */ React__default["default"].createElement(PromQueryEditorForAlerting, __spreadValues$8({}, props));
    default:
      return /* @__PURE__ */ React__default["default"].createElement(PromQueryEditorSelector, __spreadValues$8({}, props));
  }
}
const PromQueryEditorByApp = React.memo(PromQueryEditorByAppBase);

var __defProp$7 = Object.defineProperty;
var __defProps$6 = Object.defineProperties;
var __getOwnPropDescs$6 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$7 = Object.getOwnPropertySymbols;
var __hasOwnProp$7 = Object.prototype.hasOwnProperty;
var __propIsEnum$7 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$7 = (obj, key, value) => key in obj ? __defProp$7(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$7 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$7.call(b, prop))
      __defNormalProp$7(a, prop, b[prop]);
  if (__getOwnPropSymbols$7)
    for (var prop of __getOwnPropSymbols$7(b)) {
      if (__propIsEnum$7.call(b, prop))
        __defNormalProp$7(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$6 = (a, b) => __defProps$6(a, __getOwnPropDescs$6(b));
function AnnotationQueryEditor(props) {
  const annotation = props.annotation;
  const onAnnotationChange = props.onAnnotationChange;
  const query = { expr: annotation.expr, refId: annotation.name, interval: annotation.step };
  return /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, /* @__PURE__ */ React__default["default"].createElement(experimental.EditorRows, null, /* @__PURE__ */ React__default["default"].createElement(
    PromQueryCodeEditor,
    __spreadProps$6(__spreadValues$7({}, props), {
      query,
      showExplain: false,
      onChange: (query2) => {
        onAnnotationChange(__spreadProps$6(__spreadValues$7({}, annotation), {
          expr: query2.expr
        }));
      }
    })
  ), /* @__PURE__ */ React__default["default"].createElement(experimental.EditorRow, null, /* @__PURE__ */ React__default["default"].createElement(
    experimental.EditorField,
    {
      label: "Min step",
      tooltip: /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, "An additional lower limit for the step parameter of the Prometheus query and for the", " ", /* @__PURE__ */ React__default["default"].createElement("code", null, "$__interval"), " and ", /* @__PURE__ */ React__default["default"].createElement("code", null, "$__rate_interval"), " variables.")
    },
    /* @__PURE__ */ React__default["default"].createElement(
      ui.AutoSizeInput,
      {
        type: "text",
        "aria-label": "Set lower limit for the step parameter",
        placeholder: "auto",
        minWidth: 10,
        onCommitChange: (ev) => {
          onAnnotationChange(__spreadProps$6(__spreadValues$7({}, annotation), {
            step: ev.currentTarget.value
          }));
        },
        defaultValue: query.interval,
        id: selectors.components.DataSource.Prometheus.annotations.minStep
      }
    )
  ))), /* @__PURE__ */ React__default["default"].createElement(ui.Space, { v: 0.5 }), /* @__PURE__ */ React__default["default"].createElement(experimental.EditorRow, null, /* @__PURE__ */ React__default["default"].createElement(
    experimental.EditorField,
    {
      label: "Title",
      tooltip: "Use either the name or a pattern. For example, {{instance}} is replaced with label value for the label instance."
    },
    /* @__PURE__ */ React__default["default"].createElement(
      ui.Input,
      {
        type: "text",
        placeholder: "{{alertname}}",
        value: annotation.titleFormat,
        onChange: (event) => {
          onAnnotationChange(__spreadProps$6(__spreadValues$7({}, annotation), {
            titleFormat: event.currentTarget.value
          }));
        },
        "data-testid": selectors.components.DataSource.Prometheus.annotations.title
      }
    )
  ), /* @__PURE__ */ React__default["default"].createElement(experimental.EditorField, { label: "Tags" }, /* @__PURE__ */ React__default["default"].createElement(
    ui.Input,
    {
      type: "text",
      placeholder: "label1,label2",
      value: annotation.tagKeys,
      onChange: (event) => {
        onAnnotationChange(__spreadProps$6(__spreadValues$7({}, annotation), {
          tagKeys: event.currentTarget.value
        }));
      },
      "data-testid": selectors.components.DataSource.Prometheus.annotations.tags
    }
  )), /* @__PURE__ */ React__default["default"].createElement(
    experimental.EditorField,
    {
      label: "Text",
      tooltip: "Use either the name or a pattern. For example, {{instance}} is replaced with label value for the label instance."
    },
    /* @__PURE__ */ React__default["default"].createElement(
      ui.Input,
      {
        type: "text",
        placeholder: "{{instance}}",
        value: annotation.textFormat,
        onChange: (event) => {
          onAnnotationChange(__spreadProps$6(__spreadValues$7({}, annotation), {
            textFormat: event.currentTarget.value
          }));
        },
        "data-testid": selectors.components.DataSource.Prometheus.annotations.text
      }
    )
  ), /* @__PURE__ */ React__default["default"].createElement(
    experimental.EditorField,
    {
      label: "Series value as timestamp",
      tooltip: "The unit of timestamp is milliseconds. If the unit of the series value is seconds, multiply its range vector by 1000."
    },
    /* @__PURE__ */ React__default["default"].createElement(
      experimental.EditorSwitch,
      {
        value: annotation.useValueForTime,
        onChange: (event) => {
          onAnnotationChange(__spreadProps$6(__spreadValues$7({}, annotation), {
            useValueForTime: event.currentTarget.value
          }));
        },
        "data-testid": selectors.components.DataSource.Prometheus.annotations.seriesValueAsTimestamp
      }
    )
  )));
}

const CHEAT_SHEET_ITEMS = [
  {
    title: "Request Rate",
    expression: "rate(http_request_total[5m])",
    label: "Given an HTTP request counter, this query calculates the per-second average request rate over the last 5 minutes."
  },
  {
    title: "95th Percentile of Request Latencies",
    expression: "histogram_quantile(0.95, sum(rate(prometheus_http_request_duration_seconds_bucket[5m])) by (le))",
    label: "Calculates the 95th percentile of HTTP request rate over 5 minute windows."
  },
  {
    title: "Alerts Firing",
    expression: 'sort_desc(sum(sum_over_time(ALERTS{alertstate="firing"}[24h])) by (alertname))',
    label: "Sums up the alerts that have been firing over the last 24 hours."
  },
  {
    title: "Step",
    label: "Defines the graph resolution using a duration format (15s, 1m, 3h, ...). Small steps create high-resolution graphs but can be slow over larger time ranges. Using a longer step lowers the resolution and smooths the graph by producing fewer datapoints. If no step is given the resolution is calculated automatically."
  }
];
const PromCheatSheet = (props) => /* @__PURE__ */ React__default["default"].createElement("div", null, /* @__PURE__ */ React__default["default"].createElement("h2", null, "PromQL Cheat Sheet"), CHEAT_SHEET_ITEMS.map((item, index) => /* @__PURE__ */ React__default["default"].createElement("div", { className: "cheat-sheet-item", key: index }, /* @__PURE__ */ React__default["default"].createElement("div", { className: "cheat-sheet-item__title" }, item.title), item.expression ? /* @__PURE__ */ React__default["default"].createElement(
  "button",
  {
    type: "button",
    className: "cheat-sheet-item__example",
    onClick: (e) => props.onClickExample({ refId: "A", expr: item.expression })
  },
  /* @__PURE__ */ React__default["default"].createElement("code", null, item.expression)
) : null, /* @__PURE__ */ React__default["default"].createElement("div", { className: "cheat-sheet-item__label" }, item.label))));

var __defProp$6 = Object.defineProperty;
var __defProps$5 = Object.defineProperties;
var __getOwnPropDescs$5 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$6 = Object.getOwnPropertySymbols;
var __hasOwnProp$6 = Object.prototype.hasOwnProperty;
var __propIsEnum$6 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$6 = (obj, key, value) => key in obj ? __defProp$6(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$6 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$6.call(b, prop))
      __defNormalProp$6(a, prop, b[prop]);
  if (__getOwnPropSymbols$6)
    for (var prop of __getOwnPropSymbols$6(b)) {
      if (__propIsEnum$6.call(b, prop))
        __defNormalProp$6(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$5 = (a, b) => __defProps$5(a, __getOwnPropDescs$5(b));
const PrometheusLabelNamesRegex = /^label_names\(\)\s*$/;
const PrometheusLabelValuesRegex = /^label_values\((?:(.+),\s*)?([a-zA-Z_$][a-zA-Z0-9_]*)\)\s*$/;
const PrometheusMetricNamesRegex = /^metrics\((.+)\)\s*$/;
const PrometheusQueryResultRegex = /^query_result\((.+)\)\s*$/;
const PrometheusLabelNamesRegexWithMatch = /^label_names\((.+)\)\s*$/;
function migrateVariableQueryToEditor(rawQuery) {
  if (typeof rawQuery !== "string") {
    return rawQuery;
  }
  const queryBase = {
    refId: "PrometheusDatasource-VariableQuery",
    qryType: PromVariableQueryType.LabelNames
  };
  const labelNamesMatchQuery = rawQuery.match(PrometheusLabelNamesRegexWithMatch);
  if (labelNamesMatchQuery) {
    return __spreadProps$5(__spreadValues$6({}, queryBase), {
      qryType: PromVariableQueryType.LabelNames,
      match: labelNamesMatchQuery[1]
    });
  }
  const labelNames = rawQuery.match(PrometheusLabelNamesRegex);
  if (labelNames) {
    return __spreadProps$5(__spreadValues$6({}, queryBase), {
      qryType: PromVariableQueryType.LabelNames
    });
  }
  const labelValuesCheck = rawQuery.match(/^label_values\(/);
  if (labelValuesCheck) {
    const labelValues = rawQuery.match(PrometheusLabelValuesRegex);
    const label = labelValues ? labelValues[2] : "";
    const metric = labelValues ? labelValues[1] : "";
    if (metric) {
      const visQuery = buildVisualQueryFromString(metric);
      return __spreadProps$5(__spreadValues$6({}, queryBase), {
        qryType: PromVariableQueryType.LabelValues,
        label,
        metric: visQuery.query.metric,
        labelFilters: visQuery.query.labels
      });
    } else {
      return __spreadProps$5(__spreadValues$6({}, queryBase), {
        qryType: PromVariableQueryType.LabelValues,
        label
      });
    }
  }
  const metricNamesCheck = rawQuery.match(/^metrics\(/);
  if (metricNamesCheck) {
    const metricNames = rawQuery.match(PrometheusMetricNamesRegex);
    const metric = metricNames ? metricNames[1] : "";
    return __spreadProps$5(__spreadValues$6({}, queryBase), {
      qryType: PromVariableQueryType.MetricNames,
      metric
    });
  }
  const queryResultCheck = rawQuery.match(/^query_result\(/);
  if (queryResultCheck) {
    const queryResult = rawQuery.match(PrometheusQueryResultRegex);
    const varQuery = queryResult ? queryResult[1] : "";
    return __spreadProps$5(__spreadValues$6({}, queryBase), {
      qryType: PromVariableQueryType.VarQueryResult,
      varQuery
    });
  }
  if (!labelNames && !labelValuesCheck && !metricNamesCheck && !queryResultCheck) {
    return __spreadProps$5(__spreadValues$6({}, queryBase), {
      qryType: PromVariableQueryType.SeriesQuery,
      seriesQuery: rawQuery
    });
  }
  return queryBase;
}
function migrateVariableEditorBackToVariableSupport(QueryVariable) {
  var _a, _b, _c;
  switch (QueryVariable.qryType) {
    case PromVariableQueryType.LabelNames:
      if (QueryVariable.match) {
        return `label_names(${QueryVariable.match})`;
      }
      return "label_names()";
    case PromVariableQueryType.LabelValues:
      if (QueryVariable.metric || QueryVariable.labelFilters && QueryVariable.labelFilters.length !== 0) {
        const visualQueryQuery = {
          metric: QueryVariable.metric,
          labels: (_a = QueryVariable.labelFilters) != null ? _a : [],
          operations: []
        };
        const metric = promQueryModeller.renderQuery(visualQueryQuery);
        return `label_values(${metric},${QueryVariable.label})`;
      } else {
        return `label_values(${QueryVariable.label})`;
      }
    case PromVariableQueryType.MetricNames:
      return `metrics(${QueryVariable.metric})`;
    case PromVariableQueryType.VarQueryResult:
      const varQuery = removeLineBreaks(QueryVariable.varQuery);
      return `query_result(${varQuery})`;
    case PromVariableQueryType.SeriesQuery:
      return (_b = QueryVariable.seriesQuery) != null ? _b : "";
    case PromVariableQueryType.ClassicQuery:
      return (_c = QueryVariable.classicQuery) != null ? _c : "";
  }
  return "";
}
function removeLineBreaks(input) {
  return input ? input.replace(/[\r\n]+/gm, "") : "";
}

var __defProp$5 = Object.defineProperty;
var __getOwnPropSymbols$5 = Object.getOwnPropertySymbols;
var __hasOwnProp$5 = Object.prototype.hasOwnProperty;
var __propIsEnum$5 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$5 = (obj, key, value) => key in obj ? __defProp$5(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$5 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$5.call(b, prop))
      __defNormalProp$5(a, prop, b[prop]);
  if (__getOwnPropSymbols$5)
    for (var prop of __getOwnPropSymbols$5(b)) {
      if (__propIsEnum$5.call(b, prop))
        __defNormalProp$5(a, prop, b[prop]);
    }
  return a;
};
const variableOptions = [
  { label: "Label names", value: PromVariableQueryType.LabelNames },
  { label: "Label values", value: PromVariableQueryType.LabelValues },
  { label: "Metrics", value: PromVariableQueryType.MetricNames },
  { label: "Query result", value: PromVariableQueryType.VarQueryResult },
  { label: "Series query", value: PromVariableQueryType.SeriesQuery },
  { label: "Classic query", value: PromVariableQueryType.ClassicQuery }
];
const refId = "PrometheusVariableQueryEditor-VariableQuery";
const PromVariableQueryEditor = ({ onChange, query, datasource, range }) => {
  const [qryType, setQryType] = React.useState(void 0);
  const [label, setLabel] = React.useState("");
  const [labelNamesMatch, setLabelNamesMatch] = React.useState("");
  const [metric, setMetric] = React.useState("");
  const [varQuery, setVarQuery] = React.useState("");
  const [seriesQuery, setSeriesQuery] = React.useState("");
  const [classicQuery, setClassicQuery] = React.useState("");
  const [labelOptions, setLabelOptions] = React.useState([]);
  const [labelFilters, setLabelFilters] = React.useState([]);
  React.useEffect(() => {
    datasource.languageProvider.start(range);
  }, []);
  React.useEffect(() => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    if (!query) {
      return;
    }
    if (query.qryType === PromVariableQueryType.ClassicQuery) {
      setQryType(query.qryType);
      setClassicQuery((_a = query.query) != null ? _a : "");
    } else {
      const variableQuery = variableMigration(query);
      setLabelNamesMatch((_b = variableQuery.match) != null ? _b : "");
      setQryType(variableQuery.qryType);
      setLabel((_c = variableQuery.label) != null ? _c : "");
      setMetric((_d = variableQuery.metric) != null ? _d : "");
      setLabelFilters((_e = variableQuery.labelFilters) != null ? _e : []);
      setVarQuery((_f = variableQuery.varQuery) != null ? _f : "");
      setSeriesQuery((_g = variableQuery.seriesQuery) != null ? _g : "");
      setClassicQuery((_h = variableQuery.classicQuery) != null ? _h : "");
    }
  }, [query]);
  React.useEffect(() => {
    if (qryType !== PromVariableQueryType.LabelValues) {
      return;
    }
    const variables = datasource.getVariables().map((variable) => ({ label: variable, value: variable }));
    if (!metric) {
      datasource.getTagKeys({ filters: [] }).then((labelNames) => {
        const names = labelNames.map(({ text }) => ({ label: text, value: text }));
        setLabelOptions([...variables, ...names]);
      });
    } else {
      const labelToConsider = [{ label: "__name__", op: "=", value: metric }];
      const expr = promQueryModeller.renderLabels(labelToConsider);
      datasource.languageProvider.fetchLabelsWithMatch(expr).then((labelsIndex) => {
        const labelNames = Object.keys(labelsIndex);
        const names = labelNames.map((value) => ({ label: value, value }));
        setLabelOptions([...variables, ...names]);
      });
    }
  }, [datasource, qryType, metric]);
  const onChangeWithVariableString = (updateVar, updLabelFilters) => {
    const queryVar = {
      qryType,
      label,
      metric,
      match: labelNamesMatch,
      varQuery,
      seriesQuery,
      classicQuery,
      refId: "PrometheusVariableQueryEditor-VariableQuery"
    };
    let updateLabelFilters = updLabelFilters ? { labelFilters: updLabelFilters } : { labelFilters };
    const updatedVar = __spreadValues$5(__spreadValues$5(__spreadValues$5({}, queryVar), updateVar), updateLabelFilters);
    const queryString = migrateVariableEditorBackToVariableSupport(updatedVar);
    onChange({
      query: queryString,
      qryType: updatedVar.qryType,
      refId
    });
  };
  const onQueryTypeChange = (newType) => {
    var _a;
    setQryType(newType.value);
    if (newType.value !== PromVariableQueryType.SeriesQuery) {
      onChangeWithVariableString({ qryType: (_a = newType.value) != null ? _a : 0 });
    }
  };
  const onLabelChange = (newLabel) => {
    const newLabelvalue = newLabel && newLabel.value ? newLabel.value : "";
    setLabel(newLabelvalue);
    if (qryType === PromVariableQueryType.LabelValues && newLabelvalue) {
      onChangeWithVariableString({ label: newLabelvalue });
    }
  };
  const metricsLabelsChange = (update) => {
    var _a;
    setMetric(update.metric);
    setLabelFilters(update.labels);
    const updMetric = update.metric;
    const updLabelFilters = (_a = update.labels) != null ? _a : [];
    if (qryType === PromVariableQueryType.LabelValues && label && (updMetric || updLabelFilters)) {
      onChangeWithVariableString({ qryType, metric: updMetric }, updLabelFilters);
    }
  };
  const onLabelNamesMatchChange = (regex) => {
    if (qryType === PromVariableQueryType.LabelNames) {
      onChangeWithVariableString({ qryType, match: regex });
    }
  };
  const onMetricChange = (value) => {
    if (qryType === PromVariableQueryType.MetricNames && value) {
      onChangeWithVariableString({ metric: value });
    }
  };
  const onVarQueryChange = (e) => {
    setVarQuery(e.currentTarget.value);
  };
  const onSeriesQueryChange = (e) => {
    setSeriesQuery(e.currentTarget.value);
  };
  const onClassicQueryChange = (e) => {
    setClassicQuery(e.currentTarget.value);
  };
  const promVisualQuery = React.useCallback(() => {
    return { metric, labels: labelFilters, operations: [] };
  }, [metric, labelFilters]);
  return /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, /* @__PURE__ */ React__default["default"].createElement(ui.InlineFieldRow, null, /* @__PURE__ */ React__default["default"].createElement(
    ui.InlineField,
    {
      label: "Query type",
      labelWidth: 20,
      tooltip: /* @__PURE__ */ React__default["default"].createElement("div", null, "The Prometheus data source plugin provides the following query types for template variables.")
    },
    /* @__PURE__ */ React__default["default"].createElement(
      ui.Select,
      {
        placeholder: "Select query type",
        "aria-label": "Query type",
        onChange: onQueryTypeChange,
        value: qryType,
        options: variableOptions,
        width: 25,
        "data-testid": selectors.components.DataSource.Prometheus.variableQueryEditor.queryType
      }
    )
  )), qryType === PromVariableQueryType.LabelValues && /* @__PURE__ */ React__default["default"].createElement(React__default["default"].Fragment, null, /* @__PURE__ */ React__default["default"].createElement(ui.InlineFieldRow, null, /* @__PURE__ */ React__default["default"].createElement(
    ui.InlineField,
    {
      label: "Label",
      labelWidth: 20,
      required: true,
      "aria-labelledby": "label-select",
      tooltip: /* @__PURE__ */ React__default["default"].createElement("div", null, "Returns a list of label values for the label name in all metrics unless the metric is specified.")
    },
    /* @__PURE__ */ React__default["default"].createElement(
      ui.Select,
      {
        "aria-label": "label-select",
        onChange: onLabelChange,
        value: label,
        options: labelOptions,
        width: 25,
        allowCustomValue: true,
        isClearable: true,
        "data-testid": selectors.components.DataSource.Prometheus.variableQueryEditor.labelValues.labelSelect
      }
    )
  )), /* @__PURE__ */ React__default["default"].createElement(
    MetricsLabelsSection,
    {
      query: promVisualQuery(),
      datasource,
      onChange: metricsLabelsChange,
      variableEditor: true
    }
  )), qryType === PromVariableQueryType.LabelNames && /* @__PURE__ */ React__default["default"].createElement(ui.InlineFieldRow, null, /* @__PURE__ */ React__default["default"].createElement(
    ui.InlineField,
    {
      label: "Metric regex",
      labelWidth: 20,
      "aria-labelledby": "Metric regex",
      tooltip: /* @__PURE__ */ React__default["default"].createElement("div", null, "Returns a list of label names, optionally filtering by specified metric regex.")
    },
    /* @__PURE__ */ React__default["default"].createElement(
      ui.Input,
      {
        type: "text",
        "aria-label": "Metric regex",
        placeholder: "Metric regex",
        value: labelNamesMatch,
        onBlur: (event) => {
          setLabelNamesMatch(event.currentTarget.value);
          onLabelNamesMatchChange(event.currentTarget.value);
        },
        onChange: (e) => {
          setLabelNamesMatch(e.currentTarget.value);
        },
        width: 25,
        "data-testid": selectors.components.DataSource.Prometheus.variableQueryEditor.labelnames.metricRegex
      }
    )
  )), qryType === PromVariableQueryType.MetricNames && /* @__PURE__ */ React__default["default"].createElement(ui.InlineFieldRow, null, /* @__PURE__ */ React__default["default"].createElement(
    ui.InlineField,
    {
      label: "Metric regex",
      labelWidth: 20,
      "aria-labelledby": "Metric selector",
      tooltip: /* @__PURE__ */ React__default["default"].createElement("div", null, "Returns a list of metrics matching the specified metric regex.")
    },
    /* @__PURE__ */ React__default["default"].createElement(
      ui.Input,
      {
        type: "text",
        "aria-label": "Metric selector",
        placeholder: "Metric regex",
        value: metric,
        onChange: (e) => {
          setMetric(e.currentTarget.value);
        },
        onBlur: (e) => {
          setMetric(e.currentTarget.value);
          onMetricChange(e.currentTarget.value);
        },
        width: 25,
        "data-testid": selectors.components.DataSource.Prometheus.variableQueryEditor.metricNames.metricRegex
      }
    )
  )), qryType === PromVariableQueryType.VarQueryResult && /* @__PURE__ */ React__default["default"].createElement(ui.InlineFieldRow, null, /* @__PURE__ */ React__default["default"].createElement(
    ui.InlineField,
    {
      label: "Query",
      labelWidth: 20,
      tooltip: /* @__PURE__ */ React__default["default"].createElement("div", null, "Returns a list of Prometheus query results for the query. This can include Prometheus functions, i.e. sum(go_goroutines).")
    },
    /* @__PURE__ */ React__default["default"].createElement(
      ui.TextArea,
      {
        type: "text",
        "aria-label": "Prometheus Query",
        placeholder: "Prometheus Query",
        value: varQuery,
        onChange: onVarQueryChange,
        onBlur: () => {
          if (qryType === PromVariableQueryType.VarQueryResult && varQuery) {
            onChangeWithVariableString({ qryType });
          }
        },
        cols: 100,
        "data-testid": selectors.components.DataSource.Prometheus.variableQueryEditor.varQueryResult
      }
    )
  )), qryType === PromVariableQueryType.SeriesQuery && /* @__PURE__ */ React__default["default"].createElement(ui.InlineFieldRow, null, /* @__PURE__ */ React__default["default"].createElement(
    ui.InlineField,
    {
      label: "Series Query",
      labelWidth: 20,
      tooltip: /* @__PURE__ */ React__default["default"].createElement("div", null, 'Enter a metric with labels, only a metric or only labels, i.e. go_goroutines{instance="localhost:9090"}, go_goroutines, or {instance="localhost:9090"}. Returns a list of time series associated with the entered data.')
    },
    /* @__PURE__ */ React__default["default"].createElement(
      ui.Input,
      {
        type: "text",
        "aria-label": "Series Query",
        placeholder: "Series Query",
        value: seriesQuery,
        onChange: onSeriesQueryChange,
        onBlur: () => {
          if (qryType === PromVariableQueryType.SeriesQuery && seriesQuery) {
            onChangeWithVariableString({ qryType });
          }
        },
        width: 100,
        "data-testid": selectors.components.DataSource.Prometheus.variableQueryEditor.seriesQuery
      }
    )
  )), qryType === PromVariableQueryType.ClassicQuery && /* @__PURE__ */ React__default["default"].createElement(ui.InlineFieldRow, null, /* @__PURE__ */ React__default["default"].createElement(
    ui.InlineField,
    {
      label: "Classic Query",
      labelWidth: 20,
      tooltip: /* @__PURE__ */ React__default["default"].createElement("div", null, "The original implemetation of the Prometheus variable query editor. Enter a string with the correct query type and parameters as described in these docs. For example, label_values(label, metric).")
    },
    /* @__PURE__ */ React__default["default"].createElement(
      ui.Input,
      {
        type: "text",
        "aria-label": "Classic Query",
        placeholder: "Classic Query",
        value: classicQuery,
        onChange: onClassicQueryChange,
        onBlur: () => {
          if (qryType === PromVariableQueryType.ClassicQuery && classicQuery) {
            onChangeWithVariableString({ qryType });
          }
        },
        width: 100,
        "data-testid": selectors.components.DataSource.Prometheus.variableQueryEditor.classicQuery
      }
    )
  )));
};
function variableMigration(query) {
  if (typeof query === "string") {
    return migrateVariableQueryToEditor(query);
  } else if (query.query) {
    return migrateVariableQueryToEditor(query.query);
  } else {
    return query;
  }
}

var __defProp$4 = Object.defineProperty;
var __defProps$4 = Object.defineProperties;
var __getOwnPropDescs$4 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$4 = Object.getOwnPropertySymbols;
var __hasOwnProp$4 = Object.prototype.hasOwnProperty;
var __propIsEnum$4 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$4 = (obj, key, value) => key in obj ? __defProp$4(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$4 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$4.call(b, prop))
      __defNormalProp$4(a, prop, b[prop]);
  if (__getOwnPropSymbols$4)
    for (var prop of __getOwnPropSymbols$4(b)) {
      if (__propIsEnum$4.call(b, prop))
        __defNormalProp$4(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$4 = (a, b) => __defProps$4(a, __getOwnPropDescs$4(b));
var __publicField$2 = (obj, key, value) => {
  __defNormalProp$4(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class PrometheusMetricFindQuery {
  constructor(datasource, query) {
    this.datasource = datasource;
    this.query = query;
    __publicField$2(this, "range");
    this.datasource = datasource;
    this.query = query;
    this.range = data.getDefaultTimeRange();
  }
  process(timeRange) {
    this.range = timeRange;
    const labelNamesRegex = PrometheusLabelNamesRegex;
    const labelNamesRegexWithMatch = PrometheusLabelNamesRegexWithMatch;
    const labelValuesRegex = /^label_values\((?:(.+),\s*)?([a-zA-Z_][a-zA-Z0-9_]*)\)\s*$/;
    const metricNamesRegex = PrometheusMetricNamesRegex;
    const queryResultRegex = PrometheusQueryResultRegex;
    const labelNamesQuery = this.query.match(labelNamesRegex);
    const labelNamesMatchQuery = this.query.match(labelNamesRegexWithMatch);
    if (labelNamesMatchQuery) {
      const selector = `{__name__=~".*${labelNamesMatchQuery[1]}.*"}`;
      return this.datasource.languageProvider.getSeriesLabels(selector, []).then(
        (results) => results.map((result) => ({
          text: result
        }))
      );
    }
    if (labelNamesQuery) {
      return this.datasource.getTagKeys({ filters: [], timeRange });
    }
    const labelValuesQuery = this.query.match(labelValuesRegex);
    if (labelValuesQuery) {
      const filter = labelValuesQuery[1];
      const label = labelValuesQuery[2];
      if (isFilterDefined(filter)) {
        return this.labelValuesQuery(label, filter);
      } else {
        return this.labelValuesQuery(label);
      }
    }
    const metricNamesQuery = this.query.match(metricNamesRegex);
    if (metricNamesQuery) {
      return this.metricNameQuery(metricNamesQuery[1]);
    }
    const queryResultQuery = this.query.match(queryResultRegex);
    if (queryResultQuery) {
      return this.queryResultQuery(queryResultQuery[1]);
    }
    const expressions = ["label_values()", "metrics()", "query_result()"];
    if (!expressions.includes(this.query)) {
      return this.metricNameAndLabelsQuery(this.query);
    }
    return Promise.resolve([]);
  }
  labelValuesQuery(label, metric) {
    const start = getPrometheusTime(this.range.from, false);
    const end = getPrometheusTime(this.range.to, true);
    const params = __spreadProps$4(__spreadValues$4({}, metric && { "match[]": metric }), { start: start.toString(), end: end.toString() });
    if (!metric || this.datasource.hasLabelsMatchAPISupport()) {
      const url = `/api/v1/label/${label}/values`;
      return this.datasource.metadataRequest(url, params).then((result) => {
        return lodash.map(result.data.data, (value) => {
          return { text: value };
        });
      });
    } else {
      const url = `/api/v1/series`;
      return this.datasource.metadataRequest(url, params).then((result) => {
        const _labels = lodash.map(result.data.data, (metric2) => {
          return metric2[label] || "";
        }).filter((label2) => {
          return label2 !== "";
        });
        return lodash.uniq(_labels).map((metric2) => {
          return {
            text: metric2,
            expandable: true
          };
        });
      });
    }
  }
  metricNameQuery(metricFilterPattern) {
    const start = getPrometheusTime(this.range.from, false);
    const end = getPrometheusTime(this.range.to, true);
    const params = {
      start: start.toString(),
      end: end.toString()
    };
    const url = `/api/v1/label/__name__/values`;
    return this.datasource.metadataRequest(url, params).then((result) => {
      return lodash.chain(result.data.data).filter((metricName) => {
        const r = new RegExp(metricFilterPattern);
        return r.test(metricName);
      }).map((matchedMetricName) => {
        return {
          text: matchedMetricName,
          expandable: true
        };
      }).value();
    });
  }
  queryResultQuery(query) {
    const url = "/api/v1/query";
    const params = {
      query,
      time: getPrometheusTime(this.range.to, true).toString()
    };
    return this.datasource.metadataRequest(url, params).then((result) => {
      switch (result.data.data.resultType) {
        case "scalar":
        case "string":
          return [
            {
              text: result.data.data.result[1] || "",
              expandable: false
            }
          ];
        case "vector":
          return lodash.map(result.data.data.result, (metricData) => {
            let text = metricData.metric.__name__ || "";
            delete metricData.metric.__name__;
            text += "{" + lodash.map(metricData.metric, (v, k) => {
              return k + '="' + v + '"';
            }).join(",") + "}";
            text += " " + metricData.value[1] + " " + metricData.value[0] * 1e3;
            return {
              text,
              expandable: true
            };
          });
        default:
          throw Error(`Unknown/Unhandled result type: [${result.data.data.resultType}]`);
      }
    });
  }
  metricNameAndLabelsQuery(query) {
    const start = getPrometheusTime(this.range.from, false);
    const end = getPrometheusTime(this.range.to, true);
    const params = {
      "match[]": query,
      start: start.toString(),
      end: end.toString()
    };
    const url = `/api/v1/series`;
    const self = this;
    return this.datasource.metadataRequest(url, params).then((result) => {
      return lodash.map(result.data.data, (metric) => {
        return {
          text: self.datasource.getOriginalMetricName(metric),
          expandable: true
        };
      });
    });
  }
}
function isFilterDefined(filter) {
  return filter && filter.split(" ").join("") !== "{}";
}

var __defProp$3 = Object.defineProperty;
var __defProps$3 = Object.defineProperties;
var __getOwnPropDescs$3 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$3 = Object.getOwnPropertySymbols;
var __hasOwnProp$3 = Object.prototype.hasOwnProperty;
var __propIsEnum$3 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$3 = (obj, key, value) => key in obj ? __defProp$3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$3 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$3.call(b, prop))
      __defNormalProp$3(a, prop, b[prop]);
  if (__getOwnPropSymbols$3)
    for (var prop of __getOwnPropSymbols$3(b)) {
      if (__propIsEnum$3.call(b, prop))
        __defNormalProp$3(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$3 = (a, b) => __defProps$3(a, __getOwnPropDescs$3(b));
const SUM_HINT_THRESHOLD_COUNT = 20;
function getQueryHints(query, series, datasource) {
  var _a;
  const hints = [];
  const metricsMetadata = (_a = datasource == null ? void 0 : datasource.languageProvider) == null ? void 0 : _a.metricsMetadata;
  const oldHistogramMetric = query.trim().match(/^\w+_bucket$|^\w+_bucket{.*}$/);
  if (oldHistogramMetric) {
    const label = "Selected metric has buckets.";
    hints.push({
      type: "HISTOGRAM_QUANTILE",
      label,
      fix: {
        label: "Consider calculating aggregated quantile by adding histogram_quantile().",
        action: {
          type: "ADD_HISTOGRAM_QUANTILE",
          query
        }
      }
    });
  } else if (metricsMetadata && simpleQueryCheck(query)) {
    const queryTokens = getQueryTokens(query);
    const { nameMetric } = checkMetricType(queryTokens, "histogram", metricsMetadata, false);
    const nativeHistogramNameMetric = nameMetric;
    if (nativeHistogramNameMetric) {
      const label = "Selected metric is a native histogram.";
      hints.push(
        {
          type: "HISTOGRAM_AVG",
          label,
          fix: {
            label: "Consider calculating the arithmetic average of observed values by adding histogram_avg().",
            action: {
              type: "ADD_HISTOGRAM_AVG",
              query
            }
          }
        },
        {
          type: "HISTOGRAM_COUNT",
          label,
          fix: {
            label: "Consider calculating the count of observations by adding histogram_count().",
            action: {
              type: "ADD_HISTOGRAM_COUNT",
              query
            }
          }
        },
        {
          type: "HISTOGRAM_SUM",
          label,
          fix: {
            label: "Consider calculating the sum of observations by adding histogram_sum().",
            action: {
              type: "ADD_HISTOGRAM_SUM",
              query
            }
          }
        },
        {
          type: "HISTOGRAM_FRACTION",
          label,
          fix: {
            label: "Consider calculating the estimated fraction of observations between the provided lower and upper values by adding histogram_fraction().",
            action: {
              type: "ADD_HISTOGRAM_FRACTION",
              query
            }
          }
        },
        {
          type: "HISTOGRAM_STDDEV",
          label,
          fix: {
            label: "Consider calculating the estimated standard deviation of observations by adding histogram_stddev().",
            action: {
              type: "ADD_HISTOGRAM_STDDEV",
              query
            }
          }
        },
        {
          type: "HISTOGRAM_STDVAR",
          label,
          fix: {
            label: "Consider calculating the estimated standard variance of observations by adding histogram_stdvar().",
            action: {
              type: "ADD_HISTOGRAM_STDVAR",
              query
            }
          }
        }
      );
    }
  }
  if (query.indexOf("rate(") === -1 && query.indexOf("increase(") === -1) {
    const nameMatch = query.match(new RegExp("\\b((?<!:)\\w+_(total|sum|count)(?!:))\\b"));
    let counterNameMetric = nameMatch ? nameMatch[1] : "";
    let certain = false;
    if (metricsMetadata) {
      const queryTokens = getQueryTokens(query);
      const metricTypeChecked = checkMetricType(queryTokens, "counter", metricsMetadata, certain);
      counterNameMetric = metricTypeChecked.nameMetric;
      certain = metricTypeChecked.certain;
    }
    if (counterNameMetric) {
      const fixableQuery = simpleQueryCheck(query);
      const verb = certain ? "is" : "looks like";
      let label = `Selected metric ${verb} a counter.`;
      let fix;
      if (fixableQuery) {
        fix = {
          label: "Consider calculating rate of counter by adding rate().",
          action: {
            type: "ADD_RATE",
            query
          }
        };
      } else {
        label = `${label} Consider calculating rate of counter by adding rate().`;
      }
      hints.push({
        type: "APPLY_RATE",
        label,
        fix
      });
    }
  }
  if (datasource && datasource.ruleMappings) {
    const mapping = datasource.ruleMappings;
    const mappingForQuery = Object.keys(mapping).reduce((acc, ruleName) => {
      if (query.search(ruleName) > -1) {
        return __spreadProps$3(__spreadValues$3({}, acc), {
          [ruleName]: mapping[ruleName]
        });
      }
      return acc;
    }, {});
    if (lodash.size(mappingForQuery) > 0) {
      const label = "Query contains recording rules.";
      hints.push({
        type: "EXPAND_RULES",
        label,
        fix: {
          label: "Expand rules",
          action: {
            type: "EXPAND_RULES",
            query,
            options: mappingForQuery
          }
        }
      });
    }
  }
  if (series && series.length >= SUM_HINT_THRESHOLD_COUNT) {
    const simpleMetric = query.trim().match(/^\w+$/);
    if (simpleMetric) {
      hints.push({
        type: "ADD_SUM",
        label: "Many time series results returned.",
        fix: {
          label: "Consider aggregating with sum().",
          action: {
            type: "ADD_SUM",
            query,
            preventSubmit: true
          }
        }
      });
    }
  }
  return hints;
}
function getInitHints(datasource) {
  const hints = [];
  if (datasource.lookupsDisabled) {
    hints.push({
      label: `Labels and metrics lookup was disabled in data source settings.`,
      type: "INFO"
    });
  }
  return hints;
}
function getQueryTokens(query) {
  return Array.from(query.matchAll(/\$?[a-zA-Z_:][a-zA-Z0-9_:]*/g)).map(([match]) => match).filter((token) => !token.startsWith("$")).flatMap((token) => token.split(":"));
}
function checkMetricType(queryTokens, metricType, metricsMetadata, certain) {
  var _a;
  const nameMetric = (_a = queryTokens.find((metricName) => {
    const metadata = metricsMetadata[metricName];
    if (metadata && metadata.type.toLowerCase() === metricType) {
      certain = true;
      return true;
    } else {
      return false;
    }
  })) != null ? _a : "";
  return { nameMetric, certain };
}
function simpleQueryCheck(query) {
  return query.trim().match(/^\w+$|^\w+{.*}$/);
}

var __defProp$2 = Object.defineProperty;
var __defProps$2 = Object.defineProperties;
var __getOwnPropDescs$2 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$2 = Object.getOwnPropertySymbols;
var __hasOwnProp$2 = Object.prototype.hasOwnProperty;
var __propIsEnum$2 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$2 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$2.call(b, prop))
      __defNormalProp$2(a, prop, b[prop]);
  if (__getOwnPropSymbols$2)
    for (var prop of __getOwnPropSymbols$2(b)) {
      if (__propIsEnum$2.call(b, prop))
        __defNormalProp$2(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$2 = (a, b) => __defProps$2(a, __getOwnPropDescs$2(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$2.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$2)
    for (var prop of __getOwnPropSymbols$2(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$2.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const INFINITY_SAMPLE_REGEX = /^[+-]?inf(?:inity)?$/i;
const isTableResult = (dataFrame, options) => {
  var _a, _b, _c, _d;
  if (options.app === data.CoreApp.Explore && (((_b = (_a = dataFrame.meta) == null ? void 0 : _a.custom) == null ? void 0 : _b.resultType) === "vector" || ((_d = (_c = dataFrame.meta) == null ? void 0 : _c.custom) == null ? void 0 : _d.resultType) === "scalar")) {
    return true;
  }
  const target = options.targets.find((target2) => target2.refId === dataFrame.refId);
  return (target == null ? void 0 : target.format) === "table";
};
const isCumulativeHeatmapResult = (dataFrame, options) => {
  var _a;
  if (((_a = dataFrame.meta) == null ? void 0 : _a.type) === data.DataFrameType.HeatmapCells) {
    return false;
  }
  const target = options.targets.find((target2) => target2.refId === dataFrame.refId);
  return (target == null ? void 0 : target.format) === "heatmap";
};
function transformV2(response, request, options) {
  if (runtime.config.featureToggles.prometheusDataplane) {
    response.data.forEach((f) => {
      const target = request.targets.find((t) => t.refId === f.refId);
      if (target && target.legendFormat === "__auto") {
        f.fields.forEach((field) => {
          var _a, _b;
          if (((_a = field.labels) == null ? void 0 : _a.__name__) && ((_b = field.labels) == null ? void 0 : _b.__name__) === field.name) {
            const fieldCopy = __spreadProps$2(__spreadValues$2({}, field), { name: data.TIME_SERIES_VALUE_FIELD_NAME });
            field.config.displayNameFromDS = data.getFieldDisplayName(fieldCopy, f, response.data);
          }
        });
      }
    });
  }
  const [tableFrames, framesWithoutTable] = lodash.partition(response.data, (df) => isTableResult(df, request));
  const processedTableFrames = transformDFToTable(tableFrames);
  const [exemplarFrames, framesWithoutTableAndExemplars] = lodash.partition(
    framesWithoutTable,
    (df) => {
      var _a, _b;
      return ((_b = (_a = df.meta) == null ? void 0 : _a.custom) == null ? void 0 : _b.resultType) === "exemplar";
    }
  );
  const { exemplarTraceIdDestinations: destinations } = options;
  const processedExemplarFrames = exemplarFrames.map((dataFrame) => {
    var _a;
    if (destinations == null ? void 0 : destinations.length) {
      for (const exemplarTraceIdDestination of destinations) {
        const traceIDField = dataFrame.fields.find((field) => field.name === exemplarTraceIdDestination.name);
        if (traceIDField) {
          const links = getDataLinks(exemplarTraceIdDestination);
          traceIDField.config.links = ((_a = traceIDField.config.links) == null ? void 0 : _a.length) ? [...traceIDField.config.links, ...links] : links;
        }
      }
    }
    return __spreadProps$2(__spreadValues$2({}, dataFrame), { meta: __spreadProps$2(__spreadValues$2({}, dataFrame.meta), { dataTopic: data.DataTopic.Annotations }) });
  });
  const [heatmapResults, framesWithoutTableHeatmapsAndExemplars] = lodash.partition(
    framesWithoutTableAndExemplars,
    (df) => isCumulativeHeatmapResult(df, request)
  );
  heatmapResults.forEach((df) => {
    var _a;
    if (df.name == null) {
      let f = df.fields.find((f2) => f2.type === data.FieldType.number);
      if (f) {
        let le = (_a = f.labels) == null ? void 0 : _a.le;
        if (le) {
          df.name = le;
          f.config.displayNameFromDS = le;
        }
      }
    }
  });
  const heatmapResultsGroupedByQuery = lodash.groupBy(heatmapResults, (h) => h.refId);
  let processedHeatmapResultsGroupedByQuery = [];
  for (const query in heatmapResultsGroupedByQuery) {
    const heatmapResultsGroup = heatmapResultsGroupedByQuery[query];
    const heatmapResultsGroupedByValues = lodash.groupBy(heatmapResultsGroup, (dataFrame) => {
      var _b;
      const values = dataFrame.fields.find((field) => field.type === data.FieldType.number);
      if ((values == null ? void 0 : values.labels) && HISTOGRAM_QUANTILE_LABEL_NAME in values.labels) {
        const _a = values == null ? void 0 : values.labels, notLE = __objRest(_a, ["le"]);
        return Object.values(notLE).join();
      }
      return Object.values((_b = values == null ? void 0 : values.labels) != null ? _b : []).join();
    });
    lodash.forOwn(heatmapResultsGroupedByValues, (dataFrames, key) => {
      const sortedHeatmap = dataFrames.sort(sortSeriesByLabel);
      processedHeatmapResultsGroupedByQuery.push(mergeHeatmapFrames(transformToHistogramOverTime(sortedHeatmap)));
    });
  }
  const otherFrames = framesWithoutTableHeatmapsAndExemplars.map((dataFrame) => {
    const df = __spreadProps$2(__spreadValues$2({}, dataFrame), {
      meta: __spreadProps$2(__spreadValues$2({}, dataFrame.meta), {
        preferredVisualisationType: "graph"
      })
    });
    return df;
  });
  const flattenedProcessedHeatmapFrames = lodash.flatten(processedHeatmapResultsGroupedByQuery);
  return __spreadProps$2(__spreadValues$2({}, response), {
    data: [...otherFrames, ...processedTableFrames, ...flattenedProcessedHeatmapFrames, ...processedExemplarFrames]
  });
}
const HISTOGRAM_QUANTILE_LABEL_NAME = "le";
function transformDFToTable(dfs) {
  if (dfs.length === 0 || dfs.length === 1 && dfs[0].length === 0) {
    return dfs;
  }
  const dataFramesByRefId = lodash.groupBy(dfs, "refId");
  const refIds = Object.keys(dataFramesByRefId);
  const frames = refIds.map((refId) => {
    const valueText = getValueText(refIds.length, refId);
    const valueField = getValueField({ data: [], valueName: valueText });
    const timeField = getTimeField([]);
    const labelFields = [];
    dataFramesByRefId[refId].forEach((df) => {
      var _a;
      const frameValueField = df.fields[1];
      const promLabels = (_a = frameValueField == null ? void 0 : frameValueField.labels) != null ? _a : {};
      Object.keys(promLabels).sort().forEach((label) => {
        if (!labelFields.some((l) => l.name === label)) {
          const numberField = label === HISTOGRAM_QUANTILE_LABEL_NAME;
          labelFields.push({
            name: label,
            config: { filterable: true },
            type: numberField ? data.FieldType.number : data.FieldType.string,
            values: []
          });
        }
      });
    });
    dataFramesByRefId[refId].forEach((df) => {
      var _a, _b, _c, _d;
      const timeFields = (_b = (_a = df.fields[0]) == null ? void 0 : _a.values) != null ? _b : [];
      const dataFields = (_d = (_c = df.fields[1]) == null ? void 0 : _c.values) != null ? _d : [];
      timeFields.forEach((value) => timeField.values.push(value));
      dataFields.forEach((value) => {
        var _a2;
        valueField.values.push(parseSampleValue(value));
        const labelsForField = (_a2 = df.fields[1].labels) != null ? _a2 : {};
        labelFields.forEach((field) => field.values.push(getLabelValue(labelsForField, field.name)));
      });
    });
    const fields = [timeField, ...labelFields, valueField];
    return {
      refId,
      fields,
      // Prometheus specific UI for instant queries
      meta: __spreadProps$2(__spreadValues$2({}, dataFramesByRefId[refId][0].meta), {
        preferredVisualisationType: "rawPrometheus"
      }),
      length: timeField.values.length
    };
  });
  return frames;
}
function getValueText(responseLength, refId = "") {
  return responseLength > 1 ? `Value #${refId}` : "Value";
}
function getDataLinks(options) {
  var _a;
  const dataLinks = [];
  if (options.datasourceUid) {
    const dataSourceSrv = runtime.getDataSourceSrv();
    const dsSettings = dataSourceSrv.getInstanceSettings(options.datasourceUid);
    if (dsSettings) {
      dataLinks.push({
        title: options.urlDisplayLabel || `Query with ${dsSettings == null ? void 0 : dsSettings.name}`,
        url: "",
        internal: {
          query: { query: "${__value.raw}", queryType: "traceql" },
          datasourceUid: options.datasourceUid,
          datasourceName: (_a = dsSettings == null ? void 0 : dsSettings.name) != null ? _a : "Data source not found"
        }
      });
    }
  }
  if (options.url) {
    dataLinks.push({
      title: options.urlDisplayLabel || `Go to ${options.url}`,
      url: options.url,
      targetBlank: true
    });
  }
  return dataLinks;
}
function getLabelValue(metric, label) {
  if (metric.hasOwnProperty(label)) {
    if (label === HISTOGRAM_QUANTILE_LABEL_NAME) {
      return parseSampleValue(metric[label]);
    }
    return metric[label];
  }
  return "";
}
function getTimeField(data$1, isMs = false) {
  return {
    name: data.TIME_SERIES_TIME_FIELD_NAME,
    type: data.FieldType.time,
    config: {},
    values: data$1.map((val) => isMs ? val[0] : val[0] * 1e3)
  };
}
function getValueField({
  data: data$1,
  valueName = data.TIME_SERIES_VALUE_FIELD_NAME,
  parseValue = true,
  labels,
  displayNameFromDS
}) {
  return {
    name: valueName,
    type: data.FieldType.number,
    display: data.getDisplayProcessor(),
    config: {
      displayNameFromDS
    },
    labels,
    values: data$1.map((val) => parseValue ? parseSampleValue(val[1]) : val[1])
  };
}
function getOriginalMetricName(labelData) {
  const metricName = labelData.__name__ || "";
  delete labelData.__name__;
  const labelPart = Object.entries(labelData).map((label) => `${label[0]}="${label[1]}"`).join(",");
  return `${metricName}{${labelPart}}`;
}
function mergeHeatmapFrames(frames) {
  if (frames.length === 0 || frames.length === 1 && frames[0].length === 0) {
    return [];
  }
  const timeField = frames[0].fields.find((field) => field.type === data.FieldType.time);
  const countFields = frames.map((frame) => {
    let field = frame.fields.find((field2) => field2.type === data.FieldType.number);
    return __spreadProps$2(__spreadValues$2({}, field), {
      name: field.config.displayNameFromDS
    });
  });
  return [
    __spreadProps$2(__spreadValues$2({}, frames[0]), {
      meta: __spreadProps$2(__spreadValues$2({}, frames[0].meta), {
        type: data.DataFrameType.HeatmapRows
      }),
      fields: [timeField, ...countFields]
    })
  ];
}
function transformToHistogramOverTime(seriesList) {
  for (let i = seriesList.length - 1; i > 0; i--) {
    const topSeries = seriesList[i].fields.find((s) => s.type === data.FieldType.number);
    const bottomSeries = seriesList[i - 1].fields.find((s) => s.type === data.FieldType.number);
    if (!topSeries || !bottomSeries) {
      throw new Error("Prometheus heatmap transform error: data should be a time series");
    }
    for (let j = 0; j < topSeries.values.length; j++) {
      const bottomPoint = bottomSeries.values[j] || [0];
      topSeries.values[j] -= bottomPoint;
      if (topSeries.values[j] < 1e-9) {
        topSeries.values[j] = 0;
      }
    }
  }
  return seriesList;
}
function sortSeriesByLabel(s1, s2) {
  var _a, _b, _c, _d, _e, _f;
  let le1, le2;
  try {
    le1 = parseSampleValue((_c = (_b = (_a = s1.fields[1].state) == null ? void 0 : _a.displayName) != null ? _b : s1.name) != null ? _c : s1.fields[1].name);
    le2 = parseSampleValue((_f = (_e = (_d = s2.fields[1].state) == null ? void 0 : _d.displayName) != null ? _e : s2.name) != null ? _f : s2.fields[1].name);
  } catch (err) {
    console.error(err);
    return 0;
  }
  if (le1 > le2) {
    return 1;
  }
  if (le1 < le2) {
    return -1;
  }
  return 0;
}
function parseSampleValue(value) {
  if (INFINITY_SAMPLE_REGEX.test(value)) {
    return value[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
  }
  return parseFloat(value);
}

function trackQuery(response, request, startTime) {
  var _a, _b, _c, _d;
  const { app, targets: queries } = request;
  if (app !== data.CoreApp.Explore) {
    return;
  }
  for (const query of queries) {
    runtime.reportInteraction("grafana_prometheus_query_executed", {
      app,
      grafana_version: runtime.config.buildInfo.version,
      has_data: response.data.some((frame) => frame.length > 0),
      has_error: response.error !== void 0,
      expr: query.expr,
      format: query.format,
      instant: query.instant,
      range: query.range,
      exemplar: query.exemplar,
      hinting: query.hinting,
      interval: query.interval,
      intervalFactor: query.intervalFactor,
      utcOffsetSec: query.utcOffsetSec,
      legend: query.legendFormat,
      valueWithRefId: query.valueWithRefId,
      requestId: request.requestId,
      showingGraph: query.showingGraph,
      showingTable: query.showingTable,
      editor_mode: query.editorMode,
      simultaneously_sent_query_count: queries.length,
      time_range_from: (_b = (_a = request == null ? void 0 : request.range) == null ? void 0 : _a.from) == null ? void 0 : _b.toISOString(),
      time_range_to: (_d = (_c = request == null ? void 0 : request.range) == null ? void 0 : _c.to) == null ? void 0 : _d.toISOString(),
      time_taken: Date.now() - startTime.getTime()
    });
  }
}

var __defProp$1 = Object.defineProperty;
var __defProps$1 = Object.defineProperties;
var __getOwnPropDescs$1 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$1 = Object.getOwnPropertySymbols;
var __hasOwnProp$1 = Object.prototype.hasOwnProperty;
var __propIsEnum$1 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$1 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$1.call(b, prop))
      __defNormalProp$1(a, prop, b[prop]);
  if (__getOwnPropSymbols$1)
    for (var prop of __getOwnPropSymbols$1(b)) {
      if (__propIsEnum$1.call(b, prop))
        __defNormalProp$1(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$1 = (a, b) => __defProps$1(a, __getOwnPropDescs$1(b));
var __publicField$1 = (obj, key, value) => {
  __defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class PrometheusVariableSupport extends data.CustomVariableSupport {
  constructor(datasource, templateSrv = runtime.getTemplateSrv()) {
    super();
    this.datasource = datasource;
    this.templateSrv = templateSrv;
    __publicField$1(this, "editor", PromVariableQueryEditor);
  }
  query(request) {
    let query;
    if (typeof request.targets[0] === "string") {
      query = request.targets[0];
    } else {
      query = request.targets[0].query;
    }
    if (!query) {
      return rxjs.of({ data: [] });
    }
    const scopedVars = __spreadValues$1(__spreadProps$1(__spreadValues$1({}, request.scopedVars), {
      __interval: { text: this.datasource.interval, value: this.datasource.interval },
      __interval_ms: {
        text: data.rangeUtil.intervalToMs(this.datasource.interval),
        value: data.rangeUtil.intervalToMs(this.datasource.interval)
      }
    }), this.datasource.getRangeScopedVars(request.range));
    const interpolated = this.templateSrv.replace(query, scopedVars, this.datasource.interpolateQueryExpr);
    const metricFindQuery = new PrometheusMetricFindQuery(this.datasource, interpolated);
    const metricFindStream = rxjs.from(metricFindQuery.process(request.range));
    return metricFindStream.pipe(operators$3.map((results) => ({ data: results })));
  }
}

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
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const ANNOTATION_QUERY_STEP_DEFAULT = "60s";
const GET_AND_POST_METADATA_ENDPOINTS = ["api/v1/query", "api/v1/query_range", "api/v1/series", "api/v1/labels"];
const InstantQueryRefIdIndex = "-Instant";
class PrometheusDatasource extends runtime.DataSourceWithBackend {
  constructor(instanceSettings, templateSrv = runtime.getTemplateSrv(), languageProvider) {
    var _a, _b, _c, _d, _e, _f;
    super(instanceSettings);
    this.templateSrv = templateSrv;
    __publicField(this, "type");
    __publicField(this, "ruleMappings");
    __publicField(this, "hasIncrementalQuery");
    __publicField(this, "url");
    __publicField(this, "id");
    __publicField(this, "access");
    __publicField(this, "basicAuth");
    __publicField(this, "withCredentials");
    __publicField(this, "interval");
    __publicField(this, "httpMethod");
    __publicField(this, "languageProvider");
    __publicField(this, "exemplarTraceIdDestinations");
    __publicField(this, "lookupsDisabled");
    __publicField(this, "customQueryParameters");
    __publicField(this, "datasourceConfigurationPrometheusFlavor");
    __publicField(this, "datasourceConfigurationPrometheusVersion");
    __publicField(this, "disableRecordingRules");
    __publicField(this, "defaultEditor");
    __publicField(this, "exemplarsAvailable");
    __publicField(this, "cacheLevel");
    __publicField(this, "cache");
    __publicField(this, "metricNamesAutocompleteSuggestionLimit");
    __publicField(this, "init", async () => {
      if (!this.disableRecordingRules) {
        this.loadRules();
      }
      this.exemplarsAvailable = await this.areExemplarsAvailable();
    });
    __publicField(this, "processAnnotationResponse", (options, data$1) => {
      var _a;
      const frames = runtime.toDataQueryResponse({ data: data$1 }).data;
      if (!frames || !frames.length) {
        return [];
      }
      const annotation = options.annotation;
      const { tagKeys = "", titleFormat = "", textFormat = "" } = annotation;
      const step = data.rangeUtil.intervalToSeconds(annotation.step || ANNOTATION_QUERY_STEP_DEFAULT) * 1e3;
      const tagKeysArray = tagKeys.split(",");
      const eventList = [];
      for (const frame of frames) {
        if (frame.fields.length === 0) {
          continue;
        }
        const timeField = frame.fields[0];
        const valueField = frame.fields[1];
        const labels = (valueField == null ? void 0 : valueField.labels) || {};
        const tags = Object.keys(labels).filter((label) => tagKeysArray.includes(label)).map((label) => labels[label]);
        const timeValueTuple = [];
        let idx = 0;
        valueField.values.forEach((value) => {
          let timeStampValue;
          let valueValue;
          const time = timeField.values[idx];
          if (options.annotation.useValueForTime) {
            timeStampValue = Math.floor(parseFloat(value));
            valueValue = 1;
          } else {
            timeStampValue = Math.floor(parseFloat(time));
            valueValue = parseFloat(value);
          }
          idx++;
          timeValueTuple.push([timeStampValue, valueValue]);
        });
        const activeValues = timeValueTuple.filter((value) => value[1] > 0);
        const activeValuesTimestamps = activeValues.map((value) => value[0]);
        let latestEvent = null;
        for (const timestamp of activeValuesTimestamps) {
          if (latestEvent && ((_a = latestEvent.timeEnd) != null ? _a : 0) + step >= timestamp) {
            latestEvent.timeEnd = timestamp;
            continue;
          }
          if (latestEvent) {
            eventList.push(latestEvent);
          }
          latestEvent = {
            time: timestamp,
            timeEnd: timestamp,
            annotation,
            title: data.renderLegendFormat(titleFormat, labels),
            tags,
            text: data.renderLegendFormat(textFormat, labels)
          };
        }
        if (latestEvent) {
          latestEvent.timeEnd = activeValuesTimestamps[activeValuesTimestamps.length - 1];
          eventList.push(latestEvent);
        }
      }
      return eventList;
    });
    this.type = "prometheus";
    this.id = instanceSettings.id;
    this.url = instanceSettings.url;
    this.access = instanceSettings.access;
    this.basicAuth = instanceSettings.basicAuth;
    this.withCredentials = Boolean(instanceSettings.withCredentials);
    this.interval = instanceSettings.jsonData.timeInterval || "15s";
    this.httpMethod = instanceSettings.jsonData.httpMethod || "GET";
    this.exemplarTraceIdDestinations = instanceSettings.jsonData.exemplarTraceIdDestinations;
    this.hasIncrementalQuery = (_a = instanceSettings.jsonData.incrementalQuerying) != null ? _a : false;
    this.ruleMappings = {};
    this.languageProvider = languageProvider != null ? languageProvider : new PromQlLanguageProvider(this);
    this.lookupsDisabled = (_b = instanceSettings.jsonData.disableMetricsLookup) != null ? _b : false;
    this.customQueryParameters = new URLSearchParams(instanceSettings.jsonData.customQueryParameters);
    this.datasourceConfigurationPrometheusFlavor = instanceSettings.jsonData.prometheusType;
    this.datasourceConfigurationPrometheusVersion = instanceSettings.jsonData.prometheusVersion;
    this.defaultEditor = instanceSettings.jsonData.defaultEditor;
    this.disableRecordingRules = (_c = instanceSettings.jsonData.disableRecordingRules) != null ? _c : false;
    this.variables = new PrometheusVariableSupport(this, this.templateSrv);
    this.exemplarsAvailable = true;
    this.cacheLevel = (_d = instanceSettings.jsonData.cacheLevel) != null ? _d : PrometheusCacheLevel.Low;
    this.metricNamesAutocompleteSuggestionLimit = (_e = instanceSettings.jsonData.codeModeMetricNamesSuggestionLimit) != null ? _e : SUGGESTIONS_LIMIT;
    this.cache = new QueryCache({
      getTargetSignature: this.getPrometheusTargetSignature.bind(this),
      overlapString: (_f = instanceSettings.jsonData.incrementalQueryOverlapWindow) != null ? _f : defaultPrometheusQueryOverlapWindow,
      profileFunction: this.getPrometheusProfileData.bind(this)
    });
    this.annotations = {
      QueryEditor: AnnotationQueryEditor
    };
  }
  getQueryDisplayText(query) {
    return query.expr;
  }
  getPrometheusProfileData(request, targ) {
    var _a;
    return {
      interval: (_a = targ.interval) != null ? _a : request.interval,
      expr: this.interpolateString(targ.expr),
      datasource: "Prometheus"
    };
  }
  /**
   * Get target signature for query caching
   * @param request
   * @param query
   */
  getPrometheusTargetSignature(request, query) {
    var _a, _b;
    const targExpr = this.interpolateString(query.expr);
    return `${targExpr}|${(_a = query.interval) != null ? _a : request.interval}|${JSON.stringify((_b = request.rangeRaw) != null ? _b : "")}|${query.exemplar}`;
  }
  hasLabelsMatchAPISupport() {
    return (
      // https://github.com/prometheus/prometheus/releases/tag/v2.24.0
      this._isDatasourceVersionGreaterOrEqualTo("2.24.0", PromApplication.Prometheus) || // All versions of Mimir support matchers for labels API
      this._isDatasourceVersionGreaterOrEqualTo("2.0.0", PromApplication.Mimir) || // https://github.com/cortexproject/cortex/discussions/4542
      this._isDatasourceVersionGreaterOrEqualTo("1.11.0", PromApplication.Cortex) || // https://github.com/thanos-io/thanos/pull/3566
      //https://github.com/thanos-io/thanos/releases/tag/v0.18.0
      this._isDatasourceVersionGreaterOrEqualTo("0.18.0", PromApplication.Thanos)
    );
  }
  _isDatasourceVersionGreaterOrEqualTo(targetVersion, targetFlavor) {
    if (!this.datasourceConfigurationPrometheusVersion || !this.datasourceConfigurationPrometheusFlavor) {
      return true;
    }
    if (targetFlavor !== this.datasourceConfigurationPrometheusFlavor) {
      return false;
    }
    return semver__default["default"].gte(this.datasourceConfigurationPrometheusVersion, targetVersion);
  }
  _addTracingHeaders(httpOptions, options) {
    httpOptions.headers = {};
    if (this.access === "proxy") {
      httpOptions.headers["X-Dashboard-UID"] = options.dashboardUID;
      httpOptions.headers["X-Panel-Id"] = options.panelId;
    }
  }
  directAccessError() {
    return rxjs.throwError(
      () => new Error(
        "Browser access mode in the Prometheus datasource is no longer available. Switch to server access mode."
      )
    );
  }
  /**
   * Any request done from this data source should go through here as it contains some common processing for the
   * request. Any processing done here needs to be also copied on the backend as this goes through data source proxy
   * but not through the same code as alerting.
   */
  _request(url, data, overrides = {}) {
    if (this.access === "direct") {
      return this.directAccessError();
    }
    data = data || {};
    for (const [key, value] of this.customQueryParameters) {
      if (data[key] == null) {
        data[key] = value;
      }
    }
    let queryUrl = this.url + url;
    if (url.startsWith(`/api/datasources/uid/${this.uid}`)) {
      queryUrl = url;
    }
    const options = lodash.defaults(overrides, {
      url: queryUrl,
      method: this.httpMethod,
      headers: {}
    });
    if (options.method === "GET") {
      if (data && Object.keys(data).length) {
        options.url = options.url + (options.url.search(/\?/) >= 0 ? "&" : "?") + Object.entries(data).map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join("&");
      }
    } else {
      options.headers["Content-Type"] = "application/x-www-form-urlencoded";
      options.data = data;
    }
    if (this.basicAuth || this.withCredentials) {
      options.withCredentials = true;
    }
    if (this.basicAuth) {
      options.headers.Authorization = this.basicAuth;
    }
    return runtime.getBackendSrv().fetch(options);
  }
  async importFromAbstractQueries(abstractQueries) {
    return abstractQueries.map((abstractQuery) => this.languageProvider.importFromAbstractQuery(abstractQuery));
  }
  async exportToAbstractQueries(queries) {
    return queries.map((query) => this.languageProvider.exportToAbstractQuery(query));
  }
  // Use this for tab completion features, wont publish response to other components
  async metadataRequest(url, params = {}, options) {
    if (GET_AND_POST_METADATA_ENDPOINTS.some((endpoint) => url.includes(endpoint))) {
      try {
        return await rxjs.lastValueFrom(
          this._request(`/api/datasources/uid/${this.uid}/resources${url}`, params, __spreadValues({
            method: this.httpMethod,
            hideFromInspector: true,
            showErrorAlert: false
          }, options))
        );
      } catch (err) {
        if (this.httpMethod === "POST" && runtime.isFetchError(err) && (err.status === 405 || err.status === 400)) {
          console.warn(`Couldn't use configured POST HTTP method for this request. Trying to use GET method instead.`);
        } else {
          throw err;
        }
      }
    }
    return await rxjs.lastValueFrom(
      this._request(`/api/datasources/uid/${this.uid}/resources${url}`, params, __spreadValues({
        method: "GET",
        hideFromInspector: true
      }, options))
    );
  }
  interpolateQueryExpr(value = [], variable) {
    if (!variable.multi && !variable.includeAll) {
      return prometheusRegularEscape(value);
    }
    if (typeof value === "string") {
      return prometheusSpecialRegexEscape(value);
    }
    const escapedValues = value.map((val) => prometheusSpecialRegexEscape(val));
    if (escapedValues.length === 1) {
      return escapedValues[0];
    }
    return "(" + escapedValues.join("|") + ")";
  }
  targetContainsTemplate(target) {
    return this.templateSrv.containsTemplate(target.expr);
  }
  shouldRunExemplarQuery(target, request) {
    if (target.exemplar) {
      const metricName = this.languageProvider.histogramMetrics.find((m) => target.expr.includes(m));
      const currentTargetIdx = request.targets.findIndex((t) => t.refId === target.refId);
      const targets = request.targets.slice(0, currentTargetIdx).filter((t) => !t.hide);
      if (!metricName || metricName && !targets.some((t) => t.expr.includes(metricName))) {
        return true;
      }
      return false;
    }
    return false;
  }
  processTargetV2(target, request) {
    var _a;
    const processedTargets = [];
    const processedTarget = __spreadProps(__spreadValues({}, target), {
      exemplar: this.shouldRunExemplarQuery(target, request),
      requestId: request.panelId + target.refId,
      // We need to pass utcOffsetSec to backend to calculate aligned range
      utcOffsetSec: request.range.to.utcOffset() * 60
    });
    if (runtime.config.featureToggles.promQLScope) {
      processedTarget.scopes = ((_a = request.scopes) != null ? _a : []).map((scope) => __spreadValues({
        name: scope.metadata.name
      }, scope.spec));
    }
    if (runtime.config.featureToggles.groupByVariable) {
      processedTarget.groupByKeys = request.groupByKeys;
    }
    if (target.instant && target.range) {
      processedTargets.push(
        __spreadProps(__spreadValues({}, processedTarget), {
          refId: processedTarget.refId,
          instant: false
        }),
        __spreadProps(__spreadValues({}, processedTarget), {
          refId: processedTarget.refId + InstantQueryRefIdIndex,
          range: false
        })
      );
    } else {
      processedTargets.push(processedTarget);
    }
    return processedTargets;
  }
  query(request) {
    if (this.access === "direct") {
      return this.directAccessError();
    }
    let fullOrPartialRequest;
    let requestInfo = void 0;
    const hasInstantQuery = request.targets.some((target) => target.instant);
    if (this.hasIncrementalQuery && !hasInstantQuery) {
      requestInfo = this.cache.requestInfo(request);
      fullOrPartialRequest = requestInfo.requests[0];
    } else {
      fullOrPartialRequest = request;
    }
    const targets = fullOrPartialRequest.targets.map((target) => this.processTargetV2(target, fullOrPartialRequest));
    const startTime = /* @__PURE__ */ new Date();
    return super.query(__spreadProps(__spreadValues({}, fullOrPartialRequest), { targets: targets.flat() })).pipe(
      operators$3.map((response) => {
        const amendedResponse = __spreadProps(__spreadValues({}, response), {
          data: this.cache.procFrames(request, requestInfo, response.data)
        });
        return transformV2(amendedResponse, request, {
          exemplarTraceIdDestinations: this.exemplarTraceIdDestinations
        });
      }),
      operators$3.tap((response) => {
        trackQuery(response, request, startTime);
      })
    );
  }
  metricFindQuery(query, options) {
    var _a, _b;
    if (!query) {
      return Promise.resolve([]);
    }
    const scopedVars = __spreadValues({
      __interval: { text: this.interval, value: this.interval },
      __interval_ms: { text: data.rangeUtil.intervalToMs(this.interval), value: data.rangeUtil.intervalToMs(this.interval) }
    }, this.getRangeScopedVars((_a = options == null ? void 0 : options.range) != null ? _a : data.getDefaultTimeRange()));
    const interpolated = this.templateSrv.replace(query, scopedVars, this.interpolateQueryExpr);
    const metricFindQuery = new PrometheusMetricFindQuery(this, interpolated);
    return metricFindQuery.process((_b = options == null ? void 0 : options.range) != null ? _b : data.getDefaultTimeRange());
  }
  getRangeScopedVars(range) {
    const msRange = range.to.diff(range.from);
    const sRange = Math.round(msRange / 1e3);
    return {
      __range_ms: { text: msRange, value: msRange },
      __range_s: { text: sRange, value: sRange },
      __range: { text: sRange + "s", value: sRange + "s" }
    };
  }
  async annotationQuery(options) {
    if (this.access === "direct") {
      const error = new Error(
        "Browser access mode in the Prometheus datasource is no longer available. Switch to server access mode."
      );
      return Promise.reject(error);
    }
    const annotation = options.annotation;
    const { expr = "" } = annotation;
    if (!expr) {
      return Promise.resolve([]);
    }
    const step = options.annotation.step || ANNOTATION_QUERY_STEP_DEFAULT;
    const queryModel = {
      expr,
      range: true,
      instant: false,
      exemplar: false,
      interval: step,
      refId: "X",
      datasource: this.getRef()
    };
    return await rxjs.lastValueFrom(
      runtime.getBackendSrv().fetch({
        url: "/api/ds/query",
        method: "POST",
        headers: this.getRequestHeaders(),
        data: {
          from: (getPrometheusTime(options.range.from, false) * 1e3).toString(),
          to: (getPrometheusTime(options.range.to, true) * 1e3).toString(),
          queries: [this.applyTemplateVariables(queryModel, {})]
        },
        requestId: `prom-query-${annotation.name}`
      }).pipe(
        operators$3.map((rsp) => {
          return this.processAnnotationResponse(options, rsp.data);
        })
      )
    );
  }
  // By implementing getTagKeys and getTagValues we add ad-hoc filters functionality
  // this is used to get label keys, a.k.a label names
  // it is used in metric_find_query.ts
  // and in Tempo here grafana/public/app/plugins/datasource/tempo/QueryEditor/ServiceGraphSection.tsx
  async getTagKeys(options) {
    if (!options || options.filters.length === 0) {
      await this.languageProvider.fetchLabels(options.timeRange, options.queries);
      return this.languageProvider.getLabelKeys().map((k) => ({ value: k, text: k }));
    }
    const labelFilters = options.filters.map((f) => ({
      label: f.key,
      value: f.value,
      op: f.operator
    }));
    const expr = promQueryModeller.renderLabels(labelFilters);
    let labelsIndex = await this.languageProvider.fetchLabelsWithMatch(expr);
    return Object.keys(labelsIndex).filter((labelName) => !options.filters.find((filter) => filter.key === labelName)).map((k) => ({ value: k, text: k }));
  }
  // By implementing getTagKeys and getTagValues we add ad-hoc filters functionality
  async getTagValues(options) {
    var _a, _b, _c, _d;
    const labelFilters = options.filters.map((f) => ({
      label: f.key,
      value: f.value,
      op: f.operator
    }));
    const expr = promQueryModeller.renderLabels(labelFilters);
    if (this.hasLabelsMatchAPISupport()) {
      const requestId = `[${this.uid}][${options.key}]`;
      return (await this.languageProvider.fetchSeriesValuesWithMatch(options.key, expr, requestId, options.timeRange)).map((v) => ({
        value: v,
        text: v
      }));
    }
    const params = this.getTimeRangeParams((_a = options.timeRange) != null ? _a : data.getDefaultTimeRange());
    const result = await this.metadataRequest(`/api/v1/label/${options.key}/values`, params);
    return (_d = (_c = (_b = result == null ? void 0 : result.data) == null ? void 0 : _b.data) == null ? void 0 : _c.map((value) => ({ text: value }))) != null ? _d : [];
  }
  interpolateVariablesInQueries(queries, scopedVars, filters) {
    let expandedQueries = queries;
    if (queries && queries.length) {
      expandedQueries = queries.map((query) => {
        const interpolatedQuery = this.templateSrv.replace(query.expr, scopedVars, this.interpolateQueryExpr);
        const replacedInterpolatedQuery = runtime.config.featureToggles.promQLScope ? interpolatedQuery : this.templateSrv.replace(
          this.enhanceExprWithAdHocFilters(filters, interpolatedQuery),
          scopedVars,
          this.interpolateQueryExpr
        );
        const expandedQuery = __spreadProps(__spreadValues(__spreadValues({}, query), runtime.config.featureToggles.promQLScope ? { adhocFilters: this.generateScopeFilters(filters) } : {}), {
          datasource: this.getRef(),
          expr: replacedInterpolatedQuery,
          interval: this.templateSrv.replace(query.interval, scopedVars)
        });
        return expandedQuery;
      });
    }
    return expandedQueries;
  }
  getQueryHints(query, result) {
    var _a;
    return getQueryHints((_a = query.expr) != null ? _a : "", result, this);
  }
  getInitHints() {
    return getInitHints(this);
  }
  async loadRules() {
    var _a, _b;
    try {
      const res = await this.metadataRequest("/api/v1/rules", {}, { showErrorAlert: false });
      const groups = (_b = (_a = res.data) == null ? void 0 : _a.data) == null ? void 0 : _b.groups;
      if (groups) {
        this.ruleMappings = extractRuleMappingFromGroups(groups);
      }
    } catch (e) {
      console.log("Rules API is experimental. Ignore next error.");
      console.error(e);
    }
  }
  async areExemplarsAvailable() {
    try {
      const res = await this.metadataRequest(
        "/api/v1/query_exemplars",
        {
          query: "test",
          start: data.dateTime().subtract(30, "minutes").valueOf().toString(),
          end: data.dateTime().valueOf().toString()
        },
        {
          // Avoid alerting the user if this test fails
          showErrorAlert: false
        }
      );
      if (res.data.status === "success") {
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  }
  modifyQuery(query, action) {
    var _a, _b, _c;
    let expression = (_a = query.expr) != null ? _a : "";
    switch (action.type) {
      case "ADD_FILTER": {
        const { key, value } = (_b = action.options) != null ? _b : {};
        if (key && value) {
          expression = addLabelToQuery(expression, key, value);
        }
        break;
      }
      case "ADD_FILTER_OUT": {
        const { key, value } = (_c = action.options) != null ? _c : {};
        if (key && value) {
          expression = addLabelToQuery(expression, key, value, "!=");
        }
        break;
      }
      case "ADD_HISTOGRAM_QUANTILE": {
        expression = `histogram_quantile(0.95, sum(rate(${expression}[$__rate_interval])) by (le))`;
        break;
      }
      case "ADD_HISTOGRAM_AVG": {
        expression = `histogram_avg(rate(${expression}[$__rate_interval]))`;
        break;
      }
      case "ADD_HISTOGRAM_FRACTION": {
        expression = `histogram_fraction(0,0.2,rate(${expression}[$__rate_interval]))`;
        break;
      }
      case "ADD_HISTOGRAM_COUNT": {
        expression = `histogram_count(rate(${expression}[$__rate_interval]))`;
        break;
      }
      case "ADD_HISTOGRAM_SUM": {
        expression = `histogram_sum(rate(${expression}[$__rate_interval]))`;
        break;
      }
      case "ADD_HISTOGRAM_STDDEV": {
        expression = `histogram_stddev(rate(${expression}[$__rate_interval]))`;
        break;
      }
      case "ADD_HISTOGRAM_STDVAR": {
        expression = `histogram_stdvar(rate(${expression}[$__rate_interval]))`;
        break;
      }
      case "ADD_RATE": {
        expression = `rate(${expression}[$__rate_interval])`;
        break;
      }
      case "ADD_SUM": {
        expression = `sum(${expression.trim()}) by ($1)`;
        break;
      }
      case "EXPAND_RULES": {
        if (action.options) {
          expression = expandRecordingRules(expression, action.options);
        }
        break;
      }
    }
    return __spreadProps(__spreadValues({}, query), { expr: expression });
  }
  /**
   * Returns the adjusted "snapped" interval parameters
   */
  getAdjustedInterval(timeRange) {
    return getRangeSnapInterval(this.cacheLevel, timeRange);
  }
  /**
   * This will return a time range that always includes the users current time range,
   * and then a little extra padding to round up/down to the nearest nth minute,
   * defined by the result of the getCacheDurationInMinutes.
   *
   * For longer cache durations, and shorter query durations,
   * the window we're calculating might be much bigger then the user's current window,
   * resulting in us returning labels/values that might not be applicable for the given window,
   * this is a necessary trade-off if we want to cache larger durations
   */
  getTimeRangeParams(timeRange) {
    return {
      start: getPrometheusTime(timeRange.from, false).toString(),
      end: getPrometheusTime(timeRange.to, true).toString()
    };
  }
  getOriginalMetricName(labelData) {
    return getOriginalMetricName(labelData);
  }
  /**
   * This converts the adhocVariableFilter array and converts it to scopeFilter array
   * @param filters
   */
  generateScopeFilters(filters) {
    if (!filters) {
      return [];
    }
    return filters.map((f) => __spreadProps(__spreadValues({}, f), {
      value: this.templateSrv.replace(f.value, {}, this.interpolateQueryExpr),
      operator: data.scopeFilterOperatorMap[f.operator]
    }));
  }
  enhanceExprWithAdHocFilters(filters, expr) {
    if (!filters || filters.length === 0) {
      return expr;
    }
    const finalQuery = filters.reduce((acc, filter) => {
      const { key, operator } = filter;
      let { value } = filter;
      if (operator === "=~" || operator === "!~") {
        value = prometheusRegularEscape(value);
      }
      return addLabelToQuery(acc, key, value, operator);
    }, expr);
    return finalQuery;
  }
  // Used when running queries through backend
  filterQuery(query) {
    if (query.hide || !query.expr) {
      return false;
    }
    return true;
  }
  // Used when running queries through backend
  applyTemplateVariables(target, scopedVars, filters) {
    const variables = __spreadValues({}, scopedVars);
    variables.__interval = {
      value: "$__interval"
    };
    variables.__interval_ms = {
      value: "$__interval_ms"
    };
    const expr = this.templateSrv.replace(target.expr, variables, this.interpolateQueryExpr);
    const exprWithAdhoc = runtime.config.featureToggles.promQLScope ? expr : this.templateSrv.replace(this.enhanceExprWithAdHocFilters(filters, expr), variables, this.interpolateQueryExpr);
    return __spreadProps(__spreadValues(__spreadValues({}, target), runtime.config.featureToggles.promQLScope ? { adhocFilters: this.generateScopeFilters(filters) } : {}), {
      expr: exprWithAdhoc,
      interval: this.templateSrv.replace(target.interval, variables),
      legendFormat: this.templateSrv.replace(target.legendFormat, variables)
    });
  }
  getVariables() {
    return this.templateSrv.getVariables().map((v) => `$${v.name}`);
  }
  interpolateString(string, scopedVars) {
    return this.templateSrv.replace(string, scopedVars, this.interpolateQueryExpr);
  }
  getDebounceTimeInMilliseconds() {
    switch (this.cacheLevel) {
      case PrometheusCacheLevel.Medium:
        return 600;
      case PrometheusCacheLevel.High:
        return 1200;
      default:
        return 350;
    }
  }
  getDaysToCacheMetadata() {
    switch (this.cacheLevel) {
      case PrometheusCacheLevel.Medium:
        return 7;
      case PrometheusCacheLevel.High:
        return 30;
      default:
        return 1;
    }
  }
  getCacheDurationInMinutes() {
    return getClientCacheDurationInMinutes(this.cacheLevel);
  }
  getDefaultQuery(app) {
    const defaults2 = {
      refId: "A",
      expr: "",
      range: true,
      instant: false
    };
    if (app === data.CoreApp.UnifiedAlerting) {
      return __spreadProps(__spreadValues({}, defaults2), {
        instant: true,
        range: false
      });
    }
    if (app === data.CoreApp.Explore) {
      return __spreadProps(__spreadValues({}, defaults2), {
        instant: true,
        range: true
      });
    }
    return defaults2;
  }
}
function extractRuleMappingFromGroups(groups) {
  return groups.reduce(
    (mapping, group) => group.rules.filter((rule) => rule.type === "recording").reduce(
      (acc, rule) => __spreadProps(__spreadValues({}, acc), {
        [rule.name]: rule.query
      }),
      mapping
    ),
    {}
  );
}
function prometheusRegularEscape(value) {
  return typeof value === "string" ? value.replace(/\\/g, "\\\\").replace(/'/g, "\\\\'") : value;
}
function prometheusSpecialRegexEscape(value) {
  return typeof value === "string" ? value.replace(/\\/g, "\\\\\\\\").replace(/[$^*{}\[\]\'+?.()|]/g, "\\\\$&") : value;
}

exports.AlertingSettingsOverhaul = AlertingSettingsOverhaul;
exports.AnnotationQueryEditor = AnnotationQueryEditor;
exports.ConfigEditor = ConfigEditor;
exports.DataSourceHttpSettingsOverhaul = DataSourceHttpSettingsOverhaul;
exports.ExemplarSetting = ExemplarSetting;
exports.ExemplarsSettings = ExemplarsSettings;
exports.InstantQueryRefIdIndex = InstantQueryRefIdIndex;
exports.LabelFilterItem = LabelFilterItem;
exports.LabelFilters = LabelFilters;
exports.LabelParamEditor = LabelParamEditor;
exports.MetricSelect = MetricSelect;
exports.MetricsLabelsSection = MetricsLabelsSection;
exports.MetricsModal = MetricsModal;
exports.MonacoQueryFieldLazy = MonacoQueryFieldLazy;
exports.NestedQuery = NestedQuery;
exports.NestedQueryList = NestedQueryList;
exports.PROM_CONFIG_LABEL_WIDTH = PROM_CONFIG_LABEL_WIDTH;
exports.PromCheatSheet = PromCheatSheet;
exports.PromExemplarField = PromExemplarField;
exports.PromExploreExtraField = PromExploreExtraField;
exports.PromFlavorVersions = PromFlavorVersions;
exports.PromQail = PromQail;
exports.PromQueryBuilder = PromQueryBuilder;
exports.PromQueryBuilderContainer = PromQueryBuilderContainer;
exports.PromQueryBuilderExplained = PromQueryBuilderExplained;
exports.PromQueryBuilderOptions = PromQueryBuilderOptions;
exports.PromQueryCodeEditor = PromQueryCodeEditor;
exports.PromQueryEditorByApp = PromQueryEditorByApp;
exports.PromQueryEditorForAlerting = PromQueryEditorForAlerting;
exports.PromQueryEditorSelector = PromQueryEditorSelector;
exports.PromQueryField = PromQueryField;
exports.PromQueryLegendEditor = PromQueryLegendEditor;
exports.PromSettings = PromSettings;
exports.PromVariableQueryEditor = PromVariableQueryEditor;
exports.PrometheusDatasource = PrometheusDatasource;
exports.PrometheusMetricFindQuery = PrometheusMetricFindQuery;
exports.PrometheusMetricsBrowser = PrometheusMetricsBrowser;
exports.PrometheusVariableSupport = PrometheusVariableSupport;
exports.QueryPattern = QueryPattern;
exports.QueryPatternsModal = QueryPatternsModal;
exports.QueryPreview = QueryPreview;
exports.addLabelToQuery = addLabelToQuery;
exports.docsTip = docsTip;
exports.getInitHints = getInitHints;
exports.getQueryHints = getQueryHints;
exports.overhaulStyles = overhaulStyles;
exports.parseSampleValue = parseSampleValue;
exports.promqlGrammar = promqlGrammar;
exports.sortSeriesByLabel = sortSeriesByLabel;
exports.transformDFToTable = transformDFToTable;
exports.transformV2 = transformV2;
exports.validateInput = validateInput;
//# sourceMappingURL=index.js.map
