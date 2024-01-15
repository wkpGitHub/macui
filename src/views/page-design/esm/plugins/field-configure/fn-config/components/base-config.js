import { ref, computed, createVNode, Fragment, createTextVNode, isVNode, defineAsyncComponent, nextTick } from 'vue';
import { ElForm, ElIcon, ElFormItem, ElInput } from 'element-plus';
import LSelect from './select';
import { RemoveFilled, Plus, Minus } from '@element-plus/icons-vue';
import CipButtonText from '@cip/components/cip-button-text';
import CipDialog from '@cip/components/cip-dialog';
import { cloneDeep, DRender } from '@d-render/shared';
import RenderComponent from './render-component';
import { logicSign, signs, multipleSign } from '../config';
import { parseValueFn, parseConfigFn } from '../util';

var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
var baseConfig = {
  props: {
    fnType: String,
    // value：修改值, config：修改配置
    updateModel: Function,
    itemConfig: Object,
    dependOnList: Array,
    isCurrentInTable: Boolean
    // 当前字段是否为子表单内的字段
  },
  emits: ["updateConfig"],
  setup(props, {
    emit,
    slots
  }) {
    var _a;
    const visible = ref(false);
    const defaultConfig = {
      value: "",
      otherValue: "",
      config: {},
      conditions: [{
        source: "",
        sourceOtherKey: "",
        sign: "===",
        target: "",
        targetOtherValue: "",
        logic: "&&",
        type: "input",
        isInTable: false
        // 是否是子表单字段
      }]
    };
    const dependOnListOptions = computed(() => {
      var _a2, _b, _c, _d;
      return (_d = (_c = (_b = (_a2 = props.dependOnList) == null ? void 0 : _a2.filter) == null ? void 0 : _b.call(_a2, (dep) => {
        var _a3, _b2;
        return (_b2 = (_a3 = props.itemConfig.dependOn) == null ? void 0 : _a3.includes) == null ? void 0 : _b2.call(_a3, dep == null ? void 0 : dep.key);
      })) == null ? void 0 : _c.map) == null ? void 0 : _d.call(_c, ({
        key,
        config: config2 = {}
      }) => __spreadValues({
        value: key,
        label: `${config2 == null ? void 0 : config2.label}(${key})`
      }, config2));
    });
    const getInitConfig = () => {
      var _a2, _b, _c, _d;
      if (props.fnType === "value") {
        return (_b = (_a2 = props.itemConfig) == null ? void 0 : _a2.valueChangeConfig) != null ? _b : [cloneDeep(defaultConfig)];
      } else {
        return (_d = (_c = props.itemConfig) == null ? void 0 : _c.configChangeConfig) != null ? _d : [cloneDeep(defaultConfig)];
      }
    };
    const config = ref(cloneDeep(getInitConfig()));
    const addConfig = () => {
      config.value.push(cloneDeep(defaultConfig));
    };
    const removeConfig = (index) => {
      config.value.splice(index, 1);
    };
    const dRender = new DRender();
    const componentDictionary = dRender.componentDictionary;
    const components = {};
    const getComponents = () => {
      for (const key of Object.keys(componentDictionary)) {
        components[key] = defineAsyncComponent(() => {
          var _a2;
          const component = (_a2 = componentDictionary[key]) != null ? _a2 : componentDictionary.input;
          return component("/index")();
        });
      }
    };
    getComponents();
    const renderLogic = (condition) => createVNode(LSelect, {
      "modelValue": condition.logic,
      "onUpdate:modelValue": ($event) => condition.logic = $event,
      "config": {
        options: logicSign,
        clearable: false
      }
    }, null);
    const renderSign = ({
      type,
      sign,
      multiple
    }) => {
      let signOptions;
      if (type === "checkbox" || multiple) {
        signOptions = multipleSign;
      } else if (["number", "slider", "rate"].includes(type)) {
        signOptions = signs;
      } else {
        signOptions = signs.slice(0, 2);
      }
      return createVNode(LSelect, {
        "modelValue": sign,
        "onUpdate:modelValue": ($event) => sign = $event,
        "config": {
          options: signOptions,
          clearable: false
        }
      }, null);
    };
    const onSourceChange = (val, condition) => {
      const selectItem = dependOnListOptions.value.find((i) => i.value === val);
      const {
        type = "input",
        isInTable = false,
        otherKey,
        multiple
      } = selectItem;
      condition.type = type;
      condition.isInTable = isInTable;
      condition.sourceOtherKey = otherKey;
      condition.target = type === "switch" ? true : "";
      condition.targetOtherValue = "";
      condition.multiple = multiple;
      condition.hide = true;
      nextTick(() => {
        condition.hide = false;
      });
    };
    const renderSource = (condition) => createVNode(LSelect, {
      "modelValue": condition.source,
      "onUpdate:modelValue": ($event) => condition.source = $event,
      "onChange": (val) => {
        onSourceChange(val, condition);
      },
      "config": {
        options: dependOnListOptions.value,
        clearable: false,
        placeholder: "\u8BF7\u9009\u62E9\u6570\u636E\u4F9D\u8D56"
      }
    }, null);
    const renderTarget = (condition) => {
      var _a2, _b;
      const {
        source
      } = condition;
      if (!source) {
        return createVNode(ElInput, {
          "modelValue": condition.target,
          "onUpdate:modelValue": ($event) => condition.target = $event
        }, null);
      }
      const sourceItem = (_b = (_a2 = props.dependOnList) == null ? void 0 : _a2.filter) == null ? void 0 : _b.call(_a2, (dep) => dep.key === source)[0];
      const {
        config: config2
      } = sourceItem;
      const TargetComponent = components[config2.type];
      return createVNode(RenderComponent, {
        "config": config2,
        "Component": TargetComponent,
        "value": condition.target,
        "onUpdate:value": ($event) => condition.target = $event,
        "otherValue": condition.targetOtherValue,
        "onUpdate:otherValue": ($event) => condition.targetOtherValue = $event
      }, null);
    };
    const addCondition = (item) => {
      item.conditions.push({
        source: "",
        sign: "===",
        target: "",
        targetOtherValue: "",
        logic: "&&"
      });
    };
    const removeCondition = (item, index) => {
      item.conditions.splice(index, 1);
    };
    const renderConditions = (item) => {
      return item.conditions.map((condition, index) => createVNode("div", {
        "class": "change-value-box__row",
        "key": index
      }, [item.conditions.length > 1 && index > 0 && createVNode("div", {
        "class": "cvb-logic"
      }, [renderLogic(condition)]), createVNode("div", {
        "class": {
          "cvb-source": true,
          "no-logic": index === 0
        }
      }, [renderSource(condition)]), createVNode("div", {
        "class": "cvb-sign"
      }, [renderSign(condition)]), createVNode("div", {
        "class": "cvb-target"
      }, [!condition.hide && renderTarget(condition)]), createVNode("div", {
        "class": "cvb-opt"
      }, [createVNode(CipButtonText, {
        "onClick": () => addCondition(item)
      }, {
        default: () => [createVNode(ElIcon, null, {
          default: () => [createVNode(Plus, null, null)]
        })]
      }), item.conditions.length > 1 && createVNode(CipButtonText, {
        "onClick": () => removeCondition(item, index)
      }, {
        default: () => [createVNode(ElIcon, null, {
          default: () => [createVNode(Minus, null, null)]
        })]
      })])]));
    };
    const renderSelect = (item) => {
      var _a2;
      const _options = Object.entries(((_a2 = item.conditions[0]) == null ? void 0 : _a2.targetOtherValue) || {}).map((item2) => {
        const [key, value] = item2;
        return {
          label: key,
          value: key
        };
      });
      const _config = {
        type: "select",
        options: _options
      };
      const TargetComponent = components[_config.type];
      return createVNode(RenderComponent, {
        "config": _config,
        "Component": TargetComponent,
        "value": item.value,
        "onUpdate:value": ($event) => item.value = $event,
        "otherValue": item.otherValue,
        "onUpdate:otherValue": ($event) => item.otherValue = $event
      }, null);
    };
    const renderValues = (item) => {
      if (autoSelect.value) {
        item.autoSelect = true;
        return renderSelect(item);
      } else {
        item.autoSelect = false;
      }
      const _config = cloneDeep(props.itemConfig);
      const TargetComponent = components[_config.type];
      return createVNode(RenderComponent, {
        "config": _config,
        "Component": TargetComponent,
        "value": item.value,
        "onUpdate:value": ($event) => item.value = $event,
        "otherValue": item.otherValue,
        "onUpdate:otherValue": ($event) => item.otherValue = $event
      }, null);
    };
    const renderer = (_a = slots.renderValues) != null ? _a : renderValues;
    const onConfirm = (resolve, reject) => {
      props.updateModel(config.value);
      const fnStr = props.fnType === "value" ? parseValueFn({
        config: config.value,
        isCurrentInTable: props.isCurrentInTable,
        currOtherKey: props.itemConfig.otherKey
      }) : parseConfigFn({
        config: config.value,
        isCurrentInTable: props.isCurrentInTable,
        currOtherKey: props.itemConfig.otherKey
      });
      emit("updateConfig", fnStr);
      resolve();
    };
    const onCancel = () => {
      config.value = cloneDeep(getInitConfig());
    };
    const autoSelect = computed(() => {
      var _a2;
      const _dependOn = ((_a2 = props.itemConfig) == null ? void 0 : _a2.dependOn) || [];
      const _dependOnList = (props == null ? void 0 : props.dependOnList) || [];
      const isAutoSelect = _dependOnList.reduce((flag, current) => {
        var _a3;
        if (_dependOn.includes(current.id) && ((_a3 = current.config) == null ? void 0 : _a3.withObject)) {
          flag = true;
        }
        return flag;
      }, false);
      return isAutoSelect;
    });
    return () => createVNode(Fragment, null, [createVNode(CipButtonText, {
      "onClick": () => {
        visible.value = true;
      }
    }, {
      default: () => [createTextVNode("\u914D\u7F6E")]
    }), createVNode(CipDialog, {
      "title": "\u4F9D\u8D56\u6570\u636E\u503C\u53D8\u52A8\u4FEE\u6539\u503C",
      "class": "change-value",
      "modelValue": visible.value,
      "onUpdate:modelValue": ($event) => visible.value = $event,
      "onConfirm": onConfirm,
      "onCancel": onCancel
    }, {
      default: () => [createVNode(ElForm, {
        "labelWidth": 90,
        "labelPosition": "left"
      }, {
        default: () => [config.value.map((item, index) => {
          let _slot, _slot2;
          return createVNode("div", {
            "class": "change-value-box",
            "key": index
          }, [createVNode(ElIcon, {
            "class": "cvb-rm",
            "onClick": () => removeConfig(index)
          }, {
            default: () => [createVNode(RemoveFilled, null, null)]
          }), createVNode(ElFormItem, {
            "label": "\u5982\u679C"
          }, _isSlot(_slot = renderConditions(item)) ? _slot : {
            default: () => [_slot]
          }), createVNode(ElFormItem, {
            "label": props.fnType === "value" ? "\u5219\u4FEE\u6539\u503C\u4E3A" : "\u5219\u4FEE\u6539\u914D\u7F6E"
          }, _isSlot(_slot2 = renderer(item)) ? _slot2 : {
            default: () => [_slot2]
          })]);
        }), createVNode(CipButtonText, {
          "onClick": addConfig
        }, {
          default: () => [createTextVNode("\u6DFB\u52A0\u6761\u4EF6")]
        })]
      })]
    })]);
  }
};

export { baseConfig as default };
