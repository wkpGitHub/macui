import { defineComponent, computed, watch } from 'vue'
import { ElFormItem } from 'element-plus'
import { formInputProps, fromInputEmits, useFormInput } from '@d-render/shared'
import PageFx from '../page-fx'

export default defineComponent({
  props: formInputProps,
  emits: fromInputEmits,
  setup (props, ctx) {
    const { proxyValue } = useFormInput(props, ctx)
    const args = computed(() => {
      return props.dependOnValues._method?.args || []
    })
    watch(() => props.dependOnValues._method, (v, oldV) => {
      proxyValue.value = (v.args || []).map(() => [])
    })

    return () => <div class="column-grid-form" style={{ 'grid-template-columns': `repeat(${args.value.length}, 1fr)` }}>
      {args.value.map((a, i) => <ElFormItem label={a} >
        <PageFx v-model={proxyValue.value[i]} />
      </ElFormItem>)}
    </div >
  }
})
