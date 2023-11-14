import { defineComponent, ref, watch } from 'vue'
import { formInputProps, fromInputEmits, useFormInput } from '@d-render/shared'
import { CipForm } from 'd-render'
import { HTTP, formFieldList } from './config'

export default defineComponent({
  name: 'set-options',
  props: formInputProps,
  emits: fromInputEmits,
  setup (props, ctx) {
    const { proxyValue, proxyOtherValue, securityConfig, width } = useFormInput(props, ctx, { maxOtherKey: 2 })
    console.log(proxyValue.value, 'kkkk')
    // asyncOptions
    // proxyOtherValue[0]
    // optionProps
    // proxyOtherValue[1]
    const form = ref({})
    watch(() => securityConfig.value.isTree, (n) => {
      form.value.isTree = securityConfig.value.isTree
    }, {
      immediate: true
    })

    function emitValue (val) {
      proxyOtherValue[1].value = val.optionProps
      proxyValue.value = val.options
      if (val.optType === HTTP) {
        proxyOtherValue[0].value = async function as () {
          const res = await fetch(val.optHttp)
          return res.json
        }.toString()
      } else {
        proxyOtherValue[0].value = undefined
      }
      console.log(proxyOtherValue, 'proxyOtherValue')
    }

    return () => <CipForm
      style={{ width: width.value }}
      model={form.value}
      onUpdate:model={(val) => { emitValue(val) }}
      fieldList={formFieldList}
    >

    </CipForm>
  }
})
