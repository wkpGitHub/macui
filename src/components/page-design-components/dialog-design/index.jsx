import { layoutProps } from '@d-render/shared'
import { useComponentSlots } from '../use-component-slots'

import './index.less'

export default {
  props: layoutProps,
  setup (props, context) {
    const { componentSlots } = useComponentSlots(props, context)

    return () => {
      return <div class="dialog-design">
        <div class="dialog-design__title">{props.config.title}</div>
        <div>
          {componentSlots.value.default?.()}
        </div>
        <div class="dialog-design__footer">
          {componentSlots.value.footer?.()}
        </div>
      </div>
    }
  }
}
