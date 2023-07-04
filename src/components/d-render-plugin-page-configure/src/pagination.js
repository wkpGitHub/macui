const defaultLayout = 'total,sizes,prev,pager,next,jumper'
export default {
  key: {},
  otherKey: {
    type: 'select',
    allowCreate: true,
    multiple: true,
    limit: 2
  },
  layout: {
    label: '布局',
    type: 'select',
    multiple: true,
    defaultValue: defaultLayout,
    options: defaultLayout.split(',')
  }
}
