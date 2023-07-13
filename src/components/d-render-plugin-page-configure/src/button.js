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
  click: {
    label: '点击事件',
    type: 'eventConfig',
    infoRender: (h, { item }) => h('div', null, [item.remark]),
    itemType: '事件',
    itemKey: 'index'
  }
}
