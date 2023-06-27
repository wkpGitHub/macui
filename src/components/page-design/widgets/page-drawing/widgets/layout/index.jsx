import { h } from 'vue'
import VueDraggable from 'vuedraggable'
import { CipFormLayout } from 'd-render'
import { drawingContentProps } from '../common-props'
import { useFormDrawingItem } from '../use-form-drawing-item'
import FormDrawingContent from '../content'

export default {
  inheritAttrs: false,
  props: drawingContentProps,
  emits: ['delete', 'copy', 'selectItem', 'update:config'],
  setup (props, { emit }) {
    const { computedConfig } = useFormDrawingItem({ props, emit })

    const updateConfig = (val) => {
      emit('update:config', val)
    }

    const selectItem = (element) => {
      emit('selectItem', element)
    }
    const FormContent = ({ element, optionIndex, childIndex, updateOptionChild, copyOptionChild, deleteOptionChild }) => {
      const formContentProps = {
        selectId: props.selectId,
        element,
        optionIndex,
        onUpdateConfig: (val) => {
          updateOptionChild(optionIndex, childIndex, val)
        },
        onClick: (e) => {
          e.stopPropagation()
          selectItem(element)
        },
        onDelete: () => deleteOptionChild(optionIndex, childIndex),
        onCopy: () => copyOptionChild(optionIndex, childIndex), // 内部自由的copy
        onSelectItem: (val) => selectItem(val)
      }
      return h(FormDrawingContent, formContentProps)
    }
    return () => (
      <CipFormLayout
        config={computedConfig.value}
        onUpdate:config={(val) => updateConfig(val)}
        onSelectItem={(element) => selectItem(element)}
      >
        {{
          item: ({ children, optionIndex, updateOptionChildren, addOptionChild, copyOptionChild, deleteOptionChild, updateOptionChild }) => (
            <VueDraggable
              modelValue={children}
              onUpdate:modelValue={(val) => { updateOptionChildren(optionIndex, val) }}
              itemKey={'id'}
              group={'components'}
              handle={'.move-icon'}
              ghostClass={'ghost'}
              animation={200}
              componentData={{ class: 'form-drawing__layout__item', style: { } }}
              onAdd={(val) => addOptionChild(optionIndex, val)}
            >
              {{
                item: ({ element, index: childIndex, draggable }) => FormContent({
                  element,
                  optionIndex,
                  childIndex,
                  updateOptionChild,
                  copyOptionChild,
                  deleteOptionChild
                })
              }}
            </VueDraggable>
          )
        }}
      </CipFormLayout>
    )
  }
}
