import { computed } from 'vue';
import { useFormLayoutOptions, isArray } from '@d-render/shared';

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
const useComponentSlots = (props, context) => {
  const _a = useFormLayoutOptions({ props, emit: context.emit }), { options, proxyValue, updateConfig } = _a, handler = __objRest(_a, ["options", "proxyValue", "updateConfig"]);
  const componentSlots = computed(() => {
    if (props.config.usingSlots) {
      return props.config.usingSlots.reduce((acc, name, idx) => {
        const slotConfig = options.value.find((v) => v.key === name);
        acc[name] = () => {
          var _a2;
          return context.slots.item(__spreadValues({ children: (_a2 = slotConfig == null ? void 0 : slotConfig.children) != null ? _a2 : [], optionIndex: idx, isShow: props.config._isShow }, handler));
        };
        return acc;
      }, {});
    }
    return options.value.reduce((acc, slotConfig, idx) => {
      if (isArray(slotConfig.children)) {
        console.log(slotConfig.children, "slotConfig.children");
        acc[slotConfig.key] = () => context.slots.item(__spreadValues({ children: slotConfig.children, optionIndex: idx, isShow: props.config._isShow }, handler));
      }
      return acc;
    }, {});
  });
  return { componentSlots, proxyValue };
};

export { useComponentSlots };
