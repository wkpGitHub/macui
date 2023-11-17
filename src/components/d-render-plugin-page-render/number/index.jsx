
import { ElInputNumber } from 'element-plus'
import { useFormInput, formInputProps, fromInputEmits } from '@d-render/shared'
import { useEvents } from '../use-event'
import { computed, h } from 'vue'
export default {
  props: formInputProps,
  emits: [...fromInputEmits],
  setup (props, context) {
    const { width, securityConfig, proxyValue } = useFormInput(props, context)
    const hasUnit = computed(() => {
      return !!securityConfig.value.unit
    })
    const controls = computed(() => {
      if (hasUnit.value) return false
      return securityConfig.value.controls ?? true
    })
    const controlsPosition = computed(() => {
      if (hasUnit.value) return ''
      return securityConfig.value.controlsPosition ?? ''
    })
    const precision = computed(() => {
      return !securityConfig.value.noPrecision ? (securityConfig.value.precision ?? 0) : undefined
    })

    const { eventMap } = useEvents(props, securityConfig)

    return () => h(ElInputNumber, {
      class: {
        'basic-number': true,
        'basic-number--left': true,
        'basic-number--unit': !!hasUnit.value,
        'basic-number--no-controls': !controls.value,
        'basic-number-standard': controlsPosition.value !== 'right'
      },
      modelValue: proxyValue.value,
      'onUpdate:modelValue': val => { proxyValue.value = val },
      style: { width: width.value },
      step: securityConfig.value.step ?? 1,
      'step-strictly': securityConfig.value.stepStrictly ?? false,
      min: securityConfig.value.min ?? -Infinity,
      max: securityConfig.value.max ?? Infinity,
      placeholder: securityConfig.value.placeholder ?? '',
      precision: precision.value,
      controls: controls.value,
      disabled: props.disabled,
      'controls-position': controlsPosition.value,
      'data-unit': securityConfig.value.unit, // 此处利用 content: attr(data-unit);注入数据
      ...eventMap.value
    })
  }
}
