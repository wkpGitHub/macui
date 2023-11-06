import { PlHandle as CipPageHandle } from '@cip/page-layout'
import { layoutProps } from '@d-render/shared'
import { useComponentSlots } from '@/components/d-render-plugin-page-render/use-component-slots'
import './index.less'

export default {
  props: layoutProps,
  setup (props, context) {
    const { componentSlots } = useComponentSlots(props, context)
    return () => {
      const { options, type, ...attr } = props.config
      return <CipPageHandle {...attr} v-slots={componentSlots.value} />
    }
  }
}
