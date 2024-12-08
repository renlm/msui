import { css } from '@emotion/css';
import React__default, { useState } from 'react';
import { IconButton } from '../IconButton/IconButton.js';
import { Tab } from '../Tabs/Tab.js';
import { TabsBar } from '../Tabs/TabsBar.js';
import { TabContent } from '../Tabs/TabContent.js';
import '@grafana/data';
import { useStyles2, useTheme2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';
import { CustomScrollbar } from '../CustomScrollbar/CustomScrollbar.js';

function TabbedContainer({ tabs, defaultTab, closeIconTooltip, onClose, testId }) {
  var _a;
  const [activeTab, setActiveTab] = useState(tabs.some((tab) => tab.value === defaultTab) ? defaultTab : tabs[0].value);
  const styles = useStyles2(getStyles);
  const theme = useTheme2();
  const onSelectTab = (item) => {
    setActiveTab(item.value);
  };
  const autoHeight = `calc(100% - (${theme.components.menuTabs.height}px + ${theme.spacing(1)}))`;
  return /* @__PURE__ */ React__default.createElement("div", { className: styles.container, "data-testid": testId }, /* @__PURE__ */ React__default.createElement(TabsBar, { className: styles.tabs }, tabs.map((t) => /* @__PURE__ */ React__default.createElement(
    Tab,
    {
      key: t.value,
      label: t.label,
      active: t.value === activeTab,
      onChangeTab: () => onSelectTab(t),
      icon: t.icon
    }
  )), /* @__PURE__ */ React__default.createElement(IconButton, { className: styles.close, onClick: onClose, name: "times", tooltip: closeIconTooltip != null ? closeIconTooltip : "Close" })), /* @__PURE__ */ React__default.createElement(CustomScrollbar, { autoHeightMin: autoHeight, autoHeightMax: autoHeight }, /* @__PURE__ */ React__default.createElement(TabContent, { className: styles.tabContent }, (_a = tabs.find((t) => t.value === activeTab)) == null ? void 0 : _a.content)));
}
const getStyles = (theme) => ({
  container: css({
    height: "100%"
  }),
  tabContent: css({
    padding: theme.spacing(2),
    backgroundColor: theme.colors.background.primary,
    height: `100%`
  }),
  close: css({
    position: "absolute",
    right: "16px",
    top: "5px",
    cursor: "pointer",
    fontSize: theme.typography.size.lg
  }),
  tabs: css({
    paddingTop: theme.spacing(1),
    borderColor: theme.colors.border.weak,
    ul: {
      marginLeft: theme.spacing(2)
    }
  })
});

export { TabbedContainer };
//# sourceMappingURL=TabbedContainer.js.map
