import { defineComponent, ref } from 'vue'
import { ElSelect, ElOption, ElInputNumber } from 'element-plus'
import { formInputProps, fromInputEmits, useFormInput } from '@d-render/shared'
import styles from './index.module.less'

export default defineComponent({
  props: formInputProps,
  emits: fromInputEmits,
  directives: {
    focus: {
      mounted (el, { value }) {
        if (value) el.focus()
      }
    }
  },
  setup (props, ctx) {
    const { proxyValue } = useFormInput(props, ctx)
    const option = ref('H')
    const number = ref(0)

    function updateModelValue (v) {
      proxyValue.value = [{ value: number, unit: option.value }]
    }

    return () => <div class={styles.flex}>
      <ElInputNumber v-model={number.value} onChange={updateModelValue}></ElInputNumber>
      <ElSelect v-model={option.value} onChange={updateModelValue} style={'width:25%'}>
          <ElOption key='1' label='小时' value={'H'}/>
          <ElOption key='2' label='天' value={'D'}/>
        </ElSelect>
    </div>
  }
})
