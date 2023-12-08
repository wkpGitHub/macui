import { defineComponent } from 'vue'
import { ElRadioGroup, ElRadioButton } from 'element-plus'
import { formInputProps, fromInputEmits, useFormInput } from '@d-render/shared'
import SetCssValue from '../set-css-value/set-item'

export default defineComponent({
  props: formInputProps,
  emits: fromInputEmits,
  setup (props, ctx) {
    const { proxyValue, proxyOtherValue } = useFormInput(props, ctx, { maxOtherKey: 4 })
    const options = [
      { label: '无', value: 'static' },
      { label: '相对', value: 'relative' },
      { label: '绝对', value: 'absolute' },
      { label: '固定', value: 'fixed' },
      { label: '粘性', value: 'sticky' }
    ]

    return () => <div style={{ width: '100%' }}>
      <ElRadioGroup v-model={proxyValue.value}>
        {options.map(item => <ElRadioButton size="small" label={item.value}>{item.label}</ElRadioButton>)}
      </ElRadioGroup>
      <div style="color: rgb(102, 102, 102)">位置</div>
      <div class="flex-center"><SetCssValue placeholder='上' style="width: 48%" v-model={proxyOtherValue[0].value} /></div>
      <div class="flex-between my-2">
        <SetCssValue placeholder='左' style="width: 48%" v-model={proxyOtherValue[2].value} />
        <SetCssValue placeholder='右' style="width: 48%" v-model={proxyOtherValue[3].value} />
      </div>
      <div class="flex-center"><SetCssValue placeholder='下' style="width: 48%" v-model={proxyOtherValue[1].value} /></div>
    </div>
  }
})
