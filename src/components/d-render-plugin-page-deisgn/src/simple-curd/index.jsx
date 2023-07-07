import styles from './index.modules.less'
import { ref, computed, h } from 'vue'
import { CipForm, CipFormInputTransform } from 'd-render'
import CipDialog from '@cip/components/cip-dialog'
import CipButton from '@cip/components/cip-button'
import { cloneDeep, getFieldValue } from '@d-render/shared'
import { MoreFilled } from '@element-plus/icons-vue'
import { ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus'
import CipMessageBox from '@cip/components/cip-message-box'
import VueDraggable from 'vuedraggable'
export const SimpleCurd = {
  props: {
    modelValue: Array,
    formProps: {},
    dialogProps: {},
    infoRender: {},
    itemType: String,
    itemKey: String
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const item = ref({})
    const dialog = ref(false)

    const fromFieldList = computed(() => {
      return props.formProps?.fieldList ?? []
    })
    const createItem = () => {
      item.value = {}
      dialog.value = true
    }
    const emitModelValue = (val) => {
      emit('update:modelValue', val)
    }
    const saveItem = (resolve, reject) => {
      let modelValue = props.modelValue
      if (modelValue) {
        const { index } = item.value
        if (index > -1) {
          modelValue.splice(index, 1, item.value)
        } else {
          modelValue.push(item.value)
        }
      } else {
        modelValue = [item.value]
      }
      emitModelValue(modelValue)
      resolve()
    }
    const commands = {
      update: ({ item: row, index }) => {
        console.log({ ...row, index: index })
        item.value = cloneDeep({ ...row, index: index })
        dialog.value = true
      },
      delete: ({ item, index }) => {
        CipMessageBox.confirm(`确认删除${getFieldValue(item, props.itemKey)}`, '提示').then(res => {
          const modelValue = props.modelValue
          modelValue.splice(index, 1)
          emitModelValue(modelValue)
        }).catch(() => {})
      }
    }
    const handleCommand = (command, args) => {
      commands[command](args)
    }
    return () => <div class={styles.wrapper} >
         <VueDraggable modelValue={props.modelValue} onUpdate:modelValue={emitModelValue} itemKey={props.itemKey}>
          {{
            item: ({ element: v, index: i }) => {
              return <div class={styles['item-wrapper']}>
              <div class={styles.info}>
                {props.infoRender(h, {
                  item: v,
                  $index: i
                })}
              </div>
              <div class={styles.handler}>
                <ElDropdown onCommand={(command) => handleCommand(command, { item: v, index: i })}>
                  {{
                    default: () => <CipButton square icon={MoreFilled}></CipButton>,
                    dropdown: () => <ElDropdownMenu>
                      <ElDropdownItem command={'update'}>编辑{props.itemType}</ElDropdownItem>
                      <ElDropdownItem command={'delete'}>删除{props.itemType}</ElDropdownItem>
                    </ElDropdownMenu>
                  }}
                </ElDropdown>

              </div>
            </div>
            }
          }}

        </VueDraggable>
      {!props.modelValue && '<空>'}
      <CipButton class={styles.create} onClick={() => createItem()}>新增{props.itemType}</CipButton>
      <CipDialog title={`${item.value.index > -1 ? '编辑' : '新增'}${props.itemType}`} {...props.dialogProps} v-model={dialog.value} onConfirm={saveItem} >
        <CipForm {...props.formProps} v-model:model={item.value} fieldList={fromFieldList.value}></CipForm>
      </CipDialog>
    </div>
  }
}

export default {
  setup () {
    const simpleCurdProps = [
      'formProps',
      'dialogProps',
      'infoRender',
      'itemKey',
      'itemType'
    ]
    return () => <CipFormInputTransform
      inputPropsConfig={simpleCurdProps}
      comp={SimpleCurd}
    />
  }
}
