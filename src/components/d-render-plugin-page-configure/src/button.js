import { generateFieldList } from 'd-render'

export default {
  key: { readable: true },
  text: { label: '文字' },
  icon: { label: '图标' },
  click: {
    label: '点击事件',
    type: 'simpleCurd',
    infoRender: (h, { item }) => h('div', null, [item.remark]),
    itemType: '事件',
    itemKey: 'index',
    formProps: {
      fieldList: generateFieldList({
        type: {
          type: 'select',
          options: [
            { value: 'method', label: '函数' },
            { value: 'openDialog', label: '打开弹窗' },
            { value: 'script', label: '脚本' },
            { value: 'router', label: '页面' }
          ]
        },
        value: {
          type: 'input'
        }
      })
    }
  }
}
