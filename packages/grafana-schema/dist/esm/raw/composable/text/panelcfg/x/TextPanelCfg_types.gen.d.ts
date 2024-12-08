export declare const pluginVersion = "11.1.11";
export declare enum TextMode {
    Code = "code",
    HTML = "html",
    Markdown = "markdown"
}
export declare enum CodeLanguage {
    Go = "go",
    Html = "html",
    Json = "json",
    Markdown = "markdown",
    Plaintext = "plaintext",
    Sql = "sql",
    Typescript = "typescript",
    Xml = "xml",
    Yaml = "yaml"
}
export declare const defaultCodeLanguage: CodeLanguage;
export interface CodeOptions {
    /**
     * The language passed to monaco code editor
     */
    language: CodeLanguage;
    showLineNumbers: boolean;
    showMiniMap: boolean;
}
export declare const defaultCodeOptions: Partial<CodeOptions>;
export interface Options {
    code?: CodeOptions;
    content: string;
    mode: TextMode;
}
export declare const defaultOptions: Partial<Options>;
