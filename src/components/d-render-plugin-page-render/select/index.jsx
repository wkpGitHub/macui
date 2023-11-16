import { computed, ref } from 'vue'
import { ElSelect, ElOption } from 'element-plus'
import { useFormInput, useOptions, formInputProps, fromInputEmits } from '@d-render/shared'
import { useEvents } from '../use-event'

export default {
  props: formInputProps,
  emits: [...fromInputEmits],
  setup (props, context) {
    const remoteSearchLoading = ref(false)
    const { width, securityConfig, proxyOtherValue, updateStream, clearable, placeholder } = useFormInput(
      props,
      context,
      { maxOtherKey: 2 },
      { autoGet: !props.config?.remoteMethod }
    )
    // 是否多选
    const multiple = computed(() => {
      return securityConfig.value.multiple ?? false
    })
    const { optionProps, options, proxyOptionsValue } = useOptions(props, multiple, updateStream, context)
    // 是否可搜索
    const filterable = computed(() => {
      return securityConfig.value.filterable ?? false
    })
    // 是否允许创建
    const allowCreate = computed(() => {
      return securityConfig.value.allowCreate ?? false
    })
    // 关闭远程搜索loading
    const closeRemoteLoading = () => {
      remoteSearchLoading.value = false
    }
    const remoteMethod = async (query) => {
      remoteSearchLoading.value = true
      try {
        options.value = await securityConfig.value.remoteMethod(query, props.dependOnValues)
      } finally {
        closeRemoteLoading()
      }
    }
    if (securityConfig.value.remoteMethod) {
      const query = proxyOtherValue[0] ? proxyOtherValue[0].value : ''
      remoteSearchLoading.value = true
      remoteMethod(query).finally(closeRemoteLoading)
    }

    const { eventMap } = useEvents(props, securityConfig)

    return () => <ElSelect v-model={proxyOptionsValue.value}
      clearable={clearable.value}
      placeholder={placeholder.value}
      filterable={filterable.value || allowCreate.value || securityConfig.value.remote}
      allow-create={allowCreate.value}
      disabled={props.disabled}
      multiple={multiple.value}
      remote={securityConfig.value.remote}
      remoteMethod={securityConfig.value.remoteMethod && remoteMethod}
      collapse-tags={securityConfig.value.collapseTags}
      loading={remoteSearchLoading.value}
      class="cip-basic-select"
      style={{ width: width.value }}
      {...eventMap.value}
    >
      {
        options.value.map((option, index) => <ElOption
          key={index}
          disabled={option[optionProps.value.disabled]}
          label={option[optionProps.value.label] ?? option}
          value={option[optionProps.value.value] ?? option}>
        </ElOption>)
      }
    </ElSelect>
  }
}
