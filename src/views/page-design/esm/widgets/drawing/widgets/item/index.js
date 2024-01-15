import { ref, createVNode, Fragment, mergeProps } from 'vue';
import { CipFormItem } from 'd-render';
import { drawingContentProps } from '../common-props';
import { useFieldDrawingItem } from '../use-field-drawing-item';
import { useNamespace } from '@d-render/shared';

var index = {
  name: "FormDrawingItem",
  inheritAttrs: false,
  props: drawingContentProps,
  emits: ["delete", "copy"],
  setup(props, {
    emit,
    attrs
  }) {
    const ns = useNamespace("design-draw-content__item");
    const model = ref({});
    const {
      computedConfig,
      drawType
    } = useFieldDrawingItem({
      props,
      emit
    });
    return () => createVNode(Fragment, null, [createVNode("div", {
      "class": [ns.e("mask")]
    }, null), createVNode(CipFormItem, mergeProps(attrs, {
      "model": model.value,
      "style": {
        width: computedConfig.value.width
      },
      "isDesign": true,
      "drawType": drawType.value,
      "onUpdate:model": (val) => {
        model.value = val;
      },
      "fieldKey": props.fieldKey,
      "formLabelPosition": props.formLabelPosition,
      "config": computedConfig.value,
      "showTemplate": true
    }), null)]);
  }
};

export { index as default };
