import { computed, createVNode, createTextVNode } from 'vue';
import { CipForm } from 'd-render';

var component = {
  props: {
    schema: {},
    config: {}
  },
  setup(props, {
    slots
  }) {
    const tableConfig = computed(() => {
      return props.schema || props.config;
    });
    return () => createVNode(CipForm, {
      "labelPosition": "top",
      "class": "dr-draw-table--form "
    }, {
      default: () => {
        var _a;
        return [createVNode("div", {
          "class": `dr-draw-table--container ${tableConfig.value.indexFixed ? "is-index-fixed" : ""}`
        }, [!tableConfig.value.hideIndex && createVNode("div", {
          "class": "dr-draw-table--seq"
        }, [createVNode("div", {
          "class": "dr-draw-table--seq__title"
        }, [createTextVNode("\u5E8F\u53F7")]), createVNode("div", {
          "class": "dr-draw-table--seq__number"
        }, [createTextVNode("1")])]), createVNode("div", {
          "class": `dr-draw-table--content ${tableConfig.value.hideBorder ? "is-hide-border" : ""}`
        }, [(_a = slots.default) == null ? void 0 : _a.call(slots)])]), tableConfig.value.showSummary && createVNode("div", {
          "class": "dr-draw-table--summary"
        }, [createTextVNode("\u603B\u8BA1")])];
      }
    });
  }
};

export { component as default };
