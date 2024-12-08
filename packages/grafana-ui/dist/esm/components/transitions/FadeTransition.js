import { css } from '@emotion/css';
import React__default, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import '@grafana/data';
import { useStyles2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';

function FadeTransition(props) {
  const { visible, children, duration = 250 } = props;
  const styles = useStyles2(getStyles, duration);
  const transitionRef = useRef(null);
  return /* @__PURE__ */ React__default.createElement(
    CSSTransition,
    {
      in: visible,
      mountOnEnter: true,
      unmountOnExit: true,
      timeout: duration,
      classNames: styles,
      nodeRef: transitionRef
    },
    React__default.cloneElement(children, { ref: transitionRef })
  );
}
const getStyles = (theme, duration) => ({
  enter: css({
    label: "enter",
    opacity: 0
  }),
  enterActive: css({
    label: "enterActive",
    opacity: 1,
    [theme.transitions.handleMotion("no-preference", "reduce")]: {
      transition: `opacity ${duration}ms ease-out`
    }
  }),
  exit: css({
    label: "exit",
    opacity: 1
  }),
  exitActive: css({
    label: "exitActive",
    opacity: 0,
    [theme.transitions.handleMotion("no-preference", "reduce")]: {
      transition: `opacity ${duration}ms ease-out`
    }
  })
});

export { FadeTransition };
//# sourceMappingURL=FadeTransition.js.map
