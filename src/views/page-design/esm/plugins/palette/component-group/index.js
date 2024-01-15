import { ElScrollbar } from 'element-plus';
import FormComponentGroup from './group';
import { resolveComponent, openBlock, createBlock, withCtx, createElementBlock, Fragment, renderList } from 'vue';

var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

const _sfc_main = {
  name: 'FormComponents',
  inheritAttrs: false,
  components: { FormComponentGroup, ElScrollbar },
  props: {
    data: Array
  },
  setup (props, { emit }) {
    const add = (row) => {
      emit('add', row);
    };
    return { add }
  }
};

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_form_component_group = resolveComponent("form-component-group");
  const _component_el_scrollbar = resolveComponent("el-scrollbar");

  return (openBlock(), createBlock(_component_el_scrollbar, null, {
    default: withCtx(() => [
      (openBlock(true), createElementBlock(Fragment, null, renderList($props.data, (group) => {
        return (openBlock(), createBlock(_component_form_component_group, {
          key: group.groupName,
          group: group,
          onAdd: $setup.add
        }, null, 8 /* PROPS */, ["group", "onAdd"]))
      }), 128 /* KEYED_FRAGMENT */))
    ]),
    _: 1 /* STABLE */
  }))
}
var index = /*#__PURE__*/_export_sfc(_sfc_main, [['render',_sfc_render],['__file',"/Users/lsraphel/worksapce-cci/d-render/packages/design/src/plugins/palette/component-group/index.vue"]]);

export { index as default };
