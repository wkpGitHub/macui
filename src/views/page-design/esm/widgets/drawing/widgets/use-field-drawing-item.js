import { inject, computed } from 'vue';
import { DR_DESIGN_KEY } from '../../../constant';

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
const useFieldDrawingItem = ({ props, emit }) => {
  const pageDesign = inject(DR_DESIGN_KEY, {});
  const computedConfig = computed(() => {
    let result = props.config || {};
    if (result.drawType) {
      result = __spreadProps(__spreadValues({}, result), { type: result.drawType });
    }
    return result;
  });
  const drawType = computed(() => {
    var _a;
    return (_a = pageDesign.drawTypeMap) == null ? void 0 : _a[computedConfig.value.type];
  });
  const deleteItem = (e) => {
    emit("delete");
    e.stopPropagation();
  };
  const copyItem = (e) => {
    emit("copy");
    e.stopPropagation();
  };
  const putStrategy = pageDesign.putStrategy || {};
  return {
    computedConfig,
    deleteItem,
    copyItem,
    drawType,
    putStrategy
  };
};

export { useFieldDrawingItem };
