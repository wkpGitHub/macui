import { computed, watch, ref, reactive, provide, createVNode, Fragment, createTextVNode } from 'vue';
import DeviceContainer from '../../widgets/device-container';
import { useNamespace } from '@d-render/shared';
import { CipButton } from '@xdp/button';
import { View } from '@element-plus/icons-vue';
import DesignLayout from '../../widgets/layout';
import DesignModules from '../../widgets/modules';
import EquipmentRadio from '../../widgets/equipment-radio';
import Property from '../../widgets/property';
import Drawing from '../../widgets/drawing';
import IframeContainer from './iframe-container';
import { useSelect } from '../../hooks/use-select';
import { useCompose } from '../../hooks/use-compose';
import { usePlugins } from '../../hooks/use-plugins';
import { depthFirstSearchTree } from '../../util';
import Breadcrumb from './breadcrumb';
import { DR_DESIGN_KEY } from '../../constant';

var index = {
  props: {
    schema: {},
    equipment: {},
    drawTypeMap: {},
    defaultModule: {},
    defaultConfigure: {},
    putStrategy: {},
    plugins: {
      type: Array,
      default: () => []
    }
  },
  emits: ["update:schema", "update:config", "update:equipment"],
  setup(props, {
    emit,
    slots
  }) {
    const ns = useNamespace("form-design");
    const {
      modules,
      configure,
      draw,
      preview,
      icon
    } = usePlugins(props.plugins);
    const [currentModuleName, asideModules] = useCompose(props, {
      activeKey: "defaultModule",
      custom: modules.map((v) => v.config)
    });
    const [currentTab, configTabs] = useCompose(props, {
      activeKey: "defaultConfigure",
      custom: configure.map((v) => v.config)
    });
    const {
      selectItem,
      selectItemId,
      changeSelect,
      updateSelectItem
    } = useSelect();
    const updateSchema = (schema) => {
      emit("update:schema", schema);
    };
    const updateList = (list) => {
      const schema = props.schema;
      schema.list = list;
      updateSchema(schema);
    };
    const updateEquipment = (equipment) => {
      emit("update:equipment", equipment);
    };
    const initSchema = () => ({
      list: [],
      // 组件渲染配置
      init: [],
      // 初始化时需要调用的methods
      methods: [],
      // 提供给当前页面使用的methods
      grid: 1
    });
    const navTitle = computed(() => {
      var _a;
      const item = (_a = asideModules.value.find((i) => i.name === currentModuleName.value)) != null ? _a : {};
      return item.title;
    });
    watch(() => props.schema, (val) => {
      if (!val) {
        updateSchema(initSchema());
      }
    }, {
      immediate: true
    });
    const isPreview = ref(false);
    const togglePreview = () => {
      isPreview.value = !isPreview.value;
    };
    const testModel = ref();
    const breadcrumb = computed(() => {
      var _a;
      return depthFirstSearchTree(((_a = props.schema) == null ? void 0 : _a.list) || [], selectItemId.value, "id", props.drawTypeMap) || [];
    });
    const drDesign = reactive({
      drawTypeMap: props.drawTypeMap,
      // 渲染组件转换对象
      schema: props.schema,
      // 渲染配置
      putStrategy: props.putStrategy,
      // 拖入配置
      path: breadcrumb
      // 当前组件路径
    });
    provide(DR_DESIGN_KEY, drDesign);
    return () => createVNode(DesignLayout, {
      "navTitle": navTitle.value,
      "class": [ns.b()],
      "preview": isPreview.value
    }, {
      title: () => {
        var _a;
        return (_a = slots.title) == null ? void 0 : _a.call(slots);
      },
      equipment: () => createVNode(EquipmentRadio, {
        "modelValue": props.equipment,
        "onUpdate:modelValue": updateEquipment
      }, null),
      handle: () => {
        var _a, _b;
        return createVNode(Fragment, null, [!isPreview.value && createVNode(Fragment, null, [(_a = slots.preHandle) == null ? void 0 : _a.call(slots), createVNode(CipButton, {
          "type": "primary",
          "icon": View,
          "onClick": () => {
            togglePreview();
          }
        }, {
          default: () => [createTextVNode("\u9884\u89C8")]
        }), (_b = slots.handle) == null ? void 0 : _b.call(slots)]), isPreview.value && createVNode(CipButton, {
          "type": "primary",
          "onClick": () => {
            togglePreview();
          }
        }, {
          default: () => [createTextVNode("\u7F16\u8F91")]
        })]);
      },
      modules: () => createVNode(DesignModules, {
        "modelValue": currentModuleName.value,
        "onUpdate:modelValue": ($event) => currentModuleName.value = $event,
        "modules": asideModules.value
      }, null),
      nav: () => {
        var _a;
        return createVNode(Fragment, null, [modules.map((module) => {
          var _a2;
          const {
            Component,
            config
          } = module;
          return config.name === currentModuleName.value && createVNode(Component, {
            "key": config.name,
            "data": (_a2 = module.options) == null ? void 0 : _a2.data,
            "selectItem": selectItem.value,
            "onUpdate:selectItem": (val) => {
              selectItem.value = val;
            },
            "schema": props.schema,
            "onUpdate:schema": updateSchema
          }, null);
        }), (_a = slots.nav) == null ? void 0 : _a.call(slots, {
          name: currentModuleName.value
        })]);
      },
      content: () => createVNode(Fragment, null, [createVNode(Breadcrumb, {
        "list": breadcrumb.value,
        "draw": draw,
        "onItemClick": (item) => selectItem.value = item
      }, null), createVNode(Drawing, {
        "Component": draw.Component,
        "handleIconComponent": icon,
        "equipment": props.equipment,
        "data": props.schema,
        "selectId": selectItemId.value,
        "onSelect": (item) => changeSelect(item),
        "onUpdateList": (list) => {
          updateList(list);
        }
      }, null)]),
      configure: () => createVNode(Property, {
        "active": currentTab.value,
        "onUpdate:active": ($event) => currentTab.value = $event,
        "selectItem": selectItem.value,
        "data": props.schema,
        "onUpdate:selectItem": (val) => updateSelectItem(val, true),
        "list": configTabs.value
      }, {
        default: () => {
          var _a;
          return [configure.map((conf) => {
            const {
              config,
              Component
            } = conf;
            return config.name === currentTab.value && createVNode(Component, {
              "key": config.name,
              "schema": props.schema,
              "onUpdate:schema": updateSchema,
              "selectItem": selectItem.value,
              "onUpdate:selectItem": ($event) => selectItem.value = $event
            }, null);
          }), (_a = slots.configure) == null ? void 0 : _a.call(slots, {
            name: currentTab.value,
            selectItem,
            updateSelectItem
          })];
        }
      }),
      preview: () => createVNode(DeviceContainer, {
        "type": "preview",
        "equipment": props.equipment
      }, {
        default: () => [props.equipment === "pc" && createVNode("div", {
          "class": ns.e("preview"),
          "style": {}
        }, [createVNode(preview.Component, {
          "model": testModel.value,
          "onUpdate:model": ($event) => testModel.value = $event,
          "schema": props.schema,
          "equipment": props.equipment
        }, null)]), props.equipment === "mobile" && createVNode(IframeContainer, null, {
          default: () => [createVNode(preview.Component, {
            "model": testModel.value,
            "onUpdate:model": ($event) => testModel.value = $event,
            "schema": props.schema,
            "equipment": props.equipment
          }, null)]
        })]
      })
    });
  }
};

export { index as default };
