const defaultLayout = 'total,sizes,prev,pager,next,jumper'
export default {
  key: {},
  otherKey: {
    type: 'select',
    allowCreate: true,
    multiple: true,
    limit: 2
  },
  pageSizes: {
    type: 'select',
    label: 'size选项',
    realArray: true,
    multiple: true,
    allowCreate: true,
    options: [5, 8, 10, 15, 20]
  },
  defaultValue: {
    type: 'select',
    dependOn: ['pageSizes'],
    asyncOptions ({ pageSizes }) {
      return pageSizes
    }
  },
  layout: {
    label: '布局',
    type: 'select',
    multiple: true,
    defaultValue: defaultLayout,
    options: defaultLayout.split(',')
  }
}
