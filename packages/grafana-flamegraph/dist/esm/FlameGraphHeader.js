import { cx, css } from '@emotion/css';
import React, { useState, useEffect } from 'react';
import useDebounce from 'react-use/lib/useDebounce';
import usePrevious from 'react-use/lib/usePrevious';
import { useStyles2, Input, Button, ButtonGroup, RadioButtonGroup, Menu, Dropdown } from '@grafana/ui';
import { byValueGradient, byPackageGradient, diffDefaultGradient, diffColorBlindGradient } from './FlameGraph/colors.js';
import { MIN_WIDTH_TO_SHOW_BOTH_TOPTABLE_AND_FLAMEGRAPH } from './constants.js';
import { SelectedView, ColorScheme, ColorSchemeDiff } from './types.js';

const FlameGraphHeader = ({
  search,
  setSearch,
  selectedView,
  setSelectedView,
  containerWidth,
  onReset,
  textAlign,
  onTextAlignChange,
  showResetButton,
  colorScheme,
  onColorSchemeChange,
  stickyHeader,
  extraHeaderElements,
  vertical,
  isDiffMode,
  setCollapsedMap,
  collapsedMap
}) => {
  const styles = useStyles2(getStyles);
  const [localSearch, setLocalSearch] = useSearchInput(search, setSearch);
  const suffix = localSearch !== "" ? /* @__PURE__ */ React.createElement(
    Button,
    {
      icon: "times",
      fill: "text",
      size: "sm",
      onClick: () => {
        setSearch("");
        setLocalSearch("");
      }
    },
    "Clear"
  ) : null;
  return /* @__PURE__ */ React.createElement("div", { className: cx(styles.header, { [styles.stickyHeader]: stickyHeader }) }, /* @__PURE__ */ React.createElement("div", { className: styles.inputContainer }, /* @__PURE__ */ React.createElement(
    Input,
    {
      value: localSearch || "",
      onChange: (v) => {
        setLocalSearch(v.currentTarget.value);
      },
      placeholder: "Search...",
      suffix
    }
  )), /* @__PURE__ */ React.createElement("div", { className: styles.rightContainer }, showResetButton && /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: "secondary",
      fill: "outline",
      size: "sm",
      icon: "history-alt",
      tooltip: "Reset focus and sandwich state",
      onClick: () => {
        onReset();
      },
      className: styles.buttonSpacing,
      "aria-label": "Reset focus and sandwich state"
    }
  ), /* @__PURE__ */ React.createElement(ColorSchemeButton, { value: colorScheme, onChange: onColorSchemeChange, isDiffMode }), /* @__PURE__ */ React.createElement(ButtonGroup, { className: styles.buttonSpacing }, /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: "secondary",
      fill: "outline",
      size: "sm",
      tooltip: "Expand all groups",
      onClick: () => {
        setCollapsedMap(collapsedMap.setAllCollapsedStatus(false));
      },
      "aria-label": "Expand all groups",
      icon: "angle-double-down",
      disabled: selectedView === SelectedView.TopTable
    }
  ), /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: "secondary",
      fill: "outline",
      size: "sm",
      tooltip: "Collapse all groups",
      onClick: () => {
        setCollapsedMap(collapsedMap.setAllCollapsedStatus(true));
      },
      "aria-label": "Collapse all groups",
      icon: "angle-double-up",
      disabled: selectedView === SelectedView.TopTable
    }
  )), /* @__PURE__ */ React.createElement(
    RadioButtonGroup,
    {
      size: "sm",
      disabled: selectedView === SelectedView.TopTable,
      options: alignOptions,
      value: textAlign,
      onChange: onTextAlignChange,
      className: styles.buttonSpacing
    }
  ), /* @__PURE__ */ React.createElement(
    RadioButtonGroup,
    {
      size: "sm",
      options: getViewOptions(containerWidth, vertical),
      value: selectedView,
      onChange: setSelectedView
    }
  ), extraHeaderElements && /* @__PURE__ */ React.createElement("div", { className: styles.extraElements }, extraHeaderElements)));
};
function ColorSchemeButton(props) {
  const styles = useStyles2(getStyles);
  let menu = /* @__PURE__ */ React.createElement(Menu, null, /* @__PURE__ */ React.createElement(Menu.Item, { label: "By package name", onClick: () => props.onChange(ColorScheme.PackageBased) }), /* @__PURE__ */ React.createElement(Menu.Item, { label: "By value", onClick: () => props.onChange(ColorScheme.ValueBased) }));
  const colorDotStyle = {
    [ColorScheme.ValueBased]: styles.colorDotByValue,
    [ColorScheme.PackageBased]: styles.colorDotByPackage,
    [ColorSchemeDiff.DiffColorBlind]: styles.colorDotDiffColorBlind,
    [ColorSchemeDiff.Default]: styles.colorDotDiffDefault
  }[props.value] || styles.colorDotByValue;
  let contents = /* @__PURE__ */ React.createElement("span", { className: cx(styles.colorDot, colorDotStyle) });
  if (props.isDiffMode) {
    menu = /* @__PURE__ */ React.createElement(Menu, null, /* @__PURE__ */ React.createElement(Menu.Item, { label: "Default (green to red)", onClick: () => props.onChange(ColorSchemeDiff.Default) }), /* @__PURE__ */ React.createElement(Menu.Item, { label: "Color blind (blue to red)", onClick: () => props.onChange(ColorSchemeDiff.DiffColorBlind) }));
    contents = /* @__PURE__ */ React.createElement("div", { className: cx(styles.colorDotDiff, colorDotStyle) }, /* @__PURE__ */ React.createElement("div", null, "-100% (removed)"), /* @__PURE__ */ React.createElement("div", null, "0%"), /* @__PURE__ */ React.createElement("div", null, "+100% (added)"));
  }
  return /* @__PURE__ */ React.createElement(Dropdown, { overlay: menu }, /* @__PURE__ */ React.createElement(
    Button,
    {
      variant: "secondary",
      fill: "outline",
      size: "sm",
      tooltip: "Change color scheme",
      onClick: () => {
      },
      className: styles.buttonSpacing,
      "aria-label": "Change color scheme"
    },
    contents
  ));
}
const alignOptions = [
  { value: "left", description: "Align text left", icon: "align-left" },
  { value: "right", description: "Align text right", icon: "align-right" }
];
function getViewOptions(width, vertical) {
  let viewOptions = [
    { value: SelectedView.TopTable, label: "Top Table", description: "Only show top table" },
    { value: SelectedView.FlameGraph, label: "Flame Graph", description: "Only show flame graph" }
  ];
  if (width >= MIN_WIDTH_TO_SHOW_BOTH_TOPTABLE_AND_FLAMEGRAPH || vertical) {
    viewOptions.push({
      value: SelectedView.Both,
      label: "Both",
      description: "Show both the top table and flame graph"
    });
  }
  return viewOptions;
}
function useSearchInput(search, setSearch) {
  const [localSearchState, setLocalSearchState] = useState(search);
  const prevSearch = usePrevious(search);
  useDebounce(
    () => {
      setSearch(localSearchState);
    },
    250,
    [localSearchState]
  );
  useEffect(() => {
    if (prevSearch !== search && search !== localSearchState) {
      setLocalSearchState(search);
    }
  }, [search, prevSearch, localSearchState]);
  return [localSearchState, setLocalSearchState];
}
const getStyles = (theme) => ({
  header: css({
    label: "header",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
    top: 0,
    gap: theme.spacing(1),
    marginTop: theme.spacing(1)
  }),
  stickyHeader: css({
    zIndex: theme.zIndex.navbarFixed,
    position: "sticky",
    background: theme.colors.background.primary
  }),
  inputContainer: css({
    label: "inputContainer",
    flexGrow: 1,
    minWidth: "150px",
    maxWidth: "350px"
  }),
  rightContainer: css({
    label: "rightContainer",
    display: "flex",
    alignItems: "flex-start",
    flexWrap: "wrap"
  }),
  buttonSpacing: css({
    label: "buttonSpacing",
    marginRight: theme.spacing(1)
  }),
  resetButton: css({
    label: "resetButton",
    display: "flex",
    marginRight: theme.spacing(2)
  }),
  resetButtonIconWrapper: css({
    label: "resetButtonIcon",
    padding: "0 5px",
    color: theme.colors.text.disabled
  }),
  colorDot: css({
    label: "colorDot",
    display: "inline-block",
    width: "10px",
    height: "10px",
    // eslint-disable-next-line @grafana/no-border-radius-literal
    borderRadius: "50%"
  }),
  colorDotDiff: css({
    label: "colorDotDiff",
    display: "flex",
    width: "200px",
    height: "12px",
    color: "white",
    fontSize: 9,
    lineHeight: 1.3,
    fontWeight: 300,
    justifyContent: "space-between",
    padding: "0 2px",
    // We have a specific sizing for this so probably makes sense to use hardcoded value here
    // eslint-disable-next-line @grafana/no-border-radius-literal
    borderRadius: "2px"
  }),
  colorDotByValue: css({
    label: "colorDotByValue",
    background: byValueGradient
  }),
  colorDotByPackage: css({
    label: "colorDotByPackage",
    background: byPackageGradient
  }),
  colorDotDiffDefault: css({
    label: "colorDotDiffDefault",
    background: diffDefaultGradient
  }),
  colorDotDiffColorBlind: css({
    label: "colorDotDiffColorBlind",
    background: diffColorBlindGradient
  }),
  extraElements: css({
    label: "extraElements",
    marginLeft: theme.spacing(1)
  })
});

export { FlameGraphHeader as default };
//# sourceMappingURL=FlameGraphHeader.js.map
