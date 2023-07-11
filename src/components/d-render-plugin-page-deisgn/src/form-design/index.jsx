import { layoutProps } from '@d-render/shared'
import { computed, provide, reactive } from 'vue'
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
    provide('drSpParent', reactive({
      config: props.config
    }))
    // fieldList 存放地址 options.value[0].children
    return () => {
      return <CipForm class="cip-form" fieldList={[]} grid={1} labelPosition={labelPosition.value}>
        <div class="form-design-wrapper">
          <div class="form-design-content" style={`--dr-page-render-cols: ${props.config.grid}`}>
            {componentSlots.value.default?.()}
          </div>
        </div>
      </CipForm>
    }
  }
}
