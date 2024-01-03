import { computed, getCurrentInstance, h, inject, watch } from 'vue'
import { ElRadioGroup, ElRadio, ElRadioButton } from 'element-plus'
import { useFormInput, useOptions, formInputProps, fromInputEmits } from '@d-render/shared'
import { useEvents } from '../use-event'
import { getFxValue } from '../use-event-configure'
import axiosInstance from '@lc/views/app/pages/api'

export default {
  props: formInputProps,
  emits: [...fromInputEmits],
  setup (props, context) {
    const drPageRender = inject('drPageRender', {})
    const instance = getCurrentInstance()
    const { inputRef, width, updateStream, securityConfig } = useFormInput(props, context)
    const { optionProps, options, getOptions, proxyOptionsValue } = useOptions(props, false, updateStream)
    instance.ctx.getOptions = getOptions
    const display = computed(() => {
      return props.config?.display ?? 'inline-flex'
    })
    const isButton = computed(() => {
      return props.config?.isButton ?? false
    })

    watch(() => securityConfig.value.optApiConfig, optApiConfig => {
      switch (optApiConfig?.optType) {
        case 'custom': options.value = securityConfig.value.options.map(item => ({ [optionProps.value.label]: item.label, [optionProps.value.value]: getFxValue(item.value, drPageRender) }))
          break
        case 'http': axiosInstance({ url: optApiConfig.optHttp }).then(({ data }) => { options.value = data.data.list })
          break
        case 'ctx': options.value = getFxValue(optApiConfig.optCtxVar, drPageRender)
      }
    }, { immediate: true })

    const getRadioComponent = (isButton) => {
      return isButton ? ElRadioButton : ElRadio
    }
    const radioItem = (option) => {
      return h(getRadioComponent(isButton.value), {
        label: option[optionProps.value.value] ?? option,
        style: { display: display.value },
        disabled: option.disabled,
        size: props.config?.size
      }, {
        default: () => `${option[optionProps.value.label] ?? option}`
      })
    }

    const radioItems = () => options.value.map(radioItem)
    const { eventMap } = useEvents(props, securityConfig)
    return () => {
      return h(ElRadioGroup, {
        ...context.attrs,
        ref: inputRef,
        class: ['cip-basic-radio'],
        style: { width: width.value },
        disabled: props.disabled,
        modelValue: proxyOptionsValue.value,
        'onUpdate:modelValue': (value) => {
          proxyOptionsValue.value = value
        },
        ...eventMap.value
      },
      { default: () => radioItems() })
    }
  }
}
