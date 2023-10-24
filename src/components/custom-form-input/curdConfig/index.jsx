import { defineComponent, watch, reactive, computed } from 'vue'
// import { ElInput, ElSelect, ElOption } from 'element-plus'
import { formInputProps, fromInputEmits, useFormInput } from '@d-render/shared'
import { CipForm, defineFormFieldConfig, generateFieldList } from 'd-render'
// import cipStore from '@cip/components/store'
import { apiConfigService, centerService } from '@/api/service/chr'

function getId () {
  return Math.random().toString(16).substring(2, 10)
}

export default defineComponent({
  name: 'select-field',
  props: formInputProps,
  emits: fromInputEmits,
  setup (props, ctx) {
    const state = reactive({
      apiOptions: [],
      formVal: {}
    })
    const { proxyValue, proxyOtherValue } = useFormInput(props, ctx, { maxOtherKey: 1 })

    watch(() => props.dependOnValues, v => {
      console.log(v, proxyValue.value)
    })
    apiConfigService.list({ pid: '', isApi: true }).then(({ data }) => {
      state.apiOptions = data
    })

    const fieldList = computed(() => generateFieldList(defineFormFieldConfig({
      save: {
        label: '保存接口',
        type: 'select',
        options: state.apiOptions.filter(opt => opt.apiType === 'save'),
        optionProps: {
          label: 'fullPath',
          value: 'id'
        },
        changeEffect (value, key) {
          if (!value) return
          // TODO: 给新增弹窗保存按钮加接口，尽量加，可能无法完全覆盖
          centerService.getContent(value).then(({ data }) => {
            const { inputParams = [] } = data.flow || {}
            const dialogChildren = proxyValue.value.find(opt => opt.key === 'dialog')?.children
            if (dialogChildren?.length && inputParams.length) {
              const dialogOpts = dialogChildren[0].config.options
              const formSlots = dialogOpts.find(opt => opt.key === 'default')?.children
              if (!formSlots?.length) return
              formSlots[0].config.options[0].children = inputParams.map(opt => ({
                config: {
                  type: 'input',
                  label: opt.title
                },
                id: getId(),
                key: opt.name
              }))
            }
          })
        }
      },
      del: {
        label: '删除接口',
        type: 'select',
        options: state.apiOptions.filter(opt => opt.apiType === 'delete'),
        optionProps: {
          label: 'fullPath',
          value: 'id'
        },
        changeEffect () {
          // TODO：给批量删除接口，加接口
        }
      },
      search: {
        label: '查询接口',
        type: 'select',
        options: state.apiOptions.filter(opt => opt.apiType === 'query'),
        optionProps: {
          label: 'fullPath',
          value: 'id'
        },
        changeEffect (value, key) {
          if (!value) return
          // TODO：给查询按钮加接口
          centerService.getContent(value).then(({ data }) => {
            const { outParams = [], inputParams = [] } = data.flow || {}
            const filterChildren = proxyValue.value.find(opt => opt.key === 'filter')?.children
            if (filterChildren?.length && inputParams.length) {
              const filterOpts = filterChildren[0].config.options
              filterOpts[0].children = inputParams.map(opt => ({
                config: {
                  type: 'input',
                  label: opt.title
                },
                id: getId(),
                key: opt.name
              }))
            }
            const defaultChildren = proxyValue.value.find(opt => opt.key === 'default')?.children
            if (defaultChildren?.length && outParams.length) {
              const defaultOpts = defaultChildren[0].config.options
              defaultOpts[0].children = outParams.map(opt => ({
                config: {
                  type: 'input',
                  label: opt.title
                },
                id: getId(),
                key: opt.name
              }))
            }
          })
        }
      }
    })))

    return () => {
      const { usingSlots } = props.dependOnValues
      return <div class="curd-config__container" style="width: 100%">
        <CipForm v-model:model={proxyOtherValue[0].value} fieldList={fieldList.value} />
        {usingSlots.includes('filter')}
        {usingSlots.includes('default')}
      </div>
    }
  }
})
