import { generateFieldList } from 'd-render'
import { ElInputNumber } from 'element-plus'
export default {
  key: {},
  gutter: {
    label: '列间隙',
    type: 'number',
    unit: 'px',
    width: '80px'
  },
  options: {
    label: '列配置',
    type: 'simpleCurd',
    infoRender: (h, { item }) => h(ElInputNumber, {
      modelValue: item.span,
      'onUpdate:modelValue': (val) => {
        item.span = val
      }
    }, {}),
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
