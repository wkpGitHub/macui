import { configMapToList } from '@cip/utils/config-util';

const formConfigFieldConfigMap = {
  hideIndex: {
    type: "switch",
    label: "\u662F\u5426\u663E\u793A\u5E8F\u53F7",
    defaultValue: false
  },
  indexFixed: {
    type: "switch",
    label: "\u5E8F\u53F7\u662F\u5426\u56FA\u5B9A",
    defaultValue: true
  },
  showSummary: {
    type: "switch",
    label: "\u662F\u5426\u663E\u793A\u6C47\u603B",
    defaultValue: false
  },
  hideBorder: {
    type: "switch",
    label: "\u662F\u5426\u9690\u85CF\u8FB9\u6846",
    defaultValue: true
  },
  stripe: {
    type: "switch",
    label: "\u662F\u5426\u663E\u793A\u6591\u9A6C\u7EB9",
    defaultValue: true
  },
  tableColumnStatus: {
    type: "switch",
    label: "\u662F\u5426\u53EA\u8BFB",
    defaultValue: "readable",
    activeValue: "writable",
    inactiveValue: "readable"
  },
  height: {
    label: "\u8868\u683C\u9AD8\u5EA6",
    type: "number",
    defaultValue: 400
  }
};
const formConfigFieldConfigList = configMapToList(formConfigFieldConfigMap);

export { formConfigFieldConfigList, formConfigFieldConfigMap };
