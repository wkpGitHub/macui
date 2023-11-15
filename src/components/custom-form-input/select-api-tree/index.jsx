import { defineComponent } from 'vue'
import { ElInput, ElIcon } from 'element-plus'
import { formInputProps, fromInputEmits, useFormInput } from '@d-render/shared'
import { MoreFilled } from '@element-plus/icons-vue'

import { useFxDialog } from './hooks'

export default defineComponent({
  props: formInputProps,
  emits: fromInputEmits,
  setup (props, ctx) {
    const { proxyValue, proxyOtherValue } = useFormInput(props, ctx)
    const { state, render } = useFxDialog(proxyValue, proxyOtherValue)

    return () => <>
      <ElInput v-model={proxyValue.value}>{{
        suffix: () => <ElIcon style="cursor: pointer" onClick={() => { state.isShow = true }}><MoreFilled /></ElIcon>
      }}</ElInput>
      {render()}
    </>
  }
})
