import { createVNode, customRef } from 'vue';
import { CipForm } from 'd-render';
import { methodsConfigFieldList } from './config';

const useDeepComputed = ({
  get,
  set
}) => {
  return customRef((track, trigger) => {
    return {
      get() {
        track();
        return get();
      },
      set(newVal) {
        trigger();
        set(newVal);
      }
    };
  });
};
var index = {
  props: {
    modelValue: Object
  },
  emits: ["update:modelValue"],
  setup(props, {
    emit
  }) {
    const modelValue = useDeepComputed({
      get() {
        console.log(props.modelValue);
        return props.modelValue;
      },
      set(newVal) {
        emit("update:modelValue", newVal);
      }
    });
    return () => createVNode("div", {
      "style": "padding: 0 12px;"
    }, [createVNode(CipForm, {
      "model": modelValue.value,
      "onUpdate:model": ($event) => modelValue.value = $event,
      "fieldList": methodsConfigFieldList
    }, null)]);
  }
};

export { index as default };
