import { layoutProps } from '@d-render/shared'
import { useComponentSlots } from '@lc/components/d-render-plugin-page-render/use-component-slots'

export default {
  name: 'input',
  props: layoutProps,
  setup (props, context) {
    const { componentSlots } = useComponentSlots(props, context)

    return () => {
      const { hideItem, ...otherConfig } = props.config

      return !hideItem && <div {...otherConfig}>{componentSlots.value.default?.()}</div>
    }
  }
}
