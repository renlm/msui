import React__default from 'react';

const TableCell = ({
  cell,
  tableStyles,
  onCellFilterAdded,
  timeRange,
  userProps,
  frame,
  rowStyled,
  textWrapped,
  height
}) => {
  const cellProps = cell.getCellProps();
  const field = cell.column.field;
  if (!(field == null ? void 0 : field.display)) {
    return null;
  }
  if (cellProps.style) {
    cellProps.style.minWidth = cellProps.style.width;
    cellProps.style.justifyContent = cell.column.justifyContent;
  }
  let innerWidth = (typeof cell.column.width === "number" ? cell.column.width : 24) - tableStyles.cellPadding * 2;
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, cell.render("Cell", {
    field,
    tableStyles,
    onCellFilterAdded,
    cellProps,
    innerWidth,
    timeRange,
    userProps,
    frame,
    rowStyled,
    textWrapped,
    height
  }));
};

export { TableCell };
//# sourceMappingURL=TableCell.js.map
