import { h, reactive, watch, provide } from 'vue'
import VueDraggable from 'vuedraggable'
import { isNotEmpty } from '@d-render/shared'
import { useFormDrawing, useList } from './use-form-drawing'
import FormDrawingContent from './widgets/content'
export default {
  props: {
    data: { type: Object, default: () => ({}) },
    equipment: { type: String, default: 'pc' },
    selectId: [Number, String]
  },
  emits: ['updateList', 'select'],
  setup (props, context) {
    const { list, updateList } = useList({ props, emit: context.emit })
    const { selectItem, deleteItem, copyItem } = useFormDrawing({ list, updateList, emit: context.emit })
    const addItem = ({ newIndex }) => {
      const newItem = list.value[newIndex]
      context.emit('select', newItem)
    }
    const updateConfig = (element, val) => {
      const cloneList = props.data?.list || []
      element.config = val // element.config.type
      updateList(cloneList, 'layoutUpdate')
    }

    // 表单内容包含 布局和input && table(特殊)
    const FormContent = (...args) => {
      const { element, index } = args[0]
      const formContentProps = {
        selectId: props.selectId,
        element,
        index,
        formLabelPosition: props.data.formLabelPosition,
        onUpdateConfig: (val) => {
          updateConfig(element, val)
        },
        onClick: () => { selectItem(element) },
        onDelete: () => deleteItem(index),
        onCopy: () => copyItem(index),
        onSelectItem: (element) => selectItem(element)
      }
      return h(FormDrawingContent, { ...formContentProps })
    }
    // 默认选中第一个
    const unwatch = watch([() => props.selectId, () => list.value], ([val]) => {
      if (!val && list.value.length > 0) {
        selectItem(list.value[0])
        unwatch() // once
      }
    }, { immediate: true })
    provide('cipForm', reactive({ equipment: props.equipment }))
    return () => <div class={'cip-fd-form-drawing-container'}>
      {list.value.length === 0 && <div class={'empty-form--text'}>从左侧拖拽来添加字段</div>}
      <div class={['cip-fd-form-drawing', `cip-fd-form-drawing--${props.equipment}`]}>
        <div style={'height: 100%'}>
          <VueDraggable
            modelValue={list.value}
            onUpdate:modelValue={(val) => updateList(val)}
            itemKey={'id'}
            group={'components'}
            handle={'.move-icon'}
            ghostClass={'ghost'}
            animation={200}
            componentData={{
              class: 'cip-fd-form-content__wrapper',
              style: isNotEmpty(props.data.grid)
                ? `display: grid; grid-template-columns: repeat(${props.data.grid},1fr);align-content: start;`
                : ''
            }}
            onAdd={({ newIndex }) => addItem({ newIndex })}>
            {{
              item: FormContent
            }}
          </VueDraggable>
        </div>
      </div>
    </div>
  }
}
