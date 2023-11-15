import { defineComponent, computed } from 'vue'
import { formInputProps, fromInputEmits, useFormInput } from '@d-render/shared'
import { CipForm } from 'd-render'
import { HTTP, formFieldList } from './config'

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
      proxyOtherValue[1].value = val.optionProps
      proxyValue.value = val.options

      proxyOtherValue[2].value = {
        optType: val.optType,
        optHttp: val.optHttp
      }

      if (val.optType === HTTP) {
        proxyOtherValue[0].value = async function as () {
          const res = await fetch(val.optHttp)
          return res.json
        }.toString()
      } else {
        proxyOtherValue[0].value = undefined
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
