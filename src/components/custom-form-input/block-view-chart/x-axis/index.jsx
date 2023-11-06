import { formInputProps, useFormInput } from '@d-render/shared'
import {
  ElInput,
  ElSelect,
  ElOption,
  ElTooltip
} from 'element-plus'
import './index.less'

export default {
  name: 'xAxis',
  props: formInputProps,
  setup (props, ctx) {
    const { proxyValue, emitModelValue } = useFormInput(props, ctx)

    return () => <div class="x-axis">
      <ElTooltip effect="dark"
                  placement="top"
                  content="x轴别名，优先作为坐标轴的名称，非必填项，内容中可以使用\n换行">
        <ElInput
          modelValue={proxyValue.value.alias}
          onUpdate:modelValue={(val) => {
            proxyValue.value.alias = val
            emitModelValue(proxyValue.value)
          }}
          class="form-item-xy"
          placeholder="x轴别名">
        </ElInput>
      </ElTooltip>

      <ElSelect
        modelValue={proxyValue.value.xType}
        onUpdate:modelValue={(val) => {
          proxyValue.value.xType = val
          emitModelValue(proxyValue.value)
        }}
        filterable
        default-first-option
        // style="width: 124px;"
        placeholder="请选择x轴类型">
        <ElOption value="category"
                  label="类目轴" />
        <ElOption value="value"
                  label="数值轴" />
        <ElOption value="time"
                  label="时间轴" />
        <ElOption value="log"
                  label="对数轴" />
        {/* <ElOption v-if="form.chartType == 'scatter'"
                  value="timexy"
                  label="切分时间" /> */}
      </ElSelect>
    </div>
  }
}
