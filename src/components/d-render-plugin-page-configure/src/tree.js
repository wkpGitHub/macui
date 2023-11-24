export default {
  key: { readable: true },
  nodeKey: { label: '唯一标识', defaultValue: 'id' },
  defaultExpandAll: { label: '全部展开', type: 'switch' },
  events: {
    hideItem: true,
    options: [{ label: '点击事件', value: 'click' }]
  },
  options: {
    otherKey: ['asyncOptions', 'optionProps', 'optApiConfig'],
    type: 'setOptions',
    isTree: true,
    label: '设置数据'
  },
  watch: {
    label: '文本内容作用于展示块',
    type: 'select-watch'
  }
}
