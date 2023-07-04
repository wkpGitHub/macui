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
    options: 'prev,pager,next,jumper,total'.split(',')
  }
}
