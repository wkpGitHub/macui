import { generateFieldList } from 'd-render'

export default {
  label: {},
  parentType: { label: '父容器' },
  dependOn: {
    type: 'select',
    options: [],
    allowCreate: true,
    multiple: true,
    realArray: true
  },
  options: {
    label: '按钮配置',
    type: 'simpleCurd',
    infoRender: (h, { item }) => h('div', null, [h('div', null, [item.text])]),
    itemType: '按钮',
    itemKey: 'text',
    dialogProps: {
      size: 'small'
    },
    formProps: {
      labelWidth: '80px',
      fieldList: generateFieldList({
        text: { label: '文字' },
        click: {
          label: '点击事件',
          type: 'eventConfig'
        }
      })
    }
  }
}
