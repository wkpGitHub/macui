import { defineComponent, ref, computed, resolveComponent, openBlock, createElementBlock, createElementVNode, toDisplayString, createVNode, withCtx, createTextVNode } from 'vue';
import { ElAlert } from 'element-plus';
import CipCodeMirror from '@cip/code-mirror';
import CipDialog from '@cip/components/cip-dialog';

var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

const _sfc_main = defineComponent({
  components: { CipCodeMirror, CipDialog, ElAlert },
  props: {
    fnName: {},
    updateModel: {},
    itemConfig: {},
    fieldKey: {}
  },
  setup (props) {
    const visible = ref(false);
    const paramsStr = computed(() => {
      const paramsStrMap = {
        changeConfig: '(config, dependOnValues, outDependOnValues)',
        changeValue: '(dependOnValues, outDependOnValues)'
      };
      return paramsStrMap[props.fnName] ?? ''
    });
    const getCompleteFun = (funcBody) => {
      return `function ${props.fnName}${paramsStr.value} {
${funcBody ?? ''}
}`
    };

    const dependOnKeyList = computed(() => props.itemConfig?.dependOn ?? []);
    function customHint (CodeMirror, cm, options) {
      const javascriptHint = CodeMirror.hint.javascript;
      const result = javascriptHint(cm, options);
      result.list = ['config', 'dependOnValues', 'outDependOnValues', ...dependOnKeyList.value, ...result.list];
      return result
    }
    function customHintOption (CodeMirror) {
      return {
        hint: function hint (...args) {
          return customHint(CodeMirror, ...args)
        },
        completeSingle: false
      }
    }
    return {
      visible,
      getCompleteFun,
      paramsStr,
      customHintOption
    }
  }
});

const _hoisted_1 = { class: "code-mirror-item" };

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_cip_code_mirror = resolveComponent("cip-code-mirror");
  const _component_el_alert = resolveComponent("el-alert");
  const _component_cip_dialog = resolveComponent("cip-dialog");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createElementVNode("div", {
      class: "code-mirror-item_title",
      closable: false,
      onClick: _cache[0] || (_cache[0] = $event => (_ctx.visible = true))
    }, " 点击编辑" + toDisplayString(_ctx.fnName) + "函数 ", 1 /* TEXT */),
    createVNode(_component_cip_code_mirror, {
      readonly: "nocursor",
      type: "javascript",
      theme: "default",
      "model-value": _ctx.getCompleteFun(_ctx.itemConfig[_ctx.fieldKey]),
      onClick: _cache[1] || (_cache[1] = $event => (_ctx.visible = true))
    }, null, 8 /* PROPS */, ["model-value"]),
    createVNode(_component_cip_dialog, {
      modelValue: _ctx.visible,
      "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((_ctx.visible) = $event)),
      title: "函数编辑",
      "show-only": true
    }, {
      default: withCtx(() => [
        createVNode(_component_el_alert, { closable: false }, {
          default: withCtx(() => [
            createTextVNode(" function " + toDisplayString(_ctx.fnName) + toDisplayString(_ctx.paramsStr) + " { ", 1 /* TEXT */)
          ]),
          _: 1 /* STABLE */
        }),
        createVNode(_component_cip_code_mirror, {
          type: "javascript",
          theme: "default",
          customHintOption: _ctx.customHintOption,
          "model-value": _ctx.itemConfig[_ctx.fieldKey],
          "onUpdate:modelValue": _ctx.updateModel
        }, null, 8 /* PROPS */, ["customHintOption", "model-value", "onUpdate:modelValue"]),
        createVNode(_component_el_alert, { closable: false }, {
          default: withCtx(() => [
            createTextVNode("}")
          ]),
          _: 1 /* STABLE */
        })
      ]),
      _: 1 /* STABLE */
    }, 8 /* PROPS */, ["modelValue"])
  ]))
}
var codeMirrorDialog = /*#__PURE__*/_export_sfc(_sfc_main, [['render',_sfc_render],['__file',"/Users/lsraphel/worksapce-cci/d-render/packages/design/src/plugins/field-configure/code-mirror-dialog.vue"]]);

export { codeMirrorDialog as default };
