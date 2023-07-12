import { CipForm, CipFormInputTransform } from 'd-render'

export default {
  emits: ['update:modelValue'],
  setup () {
    const fromProps = [
      'options',
      'showOnly',
      'grid',
      'labelPosition',
      'scrollToError',
      'border',
      'equipment',
      'modelKey',
      'useDirectory',
      'enterHandler',
      'defaultModel',
      'fieldList'
    ]
    const TransformModelSearchForm = (props, { emit }) => {
      const { modelValue = {}, dataBus, search, options, ...componentProps } = props
      const fieldList = options[0] ? options[0].children : []
      return <CipForm
        {...componentProps}
        model={modelValue}
        onUpdate:model={componentProps['onUpdate:modelValue']}
        fieldList={fieldList}
      />
    }

    return () => <CipFormInputTransform
      inputPropsConfig={fromProps}
      comp={TransformModelSearchForm}
    />
  }
}
