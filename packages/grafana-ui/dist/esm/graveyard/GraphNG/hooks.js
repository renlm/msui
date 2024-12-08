import React__default, { useContext, useCallback } from 'react';

const GraphNGContext = React__default.createContext({});
const useGraphNGContext = () => {
  const { data, dimFields, mapSeriesIndexToDataFrameFieldIndex } = useContext(GraphNGContext);
  const getXAxisField = useCallback(() => {
    const xFieldMatcher = dimFields.x;
    let xField = null;
    for (let j = 0; j < data.fields.length; j++) {
      if (xFieldMatcher(data.fields[j], data, [data])) {
        xField = data.fields[j];
        break;
      }
    }
    return xField;
  }, [data, dimFields]);
  return {
    dimFields,
    mapSeriesIndexToDataFrameFieldIndex,
    getXAxisField,
    alignedData: data
  };
};

export { GraphNGContext, useGraphNGContext };
//# sourceMappingURL=hooks.js.map
