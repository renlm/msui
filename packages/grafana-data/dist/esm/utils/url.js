import 'lodash';
import { isDateTime } from '../datetime/moment_wrapper.js';
import '../datetime/rangeutil.js';
import '../datetime/timezones.js';
import '../datetime/formats.js';
import 'moment-timezone';
import '@grafana/schema';
import 'date-fns';

/**
 * @preserve jquery-param (c) 2015 KNOWLEDGECODE | MIT
 */
function renderUrl(path, query) {
  if (query && Object.keys(query).length > 0) {
    path += "?" + toUrlParams(query);
  }
  return path;
}
function encodeURIComponentAsAngularJS(val, pctEncodeSpaces) {
  return encodeURIComponent(val).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%3B/gi, ";").replace(/%20/g, pctEncodeSpaces ? "%20" : "+").replace(/[!'()*]/g, function(c) {
    return "%" + c.charCodeAt(0).toString(16).toUpperCase();
  });
}
function toUrlParams(a, encodeAsAngularJS = true) {
  const s = [];
  const rbracket = /\[\]$/;
  const encodingFunction = encodeAsAngularJS ? (value, pctEncodeSpaces) => encodeURIComponentAsAngularJS(value, pctEncodeSpaces) : (value, _) => encodeURIComponent(value);
  const isArray = (obj) => {
    return Object.prototype.toString.call(obj) === "[object Array]";
  };
  const add = (k, v) => {
    v = typeof v === "function" ? v() : v === null ? "" : v === void 0 ? "" : v;
    if (typeof v !== "boolean") {
      s[s.length] = encodingFunction(k, true) + "=" + encodingFunction(v, true);
    } else {
      const valueQueryPart = v ? "" : "=" + encodingFunction("false", true);
      s[s.length] = encodingFunction(k, true) + valueQueryPart;
    }
  };
  const buildParams = (prefix, obj) => {
    let i, len, key;
    if (prefix) {
      if (isArray(obj)) {
        for (i = 0, len = obj.length; i < len; i++) {
          if (rbracket.test(prefix)) {
            add(prefix, obj[i]);
          } else {
            buildParams(prefix, obj[i]);
          }
        }
      } else if (obj && String(obj) === "[object Object]") {
        for (key in obj) {
          buildParams(prefix + "[" + key + "]", obj[key]);
        }
      } else {
        add(prefix, obj);
      }
    } else if (isArray(obj)) {
      for (i = 0, len = obj.length; i < len; i++) {
        add(obj[i].name, obj[i].value);
      }
    } else {
      for (key in obj) {
        buildParams(key, obj[key]);
      }
    }
    return s;
  };
  return buildParams("", a).join("&");
}
function serializeParams(params) {
  return toUrlParams(params, false);
}
function appendQueryToUrl(url, stringToAppend) {
  if (stringToAppend !== void 0 && stringToAppend !== null && stringToAppend !== "") {
    const pos = url.indexOf("?");
    if (pos !== -1) {
      if (url.length - pos > 1) {
        url += "&";
      }
    } else {
      url += "?";
    }
    url += stringToAppend;
  }
  return url;
}
function getUrlSearchParams() {
  const search = window.location.search.substring(1);
  const searchParamsSegments = search.split("&");
  const params = {};
  for (const p of searchParamsSegments) {
    const keyValuePair = p.split("=");
    if (keyValuePair.length > 1) {
      const key = decodeURIComponent(keyValuePair[0]);
      const value = decodeURIComponent(keyValuePair[1]);
      if (key in params) {
        params[key] = [...params[key], value];
      } else {
        params[key] = [value];
      }
    } else if (keyValuePair.length === 1) {
      const key = decodeURIComponent(keyValuePair[0]);
      params[key] = true;
    }
  }
  return params;
}
function parseKeyValue(keyValue) {
  const obj = {};
  const parts = (keyValue || "").split("&");
  for (let keyValue2 of parts) {
    let splitPoint;
    let key;
    let val;
    if (keyValue2) {
      key = keyValue2 = keyValue2.replace(/\+/g, "%20");
      splitPoint = keyValue2.indexOf("=");
      if (splitPoint !== -1) {
        key = keyValue2.substring(0, splitPoint);
        val = keyValue2.substring(splitPoint + 1);
      }
      key = tryDecodeURIComponent(key);
      if (key !== void 0) {
        val = val !== void 0 ? tryDecodeURIComponent(val) : true;
        let parsedVal;
        if (typeof val === "string" && val !== "") {
          parsedVal = val === "true" || val === "false" ? val === "true" : val;
        } else {
          parsedVal = val;
        }
        if (!obj.hasOwnProperty(key)) {
          obj[key] = isNaN(parsedVal) ? val : parsedVal;
        } else if (Array.isArray(obj[key])) {
          obj[key].push(val);
        } else {
          obj[key] = [obj[key], isNaN(parsedVal) ? val : parsedVal];
        }
      }
    }
  }
  return obj;
}
function tryDecodeURIComponent(value) {
  try {
    return decodeURIComponent(value);
  } catch (e) {
    return void 0;
  }
}
const urlUtil = {
  renderUrl,
  toUrlParams,
  appendQueryToUrl,
  getUrlSearchParams,
  parseKeyValue,
  serializeParams
};
function serializeStateToUrlParam(urlState, compact) {
  if (compact !== void 0) {
    console.warn("`compact` parameter is deprecated and will be removed in a future release");
  }
  return JSON.stringify(urlState);
}
const toURLRange = (range) => {
  let from = range.from;
  if (isDateTime(from)) {
    from = from.valueOf().toString();
  }
  let to = range.to;
  if (isDateTime(to)) {
    to = to.valueOf().toString();
  }
  return {
    from,
    to
  };
};

export { parseKeyValue, serializeStateToUrlParam, toURLRange, urlUtil };
//# sourceMappingURL=url.js.map
