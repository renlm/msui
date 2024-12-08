import * as H from 'history';
import { urlUtil, deprecationWarning } from '@grafana/data';
import { createLogger, attachDebugger } from '@grafana/ui';
import { config } from '../config.js';

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
class HistoryWrapper {
  constructor(history) {
    __publicField(this, "history");
    var _a;
    this.history = history || (process.env.NODE_ENV === "test" ? H.createMemoryHistory({ initialEntries: ["/"] }) : H.createBrowserHistory({ basename: (_a = config.appSubUrl) != null ? _a : "/" }));
    this.partial = this.partial.bind(this);
    this.push = this.push.bind(this);
    this.replace = this.replace.bind(this);
    this.getSearch = this.getSearch.bind(this);
    this.getHistory = this.getHistory.bind(this);
    this.getLocation = this.getLocation.bind(this);
  }
  getHistory() {
    return this.history;
  }
  getSearch() {
    return new URLSearchParams(this.history.location.search);
  }
  partial(query, replace) {
    const currentLocation = this.history.location;
    const newQuery = this.getSearchObject();
    for (const key in query) {
      if (query[key] === null || query[key] === void 0) {
        delete newQuery[key];
      } else {
        newQuery[key] = query[key];
      }
    }
    const updatedUrl = urlUtil.renderUrl(currentLocation.pathname, newQuery);
    if (replace) {
      this.history.replace(updatedUrl, this.history.location.state);
    } else {
      this.history.push(updatedUrl, this.history.location.state);
    }
  }
  push(location) {
    this.history.push(location);
  }
  replace(location) {
    this.history.replace(location);
  }
  reload() {
    var _a;
    const prevState = (_a = this.history.location.state) == null ? void 0 : _a.routeReloadCounter;
    this.history.replace(__spreadProps(__spreadValues({}, this.history.location), {
      state: { routeReloadCounter: prevState ? prevState + 1 : 1 }
    }));
  }
  getLocation() {
    return this.history.location;
  }
  getSearchObject() {
    return locationSearchToObject(this.history.location.search);
  }
  /** @deprecated use partial, push or replace instead */
  update(options) {
    deprecationWarning("LocationSrv", "update", "partial, push or replace");
    if (options.partial && options.query) {
      this.partial(options.query, options.partial);
    } else {
      const newLocation = {
        pathname: options.path
      };
      if (options.query) {
        newLocation.search = urlUtil.toUrlParams(options.query);
      }
      if (options.replace) {
        this.replace(newLocation);
      } else {
        this.push(newLocation);
      }
    }
  }
}
function locationSearchToObject(search) {
  let queryString = typeof search === "number" ? String(search) : search;
  if (queryString.length > 0) {
    if (queryString.startsWith("?")) {
      return urlUtil.parseKeyValue(queryString.substring(1));
    }
    return urlUtil.parseKeyValue(queryString);
  }
  return {};
}
let locationService = new HistoryWrapper();
const setLocationService = (location) => {
  if (process.env.NODE_ENV !== "test") {
    throw new Error("locationService can be only overriden in test environment");
  }
  locationService = location;
};
const navigationLog = createLogger("Router");
const navigationLogger = navigationLog.logger;
attachDebugger("location", locationService, navigationLog);

export { HistoryWrapper, locationSearchToObject, locationService, navigationLogger, setLocationService };
//# sourceMappingURL=LocationService.js.map
