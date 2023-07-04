import CipPagination from '@cip/components/cip-pagination'
import { formInputProps, fromInputEmits, useFormInput, useInputProps } from '@d-render/shared'
import { computed } from 'vue'
export default {
  props: formInputProps,
  emits: fromInputEmits,
  setup (props, ctx) {
    const { proxyValue } = useFormInput(props, ctx, { maxOtherKey: 2 })
    const inputProps = useInputProps(props, ['layout', 'limit', 'offset', 'pageSizes'])
    const pageSizes = computed(() => {
      return inputProps.value.pageSizes?.map(item => +item)
    })
    return () => <CipPagination { ...inputProps.value } v-model:limit={proxyValue.value} pageSizes={pageSizes.value}></CipPagination>
  }
}
