import { computed } from 'vue'
import CipDialog from '@cip/components/cip-dialog'
import { layoutProps } from '@d-render/shared'
import { useComponentSlots } from '../use-component-slots'
import { useEventConfigure } from '../use-event-configure'
export default {
  props: { ...layoutProps, modelValue: {} },
  setup (props, context) {
    const { componentSlots, proxyValue } = useComponentSlots(props, context)
    const handleEvent = useEventConfigure()
    const onConfirm = computed(() => {
      return async (resolve, reject) => {
        const confirmConfig = props.config?.confirm
        try {
          console.log('confirmConfig', confirmConfig)
          await handleEvent(confirmConfig)
          resolve()
        } catch (e) {
          reject()
        }
      }
    })
    return () => {
      const { options, type, width, confirm, ...attrs } = props.config
      return <CipDialog {...attrs} v-model={proxyValue.value} onConfirm={onConfirm.value} v-slots={componentSlots.value} />
    }
  }
}
