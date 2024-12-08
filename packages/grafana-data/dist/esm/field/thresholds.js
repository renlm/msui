import '@grafana/schema';
import '../datetime/moment_wrapper.js';
import { ThresholdsMode } from '../types/thresholds.js';
import '../types/vector.js';
import '../types/datasource.js';
import 'lodash';
import { FALLBACK_COLOR } from '../types/fieldColor.js';
import '../types/legacyEvents.js';

const fallBackThreshold = { value: 0, color: FALLBACK_COLOR };
function getActiveThreshold(value, thresholds) {
  if (!thresholds || thresholds.length === 0) {
    return fallBackThreshold;
  }
  let active = thresholds[0];
  for (const threshold of thresholds) {
    if (value >= threshold.value) {
      active = threshold;
    } else {
      break;
    }
  }
  return active;
}
function getActiveThresholdForValue(field, value, percent) {
  const { thresholds } = field.config;
  if ((thresholds == null ? void 0 : thresholds.mode) === ThresholdsMode.Percentage) {
    return getActiveThreshold(percent * 100, thresholds == null ? void 0 : thresholds.steps);
  }
  return getActiveThreshold(value, thresholds == null ? void 0 : thresholds.steps);
}
function sortThresholds(thresholds) {
  return thresholds.sort((t1, t2) => t1.value - t2.value);
}

export { fallBackThreshold, getActiveThreshold, getActiveThresholdForValue, sortThresholds };
//# sourceMappingURL=thresholds.js.map
