import { computed, createVNode } from 'vue';
import { ElBreadcrumb, ElBreadcrumbItem } from 'element-plus';

var breadcrumb = {
  props: {
    list: {
      type: Array,
      default: () => []
    },
    draw: {}
  },
  emits: ["itemClick"],
  setup(props, {
    emit
  }) {
    const breadcrumb = computed(() => {
      return props.list.filter((item) => item.key && item.config) || [];
    });
    const getLabel = (itemConfig) => {
      const {
        config
      } = itemConfig;
      return config.label;
    };
    return () => createVNode("div", {
      "class": "dr-breadcrumb--container"
    }, [createVNode(ElBreadcrumb, {
      "separator": ">"
    }, {
      default: () => [createVNode(ElBreadcrumbItem, null, {
        default: () => {
          var _a, _b;
          return [(_b = (_a = props.draw) == null ? void 0 : _a.config) == null ? void 0 : _b.title];
        }
      }), breadcrumb.value.map((item) => createVNode(ElBreadcrumbItem, {
        "onClick": () => emit("itemClick", item)
      }, {
        default: () => [createVNode("a", null, [getLabel(item)])]
      }))]
    })]);
  }
};

export { breadcrumb as default };
