import { computed, createVNode, h } from 'vue';
import VueDraggable from 'vuedraggable';
import { useFormInject, getNextItem, isEmptyObject } from '@d-render/shared';
import FormDrawingContent from '../content';
import TableContainer from './container';
import { drawingContentProps } from '../common-props';
import { getCopyRow } from '../../../../util';

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
var index = {
  inheritAttrs: false,
  props: drawingContentProps,
  setup(props, {
    emit
  }) {
    const cipForm = useFormInject();
    const isMobile = computed(() => cipForm.equipment === "mobile");
    const options = computed(() => {
      return props.config.options || [];
    });
    const updateConfig = (val) => {
      emit("update:config", val);
    };
    const updateOptions = (options2) => {
      const config = props.config;
      config.options = options2.map((option) => {
        const width = option.config.width !== void 0 ? option.config.width : "200px";
        return __spreadProps(__spreadValues({}, option), {
          config: __spreadProps(__spreadValues({}, option.config), {
            width,
            writable: true
          })
        });
      });
      updateConfig(config);
    };
    const addOption = ({
      newIndex
    }) => {
      const newItem = options.value[newIndex];
      emit("selectItem", newItem);
    };
    const selectOption = (element) => {
      emit("selectItem", element);
    };
    const deleteOption = (index) => {
      const config = props.config;
      const nextItem = getNextItem(config.options, index);
      if (!isEmptyObject(nextItem)) {
        selectOption(nextItem);
      } else {
        selectOption(props.config);
      }
      config.options.splice(index, 1);
      updateConfig(config);
    };
    const copyOption = (index) => {
      const config = props.config;
      const newRow = getCopyRow(config.options[index]);
      config.options.splice(index + 1, 0, newRow);
      updateConfig(config);
      selectOption(newRow);
    };
    const judgePut = (...val) => {
      var _a;
      const dom = (_a = val == null ? void 0 : val[2]) != null ? _a : {};
      return !dom.classList.contains("disabled-table");
    };
    const FormContent = (...args) => {
      const {
        element,
        index
      } = args[0];
      const formContentProps = {
        selectId: props.selectId,
        element,
        index,
        formLabelPosition: props.formLabelPosition,
        // formLabelPosition: props.data.formLabelPosition,
        onUpdateConfig: (val) => {
          updateConfig(element);
        },
        onClick: (e) => {
          e.stopPropagation();
          selectOption(element);
        },
        onDelete: () => deleteOption(index),
        onCopy: () => copyOption(index),
        onSelectItem: (element2) => selectOption(element2)
      };
      return h(FormDrawingContent, __spreadValues({}, formContentProps));
    };
    return () => createVNode("div", {
      "class": "form-drawing__table__main"
    }, [createVNode(TableContainer, {
      "config": props.config
    }, {
      default: () => [createVNode(VueDraggable, {
        "modelValue": options.value,
        "onUpdate:modelValue": (val) => updateOptions(val),
        "group": {
          name: "components",
          put: judgePut
        },
        "handle": ".move-icon",
        "ghostClass": "ghost",
        "animation": 200,
        "itemKey": "id",
        "componentData": {
          class: "form-table-columns",
          style: {
            display: isMobile.value ? "block" : "flex"
          }
        },
        "onAdd": (val) => addOption(val)
      }, {
        item: FormContent
      })]
    })]);
  }
};

export { index as default };
