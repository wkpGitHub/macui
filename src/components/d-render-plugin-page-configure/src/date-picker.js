import { defaultConfigureOptions } from '@d-render/shared'
export default {
  ...defaultConfigureOptions(),
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
  events: {
    hideItem: true,
    options: [
      { label: 'change事件', value: 'change' },
      { label: '下拉框出现/隐藏事件', value: 'visible-change' },
      { label: '失焦事件', value: 'blur' },
      { label: '聚焦事件', value: 'focus' },
      { label: '日历所选日期更改事件', value: 'calendar-change' },
      { label: '日期面板改变事件', value: 'panel-change' }
    ]
  }
}
