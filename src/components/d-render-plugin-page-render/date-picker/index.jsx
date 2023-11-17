import { ElDatePicker } from 'element-plus'
import { formInputProps, fromInputEmits, useInputProps, getUsingConfig, useFormInput } from '@d-render/shared'
import { computed } from 'vue'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import weekYear from 'dayjs/plugin/weekYear'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import { isArray, isNotEmpty, isNumber } from '@cip/utils/util'
import { useEvents } from '../use-event'
dayjs.extend(advancedFormat)
dayjs.extend(weekYear)
dayjs.extend(weekOfYear)
export default {
  props: formInputProps,
  inheritAttrs: false,
  emits: [...fromInputEmits, 'focus', 'blur'],
  setup (props, context) {
    // 不同事件类型传值不同，做转换
    const popperStrategy = window.__MICRO_APP_ENVIRONMENT__ ? 'fixed' : 'absolute'

    const inputProps = useInputProps(props, [
      'placeholder',
      ['clearable', { defaultValue: true }]
    ])
    // 是否展示图标
    const noIcon = computed(() => {
      return securityConfig.value.noIcon
    })
    // 是否将值转换为时间戳
    const isTimestamp = computed(() => {
      return securityConfig.value.isTimestamp ?? false
    })
    // 快捷格式化字符串
    const formatter = computed(() => {
      if (securityConfig.value.formatter) return securityConfig.value.formatter
      const typeToFormatter = {
        year: 'YYYY',
        month: 'YYYY-MM',
        week: 'YYYY 第 ww 周',
        date: 'YYYY-MM-DD',
        datetime: 'YYYY-MM-DD HH:mm:ss'
      }
      return typeToFormatter[type.value] ?? typeToFormatter.date
    })
    // 格式化代码
    const valueFormat = computed(() => {
      return getUsingConfig(securityConfig.value.valueFormat, formatter.value)
    })
    // 组件值转换为实际值
    const typeToValueMap = {
      dates: (val) => {
        if (!isArray(val)) val = [val]
        return val?.map(i => dayjs(i).format(formatter.value)).join(',')
      },
      datetime: val => dayjs(val).format('YYYY-MM-DD HH:mm:ss'),
      week: val => dayjs(val).format('YYYY-MM-DD')
    }
    // 使用viewType格式化值
    const typeToValue = (val) => {
      if (!val) return ''
      if (isTimestamp.value) return new Date(val).getTime()
      if (securityConfig.value.isOtherDate) {
        // viewType为date时，返回值修改时分秒为23:59:59
        const modelValue = new Date(val).getTime() + 86400000 - 1000
        return dayjs(modelValue).format(valueFormat.value)
      }
      return typeToValueMap?.[type.value]?.(val) ?? dayjs(val).format(valueFormat.value)
    }
    // 实际值转化为组件值
    const getValue = () => {
      if (!props.modelValue) return null
      // week的modelValue值应为选择的某一天，formatter为第几周
      if (type.value === 'week') return dayjs(props.modelValue).format('YYYY-MM-DD')
      // 时间戳modelValue转成formatter格式，向外抛出时重置为时间戳格式
      if (isTimestamp.value) return dayjs(props.modelValue).format(formatter.value)
      // dates时modelValue是个数组
      if (type.value === 'dates') return props.modelValue.split(',')
      return dayjs(props.modelValue).format(valueFormat.value)
    }
    const { securityConfig, proxyValue, width, inputStyle, inputRef } = useFormInput(props, context, {
      fromModelValue: getValue,
      toModelValue: typeToValue
    })

    const type = computed(() => {
      const viewType = securityConfig.value.viewType ?? 'date'
      return viewType.includes('range') ? 'date' : viewType
    })
    // 是否包含等于
    const isEqual = computed(() => {
      return securityConfig.value.isEqual ?? false
    })
    // disable日期
    const disabledDate = computed(() => {
      return date => {
        if (securityConfig.value.disabledDate) {
          return securityConfig.value.disabledDate(date)
        }
        if (isNotEmpty(securityConfig.value.max) || isNotEmpty(securityConfig.value.min)) {
          return getDisabledConfig(date)
        }
        return undefined
      }
    })
    // disable时间转换
    const dateTransform = (date) => {
      if (isNumber(date)) return date
      if (!date?.includes(' ')) return new Date(date + ' 00:00:00').getTime()
      return new Date(date).getTime()
    }
    // min/max的disable实现
    const getDisabledConfig = (date) => {
      const maxDate = dateTransform(securityConfig.value.max)
      const minDate = dateTransform(securityConfig.value.min)
      const dateTime = date.getTime()
      if (isNotEmpty(securityConfig.value.max) && isNotEmpty(securityConfig.value.min)) {
        if (isEqual.value) return (dateTime >= maxDate) || (dateTime <= minDate)
        return (dateTime > maxDate) || (dateTime < minDate)
      }
      if (isNotEmpty(securityConfig.value.max)) {
        if (isEqual.value) return dateTime >= maxDate
        return dateTime > maxDate
      }
      if (isNotEmpty(securityConfig.value.min)) {
        if (isEqual.value) return dateTime <= minDate
        return dateTime < minDate
      }
    }

    const { eventMap } = useEvents(props, securityConfig)

    return () => <ElDatePicker
      ref={inputRef}
      {...inputProps.value}
      class={['cip-form-picker', { 'cip-form-picker--no-icon': noIcon }, context.attrs.class]}
      v-model={proxyValue.value}
      format={formatter.value}
      popperOptions={{ placement: 'bottom', strategy: popperStrategy }}
      value-format={valueFormat.value}
      disabled={props.disabled}
      type={type.value}
      style={{ ...inputStyle, width }}
      onBlur={(e) => context.emit('blur', e)}
      onFocus={(e) => context.emit('focus', e)}
      disabled-date={disabledDate.value}
      {...eventMap.value}
    />
  }
}
