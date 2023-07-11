import CipButton from '@cip/components/cip-button'
import CipButtonText from '@cip/components/cip-button-text'
import { Edit, Delete } from '@element-plus/icons-vue'
import './index.less'
import CipDialog from '@cip/components/cip-dialog'
import { CipForm, CipFormInputTransform } from 'd-render'
import { computed, ref } from 'vue'
import CipMessageBox from '@cip/components/cip-message-box'
import { cloneDeep } from '@d-render/shared'

export const EventHandle = {
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
    console.log(props, 'props')
    const fromFieldList = computed(() => {
      return props.formProps?.fieldList ?? []
    })
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
          props.modelValue.map((item, index) => <div className="event-handle--content__item">
            <div className="event-handle--content__item--text">{item.eventName}</div>
            <div className="event-handle--content__item--icon">
              <CipButtonText size="mini" icon={Edit} type="text" onClick={() => handleEdit(item, index)}></CipButtonText>
              <CipButtonText size="mini" icon={Delete} type="text" onClick={() => handleDelete(item, index)}></CipButtonText>
            </div>
          </div>)
        }
      </div>
      <CipButton class="event-handle--button" onClick={createItem}>添加事件</CipButton>
      <CipDialog title={`${item.value.index > -1 ? '编辑' : '新增'}${props.itemType}`} {...props.dialogProps} v-model={dialog.value} onConfirm={saveItem} >
        <CipForm {...props.formProps} v-model:model={item.value} fieldList={fromFieldList.value}></CipForm>
      </CipDialog>
    </div>
  }
}

export default {
  setup () {
    const props = [
      'formProps',
      'dialogProps',
      'infoRender',
      'itemKey',
      'itemType'
    ]
    return () => <CipFormInputTransform
      inputPropsConfig={props}
      comp={EventHandle}
    />
  }
}
