import CipButton from '@cip/components/cip-button'
import CipButtonText from '@cip/components/cip-button-text'
import { Edit, Delete } from '@element-plus/icons-vue'
import './index.less'
import CipDialog from '@cip/components/cip-dialog'
import { CipForm, CipFormInputTransform } from 'd-render'
import { computed, ref, inject } from 'vue'
import CipMessageBox from '@cip/components/cip-message-box'
import { cloneDeep } from '@d-render/shared'

export const EventHandle = {
  props: {
    modelValue: Array,
    formProps: {},
    includes: {
      type: Array
    },
    excludes: {
      type: Array
    }
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const item = ref({})
    const dialog = ref(false)
    const fieldList = computed(() => {
      const _fieldList = props.formProps?.fieldList ?? []
      // 递归获取所有的dialog key
      const dialogKey = []
      const getDialogKeyList = (list) => {
        list.forEach(item => {
          if (Object.hasOwn(item, 'config')) {
            if (item.config.type === 'dialog') {
              dialogKey.push(item.key)
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
      item.value.content = {}
      item.value._dialogList = dialogKey
      console.log(dialogKey, 'dialogKey', item.value)
      return _fieldList
    })
    const pageDesign = inject('pageDesign', {})
    const emitModelValue = (val) => {
      emit('update:modelValue', val)
    }
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
    return () => <div class='event-handle--wrapper'>
      <div class="event-handle--content">
        {
          props.modelValue?.map((item, index) => <div className="event-handle--content__item">
            <div className="event-handle--content__item--text">{item.eventName}</div>
            <div className="event-handle--content__item--icon">
              <CipButtonText size="small" icon={Edit} type="text" onClick={() => handleEdit(item, index)}></CipButtonText>
              <CipButtonText size="small" icon={Delete} type="text" onClick={() => handleDelete(item, index)}></CipButtonText>
            </div>
          </div>)
        }
      </div>
      <CipButton class="event-handle--button" onClick={createItem}>添加事件</CipButton>
      <CipDialog title={`${item.value.index > -1 ? '编辑' : '新增'}事件`} v-model={dialog.value} onConfirm={saveItem} >
        <CipForm {...props.formProps} v-model:model={item.value} fieldList={fieldList.value}></CipForm>
      </CipDialog>
    </div>
  }
}

export default {
  setup () {
    const eventHandleProps = [
      'includes',
      'excludes',
      'formProps'
    ]
    return () => <CipFormInputTransform
      inputPropsConfig={eventHandleProps}
      comp={EventHandle}
    />
  }
}
