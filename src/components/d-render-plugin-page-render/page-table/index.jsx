import { CipTable, CipFormInputTransform } from 'd-render'
import { computed } from 'vue'
import axiosInstance from '@/views/app/pages/api'

export default {
  emits: ['update:modelValue'],
  setup () {
    const searchFromProps = [
      'options'
    ]
    const TransformModelSearchForm = (props, { emit }) => {
      const { modelValue = [], dataBus, search, options, ...componentProps } = props
      const tableConfig = computed(() => {
        return props.schema || props.config
      })
      const columns = options[0] ? options[0].children : []
      const { api } = props.config
      if (api && !props.config.getData) {
        props.config.getData = function (axisOptions) {
          return axiosInstance({
            url: api.fullPath,
            method: api.httpMethod,
            ...axisOptions
          }).then(({ data }) => {
            componentProps['onUpdate:modelValue'](data.data?.list || [])
            return data.data
          })
        }
      }
      return <CipTable
        {...componentProps}
        data={modelValue}
        offset={tableConfig.value.hideIndex ? undefined : 0}
        onUpdate:data={componentProps['onUpdate:modelValue']}
        columns={columns}
      />
    }

    return () => <CipFormInputTransform
      inputPropsConfig={searchFromProps}
      comp={TransformModelSearchForm}
    />
  }
}
