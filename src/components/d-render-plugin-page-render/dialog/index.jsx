import CipDialog from '@cip/components/cip-dialog'
import { layoutProps } from '@d-render/shared'
import { useComponentSlots } from '../use-component-slots'

export default {
  props: layoutProps,
  setup (props, context) {
    const { componentSlots, proxyValue } = useComponentSlots(props, context)
    return () => {
      const { options, type, ...attr } = props.config
      return <CipDialog {...attr} v-model={proxyValue} v-slots={componentSlots.value} />
    }
  }
}
