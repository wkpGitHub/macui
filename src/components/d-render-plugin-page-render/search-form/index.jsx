import { CipSearchForm, CipFormInputTransform } from 'd-render'
import { useEventConfigure } from '../use-event-configure'
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

    const TransformModelSearchForm = (props, { emit }) => {
      const { modelValue = {}, dataBus, search, options, ...componentProps } = props
      const fieldList = options[0] ? options[0].children : []
      const handleEvent = useEventConfigure()
      return <CipSearchForm
        {...componentProps}
        model={modelValue}
        onUpdate:model={componentProps['onUpdate:modelValue']}
        fieldList={fieldList}
        onSearch={() => {
          handleEvent(search)
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