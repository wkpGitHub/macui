import { defineComponent, createVNode } from 'vue';
import ConfigTab from './config-tab';
import { useNamespace } from '@d-render/shared';

var configTabs = /* @__PURE__ */ defineComponent({
  props: {
    active: String,
    list: Array
  },
  emits: ["update:active"],
  setup(props, {
    emit
  }) {
    const ns = useNamespace("config-tabs");
    const activeGroup = (name) => {
      emit("update:active", name);
    };
    return () => createVNode("div", {
      "class": ns.b()
    }, [props.list.map((group) => createVNode(ConfigTab, {
      "key": group.name,
      "name": group.name,
      "class": [ns.e("item"), {
        [ns.is("active")]: group.name === props.active
      }],
      "is-active": group.name === props.active,
      "onClick": () => activeGroup(group.name)
    }, {
      default: () => [createVNode("div", {
        "class": [ns.e("title")]
      }, [group.title])]
    }))]);
  }
});

export { configTabs as default };
