import CipInput from '@cip/d-render-plugin-cci/esm/input/basic/input'
// import { CipFormInputTransform } from 'd-render'
import { formInputProps, fromInputEmits, useFormInput } from '@d-render/shared'
import { useEventConfigure, bindEvent } from '../use-event-configure'

export default {
  name: 'input',
  props: formInputProps,
  emits: fromInputEmits,
  setup (props, ctx) {
    const {
      proxyValue,
      securityConfig
    } = useFormInput(props, ctx)
    const handleEvent = useEventConfigure()

    return () => {
      const { hideItem, ...otherConfig } = securityConfig.value
      return !hideItem && <CipInput v-model={proxyValue.value} config={otherConfig} onUpdate:modelValue={(e) => bindEvent(handleEvent, 'input', props, e)} />
    }
  }
}
