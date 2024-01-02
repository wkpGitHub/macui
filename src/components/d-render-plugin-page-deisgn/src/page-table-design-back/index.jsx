import { layoutProps } from '@d-render/shared'
import { useComponentSlots } from '@lc/components/d-render-plugin-page-render/use-component-slots'
import { CipForm } from 'd-render'
import './index.less'
export default {
  props: layoutProps,
  setup (props, context) {
    const { componentSlots } = useComponentSlots(props, context)
    // fieldList 存放地址 options.value[0].children
    return () => {
      return <CipForm fieldList={[]}>
        <div class="table-design-wrapper">
          <div class="table-design-content">
            {componentSlots.value.default?.()}
          </div>
        </div>
      </CipForm>
    }
  }
}
