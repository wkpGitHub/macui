import { computed } from 'vue'

export const useFormDrawingItem = ({ props, emit }) => {
  const computedConfig = computed(() => {
    return props.config
    // return handleFormConfig(props.config)
  })
  const deleteItem = (e) => {
    emit('delete')
    e.stopPropagation()
  }
  const copyItem = (e) => {
    emit('copy')
    e.stopPropagation()
  }
  return {
    computedConfig,
    deleteItem,
    copyItem
  }
}
