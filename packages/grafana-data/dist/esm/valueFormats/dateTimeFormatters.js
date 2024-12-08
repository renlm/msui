import 'lodash';
import { dateTime, toUtc, toDuration as toDuration$1 } from '../datetime/moment_wrapper.js';
import '../datetime/rangeutil.js';
import '../datetime/timezones.js';
import { localTimeFormat, systemDateFormats } from '../datetime/formats.js';
import { dateTimeFormat, dateTimeFormatTimeAgo } from '../datetime/formatter.js';
import 'moment-timezone';
import '@grafana/schema';
import 'date-fns';
import { toFixed, toFixedScaled } from './valueFormats.js';

const UNITS = [
  "year" /* Year */,
  "month" /* Month */,
  "week" /* Week */,
  "day" /* Day */,
  "hour" /* Hour */,
  "minute" /* Minute */,
  "second" /* Second */,
  "millisecond" /* Millisecond */
];
const INTERVALS_IN_SECONDS = {
  ["year" /* Year */]: 31536e3,
  ["month" /* Month */]: 2592e3,
  ["week" /* Week */]: 604800,
  ["day" /* Day */]: 86400,
  ["hour" /* Hour */]: 3600,
  ["minute" /* Minute */]: 60,
  ["second" /* Second */]: 1,
  ["millisecond" /* Millisecond */]: 1e-3
};
function toNanoSeconds(size, decimals) {
  if (size === null) {
    return { text: "" };
  }
  if (Math.abs(size) < 1e3) {
    return { text: toFixed(size, decimals), suffix: " ns" };
  } else if (Math.abs(size) < 1e6) {
    return toFixedScaled(size / 1e3, decimals, " \xB5s");
  } else if (Math.abs(size) < 1e9) {
    return toFixedScaled(size / 1e6, decimals, " ms");
  } else if (Math.abs(size) < 6e10) {
    return toFixedScaled(size / 1e9, decimals, " s");
  } else if (Math.abs(size) < 36e11) {
    return toFixedScaled(size / 6e10, decimals, " min");
  } else if (Math.abs(size) < 864e11) {
    return toFixedScaled(size / 36e11, decimals, " hour");
  } else {
    return toFixedScaled(size / 864e11, decimals, " day");
  }
}
function toMicroSeconds(size, decimals) {
  if (size === null) {
    return { text: "" };
  }
  if (Math.abs(size) < 1e3) {
    return { text: toFixed(size, decimals), suffix: " \xB5s" };
  } else if (Math.abs(size) < 1e6) {
    return toFixedScaled(size / 1e3, decimals, " ms");
  } else {
    return toFixedScaled(size / 1e6, decimals, " s");
  }
}
function toMilliSeconds(size, decimals, scaledDecimals) {
  if (size === null) {
    return { text: "" };
  }
  if (Math.abs(size) < 1e3) {
    return { text: toFixed(size, decimals), suffix: " ms" };
  } else if (Math.abs(size) < 6e4) {
    return toFixedScaled(size / 1e3, decimals, " s");
  } else if (Math.abs(size) < 36e5) {
    return toFixedScaled(size / 6e4, decimals, " min");
  } else if (Math.abs(size) < 864e5) {
    return toFixedScaled(size / 36e5, decimals, " hour");
  } else if (Math.abs(size) < 31536e6) {
    return toFixedScaled(size / 864e5, decimals, " day");
  }
  return toFixedScaled(size / 31536e6, decimals, " year");
}
function toSeconds(size, decimals) {
  if (size === null) {
    return { text: "" };
  }
  if (size === 0) {
    return { text: "0", suffix: " s" };
  }
  if (Math.abs(size) < 1e-6) {
    return toFixedScaled(size * 1e9, decimals, " ns");
  }
  if (Math.abs(size) < 1e-3) {
    return toFixedScaled(size * 1e6, decimals, " \xB5s");
  }
  if (Math.abs(size) < 1) {
    return toFixedScaled(size * 1e3, decimals, " ms");
  }
  if (Math.abs(size) < 60) {
    return { text: toFixed(size, decimals), suffix: " s" };
  } else if (Math.abs(size) < 3600) {
    return toFixedScaled(size / 60, decimals, " min");
  } else if (Math.abs(size) < 86400) {
    return toFixedScaled(size / 3600, decimals, " hour");
  } else if (Math.abs(size) < 604800) {
    return toFixedScaled(size / 86400, decimals, " day");
  } else if (Math.abs(size) < 31536e3) {
    return toFixedScaled(size / 604800, decimals, " week");
  }
  return toFixedScaled(size / 31556900, decimals, " year");
}
function toMinutes(size, decimals) {
  if (size === null) {
    return { text: "" };
  }
  if (Math.abs(size) < 60) {
    return { text: toFixed(size, decimals), suffix: " min" };
  } else if (Math.abs(size) < 1440) {
    return toFixedScaled(size / 60, decimals, " hour");
  } else if (Math.abs(size) < 10080) {
    return toFixedScaled(size / 1440, decimals, " day");
  } else if (Math.abs(size) < 604800) {
    return toFixedScaled(size / 10080, decimals, " week");
  } else {
    return toFixedScaled(size / 525948, decimals, " year");
  }
}
function toHours(size, decimals) {
  if (size === null) {
    return { text: "" };
  }
  if (Math.abs(size) < 24) {
    return { text: toFixed(size, decimals), suffix: " hour" };
  } else if (Math.abs(size) < 168) {
    return toFixedScaled(size / 24, decimals, " day");
  } else if (Math.abs(size) < 8760) {
    return toFixedScaled(size / 168, decimals, " week");
  } else {
    return toFixedScaled(size / 8760, decimals, " year");
  }
}
function toDays(size, decimals) {
  if (size === null) {
    return { text: "" };
  }
  if (Math.abs(size) < 7) {
    return { text: toFixed(size, decimals), suffix: " day" };
  } else if (Math.abs(size) < 365) {
    return toFixedScaled(size / 7, decimals, " week");
  } else {
    return toFixedScaled(size / 365, decimals, " year");
  }
}
function toDuration(size, decimals, timeScale) {
  if (size === null) {
    return { text: "" };
  }
  if (size === 0) {
    return { text: "0", suffix: " " + timeScale + "s" };
  }
  if (size < 0) {
    const v = toDuration(-size, decimals, timeScale);
    if (!v.suffix) {
      v.suffix = "";
    }
    v.suffix += " ago";
    return v;
  }
  size *= INTERVALS_IN_SECONDS[timeScale] * 1e3;
  const strings = [];
  let decrementDecimals = false;
  let decimalsCount = 0;
  if (decimals !== null && decimals !== void 0) {
    decimalsCount = decimals;
  }
  for (let i = 0; i < UNITS.length && decimalsCount >= 0; i++) {
    const interval = INTERVALS_IN_SECONDS[UNITS[i]] * 1e3;
    const value = size / interval;
    if (value >= 1 || decrementDecimals) {
      decrementDecimals = true;
      const floor = Math.floor(value);
      const unit = UNITS[i] + (floor !== 1 ? "s" : "");
      strings.push(floor + " " + unit);
      size = size % interval;
      decimalsCount--;
    }
  }
  return { text: strings.join(", ") };
}
function toClock(size, decimals) {
  if (size === null) {
    return { text: "" };
  }
  if (size < 1e3) {
    return {
      text: toUtc(size).format("SSS\\m\\s")
    };
  }
  if (size < 6e4) {
    let format2 = "ss\\s:SSS\\m\\s";
    if (decimals === 0) {
      format2 = "ss\\s";
    }
    return { text: toUtc(size).format(format2) };
  }
  if (size < 36e5) {
    let format2 = "mm\\m:ss\\s:SSS\\m\\s";
    if (decimals === 0) {
      format2 = "mm\\m";
    } else if (decimals === 1) {
      format2 = "mm\\m:ss\\s";
    }
    return { text: toUtc(size).format(format2) };
  }
  let format = "mm\\m:ss\\s:SSS\\m\\s";
  const hours = `${("0" + Math.floor(toDuration$1(size, "milliseconds").asHours())).slice(-2)}h`;
  if (decimals === 0) {
    format = "";
  } else if (decimals === 1) {
    format = "mm\\m";
  } else if (decimals === 2) {
    format = "mm\\m:ss\\s";
  }
  const text = format ? `${hours}:${toUtc(size).format(format)}` : hours;
  return { text };
}
function toDurationInMilliseconds(size, decimals) {
  return toDuration(size, decimals, "millisecond" /* Millisecond */);
}
function toDurationInSeconds(size, decimals) {
  return toDuration(size, decimals, "second" /* Second */);
}
function toDurationInHoursMinutesSeconds(size) {
  if (size < 0) {
    const v = toDurationInHoursMinutesSeconds(-size);
    if (!v.suffix) {
      v.suffix = "";
    }
    v.suffix += " ago";
    return v;
  }
  const strings = [];
  const numHours = Math.floor(size / 3600);
  const numMinutes = Math.floor(size % 3600 / 60);
  const numSeconds = Math.floor(size % 3600 % 60);
  numHours > 9 ? strings.push("" + numHours) : strings.push("0" + numHours);
  numMinutes > 9 ? strings.push("" + numMinutes) : strings.push("0" + numMinutes);
  numSeconds > 9 ? strings.push("" + numSeconds) : strings.push("0" + numSeconds);
  return { text: strings.join(":") };
}
function toDurationInDaysHoursMinutesSeconds(size) {
  if (size < 0) {
    const v = toDurationInDaysHoursMinutesSeconds(-size);
    if (!v.suffix) {
      v.suffix = "";
    }
    v.suffix += " ago";
    return v;
  }
  let dayString = "";
  const numDays = Math.floor(size / (24 * 3600));
  if (numDays > 0) {
    dayString = numDays + " d ";
  }
  const hmsString = toDurationInHoursMinutesSeconds(size - numDays * 24 * 3600);
  return { text: dayString + hmsString.text };
}
function toTimeTicks(size, decimals) {
  return toSeconds(size / 100, decimals);
}
function toClockMilliseconds(size, decimals) {
  return toClock(size, decimals);
}
function toClockSeconds(size, decimals) {
  return toClock(size * 1e3, decimals);
}
function toDateTimeValueFormatter(pattern, todayPattern) {
  return (value, decimals, scaledDecimals, timeZone) => {
    if (todayPattern) {
      if (dateTime().isSame(value, "day")) {
        return {
          text: dateTimeFormat(value, { format: todayPattern, timeZone })
        };
      }
    }
    return { text: dateTimeFormat(value, { format: pattern, timeZone }) };
  };
}
const dateTimeAsIso = toDateTimeValueFormatter("YYYY-MM-DD HH:mm:ss");
const dateTimeAsIsoNoDateIfToday = toDateTimeValueFormatter("YYYY-MM-DD HH:mm:ss", "HH:mm:ss");
const dateTimeAsUS = toDateTimeValueFormatter("MM/DD/YYYY h:mm:ss a");
const dateTimeAsUSNoDateIfToday = toDateTimeValueFormatter("MM/DD/YYYY h:mm:ss a", "h:mm:ss a");
function getDateTimeAsLocalFormat() {
  return toDateTimeValueFormatter(
    localTimeFormat({
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    })
  );
}
function getDateTimeAsLocalFormatNoDateIfToday() {
  return toDateTimeValueFormatter(
    localTimeFormat({
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }),
    localTimeFormat({
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    })
  );
}
function dateTimeSystemFormatter(value, decimals, scaledDecimals, timeZone, showMs) {
  return {
    text: dateTimeFormat(value, {
      format: showMs ? systemDateFormats.fullDateMS : systemDateFormats.fullDate,
      timeZone
    })
  };
}
function dateTimeFromNow(value, decimals, scaledDecimals, timeZone) {
  return { text: dateTimeFormatTimeAgo(value, { timeZone }) };
}

export { dateTimeAsIso, dateTimeAsIsoNoDateIfToday, dateTimeAsUS, dateTimeAsUSNoDateIfToday, dateTimeFromNow, dateTimeSystemFormatter, getDateTimeAsLocalFormat, getDateTimeAsLocalFormatNoDateIfToday, toClock, toClockMilliseconds, toClockSeconds, toDateTimeValueFormatter, toDays, toDuration, toDurationInDaysHoursMinutesSeconds, toDurationInHoursMinutesSeconds, toDurationInMilliseconds, toDurationInSeconds, toHours, toMicroSeconds, toMilliSeconds, toMinutes, toNanoSeconds, toSeconds, toTimeTicks };
//# sourceMappingURL=dateTimeFormatters.js.map
