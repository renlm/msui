import React__default, { useRef, useState } from 'react';
import '@grafana/data';
import { useStyles2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';
import { clearButtonStyles } from '../Button/Button.js';
import '../Button/ButtonGroup.js';

const useExpandableLabel = (initialExpanded, onExpandedChange) => {
  const ref = useRef(null);
  const buttonStyles = useStyles2(clearButtonStyles);
  const [expanded, setExpanded] = useState(initialExpanded);
  const [width, setWidth] = useState(0);
  const setExpandedWrapper = (expanded2) => {
    setExpanded(expanded2);
    if (onExpandedChange) {
      onExpandedChange(expanded2);
    }
  };
  const Label = ({ Component, onClick, disabled }) => /* @__PURE__ */ React__default.createElement(
    "button",
    {
      type: "button",
      className: buttonStyles,
      ref,
      disabled,
      onClick: () => {
        setExpandedWrapper(true);
        if (ref && ref.current) {
          setWidth(ref.current.clientWidth * 1.25);
        }
        onClick == null ? void 0 : onClick();
      }
    },
    Component
  );
  return [Label, width, expanded, setExpandedWrapper];
};

export { useExpandableLabel };
//# sourceMappingURL=useExpandableLabel.js.map
