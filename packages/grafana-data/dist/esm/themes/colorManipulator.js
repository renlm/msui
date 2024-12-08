import tinycolor from 'tinycolor2';

function clamp(value, min = 0, max = 1) {
  if (process.env.NODE_ENV !== "production") {
    if (value < min || value > max) {
      console.error(`The value provided ${value} is out of range [${min}, ${max}].`);
    }
  }
  return Math.min(Math.max(min, value), max);
}
function hexToRgb(color) {
  color = color.slice(1);
  const re = new RegExp(`.{1,${color.length >= 6 ? 2 : 1}}`, "g");
  let result = color.match(re);
  if (!result) {
    return "";
  }
  let colors = Array.from(result);
  if (colors[0].length === 1) {
    colors = colors.map((n) => n + n);
  }
  return colors ? `rgb${colors.length === 4 ? "a" : ""}(${colors.map((n, index) => {
    return index < 3 ? parseInt(n, 16) : Math.round(parseInt(n, 16) / 255 * 1e3) / 1e3;
  }).join(", ")})` : "";
}
function intToHex(int) {
  const hex = int.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}
function rgbToHex(color) {
  if (color.indexOf("#") === 0) {
    return color;
  }
  const { values } = decomposeColor(color);
  return `#${values.map((n) => intToHex(n)).join("")}`;
}
function asHexString(color) {
  if (color[0] === "#") {
    return color;
  }
  const tColor = tinycolor(color);
  return tColor.getAlpha() === 1 ? tColor.toHexString() : tColor.toHex8String();
}
function asRgbString(color) {
  if (color.startsWith("rgb")) {
    return color;
  }
  return tinycolor(color).toRgbString();
}
function hslToRgb(color) {
  const parts = decomposeColor(color);
  const { values } = parts;
  const h = values[0];
  const s = values[1] / 100;
  const l = values[2] / 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  let type = "rgb";
  const rgb = [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
  if (parts.type === "hsla") {
    type += "a";
    rgb.push(values[3]);
  }
  return recomposeColor({ type, values: rgb });
}
function decomposeColor(color) {
  if (typeof color !== "string") {
    return color;
  }
  if (color.charAt(0) === "#") {
    return decomposeColor(hexToRgb(color));
  }
  const marker = color.indexOf("(");
  const type = color.substring(0, marker);
  if (["rgb", "rgba", "hsl", "hsla", "color"].indexOf(type) === -1) {
    throw new Error(
      `Unsupported '${color}' color. The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()`
    );
  }
  let values = color.substring(marker + 1, color.length - 1);
  let colorSpace;
  if (type === "color") {
    values = values.split(" ");
    colorSpace = values.shift();
    if (values.length === 4 && values[3].charAt(0) === "/") {
      values[3] = values[3].slice(1);
    }
    if (["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(colorSpace) === -1) {
      throw new Error(
        `Unsupported ${colorSpace} color space. The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.`
      );
    }
  } else {
    values = values.split(",");
  }
  values = values.map((value) => parseFloat(value));
  return { type, values, colorSpace };
}
function recomposeColor(color) {
  const { type, colorSpace } = color;
  let values = color.values;
  if (type.indexOf("rgb") !== -1) {
    values = values.map((n, i) => i < 3 ? parseInt(n, 10) : n);
  } else if (type.indexOf("hsl") !== -1) {
    values[1] = `${values[1]}%`;
    values[2] = `${values[2]}%`;
  }
  if (type.indexOf("color") !== -1) {
    values = `${colorSpace} ${values.join(" ")}`;
  } else {
    values = `${values.join(", ")}`;
  }
  return `${type}(${values})`;
}
function getContrastRatio(foreground, background, canvas) {
  const lumA = getLuminance(foreground);
  const lumB = getLuminance(background, canvas);
  return (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05);
}
function getLuminance(color, background) {
  const parts = decomposeColor(color);
  let rgb = parts.type === "hsl" ? decomposeColor(hslToRgb(color)).values : parts.values;
  if (background && parts.type === "rgba") {
    const backgroundParts = decomposeColor(background);
    const alpha2 = rgb[3];
    rgb[0] = rgb[0] * alpha2 + backgroundParts.values[0] * (1 - alpha2);
    rgb[1] = rgb[1] * alpha2 + backgroundParts.values[1] * (1 - alpha2);
    rgb[2] = rgb[2] * alpha2 + backgroundParts.values[2] * (1 - alpha2);
  }
  const rgbNumbers = rgb.map((val) => {
    if (parts.type !== "color") {
      val /= 255;
    }
    return val <= 0.03928 ? val / 12.92 : ((val + 0.055) / 1.055) ** 2.4;
  });
  return Number((0.2126 * rgbNumbers[0] + 0.7152 * rgbNumbers[1] + 0.0722 * rgbNumbers[2]).toFixed(3));
}
function emphasize(color, coefficient = 0.15) {
  return getLuminance(color) > 0.5 ? darken(color, coefficient) : lighten(color, coefficient);
}
function alpha(color, value) {
  if (color === "") {
    return "#000000";
  }
  value = clamp(value);
  if (color[0] === "#") {
    if (color.length === 9) {
      color = color.substring(0, 7);
    } else if (color.length <= 5) {
      let c = "#";
      for (let i = 1; i < 4; i++) {
        c += color[i] + color[i];
      }
      color = c;
    }
    return color + Math.round(value * 255).toString(16).padStart(2, "0");
  } else if (color[3] === "(") {
    return color.replace(")", `, ${value})`);
  } else if (color[4] === "(") {
    return color.substring(0, color.lastIndexOf(",")) + `, ${value})`;
  }
  const parts = decomposeColor(color);
  if (parts.type === "color") {
    parts.values[3] = `/${value}`;
  } else {
    parts.values[3] = value;
  }
  return recomposeColor(parts);
}
function darken(color, coefficient) {
  const parts = decomposeColor(color);
  coefficient = clamp(coefficient);
  if (parts.type.indexOf("hsl") !== -1) {
    parts.values[2] *= 1 - coefficient;
  } else if (parts.type.indexOf("rgb") !== -1 || parts.type.indexOf("color") !== -1) {
    for (let i = 0; i < 3; i += 1) {
      parts.values[i] *= 1 - coefficient;
    }
  }
  return recomposeColor(parts);
}
function lighten(color, coefficient) {
  const parts = decomposeColor(color);
  coefficient = clamp(coefficient);
  if (parts.type.indexOf("hsl") !== -1) {
    parts.values[2] += (100 - parts.values[2]) * coefficient;
  } else if (parts.type.indexOf("rgb") !== -1) {
    for (let i = 0; i < 3; i += 1) {
      parts.values[i] += (255 - parts.values[i]) * coefficient;
    }
  } else if (parts.type.indexOf("color") !== -1) {
    for (let i = 0; i < 3; i += 1) {
      parts.values[i] += (1 - parts.values[i]) * coefficient;
    }
  }
  return recomposeColor(parts);
}

export { alpha, asHexString, asRgbString, darken, decomposeColor, emphasize, getContrastRatio, getLuminance, hexToRgb, hslToRgb, lighten, recomposeColor, rgbToHex };
//# sourceMappingURL=colorManipulator.js.map
