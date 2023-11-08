import { computed } from 'vue'
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
    const { proxyValue, emitModelValue, securityConfig } = useFormInput(props, ctx)
    const xFields = computed(() => {
      return securityConfig.value.xFields || []
    })

    const xFieldChange = () => {
      emitModelValue(proxyValue.value)
    }

    return () => <div class="x-axis">
      <ElSelect
        v-model={proxyValue.value.field}
        class="form-item-xy"
        filterable
        placeholder="请选择字段"
        oChange={xFieldChange}
      >
        {
          xFields.value.map(item => (
            <ElOption key={'xo' + item.name} label={item.title} value={item.name} />
          ))
        }
      </ElSelect>

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
