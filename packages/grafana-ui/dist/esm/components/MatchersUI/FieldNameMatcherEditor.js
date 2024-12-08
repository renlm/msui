import React__default, { memo, useCallback } from 'react';
import { FieldMatcherID, fieldMatchers } from '@grafana/data';
import { Select } from '../Select/Select.js';
import { useFieldDisplayNames, useSelectOptions, frameHasName } from './utils.js';

const FieldNameMatcherEditor = memo((props) => {
  const { data, options, onChange: onChangeFromProps, id } = props;
  const names = useFieldDisplayNames(data);
  const selectOptions = useSelectOptions(names, options);
  const onChange = useCallback(
    (selection) => {
      if (!frameHasName(selection.value, names)) {
        return;
      }
      return onChangeFromProps(selection.value);
    },
    [names, onChangeFromProps]
  );
  const selectedOption = selectOptions.find((v) => v.value === options);
  return /* @__PURE__ */ React__default.createElement(Select, { value: selectedOption, options: selectOptions, onChange, inputId: id });
});
FieldNameMatcherEditor.displayName = "FieldNameMatcherEditor";
const fieldNameMatcherItem = {
  id: FieldMatcherID.byName,
  component: FieldNameMatcherEditor,
  matcher: fieldMatchers.get(FieldMatcherID.byName),
  name: "Fields with name",
  description: "Set properties for a specific field",
  optionsToLabel: (options) => options
};

export { FieldNameMatcherEditor, fieldNameMatcherItem };
//# sourceMappingURL=FieldNameMatcherEditor.js.map
