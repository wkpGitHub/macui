import { createVNode } from 'vue';
import { useNamespace } from '@d-render/shared';

var pc = {
  setup(props, {
    slots
  }) {
    const ns = useNamespace("device");
    return () => {
      var _a;
      return createVNode("div", {
        "class": [ns.b(), ns.m("pc")]
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
    };
  }
};

export { pc as default };
