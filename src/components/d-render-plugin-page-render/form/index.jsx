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
  const { modelValue = {}, dataBus, search, options, dependOnValues, ...componentProps } = props
  const fieldList = options[0] ? options[0].children : []
  return <CipForm
    {...componentProps}
    model={modelValue}
    onUpdate:model={componentProps['onUpdate:modelValue']}
    fieldList={fieldList}
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
