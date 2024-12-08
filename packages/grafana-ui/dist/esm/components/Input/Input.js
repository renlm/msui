import { cx, css } from '@emotion/css';
import React__default from 'react';
import useMeasure from 'react-use/lib/useMeasure';
import '@grafana/data';
import { useTheme2 } from '../../themes/ThemeContext.js';
import { stylesFactory } from '../../themes/stylesFactory.js';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';
import { getFocusStyle, sharedInputStyle } from '../Forms/commonStyles.js';
import { Spinner } from '../Spinner/Spinner.js';

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const Input = React__default.forwardRef((props, ref) => {
  const _a = props, { className, addonAfter, addonBefore, prefix, suffix, invalid, loading, width = 0 } = _a, restProps = __objRest(_a, ["className", "addonAfter", "addonBefore", "prefix", "suffix", "invalid", "loading", "width"]);
  const [prefixRef, prefixRect] = useMeasure();
  const [suffixRef, suffixRect] = useMeasure();
  const theme = useTheme2();
  const styles = getInputStyles({ theme, invalid: !!invalid, width });
  return /* @__PURE__ */ React__default.createElement("div", { className: cx(styles.wrapper, className), "data-testid": "input-wrapper" }, !!addonBefore && /* @__PURE__ */ React__default.createElement("div", { className: styles.addon }, addonBefore), /* @__PURE__ */ React__default.createElement("div", { className: styles.inputWrapper }, prefix && /* @__PURE__ */ React__default.createElement("div", { className: styles.prefix, ref: prefixRef }, prefix), /* @__PURE__ */ React__default.createElement(
    "input",
    __spreadProps(__spreadValues({
      ref,
      className: styles.input
    }, restProps), {
      style: {
        paddingLeft: prefix ? prefixRect.width + 12 : void 0,
        paddingRight: suffix || loading ? suffixRect.width + 12 : void 0
      }
    })
  ), (suffix || loading) && /* @__PURE__ */ React__default.createElement("div", { className: styles.suffix, ref: suffixRef }, loading && /* @__PURE__ */ React__default.createElement(Spinner, { className: styles.loadingIndicator, inline: true }), suffix)), !!addonAfter && /* @__PURE__ */ React__default.createElement("div", { className: styles.addon }, addonAfter));
});
Input.displayName = "Input";
const getInputStyles = stylesFactory(({ theme, invalid = false, width }) => {
  const prefixSuffixStaticWidth = "28px";
  const prefixSuffix = css({
    position: "absolute",
    top: 0,
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 0,
    flexShrink: 0,
    fontSize: theme.typography.size.md,
    height: "100%",
    /* Min width specified for prefix/suffix classes used outside React component*/
    minWidth: prefixSuffixStaticWidth,
    color: theme.colors.text.secondary
  });
  return {
    // Wraps inputWrapper and addons
    wrapper: cx(
      css({
        label: "input-wrapper",
        display: "flex",
        width: width ? theme.spacing(width) : "100%",
        height: theme.spacing(theme.components.height.md),
        borderRadius: theme.shape.radius.default,
        "&:hover": {
          "> .prefix, .suffix, .input": {
            borderColor: invalid ? theme.colors.error.border : theme.colors.primary.border
          },
          // only show number buttons on hover
          "input[type='number']": {
            appearance: "textfield"
          },
          "input[type='number']::-webkit-inner-spin-button, input[type='number']::-webkit-outer-spin-button": {
            // Need type assertion here due to the use of !important
            // see https://github.com/frenic/csstype/issues/114#issuecomment-697201978
            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
            WebkitAppearance: "inner-spin-button !important",
            opacity: 1
          }
        }
      })
    ),
    // Wraps input and prefix/suffix
    inputWrapper: css({
      label: "input-inputWrapper",
      position: "relative",
      flexGrow: 1,
      /* we want input to be above addons, especially for focused state */
      zIndex: 1,
      /* when input rendered with addon before only*/
      "&:not(:first-child):last-child": {
        "> input": {
          borderLeft: "none",
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0
        }
      },
      /* when input rendered with addon after only*/
      "&:first-child:not(:last-child)": {
        "> input": {
          borderRight: "none",
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0
        }
      },
      /* when rendered with addon before and after */
      "&:not(:first-child):not(:last-child)": {
        "> input": {
          borderRight: "none",
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0
        }
      },
      input: {
        /* paddings specified for classes used outside React component */
        "&:not(:first-child)": {
          paddingLeft: prefixSuffixStaticWidth
        },
        "&:not(:last-child)": {
          paddingRight: prefixSuffixStaticWidth
        },
        "&[readonly]": {
          cursor: "default"
        }
      }
    }),
    input: cx(
      getFocusStyle(theme),
      sharedInputStyle(theme, invalid),
      css({
        label: "input-input",
        position: "relative",
        zIndex: 0,
        flexGrow: 1,
        borderRadius: theme.shape.radius.default,
        height: "100%",
        width: "100%"
      })
    ),
    inputDisabled: css({
      backgroundColor: theme.colors.action.disabledBackground,
      color: theme.colors.action.disabledText,
      border: `1px solid ${theme.colors.action.disabledBackground}`,
      "&:focus": {
        boxShadow: "none"
      }
    }),
    addon: css({
      label: "input-addon",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexGrow: 0,
      flexShrink: 0,
      position: "relative",
      "&:first-child": {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        "> :last-child": {
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0
        }
      },
      "&:last-child": {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        "> :first-child": {
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0
        }
      },
      "> *:focus": {
        /* we want anything that has focus and is an addon to be above input */
        zIndex: 2
      }
    }),
    prefix: cx(
      prefixSuffix,
      css({
        label: "input-prefix",
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(0.5),
        borderRight: "none",
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0
      })
    ),
    suffix: cx(
      prefixSuffix,
      css({
        label: "input-suffix",
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        marginBottom: "-2px",
        borderLeft: "none",
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        right: 0
      })
    ),
    loadingIndicator: css({
      "& + *": {
        marginLeft: theme.spacing(0.5)
      }
    })
  };
});

export { Input, getInputStyles };
//# sourceMappingURL=Input.js.map
