import { createVNode } from 'vue';
import { CipForm } from 'd-render';
import { formFieldList } from './config';

var index = {
  props: {
    modelValue: Object
  },
  emits: ["update:modelValue"],
  setup(props, {
    emit
  }) {
    return () => createVNode("div", null, [createVNode(CipForm, {
      "model": props.modelValue,
      "onUpdate:model": (val) => emit("update:modelValue", val),
      "fieldList": formFieldList
    }, null)]);
  }
};

export { index as default };
