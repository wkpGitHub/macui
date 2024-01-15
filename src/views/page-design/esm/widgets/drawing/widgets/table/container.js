import { computed, defineAsyncComponent, h } from 'vue';
import { useFormInject } from '@d-render/shared';

var container = {
  setup(props, {
    slots
  }) {
    const cipForm = useFormInject();
    const Component = computed(() => {
      const mode = cipForm.equipment === "mobile" ? "mobile" : "pc";
      return defineAsyncComponent(() => import(`./container-${mode}`));
    });
    return () => h(Component.value, props, slots);
  }
};

export { container as default };
