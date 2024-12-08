import React__default, { memo, useCallback } from 'react';
import { FieldMatcherID, fieldMatchers } from '@grafana/data';
import { Input } from '../Input/Input.js';

const FieldNameByRegexMatcherEditor = memo((props) => {
  const { options, onChange } = props;
  const onBlur = useCallback(
    (e) => {
      return onChange(e.target.value);
    },
    [onChange]
  );
  return /* @__PURE__ */ React__default.createElement(Input, { placeholder: "Enter regular expression", defaultValue: options, onBlur });
});
FieldNameByRegexMatcherEditor.displayName = "FieldNameByRegexMatcherEditor";
const fieldNameByRegexMatcherItem = {
  id: FieldMatcherID.byRegexp,
  component: FieldNameByRegexMatcherEditor,
  matcher: fieldMatchers.get(FieldMatcherID.byRegexp),
  name: "Fields with name matching regex",
  description: "Set properties for fields with names matching a regex",
  optionsToLabel: (options) => options
};

export { FieldNameByRegexMatcherEditor, fieldNameByRegexMatcherItem };
//# sourceMappingURL=FieldNameByRegexMatcherEditor.js.map
