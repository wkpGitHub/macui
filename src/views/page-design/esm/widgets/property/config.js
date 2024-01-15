import { configMapToList } from '@cip/utils/config-util';
import { DRender } from '@d-render/shared';

var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
const formConfigFieldConfigMap = {
  labelPosition: {
    type: "radio",
    label: "\u6807\u7B7E\u5BF9\u9F50\u65B9\u5F0F",
    options: [
      { label: "\u5DE6\u5BF9\u9F50", value: "left" },
      { label: "\u53F3\u5BF9\u9F50", value: "right" },
      { label: "\u9876\u90E8\u5BF9\u9F50", value: "top" }
    ],
    isButton: true,
    defaultValue: "right"
  },
  labelWidth: {
    type: "number",
    label: "\u8868\u5355\u6807\u7B7E\u5BBD\u5EA6",
    step: 10,
    min: 0
  },
  labelSuffix: {
    type: "switch",
    label: "\u662F\u5426\u6DFB\u52A0\u8868\u5355\u6807\u7B7E\u540E\u7F00",
    activeValue: "\uFF1A",
    inactiveValue: " ",
    defaultValue: "\uFF1A"
  },
  tableSize: {
    type: "radio",
    label: "\u7EC4\u4EF6\u5C3A\u5BF8",
    options: ["large", "default", "small"],
    isButton: true,
    defaultValue: "default"
  },
  grid: {
    type: "number",
    label: "\u5217\u603B\u6570",
    min: 1,
    max: 24
  }
};
const formConfigFieldConfigList = configMapToList(formConfigFieldConfigMap);
const dRender = new DRender();
const getComponentConfigure = (type) => __async(void 0, null, function* () {
  const { default: configure } = yield dRender.componentDictionary[type]("/configure")();
  return configure;
});

export { formConfigFieldConfigList, formConfigFieldConfigMap, getComponentConfigure };
