import { ref, computed } from 'vue';

const useSelect = () => {
  const selectItem = ref({});
  const selectItemId = computed(() => {
    var _a;
    return (_a = selectItem.value) == null ? void 0 : _a.id;
  });
  const changeSelect = (fieldConfig) => {
    selectItem.value = fieldConfig;
  };
  const updateSelectItem = (val, withHook) => {
    if (withHook) {
      selectItem.value.key = val.key || "";
      selectItem.value.config = val;
    } else {
      selectItem.value = val;
    }
  };
  return { selectItem, selectItemId, changeSelect, updateSelectItem };
};

export { useSelect };
