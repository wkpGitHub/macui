import { defineComponent, reactive, watch, inject } from 'vue'
import { ElInput, ElIcon, ElTooltip } from 'element-plus'
import { formInputProps, fromInputEmits, useFormInput } from '@d-render/shared'
import CipSvgIcon from '@cip/components/cip-svg-icon'
import './index.less'
import { useFxDialog } from './hooks'

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
    const { proxyValue, proxyOtherValue, securityConfig } = useFormInput(props, ctx)
    if (!proxyValue.value) proxyValue.value = []
    const drDesign = inject('drDesign', {})
    const state = reactive({
      readonly: false,
      str: ''
    })
    const { state: fxState, render } = useFxDialog(proxyValue, proxyOtherValue, securityConfig.value, drDesign, state)

    function onClear () {
      proxyValue.value = []
      fxState.list = []
      state.str = ''
    }

    if (props.config.otherKey) {
      watch(() => state.str, v => {
        proxyOtherValue[0].value = v
      })
    }

    watch(proxyValue, v => {
      if (v.length > 1) state.readonly = true
      else if (v.length === 1) {
        state.readonly = v[0].type !== 'constant'
      } else {
        state.readonly = false
      }
    }, { immediate: true })

    function updateModelValue (v) {
      if (state.readonly) return false
      proxyValue.value = [{ desc: v, value: v, type: 'constant' }]
      fxState.list = [{ desc: v, value: v, type: 'constant' }]
      state.str = v
    }

    function genContent () {
      return <ElInput model-value={state.str} onUpdate:modelValue={updateModelValue} clearable onClear={onClear} class="fx-input">{{
        suffix: () => <ElIcon style="cursor: pointer" onClick={() => { fxState.isShow = true }}><CipSvgIcon name="function" /></ElIcon>
      }}</ElInput>
    }
    return () => <>
      {state.readonly ? <ElTooltip content={state.str} placement="top">{genContent()}</ElTooltip> : genContent()}
      {render()}
    </>
  }
})