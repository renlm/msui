import { css } from '@emotion/css';
import React from 'react';
import { ConfigSubSection } from '@grafana/experimental';
import { useTheme2, Button } from '@grafana/ui';
import { overhaulStyles } from './ConfigEditor.js';
import { ExemplarSetting } from './ExemplarSetting.js';
import { selectors } from '../grafana-e2e-selectors/src/selectors/index.js';

function ExemplarsSettings({ options, onChange, disabled }) {
  const theme = useTheme2();
  const styles = overhaulStyles(theme);
  return /* @__PURE__ */ React.createElement("div", { className: styles.sectionBottomPadding }, /* @__PURE__ */ React.createElement(ConfigSubSection, { title: "Exemplars", className: styles.container }, options && options.map((option, index) => {
    return /* @__PURE__ */ React.createElement(
      ExemplarSetting,
      {
        key: index,
        value: option,
        onChange: (newField) => {
          const newOptions = [...options];
          newOptions.splice(index, 1, newField);
          onChange(newOptions);
        },
        onDelete: () => {
          const newOptions = [...options];
          newOptions.splice(index, 1);
          onChange(newOptions);
        },
        disabled
      }
    );
  }), !disabled && /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: "secondary",
      "data-testid": selectors.components.DataSource.Prometheus.configPage.exemplarsAddButton,
      className: css({
        marginBottom: "10px"
      }),
      icon: "plus",
      onClick: (event) => {
        event.preventDefault();
        const newOptions = [...options || [], { name: "traceID" }];
        onChange(newOptions);
      }
    },
    "Add"
  ), disabled && !options && /* @__PURE__ */ React.createElement("i", null, "No exemplars configurations")));
}

export { ExemplarsSettings };
//# sourceMappingURL=ExemplarsSettings.js.map
