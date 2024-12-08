/**
 * Selectors grouped/defined in Pages
 *
 * @alpha
 */
export declare const Pages: {
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
