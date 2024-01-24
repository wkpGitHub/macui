import { computed, h, inject, ref, watch } from 'vue'
import { formInputViewProps, fromInputEmits, useOptions, useFormView } from '@d-render/shared'
import { getUsingConfig, isArray } from '@cip/utils/util'
import { getFxValue } from '../use-event-configure'
import axiosInstance from '@lc/views/app/pages/api'
export default {
  props: { ...formInputViewProps, multiple: Boolean },
  emits: [...fromInputEmits],
  setup (props) {
    const drPageRender = inject('drPageRender', {})
    const options = ref([])
    const { securityConfig } = useFormView(props)
    const multiple = computed(() => {
      return getUsingConfig(securityConfig.value.multiple, props.multiple)
    })
    const { optionProps, splitKey } = useOptions(props, multiple)
    watch(() => securityConfig.value.optApiConfig, optApiConfig => {
      switch (optApiConfig?.optType) {
        case 'custom': options.value = securityConfig.value.options.map(item => ({ [optionProps.value.label]: item.label, [optionProps.value.value]: getFxValue(item.value, drPageRender) }))
          break
        case 'http': axiosInstance({ url: optApiConfig.optHttp }).then(({ data }) => { options.value = data.data.list })
          break
        case 'ctx': options.value = getFxValue(optApiConfig.optCtxVar, drPageRender)
      }
    }, { immediate: true })
    const viewValue = computed(() => {
      const _map = options.value.reduce((total, current) => {
        total[current[optionProps.value.value]] = current[optionProps.value.label]
        return total
      }, {})
      if (isArray(props.modelValue)) {
        return props.modelValue.map(item => _map[item]).join(splitKey.value)
      }
      return _map[props.modelValue]
    })
    return () => h('span', {}, [viewValue.value])
  }
}
