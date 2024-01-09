import { computed, createVNode } from 'vue';
import IphoneSix from './mobile/iphone-six';
import Pc from './pc';
import { useNamespace } from '@d-render/shared';

var index = {
  props: {
    type: String,
    equipment: {
      type: String,
      default: "pc"
    },
    deviceType: {
      type: String,
      default: "IphoneSix"
    }
  },
  setup(props, {
    slots
  }) {
    const mapComponents = {
      IphoneSix
    };
    const Wrapper = computed(() => {
      var _a;
      if (props.equipment === "pc") {
        return Pc;
      }
      return (_a = mapComponents[props.deviceType]) != null ? _a : mapComponents.IphoneSix;
    });
    const ns = useNamespace("device-container");
    return () => createVNode("div", {
      "class": [ns.b(), ns.m(props.type)]
    }, [createVNode(Wrapper.value, null, {
      default: () => {
        var _a;
        return [(_a = slots.default) == null ? void 0 : _a.call(slots)];
      }
    })]);
  }
};

export { index as default };
