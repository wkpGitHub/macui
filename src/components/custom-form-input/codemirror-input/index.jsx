import { computed, defineComponent, watch } from 'vue'
import { useFormItem } from 'element-plus'
import { useFormInput, formInputProps, fromInputEmits } from '@d-render/shared'
import CipCodeMirror from '@cip/code-mirror'

import 'codemirror/theme/eclipse.css'

export default defineComponent({
  name: 'code-mirror-input',
  props: formInputProps,
  emits: [...fromInputEmits],
  setup (props, ctx) {
    const {
      securityConfig,
      width,
      proxyValue
    } = useFormInput(props, ctx)
    const { formItem } = useFormItem()

    watch(() => proxyValue.value, () => {
      if (!securityConfig.value.skipValidateEvent) {
        formItem?.validate?.('change').catch((err) => console.log(err, 'code-mirror-input validate false'))
      }
    })

    const height = computed(() => securityConfig.value.height || '300px')
    return () => <CipCodeMirror
      v-model={proxyValue.value}
      mode={securityConfig.value.mode || 'javascript'}
      theme="eclipse"
      height={height.value}
      width={width.value}
      style={{ width: width.value, height: height.value }}
      readonly={!!securityConfig.value.readonly}
    ></CipCodeMirror>
  }
})
