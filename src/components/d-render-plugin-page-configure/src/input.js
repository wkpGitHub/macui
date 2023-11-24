import { defaultConfigureOptions } from '@d-render/shared'
const { label } = defaultConfigureOptions
export default {
  id: {
    label: '字段',
    type: 'selectModuleField',
    otherKey: ['key', 'label']
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
    type: 'out-dependOn',
    canOutDependOn: true,
    otherKey: ['dependOn', 'outDependOn'],
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
    type: 'pageFx',
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
  },
  watch: {
    label: '文本内容作用于展示块',
    type: 'select-watch'
  }

}
