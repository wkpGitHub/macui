import { useFormInput, isEmpty, formInputProps, fromInputEmits } from '@d-render/shared'
import CipInput from '@cip/components/cip-input'
import CipButtonText from '@cip/components/cip-button-text'
import { Close } from '@element-plus/icons-vue'
import { computed } from 'vue'
import './index.less'
export default {
  props: formInputProps,
  emits: fromInputEmits,
  setup (props, ctx) {
    const {
      proxyValue
    } = useFormInput(props, ctx)
    // 判断数据是否为空
    const isDataEmpty = computed(() => {
      return Array.isArray(proxyValue.value) && proxyValue.value.length
    })
    // 新增
    const handleClick = () => {
      isEmpty(proxyValue.value) ? proxyValue.value = [{}] : proxyValue.value.push({})
    }
    // 删除
    const handleDelete = (index) => {
      proxyValue.value.splice(index, 1)
    }
    return () => <div class="params-add-wrapper">
      {
        !isDataEmpty.value
          ? <div className="params-add-wrapper--empty">{'<空>'}</div>
          : <div className="params-add-wrapper--content">
            {
              proxyValue.value?.map((item, index) => <div className="params-add-wrapper--item">
                <CipInput size="small" placeholder="参数名" v-model={item.key}></CipInput>
                <CipInput size="small" placeholder="参数值" v-model={item.value}></CipInput>
                <CipButtonText icon={Close} size="mini" onClick={() => handleDelete(index)}></CipButtonText>
              </div>)
            }
          </div>
      }
      <CipButtonText size="small" type="primary" onClick={handleClick}>新增</CipButtonText>
    </div>
  }
}
