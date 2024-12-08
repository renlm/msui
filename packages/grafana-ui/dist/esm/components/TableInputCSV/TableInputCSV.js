import { css } from '@emotion/css';
import { debounce } from 'lodash';
import React__default, { PureComponent } from 'react';
import { readCSV } from '@grafana/data';
import { withTheme2 } from '../../themes/ThemeContext.js';
import { stylesFactory } from '../../themes/stylesFactory.js';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';
import { Icon } from '../Icon/Icon.js';
import { TextArea } from '../TextArea/TextArea.js';

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class UnThemedTableInputCSV extends PureComponent {
  constructor(props) {
    super(props);
    __publicField(this, "readCSV", debounce(() => {
      const { config } = this.props;
      const { text } = this.state;
      this.setState({ data: readCSV(text, { config }) });
    }, 150));
    __publicField(this, "onTextChange", (event) => {
      this.setState({ text: event.target.value });
    });
    const { text, config } = props;
    this.state = {
      text,
      data: readCSV(text, { config })
    };
  }
  componentDidUpdate(prevProps, prevState) {
    const { text } = this.state;
    if (text !== prevState.text || this.props.config !== prevProps.config) {
      this.readCSV();
    }
    if (this.props.text !== prevProps.text && this.props.text !== text) {
      this.setState({ text: this.props.text });
    }
    if (this.state.data !== prevState.data) {
      this.props.onSeriesParsed(this.state.data, this.state.text);
    }
  }
  render() {
    const { width, height, theme } = this.props;
    const { data } = this.state;
    const styles = getStyles(theme);
    return /* @__PURE__ */ React__default.createElement("div", { className: styles.tableInputCsv }, /* @__PURE__ */ React__default.createElement(
      TextArea,
      {
        style: { width, height },
        placeholder: "Enter CSV here...",
        value: this.state.text,
        onChange: this.onTextChange,
        className: styles.textarea
      }
    ), data && /* @__PURE__ */ React__default.createElement("footer", { className: styles.footer }, data.map((frame, index) => {
      return /* @__PURE__ */ React__default.createElement("span", { key: index }, "Rows:", frame.length, ", Columns:", frame.fields.length, " \xA0", /* @__PURE__ */ React__default.createElement(Icon, { name: "check-circle" }));
    })));
  }
}
const TableInputCSV = withTheme2(UnThemedTableInputCSV);
TableInputCSV.displayName = "TableInputCSV";
const getStyles = stylesFactory((theme) => {
  return {
    tableInputCsv: css({
      position: "relative"
    }),
    textarea: css({
      height: "100%",
      width: "100%"
    }),
    footer: css({
      position: "absolute",
      bottom: "15px",
      right: "15px",
      border: "1px solid #222",
      background: theme.colors.success.main,
      padding: `1px ${theme.spacing(0.5)}`,
      fontSize: "80%"
    })
  };
});

export { TableInputCSV, UnThemedTableInputCSV };
//# sourceMappingURL=TableInputCSV.js.map
