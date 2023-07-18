import { PlList as CipPageLayoutList } from '@cip/page-layout'
import { layoutProps } from '@d-render/shared'
import { useComponentSlots } from '../use-component-slots'
import './index.less'
export default {
  props: layoutProps,
  setup (props, context) {
    const { componentSlots } = useComponentSlots(props, context)
    return () => {
      const { options, type, ...attr } = props.config
      return <CipPageLayoutList {...attr} v-slots={componentSlots.value} />
    }
  }
}
