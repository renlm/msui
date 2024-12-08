import { closestIdx } from '@grafana/data';

function amendTable(prevTable, nextTable) {
  let [prevTimes] = prevTable;
  let [nextTimes] = nextTable;
  let pLen = prevTimes.length;
  let pStart = prevTimes[0];
  let pEnd = prevTimes[pLen - 1];
  let nLen = nextTimes.length;
  let nStart = nextTimes[0];
  let nEnd = nextTimes[nLen - 1];
  let outTable;
  if (pLen) {
    if (nLen) {
      if (nStart > pEnd) {
        outTable = prevTable.map((_, i) => prevTable[i].concat(nextTable[i]));
      } else if (nEnd < pStart) {
        outTable = nextTable.map((_, i) => nextTable[i].concat(prevTable[i]));
      } else if (nStart <= pStart && nEnd >= pEnd) {
        outTable = nextTable;
      } else if (nStart > pStart && nEnd < pEnd) ; else if (nStart >= pStart) {
        let idx = closestIdx(nStart, prevTimes);
        idx = prevTimes[idx] < nStart ? idx - 1 : idx;
        outTable = prevTable.map((_, i) => prevTable[i].slice(0, idx).concat(nextTable[i]));
      } else if (nEnd >= pStart) {
        let idx = closestIdx(nEnd, prevTimes);
        idx = prevTimes[idx] < nEnd ? idx : idx + 1;
        outTable = nextTable.map((_, i) => nextTable[i].concat(prevTable[i].slice(idx)));
      }
    } else {
      outTable = prevTable;
    }
  } else {
    if (nLen) {
      outTable = nextTable;
    } else {
      outTable = [[]];
    }
  }
  return outTable;
}
function trimTable(table, fromTime, toTime) {
  let [times, ...vals] = table;
  let fromIdx;
  let toIdx;
  if (times[0] < fromTime) {
    fromIdx = closestIdx(fromTime, times);
    if (times[fromIdx] < fromTime) {
      fromIdx++;
    }
  }
  if (times[times.length - 1] > toTime) {
    toIdx = closestIdx(toTime, times);
    if (times[toIdx] > toTime) {
      toIdx--;
    }
  }
  if (fromIdx != null || toIdx != null) {
    times = times.slice(fromIdx != null ? fromIdx : 0, toIdx);
    vals = vals.map((vals2) => vals2.slice(fromIdx != null ? fromIdx : 0, toIdx));
  }
  return [times, ...vals];
}

export { amendTable, trimTable };
//# sourceMappingURL=amendTimeSeries.js.map
