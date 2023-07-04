import CipPagination from '@cip/components/cip-pagination'
import { formInputProps, fromInputEmits, useFormInput, useInputProps } from '@d-render/shared'
export default {
  props: formInputProps,
  emits: fromInputEmits,
  setup (props, ctx) {
    const formInput = useFormInput(props, ctx, { maxOtherKey: 2 })
    console.log(formInput)
    const inputProps = useInputProps(props, ['layout', 'limit', 'offset'])
    return () => <CipPagination { ...inputProps.value }></CipPagination>
  }
}
