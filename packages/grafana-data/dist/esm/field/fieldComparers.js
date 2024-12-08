import { isNumber } from 'lodash';
import { isDateTimeInput, dateTime } from '../datetime/moment_wrapper.js';
import '../datetime/rangeutil.js';
import '../datetime/timezones.js';
import '../datetime/formats.js';
import 'moment-timezone';
import '@grafana/schema';
import 'date-fns';
import { FieldType } from '../types/dataFrame.js';

const fieldIndexComparer = (field, reverse = false) => {
  const values = field.values;
  switch (field.type) {
    case FieldType.number:
      return numericIndexComparer(values, reverse);
    case FieldType.string:
      return stringIndexComparer(values, reverse);
    case FieldType.boolean:
      return booleanIndexComparer(values, reverse);
    case FieldType.time:
      if (typeof field.values[0] === "number") {
        return timestampIndexComparer(values, reverse);
      }
      return timeIndexComparer(values, reverse);
    default:
      return naturalIndexComparer(reverse);
  }
};
const timeComparer = (a, b) => {
  if (!a || !b) {
    return falsyComparer(a, b);
  }
  if (isNumber(a) && isNumber(b)) {
    return numericComparer(a, b);
  }
  if (isDateTimeInput(a) && isDateTimeInput(b)) {
    if (dateTime(a).isBefore(b)) {
      return -1;
    }
    if (dateTime(b).isBefore(a)) {
      return 1;
    }
  }
  return 0;
};
const numericComparer = (a, b) => {
  return a - b;
};
const stringComparer = (a, b) => {
  if (!a || !b) {
    return falsyComparer(a, b);
  }
  return a.localeCompare(b);
};
const booleanComparer = (a, b) => {
  return falsyComparer(a, b);
};
const falsyComparer = (a, b) => {
  if (!a && b) {
    return 1;
  }
  if (a && !b) {
    return -1;
  }
  return 0;
};
const timestampIndexComparer = (values, reverse) => {
  let mult = reverse ? -1 : 1;
  return (a, b) => mult * (values[a] - values[b]);
};
const timeIndexComparer = (values, reverse) => {
  return (a, b) => {
    const vA = values[a];
    const vB = values[b];
    return reverse ? timeComparer(vB, vA) : timeComparer(vA, vB);
  };
};
const booleanIndexComparer = (values, reverse) => {
  return (a, b) => {
    const vA = values[a];
    const vB = values[b];
    return reverse ? booleanComparer(vB, vA) : booleanComparer(vA, vB);
  };
};
const numericIndexComparer = (values, reverse) => {
  return (a, b) => {
    const vA = values[a];
    const vB = values[b];
    return reverse ? numericComparer(vB, vA) : numericComparer(vA, vB);
  };
};
const stringIndexComparer = (values, reverse) => {
  return (a, b) => {
    const vA = values[a];
    const vB = values[b];
    return reverse ? stringComparer(vB, vA) : stringComparer(vA, vB);
  };
};
const naturalIndexComparer = (reverse) => {
  return (a, b) => {
    return reverse ? numericComparer(b, a) : numericComparer(a, b);
  };
};

export { fieldIndexComparer };
//# sourceMappingURL=fieldComparers.js.map
