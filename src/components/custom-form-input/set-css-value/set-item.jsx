import { reactive, watch } from 'vue'
import { ElSelect, ElOption, ElInput } from 'element-plus'

export default {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const state = reactive({
      unit: 'px',
      value: ''
    })

    watch(() => props.modelValue, (v) => {
      // eslint-disable-next-line no-unused-vars
      const [match, $1, $2] = (v.match(/^(.*?)(px|%)$/) || [null, '', 'px'])
      state.value = $1
      state.unit = $2
    }, { immediate: true })

    function updateValue (v) {
      if (/^(-?\d+)(\.\d*)?$/.test(v)) {
        state.value = v
      }
    }

    watch([() => state.value, () => state.unit], ([value, unit]) => {
      emit('update:modelValue', value + unit)
      // if (value) {
      //   emit('update:modelValue', value + unit)
      // } else {
      //   emit('update:modelValue', '')
      // }
    })

    function onClear () {
      state.value = ''
      emit('update:modelValue', '')
    }

    return () => <ElInput size="small" {...props} modelValue={state.value} onUpdate:modelValue={updateValue} clearable onClear={onClear}>{{
      append: () => <ElSelect size="small" v-model={state.unit} style={{ width: '70px' }}>
        <ElOption value="px" label="像素"></ElOption>
        <ElOption value="%" label="百分比"></ElOption>
      </ElSelect>
    }}</ElInput>
  }
}
