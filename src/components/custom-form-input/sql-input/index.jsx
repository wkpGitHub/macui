import EncryptionCodeMirror from '@cihool/system/components/encryption-codeMirror'
import { useFormInput, formInputProps, fromInputEmits } from '@d-render/shared'
export default {
  props: formInputProps,
  emits: fromInputEmits,
  setup (props, ctx) {
    const { width, proxyValue } = useFormInput(props, ctx)
    return () => <EncryptionCodeMirror
      style={{ width: width.value }}
      v-model={proxyValue.value}
    >
    </EncryptionCodeMirror>
  }
}
