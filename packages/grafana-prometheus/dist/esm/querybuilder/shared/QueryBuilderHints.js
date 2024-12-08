import { css } from '@emotion/css';
import React, { useState, useEffect } from 'react';
import { reportInteraction } from '@grafana/runtime';
import { useStyles2, Tooltip, Button } from '@grafana/ui';

const QueryBuilderHints = ({
  datasource,
  query: visualQuery,
  onChange,
  data,
  queryModeller,
  buildVisualQueryFromString
}) => {
  const [hints, setHints] = useState([]);
  const styles = useStyles2(getStyles);
  useEffect(() => {
    const query = { expr: queryModeller.renderQuery(visualQuery), refId: "" };
    const hints2 = datasource.getQueryHints(query, (data == null ? void 0 : data.series) || []).filter((hint) => {
      var _a;
      return (_a = hint.fix) == null ? void 0 : _a.action;
    });
    setHints(hints2);
  }, [datasource, visualQuery, data, queryModeller]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, hints.length > 0 && /* @__PURE__ */ React.createElement("div", { className: styles.container }, hints.map((hint) => {
    var _a, _b, _c, _d;
    return /* @__PURE__ */ React.createElement(Tooltip, { content: `${hint.label} ${(_a = hint.fix) == null ? void 0 : _a.label}`, key: hint.type }, /* @__PURE__ */ React.createElement(
      Button,
      {
        onClick: () => {
          var _a2;
          reportInteraction("grafana_query_builder_hints_clicked", {
            hint: hint.type,
            datasourceType: datasource.type
          });
          if ((_a2 = hint == null ? void 0 : hint.fix) == null ? void 0 : _a2.action) {
            const query = { expr: queryModeller.renderQuery(visualQuery), refId: "" };
            const newQuery = datasource.modifyQuery(query, hint.fix.action);
            const newVisualQuery = buildVisualQueryFromString(newQuery.expr);
            return onChange(newVisualQuery.query);
          }
        },
        fill: "outline",
        size: "sm",
        className: styles.hint
      },
      "hint: ",
      ((_b = hint.fix) == null ? void 0 : _b.title) || ((_d = (_c = hint.fix) == null ? void 0 : _c.action) == null ? void 0 : _d.type.toLowerCase().replace("_", " "))
    ));
  })));
};
QueryBuilderHints.displayName = "QueryBuilderHints";
const getStyles = (theme) => {
  return {
    container: css({
      display: "flex",
      alignItems: "start"
    }),
    hint: css({
      marginRight: theme.spacing(1)
    })
  };
};

export { QueryBuilderHints };
//# sourceMappingURL=QueryBuilderHints.js.map
