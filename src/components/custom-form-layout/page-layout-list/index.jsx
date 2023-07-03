import CipPageLayoutList from '@cip/components/page-layout/list'
import { computed } from 'vue'
import { useFormLayoutOptions, layoutProps } from '@d-render/shared'
export default {
  props: layoutProps,
  setup (props, context) {
    const { options, updateConfig, ...handler } = useFormLayoutOptions({ props, emit: context.emit })
    // 历史及兼容性考虑需要slotsConfig 为数组  slotsC
    const componentSlots = computed(() => {
      return props.config.usingSlots.reduce((acc, name, idx) => {
        const slotConfig = options.value.find(v => v.key === name)
        acc[name] = () => context.slots.item({ children: slotConfig?.children ?? [], optionIndex: idx, isShow: props.config._isShow, ...handler })
        return acc
      }, {})
    })
    return () => {
      const { options, type, ...attr } = props.config
      return <CipPageLayoutList {...attr} v-slots={componentSlots.value} />
    }
  }
}
