const defaultLayout = 'total,sizes,prev,pager,next,jumper'
export default {
  label: { },
  // otherKey: {
  //   type: 'select',
  //   allowCreate: true,
  //   realArray: true,
  //   multiple: true,
  //   limit: 2
  // },
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
