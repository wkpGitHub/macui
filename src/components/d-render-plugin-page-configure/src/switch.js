// import { defaultConfigureOptions } from '@d-render/shared'
export default {
  key: {},
  label: {
    label: '标题'
  },
  activeText: {
    label: '开始显示文本'
  },
  inactiveText: {
    label: '关闭显示文本'
  },
  activeValue: {
    label: '开启的值',
    type: 'pageFx'
  },
  inactiveValue: {
    label: '关闭的值',
    type: 'pageFx'
  },
  writable: {
    label: '是否表格编辑',
    type: 'switch'
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
  events: {
    hideItem: true,
    options: [
      { label: 'change事件', value: 'change' }
    ]
  }
}
