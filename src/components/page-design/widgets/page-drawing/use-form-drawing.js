import { computed } from 'vue'
import { getCopyRow } from '@d-render/design/esm/cip-form-design/util'
import { getNextItem } from '@d-render/shared'
export const useList = ({ props, emit }) => {
  const list = computed(() => {
    return props.data?.list || []
  })
  const updateList = (value) => {
    emit('updateList', value)
  }
  return { list, updateList }
}

export const useFormDrawing = ({ list, updateList, emit }) => {
  const selectItem = (element) => {
    emit('select', element)
  }

  const deleteItem = (index) => {
    const itemList = list.value
    const nextItem = getNextItem(list.value, index)
    selectItem(nextItem)
    itemList.splice(index, 1)
    updateList(itemList)
  }
  const copyItem = (index) => {
    const itemList = list.value
    const newItem = getCopyRow(itemList[index])
    itemList.splice(index + 1, 0, newItem)
    updateList(itemList, 'copy')
    selectItem(newItem)
  }
  return {
    selectItem,
    deleteItem,
    copyItem
  }
}
