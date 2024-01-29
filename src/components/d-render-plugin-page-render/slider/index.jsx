import { ElSlider } from 'element-plus'
import { inject } from 'vue'
import { useFormInput, formInputProps, fromInputEmits } from '@d-render/shared'
import { useSliderConfig } from '@cip/d-render-plugin-cci/esm/input/basic/slider/use-slider-config'
import { useEvents } from '../use-event'
import { getFxValue } from '@lc/components/d-render-plugin-page-render/use-event-configure'
export default {
  props: formInputProps,
  emits: [...fromInputEmits],
  setup (props, context) {
    const drPageRender = inject('drPageRender', {})
    const formInput = useFormInput(props, context)
    const { proxyValue, width, securityConfig } = formInput
    const { max, min, step } = useSliderConfig(formInput)
    const { eventMap } = useEvents(props, securityConfig)
    if (securityConfig.value.defaultValue) {
      proxyValue.value = getFxValue(securityConfig.value.defaultValue || [], drPageRender)
    }
    return () => <div class={'basic-slider'} style={{ width: width.value }}>
      <ElSlider
        v-model={proxyValue.value}
        max={max.value}
        min={min.value}
        step={step.value}
        disabled={props.disabled}
        marks={props.config.marks}
        show-input={securityConfig.value.showInput}
        range={securityConfig.value.range}
        tooltip-class="el-slider-tooltips__expand-class"
        {...eventMap.value}
      />
    </div>
  }
}
