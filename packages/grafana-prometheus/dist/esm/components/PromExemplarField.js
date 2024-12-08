import { cx, css } from '@emotion/css';
import React, { useState, useEffect } from 'react';
import { usePrevious } from 'react-use';
import { useStyles2, InlineLabel, Tooltip, IconButton } from '@grafana/ui';

var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
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
function PromExemplarField(_a) {
  var _b = _a, { datasource, onChange, query } = _b, rest = __objRest(_b, ["datasource", "onChange", "query"]);
  const [error, setError] = useState(null);
  const styles = useStyles2(getStyles);
  const prevError = usePrevious(error);
  useEffect(() => {
    if (!datasource.exemplarsAvailable) {
      setError("Exemplars for this query are not available");
      onChange(false);
    } else if (query.instant && !query.range) {
      setError("Exemplars are not available for instant queries");
      onChange(false);
    } else {
      setError(null);
      if (prevError && !error) {
        onChange(true);
      }
    }
  }, [datasource.exemplarsAvailable, query.instant, query.range, onChange, prevError, error]);
  const iconButtonStyles = cx(
    {
      [styles.activeIcon]: !!query.exemplar
    },
    styles.eyeIcon
  );
  return /* @__PURE__ */ React.createElement(InlineLabel, { width: "auto", "data-testid": rest["data-testid"] }, /* @__PURE__ */ React.createElement(Tooltip, { content: error != null ? error : "" }, /* @__PURE__ */ React.createElement("div", { className: styles.iconWrapper }, "Exemplars", /* @__PURE__ */ React.createElement(
    IconButton,
    {
      name: "eye",
      tooltip: !!query.exemplar ? "Disable query with exemplars" : "Enable query with exemplars",
      disabled: !!error,
      className: iconButtonStyles,
      onClick: () => {
        onChange(!query.exemplar);
      }
    }
  ))));
}
function getStyles(theme) {
  return {
    eyeIcon: css({
      marginLeft: theme.spacing(2)
    }),
    activeIcon: css({
      color: theme.colors.primary.main
    }),
    iconWrapper: css({
      display: "flex",
      alignItems: "center"
    })
  };
}

export { PromExemplarField };
//# sourceMappingURL=PromExemplarField.js.map
