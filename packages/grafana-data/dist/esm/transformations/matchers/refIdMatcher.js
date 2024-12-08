import { stringToJsRegex } from '../../text/string.js';
import 'marked';
import 'marked-mangle';
import '../../text/sanitize.js';
import { FrameMatcherID } from './ids.js';

const refIdMatcher = {
  id: FrameMatcherID.byRefId,
  name: "Query refId",
  description: "match the refId",
  defaultOptions: "A",
  get: (pattern) => {
    const regex = stringToJsRegex(pattern);
    return (frame) => {
      return regex.test(frame.refId || "");
    };
  },
  getOptionsDisplayText: (pattern) => {
    return `RefID: ${pattern}`;
  }
};
function getRefIdMatchers() {
  return [refIdMatcher];
}

export { getRefIdMatchers };
//# sourceMappingURL=refIdMatcher.js.map
