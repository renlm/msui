/**
 * A string selector
 *
 * @alpha
 */
type StringSelector = string;
/**
 * A function selector with an argument
 *
 * @alpha
 */
type FunctionSelector = (id: string) => string;
/**
 * A function selector without argument
 *
 * @alpha
 */
type CssSelector = () => string;
/**
 * @alpha
 */
interface Selectors {
    [key: string]: StringSelector | FunctionSelector | CssSelector | UrlSelector | Selectors;
}
/**
 * @alpha
 */
type E2ESelectors<S extends Selectors> = {
    [P in keyof S]: S[P];
};
/**
 * @alpha
 */
interface UrlSelector extends Selectors {
    url: string | FunctionSelector;
}

/**
 * Selectors grouped/defined in Components
 *
 * @alpha
 */
declare const Components: {
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

/**
 * Selectors grouped/defined in Pages
 *
 * @alpha
 */
declare const Pages: {
    Login: {
        url: string;
        username: string;
        password: string;
        submit: string;
        skip: string;
    };
    Home: {
        url: string;
    };
    DataSource: {
        name: string;
        delete: string;
        readOnly: string;
        saveAndTest: string;
        alert: string;
    };
    DataSources: {
        url: string;
        dataSources: (dataSourceName: string) => string;
    };
    EditDataSource: {
        url: (dataSourceUid: string) => string;
        settings: string;
    };
    AddDataSource: {
        url: string;
        /** @deprecated Use dataSourcePluginsV2 */
        dataSourcePlugins: (pluginName: string) => string;
        dataSourcePluginsV2: (pluginName: string) => string;
    };
    ConfirmModal: {
        delete: string;
    };
    AddDashboard: {
        url: string;
        itemButton: (title: string) => string;
        addNewPanel: string;
        addNewRow: string;
        addNewPanelLibrary: string;
    };
    Dashboard: {
        url: (uid: string) => string;
        DashNav: {
            /**
             * @deprecated use navV2 from Grafana 8.3 instead
             */
            nav: string;
            navV2: string;
            publicDashboardTag: string;
            shareButton: string;
            scrollContainer: string;
            newShareButton: {
                container: string;
                shareLink: string;
                arrowMenu: string;
                menu: {
                    container: string;
                    shareInternally: string;
                };
            };
            playlistControls: {
                prev: string;
                stop: string;
                next: string;
            };
        };
        Controls: string;
        SubMenu: {
            submenu: string;
            submenuItem: string;
            submenuItemLabels: (item: string) => string;
            submenuItemValueDropDownValueLinkTexts: (item: string) => string;
            submenuItemValueDropDownDropDown: string;
            submenuItemValueDropDownOptionTexts: (item: string) => string;
            Annotations: {
                annotationsWrapper: string;
                annotationLabel: (label: string) => string;
                annotationToggle: (label: string) => string;
            };
        };
        Settings: {
            Actions: {
                close: string;
            };
            General: {
                deleteDashBoard: string;
                sectionItems: (item: string) => string;
                saveDashBoard: string;
                saveAsDashBoard: string;
                /**
                 * @deprecated use components.TimeZonePicker.containerV2 from Grafana 8.3 instead
                 */
                timezone: string;
                title: string;
            };
            Annotations: {
                List: {
                    /**
                     * @deprecated use addAnnotationCTAV2 from Grafana 8.3 instead
                     */
                    addAnnotationCTA: string;
                    addAnnotationCTAV2: string;
                    annotations: string;
                };
                Settings: {
                    name: string;
                };
                NewAnnotation: {
                    panelFilterSelect: string;
                    showInLabel: string;
                    previewInDashboard: string;
                    delete: string;
                    apply: string;
                    enable: string;
                    hide: string;
                };
            };
            Variables: {
                List: {
                    /**
                     * @deprecated use addVariableCTAV2 from Grafana 8.3 instead
                     */
                    addVariableCTA: string;
                    addVariableCTAV2: string;
                    newButton: string;
                    table: string;
                    tableRowNameFields: (variableName: string) => string;
                    tableRowDefinitionFields: (variableName: string) => string;
                    tableRowArrowUpButtons: (variableName: string) => string;
                    tableRowArrowDownButtons: (variableName: string) => string;
                    tableRowDuplicateButtons: (variableName: string) => string;
                    tableRowRemoveButtons: (variableName: string) => string;
                };
                Edit: {
                    General: {
                        headerLink: string;
                        modeLabelNew: string;
                        /**
                         * @deprecated
                         */
                        modeLabelEdit: string;
                        generalNameInput: string;
                        generalNameInputV2: string;
                        generalTypeSelect: string;
                        generalTypeSelectV2: string;
                        generalLabelInput: string;
                        generalLabelInputV2: string;
                        generalHideSelect: string;
                        generalHideSelectV2: string;
                        selectionOptionsMultiSwitch: string;
                        selectionOptionsIncludeAllSwitch: string;
                        selectionOptionsCustomAllInput: string;
                        previewOfValuesOption: string;
                        submitButton: string;
                        applyButton: string;
                    };
                    QueryVariable: {
                        queryOptionsDataSourceSelect: string;
                        queryOptionsRefreshSelect: string;
                        queryOptionsRefreshSelectV2: string;
                        queryOptionsRegExInput: string;
                        queryOptionsRegExInputV2: string;
                        queryOptionsSortSelect: string;
                        queryOptionsSortSelectV2: string;
                        queryOptionsQueryInput: string;
                        valueGroupsTagsEnabledSwitch: string;
                        valueGroupsTagsTagsQueryInput: string;
                        valueGroupsTagsTagsValuesQueryInput: string;
                    };
                    ConstantVariable: {
                        constantOptionsQueryInput: string;
                        constantOptionsQueryInputV2: string;
                    };
                    DatasourceVariable: {
                        datasourceSelect: string;
                    };
                    TextBoxVariable: {
                        textBoxOptionsQueryInput: string;
                        textBoxOptionsQueryInputV2: string;
                    };
                    CustomVariable: {
                        customValueInput: string;
                    };
                    IntervalVariable: {
                        intervalsValueInput: string;
                        autoEnabledCheckbox: string;
                        stepCountIntervalSelect: string;
                        minIntervalInput: string;
                    };
                    GroupByVariable: {
                        dataSourceSelect: string;
                        infoText: string;
                        modeToggle: string;
                    };
                    AdHocFiltersVariable: {
                        datasourceSelect: string;
                        infoText: string;
                        modeToggle: string;
                    };
                };
            };
        };
        Annotations: {
            marker: string;
        };
        Rows: {
            Repeated: {
                ConfigSection: {
                    warningMessage: string;
                };
            };
        };
    };
    Dashboards: {
        url: string;
        /**
         * @deprecated use components.Search.dashboardItem from Grafana 8.3 instead
         */
        dashboards: (title: string) => string;
    };
    SaveDashboardAsModal: {
        newName: string;
        save: string;
    };
    SaveDashboardModal: {
        save: string;
        saveVariables: string;
        saveTimerange: string;
        saveRefresh: string;
    };
    SharePanelModal: {
        linkToRenderedImage: string;
    };
    ShareDashboardModal: {
        PublicDashboard: {
            Tab: string;
            WillBePublicCheckbox: string;
            LimitedDSCheckbox: string;
            CostIncreaseCheckbox: string;
            PauseSwitch: string;
            EnableAnnotationsSwitch: string;
            CreateButton: string;
            DeleteButton: string;
            CopyUrlInput: string;
            CopyUrlButton: string;
            SettingsDropdown: string;
            TemplateVariablesWarningAlert: string;
            UnsupportedDataSourcesWarningAlert: string;
            NoUpsertPermissionsWarningAlert: string;
            EnableTimeRangeSwitch: string;
            EmailSharingConfiguration: {
                Container: string;
                ShareType: string;
                EmailSharingInput: string;
                EmailSharingInviteButton: string;
                EmailSharingList: string;
                DeleteEmail: string;
                ReshareLink: string;
            };
        };
        PublicDashboardScene: {
            Tab: string;
        };
        SnapshotScene: {
            url: (key: string) => string;
            Tab: string;
            PublishSnapshot: string;
            CopyUrlButton: string;
            CopyUrlInput: string;
        };
    };
    PublicDashboard: {
        page: string;
        NotAvailable: {
            container: string;
            title: string;
            pausedDescription: string;
        };
        footer: string;
    };
    PublicDashboardScene: {
        loadingPage: string;
        page: string;
        controls: string;
    };
    RequestViewAccess: {
        form: string;
        recipientInput: string;
        submitButton: string;
    };
    PublicDashboardConfirmAccess: {
        submitButton: string;
    };
    Explore: {
        url: string;
        General: {
            container: string;
            graph: string;
            table: string;
            scrollView: string;
        };
        QueryHistory: {
            container: string;
        };
    };
    SoloPanel: {
        url: (page: string) => string;
    };
    PluginsList: {
        page: string;
        list: string;
        listItem: string;
        signatureErrorNotice: string;
    };
    PluginPage: {
        page: string;
        signatureInfo: string;
        disabledInfo: string;
    };
    PlaylistForm: {
        name: string;
        interval: string;
        itemDelete: string;
    };
    BrowseDashboards: {
        table: {
            body: string;
            row: (name: string) => string;
            checkbox: (uid: string) => string;
        };
        NewFolderForm: {
            form: string;
            nameInput: string;
            createButton: string;
        };
    };
    Search: {
        url: string;
        FolderView: {
            url: string;
        };
    };
    PublicDashboards: {
        ListItem: {
            linkButton: string;
            configButton: string;
            trashcanButton: string;
            pauseSwitch: string;
        };
    };
    UserListPage: {
        tabs: {
            allUsers: string;
            orgUsers: string;
            anonUserDevices: string;
            publicDashboardsUsers: string;
            users: string;
        };
        org: {
            url: string;
        };
        admin: {
            url: string;
        };
        publicDashboards: {
            container: string;
        };
        UserListAdminPage: {
            container: string;
        };
        UsersListPage: {
            container: string;
        };
        UserAnonListPage: {
            container: string;
        };
        UsersListPublicDashboardsPage: {
            container: string;
            DashboardsListModal: {
                listItem: (uid: string) => string;
            };
        };
    };
    ProfilePage: {
        url: string;
    };
};

/**
 * Exposes selectors in package for easy use in e2e tests and in production code
 *
 * @alpha
 */
declare const selectors: {
    pages: E2ESelectors<typeof Pages>;
    components: E2ESelectors<typeof Components>;
};

export { Components, CssSelector, E2ESelectors, FunctionSelector, Pages, Selectors, StringSelector, UrlSelector, selectors };
