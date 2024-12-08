import { css } from '@emotion/css';
import React__default, { PureComponent } from 'react';
import '@grafana/data';
import { withTheme2 } from '../../../../themes/ThemeContext.js';
import { stylesFactory } from '../../../../themes/stylesFactory.js';
import '@emotion/react';
import 'tinycolor2';
import '../../../../utils/skeleton.js';
import { Icon } from '../../../Icon/Icon.js';

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const getSelectOptionGroupStyles = stylesFactory((theme) => {
  return {
    header: css({
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      justifyItems: "center",
      cursor: "pointer",
      padding: "7px 10px",
      width: "100%",
      borderBottom: `1px solid ${theme.colors.background.secondary}`,
      "&:hover": {
        color: theme.colors.text.maxContrast
      }
    }),
    label: css({
      flexGrow: 1
    }),
    icon: css({
      paddingRight: "2px"
    })
  };
});
class UnthemedSelectOptionGroup extends PureComponent {
  constructor() {
    super(...arguments);
    __publicField(this, "state", {
      expanded: false
    });
    __publicField(this, "onToggleChildren", () => {
      this.setState((prevState) => ({
        expanded: !prevState.expanded
      }));
    });
  }
  componentDidMount() {
    if (this.props.data.expanded) {
      this.setState({ expanded: true });
    } else if (this.props.selectProps && this.props.selectProps.value) {
      const { value } = this.props.selectProps.value;
      if (value && this.props.options.some((option) => option.value === value)) {
        this.setState({ expanded: true });
      }
    }
  }
  componentDidUpdate(nextProps) {
    if (nextProps.selectProps.inputValue !== "") {
      this.setState({ expanded: true });
    }
  }
  render() {
    const { children, label, theme } = this.props;
    const { expanded } = this.state;
    const styles = getSelectOptionGroupStyles(theme);
    return /* @__PURE__ */ React__default.createElement("div", null, /* @__PURE__ */ React__default.createElement("div", { className: styles.header, onClick: this.onToggleChildren, role: "presentation" }, /* @__PURE__ */ React__default.createElement("span", { className: styles.label }, label), /* @__PURE__ */ React__default.createElement(Icon, { className: styles.icon, name: expanded ? "angle-up" : "angle-down" })), expanded && children);
  }
}
const SelectOptionGroup = withTheme2(UnthemedSelectOptionGroup);

export { SelectOptionGroup };
//# sourceMappingURL=SelectOptionGroup.js.map
