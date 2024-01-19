// import { ElInput } from 'element-plus'
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
    const { eventMap } = useEvents(props, securityConfig)
    useWatch(proxyValue, securityConfig)

    return () => {
      const { hideItem, ...otherConfig } = securityConfig.value
      let _v = ''
      if (securityConfig.value.defaultValue) {
        _v = getFxValue(securityConfig.value.defaultValue || [], drPageRender)
      }
      return !hideItem && <span
        // config={otherConfig}
        {...otherConfig}
        {...eventMap.value}
      >{proxyValue.value || _v}</span>
    }
  }
}
