import { createVNode, createTextVNode } from 'vue';
import { CipButtonText } from '@xdp/button';
import { Plus } from '@element-plus/icons-vue';
import { CipForm, CipFormItem } from 'd-render';

var __defProp = Object.defineProperty;
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
var mobile = {
  props: {
    model: {},
    schema: {},
    fieldKey: {},
    dependOnValues: {}
  },
  emit: ["add", "delete"],
  setup(props, {
    emit
  }) {
    const updateModelValue = (val, index) => {
      const data = props.model;
      data[index] = val;
      emit("update:model", data);
    };
    const handleAdd = () => {
      emit("add");
    };
    const handleDelete = (index) => {
      emit("delete", index);
    };
    const _a = props.schema || {}, {
      list = []
    } = _a; __objRest(_a, [
      "list"
    ]);
    return () => createVNode(CipForm, {
      "fieldList": [],
      "readonly": true,
      "class": "dr-table-preview--mobile"
    }, {
      default: () => [props.model.map((row, rowIndex) => createVNode("div", null, [list.map((col, colIndex) => {
        const inputConfig = __spreadValues({}, col.config);
        inputConfig.width = "100%";
        inputConfig.ruleKey = `${props.fieldKey}.${rowIndex}.${col.key}`;
        return createVNode("div", null, [createVNode(CipFormItem, {
          "key": `${rowIndex}-${colIndex}`,
          "model": row,
          "config": inputConfig,
          "inTable": true,
          "tableData": props.model,
          "tableDependOnValues": props.dependOnValues,
          "fieldKey": col.key,
          "onUpdate:model": (val) => {
            row = val;
            updateModelValue(val, rowIndex);
          }
        }, null)]);
      }), createVNode("div", {
        "class": "dr-table-preview--mobile__delete"
      }, [createVNode(CipButtonText, {
        "onClick": () => handleDelete(rowIndex)
      }, {
        default: () => [createTextVNode("\u5220\u9664")]
      })])])), createVNode("div", {
        "class": "dr-table-preview--mobile__add"
      }, [createVNode(CipButtonText, {
        "icon": Plus,
        "onClick": handleAdd
      }, {
        default: () => [createTextVNode("\u6DFB\u52A0")]
      })])]
    });
  }
};

export { mobile as default };
