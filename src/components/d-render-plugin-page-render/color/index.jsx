import { ElColorPicker } from 'element-plus'
import { formInputProps, fromInputEmits, useFormInput } from '@d-render/shared'

export default {
  name: 'input',
  props: formInputProps,
  emits: fromInputEmits,
  setup (props, ctx) {
    const {
      proxyValue,
      securityConfig
    } = useFormInput(props, ctx)

    return () => {
      const { hideItem, showAlpha = true, ...otherConfig } = securityConfig.value

      return !hideItem && <ElColorPicker {...otherConfig} showAlpha={showAlpha} v-model={proxyValue.value} />
    }
  }
}
