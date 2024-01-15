import { createVNode } from 'vue';
import { CipTableRender } from 'd-render';

var component = {
  props: {
    schema: {},
    model: {},
    equipment: {}
  },
  emits: ["update:model"],
  setup(props, {
    emit
  }) {
    emit("update:model", []);
    return () => createVNode(CipTableRender, {
      "schema": props.schema,
      "equipment": props.equipment,
      "model": props.model,
      "class": "dr-table-preview"
    }, null);
  }
};

export { component as default };
