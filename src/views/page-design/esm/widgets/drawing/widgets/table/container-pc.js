import { createVNode, createTextVNode } from 'vue';
import { ElFormItem } from 'element-plus';
import { CipButtonText } from '@xdp/button';

var containerPc = {
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
        "class": "table-design table-design--pc"
      }, {
        default: () => {
          var _a;
          return [!config.hideIndex && createVNode("div", {
            "class": "table-design__column table-design__column--index"
          }, [createVNode("div", {
            "class": "table-design__column__label"
          }, [createTextVNode("\u5E8F\u53F7")]), createVNode("div", {
            "class": "table-design__column__content"
          }, [createTextVNode("1")])]), createVNode("div", {
            "class": "table-design__drag-wrapper"
          }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]), !props.hideDelete && createVNode("div", {
            "class": "table-design__column table-design__column--operate"
          }, [createVNode("div", {
            "class": "table-design__column__label"
          }, [createTextVNode("\u64CD\u4F5C")]), createVNode("div", {
            "class": "table-design__column__content"
          }, [createVNode("div", null, [createVNode(CipButtonText, null, {
            default: () => [createVNode("i", {
              "class": "el-icon-circle-plus-outline cip-primary-color handler-size"
            }, null)]
          }), createVNode(CipButtonText, null, {
            default: () => [createVNode("i", {
              "class": "el-icon-remove-outline cip-danger-color handler-size"
            }, null)]
          })])])])];
        }
      });
    };
  }
};

export { containerPc as default };
