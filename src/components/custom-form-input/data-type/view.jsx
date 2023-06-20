import { formInputViewProps, useFormInput } from '@d-render/shared'
import { computed } from 'vue'
export default {
  props: formInputViewProps,
  inheritAttrs: false,
  setup (props, ctx) {
    const { securityConfig, proxyOtherValue } = useFormInput(props, ctx, {})
    const viewValue = computed(() => {
      if (props.modelValue === 'basic') {
        return proxyOtherValue[0].value
      } else if (props.modelValue === 'entity') {
        return proxyOtherValue[1].value
      }
      return proxyOtherValue[0].value
    })
    return () => viewValue.value
  }
}
