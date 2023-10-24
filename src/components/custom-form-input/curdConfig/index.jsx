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
      add: {
        label: '新增接口',
        type: 'select',
        options: state.apiOptions,
        optionProps: {
          label: 'fullPath',
          value: 'id'
        },
        changeEffect (value, key) {
          console.log('key, value', key, value)
        }
      },
      del: {
        label: '删除接口',
        type: 'select',
        options: state.apiOptions,
        optionProps: {
          label: 'fullPath',
          value: 'id'
        },
        changeEffect () {}
      },
      update: {
        label: '修改接口',
        type: 'select',
        options: state.apiOptions,
        optionProps: {
          label: 'fullPath',
          value: 'id'
        },
        changeEffect () {}
      },
      search: {
        label: '查询接口',
        type: 'select',
        options: state.apiOptions,
        optionProps: {
          label: 'fullPath',
          value: 'id'
        },
        changeEffect (value, key) {
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
