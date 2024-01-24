import { h } from 'vue'
import { formInputViewProps } from '@d-render/shared'
import SelectView from '../select/view'
export default {
  props: formInputViewProps,
  setup (props) {
    return () => h(SelectView, { ...props, multiple: false })
  }
}
