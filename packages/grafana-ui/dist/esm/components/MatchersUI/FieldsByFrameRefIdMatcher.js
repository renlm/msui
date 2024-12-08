import React__default, { useMemo, useState, useCallback } from 'react';
import { FieldMatcherID, fieldMatchers, getFrameDisplayName } from '@grafana/data';
import { Select } from '../Select/Select.js';

const recoverRefIdMissing = (newRefIds, oldRefIds, previousValue) => {
  if (!previousValue) {
    return;
  }
  let changedTo = newRefIds.find((refId) => {
    return !oldRefIds.some((refId2) => {
      return refId === refId2;
    });
  });
  if (changedTo) {
    return changedTo;
  }
  return;
};
function RefIDPicker({ value, data, onChange, placeholder }) {
  const listOfRefIds = useMemo(() => getListOfQueryRefIds(data), [data]);
  const [priorSelectionState, updatePriorSelectionState] = useState({
    refIds: [],
    value: void 0
  });
  const currentValue = useMemo(() => {
    var _a;
    return (_a = listOfRefIds.find((refId) => refId.value === value)) != null ? _a : recoverRefIdMissing(listOfRefIds, priorSelectionState.refIds, priorSelectionState.value);
  }, [value, listOfRefIds, priorSelectionState]);
  const onFilterChange = useCallback(
    (v) => {
      onChange(v == null ? void 0 : v.value);
    },
    [onChange]
  );
  if (listOfRefIds !== priorSelectionState.refIds || (currentValue == null ? void 0 : currentValue.value) !== priorSelectionState.value) {
    updatePriorSelectionState({
      refIds: listOfRefIds,
      value: currentValue == null ? void 0 : currentValue.value
    });
  }
  return /* @__PURE__ */ React__default.createElement(
    Select,
    {
      options: listOfRefIds,
      onChange: onFilterChange,
      isClearable: true,
      placeholder: placeholder != null ? placeholder : "Select query refId",
      value: currentValue
    }
  );
}
function getListOfQueryRefIds(data) {
  var _a, _b;
  const queries = /* @__PURE__ */ new Map();
  for (const frame of data) {
    const refId = (_a = frame.refId) != null ? _a : "";
    const frames = (_b = queries.get(refId)) != null ? _b : [];
    if (frames.length === 0) {
      queries.set(refId, frames);
    }
    frames.push(frame);
  }
  const values = [];
  for (const [refId, frames] of queries.entries()) {
    values.push({
      value: refId,
      label: `Query: ${refId != null ? refId : "(missing refId)"}`,
      description: getFramesDescription(frames)
    });
  }
  return values;
}
function getFramesDescription(frames) {
  return `Frames (${frames.length}):
    ${frames.slice(0, Math.min(3, frames.length)).map((x) => getFrameDisplayName(x)).join(", ")} ${frames.length > 3 ? "..." : ""}`;
}
const fieldsByFrameRefIdItem = {
  id: FieldMatcherID.byFrameRefID,
  component: (props) => {
    return /* @__PURE__ */ React__default.createElement(RefIDPicker, { value: props.options, data: props.data, onChange: props.onChange });
  },
  matcher: fieldMatchers.get(FieldMatcherID.byFrameRefID),
  name: "Fields returned by query",
  description: "Set properties for fields from a specific query",
  optionsToLabel: (options) => options
};

export { RefIDPicker, fieldsByFrameRefIdItem };
//# sourceMappingURL=FieldsByFrameRefIdMatcher.js.map
