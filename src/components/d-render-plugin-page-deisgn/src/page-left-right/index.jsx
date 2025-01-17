import { PlLeftRight as CipPageLeftRight } from '@cip/page-layout'
import { layoutProps } from '@d-render/shared'
import { useComponentSlots } from '@lc/components/d-render-plugin-page-render/use-component-slots'

export default {
  props: layoutProps,
  setup (props, context) {
    const { componentSlots } = useComponentSlots(props, context)
    return () => {
      const { options, type, ...attr } = props.config
      return <CipPageLeftRight {...attr} v-slots={componentSlots.value} />
    }
  }
}
