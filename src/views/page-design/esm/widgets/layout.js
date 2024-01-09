import { createVNode } from 'vue';
import { ElScrollbar } from 'element-plus';
import { useNamespace } from '@d-render/shared';

var layout = {
  props: {
    navTitle: String,
    preview: {
      type: Boolean,
      default: void 0
    }
  },
  setup(props, {
    slots
  }) {
    const ns = useNamespace("design-layout");
    return () => {
      var _a, _b, _c, _d, _e, _f, _g;
      return createVNode("div", {
        "class": ns.b()
      }, [createVNode("div", {
        "class": ns.e("header")
      }, [createVNode("div", {
        "class": ns.e("title")
      }, [(_a = slots.title) == null ? void 0 : _a.call(slots)]), createVNode("div", {
        "class": ns.e("equipment")
      }, [(_b = slots.equipment) == null ? void 0 : _b.call(slots)]), createVNode("div", {
        "class": ns.e("handle")
      }, [(_c = slots.handle) == null ? void 0 : _c.call(slots)])]), !props.preview && createVNode("div", {
        "class": ns.e("main")
      }, [createVNode("div", {
        "class": ns.e("modules")
      }, [(_d = slots.modules) == null ? void 0 : _d.call(slots)]), createVNode("div", {
        "class": ns.e("nav")
      }, [createVNode("div", {
        "class": ns.e("nav__title")
      }, [props.navTitle]), createVNode("div", {
        "class": ns.e("nav__content")
      }, [createVNode(ElScrollbar, null, {
        default: () => {
          var _a2;
          return [(_a2 = slots.nav) == null ? void 0 : _a2.call(slots)];
        }
      })])]), createVNode("div", {
        "class": ns.e("content")
      }, [(_e = slots.content) == null ? void 0 : _e.call(slots)]), createVNode("div", {
        "class": ns.e("configure")
      }, [(_f = slots.configure) == null ? void 0 : _f.call(slots)])]), props.preview && createVNode("div", {
        "class": ns.e("preview")
      }, [(_g = slots.preview) == null ? void 0 : _g.call(slots)])]);
    };
  }
};

export { layout as default };
