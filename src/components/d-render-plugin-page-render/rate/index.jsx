import { ElRate } from 'element-plus'
import { inject } from 'vue'
import { useFormInput, formInputProps, fromInputEmits } from '@d-render/shared'
import { useRateConfig } from '@cip/d-render-plugin-cci/esm/input/basic/rate/use-rate-config.js'
import { getFxValue } from '@lc/components/d-render-plugin-page-render/use-event-configure'
export default {
  props: formInputProps,
  emits: [...fromInputEmits],
  setup (props, context) {
    const drPageRender = inject('drPageRender', {})
    const formInput = useFormInput(props, context)
    const { proxyValue, securityConfig } = formInput
    const { allowHalf, max } = useRateConfig(formInput)
    if (securityConfig.value.defaultValue) {
      proxyValue.value = getFxValue(securityConfig.value.defaultValue || [], drPageRender)
    }
    return () => <div class={'cip-rate'}>
      <ElRate
        modelValue={props.modelValue ?? 0.1} // 当modelValue为假值时ElRate组价会默认emit0，导致defaultValue赋值不生效，所以传个0.1
        onUpdate:modelValue={val => { proxyValue.value = val }}
        allowHalf={allowHalf.value}
        disabled={props.disabled}
        max={max.value}
        showScore={securityConfig.value.showScore}
      />
    </div>
  }
}
