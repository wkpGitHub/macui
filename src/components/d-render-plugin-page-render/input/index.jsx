import { ElInput } from 'element-plus'
// import { CipFormInputTransform } from 'd-render'
import { formInputProps, fromInputEmits, useFormInput } from '@d-render/shared'
import { useEvents } from '../use-event'
import { getFxValue, useWatch } from '@lc/components/d-render-plugin-page-render/use-event-configure'
import { inject } from 'vue'

export default {
  name: 'input',
  props: formInputProps,
  emits: fromInputEmits,
  setup (props, ctx) {
    const {
      proxyValue,
      securityConfig
    } = useFormInput(props, ctx)
    const drPageRender = inject('drPageRender', {})
    if (securityConfig.value.defaultValue) {
      proxyValue.value = getFxValue(securityConfig.value.defaultValue || [], drPageRender)
    }
    const { eventMap } = useEvents(props, securityConfig)
    useWatch(proxyValue, securityConfig)

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
