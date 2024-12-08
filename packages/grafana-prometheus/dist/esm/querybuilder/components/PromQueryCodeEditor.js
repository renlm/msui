import { css } from '@emotion/css';
import React from 'react';
import { useStyles2 } from '@grafana/ui';
import { PromQueryField } from '../../components/PromQueryField.js';
import { PromQueryBuilderExplained } from './PromQueryBuilderExplained.js';
import { selectors } from '../../grafana-e2e-selectors/src/selectors/index.js';

function PromQueryCodeEditor(props) {
  const { query, datasource, range, onRunQuery, onChange, data, app, showExplain } = props;
  const styles = useStyles2(getStyles);
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      "data-testid": selectors.components.DataSource.Prometheus.queryEditor.code.queryField,
      className: styles.wrapper
    },
    /* @__PURE__ */ React.createElement(
      PromQueryField,
      {
        datasource,
        query,
        range,
        onRunQuery,
        onChange,
        history: [],
        data,
        app
      }
    ),
    showExplain && /* @__PURE__ */ React.createElement(PromQueryBuilderExplained, { query: query.expr })
  );
}
const getStyles = (theme) => {
  return {
    // This wrapper styling can be removed after the old PromQueryEditor is removed.
    // This is removing margin bottom on the old legacy inline form styles
    wrapper: css({
      ".gf-form": {
        marginBottom: 0
      }
    })
  };
};

export { PromQueryCodeEditor };
//# sourceMappingURL=PromQueryCodeEditor.js.map
