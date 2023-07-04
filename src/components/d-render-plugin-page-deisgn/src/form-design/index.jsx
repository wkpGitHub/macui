import { layoutProps } from '@d-render/shared'
import { computed } from 'vue'
import { CipForm } from 'd-render'
import { useComponentSlots } from '@/components/d-render-plugin-page-render/use-component-slots'
import './index.less'

export default {
  props: layoutProps,
  setup (props, context) {
    const { componentSlots } = useComponentSlots(props, context)
    const labelPosition = computed(() => {
      return props.config.labelPosition
    })
    // fieldList 存放地址 options.value[0].children
    return () => {
      return <CipForm class="cip-form" fieldList={[]} grid={props.config.grid} labelPosition={labelPosition.value}>
        <div class="form-design-wrapper">
          <div class="form-design-content">
            {componentSlots.value.default?.()}
          </div>
        </div>
      </CipForm>
    }
  }
}
