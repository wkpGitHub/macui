export default {
  key: { readable: true },
  nodeKey: { label: '唯一标识', defaultValue: 'id' },
  defaultExpandAll: { label: '全部展开', type: 'switch' },
  events: {
    hideItem: true,
    options: [{ label: '点击事件', value: 'click' }]
  },
  options: {
    label: '选项',
    type: 'setOptions'
  }
}
