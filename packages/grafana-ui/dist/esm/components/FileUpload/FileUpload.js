import { cx, css } from '@emotion/css';
import React__default, { useState, useCallback } from 'react';
import { v4 } from 'uuid';
import { selectors } from '@grafana/e2e-selectors';
import '@grafana/data';
import { useStyles2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import { getFocusStyles } from '../../themes/mixins.js';
import '../../utils/skeleton.js';
import { trimFileName } from '../../utils/file.js';
import { getButtonStyles } from '../Button/Button.js';
import '../Button/ButtonGroup.js';
import { Icon } from '../Icon/Icon.js';

const FileUpload = ({
  onFileUpload,
  className,
  children = "Upload file",
  accept = "*",
  size = "md",
  showFileName
}) => {
  const style = useStyles2(getStyles(size));
  const [fileName, setFileName] = useState("");
  const id = v4();
  const onChange = useCallback(
    (event) => {
      var _a, _b, _c;
      const file = (_b = (_a = event.currentTarget) == null ? void 0 : _a.files) == null ? void 0 : _b[0];
      if (file) {
        setFileName((_c = file.name) != null ? _c : "");
      }
      onFileUpload(event);
    },
    [onFileUpload]
  );
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(
    "input",
    {
      type: "file",
      id,
      className: style.fileUpload,
      onChange,
      multiple: false,
      accept,
      "data-testid": selectors.components.FileUpload.inputField
    }
  ), /* @__PURE__ */ React__default.createElement("label", { htmlFor: id, className: cx(style.labelWrapper, className) }, /* @__PURE__ */ React__default.createElement(Icon, { name: "upload", className: style.icon }), children), showFileName && fileName && /* @__PURE__ */ React__default.createElement(
    "span",
    {
      "aria-label": "File name",
      className: style.fileName,
      "data-testid": selectors.components.FileUpload.fileNameSpan
    },
    trimFileName(fileName)
  ));
};
const getStyles = (size) => (theme) => {
  const buttonStyles = getButtonStyles({ theme, variant: "primary", size, iconOnly: false });
  const focusStyle = getFocusStyles(theme);
  return {
    fileUpload: css({
      height: "0.1px",
      opacity: "0",
      overflow: "hidden",
      position: "absolute",
      width: "0.1px",
      zIndex: -1,
      "&:focus + label": focusStyle,
      "&:focus-visible + label": focusStyle
    }),
    labelWrapper: buttonStyles.button,
    icon: buttonStyles.icon,
    fileName: css({
      marginLeft: theme.spacing(0.5)
    })
  };
};

export { FileUpload };
//# sourceMappingURL=FileUpload.js.map
