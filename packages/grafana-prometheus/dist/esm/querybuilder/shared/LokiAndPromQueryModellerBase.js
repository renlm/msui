import { Registry } from '@grafana/data';
import { PromVisualQueryOperationCategory } from '../types.js';

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class LokiAndPromQueryModellerBase {
  constructor(getOperations) {
    __publicField(this, "operationsRegistry");
    __publicField(this, "categories", []);
    this.operationsRegistry = new Registry(getOperations);
  }
  setOperationCategories(categories) {
    this.categories = categories;
  }
  getOperationsForCategory(category) {
    return this.operationsRegistry.list().filter((op) => op.category === category && !op.hideFromList);
  }
  getAlternativeOperations(key) {
    return this.operationsRegistry.list().filter((op) => op.alternativesKey && op.alternativesKey === key);
  }
  getCategories() {
    return this.categories;
  }
  getOperationDef(id) {
    return this.operationsRegistry.getIfExists(id);
  }
  renderOperations(queryString, operations) {
    for (const operation of operations) {
      const def = this.operationsRegistry.getIfExists(operation.id);
      if (!def) {
        throw new Error(`Could not find operation ${operation.id} in the registry`);
      }
      queryString = def.renderer(operation, def, queryString);
    }
    return queryString;
  }
  renderBinaryQueries(queryString, binaryQueries) {
    if (binaryQueries) {
      for (const binQuery of binaryQueries) {
        queryString = `${this.renderBinaryQuery(queryString, binQuery)}`;
      }
    }
    return queryString;
  }
  renderBinaryQuery(leftOperand, binaryQuery) {
    let result = leftOperand + ` ${binaryQuery.operator} `;
    if (binaryQuery.vectorMatches) {
      result += `${binaryQuery.vectorMatchesType}(${binaryQuery.vectorMatches}) `;
    }
    return result + this.renderQuery(binaryQuery.query, true);
  }
  renderLabels(labels) {
    if (labels.length === 0) {
      return "";
    }
    let expr = "{";
    for (const filter of labels) {
      if (expr !== "{") {
        expr += ", ";
      }
      expr += `${filter.label}${filter.op}"${filter.value}"`;
    }
    return expr + `}`;
  }
  renderQuery(query, nested) {
    var _a, _b, _c;
    let queryString = `${(_a = query.metric) != null ? _a : ""}${this.renderLabels(query.labels)}`;
    queryString = this.renderOperations(queryString, query.operations);
    if (!nested && this.hasBinaryOp(query) && Boolean((_b = query.binaryQueries) == null ? void 0 : _b.length)) {
      queryString = `(${queryString})`;
    }
    queryString = this.renderBinaryQueries(queryString, query.binaryQueries);
    if (nested && (this.hasBinaryOp(query) || Boolean((_c = query.binaryQueries) == null ? void 0 : _c.length))) {
      queryString = `(${queryString})`;
    }
    return queryString;
  }
  hasBinaryOp(query) {
    return query.operations.find((op) => {
      const def = this.getOperationDef(op.id);
      return (def == null ? void 0 : def.category) === PromVisualQueryOperationCategory.BinaryOps;
    }) !== void 0;
  }
}

export { LokiAndPromQueryModellerBase };
//# sourceMappingURL=LokiAndPromQueryModellerBase.js.map
