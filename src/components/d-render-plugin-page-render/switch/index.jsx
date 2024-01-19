import { ElSwitch } from 'element-plus'
import { useFormInput, formInputProps, fromInputEmits } from '@d-render/shared'
import { useEvents } from '../use-event'
import { inject, computed } from 'vue'
import { getFxValue } from '@lc/components/d-render-plugin-page-render/use-event-configure'
export default {
  props: formInputProps,
  emits: [...fromInputEmits, 'change'],
  setup (props, context) {
    const drPageRender = inject('drPageRender', {})
    const { proxyValue, securityConfig } = useFormInput(props, context)
    // el-switch组件监听checked值未做nextTick报错，对错误进行处理
    // onErrorCaptured(() => false)
    const { eventMap } = useEvents(props, securityConfig)
    const activeValue = computed(() => getFxValue(securityConfig.value.activeValue || [], drPageRender))
    const inactiveValue = computed(() => getFxValue(securityConfig.value.inactiveValue || [], drPageRender))
    return () => <div class={'cip-switch__wrapper'}>
      <ElSwitch
        v-model={proxyValue.value}
        disabled={props.disabled}
        activeText={securityConfig.value.activeText ?? ''}
        inactiveText={securityConfig.value.inactiveText ?? ''}
        activeValue={activeValue.value ?? true}
        inactiveValue={inactiveValue.value ?? false}
        onChange={val => context.emit('change', val)}
        {...eventMap.value}
      />
    </div>
  }
}
