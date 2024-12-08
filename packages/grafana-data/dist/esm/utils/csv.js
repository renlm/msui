import { defaults } from 'lodash';
import Papa from 'papaparse';
import { MutableDataFrame } from '../dataframe/MutableDataFrame.js';
import { guessFieldTypeFromValue } from '../dataframe/processDataFrame.js';
import '../vector/FunctionalVector.js';
import '../transformations/matchers.js';
import '../transformations/transformers/calculateField.js';
import '../transformations/transformers/concat.js';
import '../transformations/transformers/convertFieldType.js';
import '../transformations/transformers/ensureColumns.js';
import '../transformations/transformers/filter.js';
import '../transformations/transformers/filterByName.js';
import '../transformations/transformers/filterByRefId.js';
import '../transformations/transformers/filterByValue.js';
import '../transformations/transformers/formatString.js';
import '../transformations/transformers/formatTime.js';
import '../transformations/transformers/groupBy.js';
import '../transformations/transformers/groupToNestedTable.js';
import '../transformations/transformers/groupingToMatrix.js';
import '../transformations/transformers/histogram.js';
import '../transformations/transformers/joinByField.js';
import '../transformations/transformers/labelsToFields.js';
import '../transformations/transformers/limit.js';
import '../transformations/transformers/merge.js';
import '../transformations/transformers/noop.js';
import '../transformations/transformers/order.js';
import '../transformations/transformers/organize.js';
import '../transformations/transformers/reduce.js';
import '../transformations/transformers/rename.js';
import '../transformations/transformers/renameByRegex.js';
import '../transformations/transformers/seriesToRows.js';
import '../transformations/transformers/sortBy.js';
import '../transformations/fieldReducer.js';
import 'rxjs';
import 'rxjs/operators';
import '../transformations/standardTransformersRegistry.js';
import '../transformations/matchers/nameMatcher.js';
import { FieldType } from '../types/dataFrame.js';
import '@grafana/schema';
import '../datetime/moment_wrapper.js';
import '../types/vector.js';
import '../types/datasource.js';
import '../types/legacyEvents.js';
import '../dataframe/StreamingDataFrame.js';
import '../datetime/rangeutil.js';
import '../datetime/timezones.js';
import '../datetime/formats.js';
import 'moment-timezone';
import 'date-fns';
import { formattedValueToString } from '../valueFormats/valueFormats.js';
import '../field/fieldColor.js';
import { getFieldDisplayName } from '../field/fieldState.js';
import '../field/standardFieldConfigEditorRegistry.js';
import 'react';
import 'react-use/lib/usePrevious';
import 'tinycolor2';
import './binaryOperators.js';
import './unaryOperators.js';
import 'marked';
import 'marked-mangle';
import '../text/sanitize.js';

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
var CSVHeaderStyle = /* @__PURE__ */ ((CSVHeaderStyle2) => {
  CSVHeaderStyle2[CSVHeaderStyle2["full"] = 0] = "full";
  CSVHeaderStyle2[CSVHeaderStyle2["name"] = 1] = "name";
  CSVHeaderStyle2[CSVHeaderStyle2["none"] = 2] = "none";
  return CSVHeaderStyle2;
})(CSVHeaderStyle || {});
function readCSV(csv, options) {
  return new CSVReader(options).readCSV(csv);
}
class CSVReader {
  constructor(options) {
    __publicField(this, "config");
    __publicField(this, "callback");
    __publicField(this, "state");
    __publicField(this, "data");
    __publicField(this, "current");
    // PapaParse callback on each line
    __publicField(this, "chunk", (results, parser) => {
      for (let i = 0; i < results.data.length; i++) {
        const line = results.data[i];
        if (line.length < 1) {
          continue;
        }
        const first = line[0];
        if (first) {
          if (first.startsWith("#")) {
            const idx = first.indexOf("#", 2);
            if (idx > 0) {
              const k = first.slice(1, idx);
              const isName = "name" === k;
              const headerKeys = {
                unit: "#"
              };
              if (isName || headerKeys.hasOwnProperty(k)) {
                if (this.state === 2 /* ReadingRows */) {
                  this.current = new MutableDataFrame({ fields: [] });
                  this.data.push(this.current);
                }
                const v = first.slice(idx + 1);
                if (isName) {
                  this.current.addFieldFor(void 0, v);
                  for (let j = 1; j < line.length; j++) {
                    this.current.addFieldFor(void 0, line[j]);
                  }
                } else {
                  const { fields } = this.current;
                  for (let j = 0; j < fields.length; j++) {
                    if (!fields[j].config) {
                      fields[j].config = {};
                    }
                    const disp = fields[j].config;
                    disp[k] = j === 0 ? v : line[j];
                  }
                }
                this.state = 1 /* InHeader */;
                continue;
              }
            } else if (this.state === 0 /* Starting */) {
              this.state = 1 /* InHeader */;
              continue;
            }
            continue;
          }
          if (this.state === 0 /* Starting */) {
            const type = guessFieldTypeFromValue(first);
            if (type === FieldType.string) {
              for (const s of line) {
                this.current.addFieldFor(void 0, s);
              }
              this.state = 1 /* InHeader */;
              continue;
            }
            this.state = 1 /* InHeader */;
          }
        }
        if (this.state !== 2 /* ReadingRows */) ;
        this.state = 2 /* ReadingRows */;
        if (line.length > this.current.fields.length) {
          const { fields } = this.current;
          for (let f = fields.length; f < line.length; f++) {
            this.current.addFieldFor(line[f]);
          }
          if (this.callback) {
            this.callback.onHeader(this.current.fields);
          }
        }
        this.current.appendRow(line);
        if (this.callback) {
          this.callback.onRow(line);
        }
      }
    });
    if (!options) {
      options = {};
    }
    this.config = options.config || {};
    this.callback = options.callback;
    this.current = new MutableDataFrame({ fields: [] });
    this.state = 0 /* Starting */;
    this.data = [];
  }
  readCSV(text) {
    this.current = new MutableDataFrame({ fields: [] });
    this.data = [this.current];
    const papacfg = __spreadProps(__spreadValues({}, this.config), {
      dynamicTyping: false,
      skipEmptyLines: true,
      comments: false,
      // Keep comment lines
      chunk: this.chunk
    });
    Papa.parse(text, papacfg);
    return this.data;
  }
}
function writeValue(value, config) {
  if (value === null || value === void 0) {
    return "";
  }
  const str = value.toString();
  if (str.includes('"')) {
    return config.quoteChar + str.replace(/"/gi, '""') + config.quoteChar;
  }
  if (str.includes("\n") || config.delimiter && str.includes(config.delimiter)) {
    return config.quoteChar + str + config.quoteChar;
  }
  return str;
}
function makeFieldWriter(field, config) {
  if (field.display) {
    return (value) => {
      const displayValue = field.display(value);
      return writeValue(formattedValueToString(displayValue), config);
    };
  }
  return (value) => writeValue(value, config);
}
function getHeaderLine(key, fields, config) {
  const isName = "name" === key;
  const isType = "type" === key;
  for (const f of fields) {
    const display = f.config;
    if (isName || isType || display && display.hasOwnProperty(key)) {
      let line = "#" + key + "#";
      for (let i = 0; i < fields.length; i++) {
        if (i > 0) {
          line = line + config.delimiter;
        }
        let v = fields[i].name;
        if (isType) {
          v = fields[i].type;
        } else if (isName) ; else {
          v = fields[i].config[key];
        }
        if (v) {
          line = line + writeValue(v, config);
        }
      }
      return line + config.newline;
    }
  }
  return "";
}
function getLocaleDelimiter() {
  const arr = ["x", "y"];
  if (arr.toLocaleString) {
    return arr.toLocaleString().charAt(1);
  }
  return ",";
}
function toCSV(data, config) {
  if (!data) {
    return "";
  }
  config = defaults(config, {
    delimiter: getLocaleDelimiter(),
    newline: "\r\n",
    quoteChar: '"',
    encoding: "",
    headerStyle: 1 /* name */,
    useExcelHeader: false
  });
  let csv = config.useExcelHeader ? `sep=${config.delimiter}${config.newline}` : "";
  for (let s = 0; s < data.length; s++) {
    const series = data[s];
    const { fields } = series;
    if (fields.length === 0) {
      continue;
    }
    if (config.headerStyle === 0 /* full */) {
      csv = csv + getHeaderLine("name", fields, config) + getHeaderLine("type", fields, config) + getHeaderLine("unit", fields, config) + getHeaderLine("dateFormat", fields, config);
    } else if (config.headerStyle === 1 /* name */) {
      for (let i = 0; i < fields.length; i++) {
        if (i > 0) {
          csv += config.delimiter;
        }
        csv += `"${getFieldDisplayName(fields[i], series).replace(/"/g, '""')}"`;
      }
      csv += config.newline;
    }
    const length = fields[0].values.length;
    if (length > 0) {
      const writers = fields.map((field) => makeFieldWriter(field, config));
      for (let i = 0; i < length; i++) {
        for (let j = 0; j < fields.length; j++) {
          if (j > 0) {
            csv = csv + config.delimiter;
          }
          const v = fields[j].values[i];
          if (v !== null) {
            csv = csv + writers[j](v);
          }
        }
        if (i !== length - 1) {
          csv = csv + config.newline;
        }
      }
    }
    if (s !== data.length - 1) {
      csv = csv + config.newline;
    }
  }
  return csv;
}

export { CSVHeaderStyle, CSVReader, readCSV, toCSV };
//# sourceMappingURL=csv.js.map
