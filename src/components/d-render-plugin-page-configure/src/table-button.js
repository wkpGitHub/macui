import { generateFieldList } from 'd-render'

export default {
  label: { },
  options: {
    label: '按钮配置',
    type: 'simpleCurd',
    infoRender: (h, { item }) => h('div', null, [h('div', null, [item.text])]),
    itemType: '按钮',
    itemKey: 'text',
    formProps: {
      labelWidth: '80px',
      fieldList: generateFieldList({
        text: { label: '按钮名称' },
        click: {
          label: '点击事件',
          type: 'eventConfig'
        }
      })
    }
  },
  events: {
    hideItem: true,
    options: [{ label: '点击事件', value: 'click', args: ['当前行数据', '当前行索引'] }]
  }
}
