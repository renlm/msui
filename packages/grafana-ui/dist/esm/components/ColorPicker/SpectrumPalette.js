import { css } from '@emotion/css';
import React__default, { useState, useMemo } from 'react';
import { RgbaStringColorPicker } from 'react-colorful';
import { useThrottleFn } from 'react-use';
import tinycolor from 'tinycolor2';
import { colorManipulator } from '@grafana/data';
import { useTheme2, useStyles2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import '../../utils/skeleton.js';
import ColorInput from './ColorInput.js';

const SpectrumPalette = ({ color, onChange }) => {
  const [currentColor, setColor] = useState(color);
  useThrottleFn(
    (c) => {
      onChange(colorManipulator.asHexString(theme.visualization.getColorByName(c)));
    },
    500,
    [currentColor]
  );
  const theme = useTheme2();
  const styles = useStyles2(getStyles);
  const rgbaString = useMemo(() => {
    return currentColor.startsWith("rgba") ? currentColor : tinycolor(theme.visualization.getColorByName(color)).toRgbString();
  }, [currentColor, theme, color]);
  return /* @__PURE__ */ React__default.createElement("div", { className: styles.wrapper }, /* @__PURE__ */ React__default.createElement(RgbaStringColorPicker, { className: styles.root, color: rgbaString, onChange: setColor }), /* @__PURE__ */ React__default.createElement(ColorInput, { theme, color: rgbaString, onChange: setColor, className: styles.colorInput }));
};
const getStyles = (theme) => ({
  wrapper: css({
    flexGrow: 1
  }),
  root: css({
    "&.react-colorful": {
      width: "auto"
    },
    ".react-colorful": {
      "&__saturation": {
        borderRadius: `${theme.shape.radius.default} ${theme.shape.radius.default} 0 0`
      },
      "&__alpha": {
        borderRadius: `0 0 ${theme.shape.radius.default} ${theme.shape.radius.default}`
      },
      "&__alpha, &__hue": {
        height: theme.spacing(2),
        position: "relative"
      },
      "&__pointer": {
        height: theme.spacing(2),
        width: theme.spacing(2)
      }
    }
  }),
  colorInput: css({
    marginTop: theme.spacing(2)
  })
});

export { SpectrumPalette as default, getStyles };
//# sourceMappingURL=SpectrumPalette.js.map