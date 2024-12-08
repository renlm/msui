import { useState, useCallback } from 'react';
import store from '../../gcopypaste/app/core/store.js';

const promQueryEditorExplainKey = "PrometheusQueryEditorExplainDefault";
function getFlagValue(key, defaultValue = false) {
  const val = store.get(key);
  return val === void 0 ? defaultValue : Boolean(parseInt(val, 10));
}
function setFlagValue(key, value) {
  store.set(key, value ? "1" : "0");
}
function useFlag(key, defaultValue = false) {
  const [flag, updateFlag] = useState(getFlagValue(key, defaultValue));
  const setter = useCallback(
    (value) => {
      setFlagValue(key, value);
      updateFlag(value);
    },
    [key]
  );
  return { flag, setFlag: setter };
}

export { promQueryEditorExplainKey, useFlag };
//# sourceMappingURL=useFlag.js.map
