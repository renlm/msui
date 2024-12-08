import { css } from '@emotion/css';
import React from 'react';
import { useStyles2, Stack, Icon } from '@grafana/ui';

function FeedbackLink({ feedbackUrl }) {
  const styles = useStyles2(getStyles);
  return /* @__PURE__ */ React.createElement(Stack, null, /* @__PURE__ */ React.createElement(
    "a",
    {
      href: feedbackUrl,
      className: styles.link,
      title: "The metrics explorer is new, please let us know how we can improve it",
      target: "_blank",
      rel: "noreferrer noopener"
    },
    /* @__PURE__ */ React.createElement(Icon, { name: "comment-alt-message" }),
    " Give feedback"
  ));
}
function getStyles(theme) {
  return {
    link: css({
      color: theme.colors.text.secondary,
      fontSize: theme.typography.bodySmall.fontSize,
      ":hover": {
        color: theme.colors.text.link
      },
      margin: `-25px 0 30px 0`
    })
  };
}

export { FeedbackLink };
//# sourceMappingURL=FeedbackLink.js.map
