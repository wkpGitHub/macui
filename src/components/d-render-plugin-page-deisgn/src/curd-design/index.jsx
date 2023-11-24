import { PlList as CipPageLayoutList } from '@cip/page-layout'
import { layoutProps } from '@d-render/shared'
import { useComponentSlots } from '@/components/d-render-plugin-page-render/use-component-slots'
import './index.less'

export default {
  props: layoutProps,
  setup (props, context) {
    const { componentSlots } = useComponentSlots(props, context)
    return () => {
      const { options, type, hideItem, ...attr } = props.config
      const { dialog, ...layoutSlots } = componentSlots.value
      return !hideItem && <div>
        <CipPageLayoutList {...attr} v-slots={layoutSlots} />
        {dialog?.()}
      </div>
    }
  }
}
