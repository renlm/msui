import { textUtil } from '../text/index.js';
import { urlUtil } from './url.js';

let grafanaConfig = { appSubUrl: "" };
let getTimeRangeUrlParams;
let getVariablesUrlParams;
const maybeParseUrl = (input) => {
  try {
    return new URL(input);
  } catch (e) {
    return void 0;
  }
};
const stripBaseFromUrl = (urlOrPath) => {
  var _a;
  const parsedUrl = maybeParseUrl(urlOrPath);
  if (parsedUrl) {
    if (parsedUrl.origin !== window.location.origin) {
      return urlOrPath;
    }
  }
  const appSubUrl = (_a = grafanaConfig.appSubUrl) != null ? _a : "";
  const stripExtraChars = appSubUrl.endsWith("/") ? 1 : 0;
  const isAbsoluteUrl = urlOrPath.startsWith("http");
  let segmentToStrip = appSubUrl;
  if (!urlOrPath.startsWith("/") || isAbsoluteUrl) {
    segmentToStrip = `${window.location.origin}${appSubUrl}`;
  }
  return urlOrPath.length > 0 && (urlOrPath.indexOf(segmentToStrip + "/") === 0 || urlOrPath === segmentToStrip) ? urlOrPath.slice(segmentToStrip.length - stripExtraChars) : urlOrPath;
};
const assureBaseUrl = (url) => {
  if (url.startsWith("/")) {
    return `${grafanaConfig.appSubUrl}${stripBaseFromUrl(url)}`;
  }
  return url;
};
const getUrlForPartial = (location, searchParamsToUpdate) => {
  const searchParams = urlUtil.parseKeyValue(
    location.search.startsWith("?") ? location.search.substring(1) : location.search
  );
  for (const key in searchParamsToUpdate) {
    if (searchParamsToUpdate[key] === null || searchParamsToUpdate[key] === void 0) {
      delete searchParams[key];
    } else {
      searchParams[key] = searchParamsToUpdate[key];
    }
  }
  return assureBaseUrl(urlUtil.renderUrl(location.pathname, searchParams));
};
const updateSearchParams = (init, partial) => {
  const urlSearchParams = new URLSearchParams(partial);
  try {
    const curURL = new URL(init);
    urlSearchParams.forEach((val, key) => curURL.searchParams.set(key, val));
    return curURL.href;
  } catch (e) {
    const newSearchParams = new URLSearchParams(init);
    urlSearchParams.forEach((v, k) => {
      newSearchParams.set(k, v);
    });
    return "?" + newSearchParams.toString();
  }
};
const locationUtil = {
  /**
   *
   * @param getConfig
   * @param getAllVariableValuesForUrl
   * @param getTimeRangeForUrl
   * @internal
   */
  initialize: (dependencies) => {
    grafanaConfig = dependencies.config;
    getTimeRangeUrlParams = dependencies.getTimeRangeForUrl;
    getVariablesUrlParams = dependencies.getVariablesUrlParams;
  },
  stripBaseFromUrl,
  assureBaseUrl,
  updateSearchParams,
  getTimeRangeUrlParams: () => {
    if (!getTimeRangeUrlParams) {
      return null;
    }
    return urlUtil.toUrlParams(getTimeRangeUrlParams());
  },
  getVariablesUrlParams: (scopedVars) => {
    if (!getVariablesUrlParams) {
      return null;
    }
    const params = getVariablesUrlParams(scopedVars);
    return urlUtil.toUrlParams(params);
  },
  getUrlForPartial,
  processUrl: (url) => {
    return grafanaConfig.disableSanitizeHtml ? url : textUtil.sanitizeUrl(url);
  }
};

export { locationUtil };
//# sourceMappingURL=location.js.map
