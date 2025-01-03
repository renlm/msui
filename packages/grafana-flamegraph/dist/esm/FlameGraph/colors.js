import { scaleLinear } from 'd3';
import color from 'tinycolor2';
import { ColorSchemeDiff } from '../types.js';
import murmurhash3_32_gc from './murmur3.js';

const packageColors = [
  color({ h: 24, s: 69, l: 60 }),
  color({ h: 34, s: 65, l: 65 }),
  color({ h: 194, s: 52, l: 61 }),
  color({ h: 163, s: 45, l: 55 }),
  color({ h: 211, s: 48, l: 60 }),
  color({ h: 246, s: 40, l: 65 }),
  color({ h: 305, s: 63, l: 79 }),
  color({ h: 47, s: 100, l: 73 }),
  color({ r: 183, g: 219, b: 171 }),
  color({ r: 244, g: 213, b: 152 }),
  color({ r: 78, g: 146, b: 249 }),
  color({ r: 249, g: 186, b: 143 }),
  color({ r: 242, g: 145, b: 145 }),
  color({ r: 130, g: 181, b: 216 }),
  color({ r: 229, g: 168, b: 226 }),
  color({ r: 174, g: 162, b: 224 }),
  color({ r: 154, g: 196, b: 138 }),
  color({ r: 242, g: 201, b: 109 }),
  color({ r: 101, g: 197, b: 219 }),
  color({ r: 249, g: 147, b: 78 }),
  color({ r: 234, g: 100, b: 96 }),
  color({ r: 81, g: 149, b: 206 }),
  color({ r: 214, g: 131, b: 206 }),
  color({ r: 128, g: 110, b: 183 })
];
const byValueMinColor = getBarColorByValue(1, 100, 0, 1);
const byValueMaxColor = getBarColorByValue(100, 100, 0, 1);
const byValueGradient = `linear-gradient(90deg, ${byValueMinColor} 0%, ${byValueMaxColor} 100%)`;
const byPackageGradient = `linear-gradient(90deg, ${packageColors[0]} 0%, ${packageColors[2]} 30%, ${packageColors[6]} 50%, ${packageColors[7]} 70%, ${packageColors[8]} 100%)`;
function getBarColorByValue(value, totalTicks, rangeMin, rangeMax) {
  const intensity = Math.min(1, value / totalTicks / (rangeMax - rangeMin));
  const h = 50 - 50 * intensity;
  const l = 65 + 7 * intensity;
  return color({ h, s: 100, l });
}
function getBarColorByPackage(label, theme) {
  const packageName = getPackageName(label);
  const hash = murmurhash3_32_gc(packageName || "", 0);
  const colorIndex = hash % packageColors.length;
  let packageColor = packageColors[colorIndex].clone();
  if (theme.isLight) {
    packageColor = packageColor.brighten(15);
  }
  return packageColor;
}
const diffDefaultColors = ["rgb(0, 170, 0)", "rgb(148, 142, 142)", "rgb(200, 0, 0)"];
const diffDefaultGradient = `linear-gradient(90deg, ${diffDefaultColors[0]} 0%, ${diffDefaultColors[1]} 50%, ${diffDefaultColors[2]} 100%)`;
const diffColorBlindColors = ["rgb(26, 133, 255)", "rgb(148, 142, 142)", "rgb(220, 50, 32)"];
const diffColorBlindGradient = `linear-gradient(90deg, ${diffColorBlindColors[0]} 0%, ${diffColorBlindColors[1]} 50%, ${diffColorBlindColors[2]} 100%)`;
function getBarColorByDiff(ticks, ticksRight, totalTicks, totalTicksRight, colorScheme) {
  const range = colorScheme === ColorSchemeDiff.Default ? diffDefaultColors : diffColorBlindColors;
  const colorScale = scaleLinear().domain([-100, 0, 100]).range(range);
  const ticksLeft = ticks - ticksRight;
  const totalTicksLeft = totalTicks - totalTicksRight;
  if (totalTicksRight === 0 || totalTicksLeft === 0) {
    const rgbString2 = colorScale(0);
    return color(rgbString2);
  }
  const percentageLeft = Math.round(1e4 * ticksLeft / totalTicksLeft) / 100;
  const percentageRight = Math.round(1e4 * ticksRight / totalTicksRight) / 100;
  const diff = (percentageRight - percentageLeft) / percentageLeft * 100;
  const rgbString = colorScale(diff);
  return color(rgbString);
}
const matchers = [
  ["phpspy", new RegExp("^(?<packageName>([^\\/]*\\/)*)(?<filename>.*\\.php+)(?<line_info>.*)$")],
  ["pyspy", new RegExp("^(?<packageName>([^\\/]*\\/)*)(?<filename>.*\\.py+)(?<line_info>.*)$")],
  ["rbspy", new RegExp("^(?<packageName>([^\\/]*\\/)*)(?<filename>.*\\.rb+)(?<line_info>.*)$")],
  [
    "nodespy",
    new RegExp("^(\\.\\/node_modules\\/)?(?<packageName>[^/]*)(?<filename>.*\\.?(jsx?|tsx?)?):(?<functionName>.*):(?<line_info>.*)$")
  ],
  ["gospy", new RegExp("^(?<packageName>.*?\\/.*?\\.|.*?\\.|.+)(?<functionName>.*)$")],
  // also 'scrape'
  ["javaspy", new RegExp("^(?<packageName>.+\\/)(?<filename>.+\\.)(?<functionName>.+)$")],
  ["dotnetspy", new RegExp("^(?<packageName>.+)\\.(.+)\\.(.+)\\(.*\\)$")],
  ["tracing", new RegExp("^(?<packageName>.+?):.*$")],
  ["pyroscope-rs", new RegExp("^(?<packageName>[^::]+)")],
  ["ebpfspy", new RegExp("^(?<packageName>.+)$")],
  ["unknown", new RegExp("^(?<packageName>.+)$")]
];
function getPackageName(name) {
  var _a;
  for (const [_, matcher] of matchers) {
    const match = name.match(matcher);
    if (match) {
      return ((_a = match.groups) == null ? void 0 : _a.packageName) || "";
    }
  }
  return void 0;
}

export { byPackageGradient, byValueGradient, diffColorBlindColors, diffColorBlindGradient, diffDefaultColors, diffDefaultGradient, getBarColorByDiff, getBarColorByPackage, getBarColorByValue };
//# sourceMappingURL=colors.js.map
