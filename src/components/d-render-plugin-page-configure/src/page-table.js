import { getItemConfig } from '../utils'

export default {
  key: { readable: true },
  otherKey: {
    type: 'select',
    allowCreate: true,
    realArray: true,
    multiple: true,
    limit: 2,
    description: '[pageNum]'
  },
  model: {
    label: '数据模型',
    type: 'selectModule'
  },
  options: {
    dependOn: ['model'],
    changeValue ({ model }) {
      return {
        value: [{
          key: 'default',
          children: (model?.children || []).map(opt => getItemConfig(opt))
        }]
      }
    }
  },
  hideLabel: {},
  hideAdd: { type: 'switch' },
  hideDelete: { type: 'switch' },
  tableColumnStatus: { type: 'select', options: ['writable'] }
}
