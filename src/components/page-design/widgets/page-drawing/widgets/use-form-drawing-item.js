import { computed, inject } from 'vue'

export const useFormDrawingItem = ({ props, emit }) => {
  const pageDesign = inject('pageDesign', {})
  const computedConfig = computed(() => {
    return props.config
    // return handleFormConfig(props.config)
  })
  const drawType = computed(() => {
    console.log('drawType', pageDesign.drawTypeMap?.[computedConfig.value.type])
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
