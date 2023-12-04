// import { CipFormInputTransform } from 'd-render'
import { formInputProps, fromInputEmits, useFormInput } from '@d-render/shared'
import { useEvents } from '../use-event'
import { getFxValue, useWatch } from '@/components/d-render-plugin-page-render/use-event-configure'
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
    const drPageRender = inject('drPageRender', { model: {} })

    const { eventMap } = useEvents(props, securityConfig)
    useWatch(proxyValue, securityConfig)

    return () => {
      const { hideItem, ...otherConfig } = securityConfig.value
      if (securityConfig.value.defaultValue) {
        proxyValue.value = getFxValue(securityConfig.value.defaultValue || [], drPageRender)
      }
      return !hideItem && <img src={proxyValue.value} {...eventMap.value} {...otherConfig} />
    }
  }
}
