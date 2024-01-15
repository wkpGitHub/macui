import { createVNode } from 'vue';
import { useNamespace } from '@d-render/shared';

var iphoneSix = {
  setup(props, {
    slots
  }) {
    const ns = useNamespace("device");
    return () => {
      var _a;
      return createVNode("div", {
        "class": [ns.b(), ns.m("ip6")]
      }, [createVNode("div", {
        "class": ns.e("sound")
      }, null), createVNode("div", {
        "class": ns.e("receiver")
      }, null), createVNode("div", {
        "class": ns.e("left-btn")
      }, null), createVNode("div", {
        "class": ns.e("right-btn")
      }, null), createVNode("div", {
        "class": ns.e("open-btn")
      }, null), createVNode("div", {
        "class": ns.e("screen")
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)])]);
    };
  }
};

export { iphoneSix as default };
