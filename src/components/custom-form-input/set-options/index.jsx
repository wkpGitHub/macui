import { defineComponent, computed } from 'vue'
import { formInputProps, fromInputEmits, useFormInput } from '@d-render/shared'
import { CipForm } from 'd-render'
import { formFieldList } from './config'

export default defineComponent({
  name: 'set-options',
  props: formInputProps,
  emits: fromInputEmits,
  setup (props, ctx) {
    const { proxyValue, proxyOtherValue, securityConfig, width } = useFormInput(props, ctx, { maxOtherKey: 3 })
    // asyncOptions
    // proxyOtherValue[0]
    // optionProps
    // proxyOtherValue[1]
    // optApiConfig
    // proxyOtherValue[2]
    const form = computed(() => {
      return {
        options: props.modelValue || [],
        optionProps: props.otherValue.optionProps,
        ...(props.otherValue.optApiConfig || {}),
        isTree: securityConfig.value.isTree
      }
    })

    function emitValue (val) {
      proxyOtherValue[0].value = val.optionProps
      proxyValue.value = val.options

      proxyOtherValue[1].value = {
        optType: val.optType,
        optHttp: val.optHttp,
        optCtxVar: val.optCtxVar
      }
    }
    return () => <CipForm
      style={{ width: width.value }}
      model={form.value}
      onUpdate:model={(val) => {
        emitValue(val)
      }}
      fieldList={formFieldList}
    >
    </CipForm>
  }
})
