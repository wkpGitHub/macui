import { provide, ref, watch, nextTick, createVNode } from 'vue';
import { CipForm } from 'd-render';
import { getComponentConfigure } from './config';
import { defaultConfigureOptions, generateFieldList, configureOptionsFieldConfigMap } from '@d-render/shared';

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
var component = {
  name: "DrDesignFieldConfig",
  inheritAttrs: false,
  props: {
    selectItem: {
      type: Object,
      default: () => ({})
    },
    schema: Object
  },
  emits: ["update:selectItem"],
  setup(props, {
    emit
  }) {
    provide("getSchema", () => props.schema);
    const configBridge = ref({});
    watch(() => props.selectItem, (val) => {
      if (!(val == null ? void 0 : val.key))
        return;
      configBridge.value = val.config;
      configBridge.value.key = val.key;
      configBridge.value.id = val.id;
    }, {
      immediate: true,
      deep: true
    });
    const getFieldComponentConfigureFieldConfigList = (val) => __async(this, null, function* () {
      let configure;
      try {
        configure = yield getComponentConfigure(val);
      } catch (e) {
        console.warn(`form-design: \u83B7\u53D6${val}\u7EC4\u4EF6\u914D\u7F6E\u6587\u4EF6\u53D1\u751F\u9519\u8BEF,\u4F7F\u7528\u9ED8\u8BA4\u914D\u7F6E\u8FDB\u884C\u66FF\u6362`);
        configure = defaultConfigureOptions();
      }
      return generateFieldList(configure, configureOptionsFieldConfigMap);
    });
    const fieldComponentConfigureFieldConfigList = ref([]);
    watch(() => configBridge.value.type, (val) => {
      if (val) {
        fieldComponentConfigureFieldConfigList.value = [];
        getFieldComponentConfigureFieldConfigList(val).then((res) => {
          nextTick().then(() => {
            fieldComponentConfigureFieldConfigList.value = res;
          });
        });
      } else {
        return [];
      }
    }, {
      immediate: true
    });
    const updateSelectItem = (val) => {
      const selectItem = props.selectItem;
      selectItem.key = val.key;
      Reflect.deleteProperty(val, "key");
      Reflect.deleteProperty(val, "id");
      selectItem.config = val;
      emit("update:selectItem", selectItem);
    };
    return () => createVNode(CipForm, {
      "labelPosition": "top",
      "model": configBridge.value,
      "onUpdate:model": updateSelectItem,
      "fieldList": fieldComponentConfigureFieldConfigList.value,
      "modelKey": "id"
    }, null);
  }
};

export { component as default };
