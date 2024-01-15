import { provide, reactive, createVNode, inject, ref, computed, createTextVNode } from 'vue';
import { DRender } from 'd-render';
import { ElIcon, ElTag } from 'element-plus';
import { CaretRight } from '@element-plus/icons-vue';
import { DR_DESIGN_KEY } from '../../constant';

const dRender = new DRender();
const isLayoutType = (type) => dRender.isLayoutType(type);
const CustomTree = {
  props: {
    list: Object,
    modelValue: [String, Number],
    isSub: Boolean
  },
  setup(props) {
    const pageDesign = inject(DR_DESIGN_KEY, {});
    return () => {
      var _a;
      return createVNode("div", {
        "class": {
          "structure-tree": !props.isSub,
          "structure-sub-tree": props.isSub
        }
      }, [(_a = props.list) == null ? void 0 : _a.map((item) => {
        var _a2, _b;
        const isLayout = isLayoutType((_b = (_a2 = pageDesign == null ? void 0 : pageDesign.drawTypeMap) == null ? void 0 : _a2[item.config.type]) != null ? _b : item.config.type);
        if (isLayout) {
          return createVNode(CustomTreeParent, {
            "modelValue": props.modelValue,
            "item": item
          }, null);
        }
        return createVNode(CustomTreeItem, {
          "modelValue": props.modelValue,
          "item": item
        }, null);
      })]);
    };
  }
};
const TreeTitle = {
  props: {
    title: String,
    subTitle: String,
    span: Number
  },
  setup(props) {
    const subTitle = computed(() => `{ ${props.subTitle} }`);
    return () => createVNode("span", {
      "class": "structure-tree__item__text"
    }, [props.title, props.span && createVNode(ElTag, {
      "size": "small",
      "type": "warning"
    }, {
      default: () => [createTextVNode(" "), props.span]
    }), createVNode("span", {
      "class": "structure-tree__item__status",
      "title": subTitle.value
    }, [subTitle.value])]);
  }
};
const CustomTreeParent = {
  props: {
    item: Object,
    modelValue: [String, Number]
  },
  setup(props) {
    const isExpand = ref(false);
    const toggleExpand = () => {
      isExpand.value = !isExpand.value;
    };
    const pageStructure = inject("page-structure", {});
    return () => createVNode("div", {
      "class": ["structure-sub-tree", {
        "is-expand": isExpand.value,
        "is-active": props.modelValue === props.item.id
      }]
    }, [createVNode("div", {
      "class": "structure-sub-tree__title",
      "onClick": (e) => {
        if (e.target === e.currentTarget) {
          pageStructure.onSelect(props.item);
        }
      }
    }, [createVNode(ElIcon, {
      "class": ["structure-sub-tree__title__icon", {
        "is-expand": isExpand.value
      }],
      "onClick": () => toggleExpand()
    }, {
      default: () => [createVNode(CaretRight, null, null)]
    }), createVNode(TreeTitle, {
      "title": props.item.config.type,
      "subTitle": props.item.key,
      "onClick": () => pageStructure.onSelect(props.item),
      "span": props.item.config.span
    }, null)]), createVNode("div", {
      "class": ["structure-sub-tree__panel", {
        "is-expand": isExpand.value
      }]
    }, [props.item.config.options.map((option, idx) => createVNode("div", {
      "key": `${option.key}-${idx}`
    }, [createVNode("div", null, [createVNode(CustomTree, {
      "isSub": true,
      "modelValue": props.modelValue,
      "list": option.children
    }, null)])]))])]);
  }
};
const CustomTreeItem = {
  props: {
    item: Object,
    modelValue: [String, Number]
  },
  setup(props) {
    const pageStructure = inject("page-structure", {});
    return () => createVNode("div", {
      "class": ["structure-tree__item", {
        "is-active": props.modelValue === props.item.id
      }],
      "onClick": () => pageStructure.onSelect(props.item)
    }, [createVNode(TreeTitle, {
      "title": props.item.config.type,
      "subTitle": props.item.key,
      "span": props.item.config.span
    }, null)]);
  }
};
var component = {
  inheritAttrs: false,
  props: {
    schema: Object,
    selectItem: Object
    // modelValue: [String, Number]
  },
  emits: ["update:selectItem"],
  setup(props, {
    emit
  }) {
    var _a;
    provide("page-structure", reactive({
      activeId: (_a = props.selectItem) == null ? void 0 : _a.id,
      onSelect: (item) => {
        emit("update:selectItem", item);
      }
    }));
    return () => {
      var _a2, _b;
      return createVNode("div", {
        "class": "page-design-structure"
      }, [createVNode(CustomTree, {
        "modelValue": (_a2 = props.selectItem) == null ? void 0 : _a2.id,
        "list": (_b = props.schema) == null ? void 0 : _b.list
      }, null)]);
    };
  }
};

export { component as default };
