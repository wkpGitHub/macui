import { defaultConfigureOptions } from '@d-render/shared'
const { label } = defaultConfigureOptions
export default {
  key: {
    type: 'selectModuleField',
    otherKey: 'label'
  },
  label,
  events: {
    hideItem: true,
    options: [
      { label: '输入事件', value: 'input' },
      { label: '失焦事件', value: 'blur' },
      { label: '聚焦事件', value: 'focus' },
      { label: 'change事件', value: 'change' },
      { label: '清空事件', value: 'clear' }
    ]
  },
  defaultValueType: {
    label: '默认值',
    type: 'select',
    defaultValue: 'custom',
    options: [
      { value: 'custom', label: '自定义' },
      { value: 'dependOn', label: '数据联动' }
    ]
  },
  changeValueStr: {
    type: 'select-dependOn',
    otherKey: ['dependOn', 'valueChangeConfig'],
    readable: false,
    dependOn: ['defaultValueType', 'id', 'label'],
    changeConfig (config, { defaultValueType }) {
      if (defaultValueType === 'dependOn') {
        config.readable = true
        config.writable = true
      }
      return config
    }
  },
  defaultValue: {
    placeholder: '请输入默认值',
    hideLabel: true,
    readable: false,
    dependOn: ['defaultValueType'],
    changeConfig (config, { defaultValueType }) {
      if (defaultValueType === 'custom') {
        config.readable = true
        config.writable = true
      }
      return config
    }
  }

}
