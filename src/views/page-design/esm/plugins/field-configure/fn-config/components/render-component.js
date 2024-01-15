import { computed, createVNode } from 'vue';

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
var renderComponent = {
  props: {
    config: Object,
    Component: Object,
    value: {},
    otherValue: {}
  },
  emits: ["update:value", "update:otherValue"],
  setup(props, {
    emit
  }) {
    const config = computed(() => {
      if (["radio", "checkbox", "select", "dataDictionary"].includes(props.config.type)) {
        return __spreadProps(__spreadValues({}, props.config), {
          dependOn: []
        });
      }
      return props.config;
    });
    if (["roleDictionary"].includes(config.value.type)) {
      const onUpdate2 = (val) => {
        const values = val.map((v) => typeof v === "symbol" ? "" : v);
        emit("update:value", values[0]);
        emit("update:otherValue", values.slice(1));
      };
      return () => createVNode(props.Component, {
        "config": config.value,
        "values": [props.value, ...props.otherValue],
        "onStreamUpdate:model": onUpdate2
      }, null);
    }
    if (["dateRange", "timeRange", "numberRange"].includes(config.value.type)) {
      const onUpdate2 = (val) => {
        if (val.length < 2)
          return;
        emit("update:otherValue", val[1]);
      };
      const onUpdateValue = (val) => {
        emit("update:value", val);
      };
      return () => createVNode(props.Component, {
        "config": config.value,
        "modelValue": props.value,
        "onUpdate:modelValue": onUpdateValue,
        "otherValue": props.otherValue,
        "values": [props.value, props.otherValue],
        "onStreamUpdate:model": onUpdate2
      }, null);
    }
    const onUpdate = (val) => {
      if (typeof val[0] === "symbol" || typeof val[1] === "symbol") {
        emit("update:value", "");
        emit("update:otherValue", "");
        return;
      }
      emit("update:value", val[0]);
      emit("update:otherValue", val[1]);
    };
    return () => createVNode(props.Component, {
      "config": config.value,
      "modelValue": props.value,
      "otherValue": props.otherValue,
      "values": [props.value, props.otherValue],
      "onStreamUpdate:model": onUpdate
    }, null);
  }
};

export { renderComponent as default };
