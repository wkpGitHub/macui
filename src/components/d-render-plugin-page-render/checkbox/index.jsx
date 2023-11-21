import { ElCheckbox, ElCheckboxButton, ElCheckboxGroup } from 'element-plus'
import { formInputProps, fromInputEmits, useInputProps, useFormInput, useOptions } from '@d-render/shared'
import { computed, /* getCurrentInstance, */ h, defineComponent } from 'vue'
import { useEvents } from '../use-event'

export default defineComponent({
  props: formInputProps,
  emits: [...fromInputEmits],
  setup (props, context) {
    // const instance = getCurrentInstance()
    const inputProps = useInputProps(props, [
      'min',
      'max',
      'textColor',
      'fill'
    ])
    const { width, updateStream, inputStyle, inputRef, securityConfig } = useFormInput(props, context)
    const { optionProps, options, getOptions, proxyOptionsValue } = useOptions(props, true, updateStream)
    // 废弃
    // instance.ctx.getOptions = getOptions // 此处代码的意义
    context.expose({
      getOptions,
      inputRef
    })
    const isButton = computed(() => {
      return props.config?.isButton ?? false
    })
    const display = computed(() => {
      return props.config?.display ?? 'inline-flex'
    })

    const getCheckboxComponent = (isButton) => {
      return isButton ? ElCheckboxButton : ElCheckbox
    }
    const checkboxItem = (option) => {
      return h(getCheckboxComponent(isButton.value), {
        label: option[optionProps.value.value] ?? option,
        style: { display: display.value }
      }, {
        default: () => `${option[optionProps.value.label] ?? option}`
      })
    }
    const checkboxItems = () => options.value.map(checkboxItem)
    // [BUG EL2.2.17] ElCheckboxGroup 存在bug
    // modelValue 默认值为空数组 内部watch props.modelValue后进行数据校验，导致初始化时及触发数据验证
    // [TEMP FIX] 临时解决方案 当为空数组时 赋值为 undefined

    const { eventMap } = useEvents(props, securityConfig)
    return () => h(ElCheckboxGroup, {
      ...inputProps.value,
      ref: inputRef,
      style: { width: width.value, ...inputStyle.value },
      disabled: props.disabled,
      modelValue: proxyOptionsValue.value.length === 0 ? undefined : proxyOptionsValue.value,
      'onUpdate:modelValue': (value) => {
        proxyOptionsValue.value = value
      },
      ...eventMap.value
    },
    { default: () => checkboxItems() })
  }
})
