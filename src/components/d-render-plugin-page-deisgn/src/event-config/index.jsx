import CipButton from '@cip/components/cip-button'
import CipButtonText from '@cip/components/cip-button-text'
import { Edit, Delete } from '@element-plus/icons-vue'
import CpTree from '@cip/components/cip-tree'
import CipDialog from '@cip/components/cip-dialog'
// import { CipForm, CipFormInputTransform } from 'd-render'
import { CipForm } from 'd-render'
import { computed, ref, inject, watch, nextTick } from 'vue'
import CipMessageBox from '@cip/components/cip-message-box'
import LayoutBox from '@/components/d-render-plugin-page-render/layout-box'
import { cloneDeep, formInputProps, fromInputEmits, useFormInput } from '@d-render/shared'
import { getConfig, EVENT_TYPE } from '@/views/page-design/plugins/events/config'
import { filterList } from '@/lib/utils'
import VueDraggable from 'vuedraggable'
import './index.less'
export default {
  props: formInputProps,
  emits: fromInputEmits,
  setup (props, ctx) {
    const dialog = ref(false)
    const treeModel = ref({})
    const treeRef = ref()
    const contentModel = ref({})
    const formFieldList = ref([])
    const drDesign = inject('drDesign', {})
    const config = getConfig(drDesign)
    const { proxyValue } = useFormInput(props, ctx)
    watch(() => treeModel.value.eventType, () => {
      formFieldList.value = config[treeModel.value.eventType] || []
    }, { immediate: true })

    const emitModelValue = (val) => {
      proxyValue.value = val
    }
    const item = computed({
      get () {
        const newObj = {
          ...cloneDeep(treeModel.value),
          ...cloneDeep(contentModel.value)
        }
        delete newObj._dialogList
        delete newObj._methodList
        return newObj
      },
      set (val) {
        treeModel.value = val
        contentModel.value = val
      }
    })
    const treeData = computed(() => {
      return filterList(EVENT_TYPE, props.excludes, props.includes)
    })
    // 保存
    const saveItem = (resolve, reject) => {
      let modelValue = props.modelValue
      if (modelValue) {
        const { index } = item.value
        if (item.value.type !== 'var') Reflect.deleteProperty(item.value, 'var')
        if (index > -1) {
          modelValue.splice(index, 1, item.value)
        } else {
          modelValue.push(item.value)
        }
      } else {
        modelValue = [item.value]
      }
      if (item.value.eventType === 'var') {
        const varObj = { name: item.value.var, title: item.value.desc }
        if (drDesign.schema.variables) {
          const index = drDesign.schema.variables.findIndex(v => v.name === item.value.var)
          if (index > -1) {
            drDesign.schema.variables.splice(index, 1, varObj)
          } else {
            drDesign.schema.variables.push(varObj)
          }
        } else {
          drDesign.schema.variables = [varObj]
        }
      }
      emitModelValue(modelValue)
      resolve()
    }
    // 新增
    const createItem = () => {
      item.value = {
        var: Math.random().toString(16).substring(2, 10)
      }
      dialog.value = true
    }
    // 删除
    const handleDelete = (item, index) => {
      CipMessageBox.confirm(`确认删除${item.eventName}?`, '提示').then(res => {
        const modelValue = props.modelValue
        modelValue.splice(index, 1)
        emitModelValue(modelValue)
      }).catch(() => {})
    }
    // 编辑
    const handleEdit = (data, index) => {
      item.value = cloneDeep({ ...data, index })
      dialog.value = true
    }
    const handleNodeClick = ({ data }) => {
      treeModel.value.eventType = data.value
      treeModel.value.eventName = data.label
    }
    const handleDialogOpen = () => {
      nextTick().then(() => {
        console.log(treeModel.value.eventType)
        treeRef.value?.setCurrentKey(treeModel.value.eventType)
      })
    }
    const slotsContent = {
      operate: () => <CpTree options={treeData.value} showButton={false} onNode-click={handleNodeClick} ref={treeRef} config={{ highlightCurrent: true, nodeKey: 'value' }}></CpTree>,
      content: () => <CipForm v-model:model={contentModel.value} fieldList={formFieldList.value} key={treeModel.value.eventType} />
    }
    const isNotEmpty = computed(() => {
      return Array.isArray(props.modelValue) && props.modelValue.length
    })
    return () => <div class='event-handle--wrapper'>
      {
        isNotEmpty.value
          ? <div class="event-handle--content">
          <VueDraggable modelValue={props.modelValue} onUpdate:modelValue={emitModelValue}>
            {
              {
                item: ({ element, index }) => {
                  return <div className="event-handle--content__item">
                    <div className="event-handle--content__item--text">{element.eventName}</div>
                    <div className="event-handle--content__item--icon">
                      <CipButtonText size="small" icon={Edit} type="text"
                                     onClick={() => handleEdit(element, index)}></CipButtonText>
                      <CipButtonText size="small" icon={Delete} type="text"
                                     onClick={() => handleDelete(element, index)}></CipButtonText>
                    </div>
                  </div>
                }
              }
            }
          </VueDraggable>
        </div>
          : '<空>'
      }
      <CipButton class="event-handle--button" onClick={createItem}>添加事件</CipButton>
      <CipDialog title={`${item.value.index > -1 ? '编辑' : '新增'}事件`} v-model={dialog.value} onConfirm={saveItem} onOpen={handleDialogOpen}>
        <LayoutBox v-slots={ slotsContent }></LayoutBox>
      </CipDialog>
    </div>
  }
}

// export default {
//   setup () {
//     const eventHandleProps = [
//       'includes',
//       'excludes'
//     ]
//     return () => <CipFormInputTransform
//       inputPropsConfig={eventHandleProps}
//       comp={EventConfig}
//     />
//   }
// }
