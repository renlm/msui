import { groupBy } from 'lodash';

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
function mergeParentSubtrees(roots, data) {
  const newRoots = getParentSubtrees(roots);
  return mergeSubtrees(newRoots, data, "parents");
}
function getParentSubtrees(roots) {
  return roots.map((r) => {
    var _a, _b;
    if (!((_a = r.parents) == null ? void 0 : _a.length)) {
      return r;
    }
    const newRoot = __spreadProps(__spreadValues({}, r), {
      children: []
    });
    const stack = [
      { child: newRoot, parent: r.parents[0] }
    ];
    while (stack.length) {
      const args = stack.shift();
      const newNode = __spreadProps(__spreadValues({}, args.parent), {
        children: args.child ? [args.child] : [],
        parents: []
      });
      if (args.child) {
        newNode.value = args.child.value;
        args.child.parents = [newNode];
      }
      if ((_b = args.parent.parents) == null ? void 0 : _b.length) {
        stack.push({ child: newNode, parent: args.parent.parents[0] });
      }
    }
    return newRoot;
  });
}
function mergeSubtrees(roots, data, direction = "children") {
  var _a;
  const oppositeDirection = direction === "parents" ? "children" : "parents";
  const levels = [];
  const stack = [
    { previous: void 0, items: roots, level: 0 }
  ];
  while (stack.length) {
    const args = stack.shift();
    const indexes = args.items.flatMap((i) => i.itemIndexes);
    const newItem = {
      // We use the items value instead of value from the data frame, cause we could have changed it in the process
      value: args.items.reduce((acc, i) => acc + i.value, 0),
      itemIndexes: indexes,
      // these will change later
      children: [],
      parents: [],
      start: 0,
      level: args.level
    };
    levels[args.level] = levels[args.level] || [];
    levels[args.level].push(newItem);
    if (args.previous) {
      newItem[oppositeDirection] = [args.previous];
      const prevSiblingsVal = ((_a = args.previous[direction]) == null ? void 0 : _a.reduce((acc, node) => {
        return acc + node.value;
      }, 0)) || 0;
      newItem.start = args.previous.start + prevSiblingsVal;
      args.previous[direction].push(newItem);
    }
    const nextItems = args.items.flatMap((i) => i[direction] || []);
    const nextGroups = groupBy(nextItems, (c) => data.getLabel(c.itemIndexes[0]));
    for (const g of Object.values(nextGroups)) {
      stack.push({ previous: newItem, items: g, level: args.level + 1 });
    }
  }
  if (direction === "parents") {
    levels.reverse();
    levels.forEach((level, index) => {
      level.forEach((item) => {
        item.level = index;
      });
    });
  }
  return levels;
}

export { mergeParentSubtrees, mergeSubtrees };
//# sourceMappingURL=treeTransforms.js.map
