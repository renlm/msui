const pluginVersion = "11.1.11";
var TextMode = /* @__PURE__ */ ((TextMode2) => {
  TextMode2["Code"] = "code";
  TextMode2["HTML"] = "html";
  TextMode2["Markdown"] = "markdown";
  return TextMode2;
})(TextMode || {});
var CodeLanguage = /* @__PURE__ */ ((CodeLanguage2) => {
  CodeLanguage2["Go"] = "go";
  CodeLanguage2["Html"] = "html";
  CodeLanguage2["Json"] = "json";
  CodeLanguage2["Markdown"] = "markdown";
  CodeLanguage2["Plaintext"] = "plaintext";
  CodeLanguage2["Sql"] = "sql";
  CodeLanguage2["Typescript"] = "typescript";
  CodeLanguage2["Xml"] = "xml";
  CodeLanguage2["Yaml"] = "yaml";
  return CodeLanguage2;
})(CodeLanguage || {});
const defaultCodeLanguage = "plaintext" /* Plaintext */;
const defaultCodeOptions = {
  language: "plaintext" /* Plaintext */,
  showLineNumbers: false,
  showMiniMap: false
};
const defaultOptions = {
  content: `# Title

For markdown syntax help: [commonmark.org/help](https://commonmark.org/help/)`,
  mode: "markdown" /* Markdown */
};

export { CodeLanguage, TextMode, defaultCodeLanguage, defaultCodeOptions, defaultOptions, pluginVersion };
