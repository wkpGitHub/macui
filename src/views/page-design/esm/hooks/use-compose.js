import { ref, computed } from 'vue';

const useCompose = (props, { equalKey = "name", activeKey, custom }) => {
  var _a;
  const value = ref();
  const list = computed(() => {
    const result = custom.filter((v) => !!v);
    return result;
  });
  if (list.value.find((v) => v[equalKey] === props[activeKey])) {
    value.value = props[activeKey];
  } else {
    value.value = (_a = list.value[0]) == null ? void 0 : _a[equalKey];
  }
  return [value, list];
};

export { useCompose };
