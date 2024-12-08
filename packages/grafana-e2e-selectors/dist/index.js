'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

exports.Components = Components;
exports.Pages = Pages;
exports.selectors = selectors;
//# sourceMappingURL=index.js.map
