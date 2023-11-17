import { ElRate } from 'element-plus'
import { useFormInput, formInputProps, fromInputEmits } from '@d-render/shared'
import { useRateConfig } from '@cip/cd-render-plugin-cci/esm/input/basic/rate/use-rate-config.js'
export default {
  props: formInputProps,
  emits: [...fromInputEmits],
  setup (props, context) {
    const formInput = useFormInput(props, context)
    const { proxyValue, securityConfig } = formInput
    const { allowHalf, max } = useRateConfig(formInput)

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
