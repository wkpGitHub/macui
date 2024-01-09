import { defineComponent, watch, reactive } from 'vue'
import { formInputProps, fromInputEmits, useFormInput } from '@d-render/shared'
import SetCssValue from '../set-css-value/set-item'

export default defineComponent({
  props: formInputProps,
  emits: fromInputEmits,
  setup (props, ctx) {
    const { proxyValue } = useFormInput(props, ctx)
    const state = reactive({
      x: '',
      y: ''
    })
    watch(proxyValue, v => {
      const [x, y] = (v || '').split(' ')
      state.x = x
      state.y = y
    }, { immediate: true })

    function updateValue (key, v) {
      state[key] = v
      proxyValue.value = `${state.x} ${state.y}`
    }

    return () => <div class="flex-between" style={{ width: '100%' }}>
    <SetCssValue placeholder='x轴间距' style="width: 48%" model-value={state.x} onUpdate:modelValue={v => updateValue('x', v)} />
    <SetCssValue placeholder='y轴间距' style="width: 48%" model-value={state.y} onUpdate:modelValue={v => updateValue('y', v)} />
  </div>
  }
})
