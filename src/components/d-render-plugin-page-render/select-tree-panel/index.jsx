import CipTree from '@cip/components/cip-tree'
import { formInputProps, fromInputEmits, useFormInput, useInputProps } from '@d-render/shared'
export default {
  props: formInputProps,
  emits: fromInputEmits,
  setup (props, ctx) {
    const { proxyValue } = useFormInput(props, ctx)
    const inputProps = useInputProps(props, ['options', 'showButton'])
    const handleNodeClick = ({ data }) => {
      proxyValue.value = data.value
    }
    return () => <CipTree
      onNode-click={handleNodeClick}
      currentNodeKey={proxyValue.value}
      highlightCurrent
      {
        ...inputProps.value
      }
    ></CipTree>
  }
}
