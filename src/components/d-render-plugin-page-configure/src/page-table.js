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
  hideLabel: {},
  hideAdd: { type: 'switch' },
  hideDelete: { type: 'switch' },
  tableColumnStatus: { type: 'select', options: ['writable'] }
}
