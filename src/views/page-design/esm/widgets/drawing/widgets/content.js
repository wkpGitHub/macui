import { defineComponent, inject, computed, createVNode, mergeProps, createTextVNode, defineAsyncComponent } from 'vue';
import { Rank, DocumentCopy, Delete } from '@element-plus/icons-vue';
import { ElIcon } from 'element-plus';
import { isLayoutType } from '../../../util';
import { useNamespace } from '@d-render/shared';
import { DR_DESIGN_KEY } from '../../../constant';

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var content = /* @__PURE__ */ defineComponent({
  props: {
    selectId: {
      type: [String, Number],
      default: ""
    },
    onClick: {
      type: Function,
      default: () => () => {
      }
    },
    onUpdateConfig: {
      type: Function,
      default: () => () => {
      }
    },
    onDelete: {
      type: Function,
      default: () => () => {
      }
    },
    onCopy: {
      type: Function,
      default: () => () => {
      }
    },
    onSelectItem: {
      type: Function,
      default: () => () => {
      }
    },
    element: {
      type: Object,
      default: () => ({})
    },
    showCopy: {
      type: Boolean,
      default: true
    },
    grid: Number,
    Component: {}
  },
  setup(props, {
    attrs
  }) {
    const ns = useNamespace("design-draw-content");
    const getFormContentComponent = (type2) => {
      return defineAsyncComponent(() => import(`./${type2}`));
    };
    const drDesign = inject(DR_DESIGN_KEY, {});
    const getComponentType = (element) => {
      var _a;
      const {
        config: {
          type: type2
        }
      } = element;
      const usingType = ((_a = drDesign.drawTypeMap) == null ? void 0 : _a[type2]) || type2;
      if (isLayoutType(usingType)) {
        return "layout";
      } else {
        return "item";
      }
    };
    const formContentProps = computed(() => {
      var _a, _b;
      return {
        isActive: props.selectId === props.element.id,
        fieldKey: props.element.key,
        selectId: props.selectId,
        config: __spreadProps(__spreadValues({}, (_b = (_a = props.element) == null ? void 0 : _a.config) != null ? _b : {}), {
          hideItem: false
        }),
        // 劫持 hideItem 强制修改为false //将背景色修改为红色
        showCopy: props.showCopy,
        "onUpdate:config": props.onUpdateConfig,
        onClick: props.onClick,
        onDelete: props.onDelete,
        onCopy: props.onCopy,
        grid: props.grid,
        onSelectItem: props.onSelectItem
      };
    });
    const itemFieldKey = computed(() => {
      const fieldKey = formContentProps.value.fieldKey;
      const otherKey = formContentProps.value.config.otherKey;
      const fieldKeyTotalName = [fieldKey].concat(otherKey).filter((v) => !!v).join("-");
      return fieldKeyTotalName;
    });
    const type = computed(() => getComponentType(props.element));
    const FormContent = computed(() => getFormContentComponent(type.value));
    const {
      entryElement,
      leaveElement,
      currentHoverId
    } = inject("designDrawing", {});
    const span = computed(() => {
      var _a;
      if (props.grid && ((_a = props.element.config) == null ? void 0 : _a.span)) {
        return props.grid < props.element.config.span ? props.grid : props.element.config.span;
      } else {
        return 1;
      }
    });
    return () => {
      var _a;
      var frameStyle = formContentProps.value.config.style
      return createVNode("div", mergeProps(props, attrs, {
        "class": [ns.b(), ns.e(type.value), formContentProps.value.config.class, {
          [ns.is("hover")]: currentHoverId.value === props.element.id,
          [ns.is("active")]: formContentProps.value.isActive,
          // 'is-active': formContentProps.value.isActive,
          [ns.m("hidden")]: (_a = props.element.config) == null ? void 0 : _a.hideItem
          // 'form-drawing--hidden': props.element.config?.hideItem
        }],
        "onMouseenter": () => {
          entryElement(props.element.id);
        },
        "onMouseleave": () => {
          leaveElement(props.element.id);
        },
        "style": {
          ...frameStyle,
          gridColumn: `span ${span.value || 1}`
        }
      }), [props.selectId === props.element.id && createVNode("span", {
        "class": "right-top item-field-key"
      }, [createTextVNode(" "), itemFieldKey.value]), createVNode(ElIcon, {
        "size": 22,
        "class": "show-focus handle-icon move-icon"
      }, {
        default: () => [createVNode(Rank, null, null)]
      }), createVNode("div", {
        "class": "right-bottom show-focus handle-icon"
      }, [props.Component && props.Component.map((icon) => createVNode(icon.Component, {
        "onClick": (e) => {
          e.stopPropagation();
          icon == null ? void 0 : icon.callback(props.element, e);
        }
      }, null)), formContentProps.value.showCopy && createVNode(ElIcon, {
        "onClick": (e) => {
          e.stopPropagation();
          formContentProps.value.onCopy(e);
        }
      }, {
        default: () => [createVNode(DocumentCopy, null, null)]
      }), createVNode(ElIcon, {
        "onClick": (e) => {
          e.stopPropagation();
          formContentProps.value.onDelete(e);
        }
      }, {
        default: () => [createVNode(Delete, null, null)]
      })]), createVNode(FormContent.value, formContentProps.value, null)]);
    };
  }
});

export { content as default };
