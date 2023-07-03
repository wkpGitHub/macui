import { layoutProps } from '@d-render/shared'
import { useComponentSlots } from '../use-component-slots'
export default {
  props: layoutProps,
  setup (props, context) {
    const { componentSlots } = useComponentSlots(props, context)
    // fieldList 存放地址 options.value[0].children
    return () => {
      return <div class="cip-search-form">
        <div class="search-form-design-wrapper">
          <div class="search-form-design-content">
            {componentSlots.value.default?.()}
          </div>
        </div>
      </div>
    }
  }
}
