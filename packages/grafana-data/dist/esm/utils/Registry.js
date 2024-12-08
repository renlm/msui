import '@grafana/schema';
import '../datetime/moment_wrapper.js';
import '../types/vector.js';
import { PluginState } from '../types/plugin.js';
import '../types/datasource.js';
import 'lodash';
import '../types/legacyEvents.js';

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class Registry {
  constructor(init) {
    this.init = init;
    __publicField(this, "ordered", []);
    __publicField(this, "byId", /* @__PURE__ */ new Map());
    __publicField(this, "initialized", false);
    __publicField(this, "setInit", (init) => {
      if (this.initialized) {
        throw new Error("Registry already initialized");
      }
      this.init = init;
    });
    this.init = init;
  }
  getIfExists(id) {
    if (!this.initialized) {
      this.initialize();
    }
    if (id) {
      return this.byId.get(id);
    }
    return void 0;
  }
  initialize() {
    if (this.init) {
      for (const ext of this.init()) {
        this.register(ext);
      }
    }
    this.sort();
    this.initialized = true;
  }
  get(id) {
    const v = this.getIfExists(id);
    if (!v) {
      throw new Error(`"${id}" not found in: ${this.list().map((v2) => v2.id)}`);
    }
    return v;
  }
  selectOptions(current, filter) {
    if (!this.initialized) {
      this.initialize();
    }
    const select = {
      options: [],
      current: []
    };
    const currentOptions = {};
    if (current) {
      for (const id of current) {
        currentOptions[id] = {};
      }
    }
    for (const ext of this.ordered) {
      if (ext.excludeFromPicker) {
        continue;
      }
      if (filter && !filter(ext)) {
        continue;
      }
      const option = {
        value: ext.id,
        label: ext.name,
        description: ext.description
      };
      if (ext.state === PluginState.alpha) {
        option.label += " (alpha)";
      }
      select.options.push(option);
      if (currentOptions[ext.id]) {
        currentOptions[ext.id] = option;
      }
    }
    if (current) {
      select.current = Object.values(currentOptions);
    }
    return select;
  }
  /**
   * Return a list of values by ID, or all values if not specified
   */
  list(ids) {
    if (!this.initialized) {
      this.initialize();
    }
    if (ids) {
      const found = [];
      for (const id of ids) {
        const v = this.getIfExists(id);
        if (v) {
          found.push(v);
        }
      }
      return found;
    }
    return this.ordered;
  }
  isEmpty() {
    if (!this.initialized) {
      this.initialize();
    }
    return this.ordered.length === 0;
  }
  register(ext) {
    if (this.byId.has(ext.id)) {
      throw new Error("Duplicate Key:" + ext.id);
    }
    this.byId.set(ext.id, ext);
    this.ordered.push(ext);
    if (ext.aliasIds) {
      for (const alias of ext.aliasIds) {
        if (!this.byId.has(alias)) {
          this.byId.set(alias, ext);
        }
      }
    }
    if (this.initialized) {
      this.sort();
    }
  }
  sort() {
  }
}

export { Registry };
//# sourceMappingURL=Registry.js.map
