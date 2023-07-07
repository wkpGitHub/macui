import { computed, nextTick, ref, watch } from 'vue'
import { isEmpty, cloneDeep } from '@d-render/shared'

export function useTree (props, emit, listLoading, item, itemList) {
  const currentNodeKey = computed({
    get () { return props.modelValue },
    set (val) { emit('update:modelValue', val) }
  })
  const tree$ = ref()
  const expandedKeys = ref([])
  const handleExpandChange = (type, data) => {
    const { id: nodeKey } = data
    const idx = expandedKeys.value.indexOf(nodeKey)
    if (type === 'expand') {
      if (idx === -1) {
        expandedKeys.value.push(nodeKey)
      }
    } else if (type === 'collapse') {
      if (idx > -1) {
        expandedKeys.value.splice(idx, 1)
      }
    }
  }

  watch(listLoading, (val) => {
    if (!val) {
      // 等待tree渲染后再选中
      nextTick().then(() => {
        // 默认选中第一个
        if (isEmpty(currentNodeKey.value)) {
          item.value = cloneDeep(itemList.value[0])
          if (item.value?.id) {
            currentNodeKey.value = item.value.id
            tree$.value.setCurrentKey(item.value.id)
          }
        } else {
          tree$.value.setCurrentKey(currentNodeKey.value)
        }
      })
    }
  })

  function handleNodeClick (data) {
    if (currentNodeKey.value === data.id) {
      tree$.value.setCurrentKey(null)
    }
  }

  return {
    currentNodeKey,
    tree$,
    expandedKeys,
    handleExpandChange,
    handleNodeClick
  }
}
