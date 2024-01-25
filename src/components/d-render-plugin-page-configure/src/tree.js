export default {
  key: { readable: true },
  nodeKey: { label: '唯一标识', defaultValue: 'id' },
  defaultExpandAll: { label: '全部展开', type: 'switch' },
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
    options: [{ label: '点击事件', value: 'click' }]
  },
  options: {
    otherKey: ['optionProps', 'optApiConfig'],
    type: 'setOptions',
    isTree: true,
    label: '设置数据'
  },
  'optionProps.children': {
    label: '子节点字段',
    defaultValue: 'children'
  }
  // watch: {
  //   label: '文本内容作用于展示块',
  //   type: 'select-watch'
  // }
}
