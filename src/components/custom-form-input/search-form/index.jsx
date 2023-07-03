import { CipSearchForm, CipFormInputTransform } from 'd-render'
import { inject } from 'vue'
export default {
  emits: ['update:modelValue'],
  setup () {
    const searchFromProps = [
      'options',
      'hideSearch',
      'handleAbsolute',
      'collapse',
      'searchButtonText',
      'searchReset',
      'grid',
      'equipment',
      'labelPosition',
      'completeRow',
      'defaultModel',
      'search'
    ]
    const cipFormRender = inject('cipFormRender', {})
    const TransformModelSearchForm = (props, { emit }) => {
      const { modelValue = {}, dataBus, search, options, ...componentProps } = props
      const fieldList = options[0] ? options[0].children : []
      return <CipSearchForm
        {...componentProps}
        model={modelValue}
        onUpdate:model={componentProps['onUpdate:modelValue']}
        fieldList={fieldList}
        onSearch={() => {
          const method = cipFormRender.methods[search]
          if (method) method()
          // cipFormRenderMethod.page()
          // search(dataBus, modelValue)
        }}
      />
    }

    return () => <CipFormInputTransform
      inputPropsConfig={searchFromProps}
      comp={TransformModelSearchForm}
    />
  }
}
