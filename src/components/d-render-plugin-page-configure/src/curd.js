export default {
  key: {},
  usingSlots: {
    label: '插槽选则',
    type: 'select',
    multiple: true,
    realArray: true,
    options: [
      { value: 'filter', label: '搜索栏' },
      { value: 'handle', label: '操作' },
      { value: 'title', label: '表标题' },
      { value: 'default', label: '默认' },
      { value: 'pagination', label: '分页' },
      { value: 'dialog', label: '弹窗' }
    ]
  },
  options: {
    type: 'curdConfig',
    otherKey: ['apiList', 'filedOptionMap']
  }
}
