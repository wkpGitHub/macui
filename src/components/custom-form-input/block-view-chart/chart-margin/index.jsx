import { formInputProps, useFormInput } from '@d-render/shared'
import {
  ElRow,
  ElCol,
  ElInput,
  ElTooltip
} from 'element-plus'
import './index.less'

export default {
  name: 'chartMargin',
  props: formInputProps,
  setup (props, ctx) {
    const { proxyValue, emitModelValue } = useFormInput(props, ctx)

    return () => <>
      <ElRow gutter={12}>
        <ElCol span={12}>
          <ElInput
            class="input-prefix-one"
            modelValue={proxyValue.value.top}
            onUpdate:modelValue={(val) => {
              proxyValue.value.top = val
              emitModelValue(proxyValue.value)
            }}
            style="margin-bottom: 8px;"
            placeholder="请输入"
          >
            {{
              prefix: () => <ElTooltip content="值可以是像 20 这样的具体像素值，可以是像 '20%' 这样相对于容器高宽的百分比">
                <div class="input-prefix-border">顶</div>
              </ElTooltip>
            }}
          </ElInput>
        </ElCol>
        <ElCol span={12}>
          <ElInput
            class="input-prefix-one"
            modelValue={proxyValue.value.right}
            onUpdate:modelValue={(val) => {
              proxyValue.value.right = val
              emitModelValue(proxyValue.value)
            }}
            placeholder="请输入"
          >
            {{
              prefix: () => <div class="input-prefix-border">右</div>
            }}
          </ElInput>
        </ElCol>
      </ElRow>
      <ElRow gutter={12}>
        <ElCol span={12}>
          <ElInput
            class="input-prefix-one"
            modelValue={proxyValue.value.left}
            onUpdate:modelValue={(val) => {
              proxyValue.value.left = val
              emitModelValue(proxyValue.value)
            }}
            placeholder="请输入"
          >
            {{
              prefix: () => <div class="input-prefix-border">左</div>
            }}
          </ElInput>
        </ElCol>
        <ElCol span={12}>
          <ElInput
            class="input-prefix-one"
            modelValue={proxyValue.value.bottom}
            onUpdate:modelValue={(val) => {
              proxyValue.value.bottom = val
              emitModelValue(proxyValue.value)
            }}
            placeholder="请输入"
          >
            {{
              prefix: () => <div class="input-prefix-border">底</div>
            }}
          </ElInput>
        </ElCol>
      </ElRow>
    </>
  }
}
