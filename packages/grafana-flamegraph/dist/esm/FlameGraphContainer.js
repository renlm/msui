import { css } from '@emotion/css';
import uFuzzy from '@leeoniya/ufuzzy';
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useMeasure } from 'react-use';
import { ThemeContext } from '@grafana/ui';
import FlameGraph from './FlameGraph/FlameGraph.js';
import { CollapsedMap, FlameGraphDataContainer } from './FlameGraph/dataTransform.js';
import FlameGraphHeader from './FlameGraphHeader.js';
import FlameGraphTopTableContainer from './TopTable/FlameGraphTopTableContainer.js';
import { MIN_WIDTH_TO_SHOW_BOTH_TOPTABLE_AND_FLAMEGRAPH } from './constants.js';
import { SelectedView, ColorSchemeDiff, ColorScheme } from './types.js';

const ufuzzy = new uFuzzy();
const FlameGraphContainer = ({
  data,
  onTableSymbolClick,
  onViewSelected,
  onTextAlignSelected,
  onTableSort,
  getTheme,
  stickyHeader,
  extraHeaderElements,
  vertical,
  showFlameGraphOnly,
  disableCollapsing,
  getExtraContextMenuButtons
}) => {
  const [focusedItemData, setFocusedItemData] = useState();
  const [rangeMin, setRangeMin] = useState(0);
  const [rangeMax, setRangeMax] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedView, setSelectedView] = useState(SelectedView.Both);
  const [sizeRef, { width: containerWidth }] = useMeasure();
  const [textAlign, setTextAlign] = useState("left");
  const [sandwichItem, setSandwichItem] = useState();
  const [collapsedMap, setCollapsedMap] = useState(new CollapsedMap());
  const theme = useMemo(() => getTheme(), [getTheme]);
  const dataContainer = useMemo(() => {
    if (!data) {
      return;
    }
    const container = new FlameGraphDataContainer(data, { collapsing: !disableCollapsing }, theme);
    setCollapsedMap(container.getCollapsedMap());
    return container;
  }, [data, theme, disableCollapsing]);
  const [colorScheme, setColorScheme] = useColorScheme(dataContainer);
  const styles = getStyles(theme);
  const matchedLabels = useLabelSearch(search, dataContainer);
  useEffect(() => {
    if (containerWidth > 0 && containerWidth < MIN_WIDTH_TO_SHOW_BOTH_TOPTABLE_AND_FLAMEGRAPH && selectedView === SelectedView.Both && !vertical) {
      setSelectedView(SelectedView.FlameGraph);
    }
  }, [selectedView, setSelectedView, containerWidth, vertical]);
  const resetFocus = useCallback(() => {
    setFocusedItemData(void 0);
    setRangeMin(0);
    setRangeMax(1);
  }, [setFocusedItemData, setRangeMax, setRangeMin]);
  function resetSandwich() {
    setSandwichItem(void 0);
  }
  useEffect(() => {
    resetFocus();
    resetSandwich();
  }, [data, resetFocus]);
  const onSymbolClick = useCallback(
    (symbol) => {
      if (search === symbol) {
        setSearch("");
      } else {
        onTableSymbolClick == null ? void 0 : onTableSymbolClick(symbol);
        setSearch(symbol);
        resetFocus();
      }
    },
    [setSearch, resetFocus, onTableSymbolClick, search]
  );
  if (!dataContainer) {
    return null;
  }
  const flameGraph = /* @__PURE__ */ React.createElement(
    FlameGraph,
    {
      data: dataContainer,
      rangeMin,
      rangeMax,
      matchedLabels,
      setRangeMin,
      setRangeMax,
      onItemFocused: (data2) => setFocusedItemData(data2),
      focusedItemData,
      textAlign,
      sandwichItem,
      onSandwich: (label) => {
        resetFocus();
        setSandwichItem(label);
      },
      onFocusPillClick: resetFocus,
      onSandwichPillClick: resetSandwich,
      colorScheme,
      showFlameGraphOnly,
      collapsing: !disableCollapsing,
      getExtraContextMenuButtons,
      selectedView,
      search,
      collapsedMap,
      setCollapsedMap
    }
  );
  const table = /* @__PURE__ */ React.createElement(
    FlameGraphTopTableContainer,
    {
      data: dataContainer,
      onSymbolClick,
      search,
      matchedLabels,
      sandwichItem,
      onSandwich: setSandwichItem,
      onSearch: setSearch,
      onTableSort,
      colorScheme
    }
  );
  let body;
  if (showFlameGraphOnly || selectedView === SelectedView.FlameGraph) {
    body = flameGraph;
  } else if (selectedView === SelectedView.TopTable) {
    body = /* @__PURE__ */ React.createElement("div", { className: styles.tableContainer }, table);
  } else if (selectedView === SelectedView.Both) {
    if (vertical) {
      body = /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: styles.verticalGraphContainer }, flameGraph), /* @__PURE__ */ React.createElement("div", { className: styles.verticalTableContainer }, table));
    } else {
      body = /* @__PURE__ */ React.createElement("div", { className: styles.horizontalContainer }, /* @__PURE__ */ React.createElement("div", { className: styles.horizontalTableContainer }, table), /* @__PURE__ */ React.createElement("div", { className: styles.horizontalGraphContainer }, flameGraph));
    }
  }
  return (
    // We add the theme context to bridge the gap if this is rendered in non grafana environment where the context
    // isn't already provided.
    /* @__PURE__ */ React.createElement(ThemeContext.Provider, { value: theme }, /* @__PURE__ */ React.createElement("div", { ref: sizeRef, className: styles.container }, !showFlameGraphOnly && /* @__PURE__ */ React.createElement(
      FlameGraphHeader,
      {
        search,
        setSearch,
        selectedView,
        setSelectedView: (view) => {
          setSelectedView(view);
          onViewSelected == null ? void 0 : onViewSelected(view);
        },
        containerWidth,
        onReset: () => {
          resetFocus();
          resetSandwich();
        },
        textAlign,
        onTextAlignChange: (align) => {
          setTextAlign(align);
          onTextAlignSelected == null ? void 0 : onTextAlignSelected(align);
        },
        showResetButton: Boolean(focusedItemData || sandwichItem),
        colorScheme,
        onColorSchemeChange: setColorScheme,
        stickyHeader: Boolean(stickyHeader),
        extraHeaderElements,
        vertical,
        isDiffMode: dataContainer.isDiffFlamegraph(),
        setCollapsedMap,
        collapsedMap
      }
    ), /* @__PURE__ */ React.createElement("div", { className: styles.body }, body)))
  );
};
function useColorScheme(dataContainer) {
  const defaultColorScheme = (dataContainer == null ? void 0 : dataContainer.isDiffFlamegraph()) ? ColorSchemeDiff.Default : ColorScheme.PackageBased;
  const [colorScheme, setColorScheme] = useState(defaultColorScheme);
  useEffect(() => {
    setColorScheme(defaultColorScheme);
  }, [defaultColorScheme]);
  return [colorScheme, setColorScheme];
}
function useLabelSearch(search, data) {
  return useMemo(() => {
    if (search && data) {
      const foundLabels = /* @__PURE__ */ new Set();
      let idxs = ufuzzy.filter(data.getUniqueLabels(), search);
      if (idxs) {
        for (let idx of idxs) {
          foundLabels.add(data.getUniqueLabels()[idx]);
        }
      }
      return foundLabels;
    }
    return void 0;
  }, [search, data]);
}
function getStyles(theme) {
  return {
    container: css({
      label: "container",
      overflow: "auto",
      height: "100%",
      display: "flex",
      flex: "1 1 0",
      flexDirection: "column",
      minHeight: 0,
      gap: theme.spacing(1)
    }),
    body: css({
      label: "body",
      flexGrow: 1
    }),
    tableContainer: css({
      // This is not ideal for dashboard panel where it creates a double scroll. In a panel it should be 100% but then
      // in explore we need a specific height.
      height: 800
    }),
    horizontalContainer: css({
      label: "horizontalContainer",
      display: "flex",
      minHeight: 0,
      flexDirection: "row",
      columnGap: theme.spacing(1),
      width: "100%"
    }),
    horizontalGraphContainer: css({
      flexBasis: "50%"
    }),
    horizontalTableContainer: css({
      flexBasis: "50%",
      maxHeight: 800
    }),
    verticalGraphContainer: css({
      marginBottom: theme.spacing(1)
    }),
    verticalTableContainer: css({
      height: 800
    })
  };
}

export { FlameGraphContainer as default };
//# sourceMappingURL=FlameGraphContainer.js.map
