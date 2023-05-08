import { formInputProps, useFormInput } from '@d-render/shared'
import { ElInput } from 'element-plus'

export default {
  name: 'HelloComponent',
  props: formInputProps,
  setup (props, context) {
    const FormInput = useFormInput(props, context)
    return () => <ElInput modelValue={props.modelValue} onUpdate:modelValue={(val)=>FormInput.emitModelValue(val)}/>
  }
}
