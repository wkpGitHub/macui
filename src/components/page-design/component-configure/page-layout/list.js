export default {
  key: {},
  title: {
    label: '页面标题'
  },
  canBack: {
    label: '是否可以返回',
    type: 'switch'
  },
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
      { value: 'pagination', label: '分页' }
    ]
  },
  options: {
    hideItem: 'true',
    type: 'arrayObject',
    dependOn: ['usingSlots', 'options'],
    changeValue: ({ usingSlots, options }) => {
      console.log('options', { usingSlots, options })
      const value = options.concat(usingSlots.filter(name => {
        return !options.find(option => option.key === name)
      }).map(name => ({ key: name, children: [] })))
      console.log('options', value)
      // return {
      //   value: value
      // }
    }
  }
}
