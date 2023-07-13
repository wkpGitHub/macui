export default {
  key: {},
  label: {},
  hideSearch: {
    label: '是否隐藏操作按钮',
    type: 'switch'
  },
  searchButtonText: {
    label: '查询按钮文本',
    defaultValue: '查询'
  },
  labelPosition: {
    type: 'select',
    defaultValue: 'top',
    options: [
      {
        label: '上对齐',
        value: 'top'
      },
      {
        label: '左对齐',
        value: 'left'
      },
      {
        label: '右对齐',
        value: 'right'
      }
    ]
  },
  search: {
    label: '搜索事件',
    type: 'eventConfig'
  }
}
