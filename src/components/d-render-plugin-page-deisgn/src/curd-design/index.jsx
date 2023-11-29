import { PlList as CipPageLayoutList } from '@cip/page-layout'
import { layoutProps } from '@d-render/shared'
import { useComponentSlots } from '@/components/d-render-plugin-page-render/use-component-slots'
import './index.less'
import { CipButton } from '@xdp/button'

export default {
  props: layoutProps,
  setup (props, context) {
    const { componentSlots } = useComponentSlots(props, context)
    return () => {
      const { options, type, hideItem, ...attr } = props.config
      return !hideItem && <div>
        <CipPageLayoutList {...attr}>{{
          title: () => componentSlots.value.title?.(),
          filter: () => componentSlots.value.filter(),
          default: () => componentSlots.value.default(),
          pagination: () => componentSlots.value.pagination(),
          handle: () => componentSlots.value.handle
            ? componentSlots.value.handle()
            : <>
           <CipButton buttonType="create">新增</CipButton>
           <CipButton buttonType="batchDelete">删除</CipButton>
          </>
        }}</CipPageLayoutList>
        {componentSlots.value.dialog?.()}
      </div>
    }
  }
}
