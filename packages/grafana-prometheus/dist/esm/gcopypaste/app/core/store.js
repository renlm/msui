class Store {
  get(key) {
    return window.localStorage[key];
  }
  set(key, value) {
    window.localStorage[key] = value;
  }
  getBool(key, def) {
    if (def !== void 0 && !this.exists(key)) {
      return def;
    }
    return window.localStorage[key] === "true";
  }
  getObject(key, def) {
    let ret = def;
    if (this.exists(key)) {
      const json = window.localStorage[key];
      try {
        ret = JSON.parse(json);
      } catch (error) {
        console.error(`Error parsing store object: ${key}. Returning default: ${def}. [${error}]`);
      }
    }
    return ret;
  }
  /* Returns true when successfully stored, throws error if not successfully stored */
  setObject(key, value) {
    let json;
    try {
      json = JSON.stringify(value);
    } catch (error) {
      throw new Error(`Could not stringify object: ${key}. [${error}]`);
    }
    try {
      this.set(key, json);
    } catch (error) {
      const errorToThrow = new Error(`Could not save item in localStorage: ${key}. [${error}]`);
      if (error instanceof Error) {
        errorToThrow.name = error.name;
      }
      throw errorToThrow;
    }
    return true;
  }
  exists(key) {
    return window.localStorage[key] !== void 0;
  }
  delete(key) {
    window.localStorage.removeItem(key);
  }
}
const store = new Store();

export { Store, store as default };
//# sourceMappingURL=store.js.map
