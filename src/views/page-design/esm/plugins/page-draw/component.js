import { createVNode } from 'vue';

var component = {
  setup(props, {
    slots
  }) {
    return () => {
      var _a;
      return createVNode("div", {
        "class": [""]
      }, [createVNode("div", {
        "style": {
          height: "100%"
        }
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)])]);
    };
  }
};

export { component as default };
