import { ElSelect, ElOption } from 'element-plus'
import { inject } from 'vue'
import { formInputProps, fromInputEmits, useFormInput } from '@d-render/shared'

export default {
  props: formInputProps,
  emits: fromInputEmits,
  setup (props, ctx) {
    const { proxyValue } = useFormInput(props, ctx)
    const drDesign = inject('drDesign', {})

    return () => <ElSelect style="width: 100%" v-model={proxyValue.value} value-key="name">
      {drDesign.schema?.dataModel?.map(m => <ElOption label={m.title} value={m} key={m.name} />)}
    </ElSelect>
  }
}
