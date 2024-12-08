import { isString, toLower, isEmpty } from 'lodash';
import React__default, { useCallback, useMemo } from 'react';
import { getTimeZoneGroups, getTimeZoneInfo, InternalTimeZones } from '@grafana/data';
import { t } from '../../utils/i18n.js';
import { Select } from '../Select/Select.js';
import { TimeZoneGroup } from './TimeZonePicker/TimeZoneGroup.js';
import { formatUtcOffset } from './TimeZonePicker/TimeZoneOffset.js';
import { CompactTimeZoneOption, WideTimeZoneOption } from './TimeZonePicker/TimeZoneOption.js';

const TimeZonePicker = (props) => {
  const {
    onChange,
    width,
    autoFocus = false,
    onBlur,
    value,
    includeInternal = false,
    disabled = false,
    inputId,
    menuShouldPortal = true,
    openMenuOnFocus = true
  } = props;
  const groupedTimeZones = useTimeZones(includeInternal);
  const selected = useSelectedTimeZone(groupedTimeZones, value);
  const filterBySearchIndex = useFilterBySearchIndex();
  const TimeZoneOption = width && width <= 45 ? CompactTimeZoneOption : WideTimeZoneOption;
  const onChangeTz = useCallback(
    (selectable) => {
      if (!selectable || !isString(selectable.value)) {
        return onChange(value);
      }
      onChange(selectable.value);
    },
    [onChange, value]
  );
  return /* @__PURE__ */ React__default.createElement(
    Select,
    {
      inputId,
      value: selected,
      placeholder: t("time-picker.zone.select-search-input", "Type to search (country, city, abbreviation)"),
      autoFocus,
      menuShouldPortal,
      openMenuOnFocus,
      width,
      filterOption: filterBySearchIndex,
      options: groupedTimeZones,
      onChange: onChangeTz,
      onBlur,
      components: { Option: TimeZoneOption, Group: TimeZoneGroup },
      disabled,
      "aria-label": t("time-picker.zone.select-aria-label", "Time zone picker")
    }
  );
};
const useTimeZones = (includeInternal) => {
  const now = Date.now();
  const timeZoneGroups = getTimeZoneGroups(includeInternal).map((group) => {
    const options = group.zones.reduce((options2, zone) => {
      const info = getTimeZoneInfo(zone, now);
      if (!info) {
        return options2;
      }
      options2.push({
        label: info.name,
        value: info.zone,
        searchIndex: getSearchIndex(info, now)
      });
      return options2;
    }, []);
    return {
      label: group.name,
      options
    };
  });
  return timeZoneGroups;
};
const useSelectedTimeZone = (groups, timeZone) => {
  return useMemo(() => {
    if (timeZone === void 0) {
      return void 0;
    }
    const tz = toLower(timeZone);
    const group = groups.find((group2) => {
      if (!group2.label) {
        return isInternal(tz);
      }
      return tz.startsWith(toLower(group2.label));
    });
    return group == null ? void 0 : group.options.find((option) => {
      if (isEmpty(tz)) {
        return option.value === InternalTimeZones.default;
      }
      return toLower(option.value) === tz;
    });
  }, [groups, timeZone]);
};
const isInternal = (timeZone) => {
  switch (timeZone) {
    case InternalTimeZones.default:
    case InternalTimeZones.localBrowserTime:
    case InternalTimeZones.utc:
      return true;
    default:
      return false;
  }
};
const useFilterBySearchIndex = () => {
  return useCallback((option, searchQuery) => {
    if (!searchQuery || !option.data || !option.data.searchIndex) {
      return true;
    }
    return option.data.searchIndex.indexOf(toLower(searchQuery)) > -1;
  }, []);
};
const getSearchIndex = (info, timestamp) => {
  const parts = [
    toLower(info.name),
    toLower(info.abbreviation),
    toLower(formatUtcOffset(timestamp, info.zone))
  ];
  for (const country of info.countries) {
    parts.push(toLower(country.name));
    parts.push(toLower(country.code));
  }
  return parts.join("|");
};

export { TimeZonePicker };
//# sourceMappingURL=TimeZonePicker.js.map
