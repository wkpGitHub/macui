import CipPagination from '@cip/components/cip-pagination'
import { formInputProps, fromInputEmits, useFormInput, useInputProps } from '@d-render/shared'
import { computed } from 'vue'
export default {
  props: formInputProps,
  emits: fromInputEmits,
  setup (props, ctx) {
    // otherKey pageNum total
    const { proxyValue, proxyOtherValue } = useFormInput(props, ctx, { maxOtherKey: 2 })
    const inputProps = useInputProps(props, [
      'layout',
      'pageSizes',
      'onRefresh'
    ])
    const pageSizes = computed(() => {
      return inputProps.value.pageSizes?.map(item => +item)
    })
    const offset = computed({
      get () {
        // pageNum -> offset
        return (proxyOtherValue[0].value - 1) * (proxyValue.value ?? 10)
      },
      set (val) {
        // offset -> pageNum
        proxyOtherValue[0].value = Math.floor(val / (proxyValue.value ?? 10)) + 1
      }
    })

    return () => <CipPagination
      { ...inputProps.value }
      v-model:limit={proxyValue.value}
      v-model:offset={offset.value}
      total={proxyOtherValue[1].value}
      pageSizes={pageSizes.value}
    ></CipPagination>
  }
}
