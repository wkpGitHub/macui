import { defineComponent, ref } from 'vue'
import CipButton from '@cip/components/cip-button'
import { formInputProps, fromInputEmits } from '@d-render/shared'
import draggable from 'vuedraggable'
import { ElPopover } from 'element-plus'
import Ellipsis from '@/components/custom-form-input/common/Ellipsis'
import styles from './index.module.less'
export default defineComponent({
  name: 'select-field',
  props: formInputProps,
  emits: fromInputEmits,
  setup (props, ctx) {
    const list = ref([
      {
        id: 1,
        name: '包容条件',
        parentId: 'node_935722',
        type: 'INCLUSIVE'
      },
      {
        id: 2,
        name: '包容条件2',
        parentId: 'node_935766',
        type: 'INCLUSIVE'
      }
    ])
    return () =>
    <ElPopover placement="right" title="拖拽条件调整优先级顺序" width="250" trigger="click">
      {{
        default: () => <>
          <draggable style="width: 100%; min-height:25px" v-model={list.value} item-key='id'>
              {{
                item: (obj) => {
                  return <div class={styles['drag-no-choose']}>
                    <Ellipsis hover-tip content={obj.element.name}/>
                    <div>优先级 { obj.index + 1}</div>
                  </div>
                }
              }}
            </draggable>
        </>,
        reference: () => <CipButton icon="el-icon-sort" size="small">132</CipButton>
      }}
    </ElPopover>
  }
})
