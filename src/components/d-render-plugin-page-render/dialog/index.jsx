import CipDialog from '@cip/components/cip-dialog'
import { layoutProps } from '@d-render/shared'
import { useComponentSlots } from '../use-component-slots'

export default {
  props: { ...layoutProps, modelValue: {} },
  setup (props, context) {
    const { componentSlots, proxyValue } = useComponentSlots(props, context)
    return () => {
      const { options, type, width, ...attr } = props.config
      return <CipDialog {...attr} v-model={proxyValue.value} v-slots={componentSlots.value} />
    }
  }
}
