import { ref, createVNode, mergeProps } from 'vue';
import BasicDesign from '../basic';
import { PalettePlugin, StructurePlugin, CodeSourcePlugin, FieldConfigurePlugin, FormConfigurePlugin, FormDrawPlugin, FormPreviewPlugin } from '../../plugins';

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
var index = {
  name: "DrFormDesign",
  props: {
    componentsGroupList: Object,
    schema: Object,
    equipment: String,
    drawTypeMap: Object,
    defaultModule: String,
    defaultConfigure: String,
    putStrategy: Object,
    plugins: {
      type: Array,
      default: () => []
    }
  },
  emits: ["update:schema"],
  setup(props, {
    slots,
    emit
  }) {
    const defaultPlugin = [new PalettePlugin({
      data: props.componentsGroupList
    }), new StructurePlugin(), new CodeSourcePlugin(), new FieldConfigurePlugin(), new FormConfigurePlugin(), new FormDrawPlugin(), new FormPreviewPlugin()];
    const equipment = ref("pc");
    const pluginBridge = defaultPlugin.concat(props.plugins);
    return () => {
      const _a = props, designProps = __objRest(_a, [
        "plugins",
        "componentsGroupList"
      ]);
      return createVNode(BasicDesign, mergeProps(designProps, {
        "equipment": equipment.value,
        "onUpdate:equipment": ($event) => equipment.value = $event,
        "onUpdate:schema": (val) => emit("update:schema", val),
        "plugins": pluginBridge
      }), slots);
    };
  }
};

export { index as default };
