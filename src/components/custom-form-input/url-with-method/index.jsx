import { defineComponent } from 'vue'
import { ElInput, ElSelect, ElOption } from 'element-plus'
import { formInputProps, fromInputEmits, useFormInput } from '@d-render/shared'

export default defineComponent({
  name: 'url-with-method',
  props: formInputProps,
  emits: fromInputEmits,
  setup (props, ctx) {
    const {
      proxyValue,
      proxyOtherValue,
      // securityConfig,
      width
    } = useFormInput(props, ctx)

    const methodOpt = [
      { label: 'GET', value: 'GET' },
      { label: 'POST', value: 'POST' },
      { label: 'PUT', value: 'PUT' },
      { label: 'DELETE', value: 'DELETE' }
    ]

    return () => <ElInput v-model={proxyValue.value} style={{ width: width.value }}>
      {{
        prepend: () => <ElSelect
          modelValue={props.otherValue || 'GET'}
          onUpdate:modelValue={(val) => { proxyOtherValue[0].value = val } }
          style='width: 120px;'
        >
          {methodOpt.map(v => <ElOption label={v.label} value={v.value} key={v.value}></ElOption>)}
        </ElSelect>
      }}
    </ElInput>
  }
})
