import { css } from '@emotion/css';
import { capitalize } from 'lodash';
import React, { useState, useMemo } from 'react';
import { reportInteraction } from '@grafana/runtime';
import { useStyles2, Modal, Collapse, Button } from '@grafana/ui';
import { getNextRefIdChar } from '../gcopypaste/app/core/utils/query.js';
import { promQueryModeller } from './PromQueryModeller.js';
import { QueryPattern } from './QueryPattern.js';
import { buildVisualQueryFromString } from './parsing.js';
import { PromQueryPatternType } from './types.js';

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
const QueryPatternsModal = (props) => {
  const { isOpen, onClose, onChange, onAddQuery, query, queries, app } = props;
  const [openTabs, setOpenTabs] = useState([]);
  const [selectedPatternName, setSelectedPatternName] = useState(null);
  const styles = useStyles2(getStyles);
  const hasNewQueryOption = !!onAddQuery;
  const hasPreviousQuery = useMemo(() => {
    var _a;
    const visualQuery = buildVisualQueryFromString((_a = query.expr) != null ? _a : "");
    const hasOperations = visualQuery.query.operations.length > 0, hasMetric = visualQuery.query.metric, hasLabels = visualQuery.query.labels.length > 0, hasBinaryQueries = visualQuery.query.binaryQueries ? visualQuery.query.binaryQueries.length > 0 : false;
    return hasOperations || hasMetric || hasLabels || hasBinaryQueries;
  }, [query.expr]);
  const onPatternSelect = (pattern, selectAsNewQuery = false) => {
    const visualQuery = buildVisualQueryFromString(selectAsNewQuery ? "" : query.expr);
    reportInteraction("grafana_prom_kickstart_your_query_selected", {
      app: app != null ? app : "",
      editorMode: query.editorMode,
      selectedPattern: pattern.name,
      preSelectedOperationsCount: visualQuery.query.operations.length,
      preSelectedLabelsCount: visualQuery.query.labels.length,
      createNewQuery: hasNewQueryOption && selectAsNewQuery
    });
    visualQuery.query.operations = pattern.operations;
    visualQuery.query.binaryQueries = pattern.binaryQueries;
    if (hasNewQueryOption && selectAsNewQuery) {
      onAddQuery(__spreadProps(__spreadValues({}, query), {
        refId: getNextRefIdChar(queries != null ? queries : [query]),
        expr: promQueryModeller.renderQuery(visualQuery.query)
      }));
    } else {
      onChange(__spreadProps(__spreadValues({}, query), {
        expr: promQueryModeller.renderQuery(visualQuery.query)
      }));
    }
    setSelectedPatternName(null);
    onClose();
  };
  return /* @__PURE__ */ React.createElement(Modal, { "aria-label": "Kick start your query modal", isOpen, title: "Kick start your query", onDismiss: onClose }, /* @__PURE__ */ React.createElement("div", { className: styles.spacing }, "Kick start your query by selecting one of these queries. You can then continue to complete your query."), Object.values(PromQueryPatternType).map((patternType) => {
    return /* @__PURE__ */ React.createElement(
      Collapse,
      {
        "aria-label": `open and close ${patternType} query starter card`,
        key: patternType,
        label: `${capitalize(patternType)} query starters`,
        isOpen: openTabs.includes(patternType),
        collapsible: true,
        onToggle: () => setOpenTabs(
          (tabs) => (
            // close tab if it's already open, otherwise open it
            tabs.includes(patternType) ? tabs.filter((t) => t !== patternType) : [...tabs, patternType]
          )
        )
      },
      /* @__PURE__ */ React.createElement("div", { className: styles.cardsContainer }, promQueryModeller.getQueryPatterns().filter((pattern) => pattern.type === patternType).map((pattern) => /* @__PURE__ */ React.createElement(
        QueryPattern,
        {
          key: pattern.name,
          pattern,
          hasNewQueryOption,
          hasPreviousQuery,
          onPatternSelect,
          selectedPatternName,
          setSelectedPatternName
        }
      )))
    );
  }), /* @__PURE__ */ React.createElement(Button, { "aria-label": "close kick start your query modal", variant: "secondary", onClick: onClose }, "Close"));
};
const getStyles = (theme) => {
  return {
    cardsContainer: css({
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between"
    }),
    spacing: css({
      marginBottom: theme.spacing(1)
    })
  };
};

export { QueryPatternsModal };
//# sourceMappingURL=QueryPatternsModal.js.map
