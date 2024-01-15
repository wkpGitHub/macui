import { createVNode } from 'vue';
import { ElFormItem, ElSwitch } from 'element-plus';
import BaseConfig from './components/base-config';

var changeConfig = {
  props: {
    updateModel: Function,
    itemConfig: Object,
    dependOnList: Array,
    isCurrentInTable: Boolean
    // 当前字段是否为子表单内的字段
  },
  emits: ["updateConfig"],
  setup(props, {
    emit
  }) {
    const renderValues = (item) => {
      return createVNode("div", {
        "style": {
          flex: 1
        }
      }, [createVNode("br", null, null), createVNode(ElFormItem, {
        "label": "\u5B57\u6BB5\u7981\u7528"
      }, {
        default: () => [createVNode(ElSwitch, {
          "modelValue": item.config.disabled,
          "onUpdate:modelValue": ($event) => item.config.disabled = $event
        }, null)]
      }), createVNode(ElFormItem, {
        "label": "\u9690\u85CF\u6807\u9898"
      }, {
        default: () => [createVNode(ElSwitch, {
          "modelValue": item.config.hideLabel,
          "onUpdate:modelValue": ($event) => item.config.hideLabel = $event
        }, null)]
      }), createVNode(ElFormItem, {
        "label": "\u9690\u85CF\u6B64\u9879"
      }, {
        default: () => [createVNode(ElSwitch, {
          "modelValue": item.config.hideItem,
          "onUpdate:modelValue": ($event) => item.config.hideItem = $event
        }, null)]
      }), ["select", "role"].includes(props.itemConfig.type) && createVNode(ElFormItem, {
        "label": "\u591A\u9009"
      }, {
        default: () => [createVNode(ElSwitch, {
          "modelValue": item.config.multiple,
          "onUpdate:modelValue": ($event) => item.config.multiple = $event
        }, null)]
      })]);
    };
    return () => createVNode(BaseConfig, {
      "fnType": "config",
      "updateModel": props.updateModel,
      "itemConfig": props.itemConfig,
      "dependOnList": props.dependOnList,
      "isCurrentInTable": props.isCurrentInTable,
      "onUpdateConfig": (val) => emit("updateConfig", val)
    }, {
      renderValues
    });
  }
};

export { changeConfig as default };
