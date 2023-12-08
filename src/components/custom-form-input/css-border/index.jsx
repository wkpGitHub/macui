import { reactive, watch } from 'vue'
import { ElSelect, ElOption } from 'element-plus'
import { formInputProps, fromInputEmits, useFormInput } from '@d-render/shared'
import SetItem from './set-item'

export default {
  props: formInputProps,
  emits: fromInputEmits,
  setup (props, ctx) {
    const { proxyValue, proxyOtherValue } = useFormInput(props, ctx, { maxOtherKey: 4 })
    const state = reactive({
      index: 'all',
      data: ''
    })

    function updateValue (v) {
      state.data = v
      if (state.index === 'all') {
        proxyValue.value = v
      } else {
        proxyOtherValue[state.index].value = v
      }
    }

    watch(() => state.index, v => {
      if (v === 'all') {
        state.data = proxyValue.value
      } else {
        state.data = proxyOtherValue[v]?.value || ''
      }
    }, { immediate: true })

    return () => <div class="flex" style={{ width: '100%' }}>
      {props.config.otherKey && <ElSelect size="small" v-model={state.index} style={{ width: '70px' }} class="mr-1 flex-shrink">
        <ElOption value="all" label="全部"></ElOption>
        <ElOption value={0} label="上边"></ElOption>
        <ElOption value={1} label="下边"></ElOption>
        <ElOption value={2} label="左边"></ElOption>
        <ElOption value={3} label="右边"></ElOption>
      </ElSelect>}
      <SetItem modelValue={state.data} onUpdate:modelValue={updateValue} />
    </div>
  }
}
