export default {
  key: {},
  label: {},
  hideSearch: {
    label: '是否隐藏操作按钮',
    type: 'switch',
    defaultValue: true
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
  }
}
