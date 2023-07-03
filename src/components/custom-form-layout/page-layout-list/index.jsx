import CipPageLayoutList from '@cip/components/page-layout/list'
import { layoutProps } from '@d-render/shared'
import { useComponentSlots } from '@/components/page-design-components/use-component-slots'
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
