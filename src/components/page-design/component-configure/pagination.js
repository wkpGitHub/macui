export default {
  key: {},
  limit: {
    label: '每页条数',
    type: 'number'
  },
  offset: {
    label: '偏移量',
    type: 'number'
  },
  layout: {
    label: '布局',
    type: 'select',
    multiple: true,
    options: 'prev,pager,next,jumper,total'.split(',')
  }
}
