import { createVNode } from 'vue';
import { CipFormRender } from 'd-render';

var component = {
  props: {
    schema: {},
    model: {},
    equipment: {}
  },
  setup(props, {
    emit
  }) {
    emit("update:model", {});
    return () => createVNode(CipFormRender, {
      "model": props.model,
      "onUpdate:model": (val) => emit("update:model", val),
      "schema": props.schema,
      "equipment": props.equipment
    }, null);
  }
};

export { component as default };
