import { css } from '@emotion/css';
import React from 'react';
import { useStyles2, Card, Button } from '@grafana/ui';
import { promqlGrammar } from '../promql.js';
import { promQueryModeller } from './PromQueryModeller.js';
import { RawQuery } from './shared/RawQuery.js';

const QueryPattern = (props) => {
  const { pattern, onPatternSelect, hasNewQueryOption, hasPreviousQuery, selectedPatternName, setSelectedPatternName } = props;
  const styles = useStyles2(getStyles);
  const lang = { grammar: promqlGrammar, name: "promql" };
  return /* @__PURE__ */ React.createElement(Card, { className: styles.card }, /* @__PURE__ */ React.createElement(Card.Heading, null, pattern.name), /* @__PURE__ */ React.createElement("div", { className: styles.rawQueryContainer }, /* @__PURE__ */ React.createElement(
    RawQuery,
    {
      "aria-label": `${pattern.name} raw query`,
      query: promQueryModeller.renderQuery({
        labels: [],
        operations: pattern.operations,
        binaryQueries: pattern.binaryQueries
      }),
      lang,
      className: styles.rawQuery
    }
  )), /* @__PURE__ */ React.createElement(Card.Actions, null, selectedPatternName !== pattern.name ? /* @__PURE__ */ React.createElement(
    Button,
    {
      size: "sm",
      "aria-label": "use this query button",
      onClick: () => {
        if (hasPreviousQuery) {
          setSelectedPatternName(pattern.name);
        } else {
          onPatternSelect(pattern);
        }
      }
    },
    "Use this query"
  ) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: styles.spacing }, `If you would like to use this query, ${hasNewQueryOption ? "you can either apply this query pattern or create a new query" : "this query pattern will be applied to your current query"}.`), /* @__PURE__ */ React.createElement(Button, { size: "sm", "aria-label": "back button", fill: "outline", onClick: () => setSelectedPatternName(null) }, "Back"), /* @__PURE__ */ React.createElement(
    Button,
    {
      size: "sm",
      "aria-label": "apply query starter button",
      onClick: () => {
        onPatternSelect(pattern);
      }
    },
    "Apply query"
  ), hasNewQueryOption && /* @__PURE__ */ React.createElement(
    Button,
    {
      size: "sm",
      "aria-label": "create new query button",
      onClick: () => {
        onPatternSelect(pattern, true);
      }
    },
    "Create new query"
  ))));
};
const getStyles = (theme) => {
  return {
    card: css({
      width: "49.5%",
      display: "flex",
      flexDirection: "column"
    }),
    rawQueryContainer: css({
      flexGrow: 1
    }),
    rawQuery: css({
      backgroundColor: theme.colors.background.primary,
      padding: theme.spacing(1),
      marginTop: theme.spacing(1)
    }),
    spacing: css({
      marginBottom: theme.spacing(1)
    })
  };
};

export { QueryPattern };
//# sourceMappingURL=QueryPattern.js.map
