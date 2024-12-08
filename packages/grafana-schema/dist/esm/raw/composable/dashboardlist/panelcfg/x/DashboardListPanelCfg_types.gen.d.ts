export declare const pluginVersion = "11.1.11";
export interface Options {
    /**
     * folderId is deprecated, and migrated to folderUid on panel init
     */
    folderId?: number;
    folderUID?: string;
    includeVars: boolean;
    keepTime: boolean;
    maxItems: number;
    query: string;
    showFolderNames: boolean;
    showHeadings: boolean;
    showRecentlyViewed: boolean;
    showSearch: boolean;
    showStarred: boolean;
    tags: Array<string>;
}
export declare const defaultOptions: Partial<Options>;
