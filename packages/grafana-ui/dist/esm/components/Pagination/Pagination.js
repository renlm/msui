import { cx, css } from '@emotion/css';
import React__default, { useMemo } from 'react';
import '@grafana/data';
import { useStyles2 } from '../../themes/ThemeContext.js';
import 'micro-memoize';
import '@emotion/react';
import 'tinycolor2';
import '../../utils/skeleton.js';
import { Button } from '../Button/Button.js';
import '../Button/ButtonGroup.js';
import { Icon } from '../Icon/Icon.js';

const Pagination = ({
  currentPage,
  numberOfPages,
  onNavigate,
  hideWhenSinglePage,
  showSmallVersion,
  className
}) => {
  const styles = useStyles2(getStyles);
  const pageLengthToCondense = showSmallVersion ? 1 : 8;
  const pageButtons = useMemo(() => {
    const pages = [...new Array(numberOfPages).keys()];
    const condensePages = numberOfPages > pageLengthToCondense;
    const getListItem = (page, variant) => /* @__PURE__ */ React__default.createElement("li", { key: page, className: styles.item }, /* @__PURE__ */ React__default.createElement(Button, { size: "sm", variant, onClick: () => onNavigate(page) }, page));
    return pages.reduce((pagesToRender, pageIndex) => {
      const page = pageIndex + 1;
      const variant = page === currentPage ? "primary" : "secondary";
      const lowerBoundIndex = pageLengthToCondense;
      const upperBoundIndex = numberOfPages - pageLengthToCondense + 1;
      const differenceOfBounds = upperBoundIndex - lowerBoundIndex;
      const isFirstOrLastPage = page === 1 || page === numberOfPages;
      const currentPageIsBetweenBounds = differenceOfBounds > -1 && currentPage >= lowerBoundIndex && currentPage <= upperBoundIndex;
      const ellipsisOffset = showSmallVersion ? 1 : 3;
      const pageOffset = showSmallVersion ? 0 : 2;
      if (condensePages) {
        if (isFirstOrLastPage || currentPage < lowerBoundIndex && page < lowerBoundIndex || differenceOfBounds >= 0 && currentPage > upperBoundIndex && page > upperBoundIndex || differenceOfBounds < 0 && currentPage >= lowerBoundIndex && page > upperBoundIndex || currentPageIsBetweenBounds && page >= currentPage - pageOffset && page <= currentPage + pageOffset) {
          pagesToRender.push(getListItem(page, variant));
        } else if (page === lowerBoundIndex && currentPage < lowerBoundIndex || page === upperBoundIndex && currentPage > upperBoundIndex || currentPageIsBetweenBounds && (page === currentPage - ellipsisOffset || page === currentPage + ellipsisOffset)) {
          pagesToRender.push(
            /* @__PURE__ */ React__default.createElement("li", { key: page, className: styles.item }, /* @__PURE__ */ React__default.createElement(Icon, { className: styles.ellipsis, name: "ellipsis-v" }))
          );
        }
      } else {
        pagesToRender.push(getListItem(page, variant));
      }
      return pagesToRender;
    }, []);
  }, [currentPage, numberOfPages, onNavigate, pageLengthToCondense, showSmallVersion, styles.ellipsis, styles.item]);
  if (hideWhenSinglePage && numberOfPages <= 1) {
    return null;
  }
  return /* @__PURE__ */ React__default.createElement("div", { className: cx(styles.container, className) }, /* @__PURE__ */ React__default.createElement("ol", null, /* @__PURE__ */ React__default.createElement("li", { className: styles.item }, /* @__PURE__ */ React__default.createElement(
    Button,
    {
      "aria-label": `previous page`,
      size: "sm",
      variant: "secondary",
      onClick: () => onNavigate(currentPage - 1),
      disabled: currentPage === 1
    },
    /* @__PURE__ */ React__default.createElement(Icon, { name: "angle-left" })
  )), pageButtons, /* @__PURE__ */ React__default.createElement("li", { className: styles.item }, /* @__PURE__ */ React__default.createElement(
    Button,
    {
      "aria-label": `next page`,
      size: "sm",
      variant: "secondary",
      onClick: () => onNavigate(currentPage + 1),
      disabled: currentPage === numberOfPages
    },
    /* @__PURE__ */ React__default.createElement(Icon, { name: "angle-right" })
  ))));
};
const getStyles = () => {
  return {
    container: css({
      float: "right"
    }),
    item: css({
      display: "inline-block",
      paddingLeft: "10px",
      marginBottom: "5px"
    }),
    ellipsis: css({
      transform: "rotate(90deg)"
    })
  };
};

export { Pagination };
//# sourceMappingURL=Pagination.js.map
