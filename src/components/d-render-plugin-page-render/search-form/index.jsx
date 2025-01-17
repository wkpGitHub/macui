import { CipSearchForm, CipFormInputTransform } from 'd-render'
import { useEventConfigure } from '../use-event-configure'

export default {
  emits: ['update:modelValue'],
  setup (_props) {
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
      'events'
    ]

    const TransformModelSearchForm = (props, { emit }) => {
      const { modelValue, dataBus, events, options, ...componentProps } = props
      const fieldList = options[0] ? options[0].children : []
      const handleEvent = useEventConfigure()
      if (!modelValue) componentProps['onUpdate:modelValue']({})

      return <CipSearchForm
        {...componentProps}
        model={modelValue}
        inForm
        dependOnValues={props.dependOnValues}
        onUpdate:model={componentProps['onUpdate:modelValue']}
        fieldList={fieldList}
        onSearch={(isReset) => {
          props.config.getData?.({ params: modelValue })
          if (isReset) handleEvent(events?.reset?.value || [], `${props.config.id}_reset`, modelValue)
          else handleEvent(events?.search?.value || [], `${props.config.id}_search`, modelValue)
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
