import { createVNode, isVNode } from 'vue';
import { ElIcon } from 'element-plus';
import { useNamespace } from '@d-render/shared';
import { PC, Mobile } from '../../svg';

function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
var index = {
  props: {
    modelValue: {}
  },
  emits: ["update:modelValue", "change"],
  setup(props, {
    emit
  }) {
    const ns = useNamespace("equipment-radio");
    const change = (value) => {
      emit("update:modelValue", value);
      emit("change", value);
    };
    const options = [{
      value: "pc",
      svg: PC
    }, {
      value: "mobile",
      svg: Mobile
    }];
    return () => createVNode("div", {
      "class": ns.b()
    }, [(options || []).map((option) => {
      let _slot;
      return createVNode("div", {
        "class": [ns.e("option"), {
          [ns.is("active")]: option.value === props.modelValue
        }],
        "onClick": () => change(option.value)
      }, [createVNode(ElIcon, null, _isSlot(_slot = option.svg.render()) ? _slot : {
        default: () => [_slot]
      })]);
    })]);
  }
};

export { index as default };
