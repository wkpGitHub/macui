import { generateFieldList } from 'd-render'

export default {
  key: {},
  gutter: {
    type: 'number'
  },
  options: {
    type: 'simpleCurd',
    infoRender: (h, { item }) => h('div', null, [item.span]),
    itemType: 'col',
    itemKey: '$index',
    dialogProps: {
      size: 'small'
    },
    formProps: {
      fieldList: generateFieldList({
        span: { type: 'number' },
        children: { type: 'select', realArray: true, defaultValue: [], hideItem: true }
      })
    }
  }
}
