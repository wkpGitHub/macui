import { computed } from 'vue'
import { layoutProps } from '@d-render/shared'
import './index.less'
export default {
  name: 'LayoutBox',
  props: {
    theme: {
      type: String,
      default: 'row'
    },
    size: {
      type: [Number, String],
      default: 220
    },
    ...layoutProps
  },
  setup (props, ctx) {
    const { slots: componentSlots } = ctx
    console.log(componentSlots, 'componentSlots')
    const flexDirection = computed(() => {
      return props.theme
    })
    const contentStyle = computed(() => {
      const type = props.theme === 'row' ? 'width' : 'height'
      const position = props.theme === 'row' ? 'left' : 'top'
      return {
        [type]: 0,
        [`border-${position}`]: '1px solid #ededed'
      }
    })
    const size = computed(() => {
      const type = props.theme === 'row' ? 'width' : 'height'
      return {
        type,
        size: isNaN(props.size) ? props.size : `${props.size}px`
      }
    })
    return () => <div class='layout-box-wrapper' style={{ 'flex-direction': flexDirection.value }}>
      <div class='layout-box-wrapper--panel' style={{
        [size.value.type]: size.value.size
      }}>
        {
          componentSlots?.operate?.()
        }
      </div>
      <div class='layout-box-wrapper--content' style={contentStyle.value}>
        {
          {
            default: () => componentSlots?.content?.()
          }
        }
      </div>
    </div>
  }
}
