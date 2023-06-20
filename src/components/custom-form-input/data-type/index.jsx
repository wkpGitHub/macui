import { formInputProps, formInputEmits, useFormInput } from '@d-render/shared'
// import { CipTable, CipForm } from 'd-render'
import { ElSelect, ElOption } from 'element-plus'
import { ref } from 'vue'
import { baseDicService, dataInfoService } from '@/api/service/chr'
import './index.less'
export default {
  props: formInputProps,
  emits: formInputEmits,
  setup (props, context) {
    const { proxyValue, securityConfig, proxyOtherValue } = useFormInput(props, context, { maxOtherKey: 2 })
    const otherOptions = ref([])
    const optionProps = ref({ value: 'value', label: 'label' })
    const otherValueIndex = ref(0)
    const getOtherOptions = async (val = proxyValue.value) => {
      console.log('getOtherOptions', val, proxyValue.value)
      if (val === 'basic') {
        const { data } = await baseDicService.basicType()
        otherOptions.value = data
        optionProps.value = { value: 'id', label: 'name' }
        otherValueIndex.value = 0
      } else if (val === 'entity') {
        const { data } = await dataInfoService.infoList({ type: 'entity' })
        otherOptions.value = data
        optionProps.value = { value: 'id', label: 'name' }
        otherValueIndex.value = 1
      }
    }
    if (proxyValue.value) {
      getOtherOptions()
    }
    return () => <div class={'data-type'}>
      <ElSelect v-model={proxyValue.value} onChange={(val) => getOtherOptions(val)}>
        {securityConfig.value.options.map(option => <ElOption key={option} value={option}>{option}</ElOption>)}
      </ElSelect>
      <ElSelect v-model={proxyOtherValue[otherValueIndex.value].value}>
        {otherOptions.value.map(option => <ElOption key={option[optionProps.value.value]} value={option[optionProps.value.value]}>
          {option[optionProps.value.label]}
        </ElOption>)}
      </ElSelect>
    </div>
  }
}
