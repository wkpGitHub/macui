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
    const drPageRender = inject('drPageRender', { model: {} })
    const drDesign = inject('drDesign')

    const { eventMap } = useEvents(props, securityConfig)
    useWatch(proxyValue, securityConfig)

    return () => {
      const { hideItem, ...otherConfig } = securityConfig.value
      if (securityConfig.value.defaultValue) {
        proxyValue.value = getFxValue(securityConfig.value.defaultValue || [], drPageRender)
      }
      return !hideItem && <span {...eventMap.value} {...otherConfig}>{drDesign ? proxyValue.value || '占位文本' : proxyValue.value}</span>
    }
  }
}
