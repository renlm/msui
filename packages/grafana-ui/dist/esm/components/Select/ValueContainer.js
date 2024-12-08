import { cx } from '@emotion/css';
import React__default, { Component } from 'react';
import { withTheme2 } from '../../themes/ThemeContext.js';
import { getSelectStyles } from './getSelectStyles.js';

class UnthemedValueContainer extends Component {
  render() {
    const { children } = this.props;
    const { selectProps } = this.props;
    if (selectProps && Array.isArray(children) && Array.isArray(children[0]) && selectProps.maxVisibleValues !== void 0 && !(selectProps.showAllSelectedWhenOpen && selectProps.menuIsOpen)) {
      const [valueChildren, ...otherChildren] = children;
      const truncatedValues = valueChildren.slice(0, selectProps.maxVisibleValues);
      return this.renderContainer([truncatedValues, ...otherChildren]);
    }
    return this.renderContainer(children);
  }
  renderContainer(children) {
    var _a, _b;
    const { isMulti, theme, selectProps } = this.props;
    const noWrap = ((_a = this.props.selectProps) == null ? void 0 : _a.noMultiValueWrap) && !((_b = this.props.selectProps) == null ? void 0 : _b.menuIsOpen);
    const styles = getSelectStyles(theme);
    const dataTestid = selectProps["data-testid"];
    const className = cx(styles.valueContainer, {
      [styles.valueContainerMulti]: isMulti && !noWrap,
      [styles.valueContainerMultiNoWrap]: isMulti && noWrap
    });
    return /* @__PURE__ */ React__default.createElement("div", { "data-testid": dataTestid, className }, children);
  }
}
const ValueContainer = withTheme2(UnthemedValueContainer);

export { ValueContainer };
//# sourceMappingURL=ValueContainer.js.map
