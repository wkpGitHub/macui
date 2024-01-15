import { createVNode } from 'vue';
import { ElIcon } from 'element-plus';
import { useNamespace } from '@d-render/shared';

var modules = {
  props: {
    modelValue: String,
    modules: Array
  },
  emits: ["update:modelValue"],
  setup(props, {
    emit
  }) {
    const ns = useNamespace("design-modules");
    return () => createVNode("div", {
      "class": ns.e("wrapper")
    }, [props.modules.map((module) => createVNode("div", {
      "key": module.name,
      "class": [ns.e("item"), props.modelValue === module.name ? ns.is("active") : void 0],
      "onClick": () => {
        emit("update:modelValue", module.name);
      }
    }, [createVNode(ElIcon, {
      "style": "font-size: 18px;"
    }, {
      default: () => [module.icon]
    })]))]);
  }
};

export { modules as default };
