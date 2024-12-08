import { map } from 'rxjs/operators';
import { getFieldDisplayName } from '../../field/fieldState.js';
import { getValueMatcher } from '../matchers.js';
import { ValueMatcherID } from '../matchers/ids.js';
import { DataTransformerID } from './ids.js';
import { noopTransformer } from './noop.js';
import { transformationsVariableSupport } from './utils.js';

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
const filterByValueTransformer = {
  id: DataTransformerID.filterByValue,
  name: "Filter data by values",
  description: "select a subset of results based on values",
  defaultOptions: {
    filters: [],
    type: "include" /* include */,
    match: "any" /* any */
  },
  operator: (options, ctx) => (source) => {
    const filters = options.filters;
    const matchAll = options.match === "all" /* all */;
    const include = options.type === "include" /* include */;
    if (!Array.isArray(filters) || filters.length === 0) {
      return source.pipe(noopTransformer.operator({}, ctx));
    }
    const interpolatedFilters = [];
    if (transformationsVariableSupport()) {
      interpolatedFilters.push(
        ...filters.map((filter) => {
          if (filter.config.id === ValueMatcherID.between) {
            const interpolatedFrom = ctx.interpolate(filter.config.options.from);
            const interpolatedTo = ctx.interpolate(filter.config.options.to);
            const newFilter = __spreadProps(__spreadValues({}, filter), {
              config: __spreadProps(__spreadValues({}, filter.config), {
                options: __spreadProps(__spreadValues({}, filter.config.options), {
                  to: interpolatedTo,
                  from: interpolatedFrom
                })
              })
            });
            return newFilter;
          } else if (filter.config.id === ValueMatcherID.regex) {
            return filter;
          } else if (filter.config.options.value) {
            const interpolatedValue = ctx.interpolate(filter.config.options.value);
            const newFilter = __spreadProps(__spreadValues({}, filter), {
              config: __spreadProps(__spreadValues({}, filter.config), { options: __spreadProps(__spreadValues({}, filter.config.options), { value: interpolatedValue }) })
            });
            newFilter.config.options.value = interpolatedValue;
            return newFilter;
          }
          return filter;
        })
      );
    }
    return source.pipe(
      map((data) => {
        if (data.length === 0) {
          return data;
        }
        const processed = [];
        const fieldIndexByName = groupFieldIndexByName(data);
        for (const frame of data) {
          const rows = /* @__PURE__ */ new Set();
          let matchers;
          if (transformationsVariableSupport()) {
            matchers = createFilterValueMatchers(interpolatedFilters, fieldIndexByName);
          } else {
            matchers = createFilterValueMatchers(filters, fieldIndexByName);
          }
          for (let index = 0; index < frame.length; index++) {
            if (rows.has(index)) {
              continue;
            }
            let matching = true;
            for (const matcher of matchers) {
              const match = matcher(index, frame, data);
              if (!matchAll && match) {
                matching = true;
                break;
              }
              if (matchAll && !match) {
                matching = false;
                break;
              }
              matching = match;
            }
            if (matching) {
              rows.add(index);
            }
          }
          const fields = [];
          const frameLength = include ? rows.size : data[0].length - rows.size;
          for (const field of frame.fields) {
            const buffer = [];
            for (let index = 0; index < frame.length; index++) {
              if (include && rows.has(index)) {
                buffer.push(field.values[index]);
                continue;
              }
              if (!include && !rows.has(index)) {
                buffer.push(field.values[index]);
                continue;
              }
            }
            fields.push(__spreadProps(__spreadValues({}, field), {
              values: buffer,
              state: {}
            }));
          }
          processed.push(__spreadProps(__spreadValues({}, frame), {
            fields,
            length: frameLength
          }));
        }
        return processed;
      })
    );
  }
};
const createFilterValueMatchers = (filters, fieldIndexByName) => {
  const noop = () => false;
  return filters.map((filter) => {
    var _a;
    const fieldIndex = (_a = fieldIndexByName[filter.fieldName]) != null ? _a : -1;
    if (fieldIndex < 0) {
      console.warn(`[FilterByValue] Could not find index for field name: ${filter.fieldName}`);
      return noop;
    }
    const matcher = getValueMatcher(filter.config);
    return (index, frame, data) => matcher(index, frame.fields[fieldIndex], frame, data);
  });
};
const groupFieldIndexByName = (data) => {
  const lookup = {};
  for (const frame of data) {
    frame.fields.forEach((field, fieldIndex) => {
      const fieldName = getFieldDisplayName(field, frame, data);
      lookup[fieldName] = fieldIndex;
    });
  }
  return lookup;
};

export { filterByValueTransformer };
//# sourceMappingURL=filterByValue.js.map
