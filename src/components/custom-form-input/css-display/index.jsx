import { defineComponent } from 'vue'
import { ElSelect, ElOption } from 'element-plus'
import { formInputProps, fromInputEmits, useFormInput } from '@d-render/shared'

export default defineComponent({
  // 定义组件的props
  props: formInputProps,
  // 定义组件的emits
  emits: fromInputEmits,
  // 组件的setup函数，用于初始化组件
  setup (props, ctx) {
    // 使用useFormInput函数，获取proxyValue和proxyOtherValue
    const { proxyValue, proxyOtherValue } = useFormInput(props, ctx, { maxOtherKey: 2 })

    // 定义options数组，用于渲染下拉框
    const options = [
      { value: 'inline', label: '行内' },
      { value: 'inline-block', label: '行块' },
      { value: 'block', label: '块级' },
      { value: 'flex', label: '弹性' },
      // { value: 'grid', label: '网格' },
      { value: 'table', label: '表格' }
    ]

    // 定义positionOptions数组，用于渲染下拉框
    const positionOptions = [
      { label: '靠前', value: 'flex-start' },
      { label: '居中', value: 'center' },
      { label: '靠后', value: 'flex-end' },
      { label: '均匀', value: 'space-around' },
      { label: '等分', value: 'space-between' }
    ]
    // 渲染组件
    return () => <div style={{ width: '100%' }} class="flex">
      <ElSelect size="small" v-model={proxyValue.value} style={{ width: '70px' }} class="mr-1 flex-shrink">
        {options.map(item => <ElOption value={item.value} label={item.label}></ElOption>)}
      </ElSelect>
      {proxyValue.value === 'flex' && <>
        <div class="flex">
          <ElSelect size="small" class="mr-1" v-model={proxyOtherValue[0].value} placeholder="主轴">
            {positionOptions.map(item => <ElOption value={item.value} label={item.label}></ElOption>)}
          </ElSelect>
          <ElSelect size="small" v-model={proxyOtherValue[1].value} placeholder="辅轴">
            {positionOptions.map(item => <ElOption value={item.value} label={item.label}></ElOption>)}
          </ElSelect>
        </div>
      </>}
    </div >
  }
})
