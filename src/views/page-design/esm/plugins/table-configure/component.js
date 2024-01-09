import { createVNode } from 'vue';
import { formConfigFieldConfigList } from './config';
import { CipForm } from 'd-render';

var component = {
  name: "DrTableConfig",
  inheritAttrs: false,
  props: {
    schema: Object
  },
  setup(props) {
    return () => createVNode(CipForm, {
      "labelPosition": "top",
      "model": props.schema,
      "fieldList": formConfigFieldConfigList
    }, null);
  }
};

export { component as default };
