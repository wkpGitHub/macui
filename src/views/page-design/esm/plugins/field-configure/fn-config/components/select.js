import { createVNode, isVNode } from 'vue';
import { ElSelect, ElOption } from 'element-plus';

function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
var select = {
  name: "LSelect",
  props: {
    modelValue: {},
    config: Object
  },
  emits: ["update:modelValue"],
  setup(props, {
    emit
  }) {
    return () => {
      var _a;
      let _slot;
      return createVNode(ElSelect, {
        "modelValue": props.modelValue,
        "clearable": (_a = props.config.clearable) != null ? _a : true,
        "onUpdate:modelValue": (val) => emit("update:modelValue", val)
      }, _isSlot(_slot = props.config.options.map((option) => createVNode(ElOption, {
        "key": option.value,
        "value": option.value,
        "label": option.value
      }, null))) ? _slot : {
        default: () => [_slot]
      });
    };
  }
};

export { select as default };
