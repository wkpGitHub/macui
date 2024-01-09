import { defineComponent, createVNode, withModifiers } from 'vue';

var configTab = /* @__PURE__ */ defineComponent({
  props: {
    name: String
  },
  emits: ["onClick"],
  setup(props, {
    emit,
    slots
  }) {
    const emitClick = () => {
      emit("onClick", props.name);
    };
    return () => {
      var _a;
      return createVNode("div", {
        "onClick": withModifiers(emitClick, ["stop"])
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
    };
  }
});

export { configTab as default };
