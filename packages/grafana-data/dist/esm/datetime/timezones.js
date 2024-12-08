import { memoize } from 'lodash';
import moment from 'moment-timezone';
import { getTimeZone } from './common.js';

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
var InternalTimeZones = /* @__PURE__ */ ((InternalTimeZones2) => {
  InternalTimeZones2["default"] = "";
  InternalTimeZones2["localBrowserTime"] = "browser";
  InternalTimeZones2["utc"] = "utc";
  return InternalTimeZones2;
})(InternalTimeZones || {});
const timeZoneFormatUserFriendly = (timeZone) => {
  switch (getTimeZone({ timeZone })) {
    case "browser":
      return "Local browser time";
    case "utc":
      return "UTC";
    default:
      return timeZone;
  }
};
const getZone = (timeZone) => {
  return moment.tz.zone(timeZone);
};
const getTimeZoneInfo = (zone, timestamp) => {
  const internal = mapInternal(zone, timestamp);
  if (internal) {
    return internal;
  }
  return mapToInfo(zone, timestamp);
};
const getTimeZones = memoize((includeInternal = false) => {
  const initial = [];
  if (includeInternal === true) {
    initial.push("" /* default */, "browser" /* localBrowserTime */, "utc" /* utc */);
  } else if (includeInternal) {
    initial.push(...includeInternal);
  }
  return moment.tz.names().reduce((zones, zone) => {
    const countriesForZone = countriesByTimeZone[zone];
    if (!Array.isArray(countriesForZone) || countriesForZone.length === 0) {
      return zones;
    }
    zones.push(zone);
    return zones;
  }, initial);
});
const getTimeZoneGroups = memoize(
  (includeInternal = false) => {
    const timeZones = getTimeZones(includeInternal);
    const groups = timeZones.reduce((groups2, zone) => {
      var _a, _b;
      const delimiter = zone.indexOf("/");
      if (delimiter === -1) {
        const group2 = "";
        groups2[group2] = (_a = groups2[group2]) != null ? _a : [];
        groups2[group2].push(zone);
        return groups2;
      }
      const group = zone.slice(0, delimiter);
      groups2[group] = (_b = groups2[group]) != null ? _b : [];
      groups2[group].push(zone);
      return groups2;
    }, {});
    return Object.keys(groups).map((name) => ({
      name,
      zones: groups[name]
    }));
  }
);
const mapInternal = (zone, timestamp) => {
  var _a, _b, _c, _d;
  switch (zone) {
    case "utc" /* utc */: {
      return {
        name: "Coordinated Universal Time",
        ianaName: "UTC",
        zone,
        countries: [],
        abbreviation: "UTC, GMT",
        offsetInMins: 0
      };
    }
    case "" /* default */: {
      const tz = getTimeZone();
      const isInternal = tz === "browser" || tz === "utc";
      const info = isInternal ? mapInternal(tz, timestamp) : mapToInfo(tz, timestamp);
      return __spreadProps(__spreadValues({
        countries: (_a = countriesByTimeZone[tz]) != null ? _a : [],
        abbreviation: "",
        offsetInMins: 0
      }, info), {
        ianaName: (_b = info == null ? void 0 : info.ianaName) != null ? _b : "",
        name: "Default",
        zone
      });
    }
    case "browser" /* localBrowserTime */: {
      const tz = moment.tz.guess(true);
      const info = mapToInfo(tz, timestamp);
      return __spreadProps(__spreadValues({
        countries: (_c = countriesByTimeZone[tz]) != null ? _c : [],
        abbreviation: "Your local time",
        offsetInMins: (/* @__PURE__ */ new Date()).getTimezoneOffset()
      }, info), {
        name: "Browser Time",
        ianaName: (_d = info == null ? void 0 : info.ianaName) != null ? _d : "",
        zone
      });
    }
    default:
      return void 0;
  }
};
const abbrevationWithoutOffset = (abbrevation) => {
  if (/^(\+|\-).+/.test(abbrevation)) {
    return "";
  }
  return abbrevation;
};
const mapToInfo = (timeZone, timestamp) => {
  var _a;
  const momentTz = moment.tz.zone(timeZone);
  if (!momentTz) {
    return void 0;
  }
  return {
    name: timeZone,
    ianaName: momentTz.name,
    zone: timeZone,
    countries: (_a = countriesByTimeZone[timeZone]) != null ? _a : [],
    abbreviation: abbrevationWithoutOffset(momentTz.abbr(timestamp)),
    offsetInMins: momentTz.utcOffset(timestamp)
  };
};
const countryByCode = {
  AF: "Afghanistan",
  AX: "Aland Islands",
  AL: "Albania",
  DZ: "Algeria",
  AS: "American Samoa",
  AD: "Andorra",
  AO: "Angola",
  AI: "Anguilla",
  AQ: "Antarctica",
  AG: "Antigua And Barbuda",
  AR: "Argentina",
  AM: "Armenia",
  AW: "Aruba",
  AU: "Australia",
  AT: "Austria",
  AZ: "Azerbaijan",
  BS: "Bahamas",
  BH: "Bahrain",
  BD: "Bangladesh",
  BB: "Barbados",
  BY: "Belarus",
  BE: "Belgium",
  BZ: "Belize",
  BJ: "Benin",
  BM: "Bermuda",
  BT: "Bhutan",
  BO: "Bolivia",
  BA: "Bosnia And Herzegovina",
  BW: "Botswana",
  BV: "Bouvet Island",
  BR: "Brazil",
  IO: "British Indian Ocean Territory",
  BN: "Brunei Darussalam",
  BG: "Bulgaria",
  BF: "Burkina Faso",
  BI: "Burundi",
  KH: "Cambodia",
  CM: "Cameroon",
  CA: "Canada",
  CV: "Cape Verde",
  KY: "Cayman Islands",
  CF: "Central African Republic",
  TD: "Chad",
  CL: "Chile",
  CN: "China",
  CX: "Christmas Island",
  CC: "Cocos (Keeling) Islands",
  CO: "Colombia",
  KM: "Comoros",
  CG: "Congo",
  CD: "Congo, Democratic Republic",
  CK: "Cook Islands",
  CR: "Costa Rica",
  CI: "Cote D'Ivoire",
  HR: "Croatia",
  CU: "Cuba",
  CY: "Cyprus",
  CZ: "Czech Republic",
  DK: "Denmark",
  DJ: "Djibouti",
  DM: "Dominica",
  DO: "Dominican Republic",
  EC: "Ecuador",
  EG: "Egypt",
  SV: "El Salvador",
  GQ: "Equatorial Guinea",
  ER: "Eritrea",
  EE: "Estonia",
  ET: "Ethiopia",
  FK: "Falkland Islands (Malvinas)",
  FO: "Faroe Islands",
  FJ: "Fiji",
  FI: "Finland",
  FR: "France",
  GF: "French Guiana",
  PF: "French Polynesia",
  TF: "French Southern Territories",
  GA: "Gabon",
  GM: "Gambia",
  GE: "Georgia",
  DE: "Germany",
  GH: "Ghana",
  GI: "Gibraltar",
  GR: "Greece",
  GL: "Greenland",
  GD: "Grenada",
  GP: "Guadeloupe",
  GU: "Guam",
  GT: "Guatemala",
  GG: "Guernsey",
  GN: "Guinea",
  GW: "Guinea-Bissau",
  GY: "Guyana",
  HT: "Haiti",
  HM: "Heard Island & Mcdonald Islands",
  VA: "Holy See (Vatican City State)",
  HN: "Honduras",
  HK: "Hong Kong",
  HU: "Hungary",
  IS: "Iceland",
  IN: "India",
  ID: "Indonesia",
  IR: "Iran (Islamic Republic Of)",
  IQ: "Iraq",
  IE: "Ireland",
  IM: "Isle Of Man",
  IL: "Israel",
  IT: "Italy",
  JM: "Jamaica",
  JP: "Japan",
  JE: "Jersey",
  JO: "Jordan",
  KZ: "Kazakhstan",
  KE: "Kenya",
  KI: "Kiribati",
  KR: "Korea",
  KW: "Kuwait",
  KG: "Kyrgyzstan",
  LA: "Lao People's Democratic Republic",
  LV: "Latvia",
  LB: "Lebanon",
  LS: "Lesotho",
  LR: "Liberia",
  LY: "Libyan Arab Jamahiriya",
  LI: "Liechtenstein",
  LT: "Lithuania",
  LU: "Luxembourg",
  MO: "Macao",
  MK: "Macedonia",
  MG: "Madagascar",
  MW: "Malawi",
  MY: "Malaysia",
  MV: "Maldives",
  ML: "Mali",
  MT: "Malta",
  MH: "Marshall Islands",
  MQ: "Martinique",
  MR: "Mauritania",
  MU: "Mauritius",
  YT: "Mayotte",
  MX: "Mexico",
  FM: "Micronesia (Federated States Of)",
  MD: "Moldova",
  MC: "Monaco",
  MN: "Mongolia",
  ME: "Montenegro",
  MS: "Montserrat",
  MA: "Morocco",
  MZ: "Mozambique",
  MM: "Myanmar",
  NA: "Namibia",
  NR: "Nauru",
  NP: "Nepal",
  NL: "Netherlands",
  AN: "Netherlands Antilles",
  NC: "New Caledonia",
  NZ: "New Zealand",
  NI: "Nicaragua",
  NE: "Niger",
  NG: "Nigeria",
  NU: "Niue",
  NF: "Norfolk Island",
  MP: "Northern Mariana Islands",
  NO: "Norway",
  OM: "Oman",
  PK: "Pakistan",
  PW: "Palau",
  PS: "Palestine, State of",
  PA: "Panama",
  PG: "Papua New Guinea",
  PY: "Paraguay",
  PE: "Peru",
  PH: "Philippines",
  PN: "Pitcairn",
  PL: "Poland",
  PT: "Portugal",
  PR: "Puerto Rico",
  QA: "Qatar",
  RE: "Reunion",
  RO: "Romania",
  RU: "Russian Federation",
  RW: "Rwanda",
  BL: "Saint Barthelemy",
  SH: "Saint Helena",
  KN: "Saint Kitts And Nevis",
  LC: "Saint Lucia",
  MF: "Saint Martin",
  PM: "Saint Pierre And Miquelon",
  VC: "Saint Vincent And Grenadines",
  WS: "Samoa",
  SM: "San Marino",
  ST: "Sao Tome And Principe",
  SA: "Saudi Arabia",
  SN: "Senegal",
  RS: "Serbia",
  SC: "Seychelles",
  SL: "Sierra Leone",
  SG: "Singapore",
  SK: "Slovakia",
  SI: "Slovenia",
  SB: "Solomon Islands",
  SO: "Somalia",
  ZA: "South Africa",
  GS: "South Georgia And Sandwich Isl.",
  ES: "Spain",
  LK: "Sri Lanka",
  SD: "Sudan",
  SR: "Suriname",
  SJ: "Svalbard And Jan Mayen",
  SZ: "Swaziland",
  SE: "Sweden",
  CH: "Switzerland",
  SY: "Syrian Arab Republic",
  TW: "Taiwan",
  TJ: "Tajikistan",
  TZ: "Tanzania",
  TH: "Thailand",
  TL: "Timor-Leste",
  TG: "Togo",
  TK: "Tokelau",
  TO: "Tonga",
  TT: "Trinidad And Tobago",
  TN: "Tunisia",
  TR: "Turkey",
  TM: "Turkmenistan",
  TC: "Turks And Caicos Islands",
  TV: "Tuvalu",
  UG: "Uganda",
  UA: "Ukraine",
  AE: "United Arab Emirates",
  GB: "United Kingdom",
  US: "United States",
  UM: "United States Outlying Islands",
  UY: "Uruguay",
  UZ: "Uzbekistan",
  VU: "Vanuatu",
  VE: "Venezuela",
  VN: "Viet Nam",
  VG: "Virgin Islands, British",
  VI: "Virgin Islands, U.S.",
  WF: "Wallis And Futuna",
  EH: "Western Sahara",
  YE: "Yemen",
  ZM: "Zambia",
  ZW: "Zimbabwe"
};
const countriesByTimeZone = (() => {
  return moment.tz.countries().reduce((all, code) => {
    const timeZones = moment.tz.zonesForCountry(code);
    return timeZones.reduce((all2, timeZone) => {
      if (!all2[timeZone]) {
        all2[timeZone] = [];
      }
      const name = countryByCode[code];
      if (!name) {
        return all2;
      }
      all2[timeZone].push({ code, name });
      return all2;
    }, all);
  }, {});
})();

export { InternalTimeZones, getTimeZoneGroups, getTimeZoneInfo, getTimeZones, getZone, timeZoneFormatUserFriendly };
//# sourceMappingURL=timezones.js.map
