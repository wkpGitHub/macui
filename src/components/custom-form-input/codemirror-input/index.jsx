import { defineComponent } from 'vue'
import { useFormInput, formInputProps, fromInputEmits } from '@d-render/shared'
import CipCodeMirror from '@cip/code-mirror'

import 'codemirror/theme/eclipse.css'

export default defineComponent({
  name: 'code-mirrror-input',
  props: formInputProps,
  emits: [...fromInputEmits],
  setup (props, ctx) {
    const {
      securityConfig,
      width,
      proxyValue
    } = useFormInput(props, ctx)
    return () => <>
      <CipCodeMirror
        v-model={proxyValue.value}
        mode={securityConfig.value.mode || 'sql'}
        theme="eclipse"
        height="300px"
        width={width.value}
        style={{ width: width.value }}
      ></CipCodeMirror>
    </>
  }
})
