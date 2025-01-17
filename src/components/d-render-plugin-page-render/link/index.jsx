// import { CipFormInputTransform } from 'd-render'
import { formInputProps, fromInputEmits, useFormInput } from '@d-render/shared'
import { getFxValue } from '@lc/components/d-render-plugin-page-render/use-event-configure'
import { inject, computed } from 'vue'
import { ElLink } from 'element-plus'

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

    function getDisabled ({ config }) {
      if (config.disabled === 'yes') {
        return true
      } else {
        return getFxValue(securityConfig.value.disabledFx, drPageRender)
      }
    }

    const _href = computed(() => {
      let _url = securityConfig.value.href
      const query = securityConfig.value.params?.map(item => {
        if (item.field) return `${item.name}=${props.dependOnValues[item.field]}`
        else return `${item.name}=${getFxValue(item.value, drPageRender)}`
      }).join('&')
      if (query) {
        if (_url.indexOf('?') > -1) {
          _url = _url + '&' + query
        } else {
          _url = _url + '?' + query
        }
      }
      return _url
    })

    return () => {
      const { hideItem, newTarget, underline, defaultValue } = securityConfig.value
      if (defaultValue?.length) {
        proxyValue.value = getFxValue(securityConfig.value.defaultValue, drPageRender)
      }
      return !hideItem && <ElLink type="primary" href={_href.value} underline={underline} target={newTarget ? '_blank' : ''} disabled={getDisabled(props)}>{proxyValue.value}</ElLink>
    }
  }
}
