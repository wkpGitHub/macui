import { ElInput } from 'element-plus'
// import { CipFormInputTransform } from 'd-render'
import { formInputProps, fromInputEmits, useFormInput } from '@d-render/shared'
import { useEvents } from '../use-event'

export default {
  name: 'input',
  props: formInputProps,
  emits: fromInputEmits,
  setup (props, ctx) {
    const {
      proxyValue,
      securityConfig
    } = useFormInput(props, ctx)

    const { eventMap } = useEvents(props, securityConfig)

    return () => {
      const { hideItem, ...otherConfig } = securityConfig.value

      return !hideItem && <ElInput
        modelValue={proxyValue.value}
        // config={otherConfig}
        {...otherConfig}
        onUpdate:modelValue={(e) => { proxyValue.value = e }}
        {...eventMap.value}
      />
    }
  }
}
