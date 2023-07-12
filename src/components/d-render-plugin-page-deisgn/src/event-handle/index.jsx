import CipButton from '@cip/components/cip-button'
import CipButtonText from '@cip/components/cip-button-text'
import { Edit, Delete } from '@element-plus/icons-vue'
import './index.less'
import CipDialog from '@cip/components/cip-dialog'
import { CipForm, CipFormInputTransform } from 'd-render'
import { computed, ref, inject } from 'vue'
import CipMessageBox from '@cip/components/cip-message-box'
import LayoutBox from '@/components/d-render-plugin-page-render/layout-box'
import { cloneDeep } from '@d-render/shared'
import { fieldList, config } from './config'

console.log(fieldList, 'fieldList')
export const EventHandle = {
  props: {
    modelValue: Array,
    includes: {
      type: Array
    },
    excludes: {
      type: Array
    }
  },
  emits: ['update:modelValue'],
  setup (props, { emit, slots }) {
    // const item = ref({})
    const dialog = ref(false)
    const treeModel = ref({})
    const contentModel = ref({})
    const formFieldList = computed(() => {
      // 递归获取所有的dialog key
      const dialogKeyList = []
      const getDialogKeyList = (list) => {
        list.forEach(item => {
          if (Object.hasOwn(item, 'config')) {
            if (item.config.type === 'dialog') {
              dialogKeyList.push(item.key)
            }
            if (item.config.options?.length) {
              getDialogKeyList(item.config.options)
            }
          } else if (item.children?.length) {
            getDialogKeyList(item.children)
          }
        })
      }
      getDialogKeyList(pageDesign.scheme.list)
      contentModel.value._dialogList = dialogKeyList
      return config[treeModel.value.eventType] || []
    })
    const pageDesign = inject('pageDesign', {})
    const emitModelValue = (val) => {
      emit('update:modelValue', val)
    }
    const item = computed({
      get () {
        return {
          ...treeModel.value,
          content: {
            ...contentModel.value
          }
        }
      },
      set (val) {
        treeModel.value = val
        contentModel.value = val.content || {}
      }
    })
    // 保存
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
    // 新增
    const createItem = () => {
      item.value = {}
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
    const slotsContent = {
      operate: () => <CipForm v-model:model={treeModel.value} fieldList={fieldList}></CipForm>,
      content: () => <CipForm v-model:model={contentModel.value} fieldList={formFieldList.value} key={treeModel.value.eventType}></CipForm>
    }
    const isNotEmpty = computed(() => {
      return Array.isArray(props.modelValue) && props.modelValue.length
    })
    return () => <div class='event-handle--wrapper'>
      {
        isNotEmpty.value
          ? <div className="event-handle--content">
          {
            props.modelValue?.map((item, index) => <div className="event-handle--content__item">
              <div className="event-handle--content__item--text">{item.eventName}</div>
              <div className="event-handle--content__item--icon">
                <CipButtonText size="small" icon={Edit} type="text"
                               onClick={() => handleEdit(item, index)}></CipButtonText>
                <CipButtonText size="small" icon={Delete} type="text"
                               onClick={() => handleDelete(item, index)}></CipButtonText>
              </div>
            </div>)
          }
        </div>
          : '<空>'
      }
      <CipButton class="event-handle--button" onClick={createItem}>添加事件</CipButton>
      <CipDialog title={`${item.value.index > -1 ? '编辑' : '新增'}事件`} v-model={dialog.value} onConfirm={saveItem} >
        <LayoutBox v-slots={ slotsContent }>
        </LayoutBox>
      </CipDialog>
    </div>
  }
}

export default {
  setup () {
    const eventHandleProps = [
      'includes',
      'excludes'
    ]
    return () => <CipFormInputTransform
      inputPropsConfig={eventHandleProps}
      comp={EventHandle}
    />
  }
}
