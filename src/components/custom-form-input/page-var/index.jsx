import { defineComponent, inject } from 'vue'
import { ElInput, ElIcon } from 'element-plus'
import { formInputProps, fromInputEmits, useFormInput } from '@d-render/shared'
import { MoreFilled } from '@element-plus/icons-vue'

import { useFxDialog } from './hooks'

export default defineComponent({
  props: formInputProps,
  emits: fromInputEmits,
  setup (props, ctx) {
    const { proxyValue, proxyOtherValue, securityConfig } = useFormInput(props, ctx)
    const drDesign = inject('drDesign', {})
    const { state, render } = useFxDialog(proxyValue, proxyOtherValue, securityConfig.value, drDesign)

    return () => <>
      <ElInput v-model={proxyValue.value}>{{
        suffix: () => <ElIcon style="cursor: pointer" onClick={() => { state.isShow = true }}><MoreFilled /></ElIcon>
      }}</ElInput>
      {render()}
    </>
  }
})
