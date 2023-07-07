export default {
  key: {},
  showOnly: {
    label: '是否只读',
    type: 'switch'
  },
  grid: {
    type: 'number',
    label: '列数',
    minValue: 1,
    maxValue: 24
  },
  labelPosition: {
    type: 'select',
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
  scrollToError: {
    type: 'switch',
    label: '是否滚动到错误位置'
  },
  border: {
    type: 'switch',
    label: '是否显示边框'
  }
}
