export default {
  key: { readable: true },
  text: { label: '文字' },
  icon: { label: '图标' },
  inputType: {
    type: 'select',
    label: '按钮类型',
    options: [
      'primary', 'success', 'warning', 'danger'
    ]
  },
  events: {
    hideItem: true,
    options: [{ label: '点击事件', value: 'click' }]
  }
}
