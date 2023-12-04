import { CipForm, CipFormInputTransform } from 'd-render'
// import { computed } from 'vue'
// const RenderForm = (props) => {
//   const { modelValue = {}, dataBus, search, options, dependOnValues, ...componentProps } = props
//   const fieldList = options[0] ? options[0].children : []
//   return <CipForm
//         {...componentProps}
//         model={modelValue}
//         onUpdate:model={componentProps['onUpdate:modelValue']}
//         fieldList={fieldList.value}
//       />
// }

const Comp = (props) => {
  let { modelValue, dataBus, search, options, dependOnValues, ...componentProps } = props
  const fieldList = options[0] ? options[0].children : []
  if (!modelValue) {
    modelValue = {}
    componentProps['onUpdate:modelValue'](modelValue)
  }

  if (!modelValue) {
    modelValue = {}
    componentProps['onUpdate:modelValue'](modelValue)
  }

  return <CipForm
    {...componentProps.config}
    model={modelValue}
    onUpdate:model={componentProps['onUpdate:modelValue']}
    fieldList={fieldList}
    inForm
    dependOnValues={dependOnValues}
  />
}

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

    return () => <CipFormInputTransform
      inputPropsConfig={fromProps}
      comp={Comp}
    />
  }
}
