/**
 * Selectors grouped/defined in Components
 *
 * @alpha
 */
export declare const Components: {
    RadioButton: {
        container: string;
    };
    Breadcrumbs: {
        breadcrumb: (title: string) => string;
    };
    TimePicker: {
        openButton: string;
        overlayContent: string;
        fromField: string;
        toField: string;
        applyTimeRange: string;
        copyTimeRange: string;
        pasteTimeRange: string;
        calendar: {
            label: string;
            openButton: string;
            closeButton: string;
        };
        absoluteTimeRangeTitle: string;
    };
    DataSourcePermissions: {
        form: () => string;
        roleType: string;
        rolePicker: string;
        permissionLevel: string;
    };
    DateTimePicker: {
        input: string;
    };
    DataSource: {
        TestData: {
            QueryTab: {
                scenarioSelectContainer: string;
                scenarioSelect: string;
                max: string;
                min: string;
                noise: string;
                seriesCount: string;
                spread: string;
                startValue: string;
                drop: string;
            };
        };
        DataSourceHttpSettings: {
            urlInput: string;
        };
        Jaeger: {
            traceIDInput: string;
        };
        Prometheus: {
            configPage: {
                connectionSettings: string;
                manageAlerts: string;
                scrapeInterval: string;
                queryTimeout: string;
                defaultEditor: string;
                disableMetricLookup: string;
                prometheusType: string;
                prometheusVersion: string;
                cacheLevel: string;
                incrementalQuerying: string;
                queryOverlapWindow: string;
                disableRecordingRules: string;
                customQueryParameters: string;
                httpMethod: string;
                exemplarsAddButton: string;
                internalLinkSwitch: string;
                codeModeMetricNamesSuggestionLimit: string;
            };
            queryEditor: {
                explain: string;
                editorToggle: string;
                options: string;
                legend: string;
                format: string;
                step: string;
                type: string;
                exemplars: string;
                builder: {
                    metricSelect: string;
                    hints: string;
                    metricsExplorer: string;
                    queryAdvisor: string;
                };
                code: {
                    queryField: string;
                    metricsCountInfo: string;
                    metricsBrowser: {
                        openButton: string;
                        selectMetric: string;
                        metricList: string;
                        labelNamesFilter: string;
                        labelValuesFilter: string;
                        useQuery: string;
                        useAsRateQuery: string;
                        validateSelector: string;
                        clear: string;
                    };
                };
            };
            exemplarMarker: string;
            variableQueryEditor: {
                queryType: string;
                labelnames: {
                    metricRegex: string;
                };
                labelValues: {
                    labelSelect: string;
                };
                metricNames: {
                    metricRegex: string;
                };
                varQueryResult: string;
                seriesQuery: string;
                classicQuery: string;
            };
            annotations: {
                minStep: string;
                title: string;
                tags: string;
                text: string;
                seriesValueAsTimestamp: string;
            };
        };
    };
    Menu: {
        MenuComponent: (title: string) => string;
        MenuGroup: (title: string) => string;
        MenuItem: (title: string) => string;
        SubMenu: {
            container: string;
            icon: string;
        };
    };
    Panels: {
        Panel: {
            title: (title: string) => string;
            content: string;
            headerItems: (item: string) => string;
            menuItems: (item: string) => string;
            menu: (title: string) => string;
            containerByTitle: (title: string) => string;
            headerCornerInfo: (mode: string) => string;
            status: (status: string) => string;
            loadingBar: () => string;
            HoverWidget: {
                container: string;
                dragIcon: string;
            };
            PanelDataErrorMessage: string;
        };
        Visualization: {
            Graph: {
                container: string;
                VisualizationTab: {
                    legendSection: string;
                };
                Legend: {
                    legendItemAlias: (name: string) => string;
                    showLegendSwitch: string;
                };
                xAxis: {
                    labels: () => string;
                };
            };
            BarGauge: {
                /**
                 * @deprecated use valueV2 from Grafana 8.3 instead
                 */
                value: string;
                valueV2: string;
            };
            PieChart: {
                svgSlice: string;
            };
            Text: {
                container: () => string;
            };
            Table: {
                header: string;
                footer: string;
                body: string;
            };
        };
    };
    VizLegend: {
        seriesName: (name: string) => string;
    };
    Drawer: {
        General: {
            title: (title: string) => string;
            expand: string;
            contract: string;
            close: string;
            rcContentWrapper: () => string;
            subtitle: string;
        };
        DashboardSaveDrawer: {
            saveButton: string;
            saveAsButton: string;
            saveAsTitleInput: string;
        };
    };
    PanelEditor: {
        General: {
            content: string;
        };
        OptionsPane: {
            content: string;
            select: string;
            fieldLabel: (type: string) => string;
            fieldInput: (title: string) => string;
        };
        DataPane: {
            content: string;
        };
        applyButton: string;
        toggleVizPicker: string;
        toggleVizOptions: string;
        toggleTableView: string;
        showZoomField: string;
        showAttributionField: string;
        showScaleField: string;
        showMeasureField: string;
        showDebugField: string;
        measureButton: string;
    };
    PanelInspector: {
        Data: {
            content: string;
        };
        Stats: {
            content: string;
        };
        Json: {
            content: string;
        };
        Query: {
            content: string;
            refreshButton: string;
            jsonObjectKeys: () => string;
        };
    };
    Tab: {
        title: (title: string) => string;
        active: () => string;
    };
    RefreshPicker: {
        /**
         * @deprecated use runButtonV2 from Grafana 8.3 instead
         */
        runButton: string;
        /**
         * @deprecated use intervalButtonV2 from Grafana 8.3 instead
         */
        intervalButton: string;
        runButtonV2: string;
        intervalButtonV2: string;
    };
    QueryTab: {
        content: string;
        queryInspectorButton: string;
        queryHistoryButton: string;
        addQuery: string;
        queryGroupTopSection: string;
        addExpression: string;
    };
    QueryHistory: {
        queryText: string;
    };
    QueryEditorRows: {
        rows: string;
    };
    QueryEditorRow: {
        actionButton: (title: string) => string;
        title: (refId: string) => string;
        container: (refId: string) => string;
    };
    AlertTab: {
        content: string;
    };
    AlertRules: {
        groupToggle: string;
        toggle: string;
        expandedContent: string;
        previewButton: string;
        ruleNameField: string;
        newFolderButton: string;
        newFolderNameField: string;
        newFolderNameCreateButton: string;
        newEvaluationGroupButton: string;
        newEvaluationGroupName: string;
        newEvaluationGroupInterval: string;
        newEvaluationGroupCreate: string;
    };
    Alert: {
        /**
         * @deprecated use alertV2 from Grafana 8.3 instead
         */
        alert: (severity: string) => string;
        alertV2: (severity: string) => string;
    };
    TransformTab: {
        content: string;
        newTransform: (name: string) => string;
        transformationEditor: (name: string) => string;
        transformationEditorDebugger: (name: string) => string;
    };
    Transforms: {
        card: (name: string) => string;
        disableTransformationButton: string;
        Reduce: {
            modeLabel: string;
            calculationsLabel: string;
        };
        SpatialOperations: {
            actionLabel: string;
            locationLabel: string;
            location: {
                autoOption: string;
                coords: {
                    option: string;
                    latitudeFieldLabel: string;
                    longitudeFieldLabel: string;
                };
                geohash: {
                    option: string;
                    geohashFieldLabel: string;
                };
                lookup: {
                    option: string;
                    lookupFieldLabel: string;
                    gazetteerFieldLabel: string;
                };
            };
        };
        searchInput: string;
        noTransformationsMessage: string;
        addTransformationButton: string;
        removeAllTransformationsButton: string;
    };
    NavBar: {
        Configuration: {
            button: string;
        };
        Toggle: {
            button: string;
        };
        Reporting: {
            button: string;
        };
    };
    NavMenu: {
        Menu: string;
        item: string;
    };
    NavToolbar: {
        container: string;
        shareDashboard: string;
        markAsFavorite: string;
        editDashboard: {
            editButton: string;
            saveButton: string;
            exitButton: string;
            settingsButton: string;
            addRowButton: string;
            addLibraryPanelButton: string;
            addVisualizationButton: string;
            pastePanelButton: string;
            discardChangesButton: string;
            discardLibraryPanelButton: string;
            unlinkLibraryPanelButton: string;
            saveLibraryPanelButton: string;
            backToDashboardButton: string;
        };
    };
    PageToolbar: {
        container: () => string;
        item: (tooltip: string) => string;
        itemButton: (title: string) => string;
    };
    QueryEditorToolbarItem: {
        button: (title: string) => string;
    };
    BackButton: {
        backArrow: string;
    };
    OptionsGroup: {
        group: (title?: string) => string;
        toggle: (title?: string) => string;
    };
    PluginVisualization: {
        item: (title: string) => string;
        current: () => string;
    };
    Select: {
        option: string;
        input: () => string;
        singleValue: () => string;
    };
    FieldConfigEditor: {
        content: string;
    };
    OverridesConfigEditor: {
        content: string;
    };
    FolderPicker: {
        /**
         * @deprecated use containerV2 from Grafana 8.3 instead
         */
        container: string;
        containerV2: string;
        input: string;
    };
    ReadonlyFolderPicker: {
        container: string;
    };
    DataSourcePicker: {
        container: string;
        /**
         * @deprecated use inputV2 instead
         */
        input: () => string;
        inputV2: string;
        dataSourceList: string;
        advancedModal: {
            dataSourceList: string;
            builtInDataSourceList: string;
        };
    };
    TimeZonePicker: {
        /**
         * @deprecated use TimeZonePicker.containerV2 from Grafana 8.3 instead
         */
        container: string;
        containerV2: string;
        changeTimeSettingsButton: string;
    };
    WeekStartPicker: {
        /**
         * @deprecated use WeekStartPicker.containerV2 from Grafana 8.3 instead
         */
        container: string;
        containerV2: string;
        placeholder: string;
    };
    TraceViewer: {
        spanBar: string;
    };
    QueryField: {
        container: string;
    };
    QueryBuilder: {
        queryPatterns: string;
        labelSelect: string;
        inputSelect: string;
        valueSelect: string;
        matchOperatorSelect: string;
    };
    ValuePicker: {
        button: (name: string) => string;
        select: (name: string) => string;
    };
    Search: {
        /**
         * @deprecated use sectionV2 from Grafana 8.3 instead
         */
        section: string;
        sectionV2: string;
        /**
         * @deprecated use itemsV2 from Grafana 8.3 instead
         */
        items: string;
        itemsV2: string;
        cards: string;
        collapseFolder: (sectionId: string) => string;
        expandFolder: (sectionId: string) => string;
        dashboardItem: (item: string) => string;
        dashboardCard: (item: string) => string;
        folderHeader: (folderName: string) => string;
        folderContent: (folderName: string) => string;
        dashboardItems: string;
    };
    DashboardLinks: {
        container: string;
        dropDown: string;
        link: string;
    };
    LoadingIndicator: {
        icon: string;
    };
    CallToActionCard: {
        /**
         * @deprecated use buttonV2 from Grafana 8.3 instead
         */
        button: (name: string) => string;
        buttonV2: (name: string) => string;
    };
    DataLinksContextMenu: {
        singleLink: string;
    };
    CodeEditor: {
        container: string;
    };
    ReactMonacoEditor: {
        editorLazy: string;
    };
    DashboardImportPage: {
        textarea: string;
        submit: string;
    };
    ImportDashboardForm: {
        name: string;
        submit: string;
    };
    PanelAlertTabContent: {
        content: string;
    };
    VisualizationPreview: {
        card: (name: string) => string;
    };
    ColorSwatch: {
        name: string;
    };
    DashboardRow: {
        title: (title: string) => string;
    };
    UserProfile: {
        profileSaveButton: string;
        preferencesSaveButton: string;
        orgsTable: string;
        sessionsTable: string;
        extensionPointTabs: string;
        extensionPointTab: (tabId: string) => string;
    };
    FileUpload: {
        inputField: string;
        fileNameSpan: string;
    };
    DebugOverlay: {
        wrapper: string;
    };
    OrgRolePicker: {
        input: string;
    };
    AnalyticsToolbarButton: {
        button: string;
    };
    Variables: {
        variableOption: string;
    };
    Annotations: {
        annotationsTypeInput: string;
        annotationsChoosePanelInput: string;
        editor: {
            testButton: string;
            resultContainer: string;
        };
    };
    Tooltip: {
        container: string;
    };
    ReturnToPrevious: {
        buttonGroup: string;
        backButton: string;
        dismissButton: string;
    };
    SQLQueryEditor: {
        selectColumn: string;
        selectAggregation: string;
        selectAlias: string;
        filterConjunction: string;
        filterField: string;
        filterOperator: string;
        headerTableSelector: string;
        headerFilterSwitch: string;
        headerGroupSwitch: string;
        headerOrderSwitch: string;
        headerPreviewSwitch: string;
    };
};
