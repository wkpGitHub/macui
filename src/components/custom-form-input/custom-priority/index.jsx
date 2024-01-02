import { defineComponent } from 'vue'
import { formInputProps, fromInputEmits, useFormInput } from '@d-render/shared'
import draggable from 'vuedraggable'
import Ellipsis from '@lc/components/custom-form-input/common/Ellipsis'
import styles from './index.module.less'

export default defineComponent({
  name: 'select-field',
  props: formInputProps,
  emits: fromInputEmits,
  setup (props, ctx) {
    const { proxyOtherValue } = useFormInput(props, ctx, { maxOtherKey: 1 })
    return () =>
      <draggable style="width: 100%; min-height:25px" v-model={proxyOtherValue[0].value} item-key='id'>
          {{
            item: (obj) => {
              return <div class={styles['drag-no-choose']}>
                <Ellipsis hover-tip content={obj.element.label}/>
                <div>优先级 { obj.index + 1}</div>
              </div>
            }
          }}
        </draggable>
  }
})
