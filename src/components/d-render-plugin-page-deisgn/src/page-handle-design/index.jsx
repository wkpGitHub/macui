import { PlHandle as CipPageHandle } from '@cip/page-layout'
import { layoutProps } from '@d-render/shared'
import { useComponentSlots } from '@lc/components/d-render-plugin-page-render/use-component-slots'
import { ElButton } from 'element-plus'
import './index.less'

export default {
  props: layoutProps,
  setup (props, context) {
    const { componentSlots } = useComponentSlots(props, context)
    return () => {
      const { options, type, ...attr } = props.config
      return <CipPageHandle {...attr}>{{
        default: () => componentSlots.value.default?.(),
        handle: () => componentSlots.value.handle
          ? <div style="display: inline-flex">{componentSlots.value.handle?.()}</div>
          : <>
          <ElButton type="primary">确定</ElButton>
          <ElButton>取消</ElButton>
        </>
      }}</CipPageHandle>
    }
  }
}
