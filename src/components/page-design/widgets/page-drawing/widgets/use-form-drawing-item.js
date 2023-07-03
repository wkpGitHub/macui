import { computed, inject } from 'vue'

export const useFormDrawingItem = ({ props, emit }) => {
  const pageDesign = inject('pageDesign', {})
  const computedConfig = computed(() => {
    return { ...props.config, parentType: props.parentType }
    // return handleFormConfig(props.config)
  })
  const drawType = computed(() => {
    return pageDesign.drawTypeMap?.[computedConfig.value.type]
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
    copyItem,
    pageDesign,
    drawType
  }
}
