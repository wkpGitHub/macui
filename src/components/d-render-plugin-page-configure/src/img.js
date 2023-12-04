export default {
  label: {},
  defaultValue: {
    label: '链接地址',
    type: 'pageFx'
  },
  events: {
    hideItem: true,
    options: [
      { label: '点击事件', value: 'click' },
      { label: '鼠标移入事件', value: 'mouseenter' },
      { label: '鼠标移除事件', value: 'mouseleave' }
    ]
  }
}
