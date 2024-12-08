import { cx, css } from '@emotion/css';
import React__default, { useRef, useState, useEffect } from 'react';
import '@grafana/data';
import { useStyles2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';
import { Button } from '../Button/Button.js';
import '../Button/ButtonGroup.js';

const ConfirmButton = ({
  children,
  className,
  closeOnConfirm,
  confirmText = "Save",
  confirmVariant = "primary",
  disabled = false,
  onCancel,
  onClick,
  onConfirm,
  size = "md"
}) => {
  const mainButtonRef = useRef(null);
  const confirmButtonRef = useRef(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [shouldRestoreFocus, setShouldRestoreFocus] = useState(false);
  const styles = useStyles2(getStyles);
  useEffect(() => {
    var _a, _b;
    if (showConfirm) {
      (_a = confirmButtonRef.current) == null ? void 0 : _a.focus();
      setShouldRestoreFocus(true);
    } else {
      if (shouldRestoreFocus) {
        (_b = mainButtonRef.current) == null ? void 0 : _b.focus();
        setShouldRestoreFocus(false);
      }
    }
  }, [shouldRestoreFocus, showConfirm]);
  const onClickButton = (event) => {
    if (event) {
      event.preventDefault();
    }
    setShowConfirm(true);
    onClick == null ? void 0 : onClick();
  };
  const onClickCancel = (event) => {
    var _a;
    if (event) {
      event.preventDefault();
    }
    setShowConfirm(false);
    (_a = mainButtonRef.current) == null ? void 0 : _a.focus();
    onCancel == null ? void 0 : onCancel();
  };
  const onClickConfirm = (event) => {
    if (event) {
      event.preventDefault();
    }
    onConfirm == null ? void 0 : onConfirm();
    if (closeOnConfirm) {
      setShowConfirm(false);
    }
  };
  const buttonClass = cx(className, styles.mainButton, {
    [styles.mainButtonHide]: showConfirm
  });
  const confirmButtonClass = cx(styles.confirmButton, {
    [styles.confirmButtonHide]: !showConfirm
  });
  const confirmButtonContainerClass = cx(styles.confirmButtonContainer, {
    [styles.confirmButtonContainerHide]: !showConfirm
  });
  return /* @__PURE__ */ React__default.createElement("div", { className: styles.container }, /* @__PURE__ */ React__default.createElement("span", { className: buttonClass }, typeof children === "string" ? /* @__PURE__ */ React__default.createElement(Button, { disabled, size, fill: "text", onClick: onClickButton, ref: mainButtonRef }, children) : React__default.cloneElement(children, { disabled, onClick: onClickButton, ref: mainButtonRef })), /* @__PURE__ */ React__default.createElement("div", { className: confirmButtonContainerClass }, /* @__PURE__ */ React__default.createElement("span", { className: confirmButtonClass }, /* @__PURE__ */ React__default.createElement(Button, { size, variant: confirmVariant, onClick: onClickConfirm, ref: confirmButtonRef }, confirmText), /* @__PURE__ */ React__default.createElement(Button, { size, fill: "text", onClick: onClickCancel }, "Cancel"))));
};
ConfirmButton.displayName = "ConfirmButton";
const getStyles = (theme) => {
  return {
    container: css({
      alignItems: "center",
      display: "flex",
      justifyContent: "flex-end",
      position: "relative"
    }),
    mainButton: css({
      opacity: 1,
      [theme.transitions.handleMotion("no-preference")]: {
        transition: theme.transitions.create(["opacity"], {
          duration: theme.transitions.duration.shortest,
          easing: theme.transitions.easing.easeOut
        })
      },
      zIndex: 2
    }),
    mainButtonHide: css({
      opacity: 0,
      [theme.transitions.handleMotion("no-preference")]: {
        transition: theme.transitions.create(["opacity", "visibility"], {
          duration: theme.transitions.duration.shortest,
          easing: theme.transitions.easing.easeIn
        })
      },
      visibility: "hidden",
      zIndex: 0
    }),
    confirmButtonContainer: css({
      overflow: "visible",
      position: "absolute",
      pointerEvents: "all",
      right: 0
    }),
    confirmButtonContainerHide: css({
      overflow: "hidden",
      pointerEvents: "none"
    }),
    confirmButton: css({
      alignItems: "flex-start",
      background: theme.colors.background.primary,
      display: "flex",
      opacity: 1,
      transform: "translateX(0)",
      [theme.transitions.handleMotion("no-preference")]: {
        transition: theme.transitions.create(["opacity", "transform"], {
          duration: theme.transitions.duration.shortest,
          easing: theme.transitions.easing.easeOut
        })
      },
      zIndex: 1
    }),
    confirmButtonHide: css({
      opacity: 0,
      transform: "translateX(100%)",
      [theme.transitions.handleMotion("no-preference")]: {
        transition: theme.transitions.create(["opacity", "transform", "visibility"], {
          duration: theme.transitions.duration.shortest,
          easing: theme.transitions.easing.easeIn
        })
      },
      visibility: "hidden"
    })
  };
};

export { ConfirmButton };
//# sourceMappingURL=ConfirmButton.js.map
