import { css, cx } from '@emotion/css';
import React__default, { PureComponent } from 'react';
import '@grafana/data';
import 'hoist-non-react-statics';
import 'micro-memoize';
import { stylesFactory } from '../../themes/stylesFactory.js';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';

const getStyles = stylesFactory((inlineList = false) => ({
  list: css({
    listStyleType: "none",
    margin: 0,
    padding: 0
  }),
  item: css({
    display: inlineList && "inline-block" || "block"
  })
}));
class AbstractList extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const { items, renderItem, getItemKey, className, inline } = this.props;
    const styles = getStyles(inline);
    return /* @__PURE__ */ React__default.createElement("ul", { className: cx(styles.list, className) }, items.map((item, i) => {
      return /* @__PURE__ */ React__default.createElement("li", { className: styles.item, key: getItemKey ? getItemKey(item) : i }, renderItem(item, i));
    }));
  }
}

export { AbstractList };
//# sourceMappingURL=AbstractList.js.map
