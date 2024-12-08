function makeStorageService() {
  const strings = /* @__PURE__ */ new Map();
  strings.set("expandSuggestionDocs", true.toString());
  return {
    // we do not implement the on* handlers
    onDidChangeValue: (data) => void 0,
    onDidChangeTarget: (data) => void 0,
    onWillSaveState: (data) => void 0,
    get: (key, scope, fallbackValue) => {
      var _a;
      return (_a = strings.get(key)) != null ? _a : fallbackValue;
    },
    getBoolean: (key, scope, fallbackValue) => {
      const val = strings.get(key);
      if (val !== void 0) {
        return val === "true";
      } else {
        return fallbackValue;
      }
    },
    getNumber: (key, scope, fallbackValue) => {
      const val = strings.get(key);
      if (val !== void 0) {
        return parseInt(val, 10);
      } else {
        return fallbackValue;
      }
    },
    store: (key, value, scope, target) => {
      if (value === null || value === void 0) {
        strings.delete(key);
      } else {
        strings.set(key, value.toString());
      }
    },
    remove: (key, scope) => {
      strings.delete(key);
    },
    keys: (scope, target) => {
      return Array.from(strings.keys());
    },
    logStorage: () => {
      console.log("logStorage: not implemented");
    },
    migrate: () => {
      return Promise.resolve(void 0);
    },
    isNew: (scope) => {
      return true;
    },
    flush: (reason) => {
      return Promise.resolve(void 0);
    }
  };
}
let overrideServices = null;
function getOverrideServices() {
  if (overrideServices === null) {
    overrideServices = {
      storageService: makeStorageService()
    };
  }
  return overrideServices;
}

export { getOverrideServices };
//# sourceMappingURL=getOverrideServices.js.map
