import { defineComponent, resolveComponent, openBlock, createElementBlock, normalizeClass, createElementVNode, toDisplayString, createCommentVNode, createVNode, withCtx } from 'vue';
import VueDraggable from 'vuedraggable';
import FormComponentItem from './item';
import { useNamespace, getCopyRow } from '@d-render/shared';

var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

const _sfc_main = defineComponent({
  components: { VueDraggable, FormComponentItem },
  props: {
    group: Object
  },
  emits: ['add'],
  setup (props, { emit }) {
    const ns = useNamespace('component-group');
    const cloneComponent = (component) => {
      const { icon, ...config } = component;
      // // 排除自身的icon
      return getCopyRow({ config })
    };
    const addComponent = (component) => {
      emit('add', cloneComponent(component));
    };
    return {
      ns,
      cloneComponent,
      addComponent
    }
  }
});

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_form_component_item = resolveComponent("form-component-item");
  const _component_vue_draggable = resolveComponent("vue-draggable");

  return (_ctx.group.components.length>0)
    ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(_ctx.ns.b())
      }, [
        createElementVNode("div", {
          class: normalizeClass(_ctx.ns.e('label'))
        }, toDisplayString(_ctx.group.label), 3 /* TEXT, CLASS */),
        createCommentVNode("    <ul class=\"component-group__list\">"),
        createVNode(_component_vue_draggable, {
          "model-value": _ctx.group.components,
          "item-key": "type",
          tag: "ul",
          group: {name: 'components', pull: 'clone', put:false},
          sort: false,
          clone: _ctx.cloneComponent
        }, {
          item: withCtx(({element}) => [
            createVNode(_component_form_component_item, {
              item: element,
              onClick: $event => (_ctx.addComponent(element))
            }, null, 8 /* PROPS */, ["item", "onClick"])
          ]),
          _: 1 /* STABLE */
        }, 8 /* PROPS */, ["model-value", "clone"]),
        createCommentVNode("    </ul>")
      ], 2 /* CLASS */))
    : createCommentVNode("v-if", true)
}
var group = /*#__PURE__*/_export_sfc(_sfc_main, [['render',_sfc_render],['__file',"/Users/lsraphel/worksapce-cci/d-render/packages/design/src/plugins/palette/component-group/group.vue"]]);

export { group as default };
