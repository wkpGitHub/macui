import { createVNode } from 'vue';
import CipCodeMirror from '@cip/code-mirror';
import { isJson } from '@d-render/shared';

var component = {
  inheritAttrs: false,
  props: {
    schema: {}
  },
  emits: ["update:schema"],
  setup(props, {
    emit
  }) {
    return () => createVNode(CipCodeMirror, {
      "height": "100%",
      "modelValue": JSON.stringify(props.schema, null, 2),
      "onUpdate:modelValue": (v) => {
        if (isJson(v))
          emit("update:schema", JSON.parse(v));
      }
    }, null);
  }
};

export { component as default };
