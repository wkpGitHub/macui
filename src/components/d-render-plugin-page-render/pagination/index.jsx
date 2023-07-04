import CipPagination from '@cip/components/cip-pagination'
import { formInputProps, fromInputEmits, useFormInput, useInputProps } from '@d-render/shared'
export default {
  props: formInputProps,
  emits: fromInputEmits,
  setup (props, ctx) {
    const { proxyValue } = useFormInput(props, ctx, { maxOtherKey: 2 })
    const inputProps = useInputProps(props, ['layout'])
    return () => <CipPagination { ...inputProps.value } v-model:limit={proxyValue.value}></CipPagination>
  }
}
