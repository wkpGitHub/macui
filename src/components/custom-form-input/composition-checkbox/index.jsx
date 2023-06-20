import { formInputProps, fromInputEmits, useFormInput } from '@d-render/shared'
import { ElCheckbox } from 'element-plus'
import './index.less'
export default {
  props: formInputProps,
  emits: fromInputEmits,
  setup (props, ctx) {
    console.log('otherKey', props.config.otherKey)
    const otherKey = [].concat(props.config.otherKey)
    const { proxyOtherValue, securityConfig, width } = useFormInput(props, ctx, { maxOtherKey: otherKey.length })
    return () => <div class={'composition-checkbox'} style={{ width: width.value }}>
      {otherKey.map((key, i) => <ElCheckbox key={key} v-model={proxyOtherValue[i].value}>
        {securityConfig.value.option ? securityConfig.value.option[key] : key}
      </ElCheckbox>)}
    </div>
  }
}
