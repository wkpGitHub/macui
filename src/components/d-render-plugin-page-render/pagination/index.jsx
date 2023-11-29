import CipPagination from '@cip/components/cip-pagination'
import { formInputProps, fromInputEmits, useFormInput, useInputProps } from '@d-render/shared'
import { computed, inject } from 'vue'
import { useEventConfigure, getListConfigById } from '../use-event-configure'
import { v4 as uuidv4 } from 'uuid'
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
        console.log(Math.floor(val / (proxyValue.value ?? 10)) + 1)
        proxyOtherValue[0].value = Math.floor(val / (proxyValue.value ?? 10)) + 1
      }
    })
    const handleEvent = useEventConfigure()

    const drDesign = inject('drDesign')
    if (drDesign && !props.config.otherKey?.length) {
      const paginationItem = getListConfigById(drDesign.schema.list, props.id)
      paginationItem.config.otherKey = [`pageNum_${uuidv4()}`, `total_${uuidv4()}`]
    }

    return () => <CipPagination
      { ...inputProps.value }
      v-model:limit={proxyValue.value}
      v-model:offset={offset.value}
      total={proxyOtherValue[1].value}
      pageSizes={pageSizes.value}
      onRefresh={() => handleEvent(inputProps.value.onRefresh)}
    ></CipPagination>
  }
}
