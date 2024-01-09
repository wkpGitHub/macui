import { createVNode, Fragment } from 'vue';
import ConfigTabs from './config-tabs/config-tabs';
import { ElScrollbar } from 'element-plus';

var index = {
  name: "DrDesignConfigure",
  props: {
    list: Array,
    active: String,
    selectItem: {},
    data: {}
  },
  emits: ["update:active"],
  setup(props, {
    slots,
    emit
  }) {
    return () => createVNode(Fragment, null, [createVNode(ConfigTabs, {
      "active": props.active,
      "onUpdate:active": (val) => {
        emit("update:active", val);
      },
      "list": props.list
    }, null), createVNode("div", {
      "class": "dr-configure-container"
    }, [createVNode(ElScrollbar, null, {
      default: () => [createVNode("div", {
        "style": "padding: 0 12px;"
      }, [slots.default()])]
    })])]);
  }
};

export { index as default };
