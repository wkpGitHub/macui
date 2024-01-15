import { defineComponent, openBlock, createElementBlock, normalizeClass, createElementVNode, createTextVNode, toDisplayString } from 'vue';
import { useNamespace } from '@d-render/shared';

var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

const _sfc_main = defineComponent({
  name: 'FormComponentItem',
  props: {
    item: Object
  },
  setup () {
    const ns = useNamespace('component-group-item');
    return {
      ns
    }
  }
});

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("li", {
    class: normalizeClass([_ctx.ns.b(), _ctx.item.class])
  }, [
    createElementVNode("a", null, [
      createElementVNode("i", {
        class: normalizeClass([_ctx.ns.e('icon'), _ctx.item.icon])
      }, null, 2 /* CLASS */),
      createTextVNode(" " + toDisplayString(_ctx.item.label), 1 /* TEXT */)
    ])
  ], 2 /* CLASS */))
}
var item = /*#__PURE__*/_export_sfc(_sfc_main, [['render',_sfc_render],['__file',"/Users/lsraphel/worksapce-cci/d-render/packages/design/src/plugins/palette/component-group/item.vue"]]);

export { item as default };
