import { v4 } from 'uuid';
import { cloneDeep, toUpperFirstCase, getFieldValue } from '@d-render/shared';
import { DRender } from 'd-render';

var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const isLayoutType = (type) => {
  return new DRender().isLayoutType(type);
};
const twoValueComponentList = [
  "dateRange",
  "timeRange",
  "numberRange",
  "resourceFormTable",
  "dataDictionary",
  "staff",
  "roleDictionary",
  "office",
  "formCountersignPerson",
  "role"
];
const threeValueComponentList = ["roleDictionary"];
const generateFieldKey = (type = "error") => {
  return `${type}_${v4().split("-")[0]}`;
};
const getCopyItem = (item) => {
  const result = cloneDeep(item);
  const type = item.config.type;
  const sign = generateFieldKey(type);
  result.id = sign;
  result.key = sign;
  if (twoValueComponentList.includes(type)) {
    result.config.otherKey = `other${toUpperFirstCase(sign)}`;
  }
  if (threeValueComponentList.includes(type)) {
    result.config.otherKey = [`other${toUpperFirstCase(sign)}`, `extra${toUpperFirstCase(sign)}`];
  }
  return result;
};
const getCopyLayout = (layout) => {
  var _a, _b;
  const newLayout = getCopyItem(layout);
  (_b = (_a = newLayout.config.options) == null ? void 0 : _a.forEach) == null ? void 0 : _b.call(_a, (option) => {
    const children = option.children || [];
    if (children.length > 0) {
      option.children = children.map(getCopyRow);
    }
  });
  return newLayout;
};
const getCopyTable = (table) => {
  var _a;
  const newTable = getCopyItem(table);
  const options = ((_a = newTable.config) == null ? void 0 : _a.options) || [];
  if ((options == null ? void 0 : options.length) > 0) {
    newTable.config.options = options.map(getCopyRow);
  }
  return newTable;
};
const getCopyRow = (row) => {
  var _a;
  const type = (_a = row.config) == null ? void 0 : _a.type;
  if (isLayoutType(type)) {
    return getCopyLayout(row);
  } else {
    return getCopyItem(row);
  }
};
const getTableItem = (item) => {
  const result = cloneDeep(item);
  const type = item.config.type;
  result.id = item.config.key;
  result.key = item.config.key;
  if (twoValueComponentList.includes(type)) {
    result.config.otherKey = `other${toUpperFirstCase(item.config.key)}`;
  }
  return result;
};
const depthFirstSearchTree = (list, value, key, drawTypeMap = {}) => {
  const searchTree = (tree, value2, key2) => {
    var _b, _c;
    if (!tree)
      return;
    if (getFieldValue(tree, key2) === value2) {
      const _a = tree, useObject = __objRest(_a, ["children"]);
      return [useObject];
    }
    const configType = (_b = tree.config) == null ? void 0 : _b.type;
    const type = (_c = drawTypeMap[configType]) != null ? _c : configType;
    const _children = isLayoutType(type) ? tree.config.children || tree.config.options : tree.children || tree.options;
    if (!_children)
      return;
    for (let i = 0, loop = _children.length; i < loop; i++) {
      const result = searchTree(_children[i], value2, key2);
      if (result) {
        const _d = tree, useObject = __objRest(_d, ["children"]);
        result.unshift(useObject);
        return result;
      }
    }
  };
  let _list = [];
  for (let i = 0, len = list.length; i < len; i++) {
    _list = searchTree(list[i], value, key) || [];
    if (_list.length)
      break;
  }
  return _list;
};

export { depthFirstSearchTree, generateFieldKey, getCopyItem, getCopyLayout, getCopyRow, getCopyTable, getTableItem, isLayoutType, threeValueComponentList, twoValueComponentList };
