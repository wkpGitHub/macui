export default {
  key: {},
  otherKey: {
    type: 'select',
    allowCreate: true,
    realArray: true,
    multiple: true,
    limit: 2,
    description: '[pageNum]'
  },
  hideLabel: {},
  hideAdd: { type: 'switch' },
  hideDelete: { type: 'switch' },
  tableColumnStatus: { type: 'select', options: ['writable'] }
}
