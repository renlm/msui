import { interpolateRgbBasis } from 'd3-interpolate';
import stringHash from 'string-hash';
import tinycolor from 'tinycolor2';
import 'lodash';
import { getContrastRatio } from '../themes/colorManipulator.js';
import '@grafana/schema';
import '../datetime/moment_wrapper.js';
import '../types/vector.js';
import '../types/datasource.js';
import { FieldColorModeId, FALLBACK_COLOR } from '../types/fieldColor.js';
import '../types/legacyEvents.js';
import '../themes/registry.js';
import '../themes/context.js';
import { reduceField } from '../transformations/fieldReducer.js';
import { Registry } from '../utils/Registry.js';
import { getScaleCalculator } from './scale.js';
import { fallBackThreshold } from './thresholds.js';

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const fieldColorModeRegistry = new Registry(() => {
  return [
    {
      id: FieldColorModeId.Fixed,
      name: "Single color",
      description: "Set a specific color",
      getCalculator: getFixedColor
    },
    {
      id: FieldColorModeId.Shades,
      name: "Shades of a color",
      description: "Select shades of a specific color",
      getCalculator: getShadedColor
    },
    {
      id: FieldColorModeId.Thresholds,
      name: "From thresholds",
      isByValue: true,
      description: "Derive colors from thresholds",
      getCalculator: (_field, theme) => {
        return (_value, _percent, threshold) => {
          const thresholdSafe = threshold != null ? threshold : fallBackThreshold;
          return theme.visualization.getColorByName(thresholdSafe.color);
        };
      }
    },
    new FieldColorSchemeMode({
      id: FieldColorModeId.PaletteClassic,
      name: "Classic palette",
      isContinuous: false,
      isByValue: false,
      getColors: (theme) => {
        return theme.visualization.palette;
      }
    }),
    new FieldColorSchemeMode({
      id: FieldColorModeId.PaletteClassicByName,
      name: "Classic palette (by series name)",
      isContinuous: false,
      isByValue: false,
      useSeriesName: true,
      getColors: (theme) => {
        return theme.visualization.palette.filter(
          (color) => getContrastRatio(
            theme.visualization.getColorByName(color),
            theme.colors.background.primary
          ) >= theme.colors.contrastThreshold
        );
      }
    }),
    new FieldColorSchemeMode({
      id: FieldColorModeId.ContinuousGrYlRd,
      name: "Green-Yellow-Red",
      isContinuous: true,
      isByValue: true,
      getColors: (theme) => ["green", "yellow", "red"]
    }),
    new FieldColorSchemeMode({
      id: FieldColorModeId.ContinuousRdYlGr,
      name: "Red-Yellow-Green",
      isContinuous: true,
      isByValue: true,
      getColors: (theme) => ["red", "yellow", "green"]
    }),
    new FieldColorSchemeMode({
      id: FieldColorModeId.ContinuousBlYlRd,
      name: "Blue-Yellow-Red",
      isContinuous: true,
      isByValue: true,
      getColors: (theme) => ["dark-blue", "super-light-yellow", "dark-red"]
    }),
    new FieldColorSchemeMode({
      id: FieldColorModeId.ContinuousYlRd,
      name: "Yellow-Red",
      isContinuous: true,
      isByValue: true,
      getColors: (theme) => ["super-light-yellow", "dark-red"]
    }),
    new FieldColorSchemeMode({
      id: FieldColorModeId.ContinuousBlPu,
      name: "Blue-Purple",
      isContinuous: true,
      isByValue: true,
      getColors: (theme) => ["blue", "purple"]
    }),
    new FieldColorSchemeMode({
      id: FieldColorModeId.ContinuousYlBl,
      name: "Yellow-Blue",
      isContinuous: true,
      isByValue: true,
      getColors: (theme) => ["super-light-yellow", "dark-blue"]
    }),
    new FieldColorSchemeMode({
      id: FieldColorModeId.ContinuousBlues,
      name: "Blues",
      isContinuous: true,
      isByValue: true,
      getColors: (theme) => ["panel-bg", "dark-blue"]
    }),
    new FieldColorSchemeMode({
      id: FieldColorModeId.ContinuousReds,
      name: "Reds",
      isContinuous: true,
      isByValue: true,
      getColors: (theme) => ["panel-bg", "dark-red"]
    }),
    new FieldColorSchemeMode({
      id: FieldColorModeId.ContinuousGreens,
      name: "Greens",
      isContinuous: true,
      isByValue: true,
      getColors: (theme) => ["panel-bg", "dark-green"]
    }),
    new FieldColorSchemeMode({
      id: FieldColorModeId.ContinuousPurples,
      name: "Purples",
      isContinuous: true,
      isByValue: true,
      getColors: (theme) => ["panel-bg", "dark-purple"]
    })
  ];
});
class FieldColorSchemeMode {
  constructor(options) {
    __publicField(this, "id");
    __publicField(this, "name");
    __publicField(this, "description");
    __publicField(this, "isContinuous");
    __publicField(this, "isByValue");
    __publicField(this, "useSeriesName");
    __publicField(this, "colorCache");
    __publicField(this, "colorCacheTheme");
    __publicField(this, "interpolator");
    __publicField(this, "getNamedColors");
    this.id = options.id;
    this.name = options.name;
    this.description = options.description;
    this.getNamedColors = options.getColors;
    this.isContinuous = options.isContinuous;
    this.isByValue = options.isByValue;
    this.useSeriesName = options.useSeriesName;
  }
  getColors(theme) {
    if (!this.getNamedColors) {
      return [];
    }
    if (this.colorCache && this.colorCacheTheme === theme) {
      return this.colorCache;
    }
    this.colorCache = this.getNamedColors(theme).map(theme.visualization.getColorByName);
    this.colorCacheTheme = theme;
    return this.colorCache;
  }
  getInterpolator() {
    if (!this.interpolator) {
      this.interpolator = interpolateRgbBasis(this.colorCache);
    }
    return this.interpolator;
  }
  getCalculator(field, theme) {
    const colors = this.getColors(theme);
    if (this.isByValue) {
      if (this.isContinuous) {
        return (_, percent, _threshold) => {
          return this.getInterpolator()(percent);
        };
      } else {
        return (_, percent, _threshold) => {
          return colors[percent * (colors.length - 1)];
        };
      }
    } else if (this.useSeriesName) {
      return (_, _percent, _threshold) => {
        return colors[Math.abs(stringHash(field.name)) % colors.length];
      };
    } else {
      return (_, _percent, _threshold) => {
        var _a, _b;
        const seriesIndex = (_b = (_a = field.state) == null ? void 0 : _a.seriesIndex) != null ? _b : 0;
        return colors[seriesIndex % colors.length];
      };
    }
  }
}
function getFieldColorModeForField(field) {
  var _a, _b;
  return fieldColorModeRegistry.get((_b = (_a = field.config.color) == null ? void 0 : _a.mode) != null ? _b : FieldColorModeId.Thresholds);
}
function getFieldColorMode(mode) {
  return fieldColorModeRegistry.get(mode != null ? mode : FieldColorModeId.Thresholds);
}
function getFieldSeriesColor(field, theme) {
  var _a, _b, _c;
  const mode = getFieldColorModeForField(field);
  if (!mode.isByValue) {
    return {
      color: mode.getCalculator(field, theme)(0, 0),
      threshold: fallBackThreshold,
      percent: 1
    };
  }
  const scale = getScaleCalculator(field, theme);
  const stat = (_b = (_a = field.config.color) == null ? void 0 : _a.seriesBy) != null ? _b : "last";
  const calcs = reduceField({ field, reducers: [stat] });
  const value = (_c = calcs[stat]) != null ? _c : 0;
  return scale(value);
}
function getFixedColor(field, theme) {
  return () => {
    var _a, _b;
    return theme.visualization.getColorByName((_b = (_a = field.config.color) == null ? void 0 : _a.fixedColor) != null ? _b : FALLBACK_COLOR);
  };
}
function getShadedColor(field, theme) {
  return () => {
    var _a, _b, _c, _d;
    const baseColorString = theme.visualization.getColorByName(
      (_b = (_a = field.config.color) == null ? void 0 : _a.fixedColor) != null ? _b : FALLBACK_COLOR
    );
    const colors = [
      baseColorString
      // start with base color
    ];
    const shadesCount = 6;
    const maxHueSpin = 10;
    const maxDarken = 35;
    const maxBrighten = 35;
    for (let i = 1; i < shadesCount; i++) {
      colors.push(
        tinycolor(baseColorString).spin(i / shadesCount * maxHueSpin).brighten(i / shadesCount * maxDarken).toHexString()
      );
      colors.push(
        tinycolor(baseColorString).spin(-(i / shadesCount) * maxHueSpin).darken(i / shadesCount * maxBrighten).toHexString()
      );
    }
    const seriesIndex = (_d = (_c = field.state) == null ? void 0 : _c.seriesIndex) != null ? _d : 0;
    return colors[seriesIndex % colors.length];
  };
}

export { FieldColorSchemeMode, fieldColorModeRegistry, getFieldColorMode, getFieldColorModeForField, getFieldSeriesColor };
//# sourceMappingURL=fieldColor.js.map
