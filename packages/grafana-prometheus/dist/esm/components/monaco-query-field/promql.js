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

export { language, languageConfiguration };
//# sourceMappingURL=promql.js.map
