import { createVNode, createTextVNode } from 'vue';
import { ElFormItem } from 'element-plus';

var containerMobile = {
  props: {
    config: Object,
    hideDelete: {
      type: Boolean,
      default: false
    }
  },
  setup(props, {
    slots
  }) {
    return () => {
      const config = props.config;
      return createVNode(ElFormItem, {
        "label": config.hideLabel === true ? "" : config.label,
        "class": "table-design table-design--m"
      }, {
        default: () => {
          var _a;
          return [!config.hideIndex && createVNode("div", {
            "class": "table-design__index"
          }, [createTextVNode("1")]), createVNode("div", {
            "class": "table-design__drag-wrapper"
          }, [(_a = slots.default) == null ? void 0 : _a.call(slots)])];
        }
      });
    };
  }
};

export { containerMobile as default };
