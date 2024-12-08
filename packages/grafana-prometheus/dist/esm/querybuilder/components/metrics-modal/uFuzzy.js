import uFuzzy from '@leeoniya/ufuzzy';
import { debounce } from 'lodash';

const uf = new uFuzzy({
  intraMode: 1,
  intraIns: 1,
  intraSub: 1,
  intraTrn: 1,
  intraDel: 1
});
function fuzzySearch(haystack, query, dispatcher) {
  const [idxs, info, order] = uf.search(haystack, query, 0, 1e5);
  let haystackOrder = [];
  let matchesSet = /* @__PURE__ */ new Set();
  if (idxs && order) {
    const mark = (part, matched) => {
      if (matched) {
        matchesSet.add(part);
      }
    };
    for (let i = 0; i < order.length; i++) {
      let infoIdx = order[i];
      uFuzzy.highlight(haystack[info.idx[infoIdx]], info.ranges[infoIdx], mark);
      haystackOrder.push(haystack[info.idx[infoIdx]]);
    }
    dispatcher([haystackOrder, [...matchesSet]]);
  } else if (!query) {
    dispatcher([[], []]);
  }
}
const debouncedFuzzySearch = debounce(fuzzySearch, 300);

export { debouncedFuzzySearch, fuzzySearch };
//# sourceMappingURL=uFuzzy.js.map
