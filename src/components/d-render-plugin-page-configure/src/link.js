export default {
  key: {
    label: '字段',
    type: 'selectModuleField',
    otherKey: 'label'
  },
  label: {},
  defaultValueType: {
    label: '链接文本',
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
  href: {
    label: '链接地址',
    type: 'link-params',
    otherKey: 'params'
  },
  dependOn: {
    hideItem: true,
    dependOn: ['params'],
    changeValue ({ params }) {
      return {
        value: params?.map(item => item.field)
      }
    }
  },
  dynamic: {
    hideItem: true,
    defaultValue: true
  },
  newTarget: {
    label: '是否在新窗口中打开',
    type: 'switch'
  },
  underline: {
    label: '是否下划线',
    type: 'switch',
    defaultValue: true
  },
  disabled: {
    label: '是否禁用超链接',
    type: 'radio',
    options: [
      { label: '是', value: 'yes' },
      { label: '否', value: 'no' },
      { label: '表达式', value: 'fx' }
    ]
  },
  disabledFx: {
    type: 'fx',
    dependOn: ['disabled'],
    readable: false,
    changeConfig (config, { disabled }) {
      if (disabled === 'fx') {
        config.readable = true
        config.writable = true
      }
      return config
    }
  }
}
