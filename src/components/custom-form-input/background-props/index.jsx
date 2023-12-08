import { defineComponent, reactive, watch, computed } from 'vue'
import { ElSelect, ElOption } from 'element-plus'
import { formInputProps, fromInputEmits, useFormInput } from '@d-render/shared'
import SetCssValue from '../set-css-value/set-item'

export default defineComponent({
  props: formInputProps,
  emits: fromInputEmits,
  setup (props, ctx) {
    const state = reactive({
      type: '',
      positionX: '',
      positionY: ''
    })
    const { proxyValue } = useFormInput(props, ctx)
    const placeholders = computed(() => props.config.placeholders || ['宽度', '高度'])

    if (proxyValue.value) {
      if ((props.config?.options || []).map(item => item.value).includes(proxyValue.value)) {
        state.type = proxyValue.value
      } else {
        state.type = 'custom'
        if (proxyValue.value !== 'custom') {
          const [positionX, positionY] = proxyValue.value.split(/\s+/)
          state.positionX = positionX
          state.positionY = positionY
        }
      }
    }

    watch([() => state.positionX, () => state.positionY], ([x, y]) => {
      proxyValue.value = `${x} ${y}`
    })

    watch(() => state.type, v => {
      proxyValue.value = v
    })

    return () => <div class="flex-between my-2" style={{ width: '100%' }}>
    <ElSelect size="small" v-model={state.type} style={{ width: '70px' }} class="mr-1 flex-shrink">
      <ElOption value="" label="无"></ElOption>
      {(props.config?.options || []).map(item => <ElOption key={item.value} label={item.label} value={item.value}></ElOption>)}
      <ElOption value="custom" label="自定义"></ElOption>
    </ElSelect>
    {state.type === 'custom' && <>
      <SetCssValue placeholder={placeholders.value[0]} style="width: 48%" v-model={state.positionX} />
      <SetCssValue placeholder={placeholders.value[1]} style="width: 48%" v-model={state.positionY} />
    </>}
  </div>
  }
})
