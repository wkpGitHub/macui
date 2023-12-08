import { defineComponent, reactive, watch } from 'vue'
import { ElSelect, ElOption, ElColorPicker } from 'element-plus'
import SetCssValue from '../set-css-value/set-item'

export default defineComponent({
  props: ['modelValue'],
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const state = reactive({
      width: '',
      style: '',
      color: ''
    })

    watch(() => props.modelValue, v => {
      const [width, style, ...color] = v.split(/\s+/)
      state.width = width
      state.style = style
      state.color = color.join(' ')
    }, { immediate: true })

    watch(state, v => {
      emit('update:modelValue', `${v.width} ${v.style} ${v.color}`)
    })

    return () => <div class="flex-between" style={{ columnGap: '2px' }}>
      <SetCssValue v-model={state.width} />
      <ElSelect size="small" v-model={state.style} placeholder="样式">
        <ElOption label="实线" value="solid"></ElOption>
        <ElOption label="方形虚线" value="dashed"></ElOption>
        <ElOption label="圆点虚线" value="dotted"></ElOption>
      </ElSelect>
      <ElColorPicker size="small" show-alpha v-model={state.color} />
    </div >
  }
})
