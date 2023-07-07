import { ref } from 'vue'
import { layoutProps } from '@d-render/shared'
import { useComponentSlots } from '@/components/d-render-plugin-page-render/use-component-slots'

import './index.less'

export default {
  props: layoutProps,
  setup (props, context) {
    const { componentSlots } = useComponentSlots(props, context)
    const collapse = ref(false)
    const onClick = () => {
      collapse.value = !collapse.value
    }

    return () => {
      return <div class={`dialog-design ${collapse.value ? 'collapse' : ''}`}>
        <div class="dialog-design__btn" onClick={onClick}>{collapse.value ? '展开' : '收起'}</div>
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
