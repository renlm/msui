import { cx, css } from '@emotion/css';
import React__default, { useState, useCallback } from 'react';
import { useStyles2, useTheme2 } from '../../themes/ThemeContext.js';
import { Button } from '../Button/Button.js';
import '../Button/ButtonGroup.js';
import { Input } from '../Input/Input.js';
import { TagItem } from './TagItem.js';

const TagsInput = ({
  placeholder = "New tag (enter key to add)",
  tags = [],
  onChange,
  width,
  className,
  disabled,
  addOnBlur,
  invalid,
  id
}) => {
  const [newTagName, setNewTagName] = useState("");
  const styles = useStyles2(getStyles);
  const theme = useTheme2();
  const onNameChange = useCallback((event) => {
    setNewTagName(event.target.value);
  }, []);
  const onRemove = (tagToRemove) => {
    onChange(tags.filter((x) => x !== tagToRemove));
  };
  const onAdd = (event) => {
    event == null ? void 0 : event.preventDefault();
    if (!tags.includes(newTagName)) {
      onChange(tags.concat(newTagName));
    }
    setNewTagName("");
  };
  const onBlur = () => {
    if (addOnBlur && newTagName) {
      onAdd();
    }
  };
  const onKeyboardAdd = (event) => {
    if (event.key === "Enter" && newTagName !== "") {
      onAdd(event);
    }
  };
  return /* @__PURE__ */ React__default.createElement("div", { className: cx(styles.wrapper, className, width ? css({ width: theme.spacing(width) }) : "") }, /* @__PURE__ */ React__default.createElement(
    Input,
    {
      id,
      disabled,
      placeholder,
      onChange: onNameChange,
      value: newTagName,
      onKeyDown: onKeyboardAdd,
      onBlur,
      invalid,
      suffix: /* @__PURE__ */ React__default.createElement(
        Button,
        {
          fill: "text",
          className: styles.addButtonStyle,
          onClick: onAdd,
          size: "md",
          disabled: newTagName.length <= 0
        },
        "Add"
      )
    }
  ), (tags == null ? void 0 : tags.length) > 0 && /* @__PURE__ */ React__default.createElement("ul", { className: styles.tags }, tags.map((tag) => /* @__PURE__ */ React__default.createElement(TagItem, { key: tag, name: tag, onRemove, disabled }))));
};
const getStyles = (theme) => ({
  wrapper: css({
    minHeight: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1),
    flexWrap: "wrap"
  }),
  tags: css({
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    gap: theme.spacing(0.5)
  }),
  addButtonStyle: css({
    margin: `0 -${theme.spacing(1)}`
  })
});

export { TagsInput };
//# sourceMappingURL=TagsInput.js.map
