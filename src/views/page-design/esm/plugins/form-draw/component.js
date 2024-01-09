import { createVNode } from 'vue';
import { CipForm } from 'd-render';

var component = {
  setup(props, {
    slots
  }) {
    return () => createVNode(CipForm, null, {
      default: () => {
        var _a;
        return [(_a = slots.default) == null ? void 0 : _a.call(slots)];
      }
    });
  }
};

export { component as default };
