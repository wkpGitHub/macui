import { ElInput } from 'element-plus'
import { computed, watch, ref, nextTick, onMounted, inject } from 'vue'
import {
  useFormInput,
  formInputProps,
  fromInputEmits,
  getFieldValue,
  useCipConfig,
  getUsingConfig
} from '@d-render/shared'
import { useEvents } from '../use-event'
import { getFxValue } from '@lc/components/d-render-plugin-page-render/use-event-configure'
export default {
  props: formInputProps,
  emits: [...fromInputEmits],
  setup (props, context) {
    const cipConfig = useCipConfig()
    const { width, clearable, securityConfig, proxyValue, inputStyle, placeholder } = useFormInput(props, context)
    const drPageRender = inject('drPageRender', {})
    if (securityConfig.value.defaultValue) {
      proxyValue.value = getFxValue(securityConfig.value.defaultValue || [], drPageRender)
    }
    const inputRef = ref()
    const limit = computed(() => {
      return getUsingConfig(
        securityConfig.value.limit,
        getFieldValue(cipConfig, 'limit.textarea')
      ) // props.config?.limit ?? cipConfig?.limit?.textarea ?? ''
    })
    const autosize = computed(() => {
      return Object.assign({}, { minRows: 2, maxRows: 6 }, securityConfig.value.autosize) // props.config?.autosize || { minRows: 2, maxRows: 6 }
    })
    onMounted(() => {
      watch(() => securityConfig.value.autosize, () => {
        nextTick(() => {
          // 必须在nextTick中触发否则无效
          inputRef.value.resizeTextarea()
        })
      }, { deep: true }) // 需要深度监听才可以正常触发
    })
    const { eventMap } = useEvents(props, securityConfig)
    return () => <ElInput ref={inputRef}
      v-model={proxyValue.value}
      placeholder={placeholder.value}
      clearable={clearable.value}
      disabled={props.disabled}
      maxlength={limit.value}
      show-word-limit={!!limit.value}
      type="textarea"
      autosize={autosize.value}
      resize="none"
      style={{ ...inputStyle.value, width: width.value }}
      {...eventMap.value}
    ></ElInput>
  }
}
